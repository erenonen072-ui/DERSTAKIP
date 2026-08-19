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

    const message = String(body.message || "").trim();
    const history = Array.isArray(body.history)
      ? body.history
      : [];

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Mesaj boş olamaz."
      });
    }

    const systemPrompt = `
Sen "DersTakip Akıllı Ders Koçu" adlı yapay zeka eğitim asistanısın.

Öğrencilerle Türkçe konuş.

AMAÇ:
Öğrenciye ders çalışırken yardımcı olmak, sorularını cevaplamak,
konuları öğretmek ve gerektiğinde sohbet etmektir.

KURALLAR:

- Türkçe konuş.
- Çok doğal ve arkadaşça ol.
- Öğrencinin yaşına uygun, kolay anlaşılır bir dil kullan.
- Öğrenci bir ders sorusu sorarsa gerçekten öğret.
- Matematikte işlemleri adım adım göster.
- Fen, Türkçe, sosyal bilgiler, İngilizce ve diğer derslerde
  konuyu örneklerle açıkla.
- Öğrenci "anlamadım" derse aynı şeyi daha basit şekilde anlat.
- Öğrenci isterse örnek soru hazırla.
- Öğrenci isterse mini test yap.
- Öğrenci yanlış cevap verirse neden yanlış olduğunu açıkla.
- Gereksiz uzun cevaplar verme.
- Fakat öğrenci detay isterse ayrıntılı anlat.
- Bilmediğin bilgiyi uydurma.
- Emin olmadığın bilgiyi kesinmiş gibi söyleme.
- Öğrenci normal bir soru sorarsa normal şekilde cevapla.
- Öğrenci sohbet etmek isterse doğal şekilde sohbet et.
- Öğrenci ders çalışma planı isterse uygulanabilir bir plan hazırla.
- Sınav tarihi verilirse buna göre çalışma önerisi yap.
- Öğrenci bir sorunun cevabını isterse yalnızca cevabı vermek yerine
  mümkün olduğunca nasıl çözüldüğünü de anlat.
- Öğrenciyi küçümseme.
- Aşırı resmi konuşma.
- Gereksiz "Merhaba, ben yapay zeka..." gibi girişler yapma.
- Cevabın doğrudan öğrencinin mesajına cevap versin.

ÖNEMLİ:
Sen sadece soru çözen bir sistem değilsin.
Sen öğrencinin sohbet edebileceği gerçek bir ders koçusun.

Örneğin öğrenci:
"Bugün hiç ders çalışasım yok."

dediğinde matematik çözmeye çalışma.
Motivasyon ver ve küçük bir çalışma önerisi sun.

Örneğin öğrenci:
"Kesirleri anlamıyorum."

dediğinde konuyu en basit seviyeden anlat.

Örneğin öğrenci:
"Bana 5 tane matematik sorusu sor."

dediğinde 5 soru hazırla.

Örneğin öğrenci:
"2x + 5 = 17"

dediğinde işlemleri göstererek çöz.

Her zaman öğrencinin son mesajını dikkate al.
`;

    const contents = [];

    contents.push({
      role: "user",
      parts: [
        {
          text: systemPrompt
        }
      ]
    });

    for (const item of history.slice(-20)) {
      if (
        !item ||
        !item.role ||
        !item.text
      ) {
        continue;
      }

      contents.push({
        role:
          item.role === "assistant"
            ? "model"
            : "user",
        parts: [
          {
            text: String(item.text)
          }
        ]
      });
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: message
        }
      ]
    });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: contents
        })
      }
    );

    const rawText = await response.text();

    console.log(
      "Coach Gemini status:",
      response.status
    );

    console.log(
      "Coach Gemini response:",
      rawText
    );

    let result;

    try {
      result = JSON.parse(rawText);
    } catch (error) {
      return res.status(502).json({
        success: false,
        error:
          "Gemini geçerli bir JSON yanıtı vermedi."
      });
    }

    if (!response.ok) {
      console.error(
        "Coach Gemini API Error:",
        result
      );

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
        error:
          "Akıllı Ders Koçu cevap oluşturamadı."
      });
    }

    return res.status(200).json({
      success: true,
      answer: answer
    });

  } catch (error) {
    console.error(
      "COACH ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Akıllı Ders Koçu çalışırken sunucu hatası oluştu."
    });
  }
}
