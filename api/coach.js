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
        error: "GEMINI_API_KEY Vercel Environment Variables içinde bulunamadı."
      });
    }

    const {
      message,
      history = [],
      userName = "Öğrenci"
    } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Mesaj boş olamaz."
      });
    }

    const contents = [
      ...history.slice(-12).map(item => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: String(item.text || "")
          }
        ]
      })),
      {
        role: "user",
        parts: [
          {
            text: message.trim()
          }
        ]
      }
    ];

    const prompt = `
Sen DersTakip uygulamasının yapay zekâ Ders Koçusun.

Öğrencinin adı: ${userName}

Görevin:
- Öğrenciyle doğal bir şekilde konuş.
- Her mesaja aynı cevabı verme.
- Öğrencinin yazdığı mesaja doğrudan cevap ver.
- Ders çalışma, sınav, ödev, motivasyon ve planlama konusunda yardımcı ol.
- Öğrenci soru sorarsa sorusuna cevap ver.
- Öğrenci "merhaba" derse merhaba de.
- Öğrenci "nasılsın" derse doğal cevap ver.
- Öğrenci moralinin bozuk olduğunu söylerse destekleyici ol.
- Gereksiz yere sürekli "25 dakika çalış" deme.
- Her cevapta aynı kalıpları kullanma.
- Cevapları Türkçe ver.
- Ortaokul/lise öğrencisinin kolay anlayacağı bir dil kullan.
- Çok uzun cevaplar verme.
- Gerektiğinde madde işaretleri kullan.
- Matematik gibi ders sorularında çözümü anlaşılır şekilde göster.
- Bilmediğin bir konuda kesinmiş gibi davranma.

Önemli:
Öğrencinin mesajının bağlamını dikkate al.
Önceki mesajları kullanarak konuşmanın devamlılığını koru.

Öğrenci mesajı:
${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: prompt
              }
            ]
          },
          contents,
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 700
          }
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
        error: "Gemini geçerli JSON döndürmedi."
      });
    }

    if (!response.ok) {
      console.error("Gemini API:", result);

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
      return res.status(502).json({
        success: false,
        error: "Yapay zekadan cevap alınamadı."
      });
    }

    return res.status(200).json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("COACH ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Ders Koçu sunucu hatası."
    });
  }
}
