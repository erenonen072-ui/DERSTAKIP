/* =========================================================
   DERS TAKİP — KİTAPLIK
   Sınıf → Ders → Konu → Konu Anlatımı → Mini Test
   ========================================================= */

(function () {
    "use strict";

    const DATA = window.kitaplikData || {};

    const state = {
        sinif: null,
        ders: null,
        konu: null,
        arama: "",
        testCevaplari: {},
        tamamlananlar: JSON.parse(
            localStorage.getItem("dersTakip_kitaplik_tamamlanan") || "{}"
        )
    };

    const root = document.getElementById("kitaplikApp");

    if (!root) {
        console.error(
            "DersTakip Kitaplık: #kitaplikApp bulunamadı."
        );
        return;
    }

    /* =====================================================
       YARDIMCI FONKSİYONLAR
    ===================================================== */

    function escapeHTML(value) {
        if (value === null || value === undefined) return "";

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getSiniflar() {
        return Object.keys(DATA).sort(function (a, b) {
            return Number(a) - Number(b);
        });
    }

    function getSinif() {
        return state.sinif ? DATA[state.sinif] : null;
    }

    function getDersler() {
        const sinif = getSinif();

        if (!sinif || !sinif.dersler) {
            return {};
        }

        return sinif.dersler;
    }

    function getDers() {
        const dersler = getDersler();

        return state.ders ? dersler[state.ders] : null;
    }

    function getKonular() {
        const ders = getDers();

        return ders && Array.isArray(ders.konular)
            ? ders.konular
            : [];
    }

    function getKonu() {
        const konular = getKonular();

        return konular.find(function (konu) {
            return String(konu.id) === String(state.konu);
        }) || null;
    }

    function saveCompleted() {
        localStorage.setItem(
            "dersTakip_kitaplik_tamamlanan",
            JSON.stringify(state.tamamlananlar)
        );
    }

    function konuTamamlandiMi(konu) {
        return !!state.tamamlananlar[konu.id];
    }

    function konuTamamla(konu) {
        if (!konu) return;

        state.tamamlananlar[konu.id] =
            !state.tamamlananlar[konu.id];

        saveCompleted();

        render();
    }

    function toplamKonu() {
        let toplam = 0;

        Object.keys(DATA).forEach(function (sinifKey) {
            const sinif = DATA[sinifKey];

            if (!sinif || !sinif.dersler) return;

            Object.keys(sinif.dersler).forEach(function (dersKey) {
                const ders = sinif.dersler[dersKey];

                if (ders && Array.isArray(ders.konular)) {
                    toplam += ders.konular.length;
                }
            });
        });

        return toplam;
    }

    function tamamlananKonu() {
        return Object.keys(state.tamamlananlar).filter(function (id) {
            return state.tamamlananlar[id];
        }).length;
    }

    function yuzde() {
        const toplam = toplamKonu();

        if (!toplam) return 0;

        return Math.min(
            100,
            Math.round((tamamlananKonu() / toplam) * 100)
        );
    }

    function htmlToText(html) {
        const div = document.createElement("div");
        div.innerHTML = html || "";

        return div.textContent
            .replace(/\s+/g, " ")
            .trim();
    }

    /* =====================================================
       CSS
    ===================================================== */

    function injectStyles() {

        if (document.getElementById("kitaplikStyles")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "kitaplikStyles";

        style.textContent = `

        #kitaplikApp {
            --kt-primary: #635bff;
            --kt-primary-dark: #5148e8;
            --kt-bg: #f6f7fb;
            --kt-card: #ffffff;
            --kt-text: #182033;
            --kt-muted: #6b7280;
            --kt-border: #e8eaf0;
            --kt-success: #16a34a;
            --kt-warning: #f59e0b;

            font-family:
                Inter,
                ui-sans-serif,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;

            color: var(--kt-text);
            background: var(--kt-bg);
            min-height: 100vh;
            border-radius: 24px;
            overflow: hidden;
        }

        #kitaplikApp * {
            box-sizing: border-box;
        }

        .kt-wrapper {
            width: 100%;
            min-height: 100vh;
        }

        .kt-header {
            padding: 28px;
            background:
                linear-gradient(
                    135deg,
                    #635bff 0%,
                    #7c3aed 55%,
                    #2563eb 100%
                );
            color: white;
        }

        .kt-header-inner {
            max-width: 1200px;
            margin: auto;
        }

        .kt-brand {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .kt-brand-icon {
            width: 54px;
            height: 54px;
            border-radius: 16px;
            background: rgba(255,255,255,.16);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            backdrop-filter: blur(10px);
        }

        .kt-title {
            margin: 0;
            font-size: 30px;
            font-weight: 800;
            letter-spacing: -.5px;
        }

        .kt-subtitle {
            margin: 5px 0 0;
            opacity: .85;
            font-size: 14px;
        }

        .kt-progress-wrap {
            max-width: 1200px;
            margin: 22px auto 0;
        }

        .kt-progress-top {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            margin-bottom: 8px;
        }

        .kt-progress {
            width: 100%;
            height: 9px;
            background: rgba(255,255,255,.2);
            border-radius: 999px;
            overflow: hidden;
        }

        .kt-progress-bar {
            height: 100%;
            width: var(--progress);
            background: white;
            border-radius: 999px;
            transition: width .3s ease;
        }

        .kt-body {
            max-width: 1200px;
            margin: auto;
            padding: 28px;
        }

        .kt-toolbar {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }

        .kt-search {
            flex: 1;
            min-width: 220px;
            position: relative;
        }

        .kt-search input {
            width: 100%;
            height: 48px;
            border: 1px solid var(--kt-border);
            background: white;
            border-radius: 14px;
            padding: 0 16px 0 45px;
            outline: none;
            font-size: 14px;
            color: var(--kt-text);
        }

        .kt-search input:focus {
            border-color: var(--kt-primary);
            box-shadow: 0 0 0 3px rgba(99,91,255,.1);
        }

        .kt-search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
        }

        .kt-btn {
            border: 0;
            border-radius: 13px;
            padding: 0 18px;
            min-height: 46px;
            font-weight: 700;
            cursor: pointer;
            transition: .2s;
        }

        .kt-btn:hover {
            transform: translateY(-1px);
        }

        .kt-btn-primary {
            background: var(--kt-primary);
            color: white;
        }

        .kt-btn-light {
            background: white;
            color: var(--kt-text);
            border: 1px solid var(--kt-border);
        }

        .kt-breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            font-size: 13px;
            color: var(--kt-muted);
            margin-bottom: 22px;
        }

        .kt-breadcrumb button {
            border: 0;
            background: transparent;
            padding: 0;
            color: var(--kt-primary);
            font-weight: 700;
            cursor: pointer;
        }

        .kt-section-title {
            margin: 0 0 7px;
            font-size: 25px;
            font-weight: 800;
        }

        .kt-section-desc {
            color: var(--kt-muted);
            margin: 0 0 24px;
        }

        .kt-grid {
            display: grid;
            grid-template-columns:
                repeat(auto-fill, minmax(230px, 1fr));
            gap: 16px;
        }

        .kt-card {
            background: var(--kt-card);
            border: 1px solid var(--kt-border);
            border-radius: 20px;
            padding: 20px;
            cursor: pointer;
            transition:
                transform .2s ease,
                box-shadow .2s ease,
                border-color .2s ease;
        }

        .kt-card:hover {
            transform: translateY(-3px);
            border-color: rgba(99,91,255,.3);
            box-shadow: 0 12px 30px rgba(31,35,55,.08);
        }

        .kt-card-icon {
            width: 52px;
            height: 52px;
            border-radius: 15px;
            background: #f0efff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 27px;
            margin-bottom: 15px;
        }

        .kt-card-title {
            margin: 0;
            font-size: 17px;
            font-weight: 800;
        }

        .kt-card-info {
            margin-top: 7px;
            color: var(--kt-muted);
            font-size: 13px;
        }

        .kt-card-progress {
            margin-top: 15px;
            height: 6px;
            background: #eef0f5;
            border-radius: 999px;
            overflow: hidden;
        }

        .kt-card-progress span {
            display: block;
            height: 100%;
            background: var(--kt-primary);
            width: var(--progress);
            border-radius: inherit;
        }

        .kt-topic-card {
            position: relative;
            padding-right: 52px;
        }

        .kt-topic-number {
            position: absolute;
            right: 17px;
            top: 17px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #f0efff;
            color: var(--kt-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 12px;
        }

        .kt-topic-done {
            color: var(--kt-success);
            font-weight: 800;
            font-size: 12px;
            margin-top: 10px;
        }

        .kt-reader {
            background: white;
            border: 1px solid var(--kt-border);
            border-radius: 24px;
            overflow: hidden;
        }

        .kt-reader-head {
            padding: 30px;
            background:
                linear-gradient(
                    135deg,
                    #f4f3ff,
                    #f8faff
                );
            border-bottom: 1px solid var(--kt-border);
        }

        .kt-reader-icon {
            width: 62px;
            height: 62px;
            border-radius: 18px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 8px 25px rgba(31,35,55,.08);
            margin-bottom: 18px;
        }

        .kt-reader-title {
            margin: 0;
            font-size: 32px;
            line-height: 1.15;
        }

        .kt-reader-meta {
            color: var(--kt-muted);
            margin-top: 9px;
        }

        .kt-reader-body {
            padding: 32px;
            max-width: 900px;
        }

        .kt-reader-body h3 {
            margin: 30px 0 12px;
            font-size: 21px;
        }

        .kt-reader-body h3:first-child {
            margin-top: 0;
        }

        .kt-reader-body p {
            line-height: 1.8;
            color: #374151;
            font-size: 16px;
        }

        .kt-reader-body li {
            margin: 8px 0;
            line-height: 1.6;
        }

        .kitap-ornek {
            margin: 18px 0;
            padding: 20px;
            background: #f7f7ff;
            border-left: 4px solid var(--kt-primary);
            border-radius: 12px;
            white-space: pre-line;
            line-height: 1.7;
        }

        .kitap-formul {
            margin: 18px 0;
            padding: 20px;
            text-align: center;
            font-size: 21px;
            font-weight: 800;
            background: #f8fafc;
            border-radius: 14px;
        }

        .kt-info-box {
            margin: 24px 0;
            padding: 20px;
            border-radius: 16px;
            background: #f8fafc;
            border: 1px solid var(--kt-border);
        }

        .kt-info-box.warning {
            background: #fffaf0;
            border-color: #fde68a;
        }

        .kt-info-box.success {
            background: #f0fdf4;
            border-color: #bbf7d0;
        }

        .kt-box-title {
            font-weight: 800;
            margin-bottom: 8px;
        }

        .kt-example-list {
            display: grid;
            gap: 12px;
            margin-top: 16px;
        }

        .kt-example {
            padding: 18px;
            border: 1px solid var(--kt-border);
            border-radius: 14px;
            background: #fff;
        }

        .kt-example-question {
            font-weight: 800;
        }

        .kt-example-answer {
            margin-top: 10px;
            color: var(--kt-muted);
            white-space: pre-line;
            line-height: 1.7;
        }

        .kt-test {
            margin-top: 32px;
            padding: 28px;
            background: #fafaff;
            border: 1px solid var(--kt-border);
            border-radius: 20px;
        }

        .kt-test-title {
            margin: 0 0 20px;
            font-size: 23px;
        }

        .kt-question {
            padding: 20px;
            background: white;
            border: 1px solid var(--kt-border);
            border-radius: 16px;
            margin-bottom: 14px;
        }

        .kt-question-text {
            font-weight: 800;
            line-height: 1.5;
            margin-bottom: 14px;
        }

        .kt-option {
            display: block;
            padding: 11px 14px;
            border: 1px solid var(--kt-border);
            border-radius: 10px;
            margin-top: 8px;
            cursor: pointer;
            transition: .15s;
        }

        .kt-option:hover {
            background: #f7f7ff;
            border-color: #c7c3ff;
        }

        .kt-option input {
            margin-right: 8px;
        }

        .kt-test-result {
            margin-top: 18px;
            padding: 15px;
            border-radius: 12px;
            background: #f0fdf4;
            color: #166534;
            font-weight: 800;
        }

        .kt-reader-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 28px;
        }

        .kt-empty {
            text-align: center;
            padding: 50px 20px;
            background: white;
            border: 1px dashed var(--kt-border);
            border-radius: 20px;
            color: var(--kt-muted);
        }

        .kt-empty-icon {
            font-size: 42px;
            margin-bottom: 12px;
        }

        .kt-mobile-back {
            display: none;
        }

        @media (max-width: 700px) {

            .kt-header {
                padding: 22px 17px;
            }

            .kt-body {
                padding: 18px;
            }

            .kt-title {
                font-size: 24px;
            }

            .kt-reader-head {
                padding: 22px;
            }

            .kt-reader-title {
                font-size: 26px;
            }

            .kt-reader-body {
                padding: 22px;
            }

            .kt-grid {
                grid-template-columns: 1fr;
            }

            .kt-mobile-back {
                display: inline-flex;
            }
        }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       HEADER
    ===================================================== */

    function renderHeader() {

        const progress = yuzde();

        return `
            <header class="kt-header">

                <div class="kt-header-inner">

                    <div class="kt-brand">

                        <div class="kt-brand-icon">
                            📚
                        </div>

                        <div>
                            <h1 class="kt-title">
                                Ders Kitaplığı
                            </h1>

                            <p class="kt-subtitle">
                                5. sınıftan 12. sınıfa konu anlatımları
                            </p>
                        </div>

                    </div>

                    <div class="kt-progress-wrap">

                        <div class="kt-progress-top">
                            <span>
                                Kitaplık ilerlemen
                            </span>

                            <strong>
                                ${progress}%
                            </strong>
                        </div>

                        <div
                            class="kt-progress"
                            aria-label="Kitaplık ilerlemesi"
                        >
                            <div
                                class="kt-progress-bar"
                                style="--progress:${progress}%"
                            ></div>
                        </div>

                    </div>

                </div>

            </header>
        `;
    }


    /* =====================================================
       TOOLBAR
    ===================================================== */

    function renderToolbar() {

        return `
            <div class="kt-toolbar">

                <div class="kt-search">

                    <span class="kt-search-icon">
                        🔎
                    </span>

                    <input
                        id="kitaplikSearch"
                        type="search"
                        placeholder="Konu veya ders ara..."
                        value="${escapeHTML(state.arama)}"
                        autocomplete="off"
                    >

                </div>

                ${
                    state.sinif
                        ? `
                            <button
                                class="kt-btn kt-btn-light"
                                data-action="home"
                            >
                                🏠 Kitaplık
                            </button>
                          `
                        : ""
                }

            </div>
        `;
    }


    /* =====================================================
       BREADCRUMB
    ===================================================== */

    function renderBreadcrumb() {

        const parts = [];

        parts.push(`
            <button data-action="home">
                Kitaplık
            </button>
        `);

        if (state.sinif) {

            parts.push(`
                <span>›</span>

                <button data-action="sinif">
                    ${escapeHTML(getSinif().ad)}
                </button>
            `);
        }

        if (state.ders) {

            const ders = getDers();

            parts.push(`
                <span>›</span>

                <button data-action="ders">
                    ${escapeHTML(ders.ad)}
                </button>
            `);
        }

        if (state.konu) {

            const konu = getKonu();

            if (konu) {

                parts.push(`
                    <span>›</span>
                    <span>${escapeHTML(konu.ad)}</span>
                `);
            }
        }

        return `
            <div class="kt-breadcrumb">
                ${parts.join("")}
            </div>
        `;
    }


    /* =====================================================
       ANA SAYFA — SINIFLAR
    ===================================================== */

    function renderHome() {

        const siniflar = getSiniflar();

        return `

            ${renderToolbar()}

            <h2 class="kt-section-title">
                📚 Ders Kitaplığı
            </h2>

            <p class="kt-section-desc">
                Sınıfını seç, dersini aç ve istediğin konuyu
                kitap gibi çalış.
            </p>

            <div class="kt-grid">

                ${siniflar.map(function (sinifKey) {

                    const sinif = DATA[sinifKey];

                    let dersSayisi =
                        sinif && sinif.dersler
                            ? Object.keys(sinif.dersler).length
                            : 0;

                    let konuSayisi = 0;

                    if (sinif && sinif.dersler) {

                        Object.keys(sinif.dersler).forEach(function (key) {

                            const ders = sinif.dersler[key];

                            if (
                                ders &&
                                Array.isArray(ders.konular)
                            ) {
                                konuSayisi += ders.konular.length;
                            }

                        });
                    }

                    return `
                        <article
                            class="kt-card"
                            data-sinif="${escapeHTML(sinifKey)}"
                        >

                            <div class="kt-card-icon">
                                ${
                                    Number(sinifKey) >= 9
                                        ? "🎓"
                                        : "📚"
                                }
                            </div>

                            <h3 class="kt-card-title">
                                ${escapeHTML(sinif.ad)}
                            </h3>

                            <div class="kt-card-info">
                                ${dersSayisi} ders
                                ·
                                ${konuSayisi} konu
                            </div>

                            <div class="kt-card-progress">
                                <span style="--progress:${sinifProgress(sinif)}%"></span>
                            </div>

                        </article>
                    `;

                }).join("")}

            </div>
        `;
    }


    function sinifProgress(sinif) {

        let toplam = 0;
        let tamam = 0;

        if (!sinif || !sinif.dersler) {
            return 0;
        }

        Object.keys(sinif.dersler).forEach(function (key) {

            const ders = sinif.dersler[key];

            if (!ders || !Array.isArray(ders.konular)) {
                return;
            }

            ders.konular.forEach(function (konu) {

                toplam++;

                if (konuTamamlandiMi(konu)) {
                    tamam++;
                }

            });

        });

        if (!toplam) return 0;

        return Math.round((tamam / toplam) * 100);
    }


    /* =====================================================
       DERSLER
    ===================================================== */

    function renderDersler() {

        const sinif = getSinif();

        if (!sinif) {
            state.sinif = null;
            return renderHome();
        }

        let dersler = Object.keys(
            sinif.dersler || {}
        );

        return `

            ${renderToolbar()}
            ${renderBreadcrumb()}

            <h2 class="kt-section-title">
                ${escapeHTML(sinif.ad)}
            </h2>

            <p class="kt-section-desc">
                Ders kitaplarından birini seç.
            </p>

            <div class="kt-grid">

                ${dersler.map(function (dersKey) {

                    const ders = sinif.dersler[dersKey];

                    const konular =
                        ders && Array.isArray(ders.konular)
                            ? ders.konular
                            : [];

                    const toplam = konular.length;

                    const tamam =
                        konular.filter(konu =>
                            konuTamamlandiMi(konu)
                        ).length;

                    const progress =
                        toplam
                            ? Math.round((tamam / toplam) * 100)
                            : 0;

                    return `

                        <article
                            class="kt-card"
                            data-ders="${escapeHTML(dersKey)}"
                        >

                            <div class="kt-card-icon">
                                ${ders.icon || "📘"}
                            </div>

                            <h3 class="kt-card-title">
                                ${escapeHTML(ders.ad)}
                            </h3>

                            <div class="kt-card-info">
                                ${toplam} konu
                                ${
                                    tamam
                                        ? ` · ${tamam} tamamlandı`
                                        : ""
                                }
                            </div>

                            <div class="kt-card-progress">
                                <span style="--progress:${progress}%"></span>
                            </div>

                        </article>
                    `;

                }).join("")}

            </div>
        `;
    }


    /* =====================================================
       KONU LİSTESİ
    ===================================================== */

    function renderKonular() {

        const ders = getDers();

        if (!ders) {
            return renderDersler();
        }

        let konular = Array.isArray(ders.konular)
            ? ders.konular
            : [];

        const search = state.arama
            .trim()
            .toLocaleLowerCase("tr-TR");

        if (search) {

            konular = konular.filter(function (konu) {

                const text = [
                    konu.ad,
                    konu.giris,
                    konu.anlatim,
                    konu.ozet
                ]
                    .map(htmlToText)
                    .join(" ")
                    .toLocaleLowerCase("tr-TR");

                return text.includes(search);
            });
        }

        return `

            ${renderToolbar()}
            ${renderBreadcrumb()}

            <h2 class="kt-section-title">
                ${ders.icon || "📚"}
                ${escapeHTML(ders.ad)}
            </h2>

            <p class="kt-section-desc">
                Konu anlatımlarından birini seç.
            </p>

            ${
                konular.length
                    ? `
                        <div class="kt-grid">

                            ${konular.map(function (konu, index) {

                                const tamam =
                                    konuTamamlandiMi(konu);

                                return `

                                    <article
                                        class="
                                            kt-card
                                            kt-topic-card
                                        "
                                        data-konu="${escapeHTML(konu.id)}"
                                    >

                                        <div class="kt-topic-number">
                                            ${index + 1}
                                        </div>

                                        <div class="kt-card-icon">
                                            📖
                                        </div>

                                        <h3 class="kt-card-title">
                                            ${escapeHTML(konu.ad)}
                                        </h3>

                                        <div class="kt-card-info">
                                            ${
                                                htmlToText(
                                                    konu.giris
                                                ).slice(0, 100)
                                            }...
                                        </div>

                                        ${
                                            tamam
                                                ? `
                                                    <div class="kt-topic-done">
                                                        ✓ Tamamlandı
                                                    </div>
                                                  `
                                                : ""
                                        }

                                    </article>
                                `;

                            }).join("")}

                        </div>
                      `
                    : `
                        <div class="kt-empty">

                            <div class="kt-empty-icon">
                                🔎
                            </div>

                            <strong>
                                Konu bulunamadı
                            </strong>

                            <p>
                                Arama kelimesini değiştirmeyi dene.
                            </p>

                        </div>
                      `
            }
        `;
    }


    /* =====================================================
       KONU OKUMA SAYFASI
    ===================================================== */

    function renderKonu() {

        const ders = getDers();
        const konu = getKonu();

        if (!ders || !konu) {
            return renderKonular();
        }

        const tamam = konuTamamlandiMi(konu);

        return `

            ${renderToolbar()}
            ${renderBreadcrumb()}

            <article class="kt-reader">

                <header class="kt-reader-head">

                    <div class="kt-reader-icon">
                        ${ders.icon || "📖"}
                    </div>

                    <h2 class="kt-reader-title">
                        ${escapeHTML(konu.ad)}
                    </h2>

                    <div class="kt-reader-meta">
                        ${escapeHTML(
                            getSinif().ad
                        )}
                        ·
                        ${escapeHTML(ders.ad)}
                    </div>

                </header>


                <div class="kt-reader-body">

                    ${
                        konu.giris
                            ? `
                                <div class="kt-info-box">
                                    <div class="kt-box-title">
                                        📖 Konuya Giriş
                                    </div>

                                    <div>
                                        ${formatText(konu.giris)}
                                    </div>
                                </div>
                              `
                            : ""
                    }


                    ${
                        konu.anlatim
                            ? `
                                <section>
                                    ${konu.anlatim}
                                </section>
                              `
                            : ""
                    }


                    ${
                        konu.temelBilgi &&
                        Array.isArray(konu.temelBilgi)
                            ? `
                                <div class="kt-info-box">

                                    <div class="kt-box-title">
                                        💡 Temel Bilgiler
                                    </div>

                                    <ul>
                                        ${
                                            konu.temelBilgi
                                                .map(function (bilgi) {
                                                    return `
                                                        <li>
                                                            ${escapeHTML(
                                                                bilgi
                                                            )}
                                                        </li>
                                                    `;
                                                })
                                                .join("")
                                        }
                                    </ul>

                                </div>
                              `
                            : ""
                    }


                    ${
                        konu.ornekler &&
                        konu.ornekler.length
                            ? `
                                <section>

                                    <h3>
                                        🧩 Çözümlü Örnekler
                                    </h3>

                                    <div class="kt-example-list">

                                        ${
                                            konu.ornekler
                                                .map(function (
                                                    ornek,
                                                    index
                                                ) {

                                                    return `
                                                        <div class="kt-example">

                                                            <div class="kt-example-question">
                                                                Örnek ${index + 1}
                                                            </div>

                                                            <div style="margin-top:8px;">
                                                                ${escapeHTML(
                                                                    ornek.soru
                                                                )}
                                                            </div>

                                                            <div class="kt-example-answer">
                                                                <strong>
                                                                    Çözüm:
                                                                </strong>

                                                                ${escapeHTML(
                                                                    ornek.cozum
                                                                )}
                                                            </div>

                                                        </div>
                                                    `;

                                                })
                                                .join("")
                                        }

                                    </div>

                                </section>
                              `
                            : ""
                    }


                    ${
                        konu.dikkat
                            ? `
                                <div class="kt-info-box warning">

                                    <div class="kt-box-title">
                                        ⚠️ Dikkat!
                                    </div>

                                    <div>
                                        ${formatText(konu.dikkat)}
                                    </div>

                                </div>
                              `
                            : ""
                    }


                    ${
                        konu.ozet
                            ? `
                                <div class="kt-info-box success">

                                    <div class="kt-box-title">
                                        ⭐ Kısaca
                                    </div>

                                    <div>
                                        ${formatText(konu.ozet)}
                                    </div>

                                </div>
                              `
                            : ""
                    }


                    ${
                        konu.test &&
                        konu.test.length
                            ? renderTest(konu)
                            : ""
                    }


                    <div class="kt-reader-actions">

                        <button
                            class="kt-btn kt-btn-light"
                            data-action="ders"
                        >
                            ← Konu Listesine Dön
                        </button>

                        <button
                            class="kt-btn kt-btn-primary"
                            data-action="complete"
                        >
                            ${
                                tamam
                                    ? "✓ Tamamlandı — İşareti Kaldır"
                                    : "✓ Konuyu Tamamla"
                            }
                        </button>

                    </div>

                </div>

            </article>
        `;
    }


    function formatText(text) {

        if (!text) return "";

        return escapeHTML(text)
            .replace(/\n\n+/g, "</p><p>")
            .replace(/\n/g, "<br>");

    }


    /* =====================================================
       TEST
    ===================================================== */

    function renderTest(konu) {

        return `

            <section class="kt-test">

                <h3 class="kt-test-title">
                    📝 Mini Test
                </h3>

                <form id="kitaplikTestForm">

                    ${
                        konu.test.map(function (soru, index) {

                            return `

                                <div class="kt-question">

                                    <div class="kt-question-text">
                                        ${index + 1}.
                                        ${escapeHTML(
                                            soru.soru
                                        )}
                                    </div>

                                    ${
                                        Array.isArray(
                                            soru.secenekler
                                        )
                                            ? soru.secenekler
                                                .map(function (
                                                    secenek,
                                                    optionIndex
                                                ) {

                                                    return `
                                                        <label
                                                            class="kt-option"
                                                        >

                                                            <input
                                                                type="radio"
                                                                name="soru-${index}"
                                                                value="${optionIndex}"
                                                                ${
                                                                    String(
                                                                        state.testCevaplari[
                                                                            index
                                                                        ]
                                                                    ) ===
                                                                    String(
                                                                        optionIndex
                                                                    )
                                                                        ? "checked"
                                                                        : ""
                                                                }
                                                            >

                                                            ${escapeHTML(
                                                                secenek
                                                            )}

                                                        </label>
                                                    `;

                                                })
                                                .join("")
                                            : ""
                                    }

                                </div>
                            `;

                        }).join("")
                    }

                    <button
                        type="submit"
                        class="kt-btn kt-btn-primary"
                    >
                        Testi Kontrol Et
                    </button>

                </form>

                <div
                    id="kitaplikTestResult"
                    style="display:none;"
                ></div>

            </section>
        `;
    }


    /* =====================================================
       RENDER
    ===================================================== */

    function render() {

        let content = "";

        if (!state.sinif) {

            content = renderHome();

        } else if (!state.ders) {

            content = renderDersler();

        } else if (!state.konu) {

            content = renderKonular();

        } else {

            content = renderKonu();
        }

        root.innerHTML = `
            <div class="kt-wrapper">

                ${renderHeader()}

                <main class="kt-body">
                    ${content}
                </main>

            </div>
        `;

        bindEvents();
    }


    /* =====================================================
       EVENTLER
    ===================================================== */

    function bindEvents() {

        /* SINIF */

        root.querySelectorAll("[data-sinif]").forEach(function (el) {

            el.addEventListener("click", function () {

                state.sinif =
                    el.getAttribute("data-sinif");

                state.ders = null;
                state.konu = null;
                state.arama = "";

                render();

                scrollTop();
            });

        });


        /* DERS */

        root.querySelectorAll("[data-ders]").forEach(function (el) {

            el.addEventListener("click", function () {

                state.ders =
                    el.getAttribute("data-ders");

                state.konu = null;
                state.arama = "";

                render();

                scrollTop();
            });

        });


        /* KONU */

        root.querySelectorAll("[data-konu]").forEach(function (el) {

            el.addEventListener("click", function () {

                state.konu =
                    el.getAttribute("data-konu");

                state.testCevaplari = {};

                render();

                scrollTop();
            });

        });


        /* ACTION */

        root.querySelectorAll("[data-action]").forEach(function (el) {

            el.addEventListener("click", function () {

                const action =
                    el.getAttribute("data-action");

                if (action === "home") {

                    state.sinif = null;
                    state.ders = null;
                    state.konu = null;
                    state.arama = "";

                    render();

                    scrollTop();
                }

                else if (action === "sinif") {

                    state.ders = null;
                    state.konu = null;
                    state.arama = "";

                    render();

                    scrollTop();
                }

                else if (action === "ders") {

                    state.konu = null;
                    state.arama = "";

                    render();

                    scrollTop();
                }

                else if (action === "complete") {

                    konuTamamla(
                        getKonu()
                    );

                    scrollTop();
                }

            });

        });


        /* SEARCH */

        const search =
            root.querySelector("#kitaplikSearch");

        if (search) {

            search.addEventListener(
                "input",
                function () {

                    state.arama =
                        search.value;

                    if (
                        state.sinif &&
                        state.ders &&
                        !state.konu
                    ) {
                        render();

                        const newSearch =
                            root.querySelector(
                                "#kitaplikSearch"
                            );

                        if (newSearch) {

                            newSearch.focus();

                            try {

                                newSearch.setSelectionRange(
                                    newSearch.value.length,
                                    newSearch.value.length
                                );

                            } catch (e) {}

                        }
                    }

                }
            );

        }


        /* TEST */

        const testForm =
            root.querySelector(
                "#kitaplikTestForm"
            );

        if (testForm) {

            testForm.addEventListener(
                "change",
                function (event) {

                    if (
                        event.target &&
                        event.target.type === "radio"
                    ) {

                        const name =
                            event.target.name;

                        const index =
                            Number(
                                name.replace(
                                    "soru-",
                                    ""
                                )
                            );

                        state.testCevaplari[index] =
                            Number(
                                event.target.value
                            );
                    }

                }
            );


            testForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    kontrolEt();

                }
            );
        }

    }


    /* =====================================================
       TEST KONTROL
    ===================================================== */

    function kontrolEt() {

        const konu = getKonu();

        if (!konu || !Array.isArray(konu.test)) {
            return;
        }

        let dogru = 0;
        let cevaplanan = 0;

        konu.test.forEach(function (soru, index) {

            if (
                state.testCevaplari[index] !== undefined
            ) {

                cevaplanan++;

                if (
                    Number(
                        state.testCevaplari[index]
                    ) === Number(
                        soru.cevap
                    )
                ) {

                    dogru++;
                }
            }

        });

        const sonuc =
            root.querySelector(
                "#kitaplikTestResult"
            );

        if (!sonuc) return;

        sonuc.style.display = "block";

        if (cevaplanan < konu.test.length) {

            sonuc.className =
                "kt-test-result";

            sonuc.textContent =
                `Test tamamlanmadı. ${cevaplanan}/${konu.test.length} soru cevaplandı.`;

            return;
        }

        const yuzdeTest =
            Math.round(
                (dogru / konu.test.length) * 100
            );

        sonuc.className =
            "kt-test-result";

        sonuc.innerHTML = `
            🎯 Sonuç:
            ${dogru}/${konu.test.length} doğru
            — %${yuzdeTest}

            ${
                yuzdeTest >= 70
                    ? " 🎉 Harika!"
                    : " 📚 Konuyu biraz daha tekrar et."
            }
        `;

        if (yuzdeTest >= 70) {

            const konuObj = getKonu();

            if (konuObj) {

                state.tamamlananlar[
                    konuObj.id
                ] = true;

                saveCompleted();

                setTimeout(function () {
                    render();
                }, 900);
            }
        }

    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function scrollTop() {

        try {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } catch (e) {

            window.scrollTo(0, 0);

        }
    }


    /* =====================================================
       DIŞARIDAN KULLANILABİLECEK API
    ===================================================== */

    window.DersTakipKitaplik = {

        anaSayfa: function () {

            state.sinif = null;
            state.ders = null;
            state.konu = null;
            state.arama = "";

            render();
        },

        sinifAc: function (sinif) {

            if (!DATA[String(sinif)]) {
                console.warn(
                    "Kitaplık: Sınıf bulunamadı:",
                    sinif
                );

                return;
            }

            state.sinif = String(sinif);
            state.ders = null;
            state.konu = null;

            render();

            scrollTop();
        },

        dersAc: function (sinif, ders) {

            sinif = String(sinif);

            if (
                !DATA[sinif] ||
                !DATA[sinif].dersler ||
                !DATA[sinif].dersler[ders]
            ) {

                console.warn(
                    "Kitaplık: Ders bulunamadı:",
                    sinif,
                    ders
                );

                return;
            }

            state.sinif = sinif;
            state.ders = ders;
            state.konu = null;

            render();

            scrollTop();
        },

        konuAc: function (
            sinif,
            ders,
            konuId
        ) {

            sinif = String(sinif);

            if (
                !DATA[sinif] ||
                !DATA[sinif].dersler ||
                !DATA[sinif].dersler[ders]
            ) {

                return;
            }

            const konu =
                DATA[sinif]
                    .dersler[ders]
                    .konular
                    .find(function (item) {

                        return String(item.id) ===
                            String(konuId);

                    });

            if (!konu) {

                console.warn(
                    "Kitaplık: Konu bulunamadı:",
                    konuId
                );

                return;
            }

            state.sinif = sinif;
            state.ders = ders;
            state.konu = konu.id;

            render();

            scrollTop();
        },

        yenile: function () {
            render();
        },

        ilerleme: function () {
            return {
                toplam: toplamKonu(),
                tamamlanan: tamamlananKonu(),
                yuzde: yuzde()
            };
        },

        tamamlananlariSifirla: function () {

            state.tamamlananlar = {};

            saveCompleted();

            render();
        }

    };


    /* =====================================================
       BAŞLAT
    ===================================================== */

    injectStyles();
    render();

})();
