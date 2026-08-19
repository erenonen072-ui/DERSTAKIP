export default async function handler(req, res) {
  // Sadece POST kabul et
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Sadece POST isteği kabul edilir."
    });
  }

  try {
    const {
      question,
      subject,
      mode,
      image
    } = req.body || {};

    if (!question && !image) {
      return res.status(400).json({
        success: false,
        error: "Soru veya fotoğraf gerekli."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY Vercel Environment Variables bölümünde bulunamadı."
      });
    }

    let prompt = `
Sen DersTakip uygulamasının yapay zeka soru çözme asistanısın.

Ders: ${subject || "Belirtilmedi"}
Anlatım şekli: ${mode || "Adım adım"}

Öğrencinin sorusunu çöz.

Kurallar:
- Türkçe cevap ver.
- Öğrencinin seviyesine uygun anlat.
- Gereksiz uzunluk kullanma.
- Matematik sorularında işlemleri tek tek göster.
- Sonucu açıkça belirt.
- Fotoğraf varsa fotoğraftaki soruyu dikkatlice oku.
- Emin olmadığın bilgiyi uydurma.

Öğrenci sorusu:
${question || "Soru fotoğrafta bulunmaktadır."}
`;

    const contents = [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ];

    // Fotoğraf gönderildiyse Gemini'ye görüntüyü de gönder
    if (image) {
      const match = image.match(
        /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
      );

      if (!match) {
        return res.status(400).json({
          success: false,
          error: "Fotoğraf formatı geçersiz."
        });
      }

      const mimeType = match[1];
      const base64Data = match[2];

      contents[0].parts.push({
        inlineData: {
          mimeType,
          data: base64Data
        }
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents
        })
      }
    );

    const raw = await response.text();

    let result;

    try {
      result = JSON.parse(raw);
    } catch {
      return res.status(502).json({
        success: false,
        error: "Yapay zeka servisinden geçersiz yanıt geldi."
      });
    }

    if (!response.ok) {
      console.error("Gemini API Error:", result);

      return res.status(response.status).json({
        success: false,
        error:
          result?.error?.message ||
          "Yapay zeka servisi hata verdi."
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
        error: "Yapay zekadan cevap alınamadı."
      });
    }

    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("SOLVE ERROR:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Soru çözülürken sunucu hatası oluştu."
    });
  }
}
