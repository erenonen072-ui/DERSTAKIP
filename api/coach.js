export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Sadece POST isteği kabul edilir."
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY Vercel'de bulunamadı."
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

    const studentInfo = `
ÖĞRENCİ BİLGİLERİ:
Ad: ${student?.name || "Öğrenci"}
Seviye: ${student?.level || 1}
XP: ${student?.xp || 0}
Toplam görev: ${student?.tasks || 0}
Tamamlanan görev: ${student?.completed || 0}

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

    const prompt = `
Sen "DersTakip" uygulamasının yapay zeka Ders Koçusun.

Öğrenciyle doğal, samimi ve anlaşılır Türkçe konuş.

Kurallar:
- Öğrencinin mesajına doğrudan cevap ver.
- Gereksiz uzun cevap verme.
- Aynı tavsiyeleri sürekli tekrarlama.
- Matematik sorusuna matematik cevabı ver.
- Fen sorusuna fen cevabı ver.
- Motivasyon istenirse motivasyon ver.
- Sınav sorulursa uygun bir plan oluştur.
- Konuşma geçmişini gerektiğinde kullan.
- Konuyu anlamadıysa basit örneklerle anlat.
- Yaşa uygun Türkçe kullan.
- Öğrenciden özel veya hassas kişisel bilgi isteme.

${studentInfo}

ÖNCEKİ KONUŞMA:
${conversation || "Henüz konuşma yok."}

YENİ MESAJ:
${message}

Şimdi doğrudan cevap ver.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI ERROR:", data);

      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          "Gemini API isteği başarısız."
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return res.status(502).json({
        success: false,
        error: "Gemini cevap döndürmedi."
      });
    }

    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("COACH SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Ders Koçu sunucu hatası."
    });
  }
}
