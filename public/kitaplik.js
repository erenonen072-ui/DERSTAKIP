/*
 * ============================================================
 * DERS TAKİP — DERS KİTAPLIĞI DATA
 * 5 - 12. SINIF
 * ============================================================
 *
 * Kullanım:
 *
 * <script src="kitaplik-data.js"></script>
 * <script src="kitaplik.js"></script>
 *
 * kitaplik.js içerisinden:
 *
 * const data = window.kitaplikData;
 *
 * ============================================================
 */

(function () {
    "use strict";

    /* ========================================================
       KONU OLUŞTURUCU
    ======================================================== */

    function konuOlustur(
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
            id: id,
            ad: ad,

            giris: giris,

            anlatim: anlatim,

            temelBilgi: temelBilgi,

            ornekler: ornekler || [],

            dikkat: dikkat,

            ozet: ozet,

            test: test || [],

            tamamlandi: false
        };
    }


    /* ========================================================
       ÖRNEK KONU
       Ayrıntılı konu anlatımı yapısı
    ======================================================== */

    const dogalSayilar = konuOlustur(

        "5-matematik-dogal-sayilar",

        "Doğal Sayılar",

        `
        Doğal sayılar matematiğin temel yapı taşlarından biridir.
        Günlük hayatta sayma, sıralama ve miktar belirtme gibi
        işlemlerde doğal sayılardan yararlanırız.

        Bu konuda doğal sayıların nasıl yazıldığını, okunduğunu,
        basamak ve basamak değerlerini ve doğal sayılarla yapılan
        temel işlemleri öğreneceğiz.
        `,

        `
        <h3>📖 Doğal Sayı Nedir?</h3>

        <p>
        Sayma işlemlerinde kullandığımız sayılar doğal sayılar olarak
        adlandırılır. 0, 1, 2, 3, 4, 5, ... şeklinde devam eder.
        </p>

        <p>
        Doğal sayılar sonsuzdur. En büyük doğal sayı yoktur.
        Çünkü herhangi bir doğal sayıya 1 eklediğimizde daha büyük
        başka bir doğal sayı elde ederiz.
        </p>

        <h3>🔢 Basamaklar</h3>

        <p>
        Büyük doğal sayıları daha kolay okuyup yazabilmek için
        sayıları basamaklarına ayırırız.
        </p>

        <p>
        Örneğin:
        </p>

        <div class="kitap-ornek">
            4 582
        </div>

        <p>
        Bu sayıda:
        </p>

        <ul>
            <li>2 → birler basamağı</li>
            <li>8 → onlar basamağı</li>
            <li>5 → yüzler basamağı</li>
            <li>4 → binler basamağı</li>
        </ul>

        <h3>💡 Basamak Değeri</h3>

        <p>
        Bir rakamın bulunduğu basamağa göre aldığı değere
        basamak değeri denir.
        </p>

        <p>
        4 582 sayısında 5 rakamı yüzler basamağındadır.
        Bu nedenle basamak değeri:
        </p>

        <div class="kitap-formul">
            5 × 100 = 500
        </div>

        <h3>🧠 Sayı Değeri</h3>

        <p>
        Bir rakamın sayı değeri, bulunduğu basamaktan bağımsız
        olarak rakamın kendisidir.
        </p>

        <p>
        Örneğin 4 582 sayısındaki 5'in sayı değeri 5,
        basamak değeri ise 500'dür.
        </p>

        <h3>➕ Doğal Sayılarla İşlemler</h3>

        <p>
        Doğal sayılarla toplama, çıkarma, çarpma ve bölme işlemleri
        yapılabilir.
        </p>

        <p>
        İşlem yaparken basamakların doğru hizalanması özellikle
        toplama ve çıkarma işlemlerinde önemlidir.
        </p>
        `,

        [
            "Doğal sayılar 0'dan başlar.",
            "En büyük doğal sayı yoktur.",
            "Basamak değeri rakamın bulunduğu basamağa göre değişir.",
            "Sayı değeri rakamın kendisidir."
        ],

        [
            {
                soru: "4 582 sayısında 5 rakamının basamak değeri kaçtır?",
                cozum: `
                5 yüzler basamağındadır.

                5 × 100 = 500

                Cevap: 500
                `
            },

            {
                soru: "3 406 sayısında 4 rakamının basamak değeri nedir?",
                cozum: `
                4 yüzler basamağındadır.

                4 × 100 = 400

                Cevap: 400
                `
            }
        ],

        `
        ⚠️ Basamak değeri ile sayı değerini karıştırma.

        Örneğin 7 325 sayısındaki 3'ün:

        Sayı değeri = 3

        Basamak değeri = 300
        `,

        `
        ⭐ Doğal sayılar 0, 1, 2, 3, ... şeklinde sonsuza kadar
        devam eder.

        ⭐ Rakamın bulunduğu basamak onun basamak değerini belirler.

        ⭐ Sayı değeri ise rakamın kendisidir.

        ⭐ İşlemlerde basamakların doğru hizalanmasına dikkat edilmelidir.
        `,

        [
            {
                soru: "2 735 sayısında 7'nin basamak değeri kaçtır?",
                secenekler: [
                    "7",
                    "70",
                    "700",
                    "7000"
                ],
                cevap: 2
            },

            {
                soru: "Aşağıdakilerden hangisi doğal sayıdır?",
                secenekler: [
                    "-3",
                    "1/2",
                    "8",
                    "2,5"
                ],
                cevap: 2
            }
        ]
    );


    /* ========================================================
       5. SINIF MATEMATİK
    ======================================================== */

    const besMatematik = {

        ad: "Matematik",

        icon: "📐",

        konular: [

            dogalSayilar,

            konuOlustur(
                "5-matematik-islemler",
                "Doğal Sayılarla İşlemler",

                `
                Bu bölümde doğal sayılarla toplama, çıkarma,
                çarpma ve bölme işlemlerini inceleyeceğiz.
                `,

                `
                <h3>➕ Toplama</h3>

                <p>
                Toplama, iki veya daha fazla miktarın bir araya
                getirilmesi anlamına gelir.
                </p>

                <div class="kitap-ornek">
                    245 + 132 = 377
                </div>

                <h3>➖ Çıkarma</h3>

                <p>
                Çıkarma işlemi bir miktardan başka bir miktarı
                ayırmak veya iki miktar arasındaki farkı bulmak
                için kullanılır.
                </p>

                <div class="kitap-ornek">
                    500 - 275 = 225
                </div>

                <h3>✖️ Çarpma</h3>

                <p>
                Çarpma işlemi aynı sayının tekrarlı toplanmasını
                kısa biçimde ifade eder.
                </p>

                <div class="kitap-ornek">
                    4 × 6 = 24
                </div>

                <h3>➗ Bölme</h3>

                <p>
                Bölme, bir miktarı eşit gruplara ayırmak için kullanılır.
                </p>

                <div class="kitap-ornek">
                    24 ÷ 6 = 4
                </div>
                `,

                [
                    "İşlem önceliğine dikkat edilmelidir.",
                    "Çıkarma işleminde büyük sayıdan küçük sayı çıkarılır.",
                    "Bölme işleminde bölünen, bölen ve bölüm kavramları bilinmelidir."
                ],

                [
                    {
                        soru: "245 + 132 işleminin sonucu kaçtır?",
                        cozum: "245 + 132 = 377"
                    },
                    {
                        soru: "500 - 275 işleminin sonucu kaçtır?",
                        cozum: "500 - 275 = 225"
                    }
                ],

                `
                ⚠️ İşlem yaparken basamakları yanlış hizalamamaya dikkat et.
                `,

                `
                ⭐ Toplama birleştirme,
                çıkarma ayırma/fark bulma,
                çarpma tekrarlı toplama,
                bölme ise eşit gruplara ayırma mantığı taşır.
                `,

                [
                    {
                        soru: "25 × 4 kaçtır?",
                        secenekler: ["50", "75", "100", "125"],
                        cevap: 2
                    }
                ]
            ),

            konuOlustur(
                "5-matematik-kesirler",
                "Kesirler",

                `
                Bir bütünün eş parçalarından kaç tanesinin
                alındığını göstermek için kesirlerden yararlanırız.
                `,

                `
                <h3>📖 Kesrin Bölümleri</h3>

                <p>
                Bir kesir iki bölümden oluşur:
                pay ve payda.
                </p>

                <div class="kitap-formul">
                    Pay / Payda
                </div>

                <p>
                Örneğin 3/5 kesrinde 3 pay, 5 ise paydadır.
                </p>

                <h3>💡 Payda Ne Anlatır?</h3>

                <p>
                Payda bütünün kaç eş parçaya ayrıldığını gösterir.
                </p>

                <h3>💡 Pay Ne Anlatır?</h3>

                <p>
                Pay, bu eş parçalardan kaç tanesinin ele alındığını
                gösterir.
                </p>

                <h3>🧩 Örnek</h3>

                <p>
                Bir pasta 8 eş parçaya ayrılmış ve 3 parçası yenmişse
                yenilen kısmı 3/8 ile gösterebiliriz.
                </p>
                `,

                [
                    "Payda 0 olamaz.",
                    "Pay, alınan parça sayısını gösterir.",
                    "Payda, bütünün eş parça sayısını gösterir."
                ],

                [
                    {
                        soru: "5/9 kesrinde pay hangisidir?",
                        cozum: "Pay 5'tir."
                    }
                ],

                `
                ⚠️ Pay ve paydayı yer değiştirmemeye dikkat et.
                `,

                `
                ⭐ Kesirlerde üstteki sayı pay,
                alttaki sayı paydadır.
                `,

                [
                    {
                        soru: "7/10 kesrinde payda kaçtır?",
                        secenekler: ["7", "10", "17", "3"],
                        cevap: 1
                    }
                ]
            ),

            konuOlustur(
                "5-matematik-ondalik",
                "Ondalık Gösterim",

                "Kesirlerin ve bazı ölçümlerin ondalık biçimde ifade edilmesini öğreniriz.",

                `
                <h3>📖 Ondalık Sayılar</h3>

                <p>
                Bir bütünün onda, yüzde veya binde birlik parçalarını
                göstermek için ondalık gösterim kullanılabilir.
                </p>

                <div class="kitap-ornek">
                    0,5
                </div>

                <p>
                Türkçede ondalık gösterimde virgül kullanılır.
                </p>

                <h3>🧩 Örnek</h3>

                <p>
                0,5 sayısı yarımı ifade eder.
                </p>

                <div class="kitap-formul">
                    0,5 = 5/10 = 1/2
                </div>
                `,

                [
                    "Ondalık ayırıcı olarak virgül kullanılır.",
                    "Virgülün sol tarafı tam kısmı gösterir.",
                    "Virgülün sağ tarafı ondalık kısmı gösterir."
                ],

                [
                    {
                        soru: "0,5 hangi kesre eşittir?",
                        cozum: "0,5 = 5/10 = 1/2"
                    }
                ],

                "⚠️ Virgülün yerini değiştirmek sayının değerini değiştirir.",

                "⭐ Ondalık gösterim özellikle ölçme ve günlük hayat problemlerinde sık kullanılır.",

                [
                    {
                        soru: "0,25 aşağıdakilerden hangisine eşittir?",
                        secenekler: ["1/2", "1/3", "1/4", "3/4"],
                        cevap: 2
                    }
                ]
            )
        ]
    };


    /* ========================================================
       DİĞER ORTAOKUL DERSLERİ
       ======================================================== */

    function standartKonular(sinif, ders, ikon, isimler, odak) {

        return {
            ad: ders,
            icon: ikon,

            konular: isimler.map(function (isim, index) {

                return konuOlustur(

                    `${sinif}-${ders}-${index + 1}`,

                    isim,

                    `
                    ${isim} konusuna hoş geldin.

                    Bu bölümde ${odak} ile ilgili temel kavramları,
                    aralarındaki ilişkileri ve günlük hayattaki
                    uygulamalarını inceleyeceğiz.
                    `,

                    `
                    <h3>📖 Konuya Giriş</h3>

                    <p>
                    ${isim}, ${odak} öğrenme alanının önemli
                    başlıklarından biridir.
                    </p>

                    <p>
                    Konuyu öğrenirken önce temel kavramları anlamak,
                    ardından örnekleri incelemek ve son olarak
                    öğrendiklerini uygulamak gerekir.
                    </p>

                    <h3>💡 Temel Bilgi</h3>

                    <p>
                    Bu bölümün temel amacı kavramları ezberlemek yerine
                    aralarındaki ilişkiyi kurabilmektir.
                    </p>

                    <h3>🧠 Nasıl Düşünmelisin?</h3>

                    <p>
                    Bir soru ile karşılaştığında önce verilen bilgileri
                    belirle. Daha sonra sorunun senden ne istediğini
                    açıkça ifade et. Son olarak uygun yöntemle sonuca ulaş.
                    </p>

                    <h3>🧩 Uygulama</h3>

                    <p>
                    Öğrendiğin bilgiyi günlük hayatla ilişkilendirmeye
                    çalış. Bir konuyu kendi cümlelerinle anlatabiliyorsan
                    konunun temel mantığını kavramışsın demektir.
                    </p>
                    `,

                    [
                        `${isim} konusunun temel kavramlarını bil.`,
                        "Kavramların hangi durumda kullanıldığını öğren.",
                        "Örnekleri incele ve benzer soruları kendin çöz."
                    ],

                    [
                        {
                            soru: `${isim} konusunda temel yaklaşım nedir?`,
                            cozum: `
                            Önce verilenler ve istenen belirlenir.
                            Ardından konuyla ilgili uygun kavram veya
                            yöntem seçilir ve sonuç kontrol edilir.
                            `
                        }
                    ],

                    `
                    ⚠️ Sadece ezber yapma.

                    Konunun nedenini ve hangi durumda kullanıldığını
                    anlamaya çalış.
                    `,

                    `
                    ⭐ ${isim} konusunun temel kavramlarını öğren.

                    ⭐ Örnekleri incele.

                    ⭐ Kendi cümlelerinle tekrar et.

                    ⭐ Mini test ile kendini kontrol et.
                    `,

                    [
                        {
                            soru: `${isim} çalışırken en doğru yaklaşım hangisidir?`,
                            secenekler: [
                                "Sadece cevabı ezberlemek",
                                "Konuyu anlamak ve uygulamak",
                                "Soruyu okumadan işlem yapmak",
                                "Yanlışları kontrol etmemek"
                            ],
                            cevap: 1
                        }
                    ]
                );
            })
        };
    }


    /* ========================================================
       SINIFLAR
    ======================================================== */

    const kitaplikData = {

        "5": {
            ad: "5. Sınıf",

            dersler: {

                turkce: standartKonular(
                    5,
                    "Türkçe",
                    "📖",
                    [
                        "Sözcükte Anlam",
                        "Cümlede Anlam",
                        "Paragraf",
                        "Metin Türleri",
                        "Yazım Kuralları",
                        "Noktalama İşaretleri",
                        "İsimler",
                        "Sıfatlar",
                        "Fiiller",
                        "Söz Varlığı"
                    ],
                    "okuma, anlama, söz varlığı ve dil bilgisi"
                ),

                matematik: besMatematik,

                fen: standartKonular(
                    5,
                    "Fen Bilimleri",
                    "🔬",
                    [
                        "Dünya ve Evren",
                        "Kuvvet ve Hareket",
                        "Madde ve Isı",
                        "Canlılar ve Yaşam",
                        "Elektrik",
                        "Işık ve Ses",
                        "Enerji",
                        "Çevre"
                    ],
                    "bilimsel gözlem, canlılar, madde, enerji ve çevre"
                ),

                sosyal: standartKonular(
                    5,
                    "Sosyal Bilgiler",
                    "🌍",
                    [
                        "Birey ve Toplum",
                        "Kültür ve Miras",
                        "İnsanlar, Yerler ve Çevreler",
                        "Bilim, Teknoloji ve Toplum",
                        "Üretim, Dağıtım ve Tüketim",
                        "Etkin Vatandaşlık",
                        "Küresel Bağlantılar"
                    ],
                    "birey, toplum, kültür, çevre ve vatandaşlık"
                ),

                ingilizce: standartKonular(
                    5,
                    "İngilizce",
                    "🇬🇧",
                    [
                        "Daily Routines",
                        "Family and Friends",
                        "Hobbies",
                        "Health",
                        "Weather",
                        "Environment",
                        "Travel",
                        "Technology"
                    ],
                    "temel iletişim ve günlük yaşam"
                ),

                din: standartKonular(
                    5,
                    "Din Kültürü ve Ahlak Bilgisi",
                    "🕌",
                    [
                        "İnanç",
                        "İbadet",
                        "Ahlak ve Değerler",
                        "Hz. Muhammed",
                        "Kur'an-ı Kerim ve Anlamı",
                        "Din ve Hayat"
                    ],
                    "inanç, ibadet, ahlak ve değerler"
                )
            }
        },


        "6": {
            ad: "6. Sınıf",

            dersler: {

                turkce: standartKonular(
                    6,
                    "Türkçe",
                    "📖",
                    [
                        "Sözcükte Anlam",
                        "Cümlede Anlam",
                        "Paragraf",
                        "Fiiller",
                        "İsimler",
                        "Sıfatlar",
                        "Zamirler",
                        "Yazım Kuralları",
                        "Noktalama",
                        "Metin Türleri"
                    ],
                    "metin anlama ve dil bilgisi"
                ),

                matematik: standartKonular(
                    6,
                    "Matematik",
                    "📐",
                    [
                        "Doğal Sayılar",
                        "Çarpanlar ve Katlar",
                        "Kümeler ve Sayılar",
                        "Kesirler",
                        "Ondalık Gösterim",
                        "Oran",
                        "Cebirsel İfadeler",
                        "Açılar",
                        "Alan ve Çevre",
                        "Veri ve Grafikler"
                    ],
                    "sayılar, cebir, oran, veri ve geometri"
                ),

                fen: standartKonular(
                    6,
                    "Fen Bilimleri",
                    "🔬",
                    [
                        "Güneş Sistemi",
                        "Vücudumuzdaki Sistemler",
                        "Kuvvet ve Hareket",
                        "Madde ve Isı",
                        "Ses",
                        "Elektriğin İletimi",
                        "Dünya ve Evren"
                    ],
                    "canlılar, madde, kuvvet, enerji ve sistemler"
                ),

                sosyal: standartKonular(
                    6,
                    "Sosyal Bilgiler",
                    "🌍",
                    [
                        "Birey ve Toplum",
                        "Kültür ve Miras",
                        "İnsanlar ve Çevreler",
                        "Bilim ve Teknoloji",
                        "Ekonomi",
                        "Etkin Vatandaşlık",
                        "Küresel Bağlantılar"
                    ],
                    "tarih, kültür, coğrafya, ekonomi ve vatandaşlık"
                ),

                ingilizce: standartKonular(
                    6,
                    "İngilizce",
                    "🇬🇧",
                    [
                        "Life",
                        "Yummy Breakfast",
                        "Downtown",
                        "Weather and Emotions",
                        "At the Fair",
                        "Occupations",
                        "Holidays",
                        "Bookworms"
                    ],
                    "iletişim ve günlük yaşam"
                ),

                din: standartKonular(
                    6,
                    "Din Kültürü ve Ahlak Bilgisi",
                    "🕌",
                    [
                        "Peygamber ve Vahiy",
                        "Namaz",
                        "Zekât ve Sadaka",
                        "Hz. Muhammed",
                        "Temel Değerler",
                        "Kur'an"
                    ],
                    "inanç, ibadet ve ahlak"
                )
            }
        },


        "7": {
            ad: "7. Sınıf",

            dersler: {

                turkce: standartKonular(
                    7,
                    "Türkçe",
                    "📖",
                    [
                        "Sözcükte Anlam",
                        "Cümlede Anlam",
                        "Paragraf",
                        "Fiiller",
                        "Fiilde Yapı",
                        "Ek Fiil",
                        "Zarflar",
                        "Yazım",
                        "Noktalama",
                        "Metin Türleri"
                    ],
                    "anlama, yorumlama, yazma ve dil bilgisi"
                ),

                matematik: standartKonular(
                    7,
                    "Matematik",
                    "📐",
                    [
                        "Tam Sayılar",
                        "Rasyonel Sayılar",
                        "Oran ve Orantı",
                        "Yüzdeler",
                        "Cebirsel İfadeler",
                        "Denklemler",
                        "Doğrular ve Açılar",
                        "Çokgenler",
                        "Çember ve Daire",
                        "Veri Analizi"
                    ],
                    "sayılar, cebir, geometri ve veri"
                ),

                fen: standartKonular(
                    7,
                    "Fen Bilimleri",
                    "🔬",
                    [
                        "Uzay Araştırmaları",
                        "Hücre ve Bölünmeler",
                        "Kuvvet ve Enerji",
                        "Saf Madde ve Karışımlar",
                        "Işığın Madde ile Etkileşimi",
                        "Elektrik Devreleri",
                        "Ekosistem"
                    ],
                    "kuvvet, enerji, madde, canlılar ve elektrik"
                ),

                sosyal: standartKonular(
                    7,
                    "Sosyal Bilgiler",
                    "🌍",
                    [
                        "Birey ve Toplum",
                        "Kültür ve Miras",
                        "İnsanlar ve Yerler",
                        "Bilim ve Teknoloji",
                        "Ekonomi",
                        "Vatandaşlık",
                        "Küresel Bağlantılar"
                    ],
                    "tarih, kültür, ekonomi ve vatandaşlık"
                ),

                ingilizce: standartKonular(
                    7,
                    "İngilizce",
                    "🇬🇧",
                    [
                        "Appearance and Personality",
                        "Sports",
                        "Biographies",
                        "Wild Animals",
                        "Television",
                        "Celebrations",
                        "Dreams",
                        "Public Buildings"
                    ],
                    "iletişim ve günlük yaşam"
                ),

                din: standartKonular(
                    7,
                    "Din Kültürü ve Ahlak Bilgisi",
                    "🕌",
                    [
                        "Melek ve Ahiret İnancı",
                        "Hac ve Kurban",
                        "Ahlaki Davranışlar",
                        "Hz. Muhammed",
                        "İslam Düşüncesi",
                        "Kur'an"
                    ],
                    "inanç, ibadet, ahlak ve İslam kültürü"
                )
            }
        },


        "8": {
            ad: "8. Sınıf",

            dersler: {

                turkce: standartKonular(
                    8,
                    "Türkçe",
                    "📖",
                    [
                        "Sözcükte Anlam",
                        "Cümlede Anlam",
                        "Paragraf",
                        "Fiilimsi",
                        "Cümlenin Ögeleri",
                        "Cümle Türleri",
                        "Yazım Kuralları",
                        "Noktalama",
                        "Metin Türleri",
                        "Anlatım Bozuklukları"
                    ],
                    "LGS düzeyinde okuma, yorumlama ve dil bilgisi"
                ),

                matematik: standartKonular(
                    8,
                    "Matematik",
                    "📐",
                    [
                        "Çarpanlar ve Katlar",
                        "Üslü İfadeler",
                        "Kareköklü İfadeler",
                        "Veri Analizi",
                        "Basit Olayların Olma Olasılığı",
                        "Cebirsel İfadeler",
                        "Doğrusal Denklemler",
                        "Eşitsizlikler",
                        "Üçgenler",
                        "Eşlik ve Benzerlik",
                        "Dönüşüm Geometrisi",
                        "Geometrik Cisimler"
                    ],
                    "cebir, sayılar, geometri, veri ve olasılık"
                ),

                fen: standartKonular(
                    8,
                    "Fen Bilimleri",
                    "🔬",
                    [
                        "Mevsimler ve İklim",
                        "DNA ve Genetik Kod",
                        "Basınç",
                        "Madde ve Endüstri",
                        "Basit Makineler",
                        "Enerji Dönüşümleri",
                        "Elektrik Yükleri ve Elektrik Enerjisi",
                        "Sürdürülebilir Kalkınma"
                    ],
                    "mevsimler, genetik, basınç, enerji ve elektrik"
                ),

                inkilap: standartKonular(
                    8,
                    "T.C. İnkılap Tarihi ve Atatürkçülük",
                    "🇹🇷",
                    [
                        "Bir Kahraman Doğuyor",
                        "Millî Uyanış",
                        "Millî Bir Destan",
                        "Atatürkçülük ve Çağdaşlaşan Türkiye",
                        "Demokratikleşme Çabaları",
                        "Atatürk Dönemi Dış Politika",
                        "Atatürk'ün Ölümü ve Sonrası",
                        "Çağdaş Türkiye ve Dünya"
                    ],
                    "Millî Mücadele, Atatürk ilkeleri ve Cumhuriyet tarihi"
                ),

                ingilizce: standartKonular(
                    8,
                    "İngilizce",
                    "🇬🇧",
                    [
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
                    ],
                    "LGS düzeyinde iletişim ve okuma"
                ),

                din: standartKonular(
                    8,
                    "Din Kültürü ve Ahlak Bilgisi",
                    "🕌",
                    [
                        "Kader İnancı",
                        "Zekât ve Sadaka",
                        "Din ve Hayat",
                        "Hz. Muhammed",
                        "Kur'an ve Ana Konular",
                        "İslam Düşüncesinde Yorumlar"
                    ],
                    "inanç, ibadet, ahlak ve dinî yorumlar"
                )
            }
        }
    };


    /* ========================================================
       LİSE DERSLERİ
    ======================================================== */

    const liseDers = function (
        sinif,
        ders,
        ikon,
        konular,
        odak
    ) {

        return standartKonular(
            sinif,
            ders,
            ikon,
            konular,
            odak
        );

    };


    /* ========================================================
       9. SINIF
    ======================================================== */

    kitaplikData["9"] = {

        ad: "9. Sınıf",

        dersler: {

            matematik: liseDers(
                9,
                "Matematik",
                "📐",
                [
                    "Sayılar",
                    "Nicelikler ve Değişimler",
                    "Geometrik Şekiller",
                    "Algoritma ve Bilişim",
                    "İstatistiksel Araştırma Süreci",
                    "Veriden Olasılığa",
                    "Fonksiyonlara Giriş"
                ],
                "sayılar, nicelikler, geometri, algoritmik düşünme ve veri"
            ),

            tde: liseDers(
                9,
                "Türk Dili ve Edebiyatı",
                "📖",
                [
                    "Sözün İnceliği",
                    "Anlam Arayışı",
                    "Anlamın Yapı Taşları",
                    "Dilin Zenginliği",
                    "Edebî Metin",
                    "Hikâye",
                    "Şiir",
                    "Tiyatro"
                ],
                "edebî metin, anlam, dil ve anlatım"
            ),

            fizik: liseDers(
                9,
                "Fizik",
                "⚛️",
                [
                    "Fizik Bilimine Giriş",
                    "Kuvvet ve Hareket",
                    "Akışkanlar",
                    "Enerji",
                    "Elektrik",
                    "Dalgalar"
                ],
                "fiziksel nicelikler, hareket, kuvvet ve enerji"
            ),

            kimya: liseDers(
                9,
                "Kimya",
                "🧪",
                [
                    "Etkileşim",
                    "Atom ve Periyodik Sistem",
                    "Kimyasal Türler",
                    "Kimyasal Tepkimeler",
                    "Karışımlar",
                    "Kimya ve Çevre"
                ],
                "madde, atom, etkileşim ve kimyasal değişimler"
            ),

            biyoloji: liseDers(
                9,
                "Biyoloji",
                "🧬",
                [
                    "Yaşam Bilimi",
                    "Hücre",
                    "Canlıların Sınıflandırılması",
                    "Ekosistem",
                    "Biyolojik Çeşitlilik"
                ],
                "yaşam, hücre, canlı çeşitliliği ve ekosistem"
            ),

            tarih: liseDers(
                9,
                "Tarih",
                "🏛️",
                [
                    "Tarih ve Zaman",
                    "İlk Çağlarda Dünya",
                    "Orta Çağlarda Dünya",
                    "İlk Türk Devletleri",
                    "İslam Medeniyeti",
                    "Türklerin İslamiyet'i Kabulü"
                ],
                "tarih bilimi, ilk çağlar, Türkler ve medeniyet"
            ),

            cografya: liseDers(
                9,
                "Coğrafya",
                "🌍",
                [
                    "Doğa ve İnsan",
                    "Harita Bilgisi",
                    "Dünya'nın Şekli ve Hareketleri",
                    "Atmosfer ve İklim",
                    "Nüfus",
                    "Yerleşme"
                ],
                "doğa, insan, harita ve iklim"
            ),

            ingilizce: liseDers(
                9,
                "İngilizce",
                "🇬🇧",
                [
                    "School Life",
                    "Personal Life",
                    "Family",
                    "Daily Life",
                    "Health",
                    "Environment",
                    "Culture",
                    "Technology"
                ],
                "iletişim ve günlük yaşam"
            ),

            din: liseDers(
                9,
                "Din Kültürü ve Ahlak Bilgisi",
                "🕌",
                [
                    "Bilgi ve İnanç",
                    "İslam ve İbadet",
                    "Ahlak ve Değerler",
                    "Allah-İnsan İlişkisi",
                    "Kur'an ve Ana Konular"
                ],
                "bilgi, inanç, ibadet ve ahlak"
            )
        }
    };


    /* ========================================================
       10 - 11 - 12. SINIF ORTAK LİSE VERİSİ
    ======================================================== */

    const liseKonular = {

        matematik: [
            "Sayılar",
            "Nicelikler ve Değişimler",
            "Fonksiyonlar",
            "Geometrik Şekiller",
            "Trigonometri",
            "Analitik Geometri",
            "İstatistik",
            "Olasılık"
        ],

        tde: [
            "Sözün İnceliği",
            "Anlam Arayışı",
            "Hikâye",
            "Şiir",
            "Roman",
            "Tiyatro",
            "Deneme",
            "Eleştiri"
        ],

        fizik: [
            "Kuvvet ve Hareket",
            "Enerji",
            "Elektrik",
            "Manyetizma",
            "Dalgalar",
            "Optik",
            "Modern Fizik"
        ],

        kimya: [
            "Atom ve Periyodik Sistem",
            "Kimyasal Türler",
            "Kimyasal Tepkimeler",
            "Karışımlar",
            "Asitler ve Bazlar",
            "Kimyasal Denge",
            "Organik Kimya"
        ],

        biyoloji: [
            "Hücre",
            "Canlılarda Enerji",
            "Kalıtım",
            "İnsan Fizyolojisi",
            "Ekosistem",
            "Genetik",
            "Biyoteknoloji"
        ],

        tarih: [
            "Türk Dünyası",
            "Osmanlı Devleti",
            "Değişen Dünya Dengeleri",
            "Modernleşme",
            "Millî Mücadele",
            "Cumhuriyet",
            "Çağdaş Dünya"
        ],

        cografya: [
            "Doğal Sistemler",
            "Nüfus",
            "Yerleşme",
            "Ekonomik Faaliyetler",
            "Türkiye'nin Coğrafi Özellikleri",
            "Küresel Ortam"
        ],

        felsefe: [
            "Felsefeyi Tanıma",
            "Bilgi Felsefesi",
            "Bilim Felsefesi",
            "Ahlak Felsefesi",
            "Siyaset Felsefesi",
            "Sanat Felsefesi",
            "Din Felsefesi"
        ],

        ingilizce: [
            "School Life",
            "Personal Life",
            "Culture",
            "Technology",
            "Environment",
            "Travel",
            "Communication",
            "Future"
        ],

        din: [
            "Bilgi ve İnanç",
            "İslam ve İbadet",
            "Ahlak ve Değerler",
            "Kur'an ve Ana Konular",
            "İslam Düşüncesi",
            "Din, Bilim ve Felsefe"
        ]
    };


    function liseSinifiOlustur(sinif) {

        return {

            ad: `${sinif}. Sınıf`,

            dersler: {

                matematik: liseDers(
                    sinif,
                    "Matematik",
                    "📐",
                    liseKonular.matematik,
                    "matematiksel düşünme, fonksiyon, geometri, veri ve olasılık"
                ),

                tde: liseDers(
                    sinif,
                    "Türk Dili ve Edebiyatı",
                    "📖",
                    liseKonular.tde,
                    "edebiyat, dil, metin ve eleştirel okuma"
                ),

                fizik: liseDers(
                    sinif,
                    "Fizik",
                    "⚛️",
                    liseKonular.fizik,
                    "kuvvet, enerji, elektrik, dalgalar ve modern fizik"
                ),

                kimya: liseDers(
                    sinif,
                    "Kimya",
                    "🧪",
                    liseKonular.kimya,
                    "atom, tepkimeler, denge, asit-baz ve organik kimya"
                ),

                biyoloji: liseDers(
                    sinif,
                    "Biyoloji",
                    "🧬",
                    liseKonular.biyoloji,
                    "hücre, enerji, kalıtım, fizyoloji ve ekoloji"
                ),

                tarih: liseDers(
                    sinif,
                    "Tarih",
                    "🏛️",
                    liseKonular.tarih,
                    "Türk tarihi, Osmanlı, Cumhuriyet ve dünya tarihi"
                ),

                cografya: liseDers(
                    sinif,
                    "Coğrafya",
                    "🌍",
                    liseKonular.cografya,
                    "doğal, beşerî ve ekonomik coğrafya"
                ),

                felsefe: liseDers(
                    sinif,
                    "Felsefe",
                    "🧠",
                    liseKonular.felsefe,
                    "felsefi düşünme, bilgi, bilim, ahlak ve sanat"
                ),

                ingilizce: liseDers(
                    sinif,
                    "İngilizce",
                    "🇬🇧",
                    liseKonular.ingilizce,
                    "ileri iletişim, okuma, yazma ve konuşma"
                ),

                din: liseDers(
                    sinif,
                    "Din Kültürü ve Ahlak Bilgisi",
                    "🕌",
                    liseKonular.din,
                    "din, ahlak, inanç ve İslam düşüncesi"
                )
            }
        };
    }


    kitaplikData["10"] = liseSinifiOlustur(10);
    kitaplikData["11"] = liseSinifiOlustur(11);
    kitaplikData["12"] = liseSinifiOlustur(12);


    /* ========================================================
       DERS TAKİP'E AKTAR
    ======================================================== */

    window.kitaplikData = kitaplikData;


    window.kitaplikDataMeta = {

        version: "1.0.0",

        app: "DersTakip",

        grades: [
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ],

        description:
            "DersTakip 5-12. sınıf ders kitaplığı veri katmanı.",

        contentStructure: [
            "giris",
            "anlatim",
            "temelBilgi",
            "ornekler",
            "dikkat",
            "ozet",
            "test"
        ]
    };


})();
