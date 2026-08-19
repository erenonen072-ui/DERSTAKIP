/* =========================================================
   DERS TAKİP 2.0
   APP.JS - TAM SÜRÜM
   API: /api/index.js
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

const state = {
  currentPage: "home",

  darkMode: false,

  coins: 0,

  dailyRewardClaimed: false,

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1
  }
};


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
    throw new Error("Sunucudan geçersiz cevap geldi.");
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
   DOM
   ========================================================= */

const $ = (id) => document.getElementById(id);

function safeText(value) {
  return String(value ?? "");
}


/* =========================================================
   TOAST
   ========================================================= */

function toast(message, type = "info") {

  const container = $("toastContainer");

  if (!container) return;

  const item = document.createElement("div");

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

  if ($("loginForm"))
    $("loginForm").style.display = "block";

  if ($("registerForm"))
    $("registerForm").style.display = "none";

  if ($("loginTab"))
    $("loginTab").classList.add("active");

  if ($("registerTab"))
    $("registerTab").classList.remove("active");

  if ($("authMessage"))
    $("authMessage").textContent = "";
}


function showRegister() {

  if ($("loginForm"))
    $("loginForm").style.display = "none";

  if ($("registerForm"))
    $("registerForm").style.display = "block";

  if ($("loginTab"))
    $("loginTab").classList.remove("active");

  if ($("registerTab"))
    $("registerTab").classList.add("active");

  if ($("authMessage"))
    $("authMessage").textContent = "";
}


function togglePassword(id, button) {

  const input = $(id);

  if (!input) return;

  if (input.type === "password") {

    input.type = "text";

    if (button)
      button.textContent = "🙈";

  } else {

    input.type = "password";

    if (button)
      button.textContent = "👁️";
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

    if (message)
      message.textContent =
        "E-posta ve şifre gerekli.";

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

    if (message)
      message.textContent =
        "Tüm alanları doldurmalısın.";

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

  if ($("app"))
    $("app").style.display = "none";

  if ($("authScreen"))
    $("authScreen").style.display = "flex";

  showLogin();

  toast("Çıkış yapıldı 👋");
}


/* =========================================================
   APP START
   ========================================================= */

async function startApp() {

  if ($("authScreen"))
    $("authScreen").style.display = "none";

  if ($("app"))
    $("app").style.display = "block";

  await loadAllData();

  loadPet();

  loadDailyReward();

  navigate("home");

  updateUserUI();
}


/* =========================================================
   LOAD ALL
   ========================================================= */

async function loadAllData() {

  try {

    const results =
      await Promise.all([

        api("me"),

        api("tasks"),

        api("subjects"),

        api("exams"),

        api("achievements"),

        api("stats"),

        api("coach")

      ]);

    const [
      meData,
      tasksData,
      subjectsData,
      examsData,
      achievementsData,
      statsData,
      coachResult
    ] = results;

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

  } catch (error) {

    console.error(error);

    if (
      error.message.includes("Oturum") ||
      error.message.includes("401")
    ) {

      if ($("app"))
        $("app").style.display = "none";

      if ($("authScreen"))
        $("authScreen").style.display = "flex";

      return;
    }

    toast(error.message, "error");
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
}


/* =========================================================
   XP
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
   SAYFA TEMİZLEME
   ========================================================= */

/*
   EN ÖNEMLİ KISIM

   Her sayfaya geçerken eski ana sayfa
   bölümlerini tamamen gizliyoruz.

   Böylece:
   - Pet her sayfada görünmez
   - Koç her sayfada görünmez
   - Günlük ödül her sayfada görünmez
   - Seri her sayfada görünmez
   - Ana sayfa kartları başka menülere taşmaz
*/

function clearPage() {

  if ($("homeHero"))
    $("homeHero").style.display = "none";

  if ($("tasksSection"))
    $("tasksSection").style.display = "none";

  if ($("dynamicSection")) {

    $("dynamicSection").style.display =
      "none";

    $("dynamicSection").innerHTML = "";
  }

  const homeOnlyIds = [

    "dailyRewardSection",

    "dailyRewardCard",

    "dailyReward",

    "coachMini",

    "coachCard",

    "petHome",

    "petCard",

    "streakCard",

    "statsCards",

    "homeStats",

    "homeTasks",

    "homeCoach",

    "homePet",

    "homeReward",

    "homeStreak"

  ];

  homeOnlyIds.forEach(id => {

    const el = $(id);

    if (el) {

      el.style.display = "none";
    }
  });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function navigate(page, button = null) {

  state.currentPage =
    page;

  closeMobileMenu();

  clearPage();

  document
    .querySelectorAll(".menu button")
    .forEach(item => {

      item.classList.remove("active");
    });

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(item => {

      item.classList.remove("active");
    });

  if (button) {

    button.classList.add("active");

  } else {

    document
      .querySelectorAll(".menu button")
      .forEach(item => {

        const onclick =
          item.getAttribute("onclick") || "";

        if (
          onclick.includes(
            `'${page}'`
          )
        ) {

          item.classList.add("active");
        }
      });

    document
      .querySelectorAll(".mobile-menu-item")
      .forEach(item => {

        const onclick =
          item.getAttribute("onclick") || "";

        if (
          onclick.includes(
            `'${page}'`
          )
        ) {

          item.classList.add("active");
        }
      });
  }

  renderPage(page);
}


function navigateMobile(page) {

  navigate(page);

  closeMobileMenu();
}


/* =========================================================
   PAGE RENDER
   ========================================================= */

function renderPage(page) {

  clearPage();

  updateSectionTitle(page);

  switch (page) {

    case "home":
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
      renderHome();
  }
}


/* =========================================================
   TITLES
   ========================================================= */

function updateSectionTitle(page) {

  const titles = {

    home:
      "Bugün ne yapmak istiyorsun?",

    tasks:
      "Görevlerini planla ve tamamla.",

    subjects:
      "Derslerini düzenle.",

    exams:
      "Sınavlarını önceden planla.",

    focus:
      "Odaklan ve çalış.",

    coach:
      "Bugünkü çalışma planın.",

    pet:
      "Pandanı geliştir.",

    market:
      "Coinlerini kullan.",

    achievements:
      "Kazandığın başarılar.",

    stats:
      "Çalışma performansın.",

    profile:
      "Hesabını yönet."
  };

  if ($("sectionSubtitle")) {

    $("sectionSubtitle").textContent =
      titles[page] ||
      titles.home;
  }
}


/* =========================================================
   HOME
   ========================================================= */

function renderHome() {

  clearPage();

  if ($("homeHero")) {

    $("homeHero").style.display =
      "block";
  }

  if ($("tasksSection")) {

    $("tasksSection").style.display =
      "block";
  }

  if ($("dynamicSection")) {

    $("dynamicSection").style.display =
      "none";
  }

  /*
     ANA SAYFA SADE
  */

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  if ($("taskSummary")) {

    $("taskSummary").textContent =
      total === 0
        ? "Bugün için görev ekle."
        : `${completed}/${total} görev tamamlandı.`;
  }

  renderTasks();

  updateUserUI();
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


function renderTasks() {

  const list =
    $("taskList");

  if (!list) return;

  if (tasks.length === 0) {

    list.innerHTML = `
      <div style="
        padding:30px;
        text-align:center;
        color:var(--muted);
      ">
        Henüz görev yok.
        İlk görevini ekle! 🎯
      </div>
    `;

    if ($("taskCounter")) {

      $("taskCounter").textContent =
        "0 / 0";
    }

    return;
  }

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  if ($("taskCounter")) {

    $("taskCounter").textContent =
      `${completed} / ${tasks.length}`;
  }

  list.innerHTML =
    tasks.map(task => `

      <div class="task ${
        task.completed
          ? "completed"
          : ""
      }">

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

        </div>

        <div class="task-xp">
          ⭐ +${
            Number(task.xp) || 50
          } XP
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
  ) return;

  try {

    await api("tasks", {

      method: "DELETE",

      body: {
        id
      }

    });

    await loadTasks();

    await refreshUser();

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


function renderTasksPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>✅ Görevlerim</h2>

      <span>
        ${tasks.length} görev
      </span>

    </div>

    <div id="allTasksList"></div>

    <div class="add-task">

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

  const list =
    $("allTasksList");

  if (!tasks.length) {

    list.innerHTML = `
      <div style="
        text-align:center;
        padding:40px;
        color:var(--muted);
      ">
        <div style="
          font-size:55px;
          margin-bottom:10px;
        ">
          📝
        </div>

        <h3>Henüz görevin yok</h3>

        <p>
          İlk görevini ekleyerek başlayabilirsin.
        </p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    tasks.map(task => `

      <div class="task ${
        task.completed
          ? "completed"
          : ""
      }">

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

        </div>

        <div class="task-xp">
          ⭐ ${
            Number(task.xp) || 50
          } XP
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

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {

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
        title
      }

    });

    await loadTasks();

    renderTasksPage();

    toast(
      "Görev eklendi 🎯",
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
          ${subjects.length}
          ders kayıtlı
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

                <div class="shop-item">

                  <div
                    class="shop-icon"
                  >
                    📚
                  </div>

                  <h3>
                    ${escapeHTML(
                      subject.name
                    )}
                  </h3>

                  <p>
                    Ders
                  </p>

                  <button
                    class="danger-btn"
                    onclick="deleteSubject(
                      ${subject.id}
                    )"
                  >
                    Sil
                  </button>

                </div>
              `
            ).join("")

          : `

            <div style="
              grid-column:1/-1;
              text-align:center;
              padding:50px;
            ">

              <div style="
                font-size:60px;
              ">
                📚
              </div>

              <h3>
                Henüz ders yok
              </h3>

              <p style="
                color:var(--muted);
                margin-top:8px;
              ">
                Derslerini buradan ekleyebilirsin.
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

        <label>
          Ders adı
        </label>

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
  ) return;

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


function renderExamsPage() {

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

        <h2>📅 Sınav Takvimi</h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          ${exams.length}
          sınav planlandı
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

        ? sortedExams.map(
            exam => {

              const examDate =
                new Date(
                  exam.exam_date
                );

              const diff =
                Math.ceil(
                  (
                    examDate -
                    new Date()
                  ) /
                  86400000
                );

              return `

                <div class="task">

                  <div style="
                    font-size:35px;
                  ">
                    ${
                      diff < 0
                        ? "❌"
                        : diff <= 3
                        ? "🚨"
                        : "📅"
                    }
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

                            Konu:
                            ${escapeHTML(
                              exam.topic
                            )}

                          </div>

                        `
                        : ""
                    }

                  </div>

                  <div style="
                    text-align:center;
                  ">

                    <strong>

                      ${
                        diff < 0
                          ? "Geçti"
                          : diff === 0
                          ? "Bugün"
                          : `${diff} gün`
                      }

                    </strong>

                  </div>

                  <button
                    class="danger-btn"
                    onclick="deleteExam(
                      ${exam.id}
                    )"
                  >
                    Sil
                  </button>

                </div>

              `;
            }
          ).join("")

        : `

          <div style="
            text-align:center;
            padding:50px;
          ">

            <div style="
              font-size:65px;
            ">
              📅
            </div>

            <h3>
              Henüz sınav yok
            </h3>

            <p style="
              color:var(--muted);
              margin-top:8px;
            ">
              Sınavlarını buradan planla.
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

        <label>
          Sınav adı
        </label>

        <input
          id="examTitle"
          placeholder="Matematik Yazılısı"
        >

      </div>

      <div class="form-group">

        <label>
          Tarih
        </label>

        <input
          id="examDate"
          type="datetime-local"
        >

      </div>

      <div class="form-group">

        <label>
          Ders
        </label>

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

        <label>
          Konu
        </label>

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
  ) return;

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

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="focus">

      <div style="
        font-size:60px;
        margin-bottom:10px;
      ">
        🧠
      </div>

      <h2>
        Odaklanma Zamanı
      </h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        25 dakika boyunca sadece dersine odaklan.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTimer(
          timerSeconds
        )}
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
        margin-top:20px;
        color:var(--muted);
      ">
        ${timerMode}
      </div>

      <div class="card" style="
        margin-top:25px;
      ">

        <h3>
          💡 Odaklanma İpucu
        </h3>

        <p style="
          color:var(--muted);
          margin-top:8px;
        ">
          Telefonunu sessize al,
          masanı düzenle ve tek bir hedef belirle.
        </p>

      </div>

    </div>

  `;
}


function formatTimer(seconds) {

  const min =
    String(
      Math.floor(seconds / 60)
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

  if (timerRunning)
    return;

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
          font-size:60px;
        ">
          🤖
        </div>

        <h3>
          Ders Koçu hazırlanıyor...
        </h3>

      </div>

    `;

    return;
  }

  const c =
    coachData;

  dynamic.innerHTML = `

    <div class="card-title">

      <div>

        <h2>
          🤖 Ders Koçu
        </h2>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Sana özel çalışma önerileri
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
        <strong>${c.xp}</strong>
        <small>XP</small>
      </div>

      <div class="stat">
        <span>🔥</span>
        <strong>${c.streak}</strong>
        <small>Günlük seri</small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>${c.focus_minutes}</strong>
        <small>Odak dakika</small>
      </div>

    </div>

    <h3 style="
      margin:25px 0 12px;
    ">
      🎯 Bugünkü öneriler
    </h3>

    ${
      (c.advice || []).map(
        item => `

          <div class="task">

            <div style="
              font-size:28px;
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

        `
      ).join("")
    }

    <div class="card" style="
      margin-top:20px;
    ">

      <h3>
        🎯 Günlük hedef
      </h3>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">

        ${c.recommended.tasks}
        görev +

        ${c.recommended.minutes}
        dakika odaklanma

      </p>

      <strong style="
        display:block;
        margin-top:8px;
        color:#6257df;
      ">

        ⭐ +${c.recommended.xp} XP

      </strong>

    </div>

  `;
}


/* =========================================================
   PET
   ========================================================= */

function renderPetPage() {

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

  const petProgress =
    (xp % 500) / 5;

  dynamic.innerHTML = `

    <div class="pet-card">

      <div style="
        font-size:50px;
      ">
        🐾
      </div>

      <h2>
        Evcil Hayvanım
      </h2>

      <p style="
        color:var(--muted);
      ">
        Çalıştıkça Panda büyür!
      </p>

      <div
        class="pet-display"
        style="
          height:250px;
          font-size:130px;
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
            width:${petProgress}%;
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
        } XP sonra yeni seviyeye ulaşacaksın.
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
    "🐼 Panda'nın Adı",

    `

      <div class="form-group">

        <label>
          Yeni isim
        </label>

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
  ) return;

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
    ) || "Panda";

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
      "Pandana tak.",
    price: 150
  },

  {
    id: "crown",
    icon: "👑",
    name: "Kraliyet Tacı",
    description:
      "Usta öğrenci görünümü.",
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
    id: "fire",
    icon: "🔥",
    name: "Ateş Efekti",
    description:
      "Profiline enerji kat.",
    price: 750
  },

  {
    id: "diamond",
    icon: "💎",
    name: "Elmas Rozet",
    description:
      "Özel başarı rozeti.",
    price: 1000
  }

];


function renderMarketPage() {

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
          XP kazan, Coin biriktir,
          ödüllerini aç.
        </p>

      </div>

      <strong>
        🪙 ${state.coins} Coin
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
              onclick="buyItem(
                '${item.id}'
              )"
            >
              Satın Al
            </button>

          </div>

        `
      ).join("")}

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
      icon: "⏱️",
      title: "Odak Ustası",
      text: "Bir odak oturumu tamamla.",
      unlocked:
        xp >= 25
    },

    {
      icon: "🚀",
      title: "Hızlı Başlangıç",
      text: "100 XP kazan.",
      unlocked:
        xp >= 100
    }

  ];

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
          ${definitions.filter(
            x => x.unlocked
          ).length}
          / ${definitions.length}
          rozet açıldı.
        </p>

      </div>

    </div>

    <div class="badges">

      ${definitions.map(
        badge => `

          <div class="badge ${
            badge.unlocked
              ? ""
              : "locked"
          }">

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
              margin-top:8px;
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

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div style="
      text-align:center;
      padding:40px;
    ">
      📊 İstatistikler yükleniyor...
    </div>

  `;

  try {

    const data =
      await api("stats");

    const s =
      data.stats;

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
            Çalışma performansının özeti
          </p>

        </div>

      </div>

      <div class="stats">

        <div class="stat">

          <span>🎯</span>

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

          <span>📈</span>

          <strong>
            ${taskPercent}%
          </strong>

          <small>
            Başarı oranı
          </small>

        </div>

        <div class="stat">

          <span>📚</span>

          <strong>
            ${s.subjects}
          </strong>

          <small>
            Ders
          </small>

        </div>

        <div class="stat">

          <span>📅</span>

          <strong>
            ${s.exams}
          </strong>

          <small>
            Sınav
          </small>

        </div>

        <div class="stat">

          <span>⏱️</span>

          <strong>
            ${s.sessions.minutes}
          </strong>

          <small>
            Odak dakikası
          </small>

        </div>

      </div>

      <div class="card" style="
        margin-top:20px;
      ">

        <h3>
          📌 Değerlendirme
        </h3>

        <p style="
          margin-top:10px;
          color:var(--muted);
          line-height:1.6;
        ">

          ${
            taskPercent >= 80

              ? "Muhteşem gidiyorsun! Çalışma düzenin gerçekten çok iyi. 🚀"

              : taskPercent >= 50

              ? "Gayet iyi gidiyorsun. Biraz daha düzenli çalışırsan çok daha iyi olacak. 💪"

              : "Küçük adımlarla başla. Bugün birkaç görev tamamlaman bile büyük bir başlangıç. 🎯"
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

    <div style="
      text-align:center;
      padding:15px 0 30px;
    ">

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

        <strong>
          ${xp}
        </strong>

        <small>
          XP
        </small>

      </div>

      <div class="stat">

        <span>🏆</span>

        <strong>
          ${level}
        </strong>

        <small>
          Seviye
        </small>

      </div>

      <div class="stat">

        <span>🔥</span>

        <strong>
          ${streak}
        </strong>

        <small>
          Seri
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

    </div>

    <div class="card" style="
      margin-top:25px;
    ">

      <h3>
        ⚙️ Hesap Ayarları
      </h3>

      <div style="
        display:flex;
        gap:10px;
        margin-top:20px;
        flex-wrap:wrap;
      ">

        <button
          class="secondary-btn"
          onclick="toggleDarkMode()"
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

  if (!button || !text)
    return;

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

  if (!$("modal"))
    return;

  if ($("modalTitle"))
    $("modalTitle").textContent =
      title;

  if ($("modalContent"))
    $("modalContent").innerHTML =
      content;

  $("modal").classList.add(
    "show"
  );
}


function closeModal() {

  if (!$("modal"))
    return;

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

  if (!celebration)
    return;

  if (text) {

    text.textContent =
      `⭐ +${xp} XP`;
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

    state.darkMode = true;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

function toggleMobileMenu() {

  const drawer =
    $("mobileDrawer");

  if (!drawer)
    return;

  drawer.classList.toggle(
    "open"
  );
}


function closeMobileMenu() {

  const drawer =
    $("mobileDrawer");

  if (!drawer)
    return;

  drawer.classList.remove(
    "open"
  );
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")

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

  if (!value)
    return "-";

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
      dateStyle: "medium",
      timeStyle: "short"
    }
  );
}


/* =========================================================
   ESC KEY
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

    if ($("app"))
      $("app").style.display =
        "none";

    if ($("authScreen"))
      $("authScreen").style.display =
        "flex";

    showLogin();
  }
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);
