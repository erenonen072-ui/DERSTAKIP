/* =========================================================
   DERS TAKİP - KİTAPLIK MODÜLÜ
   ========================================================= */

const kitaplikData = {

    "5": {
        ad: "5. Sınıf",

        dersler: {

            matematik: {
                ad: "Matematik",
                icon: "📐",

                konular: [

                    {
                        id: "5-mat-dogal-sayilar",
                        ad: "Doğal Sayılar",

                        giris:
                            "Doğal sayılar, günlük hayatta sayma ve sıralama amacıyla kullandığımız sayılardır.",

                        anlatim:
                            "Doğal sayılar 0'dan başlayarak sonsuza kadar devam eden sayılardır. 0, 1, 2, 3, 4, 5 şeklinde ilerler. Bir doğal sayının basamaklarının bulunduğu yere göre farklı bir değeri olabilir.",

                        temel:
                            "Bir sayının basamak değeri, rakamın bulunduğu basamağa göre aldığı değerdir. Örneğin 4 582 sayısında 5 yüzler basamağındadır ve basamak değeri 500'dür.",

                        ornekSoru:
                            "3 724 sayısında 7 rakamının basamak değeri kaçtır?",

                        ornekCozum:
                            "7 rakamı yüzler basamağındadır. Bu nedenle 7 × 100 = 700 olur. Cevap: 700.",

                        dikkat:
                            "Rakam ile sayıyı karıştırmamaya dikkat et. Rakamlar 0 ile 9 arasındaki sembollerdir.",

                        ozet:
                            "Doğal sayılar 0'dan başlayarak sonsuza kadar devam eder. Basamak değeri, rakamın bulunduğu basamağa göre belirlenir.",

                        test: [
                            {
                                soru: "5 236 sayısında 2'nin basamak değeri kaçtır?",
                                secenekler: [
                                    "2",
                                    "20",
                                    "200",
                                    "2000"
                                ],
                                cevap: 2
                            },
                            {
                                soru: "Aşağıdakilerden hangisi doğal sayıdır?",
                                secenekler: [
                                    "-3",
                                    "4,5",
                                    "12",
                                    "-1,2"
                                ],
                                cevap: 2
                            }
                        ]
                    },

                    {
                        id: "5-mat-kesirler",
                        ad: "Kesirler",

                        giris:
                            "Kesirler, bir bütünün eş parçalarından kaç tanesinin alındığını ifade etmek için kullanılır.",

                        anlatim:
                            "Bir kesir iki bölümden oluşur. Üstte bulunan sayı pay, altta bulunan sayı paydadır. Örneğin 3/5 kesrinde 3 pay, 5 ise paydadır.",

                        temel:
                            "Payda bütünün kaç eş parçaya ayrıldığını, pay ise bu parçalardan kaç tanesinin alındığını gösterir.",

                        ornekSoru:
                            "Bir pizzanın 8 eş parçasından 3 tanesi yenirse geriye pizzanın kaçta kaçı kalır?",

                        ornekCozum:
                            "Başlangıçta 8/8 pizza vardır. 3/8'i yenmiştir. 8/8 - 3/8 = 5/8 kalır.",

                        dikkat:
                            "Payda 0 olamaz. Çünkü bir bütünü sıfır parçaya ayırmak matematiksel olarak mümkün değildir.",

                        ozet:
                            "Kesirlerde pay alınan parça sayısını, payda ise bütünün kaç eş parçaya ayrıldığını gösterir.",

                        test: [
                            {
                                soru: "4/7 kesrinde pay hangisidir?",
                                secenekler: [
                                    "4",
                                    "7",
                                    "11",
                                    "3"
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
                        id: "5-tur-cumle",
                        ad: "Cümle Bilgisi",

                        giris:
                            "Cümle, bir düşünceyi, duyguyu, isteği veya yargıyı anlatan anlamlı söz grubudur.",

                        anlatim:
                            "Cümleler anlamlarına ve yapılarına göre farklı özellikler gösterebilir. Bir cümlenin temel amacı okuyucuya veya dinleyiciye anlamlı bir mesaj iletmektir.",

                        temel:
                            "Bir cümlenin anlamlı ve kurallı olması, anlatılmak istenen düşüncenin daha kolay anlaşılmasını sağlar.",

                        ornekSoru:
                            "Aşağıdaki ifadelerden hangisi anlamlı bir cümledir?",

                        ornekCozum:
                            "Kelimelerin anlamlı bir bütün oluşturduğu ifade doğru cümledir.",

                        dikkat:
                            "Kelimelerin tek tek anlamlı olması, her zaman cümlenin anlamlı olduğu anlamına gelmez.",

                        ozet:
                            "Cümleler bir düşünce veya yargıyı anlatır ve anlamlı bir bütün oluşturur.",

                        test: [
                            {
                                soru: "Aşağıdakilerden hangisi bir cümledir?",
                                secenekler: [
                                    "Güzel bir",
                                    "Bugün hava çok güzel.",
                                    "Kitabın kapağı",
                                    "Mavi kalem"
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
                        id: "5-fen-dunya",
                        ad: "Dünya ve Evren",

                        giris:
                            "Dünya, Güneş Sistemi içerisinde yer alan ve üzerinde yaşam bulunan bir gezegendir.",

                        anlatim:
                            "Dünya kendi ekseni etrafında dönerek gece ve gündüzün oluşmasını sağlar. Güneş etrafındaki hareketi ise bir yılın oluşmasında etkilidir.",

                        temel:
                            "Dünya'nın kendi ekseni etrafındaki hareketine dönme, Güneş etrafındaki hareketine dolanma hareketi denir.",

                        ornekSoru:
                            "Gece ve gündüzün oluşmasının temel nedeni nedir?",

                        ornekCozum:
                            "Dünya'nın kendi ekseni etrafında dönmesidir.",

                        dikkat:
                            "Mevsimlerin oluşumunu yalnızca Dünya'nın Güneş'e olan uzaklığıyla açıklamak doğru değildir.",

                        ozet:
                            "Dünya kendi ekseni etrafında döner ve Güneş etrafında dolanır.",

                        test: [
                            {
                                soru: "Gece ve gündüz hangi hareket sonucunda oluşur?",
                                secenekler: [
                                    "Dolanma",
                                    "Dönme",
                                    "Titreşim",
                                    "Sallanma"
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
                konular: []
            },

            ingilizce: {
                ad: "İngilizce",
                icon: "🇬🇧",
                konular: []
            },

            din: {
                ad: "Din Kültürü",
                icon: "🕌",
                konular: []
            }

        }
    },

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


/* =========================================================
   STATE
   ========================================================= */

let selectedGrade = null;
let selectedSubject = null;
let selectedTopic = null;


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "dersTakip_kitaplik_progress";

const FAVORITE_KEY = "dersTakip_kitaplik_favorites";


function getProgress() {

    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || {};

    } catch {

        return {};
    }
}


function saveProgress(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


function getFavorites() {

    try {
        return JSON.parse(
            localStorage.getItem(FAVORITE_KEY)
        ) || [];

    } catch {

        return [];
    }
}


function saveFavorites(data) {

    localStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(data)
    );
}


function isCompleted(id) {

    const progress = getProgress();

    return !!progress[id];
}


function isFavorite(id) {

    return getFavorites().includes(id);
}


/* =========================================================
   APP
   ========================================================= */

const app = document.getElementById("ktApp");


function renderHome() {

    selectedGrade = null;
    selectedSubject = null;
    selectedTopic = null;

    app.innerHTML = `

        <div class="kt-section-title">
            <h2>🎓 Sınıfını seç</h2>

            <span>
                5. sınıftan 12. sınıfa
            </span>
        </div>

        <div class="kt-grade-grid">

            ${Object.entries(kitaplikData)
                .map(([key, grade]) => `

                    <button
                        class="kt-grade"
                        onclick="selectGrade('${key}')"
                    >

                        <div class="kt-grade-icon">
                            ${getGradeIcon(key)}
                        </div>

                        <strong>
                            ${grade.ad}
                        </strong>

                        <small>
                            ${Object.keys(grade.dersler).length}
                            ders
                        </small>

                    </button>

                `)
                .join("")}

        </div>

        <div id="ktHomeMessage">

            <div class="kt-empty">

                <div class="kt-empty-icon">
                    📚
                </div>

                <h3>
                    Bir sınıf seç
                </h3>

                <p style="margin-top:8px">
                    Ders kitaplarını görmek için
                    yukarıdan bir sınıf seçebilirsin.
                </p>

            </div>

        </div>
    `;
}


function getGradeIcon(grade) {

    if (grade === "5") return "🌱";
    if (grade === "6") return "📘";
    if (grade === "7") return "📗";
    if (grade === "8") return "🎯";
    if (grade === "9") return "🚀";
    if (grade === "10") return "🔥";
    if (grade === "11") return "⭐";
    if (grade === "12") return "🏆";

    return "📚";
}


/* =========================================================
   GRADE
   ========================================================= */

function selectGrade(grade) {

    selectedGrade = grade;

    const data = kitaplikData[grade];

    const message =
        document.getElementById("ktHomeMessage");

    message.innerHTML = `

        <div class="kt-section-title">

            <h2>
                ${data.ad} Dersleri
            </h2>

            <span>
                ${Object.keys(data.dersler).length} kitap
            </span>

        </div>

        ${
            Object.keys(data.dersler).length
            ? `
                <div class="kt-book-grid">

                    ${Object.entries(data.dersler)
                        .map(([key, subject]) => `

                            <div
                                class="kt-book"
                                onclick="
                                    selectSubject('${key}')
                                "
                            >

                                <div class="kt-book-icon">
                                    ${subject.icon}
                                </div>

                                <h3>
                                    ${subject.ad}
                                </h3>

                                <p>
                                    Konu anlatımları,
                                    örnekler ve mini testler.
                                </p>

                                <div class="kt-book-footer">

                                    <span class="kt-book-count">
                                        ${subject.konular.length}
                                        konu
                                    </span>

                                    <span class="kt-open">
                                        Kitabı Aç →
                                    </span>

                                </div>

                            </div>

                        `)
                        .join("")}

                </div>
            `
            :
            `
                <div class="kt-empty">

                    <div class="kt-empty-icon">
                        🚧
                    </div>

                    <h3>
                        Bu sınıf hazırlanıyor
                    </h3>

                    <p style="margin-top:8px">
                        Bu sınıfın kitapları sonraki
                        içerik paketlerinde eklenecek.
                    </p>

                </div>
            `
        }
    `;
}


/* =========================================================
   SUBJECT
   ========================================================= */

function selectSubject(subjectKey) {

    selectedSubject = subjectKey;

    const subject =
        kitaplikData[selectedGrade]
            .dersler[selectedSubject];

    if (!subject) return;

    if (!subject.konular.length) {

        app.innerHTML = `

            <div class="kt-breadcrumb">
                <button onclick="renderHome()">
                    Kitaplık
                </button>

                →
                ${kitaplikData[selectedGrade].ad}
                →
                ${subject.ad}
            </div>

            <div class="kt-reader">

                <div class="kt-empty">

                    <div class="kt-empty-icon">
                        📖
                    </div>

                    <h2>
                        Konular hazırlanıyor
                    </h2>

                    <p style="margin-top:10px">
                        Bu dersin konu anlatımları
                        yakında eklenecek.
                    </p>

                </div>

            </div>
        `;

        return;
    }

    selectedTopic = subject.konular[0].id;

    renderTopicPage();
}


/* =========================================================
   TOPIC PAGE
   ========================================================= */

function renderTopicPage() {

    const subject =
        kitaplikData[selectedGrade]
            .dersler[selectedSubject];

    const topics = subject.konular;

    const topic =
        topics.find(
            item => item.id === selectedTopic
        );

    if (!topic) return;

    const topicIndex =
        topics.findIndex(
            item => item.id === selectedTopic
        );

    app.innerHTML = `

        <div class="kt-breadcrumb">

            <button onclick="renderHome()">
                Kitaplık
            </button>

            →

            <button onclick="selectGrade('${selectedGrade}')">
                ${kitaplikData[selectedGrade].ad}
            </button>

            →

            ${subject.ad}

        </div>

        <div class="kt-topic-layout">

            <aside class="kt-topic-sidebar">

                <h3>
                    ${subject.icon}
                    ${subject.ad}
                </h3>

                <div class="kt-topic-list">

                    ${topics.map(item => `

                        <button
                            class="
                                kt-topic-btn
                                ${item.id === selectedTopic
                                    ? "active"
                                    : ""
                                }
                                ${isCompleted(item.id)
                                    ? "completed"
                                    : ""
                                }
                            "
                            onclick="
                                openTopic('${item.id}')
                            "
                        >
                            ${item.ad}
                        </button>

                    `).join("")}

                </div>

            </aside>


            <article class="kt-reader">

                <div class="kt-reader-header">

                    <span class="kt-reader-label">
                        ${subject.ad}
                    </span>

                    <h1>
                        ${topic.ad}
                    </h1>

                    <p>
                        ${topic.giris}
                    </p>

                    <div class="kt-progress">

                        <div class="kt-progress-top">

                            <span>
                                Kitap ilerlemesi
                            </span>

                            <span>
                                ${calculateSubjectProgress(subject)}%
                            </span>

                        </div>

                        <div class="kt-progress-bar">

                            <div
                                class="kt-progress-fill"
                                style="
                                    width:
                                    ${calculateSubjectProgress(subject)}%
                                "
                            ></div>

                        </div>

                    </div>

                </div>


                <div class="kt-reader-body">

                    <section class="kt-content-section">

                        <h2>
                            📖 Konu Anlatımı
                        </h2>

                        <p>
                            ${topic.anlatim}
                        </p>

                    </section>


                    <section class="kt-content-section">

                        <div class="kt-info-box kt-info">

                            <h3>
                                💡 Temel Bilgi
                            </h3>

                            <p>
                                ${topic.temel}
                            </p>

                        </div>

                    </section>


                    <section class="kt-content-section">

                        <div class="kt-info-box kt-example">

                            <h3>
                                🧩 Çözümlü Örnek
                            </h3>

                            <p>
                                <strong>
                                    Soru:
                                </strong>
                                ${topic.ornekSoru}
                            </p>

                            <p style="margin-top:10px">

                                <strong>
                                    Çözüm:
                                </strong>

                                ${topic.ornekCozum}

                            </p>

                        </div>

                    </section>


                    <section class="kt-content-section">

                        <div class="kt-info-box kt-warning">

                            <h3>
                                ⚠️ Dikkat!
                            </h3>

                            <p>
                                ${topic.dikkat}
                            </p>

                        </div>

                    </section>


                    <section class="kt-content-section">

                        <div class="kt-info-box kt-summary">

                            <h3>
                                ⭐ Kısaca
                            </h3>

                            <p>
                                ${topic.ozet}
                            </p>

                        </div>

                    </section>


                    <section class="kt-content-section">

                        <h2>
                            📝 Mini Test
                        </h2>

                        <div class="kt-test">

                            ${
                                topic.test &&
                                topic.test.length
                                ?
                                topic.test.map(
                                    (question, index) => `

                                        <div
                                            class="kt-question"
                                            id="
                                                question-${index}
                                            "
                                        >

                                            <p>
                                                ${index + 1}.
                                                ${question.soru}
                                            </p>

                                            <div class="kt-options">

                                                ${question.secenekler
                                                    .map(
                                                        (option, optionIndex) => `

                                                            <button
                                                                class="kt-option"
                                                                onclick="
                                                                    answerQuestion(
                                                                        '${topic.id}',
                                                                        ${index},
                                                                        ${optionIndex},
                                                                        ${question.cevap}
                                                                    )
                                                                "
                                                            >
                                                                ${String.fromCharCode(65 + optionIndex)}
                                                                )
                                                                ${option}
                                                            </button>

                                                        `
                                                    )
                                                    .join("")}

                                            </div>

                                        </div>

                                    `
                                ).join("")
                                :
                                `
                                    <p>
                                        Bu konu için henüz test
                                        eklenmedi.
                                    </p>
                                `
                            }

                        </div>

                    </section>

                </div>


                <div class="kt-reader-actions">

                    <button
                        class="kt-action"
                        onclick="previousTopic()"
                        ${topicIndex <= 0 ? "disabled" : ""}
                    >
                        ← Önceki
                    </button>


                    <button
                        class="
                            kt-action
                            primary
                            ${isCompleted(topic.id)
                                ? "completed"
                                : ""
                            }
                        "
                        onclick="toggleCompleted('${topic.id}')"
                    >

                        ${
                            isCompleted(topic.id)
                            ? "✓ Konu Tamamlandı"
                            : "✓ Konuyu Tamamla"
                        }

                    </button>


                    <button
                        class="kt-action"
                        onclick="toggleFavorite('${topic.id}')"
                    >

                        ${
                            isFavorite(topic.id)
                            ? "⭐ Favorilerden Çıkar"
                            : "☆ Favorilere Ekle"
                        }

                    </button>


                    <button
                        class="kt-action"
                        onclick="nextTopic()"
                        ${topicIndex >= topics.length - 1
                            ? "disabled"
                            : ""
                        }
                    >
                        Sonraki →
                    </button>

                </div>

            </article>

        </div>
    `;
}


/* =========================================================
   OPEN TOPIC
   ========================================================= */

function openTopic(id) {

    selectedTopic = id;

    renderTopicPage();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   COMPLETE
   ========================================================= */

function toggleCompleted(id) {

    const progress = getProgress();

    if (progress[id]) {

        delete progress[id];

    } else {

        progress[id] = {
            completedAt: new Date().toISOString()
        };

    }

    saveProgress(progress);

    renderTopicPage();
}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(id) {

    let favorites = getFavorites();

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

    } else {

        favorites.push(id);
    }

    saveFavorites(favorites);

    renderTopicPage();
}


/* =========================================================
   SUBJECT PROGRESS
   ========================================================= */

function calculateSubjectProgress(subject) {

    if (!subject.konular.length) {
        return 0;
    }

    const completed =
        subject.konular.filter(
            topic => isCompleted(topic.id)
        ).length;

    return Math.round(
        completed /
        subject.konular.length *
        100
    );
}


/* =========================================================
   PREVIOUS / NEXT
   ========================================================= */

function previousTopic() {

    const subject =
        kitaplikData[selectedGrade]
            .dersler[selectedSubject];

    const index =
        subject.konular.findIndex(
            item => item.id === selectedTopic
        );

    if (index > 0) {

        selectedTopic =
            subject.konular[index - 1].id;

        renderTopicPage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


function nextTopic() {

    const subject =
        kitaplikData[selectedGrade]
            .dersler[selectedSubject];

    const index =
        subject.konular.findIndex(
            item => item.id === selectedTopic
        );

    if (
        index <
        subject.konular.length - 1
    ) {

        selectedTopic =
            subject.konular[index + 1].id;

        renderTopicPage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================================================
   MINI TEST
   ========================================================= */

function answerQuestion(
    topicId,
    questionIndex,
    selectedAnswer,
    correctAnswer
) {

    const question =
        document.querySelector(
            `#question-${questionIndex}`
        );

    if (!question) return;

    const options =
        question.querySelectorAll(
            ".kt-option"
        );

    options.forEach(
        (button, index) => {

            button.disabled = true;

            if (index === correctAnswer) {

                button.classList.add(
                    "correct"
                );
            }

            if (
                index === selectedAnswer &&
                index !== correctAnswer
            ) {

                button.classList.add(
                    "wrong"
                );
            }
        }
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchLibrary() {

    const input =
        document.getElementById("ktSearch");

    const query =
        input.value
            .trim()
            .toLocaleLowerCase("tr-TR");

    if (!query) {

        if (selectedTopic) {
            renderTopicPage();
        } else {
            renderHome();
        }

        return;
    }

    const results = [];

    Object.entries(kitaplikData)
        .forEach(
            ([gradeKey, grade]) => {

                Object.entries(grade.dersler)
                    .forEach(
                        ([subjectKey, subject]) => {

                            subject.konular.forEach(
                                topic => {

                                    const text = (

                                        grade.ad +
                                        " " +
                                        subject.ad +
                                        " " +
                                        topic.ad

                                    ).toLocaleLowerCase(
                                        "tr-TR"
                                    );

                                    if (
                                        text.includes(query)
                                    ) {

                                        results.push({
                                            gradeKey,
                                            subjectKey,
                                            grade,
                                            subject,
                                            topic
                                        });

                                    }

                                }
                            );

                        }
                    );

            }
        );


    app.innerHTML = `

        <div class="kt-section-title">

            <h2>
                🔍 Arama sonuçları
            </h2>

            <span>
                ${results.length} sonuç
            </span>

        </div>

        ${
            results.length
            ?
            `
                <div class="kt-book-grid">

                    ${results.map(result => `

                        <div
                            class="kt-book"
                            onclick="
                                openSearchResult(
                                    '${result.gradeKey}',
                                    '${result.subjectKey}',
                                    '${result.topic.id}'
                                )
                            "
                        >

                            <div class="kt-book-icon">
                                ${result.subject.icon}
                            </div>

                            <h3>
                                ${result.topic.ad}
                            </h3>

                            <p>
                                ${result.grade.ad}
                                →
                                ${result.subject.ad}
                            </p>

                            <div class="kt-book-footer">

                                <span class="kt-book-count">
                                    Konu anlatımı
                                </span>

                                <span class="kt-open">
                                    Oku →
                                </span>

                            </div>

                        </div>

                    `).join("")}

                </div>
            `
            :
            `
                <div class="kt-empty">

                    <div class="kt-empty-icon">
                        🔎
                    </div>

                    <h3>
                        Sonuç bulunamadı
                    </h3>

                    <p style="margin-top:8px">
                        Farklı bir ders veya konu adı
                        deneyebilirsin.
                    </p>

                </div>
            `
        }
    `;
}


function openSearchResult(
    gradeKey,
    subjectKey,
    topicId
) {

    selectedGrade = gradeKey;
    selectedSubject = subjectKey;
    selectedTopic = topicId;

    document.getElementById(
        "ktSearch"
    ).value = "";

    renderTopicPage();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   HOME
   ========================================================= */

function goHome() {

    /*
       Eğer DersTakip ana sayfanın yolu farklıysa
       burayı değiştirebilirsin.
    */

    window.location.href = "index.html";
}


/* =========================================================
   START
   ========================================================= */

renderHome();
