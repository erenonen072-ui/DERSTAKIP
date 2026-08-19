export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success:false,
      error:"Sadece POST isteği kabul edilir."
    });

  }

  try {

    const apiKey =
      process.env.GEMINI_API_KEY;


    if (!apiKey) {

      return res.status(500).json({
        success:false,
        error:"GEMINI_API_KEY Vercel Environment Variables içinde bulunamadı."
      });

    }


    const {
      message,
      history,
      student
    } = req.body || {};


    if (!message) {

      return res.status(400).json({
        success:false,
        error:"Mesaj boş olamaz."
      });

    }


    const previousMessages =
      Array.isArray(history)
        ? history.slice(-12)
        : [];


    const conversation =
      previousMessages
        .map(item => {

          const role =
            item.role === "user"
              ? "Öğrenci"
              : "Ders Koçu";

          return `${role}: ${item.content}`;

        })
        .join("\n");


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


    const prompt = `

Sen "DersTakip" adlı öğrenci takip uygulamasının
yapay zeka Ders Koçusun.

Öğrenciyle doğal ve samimi konuş.

ÖNEMLİ KURALLAR:

1. Öğrencinin yazdığı mesaja göre cevap ver.

2. Her mesajda aynı tavsiyeleri tekrar etme.

3. Öğrenci matematik soruyorsa matematik hakkında konuş.

4. Öğrenci motivasyon istiyorsa motivasyon ver.

5. Öğrenci sınav soruyorsa sınav planı oluştur.

6. Öğrenci "merhaba" diyorsa normal şekilde karşılık ver.

7. Öğrenci önceki mesajından bahsediyorsa konuşma geçmişini kullan.

8. Öğrenci bir konu anlamadığını söylüyorsa basit şekilde anlat.

9. Gereksiz uzun cevap verme.

10. Yaşa uygun, anlaşılır Türkçe kullan.

11. Öğrenciye sürekli "25 dakika çalış" deme.

12. Aynı cümleyi tekrar tekrar kullanma.

13. Cevapları mümkün olduğunca öğrencinin mesajına özel oluştur.

14. Matematik, fen, Türkçe, İngilizce gibi derslerde
gerekirse örnek ver.

15. Öğrencinin kişisel bilgilerini isteme.

${studentInfo}

ÖNCEKİ KONUŞMA:

${conversation || "Henüz konuşma yok."}

YENİ ÖĞRENCİ MESAJI:

${message}

Şimdi doğrudan öğrencinin mesajına cevap ver.

`;


    /*
      Gemini API
    */

    const response =
      await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            contents:[

              {
                role:"user",

                parts:[
                  {
                    text:prompt
                  }
                ]
              }

            ],

            generationConfig:{

              temperature:0.8,

              maxOutputTokens:800

            }

          })

        }
      );


    const raw =
      await response.text();


    let data;


    try {

      data =
        JSON.parse(raw);

    } catch {

      return res.status(502).json({

        success:false,

        error:
          "Gemini API geçerli JSON döndürmedi."

      });

    }


    if(!response.ok){

      console.error(
        "GEMINI ERROR:",
        data
      );


      return res.status(
        response.status
      ).json({

        success:false,

        error:
          data?.error?.message ||
          "Gemini API isteği başarısız."

      });

    }


    const answer =
      data
        ?.candidates?.[0]
        ?.content?.parts
        ?.map(
          part => part.text || ""
        )
        .join("")
        .trim();


    if(!answer){

      return res.status(502).json({

        success:false,

        error:
          "Yapay zekadan cevap alınamadı."

      });

    }


    return res.status(200).json({

      success:true,

      answer

    });


  } catch(error) {

    console.error(
      "COACH SERVER ERROR:",
      error
    );


    return res.status(500).json({

      success:false,

      error:
        error.message ||
        "Ders Koçu sunucu hatası."

    });

  }

}
