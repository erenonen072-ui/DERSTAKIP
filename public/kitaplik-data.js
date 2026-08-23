/* =========================================================
   DERS TAKİP — KİTAPLIK VERİLERİ
   5-12. SINIF
   2026-2027 MÜFREDAT YAPISI
   kitaplik.js ile uyumludur.
   ========================================================= */

(function () {
    "use strict";

    const DATA = {};

    /* =====================================================
       YARDIMCI
    ===================================================== */

    function slug(text) {
        return String(text)
            .toLocaleLowerCase("tr-TR")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function soru(soru, secenekler, cevap) {
        return {
            soru,
            secenekler,
            cevap
        };
    }

    function konu(
        id,
        ad,
        giris,
        anlatim,
        temelBilgi,
        ornekler,
        dikkat,
        ozet,
        test
    ) {
        return {
            id,
            ad,
            giris,
            anlatim,
            temelBilgi,
            ornekler,
            dikkat,
            ozet,
            test
        };
    }

    function otomatikKonu(sinif, ders, ad, index) {
        const id =
            slug(
                String(sinif) +
                "-" +
                ders +
                "-" +
                ad
            );

        return konu(
            id,
            ad,

            `Bu bölüm ${sinif}. sınıf ${ders} dersi kapsamında "${ad}" konusuna odaklanır.`,

            `
                <h3>📖 Konuya Genel Bakış</h3>

                <p>
                    <strong>${ad}</strong>, ${sinif}. sınıf
                    ${ders} dersi içinde ele alınan önemli
                    öğrenme alanlarından biridir.
                </p>

                <p>
                    Bu bölümde konunun temel kavramlarını
                    tanımak, aralarındaki ilişkileri kurmak,
                    örnekler üzerinden düşünmek ve öğrendiğin
                    bilgileri problem durumlarında kullanmak
                    hedeflenir.
                </p>

                <h3>🎯 Bu Konuda Ne Öğreneceksin?</h3>

                <ul>
                    <li>${ad} ile ilgili temel kavramları tanımayı</li>
                    <li>Temel bilgileri örneklerle ilişkilendirmeyi</li>
                    <li>Öğrendiklerini günlük yaşamla bağdaştırmayı</li>
                    <li>Soru ve problem çözme becerilerini geliştirmeyi</li>
                </ul>

                <h3>🧠 Çalışma Önerisi</h3>

                <p>
                    Önce temel kavramları öğren.
                    Daha sonra örnekleri incele ve son olarak
                    mini testi çöz. Yanlış yaptığın sorularda
                    konu anlatımına geri dön.
                </p>
            `,

            [
                `${ad} konusunun temel kavramlarını öğren.`,
                `Konuyla ilgili verilen örnekleri dikkatlice incele.`,
                `Bilgileri başka durumlara uygulamaya çalış.`,
                `Testte yaptığın yanlışları tekrar et.`
            ],

            [
                {
                    soru: `${ad} konusu çalışılırken ilk olarak ne yapılmalıdır?`,
                    cozum:
                        "Öncelikle konunun temel kavramları ve ana fikirleri anlaşılmalıdır."
                },
                {
                    soru: `${ad} konusunu öğrenmenin etkili yollarından biri nedir?`,
                    cozum:
                        "Kavramları örneklerle ilişkilendirmek ve ardından soru çözmek etkili bir yöntemdir."
                }
            ],

            `
                Bu konuda özellikle kavramların anlamını
                ezberlemek yerine aralarındaki ilişkiyi anlamaya
                dikkat et.
            `,

            `
                ${ad} konusu;
                temel bilgileri öğrenme,
                örneklerle pekiştirme,
                uygulama yapma ve
                test çözme aşamalarıyla çalışılabilir.
            `,

            [
                soru(
                    `${ad} konusu için en uygun çalışma sırası hangisidir?`,
                    [
                        "Temel bilgi → Örnek → Uygulama → Test",
                        "Test → Konu → Hiç tekrar yapmama",
                        "Sadece ezberleme",
                        "Sadece video izleme"
                    ],
                    0
                ),
                soru(
                    `${ad} konusunda öğrenmenin kalıcı olması için hangisi daha uygundur?`,
                    [
                        "Öğrendiklerini uygulamak",
                        "Hiç soru çözmemek",
                        "Sadece başlığı okumak",
                        "Konuyu atlamak"
                    ],
                    0
                ),
                soru(
                    `${ad} çalışırken yanlış yapılan sorular için ne yapılmalıdır?`,
                    [
                        "Yanlışları inceleyip konuyu tekrar etmek",
                        "Soruyu tamamen unutmak",
                        "Konuyu bırakmak",
                        "Cevabı ezberleyip geçmek"
                    ],
                    0
                )
            ]
        );
    }

    function ders(ad, icon, konular) {
        return {
            ad,
            icon,
            konular
        };
    }

    function sinif(ad, dersler) {
        return {
            ad,
            dersler
        };
    }

    function ekleSinif(numara, ad, dersTanimi) {
        const dersler = {};

        Object.keys(dersTanimi).forEach(function (key) {
            const item = dersTanimi[key];

            dersler[key] = ders(
                item.ad,
                item.icon,
                item.konular.map(function (konuAd, index) {
                    return otomatikKonu(
                        numara,
                        item.ad,
                        konuAd,
                        index
                    );
                })
            );
        });

        DATA[String(numara)] =
            sinif(ad, dersler);
    }

    /* =====================================================
       5. SINIF
       ===================================================== */

    ekleSinif(
        5,
        "5. Sınıf",
        {

            turkce: {
                ad: "Türkçe",
                icon: "📚",
                konular: [
                    "Oyun Dünyası",
                    "Atatürk'ü Tanımak",
                    "Duygularımı Tanıyorum",
                    "Geleneklerimiz",
                    "İletişim ve Sosyal İlişkiler",
                    "Sağlıklı Yaşıyorum"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Sayılar ve Nicelikler (1)",
                    "Sayılar ve Nicelikler (2)",
                    "İşlemlerle Cebirsel Düşünme",
                    "Geometrik Şekiller",
                    "Geometrik Nicelikler",
                    "İstatistiksel Araştırma Süreci",
                    "Veriden Olasılığa"
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    "Gökyüzündeki Komşularımız ve Biz",
                    "Kuvveti Tanıyalım",
                    "Canlıların Yapısına Yolculuk",
                    "Işığın Dünyası",
                    "Maddenin Doğası",
                    "Yaşamımızdaki Elektrik",
                    "Sürdürülebilir Yaşam ve Geri Dönüşüm"
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    "Birlikte Yaşamak",
                    "Evimiz Dünya",
                    "Ortak Mirasımız",
                    "Yaşayan Demokrasimiz",
                    "Hayatımızdaki Ekonomi",
                    "Teknoloji ve Sosyal Bilimler"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Allah İnancı ve İnsan",
                    "Namaz",
                    "Kur'an-ı Kerim ve Temel Değerler",
                    "Peygamberimiz Hz. Muhammed",
                    "Medeniyetimize Yön Verenler"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Personal Life",
                    "Classroom Life",
                    "Family Life",
                    "Daily Life",
                    "Health",
                    "Places",
                    "Weather",
                    "Hobbies"
                ]
            }

        }
    );

    /* =====================================================
       6. SINIF
       ===================================================== */

    ekleSinif(
        6,
        "6. Sınıf",
        {

            turkce: {
                ad: "Türkçe",
                icon: "📚",
                konular: [
                    "Dilimizin Zenginliği",
                    "Bağımsızlık Yolu",
                    "Farklı Dünyalar",
                    "İletişim ve Sosyal İlişkiler",
                    "Bilim ve Teknoloji",
                    "Lider Ruhlar"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Sayılar ve Nicelikler",
                    "İşlemlerle Cebirsel Düşünme",
                    "Geometrik Şekiller",
                    "Geometrik Nicelikler",
                    "İstatistiksel Araştırma Süreci",
                    "Veriden Olasılığa"
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    "Güneş Sistemi ve Tutulmalar",
                    "Kuvvetin Etkisinde Hareket",
                    "Canlılarda Sistemler",
                    "Işığın Yansıması ve Renkler",
                    "Maddenin Ayırt Edici Özellikleri",
                    "Elektriğin İletimi ve Direnç",
                    "Sürdürülebilir Yaşam ve Etkileşim"
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    "Birlikte Yaşamak",
                    "Evimiz Dünya",
                    "Ortak Mirasımız",
                    "Yaşayan Demokrasimiz",
                    "Hayatımızdaki Ekonomi",
                    "Teknoloji ve Sosyal Bilimler"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Peygamber ve İlahi Mesaj",
                    "Namaz",
                    "Ahlaki Davranışlar",
                    "Vahyin Gönderiliş Amacı",
                    "İslam Medeniyeti"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Life",
                    "Yummy Breakfast",
                    "Downtown",
                    "Weather and Emotions",
                    "At the Fair",
                    "Occupations",
                    "Holidays",
                    "Bookworms"
                ]
            }

        }
    );

    /* =====================================================
       7. SINIF
       ===================================================== */

    ekleSinif(
        7,
        "7. Sınıf",
        {

            turkce: {
                ad: "Türkçe",
                icon: "📚",
                konular: [
                    "Hayat Boyu Gelişim",
                    "Bir Hilal Uğruna",
                    "İletişim ve Sosyal İlişkiler",
                    "Türk Sanatı",
                    "Okuma Kültürü",
                    "Hak ve Sorumluluklar"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Sayılar ve İşlemler",
                    "Cebirsel Düşünme",
                    "Geometrik Şekiller",
                    "Geometrik Nicelikler",
                    "İstatistiksel Araştırma",
                    "Veriden Olasılığa"
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    "Uzay Çağı",
                    "Kuvvet ve Enerjiyi Keşfedelim",
                    "Vücudumuzdaki Sistemler",
                    "Işığın Kırılması ve Mercekler",
                    "Maddenin Doğasına Yolculuk",
                    "Elektriklenme",
                    "Sürdürülebilir Yaşam ve Enerji"
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    "Birey ve Toplum",
                    "Kültür ve Miras",
                    "İnsanlar, Yerler ve Çevreler",
                    "Bilim, Teknoloji ve Toplum",
                    "Üretim, Dağıtım ve Tüketim",
                    "Etkin Vatandaşlık",
                    "Küresel Bağlantılar"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Melek ve Ahiret İnancı",
                    "Hac ve Kurban",
                    "Ahlaki Davranışlar",
                    "Allah'ın Kulu ve Elçisi Hz. Muhammed",
                    "İslam Düşüncesinde Yorumlar"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Appearance and Personality",
                    "Sports",
                    "Biographies",
                    "Wild Animals",
                    "Television",
                    "Celebrations",
                    "Dreams",
                    "Public Buildings",
                    "Environment",
                    "Planets"
                ]
            }

        }
    );

    /* =====================================================
       8. SINIF
       ===================================================== */

    ekleSinif(
        8,
        "8. Sınıf",
        {

            turkce: {
                ad: "Türkçe",
                icon: "📚",
                konular: [
                    "İletişim ve Sosyal İlişkiler",
                    "Vatan Sevgisi",
                    "Doğa ve İnsan",
                    "Türk Hikâye Geleneği ve Destanları",
                    "Sanat ve Estetik",
                    "Akademik Düşünme Dünyası"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Sayılar",
                    "Cebir",
                    "Geometri",
                    "Veri ve Olasılık",
                    "Eşlik ve Benzerlik",
                    "Dönüşüm Geometrisi"
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    "Mevsimler ve İklim",
                    "DNA ve Genetik Kod",
                    "Basınç",
                    "Madde ve Endüstri",
                    "Basit Makineler",
                    "Enerji Dönüşümleri ve Çevre Bilimi",
                    "Elektrik Yükleri ve Elektrik Enerjisi"
                ]
            },

            inkilap: {
                ad: "T.C. İnkılap Tarihi ve Atatürkçülük",
                icon: "🇹🇷",
                konular: [
                    "Bir Kahraman Doğuyor",
                    "Millî Uyanış",
                    "Millî Bir Destan",
                    "Atatürkçülük ve Çağdaşlaşan Türkiye",
                    "Demokratikleşme Çabaları",
                    "Atatürk Dönemi Türk Dış Politikası",
                    "Atatürk'ün Ölümü ve Sonrası"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Kader İnancı",
                    "Zekât ve Sadaka",
                    "Din ve Hayat",
                    "Hz. Muhammed'in Örnekliği",
                    "Kur'an-ı Kerim ve Özellikleri"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Friendship",
                    "Teen Life",
                    "In the Kitchen",
                    "On the Phone",
                    "The Internet",
                    "Adventures",
                    "Tourism",
                    "Chores",
                    "Science",
                    "Natural Forces"
                ]
            }

        }
    );

    /* =====================================================
       9. SINIF
       TÜRKİYE YÜZYILI MAARİF MODELİ
       ===================================================== */

    ekleSinif(
        9,
        "9. Sınıf",
        {

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📖",
                konular: [
                    "Sözün Ezgisi",
                    "Anlam Arayışı",
                    "Anlamın Yapı Taşları",
                    "Dilin Zenginliği",
                    "İletişim ve Sanat",
                    "Sanatın Gücü"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Sayılar",
                    "Nicelikler ve Değişimler",
                    "Geometrik Şekiller",
                    "Eşlik ve Benzerlik",
                    "Algoritma ve Bilişim",
                    "İstatistiksel Araştırma Süreci",
                    "Veriden Olasılığa"
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [
                    "Fizik Bilimi ve Kariyer Keşfi",
                    "Kuvvet ve Hareket",
                    "Akışkanlar",
                    "Enerji",
                    "Isı ve Sıcaklık"
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: [
                    "Etkileşim",
                    "Çeşitlilik",
                    "Sürdürülebilirlik"
                ]
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: [
                    "Yaşam",
                    "Organizasyon"
                ]
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: [
                    "Geçmişin İnşa Sürecinde Tarih",
                    "Eski Çağ Medeniyetleri",
                    "Orta Çağ Medeniyetleri",
                    "Türklerin Tarih Sahnesine Çıkışı"
                ]
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: [
                    "Coğrafyanın Doğası",
                    "Mekânsal Bilgi Teknolojileri",
                    "Doğal Sistemler ve Süreçler",
                    "Beşerî Sistemler ve Süreçler",
                    "Ekonomik Faaliyetler ve Etkileşim",
                    "Afetler ve Sürdürülebilir Çevre"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Allah-İnsan İlişkisi",
                    "İslam'da İnanç Esasları",
                    "İslam'ın İbadetleri",
                    "İslam Ahlakı",
                    "Kur'an-ı Kerim'den Mesajlar"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "School Life and Education",
                    "Classroom Life",
                    "Personal Life",
                    "Family and Society",
                    "Life in the City",
                    "Nature and Environment",
                    "Culture and Heritage"
                ]
            }

        }
    );

    /* =====================================================
       10. SINIF
       ===================================================== */

    ekleSinif(
        10,
        "10. Sınıf",
        {

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📖",
                konular: [
                    "Sözün Ezgisi",
                    "Anlam Arayışı",
                    "Dilin Zenginliği",
                    "Dönem ve Türler",
                    "Edebiyat ve Toplum",
                    "Edebiyat ve Sanat"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Geometrik Şekiller",
                    "İstatistiksel Araştırma Süreci",
                    "Sayılar",
                    "Nicelikler ve Değişimler",
                    "Sayma, Algoritma ve Bilişim",
                    "Analitik İnceleme",
                    "Veriden Olasılığa"
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [
                    "Kuvvet ve Hareket",
                    "Elektrik",
                    "Dalgalar",
                    "Optik",
                    "Enerji"
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: [
                    "Etkileşim",
                    "Çeşitlilik",
                    "Sürdürülebilirlik"
                ]
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: [
                    "Enerji",
                    "Ekoloji"
                ]
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: [
                    "Türkistan'dan Türkiye'ye",
                    "Beylikten Devlete Osmanlı",
                    "Dünya Gücü Osmanlı",
                    "Değişen Dünya Dengeleri",
                    "Osmanlı Kültür ve Medeniyeti"
                ]
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: [
                    "Doğal Sistemler",
                    "Beşerî Sistemler",
                    "Ekonomik Faaliyetler",
                    "Afetler",
                    "Bölgeler ve Ülkeler",
                    "Çevre ve Toplum"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "Allah-İnsan İlişkisi",
                    "İslam'ın Evrensel Mesajları",
                    "İslam'da İbadetler",
                    "Ahlaki Tutum ve Davranışlar",
                    "Kur'an'dan Mesajlar"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "School Life",
                    "Plans",
                    "Legendary Figures",
                    "Traditions",
                    "Travel",
                    "Helpful Tips",
                    "Food and Culture",
                    "Digital World"
                ]
            }

        }
    );

    /* =====================================================
       11. SINIF
       ===================================================== */

    ekleSinif(
        11,
        "11. Sınıf",
        {

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📖",
                konular: [
                    "Sözün Ezgisi",
                    "Anlam Arayışı",
                    "Dilin Zenginliği",
                    "Edebî Akımlar",
                    "Edebiyat ve Toplum",
                    "Edebiyat ve Dünya"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "İstatistiksel Araştırma Süreci",
                    "Nicelikler ve Değişimler",
                    "Geometrik Şekiller",
                    "Değişimin Matematiği",
                    "Veriden Olasılığa"
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [
                    "Kuvvet ve Hareket",
                    "Elektrik ve Manyetizma",
                    "Dalgalar",
                    "Optik",
                    "Enerji"
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: [
                    "Etkileşim",
                    "Çeşitlilik",
                    "Sürdürülebilirlik"
                ]
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: [
                    "Tepki",
                    "Homeostazi"
                ]
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: [
                    "Osmanlı Devleti'nde Değişim",
                    "Uluslararası İlişkilerde Denge",
                    "Millî Mücadele",
                    "Atatürkçülük ve Türk İnkılabı",
                    "Cumhuriyet Dönemi"
                ]
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: [
                    "Doğal Sistemler",
                    "Beşerî Sistemler",
                    "Ekonomik Faaliyetler",
                    "Küresel Ortam",
                    "Çevre ve Toplum"
                ]
            },

            felsefe: {
                ad: "Felsefe",
                icon: "🧠",
                konular: [
                    "Felsefi Düşünce",
                    "Bilgi Felsefesi",
                    "Bilim Felsefesi",
                    "Ahlak Felsefesi",
                    "Sanat Felsefesi",
                    "Siyaset Felsefesi",
                    "Din Felsefesi"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "İnanç ve İbadet",
                    "Ahlak ve Değerler",
                    "Din ve Hayat",
                    "İslam Düşüncesinde Yorumlar",
                    "Kur'an'dan Mesajlar"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Future Jobs",
                    "Hobbies and Skills",
                    "Hard Times",
                    "What a Life",
                    "Back to the Past",
                    "Open Your Heart",
                    "Facts About Turkey",
                    "Sports"
                ]
            }

        }
    );

    /* =====================================================
       12. SINIF
       ===================================================== */

    ekleSinif(
        12,
        "12. Sınıf",
        {

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📖",
                konular: [
                    "Sözün Ezgisi",
                    "Anlam Arayışı",
                    "Dilin Zenginliği",
                    "Edebiyat ve Toplum",
                    "Edebiyat ve Dünya",
                    "Edebiyat ve Sanat"
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    "Nicelikler ve Değişimler (1)",
                    "Nicelikler ve Değişimler (2)",
                    "Geometrik Şekiller",
                    "Geometrik Cisimler",
                    "Değişimin Matematiği (1)",
                    "Değişimin Matematiği (2)",
                    "Değişimin Matematiği (3)",
                    "Hazır Veriler Üzerinde Çalışma"
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [
                    "Kuvvet ve Hareket",
                    "Elektrik ve Manyetizma",
                    "Dalgalar",
                    "Optik",
                    "Modern Fizik",
                    "Enerji"
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: [
                    "Etkileşim",
                    "Çeşitlilik",
                    "Sürdürülebilirlik"
                ]
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: [
                    "Üreme",
                    "Gen"
                ]
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: [
                    "20. Yüzyıl Başlarında Dünya",
                    "Millî Mücadele",
                    "Atatürkçülük ve Türk İnkılabı",
                    "İki Savaş Arası Dönemde Türkiye ve Dünya",
                    "II. Dünya Savaşı",
                    "II. Dünya Savaşı Sonrasında Türkiye ve Dünya",
                    "21. Yüzyılın Eşiğinde Türkiye ve Dünya"
                ]
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: [
                    "Doğal Sistemler",
                    "Beşerî Sistemler",
                    "Ekonomik Faaliyetler",
                    "Küresel Ortam",
                    "Çevre ve Toplum"
                ]
            },

            felsefe: {
                ad: "Felsefe",
                icon: "🧠",
                konular: [
                    "Felsefi Düşüncenin Özellikleri",
                    "Bilgi Felsefesi",
                    "Bilim Felsefesi",
                    "Varlık Felsefesi",
                    "Ahlak Felsefesi",
                    "Sanat Felsefesi",
                    "Siyaset Felsefesi",
                    "Din Felsefesi"
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    "İnanç ve İbadet",
                    "Ahlak ve Değerler",
                    "Din ve Hayat",
                    "İslam Düşüncesinde Yorumlar",
                    "Kur'an'dan Mesajlar"
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    "Music",
                    "Friendship",
                    "Human Rights",
                    "Family Life",
                    "Environment",
                    "Technology",
                    "Culture",
                    "Career"
                ]
            }

        }
    );

    /* =====================================================
       GLOBAL
       ===================================================== */

    window.kitaplikData = DATA;

})();
