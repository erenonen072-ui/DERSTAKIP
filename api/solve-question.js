const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Sadece POST isteği kabul edilir."
    });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OPENAI_API_KEY Vercel'de ayarlanmamış."
      });
    }

    const {
      image,
      question,
      subject,
      mode
    } = req.body || {};

    if (!image && !question) {
      return res.status(400).json({
        success: false,
        error: "Soru fotoğrafı veya soru metni gerekli."
      });
    }

    const content = [
      {
        type: "input_text",
        text: `
Sen DersTakip uygulamasının yapay zeka ders koçusun.

Öğrencinin sorusunu çöz.

Ders: ${subject || "Belirtilmemiş"}
Anlatım şekli: ${mode || "Adım adım"}

Kurallar:
- Soruyu dikkatlice oku.
- İşlemleri kontrol et.
- Cevabı tahmin etme.
- Öğrencinin anlayacağı Türkçe kullan.
- Çözümü adım adım göster.
- En sonunda doğru cevabı açıkça yaz.
- Fotoğraf okunmuyorsa bunu söyle.
- Birden fazla soru varsa ayrı ayrı çöz.

Yanıt formatı:

SORU
Sorunun kısa özeti.

ÇÖZÜM
Adım adım çözüm.

CEVAP
Doğru cevap.

İPUCU
Benzer sorular için kısa ipucu.
`
      }
    ];

    if (question && question.trim()) {
      content.push({
        type: "input_text",
        text: `Öğrencinin yazdığı soru:\n${question}`
      });
    }

    if (image) {
      if (!image.startsWith("data:image/")) {
        return res.status(400).json({
          success: false,
          error: "Geçersiz görsel."
        });
      }

      content.push({
        type: "input_image",
        image_url: image,
        detail: "high"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6",
      input: [
        {
          role: "user",
          content
        }
      ]
    });

    const answer = response.output_text || "";

    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Yapay zeka soruyu çözerken hata oluştu."
    });
  }
};
