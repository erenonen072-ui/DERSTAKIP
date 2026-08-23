/* =========================================================
   DERS TAKİP
   KİTAPLIK DATA
   2026-2027
   Türkiye Yüzyılı Maarif Modeli
   ========================================================= */

window.kitaplikData = {

    /* =====================================================
       5. SINIF
       ===================================================== */

    "5": {
        ad: "5. Sınıf",

        dersler: {

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [

                    {
                        id: "5-turkce-oyun-dunyasi",
                        ad: "Oyun Dünyası",

                        giris:
                            "Oyunların bireysel ve sosyal yaşamımızdaki yerini keşfediyoruz.",

                        anlatim: `
                            <h3>🎯 Konu Anlatımı</h3>

                            <p>
                            Oyun; bireylerin eğlenmesini, iletişim kurmasını,
                            birlikte hareket etmesini ve çeşitli beceriler
                            kazanmasını sağlayan etkinliklerden biridir.
                            </p>

                            <h3>📚 Öğrenelim</h3>

                            <p>
                            Oyunlarla ilgili metinleri incelerken ana düşünce,
                            yardımcı düşünceler, olayların sırası ve metindeki
                            önemli bilgiler üzerinde durulur.
                            </p>

                            <h3>🧠 Metin İnceleme</h3>

                            <p>
                            Bir metni okurken önce metnin konusunu belirlemek,
                            ardından yazarın vermek istediği mesajı anlamaya
                            çalışmak önemlidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Metnin konusu metinde ne anlatıldığını gösterir.",
                            "Ana düşünce metnin okuyucuya vermek istediği temel mesajdır.",
                            "Yardımcı düşünceler ana düşünceyi destekler."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "Bir metinde yazarın okuyucuya vermek istediği temel mesaja ne denir?",
                                cozum:
                                    "Bu mesaja ana düşünce denir."
                            },
                            {
                                soru:
                                    "Metnin ne hakkında olduğunu bulmak için hangi soruyu sorabiliriz?",
                                cozum:
                                    "Metnin konusu için 'Metinde ne anlatılıyor?' sorusu sorulabilir."
                            }
                        ],

                        dikkat:
                            "Konu ile ana düşünce aynı şey değildir. Konu daha genel, ana düşünce ise metnin temel mesajıdır.",

                        ozet:
                            "Metinleri anlamak için konu, ana düşünce ve yardımcı düşünceleri belirlemeliyiz.",

                        test: [

                            {
                                soru:
                                    "Bir metinde yazarın vermek istediği temel mesaja ne denir?",
                                secenekler: [
                                    "Konu",
                                    "Ana düşünce",
                                    "Başlık",
                                    "Yardımcı düşünce"
                                ],
                                cevap: 1
                            },

                            {
                                soru:
                                    "Bir metnin ne hakkında olduğunu gösteren kavram hangisidir?",
                                secenekler: [
                                    "Konu",
                                    "Ana düşünce",
                                    "Sonuç",
                                    "Örnek"
                                ],
                                cevap: 0
                            },

                            {
                                soru:
                                    "Ana düşünceyi destekleyen düşüncelere ne denir?",
                                secenekler: [
                                    "Başlık",
                                    "Yardımcı düşünceler",
                                    "Konu",
                                    "Giriş"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-turkce-ataturku-tanimak",
                        ad: "Atatürk'ü Tanımak",

                        giris:
                            "Atatürk'ün hayatını ve kişilik özelliklerini anlatan metinleri inceleyelim.",

                        anlatim: `
                            <h3>📖 Konu Anlatımı</h3>
                            <p>
                            Atatürk'ü anlatan metinlerde olayların kronolojik
                            sırası, kişilik özellikleri ve tarihî bilgiler
                            üzerinde durulur.
                            </p>

                            <h3>🧠 Okuma Stratejileri</h3>
                            <p>
                            Tarihî bir metin okunurken olayların gerçekleştiği
                            zaman, kişiler ve olaylar arasındaki ilişkiler
                            dikkate alınmalıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Kronolojik sıra olayların zaman sırasına göre verilmesidir.",
                            "Tarihî metinlerde zaman ve kişi bilgileri önemlidir."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "Olayların zaman sırasına göre verilmesine ne denir?",
                                cozum:
                                    "Kronolojik sıralama denir."
                            }
                        ],

                        ozet:
                            "Tarihî metinlerde zaman, kişi ve olay ilişkilerini dikkatle incelemeliyiz.",

                        test: [
                            {
                                soru:
                                    "Olayların oluş sırasına göre sıralanmasına ne denir?",
                                secenekler: [
                                    "Kronolojik sıra",
                                    "Alfabetik sıra",
                                    "Karışık sıra",
                                    "Nedensiz sıra"
                                ],
                                cevap: 0
                            },
                            {
                                soru:
                                    "Tarihî metinlerde aşağıdakilerden hangisi özellikle önemlidir?",
                                secenekler: [
                                    "Renkler",
                                    "Zaman",
                                    "Sayfa sayısı",
                                    "Yazı tipi"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-turkce-duygularimi-taniyorum",
                        ad: "Duygularımı Tanıyorum",

                        giris:
                            "Duygularımızı ifade etmeyi ve metinlerdeki duyguları fark etmeyi öğreniyoruz.",

                        anlatim: `
                            <h3>😊 Konu Anlatımı</h3>
                            <p>
                            Sevinç, üzüntü, korku, şaşkınlık ve heyecan gibi
                            duygular günlük iletişimimizin önemli parçalarıdır.
                            </p>

                            <p>
                            Bir metinde kişilerin hangi duyguyu yaşadığını
                            anlamak için kullandıkları kelimelere ve olaylara
                            dikkat edilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Duygular iletişimimizi etkiler.",
                            "Metindeki kişilerin davranışları duyguları hakkında ipucu verebilir."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "Bir kişinin sevincini gösteren davranışlara örnek veriniz.",
                                cozum:
                                    "Gülümsemek, heyecanlanmak veya sevincini başkalarıyla paylaşmak örnek olabilir."
                            }
                        ],

                        ozet:
                            "Duyguları doğru anlamak ve ifade etmek etkili iletişim için önemlidir.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi bir duygu değildir?",
                                secenekler: [
                                    "Sevinç",
                                    "Üzüntü",
                                    "Korku",
                                    "Masa"
                                ],
                                cevap: 3
                            },
                            {
                                soru:
                                    "Bir metindeki kişinin duygusunu anlamak için hangisine bakabiliriz?",
                                secenekler: [
                                    "Davranışlarına",
                                    "Sayfa numarasına",
                                    "Kitabın fiyatına",
                                    "Yazı boyutuna"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-turkce-geleneklerimiz",
                        ad: "Geleneklerimiz",

                        giris:
                            "Toplumumuzun kültürel mirasını ve geleneklerini tanıyoruz.",

                        anlatim: `
                            <h3>🏛️ Konu Anlatımı</h3>
                            <p>
                            Gelenekler toplumların geçmişten günümüze aktardığı
                            kültürel değerlerdir.
                            </p>
                        `,

                        temelBilgi: [
                            "Gelenekler kültürel mirasın bir parçasıdır.",
                            "Kültürel değerler nesilden nesile aktarılabilir."
                        ],

                        ozet:
                            "Geleneklerimizi tanımak kültürel kimliğimizi anlamamıza yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Gelenekler için hangisi söylenebilir?",
                                secenekler: [
                                    "Kültürel değerlerdir.",
                                    "Sadece bireyseldir.",
                                    "Hiç aktarılmaz.",
                                    "Doğayla ilgilidir."
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-turkce-iletisim",
                        ad: "İletişim ve Sosyal İlişkiler",

                        giris:
                            "Sağlıklı iletişim kurmanın yollarını öğreniyoruz.",

                        anlatim: `
                            <h3>💬 Etkili İletişim</h3>
                            <p>
                            Etkili iletişimde karşımızdaki kişiyi dinlemek,
                            uygun kelimeler kullanmak ve düşüncelerimizi
                            açık biçimde ifade etmek önemlidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Aktif dinleme iletişimi güçlendirir.",
                            "Saygılı iletişim sosyal ilişkileri olumlu etkiler."
                        ],

                        ozet:
                            "İyi iletişim için dinlemek, anlamak ve saygılı konuşmak gerekir.",

                        test: [
                            {
                                soru:
                                    "Etkili iletişim için hangisi önemlidir?",
                                secenekler: [
                                    "Dinlememek",
                                    "Karşımızdakini küçümsemek",
                                    "Aktif dinlemek",
                                    "Sürekli konuşmak"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-turkce-saglikli-yasiyorum",
                        ad: "Sağlıklı Yaşıyorum",

                        giris:
                            "Sağlıklı yaşamın önemini ve sağlıklı alışkanlıkları öğreniyoruz.",

                        anlatim: `
                            <h3>🥗 Sağlıklı Yaşam</h3>
                            <p>
                            Dengeli beslenmek, yeterince hareket etmek,
                            düzenli uyumak ve kişisel temizliğe dikkat etmek
                            sağlıklı yaşamın temel unsurlarındandır.
                            </p>
                        `,

                        temelBilgi: [
                            "Dengeli beslenme önemlidir.",
                            "Düzenli uyku vücudun dinlenmesine yardımcı olur.",
                            "Fiziksel aktivite sağlığı destekler."
                        ],

                        ozet:
                            "Sağlıklı yaşam için beslenme, uyku, hareket ve temizlik alışkanlıklarımızı dengeli şekilde sürdürmeliyiz.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi sağlıklı yaşam alışkanlığıdır?",
                                secenekler: [
                                    "Düzenli uyumak",
                                    "Sürekli hareketsiz kalmak",
                                    "Öğünleri tamamen atlamak",
                                    "Yeterince su içmemek"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "5-mat-sayilar",
                        ad: "Sayılar ve Nicelikler",

                        giris:
                            "Doğal sayılar ve nicelikler arasındaki ilişkileri öğreniyoruz.",

                        anlatim: `
                            <h3>🔢 Doğal Sayılar</h3>

                            <p>
                            Doğal sayılar 0'dan başlayarak sonsuza kadar
                            devam eden sayılardır.
                            </p>

                            <p>
                            Sayıları karşılaştırırken basamak değerlerinden
                            yararlanabiliriz.
                            </p>

                            <h3>📌 Basamak Değeri</h3>

                            <p>
                            Bir rakamın bulunduğu basamağa göre aldığı değere
                            basamak değeri denir.
                            </p>
                        `,

                        temelBilgi: [
                            "Doğal sayılar 0'dan başlar.",
                            "Bir rakamın değeri bulunduğu basamağa göre değişebilir.",
                            "Büyük sayılar basamaklarına göre karşılaştırılır."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "3 452 sayısında 4 rakamının basamak değeri kaçtır?",
                                cozum:
                                    "4 yüzler basamağındadır. Basamak değeri 400'dür."
                            },
                            {
                                soru:
                                    "2 850 ile 2 805 sayılarından hangisi büyüktür?",
                                cozum:
                                    "2 850 daha büyüktür."
                            }
                        ],

                        dikkat:
                            "Rakam ile basamak değerini karıştırma. Rakam 4 olabilir ancak basamak değeri 400 olabilir.",

                        ozet:
                            "Sayıları karşılaştırırken basamak değerlerini dikkate almalıyız.",

                        test: [
                            {
                                soru:
                                    "4 725 sayısında 7'nin basamak değeri kaçtır?",
                                secenekler: [
                                    "7",
                                    "70",
                                    "700",
                                    "7000"
                                ],
                                cevap: 2
                            },
                            {
                                soru:
                                    "Aşağıdakilerden hangisi daha büyüktür?",
                                secenekler: [
                                    "2 405",
                                    "2 450",
                                    "2 045",
                                    "2 405"
                                ],
                                cevap: 1
                            },
                            {
                                soru:
                                    "Doğal sayılar hangi sayıdan başlar?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "-1",
                                    "10"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-mat-cebirsel-dusunme",
                        ad: "İşlemlerle Cebirsel Düşünme",

                        giris:
                            "İşlemler arasındaki ilişkileri ve örüntüleri keşfediyoruz.",

                        anlatim: `
                            <h3>🧩 Örüntüler</h3>
                            <p>
                            Belirli bir kurala göre ilerleyen sayı veya şekil
                            dizilerine örüntü denir.
                            </p>

                            <p>
                            Örüntünün kuralını bulmak için ardışık terimler
                            arasındaki ilişki incelenir.
                            </p>
                        `,

                        temelBilgi: [
                            "Örüntüler belirli bir kurala göre oluşur.",
                            "Ardışık terimler arasındaki fark incelenebilir."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "2, 5, 8, 11 örüntüsünün kuralı nedir?",
                                cozum:
                                    "Her adımda 3 eklenmektedir."
                            }
                        ],

                        ozet:
                            "Örüntülerde terimler arasındaki düzeni bulmak önemlidir.",

                        test: [
                            {
                                soru:
                                    "3, 6, 9, 12 örüntüsünde her adımda ne olur?",
                                secenekler: [
                                    "1 çıkarılır",
                                    "2 eklenir",
                                    "3 eklenir",
                                    "3 çıkarılır"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Temel geometrik şekilleri ve özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Temel Geometrik Şekiller</h3>
                            <p>
                            Üçgen, kare, dikdörtgen ve çember gibi geometrik
                            şekiller farklı özelliklere sahiptir.
                            </p>
                        `,

                        temelBilgi: [
                            "Üçgenin üç kenarı vardır.",
                            "Karenin dört eşit kenarı vardır.",
                            "Dikdörtgenin karşılıklı kenarları eşittir."
                        ],

                        ozet:
                            "Geometrik şekiller kenar ve açı özellikleriyle incelenebilir.",

                        test: [
                            {
                                soru:
                                    "Karenin kaç kenarı vardır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris:
                            "Uzunluk ve alan gibi geometrik nicelikleri öğreniyoruz.",

                        anlatim: `
                            <h3>📏 Uzunluk</h3>
                            <p>
                            Uzunluk ölçmek için milimetre, santimetre, metre
                            ve kilometre gibi birimler kullanılır.
                            </p>
                        `,

                        temelBilgi: [
                            "100 santimetre 1 metredir.",
                            "1000 metre 1 kilometredir."
                        ],

                        ozet:
                            "Uzunluk ölçülerinde uygun ölçme birimini seçmek önemlidir.",

                        test: [
                            {
                                soru:
                                    "1 metre kaç santimetredir?",
                                secenekler: [
                                    "10",
                                    "50",
                                    "100",
                                    "1000"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "Veri toplama ve verileri yorumlama sürecini öğreniyoruz.",

                        anlatim: `
                            <h3>📊 Veri</h3>
                            <p>
                            Araştırma yaparken elde edilen bilgilere veri denir.
                            Veriler tablo veya grafiklerle gösterilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler araştırma sorularına cevap bulmak için kullanılır.",
                            "Veriler tablo ve grafiklerle gösterilebilir."
                        ],

                        ozet:
                            "Verileri düzenlemek ve yorumlamak araştırma sürecinin önemli bir parçasıdır.",

                        test: [
                            {
                                soru:
                                    "Araştırmada elde edilen bilgilere ne denir?",
                                secenekler: [
                                    "Veri",
                                    "Kural",
                                    "Açı",
                                    "Formül"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-mat-olasilik",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Olasılık kavramına giriş yapıyoruz.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>
                            <p>
                            Bir olayın gerçekleşme ihtimaline olasılık denir.
                            </p>

                            <p>
                            Kesin gerçekleşen olayların olasılığı 1,
                            imkânsız olayların olasılığı 0'dır.
                            </p>
                        `,

                        temelBilgi: [
                            "Kesin olayın olasılığı 1'dir.",
                            "İmkânsız olayın olasılığı 0'dır."
                        ],

                        ozet:
                            "Olasılık bir olayın gerçekleşme ihtimalini ifade eder.",

                        test: [
                            {
                                soru:
                                    "Kesin gerçekleşecek bir olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "0,5",
                                    "1",
                                    "2"
                                ],
                                cevap: 2
                            }
                        ]
                    }
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [

                    {
                        id: "5-fen-dunya",
                        ad: "Dünya, Güneş ve Ay",

                        giris:
                            "Dünya, Güneş ve Ay'ın temel özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>🌍 Dünya ve Gökyüzü</h3>
                            <p>
                            Dünya Güneş'in etrafında dolanırken kendi ekseni
                            etrafında da döner.
                            </p>

                            <p>
                            Ay Dünya'nın doğal uydusudur.
                            </p>
                        `,

                        temelBilgi: [
                            "Dünya'nın doğal uydusu Ay'dır.",
                            "Dünya kendi ekseni etrafında döner.",
                            "Dünya Güneş'in etrafında dolanır."
                        ],

                        ozet:
                            "Dünya, Güneş ve Ay hareketleriyle birbirleriyle ilişkilidir.",

                        test: [
                            {
                                soru:
                                    "Dünya'nın doğal uydusu hangisidir?",
                                secenekler: [
                                    "Mars",
                                    "Ay",
                                    "Venüs",
                                    "Güneş"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-kuvvet",
                        ad: "Kuvvet ve Kuvvetin Ölçülmesi",

                        giris:
                            "Kuvvetin cisimler üzerindeki etkilerini öğreniyoruz.",

                        anlatim: `
                            <h3>💪 Kuvvet</h3>
                            <p>
                            Kuvvet cisimlerin hareket durumunu veya şeklini
                            değiştirebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Kuvvet itme veya çekme şeklinde olabilir.",
                            "Kuvvet cisimlerin hareketini değiştirebilir."
                        ],

                        ozet:
                            "Kuvvet cisimlerin hareketini ve şeklini etkileyebilir.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi kuvvetin etkisidir?",
                                secenekler: [
                                    "Cismin hareketini değiştirmek",
                                    "Cismi görünmez yapmak",
                                    "Zamanı durdurmak",
                                    "Işığı yok etmek"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    {
                        id: "5-sosyal-birey-toplum",
                        ad: "Birey ve Toplum",

                        giris:
                            "Bireyin toplum içindeki yerini ve rollerini öğreniyoruz.",

                        anlatim: `
                            <h3>👥 Birey ve Toplum</h3>
                            <p>
                            İnsanlar farklı gruplar içerisinde farklı roller
                            üstlenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Her bireyin farklı özellikleri vardır.",
                            "Bireyler toplum içinde çeşitli roller üstlenir."
                        ],

                        ozet:
                            "Birey ve toplum birbirleriyle sürekli etkileşim içindedir.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi bir sosyal role örnektir?",
                                secenekler: [
                                    "Öğrenci",
                                    "Masa",
                                    "Kalem",
                                    "Kitap"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: [
                    {
                        id: "5-din-allah",
                        ad: "Allah İnancı",

                        giris:
                            "Allah inancının temel kavramlarını öğreniyoruz.",

                        anlatim: `
                            <h3>🕌 Allah İnancı</h3>
                            <p>
                            İslam inancında Allah'ın varlığına ve birliğine
                            inanmak temel inanç esaslarındandır.
                            </p>
                        `,

                        temelBilgi: [
                            "Allah'ın bir olduğuna inanılır.",
                            "İman İslam'ın temel kavramlarındandır."
                        ],

                        ozet:
                            "Allah inancı İslam dininin temel inanç konularındandır.",

                        test: [
                            {
                                soru:
                                    "İslam inancında Allah'ın bir olması hangi kavramla ifade edilir?",
                                secenekler: [
                                    "Tevhid",
                                    "Sabır",
                                    "Şükür",
                                    "Adalet"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    {
                        id: "5-ingilizce-hello",
                        ad: "Greetings",

                        giris:
                            "İngilizce selamlaşma ifadelerini öğreniyoruz.",

                        anlatim: `
                            <h3>👋 Greetings</h3>

                            <p>
                            Hello: Merhaba
                            </p>

                            <p>
                            Good morning: Günaydın
                            </p>

                            <p>
                            How are you?: Nasılsın?
                            </p>
                        `,

                        temelBilgi: [
                            "Hello = Merhaba",
                            "Good morning = Günaydın",
                            "How are you? = Nasılsın?"
                        ],

                        ozet:
                            "Günlük iletişimde temel selamlaşma ifadelerini kullanabiliriz.",

                        test: [
                            {
                                soru:
                                    "'Good morning' ne demektir?",
                                secenekler: [
                                    "İyi geceler",
                                    "Günaydın",
                                    "Hoşça kal",
                                    "Teşekkürler"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            }
        }
    },


    /* =====================================================
       6. SINIF
       ===================================================== */

    "6": {
        ad: "6. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "6-mat-sayilar-nicelikler",
                        ad: "Sayılar ve Nicelikler",

                        giris:
                            "Sayılar ve nicelikler arasındaki ilişkileri inceliyoruz.",

                        anlatim: `
                            <h3>🔢 Sayılar</h3>
                            <p>
                            Sayıları karşılaştırabilir, sıralayabilir ve
                            farklı gösterimlerle ifade edebiliriz.
                            </p>
                        `,

                        temelBilgi: [
                            "Sayıların farklı gösterimleri olabilir.",
                            "Sayılar karşılaştırılabilir ve sıralanabilir."
                        ],

                        ozet:
                            "Sayılar arasındaki ilişkileri anlamak matematiksel düşünmenin temelidir.",

                        test: [
                            {
                                soru:
                                    "Sayıları karşılaştırırken hangi semboller kullanılır?",
                                secenekler: [
                                    "> < =",
                                    "+ - ×",
                                    "( ) [ ]",
                                    "/ : %"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "6-mat-cebirsel-degisimler",
                        ad: "İşlemlerle Cebirsel Düşünme ve Değişimler",

                        giris:
                            "Cebirsel düşünmenin temelini öğreniyoruz.",

                        anlatim: `
                            <h3>🧩 Cebirsel Düşünme</h3>
                            <p>
                            Bilinmeyen veya değişkenleri harflerle ifade etmek
                            matematiksel ilişkileri daha genel biçimde
                            göstermemizi sağlar.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler harflerle gösterilebilir.",
                            "Cebirsel ifadeler matematiksel ilişkileri gösterir."
                        ],

                        ozet:
                            "Cebirsel ifadeler bilinmeyenleri ve değişimleri ifade etmek için kullanılır.",

                        test: [
                            {
                                soru:
                                    "Bir bilinmeyeni göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Harf",
                                    "Nokta",
                                    "Virgül",
                                    "Soru işareti"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "6-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekillerin özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Geometrik Şekiller</h3>
                            <p>
                            Üçgenler, dörtgenler ve diğer geometrik şekiller
                            kenar ve açı özellikleri bakımından incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Geometrik şekillerin farklı özellikleri vardır.",
                            "Açı ve kenarlar şekillerin incelenmesinde önemlidir."
                        ],

                        ozet:
                            "Geometrik şekilleri kenar ve açı özelliklerine göre sınıflandırabiliriz.",

                        test: [
                            {
                                soru:
                                    "Üçgenin kaç kenarı vardır?",
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
                        id: "6-mat-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris:
                            "Alan ve uzunluk gibi geometrik nicelikleri öğreniyoruz.",

                        anlatim: `
                            <h3>📏 Ölçme</h3>
                            <p>
                            Geometrik şekillerin uzunluk ve alan gibi
                            nicelikleri ölçülebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Uzunluk birimleri kullanılır.",
                            "Alan ölçülebilir bir geometrik niceliktir."
                        ],

                        ozet:
                            "Geometrik nicelikleri uygun ölçme birimleriyle ifade ederiz.",

                        test: [
                            {
                                soru:
                                    "Alan hangi tür niceliktir?",
                                secenekler: [
                                    "Geometrik nicelik",
                                    "Dil bilgisi",
                                    "Tarih",
                                    "Müzik"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "6-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel araştırmanın temel adımlarını öğreniyoruz.",

                        anlatim: `
                            <h3>📊 Araştırma</h3>
                            <p>
                            İstatistiksel araştırmalarda araştırma sorusu
                            oluşturulur, veri toplanır ve veriler yorumlanır.
                            </p>
                        `,

                        temelBilgi: [
                            "Araştırma sorusu oluşturulur.",
                            "Veriler toplanır.",
                            "Veriler yorumlanır."
                        ],

                        ozet:
                            "İstatistiksel araştırma veri toplama ve yorumlama sürecidir.",

                        test: [
                            {
                                soru:
                                    "İstatistiksel araştırmada ilk adımlardan biri nedir?",
                                secenekler: [
                                    "Araştırma sorusu oluşturmak",
                                    "Kitabı kapatmak",
                                    "Sonucu tahmin etmeden bırakmak",
                                    "Verileri silmek"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "6-mat-veriden-olasiliga",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Olasılık ve veri arasındaki ilişkiyi inceliyoruz.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>
                            <p>
                            Bir olayın gerçekleşme ihtimali olasılık ile
                            ifade edilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Olasılık bir olayın gerçekleşme ihtimalini gösterir.",
                            "Kesin olayların olasılığı 1'dir."
                        ],

                        ozet:
                            "Olasılık olayların gerçekleşme ihtimalini incelememizi sağlar.",

                        test: [
                            {
                                soru:
                                    "Kesin olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "2",
                                    "10"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [
                    {
                        id: "6-turkce-okuma",
                        ad: "Okuma ve Anlama",

                        giris:
                            "Metinleri daha etkili anlamayı öğreniyoruz.",

                        anlatim: `
                            <h3>📖 Okuma</h3>
                            <p>
                            Etkili okuma; metnin konusu, ana düşüncesi,
                            yardımcı düşünceleri ve önemli ayrıntılarını
                            belirlemeyi içerir.
                            </p>
                        `,

                        temelBilgi: [
                            "Konu metnin ne hakkında olduğunu belirtir.",
                            "Ana düşünce temel mesajdır."
                        ],

                        ozet:
                            "Okuduğumuzu anlamak için metindeki önemli bilgileri belirlemeliyiz.",

                        test: [
                            {
                                soru:
                                    "Metnin temel mesajına ne denir?",
                                secenekler: [
                                    "Ana düşünce",
                                    "Başlık",
                                    "Kelimeler",
                                    "Paragraf"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    {
                        id: "6-fen-gunes-sistemi",
                        ad: "Güneş Sistemi ve Tutulmalar",

                        giris:
                            "Güneş sistemi ve tutulmalar hakkında temel bilgileri öğreniyoruz.",

                        anlatim: `
                            <h3>☀️ Güneş Sistemi</h3>
                            <p>
                            Güneş Sistemi'nde Güneş ve onun etrafında
                            dolanan gezegenler bulunur.
                            </p>

                            <h3>🌑 Tutulmalar</h3>
                            <p>
                            Güneş ve Ay tutulmaları gök cisimlerinin
                            belirli doğrultularda bulunmasıyla gerçekleşir.
                            </p>
                        `,

                        temelBilgi: [
                            "Güneş Sistemi'nin merkezinde Güneş bulunur.",
                            "Ay tutulması Dünya'nın Ay ile Güneş arasına girmesiyle oluşur."
                        ],

                        ozet:
                            "Güneş sistemi gök cisimlerinin oluşturduğu bir sistemdir.",

                        test: [
                            {
                                soru:
                                    "Güneş Sistemi'nin merkezinde hangi gök cismi bulunur?",
                                secenekler: [
                                    "Ay",
                                    "Dünya",
                                    "Güneş",
                                    "Mars"
                                ],
                                cevap: 2
                            }
                        ]
                    }
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    {
                        id: "6-sosyal-tarih",
                        ad: "Ortak Mirasımız",

                        giris:
                            "Geçmişten günümüze ulaşan ortak mirasımızı inceliyoruz.",

                        anlatim: `
                            <h3>🏛️ Ortak Miras</h3>
                            <p>
                            İnsanlığın geçmişten günümüze bıraktığı
                            kültürel ve tarihî değerler ortak mirasımızın
                            parçalarıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Tarihî eserler kültürel mirasın parçasıdır.",
                            "Kültürel miras korunmalıdır."
                        ],

                        ozet:
                            "Ortak miras geçmiş ile bugün arasında bağ kurar.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi kültürel mirasa örnektir?",
                                secenekler: [
                                    "Tarihî eser",
                                    "Plastik poşet",
                                    "Günlük hava",
                                    "Trafik ışığı"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: [
                    {
                        id: "6-din-peygamber",
                        ad: "Peygamberlere İman",

                        giris:
                            "Peygamberlik kavramını ve peygamberlerin görevlerini öğreniyoruz.",

                        anlatim: `
                            <h3>🕌 Peygamberler</h3>
                            <p>
                            İslam inancında peygamberler Allah'ın mesajlarını
                            insanlara ulaştıran elçilerdir.
                            </p>
                        `,

                        temelBilgi: [
                            "Peygamberler insanlara rehberlik eder.",
                            "Hz. Muhammed son peygamberdir."
                        ],

                        ozet:
                            "Peygamberler insanlara doğru yolu göstermek için gönderilmiştir.",

                        test: [
                            {
                                soru:
                                    "İslam inancına göre son peygamber kimdir?",
                                secenekler: [
                                    "Hz. Musa",
                                    "Hz. İsa",
                                    "Hz. Muhammed",
                                    "Hz. Nuh"
                                ],
                                cevap: 2
                            }
                        ]
                    }
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: [
                    {
                        id: "6-ingilizce-daily-routines",
                        ad: "Daily Routines",

                        giris:
                            "Günlük rutinlerimizi İngilizce ifade etmeyi öğreniyoruz.",

                        anlatim: `
                            <h3>⏰ Daily Routines</h3>
                            <p>
                            I get up: Kalkarım.
                            </p>

                            <p>
                            I have breakfast: Kahvaltı yaparım.
                            </p>

                            <p>
                            I go to school: Okula giderim.
                            </p>
                        `,

                        temelBilgi: [
                            "get up = kalkmak",
                            "have breakfast = kahvaltı yapmak",
                            "go to school = okula gitmek"
                        ],

                        ozet:
                            "Günlük rutinlerimizi basit İngilizce cümlelerle anlatabiliriz.",

                        test: [
                            {
                                soru:
                                    "'I go to school' ne demektir?",
                                secenekler: [
                                    "Okula giderim.",
                                    "Uyurum.",
                                    "Yemek yerim.",
                                    "Kitap okurum."
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            }
        }
    },


    /* =====================================================
       7. SINIF
       ===================================================== */

    "7": {
        ad: "7. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "7-mat-sayilar",
                        ad: "Sayılar ve Nicelikler",

                        giris:
                            "Sayılar ve nicelikler arasındaki ilişkileri inceliyoruz.",

                        anlatim: `
                            <h3>🔢 Sayılar</h3>
                            <p>
                            Sayılar farklı işlemler ve gösterimler
                            kullanılarak incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Sayılar karşılaştırılabilir.",
                            "Sayılar farklı gösterimlerle ifade edilebilir."
                        ],

                        ozet:
                            "Sayılar arasındaki ilişkileri kullanarak matematiksel problemleri çözebiliriz.",

                        test: [
                            {
                                soru:
                                    "Sayıları karşılaştırmak için hangileri kullanılabilir?",
                                secenekler: [
                                    "> < =",
                                    "+ -",
                                    "× ÷",
                                    "( )"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "7-mat-cebir",
                        ad: "İşlemlerle Cebirsel Düşünme ve Değişimler",

                        giris:
                            "Cebirsel ifadeler ve değişimler arasındaki ilişkileri öğreniyoruz.",

                        anlatim: `
                            <h3>🧮 Cebir</h3>
                            <p>
                            Cebirsel ifadelerde bilinmeyen veya değişkenler
                            harflerle temsil edilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler harflerle gösterilebilir.",
                            "Cebirsel ifadelerde işlemler yapılabilir."
                        ],

                        ozet:
                            "Cebirsel düşünme değişkenler arasındaki ilişkileri ifade etmemizi sağlar.",

                        test: [
                            {
                                soru:
                                    "Cebirsel ifadelerde bilinmeyen ne ile gösterilebilir?",
                                secenekler: [
                                    "Harf",
                                    "Nokta",
                                    "Virgül",
                                    "Parantez"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "7-mat-donusum",
                        ad: "Dönüşüm",

                        giris:
                            "Geometrik dönüşümleri öğreniyoruz.",

                        anlatim: `
                            <h3>🔄 Dönüşüm</h3>
                            <p>
                            Öteleme, yansıma ve dönme gibi dönüşümler
                            geometrik şekillerin konum veya yönlerinin
                            değişmesini sağlar.
                            </p>
                        `,

                        temelBilgi: [
                            "Öteleme şeklin konumunu değiştirir.",
                            "Yansıma şeklin ayna görüntüsünü oluşturur."
                        ],

                        ozet:
                            "Geometrik dönüşümler şekillerin konum veya yönlerini değiştirebilir.",

                        test: [
                            {
                                soru:
                                    "Bir şeklin ayna görüntüsünü oluşturan dönüşüm hangisidir?",
                                secenekler: [
                                    "Öteleme",
                                    "Yansıma",
                                    "Toplama",
                                    "Bölme"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "7-mat-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris:
                            "Geometrik şekillerin uzunluk, alan ve diğer niceliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Geometrik Nicelikler</h3>
                            <p>
                            Şekillerin kenar uzunlukları, alanları ve
                            diğer ölçülebilir özellikleri incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Alan bir yüzeyin kapladığı bölgedir.",
                            "Uzunluk ölçülebilir."
                        ],

                        ozet:
                            "Geometrik nicelikler şekillerin ölçülebilir özelliklerini ifade eder.",

                        test: [
                            {
                                soru:
                                    "Bir yüzeyin kapladığı bölgeye ne denir?",
                                secenekler: [
                                    "Alan",
                                    "Açı",
                                    "Çevre",
                                    "Nokta"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "7-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekillerin özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Şekiller</h3>
                            <p>
                            Üçgen ve dörtgenlerin kenar ve açı özellikleri
                            kullanılarak çeşitli sınıflandırmalar yapılabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Şekiller kenar ve açılarına göre incelenebilir.",
                            "Üçgenlerin iç açıları toplamı 180 derecedir."
                        ],

                        ozet:
                            "Geometrik şekilleri özelliklerine göre sınıflandırabiliriz.",

                        test: [
                            {
                                soru:
                                    "Bir üçgenin iç açıları toplamı kaç derecedir?",
                                secenekler: [
                                    "90",
                                    "180",
                                    "270",
                                    "360"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "7-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "Verileri toplama, düzenleme ve yorumlamayı öğreniyoruz.",

                        anlatim: `
                            <h3>📊 İstatistik</h3>
                            <p>
                            Veriler tablo ve grafiklerle düzenlenebilir
                            ve yorumlanabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler düzenlenebilir.",
                            "Grafikler verileri görselleştirebilir."
                        ],

                        ozet:
                            "İstatistiksel veriler araştırma sonuçlarını anlamamıza yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Verileri görsel olarak göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Grafik",
                                    "Sözlük",
                                    "Roman",
                                    "Harita olmadan"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "7-mat-olasilik",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Olasılık kavramını ve olayların gerçekleşme ihtimallerini inceliyoruz.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>
                            <p>
                            Olasılık bir olayın gerçekleşme ihtimalini
                            ifade eder.
                            </p>
                        `,

                        temelBilgi: [
                            "Olasılık 0 ile 1 arasında ifade edilebilir.",
                            "Kesin olayın olasılığı 1'dir."
                        ],

                        ozet:
                            "Olasılık olayların gerçekleşme ihtimalini ifade eder.",

                        test: [
                            {
                                soru:
                                    "İmkânsız olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "2",
                                    "100"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [
                    {
                        id: "7-turkce-anlama",
                        ad: "Metin Anlama",

                        giris:
                            "Metinleri derinlemesine anlamayı öğreniyoruz.",

                        anlatim: `
                            <h3>📖 Metin Anlama</h3>
                            <p>
                            Bir metni anlamak için konu, ana düşünce,
                            yardımcı düşünceler ve metnin yapısı
                            birlikte değerlendirilmelidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Ana düşünce metnin temel mesajıdır.",
                            "Yardımcı düşünceler ana düşünceyi destekler."
                        ],

                        ozet:
                            "Metinleri anlamak için metnin bütününü değerlendirmek gerekir.",

                        test: [
                            {
                                soru:
                                    "Ana düşünce nedir?",
                                secenekler: [
                                    "Metnin temel mesajı",
                                    "Metnin sayfa sayısı",
                                    "Yazarın adı",
                                    "Kitabın fiyatı"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    {
                        id: "7-fen-hucre",
                        ad: "Hücre",

                        giris:
                            "Hücrenin temel yapılarını öğreniyoruz.",

                        anlatim: `
                            <h3>🔬 Hücre</h3>
                            <p>
                            Hücre canlıların temel yapı ve görev birimidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Hücre canlıların temel yapı birimidir.",
                            "Bitki ve hayvan hücrelerinin ortak yapıları vardır."
                        ],

                        ozet:
                            "Canlıların yapısında hücre temel birimdir.",

                        test: [
                            {
                                soru:
                                    "Canlıların temel yapı birimi nedir?",
                                secenekler: [
                                    "Hücre",
                                    "Organ",
                                    "Sistem",
                                    "Doku"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            sosyal: {
                ad: "Sosyal Bilgiler",
                icon: "🌍",
                konular: [
                    {
                        id: "7-sosyal-birlikte-yasamak",
                        ad: "Birlikte Yaşamak",

                        giris:
                            "Toplum içinde birlikte yaşamanın temel unsurlarını öğreniyoruz.",

                        anlatim: `
                            <h3>👥 Birlikte Yaşamak</h3>
                            <p>
                            İnsanlar toplum içinde farklı sorumluluklara
                            ve haklara sahiptir.
                            </p>
                        `,

                        temelBilgi: [
                            "Toplumda hak ve sorumluluklar vardır.",
                            "İş birliği toplumsal yaşamı güçlendirir."
                        ],

                        ozet:
                            "Toplum içinde uyumlu yaşamak için hak ve sorumluluklarımızı bilmeliyiz.",

                        test: [
                            {
                                soru:
                                    "Toplum yaşamında hangisi önemlidir?",
                                secenekler: [
                                    "İş birliği",
                                    "Kuralları yok saymak",
                                    "Başkalarını dinlememek",
                                    "Sorumluluk almamak"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    },


    /* =====================================================
       8. SINIF
       ===================================================== */

    "8": {
        ad: "8. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "8-mat-sayilar",
                        ad: "Sayılar ve Nicelikler",

                        giris:
                            "Sayılar ve nicelikler arasındaki ilişkileri inceliyoruz.",

                        anlatim: `
                            <h3>🔢 Sayılar</h3>
                            <p>
                            Sayıların özellikleri ve farklı gösterimleri
                            matematiksel problemlerin çözümünde kullanılır.
                            </p>
                        `,

                        temelBilgi: [
                            "Sayılar farklı biçimlerde gösterilebilir.",
                            "Sayıların özellikleri işlemlerde kullanılabilir."
                        ],

                        ozet:
                            "Sayıları anlamak matematiksel problemlerin çözümünü kolaylaştırır.",

                        test: [
                            {
                                soru:
                                    "Sayıları karşılaştırmak için hangisi kullanılabilir?",
                                secenekler: [
                                    "> < =",
                                    "+ -",
                                    "× ÷",
                                    "()"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "8-mat-cebir",
                        ad: "Cebirsel Düşünme ve Değişimler",

                        giris:
                            "Cebirsel ifadeleri ve değişkenler arasındaki ilişkileri öğreniyoruz.",

                        anlatim: `
                            <h3>🧮 Cebirsel İfadeler</h3>
                            <p>
                            Cebirsel ifadelerde bilinmeyenler harflerle
                            temsil edilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler harflerle gösterilebilir.",
                            "Cebirsel ifadelerde işlemler yapılabilir."
                        ],

                        ozet:
                            "Cebirsel ifadeler matematiksel ilişkileri genel biçimde ifade eder.",

                        test: [
                            {
                                soru:
                                    "3x + 2 ifadesinde değişken hangisidir?",
                                secenekler: [
                                    "3",
                                    "x",
                                    "2",
                                    "+"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "8-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekillerin özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Geometrik Şekiller</h3>
                            <p>
                            Üçgen ve dörtgenlerin özellikleri matematiksel
                            ilişkiler kullanılarak incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Üçgenlerin iç açıları toplamı 180 derecedir.",
                            "Dörtgenlerin iç açıları toplamı 360 derecedir."
                        ],

                        ozet:
                            "Geometrik şekiller açı ve kenar özellikleriyle incelenebilir.",

                        test: [
                            {
                                soru:
                                    "Dörtgenin iç açıları toplamı kaç derecedir?",
                                secenekler: [
                                    "90",
                                    "180",
                                    "270",
                                    "360"
                                ],
                                cevap: 3
                            }
                        ]
                    },

                    {
                        id: "8-mat-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris:
                            "Alan, uzunluk ve hacim gibi nicelikleri inceliyoruz.",

                        anlatim: `
                            <h3>📏 Ölçme</h3>
                            <p>
                            Geometrik cisimlerin ve şekillerin ölçülebilir
                            özellikleri hesaplanabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Alan yüzey ölçüsüdür.",
                            "Hacim bir cismin uzayda kapladığı yerdir."
                        ],

                        ozet:
                            "Geometrik nicelikler ölçme ve hesaplama yoluyla bulunabilir.",

                        test: [
                            {
                                soru:
                                    "Bir cismin uzayda kapladığı yere ne denir?",
                                secenekler: [
                                    "Alan",
                                    "Hacim",
                                    "Çevre",
                                    "Açı"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "8-mat-donusum",
                        ad: "Dönüşüm",

                        giris:
                            "Geometrik dönüşümleri inceliyoruz.",

                        anlatim: `
                            <h3>🔄 Dönüşümler</h3>
                            <p>
                            Öteleme, dönme ve yansıma gibi dönüşümler
                            şekillerin konum ve yönlerini değiştirir.
                            </p>
                        `,

                        temelBilgi: [
                            "Öteleme konumu değiştirir.",
                            "Yansıma ayna görüntüsü oluşturur."
                        ],

                        ozet:
                            "Dönüşümler geometrik şekillerin konum veya yönlerini değiştirebilir.",

                        test: [
                            {
                                soru:
                                    "Ayna görüntüsü hangi dönüşümle ilişkilidir?",
                                secenekler: [
                                    "Yansıma",
                                    "Toplama",
                                    "Bölme",
                                    "Çarpma"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "8-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel araştırmaları ve verilerin yorumlanmasını öğreniyoruz.",

                        anlatim: `
                            <h3>📊 Veri Analizi</h3>
                            <p>
                            Veriler uygun grafik ve tablolarla gösterilerek
                            yorumlanabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler tablo ve grafiklerle gösterilebilir.",
                            "Veriler yorumlanabilir."
                        ],

                        ozet:
                            "İstatistik verileri anlamlandırmamıza yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Verileri görselleştirmek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Grafik",
                                    "Roman",
                                    "Şiir",
                                    "Sözlük"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "8-mat-olasilik",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Olasılık kavramını kullanarak olayların gerçekleşme ihtimallerini inceliyoruz.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>
                            <p>
                            Bir olayın gerçekleşme ihtimali olasılık
                            kullanılarak ifade edilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Olasılık 0 ile 1 arasında olabilir.",
                            "Kesin olayın olasılığı 1'dir.",
                            "İmkânsız olayın olasılığı 0'dır."
                        ],

                        ozet:
                            "Olasılık olayların gerçekleşme ihtimalini ifade eder.",

                        test: [
                            {
                                soru:
                                    "İmkânsız bir olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "2",
                                    "100"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [
                    {
                        id: "8-turkce-anlama",
                        ad: "Metin Anlama ve Yorumlama",

                        giris:
                            "Metinleri yorumlamayı ve çıkarım yapmayı öğreniyoruz.",

                        anlatim: `
                            <h3>📖 Metin Yorumlama</h3>
                            <p>
                            Metin yorumlarken doğrudan verilen bilgilerin
                            yanında metinden çıkarılabilecek sonuçları da
                            değerlendirmek gerekir.
                            </p>
                        `,

                        temelBilgi: [
                            "Ana düşünce metnin temel mesajıdır.",
                            "Çıkarım metindeki bilgilerden hareketle ulaşılabilecek sonuçtur."
                        ],

                        ozet:
                            "Metin yorumlama yalnızca açık bilgileri değil, çıkarımları da içerir.",

                        test: [
                            {
                                soru:
                                    "Metinden hareketle ulaşılan sonuca ne denebilir?",
                                secenekler: [
                                    "Çıkarım",
                                    "Başlık",
                                    "Sayfa",
                                    "Yazar"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",
                konular: [
                    {
                        id: "8-fen-mevsimler",
                        ad: "Mevsimler ve İklim",

                        giris:
                            "Mevsimlerin oluşumu ve iklim kavramını öğreniyoruz.",

                        anlatim: `
                            <h3>🌍 Mevsimler</h3>
                            <p>
                            Mevsimlerin oluşumunda Dünya'nın eksen eğikliği
                            ve Güneş etrafındaki dolanımı etkilidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Dünya'nın eksen eğikliği mevsimlerin oluşumunda etkilidir.",
                            "İklim uzun süreli hava koşullarıyla ilgilidir."
                        ],

                        ozet:
                            "Mevsimler Dünya'nın hareketleri ve eksen eğikliğiyle ilişkilidir.",

                        test: [
                            {
                                soru:
                                    "Mevsimlerin oluşumunda etkili olan faktörlerden biri nedir?",
                                secenekler: [
                                    "Eksen eğikliği",
                                    "Ay'ın rengi",
                                    "Denizlerin tuzluluğu",
                                    "Bulutların şekli"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            inkilap: {
                ad: "T.C. İnkılap Tarihi ve Atatürkçülük",
                icon: "🇹🇷",
                konular: [
                    {
                        id: "8-inkilap-birinci-dunya",
                        ad: "Birinci Dünya Savaşı ve Sonrası",

                        giris:
                            "Birinci Dünya Savaşı'nın sonuçlarını ve Millî Mücadele'ye giden süreci inceliyoruz.",

                        anlatim: `
                            <h3>🇹🇷 Millî Mücadele</h3>
                            <p>
                            Birinci Dünya Savaşı sonrasında Osmanlı Devleti
                            zor durumda kalmış ve Anadolu'nun çeşitli
                            bölgeleri işgal edilmiştir.
                            </p>

                            <p>
                            Bu süreç Millî Mücadele'nin başlamasına giden
                            gelişmelerin ortaya çıkmasına neden olmuştur.
                            </p>
                        `,

                        temelBilgi: [
                            "Birinci Dünya Savaşı önemli siyasi sonuçlar doğurmuştur.",
                            "İşgaller Millî Mücadele sürecini etkiledi."
                        ],

                        ozet:
                            "Millî Mücadele'nin gelişimini anlamak için savaş sonrası gelişmeleri bilmek önemlidir.",

                        test: [
                            {
                                soru:
                                    "Millî Mücadele hangi dönemde ortaya çıkmıştır?",
                                secenekler: [
                                    "Birinci Dünya Savaşı sonrası",
                                    "Roma İmparatorluğu döneminde",
                                    "Orta Çağ'da",
                                    "İlk Çağ'da"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    },


    /* =====================================================
       9. SINIF
       ===================================================== */

    "9": {
        ad: "9. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "9-mat-sayilar",
                        ad: "Sayılar",

                        giris:
                            "Sayı kümelerini ve sayıların özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>🔢 Sayılar</h3>
                            <p>
                            Sayılar matematiğin temel yapı taşlarındandır.
                            Doğal, tam, rasyonel ve gerçek sayılar gibi
                            farklı sayı kümeleri vardır.
                            </p>
                        `,

                        temelBilgi: [
                            "Doğal sayılar 0 ve pozitif tam sayılardan oluşur.",
                            "Tam sayılar negatif ve pozitif tam sayıları içerir.",
                            "Rasyonel sayılar kesir biçiminde ifade edilebilir."
                        ],

                        ornekler: [
                            {
                                soru:
                                    "1/2 rasyonel sayı mıdır?",
                                cozum:
                                    "Evet. İki tam sayının oranı şeklinde ifade edilebildiği için rasyoneldir."
                            }
                        ],

                        ozet:
                            "Sayı kümeleri matematiksel işlemlerin temelini oluşturur.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi rasyonel sayıdır?",
                                secenekler: [
                                    "1/2",
                                    "π",
                                    "√2",
                                    "e"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "9-mat-mantiksal-cikarim",
                        ad: "Mantıksal Çıkarım",

                        giris:
                            "Matematiksel ifadelerden mantıksal sonuçlar çıkarmayı öğreniyoruz.",

                        anlatim: `
                            <h3>🧠 Mantık</h3>
                            <p>
                            Matematikte verilen önermelerden hareketle
                            doğru sonuçlara ulaşılabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Önermeler doğru veya yanlış değer alabilir.",
                            "Mantıksal çıkarım verilen bilgilerden sonuç üretir."
                        ],

                        ozet:
                            "Mantıksal düşünme matematiksel akıl yürütmenin önemli bir parçasıdır.",

                        test: [
                            {
                                soru:
                                    "Doğru veya yanlış değeri alabilen ifadelere ne denir?",
                                secenekler: [
                                    "Önerme",
                                    "Katsayı",
                                    "Değişken",
                                    "Üs"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "9-mat-algoritma",
                        ad: "Algoritma ve Bilişim",

                        giris:
                            "Problemleri adım adım çözme yaklaşımını öğreniyoruz.",

                        anlatim: `
                            <h3>💻 Algoritma</h3>
                            <p>
                            Algoritma bir problemi çözmek veya bir işi
                            gerçekleştirmek için izlenen sonlu ve düzenli
                            adımlar bütünüdür.
                            </p>
                        `,

                        temelBilgi: [
                            "Algoritma adımlardan oluşur.",
                            "Adımlar belirli bir sırayla uygulanır."
                        ],

                        ozet:
                            "Algoritmalar problem çözme süreçlerini düzenler.",

                        test: [
                            {
                                soru:
                                    "Algoritma nedir?",
                                secenekler: [
                                    "Problemi çözmek için izlenen adımlar",
                                    "Bir sayı",
                                    "Bir geometrik şekil",
                                    "Bir ölçme birimi"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "9-mat-nicelikler-degisimler",
                        ad: "Nicelikler ve Değişimler",

                        giris:
                            "Nicelikler arasındaki değişimleri matematiksel olarak ifade ediyoruz.",

                        anlatim: `
                            <h3>📈 Değişim</h3>
                            <p>
                            Bir niceliğin başka bir niceliğe bağlı olarak
                            değişmesi matematiksel modellerle ifade edilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler arasındaki ilişkiler incelenebilir.",
                            "Grafikler değişimleri gösterebilir."
                        ],

                        ozet:
                            "Matematiksel modeller değişimleri anlamamıza yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Değişimleri göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Grafik",
                                    "Sözlük",
                                    "Roman",
                                    "Şiir"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "9-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekillerin özelliklerini ve ilişkilerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Geometri</h3>
                            <p>
                            Üçgenler ve diğer geometrik şekiller açı,
                            kenar ve uzunluk ilişkileriyle incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Üçgenlerin iç açıları toplamı 180 derecedir.",
                            "Geometrik şekiller açı ve kenar özellikleriyle incelenebilir."
                        ],

                        ozet:
                            "Geometrik şekiller arasındaki ilişkiler matematiksel olarak incelenebilir.",

                        test: [
                            {
                                soru:
                                    "Üçgenin iç açıları toplamı kaç derecedir?",
                                secenekler: [
                                    "90",
                                    "180",
                                    "270",
                                    "360"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "9-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel araştırma sürecini ve verilerin yorumlanmasını öğreniyoruz.",

                        anlatim: `
                            <h3>📊 İstatistik</h3>
                            <p>
                            Veriler toplanır, düzenlenir, analiz edilir
                            ve sonuçlar yorumlanır.
                            </p>
                        `,

                        temelBilgi: [
                            "Araştırma sorusu oluşturulur.",
                            "Veri toplanır.",
                            "Veriler analiz edilir."
                        ],

                        ozet:
                            "İstatistiksel araştırma verilerden anlamlı sonuçlar çıkarmamızı sağlar.",

                        test: [
                            {
                                soru:
                                    "İstatistiksel araştırmanın temel unsurlarından biri nedir?",
                                secenekler: [
                                    "Veri toplama",
                                    "Veri yok etme",
                                    "Soruyu gizleme",
                                    "Sonucu değiştirme"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [
                    {
                        id: "9-edebiyat-edebiyat",
                        ad: "Edebiyat ve Sanat",

                        giris:
                            "Edebiyatın sanat ve insan yaşamıyla ilişkisini inceliyoruz.",

                        anlatim: `
                            <h3>📚 Edebiyat</h3>
                            <p>
                            Edebiyat duygu, düşünce ve hayallerin dil
                            aracılığıyla estetik biçimde ifade edilmesidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Edebiyatın temel malzemesi dildir.",
                            "Edebî eserler duygu ve düşünceleri aktarabilir."
                        ],

                        ozet:
                            "Edebiyat insanın duygu ve düşüncelerini estetik bir biçimde ifade eder.",

                        test: [
                            {
                                soru:
                                    "Edebiyatın temel malzemesi nedir?",
                                secenekler: [
                                    "Dil",
                                    "Taş",
                                    "Metal",
                                    "Ses cihazı"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚡",
                konular: [
                    {
                        id: "9-fizik-fizik-bilimi",
                        ad: "Fizik Bilimi ve Kariyer Keşfi",

                        giris:
                            "Fiziğin çalışma alanlarını ve günlük yaşamla ilişkisini öğreniyoruz.",

                        anlatim: `
                            <h3>⚡ Fizik</h3>
                            <p>
                            Fizik maddeyi, enerjiyi, hareketi ve bunlar
                            arasındaki ilişkileri inceleyen temel bilimlerden biridir.
                            </p>
                        `,

                        temelBilgi: [
                            "Fizik doğadaki olayları açıklamaya çalışır.",
                            "Fizik birçok bilim ve teknoloji alanıyla ilişkilidir."
                        ],

                        ozet:
                            "Fizik doğadaki olayları anlamamıza yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Fizik hangi alanları inceler?",
                                secenekler: [
                                    "Madde ve enerji",
                                    "Sadece tarih",
                                    "Sadece dil",
                                    "Sadece sanat"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: [
                    {
                        id: "9-kimya-etkilesim",
                        ad: "Etkileşim",

                        giris:
                            "Maddelerin yapısını ve etkileşimlerini incelemeye başlıyoruz.",

                        anlatim: `
                            <h3>🧪 Kimya</h3>
                            <p>
                            Kimya maddelerin yapısını, özelliklerini,
                            dönüşümlerini ve birbirleriyle etkileşimlerini inceler.
                            </p>
                        `,

                        temelBilgi: [
                            "Kimya maddeyi inceler.",
                            "Maddeler fiziksel ve kimyasal değişimler geçirebilir."
                        ],

                        ozet:
                            "Kimya maddelerin yapısını ve dönüşümlerini inceler.",

                        test: [
                            {
                                soru:
                                    "Kimyanın temel çalışma konularından biri nedir?",
                                secenekler: [
                                    "Madde",
                                    "Sadece tarih",
                                    "Sadece spor",
                                    "Sadece müzik"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: [
                    {
                        id: "9-biyoloji-yasam",
                        ad: "Yaşam",

                        giris:
                            "Biyolojinin temel kavramlarını ve canlıların özelliklerini öğreniyoruz.",

                        anlatim: `
                            <h3>🧬 Yaşam Bilimi</h3>
                            <p>
                            Biyoloji canlıları ve yaşam süreçlerini inceleyen
                            bilim dalıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Biyoloji canlıları inceler.",
                            "Canlıların ortak özellikleri vardır."
                        ],

                        ozet:
                            "Biyoloji canlıları ve yaşam olaylarını inceler.",

                        test: [
                            {
                                soru:
                                    "Biyoloji neyi inceler?",
                                secenekler: [
                                    "Canlıları",
                                    "Sadece sayıları",
                                    "Sadece yıldızları",
                                    "Sadece tarihî olayları"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: [
                    {
                        id: "9-tarih-tarih-bilimi",
                        ad: "Tarih Bilimi",

                        giris:
                            "Tarih biliminin konusu ve kaynaklarını öğreniyoruz.",

                        anlatim: `
                            <h3>🏛️ Tarih</h3>
                            <p>
                            Tarih geçmişte yaşanan insan faaliyetlerini
                            yer ve zaman göstererek inceleyen bilim dalıdır.
                            </p>
                        `,

                        temelBilgi: [
                            "Tarih geçmiş olayları inceler.",
                            "Tarihî kaynaklar araştırmada kullanılır."
                        ],

                        ozet:
                            "Tarih geçmişi anlamamıza ve bugünü değerlendirmemize yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Tarih hangi dönemi inceler?",
                                secenekler: [
                                    "Geçmiş",
                                    "Sadece gelecek",
                                    "Sadece bugün",
                                    "Hiçbir dönem"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: [
                    {
                        id: "9-cografya-doga-insan",
                        ad: "Doğa ve İnsan",

                        giris:
                            "Doğa ve insan arasındaki etkileşimi öğreniyoruz.",

                        anlatim: `
                            <h3>🌍 Coğrafya</h3>
                            <p>
                            Coğrafya doğal çevre ile insan faaliyetleri
                            arasındaki ilişkileri inceler.
                            </p>
                        `,

                        temelBilgi: [
                            "Doğal çevre insan yaşamını etkiler.",
                            "İnsan faaliyetleri de çevreyi değiştirebilir."
                        ],

                        ozet:
                            "İnsan ve doğa sürekli etkileşim içindedir.",

                        test: [
                            {
                                soru:
                                    "Coğrafyanın temel konularından biri nedir?",
                                secenekler: [
                                    "İnsan-doğa ilişkisi",
                                    "Sadece şiir",
                                    "Sadece müzik",
                                    "Sadece dil bilgisi"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            felsefe: {
                ad: "Felsefe",
                icon: "🧠",
                konular: [
                    {
                        id: "9-felsefe-felsefi-dusunce",
                        ad: "Felsefi Düşünce",

                        giris:
                            "Felsefi düşünmenin temel özelliklerini öğreniyoruz.",

                        anlatim: `
                            <h3>🧠 Felsefe</h3>
                            <p>
                            Felsefe sorgulama, düşünme, gerekçelendirme
                            ve eleştirel değerlendirme etkinliğidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Felsefi düşünce sorgulayıcıdır.",
                            "Felsefede gerekçelendirme önemlidir."
                        ],

                        ozet:
                            "Felsefe insanın düşüncelerini sorgulamasına yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "Felsefi düşüncenin özelliklerinden biri hangisidir?",
                                secenekler: [
                                    "Sorgulama",
                                    "Ezberleme zorunluluğu",
                                    "Sorgulamadan kabul",
                                    "Rastgele karar"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    },


    /* =====================================================
       10. SINIF
       MEB TEMALARI
       ===================================================== */

    "10": {
        ad: "10. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",

                konular: [

                    {
                        id: "10-mat-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris:
                            "Geometrik şekillerin özelliklerini ve ilişkilerini inceliyoruz.",

                        anlatim: `
                            <h3>📐 Geometrik Şekiller</h3>
                            <p>
                            Geometrik şekillerin açı, kenar ve uzunluk
                            ilişkileri matematiksel yöntemlerle incelenir.
                            </p>
                        `,

                        temelBilgi: [
                            "Geometrik şekiller açı ve kenar özellikleriyle incelenebilir.",
                            "Geometrik ilişkiler matematiksel olarak ifade edilebilir."
                        ],

                        ozet:
                            "Geometrik şekiller arasındaki ilişkileri kullanarak problem çözebiliriz.",

                        test: [
                            {
                                soru:
                                    "Geometrik şekillerin incelenmesinde hangisi önemlidir?",
                                secenekler: [
                                    "Açı ve kenarlar",
                                    "Kitap fiyatı",
                                    "Sayfa sayısı",
                                    "Yazar adı"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel araştırma süreçlerini inceliyoruz.",

                        anlatim: `
                            <h3>📊 İstatistik</h3>
                            <p>
                            İstatistiksel araştırmalarda veri toplama,
                            analiz etme ve sonuçları yorumlama önemlidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veri toplanır.",
                            "Veriler analiz edilir.",
                            "Sonuçlar yorumlanır."
                        ],

                        ozet:
                            "İstatistiksel araştırma verilerden anlamlı sonuçlara ulaşmayı sağlar.",

                        test: [
                            {
                                soru:
                                    "İstatistiksel araştırmada ne yapılır?",
                                secenekler: [
                                    "Veri analiz edilir.",
                                    "Veri tamamen yok edilir.",
                                    "Araştırma sorusu gizlenir.",
                                    "Sonuç değiştirilir."
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-sayilar",
                        ad: "Sayılar",

                        giris:
                            "Sayıların özelliklerini ve işlemlerini inceliyoruz.",

                        anlatim: `
                            <h3>🔢 Sayılar</h3>
                            <p>
                            Sayıların özellikleri ve işlemler arasındaki
                            ilişkiler matematiksel problem çözmede kullanılır.
                            </p>
                        `,

                        temelBilgi: [
                            "Sayı kümeleri farklı özelliklere sahiptir.",
                            "Sayılar üzerinde çeşitli işlemler yapılabilir."
                        ],

                        ozet:
                            "Sayılar matematiksel işlemlerin temelini oluşturur.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi bir sayı kümesidir?",
                                secenekler: [
                                    "Tam sayılar",
                                    "Kitaplar",
                                    "Renkler",
                                    "Şehirler"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-nicelikler",
                        ad: "Nicelikler ve Değişimler",

                        giris:
                            "Değişkenler arasındaki ilişkileri matematiksel olarak inceliyoruz.",

                        anlatim: `
                            <h3>📈 Değişim</h3>
                            <p>
                            Değişen nicelikler arasındaki ilişkiler
                            matematiksel modellerle ifade edilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler arasındaki ilişkiler incelenebilir.",
                            "Grafikler değişimi gösterebilir."
                        ],

                        ozet:
                            "Nicelikler arasındaki değişimler matematiksel modellerle açıklanabilir.",

                        test: [
                            {
                                soru:
                                    "Değişimi göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Grafik",
                                    "Sözlük",
                                    "Şiir",
                                    "Roman"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-sayma-algoritma",
                        ad: "Sayma, Algoritma ve Bilişim",

                        giris:
                            "Sayma yöntemlerini ve algoritmik düşünmeyi öğreniyoruz.",

                        anlatim: `
                            <h3>💻 Algoritma</h3>
                            <p>
                            Algoritmik düşünme bir problemi sistematik
                            adımlara ayırarak çözmeyi sağlar.
                            </p>
                        `,

                        temelBilgi: [
                            "Algoritmalar adımlardan oluşur.",
                            "Sayma yöntemleri problemlerin çözümünde kullanılabilir."
                        ],

                        ozet:
                            "Algoritmik düşünme karmaşık problemleri sistematik biçimde çözmeyi sağlar.",

                        test: [
                            {
                                soru:
                                    "Algoritmanın temel özelliği nedir?",
                                secenekler: [
                                    "Adımlı olması",
                                    "Rastgele olması",
                                    "Kuralsız olması",
                                    "Sonsuz olması"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-analitik",
                        ad: "Analitik İnceleme",

                        giris:
                            "Geometrik ve cebirsel ilişkileri analitik olarak inceliyoruz.",

                        anlatim: `
                            <h3>📈 Analitik Geometri</h3>
                            <p>
                            Geometrik nesneler koordinat sistemi ve
                            cebirsel ifadeler kullanılarak incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Koordinat sistemi geometrik konumları göstermeye yarar.",
                            "Geometrik ilişkiler cebirsel olarak ifade edilebilir."
                        ],

                        ozet:
                            "Analitik inceleme geometri ile cebiri ilişkilendirir.",

                        test: [
                            {
                                soru:
                                    "Noktaların konumunu göstermede hangisi kullanılır?",
                                secenekler: [
                                    "Koordinat sistemi",
                                    "Sözlük",
                                    "Takvim",
                                    "Alfabe"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "10-mat-olasilik",
                        ad: "Veriden Olasılığa",

                        giris:
                            "Verilerden hareketle olasılıkları yorumluyoruz.",

                        anlatim: `
                            <h3>🎲 Olasılık</h3>
                            <p>
                            Olasılık olayların gerçekleşme ihtimalini
                            matematiksel olarak ifade eder.
                            </p>
                        `,

                        temelBilgi: [
                            "Olasılık olayların ihtimalini ifade eder.",
                            "Kesin olayın olasılığı 1'dir."
                        ],

                        ozet:
                            "Olasılık belirsiz olayları matematiksel olarak incelememizi sağlar.",

                        test: [
                            {
                                soru:
                                    "Kesin olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "0,5",
                                    "1",
                                    "2"
                                ],
                                cevap: 2
                            }
                        ]
                    }
                ]
            },

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [
                    {
                        id: "10-edebiyat-edebi-turler",
                        ad: "Edebî Türler",

                        giris:
                            "Edebî türlerin temel özelliklerini öğreniyoruz.",

                        anlatim: `
                            <h3>📚 Edebî Türler</h3>
                            <p>
                            Edebî eserler şiir, hikâye, roman, tiyatro
                            gibi farklı türlerde oluşturulabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Edebî türlerin farklı özellikleri vardır.",
                            "Tür seçimi eserin yapısını etkiler."
                        ],

                        ozet:
                            "Edebî türleri özelliklerine göre ayırt edebiliriz.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi edebî türdür?",
                                secenekler: [
                                    "Roman",
                                    "Cetvel",
                                    "Termometre",
                                    "Kalem"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            fizik: {
                ad: "Fizik",
                icon: "⚡",
                konular: []
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: []
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: []
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: []
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: []
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    },


    /* =====================================================
       11. SINIF
       ===================================================== */

    "11": {
        ad: "11. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "11-mat-degisimin-matematigi",
                        ad: "Değişimin Matematiği",

                        giris:
                            "Değişim kavramını matematiksel olarak incelemeye başlıyoruz.",

                        anlatim: `
                            <h3>📈 Değişim</h3>
                            <p>
                            Matematikte değişim farklı niceliklerin
                            birbirleriyle ilişkisi üzerinden incelenebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Değişkenler arasındaki ilişkiler matematiksel olarak ifade edilebilir.",
                            "Grafikler değişimi göstermede kullanılabilir."
                        ],

                        ozet:
                            "Değişimin matematiksel olarak modellenmesi birçok problemin çözümünde kullanılır.",

                        test: [
                            {
                                soru:
                                    "Değişimi göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Grafik",
                                    "Sözlük",
                                    "Roman",
                                    "Takvim"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "11-mat-geometrik-cisimler",
                        ad: "Geometrik Cisimler",

                        giris:
                            "Üç boyutlu geometrik cisimleri inceliyoruz.",

                        anlatim: `
                            <h3>📦 Geometrik Cisimler</h3>
                            <p>
                            Küp, prizma, piramit, silindir ve koni gibi
                            cisimler üç boyutlu geometrik nesnelerdir.
                            </p>
                        `,

                        temelBilgi: [
                            "Geometrik cisimlerin üç boyutu vardır.",
                            "Alan ve hacim hesapları yapılabilir."
                        ],

                        ozet:
                            "Geometrik cisimler uzayda yer kaplayan üç boyutlu nesnelerdir.",

                        test: [
                            {
                                soru:
                                    "Aşağıdakilerden hangisi geometrik cisimdir?",
                                secenekler: [
                                    "Küp",
                                    "Doğru",
                                    "Nokta",
                                    "Açı"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "11-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel verilerin analizini öğreniyoruz.",

                        anlatim: `
                            <h3>📊 İstatistik</h3>
                            <p>
                            Verilerden anlamlı sonuçlar elde etmek için
                            uygun istatistiksel yöntemler kullanılabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler analiz edilir.",
                            "Sonuçlar yorumlanır."
                        ],

                        ozet:
                            "İstatistik verileri anlamlı bilgiye dönüştürmeye yardımcı olur.",

                        test: [
                            {
                                soru:
                                    "İstatistiksel araştırmada veriler neden analiz edilir?",
                                secenekler: [
                                    "Sonuçlara ulaşmak için",
                                    "Verileri yok etmek için",
                                    "Soruyu değiştirmek için",
                                    "Kitabı kapatmak için"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: []
            },

            fizik: {
                ad: "Fizik",
                icon: "⚡",
                konular: []
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: []
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: []
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: []
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: []
            },

            felsefe: {
                ad: "Felsefe",
                icon: "🧠",
                konular: []
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    },


    /* =====================================================
       12. SINIF
       ===================================================== */

    "12": {
        ad: "12. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [

                    {
                        id: "12-mat-degisimin-matematigi",
                        ad: "Değişimin Matematiği",

                        giris:
                            "Değişim ve matematiksel ilişkileri ileri düzeyde inceliyoruz.",

                        anlatim: `
                            <h3>📈 Değişim</h3>
                            <p>
                            Değişim matematiksel modeller kullanılarak
                            analiz edilebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Matematiksel modeller değişimleri açıklayabilir.",
                            "Fonksiyonlar değişim ilişkilerini ifade edebilir."
                        ],

                        ozet:
                            "Değişim kavramı ileri matematiksel modellerin temelini oluşturur.",

                        test: [
                            {
                                soru:
                                    "Değişkenler arasındaki ilişkiyi göstermek için hangisi kullanılabilir?",
                                secenekler: [
                                    "Fonksiyon",
                                    "Sözlük",
                                    "Roman",
                                    "Takvim"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "12-mat-geometrik-cisimler",
                        ad: "Geometrik Cisimler",

                        giris:
                            "Üç boyutlu cisimlerin geometrik özelliklerini inceliyoruz.",

                        anlatim: `
                            <h3>📦 Geometrik Cisimler</h3>
                            <p>
                            Üç boyutlu cisimlerin yüzey alanları ve
                            hacimleri matematiksel olarak hesaplanabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Hacim üç boyutlu cisimlerin kapladığı uzayı ifade eder.",
                            "Yüzey alanı cismin yüzeylerinin toplam alanıdır."
                        ],

                        ozet:
                            "Geometrik cisimlerin alan ve hacimleri hesaplanabilir.",

                        test: [
                            {
                                soru:
                                    "Bir cismin uzayda kapladığı yere ne denir?",
                                secenekler: [
                                    "Hacim",
                                    "Açı",
                                    "Doğru",
                                    "Nokta"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "12-mat-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris:
                            "İstatistiksel araştırmaların sonuçlarını yorumluyoruz.",

                        anlatim: `
                            <h3>📊 Veri Analizi</h3>
                            <p>
                            Büyük miktarda veriden anlamlı sonuçlar
                            çıkarmak için istatistiksel yöntemlerden yararlanılır.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler analiz edilir.",
                            "İstatistiksel sonuçlar yorumlanır."
                        ],

                        ozet:
                            "İstatistiksel analiz verilerden anlamlı sonuçlar çıkarmayı sağlar.",

                        test: [
                            {
                                soru:
                                    "Veri analizinin temel amacı nedir?",
                                secenekler: [
                                    "Anlamlı sonuçlara ulaşmak",
                                    "Verileri silmek",
                                    "Soruyu gizlemek",
                                    "Verileri rastgele değiştirmek"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            edebiyat: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: []
            },

            fizik: {
                ad: "Fizik",
                icon: "⚡",
                konular: []
            },

            kimya: {
                ad: "Kimya",
                icon: "🧪",
                konular: []
            },

            biyoloji: {
                ad: "Biyoloji",
                icon: "🧬",
                konular: []
            },

            tarih: {
                ad: "Tarih",
                icon: "🏛️",
                konular: []
            },

            cografya: {
                ad: "Coğrafya",
                icon: "🌍",
                konular: []
            },

            felsefe: {
                ad: "Felsefe",
                icon: "🧠",
                konular: []
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🕌",
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            }
        }
    }

};
