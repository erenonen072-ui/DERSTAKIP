/* =========================================================
   DERS TAKİP 3.0 - APP.JS
   API: /api/index.js

   ÖZELLİKLER
   - Giriş / kayıt
   - Görev yönetimi
   - Görev arama / filtreleme
   - Ders yönetimi
   - Sınav yönetimi
   - Pomodoro odak
   - Ders koçu
   - Evcil hayvan
   - Coin market
   - Başarılar
   - İstatistikler
   - Profil
   - Günlük ödül
   - XP / Seviye
   - Karanlık mod
   - Mobil menü
   ========================================================= */

const API = "/api/index.js";

let currentUser = null;

let tasks = [];
let subjects = [];
let exams = [];
let achievements = [];
let coachData = null;

let timerInterval = null;
let timerSeconds = 25 * 60;
let timerRunning = false;
let timerMode = "Çalışma";

let taskFilter = "all";
let taskSearch = "";

const state = {
  currentPage: "home",

  darkMode: false,

  coins: 0,

  dailyRewardClaimed: false,

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    xp: 0
  }
};


/* =========================================================
   DOM HELPER
   ========================================================= */

const $ = (id) => document.getElementById(id);

function safeText(value) {
  return String(value ?? "");
}


/* =========================================================
   API
   ========================================================= */

async function api(action, options = {}) {
  const url =
    `${API}?action=${encodeURIComponent(action)}`;

  const config = {
    method: options.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (options.body !== undefined) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Sunucudan geçersiz cevap geldi."
    );
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
      `API hatası: ${response.status}`
    );
  }

  return data;
}


/* =========================================================
   TOAST
   ========================================================= */

function toast(message, type = "info") {
  const container = $("toastContainer");

  if (!container) {
    alert(message);
    return;
  }

  const item =
    document.createElement("div");

  item.className = "toast";

  if (type === "success") {
    item.style.borderLeft =
      "5px solid #20c997";
  }

  if (type === "error") {
    item.style.borderLeft =
      "5px solid #ff5b6e";
  }

  item.textContent = message;

  container.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 3500);
}


/* =========================================================
   AUTH
   ========================================================= */

function showLogin() {
  if ($("loginForm")) {
    $("loginForm").style.display = "block";
  }

  if ($("registerForm")) {
    $("registerForm").style.display = "none";
  }

  if ($("loginTab")) {
    $("loginTab").classList.add("active");
  }

  if ($("registerTab")) {
    $("registerTab").classList.remove("active");
  }

  if ($("authMessage")) {
    $("authMessage").textContent = "";
  }
}


function showRegister() {
  if ($("loginForm")) {
    $("loginForm").style.display = "none";
  }

  if ($("registerForm")) {
    $("registerForm").style.display = "block";
  }

  if ($("loginTab")) {
    $("loginTab").classList.remove("active");
  }

  if ($("registerTab")) {
    $("registerTab").classList.add("active");
  }

  if ($("authMessage")) {
    $("authMessage").textContent = "";
  }
}


function togglePassword(id, button) {
  const input = $(id);

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


async function login(event) {
  event.preventDefault();

  const email =
    $("loginEmail")?.value.trim();

  const password =
    $("loginPassword")?.value;

  const message =
    $("authMessage");

  if (!email || !password) {
    if (message) {
      message.style.color = "#ff5b6e";
      message.textContent =
        "E-posta ve şifre gerekli.";
    }

    return;
  }

  if (message) {
    message.style.color = "#6857f5";
    message.textContent =
      "Giriş yapılıyor...";
  }

  try {
    const data = await api("login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    currentUser = data.user;

    if (message) {
      message.style.color = "#20a878";
      message.textContent =
        "Giriş başarılı! 🚀";
    }

    await startApp();

  } catch (error) {

    if (message) {
      message.style.color = "#ff5b6e";
      message.textContent =
        error.message;
    }
  }
}


async function register(event) {
  event.preventDefault();

  const name =
    $("registerName")?.value.trim();

  const email =
    $("registerEmail")?.value.trim();

  const password =
    $("registerPassword")?.value;

  const message =
    $("authMessage");

  if (!name || !email || !password) {
    if (message) {
      message.style.color = "#ff5b6e";
      message.textContent =
        "Tüm alanları doldurmalısın.";
    }

    return;
  }

  if (message) {
    message.style.color = "#6857f5";
    message.textContent =
      "Hesap oluşturuluyor...";
  }

  try {

    const data = await api("register", {
      method: "POST",
      body: {
        name,
        email,
        password
      }
    });

    currentUser = data.user;

    if (message) {
      message.style.color = "#20a878";
      message.textContent =
        "Hesabın oluşturuldu! 🎉";
    }

    await startApp();

  } catch (error) {

    if (message) {
      message.style.color = "#ff5b6e";
      message.textContent =
        error.message;
    }
  }
}


async function logout() {

  try {
    await api("logout", {
      method: "POST"
    });
  } catch {}

  currentUser = null;

  tasks = [];
  subjects = [];
  exams = [];
  achievements = [];
  coachData = null;

  $("app").style.display = "none";
  $("authScreen").style.display = "flex";

  showLogin();

  toast("Çıkış yapıldı 👋");
}


/* =========================================================
   APP START
   ========================================================= */

async function startApp() {

  $("authScreen").style.display = "none";
  $("app").style.display = "block";

  await loadAllData();

  loadPet();
  loadDailyReward();

  navigate("home");

  updateUserUI();
}


/* =========================================================
   LOAD ALL DATA
   ========================================================= */

async function loadAllData() {

  try {

    const [
      meData,
      tasksData,
      subjectsData,
      examsData,
      achievementsData,
      statsData,
      coachResult
    ] = await Promise.all([

      api("me"),

      api("tasks"),

      api("subjects"),

      api("exams"),

      api("achievements"),

      api("stats"),

      api("coach")
    ]);

    currentUser =
      meData.user;

    tasks =
      tasksData.tasks || [];

    subjects =
      subjectsData.subjects || [];

    exams =
      examsData.exams || [];

    achievements =
      achievementsData.achievements || [];

    coachData =
      coachResult.coach || null;

    state.coins =
      Number(currentUser?.coins) ||
      Number(currentUser?.paralar) ||
      Number(
        localStorage.getItem(
          "ders_takip_coins"
        )
      ) ||
      0;

    updateUserUI();

    renderTasks();

    renderHome();

  } catch (error) {

    console.error(error);

    if (
      error.message.includes("Oturum") ||
      error.message.includes("401")
    ) {

      $("app").style.display = "none";
      $("authScreen").style.display = "flex";

      return;
    }

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   USER UI
   ========================================================= */

function updateUserUI() {

  if (!currentUser) return;

  const name =
    currentUser.name ||
    "Öğrenci";

  const xp =
    Number(currentUser.xp) || 0;

  const streak =
    Number(currentUser.streak) || 0;

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
  }

  if ($("statXP")) {
    $("statXP").textContent =
      xp;
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      streak;
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      state.coins;
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent =
      streak;
  }

  const level =
    calculateLevel(xp);

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${level}`;
  }

  updateXPBar(xp);

  updatePetHome();
}


/* =========================================================
   LEVEL
   ========================================================= */

function calculateLevel(xp) {

  return Math.floor(
    Number(xp || 0) / 500
  ) + 1;
}


function updateXPBar(xp) {

  const level =
    calculateLevel(xp);

  const levelStart =
    (level - 1) * 500;

  const progress =
    ((xp - levelStart) / 500) * 100;

  if ($("progressBar")) {

    $("progressBar").style.width =
      `${Math.min(
        100,
        Math.max(0, progress)
      )}%`;
  }

  if ($("xpText")) {

    $("xpText").textContent =
      `${xp} XP • Seviye ${level}`;
  }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function hideHomeSections() {

  const homeHero =
    $("homeHero");

  const tasksSection =
    $("tasksSection");

  if (homeHero) {
    homeHero.style.display =
      "none";
  }

  if (tasksSection) {
    tasksSection.style.display =
      "none";
  }
}


function showHomeSections() {

  const homeHero =
    $("homeHero");

  const tasksSection =
    $("tasksSection");

  const dynamicSection =
    $("dynamicSection");

  if (homeHero) {
    homeHero.style.display =
      "block";
  }

  if (tasksSection) {
    tasksSection.style.display =
      "block";
  }

  if (dynamicSection) {
    dynamicSection.style.display =
      "none";
  }
}


function navigate(
  page,
  button = null
) {

  state.currentPage =
    page;

  closeMobileMenu();

  document
    .querySelectorAll(
      ".menu button, .mobile-menu-item"
    )
    .forEach(item => {
      item.classList.remove(
        "active"
      );
    });

  if (button) {
    button.classList.add(
      "active"
    );
  }

  document
    .querySelectorAll(
      ".menu button, .mobile-menu-item"
    )
    .forEach(item => {

      const onclick =
        item.getAttribute(
          "onclick"
        ) || "";

      if (
        onclick.includes(
          `'${page}'`
        )
      ) {

        item.classList.add(
          "active"
        );
      }
    });

  renderPage(page);
}


function navigateMobile(page) {

  navigate(page);

  document
    .querySelectorAll(
      ".mobile-menu-item"
    )
    .forEach(item => {

      item.classList.remove(
        "active"
      );

      const onclick =
        item.getAttribute(
          "onclick"
        ) || "";

      if (
        onclick.includes(
          `'${page}'`
        )
      ) {

        item.classList.add(
          "active"
        );
      }
    });

  closeMobileMenu();
}


function renderPage(page) {

  const dynamic =
    $("dynamicSection");

  hideHomeSections();

  if (dynamic) {
    dynamic.style.display =
      "block";
  }

  switch (page) {

    case "home":
      showHomeSections();
      renderHome();
      break;

    case "tasks":
      renderTasksPage();
      break;

    case "subjects":
      renderSubjectsPage();
      break;

    case "exams":
      renderExamsPage();
      break;

    case "focus":
      renderFocusPage();
      break;

    case "coach":
      renderCoachPage();
      break;

    case "pet":
      renderPetPage();
      break;

    case "market":
      renderMarketPage();
      break;

    case "achievements":
      renderAchievementsPage();
      break;

    case "stats":
      renderStatsPage();
      break;

    case "profile":
      renderProfilePage();
      break;

    default:
      showHomeSections();
      renderHome();
  }

  updateSectionTitle(page);
}


/* =========================================================
   SECTION TITLE
   ========================================================= */

function updateSectionTitle(page) {

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
      "Telefonu bırak, derse odaklan. ⏱️",

    coach:
      "Ders Koçun sana bugün yol göstersin.",

    pet:
      "Çalıştıkça Panda'n gelişsin. 🐼",

    market:
      "Coinlerini ödüllere dönüştür.",

    achievements:
      "Başarılarını ve rozetlerini gör.",

    stats:
      "Çalışma performansını incele.",

    profile:
      "Hesabını ve profilini yönet."
  };

  if ($("sectionSubtitle")) {

    $("sectionSubtitle").textContent =
      titles[page] ||
      titles.home;
  }
}


/* =========================================================
   HOME - SADE ANA SAYFA
   ========================================================= */

function renderHome() {

  showHomeSections();

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  if ($("taskSummary")) {

    if (total === 0) {

      $("taskSummary").textContent =
        "Bugün için henüz görev eklemedin.";

    } else {

      $("taskSummary").textContent =
        `${completed}/${total} görev tamamlandı`;
    }
  }

  renderTasks();

  updateUserUI();
}


/* =========================================================
   HOME COACH MINI
   ========================================================= */

function renderCoachMini() {

  if (
    !coachData ||
    !coachData.advice
  ) {
    return;
  }

  const first =
    coachData.advice[0];

  if (
    $("coachMessage") &&
    first
  ) {

    $("coachMessage").textContent =
      `${first.icon || "🤖"} ${first.title}: ${first.text}`;
  }
}


/* =========================================================
   TASKS
   ========================================================= */

async function loadTasks() {

  const data =
    await api("tasks");

  tasks =
    data.tasks || [];

  renderTasks();
}


function getFilteredTasks() {

  let result =
    [...tasks];

  if (
    taskFilter === "completed"
  ) {

    result =
      result.filter(
        task => task.completed
      );
  }

  if (
    taskFilter === "pending"
  ) {

    result =
      result.filter(
        task => !task.completed
      );
  }

  if (taskSearch) {

    const search =
      taskSearch.toLowerCase();

    result =
      result.filter(task =>
        safeText(
          task.title
        )
          .toLowerCase()
          .includes(search)
      );
  }

  return result;
}


function renderTasks() {

  const list =
    $("taskList");

  if (!list) return;

  const filtered =
    getFilteredTasks();

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  if ($("taskCounter")) {

    $("taskCounter").textContent =
      `${completed} / ${tasks.length}`;
  }

  if (filtered.length === 0) {

    list.innerHTML = `
      <div style="
        padding:35px;
        text-align:center;
        color:var(--muted);
      ">
        <div style="
          font-size:45px;
          margin-bottom:10px;
        ">
          🎯
        </div>

        ${
          tasks.length === 0
            ? "Henüz görev yok. İlk görevini ekle!"
            : "Bu filtreye uygun görev bulunamadı."
        }
      </div>
    `;

    return;
  }

  list.innerHTML =
    filtered.map(task => `

      <div class="
        task
        ${task.completed ? "completed" : ""}
      ">

        <button
          class="checkbox"
          onclick="toggleTask(${task.id})"
          aria-label="Görevi tamamla"
        >
          ${
            task.completed
              ? "✓"
              : ""
          }
        </button>

        <div class="task-content">

          <div class="task-name">
            ${escapeHTML(task.title)}
          </div>

          ${
            task.completed
              ? `
                <small style="
                  color:#20a878;
                ">
                  Tamamlandı 🎉
                </small>
              `
              : `
                <small style="
                  color:var(--muted);
                ">
                  Devam ediyor
                </small>
              `
          }

        </div>

        <div class="task-xp">
          ⭐ +${Number(task.xp) || 50} XP
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


function setTaskFilter(filter) {

  taskFilter =
    filter;

  document
    .querySelectorAll(
      ".task-filter"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === filter
      );
    });

  renderTasks();
}


function searchTasks(value) {

  taskSearch =
    value.trim();

  renderTasks();
}


async function addTask() {

  const input =
    $("newTask");

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {

    toast(
      "Görev adı yazmalısın.",
      "error"
    );

    return;
  }

  try {

    await api("tasks", {
      method: "POST",
      body: {
        title
      }
    });

    input.value = "";

    await loadTasks();

    await refreshUser();

    toast(
      "Görev eklendi! 🎯",
      "success"
    );

    if (
      state.currentPage ===
      "home"
    ) {
      renderHome();
    }

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


async function toggleTask(id) {

  try {

    const data =
      await api("tasks", {
        method: "PATCH",
        body: {
          id
        }
      });

    await loadTasks();

    await refreshUser();

    if (data.completed) {

      showCelebration(
        data.earned_xp || 50
      );

      await refreshCoach();

    } else {

      toast(
        "Görev tekrar açıldı."
      );
    }

    renderPage(
      state.currentPage
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
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

  try {

    await api("tasks", {
      method: "DELETE",
      body: {
        id
      }
    });

    await loadTasks();

    await refreshUser();

    renderPage(
      state.currentPage
    );

    toast(
      "Görev silindi 🗑️",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   TASK PAGE
   ========================================================= */

function renderTasksPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <div>
        <h2>✅ Görevlerim</h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Tamamladığın görevlerden XP kazan.
        </p>
      </div>

      <strong>
        ${tasks.length} görev
      </strong>

    </div>

    <div style="
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin:20px 0;
    ">

      <input
        id="taskSearch"
        placeholder="🔎 Görev ara..."
        oninput="searchTasks(this.value)"
        style="
          flex:1;
          min-width:220px;
          padding:13px;
          border:1px solid var(--border);
          border-radius:12px;
          background:var(--white);
          color:var(--text);
        "
      >

      <button
        class="task-filter active"
        data-filter="all"
        onclick="setTaskFilter('all')"
      >
        Tümü
      </button>

      <button
        class="task-filter"
        data-filter="pending"
        onclick="setTaskFilter('pending')"
      >
        Bekleyen
      </button>

      <button
        class="task-filter"
        data-filter="completed"
        onclick="setTaskFilter('completed')"
      >
        Tamamlanan
      </button>

    </div>

    <div id="pageTaskList"></div>

    <div class="add-task"
      style="
        margin-top:20px;
      "
    >

      <input
        id="pageNewTask"
        placeholder="Yeni görev ekle..."
        maxlength="150"
      >

      <button
        class="primary-btn"
        onclick="addTaskFromPage()"
      >
        + Görev Ekle
      </button>

    </div>
  `;

  renderPageTasks();
}


function renderPageTasks() {

  const list =
    $("pageTaskList");

  if (!list) return;

  const filtered =
    getFilteredTasks();

  if (filtered.length === 0) {

    list.innerHTML = `
      <div style="
        text-align:center;
        padding:35px;
        color:var(--muted);
      ">
        🎯 Görev bulunamadı.
      </div>
    `;

    return;
  }

  list.innerHTML =
    filtered.map(task => `

      <div class="
        task
        ${task.completed ? "completed" : ""}
      ">

        <button
          class="checkbox"
          onclick="toggleTask(${task.id})"
        >
          ${
            task.completed
              ? "✓"
              : ""
          }
        </button>

        <div class="task-content">

          <div class="task-name">
            ${escapeHTML(task.title)}
          </div>

          <small style="
            color:var(--muted);
          ">
            ${
              task.completed
                ? "Tamamlandı"
                : "Henüz tamamlanmadı"
            }
          </small>

        </div>

        <div class="task-xp">
          ⭐ ${Number(task.xp) || 50} XP
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


async function addTaskFromPage() {

  const input =
    $("pageNewTask");

  if (
    !input ||
    !input.value.trim()
  ) {

    toast(
      "Görev adı gerekli.",
      "error"
    );

    return;
  }

  try {

    await api("tasks", {
      method: "POST",
      body: {
        title:
          input.value.trim()
      }
    });

    input.value = "";

    await loadTasks();

    renderTasksPage();

    toast(
      "Görev eklendi! 🎯",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   SUBJECTS
   ========================================================= */

async function loadSubjects() {

  const data =
    await api("subjects");

  subjects =
    data.subjects || [];
}


function renderSubjectsPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <div>
        <h2>📚 Derslerim</h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Tüm derslerini buradan yönet.
        </p>
      </div>

      <button
        class="primary-btn"
        onclick="openSubjectModal()"
      >
        + Ders Ekle
      </button>

    </div>

    <div class="market-grid">

      ${
        subjects.length

          ? subjects.map(
              subject => `

                <div
                  class="shop-item"
                  style="
                    position:relative;
                    overflow:hidden;
                  "
                >

                  <div style="
                    font-size:50px;
                    margin-bottom:12px;
                  ">
                    📚
                  </div>

                  <h3>
                    ${escapeHTML(
                      subject.name
                    )}
                  </h3>

                  <p>
                    Ders programındaki dersin
                  </p>

                  <div style="
                    margin:15px 0;
                    padding:8px 12px;
                    border-radius:20px;
                    background:
                      ${
                        subject.color ||
                        "#6c63ff"
                      };
                    color:white;
                    display:inline-block;
                  ">
                    Ders
                  </div>

                  <br>

                  <button
                    class="danger-btn"
                    onclick="deleteSubject(${subject.id})"
                  >
                    🗑️ Sil
                  </button>

                </div>

              `
            ).join("")

          : `

            <div style="
              grid-column:1/-1;
              text-align:center;
              padding:50px 20px;
              color:var(--muted);
            ">

              <div style="
                font-size:60px;
              ">
                📚
              </div>

              <h3 style="
                margin-top:10px;
                color:var(--text);
              ">
                Henüz ders yok
              </h3>

              <p style="
                margin-top:8px;
              ">
                İlk dersini ekleyerek başla.
              </p>

            </div>

          `
      }

    </div>
  `;
}


function openSubjectModal() {

  openModal(
    "📚 Yeni Ders",
    `

      <div class="form-group">

        <label>Ders adı</label>

        <input
          id="subjectName"
          placeholder="Matematik"
          style="
            width:100%;
            padding:13px;
            border:1px solid var(--border);
            border-radius:11px;
          "
        >

      </div>

      <button
        class="primary-btn"
        onclick="addSubject()"
      >
        Dersi Ekle
      </button>

    `
  );
}


async function addSubject() {

  const input =
    $("subjectName");

  if (
    !input ||
    !input.value.trim()
  ) {

    toast(
      "Ders adı gerekli.",
      "error"
    );

    return;
  }

  try {

    await api("subjects", {
      method: "POST",
      body: {
        name:
          input.value.trim(),
        color:
          "#6c63ff"
      }
    });

    closeModal();

    await loadSubjects();

    renderSubjectsPage();

    toast(
      "Ders eklendi 📚",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


async function deleteSubject(id) {

  if (
    !confirm(
      "Bu dersi silmek istiyor musun?"
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

    await loadSubjects();

    renderSubjectsPage();

    toast(
      "Ders silindi.",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   EXAMS
   ========================================================= */

async function loadExams() {

  const data =
    await api("exams");

  exams =
    data.exams || [];
}


function getDaysUntil(dateValue) {

  if (!dateValue) return null;

  const target =
    new Date(dateValue);

  if (
    Number.isNaN(
      target.getTime()
    )
  ) {
    return null;
  }

  const now =
    new Date();

  const difference =
    target.getTime() -
    now.getTime();

  return Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );
}


function renderExamsPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const sortedExams =
    [...exams].sort(
      (a, b) =>
        new Date(a.exam_date) -
        new Date(b.exam_date)
    );

  dynamic.innerHTML = `

    <div class="card-title">

      <div>
        <h2>📅 Sınavlarım</h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Yaklaşan sınavlarını kaçırma.
        </p>
      </div>

      <button
        class="primary-btn"
        onclick="openExamModal()"
      >
        + Sınav Ekle
      </button>

    </div>

    ${
      sortedExams.length

        ? sortedExams.map(exam => {

            const days =
              getDaysUntil(
                exam.exam_date
              );

            let badge =
              "📅";

            let badgeText =
              "Planlandı";

            if (
              days !== null &&
              days < 0
            ) {

              badge = "⏰";
              badgeText = "Geçti";

            } else if (
              days === 0
            ) {

              badge = "🚨";
              badgeText = "Bugün";

            } else if (
              days !== null &&
              days <= 3
            ) {

              badge = "🔥";
              badgeText =
                `${days} gün kaldı`;

            } else if (
              days !== null
            ) {

              badge = "📅";
              badgeText =
                `${days} gün kaldı`;
            }

            return `

              <div
                class="task"
                style="
                  align-items:center;
                "
              >

                <div style="
                  font-size:35px;
                  width:50px;
                ">
                  ${badge}
                </div>

                <div class="task-content">

                  <div class="task-name">
                    ${escapeHTML(
                      exam.title
                    )}
                  </div>

                  <small style="
                    color:var(--muted);
                  ">
                    ${escapeHTML(
                      exam.subject_name ||
                      "Ders yok"
                    )}
                    •
                    ${formatDate(
                      exam.exam_date
                    )}
                  </small>

                  ${
                    exam.topic
                      ? `
                        <div style="
                          color:var(--muted);
                          margin-top:5px;
                        ">
                          📖 Konu:
                          ${escapeHTML(
                            exam.topic
                          )}
                        </div>
                      `
                      : ""
                  }

                </div>

                <div style="
                  font-weight:700;
                  margin-right:10px;
                ">
                  ${badgeText}
                </div>

                <button
                  class="danger-btn"
                  onclick="deleteExam(${exam.id})"
                >
                  Sil
                </button>

              </div>

            `;
          }).join("")

        : `

          <div style="
            text-align:center;
            padding:50px 20px;
            color:var(--muted);
          ">

            <div style="
              font-size:65px;
            ">
              📅
            </div>

            <h3 style="
              color:var(--text);
              margin-top:10px;
            ">
              Henüz sınav yok
            </h3>

            <p style="
              margin-top:8px;
            ">
              Sınavlarını buradan planlayabilirsin.
            </p>

          </div>

        `
    }
  `;
}


function openExamModal() {

  const subjectOptions =
    subjects.map(
      subject => `
        <option
          value="${subject.id}"
        >
          ${escapeHTML(
            subject.name
          )}
        </option>
      `
    ).join("");

  openModal(
    "📅 Yeni Sınav",
    `

      <div class="form-group">

        <label>Sınav adı</label>

        <input
          id="examTitle"
          placeholder="Matematik Yazılısı"
        >

      </div>

      <div class="form-group">

        <label>Tarih</label>

        <input
          id="examDate"
          type="datetime-local"
        >

      </div>

      <div class="form-group">

        <label>Ders</label>

        <select
          id="examSubject"
          style="
            width:100%;
            padding:13px;
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

      </div>

      <div class="form-group">

        <label>Konu</label>

        <input
          id="examTopic"
          placeholder="Örneğin: Kesirler"
        >

      </div>

      <button
        class="primary-btn"
        onclick="addExam()"
      >
        Sınavı Ekle
      </button>

    `
  );
}


async function addExam() {

  const title =
    $("examTitle")?.value.trim();

  const exam_date =
    $("examDate")?.value;

  const subject_id =
    $("examSubject")?.value;

  const topic =
    $("examTopic")?.value.trim();

  if (!title || !exam_date) {

    toast(
      "Sınav adı ve tarih gerekli.",
      "error"
    );

    return;
  }

  try {

    await api("exams", {
      method: "POST",
      body: {
        title,
        exam_date,
        subject_id:
          subject_id
            ? Number(subject_id)
            : null,
        topic:
          topic || null
      }
    });

    closeModal();

    await loadExams();

    renderExamsPage();

    toast(
      "Sınav eklendi 📅",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


async function deleteExam(id) {

  if (
    !confirm(
      "Bu sınavı silmek istiyor musun?"
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

    await loadExams();

    renderExamsPage();

    toast(
      "Sınav silindi.",
      "success"
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   FOCUS
   ========================================================= */

function renderFocusPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="focus">

      <div style="
        font-size:55px;
        margin-bottom:5px;
      ">
        ⏱️
      </div>

      <h2>
        Odaklanma Modu
      </h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        25 dakika çalış, sonra mola ver.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTimer(
          timerSeconds
        )}
      </div>

      <div style="
        font-size:18px;
        font-weight:700;
        margin-bottom:15px;
      ">
        ${timerMode}
      </div>

      <div class="focus-buttons">

        <button
          class="primary-btn"
          onclick="startTimer()"
        >
          ▶ Başlat
        </button>

        <button
          class="secondary-btn"
          onclick="pauseTimer()"
        >
          ⏸ Duraklat
        </button>

        <button
          class="secondary-btn"
          onclick="resetTimer()"
        >
          🔄 Sıfırla
        </button>

      </div>

      <div style="
        margin-top:30px;
        padding:20px;
        border-radius:18px;
        background:var(--soft);
      ">

        <strong>
          💡 Odaklanma ipucu
        </strong>

        <p style="
          color:var(--muted);
          margin-top:8px;
        ">
          Telefonunu sessize al ve sadece
          tek bir derse odaklan.
        </p>

      </div>

    </div>
  `;
}


function formatTimer(seconds) {

  const min =
    String(
      Math.floor(
        seconds / 60
      )
    ).padStart(2, "0");

  const sec =
    String(
      seconds % 60
    ).padStart(2, "0");

  return `${min}:${sec}`;
}


function updateTimerUI() {

  const timer =
    $("focusTimer");

  if (timer) {

    timer.textContent =
      formatTimer(
        timerSeconds
      );
  }
}


function startTimer() {

  if (timerRunning) {
    return;
  }

  timerRunning = true;

  timerInterval =
    setInterval(() => {

      timerSeconds--;

      updateTimerUI();

      if (
        timerSeconds <= 0
      ) {

        finishFocus();
      }

    }, 1000);

  toast(
    "Odaklanma başladı! 🔥",
    "success"
  );
}


function pauseTimer() {

  timerRunning = false;

  clearInterval(
    timerInterval
  );

  toast(
    "Odaklanma duraklatıldı."
  );
}


function resetTimer() {

  timerRunning = false;

  clearInterval(
    timerInterval
  );

  timerSeconds =
    25 * 60;

  updateTimerUI();

  toast(
    "Sayaç sıfırlandı."
  );
}


async function finishFocus() {

  clearInterval(
    timerInterval
  );

  timerRunning = false;

  timerSeconds =
    25 * 60;

  updateTimerUI();

  try {

    const data =
      await api("sessions", {
        method: "POST",
        body: {
          duration_minutes: 25
        }
      });

    await refreshUser();

    showCelebration(
      data.earned_xp || 25
    );

    await refreshCoach();

  } catch (error) {

    toast(
      error.message,
      "error"
    );
  }
}


/* =========================================================
   COACH
   ========================================================= */

async function refreshCoach() {

  try {

    const data =
      await api("coach");

    coachData =
      data.coach;

    renderCoachMini();

    if (
      state.currentPage ===
      "coach"
    ) {

      renderCoachPage();
    }

  } catch (error) {

    console.error(error);
  }
}


function renderCoachPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  if (!coachData) {

    dynamic.innerHTML = `

      <div style="
        text-align:center;
        padding:50px;
      ">

        <div style="
          font-size:50px;
        ">
          🤖
        </div>

        Ders Koçu yükleniyor...

      </div>
    `;

    return;
  }

  const c =
    coachData;

  const advice =
    c.advice || [];

  dynamic.innerHTML = `

    <div class="card-title">

      <div>

        <h2>
          🤖
          ${escapeHTML(
            c.greeting ||
            "Ders Koçu"
          )}
        </h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Bugün için sana özel öneriler.
        </p>

      </div>

      <span>
        ${
          c.priority === "urgent"
            ? "🚨 Acil"
            : c.priority === "high"
            ? "⚠️ Öncelikli"
            : "✅ Normal"
        }
      </span>

    </div>

    <div class="stats">

      <div class="stat">
        <span>⭐</span>
        <strong>
          ${Number(c.xp) || 0}
        </strong>
        <small>XP</small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>
          ${Number(c.streak) || 0}
        </strong>
        <small>Günlük seri</small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${Number(c.focus_minutes) || 0}
        </strong>
        <small>Odak dakika</small>
      </div>

    </div>

    <h3 style="
      margin:28px 0 14px;
    ">
      🎯 Bugünkü öneriler
    </h3>

    ${
      advice.length

        ? advice.map(item => `

            <div class="task">

              <div style="
                font-size:32px;
              ">
                ${item.icon || "🤖"}
              </div>

              <div class="task-content">

                <strong>
                  ${escapeHTML(
                    item.title
                  )}
                </strong>

                <div style="
                  color:var(--muted);
                  margin-top:5px;
                  line-height:1.5;
                ">
                  ${escapeHTML(
                    item.text
                  )}
                </div>

              </div>

            </div>

          `).join("")

        : `

          <div class="card">

            <h3>
              🌟 Harika!
            </h3>

            <p style="
              color:var(--muted);
              margin-top:8px;
            ">
              Bugün için özel bir öneri yok.
              Çalışmaya devam et!
            </p>

          </div>

        `
    }

    <div class="card" style="
      margin-top:20px;
      background:#f0efff;
    ">

      <h3>
        🎯 Günlük hedef
      </h3>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">
        ${
          Number(
            c.recommended?.tasks
          ) || 0
        }
        görev +

        ${
          Number(
            c.recommended?.minutes
          ) || 0
        }
        dakika odaklanma
      </p>

      <strong style="
        display:block;
        margin-top:10px;
        color:#6257df;
      ">
        ⭐ +
        ${
          Number(
            c.recommended?.xp
          ) || 0
        }
        XP
      </strong>

    </div>
  `;
}


/* =========================================================
   PET
   ========================================================= */

function renderPetPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const xp =
    Number(
      currentUser?.xp
    ) || 0;

  const level =
    calculateLevel(xp);

  state.pet.level =
    level;

  const progress =
    (xp % 500) / 5;

  dynamic.innerHTML = `

    <div class="pet-card">

      <div style="
        font-size:18px;
        color:var(--muted);
      ">
        🐾 Benim Evcil Hayvanım
      </div>

      <div
        class="pet-display"
        style="
          height:250px;
          font-size:130px;
          display:grid;
          place-items:center;
        "
      >
        ${state.pet.emoji}
      </div>

      <div class="pet-name">
        ${escapeHTML(
          state.pet.name
        )}
      </div>

      <div class="pet-level">
        Seviye ${level}
      </div>

      <div
        class="progress"
        style="
          background:#eee;
          margin-top:20px;
        "
      >

        <span
          style="
            width:${progress}%;
            background:var(--primary);
          "
        ></span>

      </div>

      <p style="
        color:var(--muted);
        margin-top:10px;
      ">
        ${
          500 - (xp % 500)
        }
        XP sonra Panda'nın seviyesi artacak! 🚀
      </p>

      <button
        class="primary-btn"
        style="margin-top:15px"
        onclick="changePetName()"
      >
        ✏️ İsim Değiştir
      </button>

    </div>
  `;
}


function changePetName() {

  openModal(
    "🐼 Panda'nın İsmi",
    `

      <div class="form-group">

        <label>Yeni isim</label>

        <input
          id="newPetName"
          value="${escapeHTML(
            state.pet.name
          )}"
          maxlength="30"
        >

      </div>

      <button
        class="primary-btn"
        onclick="savePetName()"
      >
        Kaydet
      </button>

    `
  );
}


function savePetName() {

  const input =
    $("newPetName");

  if (
    !input ||
    !input.value.trim()
  ) {
    return;
  }

  state.pet.name =
    input.value
      .trim()
      .slice(0, 30);

  localStorage.setItem(
    "ders_takip_pet_name",
    state.pet.name
  );

  closeModal();

  renderPetPage();

  updatePetHome();

  toast(
    "Panda'nın adı değişti 🐼",
    "success"
  );
}


function loadPet() {

  state.pet.name =
    localStorage.getItem(
      "ders_takip_pet_name"
    ) ||
    "Panda";

  updatePetHome();
}


function updatePetHome() {

  if ($("petName")) {

    $("petName").textContent =
      state.pet.name;
  }

  if ($("petLevel")) {

    state.pet.level =
      calculateLevel(
        Number(
          currentUser?.xp
        ) || 0
      );

    $("petLevel").textContent =
      `Seviye ${state.pet.level}`;
  }
}


/* =========================================================
   MARKET
   ========================================================= */

const marketItems = [

  {
    id: "theme",
    icon: "🎨",
    name: "Özel Tema",
    description:
      "Profiline özel görünüm.",
    price: 100
  },

  {
    id: "hat",
    icon: "🎩",
    name: "Şık Şapka",
    description:
      "Evcil hayvanına tak.",
    price: 150
  },

  {
    id: "crown",
    icon: "👑",
    name: "Kraliyet Tacı",
    description:
      "Seviyeni göster.",
    price: 300
  },

  {
    id: "rocket",
    icon: "🚀",
    name: "Hızlı Başlangıç",
    description:
      "Motivasyon ödülü.",
    price: 500
  },

  {
    id: "star",
    icon: "🌟",
    name: "Yıldız Paketi",
    description:
      "Profilinde yıldız efekti.",
    price: 750
  },

  {
    id: "diamond",
    icon: "💎",
    name: "Elmas Ödül",
    description:
      "Özel başarı simgesi.",
    price: 1000
  }
];


function renderMarketPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <div>

        <h2>
          🛒 Ödül Marketi
        </h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Çalışarak kazandığın coinleri harca.
        </p>

      </div>

      <strong style="
        font-size:20px;
      ">
        🪙 ${state.coins}
      </strong>

    </div>

    <div class="market-grid">

      ${marketItems.map(
        item => `

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
              class="primary-btn"
              onclick="buyItem('${item.id}')"
            >
              Satın Al
            </button>

          </div>

        `
      ).join("")}

    </div>

    <div style="
      margin-top:25px;
      padding:18px;
      border-radius:16px;
      background:#fff8dc;
      color:#795f00;
    ">

      💡
      Coinlerini görevleri tamamlayarak
      ve günlük ödülleri alarak biriktirebilirsin.

    </div>

  `;
}


function buyItem(id) {

  const item =
    marketItems.find(
      x => x.id === id
    );

  if (!item) return;

  if (
    state.coins <
    item.price
  ) {

    toast(
      `Yeterli coin yok. ${item.price} Coin gerekiyor.`,
      "error"
    );

    return;
  }

  state.coins -=
    item.price;

  localStorage.setItem(
    "ders_takip_coins",
    state.coins
  );

  updateUserUI();

  renderMarketPage();

  toast(
    `${item.name} satın alındı! 🎉`,
    "success"
  );
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function renderAchievementsPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const xp =
    Number(
      currentUser?.xp
    ) || 0;

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const definitions = [

    {
      icon: "🌱",
      title: "İlk Adım",
      text: "İlk görevini tamamla.",
      unlocked:
        completed >= 1
    },

    {
      icon: "🔥",
      title: "Çalışkan",
      text: "5 görev tamamla.",
      unlocked:
        completed >= 5
    },

    {
      icon: "⭐",
      title: "XP Avcısı",
      text: "500 XP kazan.",
      unlocked:
        xp >= 500
    },

    {
      icon: "🏆",
      title: "Usta Öğrenci",
      text: "1000 XP kazan.",
      unlocked:
        xp >= 1000
    },

    {
      icon: "📚",
      title: "Ders Sever",
      text: "3 ders ekle.",
      unlocked:
        subjects.length >= 3
    },

    {
      icon: "📅",
      title: "Planlı Öğrenci",
      text: "3 sınav ekle.",
      unlocked:
        exams.length >= 3
    },

    {
      icon: "🚀",
      title: "Hızlı Başlangıç",
      text: "10 görev tamamla.",
      unlocked:
        completed >= 10
    },

    {
      icon: "💎",
      title: "XP Ustası",
      text: "2500 XP kazan.",
      unlocked:
        xp >= 2500
    },

    {
      icon: "👑",
      title: "Efsane Öğrenci",
      text: "5000 XP kazan.",
      unlocked:
        xp >= 5000
    }

  ];

  const unlockedCount =
    definitions.filter(
      x => x.unlocked
    ).length;

  dynamic.innerHTML = `

    <div class="card-title">

      <div>

        <h2>
          🏆 Başarılar
        </h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          ${unlockedCount}
          / ${definitions.length}
          rozet açıldı.
        </p>

      </div>

    </div>

    <div class="badges">

      ${definitions.map(
        badge => `

          <div class="
            badge
            ${
              badge.unlocked
                ? ""
                : "locked"
            }
          ">

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <strong>
              ${badge.title}
            </strong>

            <small style="
              display:block;
              margin-top:6px;
            ">
              ${badge.text}
            </small>

            <div style="
              margin-top:10px;
            ">
              ${
                badge.unlocked
                  ? "✅ Açıldı"
                  : "🔒 Kilitli"
              }
            </div>

          </div>

        `
      ).join("")}

    </div>

  `;
}


/* =========================================================
   STATS
   ========================================================= */

async function renderStatsPage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div style="
      text-align:center;
      padding:35px;
    ">
      📊 İstatistikler yükleniyor...
    </div>

  `;

  try {

    const data =
      await api("stats");

    const s =
      data.stats || {};

    const totalTasks =
      Number(
        s.tasks?.total
      ) || 0;

    const completedTasks =
      Number(
        s.tasks?.completed
      ) || 0;

    const taskPercent =
      totalTasks > 0
        ? Math.round(
            (
              completedTasks /
              totalTasks
            ) * 100
          )
        : 0;

    const xp =
      Number(
        currentUser?.xp
      ) || 0;

    const level =
      calculateLevel(xp);

    dynamic.innerHTML = `

      <div class="card-title">

        <div>

          <h2>
            📊 İstatistikler
          </h2>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            Çalışma performansının özeti.
          </p>

        </div>

      </div>

      <div class="stats">

        <div class="stat">
          <span>🎯</span>
          <strong>
            ${totalTasks}
          </strong>
          <small>Toplam görev</small>
        </div>

        <div class="stat">
          <span>✅</span>
          <strong>
            ${completedTasks}
          </strong>
          <small>Tamamlanan</small>
        </div>

        <div class="stat">
          <span>📈</span>
          <strong>
            ${taskPercent}%
          </strong>
          <small>Başarı oranı</small>
        </div>

        <div class="stat">
          <span>📚</span>
          <strong>
            ${Number(s.subjects) || 0}
          </strong>
          <small>Ders</small>
        </div>

        <div class="stat">
          <span>📅</span>
          <strong>
            ${Number(s.exams) || 0}
          </strong>
          <small>Sınav</small>
        </div>

        <div class="stat">
          <span>⏱️</span>
          <strong>
            ${Number(
              s.sessions?.minutes
            ) || 0}
          </strong>
          <small>Odak dakika</small>
        </div>

        <div class="stat">
          <span>⭐</span>
          <strong>
            ${xp}
          </strong>
          <small>Toplam XP</small>
        </div>

        <div class="stat">
          <span>🏆</span>
          <strong>
            ${level}
          </strong>
          <small>Seviye</small>
        </div>

      </div>

      <div class="card" style="
        margin-top:25px;
        background:#f0efff;
      ">

        <h3>
          🔥 Genel durum
        </h3>

        <p style="
          margin-top:8px;
          color:var(--muted);
          line-height:1.6;
        ">
          ${
            taskPercent >= 80

              ? "Muhteşem gidiyorsun! 🚀 Görevlerinin büyük bölümünü tamamlıyorsun."

              : taskPercent >= 50

              ? "Gayet iyi! 💪 Biraz daha devam edersen çok daha iyi olacak."

              : taskPercent > 0

              ? "İyi bir başlangıç yaptın! 🎯 Bugün birkaç görev daha tamamlamayı dene."

              : "Bugün birkaç görev tamamlayarak çalışma serüvenine başlayabilirsin. 🌱"
          }
        </p>

      </div>

    `;

  } catch (error) {

    dynamic.innerHTML = `

      <div style="
        color:#ff5b6e;
        padding:30px;
      ">
        ${escapeHTML(
          error.message
        )}
      </div>

    `;
  }
}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfilePage() {

  hideHomeSections();

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const name =
    currentUser?.name ||
    "Öğrenci";

  const email =
    currentUser?.email ||
    "";

  const xp =
    Number(
      currentUser?.xp
    ) || 0;

  const streak =
    Number(
      currentUser?.streak
    ) || 0;

  const level =
    calculateLevel(xp);

  dynamic.innerHTML = `

    <div
      style="
        text-align:center;
        padding:15px 0 30px;
      "
    >

      <div style="
        width:100px;
        height:100px;
        border-radius:50%;
        background:#e7e4ff;
        display:grid;
        place-items:center;
        font-size:50px;
        margin:0 auto 15px;
      ">
        🎓
      </div>

      <h2>
        ${escapeHTML(name)}
      </h2>

      <p style="
        color:var(--muted);
        margin-top:5px;
      ">
        ${escapeHTML(email)}
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
        <strong>${streak}</strong>
        <small>Seri</small>
      </div>

      <div class="stat">
        <span>🪙</span>
        <strong>${state.coins}</strong>
        <small>Coin</small>
      </div>

    </div>

    <div
      class="card"
      style="
        margin-top:25px;
      "
    >

      <h3>
        ⚙️ Hesap Ayarları
      </h3>

      <div style="
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top:15px;
      ">

        <button
          class="secondary-btn"
          onclick="toggleDarkMode()"
        >
          ${
            state.darkMode
              ? "☀️ Açık Tema"
              : "🌙 Karanlık Tema"
          }
        </button>

        <button
          class="secondary-btn"
          onclick="navigate('pet')"
        >
          🐼 Panda'm
        </button>

        <button
          class="secondary-btn"
          onclick="navigate('achievements')"
        >
          🏆 Rozetlerim
        </button>

      </div>

    </div>

    <div
      class="card"
      style="
        margin-top:15px;
      "
    >

      <h3>
        🎁 Günlük Ödül
      </h3>

      <p style="
        color:var(--muted);
        margin-top:6px;
      ">
        Her gün giriş yap ve ödülünü al.
      </p>

      <button
        id="profileRewardButton"
        class="primary-btn"
        style="
          margin-top:12px;
        "
        onclick="claimDailyReward()"
        ${
          state.dailyRewardClaimed
            ? "disabled"
            : ""
        }
      >
        ${
          state.dailyRewardClaimed
            ? "✅ Bugün Alındı"
            : "🎁 +25 Coin Al"
        }
      </button>

    </div>

    <div style="
      margin-top:20px;
    ">

      <button
        class="danger-btn"
        onclick="logout()"
      >
        🚪 Çıkış Yap
      </button>

    </div>

  `;
}


/* =========================================================
   DAILY REWARD
   ========================================================= */

function loadDailyReward() {

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const saved =
    localStorage.getItem(
      "ders_takip_daily_reward"
    );

  state.dailyRewardClaimed =
    saved === today;

  updateDailyRewardUI();
}


function updateDailyRewardUI() {

  const button =
    $("dailyRewardButton");

  const text =
    $("dailyRewardText");

  if (button && text) {

    if (
      state.dailyRewardClaimed
    ) {

      button.disabled = true;

      button.textContent =
        "✅ Bugün Alındı";

      text.textContent =
        "Bugünkü ödülünü zaten aldın. Yarın tekrar gel! 🎁";

    } else {

      button.disabled = false;

      button.textContent =
        "Ödülü Al 🎁";

      text.textContent =
        "Bugünün sürpriz ödülünü al!";
    }
  }

  const profileButton =
    $("profileRewardButton");

  if (profileButton) {

    profileButton.disabled =
      state.dailyRewardClaimed;

    profileButton.textContent =
      state.dailyRewardClaimed
        ? "✅ Bugün Alındı"
        : "🎁 +25 Coin Al";
  }
}


function claimDailyReward() {

  if (
    state.dailyRewardClaimed
  ) {

    toast(
      "Bugünkü ödülü zaten aldın."
    );

    return;
  }

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const reward =
    25;

  state.coins +=
    reward;

  state.dailyRewardClaimed =
    true;

  localStorage.setItem(
    "ders_takip_daily_reward",
    today
  );

  localStorage.setItem(
    "ders_takip_coins",
    state.coins
  );

  updateDailyRewardUI();

  updateUserUI();

  showCelebration(0);

  toast(
    `🎁 +${reward} Coin kazandın!`,
    "success"
  );
}


/* =========================================================
   REFRESH USER
   ========================================================= */

async function refreshUser() {

  try {

    const data =
      await api("me");

    currentUser =
      data.user;

    updateUserUI();

    updatePetHome();

    const coins =
      localStorage.getItem(
        "ders_takip_coins"
      );

    if (coins !== null) {

      state.coins =
        Number(coins) || 0;
    }

  } catch (error) {

    console.error(error);
  }
}


/* =========================================================
   MODAL
   ========================================================= */

function openModal(
  title,
  content
) {

  if (!$("modal")) {
    return;
  }

  if ($("modalTitle")) {
    $("modalTitle").textContent =
      title;
  }

  if ($("modalContent")) {
    $("modalContent").innerHTML =
      content;
  }

  $("modal").classList.add(
    "show"
  );
}


function closeModal() {

  if (!$("modal")) return;

  $("modal").classList.remove(
    "show"
  );
}


/* =========================================================
   CELEBRATION
   ========================================================= */

function showCelebration(xp) {

  const celebration =
    $("celebration");

  const text =
    $("celebrationText");

  if (!celebration) return;

  if (text) {

    text.textContent =
      xp > 0
        ? `⭐ +${xp} XP`
        : "🎁 Ödül!";
  }

  celebration.style.display =
    "flex";

  setTimeout(() => {

    celebration.style.display =
      "none";

  }, 1800);
}


/* =========================================================
   DARK MODE
   ========================================================= */

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  state.darkMode =
    document.body.classList.contains(
      "dark"
    );

  localStorage.setItem(
    "ders_takip_dark",
    state.darkMode
      ? "1"
      : "0"
  );

  if (
    state.currentPage ===
    "profile"
  ) {
    renderProfilePage();
  }
}


function loadDarkMode() {

  const dark =
    localStorage.getItem(
      "ders_takip_dark"
    );

  if (dark === "1") {

    document.body.classList.add(
      "dark"
    );

    state.darkMode =
      true;
  }
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {

  const drawer =
    $("mobileDrawer");

  if (!drawer) return;

  drawer.classList.toggle(
    "open"
  );
}


function closeMobileMenu() {

  const drawer =
    $("mobileDrawer");

  if (!drawer) return;

  drawer.classList.remove(
    "open"
  );
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


/* =========================================================
   DATE
   ========================================================= */

function formatDate(value) {

  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return safeText(value);
  }

  return date.toLocaleString(
    "tr-TR",
    {
      dateStyle:
        "medium",

      timeStyle:
        "short"
    }
  );
}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    // ESC = modal kapat
    if (
      event.key === "Escape"
    ) {

      closeModal();
      closeMobileMenu();
    }

    // Ctrl + K = görev arama
    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {

      const input =
        $("taskSearch");

      if (input) {

        event.preventDefault();

        input.focus();
      }
    }
  }
);


/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const modal =
      $("modal");

    if (
      modal &&
      event.target === modal
    ) {

      closeModal();
    }
  }
);


/* =========================================================
   INIT
   ========================================================= */

async function init() {

  loadDarkMode();

  loadPet();

  loadDailyReward();

  try {

    const data =
      await api("me");

    currentUser =
      data.user;

    await startApp();

  } catch {

    if ($("app")) {
      $("app").style.display =
        "none";
    }

    if ($("authScreen")) {
      $("authScreen").style.display =
        "flex";
    }

    showLogin();
  }
}


/* =========================================================
   GLOBAL
   ========================================================= */

window.api = api;

window.navigate =
  navigate;

window.navigateMobile =
  navigateMobile;

window.showLogin =
  showLogin;

window.showRegister =
  showRegister;

window.togglePassword =
  togglePassword;

window.login =
  login;

window.register =
  register;

window.logout =
  logout;

window.addTask =
  addTask;

window.addTaskFromPage =
  addTaskFromPage;

window.toggleTask =
  toggleTask;

window.deleteTask =
  deleteTask;

window.setTaskFilter =
  setTaskFilter;

window.searchTasks =
  searchTasks;

window.openSubjectModal =
  openSubjectModal;

window.addSubject =
  addSubject;

window.deleteSubject =
  deleteSubject;

window.openExamModal =
  openExamModal;

window.addExam =
  addExam;

window.deleteExam =
  deleteExam;

window.startTimer =
  startTimer;

window.pauseTimer =
  pauseTimer;

window.resetTimer =
  resetTimer;

window.changePetName =
  changePetName;

window.savePetName =
  savePetName;

window.buyItem =
  buyItem;

window.claimDailyReward =
  claimDailyReward;

window.toggleDarkMode =
  toggleDarkMode;

window.toggleMobileMenu =
  toggleMobileMenu;

window.closeModal =
  closeModal;


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);
