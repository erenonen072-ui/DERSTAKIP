/* =========================================================
   DERS TAKİP — KİTAPLIK DATA
   Sınıf → Ders → Konu → Konu Anlatımı → Mini Test
   ========================================================= */

window.kitaplikData = {

    /* =====================================================
       5. SINIF
    ===================================================== */

    "5": {
        ad: "5. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",

                konular: [

                    {
                        id: "5-mat-1",
                        ad: "Sayılar ve Nicelikler",
                        giris: "Doğal sayılar ve sayılarla ilgili temel kavramları öğren.",
                        anlatim: `
                            <h3>🔢 Doğal Sayılar</h3>

                            <p>
                                Doğal sayılar günlük hayatta sayma ve sıralama
                                amacıyla kullandığımız sayılardır.
                            </p>

                            <p>
                                0, 1, 2, 3, 4, 5, ... şeklinde devam eder.
                            </p>

                            <h3>Basamak Değeri</h3>

                            <p>
                                Bir rakamın bulunduğu basamağa göre aldığı değere
                                basamak değeri denir.
                            </p>

                            <div class="kitap-ornek">
                                Örnek: 4 582 sayısında 5 yüzler basamağındadır.
                                Bu nedenle basamak değeri 500'dür.
                            </div>
                        `,
                        temelBilgi: [
                            "Doğal sayılar 0'dan başlar.",
                            "Rakamlar 0 ile 9 arasındaki sembollerdir.",
                            "Bir rakamın değeri bulunduğu basamağa göre değişebilir."
                        ],
                        ornekler: [
                            {
                                soru: "3 427 sayısında 4 rakamının basamak değeri kaçtır?",
                                cozum: "4 yüzler basamağındadır. Basamak değeri 400'dür."
                            }
                        ],
                        dikkat: "Rakamın kendi değeri ile basamak değerini karıştırma.",
                        ozet: "Doğal sayıları okurken ve yazarken basamak değerlerine dikkat et.",
                        test: [
                            {
                                soru: "305 sayısında 3 rakamının basamak değeri kaçtır?",
                                secenekler: [
                                    "3",
                                    "30",
                                    "300",
                                    "3000"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Aşağıdakilerden hangisi doğal sayıdır?",
                                secenekler: [
                                    "-4",
                                    "2,5",
                                    "7",
                                    "1/2"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-2",
                        ad: "İşlemlerle Cebirsel Düşünme",
                        giris: "Matematiksel işlemleri kullanarak ilişkileri ve örüntüleri keşfet.",
                        anlatim: `
                            <h3>➕ İşlemler</h3>
                            <p>
                                Toplama, çıkarma, çarpma ve bölme temel matematiksel
                                işlemlerdir.
                            </p>

                            <h3>🔁 Örüntüler</h3>
                            <p>
                                Belirli bir kurala göre devam eden sayı veya şekil
                                dizilerine örüntü denir.
                            </p>

                            <div class="kitap-ornek">
                                2, 4, 6, 8, 10, ...
                                <br>
                                Bu örüntü her adımda 2 artmaktadır.
                            </div>
                        `,
                        temelBilgi: [
                            "İşlemler belirli kurallara göre yapılır.",
                            "Örüntülerde bir kural bulunur.",
                            "Eksik terimi bulmak için örüntünün kuralı belirlenir."
                        ],
                        ornekler: [],
                        dikkat: "Örüntülerde ardışık terimler arasındaki ilişkiye dikkat et.",
                        ozet: "Örüntünün kuralını bulduğunda eksik terimleri kolayca belirleyebilirsin.",
                        test: [
                            {
                                soru: "3, 6, 9, 12, ? örüntüsünde soru işareti yerine ne gelir?",
                                secenekler: [
                                    "13",
                                    "14",
                                    "15",
                                    "16"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-3",
                        ad: "Geometrik Şekiller",
                        giris: "Temel geometrik şekilleri ve özelliklerini öğren.",
                        anlatim: `
                            <h3>📐 Geometrik Şekiller</h3>

                            <p>
                                Üçgen, kare, dikdörtgen ve çember temel geometrik
                                şekiller arasında yer alır.
                            </p>

                            <h3>🔺 Üçgen</h3>
                            <p>
                                Üç kenarı ve üç köşesi vardır.
                            </p>

                            <h3>⬛ Kare</h3>
                            <p>
                                Dört kenarı eşit olan dörtgenlerden biridir.
                            </p>
                        `,
                        temelBilgi: [
                            "Üçgenin üç kenarı vardır.",
                            "Karenin dört eşit kenarı vardır.",
                            "Dikdörtgenin karşılıklı kenarları eşittir."
                        ],
                        ornekler: [],
                        dikkat: "Şekillerin kenar ve köşe sayılarını karıştırma.",
                        ozet: "Geometrik şekilleri kenar, köşe ve açı özellikleriyle tanı.",
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
                            }
                        ]
                    },

                    {
                        id: "5-mat-4",
                        ad: "Geometrik Nicelikler",
                        giris: "Uzunluk, alan ve benzeri geometrik nicelikleri öğren.",
                        anlatim: `
                            <h3>📏 Uzunluk</h3>
                            <p>
                                Uzunluk ölçmek için milimetre, santimetre, metre
                                ve kilometre gibi birimler kullanılır.
                            </p>

                            <h3>📐 Alan</h3>
                            <p>
                                Bir şeklin kapladığı bölgeye alan denir.
                            </p>
                        `,
                        temelBilgi: [
                            "1 metre = 100 santimetredir.",
                            "Alan birimleri kareli birimlerle ifade edilir.",
                            "Uzunluk ve alan farklı niceliklerdir."
                        ],
                        ornekler: [],
                        dikkat: "Alan ile çevreyi birbirine karıştırma.",
                        ozet: "Geometrik nicelikleri doğru birimlerle ifade et.",
                        test: [
                            {
                                soru: "1 metre kaç santimetredir?",
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
                        id: "5-mat-5",
                        ad: "İstatistiksel Araştırma Süreci",
                        giris: "Verileri toplama, düzenleme ve yorumlamayı öğren.",
                        anlatim: `
                            <h3>📊 Veri</h3>
                            <p>
                                Bir araştırma sonucunda elde edilen bilgilere veri denir.
                            </p>

                            <p>
                                Veriler tablolar ve grafikler kullanılarak düzenlenebilir.
                            </p>
                        `,
                        temelBilgi: [
                            "Veriler araştırma sorularına cevap bulmak için kullanılır.",
                            "Tablolar verileri düzenlemeye yardımcı olur.",
                            "Grafikler verileri görsel olarak göstermeyi sağlar."
                        ],
                        ornekler: [],
                        dikkat: "Grafikteki başlık ve eksenleri mutlaka kontrol et.",
                        ozet: "Veriyi doğru okuyup yorumlamak istatistiksel düşünmenin temelidir.",
                        test: [
                            {
                                soru: "Verileri görsel olarak göstermeye hangisi yardımcı olur?",
                                secenekler: [
                                    "Grafik",
                                    "Sadece metin",
                                    "Hikâye",
                                    "Şiir"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-mat-6",
                        ad: "Veriden Olasılığa",
                        giris: "Olasılık kavramının temelini öğren.",
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
                            "Olasılık 0 ile 1 arasında değer alır.",
                            "İmkânsız olayın olasılığı 0'dır.",
                            "Kesin olayın olasılığı 1'dir."
                        ],
                        ornekler: [],
                        dikkat: "Olasılık değerinin 0 ile 1 arasında olması gerektiğini unutma.",
                        ozet: "Olasılık bir olayın gerçekleşme ihtimalini ifade eder.",
                        test: [
                            {
                                soru: "Kesin bir olayın olasılığı kaçtır?",
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

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [

                    {
                        id: "5-tr-1",
                        ad: "Çocuk Dünyası",
                        giris: "Çocukların dünyasını, hayallerini ve deneyimlerini anlatan metinleri incele.",
                        anlatim: `
                            <h3>📖 Metinleri Anlama</h3>
                            <p>
                                Bir metni anlamak için ana düşünceyi, yardımcı düşünceleri
                                ve metindeki önemli bilgileri belirlemek gerekir.
                            </p>
                        `,
                        temelBilgi: [
                            "Ana düşünce metnin temel mesajıdır.",
                            "Yardımcı düşünceler ana düşünceyi destekler.",
                            "Başlık metnin içeriği hakkında ipucu verebilir."
                        ],
                        ornekler: [],
                        dikkat: "Ana düşünceyi tek bir ayrıntıyla karıştırma.",
                        ozet: "Metnin tamamını okuyarak ana düşünceyi belirle.",
                        test: [
                            {
                                soru: "Bir metnin vermek istediği temel mesaja ne denir?",
                                secenekler: [
                                    "Ana düşünce",
                                    "Başlık",
                                    "Yardımcı düşünce",
                                    "Kelime"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-tr-2",
                        ad: "Millî Kültürümüz",
                        giris: "Türk kültürünü, geleneklerini ve ortak değerlerini tanı.",
                        anlatim: `
                            <h3>🇹🇷 Millî Kültür</h3>
                            <p>
                                Dil, tarih, gelenek, sanat ve ortak değerler kültürün
                                önemli unsurlarıdır.
                            </p>
                        `,
                        temelBilgi: [
                            "Dil kültürün önemli taşıyıcılarından biridir.",
                            "Gelenekler nesilden nesile aktarılabilir.",
                            "Kültür toplumların ortak değerlerini yansıtır."
                        ],
                        ornekler: [],
                        dikkat: "Kültürün yalnızca maddi unsurlardan oluşmadığını unutma.",
                        ozet: "Millî kültür ortak tarih, dil, gelenek ve değerlerle şekillenir.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi kültürün bir unsurudur?",
                                secenekler: [
                                    "Dil",
                                    "Sadece hava durumu",
                                    "Sadece sıcaklık",
                                    "Yer çekimi"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-tr-3",
                        ad: "Doğa ve Evren",
                        giris: "Doğa ve evrenle ilgili metinleri anlama ve yorumlama becerilerini geliştir.",
                        anlatim: `
                            <h3>🌍 Doğa ve Evren</h3>
                            <p>
                                Doğa ile ilgili metinlerde gözlem, betimleme ve bilgi
                                verme gibi anlatım yolları kullanılabilir.
                            </p>
                        `,
                        temelBilgi: [
                            "Betimleme bir varlığı veya yeri özellikleriyle anlatır.",
                            "Bilgilendirici metinler okuyucuya bilgi aktarır."
                        ],
                        ornekler: [],
                        dikkat: "Metnin amacını belirlemek için kullanılan anlatım biçimine dikkat et.",
                        ozet: "Doğa metinlerinde gözlem ve betimleme sıkça kullanılır.",
                        test: [
                            {
                                soru: "Bir varlığın özelliklerini ayrıntılı biçimde anlatmaya ne denir?",
                                secenekler: [
                                    "Betimleme",
                                    "Sayma",
                                    "Ölçme",
                                    "Çarpma"
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
                        id: "5-fen-1",
                        ad: "Dünya, Güneş ve Ay",
                        giris: "Dünya, Güneş ve Ay'ın temel özelliklerini öğren.",
                        anlatim: `
                            <h3>☀️ Güneş</h3>
                            <p>
                                Güneş bir yıldızdır ve Dünya için önemli bir enerji kaynağıdır.
                            </p>

                            <h3>🌍 Dünya</h3>
                            <p>
                                Dünya, Güneş'in etrafında dolanır ve kendi ekseni
                                etrafında döner.
                            </p>

                            <h3>🌙 Ay</h3>
                            <p>
                                Ay, Dünya'nın doğal uydusudur.
                            </p>
                        `,
                        temelBilgi: [
                            "Güneş bir yıldızdır.",
                            "Ay Dünya'nın doğal uydusudur.",
                            "Dünya kendi ekseni etrafında döner."
                        ],
                        ornekler: [],
                        dikkat: "Ay'ı bir yıldız olarak düşünme.",
                        ozet: "Güneş yıldız, Dünya gezegen, Ay ise Dünya'nın doğal uydusudur.",
                        test: [
                            {
                                soru: "Ay nedir?",
                                secenekler: [
                                    "Yıldız",
                                    "Gezegen",
                                    "Doğal uydu",
                                    "Galaksi"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-fen-2",
                        ad: "Kuvvet ve Kuvvetin Ölçülmesi",
                        giris: "Kuvvetin ne olduğunu ve nasıl ölçüldüğünü öğren.",
                        anlatim: `
                            <h3>💪 Kuvvet</h3>
                            <p>
                                Kuvvet cisimlerin hareketini veya şeklini değiştirebilir.
                            </p>

                            <p>
                                Kuvvet dinamometre ile ölçülür ve birimi Newton'dur.
                            </p>
                        `,
                        temelBilgi: [
                            "Kuvvet cisimlerin hareketini değiştirebilir.",
                            "Kuvvet dinamometre ile ölçülür.",
                            "Kuvvetin birimi Newton'dur."
                        ],
                        ornekler: [],
                        dikkat: "Kuvvetin birimini kilogram ile karıştırma.",
                        ozet: "Kuvvet dinamometreyle ölçülür ve Newton ile ifade edilir.",
                        test: [
                            {
                                soru: "Kuvvet hangi araçla ölçülür?",
                                secenekler: [
                                    "Termometre",
                                    "Dinamometre",
                                    "Metre",
                                    "Terazi"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-fen-3",
                        ad: "Canlılar Dünyası",
                        giris: "Canlıların temel özelliklerini ve sınıflandırılmasını öğren.",
                        anlatim: `
                            <h3>🧬 Canlılar</h3>
                            <p>
                                Canlılar beslenme, büyüme, gelişme ve üreme gibi
                                ortak özelliklere sahiptir.
                            </p>
                        `,
                        temelBilgi: [
                            "Canlılar büyür ve gelişir.",
                            "Canlılar enerjiye ihtiyaç duyar.",
                            "Canlılar nesillerini devam ettirmek için ürer."
                        ],
                        ornekler: [],
                        dikkat: "Canlıların ortak özelliklerini tek bir özellik ile sınırlama.",
                        ozet: "Canlıların birçok ortak yaşamsal özelliği vardır.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi canlıların ortak özelliklerinden biridir?",
                                secenekler: [
                                    "Büyüme",
                                    "Paslanma",
                                    "Erime",
                                    "Kırılma"
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
                        id: "5-sos-1",
                        ad: "Birlikte Yaşamak",
                        giris: "Toplum içinde birlikte yaşamanın önemini öğren.",
                        anlatim: `
                            <h3>🤝 Toplum</h3>
                            <p>
                                İnsanlar toplum içinde farklı roller ve sorumluluklar
                                üstlenir.
                            </p>
                        `,
                        temelBilgi: [
                            "Toplumda herkesin farklı rolleri olabilir.",
                            "Hak ve sorumluluklar birlikte yaşamanın temelidir."
                        ],
                        ornekler: [],
                        dikkat: "Hak ile sorumluluğun farklı kavramlar olduğunu unutma.",
                        ozet: "Birlikte yaşam için haklara saygı ve sorumluluk bilinci gerekir.",
                        test: [
                            {
                                soru: "Toplum içinde birlikte yaşamayı kolaylaştıran davranış hangisidir?",
                                secenekler: [
                                    "Saygı",
                                    "Kuralları yok saymak",
                                    "Başkalarını dinlememek",
                                    "Sorumluluktan kaçmak"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-sos-2",
                        ad: "Evimiz Dünya",
                        giris: "Dünya'nın farklı bölgelerini ve insanların yaşadığı çevreleri tanı.",
                        anlatim: `
                            <h3>🌍 Dünya</h3>
                            <p>
                                Dünya üzerinde farklı doğal ve beşerî çevreler bulunur.
                            </p>
                        `,
                        temelBilgi: [
                            "Doğal çevre insan etkisi olmadan oluşan unsurları içerir.",
                            "Beşerî çevre insanların oluşturduğu unsurları içerir."
                        ],
                        ornekler: [],
                        dikkat: "Doğal ve beşerî unsurları ayırt et.",
                        ozet: "Dünya farklı doğal ve beşerî çevrelerden oluşur.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi doğal çevre unsurudur?",
                                secenekler: [
                                    "Dağ",
                                    "Köprü",
                                    "Bina",
                                    "Yol"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",
                konular: [
                    {
                        id: "5-din-1",
                        ad: "Allah İnancı",
                        giris: "Allah inancının temel kavramlarını öğren.",
                        anlatim: `
                            <h3>☪️ İnanç</h3>
                            <p>
                                İslam inancında Allah'ın birliği ve eşsizliği temel
                                inanç esaslarındandır.
                            </p>
                        `,
                        temelBilgi: [
                            "Allah'ın birliği tevhid kavramıyla ifade edilir.",
                            "İnanç insanın düşünce ve davranışlarını etkileyebilir."
                        ],
                        ornekler: [],
                        dikkat: "Temel kavramların anlamlarını öğren.",
                        ozet: "Allah inancı İslam'ın temel inanç esasları arasında yer alır.",
                        test: [
                            {
                                soru: "Allah'ın birliği hangi kavramla ifade edilir?",
                                secenekler: [
                                    "Tevhid",
                                    "Sabır",
                                    "Adalet",
                                    "Şükür"
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
                        id: "5-eng-1",
                        ad: "Hello!",
                        giris: "İngilizce selamlaşma ve kendini tanıtma ifadelerini öğren.",
                        anlatim: `
                            <h3>👋 Greetings</h3>
                            <p>
                                Hello, Hi, Good morning ve Good afternoon gibi
                                ifadeler selamlaşmada kullanılır.
                            </p>

                            <div class="kitap-ornek">
                                Hello! My name is Eren.
                                <br>
                                Nice to meet you.
                            </div>
                        `,
                        temelBilgi: [
                            "Hello ve Hi selamlaşmak için kullanılabilir.",
                            "My name is ... kendini tanıtmak için kullanılır.",
                            "Nice to meet you tanışırken kullanılabilir."
                        ],
                        ornekler: [],
                        dikkat: "I am ile My name is ifadelerinin kullanımını karıştırma.",
                        ozet: "Temel selamlaşma ve tanışma ifadelerini doğru bağlamda kullan.",
                        test: [
                            {
                                soru: "Kendini tanıtırken hangisi kullanılabilir?",
                                secenekler: [
                                    "My name is Ali.",
                                    "Good night!",
                                    "See you yesterday.",
                                    "Thank you tomorrow."
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
                        id: "6-mat-1",
                        ad: "Sayılar ve İşlemler",
                        giris: "Sayılar ve temel işlemlerle ilgili becerilerini geliştir.",
                        anlatim: `<h3>🔢 Sayılar</h3><p>Doğal sayılar, tam sayılar ve işlemler matematiksel düşünmenin temelini oluşturur.</p>`,
                        temelBilgi: ["İşlem önceliğine dikkat edilir.", "Sayılar farklı gösterimlerle ifade edilebilir."],
                        ornekler: [],
                        dikkat: "İşlem sırasını takip et.",
                        ozet: "Sayılarla yapılan işlemlerde kurallara ve işlem sırasına dikkat edilir.",
                        test: [
                            {
                                soru: "2 + 3 × 4 işleminin sonucu kaçtır?",
                                secenekler: ["20", "14", "24", "10"],
                                cevap: 1
                            }
                        ]
                    },
                    {
                        id: "6-mat-2",
                        ad: "Çarpanlar ve Katlar",
                        giris: "Bir sayının çarpanlarını ve katlarını bulmayı öğren.",
                        anlatim: `<h3>✖️ Çarpanlar ve Katlar</h3><p>Bir sayıyı kalansız bölen sayılara o sayının çarpanları denir.</p>`,
                        temelBilgi: ["Çarpanlar sayıyı kalansız böler.", "Katlar bir sayının tam sayı ile çarpılmasıyla elde edilir."],
                        ornekler: [],
                        dikkat: "Çarpan ile kat kavramlarını karıştırma.",
                        ozet: "Çarpan sayıyı böler, kat ise sayının belirli bir sayı ile çarpılmasıyla oluşur.",
                        test: [
                            {
                                soru: "12 sayısının çarpanlarından biri hangisidir?",
                                secenekler: ["5", "7", "3", "11"],
                                cevap: 2
                            }
                        ]
                    },
                    {
                        id: "6-mat-3",
                        ad: "Oran",
                        giris: "İki çokluğun birbirine göre durumunu oranla ifade etmeyi öğren.",
                        anlatim: `<h3>⚖️ Oran</h3><p>İki çokluğun bölme yoluyla karşılaştırılmasına oran denir.</p>`,
                        temelBilgi: ["Oran iki çokluğu karşılaştırır."],
                        ornekler: [],
                        dikkat: "Karşılaştırılan çoklukların birimlerine dikkat et.",
                        ozet: "Oran, iki çokluk arasındaki karşılaştırmayı ifade eder.",
                        test: [
                            {
                                soru: "4 ve 8 sayılarının oranı sadeleştirilirse kaç olur?",
                                secenekler: ["1/2", "2", "4", "8"],
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
                        id: "6-fen-1",
                        ad: "Güneş Sistemi ve Tutulmalar",
                        giris: "Güneş sistemi ve tutulma olaylarını öğren.",
                        anlatim: `<h3>☀️ Güneş Sistemi</h3><p>Güneş sistemi Güneş ve onun çevresinde dolanan gök cisimlerinden oluşur.</p>`,
                        temelBilgi: ["Güneş bir yıldızdır.", "Gezegenler Güneş'in etrafında dolanır."],
                        ornekler: [],
                        dikkat: "Gezegen ve yıldız kavramlarını ayır.",
                        ozet: "Güneş sistemi farklı gök cisimlerinden oluşur.",
                        test: [
                            {
                                soru: "Güneş nedir?",
                                secenekler: ["Gezegen", "Yıldız", "Uydu", "Asteroit"],
                                cevap: 1
                            }
                        ]
                    },
                    {
                        id: "6-fen-2",
                        ad: "Vücudumuzdaki Sistemler",
                        giris: "İnsan vücudundaki temel sistemleri tanı.",
                        anlatim: `<h3>🫀 Vücut Sistemleri</h3><p>İnsan vücudunda farklı görevleri yerine getiren sistemler birlikte çalışır.</p>`,
                        temelBilgi: ["Sistemler birlikte çalışır.", "Her sistemin farklı görevleri vardır."],
                        ornekler: [],
                        dikkat: "Organ ile sistem kavramlarını karıştırma.",
                        ozet: "Vücudumuzdaki sistemler yaşamın devamı için birlikte çalışır.",
                        test: [
                            {
                                soru: "Kalp hangi sistemle doğrudan ilişkilidir?",
                                secenekler: ["Dolaşım", "Sindirim", "Solunum", "Destek"],
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
                        id: "6-tr-1",
                        ad: "Dilimizin Zenginliği",
                        giris: "Türkçenin söz varlığını ve anlatım gücünü keşfet.",
                        anlatim: `<h3>📚 Türkçenin Zenginliği</h3><p>Türkçe geniş bir söz varlığına ve farklı anlatım imkânlarına sahiptir.</p>`,
                        temelBilgi: ["Sözcüklerin bağlama göre anlamı değişebilir.", "Deyimler ve atasözleri kültürel birikimi yansıtır."],
                        ornekler: [],
                        dikkat: "Sözcüğün anlamını cümle içindeki kullanımına göre değerlendir.",
                        ozet: "Türkçenin zenginliği söz varlığı ve anlatım çeşitliliğiyle görülür.",
                        test: [
                            {
                                soru: "Sözcüğün cümlede kazandığı anlama neye bakarak karar verilir?",
                                secenekler: ["Bağlama", "Sadece harf sayısına", "Rengine", "Yazı tipine"],
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
                        id: "7-mat-1",
                        ad: "Rasyonel Sayılar",
                        giris: "Rasyonel sayıların gösterimini ve işlemlerini öğren.",
                        anlatim: `<h3>🔢 Rasyonel Sayılar</h3><p>a ve b tam sayı olmak üzere b sıfırdan farklıyken a/b biçimindeki sayılar rasyonel sayılardır.</p>`,
                        temelBilgi: ["Payda sıfır olamaz.", "Rasyonel sayılar kesir biçiminde gösterilebilir."],
                        ornekler: [],
                        dikkat: "Paydanın sıfır olamayacağını unutma.",
                        ozet: "Rasyonel sayılar iki tam sayının oranı biçiminde yazılabilir.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi rasyonel sayıdır?",
                                secenekler: ["1/2", "√2", "π", "√3"],
                                cevap: 0
                            }
                        ]
                    },
                    {
                        id: "7-mat-2",
                        ad: "Cebirsel İfadeler",
                        giris: "Bilinmeyenleri harflerle ifade etmeyi öğren.",
                        anlatim: `<h3>🔤 Cebirsel İfadeler</h3><p>Sayılar, değişkenler ve işlemler kullanılarak cebirsel ifadeler oluşturulur.</p>`,
                        temelBilgi: ["Değişkenler harflerle gösterilebilir.", "Benzer terimler birleştirilebilir."],
                        ornekler: [],
                        dikkat: "Katsayı ile değişkeni ayırt et.",
                        ozet: "Cebirsel ifadeler matematiksel ilişkileri kısa biçimde ifade eder.",
                        test: [
                            {
                                soru: "3x ifadesinde 3 nedir?",
                                secenekler: ["Değişken", "Katsayı", "Üs", "Payda"],
                                cevap: 1
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
                        id: "7-fen-1",
                        ad: "Uzay Araştırmaları",
                        giris: "Uzay araştırmalarında kullanılan araçları ve gelişmeleri öğren.",
                        anlatim: `<h3>🚀 Uzay Araştırmaları</h3><p>Uzayı araştırmak için teleskoplar, uydular, uzay araçları ve istasyonlar kullanılır.</p>`,
                        temelBilgi: ["Teleskop gök cisimlerini gözlemlemeye yardımcı olur.", "Uydular çeşitli amaçlarla kullanılabilir."],
                        ornekler: [],
                        dikkat: "Teleskop ile uyduyu aynı şey olarak düşünme.",
                        ozet: "Uzay araştırmaları gelişmiş teknolojik araçlardan yararlanır.",
                        test: [
                            {
                                soru: "Gök cisimlerini gözlemlemek için kullanılan araç hangisidir?",
                                secenekler: ["Teleskop", "Termometre", "Dinamometre", "Barometre"],
                                cevap: 0
                            }
                        ]
                    }
                ]
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
                        id: "8-mat-1",
                        ad: "Çarpanlar ve Katlar",
                        giris: "Çarpanlar, katlar ve asal sayılarla ilgili bilgilerini geliştir.",
                        anlatim: `<h3>🔢 Çarpanlar ve Katlar</h3><p>Bir sayının pozitif bölenleri ve katları sayıların özelliklerini incelememizi sağlar.</p>`,
                        temelBilgi: ["Asal sayının yalnızca iki pozitif böleni vardır.", "1 asal değildir."],
                        ornekler: [],
                        dikkat: "1 sayısının asal olmadığını unutma.",
                        ozet: "Asal sayılar yalnızca 1'e ve kendisine bölünür.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi asaldır?",
                                secenekler: ["9", "15", "17", "21"],
                                cevap: 2
                            }
                        ]
                    },
                    {
                        id: "8-mat-2",
                        ad: "Üslü İfadeler",
                        giris: "Üslü ifadelerin temel kurallarını öğren.",
                        anlatim: `<h3>⚡ Üslü İfadeler</h3><p>aⁿ ifadesinde a taban, n ise üstür. Üs, tabanın kaç kez çarpıldığını gösterir.</p>`,
                        temelBilgi: ["a² = a × a", "a¹ = a", "Sıfırdan farklı sayının sıfırıncı kuvveti 1'dir."],
                        ornekler: [],
                        dikkat: "Taban ve üssü karıştırma.",
                        ozet: "Üslü ifadeler tekrarlı çarpımları kısa biçimde gösterir.",
                        test: [
                            {
                                soru: "2³ kaçtır?",
                                secenekler: ["5", "6", "8", "9"],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "8-mat-3",
                        ad: "Kareköklü İfadeler",
                        giris: "Kareköklü ifadelerin anlamını ve temel işlemlerini öğren.",
                        anlatim: `<h3>√ Kareköklü İfadeler</h3><p>Bir sayının karekökü, karesi o sayıyı veren sayıdır.</p>`,
                        temelBilgi: ["√25 = 5", "Pozitif sayıların karekökü pozitif bir değerle ifade edilebilir."],
                        ornekler: [],
                        dikkat: "Karekök ile karesi arasındaki ilişkiyi unutma.",
                        ozet: "Karekök, karesi verilen sayıya eşit olan değeri bulmamızı sağlar.",
                        test: [
                            {
                                soru: "√49 kaçtır?",
                                secenekler: ["6", "7", "8", "9"],
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
                        id: "8-tr-1",
                        ad: "İletişim ve Sosyal İlişkiler",
                        giris: "İletişim süreçlerini ve sosyal ilişkilerde kullanılan dili incele.",
                        anlatim: `<h3>💬 İletişim</h3><p>İletişim, duygu ve düşüncelerin çeşitli yollarla aktarılmasıdır.</p>`,
                        temelBilgi: ["İletişimde kaynak, mesaj ve alıcı gibi unsurlar bulunur.", "Etkili iletişimde dinleme önemlidir."],
                        ornekler: [],
                        dikkat: "İletişimin yalnızca konuşmadan ibaret olmadığını unutma.",
                        ozet: "Sağlıklı iletişim için dinleme, açık ifade ve karşılıklı saygı önemlidir.",
                        test: [
                            {
                                soru: "Etkili iletişim için hangisi önemlidir?",
                                secenekler: ["Dinlemek", "Söz kesmek", "Bağırmak", "Dinlememek"],
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
                        id: "8-fen-1",
                        ad: "Mevsimler ve İklim",
                        giris: "Mevsimlerin oluşumunu ve iklim kavramını öğren.",
                        anlatim: `<h3>🌦️ Mevsimler</h3><p>Mevsimlerin oluşumunda Dünya'nın eksen eğikliği ve Güneş etrafındaki dolanımı etkilidir.</p>`,
                        temelBilgi: ["Dünya'nın eksen eğikliği mevsimlerin oluşumunda etkilidir.", "Hava durumu kısa süreli, iklim uzun süreli özellikleri ifade eder."],
                        ornekler: [],
                        dikkat: "Hava durumu ile iklimi karıştırma.",
                        ozet: "Mevsimlerin oluşumunda eksen eğikliği önemli rol oynar.",
                        test: [
                            {
                                soru: "Mevsimlerin oluşumunda aşağıdakilerden hangisi etkilidir?",
                                secenekler: ["Eksen eğikliği", "Ay'ın rengi", "Bulut şekli", "Denizlerin tuzluluğu"],
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
                        id: "8-ink-1",
                        ad: "Bir Kahraman Doğuyor",
                        giris: "Mustafa Kemal Atatürk'ün çocukluk ve eğitim yıllarını öğren.",
                        anlatim: `<h3>🇹🇷 Mustafa Kemal</h3><p>Mustafa Kemal'in eğitim hayatı ve yetiştiği çevre, fikirlerinin gelişmesinde etkili olmuştur.</p>`,
                        temelBilgi: ["Mustafa Kemal 1881'de Selanik'te doğmuştur.", "Eğitim hayatı farklı şehirlerde devam etmiştir."],
                        ornekler: [],
                        dikkat: "Tarihleri ve olayların sırasını karıştırma.",
                        ozet: "Mustafa Kemal'in çocukluk ve eğitim yılları onun fikir dünyasının oluşmasında önemlidir.",
                        test: [
                            {
                                soru: "Mustafa Kemal hangi şehirde doğmuştur?",
                                secenekler: ["Selanik", "İstanbul", "Ankara", "Bursa"],
                                cevap: 0
                            }
                        ]
                    }
                ]
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
                        id: "9-mat-1",
                        ad: "Sayılar",
                        giris: "Sayı kümelerini ve sayıların temel özelliklerini öğren.",
                        anlatim: `<h3>🔢 Sayılar</h3><p>Doğal, tam, rasyonel ve gerçek sayılar farklı sayı kümeleri oluşturur.</p>`,
                        temelBilgi: ["Sayı kümeleri arasında kapsama ilişkileri bulunur.", "Gerçek sayılar sayı doğrusunda gösterilebilir."],
                        ornekler: [],
                        dikkat: "Sayı kümelerinin özelliklerini ayır.",
                        ozet: "Sayılar farklı kümelerde sınıflandırılır.",
                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi rasyonel sayıdır?",
                                secenekler: ["√2", "1/3", "π", "√5"],
                                cevap: 1
                            }
                        ]
                    },
                    {
                        id: "9-mat-2",
                        ad: "Fonksiyonlar",
                        giris: "Fonksiyon kavramını ve temel gösterimlerini öğren.",
                        anlatim: `<h3>📈 Fonksiyon</h3><p>Bir kümenin her elemanını başka bir kümenin yalnızca bir elemanıyla eşleştiren bağıntıya fonksiyon denir.</p>`,
                        temelBilgi: ["Her tanım kümesi elemanının bir görüntüsü olmalıdır.", "Fonksiyonlar tablo, grafik ve cebirsel ifade ile gösterilebilir."],
                        ornekler: [],
                        dikkat: "Bir elemanın birden fazla görüntüsü olamayacağını unutma.",
                        ozet: "Fonksiyonlar iki küme arasındaki özel eşleme ilişkileridir.",
                        test: [
                            {
                                soru: "Fonksiyonda tanım kümesindeki her elemanın kaç görüntüsü olmalıdır?",
                                secenekler: ["En az iki", "Tam olarak bir", "Hiç", "Üç"],
                                cevap: 1
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
                        id: "9-fiz-1",
                        ad: "Fizik Bilimi ve Kariyer Keşfi",
                        giris: "Fizik biliminin çalışma alanlarını ve günlük yaşamla ilişkisini öğren.",
                        anlatim: `<h3>⚡ Fizik</h3><p>Fizik madde, enerji, hareket ve etkileşimleri inceleyen temel bilimlerden biridir.</p>`,
                        temelBilgi: ["Fizik birçok mühendislik ve teknoloji alanıyla ilişkilidir."],
                        ornekler: [],
                        dikkat: "Fiziği yalnızca formüllerden ibaret düşünme.",
                        ozet: "Fizik doğadaki olayları açıklamak için modeller ve ölçümler kullanır.",
                        test: [
                            {
                                soru: "Fizik hangi alanları inceler?",
                                secenekler: ["Madde ve enerji", "Sadece canlılar", "Sadece tarih", "Sadece dil"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "⚗️",
                konular: [
                    {
                        id: "9-kim-1",
                        ad: "Etkileşim",
                        giris: "Kimyanın temel kavramlarını ve maddeler arasındaki etkileşimleri öğren.",
                        anlatim: `<h3>⚗️ Kimya</h3><p>Kimya maddelerin yapısını, özelliklerini ve geçirdiği değişimleri inceler.</p>`,
                        temelBilgi: ["Madde farklı özelliklere sahip olabilir.", "Kimyasal değişimlerde yeni maddeler oluşabilir."],
                        ornekler: [],
                        dikkat: "Fiziksel ve kimyasal değişimleri ayır.",
                        ozet: "Kimya maddelerin yapısını, özelliklerini ve dönüşümlerini inceler.",
                        test: [
                            {
                                soru: "Kimya temel olarak neyi inceler?",
                                secenekler: ["Maddeleri", "Tarihleri", "Dilleri", "Haritaları"],
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
                        id: "9-biy-1",
                        ad: "Yaşam",
                        giris: "Canlıların ortak özelliklerini ve biyolojinin temel kavramlarını öğren.",
                        anlatim: `<h3>🧬 Yaşam</h3><p>Biyoloji canlıları ve canlıların çevreleriyle ilişkilerini inceler.</p>`,
                        temelBilgi: ["Canlılar hücresel yapı gösterebilir.", "Canlılar enerjiye ihtiyaç duyar."],
                        ornekler: [],
                        dikkat: "Canlıların ortak özelliklerini tek bir özellikle sınırlama.",
                        ozet: "Biyoloji yaşamı ve canlıları bilimsel yöntemlerle inceler.",
                        test: [
                            {
                                soru: "Biyoloji neyi inceler?",
                                secenekler: ["Canlıları", "Gezegenlerin yörüngelerini", "Sadece maddeleri", "Sadece tarihi"],
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
                        id: "9-tar-1",
                        ad: "Geçmişin İnşa Sürecinde Tarih",
                        giris: "Tarihin ne olduğunu ve tarih biliminin nasıl çalıştığını öğren.",
                        anlatim: `<h3>🏛️ Tarih Bilimi</h3><p>Tarih, geçmişte meydana gelen insan faaliyetlerini kaynaklara dayanarak inceler.</p>`,
                        temelBilgi: ["Tarih araştırmalarında kaynaklar kullanılır.", "Kaynaklar birinci el ve ikinci el olabilir."],
                        ornekler: [],
                        dikkat: "Tarihsel bilgi ile yorum arasındaki farkı gözet.",
                        ozet: "Tarih geçmişi kaynaklara dayanarak anlamaya çalışan bir bilim dalıdır.",
                        test: [
                            {
                                soru: "Tarih araştırmalarında ne kullanılır?",
                                secenekler: ["Kaynaklar", "Sadece tahminler", "Rastgele bilgiler", "Sadece grafikler"],
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
                        id: "9-cog-1",
                        ad: "Coğrafyanın Doğası",
                        giris: "Coğrafyanın konusu ve çalışma alanlarını öğren.",
                        anlatim: `<h3>🌍 Coğrafya</h3><p>Coğrafya doğal ve beşerî olayları mekânla ilişkili olarak inceler.</p>`,
                        temelBilgi: ["Coğrafya doğal ve beşerî unsurları birlikte inceler.", "Mekân coğrafi düşünmenin temel unsurlarındandır."],
                        ornekler: [],
                        dikkat: "Coğrafyayı yalnızca harita bilgisi olarak düşünme.",
                        ozet: "Coğrafya insan, doğa ve mekân arasındaki ilişkileri inceler.",
                        test: [
                            {
                                soru: "Coğrafyanın temel inceleme alanlarından biri hangisidir?",
                                secenekler: ["İnsan ve çevre ilişkisi", "Sadece matematik", "Sadece edebiyat", "Sadece müzik"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            "turk-dili-edebiyati": {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [
                    {
                        id: "9-tde-1",
                        ad: "Sözün Ezgisi",
                        giris: "Dil, söz ve edebî anlatım arasındaki ilişkiyi incele.",
                        anlatim: `<h3>📚 Edebiyat</h3><p>Edebiyat, dil aracılığıyla duygu, düşünce ve hayallerin estetik biçimde ifade edilmesidir.</p>`,
                        temelBilgi: ["Dil edebiyatın temel araçlarından biridir.", "Edebî metinlerde estetik anlatım önemlidir."],
                        ornekler: [],
                        dikkat: "Bilgilendirici ve edebî metinlerin amaçlarını ayır.",
                        ozet: "Edebiyat dili estetik ve anlamlı bir anlatım aracı olarak kullanır.",
                        test: [
                            {
                                soru: "Edebiyatın temel aracı nedir?",
                                secenekler: ["Dil", "Sadece sayı", "Harita", "Formül"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            }
        }
    },

    /* =====================================================
       10. SINIF
       ===================================================== */

    "10": {
        ad: "10. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",
                konular: [
                    {
                        id: "10-mat-1",
                        ad: "Fonksiyonlar",
                        giris: "Fonksiyonların özelliklerini ve grafiklerini incele.",
                        anlatim: `<h3>📈 Fonksiyonlar</h3><p>Fonksiyonlar değişkenler arasındaki ilişkileri ifade etmek için kullanılır.</p>`,
                        temelBilgi: ["Fonksiyonlar grafiklerle gösterilebilir.", "Tanım ve görüntü kümeleri önemlidir."],
                        ornekler: [],
                        dikkat: "Tanım kümesi ile görüntü kümesini karıştırma.",
                        ozet: "Fonksiyonlar matematiksel ilişkileri modellemeye yarar.",
                        test: [
                            {
                                soru: "Fonksiyonlar neyi ifade etmek için kullanılabilir?",
                                secenekler: ["Değişkenler arasındaki ilişkileri", "Sadece tarihleri", "Sadece kelimeleri", "Sadece haritaları"],
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
                        id: "10-fiz-1",
                        ad: "Kuvvet ve Hareket",
                        giris: "Kuvvetin hareket üzerindeki etkilerini incele.",
                        anlatim: `<h3>⚡ Kuvvet ve Hareket</h3><p>Kuvvet bir cismin hareket durumunu değiştirebilir.</p>`,
                        temelBilgi: ["Kuvvet vektörel bir büyüklüktür.", "Hareket konumun zamanla değişimidir."],
                        ornekler: [],
                        dikkat: "Sürat ve hız kavramlarını ayır.",
                        ozet: "Kuvvet ve hareket arasındaki ilişki fiziksel olayların temelini oluşturur.",
                        test: [
                            {
                                soru: "Kuvvet hangi tür büyüklüktür?",
                                secenekler: ["Vektörel", "Skaler", "Boyutsuz", "Sabit"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "⚗️",
                konular: [
                    {
                        id: "10-kim-1",
                        ad: "Karışımlar",
                        giris: "Homojen ve heterojen karışımları öğren.",
                        anlatim: `<h3>⚗️ Karışımlar</h3><p>İki veya daha fazla maddenin kimyasal özelliklerini kaybetmeden bir araya gelmesiyle karışımlar oluşur.</p>`,
                        temelBilgi: ["Homojen karışımlar her yerinde aynı özelliktedir.", "Heterojen karışımlar her yerinde aynı özellikte değildir."],
                        ornekler: [],
                        dikkat: "Çözeltiler homojen karışımlardır.",
                        ozet: "Karışımlar homojen veya heterojen olabilir.",
                        test: [
                            {
                                soru: "Tuzlu su hangi tür karışımdır?",
                                secenekler: ["Homojen", "Heterojen", "Saf madde", "Element"],
                                cevap: 0
                            }
                        ]
                    }
                ]
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
                        id: "11-mat-1",
                        ad: "Trigonometri",
                        giris: "Trigonometrik oranların temel özelliklerini öğren.",
                        anlatim: `<h3>📐 Trigonometri</h3><p>Trigonometri üçgenlerde açı ve kenarlar arasındaki ilişkileri inceleyen matematik alanıdır.</p>`,
                        temelBilgi: ["Sinüs, kosinüs ve tanjant temel trigonometrik oranlardır.", "Açı ölçüleri derece veya radyanla ifade edilebilir."],
                        ornekler: [],
                        dikkat: "Oranların hangi kenarlara göre tanımlandığını kontrol et.",
                        ozet: "Trigonometri açı ve kenar ilişkilerini inceler.",
                        test: [
                            {
                                soru: "Temel trigonometrik oranlardan biri hangisidir?",
                                secenekler: ["Sinüs", "Alan", "Çevre", "Çarpan"],
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
                        id: "11-fiz-1",
                        ad: "Elektrik ve Manyetizma",
                        giris: "Elektrik akımı, elektrik alanı ve manyetik olayların temelini öğren.",
                        anlatim: `<h3>⚡ Elektrik</h3><p>Elektrik yükleri ve elektrik akımı birçok teknolojik sistemin temelini oluşturur.</p>`,
                        temelBilgi: ["Elektrik akımı yüklerin düzenli hareketidir.", "Elektrik devrelerinde potansiyel fark önemli bir büyüklüktür."],
                        ornekler: [],
                        dikkat: "Akım ve gerilim kavramlarını birbirine karıştırma.",
                        ozet: "Elektrik ve manyetizma yüklerin ve alanların davranışlarını inceler.",
                        test: [
                            {
                                soru: "Elektrik akımı neyi ifade eder?",
                                secenekler: ["Yüklerin düzenli hareketini", "Sıcaklığı", "Kütleyi", "Basıncı"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "⚗️",
                konular: [
                    {
                        id: "11-kim-1",
                        ad: "Modern Atom Teorisi",
                        giris: "Atomun modern modelini ve elektronların davranışını öğren.",
                        anlatim: `<h3>⚛️ Atom</h3><p>Modern atom modeli elektronların belirli olasılık bölgelerinde bulunabileceğini ifade eder.</p>`,
                        temelBilgi: ["Elektronlar çekirdek çevresinde bulunur.", "Atom çekirdek ve elektronlardan oluşur."],
                        ornekler: [],
                        dikkat: "Elektronların çekirdek içinde bulunmadığını unutma.",
                        ozet: "Modern atom teorisi atomun yapısını ve elektronların davranışını açıklar.",
                        test: [
                            {
                                soru: "Atomun merkezinde hangi bölüm bulunur?",
                                secenekler: ["Çekirdek", "Elektron bulutu dışında bir boşluk", "Sadece elektron", "Molekül"],
                                cevap: 0
                            }
                        ]
                    }
                ]
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
                        id: "12-mat-1",
                        ad: "Türev",
                        giris: "Türev kavramını ve değişim oranıyla ilişkisini öğren.",
                        anlatim: `<h3>📈 Türev</h3><p>Türev, bir fonksiyonun belirli bir noktadaki anlık değişim oranını incelememizi sağlar.</p>`,
                        temelBilgi: ["Türev değişim oranıyla ilişkilidir.", "Türevin geometrik yorumu teğetin eğimiyle ilişkilidir."],
                        ornekler: [],
                        dikkat: "Türev ile fonksiyonun kendisini birbirine karıştırma.",
                        ozet: "Türev bir fonksiyonun değişimini inceleyen temel matematik kavramıdır.",
                        test: [
                            {
                                soru: "Türev temel olarak neyi inceler?",
                                secenekler: ["Değişim oranını", "Sadece toplamı", "Sadece alanı", "Sadece saymayı"],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "12-mat-2",
                        ad: "İntegral",
                        giris: "İntegral kavramının alan ve birikimle ilişkisini öğren.",
                        anlatim: `<h3>∫ İntegral</h3><p>Belirli integral, uygun koşullarda bir fonksiyonun grafiği altında kalan alanın hesaplanmasında kullanılabilir.</p>`,
                        temelBilgi: ["Belirli integral alan hesaplamalarında kullanılabilir.", "Türev ve integral arasında güçlü bir ilişki vardır."],
                        ornekler: [],
                        dikkat: "Belirli ve belirsiz integrali ayırt et.",
                        ozet: "İntegral birikim ve alan hesaplamalarında kullanılan önemli bir matematik aracıdır.",
                        test: [
                            {
                                soru: "Belirli integral hangi amaçla kullanılabilir?",
                                secenekler: ["Alan hesaplama", "Sadece sayı yazma", "Sadece ölçme", "Sadece sınıflandırma"],
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
                        id: "12-fiz-1",
                        ad: "Modern Fizik",
                        giris: "Modern fiziğin temel kavramlarını ve klasik fizikten ayrılan yönlerini öğren.",
                        anlatim: `<h3>⚛️ Modern Fizik</h3><p>Modern fizik atom altı parçacıklar, kuantum olayları ve görelilik gibi konuları kapsar.</p>`,
                        temelBilgi: ["Modern fizik mikroskobik ve yüksek hızlı sistemleri açıklamada önemlidir."],
                        ornekler: [],
                        dikkat: "Klasik ve modern fizik yaklaşımlarının kapsamlarını ayır.",
                        ozet: "Modern fizik doğanın atomik ve kozmik ölçekteki davranışlarını açıklamaya çalışır.",
                        test: [
                            {
                                soru: "Modern fizik hangi alanlarla ilişkilidir?",
                                secenekler: ["Kuantum ve görelilik", "Sadece aritmetik", "Sadece tarih", "Sadece biyoloji"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },

            kimya: {
                ad: "Kimya",
                icon: "⚗️",
                konular: [
                    {
                        id: "12-kim-1",
                        ad: "Organik Kimya",
                        giris: "Karbon temelli bileşikleri ve temel organik kimya kavramlarını öğren.",
                        anlatim: `<h3>🧪 Organik Kimya</h3><p>Organik kimya başta karbon içeren bileşiklerin yapılarını, özelliklerini ve tepkimelerini inceler.</p>`,
                        temelBilgi: ["Karbon organik bileşiklerin temel elementidir.", "Hidrokarbonlar yalnızca karbon ve hidrojen içerir."],
                        ornekler: [],
                        dikkat: "Her karbon içeren bileşiğin aynı sınıfta olmadığını unutma.",
                        ozet: "Organik kimya karbon temelli bileşiklerin incelenmesine odaklanır.",
                        test: [
                            {
                                soru: "Organik kimyanın temel elementi hangisidir?",
                                secenekler: ["Karbon", "Demir", "Sodyum", "Helyum"],
                                cevap: 0
                            }
                        ]
                    }
                ]
            }
        }
    }
};

/* =========================================================
   KİTAPLIK DATA KONTROLÜ
   ========================================================= */

console.log(
    "DersTakip Kitaplık: Veri yüklendi.",
    Object.keys(window.kitaplikData).length + " sınıf"
);
