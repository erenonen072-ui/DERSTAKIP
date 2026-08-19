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
        error: "GEMINI_API_KEY bulunamadı."
      });
    }

    const body = req.body || {};

    const question = body.question || "";
    const subject = body.subject || "Genel";
    const mode = body.mode || "Adım adım";
    const image = body.image || null;

    if (!question && !image) {
      return res.status(400).json({
        success: false,
        error: "Soru veya fotoğraf gönderilmedi."
      });
    }

    const parts = [];

    parts.push({
      text: `
Sen DersTakip uygulamasının yapay zeka ders asistanısın.

Ders: ${subject}
Anlatım şekli: ${mode}

Öğrencinin sorusunu Türkçe çöz.

Kurallar:
- Soruyu dikkatlice analiz et.
- Matematik sorularında işlemleri göster.
- Cevabı anlaşılır şekilde açıkla.
- Öğrenci seviyesine uygun konuş.
- En sonunda "Cevap:" şeklinde sonucu belirt.
- Bilmediğin bilgiyi uydurma.

Öğrencinin sorusu:
${question || "Fotoğraftaki soruyu çöz."}
`
    });

    if (image) {
      const match = image.match(
        /^data:(image\/[^;]+);base64,(.+)$/
      );

      if (!match) {
        return res.status(400).json({
          success: false,
          error: "Fotoğraf formatı geçersiz."
        });
      }

      parts.push({
        inline_data: {
          mime_type: match[1],
          data: match[2]
        }
      });
    }

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
              parts: parts
            }
          ]
        })
      }
    );

    const text = await response.text();

    console.log("Gemini status:", response.status);
    console.log("Gemini response:", text);

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return res.status(502).json({
        success: false,
        error: "Gemini geçerli JSON yanıtı vermedi."
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error:
          result?.error?.message ||
          "Gemini API isteği başarısız oldu."
      });
    }

    const answer =
      result?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return res.status(500).json({
        success: false,
        error: "Gemini cevap oluşturamadı."
      });
    }

    return res.status(200).json({
      success: true,
      answer: answer
    });

  } catch (error) {
    console.error("SOLVE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Sunucu hatası oluştu."
    });
  }
}
