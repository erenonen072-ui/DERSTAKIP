/* =========================================================
   DERS TAKİP — KİTAPLIK v2
   Modern öğrenme merkezi
   Sınıf → Ders → Konu → Konu Anlatımı → Mini Test
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       VERİ
    ===================================================== */

    const DATA = window.kitaplikData || {};

    const STORAGE_KEY = "dersTakip_kitaplik_tamamlanan";

    const state = {
        sinif: null,
        ders: null,
        konu: null,
        arama: "",
        testCevaplari: {},
        tamamlananlar: loadCompleted()
    };

    let root = null;

    /* =====================================================
       STORAGE
    ===================================================== */

    function loadCompleted() {
        try {
            return JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "{}"
            );
        } catch (error) {
            console.warn(
                "DersTakip Kitaplık: kayıtlı ilerleme okunamadı.",
                error
            );
            return {};
        }
    }

    function saveCompleted() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state.tamamlananlar)
            );
        } catch (error) {
            console.warn(
                "DersTakip Kitaplık: ilerleme kaydedilemedi.",
                error
            );
        }
    }

    /* =====================================================
       YARDIMCI FONKSİYONLAR
    ===================================================== */

    function escapeHTML(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function htmlToText(html) {
        const div = document.createElement("div");
        div.innerHTML = html || "";

        return (div.textContent || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function formatText(text) {
        if (!text) return "";

        return escapeHTML(text)
            .replace(/\n\n+/g, "</p><p>")
            .replace(/\n/g, "<br>");
    }

    function getSiniflar() {
        return Object.keys(DATA).sort(function (a, b) {
            return Number(a) - Number(b);
        });
    }

    function getSinif() {
        return state.sinif
            ? DATA[state.sinif]
            : null;
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

        return state.ders
            ? dersler[state.ders]
            : null;
    }

    function getKonular() {
        const ders = getDers();

        if (
            !ders ||
            !Array.isArray(ders.konular)
        ) {
            return [];
        }

        return ders.konular;
    }

    function getKonu() {
        const konular = getKonular();

        return (
            konular.find(function (konu) {
                return (
                    String(konu.id) ===
                    String(state.konu)
                );
            }) || null
        );
    }

    function konuTamamlandiMi(konu) {
        if (!konu) return false;

        return !!state.tamamlananlar[konu.id];
    }

    function konuTamamla(konu) {
        if (!konu) return;

        state.tamamlananlar[konu.id] =
            !state.tamamlananlar[konu.id];

        saveCompleted();
        render();
    }

    /* =====================================================
       İLERLEME
    ===================================================== */

    function toplamKonu() {
        let toplam = 0;

        Object.keys(DATA).forEach(function (sinifKey) {
            const sinif = DATA[sinifKey];

            if (!sinif || !sinif.dersler) {
                return;
            }

            Object.keys(sinif.dersler).forEach(function (dersKey) {
                const ders = sinif.dersler[dersKey];

                if (
                    ders &&
                    Array.isArray(ders.konular)
                ) {
                    toplam += ders.konular.length;
                }
            });
        });

        return toplam;
    }

    function tamamlananKonu() {
        return Object.keys(
            state.tamamlananlar
        ).filter(function (id) {
            return state.tamamlananlar[id];
        }).length;
    }

    function yuzde() {
        const toplam = toplamKonu();

        if (!toplam) return 0;

        return Math.min(
            100,
            Math.round(
                (tamamlananKonu() / toplam) * 100
            )
        );
    }

    function sinifProgress(sinif) {
        let toplam = 0;
        let tamam = 0;

        if (!sinif || !sinif.dersler) {
            return 0;
        }

        Object.keys(sinif.dersler).forEach(function (key) {
            const ders = sinif.dersler[key];

            if (
                !ders ||
                !Array.isArray(ders.konular)
            ) {
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

        return Math.round(
            (tamam / toplam) * 100
        );
    }

    function dersProgress(ders) {
        if (
            !ders ||
            !Array.isArray(ders.konular) ||
            !ders.konular.length
        ) {
            return 0;
        }

        const tamam = ders.konular.filter(
            konu => konuTamamlandiMi(konu)
        ).length;

        return Math.round(
            (tamam / ders.konular.length) * 100
        );
    }

    /* =====================================================
       CSS
    ===================================================== */

    function injectStyles() {
        if (
            document.getElementById(
                "kitaplikStyles"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id = "kitaplikStyles";

        style.textContent = `

        /* =================================================
           ROOT
        ================================================= */

        #kitaplikApp {
            --kt-primary: #6d5dfc;
            --kt-primary-2: #8b5cf6;
            --kt-blue: #3b82f6;
            --kt-cyan: #06b6d4;

            --kt-dark: #111827;
            --kt-text: #182033;
            --kt-muted: #6b7280;

            --kt-bg: #f5f7fb;
            --kt-card: #ffffff;

            --kt-border: #e8ebf2;

            --kt-green: #16a34a;
            --kt-yellow: #f59e0b;
            --kt-red: #ef4444;

            width: 100%;
            min-height: 100vh;

            color: var(--kt-text);

            background:
                radial-gradient(
                    circle at 0% 0%,
                    rgba(109,93,252,.08),
                    transparent 30%
                ),
                radial-gradient(
                    circle at 100% 20%,
                    rgba(59,130,246,.07),
                    transparent 30%
                ),
                var(--kt-bg);

            font-family:
                Inter,
                ui-sans-serif,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;

            border-radius: 28px;
            overflow: hidden;
        }

        #kitaplikApp *,
        #kitaplikApp *::before,
        #kitaplikApp *::after {
            box-sizing: border-box;
        }

        #kitaplikApp button,
        #kitaplikApp input {
            font: inherit;
        }

        /* =================================================
           WRAPPER
        ================================================= */

        .kt-wrapper {
            width: 100%;
            min-height: 100vh;
        }

        /* =================================================
           HERO
        ================================================= */

        .kt-header {
            position: relative;
            overflow: hidden;

            padding: 34px 28px 32px;

            color: white;

            background:
                radial-gradient(
                    circle at 85% 10%,
                    rgba(255,255,255,.18),
                    transparent 25%
                ),
                radial-gradient(
                    circle at 10% 100%,
                    rgba(6,182,212,.25),
                    transparent 30%
                ),
                linear-gradient(
                    135deg,
                    #171b4a 0%,
                    #312e81 48%,
                    #5b21b6 100%
                );
        }

        .kt-header::after {
            content: "";

            position: absolute;

            width: 320px;
            height: 320px;

            right: -120px;
            bottom: -190px;

            border-radius: 50%;

            background:
                rgba(255,255,255,.07);

            filter: blur(2px);
        }

        .kt-header-inner {
            position: relative;
            z-index: 2;

            max-width: 1180px;
            margin: auto;
        }

        .kt-top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .kt-brand {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .kt-brand-icon {
            width: 58px;
            height: 58px;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            border-radius: 18px;

            font-size: 29px;

            background:
                rgba(255,255,255,.13);

            border:
                1px solid rgba(255,255,255,.18);

            box-shadow:
                0 15px 35px rgba(0,0,0,.15);

            backdrop-filter: blur(15px);
        }

        .kt-title {
            margin: 0;

            font-size: clamp(25px, 4vw, 34px);

            line-height: 1.1;

            font-weight: 850;

            letter-spacing: -.8px;
        }

        .kt-subtitle {
            margin: 7px 0 0;

            font-size: 14px;

            color:
                rgba(255,255,255,.76);
        }

        .kt-hero-stat {
            display: flex;
            align-items: center;
            gap: 10px;

            padding: 11px 15px;

            border-radius: 14px;

            background:
                rgba(255,255,255,.1);

            border:
                1px solid rgba(255,255,255,.14);

            backdrop-filter: blur(15px);

            font-size: 13px;

            white-space: nowrap;
        }

        .kt-hero-stat strong {
            font-size: 18px;
        }

        /* =================================================
           PROGRESS
        ================================================= */

        .kt-progress-wrap {
            margin-top: 28px;

            padding: 18px 19px;

            border-radius: 18px;

            background:
                rgba(255,255,255,.08);

            border:
                1px solid rgba(255,255,255,.12);

            backdrop-filter: blur(12px);
        }

        .kt-progress-top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 15px;

            margin-bottom: 10px;

            font-size: 13px;

            color:
                rgba(255,255,255,.78);
        }

        .kt-progress-top strong {
            color: white;
            font-size: 14px;
        }

        .kt-progress {
            width: 100%;
            height: 9px;

            overflow: hidden;

            border-radius: 999px;

            background:
                rgba(255,255,255,.13);
        }

        .kt-progress-bar {
            width: var(--progress);
            height: 100%;

            border-radius: inherit;

            background:
                linear-gradient(
                    90deg,
                    #fff,
                    #dbeafe
                );

            box-shadow:
                0 0 14px
                rgba(255,255,255,.35);

            transition:
                width .5s ease;
        }

        /* =================================================
           BODY
        ================================================= */

        .kt-body {
            max-width: 1180px;

            margin: auto;

            padding: 30px 28px 60px;
        }

        /* =================================================
           TOOLBAR
        ================================================= */

        .kt-toolbar {
            display: flex;
            align-items: center;

            gap: 12px;

            margin-bottom: 28px;
        }

        .kt-search {
            position: relative;

            flex: 1;

            min-width: 220px;
        }

        .kt-search input {
            width: 100%;
            height: 52px;

            padding:
                0 18px 0 48px;

            border:
                1px solid var(--kt-border);

            border-radius: 16px;

            outline: none;

            background:
                rgba(255,255,255,.9);

            color: var(--kt-text);

            font-size: 14px;

            box-shadow:
                0 5px 18px
                rgba(17,24,39,.025);

            transition:
                .2s ease;
        }

        .kt-search input::placeholder {
            color: #9ca3af;
        }

        .kt-search input:focus {
            border-color:
                rgba(109,93,252,.55);

            background: white;

            box-shadow:
                0 0 0 4px
                rgba(109,93,252,.08);
        }

        .kt-search-icon {
            position: absolute;

            left: 17px;
            top: 50%;

            transform:
                translateY(-50%);

            font-size: 17px;

            opacity: .65;

            pointer-events: none;
        }

        /* =================================================
           BUTTON
        ================================================= */

        .kt-btn {
            min-height: 48px;

            padding:
                0 18px;

            border: 0;

            border-radius: 14px;

            cursor: pointer;

            font-size: 14px;

            font-weight: 750;

            transition:
                transform .18s ease,
                box-shadow .18s ease,
                background .18s ease;
        }

        .kt-btn:hover {
            transform:
                translateY(-2px);
        }

        .kt-btn:active {
            transform:
                translateY(0);
        }

        .kt-btn-primary {
            color: white;

            background:
                linear-gradient(
                    135deg,
                    var(--kt-primary),
                    var(--kt-primary-2)
                );

            box-shadow:
                0 10px 24px
                rgba(109,93,252,.22);
        }

        .kt-btn-primary:hover {
            box-shadow:
                0 14px 28px
                rgba(109,93,252,.3);
        }

        .kt-btn-light {
            color: var(--kt-text);

            background: white;

            border:
                1px solid var(--kt-border);

            box-shadow:
                0 5px 16px
                rgba(17,24,39,.04);
        }

        /* =================================================
           BREADCRUMB
        ================================================= */

        .kt-breadcrumb {
            display: flex;
            align-items: center;

            gap: 7px;

            flex-wrap: wrap;

            margin-bottom: 25px;

            font-size: 13px;

            color: var(--kt-muted);
        }

        .kt-breadcrumb button {
            padding: 6px 9px;

            border: 0;

            border-radius: 9px;

            background: transparent;

            color:
                var(--kt-primary);

            font-weight: 750;

            cursor: pointer;

            transition: .15s;
        }

        .kt-breadcrumb button:hover {
            background:
                rgba(109,93,252,.08);
        }

        .kt-breadcrumb span {
            color: #a1a1aa;
        }

        /* =================================================
           SECTION HEADING
        ================================================= */

        .kt-section-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            gap: 20px;

            margin-bottom: 22px;
        }

        .kt-section-title {
            margin: 0;

            font-size: 28px;

            line-height: 1.15;

            letter-spacing: -.6px;

            font-weight: 850;
        }

        .kt-section-desc {
            margin:
                8px 0 0;

            color:
                var(--kt-muted);

            font-size: 14px;

            line-height: 1.6;
        }

        .kt-counter {
            flex-shrink: 0;

            padding: 8px 12px;

            border-radius: 10px;

            background: #fff;

            border:
                1px solid var(--kt-border);

            color:
                var(--kt-muted);

            font-size: 12px;

            font-weight: 700;
        }

        /* =================================================
           GRID
        ================================================= */

        .kt-grid {
            display: grid;

            grid-template-columns:
                repeat(
                    auto-fill,
                    minmax(245px, 1fr)
                );

            gap: 17px;
        }

        /* =================================================
           GENERAL CARD
        ================================================= */

        .kt-card {
            position: relative;

            overflow: hidden;

            background:
                rgba(255,255,255,.94);

            border:
                1px solid var(--kt-border);

            border-radius: 22px;

            padding: 22px;

            cursor: pointer;

            box-shadow:
                0 5px 20px
                rgba(17,24,39,.035);

            transition:
                transform .22s ease,
                box-shadow .22s ease,
                border-color .22s ease;
        }

        .kt-card::before {
            content: "";

            position: absolute;

            left: 0;
            top: 0;

            width: 100%;
            height: 3px;

            opacity: 0;

            background:
                linear-gradient(
                    90deg,
                    var(--kt-primary),
                    var(--kt-blue),
                    var(--kt-cyan)
                );

            transition: .2s;
        }

        .kt-card:hover {
            transform:
                translateY(-5px);

            border-color:
                rgba(109,93,252,.22);

            box-shadow:
                0 18px 42px
                rgba(17,24,39,.09);
        }

        .kt-card:hover::before {
            opacity: 1;
        }

        /* =================================================
           CLASS CARDS
        ================================================= */

        .kt-class-card {
            min-height: 220px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .kt-class-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            gap: 15px;
        }

        .kt-class-icon {
            width: 62px;
            height: 62px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 19px;

            font-size: 31px;

            background:
                linear-gradient(
                    135deg,
                    #f0edff,
                    #e8f0ff
                );

            box-shadow:
                inset 0 0 0 1px
                rgba(109,93,252,.06);
        }

        .kt-class-badge {
            padding: 7px 10px;

            border-radius: 10px;

            background: #f5f3ff;

            color:
                var(--kt-primary);

            font-size: 11px;

            font-weight: 800;
        }

        .kt-class-title {
            margin:
                20px 0 5px;

            font-size: 21px;

            font-weight: 850;

            letter-spacing: -.3px;
        }

        .kt-card-info {
            color:
                var(--kt-muted);

            font-size: 13px;

            line-height: 1.5;
        }

        .kt-card-progress {
            margin-top: 18px;

            height: 7px;

            overflow: hidden;

            border-radius: 999px;

            background:
                #eef0f5;
        }

        .kt-card-progress span {
            display: block;

            width: var(--progress);

            height: 100%;

            border-radius: inherit;

            background:
                linear-gradient(
                    90deg,
                    var(--kt-primary),
                    var(--kt-blue)
                );

            transition:
                width .4s ease;
        }

        .kt-progress-label {
            display: flex;
            justify-content: space-between;

            margin-top: 8px;

            color:
                var(--kt-muted);

            font-size: 11px;

            font-weight: 700;
        }

        /* =================================================
           LESSON CARDS
        ================================================= */

        .kt-lesson-card {
            min-height: 205px;
        }

        .kt-lesson-icon {
            width: 55px;
            height: 55px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 17px;

            font-size: 27px;

            background:
                #f5f3ff;

            margin-bottom: 17px;
        }

        .kt-lesson-title {
            margin: 0;

            font-size: 18px;

            font-weight: 850;
        }

        .kt-lesson-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 10px;

            margin-top: 18px;
        }

        .kt-lesson-count {
            color:
                var(--kt-muted);

            font-size: 12px;

            font-weight: 650;
        }

        .kt-lesson-percent {
            padding: 5px 8px;

            border-radius: 8px;

            background:
                #f0fdf4;

            color:
                var(--kt-green);

            font-size: 11px;

            font-weight: 800;
        }

        /* =================================================
           TOPIC CARDS
        ================================================= */

        .kt-topic-card {
            min-height: 205px;

            padding-right: 62px;
        }

        .kt-topic-number {
            position: absolute;

            right: 17px;
            top: 17px;

            width: 34px;
            height: 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 11px;

            background:
                #f3f1ff;

            color:
                var(--kt-primary);

            font-size: 12px;

            font-weight: 850;
        }

        .kt-topic-card:hover
        .kt-topic-number {
            background:
                var(--kt-primary);

            color: white;
        }

        .kt-topic-card .kt-card-icon {
            width: 48px;
            height: 48px;

            margin-bottom: 15px;

            border-radius: 14px;

            font-size: 23px;
        }

        .kt-topic-done {
            display: inline-flex;
            align-items: center;

            gap: 5px;

            margin-top: 13px;

            padding: 6px 9px;

            border-radius: 8px;

            background:
                #ecfdf3;

            color:
                #15803d;

            font-size: 11px;

            font-weight: 800;
        }

        /* =================================================
           READER
        ================================================= */

        .kt-reader {
            overflow: hidden;

            background: white;

            border:
                1px solid var(--kt-border);

            border-radius: 25px;

            box-shadow:
                0 12px 35px
                rgba(17,24,39,.045);
        }

        .kt-reader-head {
            position: relative;

            overflow: hidden;

            padding: 35px;

            background:
                radial-gradient(
                    circle at 90% 20%,
                    rgba(109,93,252,.13),
                    transparent 25%
                ),
                linear-gradient(
                    135deg,
                    #f7f5ff,
                    #f3f7ff
                );

            border-bottom:
                1px solid var(--kt-border);
        }

        .kt-reader-head::after {
            content: "";

            position: absolute;

            width: 180px;
            height: 180px;

            right: -70px;
            bottom: -100px;

            border-radius: 50%;

            background:
                rgba(109,93,252,.08);
        }

        .kt-reader-icon {
            position: relative;
            z-index: 2;

            width: 68px;
            height: 68px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin-bottom: 19px;

            border-radius: 20px;

            background: white;

            font-size: 32px;

            box-shadow:
                0 10px 28px
                rgba(17,24,39,.08);
        }

        .kt-reader-title {
            position: relative;
            z-index: 2;

            max-width: 800px;

            margin: 0;

            font-size: clamp(26px, 4vw, 38px);

            line-height: 1.12;

            letter-spacing: -.9px;

            font-weight: 900;
        }

        .kt-reader-meta {
            position: relative;
            z-index: 2;

            margin-top: 10px;

            color:
                var(--kt-muted);

            font-size: 14px;
        }

        .kt-reader-body {
            max-width: 900px;

            padding: 38px;
        }

        .kt-reader-body section {
            margin-bottom: 28px;
        }

        .kt-reader-body h3 {
            margin:
                32px 0 13px;

            font-size: 22px;

            line-height: 1.25;

            letter-spacing: -.3px;
        }

        .kt-reader-body h3:first-child {
            margin-top: 0;
        }

        .kt-reader-body p {
            margin:
                0 0 15px;

            color: #374151;

            font-size: 16px;

            line-height: 1.85;
        }

        .kt-reader-body ul,
        .kt-reader-body ol {
            padding-left: 24px;

            color: #374151;
        }

        .kt-reader-body li {
            margin: 9px 0;

            line-height: 1.7;
        }

        /* =================================================
           INFO BOXES
        ================================================= */

        .kt-info-box {
            margin:
                0 0 25px;

            padding: 20px 21px;

            border:
                1px solid var(--kt-border);

            border-radius: 17px;

            background:
                #f8fafc;
        }

        .kt-info-box.warning {
            background:
                #fffaf0;

            border-color:
                #fde68a;
        }

        .kt-info-box.success {
            background:
                #f0fdf4;

            border-color:
                #bbf7d0;
        }

        .kt-box-title {
            margin-bottom: 9px;

            font-size: 14px;

            font-weight: 850;
        }

        /* =================================================
           EXAMPLES
        ================================================= */

        .kt-example-list {
            display: grid;

            gap: 13px;

            margin-top: 17px;
        }

        .kt-example {
            padding: 19px;

            border:
                1px solid var(--kt-border);

            border-radius: 16px;

            background: #fff;

            transition: .18s;
        }

        .kt-example:hover {
            border-color:
                rgba(109,93,252,.2);

            box-shadow:
                0 8px 22px
                rgba(17,24,39,.04);
        }

        .kt-example-question {
            font-size: 14px;

            font-weight: 850;
        }

        .kt-example-answer {
            margin-top: 10px;

            color:
                var(--kt-muted);

            white-space: pre-line;

            line-height: 1.75;

            font-size: 14px;
        }

        /* =================================================
           FORMULA / EXAMPLE CUSTOM
        ================================================= */

        .kitap-ornek {
            margin:
                20px 0;

            padding: 20px;

            border-left:
                4px solid var(--kt-primary);

            border-radius:
                0 15px 15px 0;

            background:
                #f7f7ff;

            line-height: 1.75;

            white-space: pre-line;
        }

        .kitap-formul {
            margin:
                20px 0;

            padding: 22px;

            border-radius: 16px;

            background:
                #f8fafc;

            text-align: center;

            font-size: 21px;

            font-weight: 850;
        }

        /* =================================================
           TEST
        ================================================= */

        .kt-test {
            margin-top: 35px;

            padding: 26px;

            border:
                1px solid #e6e3ff;

            border-radius: 21px;

            background:
                linear-gradient(
                    135deg,
                    #fafaff,
                    #f7f9ff
                );
        }

        .kt-test-title {
            margin:
                0 0 20px;

            font-size: 23px;

            font-weight: 850;
        }

        .kt-question {
            padding: 19px;

            margin-bottom: 13px;

            border:
                1px solid var(--kt-border);

            border-radius: 16px;

            background: white;
        }

        .kt-question-text {
            margin-bottom: 14px;

            font-size: 14px;

            line-height: 1.55;

            font-weight: 800;
        }

        .kt-option {
            display: block;

            padding: 12px 14px;

            margin-top: 8px;

            border:
                1px solid var(--kt-border);

            border-radius: 11px;

            cursor: pointer;

            font-size: 13px;

            transition:
                background .15s,
                border-color .15s,
                transform .15s;
        }

        .kt-option:hover {
            transform:
                translateX(2px);

            background:
                #f8f7ff;

            border-color:
                #c9c5ff;
        }

        .kt-option input {
            margin-right: 8px;
        }

        .kt-test-result {
            margin-top: 17px;

            padding: 15px 17px;

            border-radius: 13px;

            background:
                #f0fdf4;

            color:
                #166534;

            font-size: 14px;

            font-weight: 800;
        }

        /* =================================================
           ACTIONS
        ================================================= */

        .kt-reader-actions {
            display: flex;
            flex-wrap: wrap;

            gap: 10px;

            margin-top: 32px;

            padding-top: 25px;

            border-top:
                1px solid var(--kt-border);
        }

        /* =================================================
           EMPTY
        ================================================= */

        .kt-empty {
            padding: 65px 25px;

            text-align: center;

            background: white;

            border:
                1px dashed #d8dbe5;

            border-radius: 22px;
        }

        .kt-empty-icon {
            width: 68px;
            height: 68px;

            display: flex;
            align-items: center;
            justify-content: center;

            margin:
                0 auto 16px;

            border-radius: 20px;

            background:
                #f4f3ff;

            font-size: 30px;
        }

        .kt-empty strong {
            font-size: 17px;
        }

        .kt-empty p {
            margin:
                7px 0 0;

            color:
                var(--kt-muted);

            font-size: 13px;
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 760px) {

            #kitaplikApp {
                border-radius: 18px;
            }

            .kt-header {
                padding:
                    24px 17px 22px;
            }

            .kt-body {
                padding:
                    20px 16px 45px;
            }

            .kt-top-row {
                align-items: flex-start;
            }

            .kt-hero-stat {
                display: none;
            }

            .kt-brand-icon {
                width: 50px;
                height: 50px;

                border-radius: 15px;

                font-size: 25px;
            }

            .kt-title {
                font-size: 25px;
            }

            .kt-subtitle {
                font-size: 12px;
            }

            .kt-toolbar {
                flex-direction: column;

                align-items: stretch;

                margin-bottom: 22px;
            }

            .kt-search {
                min-width: 0;
            }

            .kt-toolbar .kt-btn {
                width: 100%;
            }

            .kt-section-heading {
                align-items: flex-start;

                flex-direction: column;

                gap: 10px;
            }

            .kt-section-title {
                font-size: 24px;
            }

            .kt-grid {
                grid-template-columns: 1fr;

                gap: 13px;
            }

            .kt-card {
                border-radius: 19px;

                padding: 19px;
            }

            .kt-class-card {
                min-height: 190px;
            }

            .kt-reader-head {
                padding: 25px 21px;
            }

            .kt-reader-body {
                padding: 25px 20px;
            }

            .kt-reader-title {
                font-size: 28px;
            }

            .kt-test {
                padding: 19px;
            }

            .kt-reader-actions {
                flex-direction: column;
            }

            .kt-reader-actions .kt-btn {
                width: 100%;
            }
        }

        /* =================================================
           VERY SMALL
        ================================================= */

        @media (max-width: 420px) {

            .kt-title {
                font-size: 22px;
            }

            .kt-section-title {
                font-size: 22px;
            }

            .kt-reader-title {
                font-size: 25px;
            }

            .kt-progress-wrap {
                margin-top: 20px;
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

                    <div class="kt-top-row">

                        <div class="kt-brand">

                            <div class="kt-brand-icon">
                                📚
                            </div>

                            <div>
                                <h1 class="kt-title">
                                    Ders Kitaplığı
                                </h1>

                                <p class="kt-subtitle">
                                    Derslerini keşfet, konuları öğren,
                                    testini çöz.
                                </p>
                            </div>

                        </div>

                        <div class="kt-hero-stat">
                            <span>📖</span>
                            <span>
                                <strong>
                                    ${tamamlananKonu()}
                                </strong>
                                konu tamamlandı
                            </span>
                        </div>

                    </div>

                    <div class="kt-progress-wrap">

                        <div class="kt-progress-top">

                            <span>
                                📈 Öğrenme ilerlemen
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
                        placeholder="Ders veya konu ara..."
                        value="${escapeHTML(state.arama)}"
                        autocomplete="off"
                        aria-label="Kitaplıkta ara"
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

            const sinif = getSinif();

            if (sinif) {
                parts.push(`
                    <span>›</span>

                    <button data-action="sinif">
                        ${escapeHTML(sinif.ad)}
                    </button>
                `);
            }
        }

        if (state.ders) {

            const ders = getDers();

            if (ders) {
                parts.push(`
                    <span>›</span>

                    <button data-action="ders">
                        ${escapeHTML(ders.ad)}
                    </button>
                `);
            }
        }

        if (state.konu) {

            const konu = getKonu();

            if (konu) {
                parts.push(`
                    <span>›</span>

                    <span>
                        ${escapeHTML(konu.ad)}
                    </span>
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
       ANA SAYFA
    ===================================================== */

    function renderHome() {

        const siniflar = getSiniflar();

        if (!siniflar.length) {

            return `
                ${renderToolbar()}

                <div class="kt-empty">

                    <div class="kt-empty-icon">
                        📚
                    </div>

                    <strong>
                        Kitaplık verisi bulunamadı
                    </strong>

                    <p>
                        Kitaplık veri dosyanın yüklendiğinden
                        emin ol.
                    </p>

                </div>
            `;
        }

        return `
            ${renderToolbar()}

            <div class="kt-section-heading">

                <div>

                    <h2 class="kt-section-title">
                        Öğrenmeye başlayalım 🚀
                    </h2>

                    <p class="kt-section-desc">
                        Sınıfını seç, dersini aç ve konuları
                        adım adım çalış.
                    </p>

                </div>

                <div class="kt-counter">
                    ${siniflar.length} sınıf
                </div>

            </div>

            <div class="kt-grid">

                ${siniflar.map(function (sinifKey) {

                    const sinif = DATA[sinifKey];

                    let dersSayisi = 0;
                    let konuSayisi = 0;

                    if (sinif && sinif.dersler) {

                        dersSayisi =
                            Object.keys(
                                sinif.dersler
                            ).length;

                        Object.keys(
                            sinif.dersler
                        ).forEach(function (key) {

                            const ders =
                                sinif.dersler[key];

                            if (
                                ders &&
                                Array.isArray(
                                    ders.konular
                                )
                            ) {
                                konuSayisi +=
                                    ders.konular.length;
                            }

                        });
                    }

                    const progress =
                        sinifProgress(sinif);

                    return `
                        <article
                            class="kt-card kt-class-card"
                            data-sinif="${escapeHTML(
                                sinifKey
                            )}"
                            tabindex="0"
                            role="button"
                        >

                            <div>

                                <div class="kt-class-top">

                                    <div class="kt-class-icon">
                                        ${
                                            Number(
                                                sinifKey
                                            ) >= 9
                                                ? "🎓"
                                                : "📚"
                                        }
                                    </div>

                                    <div class="kt-class-badge">
                                        ${progress}%
                                    </div>

                                </div>

                                <h3 class="kt-class-title">
                                    ${escapeHTML(
                                        sinif && sinif.ad
                                            ? sinif.ad
                                            : sinifKey + ". Sınıf"
                                    )}
                                </h3>

                                <div class="kt-card-info">
                                    ${dersSayisi} ders
                                    ·
                                    ${konuSayisi} konu
                                </div>

                            </div>

                            <div>

                                <div class="kt-card-progress">
                                    <span
                                        style="--progress:${progress}%"
                                    ></span>
                                </div>

                                <div class="kt-progress-label">
                                    <span>
                                        İlerleme
                                    </span>

                                    <span>
                                        ${progress}%
                                    </span>
                                </div>

                            </div>

                        </article>
                    `;

                }).join("")}

            </div>
        `;
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

        const dersler =
            Object.keys(
                sinif.dersler || {}
            );

        return `
            ${renderToolbar()}

            ${renderBreadcrumb()}

            <div class="kt-section-heading">

                <div>

                    <h2 class="kt-section-title">
                        ${escapeHTML(
                            sinif.ad
                        )}
                    </h2>

                    <p class="kt-section-desc">
                        Çalışmak istediğin dersi seç.
                    </p>

                </div>

                <div class="kt-counter">
                    ${dersler.length} ders
                </div>

            </div>

            <div class="kt-grid">

                ${
                    dersler.length
                        ? dersler.map(function (
                              dersKey
                          ) {

                              const ders =
                                  sinif.dersler[
                                      dersKey
                                  ];

                              const konular =
                                  ders &&
                                  Array.isArray(
                                      ders.konular
                                  )
                                      ? ders.konular
                                      : [];

                              const toplam =
                                  konular.length;

                              const tamam =
                                  konular.filter(
                                      function (
                                          konu
                                      ) {
                                          return konuTamamlandiMi(
                                              konu
                                          );
                                      }
                                  ).length;

                              const progress =
                                  dersProgress(
                                      ders
                                  );

                              return `
                                <article
                                    class="
                                        kt-card
                                        kt-lesson-card
                                    "
                                    data-ders="${escapeHTML(
                                        dersKey
                                    )}"
                                    tabindex="0"
                                    role="button"
                                >

                                    <div
                                        class="kt-lesson-icon"
                                    >
                                        ${
                                            ders &&
                                            ders.icon
                                                ? ders.icon
                                                : "📘"
                                        }
                                    </div>

                                    <h3
                                        class="kt-lesson-title"
                                    >
                                        ${escapeHTML(
                                            ders &&
                                            ders.ad
                                                ? ders.ad
                                                : dersKey
                                        )}
                                    </h3>

                                    <div
                                        class="kt-card-info"
                                        style="margin-top:7px;"
                                    >
                                        ${
                                            tamam
                                                ? `${tamam} konu tamamlandı`
                                                : `${toplam} konu`
                                        }
                                    </div>

                                    <div
                                        class="kt-lesson-bottom"
                                    >

                                        <span
                                            class="kt-lesson-count"
                                        >
                                            📖 ${toplam} konu
                                        </span>

                                        <span
                                            class="kt-lesson-percent"
                                        >
                                            ${progress}%
                                        </span>

                                    </div>

                                    <div
                                        class="kt-card-progress"
                                    >
                                        <span
                                            style="--progress:${progress}%"
                                        ></span>
                                    </div>

                                </article>
                              `;
                          }).join("")
                        : `
                            <div class="kt-empty">
                                <div class="kt-empty-icon">
                                    📚
                                </div>

                                <strong>
                                    Bu sınıfta henüz ders yok
                                </strong>
                            </div>
                        `
                }

            </div>
        `;
    }

    /* =====================================================
       KONULAR
    ===================================================== */

    function renderKonular() {

        const ders = getDers();

        if (!ders) {
            return renderDersler();
        }

        let konular =
            Array.isArray(ders.konular)
                ? ders.konular
                : [];

        const search =
            state.arama
                .trim()
                .toLocaleLowerCase("tr-TR");

        if (search) {

            konular =
                konular.filter(function (konu) {

                    const text = [
                        konu.ad,
                        konu.giris,
                        konu.anlatim,
                        konu.ozet
                    ]
                        .map(htmlToText)
                        .join(" ")
                        .toLocaleLowerCase(
                            "tr-TR"
                        );

                    return text.includes(
                        search
                    );
                });
        }

        return `
            ${renderToolbar()}

            ${renderBreadcrumb()}

            <div class="kt-section-heading">

                <div>

                    <h2 class="kt-section-title">
                        ${
                            ders.icon ||
                            "📚"
                        }
                        ${escapeHTML(
                            ders.ad
                        )}
                    </h2>

                    <p class="kt-section-desc">
                        Konuyu seç ve öğrenmeye başla.
                    </p>

                </div>

                <div class="kt-counter">
                    ${konular.length} konu
                </div>

            </div>

            ${
                konular.length

                    ? `
                        <div class="kt-grid">

                            ${konular
                                .map(
                                    function (
                                        konu,
                                        index
                                    ) {

                                        const tamam =
                                            konuTamamlandiMi(
                                                konu
                                            );

                                        const giris =
                                            htmlToText(
                                                konu.giris
                                            );

                                        return `
                                            <article
                                                class="
                                                    kt-card
                                                    kt-topic-card
                                                "
                                                data-konu="${escapeHTML(
                                                    konu.id
                                                )}"
                                                tabindex="0"
                                                role="button"
                                            >

                                                <div
                                                    class="kt-topic-number"
                                                >
                                                    ${index + 1}
                                                </div>

                                                <div
                                                    class="kt-card-icon"
                                                >
                                                    📖
                                                </div>

                                                <h3
                                                    class="kt-card-title"
                                                >
                                                    ${escapeHTML(
                                                        konu.ad
                                                    )}
                                                </h3>

                                                <div
                                                    class="kt-card-info"
                                                >
                                                    ${escapeHTML(
                                                        giris.slice(
                                                            0,
                                                            105
                                                        )
                                                    )}${
                                                        giris.length >
                                                        105
                                                            ? "..."
                                                            : ""
                                                    }
                                                </div>

                                                ${
                                                    tamam
                                                        ? `
                                                            <div
                                                                class="
                                                                    kt-topic-done
                                                                "
                                                            >
                                                                ✓
                                                                Tamamlandı
                                                            </div>
                                                          `
                                                        : `
                                                            <div
                                                                class="
                                                                    kt-card-info
                                                                "
                                                                style="
                                                                    margin-top:13px;
                                                                    color:#6d5dfc;
                                                                    font-weight:700;
                                                                "
                                                            >
                                                                Konuyu aç →
                                                            </div>
                                                          `
                                                }

                                            </article>
                                        `;
                                    }
                                )
                                .join("")}

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
                                Arama kelimesini değiştirmeyi
                                deneyebilirsin.
                            </p>

                        </div>
                    `
            }
        `;
    }

    /* =====================================================
       KONU OKUMA
    ===================================================== */

    function renderKonu() {

        const ders = getDers();
        const konu = getKonu();

        if (!ders || !konu) {
            return renderKonular();
        }

        const tamam =
            konuTamamlandiMi(konu);

        return `
            ${renderToolbar()}

            ${renderBreadcrumb()}

            <article class="kt-reader">

                <header
                    class="kt-reader-head"
                >

                    <div
                        class="kt-reader-icon"
                    >
                        ${
                            ders.icon ||
                            "📖"
                        }
                    </div>

                    <h2
                        class="kt-reader-title"
                    >
                        ${escapeHTML(
                            konu.ad
                        )}
                    </h2>

                    <div
                        class="kt-reader-meta"
                    >
                        ${escapeHTML(
                            getSinif().ad
                        )}
                        ·
                        ${escapeHTML(
                            ders.ad
                        )}
                    </div>

                </header>

                <div class="kt-reader-body">

                    ${
                        konu.giris
                            ? `
                                <div
                                    class="kt-info-box"
                                >

                                    <div
                                        class="kt-box-title"
                                    >
                                        📖 Konuya Giriş
                                    </div>

                                    <div>
                                        ${formatText(
                                            konu.giris
                                        )}
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
                        Array.isArray(
                            konu.temelBilgi
                        )
                            ? `
                                <div
                                    class="kt-info-box"
                                >

                                    <div
                                        class="kt-box-title"
                                    >
                                        💡 Temel Bilgiler
                                    </div>

                                    <ul>

                                        ${konu.temelBilgi
                                            .map(
                                                function (
                                                    bilgi
                                                ) {
                                                    return `
                                                        <li>
                                                            ${escapeHTML(
                                                                bilgi
                                                            )}
                                                        </li>
                                                    `;
                                                }
                                            )
                                            .join("")}

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

                                    <div
                                        class="
                                            kt-example-list
                                        "
                                    >

                                        ${konu.ornekler
                                            .map(
                                                function (
                                                    ornek,
                                                    index
                                                ) {

                                                    return `
                                                        <div
                                                            class="kt-example"
                                                        >

                                                            <div
                                                                class="
                                                                    kt-example-question
                                                                "
                                                            >
                                                                Örnek
                                                                ${index + 1}
                                                            </div>

                                                            <div
                                                                style="
                                                                    margin-top:8px;
                                                                    line-height:1.65;
                                                                "
                                                            >
                                                                ${escapeHTML(
                                                                    ornek.soru
                                                                )}
                                                            </div>

                                                            <div
                                                                class="
                                                                    kt-example-answer
                                                                "
                                                            >
                                                                <strong>
                                                                    Çözüm:
                                                                </strong>

                                                                ${escapeHTML(
                                                                    ornek.cozum
                                                                )}
                                                            </div>

                                                        </div>
                                                    `;
                                                }
                                            )
                                            .join("")}

                                    </div>

                                </section>
                            `
                            : ""
                    }

                    ${
                        konu.dikkat
                            ? `
                                <div
                                    class="
                                        kt-info-box
                                        warning
                                    "
                                >

                                    <div
                                        class="kt-box-title"
                                    >
                                        ⚠️ Dikkat!
                                    </div>

                                    <div>
                                        ${formatText(
                                            konu.dikkat
                                        )}
                                    </div>

                                </div>
                            `
                            : ""
                    }

                    ${
                        konu.ozet
                            ? `
                                <div
                                    class="
                                        kt-info-box
                                        success
                                    "
                                >

                                    <div
                                        class="kt-box-title"
                                    >
                                        ⭐ Kısaca
                                    </div>

                                    <div>
                                        ${formatText(
                                            konu.ozet
                                        )}
                                    </div>

                                </div>
                            `
                            : ""
                    }

                    ${
                        konu.test &&
                        konu.test.length
                            ? renderTest(
                                  konu
                              )
                            : ""
                    }

                    <div
                        class="kt-reader-actions"
                    >

                        <button
                            class="
                                kt-btn
                                kt-btn-light
                            "
                            data-action="ders"
                        >
                            ← Konu Listesine Dön
                        </button>

                        <button
                            class="
                                kt-btn
                                kt-btn-primary
                            "
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

    /* =====================================================
       TEST
    ===================================================== */

    function renderTest(konu) {

        return `
            <section class="kt-test">

                <h3
                    class="kt-test-title"
                >
                    📝 Mini Test
                </h3>

                <form
                    id="kitaplikTestForm"
                >

                    ${
                        konu.test
                            .map(
                                function (
                                    soru,
                                    index
                                ) {

                                    return `
                                        <div
                                            class="kt-question"
                                        >

                                            <div
                                                class="
                                                    kt-question-text
                                                "
                                            >
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
                                                        .map(
                                                            function (
                                                                secenek,
                                                                optionIndex
                                                            ) {

                                                                const checked =
                                                                    String(
                                                                        state.testCevaplari[
                                                                            index
                                                                        ]
                                                                    ) ===
                                                                    String(
                                                                        optionIndex
                                                                    );

                                                                return `
                                                                    <label
                                                                        class="
                                                                            kt-option
                                                                        "
                                                                    >

                                                                        <input
                                                                            type="radio"
                                                                            name="soru-${index}"
                                                                            value="${optionIndex}"
                                                                            ${
                                                                                checked
                                                                                    ? "checked"
                                                                                    : ""
                                                                            }
                                                                        >

                                                                        ${escapeHTML(
                                                                            secenek
                                                                        )}

                                                                    </label>
                                                                `;
                                                            }
                                                        )
                                                        .join("")
                                                    : ""
                                            }

                                        </div>
                                    `;
                                }
                            )
                            .join("")
                    }

                    <button
                        type="submit"
                        class="
                            kt-btn
                            kt-btn-primary
                        "
                    >
                        Testi Kontrol Et →
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

        if (!root) {
            return;
        }

        let content = "";

        if (!state.sinif) {

            content =
                renderHome();

        } else if (!state.ders) {

            content =
                renderDersler();

        } else if (!state.konu) {

            content =
                renderKonular();

        } else {

            content =
                renderKonu();
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

        root
            .querySelectorAll(
                "[data-sinif]"
            )
            .forEach(function (el) {

                function open() {

                    state.sinif =
                        el.getAttribute(
                            "data-sinif"
                        );

                    state.ders = null;
                    state.konu = null;
                    state.arama = "";

                    render();
                    scrollTop();
                }

                el.addEventListener(
                    "click",
                    open
                );

                el.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                                "Enter" ||
                            event.key ===
                                " "
                        ) {
                            event.preventDefault();
                            open();
                        }

                    }
                );
            });

        /* DERS */

        root
            .querySelectorAll(
                "[data-ders]"
            )
            .forEach(function (el) {

                function open() {

                    state.ders =
                        el.getAttribute(
                            "data-ders"
                        );

                    state.konu = null;
                    state.arama = "";

                    render();
                    scrollTop();
                }

                el.addEventListener(
                    "click",
                    open
                );

                el.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                                "Enter" ||
                            event.key ===
                                " "
                        ) {
                            event.preventDefault();
                            open();
                        }

                    }
                );
            });

        /* KONU */

        root
            .querySelectorAll(
                "[data-konu]"
            )
            .forEach(function (el) {

                function open() {

                    state.konu =
                        el.getAttribute(
                            "data-konu"
                        );

                    state.testCevaplari = {};

                    render();
                    scrollTop();
                }

                el.addEventListener(
                    "click",
                    open
                );

                el.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key ===
                                "Enter" ||
                            event.key ===
                                " "
                        ) {
                            event.preventDefault();
                            open();
                        }

                    }
                );
            });

        /* ACTION */

        root
            .querySelectorAll(
                "[data-action]"
            )
            .forEach(function (el) {

                el.addEventListener(
                    "click",
                    function () {

                        const action =
                            el.getAttribute(
                                "data-action"
                            );

                        if (
                            action ===
                            "home"
                        ) {

                            state.sinif = null;
                            state.ders = null;
                            state.konu = null;
                            state.arama = "";

                            render();
                            scrollTop();

                        }

                        else if (
                            action ===
                            "sinif"
                        ) {

                            state.ders = null;
                            state.konu = null;
                            state.arama = "";

                            render();
                            scrollTop();

                        }

                        else if (
                            action ===
                            "ders"
                        ) {

                            state.konu = null;
                            state.arama = "";

                            render();
                            scrollTop();

                        }

                        else if (
                            action ===
                            "complete"
                        ) {

                            konuTamamla(
                                getKonu()
                            );

                            scrollTop();
                        }

                    }
                );
            });

        /* SEARCH */

        const search =
            root.querySelector(
                "#kitaplikSearch"
            );

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
                        event.target.type ===
                            "radio"
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

                        state.testCevaplari[
                            index
                        ] =
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

        if (
            !konu ||
            !Array.isArray(konu.test)
        ) {
            return;
        }

        let dogru = 0;
        let cevaplanan = 0;

        konu.test.forEach(
            function (
                soru,
                index
            ) {

                if (
                    state.testCevaplari[
                        index
                    ] !== undefined
                ) {

                    cevaplanan++;

                    if (
                        Number(
                            state.testCevaplari[
                                index
                            ]
                        ) ===
                        Number(
                            soru.cevap
                        )
                    ) {
                        dogru++;
                    }
                }
            }
        );

        const sonuc =
            root.querySelector(
                "#kitaplikTestResult"
            );

        if (!sonuc) {
            return;
        }

        sonuc.style.display =
            "block";

        if (
            cevaplanan <
            konu.test.length
        ) {

            sonuc.className =
                "kt-test-result";

            sonuc.textContent =
                `Test tamamlanmadı. ${cevaplanan}/${konu.test.length} soru cevaplandı.`;

            return;
        }

        const yuzdeTest =
            Math.round(
                (dogru /
                    konu.test.length) *
                    100
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

        if (
            yuzdeTest >= 70
        ) {

            const konuObj =
                getKonu();

            if (konuObj) {

                state.tamamlananlar[
                    konuObj.id
                ] = true;

                saveCompleted();

                setTimeout(
                    function () {
                        render();
                    },
                    900
                );
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

            window.scrollTo(
                0,
                0
            );
        }
    }

    /* =====================================================
       DIŞ API
    ===================================================== */

    window.DersTakipKitaplik = {

        anaSayfa: function () {

            state.sinif = null;
            state.ders = null;
            state.konu = null;
            state.arama = "";

            render();
        },

        sinifAc: function (
            sinif
        ) {

            if (
                !DATA[
                    String(sinif)
                ]
            ) {

                console.warn(
                    "Kitaplık: Sınıf bulunamadı:",
                    sinif
                );

                return;
            }

            state.sinif =
                String(sinif);

            state.ders = null;
            state.konu = null;

            render();
            scrollTop();
        },

        dersAc: function (
            sinif,
            ders
        ) {

            sinif =
                String(sinif);

            if (
                !DATA[sinif] ||
                !DATA[sinif].dersler ||
                !DATA[sinif].dersler[
                    ders
                ]
            ) {

                console.warn(
                    "Kitaplık: Ders bulunamadı:",
                    sinif,
                    ders
                );

                return;
            }

            state.sinif =
                sinif;

            state.ders =
                ders;

            state.konu = null;

            render();
            scrollTop();
        },

        konuAc: function (
            sinif,
            ders,
            konuId
        ) {

            sinif =
                String(sinif);

            if (
                !DATA[sinif] ||
                !DATA[sinif].dersler ||
                !DATA[sinif].dersler[
                    ders
                ]
            ) {
                return;
            }

            const dersObj =
                DATA[sinif]
                    .dersler[ders];

            const konu =
                Array.isArray(
                    dersObj.konular
                )
                    ? dersObj.konular.find(
                          function (
                              item
                          ) {

                              return (
                                  String(
                                      item.id
                                  ) ===
                                  String(
                                      konuId
                                  )
                              );
                          }
                      )
                    : null;

            if (!konu) {

                console.warn(
                    "Kitaplık: Konu bulunamadı:",
                    konuId
                );

                return;
            }

            state.sinif =
                sinif;

            state.ders =
                ders;

            state.konu =
                konu.id;

            render();
            scrollTop();
        },

        yenile: function () {
            render();
        },

        ilerleme: function () {

            return {
                toplam:
                    toplamKonu(),

                tamamlanan:
                    tamamlananKonu(),

                yuzde:
                    yuzde()
            };
        },

        tamamlananlariSifirla:
            function () {

                state.tamamlananlar =
                    {};

                saveCompleted();

                render();
            }
    };

    /* =====================================================
       BAŞLAT
    ===================================================== */

    function initKitaplik() {

        root =
            document.getElementById(
                "kitaplikApp"
            );

        /*
         * Kitaplık olmayan sayfalarda hata verme.
         */
        if (!root) {

            console.info(
                "DersTakip Kitaplık: Bu sayfada #kitaplikApp bulunmuyor."
            );

            return;
        }

        injectStyles();

        render();
    }

    /*
     * Script head içerisinde olsa bile
     * DOM hazır olduktan sonra çalışır.
     */
    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initKitaplik
        );

    } else {

        initKitaplik();
    }

})();
