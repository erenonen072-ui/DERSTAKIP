/* =========================================================
   DERS TAKİP 2.0 - TEK PARÇA APP.JS
   HTML yapınla uyumludur.
   JSON hatalarına karşı güvenli localStorage kullanır.
========================================================= */

"use strict";

/* =========================================================
   API
========================================================= */

const API_BASE = "/api";

async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    const text = await response.text();

    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      console.warn("API JSON değil:", text);
      data = {
        success: false,
        message: text || "Sunucudan geçersiz cevap geldi."
      };
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
        `Sunucu hatası: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.warn("API isteği başarısız:", error);
    throw error;
  }
}

/* =========================================================
   SAFE STORAGE
========================================================= */

function safeGet(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(
      key,
      typeof value === "string"
        ? value
        : JSON.stringify(value)
    );
    return true;
  } catch (error) {
    console.warn("Storage yazılamadı:", error);
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

/* =========================================================
   STATE
========================================================= */

const DEFAULT_STATE = {
  user: null,

  xp: 0,
  coins: 0,
  streak: 0,

  level: 1,

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    happiness: 70,
    energy: 80
  },

  tasks: [],

  subjects: [
    {
      id: "mat",
      name: "Matematik",
      icon: "📐",
      color: "#6857f5"
    },
    {
      id: "tur",
      name: "Türkçe",
      icon: "📖",
      color: "#20c997"
    },
    {
      id: "fen",
      name: "Fen Bilimleri",
      icon: "🔬",
      color: "#3b82f6"
    }
  ],

  exams: [],

  completedDates: [],

  lastReward: null,

  settings: {
    dark: false
  },

  focus: {
    minutes: 25,
    seconds: 0,
    running: false,
    mode: "Pomodoro"
  },

  stats: {
    totalFocusMinutes: 0,
    completedTasks: 0,
    studyDays: 0
  }
};

let state = loadState();

let currentPage = "home";
let focusInterval = null;

/* =========================================================
   LOAD STATE
========================================================= */

function loadState() {
  const saved = safeGet("dersTakip_state", null);

  if (!saved || typeof saved !== "object") {
    return structuredClone(DEFAULT_STATE);
  }

  return mergeState(
    structuredClone(DEFAULT_STATE),
    saved
  );
}

function mergeState(base, saved) {
  Object.keys(saved || {}).forEach(key => {
    if (
      saved[key] &&
      typeof saved[key] === "object" &&
      !Array.isArray(saved[key]) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      base[key] = mergeState(base[key], saved[key]);
    } else {
      base[key] = saved[key];
    }
  });

  return base;
}

function saveState() {
  safeSet("dersTakip_state", state);
}

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  bindGlobalEvents();
  checkLogin();
});

function bindGlobalEvents() {
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileMenu();
    }
  });
}

/* =========================================================
   AUTH
========================================================= */

function checkLogin() {
  const loggedIn = safeGet("dersTakip_loggedIn", false);

  if (loggedIn && state.user) {
    showApp();
  } else {
    showAuth();
  }
}

function showAuth() {
  const auth = document.getElementById("authScreen");
  const app = document.getElementById("app");

  if (auth) auth.style.display = "flex";
  if (app) app.style.display = "none";
}

function showApp() {
  const auth = document.getElementById("authScreen");
  const app = document.getElementById("app");

  if (auth) auth.style.display = "none";
  if (app) app.style.display = "block";

  updateUI();
  navigate("home");
}

function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (loginForm) loginForm.style.display = "block";
  if (registerForm) registerForm.style.display = "none";

  loginTab?.classList.add("active");
  registerTab?.classList.remove("active");

  clearAuthMessage();
}

function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (loginForm) loginForm.style.display = "none";
  if (registerForm) registerForm.style.display = "block";

  loginTab?.classList.remove("active");
  registerTab?.classList.add("active");

  clearAuthMessage();
}

async function register(event) {
  event.preventDefault();

  const name =
    document.getElementById("registerName")?.value.trim();

  const email =
    document.getElementById("registerEmail")?.value.trim();

  const password =
    document.getElementById("registerPassword")?.value;

  if (!name || !email || !password) {
    setAuthMessage(
      "Lütfen tüm alanları doldur.",
      "error"
    );
    return;
  }

  if (password.length < 6) {
    setAuthMessage(
      "Şifre en az 6 karakter olmalı.",
      "error"
    );
    return;
  }

  /* Önce yerel kullanıcı oluştur */
  state.user = {
    name,
    email
  };

  state.xp = 0;
  state.coins = 0;
  state.streak = 0;

  saveState();

  safeSet("dersTakip_account", {
    name,
    email,
    password
  });

  safeSet("dersTakip_loggedIn", true);

  setAuthMessage(
    "Hesabın oluşturuldu! 🎉",
    "success"
  );

  setTimeout(showApp, 400);
}

async function login(event) {
  event.preventDefault();

  const email =
    document.getElementById("loginEmail")?.value.trim();

  const password =
    document.getElementById("loginPassword")?.value;

  const account =
    safeGet("dersTakip_account", null);

  if (!account) {
    setAuthMessage(
      "Henüz hesap yok. Önce kayıt ol.",
      "error"
    );
    return;
  }

  if (
    email !== account.email ||
    password !== account.password
  ) {
    setAuthMessage(
      "E-posta veya şifre yanlış.",
      "error"
    );
    return;
  }

  state.user = {
    name: account.name,
    email: account.email
  };

  saveState();
  safeSet("dersTakip_loggedIn", true);

  setAuthMessage(
    "Giriş başarılı! 🚀",
    "success"
  );

  setTimeout(showApp, 300);
}

function logout() {
  safeSet("dersTakip_loggedIn", false);
  stopFocusTimer();

  closeMobileMenu();

  showAuth();

  showToast("Çıkış yapıldı 👋");
}

function togglePassword(id, button) {
  const input = document.getElementById(id);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";

    if (button) {
      button.textContent = "🙈";
    }
  } else {
    input.type = "password";

    if (button) {
      button.textContent = "👁️";
    }
  }
}

function setAuthMessage(message, type = "") {
  const element =
    document.getElementById("authMessage");

  if (!element) return;

  element.textContent = message;

  element.style.color =
    type === "error"
      ? "#d63c4e"
      : type === "success"
        ? "#15966e"
        : "#555";
}

function clearAuthMessage() {
  const element =
    document.getElementById("authMessage");

  if (element) {
    element.textContent = "";
  }
}

/* =========================================================
   NAVIGATION
========================================================= */

const pageTitles = {
  home: [
    "Merhaba! 👋",
    "Bugün küçük bir adım, yarın büyük bir başarı."
  ],

  tasks: [
    "Görevlerin ✅",
    "Bugün yapacaklarını burada yönet."
  ],

  subjects: [
    "Derslerin 📚",
    "Derslerini düzenle ve ilerlemeni takip et."
  ],

  exams: [
    "Sınav Takvimi 📅",
    "Yaklaşan sınavlarını takip et."
  ],

  focus: [
    "Odaklan ⏱️",
    "Telefonu bırak, derse odaklan."
  ],

  coach: [
    "Ders Koçu 🤖",
    "Bugünkü çalışma planını birlikte oluşturalım."
  ],

  pet: [
    "Evcil Hayvan 🐼",
    "Evcil hayvanını geliştir ve mutlu et."
  ],

  market: [
    "Ödül Marketi 🛒",
    "Kazandığın coinlerle ödüller al."
  ],

  achievements: [
    "Rozetlerin 🏆",
    "Başarılarını ve kazandığın rozetleri gör."
  ],

  stats: [
    "İstatistikler 📊",
    "Çalışma performansını incele."
  ],

  profile: [
    "Profilim 👤",
    "Hesabını ve tercihlerini yönet."
  ]
};

function navigate(page, button = null) {
  currentPage = page;

  document
    .querySelectorAll(".menu button")
    .forEach(btn => btn.classList.remove("active"));

  if (button) {
    button.classList.add("active");
  } else {
    document
      .querySelectorAll(".menu button")
      .forEach(btn => {
        if (
          btn.getAttribute("onclick")?.includes(
            `'${page}'`
          )
        ) {
          btn.classList.add("active");
        }
      });
  }

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(btn => {
      btn.classList.remove("active");

      if (
        btn.getAttribute("onclick")?.includes(
          `'${page}'`
        )
      ) {
        btn.classList.add("active");
      }
    });

  updateHeader(page);

  /*
    ANA SAYFA:
    Çok sade.
    Coach / pet / streak / reward burada gösterilmez.
  */

  if (page === "home") {
    renderHome();
    return;
  }

  renderPage(page);

  closeMobileMenu();
}

function navigateMobile(page) {
  navigate(page);
}

function updateHeader(page) {
  const title = pageTitles[page] || pageTitles.home;

  const welcome =
    document.getElementById("welcomeText");

  const subtitle =
    document.getElementById("sectionSubtitle");

  if (welcome) {
    if (page === "home" && state.user) {
      welcome.textContent =
        `Merhaba, ${state.user.name}! 👋`;
    } else {
      welcome.textContent = title[0];
    }
  }

  if (subtitle) {
    subtitle.textContent = title[1];
  }
}

/* =========================================================
   HOME
========================================================= */

function renderHome() {
  const homeHero =
    document.getElementById("homeHero");

  const mainContent =
    document.getElementById("mainContent");

  if (!homeHero || !mainContent) return;

  homeHero.style.display = "block";

  /*
    Ana sayfada sadece:
    - hedef
    - görevler
    - basit istatistik
  */

  mainContent.innerHTML = `
    <div class="card" id="tasksSection">
      <div class="card-title">
        <h2>Bugünkü Görevler</h2>
        <span id="taskCounter">0 / 0</span>
      </div>

      <div id="taskList"></div>

      <div class="add-task">
        <input
          id="newTask"
          placeholder="Yeni görev ekle..."
          maxlength="150"
          onkeydown="if(event.key==='Enter') addTask()"
        >

        <button onclick="addTask()">
          + Ekle
        </button>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <span>⭐</span>
        <strong id="statXP">${state.xp}</strong>
        <small>Toplam XP</small>
      </div>

      <div class="stat">
        <span>🪙</span>
        <strong id="statCoins">${state.coins}</strong>
        <small>Coin</small>
      </div>

      <div class="stat">
        <span>📚</span>
        <strong>${state.stats.totalFocusMinutes}</strong>
        <small>Çalışma dakikası</small>
      </div>
    </div>
  `;

  renderTasks();
  updateHomeHero();
}

/* =========================================================
   PAGE RENDER
========================================================= */

function renderPage(page) {
  const homeHero =
    document.getElementById("homeHero");

  const mainContent =
    document.getElementById("mainContent");

  if (!mainContent) return;

  if (homeHero) {
    homeHero.style.display = "none";
  }

  if (page === "tasks") {
    renderTasksPage(mainContent);
  }

  else if (page === "subjects") {
    renderSubjectsPage(mainContent);
  }

  else if (page === "exams") {
    renderExamsPage(mainContent);
  }

  else if (page === "focus") {
    renderFocusPage(mainContent);
  }

  else if (page === "coach") {
    renderCoachPage(mainContent);
  }

  else if (page === "pet") {
    renderPetPage(mainContent);
  }

  else if (page === "market") {
    renderMarketPage(mainContent);
  }

  else if (page === "achievements") {
    renderAchievementsPage(mainContent);
  }

  else if (page === "stats") {
    renderStatsPage(mainContent);
  }

  else if (page === "profile") {
    renderProfilePage(mainContent);
  }
}

/* =========================================================
   TASKS
========================================================= */

function renderTasksPage(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-title">
        <h2>✅ Görev Yönetimi</h2>
        <span>${state.tasks.length} görev</span>
      </div>

      <div id="taskList"></div>

      <div class="add-task">
        <input
          id="newTask"
          placeholder="Yeni görev ekle..."
          maxlength="150"
          onkeydown="if(event.key==='Enter') addTask()"
        >

        <button onclick="addTask()">
          + Görev Ekle
        </button>
      </div>
    </div>

    <div class="card" style="margin-top:20px">
      <h2>💡 Görev önerisi</h2>

      <p style="color:var(--muted);margin-top:10px">
        Büyük bir görevi küçük parçalara ayır.
        Böylece tamamlamak daha kolay olur.
      </p>
    </div>
  `;

  renderTasks();
}

function renderTasks() {
  const list =
    document.getElementById("taskList");

  if (!list) return;

  const counter =
    document.getElementById("taskCounter");

  const completed =
    state.tasks.filter(task => task.completed).length;

  if (counter) {
    counter.textContent =
      `${completed} / ${state.tasks.length}`;
  }

  if (state.tasks.length === 0) {
    list.innerHTML = `
      <div style="
        padding:30px 10px;
        text-align:center;
        color:var(--muted);
      ">
        <div style="font-size:45px">📝</div>
        <strong>Henüz görev yok</strong>
        <p style="margin-top:5px">
          İlk görevini ekle!
        </p>
      </div>
    `;

    return;
  }

  list.innerHTML = state.tasks.map(task => `
    <div class="task ${task.completed ? "completed" : ""}">

      <button
        class="checkbox"
        onclick="toggleTask('${task.id}')"
        aria-label="Görevi tamamla"
      >
        ${task.completed ? "✓" : ""}
      </button>

      <div class="task-content">
        <div class="task-name">
          ${escapeHTML(task.name)}
        </div>

        <small style="color:var(--muted)">
          ${task.subject || "Genel"}
        </small>
      </div>

      <span class="task-xp">
        +${task.xp} XP
      </span>

      <button
        class="delete-task"
        onclick="deleteTask('${task.id}')"
        title="Sil"
      >
        🗑️
      </button>

    </div>
  `).join("");
}

function addTask() {
  const input =
    document.getElementById("newTask");

  if (!input) return;

  const name = input.value.trim();

  if (!name) {
    showToast("Görev adını yaz.");
    return;
  }

  const task = {
    id:
      Date.now().toString(36) +
      Math.random().toString(36).slice(2),

    name,

    xp: 25,

    completed: false,

    subject: "Genel",

    createdAt:
      new Date().toISOString()
  };

  state.tasks.unshift(task);

  saveState();

  input.value = "";

  renderTasks();

  updateHomeHero();

  showToast("Görev eklendi ✅");
}

function toggleTask(id) {
  const task =
    state.tasks.find(t => t.id === id);

  if (!task) return;

  if (!task.completed) {
    task.completed = true;

    state.xp += task.xp;
    state.coins += 5;

    state.stats.completedTasks++;

    addStudyDay();

    updateLevel();

    state.pet.happiness =
      Math.min(100, state.pet.happiness + 4);

    state.pet.energy =
      Math.min(100, state.pet.energy + 2);

    saveState();

    renderTasks();

    updateUI();

    celebrate(
      `⭐ +${task.xp} XP<br>🪙 +5 Coin`
    );
  } else {
    task.completed = false;

    state.xp =
      Math.max(0, state.xp - task.xp);

    state.coins =
      Math.max(0, state.coins - 5);

    state.stats.completedTasks =
      Math.max(
        0,
        state.stats.completedTasks - 1
      );

    saveState();

    renderTasks();
    updateUI();
  }
}

function deleteTask(id) {
  const task =
    state.tasks.find(t => t.id === id);

  if (!task) return;

  state.tasks =
    state.tasks.filter(t => t.id !== id);

  saveState();

  renderTasks();
  updateHomeHero();

  showToast("Görev silindi 🗑️");
}

function addStudyDay() {
  const today =
    new Date().toISOString().slice(0, 10);

  if (
    !state.completedDates.includes(today)
  ) {
    state.completedDates.push(today);

    state.stats.studyDays =
      state.completedDates.length;

    state.streak = calculateStreak();
  }
}

function calculateStreak() {
  const dates =
    [...state.completedDates]
      .sort()
      .reverse();

  if (!dates.length) return 0;

  let streak = 0;

  let current = new Date();

  for (const date of dates) {
    const expected =
      current.toISOString().slice(0, 10);

    if (date === expected) {
      streak++;

      current.setDate(
        current.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
}

/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjectsPage(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-title">
        <h2>📚 Derslerim</h2>

        <button
          class="primary-btn"
          onclick="addSubject()"
        >
          + Ders Ekle
        </button>
      </div>

      <div class="market-grid">
        ${state.subjects.map(subject => `
          <div class="shop-item">

            <div class="shop-icon">
              ${subject.icon}
            </div>

            <h3>
              ${escapeHTML(subject.name)}
            </h3>

            <p>
              Ders takibini burada yapabilirsin.
            </p>

            <button
              class="secondary-btn"
              onclick="subjectTasks('${subject.id}')"
            >
              Görevler
            </button>

          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function addSubject() {
  const name =
    prompt("Ders adı:");

  if (!name?.trim()) return;

  state.subjects.push({
    id: Date.now().toString(36),
    name: name.trim(),
    icon: "📘",
    color: "#6857f5"
  });

  saveState();

  renderPage("subjects");

  showToast("Ders eklendi 📚");
}

function subjectTasks(id) {
  const subject =
    state.subjects.find(s => s.id === id);

  if (!subject) return;

  const tasks =
    state.tasks.filter(
      task => task.subject === subject.name
    );

  openModal(
    subject.name,
    `
      <h3>${subject.icon} ${escapeHTML(subject.name)}</h3>

      <p style="color:var(--muted);margin:10px 0 20px">
        ${tasks.length} görev bulunuyor.
      </p>

      ${
        tasks.length
          ? tasks.map(task => `
              <div style="
                padding:12px;
                border-bottom:1px solid var(--border)
              ">
                ${task.completed ? "✅" : "⬜"}
                ${escapeHTML(task.name)}
              </div>
            `).join("")
          : `
            <p style="color:var(--muted)">
              Bu derse ait görev yok.
            </p>
          `
      }
    `
  );
}

/* =========================================================
   EXAMS
========================================================= */

function renderExamsPage(container) {
  const exams =
    [...state.exams].sort(
      (a,b) =>
        new Date(a.date) -
        new Date(b.date)
    );

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>📅 Sınavlarım</h2>

        <button
          class="primary-btn"
          onclick="addExam()"
        >
          + Sınav Ekle
        </button>
      </div>

      ${
        exams.length
          ? exams.map(exam => `
            <div class="task">

              <div style="font-size:28px">
                📝
              </div>

              <div class="task-content">
                <div class="task-name">
                  ${escapeHTML(exam.name)}
                </div>

                <small style="color:var(--muted)">
                  ${escapeHTML(exam.subject)}
                  ·
                  ${formatDate(exam.date)}
                </small>
              </div>

              <button
                class="delete-task"
                onclick="deleteExam('${exam.id}')"
              >
                🗑️
              </button>

            </div>
          `).join("")
          : `
            <div style="
              text-align:center;
              padding:45px;
              color:var(--muted)
            ">
              <div style="font-size:50px">
                📅
              </div>

              <strong>
                Henüz sınav eklemedin.
              </strong>

              <p style="margin-top:6px">
                İlk sınavını ekleyerek başlayabilirsin.
              </p>
            </div>
          `
      }

    </div>
  `;
}

function addExam() {
  const name =
    prompt("Sınav adı:");

  if (!name?.trim()) return;

  const subject =
    prompt("Ders:");

  if (!subject?.trim()) return;

  const date =
    prompt(
      "Tarih gir (YYYY-AA-GG):",
      new Date().toISOString().slice(0,10)
    );

  if (!date) return;

  state.exams.push({
    id: Date.now().toString(36),
    name: name.trim(),
    subject: subject.trim(),
    date
  });

  saveState();

  renderPage("exams");

  showToast("Sınav eklendi 📅");
}

function deleteExam(id) {
  state.exams =
    state.exams.filter(
      exam => exam.id !== id
    );

  saveState();

  renderPage("exams");

  showToast("Sınav silindi.");
}

/* =========================================================
   FOCUS
========================================================= */

function renderFocusPage(container) {
  container.innerHTML = `
    <div class="card focus">

      <h2>⏱️ Odaklanma Zamanı</h2>

      <p style="
        color:var(--muted);
        margin-top:7px
      ">
        ${state.focus.mode}
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTimer()}
      </div>

      <div class="focus-buttons">

        <button
          class="primary-btn"
          id="focusStartButton"
          onclick="toggleFocusTimer()"
        >
          ▶ Başlat
        </button>

        <button
          class="secondary-btn"
          onclick="resetFocusTimer()"
        >
          ↺ Sıfırla
        </button>

      </div>

      <div style="
        margin-top:30px;
        display:flex;
        justify-content:center;
        gap:10px;
        flex-wrap:wrap
      ">

        <button
          class="secondary-btn"
          onclick="setFocusTime(25)"
        >
          25 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusTime(45)"
        >
          45 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusTime(60)"
        >
          60 dk
        </button>

      </div>

    </div>

    <div class="card" style="margin-top:20px">

      <h2>💡 Odaklanma İpucu</h2>

      <p style="
        color:var(--muted);
        line-height:1.7;
        margin-top:10px
      ">
        Çalışırken bildirimlerini kapat.
        Tek bir derse odaklan ve süre sonunda
        kısa bir mola ver.
      </p>

    </div>
  `;

  updateFocusDisplay();
}

function formatTimer() {
  const minutes =
    String(state.focus.minutes).padStart(2, "0");

  const seconds =
    String(state.focus.seconds).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function updateFocusDisplay() {
  const timer =
    document.getElementById("focusTimer");

  const button =
    document.getElementById(
      "focusStartButton"
    );

  if (timer) {
    timer.textContent = formatTimer();
  }

  if (button) {
    button.textContent =
      state.focus.running
        ? "⏸ Duraklat"
        : "▶ Başlat";
  }
}

function toggleFocusTimer() {
  if (state.focus.running) {
    stopFocusTimer();
  } else {
    startFocusTimer();
  }
}

function startFocusTimer() {
  if (focusInterval) return;

  state.focus.running = true;

  focusInterval =
    setInterval(() => {
      if (
        state.focus.minutes === 0 &&
        state.focus.seconds === 0
      ) {
        finishFocusSession();
        return;
      }

      if (state.focus.seconds > 0) {
        state.focus.seconds--;
      } else {
        state.focus.minutes--;
        state.focus.seconds = 59;
      }

      updateFocusDisplay();
    }, 1000);

  updateFocusDisplay();
}

function stopFocusTimer() {
  if (focusInterval) {
    clearInterval(focusInterval);
    focusInterval = null;
  }

  state.focus.running = false;

  updateFocusDisplay();
}

function resetFocusTimer() {
  stopFocusTimer();

  state.focus.minutes = 25;
  state.focus.seconds = 0;

  saveState();

  updateFocusDisplay();
}

function setFocusTime(minutes) {
  stopFocusTimer();

  state.focus.minutes = minutes;
  state.focus.seconds = 0;

  saveState();

  updateFocusDisplay();
}

function finishFocusSession() {
  stopFocusTimer();

  state.stats.totalFocusMinutes +=
    state.focus.mode === "Pomodoro"
      ? 25
      : 45;

  state.xp += 30;
  state.coins += 10;

  updateLevel();

  saveState();

  celebrate(
    "⏱️ Odaklanma tamamlandı!<br>⭐ +30 XP<br>🪙 +10 Coin"
  );

  showToast(
    "Harika çalışma! 🎉"
  );

  resetFocusTimer();
}

/* =========================================================
   COACH
========================================================= */

function renderCoachPage(container) {
  const completed =
    state.tasks.filter(t => t.completed).length;

  const total =
    state.tasks.length;

  let message =
    "Bugün güzel bir çalışma günü! 🌟";

  if (total === 0) {
    message =
      "Önce kendine küçük bir çalışma hedefi belirle. 🎯";
  } else if (completed === total) {
    message =
      "Bugünkü görevlerinin hepsi tamamlandı! Muhteşem! 🏆";
  } else if (completed > 0) {
    message =
      "Başladın bile! Birkaç görev daha tamamlayabilirsin. 💪";
  } else {
    message =
      "İlk görevini tamamla ve çalışma serini başlat! 🔥";
  }

  container.innerHTML = `
    <div class="card coach">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>Ders Koçu</h2>

          <small style="color:var(--muted)">
            Sana özel öneri
          </small>
        </div>

      </div>

      <p class="coach-message">
        ${message}
      </p>

    </div>

    <div class="card" style="margin-top:20px">

      <h2>🎯 Bugünün Mini Planı</h2>

      <div class="task">
        <div>1️⃣</div>
        <div class="task-content">
          <div class="task-name">
            25 dakika odaklan
          </div>
        </div>
      </div>

      <div class="task">
        <div>2️⃣</div>
        <div class="task-content">
          <div class="task-name">
            Bir görevi tamamla
          </div>
        </div>
      </div>

      <div class="task">
        <div>3️⃣</div>
        <div class="task-content">
          <div class="task-name">
            5 dakika mola ver
          </div>
        </div>
      </div>

    </div>
  `;
}

/* =========================================================
   PET
========================================================= */

function renderPetPage(container) {
  container.innerHTML = `
    <div class="card pet-card">

      <h2>🐣 Evcil Hayvanım</h2>

      <div
        class="pet-display"
        style="height:250px;font-size:130px"
      >
        ${state.pet.emoji}
      </div>

      <div class="pet-name">
        ${escapeHTML(state.pet.name)}
      </div>

      <div class="pet-level">
        Seviye ${state.pet.level}
      </div>

      <div style="
        margin-top:25px;
        text-align:left
      ">

        <p>
          ❤️ Mutluluk
        </p>

        <div class="progress"
          style="
            background:#eee;
            margin-top:7px
          "
        >
          <span
            style="
              width:${state.pet.happiness}%;
              background:#ff5b6e
            "
          ></span>
        </div>

        <p style="margin-top:18px">
          ⚡ Enerji
        </p>

        <div class="progress"
          style="
            background:#eee;
            margin-top:7px
          "
        >
          <span
            style="
              width:${state.pet.energy}%;
              background:#3b82f6
            "
          ></span>
        </div>

      </div>

      <button
        class="primary-btn"
        style="margin-top:25px"
        onclick="feedPet()"
      >
        🍎 Evcil Hayvanımı Besle
      </button>

      <button
        class="secondary-btn"
        style="margin-top:10px"
        onclick="renamePet()"
      >
        ✏️ İsmini Değiştir
      </button>

    </div>
  `;
}

function feedPet() {
  if (state.coins < 10) {
    showToast("Beslemek için 10 coin gerekiyor. 🪙");
    return;
  }

  state.coins -= 10;

  state.pet.happiness =
    Math.min(
      100,
      state.pet.happiness + 15
    );

  state.pet.energy =
    Math.min(
      100,
      state.pet.energy + 10
    );

  saveState();

  renderPage("pet");
  updateUI();

  showToast("Panda çok mutlu! 🐼❤️");
}

function renamePet() {
  const name =
    prompt(
      "Evcil hayvanının yeni adı:",
      state.pet.name
    );

  if (!name?.trim()) return;

  state.pet.name = name.trim();

  saveState();

  renderPage("pet");
  updateUI();
}

/* =========================================================
   MARKET
========================================================= */

const marketItems = [
  {
    id: "food",
    icon: "🍎",
    name: "Elma",
    description: "Evcil hayvanını mutlu eder.",
    price: 10
  },
  {
    id: "toy",
    icon: "🎾",
    name: "Top",
    description: "Eğlenceli bir oyuncak.",
    price: 25
  },
  {
    id: "book",
    icon: "📚",
    name: "Kitap",
    description: "Çalışma motivasyonu verir.",
    price: 40
  },
  {
    id: "star",
    icon: "⭐",
    name: "Yıldız",
    description: "Özel koleksiyon ödülü.",
    price: 75
  },
  {
    id: "crown",
    icon: "👑",
    name: "Taç",
    description: "Başarılarını göster.",
    price: 120
  }
];

function renderMarketPage(container) {
  container.innerHTML = `
    <div class="card">

      <div class="card-title">

        <div>
          <h2>🛒 Ödül Marketi</h2>

          <small style="color:var(--muted)">
            Coinlerin:
            <strong>
              ${state.coins} 🪙
            </strong>
          </small>
        </div>

      </div>

      <div class="market-grid">

        ${marketItems.map(item => `
          <div class="shop-item">

            <div class="shop-icon">
              ${item.icon}
            </div>

            <h3>
              ${item.name}
            </h3>

            <p>
              ${item.description}
            </p>

            <div class="price">
              ${item.price} 🪙
            </div>

            <button
              class="primary-btn"
              onclick="buyItem('${item.id}')"
            >
              Satın Al
            </button>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

function buyItem(id) {
  const item =
    marketItems.find(
      item => item.id === id
    );

  if (!item) return;

  if (state.coins < item.price) {
    showToast("Yeterli coin yok. 🪙");
    return;
  }

  state.coins -= item.price;

  if (id === "food") {
    state.pet.happiness =
      Math.min(
        100,
        state.pet.happiness + 20
      );
  }

  if (id === "toy") {
    state.pet.happiness =
      Math.min(
        100,
        state.pet.happiness + 30
      );
  }

  if (id === "book") {
    state.xp += 15;
    updateLevel();
  }

  saveState();

  renderPage("market");
  updateUI();

  showToast(
    `${item.name} satın alındı! 🎉`
  );
}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

function getAchievements() {
  return [
    {
      icon: "🌱",
      title: "İlk Adım",
      description: "İlk görevini tamamla.",
      unlocked:
        state.stats.completedTasks >= 1
    },

    {
      icon: "🔥",
      title: "Seri Başladı",
      description: "3 günlük seri yap.",
      unlocked:
        state.streak >= 3
    },

    {
      icon: "⭐",
      title: "XP Avcısı",
      description: "500 XP kazan.",
      unlocked:
        state.xp >= 500
    },

    {
      icon: "🏆",
      title: "Çalışkan",
      description: "10 görev tamamla.",
      unlocked:
        state.stats.completedTasks >= 10
    },

    {
      icon: "⏱️",
      title: "Odak Ustası",
      description: "100 dakika çalış.",
      unlocked:
        state.stats.totalFocusMinutes >= 100
    },

    {
      icon: "💎",
      title: "Coin Koleksiyoncusu",
      description: "500 coin kazan.",
      unlocked:
        state.coins >= 500
    }
  ];
}

function renderAchievementsPage(container) {
  const achievements =
    getAchievements();

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>🏆 Başarı Rozetleri</h2>

        <span>
          ${
            achievements.filter(
              a => a.unlocked
            ).length
          }
          /
          ${achievements.length}
        }
      </div>

      <div class="badges">

        ${achievements.map(item => `
          <div class="badge ${
            item.unlocked
              ? ""
              : "locked"
          }">

            <div class="badge-icon">
              ${item.icon}
            </div>

            <strong>
              ${item.title}
            </strong>

            <small>
              ${item.description}
            </small>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

/* =========================================================
   STATS
========================================================= */

function renderStatsPage(container) {
  const total =
    state.tasks.length;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  const percentage =
    total
      ? Math.round(
          completed / total * 100
        )
      : 0;

  container.innerHTML = `
    <div class="stats"
      style="
        margin-top:0;
        grid-template-columns:
          repeat(auto-fit,minmax(180px,1fr))
      "
    >

      <div class="stat">
        <span>⭐</span>
        <strong>
          ${state.xp}
        </strong>
        <small>
          Toplam XP
        </small>
      </div>

      <div class="stat">
        <span>🪙</span>
        <strong>
          ${state.coins}
        </strong>
        <small>
          Coin
        </small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>
          ${state.streak}
        </strong>
        <small>
          Günlük seri
        </small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${state.stats.totalFocusMinutes}
        </strong>
        <small>
          Çalışma dakikası
        </small>
      </div>

    </div>

    <div class="card" style="margin-top:20px">

      <h2>📈 Görev İlerlemesi</h2>

      <div style="
        font-size:38px;
        font-weight:950;
        margin:20px 0
      ">
        ${percentage}%
      </div>

      <div
        class="progress"
        style="
          background:#eee
        "
      >
        <span
          style="
            width:${percentage}%;
            background:var(--primary)
          "
        ></span>
      </div>

      <p style="
        color:var(--muted);
        margin-top:12px
      ">
        ${completed} / ${total}
        görev tamamlandı.
      </p>

    </div>
  `;
}

/* =========================================================
   PROFILE
========================================================= */

function renderProfilePage(container) {
  const user =
    state.user || {
      name: "Öğrenci",
      email: ""
    };

  container.innerHTML = `
    <div class="card">

      <div style="
        text-align:center;
        padding:20px
      ">

        <div style="
          width:100px;
          height:100px;
          border-radius:50%;
          background:#e7e4ff;
          display:grid;
          place-items:center;
          font-size:55px;
          margin:0 auto 15px
        ">
          🎓
        </div>

        <h2>
          ${escapeHTML(user.name)}
        </h2>

        <p style="
          color:var(--muted);
          margin-top:5px
        ">
          ${escapeHTML(user.email)}
        </p>

      </div>

    </div>

    <div class="card" style="margin-top:20px">

      <h2>⚙️ Ayarlar</h2>

      <div class="task">

        <div>🌙</div>

        <div class="task-content">
          <div class="task-name">
            Karanlık Tema
          </div>

          <small style="color:var(--muted)">
            Görünümü değiştir
          </small>
        </div>

        <button
          class="secondary-btn"
          onclick="toggleTheme()"
        >
          ${state.settings.dark
            ? "Açık Tema"
            : "Karanlık Tema"}
        </button>

      </div>

      <div class="task">

        <div>🗑️</div>

        <div class="task-content">
          <div class="task-name">
            Verileri Sıfırla
          </div>

          <small style="color:var(--muted)">
            Tüm çalışma verilerini sil
          </small>
        </div>

        <button
          class="danger-btn"
          onclick="resetData()"
        >
          Sıfırla
        </button>

      </div>

    </div>
  `;
}

/* =========================================================
   UI
========================================================= */

function updateUI() {
  updateHeader(currentPage);

  updateLevel();

  updateHomeHero();

  const topAvatar =
    document.getElementById("topAvatar");

  if (topAvatar) {
    topAvatar.textContent =
      state.pet.emoji;
  }

  const levelText =
    document.getElementById("levelText");

  if (levelText) {
    levelText.textContent =
      `Seviye ${state.level}`;
  }

  const petDisplay =
    document.getElementById("petDisplay");

  if (petDisplay) {
    petDisplay.textContent =
      state.pet.emoji;
  }

  const petName =
    document.getElementById("petName");

  if (petName) {
    petName.textContent =
      state.pet.name;
  }

  const petLevel =
    document.getElementById("petLevel");

  if (petLevel) {
    petLevel.textContent =
      `Seviye ${state.pet.level}`;
  }

  const streakNumber =
    document.getElementById(
      "streakNumber"
    );

  if (streakNumber) {
    streakNumber.textContent =
      state.streak;
  }

  const statXP =
    document.getElementById("statXP");

  if (statXP) {
    statXP.textContent =
      state.xp;
  }

  const statCoins =
    document.getElementById("statCoins");

  if (statCoins) {
    statCoins.textContent =
      state.coins;
  }

  const statStreak =
    document.getElementById("statStreak");

  if (statStreak) {
    statStreak.textContent =
      state.streak;
  }
}

function updateHomeHero() {
  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  const total =
    state.tasks.length;

  const percentage =
    total
      ? Math.round(
          completed / total * 100
        )
      : 0;

  const bar =
    document.getElementById(
      "progressBar"
    );

  const summary =
    document.getElementById(
      "taskSummary"
    );

  const xp =
    document.getElementById(
      "xpText"
    );

  if (bar) {
    bar.style.width =
      `${percentage}%`;
  }

  if (summary) {
    summary.textContent =
      total
        ? `${completed}/${total} görev tamamlandı.`
        : "Bugün için ilk görevini ekle.";
  }

  if (xp) {
    xp.textContent =
      `${state.xp} XP · Seviye ${state.level}`;
  }
}

function updateLevel() {
  const newLevel =
    Math.floor(state.xp / 250) + 1;

  if (newLevel > state.level) {
    state.level = newLevel;

    state.pet.level =
      Math.max(
        state.pet.level,
        newLevel
      );

    saveState();

    showToast(
      `🎉 Seviye ${newLevel} oldun!`
    );
  } else {
    state.level = newLevel;
  }
}

/* =========================================================
   DAILY REWARD
========================================================= */

function claimDailyReward() {
  const today =
    new Date().toISOString().slice(0,10);

  if (state.lastReward === today) {
    showToast(
      "Bugünkü ödülünü zaten aldın. 🎁"
    );
    return;
  }

  state.lastReward = today;

  state.coins += 20;
  state.xp += 10;

  updateLevel();

  saveState();

  updateUI();

  showToast(
    "🎁 +20 Coin ve +10 XP kazandın!"
  );

  const button =
    document.getElementById(
      "dailyRewardButton"
    );

  if (button) {
    button.disabled = true;
    button.textContent =
      "Bugünkü Ödül Alındı ✓";
  }
}

/* =========================================================
   THEME
========================================================= */

function applyTheme() {
  document.body.classList.toggle(
    "dark",
    !!state.settings.dark
  );
}

function toggleTheme() {
  state.settings.dark =
    !state.settings.dark;

  applyTheme();

  saveState();

  if (currentPage === "profile") {
    renderPage("profile");
  }

  showToast(
    state.settings.dark
      ? "🌙 Karanlık tema açıldı."
      : "☀️ Açık tema açıldı."
  );
}

/* =========================================================
   MOBILE
========================================================= */

function toggleMobileMenu() {
  const drawer =
    document.getElementById(
      "mobileDrawer"
    );

  if (!drawer) return;

  drawer.classList.toggle("open");
}

function closeMobileMenu() {
  const drawer =
    document.getElementById(
      "mobileDrawer"
    );

  drawer?.classList.remove("open");
}

/* =========================================================
   MODAL
========================================================= */

function openModal(title, content) {
  const modal =
    document.getElementById("modal");

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalContent =
    document.getElementById(
      "modalContent"
    );

  if (!modal) return;

  if (modalTitle) {
    modalTitle.textContent =
      title;
  }

  if (modalContent) {
    modalContent.innerHTML =
      content;
  }

  modal.classList.add("show");
}

function closeModal() {
  document
    .getElementById("modal")
    ?.classList.remove("show");
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) return;

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.innerHTML =
    message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateY(20px)";

    setTimeout(
      () => toast.remove(),
      300
    );
  }, 3000);
}

/* =========================================================
   CELEBRATION
========================================================= */

function celebrate(message) {
  const element =
    document.getElementById(
      "celebration"
    );

  const text =
    document.getElementById(
      "celebrationText"
    );

  if (!element) return;

  if (text) {
    text.innerHTML =
      message;
  }

  element.style.display =
    "flex";

  setTimeout(() => {
    element.style.display =
      "none";
  }, 2200);
}

/* =========================================================
   RESET
========================================================= */

function resetData() {
  const confirmed =
    confirm(
      "Tüm çalışma verilerin silinecek. Emin misin?"
    );

  if (!confirmed) return;

  const user =
    state.user;

  state =
    structuredClone(DEFAULT_STATE);

  state.user =
    user;

  saveState();

  applyTheme();

  navigate("home");

  updateUI();

  showToast(
    "Verilerin sıfırlandı."
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat(
      "tr-TR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    ).format(new Date(date));
  } catch {
    return date;
  }
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   GLOBAL ERROR HANDLING
========================================================= */

window.addEventListener(
  "error",
  event => {
    console.error(
      "DersTakip JavaScript hatası:",
      event.error || event.message
    );
  }
);

window.addEventListener(
  "unhandledrejection",
  event => {
    console.error(
      "DersTakip Promise hatası:",
      event.reason
    );
  }
);

/* =========================================================
   GLOBAL
========================================================= */

window.showLogin = showLogin;
window.showRegister = showRegister;

window.login = login;
window.register = register;
window.logout = logout;

window.togglePassword = togglePassword;

window.navigate = navigate;
window.navigateMobile = navigateMobile;

window.toggleMobileMenu = toggleMobileMenu;

window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

window.addSubject = addSubject;
window.subjectTasks = subjectTasks;

window.addExam = addExam;
window.deleteExam = deleteExam;

window.toggleFocusTimer =
  toggleFocusTimer;

window.resetFocusTimer =
  resetFocusTimer;

window.setFocusTime =
  setFocusTime;

window.toggleTheme =
  toggleTheme;

window.feedPet =
  feedPet;

window.renamePet =
  renamePet;

window.buyItem =
  buyItem;

window.claimDailyReward =
  claimDailyReward;

window.closeModal =
  closeModal;

window.openModal =
  openModal;

window.resetData =
  resetData;

console.log(
  "DersTakip 2.0 app.js başarıyla yüklendi 🚀"
);
