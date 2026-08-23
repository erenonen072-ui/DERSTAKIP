/* =========================================================
   DERS TAKİP — KİTAPLIK DATA
   5–12. Sınıflar
   Türkiye Yüzyılı Maarif Modeli uyumlu yapı

   kitaplik.js ile doğrudan uyumludur.
   ========================================================= */

window.kitaplikData = {

    /* =====================================================
       5. SINIF
    ===================================================== */
    "5": {
        ad: "5. Sınıf",

        dersler: {

            /* -------------------------------------------------
               MATEMATİK
            ------------------------------------------------- */
            matematik: {
                ad: "Matematik",
                icon: "🔢",

                konular: [

                    {
                        id: "5-matematik-sayilar-1",
                        ad: "Sayılar ve Nicelikler (1)",

                        giris: `
                            Bu temada doğal sayılar, basamak değeri,
                            sayıların karşılaştırılması ve çeşitli
                            sayı gösterimleri üzerinde çalışılır.
                        `,

                        anlatim: `
                            <h3>Doğal Sayılar</h3>

                            <p>
                                Doğal sayılar günlük hayatta sayma,
                                sıralama ve miktar belirtme amacıyla
                                kullanılır. 0'dan başlayarak sonsuza
                                kadar devam ederler.
                            </p>

                            <p>
                                Bir doğal sayının hangi basamaklardan
                                oluştuğunu bilmek, sayının değerini
                                anlamanın temelidir.
                            </p>

                            <h3>Basamak ve Basamak Değeri</h3>

                            <p>
                                Bir sayıda rakamların bulunduğu
                                konumlara basamak denir. Bir rakamın
                                bulunduğu basamağa göre aldığı değere
                                basamak değeri denir.
                            </p>

                            <div class="kitap-formul">
                                Basamak değeri =
                                Rakam × Basamak değeri
                            </div>
                        `,

                        temelBilgi: [
                            "Doğal sayılar 0'dan başlar.",
                            "Rakamlar 0,1,2,3,4,5,6,7,8 ve 9'dur.",
                            "Bir rakamın değeri bulunduğu basamağa göre değişebilir.",
                            "Sayıları karşılaştırırken önce basamak sayılarına bakılır.",
                            "Basamak sayıları eşitse soldan sağa doğru karşılaştırma yapılır."
                        ],

                        ornekler: [
                            {
                                soru: "45 728 sayısında 7 rakamının basamak değeri kaçtır?",
                                cozum: `
                                    7 rakamı yüzler basamağındadır.
                                    Bu nedenle basamak değeri:
                                    7 × 100 = 700'dür.
                                `
                            },
                            {
                                soru: "34 560 ile 34 506 sayılarını karşılaştırınız.",
                                cozum: `
                                    On binler, binler ve yüzler basamakları
                                    aynıdır. Onlar basamağında 6 > 0 olduğu
                                    için 34 560 > 34 506 olur.
                                `
                            }
                        ],

                        dikkat: `
                            Rakam ile basamak değerini karıştırmayın.
                            Örneğin 5 432 sayısındaki 5'in rakam değeri 5,
                            basamak değeri ise 5 000'dir.
                        `,

                        ozet: `
                            Doğal sayıları okuyabilir, yazabilir,
                            karşılaştırabilir ve basamak değerlerini
                            belirleyebiliriz.
                        `,

                        test: [
                            {
                                soru: "6 425 sayısında 4 rakamının basamak değeri kaçtır?",
                                secenekler: [
                                    "4",
                                    "40",
                                    "400",
                                    "4 000"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Aşağıdakilerden hangisi bir rakamdır?",
                                secenekler: [
                                    "15",
                                    "24",
                                    "7",
                                    "105"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "3 452 ile 3 425 karşılaştırıldığında hangisi doğrudur?",
                                secenekler: [
                                    "3 452 < 3 425",
                                    "3 452 > 3 425",
                                    "İkisi eşittir",
                                    "Karşılaştırılamaz"
                                ],
                                cevap: 1
                            },
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
                                soru: "8 231 sayısında 8'in basamak değeri kaçtır?",
                                secenekler: [
                                    "8",
                                    "80",
                                    "800",
                                    "8 000"
                                ],
                                cevap: 3
                            }
                        ]
                    },

                    {
                        id: "5-matematik-sayilar-2",
                        ad: "Sayılar ve Nicelikler (2)",

                        giris: `
                            Bu bölümde sayılarla işlemler ve nicelikleri
                            ifade etme üzerine çalışmalar yapılır.
                        `,

                        anlatim: `
                            <h3>Sayılarla İşlemler</h3>

                            <p>
                                Doğal sayılarla toplama, çıkarma, çarpma
                                ve bölme işlemleri günlük problemlerin
                                çözümünde kullanılır.
                            </p>

                            <h3>İşlem Önceliği</h3>

                            <p>
                                Birden fazla işlem bulunan ifadelerde
                                işlemler belirli bir sıraya göre yapılır.
                            </p>

                            <ol>
                                <li>Parantez içindeki işlemler</li>
                                <li>Çarpma ve bölme</li>
                                <li>Toplama ve çıkarma</li>
                            </ol>
                        `,

                        temelBilgi: [
                            "Toplama ve çarpma işlemlerinde işlem sırası önemlidir.",
                            "Çarpma ve bölme, toplama ve çıkarmadan önce yapılır.",
                            "Parantez varsa önce parantez içi işlem yapılır.",
                            "Bir sayının 1 ile çarpımı yine kendisidir.",
                            "Bir sayının 0 ile çarpımı 0'dır."
                        ],

                        ornekler: [
                            {
                                soru: "8 + 3 × 4 işleminin sonucu kaçtır?",
                                cozum: `
                                    Önce çarpma yapılır:
                                    3 × 4 = 12

                                    Daha sonra:
                                    8 + 12 = 20

                                    Cevap: 20
                                `
                            }
                        ],

                        dikkat: `
                            İşlem önceliğini göz ardı ederek işlemleri
                            soldan sağa yapmak yanlış sonuç verebilir.
                        `,

                        ozet: `
                            Sayılarla işlem yaparken işlem önceliğine
                            dikkat edilir.
                        `,

                        test: [
                            {
                                soru: "8 + 2 × 5 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "50",
                                    "18",
                                    "20",
                                    "10"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "6 × 0 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "6",
                                    "1",
                                    "0",
                                    "10"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "12 ÷ 3 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "3",
                                    "4",
                                    "5",
                                    "6"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "7 + 5 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "10",
                                    "11",
                                    "12",
                                    "13"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "3 × 4 + 2 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "14",
                                    "18",
                                    "20",
                                    "24"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-matematik-cebirsel",
                        ad: "İşlemlerle Cebirsel Düşünme",

                        giris: `
                            Sayılar arasındaki ilişkileri fark etmek,
                            örüntüleri incelemek ve matematiksel
                            düşünmeyi geliştirmek bu temanın temelidir.
                        `,

                        anlatim: `
                            <h3>Örüntüler</h3>

                            <p>
                                Belirli bir kurala göre düzenli şekilde
                                ilerleyen sayı veya şekil dizilerine
                                örüntü denir.
                            </p>

                            <p>
                                Örneğin 3, 6, 9, 12, 15 dizisinde her
                                adımda 3 eklenmektedir.
                            </p>
                        `,

                        temelBilgi: [
                            "Örüntüler belirli bir kurala göre ilerler.",
                            "Kuralı bulmak örüntüyü devam ettirmeyi sağlar.",
                            "Ardışık terimler arasındaki ilişki incelenmelidir."
                        ],

                        ornekler: [
                            {
                                soru: "4, 8, 12, 16, ... örüntüsünün sonraki iki terimini bulunuz.",
                                cozum: `
                                    Her adımda 4 ekleniyor.
                                    16 + 4 = 20
                                    20 + 4 = 24
                                    Cevap: 20 ve 24
                                `
                            }
                        ],

                        dikkat: `
                            Örüntünün sadece iki terimine bakarak
                            kural belirlemek yerine mümkün olduğunca
                            birkaç ardışık terimi karşılaştırın.
                        `,

                        ozet: `
                            Örüntülerde terimler arasındaki düzenli
                            ilişki bulunur ve bu ilişki kullanılarak
                            sonraki terimler belirlenir.
                        `,

                        test: [
                            {
                                soru: "2, 5, 8, 11, ... örüntüsünde sonraki sayı kaçtır?",
                                secenekler: [
                                    "12",
                                    "13",
                                    "14",
                                    "15"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "10, 20, 30, 40 örüntüsünün kuralı nedir?",
                                secenekler: [
                                    "5 ekleme",
                                    "10 ekleme",
                                    "2 ile çarpma",
                                    "10 çıkarma"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "5, 10, 15, 20 örüntüsünde 6. terim kaçtır?",
                                secenekler: [
                                    "25",
                                    "30",
                                    "35",
                                    "40"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Bir örüntüyü devam ettirmek için öncelikle ne bulunmalıdır?",
                                secenekler: [
                                    "Renk",
                                    "Kural",
                                    "Şekil",
                                    "Başlık"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "20, 17, 14, 11 örüntüsünde her adımda ne yapılmaktadır?",
                                secenekler: [
                                    "2 ekleniyor",
                                    "3 ekleniyor",
                                    "2 çıkarılıyor",
                                    "3 çıkarılıyor"
                                ],
                                cevap: 3
                            }
                        ]
                    },

                    {
                        id: "5-matematik-geometrik-sekiller",
                        ad: "Geometrik Şekiller",

                        giris: `
                            Üçgen, dörtgen ve çokgen gibi geometrik
                            şekillerin özellikleri incelenir.
                        `,

                        anlatim: `
                            <h3>Geometrik Şekiller</h3>

                            <p>
                                Geometride doğru parçalarının birleşmesiyle
                                oluşan kapalı şekiller önemli bir yer tutar.
                            </p>

                            <p>
                                Üçgenlerin üç kenarı ve üç köşesi,
                                dörtgenlerin dört kenarı ve dört köşesi
                                vardır.
                            </p>
                        `,

                        temelBilgi: [
                            "Üçgenin 3 kenarı vardır.",
                            "Dörtgenin 4 kenarı vardır.",
                            "Kare bir dörtgendir.",
                            "Dikdörtgen bir dörtgendir.",
                            "Çokgenler doğru parçalarından oluşan kapalı şekillerdir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir karenin kaç kenarı vardır?",
                                cozum: `
                                    Kare bir dörtgendir.
                                    Bu nedenle 4 kenarı vardır.
                                `
                            }
                        ],

                        dikkat: `
                            Kare ile dikdörtgeni birbirinden ayırırken
                            kenar özelliklerine dikkat edilmelidir.
                        `,

                        ozet: `
                            Geometrik şekiller kenar, köşe ve açı
                            özellikleriyle incelenir.
                        `,

                        test: [
                            {
                                soru: "Üçgenin kaç kenarı vardır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kare kaç kenarlıdır?",
                                secenekler: [
                                    "3",
                                    "4",
                                    "5",
                                    "6"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi dörtgendir?",
                                secenekler: [
                                    "Üçgen",
                                    "Kare",
                                    "Daire",
                                    "Doğru"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Bir dörtgenin kaç köşesi vardır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Çokgenlerin temel özelliği nedir?",
                                secenekler: [
                                    "Kapalı ve doğru parçalarından oluşmaları",
                                    "Her zaman yuvarlak olmaları",
                                    "Tek kenarlı olmaları",
                                    "Sadece üç köşeli olmaları"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-matematik-geometrik-nicelikler",
                        ad: "Geometrik Nicelikler",

                        giris: `
                            Uzunluk, alan ve çevre gibi geometrik
                            nicelikleri anlamaya yönelik çalışmalar yapılır.
                        `,

                        anlatim: `
                            <h3>Çevre</h3>

                            <p>
                                Bir şeklin bütün kenar uzunluklarının
                                toplamına çevre denir.
                            </p>

                            <div class="kitap-formul">
                                Dikdörtgen çevresi =
                                2 × (uzun kenar + kısa kenar)
                            </div>

                            <h3>Alan</h3>

                            <p>
                                Bir yüzeyin kapladığı bölgeye alan denir.
                            </p>

                            <div class="kitap-formul">
                                Dikdörtgen alanı =
                                uzun kenar × kısa kenar
                            </div>
                        `,

                        temelBilgi: [
                            "Çevre kenar uzunluklarının toplamıdır.",
                            "Alan yüzeyin kapladığı bölgedir.",
                            "Alan birimleri kare birim şeklindedir.",
                            "Uzunluk ölçülerinde birim seçimine dikkat edilmelidir."
                        ],

                        ornekler: [
                            {
                                soru: "Kenarları 5 cm ve 3 cm olan dikdörtgenin çevresi kaç cm'dir?",
                                cozum: `
                                    Çevre = 2 × (5 + 3)
                                    Çevre = 2 × 8
                                    Çevre = 16 cm
                                `
                            }
                        ],

                        dikkat: `
                            Alan ile çevre aynı şey değildir.
                            Çevre uzunluk birimiyle, alan ise kare
                            birimlerle ifade edilir.
                        `,

                        ozet: `
                            Çevre kenarların toplamı, alan ise
                            yüzeyin kapladığı bölgedir.
                        `,

                        test: [
                            {
                                soru: "4 cm ve 6 cm kenarlı dikdörtgenin çevresi kaç cm'dir?",
                                secenekler: [
                                    "10",
                                    "20",
                                    "24",
                                    "12"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "5 cm × 4 cm dikdörtgenin alanı kaç cm²'dir?",
                                secenekler: [
                                    "9",
                                    "18",
                                    "20",
                                    "25"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Çevre neyi ifade eder?",
                                secenekler: [
                                    "Yüzey miktarını",
                                    "Kenar uzunlukları toplamını",
                                    "Hacmi",
                                    "Ağırlığı"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Alan hangi birimle ifade edilebilir?",
                                secenekler: [
                                    "cm",
                                    "kg",
                                    "cm²",
                                    "L"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Bir karenin bir kenarı 3 cm ise çevresi kaç cm'dir?",
                                secenekler: [
                                    "6",
                                    "9",
                                    "12",
                                    "15"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-matematik-istatistik",
                        ad: "İstatistiksel Araştırma Süreci",

                        giris: `
                            Verileri toplama, düzenleme, tablo ve
                            grafiklerle gösterme süreçleri incelenir.
                        `,

                        anlatim: `
                            <h3>Veri</h3>

                            <p>
                                Bir araştırma sonucunda elde edilen
                                bilgilere veri denir.
                            </p>

                            <p>
                                Veriler tablo ve grafikler kullanılarak
                                daha kolay anlaşılabilir hâle getirilebilir.
                            </p>

                            <h3>Sıklık</h3>

                            <p>
                                Bir verinin kaç kez tekrarlandığını
                                gösteren değere sıklık denir.
                            </p>
                        `,

                        temelBilgi: [
                            "Veriler araştırma sonucunda elde edilir.",
                            "Tablolar verileri düzenli göstermeyi sağlar.",
                            "Grafikler verilerin görsel olarak anlaşılmasını kolaylaştırır.",
                            "Sıklık bir değerin kaç kez tekrarlandığını gösterir."
                        ],

                        ornekler: [
                            {
                                soru: "2, 3, 3, 4, 3 veri grubunda 3 sayısının sıklığı kaçtır?",
                                cozum: `
                                    3 sayısı üç kez tekrarlandığı için
                                    sıklığı 3'tür.
                                `
                            }
                        ],

                        dikkat: `
                            Grafikte eksenleri, başlığı ve birimleri
                            okumadan sonuca ulaşmaya çalışmayın.
                        `,

                        ozet: `
                            İstatistiksel araştırmada veri toplanır,
                            düzenlenir, gösterilir ve yorumlanır.
                        `,

                        test: [
                            {
                                soru: "2, 2, 3, 4, 2 veri grubunda 2'nin sıklığı kaçtır?",
                                secenekler: [
                                    "1",
                                    "2",
                                    "3",
                                    "4"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Veriler hangi araçla görsel olarak gösterilebilir?",
                                secenekler: [
                                    "Grafik",
                                    "Sadece metin",
                                    "Sadece ses",
                                    "Hiçbiri"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bir verinin tekrar sayısına ne denir?",
                                secenekler: [
                                    "Alan",
                                    "Sıklık",
                                    "Çevre",
                                    "Uzunluk"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Araştırmada ilk yapılması gerekenlerden biri nedir?",
                                secenekler: [
                                    "Veri toplamak",
                                    "Sonucu ezberlemek",
                                    "Grafiği silmek",
                                    "Soruyu değiştirmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Grafikler neyi kolaylaştırır?",
                                secenekler: [
                                    "Verileri yorumlamayı",
                                    "Verileri yok etmeyi",
                                    "Soruları azaltmayı",
                                    "Sayısal değeri değiştirmeyi"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-matematik-olasilik",
                        ad: "Veriden Olasılığa",

                        giris: `
                            Olayların gerçekleşme durumlarını ve
                            basit olasılık fikirlerini anlamaya yönelik
                            çalışmalar yapılır.
                        `,

                        anlatim: `
                            <h3>Olasılık</h3>

                            <p>
                                Bir olayın gerçekleşme ihtimalini
                                ifade etmek için olasılık kavramından
                                yararlanılır.
                            </p>

                            <p>
                                Kesin gerçekleşecek olayların olasılığı
                                1, gerçekleşmesi mümkün olmayan olayların
                                olasılığı ise 0 olarak ifade edilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Olasılık bir olayın gerçekleşme ihtimalidir.",
                            "Kesin olayın olasılığı 1'dir.",
                            "İmkânsız olayın olasılığı 0'dır.",
                            "Olasılık 0 ile 1 arasında bir değerdir."
                        ],

                        ornekler: [
                            {
                                soru: "Standart bir zar atıldığında 7 gelme olasılığı nedir?",
                                cozum: `
                                    Standart zarın yüzleri 1,2,3,4,5,6'dır.
                                    7 gelmesi mümkün değildir.
                                    Bu nedenle olay imkânsızdır ve
                                    olasılığı 0'dır.
                                `
                            }
                        ],

                        dikkat: `
                            “Kesin”, “mümkün” ve “imkânsız” ifadelerini
                            birbirinden ayırmaya dikkat edin.
                        `,

                        ozet: `
                            Olasılık olayların gerçekleşme ihtimalini
                            ifade eder.
                        `,

                        test: [
                            {
                                soru: "Kesin olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "0,5",
                                    "1",
                                    "2"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "İmkânsız olayın olasılığı kaçtır?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "2",
                                    "0,5"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Zar atıldığında 7 gelmesi nasıldır?",
                                secenekler: [
                                    "Kesin",
                                    "İmkânsız",
                                    "Çok olası",
                                    "Normal"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Olasılık hangi aralıkta bulunur?",
                                secenekler: [
                                    "0 ile 1 arasında",
                                    "1 ile 10 arasında",
                                    "-10 ile -1 arasında",
                                    "Sadece 2"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bir olayın gerçekleşme ihtimalini inceleyen kavram hangisidir?",
                                secenekler: [
                                    "Alan",
                                    "Çevre",
                                    "Olasılık",
                                    "Uzunluk"
                                ],
                                cevap: 2
                            }
                        ]
                    }

                ]
            },

            /* -------------------------------------------------
               FEN BİLİMLERİ
            ------------------------------------------------- */
            fen: {
                ad: "Fen Bilimleri",
                icon: "🔬",

                konular: [
                    {
                        id: "5-fen-gokyuzundeki-komsularimiz",
                        ad: "Gökyüzündeki Komşularımız ve Biz",

                        giris: `
                            Dünya'nın uzaydaki konumu, Güneş,
                            Ay ve diğer gök cisimleri hakkında
                            temel bilgiler ediniriz.
                        `,

                        anlatim: `
                            <h3>Güneş</h3>
                            <p>
                                Güneş, Dünya'ya en yakın yıldızdır.
                                Isı ve ışık kaynağımızdır.
                            </p>

                            <h3>Ay</h3>
                            <p>
                                Ay, Dünya'nın doğal uydusudur.
                                Kendi ışığını üretmez; Güneş'ten
                                aldığı ışığı yansıtır.
                            </p>

                            <h3>Dünya</h3>
                            <p>
                                Dünya, Güneş Sistemi'ndeki gezegenlerden
                                biridir ve üzerinde yaşam bulunan
                                bilinen tek gezegendir.
                            </p>
                        `,

                        temelBilgi: [
                            "Güneş bir yıldızdır.",
                            "Ay Dünya'nın doğal uydusudur.",
                            "Ay kendi ışığını üretmez.",
                            "Dünya Güneş'in etrafında dolanır.",
                            "Güneş Sistemi'nin merkezinde Güneş bulunur."
                        ],

                        ornekler: [
                            {
                                soru: "Ay neden geceleri parlak görünür?",
                                cozum: `
                                    Ay kendi ışığını üretmez.
                                    Güneş'ten aldığı ışığı yansıttığı
                                    için parlak görünür.
                                `
                            }
                        ],

                        dikkat: `
                            Ay'ın bir yıldız olduğunu düşünmeyin.
                            Ay bir doğal uydudur.
                        `,

                        ozet: `
                            Güneş bir yıldız, Dünya bir gezegen,
                            Ay ise Dünya'nın doğal uydusudur.
                        `,

                        test: [
                            {
                                soru: "Güneş nedir?",
                                secenekler: [
                                    "Gezegen",
                                    "Uydu",
                                    "Yıldız",
                                    "Asteroit"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Ay'ın doğal uydusu olduğu gök cismi hangisidir?",
                                secenekler: [
                                    "Mars",
                                    "Dünya",
                                    "Güneş",
                                    "Jüpiter"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Ay ışığını nereden alır?",
                                secenekler: [
                                    "Dünya'dan",
                                    "Mars'tan",
                                    "Güneş'ten",
                                    "Kendi üretir"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Dünya'nın şekli yaklaşık olarak nasıldır?",
                                secenekler: [
                                    "Küre",
                                    "Küp",
                                    "Üçgen",
                                    "Düz çizgi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Dünya'nın enerji kaynağı olan gök cismi hangisidir?",
                                secenekler: [
                                    "Ay",
                                    "Güneş",
                                    "Mars",
                                    "Venüs"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-kuvveti-taniyalim",
                        ad: "Kuvveti Tanıyalım",

                        giris: `
                            Kuvvetin cisimler üzerindeki etkilerini
                            ve günlük yaşamdaki örneklerini inceleriz.
                        `,

                        anlatim: `
                            <h3>Kuvvet</h3>

                            <p>
                                Bir cismi itme veya çekme etkisine
                                kuvvet denir.
                            </p>

                            <p>
                                Kuvvet bir cismin hareketini
                                başlatabilir, durdurabilir,
                                hızlandırabilir, yavaşlatabilir
                                veya yönünü değiştirebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Kuvvet itme veya çekme etkisidir.",
                            "Kuvvet cisimlerin hareket durumunu değiştirebilir.",
                            "Kuvvetin yönü ve büyüklüğü vardır.",
                            "Dinamometre kuvvet ölçmek için kullanılır."
                        ],

                        ornekler: [
                            {
                                soru: "Hareket hâlindeki topa ayağımızla vurduğumuzda ne olur?",
                                cozum: `
                                    Topa bir kuvvet uygulanır.
                                    Bu kuvvet topun hızını veya
                                    yönünü değiştirebilir.
                                `
                            }
                        ],

                        dikkat: `
                            Kuvvet sadece hareket eden cisimlere
                            uygulanmaz. Duran bir cisme uygulanan
                            kuvvet de cismin durumunu değiştirebilir.
                        `,

                        ozet: `
                            Kuvvet cisimleri itme veya çekme etkisidir
                            ve hareket üzerinde değişiklik oluşturabilir.
                        `,

                        test: [
                            {
                                soru: "Kuvvet nedir?",
                                secenekler: [
                                    "Sadece sıcaklık",
                                    "İtme veya çekme etkisi",
                                    "Sadece ışık",
                                    "Madde miktarı"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kuvvet hangi aracı ölçer?",
                                secenekler: [
                                    "Termometre",
                                    "Dinamometre",
                                    "Cetvel",
                                    "Terazi"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kuvvet aşağıdakilerden hangisini değiştirebilir?",
                                secenekler: [
                                    "Hareket yönünü",
                                    "Sadece rengini",
                                    "Sadece şeklini",
                                    "Hiçbir şeyi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kapıyı açarken hangi kuvvet uygulanabilir?",
                                secenekler: [
                                    "İtme veya çekme",
                                    "Sadece ışık",
                                    "Sadece ses",
                                    "Hiçbir kuvvet"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kuvvetin birimi hangisidir?",
                                secenekler: [
                                    "Metre",
                                    "Newton",
                                    "Litre",
                                    "Kilogram"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-canlilarin-yapisina-yolculuk",
                        ad: "Canlıların Yapısına Yolculuk",

                        giris: `
                            Canlıların temel yapı birimi olan hücreyi
                            ve hücrenin temel kısımlarını inceleriz.
                        `,

                        anlatim: `
                            <h3>Hücre</h3>

                            <p>
                                Canlıların temel yapı ve görev birimine
                                hücre denir.
                            </p>

                            <p>
                                Hücrelerin farklı görevleri olabilir.
                                Bitki ve hayvan hücrelerinde ortak
                                yapılar bulunduğu gibi farklı yapılar
                                da vardır.
                            </p>
                        `,

                        temelBilgi: [
                            "Hücre canlıların temel yapı birimidir.",
                            "Hücre zarı hücreyi çevreler.",
                            "Çekirdek hücrenin yönetim merkezidir.",
                            "Bitki hücrelerinde hücre duvarı ve kloroplast bulunur."
                        ],

                        ornekler: [
                            {
                                soru: "Hücrenin yönetim merkezine ne ad verilir?",
                                cozum: `
                                    Hücrenin yönetim merkezi çekirdektir.
                                `
                            }
                        ],

                        dikkat: `
                            Hücre zarı ile hücre duvarı aynı yapı değildir.
                            Hücre duvarı özellikle bitki hücrelerinde bulunur.
                        `,

                        ozet: `
                            Hücre canlıların temel yapı birimidir ve
                            farklı bölümleri farklı görevler üstlenir.
                        `,

                        test: [
                            {
                                soru: "Canlıların temel yapı birimi nedir?",
                                secenekler: [
                                    "Organ",
                                    "Hücre",
                                    "Sistem",
                                    "Doku"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Hücrenin yönetim merkezi hangisidir?",
                                secenekler: [
                                    "Çekirdek",
                                    "Hücre duvarı",
                                    "Koful",
                                    "Sitoplazma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kloroplast hangi hücrede bulunur?",
                                secenekler: [
                                    "Bitki hücresinde",
                                    "Sadece hayvan hücresinde",
                                    "Hiçbir hücrede",
                                    "Sadece bakteride"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hücre zarı ne işe yarar?",
                                secenekler: [
                                    "Hücreyi çevreler",
                                    "Işık üretir",
                                    "Kemik oluşturur",
                                    "Ses üretir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bitki hücresinin hayvan hücresinden farklı yapılarından biri hangisidir?",
                                secenekler: [
                                    "Çekirdek",
                                    "Hücre zarı",
                                    "Kloroplast",
                                    "Sitoplazma"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-fen-isigin-dunyasi",
                        ad: "Işığın Dünyası",

                        giris: `
                            Işığın yayılması, maddelerle etkileşimi
                            ve gölgelerin oluşumu incelenir.
                        `,

                        anlatim: `
                            <h3>Işık</h3>

                            <p>
                                Işık, cisimleri görmemizi sağlayan
                                enerji türlerinden biridir.
                            </p>

                            <p>
                                Işık doğrusal yollar boyunca yayılır.
                                Bir ışık kaynağından çıkan ışık,
                                karşısına çıkan maddelerle etkileşebilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Işık doğrusal yayılır.",
                            "Işık kaynakları doğal veya yapay olabilir.",
                            "Saydam maddeler ışığın büyük kısmını geçirir.",
                            "Opak maddeler ışığı geçirmez.",
                            "Gölge ışığın engellenmesi sonucu oluşur."
                        ],

                        ornekler: [
                            {
                                soru: "Gölge nasıl oluşur?",
                                cozum: `
                                    Bir ışık kaynağından gelen ışığın
                                    opak bir cisim tarafından engellenmesi
                                    sonucunda cismin arkasında gölge oluşur.
                                `
                            }
                        ],

                        dikkat: `
                            Gölgenin oluşması için ışık kaynağı,
                            engelleyici cisim ve uygun bir yüzey
                            arasındaki konum ilişkisi önemlidir.
                        `,

                        ozet: `
                            Işık doğrusal yayılır ve maddelerle
                            etkileşerek gölge gibi olaylara neden olur.
                        `,

                        test: [
                            {
                                soru: "Işık nasıl yayılır?",
                                secenekler: [
                                    "Dairesel",
                                    "Doğrusal",
                                    "Sadece aşağı",
                                    "Yayılmaz"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Işığı geçirmeyen maddeye ne denir?",
                                secenekler: [
                                    "Saydam",
                                    "Yarı saydam",
                                    "Opak",
                                    "Parlak"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Gölge hangi olay sonucu oluşur?",
                                secenekler: [
                                    "Işığın engellenmesi",
                                    "Sesin artması",
                                    "Suyun buharlaşması",
                                    "Sıcaklığın düşmesi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi doğal ışık kaynağıdır?",
                                secenekler: [
                                    "Ampul",
                                    "El feneri",
                                    "Güneş",
                                    "Mum"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Saydam maddelerin özelliği nedir?",
                                secenekler: [
                                    "Işığı büyük ölçüde geçirir",
                                    "Işığı tamamen engeller",
                                    "Hiçbir özelliği yoktur",
                                    "Sadece ses geçirir"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-maddenin-dogasi",
                        ad: "Maddenin Doğası",

                        giris: `
                            Maddelerin özelliklerini, hâllerini ve
                            günlük yaşamda karşılaşılan değişimleri
                            incelemeye başlarız.
                        `,

                        anlatim: `
                            <h3>Maddenin Hâlleri</h3>

                            <p>
                                Maddeler temel olarak katı, sıvı ve gaz
                                hâllerinde bulunabilir.
                            </p>

                            <p>
                                Katıların belirli şekli ve hacmi,
                                sıvıların belirli hacmi fakat
                                bulundukları kabın şeklini alma özelliği,
                                gazların ise belirli şekil ve hacminin
                                olmaması temel özelliklerindendir.
                            </p>
                        `,

                        temelBilgi: [
                            "Katıların belirli şekli ve hacmi vardır.",
                            "Sıvılar bulundukları kabın şeklini alır.",
                            "Gazlar bulundukları kabı doldurur.",
                            "Maddeler hâl değiştirebilir."
                        ],

                        ornekler: [
                            {
                                soru: "Buzun suya dönüşmesi hangi hâl değişimidir?",
                                cozum: `
                                    Katı olan buz ısı alarak sıvı hâle
                                    geçer. Bu olaya erime denir.
                                `
                            }
                        ],

                        dikkat: `
                            Erime ile donma birbirinin tersidir.
                            Buharlaşma ile yoğuşma da ters yönlü
                            hâl değişimleridir.
                        `,

                        ozet: `
                            Maddeler katı, sıvı ve gaz hâllerinde
                            bulunabilir ve uygun koşullarda hâl değiştirebilir.
                        `,

                        test: [
                            {
                                soru: "Buz hangi hâldedir?",
                                secenekler: [
                                    "Katı",
                                    "Sıvı",
                                    "Gaz",
                                    "Plazma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Suyun buhar hâline geçmesine ne denir?",
                                secenekler: [
                                    "Donma",
                                    "Erime",
                                    "Buharlaşma",
                                    "Yoğuşma"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Sıvıların belirli olan özelliği hangisidir?",
                                secenekler: [
                                    "Şekil",
                                    "Hacim",
                                    "Hiçbiri",
                                    "Renk"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Gazlar neyi doldurur?",
                                secenekler: [
                                    "Sadece yüzeyi",
                                    "Bulundukları kabı",
                                    "Sadece tabanı",
                                    "Hiçbir şeyi"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Suyun donması hangi değişimdir?",
                                secenekler: [
                                    "Sıvıdan katıya",
                                    "Katıdan sıvıya",
                                    "Gazdan sıvıya",
                                    "Katıdan gaza"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-yasamimizdaki-elektrik",
                        ad: "Yaşamımızdaki Elektrik",

                        giris: `
                            Elektrik devrelerinin temel elemanlarını
                            ve elektrik enerjisinin günlük yaşamda
                            kullanımını öğreniriz.
                        `,

                        anlatim: `
                            <h3>Elektrik Devresi</h3>

                            <p>
                                Elektrik enerjisinin devrede dolaşabilmesi
                                için devrenin uygun şekilde kurulması gerekir.
                            </p>

                            <p>
                                Basit bir elektrik devresinde pil,
                                ampul, bağlantı kabloları ve anahtar
                                gibi elemanlar bulunabilir.
                            </p>
                        `,

                        temelBilgi: [
                            "Pil elektrik enerjisi sağlayabilir.",
                            "Ampul elektrik enerjisini ışık ve ısıya dönüştürebilir.",
                            "Anahtar devreyi açıp kapatabilir.",
                            "Kapalı devrede elektrik akımı dolaşabilir."
                        ],

                        ornekler: [
                            {
                                soru: "Anahtar açıkken ampul neden yanmaz?",
                                cozum: `
                                    Anahtar açık olduğunda devrenin
                                    sürekliliği bozulur. Bu nedenle
                                    elektrik akımı devreden geçemez
                                    ve ampul yanmaz.
                                `
                            }
                        ],

                        dikkat: `
                            Devrenin çalışması için elektriksel
                            bağlantıların uygun ve devrenin kapalı
                            olması gerekir.
                        `,

                        ozet: `
                            Elektrik devrelerinde pil, ampul,
                            anahtar ve bağlantı kabloları gibi
                            temel elemanlar kullanılabilir.
                        `,

                        test: [
                            {
                                soru: "Basit elektrik devresinde enerji kaynağı hangisidir?",
                                secenekler: [
                                    "Ampul",
                                    "Pil",
                                    "Anahtar",
                                    "Kablo"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Anahtarın görevi nedir?",
                                secenekler: [
                                    "Devreyi açıp kapatmak",
                                    "Işık üretmek",
                                    "Enerji depolamak",
                                    "Kablo olmak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ampul elektrik enerjisini hangi enerjiye dönüştürebilir?",
                                secenekler: [
                                    "Işık",
                                    "Sadece ses",
                                    "Sadece hareket",
                                    "Hiçbirine"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kapalı devrede ne gerçekleşebilir?",
                                secenekler: [
                                    "Akım dolaşabilir",
                                    "Pil yok olur",
                                    "Kablo kopar",
                                    "Hiçbir şey"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi devre elemanıdır?",
                                secenekler: [
                                    "Pil",
                                    "Kitap",
                                    "Masa",
                                    "Kalem"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            /* -------------------------------------------------
               TÜRKÇE
            ------------------------------------------------- */
            turkce: {
                ad: "Türkçe",
                icon: "📚",

                konular: [
                    {
                        id: "5-turkce-okuma",
                        ad: "Okuma ve Anlama",

                        giris: `
                            Metinleri doğru anlamak, ana fikri bulmak
                            ve metindeki önemli bilgileri ayırt etmek
                            Türkçe dersinin temel becerilerindendir.
                        `,

                        anlatim: `
                            <h3>Ana Fikir</h3>

                            <p>
                                Bir metinde yazarın asıl vermek istediği
                                düşünce ana fikir olarak adlandırılır.
                            </p>

                            <h3>Yardımcı Fikir</h3>

                            <p>
                                Ana fikri destekleyen düşünceler yardımcı
                                fikirlerdir.
                            </p>

                            <h3>Metni Anlama</h3>

                            <p>
                                Bir metni anlamak için yalnızca kelimeleri
                                okumak yeterli değildir. Metnin bütünü,
                                başlığı, olayların ilişkisi ve yazarın
                                amacı birlikte değerlendirilmelidir.
                            </p>
                        `,

                        temelBilgi: [
                            "Ana fikir metnin temel mesajıdır.",
                            "Yardımcı fikirler ana fikri destekler.",
                            "Başlık metnin içeriği hakkında ipucu verebilir.",
                            "Metindeki önemli bilgiler belirlenmelidir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir metnin okuyucuya vermek istediği temel düşünceye ne denir?",
                                cozum: `
                                    Metnin temel mesajına ana fikir denir.
                                `
                            }
                        ],

                        dikkat: `
                            Metinde geçen en uzun veya en sık kullanılan
                            cümleyi doğrudan ana fikir sanmayın.
                        `,

                        ozet: `
                            Okuduğumuz metinlerde ana fikir,
                            yardımcı fikirler ve önemli bilgiler
                            belirlenerek metnin bütünü anlaşılır.
                        `,

                        test: [
                            {
                                soru: "Metnin temel mesajına ne denir?",
                                secenekler: [
                                    "Başlık",
                                    "Ana fikir",
                                    "Kelime",
                                    "Paragraf"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Ana fikri destekleyen düşüncelere ne denir?",
                                secenekler: [
                                    "Yardımcı fikir",
                                    "Başlık",
                                    "Fiil",
                                    "Ek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Metni anlamada hangisi önemlidir?",
                                secenekler: [
                                    "Metnin bütünü",
                                    "Sadece ilk kelime",
                                    "Sadece son kelime",
                                    "Sadece noktalama"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Başlık bize ne hakkında ipucu verebilir?",
                                secenekler: [
                                    "Metnin içeriği",
                                    "Yazarın yaşı",
                                    "Sayfa sayısı",
                                    "Kâğıdın türü"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ana fikir hangi özelliğe sahiptir?",
                                secenekler: [
                                    "Temel mesajdır",
                                    "Her zaman tek kelimedir",
                                    "Sadece başlıkta bulunur",
                                    "Metinle ilgisizdir"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-turkce-sozcuk-anlami",
                        ad: "Sözcükte Anlam",

                        giris: `
                            Sözcüklerin cümle içindeki anlamlarını
                            doğru yorumlamak iletişimin temelidir.
                        `,

                        anlatim: `
                            <h3>Gerçek Anlam</h3>

                            <p>
                                Bir sözcüğün akla gelen ilk ve temel
                                anlamına gerçek anlam denir.
                            </p>

                            <h3>Yan Anlam</h3>

                            <p>
                                Sözcüğün temel anlamıyla bağlantılı
                                olarak kazandığı yeni anlama yan anlam
                                denir.
                            </p>

                            <h3>Mecaz Anlam</h3>

                            <p>
                                Sözcüğün gerçek anlamından uzaklaşarak
                                kazandığı yeni anlama mecaz anlam denir.
                            </p>
                        `,

                        temelBilgi: [
                            "Gerçek anlam temel anlamdır.",
                            "Yan anlam temel anlamla bağlantılıdır.",
                            "Mecaz anlam gerçek anlamdan uzaklaşmıştır.",
                            "Sözcüğün anlamı cümleye göre değişebilir."
                        ],

                        ornekler: [
                            {
                                soru: "“Soğuk su” ifadesindeki “soğuk” sözcüğü hangi anlamdadır?",
                                cozum: `
                                    Burada sözcük temel anlamıyla
                                    kullanıldığı için gerçek anlamdadır.
                                `
                            }
                        ],

                        dikkat: `
                            Sözcüğü tek başına değil, mümkün olduğunca
                            cümle içindeki kullanımına göre değerlendirin.
                        `,

                        ozet: `
                            Sözcükler gerçek, yan veya mecaz anlamlarda
                            kullanılabilir.
                        `,

                        test: [
                            {
                                soru: "Sözcüğün akla gelen ilk anlamına ne denir?",
                                secenekler: [
                                    "Mecaz anlam",
                                    "Gerçek anlam",
                                    "Yan anlam",
                                    "Terim anlam"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Mecaz anlamda sözcük ne yapar?",
                                secenekler: [
                                    "Gerçek anlamından uzaklaşır",
                                    "Aynı kalır",
                                    "Yok olur",
                                    "Sadece isim olur"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Sıcak çorba” ifadesinde sıcak sözcüğü hangi anlamdadır?",
                                secenekler: [
                                    "Gerçek",
                                    "Mecaz",
                                    "Yan",
                                    "Terim"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Bir sözcüğün anlamını belirlerken neye dikkat edilir?",
                                secenekler: [
                                    "Cümledeki kullanımına",
                                    "Harf sayısına",
                                    "Sayfa numarasına",
                                    "Yazı tipine"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gerçek anlamdan uzaklaşarak kullanılan sözcük hangi anlamdadır?",
                                secenekler: [
                                    "Gerçek",
                                    "Mecaz",
                                    "Yan",
                                    "Sayı"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },

            /* -------------------------------------------------
               DİN KÜLTÜRÜ
            ------------------------------------------------- */
            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "🌙",

                konular: [
                    {
                        id: "5-din-allah-inanci",
                        ad: "Allah İnancı",

                        giris: `
                            İnsanların inanç, yaratılış ve Allah
                            hakkındaki temel düşünceleri ele alınır.
                        `,

                        anlatim: `
                            <h3>İnanç</h3>

                            <p>
                                İnanç, insanın kabul ettiği temel
                                değerler ve düşüncelerle ilgilidir.
                            </p>

                            <p>
                                İslam inancında Allah'ın varlığı ve
                                birliği temel inanç esaslarındandır.
                            </p>
                        `,

                        temelBilgi: [
                            "Allah'ın bir olduğuna inanılır.",
                            "İslam'da Allah inancı temel inanç esaslarındandır.",
                            "İnsan yaratılış ve evrendeki düzen üzerine düşünebilir."
                        ],

                        ornekler: [
                            {
                                soru: "İslam inancında Allah'ın bir olması hangi kavramla ifade edilir?",
                                cozum: `
                                    Allah'ın bir ve tek olduğuna inanmak
                                    tevhid anlayışıyla ifade edilir.
                                `
                            }
                        ],

                        dikkat: `
                            İnanç konularında kavramların anlamlarını
                            doğru öğrenmek önemlidir.
                        `,

                        ozet: `
                            Allah'ın varlığı ve birliği İslam inancının
                            temel unsurlarındandır.
                        `,

                        test: [
                            {
                                soru: "İslam inancında Allah'ın birliği neyi ifade eder?",
                                secenekler: [
                                    "Tevhid",
                                    "Sabır",
                                    "Şükür",
                                    "Temizlik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Allah inancı hangi alanla ilgilidir?",
                                secenekler: [
                                    "İnanç",
                                    "Spor",
                                    "Matematik",
                                    "Coğrafya"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İnsan evrendeki düzen hakkında ne yapabilir?",
                                secenekler: [
                                    "Düşünebilir",
                                    "Hiçbir şey",
                                    "Sadece sayabilir",
                                    "Sadece çizebilir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İslam'da temel inanç unsurlarından biri hangisidir?",
                                secenekler: [
                                    "Allah inancı",
                                    "Oyun",
                                    "Spor",
                                    "Resim"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tevhid neyi ifade eder?",
                                secenekler: [
                                    "Allah'ın birliğini",
                                    "Çokluğu",
                                    "Sporu",
                                    "Bilimi"
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
       DİĞER SINIFLAR
       =====================================================
       Aşağıdaki yapı özellikle boş bırakılmıyor.
       Her sınıf kitaplik.js tarafından tanınabilir.
       Program verileri ders bazında eklenmeye devam edilecek.
    ===================================================== */

    "6": {
        ad: "6. Sınıf",
        dersler: {}
    },

    "7": {
        ad: "7. Sınıf",
        dersler: {}
    },

    "8": {
        ad: "8. Sınıf",
        dersler: {}
    },

    "9": {
        ad: "9. Sınıf",
        dersler: {}
    },

    "10": {
        ad: "10. Sınıf",
        dersler: {}
    },

    "11": {
        ad: "11. Sınıf",
        dersler: {}
    },

    "12": {
        ad: "12. Sınıf",
        dersler: {}
    }
};
