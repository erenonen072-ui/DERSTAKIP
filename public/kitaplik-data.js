/* =========================================================
   DERS TAKİP — KİTAPLIK DATA
   MEB uyumlu başlangıç veri paketi
   ========================================================= */

window.kitaplikData = {

    /* =====================================================
       5. SINIF
    ===================================================== */

    "5": {
        ad: "5. Sınıf",

        dersler: {

            /* =================================================
               MATEMATİK
            ================================================= */

            matematik: {
                ad: "Matematik",
                icon: "📐",

                konular: [

                    {
                        id: "5-matematik-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekiller günlük hayatımızın birçok alanında karşımıza çıkar. Kare, dikdörtgen, üçgen ve çember gibi şekiller çevremizdeki nesneleri tanımamıza ve sınıflandırmamıza yardımcı olur.",

                        anlatim: `
                            <h3>📐 Geometrik Şekiller Nedir?</h3>

                            <p>
                            Geometrik şekiller; düzlemde veya uzayda belirli
                            özelliklere sahip olan şekillerdir.
                            </p>

                            <h3>🔺 Üçgen</h3>

                            <p>
                            Üçgen, üç doğru parçasının birleşmesiyle oluşan
                            kapalı bir geometrik şekildir.
                            Üç köşesi ve üç kenarı vardır.
                            </p>

                            <h3>⬛ Kare</h3>

                            <p>
                            Karenin dört kenarı da birbirine eşittir.
                            Dört köşesi vardır ve bütün açıları diktir.
                            </p>

                            <h3>▭ Dikdörtgen</h3>

                            <p>
                            Dikdörtgende karşılıklı kenarlar birbirine eşittir.
                            Dört açısı da diktir.
                            </p>

                            <h3>⭕ Çember ve Daire</h3>

                            <p>
                            Çember, merkezden eşit uzaklıktaki noktaların
                            oluşturduğu kapalı eğridir. Daire ise çemberin
                            iç bölgesiyle birlikte düşünülen şekildir.
                            </p>
                        `,

                        temelBilgi: [
                            "Üçgenin 3 kenarı ve 3 köşesi vardır.",
                            "Karenin dört kenarı eşittir.",
                            "Dikdörtgende karşılıklı kenarlar eşittir.",
                            "Karenin ve dikdörtgenin dört açısı da diktir.",
                            "Çember ile daire aynı kavram değildir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir karenin bir kenarı 6 cm ise diğer kenarları kaç cm'dir?",
                                cozum:
                                    "Karenin bütün kenarları eşit olduğundan diğer üç kenar da 6 cm'dir."
                            },
                            {
                                soru: "Üçgenin kaç köşesi vardır?",
                                cozum:
                                    "Üçgenin üç kenarı ve üç köşesi vardır. Cevap: 3."
                            }
                        ],

                        dikkat:
                            "Kare ile dikdörtgeni birbirinden tamamen farklı şekiller olarak düşünme. Kare, özel bir dikdörtgen olarak da değerlendirilebilir.",

                        ozet:
                            "Geometrik şekiller kenar, köşe ve açı gibi özelliklerine göre incelenir.",

                        test: [
                            {
                                soru: "Karenin kaç kenarı vardır?",
                                secenekler: [
                                    "3",
                                    "4",
                                    "5",
                                    "6"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Üçgenin kaç köşesi vardır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisinin karşılıklı kenarları eşittir?",
                                secenekler: [
                                    "Dikdörtgen",
                                    "Üçgen",
                                    "Çember",
                                    "Daire"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Karenin bütün kenarları nasıldır?",
                                secenekler: [
                                    "Farklı",
                                    "İkişerli farklı",
                                    "Eşit",
                                    "Sadece biri eşit"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Üçgenin kaç kenarı vardır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-matematik-sayilar-nicelikler-1",
                        ad: "Sayılar ve Nicelikler (1)",

                        giris:
                            "Doğal sayılar günlük hayatımızda sayma, sıralama ve ölçme gibi birçok işlemde kullanılır.",

                        anlatim: `
                            <h3>🔢 Doğal Sayılar</h3>

                            <p>
                            Doğal sayılar 0'dan başlayarak sonsuza kadar
                            devam eden sayılardır.
                            </p>

                            <div class="kitap-formul">
                                0, 1, 2, 3, 4, 5, ...
                            </div>

                            <h3>📊 Basamak Değeri</h3>

                            <p>
                            Bir rakamın bulunduğu basamağa göre aldığı değere
                            basamak değeri denir.
                            </p>

                            <p>
                            Örneğin 4 582 sayısında 5 yüzler basamağındadır.
                            Bu nedenle basamak değeri 500'dür.
                            </p>

                            <h3>⚖️ Sayıları Karşılaştırma</h3>

                            <p>
                            İki doğal sayıyı karşılaştırırken önce basamak
                            sayılarına, basamak sayıları eşitse soldan
                            başlayarak rakamlarına bakılır.
                            </p>
                        `,

                        temelBilgi: [
                            "Doğal sayılar 0'dan başlar.",
                            "Bir rakamın değeri bulunduğu basamağa göre değişir.",
                            "Sayıları karşılaştırırken önce basamak sayısına bakılır.",
                            "Basamak sayıları eşitse soldan başlanarak karşılaştırma yapılır."
                        ],

                        ornekler: [
                            {
                                soru: "4 582 sayısında 5 rakamının basamak değeri nedir?",
                                cozum:
                                    "5 yüzler basamağındadır. Bu nedenle basamak değeri 500'dür."
                            },
                            {
                                soru: "3 245 ve 3 425 sayılarından hangisi büyüktür?",
                                cozum:
                                    "Binler basamağı aynı, yüzler basamağında 4 > 2 olduğu için 3 425 daha büyüktür."
                            }
                        ],

                        dikkat:
                            "Rakam ile basamak değerini karıştırma. Örneğin 7 rakamının kendisi 7'dir; onlar basamağındaki basamak değeri 70 olabilir.",

                        ozet:
                            "Doğal sayılar basamaklarına ayrılarak okunabilir, karşılaştırılabilir ve sıralanabilir.",

                        test: [
                            {
                                soru: "Doğal sayılar hangi sayıdan başlar?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "-1",
                                    "10"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "4 582 sayısında 5'in basamak değeri kaçtır?",
                                secenekler: [
                                    "5",
                                    "50",
                                    "500",
                                    "5000"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Aşağıdakilerden hangisi daha büyüktür?",
                                secenekler: [
                                    "245",
                                    "425",
                                    "204",
                                    "240"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Birler basamağındaki rakam hangisidir?",
                                secenekler: [
                                    "En soldaki",
                                    "En sağdaki",
                                    "Ortadaki",
                                    "İlk rakam"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "3 000 sayısında kaç tane sıfır vardır?",
                                secenekler: [
                                    "1",
                                    "2",
                                    "3",
                                    "4"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-matematik-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris:
                            "Uzunluk, çevre ve alan gibi kavramlar geometrik şekillerin ölçülmesinde kullanılır.",

                        anlatim: `
                            <h3>📏 Uzunluk</h3>

                            <p>
                            Uzunluk ölçmek için milimetre, santimetre,
                            metre ve kilometre gibi ölçü birimleri kullanılır.
                            </p>

                            <h3>🔄 Çevre</h3>

                            <p>
                            Bir şeklin bütün kenar uzunluklarının toplamına
                            çevre denir.
                            </p>

                            <div class="kitap-formul">
                                Çevre = Kenarların toplamı
                            </div>

                            <h3>⬛ Alan</h3>

                            <p>
                            Bir şeklin kapladığı yüzey alanına alan denir.
                            Dikdörtgenin alanı uzun kenar ile kısa kenarın
                            çarpılmasıyla bulunabilir.
                            </p>

                            <div class="kitap-formul">
                                Dikdörtgen Alanı = Uzun Kenar × Kısa Kenar
                            </div>
                        `,

                        temelBilgi: [
                            "Uzunluk ölçmede metre temel birimlerden biridir.",
                            "Çevre kenar uzunluklarının toplamıdır.",
                            "Alan bir şeklin kapladığı yüzeyi ifade eder.",
                            "Dikdörtgen alanı uzun kenar ile kısa kenarın çarpımıdır."
                        ],

                        ornekler: [
                            {
                                soru: "Kenarları 5 cm ve 3 cm olan dikdörtgenin çevresi kaç cm'dir?",
                                cozum:
                                    "5 + 3 + 5 + 3 = 16 cm."
                            },
                            {
                                soru: "Kenarları 6 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
                                cozum:
                                    "6 × 4 = 24 cm²."
                            }
                        ],

                        dikkat:
                            "Çevre ile alan farklı kavramlardır. Çevrede kenar uzunlukları toplanır; alanda yüzey ölçülür.",

                        ozet:
                            "Geometrik nicelikler şekillerin uzunluk, çevre ve alan gibi özelliklerini ölçmemizi sağlar.",

                        test: [
                            {
                                soru: "Çevre nasıl bulunur?",
                                secenekler: [
                                    "Kenarların toplamıyla",
                                    "Kenarların bölümüyle",
                                    "Sadece bir kenarla",
                                    "Köşe sayısıyla"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "6 cm × 4 cm dikdörtgenin alanı kaç cm²'dir?",
                                secenekler: [
                                    "10",
                                    "20",
                                    "24",
                                    "28"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Uzunluk ölçmek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Metre",
                                    "Kilogram",
                                    "Litre",
                                    "Derece"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "5 cm ve 3 cm kenarlı dikdörtgenin çevresi kaç cm'dir?",
                                secenekler: [
                                    "8",
                                    "15",
                                    "16",
                                    "20"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Alan neyi ifade eder?",
                                secenekler: [
                                    "Köşe sayısını",
                                    "Kaplanan yüzeyi",
                                    "Kenar sayısını",
                                    "Açı ölçüsünü"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-matematik-sayilar-nicelikler-2",
                        ad: "Sayılar ve Nicelikler (2)",

                        giris:
                            "Doğal sayılarla işlemler yaparak günlük hayattaki problemlerin çözümünde matematiksel düşünme becerilerimizi geliştirebiliriz.",

                        anlatim: `
                            <h3>➕ Toplama</h3>

                            <p>
                            Toplama, iki veya daha fazla sayının miktarlarını
                            bir araya getirme işlemidir.
                            </p>

                            <h3>➖ Çıkarma</h3>

                            <p>
                            Çıkarma işleminde bir miktardan başka bir miktar
                            eksiltilir.
                            </p>

                            <h3>✖️ Çarpma</h3>

                            <p>
                            Çarpma, aynı sayının tekrarlı toplamasını
                            kısa yoldan ifade etmek için kullanılabilir.
                            </p>

                            <h3>➗ Bölme</h3>

                            <p>
                            Bölme işlemi bir miktarın eşit gruplara
                            ayrılmasını ifade eder.
                            </p>
                        `,

                        temelBilgi: [
                            "Toplama miktarları birleştirir.",
                            "Çıkarma eksiltme veya fark bulma amacıyla kullanılabilir.",
                            "Çarpma tekrarlı toplamayı ifade edebilir.",
                            "Bölme eşit gruplara ayırmada kullanılır."
                        ],

                        ornekler: [
                            {
                                soru: "24 + 16 işleminin sonucu kaçtır?",
                                cozum: "24 + 16 = 40."
                            },
                            {
                                soru: "6 × 4 işlemi nasıl düşünülebilir?",
                                cozum:
                                    "6 sayısının 4 kez toplanması şeklinde düşünülebilir: 6 + 6 + 6 + 6 = 24."
                            }
                        ],

                        dikkat:
                            "İşlem yapmadan önce problemin ne istediğini belirle. Toplama mı, çıkarma mı, çarpma mı yoksa bölme mi gerektiğine dikkat et.",

                        ozet:
                            "Temel aritmetik işlemler günlük yaşam problemlerini çözmemize yardımcı olur.",

                        test: [
                            {
                                soru: "24 + 16 kaçtır?",
                                secenekler: [
                                    "30",
                                    "40",
                                    "50",
                                    "60"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "8 × 5 kaçtır?",
                                secenekler: [
                                    "13",
                                    "30",
                                    "40",
                                    "45"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "20 - 7 kaçtır?",
                                secenekler: [
                                    "11",
                                    "12",
                                    "13",
                                    "14"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "18 ÷ 3 kaçtır?",
                                secenekler: [
                                    "5",
                                    "6",
                                    "7",
                                    "8"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aynı sayının tekrarlı toplamı hangi işlemle kısa şekilde gösterilebilir?",
                                secenekler: [
                                    "Çarpma",
                                    "Çıkarma",
                                    "Bölme",
                                    "Karşılaştırma"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-matematik-istatistiksel-arastirma",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "Çevremizdeki bilgilerden anlamlı sonuçlar çıkarmak için veri toplayabilir, düzenleyebilir ve yorumlayabiliriz.",

                        anlatim: `
                            <h3>📊 Veri Nedir?</h3>

                            <p>
                            Bir araştırma sonucunda elde edilen bilgilere
                            veri denir.
                            </p>

                            <h3>🔎 Araştırma Sorusu</h3>

                            <p>
                            Araştırmaya başlamadan önce neyi öğrenmek
                            istediğimizi açıkça belirlemeliyiz.
                            </p>

                            <h3>📋 Veri Toplama</h3>

                            <p>
                            Anket, gözlem veya ölçüm gibi yöntemlerle
                            veri toplanabilir.
                            </p>

                            <h3>📈 Verileri Gösterme</h3>

                            <p>
                            Toplanan veriler tablo ve grafiklerle
                            gösterilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veri araştırma sonucunda elde edilen bilgidir.",
                            "Araştırma sorusu açık ve anlaşılır olmalıdır.",
                            "Veriler tablo ve grafiklerle gösterilebilir.",
                            "Grafikler verileri daha kolay yorumlamamıza yardımcı olur."
                        ],

                        ornekler: [
                            {
                                soru: "Bir sınıftaki öğrencilerin en sevdiği meyveleri öğrenmek için hangi yöntem kullanılabilir?",
                                cozum:
                                    "Öğrencilere anket uygulanarak veri toplanabilir."
                            }
                        ],

                        dikkat:
                            "Grafikte yalnızca sayılara değil, başlıklara ve birimlere de dikkat et.",

                        ozet:
                            "İstatistiksel araştırmada soru oluşturulur, veri toplanır, düzenlenir ve yorumlanır.",

                        test: [
                            {
                                soru: "Araştırma sonucunda elde edilen bilgilere ne denir?",
                                secenekler: [
                                    "Veri",
                                    "Kenar",
                                    "Açı",
                                    "Birim"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Veri toplamak için hangisi kullanılabilir?",
                                secenekler: [
                                    "Anket",
                                    "Cetvel silgisi",
                                    "Sadece tahmin",
                                    "Rastgele sayı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Veriler hangi araçlarla gösterilebilir?",
                                secenekler: [
                                    "Tablo ve grafik",
                                    "Sadece metin",
                                    "Sadece resim",
                                    "Hiçbiri"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Araştırmaya başlamadan önce ne belirlenmelidir?",
                                secenekler: [
                                    "Araştırma sorusu",
                                    "Cevap anahtarı",
                                    "Sınav notu",
                                    "Kitap sayfası"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Grafikler neye yardımcı olur?",
                                secenekler: [
                                    "Verileri yorumlamaya",
                                    "Kenar ölçmeye",
                                    "Sayıları silmeye",
                                    "Kitap okumaya"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-matematik-veriden-olasiliga",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Bazı olayların gerçekleşmesi kesin olabilirken bazı olayların gerçekleşmesi mümkün veya imkânsız olabilir.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>

                            <p>
                            Bir olayın gerçekleşme durumunu ifade etmek
                            için olasılık kavramından yararlanırız.
                            </p>

                            <h3>✅ Kesin Olay</h3>

                            <p>
                            Gerçekleşmesi kesin olan olaylardır.
                            Örneğin yarın güneşin doğması gibi.
                            </p>

                            <h3>❌ İmkânsız Olay</h3>

                            <p>
                            Gerçekleşmesi mümkün olmayan olaylardır.
                            </p>

                            <h3>🤔 Mümkün Olay</h3>

                            <p>
                            Gerçekleşebilecek ancak gerçekleşmesi kesin
                            olmayan olaylara mümkün olay denir.
                            </p>
                        `,

                        temelBilgi: [
                            "Kesin olay mutlaka gerçekleşir.",
                            "İmkânsız olay gerçekleşemez.",
                            "Mümkün olay gerçekleşebilir.",
                            "Olasılık günlük hayatta belirsizlikleri ifade etmemize yardımcı olur."
                        ],

                        ornekler: [
                            {
                                soru: "Bir zar atıldığında 7 gelmesi mümkün müdür?",
                                cozum:
                                    "Standart bir zarın yüzlerinde 1, 2, 3, 4, 5 ve 6 bulunduğu için 7 gelmesi imkânsızdır."
                            }
                        ],

                        dikkat:
                            "Mümkün ile kesin kavramlarını karıştırma. Bir olayın mümkün olması onun mutlaka gerçekleşeceği anlamına gelmez.",

                        ozet:
                            "Olaylar kesin, mümkün veya imkânsız olarak değerlendirilebilir.",

                        test: [
                            {
                                soru: "Standart zarda 7 gelmesi nasıldır?",
                                secenekler: [
                                    "Kesin",
                                    "Mümkün",
                                    "İmkânsız",
                                    "Her zaman"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Kesin olay için hangisi doğrudur?",
                                secenekler: [
                                    "Gerçekleşmez",
                                    "Mutlaka gerçekleşir",
                                    "Belirsizdir",
                                    "İmkânsızdır"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Mümkün olay ne demektir?",
                                secenekler: [
                                    "Kesinlikle gerçekleşir",
                                    "Gerçekleşemez",
                                    "Gerçekleşebilir",
                                    "Hiçbir zaman olmaz"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Standart bir zarın 3 gelmesi nasıldır?",
                                secenekler: [
                                    "İmkânsız",
                                    "Mümkün",
                                    "Kesin",
                                    "Yanlış"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Olasılık neyi ifade etmeye yardımcı olur?",
                                secenekler: [
                                    "Belirsiz olayları",
                                    "Kenarları",
                                    "Alanı",
                                    "Uzunluğu"
                                ],
                                cevap: 0
                            }
                        ]
                    }

                ]
            },


            /* =================================================
               FEN BİLİMLERİ
            ================================================= */

            fen: {
                ad: "Fen Bilimleri",
                icon: "🧪",

                konular: [

                    {
                        id: "5-fen-gokyuzundeki-komsularimiz",
                        ad: "Gökyüzündeki Komşularımız ve Biz",

                        giris:
                            "Gökyüzüne baktığımızda Güneş, Ay ve yıldızları görebiliriz. Dünya da içinde bulunduğu Güneş sisteminin önemli bir parçasıdır.",

                        anlatim: `
                            <h3>☀️ Güneş</h3>

                            <p>
                            Güneş, Dünya'ya en yakın yıldızdır.
                            Isı ve ışık kaynağımızdır.
                            </p>

                            <h3>🌙 Ay</h3>

                            <p>
                            Ay, Dünya'nın doğal uydusudur.
                            Ay'ın Dünya'dan farklı şekillerde
                            görünmesine Ay'ın evreleri denir.
                            </p>

                            <h3>🌍 Dünya</h3>

                            <p>
                            Dünya, Güneş sisteminde yaşamın bulunduğu
                            bilinen gezegendir.
                            </p>

                            <h3>🪐 Güneş Sistemi</h3>

                            <p>
                            Güneş ve onun çevresinde dolanan gök cisimleri
                            Güneş sistemini oluşturur.
                            </p>
                        `,

                        temelBilgi: [
                            "Güneş bir yıldızdır.",
                            "Ay Dünya'nın doğal uydusudur.",
                            "Dünya Güneş'in etrafında dolanır.",
                            "Ay'ın farklı görünüşlerine Ay'ın evreleri denir."
                        ],

                        ornekler: [
                            {
                                soru: "Dünya'nın doğal uydusu nedir?",
                                cozum: "Dünya'nın doğal uydusu Ay'dır."
                            }
                        ],

                        dikkat:
                            "Ay kendi ışığını üretmez. Güneş'ten aldığı ışığı yansıtır.",

                        ozet:
                            "Güneş, Dünya ve Ay gökyüzündeki temel komşularımızdandır.",

                        test: [
                            {
                                soru: "Güneş nedir?",
                                secenekler: [
                                    "Gezegen",
                                    "Yıldız",
                                    "Uydu",
                                    "Asteroit"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Dünya'nın doğal uydusu hangisidir?",
                                secenekler: [
                                    "Güneş",
                                    "Mars",
                                    "Ay",
                                    "Venüs"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Ay ışığını nereden alır?",
                                secenekler: [
                                    "Dünya'dan",
                                    "Güneş'ten",
                                    "Mars'tan",
                                    "Kendi üretir"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Dünya hangi sistemin parçasıdır?",
                                secenekler: [
                                    "Güneş sistemi",
                                    "Ay sistemi",
                                    "Bulut sistemi",
                                    "Okyanus sistemi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ay'ın farklı görünüşlerine ne denir?",
                                secenekler: [
                                    "Mevsimler",
                                    "Evreler",
                                    "Katmanlar",
                                    "Yörüngeler"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-kuvveti-taniyalim",
                        ad: "Kuvveti Tanıyalım",

                        giris:
                            "Cisimleri itmek veya çekmek için kuvvet uygularız. Kuvvet cisimlerin hareketini veya şeklini değiştirebilir.",

                        anlatim: `
                            <h3>💪 Kuvvet</h3>

                            <p>
                            Bir cismi itme veya çekme etkisine kuvvet denir.
                            </p>

                            <h3>➡️ Kuvvetin Etkileri</h3>

                            <p>
                            Kuvvet bir cismin hızlanmasına, yavaşlamasına,
                            yön değiştirmesine veya şeklinin değişmesine
                            neden olabilir.
                            </p>

                            <h3>🧲 Kuvvet Ölçümü</h3>

                            <p>
                            Kuvvet ölçmek için dinamometre kullanılabilir.
                            Kuvvetin birimi Newton'dur.
                            </p>
                        `,

                        temelBilgi: [
                            "Kuvvet itme veya çekme etkisidir.",
                            "Kuvvet hareketi değiştirebilir.",
                            "Kuvvet cismin şeklini değiştirebilir.",
                            "Kuvvet Newton ile ifade edilir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir topa ayağımızla vurduğumuzda topun hareketinin değişmesi hangi etkiye örnektir?",
                                cozum:
                                    "Topa uygulanan kuvvet topun hareketini değiştirmiştir."
                            }
                        ],

                        dikkat:
                            "Kuvvet yalnızca cisimleri hareket ettirmez; hareket eden cisimleri yavaşlatabilir veya yönlerini değiştirebilir.",

                        ozet:
                            "Kuvvet, cisimler üzerinde hareket ve şekil değişikliği gibi etkiler oluşturabilir.",

                        test: [
                            {
                                soru: "Kuvvet nedir?",
                                secenekler: [
                                    "İtme veya çekme etkisi",
                                    "Sadece ışık",
                                    "Sıcaklık",
                                    "Ses"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kuvvetin birimi nedir?",
                                secenekler: [
                                    "Metre",
                                    "Newton",
                                    "Kilogram",
                                    "Litre"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kuvvet hangi aracıyla ölçülebilir?",
                                secenekler: [
                                    "Termometre",
                                    "Dinamometre",
                                    "Cetvel",
                                    "Baskül"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kuvvet cismin yönünü değiştirebilir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece gece",
                                    "Sadece suda"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kapıyı açmak hangi kuvvet etkisine örnektir?",
                                secenekler: [
                                    "İtme/çekme",
                                    "Işık",
                                    "Ses",
                                    "Sıcaklık"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-canlilarin-yapisina-yolculuk",
                        ad: "Canlıların Yapısına Yolculuk",

                        giris:
                            "Canlıların temel yapı birimlerinden biri hücredir. Hücrelerin bir araya gelmesiyle daha karmaşık yapılar oluşur.",

                        anlatim: `
                            <h3>🔬 Hücre</h3>

                            <p>
                            Hücre, canlıların temel yapı ve görev birimidir.
                            </p>

                            <h3>🌱 Bitki ve Hayvan Hücresi</h3>

                            <p>
                            Bitki ve hayvan hücrelerinin ortak özellikleri
                            vardır. Ancak bitki hücresinde hücre duvarı ve
                            kloroplast gibi yapılar bulunabilir.
                            </p>

                            <h3>🧩 Yapısal Organizasyon</h3>

                            <p>
                            Hücreler bir araya gelerek dokuları,
                            dokular organları, organlar sistemleri,
                            sistemler de organizmayı oluşturabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Hücre canlıların temel yapı birimidir.",
                            "Bitki ve hayvan hücrelerinde ortak yapılar bulunur.",
                            "Bitki hücresinde hücre duvarı ve kloroplast bulunabilir.",
                            "Hücre-doku-organ-sistem-organizma şeklinde bir organizasyon vardır."
                        ],

                        ornekler: [
                            {
                                soru: "Hücrelerin bir araya gelmesiyle ne oluşur?",
                                cozum:
                                    "Benzer görev yapan hücrelerin bir araya gelmesiyle dokular oluşabilir."
                            }
                        ],

                        dikkat:
                            "Her canlıda aynı hücre yapılarının aynı özellikte olduğunu düşünme. Bitki ve hayvan hücreleri arasında farklılıklar vardır.",

                        ozet:
                            "Canlıların yapısı hücrelerden başlayarak daha büyük organizasyon düzeylerine ulaşır.",

                        test: [
                            {
                                soru: "Canlıların temel yapı birimi nedir?",
                                secenekler: [
                                    "Hücre",
                                    "Organ",
                                    "Sistem",
                                    "Doku"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bitki hücresinde bulunabilen yapı hangisidir?",
                                secenekler: [
                                    "Kloroplast",
                                    "Dinamometre",
                                    "Termometre",
                                    "Pil"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hücrelerin oluşturduğu yapılardan biri nedir?",
                                secenekler: [
                                    "Doku",
                                    "Gezegen",
                                    "Yıldız",
                                    "Bulut"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hücre-doku-organ-sistem-organizma sıralamasında ilk basamak hangisidir?",
                                secenekler: [
                                    "Organ",
                                    "Hücre",
                                    "Sistem",
                                    "Organizma"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Bitki ve hayvan hücreleri tamamen aynı mıdır?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece geceleri",
                                    "Sadece mikroskopta"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-isigin-dunyasi",
                        ad: "Işığın Dünyası",

                        giris:
                            "Işık sayesinde çevremizdeki cisimleri görebiliriz. Işığın yayılması ve cisimlerle etkileşimi günlük yaşamda birçok olayın temelidir.",

                        anlatim: `
                            <h3>💡 Işık</h3>

                            <p>
                            Işık, çevremizi görmemizi sağlayan enerji türlerinden
                            biridir.
                            </p>

                            <h3>🪞 Yansıma</h3>

                            <p>
                            Işığın bir yüzeye çarpıp geri dönmesine yansıma
                            denir.
                            </p>

                            <h3>🌑 Gölge</h3>

                            <p>
                            Işık geçirmeyen bir cisim ışığın önüne geldiğinde
                            arkasında gölge oluşabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Işık görmemizi sağlar.",
                            "Işık bazı yüzeylerden yansıyabilir.",
                            "Işık geçirmeyen cisimler gölge oluşturabilir.",
                            "Ayna ışığı yansıtan yüzeylerden biridir."
                        ],

                        ornekler: [
                            {
                                soru: "Aynaya tuttuğumuz ışığın geri dönmesi hangi olaya örnektir?",
                                cozum: "Bu olay ışığın yansımasına örnektir."
                            }
                        ],

                        dikkat:
                            "Gölge cismin kendisi değildir; ışığın cisim tarafından engellenmesi sonucu oluşan karanlık bölgedir.",

                        ozet:
                            "Işık yayılır, yüzeylerden yansıyabilir ve bazı cisimlerin arkasında gölge oluşturabilir.",

                        test: [
                            {
                                soru: "Işığın yüzeye çarpıp geri dönmesine ne denir?",
                                secenekler: [
                                    "Yansıma",
                                    "Buharlaşma",
                                    "Erime",
                                    "Donma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi ışığı yansıtabilir?",
                                secenekler: [
                                    "Ayna",
                                    "Su buharı",
                                    "Ses",
                                    "Hava"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gölge oluşması için ne gerekir?",
                                secenekler: [
                                    "Işığın engellenmesi",
                                    "Sadece ses",
                                    "Sadece su",
                                    "Sadece sıcaklık"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Işık neyi sağlar?",
                                secenekler: [
                                    "Görmeyi",
                                    "Sadece işitmeyi",
                                    "Sadece koklamayı",
                                    "Sadece tatmayı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ayna hangi olayla ilişkilidir?",
                                secenekler: [
                                    "Yansıma",
                                    "Donma",
                                    "Erime",
                                    "Buharlaşma"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-maddenin-dogasi",
                        ad: "Maddenin Doğası",

                        giris:
                            "Maddeler tanecikli, boşluklu ve hareketli bir yapıya sahiptir. Katı, sıvı ve gaz maddelerin özellikleri farklıdır.",

                        anlatim: `
                            <h3>🧱 Maddenin Tanecikli Yapısı</h3>

                            <p>
                            Maddeler çok küçük taneciklerden oluşur.
                            Bu tanecikler hareket eder.
                            </p>

                            <h3>🧊 Katılar</h3>

                            <p>
                            Katıların belirli bir şekli ve hacmi vardır.
                            </p>

                            <h3>💧 Sıvılar</h3>

                            <p>
                            Sıvıların belirli hacimleri vardır ancak
                            bulundukları kabın şeklini alırlar.
                            </p>

                            <h3>💨 Gazlar</h3>

                            <p>
                            Gazların belirli bir şekli ve hacmi yoktur.
                            Bulundukları ortamı doldurabilirler.
                            </p>

                            <h3>🌡️ Isı ve Sıcaklık</h3>

                            <p>
                            Isı ve sıcaklık aynı kavram değildir.
                            Sıcaklık bir maddenin ne kadar sıcak veya soğuk
                            olduğunu ifade eder.
                            </p>
                        `,

                        temelBilgi: [
                            "Maddeler taneciklerden oluşur.",
                            "Katıların belirli şekli ve hacmi vardır.",
                            "Sıvılar kabın şeklini alır.",
                            "Gazlar bulundukları ortamı doldurabilir.",
                            "Isı ve sıcaklık farklı kavramlardır."
                        ],

                        ornekler: [
                            {
                                soru: "Su neden konulduğu kabın şeklini alır?",
                                cozum:
                                    "Su sıvı hâlde olduğu için belirli bir şekli yoktur ve bulunduğu kabın şeklini alır."
                            }
                        ],

                        dikkat:
                            "Isı ile sıcaklığı birbirinin yerine kullanma. Günlük dilde benzer görünse de fen bilimlerinde farklı kavramlardır.",

                        ozet:
                            "Maddeler tanecikli yapıya sahiptir ve katı, sıvı veya gaz hâlinde bulunabilir.",

                        test: [
                            {
                                soru: "Hangisinin belirli şekli vardır?",
                                secenekler: [
                                    "Katı",
                                    "Sıvı",
                                    "Gaz",
                                    "Hepsi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Sıvılar neyin şeklini alır?",
                                secenekler: [
                                    "Kabın",
                                    "Güneş'in",
                                    "Ay'ın",
                                    "Havanın"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gazlar için hangisi doğrudur?",
                                secenekler: [
                                    "Bulundukları ortamı doldurabilirler",
                                    "Her zaman sabit şekillidirler",
                                    "Sadece katı hâlde bulunurlar",
                                    "Hareket etmezler"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Maddeler neyden oluşur?",
                                secenekler: [
                                    "Taneciklerden",
                                    "Sadece sudan",
                                    "Işıktan",
                                    "Sesten"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Isı ve sıcaklık aynı kavram mıdır?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Her zaman",
                                    "Sadece kışın"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-yasamimizda-elektrik",
                        ad: "Yaşamımızdaki Elektrik",

                        giris:
                            "Elektrik günlük hayatımızın önemli bir parçasıdır. Elektrik devreleri farklı araçların çalışmasını sağlar.",

                        anlatim: `
                            <h3>🔋 Elektrik Devresi</h3>

                            <p>
                            Basit bir elektrik devresinde pil, bağlantı kablosu
                            ve ampul gibi elemanlar bulunabilir.
                            </p>

                            <h3>💡 Ampul</h3>

                            <p>
                            Elektrik enerjisini ışık enerjisine dönüştüren
                            devre elemanlarından biridir.
                            </p>

                            <h3>🔌 Devrenin Çalışması</h3>

                            <p>
                            Elektrik devresinin çalışması için devrenin
                            uygun şekilde tamamlanması gerekir.
                            </p>
                        `,

                        temelBilgi: [
                            "Pil elektrik enerjisi sağlayabilir.",
                            "Ampul elektrik enerjisini ışığa dönüştürür.",
                            "Devrenin tamamlanması gerekir.",
                            "Bağlantı kabloları devre elemanlarını birbirine bağlar."
                        ],

                        ornekler: [
                            {
                                soru: "Bir ampulün yanmamasının nedenlerinden biri ne olabilir?",
                                cozum:
                                    "Devre bağlantısının tamamlanmamış olması ampulün yanmamasına neden olabilir."
                            }
                        ],

                        dikkat:
                            "Elektrikli araçlarla çalışırken güvenlik kurallarına uyulmalıdır. Evdeki elektrik prizleriyle deney yapılmamalıdır.",

                        ozet:
                            "Elektrik devrelerinde enerji kaynağı ve devre elemanlarının uygun şekilde bağlanması önemlidir.",

                        test: [
                            {
                                soru: "Ampul ne işe yarar?",
                                secenekler: [
                                    "Işık vermeye",
                                    "Su depolamaya",
                                    "Sıcaklığı ölçmeye",
                                    "Uzunluğu ölçmeye"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Basit devrede enerji kaynağı olarak ne kullanılabilir?",
                                secenekler: [
                                    "Pil",
                                    "Cetvel",
                                    "Ayna",
                                    "Kağıt"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Devrenin çalışması için ne gerekir?",
                                secenekler: [
                                    "Uygun bağlantı",
                                    "Sadece ampul",
                                    "Sadece kablo",
                                    "Hiçbir şey"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kablonun görevi nedir?",
                                secenekler: [
                                    "Devre elemanlarını bağlamak",
                                    "Sıcaklığı ölçmek",
                                    "Alan hesaplamak",
                                    "Işık üretmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Elektrik güvenliği önemli midir?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece yazın",
                                    "Sadece okulda"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-surdurulebilir-yasam",
                        ad: "Sürdürülebilir Yaşam ve Geri Dönüşüm",

                        giris:
                            "Doğal kaynakları korumak ve atıkları azaltmak sürdürülebilir bir yaşam için önemlidir.",

                        anlatim: `
                            <h3>♻️ Geri Dönüşüm</h3>

                            <p>
                            Kullanılmış bazı maddelerin çeşitli işlemlerden
                            geçirilerek yeniden kullanılabilir hâle
                            getirilmesine geri dönüşüm denir.
                            </p>

                            <h3>🌳 Doğal Kaynaklar</h3>

                            <p>
                            Su, enerji ve diğer doğal kaynakları dikkatli
                            kullanmak gelecek nesiller için önemlidir.
                            </p>

                            <h3>🌍 Sürdürülebilir Yaşam</h3>

                            <p>
                            İhtiyaçlarımızı karşılarken doğal kaynakların
                            korunmasını gözetmek sürdürülebilir yaşamın
                            önemli bir parçasıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Geri dönüşüm atıkların yeniden değerlendirilmesini sağlar.",
                            "Su ve enerji tasarrufu önemlidir.",
                            "Doğal kaynaklar sınırsız değildir.",
                            "Atıkların azaltılması çevrenin korunmasına katkı sağlar."
                        ],

                        ornekler: [
                            {
                                soru: "Kâğıtları ayrı bir geri dönüşüm kutusuna atmak neden önemlidir?",
                                cozum:
                                    "Kâğıdın geri dönüştürülmesini ve yeniden değerlendirilmesini kolaylaştırır."
                            }
                        ],

                        dikkat:
                            "Geri dönüşüm kadar tüketimi azaltmak ve ürünleri yeniden kullanmak da önemlidir.",

                        ozet:
                            "Sürdürülebilir yaşam doğal kaynakları korumayı, tasarrufu ve atıkların azaltılmasını gerektirir.",

                        test: [
                            {
                                soru: "Geri dönüşüm nedir?",
                                secenekler: [
                                    "Atıkların yeniden değerlendirilmesi",
                                    "Atıkları doğaya bırakmak",
                                    "Suyu kirletmek",
                                    "Enerjiyi boşa harcamak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hangisi tasarrufa örnektir?",
                                secenekler: [
                                    "Gereksiz yere ışığı açık bırakmak",
                                    "Suyu gereksiz akıtmak",
                                    "Kullanılmayan ışığı kapatmak",
                                    "Kağıdı israf etmek"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Doğal kaynakları korumak neden önemlidir?",
                                secenekler: [
                                    "Gelecek nesiller için",
                                    "Daha fazla atık üretmek için",
                                    "Suyu kirletmek için",
                                    "Enerji tüketimini artırmak için"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Atıkları azaltmak neye katkı sağlar?",
                                secenekler: [
                                    "Çevrenin korunmasına",
                                    "Kirliliğin artmasına",
                                    "Kaynakların tükenmesine",
                                    "İsrafa"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Sürdürülebilir yaşamda hangisi önemlidir?",
                                secenekler: [
                                    "Tasarruf",
                                    "İsraf",
                                    "Kirlilik",
                                    "Gereksiz tüketim"
                                ],
                                cevap: 0
                            }
                        ]
                    }

                ]
            },


            /* =================================================
               SOSYAL BİLGİLER
            ================================================= */

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",

                konular: [

                    {
                        id: "5-sosyal-birlikte-yasamak",
                        ad: "Birlikte Yaşamak",

                        giris:
                            "İnsanlar aile, okul ve toplum gibi farklı grupların içinde yaşar. Bu gruplarda çeşitli roller üstlenir ve sorumluluklarımızı yerine getiririz.",

                        anlatim: `
                            <h3>👨‍👩‍👧‍👦 Gruplar ve Roller</h3>

                            <p>
                            Aile, okul ve arkadaş çevresi gibi grupların
                            içinde farklı roller üstleniriz.
                            </p>

                            <h3>⚖️ Hak ve Sorumluluk</h3>

                            <p>
                            Haklarımızı kullanırken başkalarının haklarına
                            da saygı göstermeliyiz.
                            </p>

                            <h3>🤝 Yardımlaşma</h3>

                            <p>
                            İnsanların birbirlerine destek olması toplumsal
                            dayanışmayı güçlendirir.
                            </p>

                            <h3>🌎 Farklılıklara Saygı</h3>

                            <p>
                            İnsanların kültürleri, gelenekleri ve yaşam
                            biçimleri farklı olabilir. Bu farklılıklara
                            saygı göstermek birlikte yaşamayı kolaylaştırır.
                            </p>
                        `,

                        temelBilgi: [
                            "Her grubun kendine özgü rolleri ve sorumlulukları vardır.",
                            "Haklarımızı kullanırken başkalarının haklarına saygı göstermeliyiz.",
                            "Yardımlaşma toplumsal dayanışmayı güçlendirir.",
                            "Farklılıklara saygı birlikte yaşam için önemlidir."
                        ],

                        ornekler: [
                            {
                                soru: "Sınıf arkadaşına ders konusunda yardımcı olmak hangi davranışa örnektir?",
                                cozum:
                                    "Yardımlaşma ve dayanışmaya örnektir."
                            }
                        ],

                        dikkat:
                            "Hak sahibi olmak istediğimiz gibi davranabileceğimiz anlamına gelmez. Haklarımızın yanında sorumluluklarımız da vardır.",

                        ozet:
                            "Birlikte yaşarken rollerimizi, haklarımızı ve sorumluluklarımızı bilmeli; farklılıklara saygı göstermeliyiz.",

                        test: [
                            {
                                soru: "İnsanların birbirine destek olmasına ne denir?",
                                secenekler: [
                                    "Yardımlaşma",
                                    "İsraf",
                                    "Rekabet",
                                    "İzolasyon"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Haklarımızı kullanırken neye dikkat etmeliyiz?",
                                secenekler: [
                                    "Başkalarının haklarına",
                                    "Sadece kendi isteklerimize",
                                    "Hiçbir şeye",
                                    "Sadece notlara"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Farklılıklara nasıl yaklaşmalıyız?",
                                secenekler: [
                                    "Saygıyla",
                                    "Önyargıyla",
                                    "Küçümseyerek",
                                    "Yok sayarak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi bir grup olabilir?",
                                secenekler: [
                                    "Aile",
                                    "Tek bir eşya",
                                    "Bir kalem",
                                    "Bir masa"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Sorumluluklarımızı yerine getirmek neden önemlidir?",
                                secenekler: [
                                    "Birlikte yaşamı kolaylaştırır",
                                    "Sorunları artırır",
                                    "Hakları yok eder",
                                    "Dayanışmayı azaltır"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-sosyal-evimiz-dunya",
                        ad: "Evimiz Dünya",

                        giris:
                            "Dünya üzerinde farklı doğal ortamlar, ülkeler ve kültürler bulunur. Yaşadığımız çevreyi tanımak dünyayı daha iyi anlamamızı sağlar.",

                        anlatim: `
                            <h3>🌍 Dünya</h3>

                            <p>
                            Dünya farklı kıtalar, ülkeler, denizler ve
                            doğal çevrelerden oluşur.
                            </p>

                            <h3>🗺️ Haritalar</h3>

                            <p>
                            Haritalar yeryüzünün tamamını veya bir bölümünü
                            belirli bir oranda küçülterek gösteren araçlardır.
                            </p>

                            <h3>🌳 Doğal Çevre</h3>

                            <p>
                            Dağ, ova, göl, akarsu ve deniz gibi unsurlar
                            doğal çevrenin parçalarıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Dünya farklı doğal ve beşerî çevrelere sahiptir.",
                            "Haritalar yeryüzünü belirli oranda küçülterek gösterir.",
                            "Dağlar, göller ve akarsular doğal çevre unsurlarıdır.",
                            "Çevremizi korumak hepimizin sorumluluğudur."
                        ],

                        ornekler: [
                            {
                                soru: "Bir ilin veya ülkenin yerini öğrenmek için hangi araç kullanılabilir?",
                                cozum:
                                    "Haritadan yararlanılabilir."
                            }
                        ],

                        dikkat:
                            "Harita üzerindeki uzaklıklar gerçek uzaklıklarla aynı büyüklükte değildir; haritalarda ölçek kullanılır.",

                        ozet:
                            "Haritalar ve doğal çevre bilgisi Dünya'yı tanımamıza yardımcı olur.",

                        test: [
                            {
                                soru: "Yeryüzünü küçülterek gösteren araç nedir?",
                                secenekler: [
                                    "Harita",
                                    "Termometre",
                                    "Dinamometre",
                                    "Saat"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hangisi doğal çevre unsurudur?",
                                secenekler: [
                                    "Dağ",
                                    "Bina",
                                    "Köprü",
                                    "Fabrika"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Haritalar neyi gösterir?",
                                secenekler: [
                                    "Yeryüzünün tamamını veya bir bölümünü",
                                    "Sadece gökyüzünü",
                                    "Sadece denizi",
                                    "Sadece binaları"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Çevreyi korumak kimin sorumluluğudur?",
                                secenekler: [
                                    "Herkesin",
                                    "Sadece öğretmenin",
                                    "Sadece belediyenin",
                                    "Kimsenin"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Göl aşağıdakilerden hangisidir?",
                                secenekler: [
                                    "Doğal çevre unsuru",
                                    "Elektrik devresi",
                                    "Geometrik şekil",
                                    "Yapay araç"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-sosyal-ortak-mirasimiz",
                        ad: "Ortak Mirasımız",

                        giris:
                            "Geçmişten günümüze ulaşan tarihî eserler, kültürel değerler ve gelenekler toplumların ortak mirasının önemli parçalarıdır.",

                        anlatim: `
                            <h3>🏛️ Kültürel Miras</h3>

                            <p>
                            Geçmişten günümüze aktarılan tarihî eserler,
                            gelenekler, sanat eserleri ve yaşam biçimleri
                            kültürel mirasın parçalarıdır.
                            </p>

                            <h3>📜 Tarihî Eserler</h3>

                            <p>
                            Tarihî yapılar geçmişte yaşayan insanların
                            hayatı hakkında bilgi edinmemizi sağlar.
                            </p>

                            <h3>🛡️ Koruma</h3>

                            <p>
                            Kültürel mirasın gelecek nesillere aktarılması
                            için korunması gerekir.
                            </p>
                        `,

                        temelBilgi: [
                            "Kültürel miras geçmişten günümüze aktarılır.",
                            "Tarihî eserler geçmiş hakkında bilgi verir.",
                            "Kültürel değerler korunmalıdır.",
                            "Miras gelecek nesillere aktarılmalıdır."
                        ],

                        ornekler: [
                            {
                                soru: "Tarihî bir yapıyı korumak neden önemlidir?",
                                cozum:
                                    "Geçmişten gelen kültürel değerlerin gelecek nesillere aktarılmasını sağlar."
                            }
                        ],

                        dikkat:
                            "Kültürel miras yalnızca binalardan oluşmaz; gelenekler, sanatlar ve yaşam biçimleri de kültürel miras olabilir.",

                        ozet:
                            "Ortak mirasımız geçmiş ile gelecek arasında bağ kurmamızı sağlar.",

                        test: [
                            {
                                soru: "Kültürel miras neyi ifade eder?",
                                secenekler: [
                                    "Geçmişten aktarılan değerleri",
                                    "Sadece yeni binaları",
                                    "Sadece teknolojiyi",
                                    "Sadece doğal olayları"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tarihî eserler neden önemlidir?",
                                secenekler: [
                                    "Geçmiş hakkında bilgi verir",
                                    "Sadece süs amaçlıdır",
                                    "Hiçbir bilgi vermez",
                                    "Sadece ticaret içindir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kültürel miras ne yapılmalıdır?",
                                secenekler: [
                                    "Korunmalıdır",
                                    "Yok edilmelidir",
                                    "Terk edilmelidir",
                                    "Gizlenmelidir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gelenekler kültürel miras olabilir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece bazı ülkelerde",
                                    "Sadece okulda"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kültürel miras kime aktarılmalıdır?",
                                secenekler: [
                                    "Gelecek nesillere",
                                    "Kimseye",
                                    "Sadece turistlere",
                                    "Sadece öğretmenlere"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-sosyal-yasayan-demokrasimiz",
                        ad: "Yaşayan Demokrasimiz",

                        giris:
                            "Demokratik toplumlarda insanlar düşüncelerini ifade edebilir, haklarını kullanabilir ve karar alma süreçlerine katılabilir.",

                        anlatim: `
                            <h3>🗳️ Demokrasi</h3>

                            <p>
                            Demokrasi, insanların yönetime ve toplumsal
                            kararlara katılımını önemseyen bir yönetim
                            anlayışıdır.
                            </p>

                            <h3>⚖️ Haklar</h3>

                            <p>
                            İnsanların temel haklarına saygı göstermek
                            demokratik toplumun önemli özelliklerindendir.
                            </p>

                            <h3>🤝 Katılım</h3>

                            <p>
                            Fikirlerimizi saygılı biçimde ifade etmek ve
                            başkalarının düşüncelerini dinlemek demokratik
                            yaşamı güçlendirir.
                            </p>
                        `,

                        temelBilgi: [
                            "Demokrasi katılımı önemser.",
                            "İnsanların haklarına saygı gösterilmelidir.",
                            "Farklı düşünceler dinlenmelidir.",
                            "Karar alma süreçlerine katılım önemlidir."
                        ],

                        ornekler: [
                            {
                                soru: "Sınıfta yapılacak bir etkinlik için öğrencilerin fikirlerinin alınması neye örnektir?",
                                cozum:
                                    "Katılım ve demokratik karar alma anlayışına örnektir."
                            }
                        ],

                        dikkat:
                            "Demokrasi sadece oy kullanmak değildir; düşünceleri ifade etmek, dinlemek ve sorumluluk almak da demokratik yaşamın parçalarıdır.",

                        ozet:
                            "Demokratik yaşam haklara saygı, katılım, sorumluluk ve farklı düşüncelere açıklık gerektirir.",

                        test: [
                            {
                                soru: "Demokraside hangisi önemlidir?",
                                secenekler: [
                                    "Katılım",
                                    "Baskı",
                                    "Sessizlik",
                                    "Ayrımcılık"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Farklı düşüncelere nasıl yaklaşılmalıdır?",
                                secenekler: [
                                    "Saygıyla",
                                    "Küçümseyerek",
                                    "Yok sayarak",
                                    "Engelleyerek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Karar alma süreçlerine katılım neyi güçlendirir?",
                                secenekler: [
                                    "Demokratik yaşamı",
                                    "İsrafı",
                                    "Kirliliği",
                                    "Ayrımcılığı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Haklara nasıl yaklaşılmalıdır?",
                                secenekler: [
                                    "Saygıyla",
                                    "Engelleyerek",
                                    "Yok sayarak",
                                    "Kötüye kullanarak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Fikirlerimizi nasıl ifade etmeliyiz?",
                                secenekler: [
                                    "Saygılı biçimde",
                                    "Bağırarak",
                                    "Hakaret ederek",
                                    "Kimseyi dinlemeden"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-sosyal-hayatimizdaki-ekonomi",
                        ad: "Hayatımızdaki Ekonomi",

                        giris:
                            "Günlük hayatımızda ihtiyaçlarımızı karşılamak için ürün ve hizmetlerden yararlanır, kaynaklarımızı kullanırız.",

                        anlatim: `
                            <h3>💰 İhtiyaç ve İstek</h3>

                            <p>
                            İhtiyaçlar yaşamımızı sürdürmek için gerekli
                            olan şeylerdir. İstekler ise sahip olmak
                            istediğimiz şeylerdir.
                            </p>

                            <h3>🪙 Bütçe</h3>

                            <p>
                            Gelir ve giderlerimizi planlamak bütçe
                            oluşturmanın temelidir.
                            </p>

                            <h3>♻️ Tasarruf</h3>

                            <p>
                            Kaynakları gereksiz yere tüketmemek ve
                            ihtiyaçlarımızı planlı şekilde karşılamak
                            tasarruf açısından önemlidir.
                            </p>
                        `,

                        temelBilgi: [
                            "İhtiyaçlar yaşam için gereklidir.",
                            "İstekler zorunlu olmayan tercihler olabilir.",
                            "Bütçe gelir ve giderlerin planlanmasına yardımcı olur.",
                            "Tasarruf kaynakların bilinçli kullanılmasını sağlar."
                        ],

                        ornekler: [
                            {
                                soru: "Harçlığının bir bölümünü gelecekte kullanmak için ayırmak hangi davranıştır?",
                                cozum:
                                    "Tasarruf yapmaya örnektir."
                            }
                        ],

                        dikkat:
                            "İhtiyaç ile isteği birbirinden ayırmak bütçeyi daha bilinçli kullanmamıza yardımcı olur.",

                        ozet:
                            "Ekonomik yaşamda ihtiyaçlarımızı belirlemek, bütçe yapmak ve tasarruf etmek önemlidir.",

                        test: [
                            {
                                soru: "Hangisi ihtiyaç olabilir?",
                                secenekler: [
                                    "Temel gıda",
                                    "Yeni oyuncak",
                                    "Lüks eşya",
                                    "Gereksiz süs"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bütçe ne işe yarar?",
                                secenekler: [
                                    "Gelir ve giderleri planlamaya",
                                    "Suyu kirletmeye",
                                    "Daha fazla israf etmeye",
                                    "Kaynakları tüketmeye"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tasarruf nedir?",
                                secenekler: [
                                    "Kaynakları bilinçli kullanmak",
                                    "Her şeyi tüketmek",
                                    "Gereksiz harcama yapmak",
                                    "İsraf etmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İstekler için hangisi söylenebilir?",
                                secenekler: [
                                    "Her zaman zorunludur",
                                    "Zorunlu olmayan tercihler olabilir",
                                    "Hiçbir zaman olmaz",
                                    "Sadece yiyecektir"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Harçlığın bir kısmını biriktirmek neye örnektir?",
                                secenekler: [
                                    "Tasarruf",
                                    "İsraf",
                                    "Tüketim",
                                    "Borç"
                                ],
                                cevap: 0
                            }
                        ]
                    }

                ]
            }

        }
    }

};
