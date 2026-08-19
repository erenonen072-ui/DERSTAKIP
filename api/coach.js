export default async function handler(req, res) {
  // Sadece POST kabul et
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
        error: "GEMINI_API_KEY bulunamadı. Vercel Environment Variables bölümünü kontrol et."
      });
    }

    const {
      message,
      history,
      student
    } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Mesaj boş olamaz."
      });
    }

    // Son 12 mesajı kullan
    const previousMessages = Array.isArray(history)
      ? history.slice(-12)
      : [];

    const conversation = previousMessages
      .map((item) => {
        const role =
          item.role === "user"
            ? "Öğrenci"
            : "Ders Koçu";

        return `${role}: ${item.content || ""}`;
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

    // Yapay zekaya gönderilecek prompt
    const prompt = `
Sen "DersTakip" adlı öğrenci takip uygulamasının yapay zeka Ders Koçusun.

Öğrenciyle doğal, samimi ve anlaşılır Türkçe konuş.

KURALLAR:

1. Öğrencinin yazdığı mesaja göre cevap ver.
2. Her mesajda aynı tavsiyeleri tekrar etme.
3. Öğrenci matematik soruyorsa matematik hakkında konuş.
4. Öğrenci motivasyon istiyorsa motivasyon ver.
5. Öğrenci sınav soruyorsa uygun bir çalışma planı oluştur.
6. Öğrenci "merhaba" diyorsa normal şekilde karşılık ver.
7. Öğrenci önceki mesajlarından bahsediyorsa konuşma geçmişini kullan.
8. Öğrenci bir konuyu anlamadığını söylüyorsa basit şekilde anlat.
9. Gereksiz uzun cevap verme.
10. Yaşa uygun ve anlaşılır Türkçe kullan.
11. Sürekli "25 dakika çalış" tavsiyesini kullanma.
12. Aynı cümleyi tekrar tekrar kullanma.
13. Cevapları mümkün olduğunca öğrencinin mesajına özel oluştur.
14. Matematik, fen, Türkçe ve İngilizce gibi derslerde gerektiğinde örnek ver.
15. Öğrencinin özel veya hassas kişisel bilgilerini isteme.
16. Bilmediğin bir şeyi kesin bilgiymiş gibi söyleme.
17. Öğrenci soru sorarsa mümkün olduğunca doğrudan cevap ver.

${studentInfo}

ÖNCEKİ KONUŞMA:
${conversation || "Henüz konuşma yok."}

YENİ ÖĞRENCİ MESAJI:
${message}

Şimdi doğrudan öğrencinin mesajına cevap ver.
`;

    // Gemini API
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

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

    const raw = await response.text();

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      console.error("GEMINI RAW RESPONSE:", raw);

      return res.status(502).json({
        success: false,
        error: "Gemini API geçerli JSON döndürmedi."
      });
    }

    // Gemini hata döndürdüyse
    if (!response.ok) {
      console.error("GEMINI ERROR:", data);

      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          "Gemini API isteği başarısız oldu."
      });
    }

    // Cevabı al
    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      console.error("GEMINI EMPTY RESPONSE:", data);

      return res.status(502).json({
        success: false,
        error: "Yapay zekadan cevap alınamadı."
      });
    }

    // Başarılı
    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("COACH SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Ders Koçu sunucu hatası."
    });
  }
}
