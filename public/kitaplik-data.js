/* =========================================================
   DERS TAKİP — KİTAPLIK VERİLERİ
   ========================================================= */

window.kitaplikData = {

    "5": {
        ad: "5. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",

                konular: [

                    {
                        id: "5-matematik-dogal-sayilar",
                        ad: "Doğal Sayılar",

                        giris: `
                            Doğal sayılar, günlük hayatta sayma,
                            sıralama ve miktar belirtme amacıyla
                            kullandığımız sayılardır.
                        `,

                        anlatim: `

                            <h3>📖 Doğal Sayılar Nedir?</h3>

                            <p>
                                Doğal sayılar 0'dan başlayarak
                                sonsuza kadar devam eden sayılardır.
                            </p>

                            <div class="kitap-formul">
                                0, 1, 2, 3, 4, 5, 6, 7, 8, ...
                            </div>

                            <p>
                                Günlük yaşamda öğrencilerin sayıları
                                sayması, kitapların numaralandırılması,
                                sınıftaki öğrenci sayısının belirtilmesi
                                gibi birçok durumda doğal sayılardan
                                yararlanılır.
                            </p>

                            <h3>🔢 Rakam ve Sayı</h3>

                            <p>
                                Sayıları yazmak için kullandığımız
                                sembollere rakam denir.
                            </p>

                            <p>
                                0'dan 9'a kadar toplam 10 rakam vardır:
                            </p>

                            <div class="kitap-formul">
                                0 1 2 3 4 5 6 7 8 9
                            </div>

                            <p>
                                Bu rakamlar kullanılarak çok basamaklı
                                sayılar oluşturabiliriz.
                            </p>

                            <h3>📊 Basamaklar</h3>

                            <p>
                                Bir sayıyı oluşturan rakamların
                                bulunduğu yerlere basamak denir.
                            </p>

                            <div class="kitap-ornek">

                                Örneğin:

                                5 482

                                5 → Binler basamağı
                                4 → Yüzler basamağı
                                8 → Onlar basamağı
                                2 → Birler basamağı

                            </div>

                            <h3>💡 Basamak Değeri</h3>

                            <p>
                                Bir rakamın bulunduğu basamağa göre
                                aldığı değere basamak değeri denir.
                            </p>

                            <div class="kitap-ornek">

                                5 482 sayısında:

                                5'in basamak değeri = 5000

                                4'ün basamak değeri = 400

                                8'in basamak değeri = 80

                                2'nin basamak değeri = 2

                            </div>

                            <h3>🧩 Çözümlü Örnek</h3>

                            <p>
                                7 326 sayısında 3 rakamının
                                basamak değeri kaçtır?
                            </p>

                            <p>
                                3 rakamı yüzler basamağındadır.
                            </p>

                            <div class="kitap-formul">
                                3 × 100 = 300
                            </div>

                            <p>
                                Cevap: <strong>300</strong>
                            </p>

                        `,

                        temelBilgi: [

                            "Doğal sayılar 0'dan başlayarak sonsuza kadar devam eder.",

                            "0'dan 9'a kadar olan sembollere rakam denir.",

                            "Bir rakamın bulunduğu yere basamak denir.",

                            "Rakamın bulunduğu basamağa göre aldığı değere basamak değeri denir."

                        ],

                        dikkat: `
                            Rakam değeri ile basamak değerini
                            birbirine karıştırmamaya dikkat et.
                            Örneğin 4 582 sayısındaki 5'in rakam
                            değeri 5, basamak değeri ise 500'dür.
                        `,

                        ozet: `
                            Doğal sayılar 0'dan başlayarak sonsuza
                            kadar devam eder. Sayıları oluşturmak
                            için 0-9 arasındaki rakamları kullanırız.
                            Bir rakamın değeri bulunduğu basamağa
                            göre değişebilir.
                        `,

                        ornekler: [

                            {
                                soru:
                                    "6 425 sayısında 4 rakamının basamak değeri kaçtır?",

                                cozum:
                                    "4 yüzler basamağındadır. Bu nedenle basamak değeri 4 × 100 = 400 olur."
                            },

                            {
                                soru:
                                    "8 205 sayısında 8 rakamının basamak değeri kaçtır?",

                                cozum:
                                    "8 binler basamağındadır. 8 × 1000 = 8000 olur."
                            },

                            {
                                soru:
                                    "3 741 sayısında 7 hangi basamaktadır?",

                                cozum:
                                    "7 yüzler basamağındadır."
                            }

                        ],

                        test: [

                            {
                                soru:
                                    "6 425 sayısında 4 rakamının basamak değeri kaçtır?",

                                secenekler: [
                                    "4",
                                    "40",
                                    "400",
                                    "4000"
                                ],

                                cevap: 2
                            },

                            {
                                soru:
                                    "Aşağıdakilerden hangisi doğal sayıdır?",

                                secenekler: [
                                    "-3",
                                    "2,5",
                                    "8",
                                    "1/2"
                                ],

                                cevap: 2
                            },

                            {
                                soru:
                                    "5 482 sayısında 8'in basamak değeri kaçtır?",

                                secenekler: [
                                    "8",
                                    "80",
                                    "800",
                                    "8000"
                                ],

                                cevap: 1
                            }

                        ]

                    }

                ]

            }

        }

    }

};
