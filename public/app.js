// ==========================================
// DERS TAKİP 2.0
// APP.JS
// ==========================================

const API = "/api";

// ==========================================
// STATE
// ==========================================

let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];
let stats = null;

let currentPage = "home";

let focusSeconds = 25 * 60;
let focusInterval = null;

const STORAGE_KEY = "ders_takip_extra_v1";

// ==========================================
// LOCAL EXTRA DATA
// ==========================================

function defaultExtra() {
  return {
    coins: 100,

    streak: 0,

    lastStudyDate: null,

    lastRewardDate: null,

    pet: {
      type: "🐼",
      name: "Panda",
      level: 1,
      xp: 0,
      accessories: []
    },

    ownedItems: [],

    equipped: {
      frame: "default",
      theme: "default"
    },

    dailyQuests: {},

    badges: [],

    theme: "light"
  };
}

function getExtra() {
  const key = currentUser
    ? `${STORAGE_KEY}_${currentUser.id}`
    : STORAGE_KEY;

  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return defaultExtra();
    }

    return {
      ...defaultExtra(),
      ...JSON.parse(saved)
    };
  } catch {
    return defaultExtra();
  }
}

function saveExtra(data) {
  const key = currentUser
    ? `${STORAGE_KEY}_${currentUser.id}`
    : STORAGE_KEY;

  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
}

// ==========================================
// API
// ==========================================

async function api(action, options = {}) {

  try {

    const response = await fetch(
      `${API}?action=${encodeURIComponent(action)}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {})
        },
        ...options
      }
    );

    const data =
      await response.json().catch(() => ({}));

    return {
      response,
      data
    };

  } catch (error) {

    console.error(error);

    return {
      response: {
        ok: false,
        status: 0
      },

      data: {
        success: false,
        message: "Sunucuya bağlanılamadı."
      }
    };
  }
}


// ==========================================
// INIT
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  init
);

async function init() {

  try {

    const result = await api("me");

    if (
      result.response.ok &&
      result.data.success
    ) {

      currentUser =
        result.data.user;

      showApp();

      await loadAll();

    } else {

      showAuth();

    }

  } catch {

    showAuth();

  }

}


// ==========================================
// AUTH
// ==========================================

function showAuth() {

  document.getElementById(
    "authScreen"
  ).style.display = "flex";

  document.getElementById(
    "app"
  ).style.display = "none";
}

function showApp() {

  document.getElementById(
    "authScreen"
  ).style.display = "none";

  document.getElementById(
    "app"
  ).style.display = "block";
}

function showLogin() {

  document.getElementById(
    "loginForm"
  ).style.display = "block";

  document.getElementById(
    "registerForm"
  ).style.display = "none";

  document.getElementById(
    "loginTab"
  ).classList.add("active");

  document.getElementById(
    "registerTab"
  ).classList.remove("active");

  setAuthMessage("");
}

function showRegister() {

  document.getElementById(
    "loginForm"
  ).style.display = "none";

  document.getElementById(
    "registerForm"
  ).style.display = "block";

  document.getElementById(
    "loginTab"
  ).classList.remove("active");

  document.getElementById(
    "registerTab"
  ).classList.add("active");

  setAuthMessage("");
}

function setAuthMessage(
  message,
  success = false
) {

  const el =
    document.getElementById(
      "authMessage"
    );

  el.textContent = message;

  el.style.color =
    success
      ? "#20a779"
      : "#e05263";
}


// ==========================================
// LOGIN
// ==========================================

async function login(event) {

  event.preventDefault();

  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    ).value;

  setAuthMessage("Giriş yapılıyor...");

  const result = await api(
    "login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  if (
    result.response.ok &&
    result.data.success
  ) {

    currentUser =
      result.data.user;

    setAuthMessage(
      "Giriş başarılı! 🚀",
      true
    );

    setTimeout(async () => {

      showApp();

      await loadAll();

    }, 300);

  } else {

    setAuthMessage(
      result.data.message ||
      "Giriş yapılamadı."
    );

  }
}


// ==========================================
// REGISTER
// ==========================================

async function register(event) {

  event.preventDefault();

  const name =
    document.getElementById(
      "registerName"
    ).value.trim();

  const email =
    document.getElementById(
      "registerEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "registerPassword"
    ).value;

  setAuthMessage(
    "Hesap oluşturuluyor..."
  );

  const result = await api(
    "register",
    {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  if (
    result.response.ok &&
    result.data.success
  ) {

    currentUser =
      result.data.user;

    setAuthMessage(
      "Hesabın hazır! 🎉",
      true
    );

    setTimeout(async () => {

      showApp();

      await loadAll();

    }, 300);

  } else {

    setAuthMessage(
      result.data.message ||
      "Kayıt oluşturulamadı."
    );

  }
}


// ==========================================
// PASSWORD
// ==========================================

function togglePassword(
  id,
  button
) {

  const input =
    document.getElementById(id);

  if (
    input.type === "password"
  ) {

    input.type = "text";

    button.textContent = "🙈";

  } else {

    input.type = "password";

    button.textContent = "👁️";

  }

}


// ==========================================
// LOGOUT
// ==========================================

async function logout() {

  await api(
    "logout",
    {
      method: "POST"
    }
  );

  currentUser = null;

  showAuth();

  showLogin();

}


// ==========================================
// LOAD ALL
// ==========================================

async function loadAll() {

  await Promise.all([
    loadTasks(),
    loadSubjects(),
    loadExams(),
    loadStats()
  ]);

  updateUserUI();

  generateDailyQuests();

  updateCoach();

  updatePetUI();

  updateDailyRewardUI();

  renderHome();

}


// ==========================================
// TASKS
// ==========================================

async function loadTasks() {

  const result =
    await api("tasks");

  if (
    result.response.ok &&
    result.data.success
  ) {

    tasks =
      result.data.tasks || [];

  }

}


async function addTask() {

  const input =
    document.getElementById(
      "newTask"
    );

  const title =
    input.value.trim();

  if (!title) {

    toast(
      "Görev adı yazmalısın ✍️"
    );

    return;
  }

  const result =
    await api(
      "tasks",
      {
        method: "POST",
        body: JSON.stringify({
          title
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    input.value = "";

    tasks.unshift(
      result.data.task
    );

    toast(
      "Görev eklendi! ✅"
    );

    renderTasks();

  } else {

    toast(
      result.data.message ||
      "Görev eklenemedi."
    );

  }

}


async function toggleTask(id) {

  const result =
    await api(
      "tasks",
      {
        method: "PATCH",
        body: JSON.stringify({
          id
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    const task =
      tasks.find(
        x => Number(x.id) === Number(id)
      );

    if (!task) return;

    task.completed =
      result.data.completed;

    if (task.completed) {

      addCoins(10);

      increasePetXP(10);

      updateStreak();

      showCelebration(
        "⭐ +50 XP<br>🪙 +10 Coin<br>🔥 Seri devam ediyor!"
      );

    } else {

      toast(
        "Görev tekrar açıldı."
      );

    }

    await loadStats();

    updateUserUI();

    renderTasks();

    updateCoach();

  }

}


async function deleteTask(id) {

  if (
    !confirm(
      "Bu görevi silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  const result =
    await api(
      "tasks",
      {
        method: "DELETE",
        body: JSON.stringify({
          id
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    tasks =
      tasks.filter(
        x => Number(x.id) !== Number(id)
      );

    toast(
      "Görev silindi."
    );

    await loadStats();

    renderTasks();

  }

}


// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {

  const list =
    document.getElementById(
      "taskList"
    );

  if (!tasks.length) {

    list.innerHTML = `
      <div style="
        text-align:center;
        padding:35px 10px;
        color:var(--muted);
      ">
        <div style="font-size:45px">🎯</div>
        <p style="margin-top:10px">
          Henüz görev yok.
        </p>
        <small>
          İlk görevini ekleyerek başla!
        </small>
      </div>
    `;

  } else {

    list.innerHTML =
      tasks.map(task => `
        <div class="task ${
          task.completed
            ? "completed"
            : ""
        }">

          <div
            class="checkbox"
            onclick="toggleTask(${task.id})"
          >
            ${
              task.completed
                ? "✓"
                : ""
            }
          </div>

          <div class="task-content">

            <div class="task-name">
              ${escapeHTML(task.title)}
            </div>

            <div
              style="
                color:var(--muted);
                font-size:12px;
                margin-top:4px;
              "
            >
              🎯 Görev
            </div>

          </div>

          <div class="task-xp">
            ⭐ ${task.xp || 50} XP
          </div>

          <button
            class="delete-task"
            onclick="deleteTask(${task.id})"
          >
            🗑️
          </button>

        </div>
      `).join("");

  }

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  document.getElementById(
    "taskCounter"
  ).textContent =
    `${completed} / ${tasks.length}`;

  const progress =
    tasks.length
      ? completed / tasks.length * 100
      : 0;

  document.getElementById(
    "progressBar"
  ).style.width =
    `${progress}%`;

  document.getElementById(
    "taskSummary"
  ).textContent =
    tasks.length
      ? `${completed}/${tasks.length} görevi tamamladın.`
      : "Bugün ilk görevini ekle!";

}


// ==========================================
// SUBJECTS
// ==========================================

async function loadSubjects() {

  const result =
    await api("subjects");

  if (
    result.response.ok &&
    result.data.success
  ) {

    subjects =
      result.data.subjects || [];

  }

}


async function addSubject() {

  const name =
    prompt(
      "Ders adı:"
    );

  if (!name || !name.trim()) {
    return;
  }

  const result =
    await api(
      "subjects",
      {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          color: "#6857f5"
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    subjects.unshift(
      result.data.subject
    );

    toast(
      "Ders eklendi! 📚"
    );

    renderPage();

  }

}


async function deleteSubject(id) {

  if (
    !confirm(
      "Dersi silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  await api(
    "subjects",
    {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }
  );

  subjects =
    subjects.filter(
      x => Number(x.id) !== Number(id)
    );

  renderPage();

}


// ==========================================
// EXAMS
// ==========================================

async function loadExams() {

  const result =
    await api("exams");

  if (
    result.response.ok &&
    result.data.success
  ) {

    exams =
      result.data.exams || [];

  }

}


async function addExam() {

  const title =
    document.getElementById(
      "examTitle"
    ).value.trim();

  const date =
    document.getElementById(
      "examDate"
    ).value;

  const subjectId =
    document.getElementById(
      "examSubject"
    ).value;

  const topic =
    document.getElementById(
      "examTopic"
    ).value.trim();

  if (!title || !date) {

    toast(
      "Sınav adı ve tarih gerekli."
    );

    return;
  }

  const result =
    await api(
      "exams",
      {
        method: "POST",
        body: JSON.stringify({
          title,
          exam_date: date,
          subject_id:
            subjectId || null,
          topic:
            topic || null
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    exams.push(
      result.data.exam
    );

    toast(
      "Sınav eklendi! 📅"
    );

    renderPage();

  }

}


async function deleteExam(id) {

  await api(
    "exams",
    {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }
  );

  exams =
    exams.filter(
      x => Number(x.id) !== Number(id)
    );

  renderPage();

}


// ==========================================
// STATS
// ==========================================

async function loadStats() {

  const result =
    await api("stats");

  if (
    result.response.ok &&
    result.data.success
  ) {

    stats =
      result.data.stats;

  }

}


// ==========================================
// USER UI
// ==========================================

function updateUserUI() {

  if (!currentUser) return;

  const extra =
    getExtra();

  const xp =
    Number(currentUser.xp || 0);

  const level =
    Math.floor(xp / 250) + 1;

  document.getElementById(
    "welcomeText"
  ).textContent =
    `Merhaba ${currentUser.name}! 👋`;

  document.getElementById(
    "levelText"
  ).textContent =
    `Seviye ${level}`;

  document.getElementById(
    "statXP"
  ).textContent =
    xp;

  document.getElementById(
    "statStreak"
  ).textContent =
    extra.streak || 0;

  document.getElementById(
    "statCoins"
  ).textContent =
    extra.coins || 0;

  document.getElementById(
    "streakNumber"
  ).textContent =
    extra.streak || 0;

  const levelProgress =
    xp % 250;

  document.getElementById(
    "xpText"
  ).textContent =
    `${levelProgress} / 250 XP • Toplam ${xp} XP`;

}


// ==========================================
// NAVIGATION
// ==========================================

function navigate(
  page,
  button = null
) {

  currentPage = page;

  document.querySelectorAll(
    ".menu button"
  ).forEach(btn =>
    btn.classList.remove("active")
  );

  if (button) {
    button.classList.add("active");
  } else {

    const buttons =
      document.querySelectorAll(
        ".menu button"
      );

    buttons.forEach(btn => {

      if (
        btn.textContent
          .toLowerCase()
          .includes(page === "home"
            ? "ana sayfa"
            : page)
      ) {
        btn.classList.add("active");
      }

    });

  }

  updateSectionHeader(page);

  renderPage();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function navigateMobile(page) {

  navigate(page);

  toggleMobileMenu();

}


function updateSectionHeader(page) {

  const data = {

    home: [
      "Ana Sayfa 🏠",
      "Bugünkü hedeflerin burada."
    ],

    tasks: [
      "Görevlerin ✅",
      "Bugün neleri tamamlayacaksın?"
    ],

    subjects: [
      "Derslerin 📚",
      "Derslerini düzenle ve takip et."
    ],

    exams: [
      "Sınav Takvimi 📅",
      "Sınavlarına kalan zamanı takip et."
    ],

    focus: [
      "Odaklanma ⏱️",
      "Telefonu bırak ve hedefe odaklan."
    ],

    coach: [
      "Ders Koçu 🤖",
      "Bugün ne çalışacağına birlikte karar verelim."
    ],

    pet: [
      "Evcil Hayvanın 🐣",
      "Çalıştıkça evcil hayvanın gelişir."
    ],

    market: [
      "Ödül Marketi 🛒",
      "Kazandığın coinlerle eşyalar satın al."
    ],

    achievements: [
      "Başarıların 🏆",
      "Kazandığın rozetleri keşfet."
    ],

    stats: [
      "İstatistiklerin 📊",
      "Çalışma performansını gör."
    ],

    profile: [
      "Profilin 👤",
      "Hesabını ve görünümünü düzenle."
    ]

  };

  const info =
    data[page] || data.home;

  document.getElementById(
    "welcomeText"
  ).textContent =
    info[0];

  document.getElementById(
    "sectionSubtitle"
  ).textContent =
    info[1];

}


// ==========================================
// PAGE RENDER
// ==========================================

function renderPage() {

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  const tasksSection =
    document.getElementById(
      "tasksSection"
    );

  const homeHero =
    document.getElementById(
      "homeHero"
    );

  if (currentPage === "home") {

    dynamic.style.display = "none";

    tasksSection.style.display =
      "block";

    homeHero.style.display =
      "block";

    renderTasks();

    return;
  }

  dynamic.style.display =
    "block";

  tasksSection.style.display =
    "none";

  homeHero.style.display =
    "none";

  const renderers = {

    tasks: renderTasksPage,

    subjects: renderSubjectsPage,

    exams: renderExamsPage,

    focus: renderFocusPage,

    coach: renderCoachPage,

    pet: renderPetPage,

    market: renderMarketPage,

    achievements: renderAchievementsPage,

    stats: renderStatsPage,

    profile: renderProfilePage

  };

  const renderer =
    renderers[currentPage];

  if (renderer) {

    dynamic.innerHTML =
      renderer();

  }

}


// ==========================================
// TASK PAGE
// ==========================================

function renderTasksPage() {

  return `
    <div class="card-title">
      <h2>✅ Tüm Görevlerin</h2>
      <span>${tasks.length} görev</span>
    </div>

    <div id="pageTaskList">
      ${tasks.map(task => `
        <div class="task ${
          task.completed ? "completed" : ""
        }">

          <div
            class="checkbox"
            onclick="toggleTask(${task.id})"
          >
            ${task.completed ? "✓" : ""}
          </div>

          <div class="task-content">
            <div class="task-name">
              ${escapeHTML(task.title)}
            </div>
          </div>

          <div class="task-xp">
            ⭐ ${task.xp || 50}
          </div>

          <button
            class="delete-task"
            onclick="deleteTask(${task.id})"
          >
            🗑️
          </button>

        </div>
      `).join("")}
    </div>

    <div class="add-task">

      <input
        id="pageNewTask"
        placeholder="Yeni görev..."
        maxlength="150"
        onkeydown="if(event.key==='Enter') addPageTask()"
      >

      <button onclick="addPageTask()">
        + Ekle
      </button>

    </div>
  `;

}


async function addPageTask() {

  const input =
    document.getElementById(
      "pageNewTask"
    );

  const title =
    input.value.trim();

  if (!title) return;

  const result =
    await api(
      "tasks",
      {
        method: "POST",
        body: JSON.stringify({
          title
        })
      }
    );

  if (
    result.response.ok &&
    result.data.success
  ) {

    tasks.unshift(
      result.data.task
    );

    toast(
      "Görev eklendi! ✅"
    );

    renderPage();

  }

}


// ==========================================
// SUBJECT PAGE
// ==========================================

function renderSubjectsPage() {

  return `
    <div class="card-title">

      <h2>📚 Derslerim</h2>

      <button
        class="primary-btn"
        onclick="addSubject()"
      >
        + Ders Ekle
      </button>

    </div>

    ${
      subjects.length
        ? subjects.map(subject => `
          <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:15px;
            border:1px solid var(--border);
            border-radius:15px;
            margin-bottom:10px;
          ">

            <div>
              <strong>
                📚 ${escapeHTML(subject.name)}
              </strong>
            </div>

            <button
              class="danger-btn"
              onclick="deleteSubject(${subject.id})"
            >
              Sil
            </button>

          </div>
        `).join("")
        : `
          <div style="
            text-align:center;
            padding:35px;
            color:var(--muted)
          ">
            Henüz ders eklemedin. 📚
          </div>
        `
    }
  `;

}


// ==========================================
// EXAMS PAGE
// ==========================================

function renderExamsPage() {

  return `
    <div class="card-title">
      <h2>📅 Sınav Takvimi</h2>
    </div>

    <div style="
      display:grid;
      grid-template-columns:
        repeat(auto-fit,minmax(180px,1fr));
      gap:10px;
      margin-bottom:20px;
    ">

      <input
        id="examTitle"
        placeholder="Sınav adı"
        style="padding:12px;border:1px solid var(--border);border-radius:10px"
      >

      <input
        id="examDate"
        type="datetime-local"
        style="padding:12px;border:1px solid var(--border);border-radius:10px"
      >

      <select
        id="examSubject"
        style="padding:12px;border:1px solid var(--border);border-radius:10px"
      >

        <option value="">
          Ders seç
        </option>

        ${subjects.map(s => `
          <option value="${s.id}">
            ${escapeHTML(s.name)}
          </option>
        `).join("")}

      </select>

      <input
        id="examTopic"
        placeholder="Konu"
        style="padding:12px;border:1px solid var(--border);border-radius:10px"
      >

      <button
        class="primary-btn"
        onclick="addExam()"
      >
        + Sınav Ekle
      </button>

    </div>

    ${
      exams.length
        ? exams.map(exam => {

          const days =
            daysUntil(
              exam.exam_date
            );

          return `
            <div class="card countdown"
              style="margin-bottom:12px"
            >

              <h3>
                📚 ${escapeHTML(exam.title)}
              </h3>

              <div class="countdown-number">
                ${
                  days <= 0
                    ? "BUGÜN!"
                    : `${days} gün`
                }
              </div>

              <p style="color:var(--muted)">
                ${exam.topic || "Konu belirtilmemiş"}
              </p>

              <button
                class="danger-btn"
                style="margin-top:12px"
                onclick="deleteExam(${exam.id})"
              >
                Sınavı Sil
              </button>

            </div>
          `;

        }).join("")
        : `
          <div style="
            text-align:center;
            padding:35px;
            color:var(--muted)
          ">
            Henüz sınav eklemedin. 📅
          </div>
        `
    }
  `;

}


// ==========================================
// FOCUS PAGE
// ==========================================

function renderFocusPage() {

  return `
    <div class="focus">

      <h2>
        ⏱️ Odaklanma Modu
      </h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        25 dakika boyunca sadece görevine odaklan.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTime(focusSeconds)}
      </div>

      <div class="focus-buttons">

        <button
          class="primary-btn"
          onclick="startFocus()"
        >
          ▶ Başlat
        </button>

        <button
          class="secondary-btn"
          onclick="pauseFocus()"
        >
          ⏸ Duraklat
        </button>

        <button
          class="secondary-btn"
          onclick="resetFocus()"
        >
          🔄 Sıfırla
        </button>

      </div>

      <div style="
        margin-top:30px;
        padding:20px;
        border-radius:18px;
        background:#f0efff;
      ">
        🎯 Telefonunu bırak.<br>
        📚 Konuna odaklan.<br>
        🚀 25 dakika sonra ödülün hazır!
      </div>

    </div>
  `;

}


function startFocus() {

  if (focusInterval) return;

  focusInterval =
    setInterval(() => {

      focusSeconds--;

      const timer =
        document.getElementById(
          "focusTimer"
        );

      if (timer) {

        timer.textContent =
          formatTime(focusSeconds);

      }

      if (focusSeconds <= 0) {

        pauseFocus();

        completeFocus();

      }

    },1000);

}


function pauseFocus() {

  clearInterval(
    focusInterval
  );

  focusInterval = null;

}


function resetFocus() {

  pauseFocus();

  focusSeconds =
    25 * 60;

  renderPage();

}


function completeFocus() {

  addCoins(15);

  increasePetXP(25);

  updateStreak();

  showCelebration(
    "🎉 ODAKLANMA TAMAMLANDI!<br>⭐ +25 XP<br>🪙 +15 Coin"
  );

}


// ==========================================
// COACH
// ==========================================

function updateCoach() {

  const el =
    document.getElementById(
      "coachMessage"
    );

  if (!el) return;

  const incomplete =
    tasks.filter(
      t => !t.completed
    );

  let nearestExam = null;

  for (const exam of exams) {

    const d =
      daysUntil(
        exam.exam_date
      );

    if (
      d >= 0 &&
      (!nearestExam ||
       d < daysUntil(nearestExam.exam_date))
    ) {

      nearestExam = exam;

    }

  }

  if (nearestExam) {

    const d =
      daysUntil(
        nearestExam.exam_date
      );

    el.textContent =
      d <= 3
        ? `🚨 ${nearestExam.title} sınavına sadece ${d} gün kaldı! Bugün bu derse öncelik vermen harika olur.`
        : `📚 ${nearestExam.title} sınavına ${d} gün kaldı. Bugün en az 30 dakika çalışmanı öneriyorum.`;

  } else if (incomplete.length) {

    el.textContent =
      `🎯 Bugün ${incomplete.length} görevin var. Önce "${incomplete[0].title}" görevini tamamlamayı dene!`;

  } else {

    el.textContent =
      "🔥 Harika gidiyorsun! Bugünkü görevlerinin tamamını bitirdin.";

  }

}


// ==========================================
// COACH PAGE
// ==========================================

function renderCoachPage() {

  const incomplete =
    tasks.filter(
      t => !t.completed
    );

  const nearestExam =
    exams
      .map(e => ({
        ...e,
        days: daysUntil(e.exam_date)
      }))
      .filter(e => e.days >= 0)
      .sort((a,b) => a.days-b.days)[0];

  return `
    <div class="coach">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>Ders Koçu</h2>
          <small style="color:var(--muted)">
            Sana özel çalışma planı
          </small>
        </div>

      </div>

      <p class="coach-message">

        ${
          nearestExam
            ? `📅 <strong>${escapeHTML(nearestExam.title)}</strong>
               sınavına ${nearestExam.days} gün kaldı.<br><br>`
            : ""
        }

        ${
          incomplete.length
            ? `🎯 Önceliğin:
               <strong>${escapeHTML(incomplete[0].title)}</strong>`
            : "🎉 Bugünkü görevlerini tamamladın!"
        }

        <br><br>

        ⏱️ Önerilen çalışma:
        <strong>25 dakika</strong>

        <br><br>

        💜 Küçük adımlar büyük başarılara dönüşür!
      </p>

      <button
        class="primary-btn"
        style="margin-top:20px"
        onclick="navigate('focus')"
      >
        ⏱️ Hemen Çalış
      </button>

    </div>
  `;

}


// ==========================================
// PET
// ==========================================

function updatePetUI() {

  const extra =
    getExtra();

  const pet =
    extra.pet;

  const display =
    document.getElementById(
      "petDisplay"
    );

  const name =
    document.getElementById(
      "petName"
    );

  const level =
    document.getElementById(
      "petLevel"
    );

  if (display) {

    display.textContent =
      pet.type;

  }

  if (name) {

    name.textContent =
      pet.name;

  }

  if (level) {

    level.textContent =
      `Seviye ${pet.level} • ${pet.xp}/100 XP`;

  }

}


function increasePetXP(amount) {

  const extra =
    getExtra();

  extra.pet.xp += amount;

  while (
    extra.pet.xp >= 100
  ) {

    extra.pet.xp -= 100;

    extra.pet.level++;

    toast(
      `🐣 ${extra.pet.name} seviye atladı!`
    );

  }

  saveExtra(extra);

  updatePetUI();

}


function renderPetPage() {

  const extra =
    getExtra();

  const pet =
    extra.pet;

  const pets = [
    ["🐼","Panda"],
    ["🐱","Kedi"],
    ["🐶","Köpek"],
    ["🐰","Tavşan"],
    ["🦊","Tilki"]
  ];

  return `
    <div class="pet-card">

      <h2>
        🐣 Evcil Hayvanım
      </h2>

      <div class="pet-display">
        ${pet.type}
      </div>

      <h2>
        ${escapeHTML(pet.name)}
      </h2>

      <p style="color:var(--muted);margin-top:5px">
        Seviye ${pet.level} • ${pet.xp}/100 XP
      </p>

      <hr style="
        margin:25px 0;
        border:none;
        border-top:1px solid var(--border)
      ">

      <h3 style="margin-bottom:12px">
        🐾 Hayvanını Seç
      </h3>

      <div class="market-grid">

        ${pets.map(p => `
          <button
            class="shop-item"
            onclick="choosePet('${p[0]}','${p[1]}')"
          >
            <div class="shop-icon">
              ${p[0]}
            </div>

            <strong>
              ${p[1]}
            </strong>
          </button>
        `).join("")}

      </div>

      <hr style="
        margin:25px 0;
        border:none;
        border-top:1px solid var(--border)
      ">

      <button
        class="primary-btn"
        onclick="renamePet()"
      >
        ✏️ Adını Değiştir
      </button>

    </div>
  `;

}


function choosePet(
  emoji,
  name
) {

  const extra =
    getExtra();

  extra.pet.type =
    emoji;

  extra.pet.name =
    name;

  saveExtra(extra);

  updatePetUI();

  toast(
    `${emoji} ${name} artık senin evcil hayvanın!`
  );

  renderPage();

}


function renamePet() {

  const extra =
    getExtra();

  const name =
    prompt(
      "Evcil hayvanına hangi ismi vermek istiyorsun?",
      extra.pet.name
    );

  if (!name || !name.trim()) {
    return;
  }

  extra.pet.name =
    name.trim().slice(0,30);

  saveExtra(extra);

  updatePetUI();

  renderPage();

  toast(
    "Evcil hayvanının adı değişti! 🐾"
  );

}


// ==========================================
// MARKET
// ==========================================

const SHOP_ITEMS = [

  {
    id: "hat",
    icon: "🎩",
    name: "Şık Şapka",
    description: "Evcil hayvanına tak!",
    price: 100,
    category: "pet"
  },

  {
    id: "crown",
    icon: "👑",
    name: "Kraliyet Tacı",
    description: "Evcil hayvanın kral olsun.",
    price: 300,
    category: "pet"
  },

  {
    id: "glasses",
    icon: "😎",
    name: "Havalı Gözlük",
    description: "Çalışkan hayvana havalı görünüm.",
    price: 180,
    category: "pet"
  },

  {
    id: "bow",
    icon: "🎀",
    name: "Sevimli Fiyonk",
    description: "Tatlılık seviyesi +100.",
    price: 120,
    category: "pet"
  },

  {
    id: "star",
    icon: "⭐",
    name: "Yıldız Rozeti",
    description: "Özel profil rozeti.",
    price: 150,
    category: "profile"
  },

  {
    id: "fire",
    icon: "🔥",
    name: "Alevli Çerçeve",
    description: "Profilini parlat.",
    price: 250,
    category: "profile"
  },

  {
    id: "rainbow",
    icon: "🌈",
    name: "Gökkuşağı Tema",
    description: "Renkli profil görünümü.",
    price: 400,
    category: "theme"
  },

  {
    id: "space",
    icon: "🚀",
    name: "Uzay Teması",
    description: "Profilini uzaya taşı.",
    price: 500,
    category: "theme"
  },

  {
    id: "diamond",
    icon: "💎",
    name: "Elmas Rozet",
    description: "Nadir profil rozeti.",
    price: 750,
    category: "profile"
  }

];


function renderMarketPage() {

  const extra =
    getExtra();

  return `
    <div>

      <div class="card-title">

        <div>
          <h2>
            🛒 Ödül Marketi
          </h2>

          <small style="color:var(--muted)">
            Görev yap, coin kazan, ödülleri aç!
          </small>
        </div>

        <div style="
          font-weight:950;
          font-size:20px;
        ">
          🪙 ${extra.coins}
        </div>

      </div>

      <div class="market-grid">

        ${SHOP_ITEMS.map(item => {

          const owned =
            extra.ownedItems.includes(
              item.id
            );

          return `
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
                🪙 ${item.price}
              </div>

              <button
                class="${
                  owned
                    ? "secondary-btn"
                    : "primary-btn"
                }"
                onclick="${
                  owned
                    ? `equipItem('${item.id}')`
                    : `buyItem('${item.id}')`
                }"
              >
                ${
                  owned
                    ? "Kullan"
                    : "Satın Al"
                }
              </button>

            </div>
          `;

        }).join("")}

      </div>

    </div>
  `;

}


function buyItem(id) {

  const extra =
    getExtra();

  const item =
    SHOP_ITEMS.find(
      x => x.id === id
    );

  if (!item) return;

  if (
    extra.ownedItems.includes(id)
  ) {

    toast(
      "Bu eşya zaten sende."
    );

    return;
  }

  if (
    extra.coins < item.price
  ) {

    toast(
      `Yeterli coin yok! ${item.price - extra.coins} coin daha gerekli.`
    );

    return;
  }

  extra.coins -=
    item.price;

  extra.ownedItems.push(
    id
  );

  saveExtra(extra);

  updateUserUI();

  toast(
    `${item.icon} ${item.name} satın alındı!`
  );

  renderPage();

}


function equipItem(id) {

  const extra =
    getExtra();

  const item =
    SHOP_ITEMS.find(
      x => x.id === id
    );

  if (!item) return;

  if (item.category === "pet") {

    extra.pet.accessories =
      [
        ...new Set([
          ...extra.pet.accessories,
          item.icon
        ])
      ];

    toast(
      `${item.icon} evcil hayvanına takıldı!`
    );

  }

  if (item.category === "theme") {

    extra.equipped.theme =
      item.id;

    toast(
      `${item.icon} tema etkinleştirildi!`
    );

  }

  if (item.category === "profile") {

    extra.equipped.frame =
      item.id;

    toast(
      `${item.icon} profil ödülün etkinleştirildi!`
    );

  }

  saveExtra(extra);

  renderPage();

}


// ==========================================
// COINS
// ==========================================

function addCoins(amount) {

  const extra =
    getExtra();

  extra.coins =
    Math.max(
      0,
      Number(extra.coins || 0) +
      Number(amount)
    );

  saveExtra(extra);

  updateUserUI();

}


// ==========================================
// DAILY REWARD
// ==========================================

function claimDailyReward() {

  const extra =
    getExtra();

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  if (
    extra.lastRewardDate === today
  ) {

    toast(
      "Bugünkü ödülünü zaten aldın 🎁"
    );

    return;
  }

  extra.lastRewardDate =
    today;

  extra.coins += 25;

  saveExtra(extra);

  toast(
    "🎁 +25 Coin günlük ödül!"
  );

  updateDailyRewardUI();

  updateUserUI();

}


function updateDailyRewardUI() {

  const extra =
    getExtra();

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  const button =
    document.getElementById(
      "dailyRewardButton"
    );

  const text =
    document.getElementById(
      "dailyRewardText"
    );

  if (!button || !text) {
    return;
  }

  if (
    extra.lastRewardDate === today
  ) {

    button.disabled = true;

    button.textContent =
      "Bugün Alındı ✅";

    text.textContent =
      "Yarın tekrar gel! 🔥";

  } else {

    button.disabled = false;

    button.textContent =
      "Ödülü Al 🎁";

    text.textContent =
      "+25 Coin seni bekliyor!";

  }

}


// ==========================================
// STREAK
// ==========================================

function updateStreak() {

  const extra =
    getExtra();

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  if (
    extra.lastStudyDate === today
  ) {

    return;

  }

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayString =
    yesterday
      .toISOString()
      .slice(0,10);

  if (
    extra.lastStudyDate ===
    yesterdayString
  ) {

    extra.streak++;

  } else {

    extra.streak = 1;

  }

  extra.lastStudyDate =
    today;

  saveExtra(extra);

  updateUserUI();

}


// ==========================================
// DAILY QUESTS
// ==========================================

function generateDailyQuests() {

  const extra =
    getExtra();

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  if (
    extra.dailyQuests.date ===
    today
  ) {
    return;
  }

  extra.dailyQuests = {

    date: today,

    quests: [

      {
        id: "study",
        title: "25 dakika ders çalış",
        reward: 30,
        done: false
      },

      {
        id: "tasks",
        title: "3 görev tamamla",
        reward: 40,
        done: false
      },

      {
        id: "focus",
        title: "Bir odaklanma seansı yap",
        reward: 25,
        done: false
      }

    ]

  };

  saveExtra(extra);

}


// ==========================================
// ACHIEVEMENTS
// ==========================================

function getBadges() {

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const xp =
    Number(
      currentUser?.xp || 0
    );

  const extra =
    getExtra();

  return [

    {
      icon: "🥇",
      name: "İlk Görev",
      unlocked: completed >= 1,
      description: "İlk görevini tamamla."
    },

    {
      icon: "🔥",
      name: "3 Günlük Seri",
      unlocked: extra.streak >= 3,
      description: "3 gün üst üste çalış."
    },

    {
      icon: "📚",
      name: "10 Görev",
      unlocked: completed >= 10,
      description: "10 görev tamamla."
    },

    {
      icon: "⏱️",
      name: "100 Dakika",
      unlocked:
        Number(stats?.sessions?.minutes || 0) >= 100,
      description: "100 dakika çalış."
    },

    {
      icon: "🎯",
      name: "Sınav Hedefi",
      unlocked: exams.length >= 1,
      description: "İlk sınavını ekle."
    },

    {
      icon: "💯",
      name: "1000 XP",
      unlocked: xp >= 1000,
      description: "1000 XP kazan."
    },

    {
      icon: "👑",
      name: "Çalışma Ustası",
      unlocked: xp >= 2500,
      description: "2500 XP kazan."
    },

    {
      icon: "🔥",
      name: "30 Gün",
      unlocked: extra.streak >= 30,
      description: "30 günlük seri yap."
    }

  ];

}


function renderAchievementsPage() {

  const badges =
    getBadges();

  return `
    <div>

      <div class="card-title">

        <h2>
          🏆 Başarı Rozetleri
        </h2>

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
              ${badge.name}
            </strong>

            <br>

            <small>
              ${badge.description}
            </small>

          </div>

        `).join("")}

      </div>

    </div>
  `;

}


// ==========================================
// STATS PAGE
// ==========================================

function renderStatsPage() {

  const totalMinutes =
    Number(
      stats?.sessions?.minutes || 0
    );

  const hours =
    Math.floor(
      totalMinutes / 60
    );

  const minutes =
    totalMinutes % 60;

  const completed =
    Number(
      stats?.tasks?.completed || 0
    );

  const total =
    Number(
      stats?.tasks?.total || 0
    );

  const percentage =
    total
      ? Math.round(
          completed / total * 100
        )
      : 0;

  return `
    <div>

      <div class="card-title">
        <h2>📊 İstatistiklerin</h2>
      </div>

      <div class="stats">

        <div class="stat">
          <span>⭐</span>
          <strong>
            ${currentUser?.xp || 0}
          </strong>
          <small>Toplam XP</small>
        </div>

        <div class="stat">
          <span>⏱️</span>
          <strong>
            ${hours}s ${minutes}dk
          </strong>
          <small>Toplam çalışma</small>
        </div>

        <div class="stat">
          <span>✅</span>
          <strong>
            ${percentage}%
          </strong>
          <small>Görev başarı oranı</small>
        </div>

      </div>

      <div class="card" style="margin-top:20px">

        <h3>
          📈 Görev Performansı
        </h3>

        <div style="
          margin-top:20px;
          height:20px;
          border-radius:20px;
          background:var(--border);
          overflow:hidden;
        ">

          <div style="
            width:${percentage}%;
            height:100%;
            background:linear-gradient(
              90deg,
              #6857f5,
              #20c997
            );
          "></div>

        </div>

        <p style="
          margin-top:12px;
          color:var(--muted)
        ">
          ${completed} / ${total}
          görev tamamlandı.
        </p>

      </div>

    </div>
  `;

}


// ==========================================
// PROFILE
// ==========================================

function renderProfilePage() {

  const extra =
    getExtra();

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    Math.floor(xp / 250) + 1;

  return `
    <div>

      <div style="
        text-align:center;
        padding:15px;
      ">

        <div style="
          width:110px;
          height:110px;
          border-radius:50%;
          background:#e7e4ff;
          display:grid;
          place-items:center;
          margin:auto;
          font-size:55px;
        ">
          🎓
        </div>

        <h2 style="margin-top:15px">
          ${escapeHTML(currentUser?.name || "Öğrenci")}
        </h2>

        <p style="color:var(--muted)">
          ${escapeHTML(currentUser?.email || "")}
        </p>

        <div class="stats">

          <div class="stat">
            <strong>${level}</strong>
            <small>Seviye</small>
          </div>

          <div class="stat">
            <strong>${xp}</strong>
            <small>XP</small>
          </div>

          <div class="stat">
            <strong>${extra.coins}</strong>
            <small>Coin</small>
          </div>

        </div>

      </div>

      <div class="card" style="margin-top:20px">

        <h3>
          🎨 Görünüm
        </h3>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:15px;
        ">

          <button
            class="secondary-btn"
            onclick="setTheme('light')"
          >
            ☀️ Açık
          </button>

          <button
            class="secondary-btn"
            onclick="setTheme('dark')"
          >
            🌙 Karanlık
          </button>

        </div>

      </div>

    </div>
  `;

}


// ==========================================
// THEME
// ==========================================

function setTheme(theme) {

  document.body.classList.toggle(
    "dark",
    theme === "dark"
  );

  const extra =
    getExtra();

  extra.theme =
    theme;

  saveExtra(extra);

}


// ==========================================
// MOBILE MENU
// ==========================================

function toggleMobileMenu() {

  const drawer =
    document.getElementById(
      "mobileDrawer"
    );

  drawer.classList.toggle(
    "open"
  );

}


// ==========================================
// CELEBRATION
// ==========================================

function showCelebration(
  text
) {

  const el =
    document.getElementById(
      "celebration"
    );

  const textEl =
    document.getElementById(
      "celebrationText"
    );

  textEl.innerHTML =
    text;

  el.style.display =
    "flex";

  setTimeout(() => {

    el.style.display =
      "none";

  },2200);

}


// ==========================================
// TOAST
// ==========================================

function toast(message) {

  const container =
    document.getElementById(
      "toastContainer"
    );

  const item =
    document.createElement(
      "div"
    );

  item.className =
    "toast";

  item.innerHTML =
    message;

  container.appendChild(
    item
  );

  setTimeout(() => {

    item.remove();

  },3000);

}


// ==========================================
// HELPERS
// ==========================================

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function daysUntil(date) {

  const target =
    new Date(date);

  const now =
    new Date();

  target.setHours(0,0,0,0);
  now.setHours(0,0,0,0);

  const diff =
    target.getTime() -
    now.getTime();

  return Math.ceil(
    diff / 86400000
  );

}


function formatTime(seconds) {

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

}


// ==========================================
// HOME
// ==========================================

function renderHome() {

  renderTasks();

  updateCoach();

  updatePetUI();

  updateDailyRewardUI();

}


// ==========================================
// AUTO THEME
// ==========================================

(function restoreTheme() {

  try {

    const saved =
      localStorage.getItem(
        "ders_theme"
      );

    if (saved === "dark") {

      document.body.classList.add(
        "dark"
      );

    }

  } catch {}

})();
