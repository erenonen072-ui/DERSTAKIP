/* =========================================================
   DERSCEP - TÜM SINIFLAR NOT VERİTABANI
   2026-2027 MEB PROGRAMLARINA GÖRE YAPILANDIRILMIŞTIR

   Yapı:
   Sınıf
      └── Ders
           └── Ünite / Tema
                └── Konu
                     ├── konu
                     ├── ozet
                     ├── onemli
                     ├── formuller
                     ├── ornekler
                     └── sinav
========================================================= */

const notes = {

    /* =====================================================
       5. SINIF
    ===================================================== */

    "5": {

        "Türkçe": {

            "Tema 1": {

                "Konu: Okuma ve Anlama": {

                    konu: `
                        <h2>Okuma ve Anlama</h2>

                        <p>
                        Okuma, yazılı bir metindeki bilgileri anlamlandırma
                        ve metinden çıkarımlar yapma sürecidir.
                        </p>

                        <h3>📖 Metni Anlama</h3>

                        <p>
                        Bir metni doğru anlamak için metnin konusu,
                        ana fikri, yardımcı fikirleri ve önemli
                        ayrıntıları belirlenmelidir.
                        </p>
                    `,

                    ozet:
                        "Metni anlamak için konu, ana fikir ve yardımcı fikirler belirlenir.",

                    onemli: [
                        "Konu, metinde üzerinde durulan temel unsurdur.",
                        "Ana fikir, yazarın vermek istediği temel mesajdır.",
                        "Yardımcı fikirler ana fikri destekler."
                    ],

                    formuller: [],

                    ornekler: [
                        {
                            soru: "Bir metnin ana düşüncesi nasıl bulunur?",
                            cevap: "Yazarın okuyucuya vermek istediği temel mesaj belirlenir."
                        }
                    ],

                    sinav: [
                        "Ana fikir ile konuyu birbirine karıştırma.",
                        "Metindeki yardımcı düşüncelere dikkat et."
                    ]
                }
            }
        },


        "Matematik": {

            "Tema 1 - Sayılar": {

                "Doğal Sayılar": {

                    konu: `
                        <h2>Doğal Sayılar</h2>

                        <p>
                        Doğal sayılar 0'dan başlayarak sonsuza kadar
                        devam eden sayılardır.
                        </p>

                        <p>
                        Örnek:
                        <strong>0, 1, 2, 3, 4, 5, ...</strong>
                        </p>
                    `,

                    ozet:
                        "Doğal sayılar 0 ve pozitif tam sayılardan oluşur.",

                    onemli: [
                        "En küçük doğal sayı 0'dır.",
                        "Doğal sayılar sonsuzdur.",
                        "Doğal sayılar N sembolüyle gösterilebilir."
                    ],

                    formuller: [],

                    ornekler: [
                        {
                            soru: "15 sayısından sonra gelen doğal sayı nedir?",
                            cevap: "16"
                        }
                    ],

                    sinav: [
                        "Doğal sayılar ile tam sayıları karıştırma."
                    ]
                }
            }
        },


        "Fen Bilimleri": {

            "Dünya, Güneş, Ay": {

                "Güneş ve Ay": {

                    konu: `
                        <h2>Güneş ve Ay</h2>

                        <p>
                        Güneş bir yıldızdır ve Dünya'nın temel enerji
                        kaynağıdır.
                        </p>

                        <p>
                        Ay ise Dünya'nın doğal uydusudur.
                        </p>
                    `,

                    ozet:
                        "Güneş bir yıldız, Ay ise Dünya'nın doğal uydusudur.",

                    onemli: [
                        "Güneş kendi ışığını üretir.",
                        "Ay ışık kaynağı değildir; Güneş'ten aldığı ışığı yansıtır.",
                        "Ay Dünya'nın etrafında dolanır."
                    ],

                    formuller: [],

                    ornekler: [],

                    sinav: [
                        "Ay'ın neden parlak göründüğünü bil."
                    ]
                }
            }
        }
    },


    /* =====================================================
       6. SINIF
    ===================================================== */

    "6": {

        "Matematik": {

            "Sayılar ve Nicelikler": {

                "Doğal Sayılarla İşlemler": {

                    konu: `
                        <h2>Doğal Sayılarla İşlemler</h2>

                        <p>
                        Doğal sayılarla toplama, çıkarma, çarpma ve
                        bölme işlemleri yapılabilir.
                        </p>
                    `,

                    ozet:
                        "Doğal sayılarla dört temel işlem yapılır.",

                    onemli: [
                        "İşlem önceliğine dikkat edilmelidir.",
                        "Parantez içindeki işlemler önce yapılır."
                    ],

                    formuller: [],

                    ornekler: [
                        {
                            soru: "5 + 3 × 2 işleminin sonucu kaçtır?",
                            cevap: "11"
                        }
                    ],

                    sinav: [
                        "İşlem önceliğine dikkat et."
                    ]
                }
            }
        }
    },


    /* =====================================================
       7. SINIF
    ===================================================== */

    "7": {

        "Matematik": {

            "Tam Sayılar": {

                "Tam Sayılarla İşlemler": {

                    konu: `
                        <h2>Tam Sayılarla İşlemler</h2>

                        <p>
                        Tam sayılar negatif sayıları, sıfırı ve pozitif
                        sayıları kapsar.
                        </p>

                        <p>
                        Örnek:
                        ... -3, -2, -1, 0, 1, 2, 3 ...
                        </p>
                    `,

                    ozet:
                        "Tam sayılar negatif ve pozitif sayılar ile sıfırdan oluşur.",

                    onemli: [
                        "Negatif sayılar sıfırın solundadır.",
                        "Pozitif sayılar sıfırın sağındadır."
                    ],

                    formuller: [],

                    ornekler: [
                        {
                            soru: "-3 + 5 kaçtır?",
                            cevap: "2"
                        }
                    ],

                    sinav: []
                }
            }
        }
    },


    /* =====================================================
       8. SINIF
    ===================================================== */

    "8": {

        "Matematik": {

            "Çarpanlar ve Katlar": {

                "Asal Sayılar": {

                    konu: `
                        <h2>Asal Sayılar</h2>

                        <p>
                        1'den büyük ve yalnızca 1 ile kendisine
                        bölünebilen doğal sayılara asal sayı denir.
                        </p>

                        <p>
                        Örnek asal sayılar:
                        2, 3, 5, 7, 11, 13...
                        </p>
                    `,

                    ozet:
                        "Asal sayıların yalnızca iki pozitif böleni vardır.",

                    onemli: [
                        "2 en küçük asal sayıdır.",
                        "2 tek çift asal sayıdır.",
                        "1 asal sayı değildir."
                    ],

                    formuller: [],

                    ornekler: [
                        {
                            soru: "17 asal mıdır?",
                            cevap: "Evet. 1 ve 17 dışında pozitif böleni yoktur."
                        }
                    ],

                    sinav: [
                        "1'in asal olmadığını unutma.",
                        "2'nin tek çift asal sayı olduğunu bil."
                    ]
                }
            }
        }
    },


    /* =====================================================
       9. SINIF - TÜRKİYE YÜZYILI MAARİF MODELİ
    ===================================================== */

    "9": {

        "Matematik": {

            "Sayılar": {

                "Gerçek Sayılar": {

                    konu: `
                        <h2>Gerçek Sayılar</h2>

                        <p>
                        Gerçek sayılar, sayı doğrusunda gösterilebilen
                        tüm sayıları kapsayan sayı kümesidir.
                        </p>

                        <h3>Gerçek sayıların içerisinde:</h3>

                        <ul>
                            <li>Doğal sayılar</li>
                            <li>Tam sayılar</li>
                            <li>Rasyonel sayılar</li>
                            <li>İrrasyonel sayılar</li>
                        </ul>

                        <h3>📌 Rasyonel Sayılar</h3>

                        <p>
                        a ve b tam sayı olmak üzere b ≠ 0 şartıyla
                        a / b biçiminde yazılabilen sayılara
                        rasyonel sayı denir.
                        </p>
                    `,

                    ozet:
                        "Gerçek sayılar rasyonel ve irrasyonel sayıların tamamını kapsar.",

                    onemli: [
                        "Her doğal sayı aynı zamanda tam sayıdır.",
                        "Her tam sayı rasyoneldir.",
                        "Her rasyonel sayı gerçek sayıdır.",
                        "İrrasyonel sayılar kesir biçiminde tam olarak ifade edilemez."
                    ],

                    formuller: [
                        "a / b, b ≠ 0 → Rasyonel sayı",
                        "Gerçek sayılar = Rasyonel ∪ İrrasyonel"
                    ],

                    ornekler: [
                        {
                            soru: "√2 rasyonel midir?",
                            cevap: "Hayır. √2 irrasyonel bir sayıdır."
                        },
                        {
                            soru: "5/2 rasyonel midir?",
                            cevap: "Evet."
                        }
                    ],

                    sinav: [
                        "Rasyonel ve irrasyonel sayıların farkını bil.",
                        "√2, √3 ve π gibi sayılara dikkat et."
                    ]
                }
            },


            "Nicelikler ve Değişimler": {

                "Birinci Dereceden Denklemler": {

                    konu: `
                        <h2>Birinci Dereceden Denklemler</h2>

                        <p>
                        İçerisinde bilinmeyen bulunan ve eşitlik
                        içeren ifadelere denklem denir.
                        </p>

                        <p>
                        Örnek:
                        <strong>2x + 4 = 10</strong>
                        </p>

                        <p>
                        Her iki taraftan 4 çıkarılır:
                        <strong>2x = 6</strong>
                        </p>

                        <p>
                        İki tarafa 2'ye bölünür:
                        <strong>x = 3</strong>
                        </p>
                    `,

                    ozet:
                        "Denklem çözümünde eşitliğin iki tarafına aynı işlem uygulanır.",

                    onemli: [
                        "Eşitliğin dengesi korunmalıdır.",
                        "Bilinmeyen yalnız bırakılır."
                    ],

                    formuller: [
                        "ax + b = c → x = (c-b)/a"
                    ],

                    ornekler: [
                        {
                            soru: "3x + 6 = 15 ise x kaçtır?",
                            cevap: "x = 3"
                        }
                    ],

                    sinav: [
                        "İşaret değiştirirken yapılan işlemi kontrol et."
                    ]
                }
            }
        },


        "Fizik": {

            "Kuvvet ve Hareket": {

                "Hareket": {

                    konu: `
                        <h2>Hareket</h2>

                        <p>
                        Bir cismin seçilen referans noktasına göre
                        zaman içerisinde konum değiştirmesine hareket denir.
                        </p>
                    `,

                    ozet:
                        "Hareket, cismin konumunun zamana göre değişmesidir.",

                    onemli: [
                        "Hareket görecelidir.",
                        "Referans noktası önemlidir."
                    ],

                    formuller: [
                        "Sürat = Alınan Yol / Zaman"
                    ],

                    ornekler: [
                        {
                            soru: "100 metre yolu 20 saniyede alan aracın sürati nedir?",
                            cevap: "5 m/s"
                        }
                    ],

                    sinav: [
                        "Sürat formülünü bil."
                    ]
                }
            }
        },


        "Kimya": {

            "Etkileşim": {

                "Atom ve Periyodik Sistem": {

                    konu: `
                        <h2>Atom</h2>

                        <p>
                        Atom, maddenin temel yapı taşlarından biridir.
                        </p>

                        <p>
                        Atom; proton, nötron ve elektronlardan oluşur.
                        </p>
                    `,

                    ozet:
                        "Atomun temel tanecikleri proton, nötron ve elektrondur.",

                    onemli: [
                        "Proton pozitif yüklüdür.",
                        "Elektron negatif yüklüdür.",
                        "Nötron yüksüzdür."
                    ],

                    formuller: [],

                    ornekler: [],

                    sinav: []
                }
            }
        },


        "Biyoloji": {

            "Yaşam": {

                "Canlıların Ortak Özellikleri": {

                    konu: `
                        <h2>Canlıların Ortak Özellikleri</h2>

                        <p>
                        Canlılar beslenme, solunum, boşaltım, büyüme,
                        gelişme ve üreme gibi ortak özelliklere sahiptir.
                        </p>
                    `,

                    ozet:
                        "Canlıların yaşamlarını sürdürebilmeleri için çeşitli ortak özellikleri vardır.",

                    onemli: [
                        "Beslenme",
                        "Solunum",
                        "Boşaltım",
                        "Büyüme ve gelişme",
                        "Üreme"
                    ],

                    formuller: [],

                    ornekler: [],

                    sinav: []
                }
            }
        }
    },


    /* =====================================================
       10. SINIF
    ===================================================== */

    "10": {

        "Matematik": {

            "Sayılar": {

                "Fonksiyonlar": {

                    konu: `
                        <h2>Fonksiyonlar</h2>

                        <p>
                        Bir kümenin her elemanını başka bir kümenin
                        yalnızca bir elemanına eşleyen bağıntıya
                        fonksiyon denir.
                        </p>
                    `,

                    ozet:
                        "Fonksiyon, tanım kümesindeki her elemanı değer kümesinde yalnızca bir elemana eşler.",

                    onemli: [
                        "Tanım kümesindeki her elemanın bir görüntüsü olmalıdır.",
                        "Bir elemanın iki farklı görüntüsü olamaz."
                    ],

                    formuller: [
                        "f(x) = ax + b"
                    ],

                    ornekler: [],

                    sinav: []
                }
            }
        }
    },


    /* =====================================================
       11. SINIF
    ===================================================== */

    "11": {

        "Matematik": {

            "Sayılar": {

                "Trigonometri": {

                    konu: `
                        <h2>Trigonometri</h2>

                        <p>
                        Trigonometri, üçgenlerin kenarları ve açıları
                        arasındaki ilişkileri inceleyen matematik dalıdır.
                        </p>

                        <h3>Temel oranlar</h3>

                        <ul>
                            <li>sinüs</li>
                            <li>kosinüs</li>
                            <li>tanjant</li>
                            <li>kotanjant</li>
                        </ul>
                    `,

                    ozet:
                        "Trigonometri açı ve kenarlar arasındaki ilişkileri inceler.",

                    onemli: [
                        "sinüs karşı / hipotenüs",
                        "kosinüs komşu / hipotenüs",
                        "tanjant karşı / komşu"
                    ],

                    formuller: [
                        "sin α = karşı / hipotenüs",
                        "cos α = komşu / hipotenüs",
                        "tan α = karşı / komşu"
                    ],

                    ornekler: [],

                    sinav: []
                }
            }
        }
    },


    /* =====================================================
       12. SINIF
    ===================================================== */

    "12": {

        "Matematik": {

            "Limit ve Süreklilik": {

                "Limit": {

                    konu: `
                        <h2>Limit</h2>

                        <p>
                        Bir fonksiyonun değişkeni belirli bir değere
                        yaklaşırken fonksiyon değerinin yaklaştığı
                        değere limit denir.
                        </p>
                    `,

                    ozet:
                        "Limit, fonksiyonun belirli bir noktaya yaklaşırken aldığı değeri inceler.",

                    onemli: [
                        "Limit yaklaşma davranışını inceler.",
                        "Fonksiyonun o noktadaki değeri limitten farklı olabilir."
                    ],

                    formuller: [],

                    ornekler: [],

                    sinav: []
                }
            }
        }
    }

};


/* =========================================================
   DERSCEP YARDIMCI FONKSİYONLARI
========================================================= */

function getGrades() {
    return Object.keys(notes);
}

function getSubjects(grade) {
    if (!notes[grade]) return [];
    return Object.keys(notes[grade]);
}

function getUnits(grade, subject) {
    if (!notes[grade]?.[subject]) return [];
    return Object.keys(notes[grade][subject]);
}

function getTopics(grade, subject, unit) {
    if (!notes[grade]?.[subject]?.[unit]) return [];
    return Object.keys(notes[grade][subject][unit]);
}

function getNote(grade, subject, unit, topic) {

    return notes?.[grade]?.[subject]?.[unit]?.[topic] || null;

}


/* =========================================================
   TÜM NOTLARDA ARAMA
========================================================= */

function searchNotes(query) {

    query = query
        .toLocaleLowerCase("tr-TR")
        .trim();

    if (!query) return [];

    const results = [];

    for (const grade of Object.keys(notes)) {

        for (const subject of Object.keys(notes[grade])) {

            for (const unit of Object.keys(notes[grade][subject])) {

                for (const topic of Object.keys(notes[grade][subject][unit])) {

                    const note =
                        notes[grade][subject][unit][topic];

                    const searchable = [
                        subject,
                        unit,
                        topic,
                        note.konu || "",
                        note.ozet || "",
                        ...(note.onemli || [])
                    ]
                    .join(" ")
                    .toLocaleLowerCase("tr-TR");

                    if (searchable.includes(query)) {

                        results.push({
                            grade,
                            subject,
                            unit,
                            topic,
                            note
                        });

                    }
                }
            }
        }
    }

    return results;
}


/* =========================================================
   İSTATİSTİK
========================================================= */

function getNoteStatistics() {

    let subjects = 0;
    let units = 0;
    let topics = 0;

    for (const grade of Object.keys(notes)) {

        subjects += Object.keys(notes[grade]).length;

        for (const subject of Object.keys(notes[grade])) {

            units += Object.keys(notes[grade][subject]).length;

            for (const unit of Object.keys(notes[grade][subject])) {

                topics +=
                    Object.keys(notes[grade][subject][unit]).length;

            }
        }
    }

    return {
        grades: Object.keys(notes).length,
        subjects,
        units,
        topics
    };
}


/* =========================================================
   GLOBAL ERİŞİM
========================================================= */

window.DersCepNotes = notes;
window.getGrades = getGrades;
window.getSubjects = getSubjects;
window.getUnits = getUnits;
window.getTopics = getTopics;
window.getNote = getNote;
window.searchNotes = searchNotes;
window.getNoteStatistics = getNoteStatistics;
