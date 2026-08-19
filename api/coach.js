export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      error: "Sadece POST isteği kabul edilir."
    });

  }

  try {

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {

      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY bulunamadı."
      });

    }


    const body =
      req.body || {};


    const message =
      String(
        body.message || ""
      ).trim();


    const history =
      Array.isArray(body.history)
        ? body.history
        : [];


    const student =
      body.user || null;


    const data =
      body.data || {};


    if (!message) {

      return res.status(400).json({
        success: false,
        error: "Mesaj boş olamaz."
      });

    }


    /*
      ============================
      DERS KOÇU KİŞİLİĞİ
      ============================
    */

    const systemPrompt = `

Sen DersTakip uygulamasının
yapay zeka destekli Ders Koçusun.

Öğrencilerle doğal, samimi ve yardımcı
bir şekilde konuş.

ÇOK ÖNEMLİ KURALLAR:

1. Her mesaja aynı cevabı verme.

2. Öğrencinin söylediği şeyi gerçekten analiz et.

3. Önceki konuşmaları dikkate al.

4. Öğrencinin mevcut görevlerini,
   sınavlarını, derslerini ve XP'sini
   gerektiğinde kullan.

5. Gereksiz şekilde aynı motivasyon
   cümlelerini tekrar etme.

6. Her cevabın sonunda sürekli
   "Başka bir şey ister misin?"
   yazma.

7. Türkçe cevap ver.

8. Öğrencinin seviyesine uygun,
   kolay anlaşılır bir dil kullan.

9. Gerektiğinde örnek ver.

10. Matematik sorularında işlemleri
    anlaşılır şekilde açıkla.

11. Ders çalışma planı istenirse
    uygulanabilir bir plan hazırla.

12. Sınav yaklaşmışsa kalan zamana
    göre gerçekçi çalışma öner.

13. Öğrenci "bugün ne çalışayım?"
    derse mevcut sınav ve görevlerine
    göre öneri yap.

14. Öğrenci motivasyonsuzsa sürekli
    aynı "küçük adım" cümlesini kullanma.
    Önce neden zorlandığını anlamaya çalış.

15. Öğrenci bir konuda yanlış düşünüyorsa
    nazikçe düzelt.

16. Bilmediğin bir bilgiyi kesinmiş gibi
    söyleme.

17. Çok uzun cevaplar verme.
    Gerektiğinde maddeler kullan.

18. Öğrencinin kişisel bilgilerini
    gereksiz yere tekrar etme.

19. Ders Koçu bir öğretmen yardımcısı gibi
    davranmalı; öğrencinin yerine ödev
    yapmaya çalışmak yerine anlamasına
    yardımcı olmalı.

20. Konuşma doğal olmalı.

ÖĞRENCİ:

Ad:
${student?.name || "Öğrenci"}

TOPLAM XP:
${data.xp || 0}

SEVİYE:
${Math.floor((data.xp || 0) / 100) + 1}

ÇALIŞMA SERİSİ:
${data.streak || 0} gün

TAMAMLANAN GÖREV:
${data.completed || 0}

GÖREVLER:
${JSON.stringify(data.tasks || [])}

DERSLER:
${JSON.stringify(data.subjects || [])}

SINAVLAR:
${JSON.stringify(data.exams || [])}

NOTLAR:
${JSON.stringify(data.notes || [])}

`;


    /*
      ============================
      GEMINI MESAJLARI
      ============================
    */

    const contents = [];


    /*
      Sistem talimatını ilk kullanıcı
      mesajı olarak gönderiyoruz.
    */

    contents.push({

      role: "user",

      parts: [
        {
          text: systemPrompt
        }
      ]

    });


    /*
      Önceki konuşmalar
    */

    for (
      const item of history.slice(-10)
    ) {

      if (
        !item ||
        !item.content
      ) {
        continue;
      }


      const role =
        item.role === "assistant"
          ? "model"
          : "user";


      contents.push({

        role,

        parts: [
          {
            text:
              String(
                item.content
              )
          }
        ]

      });

    }


    /*
      Yeni kullanıcı mesajı
    */

    contents.push({

      role: "user",

      parts: [
        {
          text: message
        }
      ]

    });


    /*
      ============================
      GEMINI API
      ============================
    */

    const response =
      await fetch(

        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            contents,

            generationConfig: {

              temperature: 0.8,

              topP: 0.9,

              maxOutputTokens: 1200

            }

          })

        }

      );


    const result =
      await response.json();


    /*
      Gemini hata verdi
    */

    if (!response.ok) {

      console.error(
        "GEMINI COACH ERROR:",
        result
      );


      return res
        .status(
          response.status
        )
        .json({

          success: false,

          error:
            result?.error?.message ||
            "Gemini API hatası."

        });

    }


    /*
      Cevabı çıkar
    */

    const answer =
      result
        ?.candidates?.[0]
        ?.content?.parts
        ?.map(
          part =>
            part.text || ""
        )
        .join("")
        .trim();


    if (!answer) {

      return res.status(500).json({

        success: false,

        error:
          "Yapay zekadan cevap alınamadı."

      });

    }


    /*
      BAŞARILI
    */

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
        error.message ||
        "Ders Koçu sunucu hatası."

    });

  }

}
