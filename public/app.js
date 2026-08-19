/* =========================================================
   DERS TAKİP 2.0
   TEK PARÇA APP.JS
   ========================================================= */

"use strict";

/* =========================================================
   API
========================================================= */

const API = "/api";

/* =========================================================
   UYGULAMA STATE
========================================================= */

let state = {
  user: null,

  xp: 0,
  coins: 0,
  level: 1,
  streak: 0,

  tasks: [],

  subjects: [],

  exams: [],

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    happiness: 80,
    energy: 80
  },

  focus: {
    minutes: 25,
    seconds: 0,
    running: false,
    mode: "Çalışma"
  },

  dailyRewardClaimed: false,

  completedDays: 0,

  settings: {
    darkMode: false
  }
};

let currentPage = "home";

let focusInterval = null;


/* =========================================================
   YARDIMCI FONKSİYONLAR
========================================================= */

function $(id) {
  return document.getElementById(id);
}


function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value ?? "";

  return div.innerHTML;
}


function showToast(message) {

  const container = $("toastContainer");

  if (!container) return;

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}


function saveLocalData() {

  try {

    localStorage.setItem(
      "dersTakipState",
      JSON.stringify(state)
    );

  } catch (error) {

    console.error(
      "LocalStorage kayıt hatası:",
      error
    );

  }
}


function loadLocalData() {

  try {

    const saved =
      localStorage.getItem("dersTakipState");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    state = {
      ...state,
      ...parsed,

      pet: {
        ...state.pet,
        ...(parsed.pet || {})
      },

      focus: {
        ...state.focus,
        ...(parsed.focus || {})
      },

      settings: {
        ...state.settings,
        ...(parsed.settings || {})
      }
    };

  } catch (error) {

    console.error(
      "Kayıt okunamadı:",
      error
    );

  }
}


/* =========================================================
   AUTH
========================================================= */

function showLogin() {

  const loginForm = $("loginForm");
  const registerForm = $("registerForm");

  const loginTab = $("loginTab");
  const registerTab = $("registerTab");

  if (loginForm)
    loginForm.style.display = "block";

  if (registerForm)
    registerForm.style.display = "none";

  if (loginTab)
    loginTab.classList.add("active");

  if (registerTab)
    registerTab.classList.remove("active");

  const message = $("authMessage");

  if (message)
    message.textContent = "";
}


function showRegister() {

  const loginForm = $("loginForm");
  const registerForm = $("registerForm");

  const loginTab = $("loginTab");
  const registerTab = $("registerTab");

  if (loginForm)
    loginForm.style.display = "none";

  if (registerForm)
    registerForm.style.display = "block";

  if (loginTab)
    loginTab.classList.remove("active");

  if (registerTab)
    registerTab.classList.add("active");

  const message = $("authMessage");

  if (message)
    message.textContent = "";
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


function setAuthMessage(message, type = "") {

  const element = $("authMessage");

  if (!element) return;

  element.textContent = message;

  if (type === "error") {

    element.style.color = "#e53950";

  } else if (type === "success") {

    element.style.color = "#16a36f";

  } else {

    element.style.color = "#777";

  }
}


/* =========================================================
   LOGIN
========================================================= */

async function login(event) {

  event.preventDefault();

  const email =
    $("loginEmail")?.value.trim();

  const password =
    $("loginPassword")?.value;

  if (!email || !password) {

    setAuthMessage(
      "E-posta ve şifre gerekli.",
      "error"
    );

    return;
  }

  setAuthMessage(
    "Giriş yapılıyor..."
  );

  try {

    const response = await fetch(
      `${API}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Giriş başarısız."
      );

    }

    state.user =
      data.user || data;

    localStorage.setItem(
      "dersTakipUser",
      JSON.stringify(state.user)
    );

    await loadUserData();

    openApp();

    showToast(
      "Hoş geldin! 🚀"
    );

  } catch (error) {

    console.error(error);

    setAuthMessage(
      error.message ||
      "Giriş sırasında hata oluştu.",
      "error"
    );

  }
}


/* =========================================================
   REGISTER
========================================================= */

async function register(event) {

  event.preventDefault();

  const name =
    $("registerName")?.value.trim();

  const email =
    $("registerEmail")?.value.trim();

  const password =
    $("registerPassword")?.value;

  if (!name || !email || !password) {

    setAuthMessage(
      "Tüm alanları doldur.",
      "error"
    );

    return;
  }

  setAuthMessage(
    "Hesap oluşturuluyor..."
  );

  try {

    const response = await fetch(
      `${API}/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Kayıt başarısız."
      );

    }

    setAuthMessage(
      "Hesabın oluşturuldu! 🎉",
      "success"
    );

    setTimeout(() => {

      showLogin();

    }, 800);

  } catch (error) {

    console.error(error);

    setAuthMessage(
      error.message ||
      "Kayıt sırasında hata oluştu.",
      "error"
    );

  }
}


/* =========================================================
   APP BAŞLAT
========================================================= */

function openApp() {

  const auth =
    $("authScreen");

  const app =
    $("app");

  if (auth)
    auth.style.display = "none";

  if (app)
    app.style.display = "block";

  renderUser();

  navigate("home");
}


function logout() {

  localStorage.removeItem(
    "dersTakipUser"
  );

  state.user = null;

  if ($("app"))
    $("app").style.display = "none";

  if ($("authScreen"))
    $("authScreen").style.display = "flex";

  showLogin();

  showToast(
    "Çıkış yapıldı."
  );
}


/* =========================================================
   VERİ YÜKLEME
========================================================= */

async function loadUserData() {

  loadLocalData();

  calculateLevel();

  renderUser();
}


/* =========================================================
   KULLANICI
========================================================= */

function getUserName() {

  return (
    state.user?.name ||
    state.user?.fullName ||
    "Eren"
  );
}


function renderUser() {

  const name =
    getUserName();

  if ($("welcomeText")) {

    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;

  }

  if ($("levelText")) {

    $("levelText").textContent =
      `Seviye ${state.level}`;

  }

  updateStats();
}


/* =========================================================
   SAYFA BAŞLIKLARI
========================================================= */

const PAGE_INFO = {

  home: {
    title: () =>
      `Merhaba, ${getUserName()}! 👋`,

    subtitle:
      "Bugün küçük bir adım, yarın büyük bir başarı."
  },

  tasks: {
    title:
      "Görevlerim ✅",

    subtitle:
      "Bugünkü çalışmalarını burada yönet."
  },

  subjects: {
    title:
      "Derslerim 📚",

    subtitle:
      "Derslerini düzenle ve ilerlemeni takip et."
  },

  exams: {
    title:
      "Sınav Takvimi 📅",

    subtitle:
      "Yaklaşan sınavlarını burada takip et."
  },

  focus: {
    title:
      "Odaklan ⏱️",

    subtitle:
      "Telefonunu bırak, çalışmaya odaklan."
  },

  coach: {
    title:
      "Ders Koçu 🤖",

    subtitle:
      "Bugünkü çalışma önerini al."
  },

  pet: {
    title:
      "Evcil Hayvanım 🐼",

    subtitle:
      "Çalıştıkça evcil hayvanını geliştir."
  },

  market: {
    title:
      "Ödül Marketi 🛒",

    subtitle:
      "Kazandığın coinleri ödüllere dönüştür."
  },

  achievements: {
    title:
      "Rozetler 🏆",

    subtitle:
      "Kazandığın başarıları keşfet."
  },

  stats: {
    title:
      "İstatistikler 📊",

    subtitle:
      "Çalışma performansını incele."
  },

  profile: {
    title:
      "Profilim 👤",

    subtitle:
      "Hesap ve uygulama ayarlarını yönet."
  }

};


/* =========================================================
   SAYFA DEĞİŞTİR
========================================================= */

function navigate(page, button = null) {

  currentPage = page;

  /* Her şeyi temizle */

  clearPage();

  /* Başlık */

  updatePageHeader(page);

  /* Menü */

  updateMenu(page, button);

  /* Sağ paneli sayfaya göre oluştur */

  renderRightColumn(page);

  /* İçeriği oluştur */

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

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMobileMenu();
}


/* =========================================================
   SAYFAYI TEMİZLE
========================================================= */

function clearPage() {

  const hero =
    $("homeHero");

  if (hero)
    hero.style.display = "none";

  const coach =
    document.querySelector(".coach");

  if (coach)
    coach.style.display = "none";

  const tasks =
    $("tasksSection");

  if (tasks)
    tasks.style.display = "none";

  const stats =
    document.querySelector(".stats");

  if (stats)
    stats.style.display = "none";

  const dynamic =
    $("dynamicSection");

  if (dynamic) {

    dynamic.style.display = "none";

    dynamic.innerHTML = "";

  }

  /* Sağ kolonu tamamen temizle */

  const right =
    getRightColumn();

  if (right) {

    right.innerHTML = "";

    right.style.display = "none";

  }
}


/* =========================================================
   SAĞ KOLON
========================================================= */

function getRightColumn() {

  const grid =
    document.querySelector(".grid");

  if (!grid) return null;

  const children =
    [...grid.children];

  if (children.length < 2)
    return null;

  return children[1];
}


/* =========================================================
   SAĞ KOLON SAYFAYA ÖZEL
========================================================= */

function renderRightColumn(page) {

  const right =
    getRightColumn();

  if (!right) return;

  right.innerHTML = "";

  right.style.display = "none";

  /* SADECE ANA SAYFADA */

  if (page === "home") {

    right.style.display = "block";

    right.innerHTML = `

      <div class="card pet-card">

        <h2>🐣 Evcil Hayvanın</h2>

        <div
          class="pet-display"
          id="petDisplay"
        >
          ${state.pet.emoji}
        </div>

        <div
          class="pet-name"
          id="petName"
        >
          ${escapeHTML(state.pet.name)}
        </div>

        <div
          class="pet-level"
          id="petLevel"
        >
          Seviye ${state.pet.level}
        </div>

        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="navigate('pet')"
        >
          Evcil Hayvanım
        </button>

      </div>


      <div
        class="card"
        style="margin-top:20px"
      >

        <h2>🔥 Çalışma Serisi</h2>

        <div
          style="
            font-size:42px;
            font-weight:950;
            color:var(--primary);
            margin:12px 0;
          "
        >
          ${state.streak}
        </div>

        <p style="color:var(--muted)">
          Günlük çalışma serin
        </p>

      </div>


      <div
        class="card"
        style="margin-top:20px"
      >

        <h2>🎁 Günlük Ödül</h2>

        <p
          id="dailyRewardText"
          style="
            color:var(--muted);
            margin:10px 0;
          "
        >
          ${state.dailyRewardClaimed
            ? "Bugünkü ödülünü aldın! 🎉"
            : "Bugünün sürpriz ödülü seni bekliyor."
          }
        </p>

        <button
          id="dailyRewardButton"
          class="primary-btn"
          onclick="claimDailyReward()"
          ${state.dailyRewardClaimed ? "disabled" : ""}
        >
          ${
            state.dailyRewardClaimed
              ? "Ödül Alındı ✓"
              : "Ödülü Al 🎁"
          }
        </button>

      </div>

    `;
  }
}


/* =========================================================
   BAŞLIK
========================================================= */

function updatePageHeader(page) {

  const info =
    PAGE_INFO[page] ||
    PAGE_INFO.home;

  const title =
    typeof info.title === "function"
      ? info.title()
      : info.title;

  if ($("welcomeText"))
    $("welcomeText").textContent = title;

  if ($("sectionSubtitle"))
    $("sectionSubtitle").textContent =
      info.subtitle;
}


/* =========================================================
   MENÜ
========================================================= */

function updateMenu(page, button) {

  document
    .querySelectorAll(".menu button")
    .forEach(btn => {

      btn.classList.remove("active");

    });

  if (button) {

    button.classList.add("active");

  } else {

    const buttons =
      document.querySelectorAll(
        ".menu button"
      );

    buttons.forEach(btn => {

      const onclick =
        btn.getAttribute("onclick") || "";

      if (
        onclick.includes(
          `'${page}'`
        )
      ) {

        btn.classList.add("active");

      }

    });
  }


  document
    .querySelectorAll(
      ".mobile-menu-item"
    )
    .forEach(btn => {

      btn.classList.remove("active");

      const onclick =
        btn.getAttribute("onclick") || "";

      if (
        onclick.includes(
          `'${page}'`
        )
      ) {

        btn.classList.add("active");

      }

    });
}


/* =========================================================
   ANA SAYFA
========================================================= */

function renderHome() {

  const hero =
    $("homeHero");

  if (hero) {

    hero.style.display =
      "block";

  }

  const coach =
    document.querySelector(".coach");

  if (coach) {

    coach.style.display =
      "block";

  }

  const tasks =
    $("tasksSection");

  if (tasks) {

    tasks.style.display =
      "block";

  }

  const stats =
    document.querySelector(".stats");

  if (stats) {

    stats.style.display =
      "grid";

  }

  updateHome();

  renderTasks();

  updateStats();
}


function updateHome() {

  const total =
    state.tasks.length;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          completed / total * 100
        );

  if ($("progressBar")) {

    $("progressBar").style.width =
      `${percentage}%`;

  }

  if ($("taskSummary")) {

    if (!total) {

      $("taskSummary").textContent =
        "Bugün için henüz görev eklemedin.";

    } else {

      $("taskSummary").textContent =
        `${completed}/${total} görev tamamlandı.`;

    }
  }

  if ($("xpText")) {

    $("xpText").textContent =
      `${state.xp} XP`;

  }

  updateStats();

  updateCoach();
}


/* =========================================================
   GÖREVLER
========================================================= */

function renderTasks() {

  const list =
    $("taskList");

  if (!list) return;

  if (!state.tasks.length) {

    list.innerHTML = `

      <div style="
        text-align:center;
        padding:35px 10px;
        color:var(--muted);
      ">

        <div style="
          font-size:45px;
          margin-bottom:10px;
        ">
          📝
        </div>

        <strong>
          Bugün için görev yok.
        </strong>

        <p style="margin-top:6px">
          İlk görevini aşağıdan ekle.
        </p>

      </div>

    `;

  } else {

    list.innerHTML =
      state.tasks
        .map(task => taskHTML(task))
        .join("");

  }

  updateTaskCounter();
}


function taskHTML(task) {

  return `

    <div class="task ${
      task.completed
        ? "completed"
        : ""
    }">

      <button
        class="checkbox"
        onclick="toggleTask('${task.id}')"
      >
        ${
          task.completed
            ? "✓"
            : ""
        }
      </button>

      <div class="task-content">

        <div class="task-name">
          ${escapeHTML(task.name)}
        </div>

      </div>

      <span class="task-xp">
        +${task.xp || 50} XP
      </span>

      <button
        class="delete-task"
        onclick="deleteTask('${task.id}')"
      >
        🗑️
      </button>

    </div>

  `;
}


function updateTaskCounter() {

  if (!$("taskCounter"))
    return;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  $("taskCounter").textContent =
    `${completed} / ${state.tasks.length}`;
}


function addTask() {

  const input =
    $("newTask");

  if (!input) return;

  const name =
    input.value.trim();

  if (!name) {

    showToast(
      "Önce bir görev yaz. 📝"
    );

    return;
  }

  state.tasks.push({

    id:
      Date.now().toString(),

    name,

    completed:
      false,

    xp:
      50

  });

  input.value = "";

  saveLocalData();

  renderTasks();

  updateHome();

  showToast(
    "Görev eklendi! 🎯"
  );
}


function toggleTask(id) {

  const task =
    state.tasks.find(
      item =>
        String(item.id) ===
        String(id)
    );

  if (!task) return;

  task.completed =
    !task.completed;

  if (task.completed) {

    state.xp +=
      task.xp || 50;

    state.coins += 5;

    state.pet.happiness =
      Math.min(
        100,
        state.pet.happiness + 5
      );

    state.pet.energy =
      Math.min(
        100,
        state.pet.energy + 3
      );

    showCelebration(
      `⭐ +${task.xp || 50} XP<br>🪙 +5 Coin`
    );

  } else {

    state.xp =
      Math.max(
        0,
        state.xp -
        (task.xp || 50)
      );

    state.coins =
      Math.max(
        0,
        state.coins - 5
      );

  }

  calculateLevel();

  saveLocalData();

  renderTasks();

  updateHome();

  updateStats();
}


function deleteTask(id) {

  state.tasks =
    state.tasks.filter(
      task =>
        String(task.id) !==
        String(id)
    );

  saveLocalData();

  renderTasks();

  updateHome();

  showToast(
    "Görev silindi. 🗑️"
  );
}


/* =========================================================
   GÖREVLER SAYFASI
========================================================= */

function renderTasksPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>
        📋 Tüm Görevler
      </h2>

      <span>
        ${state.tasks.length} görev
      </span>

    </div>

    <div id="pageTaskList"></div>

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

  renderPageTaskList();
}


function renderPageTaskList() {

  const list =
    $("pageTaskList");

  if (!list) return;

  list.innerHTML =
    state.tasks.length
      ? state.tasks
          .map(task => taskHTML(task))
          .join("")
      : `

        <div style="
          text-align:center;
          padding:40px;
          color:var(--muted);
        ">
          📝 Henüz görev yok.
        </div>

      `;
}


function addTaskFromPage() {

  const input =
    $("pageNewTask");

  if (!input) return;

  const name =
    input.value.trim();

  if (!name) return;

  state.tasks.push({

    id:
      Date.now().toString(),

    name,

    completed:
      false,

    xp:
      50

  });

  input.value = "";

  saveLocalData();

  renderPageTaskList();

  showToast(
    "Görev eklendi! 🎯"
  );
}


/* =========================================================
   DERSLER
========================================================= */

function renderSubjectsPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>
        📚 Derslerim
      </h2>

      <button
        class="primary-btn"
        onclick="addSubject()"
      >
        + Ders Ekle
      </button>

    </div>

    <div
      class="market-grid"
      id="subjectsGrid"
    ></div>

  `;

  renderSubjects();
}


function renderSubjects() {

  const grid =
    $("subjectsGrid");

  if (!grid) return;

  if (!state.subjects.length) {

    grid.innerHTML = `

      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px;
        color:var(--muted);
      ">

        <div style="
          font-size:60px;
        ">
          📚
        </div>

        <h3>
          Henüz ders eklemedin.
        </h3>

        <p style="margin-top:8px">
          + Ders Ekle butonundan başlayabilirsin.
        </p>

      </div>

    `;

    return;
  }

  grid.innerHTML =
    state.subjects
      .map((subject,index) => `

        <div class="shop-item">

          <div class="shop-icon">
            ${subject.emoji || "📘"}
          </div>

          <h3>
            ${escapeHTML(subject.name)}
          </h3>

          <p>
            ${subject.hours || 0}
            saat çalışma
          </p>

          <button
            class="danger-btn"
            onclick="deleteSubject(${index})"
          >
            Sil
          </button>

        </div>

      `)
      .join("");
}


function addSubject() {

  const name =
    prompt(
      "Ders adı:"
    );

  if (!name) return;

  state.subjects.push({

    name,

    emoji:
      getSubjectEmoji(name),

    hours:
      0

  });

  saveLocalData();

  renderSubjects();

  showToast(
    "Ders eklendi! 📚"
  );
}


function getSubjectEmoji(name) {

  const text =
    name.toLowerCase();

  if (text.includes("mat"))
    return "📐";

  if (
    text.includes("türk") ||
    text.includes("edeb")
  )
    return "📖";

  if (text.includes("fen"))
    return "🔬";

  if (
    text.includes("ing") ||
    text.includes("english")
  )
    return "🇬🇧";

  if (text.includes("sosyal"))
    return "🌍";

  if (text.includes("fiz"))
    return "⚡";

  if (text.includes("kim"))
    return "🧪";

  if (text.includes("biy"))
    return "🧬";

  return "📘";
}


function deleteSubject(index) {

  state.subjects.splice(
    index,
    1
  );

  saveLocalData();

  renderSubjects();
}


/* =========================================================
   SINAVLAR
========================================================= */

function renderExamsPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>
        📅 Sınavlarım
      </h2>

      <button
        class="primary-btn"
        onclick="addExam()"
      >
        + Sınav Ekle
      </button>

    </div>

    <div id="examList"></div>

  `;

  renderExams();
}


function renderExams() {

  const list =
    $("examList");

  if (!list) return;

  if (!state.exams.length) {

    list.innerHTML = `

      <div style="
        text-align:center;
        padding:50px;
        color:var(--muted);
      ">

        <div style="
          font-size:60px;
        ">
          📅
        </div>

        <h3>
          Henüz sınav eklenmedi.
        </h3>

        <p style="margin-top:8px">
          Yaklaşan sınavlarını buraya ekle.
        </p>

      </div>

    `;

    return;
  }

  list.innerHTML =
    state.exams
      .map((exam,index) => {

        const days =
          daysUntil(exam.date);

        return `

          <div class="task">

            <div style="
              width:48px;
              height:48px;
              border-radius:14px;
              background:#eeeaff;
              display:grid;
              place-items:center;
              font-size:24px;
              flex-shrink:0;
            ">
              📅
            </div>

            <div class="task-content">

              <strong>
                ${escapeHTML(exam.name)}
              </strong>

              <small style="
                display:block;
                color:var(--muted);
                margin-top:5px;
              ">
                ${escapeHTML(exam.date)}
              </small>

            </div>

            <span
              class="task-xp"
              style="
                background:
                ${
                  days <= 3
                    ? "#fff0f2"
                    : "#f0efff"
                };
                color:
                ${
                  days <= 3
                    ? "#e04459"
                    : "#6257df"
                };
              "
            >
              ${
                days < 0
                  ? "Geçti"
                  : days === 0
                    ? "Bugün"
                    : `${days} gün`
              }
            </span>

            <button
              class="delete-task"
              onclick="deleteExam(${index})"
            >
              🗑️
            </button>

          </div>

        `;

      })
      .join("");
}


function addExam() {

  const name =
    prompt(
      "Sınav adı:"
    );

  if (!name) return;

  const date =
    prompt(
      "Sınav tarihi (YYYY-MM-DD):"
    );

  if (!date) return;

  state.exams.push({
    name,
    date
  });

  saveLocalData();

  renderExams();

  showToast(
    "Sınav eklendi! 📅"
  );
}


function deleteExam(index) {

  state.exams.splice(
    index,
    1
  );

  saveLocalData();

  renderExams();
}


function daysUntil(dateString) {

  const target =
    new Date(dateString);

  const today =
    new Date();

  today.setHours(
    0,0,0,0
  );

  target.setHours(
    0,0,0,0
  );

  const difference =
    target - today;

  return Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );
}


/* =========================================================
   ODAKLAN
========================================================= */

function renderFocusPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card focus">

      <h2>
        ⏱️ Odaklanma Zamanı
      </h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        ${state.focus.mode}
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatFocusTime()}
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
          ↻ Sıfırla
        </button>

      </div>

      <div style="
        display:flex;
        justify-content:center;
        gap:10px;
        margin-top:25px;
        flex-wrap:wrap;
      ">

        <button
          class="secondary-btn"
          onclick="setFocusMode(25)"
        >
          25 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusMode(45)"
        >
          45 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusMode(60)"
        >
          60 dk
        </button>

      </div>

    </div>

    <div class="card" style="margin-top:20px">

      <h2>
        💡 Odaklanma İpucu
      </h2>

      <p style="
        color:var(--muted);
        line-height:1.7;
        margin-top:10px;
      ">
        Telefonunu sessize al, masanı düzenle
        ve sadece tek bir konuya odaklan.
        Süre bitince kısa bir mola ver.
      </p>

    </div>

  `;

  updateFocusTimer();
}


function formatFocusTime() {

  const total =
    Math.max(
      0,
      state.focus.minutes * 60 +
      state.focus.seconds
    );

  const minutes =
    Math.floor(
      total / 60
    );

  const seconds =
    total % 60;

  return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}


function updateFocusTimer() {

  const timer =
    $("focusTimer");

  if (timer)
    timer.textContent =
      formatFocusTime();
}


function startFocus() {

  if (focusInterval)
    return;

  state.focus.running =
    true;

  focusInterval =
    setInterval(() => {

      if (
        state.focus.minutes === 0 &&
        state.focus.seconds === 0
      ) {

        finishFocus();

        return;
      }

      if (
        state.focus.seconds === 0
      ) {

        state.focus.minutes--;

        state.focus.seconds =
          59;

      } else {

        state.focus.seconds--;

      }

      updateFocusTimer();

    },1000);

  showToast(
    "Odaklanma başladı! 🎯"
  );
}


function pauseFocus() {

  clearInterval(
    focusInterval
  );

  focusInterval =
    null;

  state.focus.running =
    false;

  showToast(
    "Sayaç duraklatıldı."
  );
}


function resetFocus() {

  pauseFocus();

  state.focus.minutes =
    25;

  state.focus.seconds =
    0;

  updateFocusTimer();
}


function setFocusMode(minutes) {

  pauseFocus();

  state.focus.minutes =
    minutes;

  state.focus.seconds =
    0;

  state.focus.mode =
    "Çalışma";

  renderFocusPage();
}


function finishFocus() {

  pauseFocus();

  state.xp += 100;

  state.coins += 10;

  calculateLevel();

  saveLocalData();

  showCelebration(
    "🎉 Odaklanma tamamlandı!<br>⭐ +100 XP<br>🪙 +10 Coin"
  );

  resetFocus();
}


/* =========================================================
   DERS KOÇU
========================================================= */

function renderCoachPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  const total =
    state.tasks.length;

  let advice;

  if (!total) {

    advice =
      "Bugün için 2-3 küçük görev belirle. Küçük hedeflerle başlamak daha kolaydır.";

  } else if (
    completed === total
  ) {

    advice =
      "Harika! Bugünkü görevlerinin tamamını bitirdin. Kendinle gurur duyabilirsin! 🎉";

  } else if (
    completed > 0
  ) {

    advice =
      "Güzel gidiyorsun! Kalan görevlerinden sadece bir tanesine odaklan ve devam et.";

  } else {

    advice =
      "İlk görevini tamamlamak için sadece 10 dakika çalışmayı dene. Başlamak en zor kısımdır.";

  }

  dynamic.innerHTML = `

    <div class="card coach">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>

          <h2>
            Ders Koçu
          </h2>

          <small style="color:var(--muted)">
            Kişisel çalışma yardımcın
          </small>

        </div>

      </div>

      <p
        class="coach-message"
        style="
          font-size:17px;
        "
      >
        ${advice}
      </p>

    </div>


    <div class="card" style="margin-top:20px">

      <h2>
        🎯 Bugünkü Plan
      </h2>

      <div style="
        margin-top:18px;
        display:grid;
        gap:10px;
      ">

        <div class="task">
          📌
          <strong>
            Bir görev seç
          </strong>
        </div>

        <div class="task">
          ⏱️
          <strong>
            25 dakika odaklan
          </strong>
        </div>

        <div class="task">
          ☕
          <strong>
            5 dakika mola ver
          </strong>
        </div>

        <div class="task">
          ⭐
          <strong>
            Tamamladığında XP kazan
          </strong>
        </div>

      </div>

    </div>

  `;
}


function updateCoach() {

  const message =
    $("coachMessage");

  if (!message) return;

  const total =
    state.tasks.length;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  if (!total) {

    message.textContent =
      "Bugün küçük bir hedef belirleyerek başlayabilirsin. 🎯";

  } else if (
    completed === total
  ) {

    message.textContent =
      "Harika! Bugünkü tüm görevlerini tamamladın. 🎉";

  } else {

    message.textContent =
      `${total - completed} görevin kaldı. Bir tanesini seç ve başlayalım! 💪`;

  }
}


/* =========================================================
   PET
========================================================= */

function renderPetPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card pet-card">

      <h2>
        🐣 Evcil Hayvanım
      </h2>

      <div class="pet-display">

        ${state.pet.emoji}

      </div>

      <div class="pet-name">

        ${escapeHTML(state.pet.name)}

      </div>

      <div class="pet-level">

        Seviye ${state.pet.level}

      </div>

      <div style="
        display:grid;
        gap:12px;
        margin-top:20px;
      ">

        <div>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-bottom:5px;
          ">
            <small>
              ❤️ Mutluluk
            </small>

            <small>
              ${state.pet.happiness}%
            </small>
          </div>

          <div class="progress"
            style="
              background:#eee;
            "
          >
            <span
              style="
                width:${state.pet.happiness}%;
                background:#20c997;
              "
            ></span>
          </div>

        </div>


        <div>

          <div style="
            display:flex;
            justify-content:space-between;
            margin-bottom:5px;
          ">
            <small>
              ⚡ Enerji
            </small>

            <small>
              ${state.pet.energy}%
            </small>
          </div>

          <div class="progress"
            style="
              background:#eee;
            "
          >
            <span
              style="
                width:${state.pet.energy}%;
                background:#ffbd3c;
              "
            ></span>
          </div>

        </div>

      </div>


      <button
        class="primary-btn"
        style="margin-top:20px"
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

  if (state.coins < 5) {

    showToast(
      "Beslemek için 5 coin gerekiyor. 🪙"
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

  renderPetPage();

  updateStats();

  showToast(
    "Panda mutlu oldu! 🐼❤️"
  );
}


function renamePet() {

  const name =
    prompt(
      "Evcil hayvanının yeni adı:",
      state.pet.name
    );

  if (!name) return;

  state.pet.name =
    name.trim();

  saveLocalData();

  renderPetPage();

  showToast(
    "İsim değiştirildi! ✨"
  );
}


/* =========================================================
   MARKET
========================================================= */

const MARKET_ITEMS = [

  {
    id: "apple",
    emoji: "🍎",
    name: "Elma",
    description:
      "Evcil hayvanını mutlu eder.",
    price: 10
  },

  {
    id: "ball",
    emoji: "⚽",
    name: "Oyun Topu",
    description:
      "Evcil hayvanınla oynayabilirsin.",
    price: 25
  },

  {
    id: "book",
    emoji: "📚",
    name: "Bilgi Kitabı",
    description:
      "Çalışma motivasyonu verir.",
    price: 40
  },

  {
    id: "star",
    emoji: "⭐",
    name: "Altın Yıldız",
    description:
      "Özel bir başarı ödülü.",
    price: 75
  },

  {
    id: "crown",
    emoji: "👑",
    name: "Kraliyet Tacı",
    description:
      "En özel ödüllerden biri.",
    price: 150
  },

  {
    id: "rocket",
    emoji: "🚀",
    name: "Roket",
    description:
      "Hedeflerine daha hızlı ulaş.",
    price: 250
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

        <small style="color:var(--muted)">
          Bakiyen:
          <strong>
            🪙 ${state.coins}
          </strong>
        </small>

      </div>

    </div>

    <div
      class="market-grid"
      id="marketGrid"
    ></div>

  `;

  const grid =
    $("marketGrid");

  grid.innerHTML =
    MARKET_ITEMS
      .map(item => `

        <div class="shop-item">

          <div class="shop-icon">
            ${item.emoji}
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
            onclick="buyMarketItem('${item.id}')"
          >
            Satın Al
          </button>

        </div>

      `)
      .join("");
}


function buyMarketItem(id) {

  const item =
    MARKET_ITEMS.find(
      item => item.id === id
    );

  if (!item) return;

  if (state.coins < item.price) {

    showToast(
      "Yeterli coin yok. 🪙"
    );

    return;
  }

  state.coins -=
    item.price;

  state.pet.happiness =
    Math.min(
      100,
      state.pet.happiness + 10
    );

  saveLocalData();

  renderMarketPage();

  updateStats();

  showToast(
    `${item.name} satın alındı! 🎉`
  );
}


/* =========================================================
   ROZETLER
========================================================= */

const BADGES = [

  {
    emoji: "🌱",
    name: "İlk Adım",
    description:
      "İlk görevini tamamla.",
    unlocked:
      () =>
        state.tasks.some(
          task => task.completed
        )
  },

  {
    emoji: "🔥",
    name: "Seri Başlangıcı",
    description:
      "Çalışma serisi oluştur.",
    unlocked:
      () =>
        state.streak >= 1
  },

  {
    emoji: "⭐",
    name: "XP Avcısı",
    description:
      "500 XP kazan.",
    unlocked:
      () =>
        state.xp >= 500
  },

  {
    emoji: "🚀",
    name: "Hızlı Başlangıç",
    description:
      "5 görev tamamla.",
    unlocked:
      () =>
        completedTaskCount() >= 5
  },

  {
    emoji: "🏆",
    name: "Başarı",
    description:
      "1000 XP kazan.",
    unlocked:
      () =>
        state.xp >= 1000
  },

  {
    emoji: "🎯",
    name: "Odak Ustası",
    description:
      "Bir odaklanma oturumu tamamla.",
    unlocked:
      () =>
        state.xp >= 100
  },

  {
    emoji: "👑",
    name: "Seviye Atladın",
    description:
      "Seviye 5'e ulaş.",
    unlocked:
      () =>
        state.level >= 5
  },

  {
    emoji: "💎",
    name: "Efsane",
    description:
      "5000 XP kazan.",
    unlocked:
      () =>
        state.xp >= 5000
  }

];


function completedTaskCount() {

  return state.tasks.filter(
    task => task.completed
  ).length;
}


function renderAchievementsPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>
        🏆 Başarı Rozetleri
      </h2>

      <span>
        ${BADGES.filter(
          badge => badge.unlocked()
        ).length}
        / ${BADGES.length}
      </span>

    </div>

    <div class="badges">

      ${
        BADGES.map(
          badge => {

            const unlocked =
              badge.unlocked();

            return `

              <div class="badge ${
                unlocked
                  ? ""
                  : "locked"
              }">

                <div class="badge-icon">
                  ${badge.emoji}
                </div>

                <strong>
                  ${badge.name}
                </strong>

                <small style="
                  display:block;
                  margin-top:5px;
                ">
                  ${badge.description}
                </small>

                <div style="
                  margin-top:8px;
                  font-size:11px;
                  font-weight:800;
                ">
                  ${
                    unlocked
                      ? "✓ Kazanıldı"
                      : "🔒 Kilitli"
                  }
                </div>

              </div>

            `;

          }
        ).join("")
      }

    </div>

  `;
}


/* =========================================================
   İSTATİSTİK
========================================================= */

function renderStatsPage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const total =
    state.tasks.length;

  const completed =
    completedTaskCount();

  const percent =
    total
      ? Math.round(
          completed /
          total *
          100
        )
      : 0;

  dynamic.innerHTML = `

    <div class="card-title">

      <h2>
        📊 Çalışma İstatistiklerin
      </h2>

    </div>

    <div class="stats">

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
          Günlük Seri
        </small>

      </div>

      <div class="stat">

        <span>📝</span>

        <strong>
          ${total}
        </strong>

        <small>
          Toplam Görev
        </small>

      </div>

      <div class="stat">

        <span>✅</span>

        <strong>
          ${completed}
        </strong>

        <small>
          Tamamlanan Görev
        </small>

      </div>

      <div class="stat">

        <span>📈</span>

        <strong>
          ${percent}%
        </strong>

        <small>
          Tamamlama Oranı
        </small>

      </div>

    </div>


    <div class="card" style="margin-top:20px">

      <h2>
        🎯 Seviye İlerlemesi
      </h2>

      <div style="
        display:flex;
        justify-content:space-between;
        margin:15px 0 8px;
      ">

        <strong>
          Seviye ${state.level}
        </strong>

        <span style="color:var(--muted)">
          ${state.xp % 500} / 500 XP
        </span>

      </div>

      <div
        class="progress"
        style="background:#eee"
      >

        <span
          style="
            width:${(state.xp % 500) / 5}%;
            background:var(--primary);
          "
        ></span>

      </div>

    </div>

  `;
}


function updateStats() {

  if ($("statXP"))
    $("statXP").textContent =
      state.xp;

  if ($("statStreak"))
    $("statStreak").textContent =
      state.streak;

  if ($("statCoins"))
    $("statCoins").textContent =
      state.coins;

  if ($("levelText"))
    $("levelText").textContent =
      `Seviye ${state.level}`;
}


/* =========================================================
   PROFİL
========================================================= */

function renderProfilePage() {

  const dynamic =
    $("dynamicSection");

  dynamic.style.display =
    "block";

  const name =
    getUserName();

  const email =
    state.user?.email ||
    "E-posta bilgisi yok";

  dynamic.innerHTML = `

    <div class="card">

      <div style="
        text-align:center;
        padding:20px;
      ">

        <div style="
          width:100px;
          height:100px;
          border-radius:50%;
          background:#e8e5ff;
          display:grid;
          place-items:center;
          font-size:50px;
          margin:0 auto 15px;
        ">
          👤
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

        <div style="
          margin-top:20px;
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
        ">

          <span class="task-xp">
            ⭐ Seviye ${state.level}
          </span>

          <span class="task-xp">
            🪙 ${state.coins} Coin
          </span>

        </div>

      </div>

    </div>


    <div class="card" style="margin-top:20px">

      <h2>
        ⚙️ Ayarlar
      </h2>

      <div class="task">

        <div class="task-content">

          <strong>
            🌙 Karanlık Mod
          </strong>

          <small style="
            display:block;
            color:var(--muted);
            margin-top:4px;
          ">
            DersTakip görünümünü değiştir.
          </small>

        </div>

        <button
          class="primary-btn"
          onclick="toggleDarkMode()"
        >
          ${
            document.body.classList.contains("dark")
              ? "Açık Mod"
              : "Koyu Mod"
          }
        </button>

      </div>

    </div>


    <div class="card" style="margin-top:20px">

      <h2>
        🚪 Hesap
      </h2>

      <button
        class="danger-btn"
        style="margin-top:15px"
        onclick="logout()"
      >
        Çıkış Yap
      </button>

    </div>

  `;
}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  state.settings.darkMode =
    document.body.classList.contains(
      "dark"
    );

  saveLocalData();

  if (currentPage === "profile") {

    renderProfilePage();

  }
}


function applyDarkMode() {

  if (
    state.settings.darkMode
  ) {

    document.body.classList.add(
      "dark"
    );

  } else {

    document.body.classList.remove(
      "dark"
    );

  }
}


/* =========================================================
   DAILY REWARD
========================================================= */

function claimDailyReward() {

  if (
    state.dailyRewardClaimed
  ) {

    showToast(
      "Bugünkü ödülü zaten aldın. 🎁"
    );

    return;
  }

  const rewardXP =
    100;

  const rewardCoins =
    20;

  state.xp +=
    rewardXP;

  state.coins +=
    rewardCoins;

  state.dailyRewardClaimed =
    true;

  calculateLevel();

  saveLocalData();

  renderRightColumn(
    currentPage
  );

  updateStats();

  showCelebration(
    `🎁 Günlük Ödül!<br>⭐ +${rewardXP} XP<br>🪙 +${rewardCoins} Coin`
  );
}


function updateDailyReward() {

  const text =
    $("dailyRewardText");

  const button =
    $("dailyRewardButton");

  if (!text || !button)
    return;

  if (
    state.dailyRewardClaimed
  ) {

    text.textContent =
      "Bugünkü ödülünü aldın! 🎉";

    button.textContent =
      "Ödül Alındı ✓";

    button.disabled =
      true;

  } else {

    text.textContent =
      "Bugünün sürpriz ödülü seni bekliyor.";

    button.textContent =
      "Ödülü Al 🎁";

    button.disabled =
      false;

  }
}


/* =========================================================
   LEVEL
========================================================= */

function calculateLevel() {

  state.level =
    Math.floor(
      state.xp / 500
    ) + 1;

  state.pet.level =
    Math.floor(
      state.xp / 1000
    ) + 1;
}


/* =========================================================
   CELEBRATION
========================================================= */

function showCelebration(message) {

  const celebration =
    $("celebration");

  const text =
    $("celebrationText");

  if (!celebration)
    return;

  if (text)
    text.innerHTML =
      message;

  celebration.style.display =
    "flex";

  setTimeout(() => {

    celebration.style.display =
      "none";

  }, 2200);
}


/* =========================================================
   MODAL
========================================================= */

function openModal(title, content) {

  if ($("modalTitle"))
    $("modalTitle").textContent =
      title;

  if ($("modalContent"))
    $("modalContent").innerHTML =
      content;

  if ($("modal"))
    $("modal").classList.add(
      "show"
    );
}


function closeModal() {

  if ($("modal"))
    $("modal").classList.remove(
      "show"
    );
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


function navigateMobile(page) {

  navigate(page);

  closeMobileMenu();
}


/* =========================================================
   LOCAL STORAGE / BAŞLANGIÇ
========================================================= */

function initApp() {

  loadLocalData();

  applyDarkMode();

  calculateLevel();

  const savedUser =
    localStorage.getItem(
      "dersTakipUser"
    );

  if (savedUser) {

    try {

      state.user =
        JSON.parse(savedUser);

      openApp();

    } catch {

      localStorage.removeItem(
        "dersTakipUser"
      );

      showLogin();

    }

  } else {

    if ($("authScreen"))
      $("authScreen").style.display =
        "flex";

    if ($("app"))
      $("app").style.display =
        "none";

  }

  setupKeyboardShortcuts();
}


/* =========================================================
   KLAVYE
========================================================= */

function setupKeyboardShortcuts() {

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
}


/* =========================================================
   SAYFA YÜKLENDİ
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initApp
);
