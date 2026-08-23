/* =========================================================
   DERS TAKİP — KİTAPLIK DATA
   5-12. SINIF
   kitaplik.js ile uyumlu veri yapısı

   YAPI:
   sınıf
      └── dersler
           └── ders
                └── konular
                     ├── id
                     ├── ad
                     ├── giris
                     ├── anlatim
                     ├── temelBilgi
                     ├── ornekler
                     ├── dikkat
                     ├── ozet
                     └── test
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
                        id: "5-turkce-sozcukte-anlam",
                        ad: "Sözcükte Anlam",

                        giris: `
                        Sözcükler, cümle içerisinde farklı anlamlar
                        kazanabilir. Bir kelimenin anlamını doğru
                        belirleyebilmek için kelimenin kullanıldığı
                        cümleye dikkat etmek gerekir.
                        `,

                        anlatim: `
                        <h3>Sözcükte Anlam</h3>

                        <p>
                        Sözcüklerin taşıdığı anlamları inceleyen konuya
                        sözcükte anlam denir. Bir sözcük tek başına
                        düşünüldüğünde bir anlam taşıyabilir; ancak
                        cümlede kullanıldığında farklı bir anlam
                        kazanabilir.
                        </p>

                        <h3>Gerçek Anlam</h3>

                        <p>
                        Bir sözcüğün akla gelen ilk anlamına gerçek anlam
                        denir.
                        </p>

                        <div class="kitap-ornek">
                        Örnek:
                        "Elimde ağır bir çanta vardı."

                        Buradaki "ağır" sözcüğü gerçek anlamdadır.
                        </div>

                        <h3>Mecaz Anlam</h3>

                        <p>
                        Sözcüğün gerçek anlamından uzaklaşarak kazandığı
                        yeni anlama mecaz anlam denir.
                        </p>

                        <div class="kitap-ornek">
                        Örnek:
                        "Arkadaşının sözleri beni çok kırdı."

                        Buradaki "kırmak" fiziksel bir kırma anlamında
                        değildir. Mecaz anlamda kullanılmıştır.
                        </div>

                        <h3>Eş Anlam</h3>

                        <p>
                        Yazılışları farklı fakat anlamları aynı veya
                        çok yakın olan sözcüklere eş anlamlı sözcükler
                        denir.
                        </p>

                        <p>
                        Örnek:
                        cevap - yanıt
                        </p>

                        <h3>Zıt Anlam</h3>

                        <p>
                        Anlam bakımından birbirinin karşıtı olan
                        sözcüklere zıt anlamlı sözcükler denir.
                        </p>

                        <p>
                        Örnek:
                        büyük - küçük
                        </p>
                        `,

                        temelBilgi: [
                            "Gerçek anlam sözcüğün temel anlamıdır.",
                            "Mecaz anlamda sözcük gerçek anlamından uzaklaşır.",
                            "Eş anlamlı sözcüklerin anlamları aynıdır veya çok yakındır.",
                            "Zıt anlamlı sözcükler karşıt anlam taşır.",
                            "Sözcüğün anlamı cümledeki kullanımına göre belirlenir."
                        ],

                        ornekler: [
                            {
                                soru: "“Sıcak çorbayı dikkatlice içti.” cümlesinde sıcak sözcüğü hangi anlamdadır?",
                                cozum: "Çorbanın sıcaklığı anlatıldığı için sözcük gerçek anlamda kullanılmıştır."
                            },
                            {
                                soru: "“Öğretmenin sıcak davranışı öğrencileri mutlu etti.” cümlesinde sıcak sözcüğü hangi anlamdadır?",
                                cozum: "Burada fiziksel sıcaklıktan söz edilmemektedir. Samimi ve içten davranış anlatıldığı için mecaz anlam vardır."
                            }
                        ],

                        dikkat: `
                        Bir sözcüğün anlamını belirlerken yalnızca
                        kelimeye bakma. Sözcüğün bulunduğu cümleyi
                        mutlaka değerlendir.
                        `,

                        ozet: `
                        Sözcükler cümle içinde farklı anlamlar
                        kazanabilir. Gerçek anlam temel anlam,
                        mecaz anlam ise gerçek anlamdan uzaklaşmış
                        anlamdır.
                        `,

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi gerçek anlamlıdır?",
                                secenekler: [
                                    "Tatlı sözleriyle herkesi etkiledi.",
                                    "Tatlı elmayı yedi.",
                                    "Tatlı bir insandı.",
                                    "Tatlı konuşması dikkat çekti."
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Bu sözler kalbimi kırdı.” cümlesinde kırmak hangi anlamdadır?",
                                secenekler: [
                                    "Gerçek",
                                    "Mecaz",
                                    "Zıt",
                                    "Terim"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Cevap” sözcüğünün eş anlamlısı hangisidir?",
                                secenekler: [
                                    "Soru",
                                    "Yanıt",
                                    "Problem",
                                    "Çözüm"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Uzun” sözcüğünün zıt anlamlısı hangisidir?",
                                secenekler: [
                                    "Kısa",
                                    "Büyük",
                                    "Geniş",
                                    "Kalın"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi mecaz anlamlıdır?",
                                secenekler: [
                                    "Kapıyı açtı.",
                                    "Bardağı kırdı.",
                                    "Sözleriyle beni yaraladı.",
                                    "Kitabı masaya koydu."
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-turkce-cumlede-anlam",
                        ad: "Cümlede Anlam",

                        giris: `
                        Cümleler farklı anlam ilişkileri taşıyabilir.
                        Bir cümlede neden, amaç, koşul veya karşılaştırma
                        gibi anlamlar bulunabilir.
                        `,

                        anlatim: `
                        <h3>Cümlede Anlam</h3>

                        <p>
                        Bir cümlenin anlamını belirlemek için cümlenin
                        tamamını değerlendirmek gerekir.
                        </p>

                        <h3>Neden-Sonuç</h3>

                        <p>
                        Bir olayın hangi sebeple gerçekleştiğini bildiren
                        cümlelere neden-sonuç cümlesi denir.
                        </p>

                        <div class="kitap-ornek">
                        "Yağmur yağdığı için dışarı çıkmadık."

                        Neden: Yağmur yağması.
                        Sonuç: Dışarı çıkmamak.
                        </div>

                        <h3>Amaç-Sonuç</h3>

                        <p>
                        Bir işin hangi amaçla yapıldığını bildiren
                        cümlelere amaç-sonuç cümlesi denir.
                        </p>

                        <div class="kitap-ornek">
                        "Başarılı olmak için düzenli çalışıyor."

                        Amaç: Başarılı olmak.
                        </div>

                        <h3>Koşul-Sonuç</h3>

                        <p>
                        Bir durumun gerçekleşmesini başka bir duruma
                        bağlayan cümlelere koşul-sonuç cümlesi denir.
                        </p>

                        <div class="kitap-ornek">
                        "Çalışırsan sınavı kazanırsın."
                        </div>

                        <h3>Karşılaştırma</h3>

                        <p>
                        İki varlık veya durumun benzer ya da farklı
                        yönlerini ortaya koyan cümlelere karşılaştırma
                        cümlesi denir.
                        </p>

                        <div class="kitap-ornek">
                        "Ali, Mehmet'ten daha hızlı koşuyor."
                        </div>
                        `,

                        temelBilgi: [
                            "Neden-sonuç cümlesinde sebep ve sonuç vardır.",
                            "Amaç-sonuç cümlesinde yapılmak istenen bir amaç vardır.",
                            "Koşul-sonuç cümlesinde şart bulunur.",
                            "Karşılaştırma cümlelerinde en az iki unsur bulunur."
                        ],

                        ornekler: [
                            {
                                soru: "“Otobüs geciktiği için okula geç kaldım.” hangi anlam ilişkisini içerir?",
                                cozum: "Okula geç kalmanın nedeni otobüsün gecikmesidir. Bu nedenle neden-sonuç ilişkisidir."
                            },
                            {
                                soru: "“Sınavı kazanmak için çok çalışıyor.” hangi anlam ilişkisini içerir?",
                                cozum: "Çalışmanın amacı sınavı kazanmaktır. Bu nedenle amaç-sonuç ilişkisidir."
                            }
                        ],

                        dikkat: `
                        Neden-sonuç ile amaç-sonuç birbirine
                        karıştırılmamalıdır. Neden gerçekleşmiş
                        bir sebebi, amaç ise ulaşılmak istenen
                        sonucu ifade eder.
                        `,

                        ozet: `
                        Cümleler neden-sonuç, amaç-sonuç,
                        koşul-sonuç ve karşılaştırma gibi
                        farklı anlam ilişkileri taşıyabilir.
                        `,

                        test: [
                            {
                                soru: "“Hastalandığı için okula gitmedi.” cümlesi hangisidir?",
                                secenekler: [
                                    "Amaç-sonuç",
                                    "Neden-sonuç",
                                    "Koşul-sonuç",
                                    "Karşılaştırma"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Başarılı olmak için kitap okuyor.” cümlesi hangisidir?",
                                secenekler: [
                                    "Amaç-sonuç",
                                    "Neden-sonuç",
                                    "Koşul-sonuç",
                                    "Karşılaştırma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Ders çalışırsan başarılı olursun.” cümlesi hangisidir?",
                                secenekler: [
                                    "Neden-sonuç",
                                    "Amaç-sonuç",
                                    "Koşul-sonuç",
                                    "Karşılaştırma"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "“Ayşe, kardeşinden daha uzun.” cümlesinde hangi anlam vardır?",
                                secenekler: [
                                    "Karşılaştırma",
                                    "Neden",
                                    "Amaç",
                                    "Koşul"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Neden-sonuç cümlesinde aşağıdakilerden hangisi bulunur?",
                                secenekler: [
                                    "Sadece amaç",
                                    "Sebep ve sonuç",
                                    "Sadece şart",
                                    "Sadece karşılaştırma"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-turkce-paragraf",
                        ad: "Paragrafta Anlam",

                        giris: `
                        Paragraf, bir düşünceyi veya olayı anlatan
                        cümleler topluluğudur. Paragraf sorularında
                        ana düşünceyi, konuyu ve yardımcı düşünceleri
                        bulmak önemlidir.
                        `,

                        anlatim: `
                        <h3>Paragrafın Konusu</h3>

                        <p>
                        Paragrafta üzerinde durulan temel kavrama
                        paragrafın konusu denir.
                        </p>

                        <h3>Ana Düşünce</h3>

                        <p>
                        Yazarın okuyucuya vermek istediği temel mesaja
                        ana düşünce denir.
                        </p>

                        <h3>Yardımcı Düşünce</h3>

                        <p>
                        Ana düşünceyi açıklayan veya destekleyen
                        düşüncelere yardımcı düşünce denir.
                        </p>

                        <h3>Başlık</h3>

                        <p>
                        Paragrafın tamamını kapsayan ve içeriğini
                        en iyi yansıtan ifadeye başlık denir.
                        </p>

                        <h3>Paragraf Sorularını Çözme</h3>

                        <ol>
                            <li>Paragrafı dikkatlice oku.</li>
                            <li>Paragrafın neden söz ettiğini belirle.</li>
                            <li>Yazarın asıl vermek istediği mesajı bul.</li>
                            <li>Seçenekleri paragraftaki bilgilerle karşılaştır.</li>
                        </ol>
                        `,

                        temelBilgi: [
                            "Konu, paragrafın üzerinde durduğu kavramdır.",
                            "Ana düşünce, yazarın temel mesajıdır.",
                            "Yardımcı düşünceler ana düşünceyi destekler.",
                            "Başlık paragrafın içeriğini kapsamalıdır.",
                            "Paragraf sorularında metin dışı bilgi kullanılmamalıdır."
                        ],

                        ornekler: [
                            {
                                soru: "Bir paragrafta kitap okumanın faydalarından söz ediliyorsa konu nedir?",
                                cozum: "Paragrafın üzerinde durduğu temel konu kitap okumanın faydalarıdır."
                            }
                        ],

                        dikkat: `
                        Ana düşünce ile konuyu karıştırma.
                        Konu genellikle birkaç kelimeyle ifade edilirken
                        ana düşünce tam bir cümle şeklinde ifade edilebilir.
                        `,

                        ozet: `
                        Paragrafın konusu ne anlatıldığını,
                        ana düşüncesi ise bu anlatımdan çıkarılmak
                        istenen temel mesajı gösterir.
                        `,

                        test: [
                            {
                                soru: "Paragrafta üzerinde durulan temel kavrama ne denir?",
                                secenekler: [
                                    "Ana düşünce",
                                    "Konu",
                                    "Başlık",
                                    "Sonuç"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Yazarın okuyucuya vermek istediği temel mesaja ne denir?",
                                secenekler: [
                                    "Konu",
                                    "Başlık",
                                    "Ana düşünce",
                                    "Örnek"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Ana düşünceyi destekleyen düşüncelere ne denir?",
                                secenekler: [
                                    "Yardımcı düşünce",
                                    "Başlık",
                                    "Konu",
                                    "Sonuç"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Paragrafın tamamını en iyi yansıtan ifadeye ne denir?",
                                secenekler: [
                                    "Anahtar kelime",
                                    "Başlık",
                                    "Yardımcı düşünce",
                                    "Neden"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Paragraf sorularında hangi bilgi esas alınmalıdır?",
                                secenekler: [
                                    "Kişisel tahmin",
                                    "Metindeki bilgi",
                                    "Arkadaşların düşüncesi",
                                    "İnternetteki bilgiler"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            /* =================================================
               MATEMATİK
               ================================================= */

            matematik: {
                ad: "Matematik",
                icon: "➗",

                konular: [

                    {
                        id: "5-matematik-dogal-sayilar",
                        ad: "Doğal Sayılar",

                        giris: `
                        Doğal sayılar günlük hayatta sayma ve sıralama
                        işlemlerinde kullandığımız temel sayı kümesidir.
                        `,

                        anlatim: `
                        <h3>Doğal Sayılar</h3>

                        <p>
                        0, 1, 2, 3, 4, 5, ... şeklinde devam eden sayılara
                        doğal sayılar denir.
                        </p>

                        <h3>Basamak Değeri</h3>

                        <p>
                        Bir rakamın bulunduğu basamağa göre aldığı değere
                        basamak değeri denir.
                        </p>

                        <div class="kitap-ornek">
                        4 582 sayısında:

                        4 → binler basamağı
                        5 → yüzler basamağı
                        8 → onlar basamağı
                        2 → birler basamağı

                        5'in basamak değeri 500'dür.
                        </div>

                        <h3>Sayıların Okunuşu</h3>

                        <p>
                        Büyük sayıları okurken sayı bölüklerine ayrılır.
                        Üçerli gruplara bölük denir.
                        </p>

                        <h3>Sayıları Karşılaştırma</h3>

                        <p>
                        İki doğal sayıyı karşılaştırırken önce basamak
                        sayılarına bakılır. Basamak sayıları eşitse
                        soldan başlanarak rakamlar karşılaştırılır.
                        </p>
                        `,

                        temelBilgi: [
                            "Doğal sayılar 0'dan başlar.",
                            "Rakamlar 0 ile 9 arasındaki sembollerdir.",
                            "Basamak değeri rakamın bulunduğu basamağa göre belirlenir.",
                            "Sayı karşılaştırırken önce basamak sayısına bakılır.",
                            "Basamak sayıları eşitse soldan sağa karşılaştırma yapılır."
                        ],

                        ornekler: [
                            {
                                soru: "4 735 sayısında 7'nin basamak değeri kaçtır?",
                                cozum: "7 yüzler basamağındadır. Bu nedenle basamak değeri 700'dür."
                            },
                            {
                                soru: "5 426 ve 5 362 sayılarını karşılaştırınız.",
                                cozum: "Binler basamakları aynı ve 5'tir. Yüzler basamağında 4 > 3 olduğundan 5 426 > 5 362 olur."
                            }
                        ],

                        dikkat: `
                        Rakamın kendisi ile basamak değerini karıştırma.
                        Örneğin 7 rakamının değeri 7'dir ancak yüzler
                        basamağındaki 7'nin basamak değeri 700'dür.
                        `,

                        ozet: `
                        Doğal sayılar 0'dan başlayarak sonsuza kadar devam
                        eder. Sayıları karşılaştırırken basamak sayısı ve
                        rakamların bulunduğu basamaklar dikkate alınır.
                        `,

                        test: [
                            {
                                soru: "8 426 sayısında 4'ün basamak değeri kaçtır?",
                                secenekler: [
                                    "4",
                                    "40",
                                    "400",
                                    "4000"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Aşağıdakilerden hangisi doğal sayıdır?",
                                secenekler: [
                                    "-3",
                                    "0",
                                    "2,5",
                                    "1/2"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "5 234 ile 5 324 karşılaştırıldığında hangisi doğrudur?",
                                secenekler: [
                                    "5 234 > 5 324",
                                    "5 234 < 5 324",
                                    "Eşittir",
                                    "Karşılaştırılamaz"
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
                            },
                            {
                                soru: "Birler basamağındaki rakam hangisidir?",
                                secenekler: [
                                    "En soldaki rakam",
                                    "En sağdaki rakam",
                                    "Ortadaki rakam",
                                    "İlk sıfır"
                                ],
                                cevap: 1
                            }
                        ]
                    },

                    {
                        id: "5-matematik-dort-islem",
                        ad: "Doğal Sayılarla Dört İşlem",

                        giris: `
                        Toplama, çıkarma, çarpma ve bölme işlemleri
                        matematiğin temel işlemleridir.
                        `,

                        anlatim: `
                        <h3>Toplama</h3>

                        <p>
                        İki veya daha fazla sayının bir araya getirilmesine
                        toplama denir.
                        </p>

                        <div class="kitap-ornek">
                        245 + 138 = 383
                        </div>

                        <h3>Çıkarma</h3>

                        <p>
                        Bir sayıdan başka bir sayının çıkarılması işlemine
                        çıkarma denir.
                        </p>

                        <div class="kitap-ornek">
                        500 - 275 = 225
                        </div>

                        <h3>Çarpma</h3>

                        <p>
                        Aynı sayının tekrarlı toplamını kısa yoldan
                        göstermeye çarpma denir.
                        </p>

                        <div class="kitap-ornek">
                        6 × 4 = 24
                        </div>

                        <h3>Bölme</h3>

                        <p>
                        Bir sayının eş parçalara ayrılmasına bölme denir.
                        </p>

                        <div class="kitap-ornek">
                        24 ÷ 6 = 4
                        </div>

                        <h3>İşlem Önceliği</h3>

                        <p>
                        Birden fazla işlem bulunan ifadelerde işlem
                        önceliğine dikkat edilir.
                        Parantez içindeki işlemler önce yapılır.
                        Daha sonra çarpma ve bölme, ardından toplama
                        ve çıkarma yapılır.
                        </p>
                        `,

                        temelBilgi: [
                            "Toplama işlemi sayıların birleştirilmesini sağlar.",
                            "Çıkarma işleminde eksilen, çıkan ve fark bulunur.",
                            "Çarpma tekrarlı toplamanın kısa yoludur.",
                            "Bölmede bölünen, bölen, bölüm ve kalan kavramları vardır.",
                            "Parantez içindeki işlemler önce yapılır."
                        ],

                        ornekler: [
                            {
                                soru: "125 + 275 işleminin sonucu kaçtır?",
                                cozum: "125 + 275 = 400."
                            },
                            {
                                soru: "8 × 7 işleminin sonucu kaçtır?",
                                cozum: "8 sayısını 7 kez toplamak 56 eder. Bu nedenle 8 × 7 = 56."
                            },
                            {
                                soru: "36 ÷ 6 işleminin sonucu kaçtır?",
                                cozum: "36'nın içinde 6 tane 6 bulunduğu için sonuç 6'dır."
                            }
                        ],

                        dikkat: `
                        İşlem önceliğinde toplama ve çıkarma işlemlerinden
                        önce çarpma ve bölme yapılır.
                        `,

                        ozet: `
                        Dört temel işlem toplama, çıkarma, çarpma ve bölmedir.
                        Birden fazla işlem içeren ifadelerde işlem önceliğine
                        dikkat edilmelidir.
                        `,

                        test: [
                            {
                                soru: "245 + 155 işleminin sonucu kaçtır?",
                                secenekler: [
                                    "300",
                                    "350",
                                    "400",
                                    "450"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "500 - 125 kaçtır?",
                                secenekler: [
                                    "325",
                                    "375",
                                    "425",
                                    "475"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "7 × 8 kaçtır?",
                                secenekler: [
                                    "48",
                                    "54",
                                    "56",
                                    "64"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "48 ÷ 6 kaçtır?",
                                secenekler: [
                                    "6",
                                    "7",
                                    "8",
                                    "9"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "İşlem önceliğinde hangisi önce yapılır?",
                                secenekler: [
                                    "Toplama",
                                    "Çıkarma",
                                    "Parantez",
                                    "Hiçbiri"
                                ],
                                cevap: 2
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
                icon: "🔬",

                konular: [

                    {
                        id: "5-fen-dunya-gunes-ay",
                        ad: "Dünya, Güneş ve Ay",

                        giris: `
                        Dünya, Güneş ve Ay uzayda bulunan ve birbirleriyle
                        farklı özelliklere sahip gök cisimleridir.
                        `,

                        anlatim: `
                        <h3>Güneş</h3>

                        <p>
                        Güneş, kendi ışığını ve ısısını üreten bir yıldızdır.
                        Dünya'daki yaşam için temel enerji kaynaklarından
                        biridir.
                        </p>

                        <h3>Dünya</h3>

                        <p>
                        Dünya üzerinde canlıların yaşadığı gezegendir.
                        Kendi ekseni etrafında dönmesi gece ve gündüzün
                        oluşmasına neden olur.
                        </p>

                        <h3>Ay</h3>

                        <p>
                        Ay, Dünya'nın doğal uydusudur. Kendi ışığını üretmez.
                        Güneş'ten aldığı ışığı yansıtır.
                        </p>

                        <h3>Ay'ın Evreleri</h3>

                        <p>
                        Ay'ın Dünya'dan görünen aydınlık kısmının zamanla
                        değişmesine Ay'ın evreleri denir.
                        </p>

                        <p>
                        Temel evreler:
                        Yeni ay, ilk dördün, dolunay ve son dördündür.
                        </p>
                        `,

                        temelBilgi: [
                            "Güneş bir yıldızdır.",
                            "Dünya bir gezegendir.",
                            "Ay, Dünya'nın doğal uydusudur.",
                            "Ay kendi ışığını üretmez.",
                            "Gece ve gündüz Dünya'nın kendi ekseni etrafında dönmesiyle oluşur.",
                            "Ay'ın farklı görünümlerine Ay'ın evreleri denir."
                        ],

                        ornekler: [
                            {
                                soru: "Dünya'nın doğal uydusu nedir?",
                                cozum: "Dünya'nın doğal uydusu Ay'dır."
                            },
                            {
                                soru: "Güneş neden bir yıldızdır?",
                                cozum: "Güneş kendi ışığını ve ısısını ürettiği için yıldızdır."
                            }
                        ],

                        dikkat: `
                        Ay ışık kaynağı değildir. Güneş'ten aldığı ışığı
                        yansıtır.
                        `,

                        ozet: `
                        Güneş bir yıldız, Dünya bir gezegen ve Ay
                        Dünya'nın doğal uydusudur.
                        `,

                        test: [
                            {
                                soru: "Güneş aşağıdakilerden hangisidir?",
                                secenekler: [
                                    "Gezegen",
                                    "Uydu",
                                    "Yıldız",
                                    "Meteor"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Dünya'nın doğal uydusu hangisidir?",
                                secenekler: [
                                    "Güneş",
                                    "Ay",
                                    "Mars",
                                    "Venüs"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Ay kendi ışığını üretir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Bazen",
                                    "Sadece geceleri"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Gece ve gündüzün oluşmasının temel nedeni nedir?",
                                secenekler: [
                                    "Ay'ın dönmesi",
                                    "Dünya'nın kendi ekseni etrafında dönmesi",
                                    "Güneş'in hareketi",
                                    "Bulutlar"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi Ay'ın ana evrelerinden biridir?",
                                secenekler: [
                                    "Dolunay",
                                    "Gökkuşağı",
                                    "Kutup",
                                    "Ekvator"
                                ],
                                cevap: 0
                            }
                        ]
                    },

                    {
                        id: "5-fen-kuvvet",
                        ad: "Kuvvet",

                        giris: `
                        Cisimlerin hareketini veya şeklini değiştirebilen
                        etkiye kuvvet denir.
                        `,

                        anlatim: `
                        <h3>Kuvvet Nedir?</h3>

                        <p>
                        Kuvvet, cisimleri hareket ettirebilen, durdurabilen,
                        hızlandırabilen, yavaşlatabilen veya yönünü
                        değiştirebilen etkidir.
                        </p>

                        <h3>Kuvvetin Etkileri</h3>

                        <ul>
                            <li>Duran cismi hareket ettirebilir.</li>
                            <li>Hareketli cismi durdurabilir.</li>
                            <li>Cismin hızını değiştirebilir.</li>
                            <li>Cismin yönünü değiştirebilir.</li>
                            <li>Cismin şeklini değiştirebilir.</li>
                        </ul>

                        <h3>Kuvvetin Ölçülmesi</h3>

                        <p>
                        Kuvvet dinamometre adı verilen araçla ölçülür.
                        Kuvvet birimi Newton'dur ve N harfiyle gösterilir.
                        </p>
                        `,

                        temelBilgi: [
                            "Kuvvet cisimlerin hareketini değiştirebilir.",
                            "Kuvvet dinamometre ile ölçülür.",
                            "Kuvvetin birimi Newton'dur.",
                            "Kuvvet cisimlerin şeklini değiştirebilir."
                        ],

                        ornekler: [
                            {
                                soru: "Futbol topuna vurulduğunda topun hareket etmesi hangi etkiye örnektir?",
                                cozum: "Topa uygulanan kuvvet duran topu hareket ettirmiştir."
                            }
                        ],

                        dikkat: `
                        Kuvvet yalnızca cisimleri hareket ettirmez.
                        Duran cismi hareket ettirebilir veya hareketli
                        cismin hareketini değiştirebilir.
                        `,

                        ozet: `
                        Kuvvet, cisimlerin hareketini ve şeklini
                        değiştirebilen etkidir. Dinamometre ile ölçülür
                        ve birimi Newton'dur.
                        `,

                        test: [
                            {
                                soru: "Kuvvet hangi araçla ölçülür?",
                                secenekler: [
                                    "Termometre",
                                    "Dinamometre",
                                    "Cetvel",
                                    "Büyüteç"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kuvvetin birimi nedir?",
                                secenekler: [
                                    "Metre",
                                    "Kilogram",
                                    "Newton",
                                    "Litre"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Kuvvet aşağıdakilerden hangisini değiştirebilir?",
                                secenekler: [
                                    "Hareketi",
                                    "Cismin şeklini",
                                    "Yönü",
                                    "Hepsini"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Duran bir topa vurulduğunda ne olur?",
                                secenekler: [
                                    "Hareket edebilir",
                                    "Yok olur",
                                    "Kütlesi sıfırlanır",
                                    "Işık üretir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Newton hangi büyüklüğün birimidir?",
                                secenekler: [
                                    "Kuvvet",
                                    "Sıcaklık",
                                    "Uzunluk",
                                    "Zaman"
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
                        id: "5-sosyal-birey-toplum",
                        ad: "Birey ve Toplum",

                        giris: `
                        İnsanlar toplum içinde farklı roller üstlenir.
                        Bireyin sahip olduğu roller ve sorumluluklar
                        zaman içerisinde değişebilir.
                        `,

                        anlatim: `
                        <h3>Birey ve Toplum</h3>

                        <p>
                        Her insan toplumun bir parçasıdır. İnsanlar
                        ailede, okulda ve arkadaş çevresinde farklı
                        roller üstlenebilir.
                        </p>

                        <h3>Rol</h3>

                        <p>
                        Bir kişinin bulunduğu grupta üstlendiği göreve
                        veya konuma rol denir.
                        </p>

                        <div class="kitap-ornek">
                        Bir öğrenci;
                        ailesinde çocuk,
                        okulda öğrenci,
                        arkadaş grubunda arkadaş rolündedir.
                        </div>

                        <h3>Sorumluluk</h3>

                        <p>
                        Bir kişinin üzerine düşen görevleri yerine
                        getirmesine sorumluluk denir.
                        </p>

                        <h3>Hak</h3>

                        <p>
                        İnsanların doğuştan veya yasalarla sahip olduğu
                        yetkilere hak denir.
                        </p>
                        `,

                        temelBilgi: [
                            "İnsanlar aynı anda birden fazla role sahip olabilir.",
                            "Roller zamanla değişebilir.",
                            "Sorumluluklar yerine getirilmesi gereken görevlerdir.",
                            "Haklar bireylerin sahip olduğu yetkilerdir.",
                            "Toplum düzeni hak ve sorumlulukların bilinmesiyle güçlenir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir öğrencinin okulundaki temel rolü nedir?",
                                cozum: "Öğrencidir. Okul ortamında derslere katılmak, öğrenmek ve okul kurallarına uymak gibi sorumlulukları vardır."
                            }
                        ],

                        dikkat: `
                        Hak ve sorumluluk birbirinden farklıdır.
                        Hak sahip olduğumuz yetkiyi, sorumluluk ise
                        yerine getirmemiz gereken görevi ifade eder.
                        `,

                        ozet: `
                        İnsanlar toplum içerisinde farklı roller üstlenir.
                        Her rolün beraberinde getirdiği hak ve
                        sorumluluklar vardır.
                        `,

                        test: [
                            {
                                soru: "Bir kişinin bulunduğu grupta üstlendiği göreve ne denir?",
                                secenekler: [
                                    "Hak",
                                    "Rol",
                                    "Ceza",
                                    "Kural"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi sorumluluktur?",
                                secenekler: [
                                    "Ders çalışmak",
                                    "Bir eşya satın almak",
                                    "Tatilde dinlenmek",
                                    "Oyun oynamak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hak nedir?",
                                secenekler: [
                                    "Yerine getirilmesi gereken görev",
                                    "Sahip olunan yetki",
                                    "Bir oyun",
                                    "Bir eşya"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Bir kişi aynı anda birden fazla role sahip olabilir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece okulda",
                                    "Sadece ailede"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Toplum içinde düzenin sağlanmasına ne katkı sağlar?",
                                secenekler: [
                                    "Kurallara uymamak",
                                    "Hak ve sorumlulukları bilmek",
                                    "Görevleri reddetmek",
                                    "Başkalarını dinlememek"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            /* =================================================
               İNGİLİZCE
               ================================================= */

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",

                konular: [

                    {
                        id: "5-ingilizce-greetings",
                        ad: "Greetings and Introductions",

                        giris: `
                        İngilizcede insanlarla tanışırken ve selamlaşırken
                        kullanılan temel ifadeleri öğrenmek günlük
                        iletişimin başlangıcıdır.
                        `,

                        anlatim: `
                        <h3>Selamlaşma</h3>

                        <p>
                        Hello: Merhaba<br>
                        Hi: Selam<br>
                        Good morning: Günaydın<br>
                        Good afternoon: Tünaydın<br>
                        Good evening: İyi akşamlar<br>
                        Goodbye: Hoşça kal
                        </p>

                        <h3>Kendini Tanıtma</h3>

                        <p>
                        "My name is..." ifadesi "Benim adım..." anlamına gelir.
                        </p>

                        <div class="kitap-ornek">
                        Hello! My name is Eren.
                        Merhaba! Benim adım Eren.
                        </div>

                        <h3>Yaş Sorma</h3>

                        <p>
                        "How old are you?" → Kaç yaşındasın?
                        </p>

                        <p>
                        "I am eleven years old." → On bir yaşındayım.
                        </p>
                        `,

                        temelBilgi: [
                            "Hello ve Hi selamlaşma ifadeleridir.",
                            "Good morning günaydın anlamına gelir.",
                            "My name is... kendini tanıtmak için kullanılır.",
                            "How old are you? yaş sormak için kullanılır.",
                            "I am ... years old yaş belirtmek için kullanılır."
                        ],

                        ornekler: [
                            {
                                soru: "“What is your name?” sorusuna nasıl cevap verilir?",
                                cozum: "My name is Eren. veya I am Eren. şeklinde cevap verilebilir."
                            }
                        ],

                        dikkat: `
                        "How are you?" ile "How old are you?" aynı soru değildir.
                        İlki nasıl olduğunu, ikincisi yaşını sorar.
                        `,

                        ozet: `
                        İngilizcede temel selamlaşma, tanışma ve yaş
                        sorma ifadeleri günlük iletişimin temelini oluşturur.
                        `,

                        test: [
                            {
                                soru: "“Hello” ne demektir?",
                                secenekler: [
                                    "Güle güle",
                                    "Merhaba",
                                    "Teşekkürler",
                                    "Lütfen"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Good morning” ne demektir?",
                                secenekler: [
                                    "Günaydın",
                                    "İyi geceler",
                                    "Hoşça kal",
                                    "Teşekkürler"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“How old are you?” ne demektir?",
                                secenekler: [
                                    "Nerelisin?",
                                    "Adın ne?",
                                    "Kaç yaşındasın?",
                                    "Nasılsın?"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "“My name is Ali.” cümlesinin anlamı nedir?",
                                secenekler: [
                                    "Ben Ali'yim / Benim adım Ali.",
                                    "Ali nerede?",
                                    "Ali kaç yaşında?",
                                    "Ali benim arkadaşım."
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Goodbye” hangi durumda kullanılır?",
                                secenekler: [
                                    "Tanışırken",
                                    "Ayrılırken",
                                    "Yemek yerken",
                                    "Uyurken"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            /* =================================================
               DİN KÜLTÜRÜ
               ================================================= */

            din: {
                ad: "Din Kültürü ve Ahlak Bilgisi",
                icon: "☪️",

                konular: [

                    {
                        id: "5-din-allah-inanci",
                        ad: "Allah İnancı",

                        giris: `
                        İslam inancında Allah'ın varlığına ve birliğine
                        inanmak temel inanç esaslarından biridir.
                        `,

                        anlatim: `
                        <h3>Allah İnancı</h3>

                        <p>
                        İslam'a göre Allah birdir. Evrendeki düzen ve
                        uyum Allah'ın yaratmasıyla açıklanır.
                        </p>

                        <h3>Allah'ın Birliği</h3>

                        <p>
                        Allah'ın bir olduğuna inanmak tevhid inancının
                        temelidir.
                        </p>

                        <h3>Yaratılış</h3>

                        <p>
                        İslam inancına göre evrendeki canlı ve cansız
                        varlıklar Allah tarafından yaratılmıştır.
                        </p>

                        <h3>Şükür</h3>

                        <p>
                        İnsanların sahip oldukları nimetler için Allah'a
                        teşekkür etmelerine şükür denir.
                        </p>
                        `,

                        temelBilgi: [
                            "İslam inancında Allah birdir.",
                            "Allah'ın birliğine inanmak tevhid inancının temelidir.",
                            "Şükür sahip olunan nimetlerin değerini bilmektir.",
                            "İnsan çevresindeki nimetleri korumalıdır."
                        ],

                        ornekler: [
                            {
                                soru: "Allah'ın bir olduğuna inanmak hangi kavramla ifade edilir?",
                                cozum: "Allah'ın bir olduğuna inanmak tevhid inancıyla ifade edilir."
                            }
                        ],

                        dikkat: `
                        Din Kültürü dersindeki kavramları birbirine
                        karıştırmamak için kavramların anlamlarını
                        dikkatlice öğrenmek gerekir.
                        `,

                        ozet: `
                        Allah'ın varlığına ve birliğine inanmak İslam
                        inancının temel esaslarındandır.
                        `,

                        test: [
                            {
                                soru: "Allah'ın bir olması hangi kavramla ilişkilidir?",
                                secenekler: [
                                    "Tevhid",
                                    "Sabır",
                                    "Adalet",
                                    "Temizlik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Sahip olunan nimetler için Allah'a teşekkür etmeye ne denir?",
                                secenekler: [
                                    "Şükür",
                                    "Sabır",
                                    "Dua",
                                    "Adalet"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İslam inancında Allah kaç tanedir?",
                                secenekler: [
                                    "Bir",
                                    "İki",
                                    "Üç",
                                    "Çok"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tevhid neyi ifade eder?",
                                secenekler: [
                                    "Allah'ın birliğini",
                                    "Oruç tutmayı",
                                    "Yardımlaşmayı",
                                    "Temizliği"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İnsan nimetlere karşı nasıl davranmalıdır?",
                                secenekler: [
                                    "İsraf etmelidir",
                                    "Korumalı ve şükretmelidir",
                                    "Yok saymalıdır",
                                    "Zarar vermelidir"
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

            turkce: {
                ad: "Türkçe",
                icon: "📖",

                konular: [

                    {
                        id: "6-turkce-sozcukte-anlam",
                        ad: "Sözcükte Anlam",

                        giris: `
                        Sözcüklerin cümlede kazandıkları anlamları
                        doğru belirlemek, okuduğunu anlamanın temelidir.
                        `,

                        anlatim: `
                        <h3>Sözcükte Anlam</h3>

                        <p>
                        Sözcükler cümle içerisinde gerçek, mecaz veya
                        terim anlam kazanabilir.
                        </p>

                        <h3>Gerçek Anlam</h3>

                        <p>
                        Sözcüğün temel ve ilk anlamıdır.
                        </p>

                        <h3>Mecaz Anlam</h3>

                        <p>
                        Sözcüğün gerçek anlamından uzaklaşarak kazandığı
                        yeni anlamdır.
                        </p>

                        <h3>Terim Anlam</h3>

                        <p>
                        Bir bilim, sanat, spor veya meslek alanında
                        özel anlam taşıyan sözcüklere terim denir.
                        </p>

                        <div class="kitap-ornek">
                        "Üçgenin üç kenarı vardır."

                        Buradaki üçgen ve kenar matematik bağlamında
                        terim anlam taşıyabilir.
                        </div>
                        `,

                        temelBilgi: [
                            "Gerçek anlam temel anlamdır.",
                            "Mecaz anlam gerçek anlamdan uzaklaşır.",
                            "Terim anlam belirli alanlarda kullanılan özel anlamdır.",
                            "Sözcüğün anlamı cümleye göre belirlenir."
                        ],

                        ornekler: [
                            {
                                soru: "“Kalbi kırıldı.” cümlesinde kırılmak hangi anlamdadır?",
                                cozum: "Gerçek bir kırılma olmadığı için mecaz anlamdadır."
                            },
                            {
                                soru: "“Üçgenin iç açıları toplamı 180 derecedir.” cümlesinde açı sözcüğü hangi alana aittir?",
                                cozum: "Matematik alanına ait özel bir kavram olduğu için terim anlamlıdır."
                            }
                        ],

                        dikkat: `
                        Terim anlamı belirlemek için sözcüğün belirli
                        bir bilim, sanat, spor veya meslek alanında
                        özel bir kavramı karşılayıp karşılamadığına bak.
                        `,

                        ozet: `
                        Sözcükler kullanım alanlarına göre gerçek,
                        mecaz ve terim anlam kazanabilir.
                        `,

                        test: [
                            {
                                soru: "“Ayağına taş battı.” cümlesinde taş sözcüğü hangi anlamdadır?",
                                secenekler: [
                                    "Gerçek",
                                    "Mecaz",
                                    "Terim",
                                    "Soyut"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Bu haber onu yıktı.” cümlesinde yıkmak hangi anlamdadır?",
                                secenekler: [
                                    "Gerçek",
                                    "Mecaz",
                                    "Terim",
                                    "Bilimsel"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi terim anlamlıdır?",
                                secenekler: [
                                    "Kalem",
                                    "Perde",
                                    "Açı",
                                    "Çanta"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Eş anlamlı sözcükler için hangisi doğrudur?",
                                secenekler: [
                                    "Anlamları karşıttır",
                                    "Anlamları aynı veya yakındır",
                                    "Yazılışları aynıdır",
                                    "Her zaman terimdir"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Cesur” sözcüğünün yakın anlamlısı hangisidir?",
                                secenekler: [
                                    "Korkak",
                                    "Yürekli",
                                    "Üzgün",
                                    "Sessiz"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",

                konular: [

                    {
                        id: "6-matematik-dogal-sayi-uslu",
                        ad: "Üslü İfadeler",

                        giris: `
                        Aynı sayının kendisiyle tekrar tekrar çarpılmasını
                        kısa biçimde göstermek için üslü ifadeler kullanılır.
                        `,

                        anlatim: `
                        <h3>Üslü İfade</h3>

                        <p>
                        Bir sayının kendisiyle kaç kez çarpıldığını
                        göstermek için üs kullanılır.
                        </p>

                        <div class="kitap-formul">
                        2³ = 2 × 2 × 2 = 8
                        </div>

                        <p>
                        Burada 2 taban, 3 ise üstür.
                        </p>

                        <h3>10'un Kuvvetleri</h3>

                        <p>
                        10² = 100<br>
                        10³ = 1000<br>
                        10⁴ = 10000
                        </p>

                        <h3>Önemli Nokta</h3>

                        <p>
                        Bir sayının üssü 1 ise sayı değişmez.
                        </p>

                        <div class="kitap-formul">
                        7¹ = 7
                        </div>
                        `,

                        temelBilgi: [
                            "Üslü ifadelerde taban ve üs bulunur.",
                            "2³, 2'nin üç kez çarpılmasıdır.",
                            "Bir sayının 1. kuvveti kendisine eşittir.",
                            "10'un kuvvetleri basamak değerleriyle ilişkilidir."
                        ],

                        ornekler: [
                            {
                                soru: "3² kaçtır?",
                                cozum: "3² = 3 × 3 = 9."
                            },
                            {
                                soru: "5³ kaçtır?",
                                cozum: "5³ = 5 × 5 × 5 = 125."
                            }
                        ],

                        dikkat: `
                        2³ ifadesi 2 × 3 değildir.
                        2³ = 2 × 2 × 2'dir.
                        `,

                        ozet: `
                        Üslü ifadeler tekrarlı çarpma işlemini
                        kısa biçimde gösterir.
                        `,

                        test: [
                            {
                                soru: "2³ kaçtır?",
                                secenekler: [
                                    "6",
                                    "8",
                                    "9",
                                    "12"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "5² kaçtır?",
                                secenekler: [
                                    "10",
                                    "15",
                                    "20",
                                    "25"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "10³ kaçtır?",
                                secenekler: [
                                    "100",
                                    "1000",
                                    "10000",
                                    "10"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "7¹ kaçtır?",
                                secenekler: [
                                    "1",
                                    "7",
                                    "14",
                                    "49"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "4² hangi işleme eşittir?",
                                secenekler: [
                                    "4 + 4",
                                    "4 × 2",
                                    "4 × 4",
                                    "4 + 2"
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
                        id: "6-fen-vucudumuzdaki-sistemler",
                        ad: "Vücudumuzdaki Sistemler",

                        giris: `
                        İnsan vücudu birçok sistemin birlikte çalışmasıyla
                        yaşamını sürdürür.
                        `,

                        anlatim: `
                        <h3>Destek ve Hareket Sistemi</h3>

                        <p>
                        Kemikler, kaslar ve eklemler destek ve hareket
                        sistemini oluşturur.
                        </p>

                        <h3>Solunum Sistemi</h3>

                        <p>
                        Solunum sistemi vücudun oksijen almasını ve
                        karbondioksiti dışarı vermesini sağlar.
                        </p>

                        <h3>Dolaşım Sistemi</h3>

                        <p>
                        Kalp ve damarlar dolaşım sisteminin temel
                        yapılarını oluşturur. Kanın vücutta taşınmasını
                        sağlar.
                        </p>

                        <h3>Sindirim Sistemi</h3>

                        <p>
                        Besinlerin parçalanarak vücut tarafından
                        kullanılabilir hâle getirilmesini sağlar.
                        </p>
                        `,

                        temelBilgi: [
                            "Kemikler vücuda destek sağlar.",
                            "Kaslar hareket etmemize yardımcı olur.",
                            "Akciğerler solunum sisteminin önemli organlarındandır.",
                            "Kalp kanı vücuda pompalar.",
                            "Sindirim sistemi besinlerin parçalanmasını sağlar."
                        ],

                        ornekler: [
                            {
                                soru: "Kanı vücuda pompalayan organ hangisidir?",
                                cozum: "Kanı vücuda pompalayan organ kalptir."
                            }
                        ],

                        dikkat: `
                        Sistemleri yalnızca organ isimleriyle değil,
                        görevleriyle birlikte öğrenmek daha kalıcıdır.
                        `,

                        ozet: `
                        İnsan vücudu farklı sistemlerin uyum içinde
                        çalışması sayesinde yaşamını sürdürür.
                        `,

                        test: [
                            {
                                soru: "Kanı vücuda pompalayan organ hangisidir?",
                                secenekler: [
                                    "Akciğer",
                                    "Kalp",
                                    "Mide",
                                    "Böbrek"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Solunum sisteminin temel amacı nedir?",
                                secenekler: [
                                    "Besinleri parçalamak",
                                    "Oksijen almak",
                                    "Kanı pompalamak",
                                    "Hareket etmek"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kemik ve kaslar hangi sistemle ilişkilidir?",
                                secenekler: [
                                    "Sindirim",
                                    "Destek ve hareket",
                                    "Dolaşım",
                                    "Solunum"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Sindirim sisteminin görevi nedir?",
                                secenekler: [
                                    "Besinleri parçalamak",
                                    "Kanı pompalamak",
                                    "Oksijen taşımak",
                                    "Hareket sağlamak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi solunum organıdır?",
                                secenekler: [
                                    "Akciğer",
                                    "Kalp",
                                    "Mide",
                                    "Kemik"
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
                        id: "6-sosyal-tarih",
                        ad: "Tarihe Yolculuk",

                        giris: `
                        Tarih, geçmişte yaşamış insanların faaliyetlerini
                        ve meydana gelen olayları zaman ve yer göstererek
                        inceleyen bilim dalıdır.
                        `,

                        anlatim: `
                        <h3>Tarih Nedir?</h3>

                        <p>
                        Tarih geçmişte meydana gelen olayları neden-sonuç
                        ilişkisi içerisinde incelemeye çalışır.
                        </p>

                        <h3>Kronoloji</h3>

                        <p>
                        Olayların oluş zamanına göre sıralanmasına
                        kronoloji denir.
                        </p>

                        <h3>Tarihî Kaynak</h3>

                        <p>
                        Geçmiş hakkında bilgi veren her türlü belge
                        tarihî kaynak olabilir.
                        </p>

                        <ul>
                            <li>Yazılı kaynaklar</li>
                            <li>Sözlü kaynaklar</li>
                            <li>Görsel kaynaklar</li>
                            <li>Maddi kaynaklar</li>
                        </ul>
                        `,

                        temelBilgi: [
                            "Tarih geçmişteki olayları inceler.",
                            "Kronoloji olayları zaman sırasına koyar.",
                            "Belgeler tarih araştırmalarında kaynak olarak kullanılır.",
                            "Tarihî olayların neden ve sonuçları vardır."
                        ],

                        ornekler: [
                            {
                                soru: "Olayların oluş sırasına göre sıralanmasına ne denir?",
                                cozum: "Olayların zaman sırasına göre sıralanmasına kronoloji denir."
                            }
                        ],

                        dikkat: `
                        Tarihî olayları değerlendirirken günümüz
                        koşullarını doğrudan geçmişe uygulamak yerine
                        dönemin şartlarını dikkate almak gerekir.
                        `,

                        ozet: `
                        Tarih geçmişi inceler. Kronoloji olayları
                        zaman sırasına koyar ve tarihî kaynaklar
                        geçmiş hakkında bilgi sağlar.
                        `,

                        test: [
                            {
                                soru: "Olayların zaman sırasına dizilmesine ne denir?",
                                secenekler: [
                                    "Coğrafya",
                                    "Kronoloji",
                                    "Ekonomi",
                                    "Nüfus"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Tarih neyi inceler?",
                                secenekler: [
                                    "Geleceği",
                                    "Geçmişi",
                                    "Sadece doğayı",
                                    "Sadece matematiği"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi tarihî kaynak olabilir?",
                                secenekler: [
                                    "Kitabe",
                                    "Belge",
                                    "Eski eşya",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Tarihî olaylarda ne incelenir?",
                                secenekler: [
                                    "Neden-sonuç ilişkileri",
                                    "Sadece sayılar",
                                    "Sadece hava durumu",
                                    "Sadece renkler"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kronoloji hangi kavramla ilgilidir?",
                                secenekler: [
                                    "Zaman",
                                    "Renk",
                                    "Sıcaklık",
                                    "Ses"
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
                        id: "6-ingilizce-life",
                        ad: "Life",

                        giris: `
                        Günlük yaşamımızdan bahsederken rutinlerimizi
                        ve yaptığımız işleri anlatırız.
                        `,

                        anlatim: `
                        <h3>Daily Routines</h3>

                        <p>
                        wake up → uyanmak<br>
                        get up → yataktan kalkmak<br>
                        have breakfast → kahvaltı yapmak<br>
                        go to school → okula gitmek<br>
                        study → ders çalışmak<br>
                        go to bed → yatağa gitmek
                        </p>

                        <h3>Simple Present</h3>

                        <p>
                        Günlük rutinleri ve alışkanlıkları anlatırken
                        Simple Present Tense kullanılır.
                        </p>

                        <div class="kitap-ornek">
                        I go to school every day.

                        Her gün okula giderim.
                        </div>

                        <p>
                        He, she ve it ile fiile genellikle -s / -es
                        eki gelir.
                        </p>

                        <div class="kitap-ornek">
                        She goes to school.
                        </div>
                        `,

                        temelBilgi: [
                            "Simple Present günlük rutinleri anlatır.",
                            "I, you, we, they ile fiilin yalın hâli kullanılır.",
                            "He, she, it ile fiile çoğu zaman -s veya -es gelir.",
                            "Every day günlük rutinleri belirtmek için sık kullanılır."
                        ],

                        ornekler: [
                            {
                                soru: "“She ___ to school every day.” boşluğa ne gelir?",
                                cozum: "Özne she olduğu için go fiili goes olur."
                            }
                        ],

                        dikkat: `
                        He, she ve it öznelerinde fiile gelen -s / -es
                        ekini unutma.
                        `,

                        ozet: `
                        Günlük alışkanlıklar Simple Present Tense ile
                        anlatılır. Üçüncü tekil şahıslarda fiile
                        genellikle -s veya -es gelir.
                        `,

                        test: [
                            {
                                soru: "“I ___ to school every day.”",
                                secenekler: [
                                    "go",
                                    "goes",
                                    "going",
                                    "went"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“She ___ breakfast at 8.”",
                                secenekler: [
                                    "have",
                                    "has",
                                    "having",
                                    "had"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Simple Present ne için kullanılır?",
                                secenekler: [
                                    "Günlük rutinler",
                                    "Sadece geçmiş",
                                    "Sadece gelecek",
                                    "Sadece hava durumu"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Wake up” ne demektir?",
                                secenekler: [
                                    "Uyumak",
                                    "Uyanmak",
                                    "Koşmak",
                                    "Yemek yemek"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "He, she, it ile fiile çoğunlukla hangi ek gelir?",
                                secenekler: [
                                    "-ed",
                                    "-ing",
                                    "-s/-es",
                                    "-ly"
                                ],
                                cevap: 2
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
                        id: "6-din-peygamberler",
                        ad: "Peygamberler",

                        giris: `
                        Peygamberler, insanlara Allah'ın mesajlarını
                        ulaştıran ve güzel davranışlarıyla örnek olan
                        kimselerdir.
                        `,

                        anlatim: `
                        <h3>Peygamber</h3>

                        <p>
                        İslam inancında peygamberler Allah'ın mesajlarını
                        insanlara ulaştırmakla görevlendirilmiştir.
                        </p>

                        <h3>Peygamberlerin Özellikleri</h3>

                        <p>
                        Peygamberlerin doğru sözlü, güvenilir ve
                        insanlara örnek olan kişiler olduğu kabul edilir.
                        </p>

                        <h3>Hz. Muhammed</h3>

                        <p>
                        Hz. Muhammed İslam dininin peygamberidir.
                        İnsanlara güzel ahlakı, adaleti, merhameti ve
                        doğruluğu öğretmiştir.
                        </p>
                        `,

                        temelBilgi: [
                            "Peygamberler insanlara Allah'ın mesajlarını iletir.",
                            "Peygamberler güzel davranışlarıyla insanlara örnek olur.",
                            "Hz. Muhammed İslam peygamberidir.",
                            "Doğruluk ve güvenilirlik önemli ahlaki değerlerdir."
                        ],

                        ornekler: [
                            {
                                soru: "İnsanlara Allah'ın mesajlarını ileten kişilere ne denir?",
                                cozum: "Allah'ın mesajlarını insanlara ulaştıran kişilere peygamber denir."
                            }
                        ],

                        dikkat: `
                        Peygamberlerin yalnızca bilgi veren kişiler
                        olmadığını, davranışlarıyla da insanlara örnek
                        olduklarını unutma.
                        `,

                        ozet: `
                        Peygamberler Allah'ın mesajlarını insanlara
                        ulaştırır ve güzel ahlaklarıyla örnek olurlar.
                        `,

                        test: [
                            {
                                soru: "Allah'ın mesajlarını insanlara ileten kişilere ne denir?",
                                secenekler: [
                                    "Peygamber",
                                    "Tarihçi",
                                    "Bilim insanı",
                                    "Sanatçı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hz. Muhammed hangi dinin peygamberidir?",
                                secenekler: [
                                    "İslam",
                                    "Budizm",
                                    "Hinduizm",
                                    "Yahudilik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Peygamberlerin hangi özelliği örnektir?",
                                secenekler: [
                                    "Doğruluk",
                                    "Yalan",
                                    "Haksızlık",
                                    "Bencillik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Güzel ahlak neyi destekler?",
                                secenekler: [
                                    "Toplumsal huzuru",
                                    "Kavgayı",
                                    "Haksızlığı",
                                    "Aldatmayı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Peygamberler insanlara ne konuda örnek olur?",
                                secenekler: [
                                    "Güzel davranışlarda",
                                    "Haksızlıkta",
                                    "Yalanda",
                                    "Kötülükte"
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

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [

                    {
                        id: "7-turkce-fiiller",
                        ad: "Fiiller",

                        giris: `
                        Fiiller, cümlede iş, oluş veya durum bildiren
                        sözcüklerdir.
                        `,

                        anlatim: `
                        <h3>Fiil Nedir?</h3>

                        <p>
                        Bir hareketi, işi veya oluşu bildiren sözcüklere
                        fiil denir.
                        </p>

                        <div class="kitap-ornek">
                        koşmak, okumak, yazmak, büyümek, uyumak
                        </div>

                        <h3>İş Fiilleri</h3>

                        <p>
                        Bir nesne üzerinde yapılan işi bildiren fiillerdir.
                        </p>

                        <h3>Oluş Fiilleri</h3>

                        <p>
                        Kendiliğinden gerçekleşen değişimleri bildiren
                        fiillerdir.
                        </p>

                        <h3>Durum Fiilleri</h3>

                        <p>
                        Bir durum bildiren ve genellikle nesne almayan
                        fiillerdir.
                        </p>

                        <h3>Fiillerde Kip</h3>

                        <p>
                        Fiillerin zaman veya dilek anlamı taşımasını
                        sağlayan ekler kip ekleridir.
                        </p>
                        `,

                        temelBilgi: [
                            "Fiiller iş, oluş ve durum bildirir.",
                            "İş fiilleri bir nesne üzerinde gerçekleşebilir.",
                            "Oluş fiilleri kendiliğinden gerçekleşen değişimleri anlatır.",
                            "Durum fiilleri bir durum bildirir.",
                            "Kip ekleri zaman veya dilek anlamı verebilir."
                        ],

                        ornekler: [
                            {
                                soru: "“Çocuk kitabı okudu.” cümlesindeki fiil nedir?",
                                cozum: "Cümlede yapılan iş 'okudu' sözcüğüyle anlatılmıştır. Fiil okudu'dur."
                            },
                            {
                                soru: "“Çocuk büyüdü.” cümlesindeki fiil hangi türdedir?",
                                cozum: "Büyümek kendiliğinden gerçekleşen bir değişimi anlattığı için oluş fiilidir."
                            }
                        ],

                        dikkat: `
                        Fiili bulmak için cümledeki iş, oluş veya durumu
                        belirlemeye çalış.
                        `,

                        ozet: `
                        Fiiller iş, oluş ve durum bildirir. Kip ekleri
                        fiillerin zaman veya dilek anlamı kazanmasını sağlar.
                        `,

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi fiildir?",
                                secenekler: [
                                    "Kitap",
                                    "Koşmak",
                                    "Masa",
                                    "Kalem"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Çocuk kitabı okudu.” fiili hangisidir?",
                                secenekler: [
                                    "Çocuk",
                                    "Kitabı",
                                    "Okudu",
                                    "Çocuk kitabı"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "“Bebek büyüdü.” cümlesindeki fiil hangi türdedir?",
                                secenekler: [
                                    "İş",
                                    "Oluş",
                                    "Durum",
                                    "İsim"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Fiiller ne bildirir?",
                                secenekler: [
                                    "İş, oluş, durum",
                                    "Sadece isim",
                                    "Sadece renk",
                                    "Sadece sayı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Fiillerin zaman veya dilek anlamı kazanmasını sağlayan yapılara ne denir?",
                                secenekler: [
                                    "Kip",
                                    "Sıfat",
                                    "Zamir",
                                    "Bağlaç"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",
                konular: [

                    {
                        id: "7-matematik-oran-oranti",
                        ad: "Oran ve Orantı",

                        giris: `
                        İki çokluğun birbirine göre karşılaştırılmasına
                        oran denir. Oran ve orantı günlük hayatta birçok
                        problemde kullanılır.
                        `,

                        anlatim: `
                        <h3>Oran</h3>

                        <p>
                        Aynı türden iki çokluğun birbirine bölünerek
                        karşılaştırılmasına oran denir.
                        </p>

                        <div class="kitap-formul">
                        6 / 3 = 2
                        </div>

                        <h3>Orantı</h3>

                        <p>
                        İki oranın birbirine eşit olmasına orantı denir.
                        </p>

                        <div class="kitap-formul">
                        2 / 3 = 4 / 6
                        </div>

                        <h3>Doğru Orantı</h3>

                        <p>
                        Bir çokluk artarken diğer çokluk da aynı yönde
                        artıyorsa doğru orantı söz konusu olabilir.
                        </p>

                        <h3>Ters Orantı</h3>

                        <p>
                        Bir çokluk artarken diğeri azalıyor ve çarpımları
                        sabit kalıyorsa ters orantı söz konusu olabilir.
                        </p>
                        `,

                        temelBilgi: [
                            "Oran iki çokluğu karşılaştırır.",
                            "Orantı iki oranın eşitliğidir.",
                            "Doğru orantıda çokluklar aynı yönde değişir.",
                            "Ters orantıda çokluklar zıt yönde değişebilir."
                        ],

                        ornekler: [
                            {
                                soru: "6 kalem ile 3 kalemin oranı kaçtır?",
                                cozum: "6 / 3 = 2. Oran 2'dir."
                            },
                            {
                                soru: "2/3 ve 4/6 oranları orantılı mıdır?",
                                cozum: "4/6 sadeleştirildiğinde 2/3 olur. Bu nedenle orantılıdır."
                            }
                        ],

                        dikkat: `
                        Oran kurarken karşılaştırılan çoklukların
                        aynı türden olmasına dikkat et.
                        `,

                        ozet: `
                        Oran iki çokluğu karşılaştırır. Orantı ise
                        iki oranın eşitliğini ifade eder.
                        `,

                        test: [
                            {
                                soru: "8 ve 4 sayılarının oranı kaçtır?",
                                secenekler: [
                                    "1",
                                    "2",
                                    "3",
                                    "4"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "2/3 = 4/? ifadesinde ? kaçtır?",
                                secenekler: [
                                    "4",
                                    "5",
                                    "6",
                                    "8"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Oran neyi karşılaştırır?",
                                secenekler: [
                                    "İki çokluğu",
                                    "Tek sayıyı",
                                    "Sadece zamanı",
                                    "Sadece uzunluğu"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "2/4 oranının sadeleşmiş hâli nedir?",
                                secenekler: [
                                    "1/2",
                                    "2/3",
                                    "1/3",
                                    "4/2"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İki oranın eşitliğine ne denir?",
                                secenekler: [
                                    "Oran",
                                    "Orantı",
                                    "Kesir",
                                    "Bölme"
                                ],
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
                        id: "7-fen-hucre",
                        ad: "Hücre ve Bölünmeler",

                        giris: `
                        Canlıların temel yapı ve görev birimine hücre denir.
                        Hücreler canlıların yaşam faaliyetlerini
                        gerçekleştirmesinde görev alır.
                        `,

                        anlatim: `
                        <h3>Hücre</h3>

                        <p>
                        Hücre, canlıların temel yapı ve görev birimidir.
                        </p>

                        <h3>Hücre Zarı</h3>

                        <p>
                        Hücreyi dış ortamdan ayırır ve madde alışverişinde
                        görev alır.
                        </p>

                        <h3>Sitoplazma</h3>

                        <p>
                        Hücre içindeki yaşamsal faaliyetlerin gerçekleştiği
                        sıvı kısımdır.
                        </p>

                        <h3>Çekirdek</h3>

                        <p>
                        Hücrenin yönetim merkezidir ve kalıtsal materyali
                        barındırır.
                        </p>

                        <h3>Mitoz Bölünme</h3>

                        <p>
                        Büyüme, gelişme ve bazı canlılarda yenilenme
                        süreçlerinde rol oynayan hücre bölünmesidir.
                        `,

                        temelBilgi: [
                            "Hücre canlıların temel yapı birimidir.",
                            "Hücre zarı hücreyi çevreler.",
                            "Çekirdek hücrenin yönetim merkezidir.",
                            "Mitoz büyüme ve yenilenmede önemlidir."
                        ],

                        ornekler: [
                            {
                                soru: "Hücrenin yönetim merkezi hangi yapıdır?",
                                cozum: "Hücrenin yönetim merkezi çekirdektir."
                            }
                        ],

                        dikkat: `
                        Bitki ve hayvan hücrelerinin ortak ve farklı
                        yapılarını karşılaştırırken hücre duvarı,
                        kloroplast ve koful gibi yapıları dikkate al.
                        `,

                        ozet: `
                        Hücre canlıların temel yapı ve görev birimidir.
                        Hücre zarı, sitoplazma ve çekirdek temel yapılardandır.
                        `,

                        test: [
                            {
                                soru: "Canlıların temel yapı birimi nedir?",
                                secenekler: [
                                    "Organ",
                                    "Hücre",
                                    "Doku",
                                    "Sistem"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Hücrenin yönetim merkezi hangisidir?",
                                secenekler: [
                                    "Hücre zarı",
                                    "Çekirdek",
                                    "Sitoplazma",
                                    "Koful"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Hücreyi dış ortamdan ayıran yapı hangisidir?",
                                secenekler: [
                                    "Çekirdek",
                                    "Hücre zarı",
                                    "Ribozom",
                                    "Kloroplast"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Mitoz bölünmenin görevlerinden biri nedir?",
                                secenekler: [
                                    "Büyüme",
                                    "Işık üretme",
                                    "Ses oluşturma",
                                    "Sindirim"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kalıtsal materyal hangi yapıda bulunur?",
                                secenekler: [
                                    "Çekirdek",
                                    "Hücre zarı",
                                    "Sitoplazma",
                                    "Hücre duvarı"
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
       8. SINIF
       ===================================================== */

    "8": {
        ad: "8. Sınıf",

        dersler: {

            turkce: {
                ad: "Türkçe",
                icon: "📖",
                konular: [

                    {
                        id: "8-turkce-fiilimsi",
                        ad: "Fiilimsi",

                        giris: `
                        Fiilimsi, fiillerden türeyen ancak cümlede
                        fiil gibi çekimlenmeyen ve isim, sıfat veya
                        zarf görevinde kullanılan sözcüklerdir.
                        `,

                        anlatim: `
                        <h3>Fiilimsi Nedir?</h3>

                        <p>
                        Fiillerden türeyen, ancak fiil olma özelliklerini
                        tamamen korumayan sözcüklere fiilimsi denir.
                        </p>

                        <h3>İsim-Fiil</h3>

                        <p>
                        Fiillerden isim yapan eklerle oluşturulur.
                        </p>

                        <div class="kitap-ornek">
                        yüzmek, okumak, yazma
                        </div>

                        <h3>Sıfat-Fiil</h3>

                        <p>
                        Fiilden türeyerek isimleri niteleyen sözcüklerdir.
                        </p>

                        <div class="kitap-ornek">
                        gülen çocuk
                        kırılmış kalem
                        </div>

                        <h3>Zarf-Fiil</h3>

                        <p>
                        Fiilden türeyerek eylemin nasıl, ne zaman
                        veya hangi durumda yapıldığını belirten
                        sözcüklerdir.
                        </p>
                        `,

                        temelBilgi: [
                            "Fiilimsiler fiillerden türetilir.",
                            "İsim-fiil isim görevinde kullanılır.",
                            "Sıfat-fiil isimleri niteler.",
                            "Zarf-fiil eylemin durumunu veya zamanını belirtir.",
                            "Fiilimsiler cümlenin yüklemi değildir."
                        ],

                        ornekler: [
                            {
                                soru: "“Kitap okumak çok faydalıdır.” cümlesinde fiilimsi hangisidir?",
                                cozum: "“Okumak” sözcüğü fiilden türemiş ve isim görevinde kullanılmıştır. İsim-fiildir."
                            }
                        ],

                        dikkat: `
                        Her fiilden türemiş sözcük otomatik olarak
                        fiilimsi değildir. Sözcüğün cümledeki görevine
                        bakılmalıdır.
                        `,

                        ozet: `
                        Fiilimsiler fiillerden türeyen ancak cümlede
                        isim, sıfat veya zarf görevinde kullanılan
                        sözcüklerdir.
                        `,

                        test: [
                            {
                                soru: "“Kitap okumayı seviyorum.” cümlesindeki fiilimsi hangisidir?",
                                secenekler: [
                                    "Kitap",
                                    "Okumayı",
                                    "Seviyorum",
                                    "Ben"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Fiilimsi nedir?",
                                secenekler: [
                                    "Çekimli fiil",
                                    "Fiilden türeyen isim, sıfat veya zarf",
                                    "Sadece isim",
                                    "Sadece sıfat"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Gülen çocuk bize baktı.” cümlesindeki fiilimsi hangisidir?",
                                secenekler: [
                                    "Çocuk",
                                    "Baktı",
                                    "Gülen",
                                    "Bize"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Fiilimsi hangi sözcük türünden türetilir?",
                                secenekler: [
                                    "Fiil",
                                    "Bağlaç",
                                    "Edat",
                                    "Zamir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "“Koşarak eve gitti.” cümlesindeki fiilimsi hangisidir?",
                                secenekler: [
                                    "Koşarak",
                                    "Eve",
                                    "Gitti",
                                    "O"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",
                konular: [

                    {
                        id: "8-matematik-carpanlar-katlar",
                        ad: "Çarpanlar ve Katlar",

                        giris: `
                        Bir doğal sayıyı kalansız bölen doğal sayılara
                        o sayının çarpanları veya bölenleri denir.
                        `,

                        anlatim: `
                        <h3>Çarpan</h3>

                        <p>
                        Bir sayıyı kalansız bölen sayılara o sayının
                        çarpanları denir.
                        </p>

                        <div class="kitap-ornek">
                        12'nin çarpanları:

                        1, 2, 3, 4, 6, 12
                        </div>

                        <h3>Kat</h3>

                        <p>
                        Bir sayının 1, 2, 3, ... gibi doğal sayılarla
                        çarpılmasıyla elde edilen sayılara o sayının
                        katları denir.
                        </p>

                        <div class="kitap-ornek">
                        5'in katları:

                        5, 10, 15, 20, 25, ...
                        </div>

                        <h3>Asal Sayılar</h3>

                        <p>
                        1'den büyük ve yalnızca 1 ile kendisine bölünebilen
                        doğal sayılara asal sayı denir.
                        </p>

                        <p>
                        Örnek: 2, 3, 5, 7, 11, 13
                        </p>
                        `,

                        temelBilgi: [
                            "Çarpanlar sayıyı kalansız böler.",
                            "Katlar sayının doğal sayılarla çarpılmasıyla oluşur.",
                            "2, 3, 5, 7 gibi sayılar asal sayılara örnektir.",
                            "1 asal sayı değildir.",
                            "2 en küçük asal sayıdır."
                        ],

                        ornekler: [
                            {
                                soru: "12'nin çarpanlarını bulunuz.",
                                cozum: "12'yi kalansız bölen sayılar 1, 2, 3, 4, 6 ve 12'dir."
                            },
                            {
                                soru: "20'nin ilk beş katını bulunuz.",
                                cozum: "20, 40, 60, 80 ve 100."
                            }
                        ],

                        dikkat: `
                        1 asal sayı değildir. Çünkü yalnızca bir
                        pozitif böleni vardır.
                        `,

                        ozet: `
                        Çarpanlar bir sayıyı kalansız böler.
                        Katlar ise sayının doğal sayılarla
                        çarpılmasıyla elde edilir.
                        `,

                        test: [
                            {
                                soru: "12'nin çarpanlarından biri hangisidir?",
                                secenekler: [
                                    "5",
                                    "7",
                                    "4",
                                    "11"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "5'in üçüncü katı kaçtır?",
                                secenekler: [
                                    "10",
                                    "15",
                                    "20",
                                    "25"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Aşağıdakilerden hangisi asaldır?",
                                secenekler: [
                                    "9",
                                    "15",
                                    "17",
                                    "21"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "1 asal mıdır?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Bazen",
                                    "Sadece çiftse"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "En küçük asal sayı hangisidir?",
                                secenekler: [
                                    "0",
                                    "1",
                                    "2",
                                    "3"
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
                        id: "8-fen-mevsimler-iklim",
                        ad: "Mevsimler ve İklim",

                        giris: `
                        Dünya'nın hareketleri ve eksen eğikliği,
                        Güneş ışınlarının yıl boyunca farklı açılarla
                        gelmesine ve mevsimlerin oluşmasına neden olur.
                        `,

                        anlatim: `
                        <h3>Mevsimlerin Oluşumu</h3>

                        <p>
                        Mevsimlerin oluşmasında Dünya'nın eksen eğikliği
                        ve Güneş etrafındaki dolanma hareketi etkilidir.
                        </p>

                        <h3>İklim</h3>

                        <p>
                        Bir bölgede uzun yıllar boyunca gözlenen hava
                        olaylarının ortalama özelliklerine iklim denir.
                        </p>

                        <h3>Hava Durumu</h3>

                        <p>
                        Kısa süre içerisinde atmosferde meydana gelen
                        olaylara hava durumu denir.
                        </p>

                        <div class="kitap-ornek">
                        “Bugün Batman'da yağmur yağacak.”
                        → Hava durumu

                        “Karadeniz Bölgesi yıl boyunca yağışlıdır.”
                        → İklim
                        </div>
                        `,

                        temelBilgi: [
                            "Mevsimlerin oluşumunda eksen eğikliği etkilidir.",
                            "Dünya Güneş etrafında dolanır.",
                            "Hava durumu kısa süreli atmosfer olaylarını ifade eder.",
                            "İklim uzun yıllar boyunca gözlenen özelliklerdir."
                        ],

                        ornekler: [
                            {
                                soru: "“Yarın kar yağması bekleniyor.” ifadesi iklim mi hava durumu mu?",
                                cozum: "Kısa süreli bir tahmin olduğu için hava durumudur."
                            }
                        ],

                        dikkat: `
                        Hava durumu kısa süreli, iklim ise uzun yıllara
                        dayanan genel atmosfer özelliklerini ifade eder.
                        `,

                        ozet: `
                        Mevsimlerin oluşumunda Dünya'nın eksen eğikliği
                        ve Güneş etrafındaki hareketi önemlidir.
                        İklim uzun süreli, hava durumu kısa sürelidir.
                        `,

                        test: [
                            {
                                soru: "Mevsimlerin oluşumunda hangisi etkilidir?",
                                secenekler: [
                                    "Eksen eğikliği",
                                    "Ay'ın ışığı",
                                    "Bulutların rengi",
                                    "Okyanusların tuzluluğu"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hava durumu hangi zaman aralığını ifade eder?",
                                secenekler: [
                                    "Kısa süre",
                                    "Yüzlerce yıl",
                                    "Binlerce yıl",
                                    "Sonsuz zaman"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İklim hangi özelliğe sahiptir?",
                                secenekler: [
                                    "Uzun yıllar",
                                    "Birkaç dakika",
                                    "Sadece bugün",
                                    "Sadece gece"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Dünya'nın Güneş etrafındaki hareketine ne denir?",
                                secenekler: [
                                    "Dönme",
                                    "Dolanma",
                                    "Salınım",
                                    "Titreşim"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "“Bugün hava çok soğuk.” ifadesi hangisidir?",
                                secenekler: [
                                    "İklim",
                                    "Hava durumu",
                                    "Mevsim",
                                    "Kıta"
                                ],
                                cevap: 1
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
                        id: "8-sosyal-demokrasi",
                        ad: "Demokrasi ve Vatandaşlık",

                        giris: `
                        Demokrasi, halkın yönetime katılmasını ve
                        temel hakların korunmasını esas alan bir
                        yönetim anlayışıdır.
                        `,

                        anlatim: `
                        <h3>Demokrasi</h3>

                        <p>
                        Demokrasi halkın kendi yöneticilerini seçebilmesine
                        ve yönetime katılabilmesine imkân veren bir sistemdir.
                        </p>

                        <h3>Vatandaşlık</h3>

                        <p>
                        Vatandaşların hakları olduğu gibi yerine getirmesi
                        gereken sorumlulukları da vardır.
                        </p>

                        <h3>Temel Haklar</h3>

                        <ul>
                            <li>Yaşama hakkı</li>
                            <li>Eğitim hakkı</li>
                            <li>Düşünce ve ifade özgürlüğü</li>
                            <li>Sağlık hakkı</li>
                        </ul>

                        <h3>Katılım</h3>

                        <p>
                        Demokratik toplumlarda insanlar seçimler,
                        sivil toplum faaliyetleri ve farklı katılım
                        yollarıyla toplumsal yaşama katkı sağlayabilir.
                        </p>
                        `,

                        temelBilgi: [
                            "Demokrasi halkın yönetime katılımını önemser.",
                            "Vatandaşların hakları ve sorumlulukları vardır.",
                            "Seçimler demokratik katılım yollarından biridir.",
                            "Temel haklara saygı demokratik toplum için önemlidir."
                        ],

                        ornekler: [
                            {
                                soru: "Seçimlerde oy kullanmak neye örnektir?",
                                cozum: "Demokratik yönetime katılım yollarından biridir."
                            }
                        ],

                        dikkat: `
                        Demokrasi yalnızca seçimlerden ibaret değildir.
                        Haklara saygı, katılım, özgürlük ve hukuk da
                        demokratik yaşamın önemli parçalarıdır.
                        `,

                        ozet: `
                        Demokrasi halkın yönetime katılımını,
                        temel hakların korunmasını ve hukukun
                        üstünlüğünü önemser.
                        `,

                        test: [
                            {
                                soru: "Demokrasi neyi önemser?",
                                secenekler: [
                                    "Halkın katılımını",
                                    "Tek kişinin kararını",
                                    "Hakların yok sayılmasını",
                                    "Kuralsızlığı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Oy kullanmak neye örnektir?",
                                secenekler: [
                                    "Demokratik katılım",
                                    "Spor",
                                    "Ekonomi",
                                    "Sanat"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi temel haktır?",
                                secenekler: [
                                    "Eğitim",
                                    "Haksızlık",
                                    "Şiddet",
                                    "Aldatma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Vatandaşların haklarının yanında neyi vardır?",
                                secenekler: [
                                    "Sorumlulukları",
                                    "Sadece ayrıcalıkları",
                                    "Hiçbir görevi yoktur",
                                    "Sadece cezaları"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Demokratik toplumlarda hangi değere saygı önemlidir?",
                                secenekler: [
                                    "Temel haklara",
                                    "Haksızlığa",
                                    "Şiddete",
                                    "Ayrımcılığa"
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
                        id: "8-ingilizce-friendship",
                        ad: "Friendship",

                        giris: `
                        Arkadaşlık ilişkilerinden bahsederken kişilerin
                        özelliklerini ve tercihlerini ifade eden kelimeler
                        kullanılır.
                        `,

                        anlatim: `
                        <h3>Personality</h3>

                        <p>
                        friendly → arkadaş canlısı<br>
                        honest → dürüst<br>
                        generous → cömert<br>
                        helpful → yardımsever<br>
                        selfish → bencil<br>
                        lazy → tembel
                        </p>

                        <h3>Likes and Dislikes</h3>

                        <p>
                        I like... → ... severim.<br>
                        I don't like... → ... sevmem.
                        </p>

                        <div class="kitap-ornek">
                        I like honest people.

                        Dürüst insanları severim.
                        </div>
                        `,

                        temelBilgi: [
                            "Friendly arkadaş canlısı demektir.",
                            "Honest dürüst demektir.",
                            "Generous cömert demektir.",
                            "I like sevdiğimiz şeyleri ifade eder.",
                            "I don't like sevmediğimiz şeyleri ifade eder."
                        ],

                        ornekler: [
                            {
                                soru: "“She is honest.” cümlesinde honest ne demektir?",
                                cozum: "Honest, dürüst anlamına gelir."
                            }
                        ],

                        dikkat: `
                        Personality kelimeleri insanların karakter
                        özelliklerini anlatmak için kullanılır.
                        `,

                        ozet: `
                        Arkadaşlık konusunda insanların kişilik
                        özellikleri ve hoşlanıp hoşlanmadıkları
                        ifadeler öğrenilir.
                        `,

                        test: [
                            {
                                soru: "Honest ne demektir?",
                                secenekler: [
                                    "Dürüst",
                                    "Tembel",
                                    "Bencil",
                                    "Kızgın"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Generous ne demektir?",
                                secenekler: [
                                    "Cömert",
                                    "Üzgün",
                                    "Korkak",
                                    "Sessiz"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "I like... ne demektir?",
                                secenekler: [
                                    "... sevmem",
                                    "... severim",
                                    "... bilmiyorum",
                                    "... istemiyorum"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Friendly ne demektir?",
                                secenekler: [
                                    "Arkadaş canlısı",
                                    "Kötü",
                                    "Tembel",
                                    "Üzgün"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "I don't like... ne demektir?",
                                secenekler: [
                                    "... severim",
                                    "... sevmem",
                                    "... bilirim",
                                    "... giderim"
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
       9. SINIF
       ===================================================== */

    "9": {
        ad: "9. Sınıf",

        dersler: {

            turk_dili_ve_edebiyati: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",

                konular: [

                    {
                        id: "9-edebiyat-edebi-turler",
                        ad: "Edebî Türler",

                        giris: `
                        Edebiyat, insanın duygu, düşünce ve hayallerini
                        dil aracılığıyla estetik biçimde ifade etmesini
                        sağlayan sanat alanlarından biridir.
                        `,

                        anlatim: `
                        <h3>Edebiyat</h3>

                        <p>
                        Edebiyat; duygu, düşünce, hayal ve yaşantıların
                        dil aracılığıyla estetik biçimde ifade edilmesidir.
                        </p>

                        <h3>Şiir</h3>

                        <p>
                        Duygu ve düşüncelerin ölçü, uyak, ritim ve
                        imgelerden yararlanılarak anlatıldığı edebî türdür.
                        </p>

                        <h3>Hikâye</h3>

                        <p>
                        Yaşanmış veya yaşanabilecek olayların kişi,
                        yer ve zaman unsurlarıyla anlatıldığı kısa
                        edebî türdür.
                        </p>

                        <h3>Roman</h3>

                        <p>
                        Hikâyeye göre daha uzun ve ayrıntılı olay
                        örgüsüne sahip anlatı türüdür.
                        </p>

                        <h3>Tiyatro</h3>

                        <p>
                        Olayların sahnede canlandırılmak üzere yazıldığı
                        edebî türdür.
                        </p>
                        `,

                        temelBilgi: [
                            "Edebiyat dil aracılığıyla duygu ve düşünceleri ifade eder.",
                            "Şiir estetik ve ritmik anlatıma önem verir.",
                            "Hikâye kısa anlatı türüdür.",
                            "Roman hikâyeye göre daha geniş ve ayrıntılıdır.",
                            "Tiyatro sahnelenmek amacıyla yazılır."
                        ],

                        ornekler: [
                            {
                                soru: "Sahnede canlandırılmak üzere yazılan edebî tür hangisidir?",
                                cozum: "Tiyatrodur."
                            }
                        ],

                        dikkat: `
                        Edebî türleri yalnızca uzunluklarına göre
                        ayırmak yeterli değildir. Yapı ve anlatım
                        özellikleri de değerlendirilmelidir.
                        `,

                        ozet: `
                        Şiir, hikâye, roman ve tiyatro farklı
                        özelliklere sahip edebî türlerdir.
                        `,

                        test: [
                            {
                                soru: "Sahnelenmek amacıyla yazılan tür hangisidir?",
                                secenekler: [
                                    "Roman",
                                    "Tiyatro",
                                    "Makale",
                                    "Biyografi"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Hikâyeye göre daha uzun ve ayrıntılı tür hangisidir?",
                                secenekler: [
                                    "Roman",
                                    "Şiir",
                                    "Atasözü",
                                    "Fıkra"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Duygu ve düşüncelerin estetik biçimde anlatıldığı türlerden biri hangisidir?",
                                secenekler: [
                                    "Şiir",
                                    "Tablo",
                                    "Harita",
                                    "Formül"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Edebiyatın temel aracı nedir?",
                                secenekler: [
                                    "Dil",
                                    "Sayı",
                                    "Harita",
                                    "Ses cihazı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hikâyede aşağıdakilerden hangisi bulunabilir?",
                                secenekler: [
                                    "Kişi",
                                    "Yer",
                                    "Zaman",
                                    "Hepsi"
                                ],
                                cevap: 3
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",

                konular: [

                    {
                        id: "9-matematik-kume",
                        ad: "Kümeler",

                        giris: `
                        Kümeler, belirli ve ortak bir özelliğe sahip
                        nesnelerin oluşturduğu toplulukları ifade eder.
                        `,

                        anlatim: `
                        <h3>Küme</h3>

                        <p>
                        İyi tanımlanmış nesneler topluluğuna küme denir.
                        </p>

                        <div class="kitap-ornek">
                        A = {1, 2, 3, 4}
                        </div>

                        <p>
                        Burada A kümesinin elemanları 1, 2, 3 ve 4'tür.
                        </p>

                        <h3>Eleman</h3>

                        <p>
                        Bir kümenin içinde bulunan nesnelere kümenin
                        elemanları denir.
                        </p>

                        <h3>Boş Küme</h3>

                        <p>
                        Hiç elemanı olmayan kümeye boş küme denir.
                        </p>

                        <h3>Kümenin Eleman Sayısı</h3>

                        <p>
                        Kümede bulunan farklı elemanların sayısı
                        kümenin eleman sayısını verir.
                        </p>
                        `,

                        temelBilgi: [
                            "Kümeler iyi tanımlanmış nesne topluluklarıdır.",
                            "Kümenin elemanları küme içinde gösterilir.",
                            "Boş kümenin elemanı yoktur.",
                            "Aynı eleman kümede bir kez yazılır."
                        ],

                        ornekler: [
                            {
                                soru: "A = {2, 4, 6, 8} kümesinin eleman sayısı kaçtır?",
                                cozum: "Kümede dört farklı eleman vardır. Bu nedenle eleman sayısı 4'tür."
                            }
                        ],

                        dikkat: `
                        Kümede aynı eleman tekrar edilmez.
                        {1,1,2,2,3} kümesi {1,2,3} ile aynı elemanlara sahiptir.
                        `,

                        ozet: `
                        Kümeler iyi tanımlanmış nesne topluluklarıdır.
                        Kümedeki nesnelere eleman denir.
                        `,

                        test: [
                            {
                                soru: "A = {1,2,3} kümesinin eleman sayısı kaçtır?",
                                secenekler: [
                                    "1",
                                    "2",
                                    "3",
                                    "4"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Hiç elemanı olmayan kümeye ne denir?",
                                secenekler: [
                                    "Evrensel küme",
                                    "Boş küme",
                                    "Sonlu küme",
                                    "Büyük küme"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kümede bulunan nesnelere ne denir?",
                                secenekler: [
                                    "Eleman",
                                    "Çarpan",
                                    "Kat",
                                    "Fonksiyon"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "{1,1,2,2,3} kümesinin farklı eleman sayısı kaçtır?",
                                secenekler: [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Kümeler neyi ifade eder?",
                                secenekler: [
                                    "İyi tanımlanmış nesne topluluklarını",
                                    "Sadece sayıları",
                                    "Sadece geometrik şekilleri",
                                    "Sadece fonksiyonları"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            fizik: {
                ad: "Fizik",
                icon: "⚛️",

                konular: [

                    {
                        id: "9-fizik-fizik-bilimi",
                        ad: "Fizik Bilimine Giriş",

                        giris: `
                        Fizik; madde, enerji, hareket, kuvvet ve doğadaki
                        birçok olayı inceleyen temel bilim dallarından biridir.
                        `,

                        anlatim: `
                        <h3>Fizik Nedir?</h3>

                        <p>
                        Fizik, doğadaki olayları gözlem, deney ve matematiksel
                        modeller yardımıyla açıklamaya çalışır.
                        </p>

                        <h3>Fiziğin Alt Dalları</h3>

                        <ul>
                            <li>Mekanik</li>
                            <li>Optik</li>
                            <li>Elektrik ve manyetizma</li>
                            <li>Termodinamik</li>
                            <li>Modern fizik</li>
                        </ul>

                        <h3>Fizik ve Günlük Hayat</h3>

                        <p>
                        Elektrikli cihazlardan ulaşım araçlarına,
                        tıbbi görüntüleme sistemlerinden iletişim
                        teknolojilerine kadar birçok alanda fizik
                        bilgilerinden yararlanılır.
                        `,

                        temelBilgi: [
                            "Fizik doğadaki olayları inceler.",
                            "Fizikte gözlem ve deney önemlidir.",
                            "Mekanik hareket ve kuvveti inceler.",
                            "Optik ışık olaylarıyla ilgilenir.",
                            "Fizik günlük yaşam teknolojilerinin temelindedir."
                        ],

                        ornekler: [
                            {
                                soru: "Işık olaylarını inceleyen fizik alt dalı hangisidir?",
                                cozum: "Işıkla ilgili olayları inceleyen alt dal optiktir."
                            }
                        ],

                        dikkat: `
                        Fizik yalnızca formüllerden ibaret değildir.
                        Önce fiziksel olayın ne olduğunu anlamak,
                        ardından matematiksel modeli kullanmak gerekir.
                        `,

                        ozet: `
                        Fizik doğayı anlamaya çalışan temel bilimlerden
                        biridir ve günlük hayatın birçok alanında kullanılır.
                        `,

                        test: [
                            {
                                soru: "Işık olaylarını hangi fizik dalı inceler?",
                                secenekler: [
                                    "Optik",
                                    "Mekanik",
                                    "Termodinamik",
                                    "Nükleer"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Fizik neyi inceler?",
                                secenekler: [
                                    "Doğadaki fiziksel olayları",
                                    "Sadece canlıları",
                                    "Sadece tarihi",
                                    "Sadece dili"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Mekanik hangi konularla ilgilidir?",
                                secenekler: [
                                    "Hareket ve kuvvet",
                                    "Dil",
                                    "Tarih",
                                    "Canlıların sınıflandırılması"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Fizikte hangisi önemlidir?",
                                secenekler: [
                                    "Gözlem",
                                    "Deney",
                                    "Ölçme",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Fizik günlük hayatta kullanılır mı?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece okulda",
                                    "Sadece laboratuvarda"
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
                        id: "9-kimya-kimya-bilimi",
                        ad: "Kimya Bilimi",

                        giris: `
                        Kimya maddelerin yapısını, özelliklerini,
                        birbirleriyle etkileşimlerini ve değişimlerini
                        inceleyen bilim dalıdır.
                        `,

                        anlatim: `
                        <h3>Kimya Nedir?</h3>

                        <p>
                        Kimya maddelerin yapısını, özelliklerini ve
                        geçirdiği değişimleri inceler.
                        </p>

                        <h3>Kimyanın Alt Dalları</h3>

                        <ul>
                            <li>Organik kimya</li>
                            <li>Anorganik kimya</li>
                            <li>Analitik kimya</li>
                            <li>Biyokimya</li>
                            <li>Fizikokimya</li>
                        </ul>

                        <h3>Kimya Günlük Hayatta</h3>

                        <p>
                        Temizlik ürünleri, ilaçlar, gıdalar, yakıtlar,
                        plastikler ve birçok teknolojik ürün kimya
                        bilgileriyle ilişkilidir.
                        `,

                        temelBilgi: [
                            "Kimya maddeyi ve maddedeki değişimleri inceler.",
                            "Organik kimya karbon bileşiklerinin önemli bir bölümünü inceler.",
                            "Analitik kimya maddelerin bileşimini belirlemede kullanılır.",
                            "Kimya günlük hayatın birçok alanında kullanılır."
                        ],

                        ornekler: [
                            {
                                soru: "Kimya hangi temel kavramı inceler?",
                                cozum: "Kimya maddenin yapısını, özelliklerini ve değişimlerini inceler."
                            }
                        ],

                        dikkat: `
                        Fizik ve kimya birbirinden tamamen bağımsız
                        değildir. Birçok olay iki bilim dalının ortak
                        çalışma alanına girebilir.
                        `,

                        ozet: `
                        Kimya maddeleri ve maddelerin geçirdiği
                        değişimleri inceleyen bilim dalıdır.
                        `,

                        test: [
                            {
                                soru: "Kimya neyi inceler?",
                                secenekler: [
                                    "Madde",
                                    "Sadece yıldızlar",
                                    "Sadece tarih",
                                    "Sadece dil"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kimyanın alt dallarından biri hangisidir?",
                                secenekler: [
                                    "Organik kimya",
                                    "Coğrafya",
                                    "Tarih",
                                    "Edebiyat"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kimya günlük hayatta kullanılır mı?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece laboratuvarda",
                                    "Sadece fabrikada"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Analitik kimyanın amaçlarından biri nedir?",
                                secenekler: [
                                    "Madde bileşimini belirlemek",
                                    "Şiir yazmak",
                                    "Tarih yazmak",
                                    "Harita çizmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Biyokimya hangi alanlarla ilişkilidir?",
                                secenekler: [
                                    "Canlılar ve kimya",
                                    "Sadece astronomi",
                                    "Sadece tarih",
                                    "Sadece spor"
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
                        id: "9-biyoloji-canlilar",
                        ad: "Yaşam Bilimi ve Biyoloji",

                        giris: `
                        Biyoloji canlıları ve canlıların yaşam süreçlerini
                        inceleyen bilim dalıdır.
                        `,

                        anlatim: `
                        <h3>Biyoloji</h3>

                        <p>
                        Biyoloji canlıların yapısını, yaşamını,
                        çevreleriyle ilişkilerini ve canlılık
                        süreçlerini inceler.
                        </p>

                        <h3>Canlıların Ortak Özellikleri</h3>

                        <ul>
                            <li>Beslenme</li>
                            <li>Solunum</li>
                            <li>Büyüme ve gelişme</li>
                            <li>Üreme</li>
                            <li>Uyarılara tepki verme</li>
                            <li>Boşaltım</li>
                        </ul>

                        <h3>Hücre</h3>

                        <p>
                        Hücre canlıların temel yapı ve görev birimidir.
                        Bazı canlılar tek hücreli, bazıları ise çok
                        hücrelidir.
                        `,

                        temelBilgi: [
                            "Biyoloji canlıları inceler.",
                            "Canlıların ortak özellikleri vardır.",
                            "Hücre canlıların temel yapı birimidir.",
                            "Canlılar çevreleriyle etkileşim hâlindedir."
                        ],

                        ornekler: [
                            {
                                soru: "Biyoloji neyi inceler?",
                                cozum: "Biyoloji canlıları ve yaşam süreçlerini inceler."
                            }
                        ],

                        dikkat: `
                        Virüslerin canlılık özellikleri biyolojide
                        tartışılan özel konulardan biridir; canlıların
                        ortak özelliklerini değerlendirirken bağlama
                        dikkat edilmelidir.
                        `,

                        ozet: `
                        Biyoloji canlıların yapısını, yaşamını ve
                        çevreleriyle ilişkilerini inceler.
                        `,

                        test: [
                            {
                                soru: "Biyoloji neyi inceler?",
                                secenekler: [
                                    "Canlıları",
                                    "Sadece taşları",
                                    "Sadece yıldızları",
                                    "Sadece makineleri"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi canlıların ortak özelliklerinden biridir?",
                                secenekler: [
                                    "Beslenme",
                                    "Metal olma",
                                    "Işık üretme",
                                    "Mıknatıs olma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Canlıların temel yapı birimi nedir?",
                                secenekler: [
                                    "Atom",
                                    "Hücre",
                                    "Gezegen",
                                    "Doku"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Canlılar çevreleriyle etkileşim hâlinde midir?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece bitkiler",
                                    "Sadece hayvanlar"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi canlılık özelliğidir?",
                                secenekler: [
                                    "Üreme",
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


            tarih: {
                ad: "Tarih",
                icon: "🏛️",

                konular: [

                    {
                        id: "9-tarih-tarih-bilimi",
                        ad: "Tarih Bilimine Giriş",

                        giris: `
                        Tarih bilimi geçmişte meydana gelen olayları
                        kaynaklara dayanarak incelemeye çalışır.
                        `,

                        anlatim: `
                        <h3>Tarih Bilimi</h3>

                        <p>
                        Tarih geçmişteki insan faaliyetlerini zaman ve
                        yer göstererek neden-sonuç ilişkisi içerisinde
                        inceleyen bilim dalıdır.
                        </p>

                        <h3>Tarihî Kaynaklar</h3>

                        <p>
                        Yazılı, sözlü, görsel ve maddi kaynaklar
                        tarih araştırmalarında kullanılabilir.
                        </p>

                        <h3>Kronoloji</h3>

                        <p>
                        Olayların zaman sırasına göre düzenlenmesine
                        kronoloji denir.
                        </p>
                        `,

                        temelBilgi: [
                            "Tarih geçmişteki olayları inceler.",
                            "Tarih araştırmalarında kaynak kullanılır.",
                            "Kronoloji zaman sıralamasıdır.",
                            "Tarihî olaylarda neden-sonuç ilişkisi önemlidir."
                        ],

                        ornekler: [
                            {
                                soru: "Olayların zaman sırasına dizilmesine ne denir?",
                                cozum: "Kronoloji denir."
                            }
                        ],

                        dikkat: `
                        Tarihî bilgiler kaynaklara dayanmalıdır.
                        Kaynağın güvenilirliği değerlendirilmelidir.
                        `,

                        ozet: `
                        Tarih bilimi geçmişteki insan faaliyetlerini
                        kaynaklara dayanarak inceler.
                        `,

                        test: [
                            {
                                soru: "Tarih hangi dönemi inceler?",
                                secenekler: [
                                    "Geçmiş",
                                    "Sadece gelecek",
                                    "Sadece bugün",
                                    "Sadece gece"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kronoloji nedir?",
                                secenekler: [
                                    "Zaman sıralaması",
                                    "Nüfus sayımı",
                                    "Harita",
                                    "Ekonomi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tarih araştırmalarında ne kullanılır?",
                                secenekler: [
                                    "Kaynak",
                                    "Tahmin",
                                    "Sadece söylenti",
                                    "Rastgele bilgi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tarihî olayların incelenmesinde hangisi önemlidir?",
                                secenekler: [
                                    "Neden-sonuç",
                                    "Renk",
                                    "Ses",
                                    "Koku"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi tarihî kaynak olabilir?",
                                secenekler: [
                                    "Kitabe",
                                    "Belge",
                                    "Arkeolojik buluntu",
                                    "Hepsi"
                                ],
                                cevap: 3
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

                        giris: `
                        Coğrafya, insan ile doğal çevre arasındaki
                        ilişkiyi ve yeryüzündeki doğal ve beşerî
                        olayların dağılışını inceler.
                        `,

                        anlatim: `
                        <h3>Coğrafya</h3>

                        <p>
                        Coğrafya doğal çevreyi, insan faaliyetlerini
                        ve bunların birbirleriyle ilişkilerini
                        inceler.
                        </p>

                        <h3>Doğal Unsurlar</h3>

                        <p>
                        Dağlar, akarsular, göller, iklim ve bitki
                        örtüsü doğal unsurlara örnektir.
                        </p>

                        <h3>Beşerî Unsurlar</h3>

                        <p>
                        Şehirler, yollar, fabrikalar, tarım alanları
                        ve nüfus beşerî unsurlara örnektir.
                        </p>
                        `,

                        temelBilgi: [
                            "Coğrafya insan ve çevre ilişkisini inceler.",
                            "Dağlar ve akarsular doğal unsurlardır.",
                            "Şehirler ve yollar beşerî unsurlardır.",
                            "İnsan faaliyetleri doğal çevreyi değiştirebilir."
                        ],

                        ornekler: [
                            {
                                soru: "Bir şehirdeki yollar doğal mı beşerî mi?",
                                cozum: "İnsanlar tarafından yapıldığı için beşerî unsurdur."
                            }
                        ],

                        dikkat: `
                        Doğal unsur doğada kendiliğinden bulunan,
                        beşerî unsur ise insan etkisiyle oluşturulan
                        unsurdur.
                        `,

                        ozet: `
                        Coğrafya doğal ve beşerî unsurlar arasındaki
                        ilişkiyi inceler.
                        `,

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi doğal unsurdur?",
                                secenekler: [
                                    "Dağ",
                                    "Yol",
                                    "Fabrika",
                                    "Köprü"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi beşerî unsurdur?",
                                secenekler: [
                                    "Akarsu",
                                    "Göl",
                                    "Şehir",
                                    "Dağ"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Coğrafya neyi inceler?",
                                secenekler: [
                                    "İnsan ve çevre ilişkisini",
                                    "Sadece tarihi",
                                    "Sadece dili",
                                    "Sadece matematiği"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Fabrika hangi unsurdur?",
                                secenekler: [
                                    "Doğal",
                                    "Beşerî",
                                    "İklim",
                                    "Jeolojik"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "İnsan doğal çevreyi değiştirebilir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece kışın",
                                    "Sadece yazın"
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
                        id: "9-ingilizce-school-life",
                        ad: "School Life",

                        giris: `
                        Lise düzeyinde İngilizcede okul yaşamı,
                        dersler, günlük etkinlikler ve kişisel
                        tercihler hakkında konuşma becerileri
                        geliştirilir.
                        `,

                        anlatim: `
                        <h3>School Subjects</h3>

                        <p>
                        Mathematics → Matematik<br>
                        Physics → Fizik<br>
                        Chemistry → Kimya<br>
                        Biology → Biyoloji<br>
                        History → Tarih<br>
                        Geography → Coğrafya
                        </p>

                        <h3>Preferences</h3>

                        <p>
                        I like mathematics.<br>
                        I don't like chemistry.
                        </p>

                        <h3>Frequency</h3>

                        <p>
                        always → her zaman<br>
                        usually → genellikle<br>
                        sometimes → bazen<br>
                        never → asla
                        </p>
                        `,

                        temelBilgi: [
                            "School subjects ders isimlerini ifade eder.",
                            "I like sevdiğimiz dersleri ifade eder.",
                            "I don't like sevmediğimiz dersleri ifade eder.",
                            "Always her zaman anlamına gelir.",
                            "Usually genellikle anlamına gelir."
                        ],

                        ornekler: [
                            {
                                soru: "“I usually study English.” cümlesindeki usually ne demektir?",
                                cozum: "Usually 'genellikle' anlamına gelir."
                            }
                        ],

                        dikkat: `
                        Sıklık zarflarının cümledeki konumuna dikkat et.
                        `,

                        ozet: `
                        Okul yaşamı konusunda ders isimleri,
                        tercihler ve sıklık ifadeleri öğrenilir.
                        `,

                        test: [
                            {
                                soru: "Chemistry ne demektir?",
                                secenekler: [
                                    "Kimya",
                                    "Tarih",
                                    "Biyoloji",
                                    "Coğrafya"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Usually ne demektir?",
                                secenekler: [
                                    "Asla",
                                    "Genellikle",
                                    "Hiçbir zaman",
                                    "Nadiren"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "I don't like... ne demektir?",
                                secenekler: [
                                    "... severim",
                                    "... sevmem",
                                    "... giderim",
                                    "... bilirim"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Biology ne demektir?",
                                secenekler: [
                                    "Fizik",
                                    "Kimya",
                                    "Biyoloji",
                                    "Tarih"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Always ne demektir?",
                                secenekler: [
                                    "Bazen",
                                    "Genellikle",
                                    "Her zaman",
                                    "Asla"
                                ],
                                cevap: 2
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

            turk_dili_ve_edebiyati: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [

                    {
                        id: "10-edebiyat-hikaye",
                        ad: "Hikâye",

                        giris: `
                        Hikâye, yaşanmış veya yaşanabilecek olayları
                        kişi, zaman, mekân ve olay örgüsü çevresinde
                        anlatan edebî türdür.
                        `,

                        anlatim: `
                        <h3>Hikâye</h3>

                        <p>
                        Hikâye, romana göre daha kısa olan ve genellikle
                        sınırlı sayıdaki olay veya kişi etrafında
                        gelişen anlatı türüdür.
                        </p>

                        <h3>Hikâyenin Unsurları</h3>

                        <ul>
                            <li>Olay</li>
                            <li>Kişiler</li>
                            <li>Yer</li>
                            <li>Zaman</li>
                            <li>Anlatıcı</li>
                        </ul>

                        <h3>Olay Örgüsü</h3>

                        <p>
                        Hikâyedeki olayların birbirleriyle bağlantılı
                        biçimde ilerlemesine olay örgüsü denir.
                        `,

                        temelBilgi: [
                            "Hikâye kısa anlatı türüdür.",
                            "Hikâyede olay, kişi, yer ve zaman bulunabilir.",
                            "Olay örgüsü olayların birbirine bağlanmasıdır.",
                            "Anlatıcı olayları aktaran kişidir."
                        ],

                        ornekler: [
                            {
                                soru: "Hikâyenin temel unsurlarından biri nedir?",
                                cozum: "Olay, kişi, yer, zaman ve anlatıcı hikâyenin temel unsurlarındandır."
                            }
                        ],

                        dikkat: `
                        Yazar ile anlatıcı aynı kişi olmak zorunda değildir.
                        `,

                        ozet: `
                        Hikâye olay çevresinde gelişen kısa anlatı türüdür.
                        `,

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi hikâye unsurudur?",
                                secenekler: [
                                    "Olay",
                                    "Kişi",
                                    "Zaman",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Olayların birbirine bağlanmasına ne denir?",
                                secenekler: [
                                    "Olay örgüsü",
                                    "Tema",
                                    "Konu",
                                    "Başlık"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hikâye hangi türdür?",
                                secenekler: [
                                    "Anlatı",
                                    "Formül",
                                    "Harita",
                                    "Tablo"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Olayları aktaran kişiye ne denir?",
                                secenekler: [
                                    "Anlatıcı",
                                    "Okuyucu",
                                    "Yazar yardımcısı",
                                    "Editör"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Yazar ve anlatıcı aynı kişi olmak zorunda mıdır?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece şiirde",
                                    "Sadece tiyatroda"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",
                konular: [

                    {
                        id: "10-matematik-fonksiyon",
                        ad: "Fonksiyonlar",

                        giris: `
                        Fonksiyonlar, bir kümenin elemanlarını başka bir
                        kümenin elemanlarıyla belirli bir kurala göre
                        eşleştiren matematiksel yapılardır.
                        `,

                        anlatim: `
                        <h3>Fonksiyon</h3>

                        <p>
                        A kümesindeki her elemanın B kümesinde yalnızca
                        bir elemana eşlendiği bağıntıya fonksiyon denir.
                        </p>

                        <div class="kitap-formul">
                        f(x) = 2x + 1
                        </div>

                        <p>
                        x yerine verilen değer yazılarak fonksiyonun
                        sonucu bulunabilir.
                        </p>

                        <div class="kitap-ornek">
                        f(3) = 2·3 + 1
                        f(3) = 7
                        </div>

                        <h3>Tanım Kümesi</h3>

                        <p>
                        Fonksiyonun girdi değerlerinin bulunduğu kümeye
                        tanım kümesi denir.
                        </p>

                        <h3>Değer Kümesi</h3>

                        <p>
                        Fonksiyon sonucunda elde edilen değerlerin
                        bulunduğu kümeye değer kümesi denir.
                        </p>
                        `,

                        temelBilgi: [
                            "Fonksiyonlarda her girişin yalnızca bir çıkışı vardır.",
                            "Tanım kümesi giriş değerlerini içerir.",
                            "Değer kümesi sonuç değerleriyle ilişkilidir.",
                            "Fonksiyon değeri bulmak için verilen değer yerine yazılır."
                        ],

                        ornekler: [
                            {
                                soru: "f(x)=2x+1 ise f(4) kaçtır?",
                                cozum: "x yerine 4 yazılır: f(4)=2×4+1=9."
                            }
                        ],

                        dikkat: `
                        Fonksiyonda bir giriş değerinin iki farklı
                        çıkışa eşlenemeyeceğini unutma.
                        `,

                        ozet: `
                        Fonksiyon, girişleri belirli bir kurala göre
                        çıkışlarla eşleştiren matematiksel yapıdır.
                        `,

                        test: [
                            {
                                soru: "f(x)=2x+1 ise f(3) kaçtır?",
                                secenekler: [
                                    "5",
                                    "6",
                                    "7",
                                    "8"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Fonksiyonda bir giriş kaç farklı çıkışa sahip olabilir?",
                                secenekler: [
                                    "Bir",
                                    "İki",
                                    "Üç",
                                    "Sınırsız"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tanım kümesi neyi ifade eder?",
                                secenekler: [
                                    "Girişleri",
                                    "Sadece sonuçları",
                                    "Grafiği",
                                    "Eğimi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "f(x)=x+5 ise f(2) kaçtır?",
                                secenekler: [
                                    "5",
                                    "6",
                                    "7",
                                    "8"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Fonksiyonlar hangi tür eşlemeleri ifade eder?",
                                secenekler: [
                                    "Belirli kurala göre eşleme",
                                    "Rastgele eşleme",
                                    "Sadece sayma",
                                    "Sadece çıkarma"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [

                    {
                        id: "10-fizik-hareket",
                        ad: "Hareket",

                        giris: `
                        Hareket, bir cismin seçilen referans noktasına
                        göre konumunun zamanla değişmesidir.
                        `,

                        anlatim: `
                        <h3>Hareket</h3>

                        <p>
                        Bir cismin konumunun zamana göre değişmesine
                        hareket denir.
                        </p>

                        <h3>Sürat</h3>

                        <p>
                        Bir cismin aldığı yolun geçen zamana oranına
                        sürat denir.
                        </p>

                        <div class="kitap-formul">
                        Sürat = Alınan yol / Zaman
                        </div>

                        <h3>Hız</h3>

                        <p>
                        Hız, yön bilgisi de içeren vektörel bir büyüklüktür.
                        </p>

                        <h3>İvme</h3>

                        <p>
                        Hızın zamana göre değişimine ivme denir.
                        </p>
                        `,

                        temelBilgi: [
                            "Hareket konumun zamanla değişmesidir.",
                            "Sürat alınan yolun zamana oranıdır.",
                            "Hız yön bilgisi içerir.",
                            "İvme hız değişiminin zamana oranıyla ilişkilidir."
                        ],

                        ornekler: [
                            {
                                soru: "120 metre yolu 20 saniyede alan aracın sürati kaç m/s'dir?",
                                cozum: "Sürat = Yol / Zaman = 120 / 20 = 6 m/s."
                            }
                        ],

                        dikkat: `
                        Sürat ve hız günlük dilde benzer kullanılsa da
                        fiziksel olarak aynı kavram değildir.
                        `,

                        ozet: `
                        Hareket konum değişimidir. Sürat yol-zaman
                        ilişkisini, hız ise yönlü hareketi ifade eder.
                        `,

                        test: [
                            {
                                soru: "Sürat nasıl bulunur?",
                                secenekler: [
                                    "Yol × zaman",
                                    "Yol / zaman",
                                    "Zaman / yol",
                                    "Yol + zaman"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "100 m yolu 20 s'de alan aracın sürati kaç m/s'dir?",
                                secenekler: [
                                    "2",
                                    "5",
                                    "10",
                                    "20"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Hız hangi bilgiyi içerir?",
                                secenekler: [
                                    "Yön",
                                    "Sadece renk",
                                    "Sadece kütle",
                                    "Sadece sıcaklık"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İvme neyle ilişkilidir?",
                                secenekler: [
                                    "Hız değişimi",
                                    "Renk",
                                    "Kütle değişimi",
                                    "Ses"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hareket nedir?",
                                secenekler: [
                                    "Konumun zamanla değişmesi",
                                    "Sıcaklığın sabit kalması",
                                    "Rengin değişmesi",
                                    "Kütlenin yok olması"
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
                        id: "10-kimya-karisimlar",
                        ad: "Karışımlar",

                        giris: `
                        İki veya daha fazla saf maddenin kimyasal
                        özelliklerini kaybetmeden bir araya gelmesiyle
                        karışımlar oluşur.
                        `,

                        anlatim: `
                        <h3>Karışım</h3>

                        <p>
                        Birden fazla saf maddenin kimyasal özelliklerini
                        kaybetmeden bir araya gelmesiyle karışım oluşur.
                        </p>

                        <h3>Homojen Karışım</h3>

                        <p>
                        Her yerinde aynı özellik gösteren karışımlara
                        homojen karışım denir.
                        </p>

                        <div class="kitap-ornek">
                        Tuzlu su → homojen karışım
                        </div>

                        <h3>Heterojen Karışım</h3>

                        <p>
                        Her yerinde aynı özellik göstermeyen karışımlara
                        heterojen karışım denir.
                        </p>

                        <div class="kitap-ornek">
                        Kum-su → heterojen karışım
                        </div>

                        <h3>Karışımların Ayrılması</h3>

                        <p>
                        Karışımlar fiziksel yöntemlerle bileşenlerine
                        ayrılabilir.
                        </p>

                        <ul>
                            <li>Süzme</li>
                            <li>Eleme</li>
                            <li>Mıknatısla ayırma</li>
                            <li>Buharlaştırma</li>
                            <li>Damıtma</li>
                        </ul>
                        `,

                        temelBilgi: [
                            "Karışımlar birden fazla saf maddeden oluşur.",
                            "Homojen karışımlar her yerinde aynı özelliktedir.",
                            "Heterojen karışımlar her yerinde aynı değildir.",
                            "Karışımlar fiziksel yöntemlerle ayrılabilir."
                        ],

                        ornekler: [
                            {
                                soru: "Tuzlu su homojen mi heterojen mi?",
                                cozum: "Tuz su içinde çözündüğü ve karışım her yerinde aynı özellik gösterdiği için homojendir."
                            },
                            {
                                soru: "Kum ve su nasıl ayrılır?",
                                cozum: "Kum suda çözünmediği için süzme yöntemi kullanılabilir."
                            }
                        ],

                        dikkat: `
                        Karışımları ayırırken maddelerin fiziksel
                        özelliklerinden yararlanılır.
                        `,

                        ozet: `
                        Karışımlar homojen veya heterojen olabilir.
                        Fiziksel yöntemlerle bileşenlerine ayrılabilirler.
                        `,

                        test: [
                            {
                                soru: "Tuzlu su hangi tür karışımdır?",
                                secenekler: [
                                    "Homojen",
                                    "Heterojen",
                                    "Saf madde",
                                    "Element"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kum-su karışımı nasıl ayrılabilir?",
                                secenekler: [
                                    "Süzme",
                                    "Mıknatıs",
                                    "Eleme",
                                    "Yanma"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Karışımlar hangi yöntemlerle ayrılabilir?",
                                secenekler: [
                                    "Fiziksel",
                                    "Sadece kimyasal",
                                    "Hiçbir şekilde",
                                    "Sadece biyolojik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Demir-kum karışımı hangi yöntemle ayrılabilir?",
                                secenekler: [
                                    "Süzme",
                                    "Mıknatıs",
                                    "Damıtma",
                                    "Buharlaştırma"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Tuzlu suyun ayrılmasında hangi yöntem kullanılabilir?",
                                secenekler: [
                                    "Buharlaştırma",
                                    "Mıknatıs",
                                    "Eleme",
                                    "Süzgeç"
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
                        id: "10-biyoloji-hucre",
                        ad: "Hücre",

                        giris: `
                        Hücre canlıların temel yapı ve görev birimidir.
                        Hücrelerin yapısı ve görevleri canlıların
                        özelliklerini anlamada önemlidir.
                        `,

                        anlatim: `
                        <h3>Hücrenin Temel Yapıları</h3>

                        <p>
                        Hücre zarı, sitoplazma ve çekirdek temel
                        hücresel yapılardır.
                        </p>

                        <h3>Organeller</h3>

                        <p>
                        Hücre içerisinde farklı görevleri yerine
                        getiren yapılara organel denir.
                        </p>

                        <ul>
                            <li>Mitokondri</li>
                            <li>Ribozom</li>
                            <li>Endoplazmik retikulum</li>
                            <li>Golgi aygıtı</li>
                            <li>Lizozom</li>
                        </ul>

                        <h3>Mitokondri</h3>

                        <p>
                        Hücresel solunumla enerji üretiminde görev alır.
                        </p>

                        <h3>Ribozom</h3>

                        <p>
                        Protein sentezinde görev alır.
                        </p>
                        `,

                        temelBilgi: [
                            "Hücre canlıların temel yapı birimidir.",
                            "Mitokondri enerji üretiminde görevlidir.",
                            "Ribozom protein sentezler.",
                            "Organeller hücre içerisinde farklı görevler üstlenir."
                        ],

                        ornekler: [
                            {
                                soru: "Protein sentezinden sorumlu organel hangisidir?",
                                cozum: "Protein sentezinde görevli organel ribozomdur."
                            }
                        ],

                        dikkat: `
                        Organelleri görevleriyle birlikte öğrenmek
                        soru çözümünde büyük kolaylık sağlar.
                        `,

                        ozet: `
                        Hücre içerisinde farklı görevleri olan
                        organeller bulunur.
                        `,

                        test: [
                            {
                                soru: "Protein sentezleyen organel hangisidir?",
                                secenekler: [
                                    "Ribozom",
                                    "Mitokondri",
                                    "Golgi",
                                    "Lizozom"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Enerji üretiminde görevli organel hangisidir?",
                                secenekler: [
                                    "Mitokondri",
                                    "Ribozom",
                                    "Golgi",
                                    "Koful"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hücrelerin temel yapı birimi nedir?",
                                secenekler: [
                                    "Hücre",
                                    "Organ",
                                    "Sistem",
                                    "Doku"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Organeller nerede bulunur?",
                                secenekler: [
                                    "Hücre içinde",
                                    "Sadece kanda",
                                    "Sadece kemikte",
                                    "Dış ortamda"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hücre zarı hangi görevi yapar?",
                                secenekler: [
                                    "Hücreyi çevreler ve madde alışverişinde rol alır",
                                    "Sadece protein üretir",
                                    "Sadece enerji üretir",
                                    "Sadece DNA üretir"
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
                        id: "10-tarih-osmanli",
                        ad: "Osmanlı Devleti'nin Kuruluşu",

                        giris: `
                        Osmanlı Beyliği, Anadolu'daki siyasi gelişmeler
                        içerisinde ortaya çıkan Türk beyliklerinden biri
                        olarak gelişmiş ve zamanla büyük bir devlet hâline
                        gelmiştir.
                        `,

                        anlatim: `
                        <h3>Kuruluş Süreci</h3>

                        <p>
                        Osmanlı Beyliği'nin kuruluşunda Anadolu'nun siyasi
                        durumu, Bizans sınırındaki konumu ve çeşitli
                        sosyal-siyasi şartlar etkili olmuştur.
                        </p>

                        <h3>Gelişme</h3>

                        <p>
                        Osmanlılar zaman içerisinde topraklarını genişletmiş,
                        merkezi yapısını güçlendirmiş ve kurumsallaşmıştır.
                        </p>

                        <h3>Devletleşme</h3>

                        <p>
                        Yönetim, askerî teşkilat ve ekonomik yapıların
                        gelişmesi devletin güçlenmesine katkı sağlamıştır.
                        `,

                        temelBilgi: [
                            "Osmanlı Beyliği Anadolu'daki siyasi ortamda ortaya çıkmıştır.",
                            "Sınır bölgesindeki konumu gelişmesinde etkili olmuştur.",
                            "Devletleşme sürecinde kurumlar önem kazanmıştır.",
                            "Siyasi ve ekonomik gelişmeler birlikte değerlendirilmelidir."
                        ],

                        ornekler: [
                            {
                                soru: "Osmanlı Beyliği hangi coğrafyada ortaya çıkmıştır?",
                                cozum: "Anadolu'da ortaya çıkan Türk beyliklerinden biri olarak gelişmiştir."
                            }
                        ],

                        dikkat: `
                        Tarihî olayları tek bir nedene bağlamak yerine
                        siyasi, sosyal ve ekonomik faktörleri birlikte
                        değerlendirmek gerekir.
                        `,

                        ozet: `
                        Osmanlı Beyliği Anadolu'daki siyasi ortamda
                        ortaya çıkmış ve zamanla güçlü bir devlete dönüşmüştür.
                        `,

                        test: [
                            {
                                soru: "Osmanlı Beyliği nerede ortaya çıkmıştır?",
                                secenekler: [
                                    "Anadolu",
                                    "Amerika",
                                    "Avustralya",
                                    "Afrika"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Osmanlı'nın gelişmesinde hangi faktörler etkili olabilir?",
                                secenekler: [
                                    "Siyasi",
                                    "Sosyal",
                                    "Ekonomik",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Devletleşme sürecinde ne önemlidir?",
                                secenekler: [
                                    "Kurumların gelişmesi",
                                    "Kuralsızlık",
                                    "Devletsizlik",
                                    "Sadece ticaret"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Osmanlı ilk olarak ne olarak ortaya çıkmıştır?",
                                secenekler: [
                                    "Beylik",
                                    "Cumhuriyet",
                                    "İmparatorluk",
                                    "Koloni"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Tarihî olayları değerlendirirken ne yapılmalıdır?",
                                secenekler: [
                                    "Tek nedene bakılmalı",
                                    "Farklı faktörler birlikte değerlendirilmelidir",
                                    "Kaynak kullanılmamalı",
                                    "Tahmin yapılmalı"
                                ],
                                cevap: 1
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
                        id: "10-cografya-nufus",
                        ad: "Nüfus ve Yerleşme",

                        giris: `
                        Nüfus, belirli bir yerde yaşayan insan sayısını
                        ifade eder. Nüfusun dağılışı doğal ve beşerî
                        faktörlerden etkilenir.
                        `,

                        anlatim: `
                        <h3>Nüfus</h3>

                        <p>
                        Belirli bir alanda yaşayan insan sayısına nüfus denir.
                        </p>

                        <h3>Nüfus Dağılışını Etkileyen Faktörler</h3>

                        <ul>
                            <li>İklim</li>
                            <li>Yer şekilleri</li>
                            <li>Su kaynakları</li>
                            <li>Sanayi</li>
                            <li>Tarım</li>
                            <li>Ulaşım</li>
                        </ul>

                        <h3>Yerleşme</h3>

                        <p>
                        İnsanların yaşamak ve çeşitli faaliyetlerini
                        sürdürmek amacıyla oluşturduğu alanlara yerleşme
                        alanları denir.
                        `,

                        temelBilgi: [
                            "Nüfus belirli bir yerde yaşayan insan sayısıdır.",
                            "İklim nüfus dağılışını etkiler.",
                            "Sanayi ve ulaşım beşerî faktörlerdir.",
                            "Su kaynakları yerleşmeyi etkileyebilir."
                        ],

                        ornekler: [
                            {
                                soru: "Sanayinin gelişmiş olduğu yerlerde nüfus neden artabilir?",
                                cozum: "Sanayi iş olanaklarını artırdığı için insanlar bu bölgelere yerleşebilir."
                            }
                        ],

                        dikkat: `
                        Nüfusun fazla veya az olması tek bir faktörle
                        açıklanamaz; doğal ve beşerî şartlar birlikte
                        değerlendirilmelidir.
                        `,

                        ozet: `
                        Nüfus ve yerleşme; iklim, yer şekilleri,
                        su kaynakları, sanayi ve ulaşım gibi faktörlerden
                        etkilenir.
                        `,

                        test: [
                            {
                                soru: "Nüfus nedir?",
                                secenekler: [
                                    "Belirli yerde yaşayan insan sayısı",
                                    "Arazi büyüklüğü",
                                    "Yağış miktarı",
                                    "Sıcaklık"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi nüfus dağılışını etkiler?",
                                secenekler: [
                                    "İklim",
                                    "Sanayi",
                                    "Ulaşım",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Sanayi nüfusu neden etkileyebilir?",
                                secenekler: [
                                    "İş olanakları sağlar",
                                    "Yağışı artırır",
                                    "Dağları yok eder",
                                    "Güneşi değiştirir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Su kaynakları yerleşmeyi etkiler mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece kışın",
                                    "Sadece yazın"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ulaşım hangi tür faktördür?",
                                secenekler: [
                                    "Beşerî",
                                    "Sadece doğal",
                                    "Astronomik",
                                    "Biyolojik"
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
                        id: "10-ingilizce-travel",
                        ad: "Travel",

                        giris: `
                        Seyahat konusunda ulaşım araçları, tatil
                        planları ve geçmiş deneyimler hakkında
                        konuşulur.
                        `,

                        anlatim: `
                        <h3>Travel Vocabulary</h3>

                        <p>
                        airport → havaalanı<br>
                        ticket → bilet<br>
                        luggage → bagaj<br>
                        hotel → otel<br>
                        journey → yolculuk
                        </p>

                        <h3>Past Simple</h3>

                        <p>
                        Geçmişte tamamlanmış olayları anlatmak için
                        Past Simple Tense kullanılır.
                        </p>

                        <div class="kitap-ornek">
                        I visited Istanbul last summer.

                        Geçen yaz İstanbul'u ziyaret ettim.
                        </div>

                        <h3>Regular Verbs</h3>

                        <p>
                        Düzenli fiiller geçmiş zamanda genellikle
                        -ed eki alır.
                        </p>
                        `,

                        temelBilgi: [
                            "Past Simple geçmişte tamamlanmış olayları anlatır.",
                            "Düzenli fiiller çoğunlukla -ed alır.",
                            "Visited, visit fiilinin geçmiş hâlidir.",
                            "Travel seyahat anlamına gelir."
                        ],

                        ornekler: [
                            {
                                soru: "“I visited Ankara last year.” cümlesinde zaman nedir?",
                                cozum: "Geçmişte tamamlanmış bir olay anlatıldığı için Past Simple kullanılmıştır."
                            }
                        ],

                        dikkat: `
                        Geçmiş zaman ifadelerinde yesterday, last week,
                        last year gibi zaman ifadeleri sık kullanılır.
                        `,

                        ozet: `
                        Travel konusunda seyahat kelimeleri ve geçmiş
                        deneyimleri anlatmak için Past Simple öğrenilir.
                        `,

                        test: [
                            {
                                soru: "Airport ne demektir?",
                                secenekler: [
                                    "Havaalanı",
                                    "Otel",
                                    "Bilet",
                                    "Tren"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Past Simple ne için kullanılır?",
                                secenekler: [
                                    "Geçmişte tamamlanmış olaylar",
                                    "Sadece gelecek",
                                    "Sadece alışkanlık",
                                    "Sadece emir"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Visit fiilinin düzenli geçmiş hâli nedir?",
                                secenekler: [
                                    "Visited",
                                    "Visits",
                                    "Visiting",
                                    "Visit"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ticket ne demektir?",
                                secenekler: [
                                    "Bilet",
                                    "Bagaj",
                                    "Otel",
                                    "Havaalanı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Journey ne demektir?",
                                secenekler: [
                                    "Yolculuk",
                                    "Bilet",
                                    "Pasaport",
                                    "Harita"
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
       11. SINIF
       ===================================================== */

    "11": {
        ad: "11. Sınıf",

        dersler: {

            turk_dili_ve_eddiyati: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [

                    {
                        id: "11-edebiyat-siir",
                        ad: "Şiir",

                        giris: `
                        Şiir, duygu, düşünce ve hayallerin estetik
                        bir dille ifade edildiği edebî türdür.
                        `,

                        anlatim: `
                        <h3>Şiir</h3>

                        <p>
                        Şiirde anlam, ses, ritim, imge ve söz sanatları
                        birlikte önem kazanır.
                        </p>

                        <h3>Şiirin Yapı Unsurları</h3>

                        <ul>
                            <li>Dize</li>
                            <li>Beyit</li>
                            <li>Dörtlük</li>
                            <li>Bent</li>
                        </ul>

                        <h3>Uyak ve Redif</h3>

                        <p>
                        Dize sonlarında ses benzerlikleri uyak olarak
                        değerlendirilir. Aynı görev ve anlamdaki ek
                        veya kelime tekrarları redif olabilir.
                        </p>

                        <h3>Söz Sanatları</h3>

                        <p>
                        Benzetme, kişileştirme, abartma ve karşıtlık
                        gibi sanatlar şiirin anlatım gücünü artırabilir.
                        `,

                        temelBilgi: [
                            "Şiirde dize temel yapı birimlerindendir.",
                            "Beyit iki dizeden oluşur.",
                            "Dörtlük dört dizeden oluşur.",
                            "Uyak ses benzerliğidir.",
                            "Redif aynı görev ve anlamdaki tekrarları ifade eder."
                        ],

                        ornekler: [
                            {
                                soru: "Dört dizeden oluşan nazım birimine ne denir?",
                                cozum: "Dört dizeden oluşan nazım birimine dörtlük denir."
                            }
                        ],

                        dikkat: `
                        Uyak ile redifi ayırırken önce aynı görev ve
                        anlamdaki ek veya kelimeleri belirlemek gerekir.
                        `,

                        ozet: `
                        Şiirde yapı, ses ve anlam unsurları birlikte
                        değerlendirilir.
                        `,

                        test: [
                            {
                                soru: "Dört dizeden oluşan birime ne denir?",
                                secenekler: [
                                    "Beyit",
                                    "Dörtlük",
                                    "Mısra",
                                    "Bent"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "İki dizeden oluşan nazım birimi hangisidir?",
                                secenekler: [
                                    "Beyit",
                                    "Dörtlük",
                                    "Kıta",
                                    "Bent"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Uyak nedir?",
                                secenekler: [
                                    "Ses benzerliği",
                                    "Konu",
                                    "Başlık",
                                    "Anlatıcı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi söz sanatıdır?",
                                secenekler: [
                                    "Benzetme",
                                    "Nokta",
                                    "Virgül",
                                    "Paragraf"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Şiirin temel yapı birimlerinden biri hangisidir?",
                                secenekler: [
                                    "Dize",
                                    "Bölüm",
                                    "Sayfa",
                                    "Dipnot"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",
                konular: [

                    {
                        id: "11-matematik-trigonometri",
                        ad: "Trigonometri",

                        giris: `
                        Trigonometri, üçgenler ve açıların ilişkilerini
                        inceleyen matematik dalıdır.
                        `,

                        anlatim: `
                        <h3>Trigonometri</h3>

                        <p>
                        Dik üçgenlerde açı ve kenar ilişkilerini
                        incelemek için sinüs, kosinüs ve tanjant
                        oranlarından yararlanılır.
                        </p>

                        <div class="kitap-formul">
                        sin θ = karşı / hipotenüs
                        </div>

                        <div class="kitap-formul">
                        cos θ = komşu / hipotenüs
                        </div>

                        <div class="kitap-formul">
                        tan θ = karşı / komşu
                        </div>

                        <h3>Özel Açılar</h3>

                        <p>
                        30°, 45° ve 60° gibi özel açılara ait trigonometrik
                        değerler sıkça kullanılır.
                        `,

                        temelBilgi: [
                            "Sinüs karşı kenarın hipotenüse oranıdır.",
                            "Kosinüs komşu kenarın hipotenüse oranıdır.",
                            "Tanjant karşı kenarın komşu kenara oranıdır.",
                            "Trigonometri üçgen ve açı ilişkilerini inceler."
                        ],

                        ornekler: [
                            {
                                soru: "Dik üçgende karşı kenar 3, hipotenüs 5 ise sinüs değeri nedir?",
                                cozum: "sin θ = karşı / hipotenüs = 3/5."
                            }
                        ],

                        dikkat: `
                        Karşı ve komşu kenarın hangi açıya göre
                        belirlendiğine dikkat et.
                        `,

                        ozet: `
                        Trigonometride temel oranlar sinüs, kosinüs
                        ve tanjanttır.
                        `,

                        test: [
                            {
                                soru: "sin θ hangi orana eşittir?",
                                secenekler: [
                                    "Karşı/hipotenüs",
                                    "Komşu/hipotenüs",
                                    "Karşı/komşu",
                                    "Hipotenüs/karşı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "cos θ hangi orana eşittir?",
                                secenekler: [
                                    "Karşı/hipotenüs",
                                    "Komşu/hipotenüs",
                                    "Karşı/komşu",
                                    "Hipotenüs/komşu"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "tan θ hangi orana eşittir?",
                                secenekler: [
                                    "Karşı/komşu",
                                    "Komşu/hipotenüs",
                                    "Karşı/hipotenüs",
                                    "Hipotenüs/karşı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Trigonometri neyi inceler?",
                                secenekler: [
                                    "Açı ve üçgen ilişkilerini",
                                    "Sadece sayıları",
                                    "Sadece olasılığı",
                                    "Sadece istatistiği"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "30°, 45° ve 60° ne tür açılardır?",
                                secenekler: [
                                    "Özel açılar",
                                    "Rastgele açılar",
                                    "Negatif açılar",
                                    "Sıfır açılar"
                                ],
                                cevap: 0
                            }
                        ]
                    }
                ]
            },


            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [

                    {
                        id: "11-fizik-elektrik",
                        ad: "Elektrik ve Manyetizma",

                        giris: `
                        Elektrik yükleri, elektrik akımı ve manyetik
                        alanlar fiziğin önemli çalışma alanlarındandır.
                        `,

                        anlatim: `
                        <h3>Elektrik Akımı</h3>

                        <p>
                        Elektrik yüklerinin düzenli hareketine elektrik
                        akımı denir.
                        </p>

                        <h3>Gerilim</h3>

                        <p>
                        Elektrik devresinde yüklerin hareketini sağlayan
                        potansiyel fark gerilim olarak ifade edilir.
                        </p>

                        <h3>Direnç</h3>

                        <p>
                        Bir iletkenin elektrik akımına karşı gösterdiği
                        zorluğa direnç denir.
                        </p>

                        <div class="kitap-formul">
                        V = I × R
                        </div>

                        <p>
                        Bu ilişki Ohm Yasası olarak bilinir.
                        </p>
                        `,

                        temelBilgi: [
                            "Akım elektrik yüklerinin hareketidir.",
                            "Gerilim potansiyel farkla ilişkilidir.",
                            "Direnç akıma karşı gösterilen zorluktur.",
                            "Ohm Yasası V=I×R şeklinde ifade edilir."
                        ],

                        ornekler: [
                            {
                                soru: "I=2 A ve R=5 Ω ise V kaç volttur?",
                                cozum: "V=I×R olduğundan V=2×5=10 V."
                            }
                        ],

                        dikkat: `
                        Birimlere dikkat et. Akım amper, direnç ohm,
                        gerilim volt birimiyle ifade edilir.
                        `,

                        ozet: `
                        Elektrik devrelerinde akım, gerilim ve direnç
                        temel büyüklüklerdir.
                        `,

                        test: [
                            {
                                soru: "Ohm Yasası hangisidir?",
                                secenekler: [
                                    "V=I×R",
                                    "V=I+R",
                                    "V=I/R",
                                    "V=R/I"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Akımın birimi nedir?",
                                secenekler: [
                                    "Volt",
                                    "Amper",
                                    "Ohm",
                                    "Watt"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Direncin birimi nedir?",
                                secenekler: [
                                    "Ohm",
                                    "Volt",
                                    "Amper",
                                    "Joule"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gerilimin birimi nedir?",
                                secenekler: [
                                    "Volt",
                                    "Amper",
                                    "Ohm",
                                    "Newton"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "I=2A, R=3Ω ise V kaçtır?",
                                secenekler: [
                                    "3",
                                    "5",
                                    "6",
                                    "9"
                                ],
                                cevap: 2
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
                        id: "11-kimya-gazlar",
                        ad: "Gazlar",

                        giris: `
                        Gazlar belirli bir şekil ve hacme sahip olmayan,
                        bulundukları kabı dolduran maddelerdir.
                        `,

                        anlatim: `
                        <h3>Gazların Özellikleri</h3>

                        <p>
                        Gaz tanecikleri arasında büyük boşluklar bulunur.
                        Gazlar sıkıştırılabilir ve bulundukları kabın
                        tamamına yayılır.
                        </p>

                        <h3>Basınç</h3>

                        <p>
                        Gaz taneciklerinin kap çeperlerine çarpması
                        gaz basıncıyla ilişkilidir.
                        </p>

                        <h3>Sıcaklık ve Hacim</h3>

                        <p>
                        Gazların sıcaklık, basınç ve hacim ilişkileri
                        gaz yasalarıyla incelenir.
                        `,

                        temelBilgi: [
                            "Gazların belirli şekli yoktur.",
                            "Gazlar bulundukları kabı doldurur.",
                            "Gazlar sıkıştırılabilir.",
                            "Gaz basıncı taneciklerin çarpışmalarıyla ilişkilidir."
                        ],

                        ornekler: [
                            {
                                soru: "Gazlar neden sıkıştırılabilir?",
                                cozum: "Gaz tanecikleri arasında büyük boşluklar bulunduğu için gazlar sıkıştırılabilir."
                            }
                        ],

                        dikkat: `
                        Gaz yasalarında sıcaklık birimi ve diğer
                        değişkenlerin nasıl kullanıldığına dikkat et.
                        `,

                        ozet: `
                        Gazların basınç, hacim ve sıcaklık arasındaki
                        ilişkileri gazların davranışını açıklamak için kullanılır.
                        `,

                        test: [
                            {
                                soru: "Gazların belirli şekli var mıdır?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece katı kapta",
                                    "Bazen"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Gazlar sıkıştırılabilir mi?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece su altında",
                                    "Sadece soğukken"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gaz basıncı neyle ilişkilidir?",
                                secenekler: [
                                    "Tanecik çarpışmaları",
                                    "Renk",
                                    "Koku",
                                    "Ses"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gazlar bulundukları kabın neresini doldurur?",
                                secenekler: [
                                    "Tamamını",
                                    "Sadece tabanını",
                                    "Sadece üstünü",
                                    "Hiçbir yerini"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Gazların tanecikleri arasında nasıl boşluklar vardır?",
                                secenekler: [
                                    "Büyük",
                                    "Hiç",
                                    "Sıfır",
                                    "Katılarla aynı"
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
                        id: "11-biyoloji-destek-hareket",
                        ad: "Destek ve Hareket Sistemi",

                        giris: `
                        İnsan vücudunun dik durmasını ve hareket etmesini
                        sağlayan yapıların başında kemikler, kaslar ve
                        eklemler gelir.
                        `,

                        anlatim: `
                        <h3>İskelet</h3>

                        <p>
                        İskelet vücuda şekil verir, iç organları korur
                        ve kasların tutunmasına yardımcı olur.
                        </p>

                        <h3>Kaslar</h3>

                        <p>
                        Kasların kasılıp gevşemesi hareketin oluşmasını
                        sağlar.
                        </p>

                        <h3>Eklemler</h3>

                        <p>
                        Kemiklerin birbirine bağlandığı bölgelere
                        eklem denir.
                        `,

                        temelBilgi: [
                            "İskelet vücuda destek sağlar.",
                            "Kemikler iç organları korur.",
                            "Kaslar hareketi sağlar.",
                            "Eklemler kemikleri birbirine bağlar."
                        ],

                        ornekler: [
                            {
                                soru: "Kemiklerin birbirine bağlandığı bölgelere ne denir?",
                                cozum: "Eklemler denir."
                            }
                        ],

                        dikkat: `
                        Hareket yalnızca kaslarla gerçekleşmez.
                        Kas, kemik ve eklem birlikte çalışır.
                        `,

                        ozet: `
                        Destek ve hareket sistemi kemik, kas ve
                        eklemlerin birlikte çalışmasıyla görev yapar.
                        `,

                        test: [
                            {
                                soru: "İskeletin görevlerinden biri nedir?",
                                secenekler: [
                                    "Destek sağlamak",
                                    "Sindirim yapmak",
                                    "Kan üretmek",
                                    "Ses üretmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kasların temel görevlerinden biri nedir?",
                                secenekler: [
                                    "Hareket",
                                    "Işık üretmek",
                                    "Besin depolamak",
                                    "Hava üretmek"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Kemiklerin bağlandığı yapılara ne denir?",
                                secenekler: [
                                    "Eklem",
                                    "Sinir",
                                    "Damar",
                                    "Akciğer"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İskelet iç organları korur mu?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece yazın",
                                    "Sadece çocuklarda"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hareket için hangi yapılar birlikte çalışır?",
                                secenekler: [
                                    "Kas-kemik-eklem",
                                    "Sadece kemik",
                                    "Sadece kas",
                                    "Sadece eklem"
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
       12. SINIF
       ===================================================== */

    "12": {
        ad: "12. Sınıf",

        dersler: {

            turk_dili_ve_edebiyati: {
                ad: "Türk Dili ve Edebiyatı",
                icon: "📚",
                konular: [

                    {
                        id: "12-edebiyat-cumhuriyet",
                        ad: "Cumhuriyet Dönemi Türk Edebiyatı",

                        giris: `
                        Cumhuriyet Dönemi Türk edebiyatı, Cumhuriyet'in
                        ilanından sonra toplumdaki değişimlerle birlikte
                        farklı tür ve anlayışların geliştiği geniş bir
                        edebî dönemdir.
                        `,

                        anlatim: `
                        <h3>Cumhuriyet Dönemi</h3>

                        <p>
                        Cumhuriyet'in ilanıyla birlikte toplum hayatında
                        meydana gelen değişimler edebiyata da yansımıştır.
                        </p>

                        <h3>Şiir</h3>

                        <p>
                        Cumhuriyet döneminde farklı şiir anlayışları
                        ortaya çıkmıştır. Hece ölçüsü, serbest ölçü ve
                        farklı biçimsel arayışlar kullanılmıştır.
                        </p>

                        <h3>Roman ve Hikâye</h3>

                        <p>
                        Toplum, birey, şehirleşme, modernleşme,
                        tarih ve Anadolu gibi konular çeşitli eserlerde
                        işlenmiştir.
                        </p>

                        <h3>Tiyatro</h3>

                        <p>
                        Cumhuriyet döneminde tiyatro da gelişmiş,
                        farklı toplumsal ve bireysel temalar sahneye
                        taşınmıştır.
                        `,

                        temelBilgi: [
                            "Cumhuriyet dönemi edebiyatı çok farklı anlayışları içerir.",
                            "Şiirde farklı ölçü ve biçimler kullanılmıştır.",
                            "Roman ve hikâyede toplum ve birey ilişkisi işlenmiştir.",
                            "Modernleşme ve değişim önemli temalardandır."
                        ],

                        ornekler: [
                            {
                                soru: "Cumhuriyet döneminde edebiyatın konusu yalnızca tek bir alan mıdır?",
                                cozum: "Hayır. Toplum, birey, tarih, modernleşme, Anadolu ve farklı birçok konu işlenmiştir."
                            }
                        ],

                        dikkat: `
                        Cumhuriyet Dönemi Türk edebiyatını tek bir
                        sanat anlayışıyla açıklamak doğru değildir.
                        Dönem içerisinde farklı anlayışlar gelişmiştir.
                        `,

                        ozet: `
                        Cumhuriyet dönemi Türk edebiyatı çok çeşitli
                        sanat anlayışlarının ve türlerin geliştiği
                        geniş bir dönemdir.
                        `,

                        test: [
                            {
                                soru: "Cumhuriyet Dönemi Türk edebiyatı hangi dönemde gelişmiştir?",
                                secenekler: [
                                    "Cumhuriyet'in ilanından sonra",
                                    "Osmanlı'nın kuruluşundan önce",
                                    "Antik Çağda",
                                    "Orta Çağda"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Cumhuriyet döneminde hangi tür gelişmiştir?",
                                secenekler: [
                                    "Şiir",
                                    "Roman",
                                    "Tiyatro",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Cumhuriyet dönemi eserlerinde hangi konular işlenebilir?",
                                secenekler: [
                                    "Toplum",
                                    "Birey",
                                    "Modernleşme",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Cumhuriyet dönemi şiirinde hangi ölçü kullanılabilir?",
                                secenekler: [
                                    "Hece",
                                    "Serbest",
                                    "Farklı ölçüler",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Cumhuriyet dönemi edebiyatı tek bir anlayıştan mı oluşur?",
                                secenekler: [
                                    "Evet",
                                    "Hayır",
                                    "Sadece şiirde",
                                    "Sadece romanda"
                                ],
                                cevap: 1
                            }
                        ]
                    }
                ]
            },


            matematik: {
                ad: "Matematik",
                icon: "➗",
                konular: [

                    {
                        id: "12-matematik-turev",
                        ad: "Türev",

                        giris: `
                        Türev, bir fonksiyonun değişim hızını inceleyen
                        temel matematik kavramlarından biridir.
                        `,

                        anlatim: `
                        <h3>Türev Nedir?</h3>

                        <p>
                        Bir fonksiyonun bir noktadaki anlık değişim
                        hızını ifade etmek için türev kullanılır.
                        </p>

                        <div class="kitap-formul">
                        f'(x)
                        </div>

                        <h3>Geometrik Anlam</h3>

                        <p>
                        Bir fonksiyonun grafiğinde belirli bir noktadaki
                        türev, o noktadaki teğetin eğimiyle ilişkilidir.
                        </p>

                        <h3>Temel Türev Kuralları</h3>

                        <div class="kitap-formul">
                        f(x)=x² → f'(x)=2x
                        </div>

                        <div class="kitap-formul">
                        f(x)=x³ → f'(x)=3x²
                        </div>

                        <h3>Uygulamalar</h3>

                        <p>
                        Türev; hareket, maksimum-minimum problemleri
                        ve değişim hızlarının incelenmesi gibi alanlarda
                        kullanılabilir.
                        `,

                        temelBilgi: [
                            "Türev değişim hızını ifade eder.",
                            "Türev grafikte teğetin eğimiyle ilişkilidir.",
                            "x²'nin türevi 2x'tir.",
                            "x³'ün türevi 3x²'dir.",
                            "Türev maksimum-minimum problemlerinde kullanılabilir."
                        ],

                        ornekler: [
                            {
                                soru: "f(x)=x² fonksiyonunun türevi nedir?",
                                cozum: "Kuvvet kuralına göre x²'nin türevi 2x'tir."
                            },
                            {
                                soru: "f(x)=x³ fonksiyonunun türevi nedir?",
                                cozum: "x³'ün türevi 3x²'dir."
                            }
                        ],

                        dikkat: `
                        Türev alırken kuvvet kuralında üs katsayı
                        olarak öne gelir ve üs bir azaltılır.
                        `,

                        ozet: `
                        Türev fonksiyonların değişim hızını ve
                        grafiklerdeki eğimi incelememizi sağlar.
                        `,

                        test: [
                            {
                                soru: "x²'nin türevi nedir?",
                                secenekler: [
                                    "x",
                                    "2x",
                                    "x²",
                                    "2"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "x³'ün türevi nedir?",
                                secenekler: [
                                    "3x²",
                                    "x²",
                                    "3x",
                                    "x³"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Türev neyi ifade eder?",
                                secenekler: [
                                    "Değişim hızını",
                                    "Sadece alanı",
                                    "Sadece çevreyi",
                                    "Sadece hacmi"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Türev grafikte neyle ilişkilidir?",
                                secenekler: [
                                    "Teğetin eğimi",
                                    "Renk",
                                    "Alan",
                                    "Kenar sayısı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Türev hangi problemlerde kullanılabilir?",
                                secenekler: [
                                    "Maksimum-minimum",
                                    "Değişim hızı",
                                    "Hareket",
                                    "Hepsi"
                                ],
                                cevap: 3
                            }
                        ]
                    }
                ]
            },


            fizik: {
                ad: "Fizik",
                icon: "⚛️",
                konular: [

                    {
                        id: "12-fizik-dalgalar",
                        ad: "Dalgalar",

                        giris: `
                        Dalgalar enerjinin bir ortamda veya boşlukta
                        taşınmasını sağlayan fiziksel olaylardır.
                        `,

                        anlatim: `
                        <h3>Dalga</h3>

                        <p>
                        Enerjinin bir noktadan başka bir noktaya
                        aktarılmasını sağlayan titreşim hareketlerine
                        dalga hareketi denir.
                        </p>

                        <h3>Dalga Boyu</h3>

                        <p>
                        Ardışık iki dalga tepesi veya çukuru arasındaki
                        uzaklığa dalga boyu denir.
                        </p>

                        <h3>Frekans</h3>

                        <p>
                        Birim zamanda gerçekleşen titreşim sayısına
                        frekans denir.
                        </p>

                        <div class="kitap-formul">
                        v = f × λ
                        </div>

                        <p>
                        Dalga hızı, frekans ve dalga boyu arasında
                        bu ilişki bulunur.
                        `,

                        temelBilgi: [
                            "Dalgalar enerji taşır.",
                            "Dalga boyu λ ile gösterilebilir.",
                            "Frekans birim zamandaki titreşim sayısıdır.",
                            "Dalga hızı v=f×λ ilişkisiyle ifade edilebilir."
                        ],

                        ornekler: [
                            {
                                soru: "Frekans 5 Hz, dalga boyu 2 m ise dalga hızı kaç m/s'dir?",
                                cozum: "v=f×λ=5×2=10 m/s."
                            }
                        ],

                        dikkat: `
                        Frekansın birimi Hertz (Hz), dalga boyunun
                        birimi metredir.
                        `,

                        ozet: `
                        Dalgalar enerji taşır. Dalga hızı frekans
                        ve dalga boyuyla ilişkilidir.
                        `,

                        test: [
                            {
                                soru: "Dalga ne taşır?",
                                secenekler: [
                                    "Enerji",
                                    "Sadece madde",
                                    "Sadece kütle",
                                    "Hiçbir şey"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Frekansın birimi nedir?",
                                secenekler: [
                                    "Hz",
                                    "m",
                                    "N",
                                    "J"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Dalga boyu hangi sembolle gösterilir?",
                                secenekler: [
                                    "λ",
                                    "α",
                                    "β",
                                    "θ"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Dalga hızı formülü hangisidir?",
                                secenekler: [
                                    "v=f×λ",
                                    "v=f+λ",
                                    "v=f/λ",
                                    "v=λ/f"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "f=4 Hz ve λ=3 m ise hız kaçtır?",
                                secenekler: [
                                    "7",
                                    "12",
                                    "1",
                                    "24"
                                ],
                                cevap: 1
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
                        id: "12-kimya-organik",
                        ad: "Organik Bileşikler",

                        giris: `
                        Organik kimya, başta karbon olmak üzere karbon
                        bileşiklerinin önemli bir bölümünü inceler.
                        `,

                        anlatim: `
                        <h3>Organik Kimya</h3>

                        <p>
                        Karbon temelli bileşiklerin yapılarını,
                        özelliklerini ve tepkimelerini inceleyen
                        kimya dalına organik kimya denir.
                        </p>

                        <h3>Hidrokarbonlar</h3>

                        <p>
                        Yalnızca karbon ve hidrojen içeren bileşiklere
                        hidrokarbon denir.
                        </p>

                        <h3>Alkanlar</h3>

                        <p>
                        Yalnızca tekli bağ içeren doymuş hidrokarbonlardır.
                        </p>

                        <div class="kitap-formul">
                        Alkan genel formülü: CₙH₂ₙ₊₂
                        </div>

                        <h3>Alkenler</h3>

                        <p>
                        En az bir çift bağ içeren hidrokarbonlardır.
                        </p>

                        <h3>Alkinler</h3>

                        <p>
                        En az bir üçlü bağ içeren hidrokarbonlardır.
                        `,

                        temelBilgi: [
                            "Organik kimyanın merkezinde karbon bileşikleri bulunur.",
                            "Hidrokarbonlar karbon ve hidrojenden oluşur.",
                            "Alkanlarda tekli bağlar bulunur.",
                            "Alkenlerde çift bağ bulunabilir.",
                            "Alkinlerde üçlü bağ bulunabilir."
                        ],

                        ornekler: [
                            {
                                soru: "CH₄ hangi bileşik sınıfına örnektir?",
                                cozum: "Karbon ve hidrojen içerdiği ve tekli bağ yapısına sahip olduğu için bir hidrokarbondur ve alkanlar içinde değerlendirilir."
                            }
                        ],

                        dikkat: `
                        Alkan, alken ve alkinleri bağ türlerine göre
                        ayırt etmeye dikkat et.
                        `,

                        ozet: `
                        Organik kimya karbon bileşiklerini inceler.
                        Hidrokarbonlar yalnızca karbon ve hidrojenden oluşur.
                        `,

                        test: [
                            {
                                soru: "Organik kimyanın temel elementi hangisidir?",
                                secenekler: [
                                    "Karbon",
                                    "Demir",
                                    "Altın",
                                    "Sodyum"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Hidrokarbonlar hangi elementlerden oluşur?",
                                secenekler: [
                                    "Karbon ve hidrojen",
                                    "Oksijen ve hidrojen",
                                    "Demir ve karbon",
                                    "Azot ve oksijen"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Alkenlerde hangi bağ bulunur?",
                                secenekler: [
                                    "Çift bağ",
                                    "Üçlü bağ",
                                    "Sadece iyonik bağ",
                                    "Hiç bağ yok"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Alkinlerde hangi bağ bulunur?",
                                secenekler: [
                                    "Tekli",
                                    "Çiftli",
                                    "Üçlü",
                                    "Dörtlü"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Alkanların genel formülü hangisidir?",
                                secenekler: [
                                    "CₙH₂ₙ₊₂",
                                    "CₙH₂ₙ",
                                    "CₙH₂ₙ₋₂",
                                    "CₙHₙ"
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
                        id: "12-biyoloji-ekosistem",
                        ad: "Ekosistem Ekolojisi",

                        giris: `
                        Ekosistem, canlılar ile cansız çevrelerinin
                        oluşturduğu ve birbirleriyle etkileşim içinde
                        olduğu sistemdir.
                        `,

                        anlatim: `
                        <h3>Ekosistem</h3>

                        <p>
                        Belirli bir alandaki canlılar ile cansız çevrenin
                        karşılıklı ilişkileri ekosistemi oluşturur.
                        </p>

                        <h3>Üreticiler</h3>

                        <p>
                        Kendi besinlerini üretebilen canlılara üretici
                        denir. Bitkiler önemli üreticilerdendir.
                        </p>

                        <h3>Tüketiciler</h3>

                        <p>
                        Besinlerini dışarıdan alan canlılara tüketici denir.
                        </p>

                        <h3>Ayrıştırıcılar</h3>

                        <p>
                        Ölü organizmaların ve organik maddelerin
                        parçalanmasında rol alan canlılara ayrıştırıcı denir.
                        </p>

                        <h3>Besin Zinciri</h3>

                        <p>
                        Ekosistemde enerjinin canlılar arasındaki aktarımını
                        göstermek için besin zincirlerinden yararlanılır.
                        `,

                        temelBilgi: [
                            "Ekosistem canlı ve cansız unsurlardan oluşur.",
                            "Üreticiler kendi besinlerini üretir.",
                            "Tüketiciler besinlerini dışarıdan alır.",
                            "Ayrıştırıcılar maddelerin döngüsünde önemlidir.",
                            "Enerji besin zincirleri aracılığıyla aktarılır."
                        ],

                        ornekler: [
                            {
                                soru: "Bitkiler neden üretici olarak adlandırılır?",
                                cozum: "Kendi besinlerini fotosentez gibi süreçlerle üretebildikleri için üreticidir."
                            }
                        ],

                        dikkat: `
                        Madde döngüsü ile enerji akışını birbirinden
                        ayırmak gerekir. Ekosistemde maddeler döngüsel
                        olarak yeniden kullanılabilirken enerji akışı
                        tek yönlüdür.
                        `,

                        ozet: `
                        Ekosistem canlı ve cansız unsurların
                        etkileşiminden oluşur. Üretici, tüketici ve
                        ayrıştırıcılar ekosistemin önemli bileşenleridir.
                        `,

                        test: [
                            {
                                soru: "Kendi besinini üreten canlılara ne denir?",
                                secenekler: [
                                    "Üretici",
                                    "Tüketici",
                                    "Ayrıştırıcı",
                                    "Parazit"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Besinini dışarıdan alan canlılara ne denir?",
                                secenekler: [
                                    "Üretici",
                                    "Tüketici",
                                    "Bitki",
                                    "Ürün"
                                ],
                                cevap: 1
                            },
                            {
                                soru: "Ekosistem hangi unsurlardan oluşur?",
                                secenekler: [
                                    "Canlı ve cansız",
                                    "Sadece canlı",
                                    "Sadece su",
                                    "Sadece toprak"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ayrıştırıcılar ne yapar?",
                                secenekler: [
                                    "Organik maddelerin parçalanmasına katkı sağlar",
                                    "Güneş üretir",
                                    "Su oluşturur",
                                    "Dağları oluşturur"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Besin zinciri neyi gösterir?",
                                secenekler: [
                                    "Canlılar arasındaki beslenme ve enerji aktarımını",
                                    "Sadece sıcaklığı",
                                    "Sadece nüfusu",
                                    "Sadece yağışı"
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
                        id: "12-tarih-inkilap",
                        ad: "Atatürk Dönemi ve Türk İnkılabı",

                        giris: `
                        Türkiye Cumhuriyeti'nin kuruluş süreci,
                        Mustafa Kemal Atatürk önderliğinde gerçekleştirilen
                        siyasi, sosyal, hukuki ve ekonomik dönüşümlerle
                        şekillenmiştir.
                        `,

                        anlatim: `
                        <h3>Millî Mücadele</h3>

                        <p>
                        Türk milletinin bağımsızlık mücadelesi sonucunda
                        yeni bir devletin temelleri atılmıştır.
                        </p>

                        <h3>Cumhuriyet</h3>

                        <p>
                        Cumhuriyet yönetimi halk egemenliğini esas alan
                        yönetim biçimidir.
                        </p>

                        <h3>İnkılaplar</h3>

                        <p>
                        Cumhuriyet döneminde eğitim, hukuk, toplum,
                        ekonomi ve yönetim alanlarında çeşitli
                        düzenlemeler gerçekleştirilmiştir.
                        </p>

                        <h3>Atatürk İlkeleri</h3>

                        <p>
                        Cumhuriyetçilik, milliyetçilik, halkçılık,
                        devletçilik, laiklik ve inkılapçılık temel
                        ilkeler arasında yer alır.
                        `,

                        temelBilgi: [
                            "Millî Mücadele bağımsızlık amacı taşımıştır.",
                            "Cumhuriyet halk egemenliğini esas alır.",
                            "Atatürk döneminde birçok alanda inkılap yapılmıştır.",
                            "Altı temel Atatürk ilkesi vardır."
                        ],

                        ornekler: [
                            {
                                soru: "Atatürk'ün temel ilkelerinden biri nedir?",
                                cozum: "Cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik, laiklik ve inkılapçılık temel ilkeler arasındadır."
                            }
                        ],

                        dikkat: `
                        İnkılapları yalnızca isimleriyle ezberlemek
                        yerine hangi ihtiyaca cevap verdiklerini
                        anlamaya çalış.
                        `,

                        ozet: `
                        Cumhuriyet'in kuruluşuyla birlikte Türkiye'de
                        birçok alanda köklü değişiklikler gerçekleştirilmiştir.
                        `,

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi Atatürk ilkelerindendir?",
                                secenekler: [
                                    "Cumhuriyetçilik",
                                    "Feodalizm",
                                    "Sömürgecilik",
                                    "Mutlakiyetçilik"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Cumhuriyet neyi esas alır?",
                                secenekler: [
                                    "Halk egemenliğini",
                                    "Tek kişinin yönetimini",
                                    "Sömürgeyi",
                                    "Krallığı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Atatürk döneminde hangi alanlarda inkılap yapılmıştır?",
                                secenekler: [
                                    "Eğitim",
                                    "Hukuk",
                                    "Toplum",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Aşağıdakilerden hangisi Atatürk ilkelerinden biri değildir?",
                                secenekler: [
                                    "Laiklik",
                                    "Devletçilik",
                                    "Halkçılık",
                                    "Sömürgecilik"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Millî Mücadele'nin temel amaçlarından biri nedir?",
                                secenekler: [
                                    "Bağımsızlık",
                                    "Sömürgecilik",
                                    "Monarşi",
                                    "İşgal"
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
                        id: "12-cografya-kuresellesme",
                        ad: "Küresel Ortam ve Küresel Etkileşim",

                        giris: `
                        Dünya üzerindeki ülkeler ekonomik, siyasi,
                        kültürel ve teknolojik ilişkiler sayesinde
                        birbirleriyle giderek daha fazla etkileşim
                        hâline gelmektedir.
                        `,

                        anlatim: `
                        <h3>Küreselleşme</h3>

                        <p>
                        Ülkeler ve toplumlar arasındaki ekonomik,
                        kültürel ve teknolojik ilişkilerin artmasına
                        küreselleşme denir.
                        </p>

                        <h3>Ulaşım</h3>

                        <p>
                        Ulaşım ağlarının gelişmesi ülkeler arasındaki
                        mal, insan ve bilgi hareketlerini hızlandırır.
                        </p>

                        <h3>İletişim</h3>

                        <p>
                        İnternet ve dijital teknolojiler küresel
                        iletişimin hızını büyük ölçüde artırmıştır.
                        </p>

                        <h3>Ekonomik Etkileşim</h3>

                        <p>
                        Ticaret, üretim ve finansal ilişkiler ülkelerin
                        birbirlerine ekonomik açıdan bağlanmasına
                        neden olabilir.
                        `,

                        temelBilgi: [
                            "Küreselleşme ülkeler arasındaki etkileşimi artırır.",
                            "Ulaşım küresel bağlantıları güçlendirir.",
                            "İletişim teknolojileri bilgi akışını hızlandırır.",
                            "Ticaret ülkeler arasındaki ekonomik ilişkileri artırır."
                        ],

                        ornekler: [
                            {
                                soru: "İnternet küreselleşmeyi nasıl etkiler?",
                                cozum: "Bilginin ülkeler arasında hızlı biçimde paylaşılmasını sağlayarak küresel etkileşimi artırır."
                            }
                        ],

                        dikkat: `
                        Küreselleşmenin yalnızca ekonomik değil,
                        kültürel, sosyal, teknolojik ve siyasi boyutları
                        da vardır.
                        `,

                        ozet: `
                        Teknoloji, ulaşım, iletişim ve ticaret
                        ülkeler arasındaki küresel etkileşimi artırmaktadır.
                        `,

                        test: [
                            {
                                soru: "Küreselleşme neyi artırır?",
                                secenekler: [
                                    "Ülkeler arası etkileşimi",
                                    "İzolasyonu",
                                    "İletişimsizliği",
                                    "Ulaşımsızlığı"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "İnternet küreselleşmeyi nasıl etkiler?",
                                secenekler: [
                                    "Bilgi akışını hızlandırır",
                                    "İletişimi keser",
                                    "Ulaşımı durdurur",
                                    "Ticareti yok eder"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Aşağıdakilerden hangisi küreselleşme boyutudur?",
                                secenekler: [
                                    "Ekonomik",
                                    "Kültürel",
                                    "Teknolojik",
                                    "Hepsi"
                                ],
                                cevap: 3
                            },
                            {
                                soru: "Ulaşımın gelişmesi neyi kolaylaştırır?",
                                secenekler: [
                                    "İnsan ve mal hareketlerini",
                                    "İletişimsizliği",
                                    "İzolasyonu",
                                    "Bilgisizliği"
                                ],
                                cevap: 0
                            },
                            {
                                soru: "Ticaret hangi ilişkiyi güçlendirir?",
                                secenekler: [
                                    "Ekonomik",
                                    "Sadece biyolojik",
                                    "Sadece astronomik",
                                    "Hiçbir"
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


/* =========================================================
   VERİ KONTROLÜ
   ========================================================= */

(function () {
    "use strict";

    const data = window.kitaplikData;

    if (!data) {
        console.error(
            "DersTakip Kitaplık: kitaplikData bulunamadı."
        );
        return;
    }

    let sinifSayisi = 0;
    let dersSayisi = 0;
    let konuSayisi = 0;

    Object.keys(data).forEach(function (sinifKey) {

        sinifSayisi++;

        const sinif = data[sinifKey];

        if (!sinif || !sinif.dersler) {
            return;
        }

        Object.keys(sinif.dersler).forEach(function (dersKey) {

            dersSayisi++;

            const ders = sinif.dersler[dersKey];

            if (
                ders &&
                Array.isArray(ders.konular)
            ) {
                konuSayisi += ders.konular.length;
            }

        });

    });

    console.log(
        "📚 DersTakip Kitaplık yüklendi:",
        {
            sinif: sinifSayisi,
            ders: dersSayisi,
            konu: konuSayisi
        }
    );

})();
