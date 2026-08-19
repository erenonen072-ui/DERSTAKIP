export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Sadece POST isteği kabul edilir."
    });
  }

  try {
    // Vercel Environment Variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error:
          "GEMINI_API_KEY bulunamadı. Vercel > Settings > Environment Variables bölümünü kontrol et."
      });
    }

    const {
      message,
      history,
      student
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Mesaj boş olamaz."
      });
    }

    // Son 12 mesajı al
    const previousMessages = Array.isArray(history)
      ? history.slice(-12)
      : [];

    const conversation = previousMessages
      .map((item) => {
        const role =
          item?.role === "user"
            ? "Öğrenci"
            : "Ders Koçu";

        return `${role}: ${item?.content || ""}`;
      })
      .join("\n");

    // Öğrenci bilgileri
    const studentInfo = `
ÖĞRENCİ BİLGİLERİ:

Ad:
${student?.name || "Öğrenci"}

Seviye:
${student?.level || 1}

XP:
${student?.xp || 0}

Toplam görev:
${student?.tasks || 0}

Tamamlanan görev:
${student?.completed || 0}

Dersler:
${
  Array.isArray(student?.subjects)
    ? student.subjects.join(", ")
    : "Belirtilmemiş"
}

Sınavlar:
${
  Array.isArray(student?.exams)
    ? JSON.stringify(student.exams)
    : "Yok"
}
`;

    // Gemini prompt
    const prompt = `
Sen "DersTakip" adlı öğrenci takip uygulamasının yapay zeka Ders Koçusun.

Öğrenciyle doğal, samimi ve anlaşılır Türkçe konuş.

KURALLAR:

1. Öğrencinin yazdığı mesaja doğrudan cevap ver.
2. Aynı tavsiyeleri sürekli tekrar etme.
3. Matematik sorusunda matematik hakkında konuş.
4. Motivasyon istiyorsa kısa ve gerçekçi motivasyon ver.
5. Sınav hakkında sorarsa uygun bir çalışma planı oluştur.
6. Öğrenci "merhaba" diyorsa normal şekilde karşılık ver.
7. Önceki konuşmaları mümkün olduğunda dikkate al.
8. Öğrenci bir konuyu anlamadığını söylüyorsa basit şekilde anlat.
9. Gereksiz uzun cevap verme.
10. Yaşa uygun ve anlaşılır Türkçe kullan.
11. Sürekli "25 dakika çalış" tavsiyesi verme.
12. Aynı cümleleri tekrar tekrar kullanma.
13. Cevabı mümkün olduğunca öğrencinin mesajına özel oluştur.
14. Ders konularında gerekirse örnekler kullan.
15. Öğrenciden gereksiz kişisel bilgi isteme.
16. Bilmediğin bir konuda kesin bilgi veriyormuş gibi davranma.
17. Ders çalışmayı destekleyen, güvenli ve faydalı öneriler ver.

${studentInfo}

ÖNCEKİ KONUŞMA:
${conversation || "Henüz konuşma yok."}

YENİ ÖĞRENCİ MESAJI:
${message}

Şimdi doğrudan öğrencinin mesajına cevap ver.
`;

    // Gemini API URL
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      encodeURIComponent(apiKey);

    // Gemini isteği
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        contents: [
          {
            role: "user",

            parts: [
              {
                text: prompt
              }
            ]
          }
        ],

        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 800
        }
      })
    });

    // Gelen cevabı oku
    const raw = await response.text();

    let result;

    try {
      result = raw ? JSON.parse(raw) : null;
    } catch (parseError) {
      console.error(
        "GEMINI RAW RESPONSE:",
        raw
      );

      return res.status(502).json({
        success: false,
        error:
          "Gemini API geçerli JSON döndürmedi.",
        details: raw
      });
    }

    // Gemini hata döndürdüyse
    if (!response.ok) {
      console.error(
        "GEMINI ERROR:",
        JSON.stringify(result, null, 2)
      );

      const geminiError =
        result?.error?.message ||
        result?.error?.status ||
        JSON.stringify(result?.error || result);

      return res.status(response.status).json({
        success: false,
        error: geminiError
      });
    }

    // Cevabı çıkar
    const answer =
      result?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || "")
        .join("")
        .trim();

    if (!answer) {
      console.error(
        "GEMINI EMPTY RESPONSE:",
        JSON.stringify(result, null, 2)
      );

      return res.status(502).json({
        success: false,
        error:
          "Gemini cevap döndürdü ancak cevap metni bulunamadı."
      });
    }

    // Başarılı
    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error(
      "COACH SERVER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Ders Koçu sunucu hatası."
    });
  }
}
