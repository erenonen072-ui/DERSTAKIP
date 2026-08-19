/* =========================================================
   DERS TAKİP 2.0 - APP.JS
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
  user: null,
  tasks: [],
  subjects: [],
  exams: [],
  sessions: [],
  achievements: [],
  coach: null,
  stats: null,

  currentPage: "home",

  focus: {
    running: false,
    seconds: 25 * 60,
    totalSeconds: 25 * 60,
    interval: null,
    mode: "study"
  },

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    happiness: 100,
    energy: 100
  },

  market: [],

  coins: 0,

  dailyReward: {
    claimed: false,
    date: null
  }
};


/* =========================================================
   API
========================================================= */

const API_URL = "/api";


async function api(action, options = {}) {
  const {
    method = "GET",
    body = null
  } = options;

  const url = `${API_URL}?action=${encodeURIComponent(action)}`;

  const config = {
    method,
    credentials: "include",
    headers: {}
  };

  if (body !== null) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    let data;

    try {
      data = await response.json();
    } catch {
      data = {
        success: false,
        message: "Sunucudan geçersiz cevap geldi."
      };
    }

    if (!response.ok || data.success === false) {
      throw new Error(
        data.message || `API hatası: ${response.status}`
      );
    }

    return data;

  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}


/* =========================================================
   HELPERS
========================================================= */

function $(id) {
  return document.getElementById(id);
}


function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function formatDate(date) {
  if (!date) return "-";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return String(date);
  }

  return d.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}


function formatDateTime(date) {
  if (!date) return "-";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return String(date);
  }

  return d.toLocaleString("tr-TR");
}


function showToast(message, type = "normal") {
  const container = $("toastContainer");

  if (!container) return;

  const toast = document.createElement("div");

  toast.className = "toast";

  if (type === "success") {
    toast.style.borderLeft = "5px solid #20c997";
  }

  if (type === "error") {
    toast.style.borderLeft = "5px solid #ff5b6e";
  }

  if (type === "warning") {
    toast.style.borderLeft = "5px solid #ffbd3c";
  }

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}


function showLoading(message = "Yükleniyor...") {
  showToast(message);
}


function setAuthMessage(message, type = "normal") {
  const el = $("authMessage");

  if (!el) return;

  el.textContent = message;

  if (type === "error") {
    el.style.color = "#ff5b6e";
  } else if (type === "success") {
    el.style.color = "#20c997";
  } else {
    el.style.color = "#7d8498";
  }
}


function getLevelFromXP(xp) {
  xp = Number(xp) || 0;

  return Math.floor(xp / 500) + 1;
}


function getXPProgress(xp) {
  xp = Number(xp) || 0;

  const levelXP = xp % 500;

  return Math.min(100, (levelXP / 500) * 100);
}


function getTodayString() {
  const d = new Date();

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function loadLocalData() {
  try {
    const savedPet = localStorage.getItem("ders_takip_pet");

    if (savedPet) {
      state.pet = {
        ...state.pet,
        ...JSON.parse(savedPet)
      };
    }

    const savedCoins = localStorage.getItem("ders_takip_coins");

    if (savedCoins !== null) {
      state.coins = Number(savedCoins) || 0;
    }

    const savedReward = localStorage.getItem(
      "ders_takip_daily_reward"
    );

    if (savedReward) {
      state.dailyReward = JSON.parse(savedReward);
    }

    const savedTheme = localStorage.getItem(
      "ders_takip_theme"
    );

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

  } catch (error) {
    console.error("Local storage error:", error);
  }
}


function saveLocalData() {
  try {
    localStorage.setItem(
      "ders_takip_pet",
      JSON.stringify(state.pet)
    );

    localStorage.setItem(
      "ders_takip_coins",
      String(state.coins)
    );

    localStorage.setItem(
      "ders_takip_daily_reward",
      JSON.stringify(state.dailyReward)
    );

  } catch (error) {
    console.error("Save local data error:", error);
  }
}


/* =========================================================
   AUTH TABS
========================================================= */

function showLogin() {
  $("loginForm").style.display = "block";
  $("registerForm").style.display = "none";

  $("loginTab").classList.add("active");
  $("registerTab").classList.remove("active");

  setAuthMessage("");
}


function showRegister() {
  $("loginForm").style.display = "none";
  $("registerForm").style.display = "block";

  $("loginTab").classList.remove("active");
  $("registerTab").classList.add("active");

  setAuthMessage("");
}


function togglePassword(id, button) {
  const input = $(id);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}


/* =========================================================
   REGISTER
========================================================= */

async function register(event) {
  event.preventDefault();

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;

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

  setAuthMessage("Hesap oluşturuluyor...");

  try {
    const result = await api("register", {
      method: "POST",
      body: {
        name,
        email,
        password
      }
    });

    state.user = result.user;

    setAuthMessage(
      "Hesabın oluşturuldu! 🎉",
      "success"
    );

    setTimeout(() => {
      openApp();
    }, 500);

  } catch (error) {
    setAuthMessage(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   LOGIN
========================================================= */

async function login(event) {
  event.preventDefault();

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  if (!email || !password) {
    setAuthMessage(
      "E-posta ve şifre gerekli.",
      "error"
    );
    return;
  }

  setAuthMessage("Giriş yapılıyor...");

  try {
    const result = await api("login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    state.user = result.user;

    setAuthMessage(
      "Hoş geldin! 🚀",
      "success"
    );

    setTimeout(() => {
      openApp();
    }, 300);

  } catch (error) {
    setAuthMessage(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   CHECK AUTH
========================================================= */

async function checkAuth() {
  loadLocalData();

  try {
    const result = await api("me");

    if (result.user) {
      state.user = result.user;

      openApp();
      return;
    }

  } catch {
    // Kullanıcı giriş yapmamış olabilir.
  }

  showAuth();
}


/* =========================================================
   OPEN APP
========================================================= */

async function openApp() {
  $("authScreen").style.display = "none";
  $("app").style.display = "block";

  updateUserUI();

  await loadAllData();

  navigate("home");
}


/* =========================================================
   SHOW AUTH
========================================================= */

function showAuth() {
  $("authScreen").style.display = "flex";
  $("app").style.display = "none";
}


/* =========================================================
   LOAD ALL DATA
========================================================= */

async function loadAllData() {
  try {
    await Promise.all([
      loadTasks(),
      loadSubjects(),
      loadExams(),
      loadSessions(),
      loadAchievements(),
      loadCoach(),
      loadStats()
    ]);

    updateUserUI();
    renderHome();

  } catch (error) {
    console.error(error);

    showToast(
      "Veriler yüklenirken bir sorun oluştu.",
      "error"
    );
  }
}


/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {
  if (!state.user) return;

  const name = state.user.name || "Öğrenci";
  const xp = Number(state.user.xp) || 0;
  const streak = Number(state.user.streak) || 0;

  const level = getLevelFromXP(xp);

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
  }

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${level}`;
  }

  if ($("statXP")) {
    $("statXP").textContent = xp;
  }

  if ($("statStreak")) {
    $("statStreak").textContent = streak;
  }

  if ($("statCoins")) {
    $("statCoins").textContent = state.coins;
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent = streak;
  }

  if ($("xpText")) {
    $("xpText").textContent =
      `${xp} XP • Seviye ${level}`;
  }

  if ($("progressBar")) {
    $("progressBar").style.width =
      `${getXPProgress(xp)}%`;
  }

  updatePetUI();
}


/* =========================================================
   TASKS
========================================================= */

async function loadTasks() {
  try {
    const result = await api("tasks");

    state.tasks = result.tasks || [];

    renderTasks();

  } catch (error) {
    console.error(error);
  }
}


function renderTasks() {
  const list = $("taskList");

  if (!list) return;

  const tasks = state.tasks || [];

  const completed =
    tasks.filter(t => t.completed).length;

  if ($("taskCounter")) {
    $("taskCounter").textContent =
      `${completed} / ${tasks.length}`;
  }

  if (tasks.length === 0) {
    list.innerHTML = `
      <div style="
        padding:30px 10px;
        text-align:center;
        color:var(--muted);
      ">
        <div style="font-size:45px">📝</div>
        <strong>Henüz görev yok.</strong>
        <p style="margin-top:6px">
          İlk görevini hemen ekle!
        </p>
      </div>
    `;

    return;
  }

  list.innerHTML = tasks.map(task => `
    <div
      class="task ${task.completed ? "completed" : ""}"
      data-task-id="${task.id}"
    >
      <button
        class="checkbox"
        onclick="toggleTask(${task.id})"
        aria-label="Görevi tamamla"
      >
        ${task.completed ? "✓" : ""}
      </button>

      <div class="task-content">
        <div class="task-name">
          ${escapeHTML(task.title)}
        </div>
      </div>

      <div class="task-xp">
        ⭐ ${Number(task.xp) || 50} XP
      </div>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
        title="Sil"
      >
        🗑️
      </button>
    </div>
  `).join("");
}


async function addTask() {
  const input = $("newTask");

  if (!input) return;

  const title = input.value.trim();

  if (!title) {
    showToast(
      "Önce görev adını yaz.",
      "warning"
    );
    input.focus();
    return;
  }

  try {
    const result = await api("tasks", {
      method: "POST",
      body: {
        title
      }
    });

    state.tasks.unshift(result.task);

    input.value = "";

    renderTasks();
    renderHome();

    showToast(
      "Görev eklendi! 🎯",
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


async function toggleTask(id) {
  try {
    const result = await api("tasks", {
      method: "PATCH",
      body: {
        id
      }
    });

    const task = state.tasks.find(
      t => Number(t.id) === Number(id)
    );

    if (task) {
      task.completed = result.completed;
    }

    if (result.completed) {
      const taskXP = task
        ? Number(task.xp) || 50
        : 50;

      if (state.user) {
        state.user.xp =
          (Number(state.user.xp) || 0) + taskXP;
      }

      addCoins(10);

      showCelebration(taskXP);

    } else {
      const taskXP = task
        ? Number(task.xp) || 50
        : 50;

      if (state.user) {
        state.user.xp =
          Math.max(
            0,
            (Number(state.user.xp) || 0) - taskXP
          );
      }

      showToast(
        "Görev tekrar açıldı.",
        "warning"
      );
    }

    renderTasks();
    updateUserUI();
    renderHome();

    await loadStats();
    await loadCoach();

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


async function deleteTask(id) {
  const ok = confirm(
    "Bu görevi silmek istediğine emin misin?"
  );

  if (!ok) return;

  try {
    await api("tasks", {
      method: "DELETE",
      body: {
        id
      }
    });

    state.tasks =
      state.tasks.filter(
        task => Number(task.id) !== Number(id)
      );

    renderTasks();
    renderHome();

    showToast(
      "Görev silindi.",
      "success"
    );

    await loadStats();

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   SUBJECTS
========================================================= */

async function loadSubjects() {
  try {
    const result = await api("subjects");

    state.subjects = result.subjects || [];

  } catch (error) {
    console.error(error);
  }
}


async function addSubject() {
  const nameInput = $("subjectName");
  const colorInput = $("subjectColor");

  if (!nameInput) return;

  const name = nameInput.value.trim();
  const color =
    colorInput?.value || "#6c63ff";

  if (!name) {
    showToast(
      "Ders adı gerekli.",
      "warning"
    );
    return;
  }

  try {
    const result = await api("subjects", {
      method: "POST",
      body: {
        name,
        color
      }
    });

    state.subjects.unshift(
      result.subject
    );

    nameInput.value = "";

    renderSubjects();

    showToast(
      "Ders eklendi! 📚",
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


async function deleteSubject(id) {
  if (
    !confirm(
      "Bu dersi silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  try {
    await api("subjects", {
      method: "DELETE",
      body: {
        id
      }
    });

    state.subjects =
      state.subjects.filter(
        s => Number(s.id) !== Number(id)
      );

    renderSubjects();

    showToast(
      "Ders silindi.",
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


function renderSubjects() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  section.innerHTML = `
    <div class="card-title">
      <h2>📚 Dersler</h2>

      <span>
        ${state.subjects.length} ders
      </span>
    </div>

    <div style="
      display:grid;
      grid-template-columns:
        repeat(auto-fill,minmax(180px,1fr));
      gap:12px;
      margin-bottom:20px;
    ">
      ${
        state.subjects.length
        ? state.subjects.map(subject => `
          <div style="
            border:1px solid var(--border);
            border-radius:16px;
            padding:16px;
            background:var(--white);
          ">
            <div style="
              display:flex;
              justify-content:space-between;
              align-items:center;
            ">
              <div style="
                width:42px;
                height:42px;
                border-radius:12px;
                background:${escapeHTML(subject.color || "#6c63ff")};
                display:grid;
                place-items:center;
                color:white;
                font-size:20px;
              ">
                📚
              </div>

              <button
                class="danger-btn"
                onclick="deleteSubject(${subject.id})"
              >
                Sil
              </button>
            </div>

            <h3 style="margin-top:12px">
              ${escapeHTML(subject.name)}
            </h3>
          </div>
        `).join("")
        : `
          <div style="
            color:var(--muted);
            padding:20px;
          ">
            Henüz ders eklenmemiş.
          </div>
        `
      }
    </div>

    <div style="
      display:flex;
      gap:8px;
      flex-wrap:wrap;
    ">
      <input
        id="subjectName"
        placeholder="Örn. Matematik"
        style="
          flex:1;
          min-width:180px;
          padding:12px;
          border:1px solid var(--border);
          border-radius:11px;
          background:var(--white);
          color:var(--text);
        "
      >

      <input
        id="subjectColor"
        type="color"
        value="#6c63ff"
        style="
          width:55px;
          border:1px solid var(--border);
          border-radius:10px;
          padding:3px;
        "
      >

      <button
        class="primary-btn"
        onclick="addSubject()"
      >
        + Ders Ekle
      </button>
    </div>
  `;
}


/* =========================================================
   EXAMS
========================================================= */

async function loadExams() {
  try {
    const result = await api("exams");

    state.exams = result.exams || [];

  } catch (error) {
    console.error(error);
  }
}


async function addExam() {
  const title = $("examTitle")?.value.trim();
  const date = $("examDate")?.value;
  const subjectId = $("examSubject")?.value;
  const topic = $("examTopic")?.value.trim();

  if (!title || !date) {
    showToast(
      "Sınav adı ve tarih gerekli.",
      "warning"
    );
    return;
  }

  try {
    const result = await api("exams", {
      method: "POST",
      body: {
        title,
        exam_date: date,
        subject_id:
          subjectId
            ? Number(subjectId)
            : null,
        topic: topic || null
      }
    });

    state.exams.push(result.exam);

    state.exams.sort(
      (a, b) =>
        new Date(a.exam_date) -
        new Date(b.exam_date)
    );

    renderExams();

    showToast(
      "Sınav eklendi! 📅",
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


async function deleteExam(id) {
  if (
    !confirm(
      "Bu sınavı silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  try {
    await api("exams", {
      method: "DELETE",
      body: {
        id
      }
    });

    state.exams =
      state.exams.filter(
        e => Number(e.id) !== Number(id)
      );

    renderExams();

    showToast(
      "Sınav silindi.",
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


function renderExams() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const subjectOptions =
    state.subjects.map(subject => `
      <option value="${subject.id}">
        ${escapeHTML(subject.name)}
      </option>
    `).join("");

  section.innerHTML = `
    <div class="card-title">
      <h2>📅 Sınavlar</h2>
      <span>${state.exams.length} sınav</span>
    </div>

    <div style="
      display:grid;
      gap:12px;
    ">
      ${
        state.exams.length
        ? state.exams.map(exam => `
          <div style="
            border:1px solid var(--border);
            border-radius:16px;
            padding:16px;
            display:flex;
            gap:15px;
            align-items:center;
            justify-content:space-between;
            flex-wrap:wrap;
          ">
            <div>
              <strong>
                📅 ${escapeHTML(exam.title)}
              </strong>

              <div style="
                color:var(--muted);
                margin-top:5px;
              ">
                ${escapeHTML(
                  exam.subject_name || "Ders seçilmedi"
                )}
              </div>

              <div style="
                margin-top:5px;
                font-size:13px;
              ">
                🕐 ${formatDateTime(exam.exam_date)}
              </div>

              ${
                exam.topic
                ? `
                  <div style="
                    color:var(--muted);
                    margin-top:5px;
                  ">
                    Konu:
                    ${escapeHTML(exam.topic)}
                  </div>
                `
                : ""
              }
            </div>

            <button
              class="danger-btn"
              onclick="deleteExam(${exam.id})"
            >
              🗑️ Sil
            </button>
          </div>
        `).join("")
        : `
          <div style="
            text-align:center;
            padding:25px;
            color:var(--muted);
          ">
            📅 Henüz sınav eklemedin.
          </div>
        `
      }
    </div>

    <hr style="
      border:0;
      border-top:1px solid var(--border);
      margin:22px 0;
    ">

    <h3 style="margin-bottom:15px">
      ➕ Yeni Sınav
    </h3>

    <div style="
      display:grid;
      gap:10px;
    ">
      <input
        id="examTitle"
        placeholder="Sınav adı"
        style="
          padding:12px;
          border:1px solid var(--border);
          border-radius:11px;
          background:var(--white);
          color:var(--text);
        "
      >

      <input
        id="examDate"
        type="datetime-local"
        style="
          padding:12px;
          border:1px solid var(--border);
          border-radius:11px;
          background:var(--white);
          color:var(--text);
        "
      >

      <select
        id="examSubject"
        style="
          padding:12px;
          border:1px solid var(--border);
          border-radius:11px;
          background:var(--white);
          color:var(--text);
        "
      >
        <option value="">
          Ders seç
        </option>
        ${subjectOptions}
      </select>

      <input
        id="examTopic"
        placeholder="Konu (isteğe bağlı)"
        style="
          padding:12px;
          border:1px solid var(--border);
          border-radius:11px;
          background:var(--white);
          color:var(--text);
        "
      >

      <button
        class="primary-btn"
        onclick="addExam()"
      >
        + Sınav Ekle
      </button>
    </div>
  `;
}


/* =========================================================
   STUDY SESSIONS
========================================================= */

async function loadSessions() {
  try {
    const result = await api("sessions");

    state.sessions = result.sessions || [];

  } catch (error) {
    console.error(error);
  }
}


/* =========================================================
   FOCUS
========================================================= */

function renderFocus() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  section.innerHTML = `
    <div class="focus">

      <div class="card-title">
        <h2>⏱️ Odaklan</h2>
      </div>

      <p style="color:var(--muted)">
        Telefonunu bırak ve dersine odaklan.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTimer(state.focus.seconds)}
      </div>

      <div style="
        display:flex;
        justify-content:center;
        gap:8px;
        flex-wrap:wrap;
        margin-bottom:20px;
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

      <div class="focus-buttons">

        ${
          state.focus.running
          ? `
            <button
              class="danger-btn"
              onclick="stopFocus()"
            >
              ⏹️ Durdur
            </button>
          `
          : `
            <button
              class="primary-btn"
              onclick="startFocus()"
            >
              ▶️ Başlat
            </button>
          `
        }

        <button
          class="secondary-btn"
          onclick="resetFocus()"
        >
          🔄 Sıfırla
        </button>

      </div>

      <div style="
        margin-top:25px;
        padding:15px;
        border-radius:15px;
        background:var(--bg);
      ">
        <strong>
          💡 İpucu
        </strong>

        <p style="
          color:var(--muted);
          margin-top:6px;
        ">
          25 dakika çalış, 5 dakika dinlen.
          Sonra tekrar başla.
        </p>
      </div>

    </div>
  `;
}


function formatTimer(seconds) {
  const mins =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}


function updateFocusTimerUI() {
  const timer = $("focusTimer");

  if (timer) {
    timer.textContent =
      formatTimer(state.focus.seconds);
  }
}


function setFocusTime(minutes) {
  if (state.focus.running) {
    showToast(
      "Önce mevcut çalışmayı durdur.",
      "warning"
    );
    return;
  }

  state.focus.seconds =
    minutes * 60;

  state.focus.totalSeconds =
    minutes * 60;

  renderFocus();
}


function startFocus() {
  if (state.focus.running) return;

  state.focus.running = true;

  showToast(
    "Odaklanma başladı! 🔥",
    "success"
  );

  renderFocus();

  state.focus.interval =
    setInterval(async () => {

      if (state.focus.seconds > 0) {
        state.focus.seconds--;

        updateFocusTimerUI();

      } else {
        await finishFocus();
      }

    }, 1000);
}


function stopFocus() {
  if (!state.focus.running) return;

  clearInterval(
    state.focus.interval
  );

  state.focus.interval = null;
  state.focus.running = false;

  const elapsed =
    state.focus.totalSeconds -
    state.focus.seconds;

  const minutes =
    Math.floor(elapsed / 60);

  if (minutes >= 1) {
    saveFocusSession(minutes);
  }

  showToast(
    "Odaklanma durduruldu.",
    "warning"
  );

  renderFocus();
}


function resetFocus() {
  clearInterval(
    state.focus.interval
  );

  state.focus.interval = null;
  state.focus.running = false;
  state.focus.seconds = 25 * 60;
  state.focus.totalSeconds = 25 * 60;

  renderFocus();
}


async function finishFocus() {
  clearInterval(
    state.focus.interval
  );

  state.focus.interval = null;
  state.focus.running = false;

  const minutes =
    Math.floor(
      state.focus.totalSeconds / 60
    );

  await saveFocusSession(minutes);

  showCelebration(minutes);

  state.focus.seconds =
    state.focus.totalSeconds;

  renderFocus();
}


async function saveFocusSession(minutes) {
  if (minutes < 1) return;

  try {
    const result = await api("sessions", {
      method: "POST",
      body: {
        duration_minutes: minutes
      }
    });

    if (result.earned_xp) {
      if (state.user) {
        state.user.xp =
          (Number(state.user.xp) || 0) +
          Number(result.earned_xp);
      }

      addCoins(
        Math.max(
          1,
          Math.floor(minutes / 5)
        )
      );
    }

    state.sessions.unshift(
      result.session
    );

    updateUserUI();

    await loadStats();
    await loadCoach();

    showToast(
      `⏱️ ${minutes} dakika çalıştın! +${result.earned_xp || minutes} XP`,
      "success"
    );

  } catch (error) {
    showToast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   COACH
========================================================= */

async function loadCoach() {
  try {
    const result = await api("coach");

    state.coach = result.coach;

    renderCoach();

  } catch (error) {
    console.error(error);
  }
}


function renderCoach() {
  const coach = state.coach;

  if (!coach) return;

  const message = $("coachMessage");

  if (message) {
    if (
      coach.advice &&
      coach.advice.length
    ) {
      message.innerHTML =
        coach.advice
          .slice(0, 3)
          .map(item =>
            `<div style="margin-bottom:8px">
              ${item.icon || "💡"}
              <strong>
                ${escapeHTML(item.title)}
              </strong>
              <br>
              ${escapeHTML(item.text)}
            </div>`
          )
          .join("");
    } else {
      message.textContent =
        "Bugün güzel bir çalışma günü! 🚀";
    }
  }
}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

async function loadAchievements() {
  try {
    const result =
      await api("achievements");

    state.achievements =
      result.achievements || [];

  } catch (error) {
    console.error(error);
  }
}


function getDefaultBadges() {
  const xp =
    Number(state.user?.xp) || 0;

  const tasks =
    state.tasks.filter(
      t => t.completed
    ).length;

  const minutes =
    state.stats?.sessions?.minutes ||
    0;

  const streak =
    Number(state.user?.streak) || 0;

  return [
    {
      icon: "🌱",
      name: "İlk Adım",
      description: "İlk görevini tamamla",
      unlocked: tasks >= 1
    },
    {
      icon: "⭐",
      name: "XP Avcısı",
      description: "500 XP kazan",
      unlocked: xp >= 500
    },
    {
      icon: "🔥",
      name: "Seri Başlangıcı",
      description: "3 günlük seri",
      unlocked: streak >= 3
    },
    {
      icon: "🏆",
      name: "Kararlı Öğrenci",
      description: "10 görev tamamla",
      unlocked: tasks >= 10
    },
    {
      icon: "⏱️",
      name: "Odak Ustası",
      description: "60 dakika çalış",
      unlocked: minutes >= 60
    },
    {
      icon: "🚀",
      name: "Çalışkan",
      description: "1000 XP kazan",
      unlocked: xp >= 1000
    },
    {
      icon: "🔥",
      name: "Ateş Gibi",
      description: "7 günlük seri",
      unlocked: streak >= 7
    },
    {
      icon: "👑",
      name: "DersTakip Kralı",
      description: "2500 XP kazan",
      unlocked: xp >= 2500
    }
  ];
}


function renderAchievements() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const badges =
    getDefaultBadges();

  section.innerHTML = `
    <div class="card-title">
      <h2>🏆 Rozetler</h2>
      <span>
        ${
          badges.filter(
            b => b.unlocked
          ).length
        } / ${badges.length}
      </span>
    </div>

    <div class="badges">
      ${badges.map(badge => `
        <div class="badge ${
          badge.unlocked
            ? ""
            : "locked"
        }">

          <div class="badge-icon">
            ${badge.icon}
          </div>

          <strong>
            ${escapeHTML(badge.name)}
          </strong>

          <div>
            <small>
              ${escapeHTML(
                badge.description
              )}
            </small>
          </div>

          <div style="
            margin-top:8px;
            font-size:12px;
            font-weight:800;
          ">
            ${
              badge.unlocked
              ? "✅ Açıldı"
              : "🔒 Kilitli"
            }
          </div>

        </div>
      `).join("")}
    </div>
  `;
}


/* =========================================================
   STATS
========================================================= */

async function loadStats() {
  try {
    const result =
      await api("stats");

    state.stats =
      result.stats;

    updateStatsUI();

  } catch (error) {
    console.error(error);
  }
}


function updateStatsUI() {
  if (!state.stats) return;

  const tasks =
    state.stats.tasks || {};

  if ($("statXP")) {
    $("statXP").textContent =
      Number(state.user?.xp) || 0;
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      Number(state.user?.streak) || 0;
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      state.coins;
  }
}


function renderStats() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const stats =
    state.stats || {};

  const tasks =
    stats.tasks || {};

  const sessions =
    stats.sessions || {};

  const totalTasks =
    Number(tasks.total) || 0;

  const completedTasks =
    Number(tasks.completed) || 0;

  const taskPercent =
    totalTasks
      ? Math.round(
          completedTasks /
          totalTasks *
          100
        )
      : 0;

  section.innerHTML = `
    <div class="card-title">
      <h2>📊 İstatistikler</h2>
    </div>

    <div class="stats">

      <div class="stat">
        <span>⭐</span>
        <strong>
          ${Number(state.user?.xp) || 0}
        </strong>
        <small>
          Toplam XP
        </small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>
          ${Number(state.user?.streak) || 0}
        </strong>
        <small>
          Günlük seri
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
        <span>📝</span>
        <strong>
          ${totalTasks}
        </strong>
        <small>
          Toplam görev
        </small>
      </div>

      <div class="stat">
        <span>✅</span>
        <strong>
          ${completedTasks}
        </strong>
        <small>
          Tamamlanan görev
        </small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${Number(sessions.minutes) || 0}
        </strong>
        <small>
          Odak dakikası
        </small>
      </div>

      <div class="stat">
        <span>📚</span>
        <strong>
          ${Number(stats.subjects) || 0}
        </strong>
        <small>
          Ders
        </small>
      </div>

      <div class="stat">
        <span>📅</span>
        <strong>
          ${Number(stats.exams) || 0}
        </strong>
        <small>
          Sınav
        </small>
      </div>

      <div class="stat">
        <span>🎯</span>
        <strong>
          ${taskPercent}%
        </strong>
        <small>
          Görev başarı oranı
        </small>
      </div>

    </div>

    <div style="
      margin-top:20px;
      padding:20px;
      border-radius:18px;
      background:var(--bg);
    ">

      <h3>
        📈 Görev İlerlemen
      </h3>

      <div style="
        margin-top:12px;
        height:14px;
        background:var(--border);
        border-radius:20px;
        overflow:hidden;
      ">
        <div style="
          width:${taskPercent}%;
          height:100%;
          background:linear-gradient(
            90deg,
            var(--primary),
            var(--primary2)
          );
          transition:.4s;
        "></div>
      </div>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">
        ${completedTasks} / ${totalTasks}
        görev tamamlandı.
      </p>

    </div>
  `;
}


/* =========================================================
   PET
========================================================= */

function updatePetUI() {
  const pet = state.pet;

  if ($("petDisplay")) {
    $("petDisplay").textContent =
      pet.emoji;
  }

  if ($("petName")) {
    $("petName").textContent =
      pet.name;
  }

  if ($("petLevel")) {
    $("petLevel").textContent =
      `Seviye ${pet.level}`;
  }
}


function renderPet() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const pet =
    state.pet;

  section.innerHTML = `
    <div class="card-title">
      <h2>🐣 Evcil Hayvan</h2>
    </div>

    <div style="
      text-align:center;
    ">

      <div class="pet-display">
        ${pet.emoji}
      </div>

      <h2>
        ${escapeHTML(pet.name)}
      </h2>

      <p style="
        color:var(--muted);
        margin-top:5px;
      ">
        Seviye ${pet.level}
      </p>

      <div style="
        margin-top:20px;
        text-align:left;
      ">

        <strong>
          ❤️ Mutluluk
        </strong>

        <div style="
          height:10px;
          background:var(--border);
          border-radius:20px;
          margin-top:7px;
          overflow:hidden;
        ">
          <div style="
            width:${pet.happiness}%;
            height:100%;
            background:#ff6b9d;
          "></div>
        </div>

        <strong style="
          display:block;
          margin-top:15px;
        ">
          ⚡ Enerji
        </strong>

        <div style="
          height:10px;
          background:var(--border);
          border-radius:20px;
          margin-top:7px;
          overflow:hidden;
        ">
          <div style="
            width:${pet.energy}%;
            height:100%;
            background:#20c997;
          "></div>
        </div>

      </div>

      <div style="
        display:flex;
        justify-content:center;
        gap:8px;
        margin-top:20px;
        flex-wrap:wrap;
      ">

        <button
          class="primary-btn"
          onclick="feedPet()"
        >
          🍎 Besle
        </button>

        <button
          class="secondary-btn"
          onclick="playWithPet()"
        >
          🎾 Oyna
        </button>

        <button
          class="secondary-btn"
          onclick="renamePet()"
        >
          ✏️ Adını Değiştir
        </button>

      </div>

    </div>
  `;
}


function feedPet() {
  if (state.coins < 5) {
    showToast(
      "Beslemek için 5 coin gerekiyor.",
      "warning"
    );
    return;
  }

  state.coins -= 5;

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

  saveLocalData();

  updatePetUI();
  renderPet();

  showToast(
    "Pandan çok mutlu oldu! 🐼❤️",
    "success"
  );
}


function playWithPet() {
  if (state.pet.energy < 10) {
    showToast(
      "Evcil hayvanının enerjisi düşük.",
      "warning"
    );
    return;
  }

  state.pet.energy -= 10;

  state.pet.happiness =
    Math.min(
      100,
      state.pet.happiness + 10
    );

  saveLocalData();

  updatePetUI();
  renderPet();

  showToast(
    "Pandan seninle oynadı! 🎾🐼",
    "success"
  );
}


function renamePet() {
  const name =
    prompt(
      "Evcil hayvanının yeni adı:"
    );

  if (!name) return;

  const clean =
    name.trim().slice(0, 30);

  if (!clean) return;

  state.pet.name = clean;

  saveLocalData();

  updatePetUI();
  renderPet();

  showToast(
    `Evcil hayvanının adı ${clean} oldu! 🐼`,
    "success"
  );
}


/* =========================================================
   MARKET
========================================================= */

function getMarketItems() {
  return [
    {
      id: "food",
      emoji: "🍎",
      name: "Elma",
      description: "Evcil hayvanına enerji verir.",
      price: 5
    },
    {
      id: "ball",
      emoji: "🎾",
      name: "Top",
      description: "Evcil hayvanınla oynarsın.",
      price: 20
    },
    {
      id: "hat",
      emoji: "🎩",
      name: "Şapka",
      description: "Evcil hayvanına havalı bir görünüm.",
      price: 50
    },
    {
      id: "star",
      emoji: "⭐",
      name: "Yıldız",
      description: "Özel mutluluk ödülü.",
      price: 100
    },
    {
      id: "crown",
      emoji: "👑",
      name: "Kraliyet Tacı",
      description: "En özel evcil hayvan aksesuarı.",
      price: 250
    },
    {
      id: "rocket",
      emoji: "🚀",
      name: "Roket",
      description: "Hızlı seviye yükseltme ödülü.",
      price: 500
    }
  ];
}


function renderMarket() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const items =
    getMarketItems();

  section.innerHTML = `
    <div class="card-title">
      <h2>🛒 Market</h2>

      <strong>
        🪙 ${state.coins} Coin
      </strong>
    </div>

    <p style="
      color:var(--muted);
      margin-bottom:18px;
    ">
      Ders çalışarak coin kazan ve ödüller satın al.
    </p>

    <div class="market-grid">

      ${items.map(item => `
        <div class="shop-item">

          <div class="shop-icon">
            ${item.emoji}
          </div>

          <h3>
            ${escapeHTML(item.name)}
          </h3>

          <p>
            ${escapeHTML(item.description)}
          </p>

          <div class="price">
            🪙 ${item.price}
          </div>

          <button
            class="primary-btn"
            onclick="buyMarketItem('${item.id}')"
          >
            Satın Al
          </button>

        </div>
      `).join("")}

    </div>
  `;
}


function buyMarketItem(id) {
  const item =
    getMarketItems().find(
      x => x.id === id
    );

  if (!item) return;

  if (state.coins < item.price) {
    showToast(
      "Yeterli coin yok. 🪙",
      "warning"
    );
    return;
  }

  state.coins -= item.price;

  if (id === "food") {
    state.pet.happiness =
      Math.min(
        100,
        state.pet.happiness + 20
      );

    state.pet.energy =
      Math.min(
        100,
        state.pet.energy + 20
      );
  }

  if (id === "ball") {
    state.pet.happiness =
      Math.min(
        100,
        state.pet.happiness + 30
      );
  }

  if (id === "hat") {
    state.pet.emoji = "🐼🎩";
  }

  if (id === "star") {
    state.pet.happiness = 100;
  }

  if (id === "crown") {
    state.pet.emoji = "🐼👑";
  }

  if (id === "rocket") {
    state.pet.level += 1;
  }

  saveLocalData();

  updateUserUI();
  renderMarket();

  showToast(
    `${item.name} satın alındı! 🎉`,
    "success"
  );
}


/* =========================================================
   DAILY REWARD
========================================================= */

function claimDailyReward() {
  const today =
    getTodayString();

  if (
    state.dailyReward.date === today &&
    state.dailyReward.claimed
  ) {
    showToast(
      "Bugünkü ödülü zaten aldın. 🎁",
      "warning"
    );

    updateDailyRewardUI();

    return;
  }

  const rewardCoins = 50;

  state.coins += rewardCoins;

  state.dailyReward = {
    claimed: true,
    date: today
  };

  saveLocalData();

  updateUserUI();
  updateDailyRewardUI();

  showCelebration(
    rewardCoins,
    "GÜNLÜK ÖDÜL!"
  );
}


function updateDailyRewardUI() {
  const text =
    $("dailyRewardText");

  const button =
    $("dailyRewardButton");

  if (!text || !button) return;

  const today =
    getTodayString();

  const claimed =
    state.dailyReward.date === today &&
    state.dailyReward.claimed;

  if (claimed) {
    text.textContent =
      "Bugünkü ödülünü aldın. Yarın tekrar gel! 🎁";

    button.textContent =
      "Alındı ✅";

    button.disabled = true;

    button.style.opacity = ".6";

  } else {
    text.textContent =
      "Bugünkü ödülün hazır: 🪙 +50 Coin";

    button.textContent =
      "Ödülü Al 🎁";

    button.disabled = false;

    button.style.opacity = "1";
  }
}


/* =========================================================
   HOME
========================================================= */

function renderHome() {
  const total =
    state.tasks.length;

  const completed =
    state.tasks.filter(
      t => t.completed
    ).length;

  if ($("taskSummary")) {
    if (total === 0) {
      $("taskSummary").textContent =
        "Bugünün ilk görevini ekle! 🎯";
    } else {
      $("taskSummary").textContent =
        `${completed}/${total} görevi tamamladın.`;
    }
  }

  if ($("progressBar")) {
    const percent =
      total
        ? (completed / total) * 100
        : 0;

    $("progressBar").style.width =
      `${percent}%`;
  }

  renderTasks();
  updateDailyRewardUI();
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {
  const section = $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const user =
    state.user || {};

  const xp =
    Number(user.xp) || 0;

  const level =
    getLevelFromXP(xp);

  section.innerHTML = `
    <div class="card-title">
      <h2>👤 Profil</h2>
    </div>

    <div style="
      text-align:center;
      padding:15px 0 25px;
    ">

      <div style="
        width:90px;
        height:90px;
        margin:auto;
        border-radius:50%;
        background:#e7e4ff;
        display:grid;
        place-items:center;
        font-size:45px;
      ">
        🎓
      </div>

      <h2 style="margin-top:12px">
        ${escapeHTML(user.name || "Öğrenci")}
      </h2>

      <p style="
        color:var(--muted);
        margin-top:5px;
      ">
        ${escapeHTML(user.email || "")}
      </p>

    </div>

    <div class="stats">

      <div class="stat">
        <span>⭐</span>
        <strong>${xp}</strong>
        <small>XP</small>
      </div>

      <div class="stat">
        <span>🏆</span>
        <strong>${level}</strong>
        <small>Seviye</small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>
          ${Number(user.streak) || 0}
        </strong>
        <small>Seri</small>
      </div>

      <div class="stat">
        <span>🪙</span>
        <strong>${state.coins}</strong>
        <small>Coin</small>
      </div>

    </div>

    <div style="
      margin-top:20px;
      display:flex;
      gap:10px;
      flex-wrap:wrap;
    ">

      <button
        class="secondary-btn"
        onclick="toggleTheme()"
      >
        🌙 Tema Değiştir
      </button>

      <button
        class="danger-btn"
        onclick="logout()"
      >
        🚪 Çıkış Yap
      </button>

    </div>

    <div style="
      margin-top:20px;
      padding:18px;
      background:var(--bg);
      border-radius:15px;
    ">

      <strong>
        🆔 Hesap Bilgileri
      </strong>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">
        Hesap oluşturma:
        ${formatDate(user.created_at)}
      </p>

    </div>
  `;
}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page, button = null) {
  state.currentPage = page;

  closeMobileMenu();

  document
    .querySelectorAll(".menu button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  } else {
    document
      .querySelectorAll(".menu button")
      .forEach(btn => {
        if (
          btn.getAttribute("onclick") &&
          btn.getAttribute("onclick")
            .includes(`'${page}'`)
        ) {
          btn.classList.add("active");
        }
      });
  }

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(btn => {
      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick")
          .includes(`'${page}'`)
      ) {
        btn.classList.add("active");
      }
    });

  const subtitle =
    $("sectionSubtitle");

  const titles = {
    home:
      "Bugün küçük bir adım, yarın büyük bir başarı.",
    tasks:
      "Görevlerini tamamla ve XP kazan.",
    subjects:
      "Derslerini düzenli şekilde takip et.",
    exams:
      "Sınavlarını önceden planla.",
    focus:
      "Odaklan ve çalışma süreni artır.",
    coach:
      "Ders Koçun sana bugün yardımcı oluyor.",
    pet:
      "Çalıştıkça evcil hayvanını geliştir.",
    market:
      "Coinlerini ödüller için kullan.",
    achievements:
      "Başarılarını topla ve rozetlerini aç.",
    stats:
      "Çalışma performansını incele.",
    profile:
      "Hesabını ve ilerlemeni yönet."
  };

  if (subtitle) {
    subtitle.textContent =
      titles[page] || titles.home;
  }

  const dynamic =
    $("dynamicSection");

  if (dynamic) {
    dynamic.style.display = "none";
    dynamic.innerHTML = "";
  }

  const homeHero =
    $("homeHero");

  if (homeHero) {
    homeHero.style.display =
      page === "home"
        ? "block"
        : "none";
  }

  const tasksSection =
    $("tasksSection");

  if (tasksSection) {
    tasksSection.style.display =
      page === "home" ||
      page === "tasks"
        ? "block"
        : "none";
  }

  switch (page) {

    case "home":
      renderHome();
      break;

    case "tasks":
      if (tasksSection) {
        tasksSection.style.display =
          "block";
      }
      renderTasks();
      break;

    case "subjects":
      renderSubjects();
      break;

    case "exams":
      renderExams();
      break;

    case "focus":
      renderFocus();
      break;

    case "coach":
      renderCoachPage();
      break;

    case "pet":
      renderPet();
      break;

    case "market":
      renderMarket();
      break;

    case "achievements":
      renderAchievements();
      break;

    case "stats":
      renderStats();
      break;

    case "profile":
      renderProfile();
      break;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function navigateMobile(page) {
  navigate(page);

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(btn => {
      btn.classList.remove("active");

      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick")
          .includes(`'${page}'`)
      ) {
        btn.classList.add("active");
      }
    });
}


/* =========================================================
   COACH PAGE
========================================================= */

function renderCoachPage() {
  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display =
    "block";

  const coach =
    state.coach;

  if (!coach) {
    section.innerHTML = `
      <div style="
        text-align:center;
        padding:30px;
      ">
        🤖 Ders Koçu yükleniyor...
      </div>
    `;

    return;
  }

  section.innerHTML = `
    <div class="card-title">
      <h2>🤖 Ders Koçu</h2>

      <span>
        Öncelik:
        <strong>
          ${escapeHTML(coach.priority)}
        </strong>
      </span>
    </div>

    <div style="
      background:linear-gradient(
        135deg,
        #eef0ff,
        #f8f6ff
      );
      border-radius:18px;
      padding:20px;
      margin-bottom:20px;
    ">

      <h2>
        ${escapeHTML(coach.greeting)}
      </h2>

      <p style="
        color:var(--muted);
        margin-top:7px;
      ">
        Bugünkü çalışma planın hazır.
      </p>

    </div>

    <div class="stats">

      <div class="stat">
        <span>⭐</span>
        <strong>
          ${coach.xp}
        </strong>
        <small>XP</small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>
          ${coach.streak}
        </strong>
        <small>Seri</small>
      </div>

      <div class="stat">
        <span>🎯</span>
        <strong>
          ${coach.incomplete_tasks}
        </strong>
        <small>Bekleyen görev</small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${coach.focus_minutes}
        </strong>
        <small>Odak dakikası</small>
      </div>

    </div>

    <div style="
      margin-top:20px;
    ">

      <h3>
        💡 Öneriler
      </h3>

      <div style="
        display:grid;
        gap:10px;
        margin-top:12px;
      ">

        ${
          coach.advice?.length
          ? coach.advice.map(item => `
            <div style="
              padding:16px;
              border:1px solid var(--border);
              border-radius:15px;
            ">

              <strong>
                ${item.icon || "💡"}
                ${escapeHTML(item.title)}
              </strong>

              <p style="
                color:var(--muted);
                margin-top:6px;
              ">
                ${escapeHTML(item.text)}
              </p>

            </div>
          `).join("")
          : `
            <div style="
              padding:20px;
              color:var(--muted);
            ">
              Bugün için özel bir öneri yok.
            </div>
          `
        }

      </div>

    </div>

    <div style="
      margin-top:20px;
      padding:18px;
      border-radius:16px;
      background:var(--bg);
    ">

      <h3>
        🎯 Bugünkü Hedef
      </h3>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">
        ${coach.recommended.tasks}
        görev •
        ${coach.recommended.minutes}
        dakika •
        ${coach.recommended.xp}
        XP
      </p>

    </div>
  `;
}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {
  const drawer =
    $("mobileDrawer");

  if (!drawer) return;

  drawer.classList.toggle("open");
}


function closeMobileMenu() {
  const drawer =
    $("mobileDrawer");

  if (!drawer) return;

  drawer.classList.remove("open");
}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {
  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "ders_takip_theme",
    dark ? "dark" : "light"
  );

  showToast(
    dark
      ? "🌙 Koyu tema açıldı."
      : "☀️ Açık tema açıldı.",
    "success"
  );
}


/* =========================================================
   CELEBRATION
========================================================= */

function showCelebration(
  xp = 50,
  title = "✨ GÖREV TAMAMLANDI! ✨"
) {
  const celebration =
    $("celebration");

  const text =
    $("celebrationText");

  if (!celebration) return;

  const titleElement =
    celebration.querySelector(
      "h2"
    );

  if (titleElement) {
    titleElement.textContent =
      title;
  }

  if (text) {
    text.textContent =
      `⭐ +${xp} XP`;
  }

  celebration.style.display =
    "flex";

  setTimeout(() => {
    celebration.style.display =
      "none";
  }, 2200);
}


/* =========================================================
   COINS
========================================================= */

function addCoins(amount) {
  amount =
    Number(amount) || 0;

  state.coins =
    Math.max(
      0,
      state.coins + amount
    );

  saveLocalData();

  updateUserUI();
}


/* =========================================================
   LOGOUT
========================================================= */

async function logout() {
  try {
    await api("logout", {
      method: "POST"
    });
  } catch {
    // Cookie temizlenmese bile frontend temizlenir.
  }

  state.user = null;
  state.tasks = [];
  state.subjects = [];
  state.exams = [];
  state.sessions = [];
  state.achievements = [];
  state.coach = null;
  state.stats = null;

  showAuth();

  showLogin();

  showToast(
    "Çıkış yapıldı. 👋",
    "success"
  );
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {
      closeModal();
      closeMobileMenu();
    }

  }
);


/* =========================================================
   MODAL
========================================================= */

function openModal(
  title,
  content
) {
  const modal =
    $("modal");

  if (!modal) return;

  $("modalTitle").textContent =
    title;

  $("modalContent").innerHTML =
    content;

  modal.classList.add("show");
}


function closeModal() {
  const modal =
    $("modal");

  if (!modal) return;

  modal.classList.remove("show");
}


/* =========================================================
   WINDOW EXPORTS
   HTML onclick'lerinin çalışması için
========================================================= */

window.showLogin = showLogin;
window.showRegister = showRegister;

window.togglePassword =
  togglePassword;

window.login = login;
window.register = register;
window.logout = logout;

window.navigate = navigate;
window.navigateMobile =
  navigateMobile;

window.toggleMobileMenu =
  toggleMobileMenu;

window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask =
  deleteTask;

window.addSubject =
  addSubject;

window.deleteSubject =
  deleteSubject;

window.addExam =
  addExam;

window.deleteExam =
  deleteExam;

window.startFocus =
  startFocus;

window.stopFocus =
  stopFocus;

window.resetFocus =
  resetFocus;

window.setFocusTime =
  setFocusTime;

window.feedPet =
  feedPet;

window.playWithPet =
  playWithPet;

window.renamePet =
  renamePet;

window.buyMarketItem =
  buyMarketItem;

window.claimDailyReward =
  claimDailyReward;

window.toggleTheme =
  toggleTheme;

window.openModal =
  openModal;

window.closeModal =
  closeModal;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadLocalData();

    updateDailyRewardUI();

    checkAuth();

  }
);
