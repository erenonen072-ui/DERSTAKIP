// ======================================================
// DERS TAKİP 3.0
// ======================================================

const API = "/api";

let currentUser = null;

let tasks = [];
let subjects = [];
let exams = [];
let sessions = [];

let focusTimer = null;
let focusSeconds = 25 * 60;
let focusRunning = false;

const MOTIVATIONS = [
  "Bugün 20 dakika çalışman bile ilerlemedir. 💜",
  "Dünkü senden daha iyisin! 🔥",
  "Hedefine biraz daha yaklaştın. 🎯",
  "Bir görev daha tamamla ve seviyeni yükselt! 🚀",
  "Küçük adımlar büyük başarılar getirir. ⭐",
  "Bugün çalış, yarın rahat et. 📚",
  "Sen bunu yapabilirsin! 💪",
  "Başlamak başarının yarısıdır. 🚀"
];

const BADGES = [
  {
    id: "first_task",
    icon: "🥇",
    name: "İlk Görev",
    description: "İlk görevini tamamla"
  },
  {
    id: "three_day",
    icon: "🔥",
    name: "3 Günlük Seri",
    description: "3 gün üst üste çalış"
  },
  {
    id: "ten_tasks",
    icon: "📚",
    name: "10 Görev",
    description: "10 görev tamamla"
  },
  {
    id: "100_minutes",
    icon: "⏱️",
    name: "100 Dakika",
    description: "100 dakika çalış"
  },
  {
    id: "first_exam",
    icon: "🎯",
    name: "İlk Sınav Hedefi",
    description: "İlk sınavını ekle"
  },
  {
    id: "1000_xp",
    icon: "💯",
    name: "1000 XP",
    description: "1000 XP kazan"
  },
  {
    id: "master",
    icon: "👑",
    name: "Çalışma Ustası",
    description: "Seviye 10'a ulaş"
  }
];

const PETS = [
  {
    id: "cat",
    icon: "🐱",
    name: "Kedi"
  },
  {
    id: "dog",
    icon: "🐶",
    name: "Köpek"
  },
  {
    id: "rabbit",
    icon: "🐰",
    name: "Tavşan"
  },
  {
    id: "panda",
    icon: "🐼",
    name: "Panda"
  },
  {
    id: "fox",
    icon: "🦊",
    name: "Tilki"
  }
];

// ======================================================
// API
// ======================================================

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
        message:
          "Sunucuya bağlanılamadı."
      }
    };
  }
}

// ======================================================
// LOCAL STORAGE
// ======================================================

function storageKey(key) {

  return `ders_takip_${currentUser?.id || "guest"}_${key}`;
}

function getLocal(key, fallback) {

  try {

    const value =
      localStorage.getItem(
        storageKey(key)
      );

    return value === null
      ? fallback
      : JSON.parse(value);

  } catch {

    return fallback;

  }
}

function setLocal(key, value) {

  localStorage.setItem(
    storageKey(key),
    JSON.stringify(value)
  );
}

function getCoins() {

  return Number(
    getLocal("coins", 0)
  );
}

function setCoins(value) {

  setLocal(
    "coins",
    Math.max(0, Number(value))
  );
}

function getStreak() {

  return Number(
    getLocal(
      "streak",
      currentUser?.streak || 0
    )
  );
}

function setStreak(value) {

  setLocal("streak", value);
}

function getPet() {

  return getLocal(
    "pet",
    "rabbit"
  );
}

function setPet(value) {

  setLocal("pet", value);
}

function getBadges() {

  return getLocal(
    "badges",
    []
  );
}

function setBadges(value) {

  setLocal(
    "badges",
    value
  );
}

// ======================================================
// AUTH
// ======================================================

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

  if (!el) return;

  el.textContent = message;

  el.style.color =
    success
      ? "#20c997"
      : "#ff5b6e";
}

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

  setAuthMessage(
    "Giriş yapılıyor..."
  );

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

  if (!result.response.ok) {

    setAuthMessage(
      result.data.message ||
      "Giriş yapılamadı."
    );

    return;
  }

  currentUser =
    result.data.user;

  await enterApp();
}

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

  if (!result.response.ok) {

    setAuthMessage(
      result.data.message ||
      "Kayıt olunamadı."
    );

    return;
  }

  currentUser =
    result.data.user;

  await enterApp();
}

async function logout() {

  await api(
    "logout",
    {
      method: "POST"
    }
  );

  currentUser = null;

  document.getElementById(
    "app"
  ).style.display = "none";

  document.getElementById(
    "authScreen"
  ).style.display = "flex";

  showLogin();
}

// ======================================================
// ENTER APP
// ======================================================

async function enterApp() {

  document.getElementById(
    "authScreen"
  ).style.display = "none";

  document.getElementById(
    "app"
  ).style.display = "block";

  await loadAll();

  updateUserUI();

  renderHome();

  dailyLoginReward();

  checkBadges();
}

// ======================================================
// LOAD
// ======================================================

async function loadAll() {

  const results =
    await Promise.all([
      api("tasks"),
      api("subjects"),
      api("exams"),
      api("sessions")
    ]);

  tasks =
    results[0].data.tasks || [];

  subjects =
    results[1].data.subjects || [];

  exams =
    results[2].data.exams || [];

  sessions =
    results[3].data.sessions || [];

  const me =
    await api("me");

  if (me.response.ok) {

    currentUser =
      me.data.user;
  }
}

// ======================================================
// USER
// ======================================================

function updateUserUI() {

  if (!currentUser) return;

  const xp =
    Number(currentUser.xp || 0);

  const level =
    getLevel(xp);

  updateXPBar();

  const homeWelcome =
    document.getElementById(
      "homeWelcome"
    );

  if (homeWelcome) {

    homeWelcome.textContent =
      `Merhaba ${currentUser.name}! 👋`;
  }
}

function getLevel(xp) {

  const level =
    Math.max(
      1,
      Math.floor(
        Number(xp) / 250
      ) + 1
    );

  let title =
    "Başlangıç";

  if (level >= 50) {

    title =
      "Efsane Öğrenci 👑";

  } else if (level >= 20) {

    title =
      "Başarı Avcısı";

  } else if (level >= 10) {

    title =
      "Ders Ustası";

  } else if (level >= 5) {

    title =
      "Çalışkan";
  }

  return {
    level,
    title,
    current:
      (level - 1) * 250,
    next:
      level * 250
  };
}

function updateXPBar() {

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    getLevel(xp);

  const current =
    xp - level.current;

  const needed =
    level.next -
    level.current;

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        current / needed * 100
      )
    );

  const home =
    document.getElementById(
      "homeContent"
    );

  if (!home) return;
}

// ======================================================
// PAGE SYSTEM
// ======================================================

function openPage(
  pageName,
  button = null
) {

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove(
        "active-page"
      );

    });

  const page =
    document.getElementById(
      `page-${pageName}`
    );

  if (!page) return;

  page.classList.add(
    "active-page"
  );

  document
    .querySelectorAll(
      ".menu button, .mobile-nav button"
    )
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });

  if (button) {

    button.classList.add(
      "active"
    );
  }

  switch (pageName) {

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

    case "stats":
      renderStatsPage();
      break;

    case "profile":
      renderProfilePage();
      break;

    case "pet":
      renderPetPage();
      break;

    case "badges":
      renderBadgesPage();
      break;

    case "rewards":
      renderRewardsPage();
      break;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function setActive(button) {

  document
    .querySelectorAll(
      ".menu button, .mobile-nav button"
    )
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });

  if (button) {

    button.classList.add(
      "active"
    );
  }
}

function goHome(button) {
  openPage("home", button);
}

function showTasks(button) {
  openPage("tasks", button);
}

function showSubjects(button) {
  openPage("subjects", button);
}

function showExams(button) {
  openPage("exams", button);
}

function showFocus(button) {
  openPage("focus", button);
}

function showStats(button) {
  openPage("stats", button);
}

function showProfile(button) {
  openPage("profile", button);
}

function showPet(button) {
  openPage("pet", button);
}

function showBadges(button) {
  openPage("badges", button);
}

function showRewards(button) {
  openPage("rewards", button);
}

// ======================================================
// HOME
// ======================================================

function renderHome() {

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const total =
    tasks.length;

  const percentage =
    total
      ? Math.round(
          completed / total * 100
        )
      : 0;

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    getLevel(xp);

  const nextXP =
    level.next - xp;

  const exam =
    getNextExam();

  const examHTML =
    exam
      ? `
        <div class="card"
             style="margin-bottom:20px">

          <h2>
            📅 Yaklaşan Sınav
          </h2>

          <div class="exam-days">
            ${daysUntil(exam.exam_date)}
            gün
          </div>

          <strong>
            ${escapeHTML(exam.title)}
          </strong>

          <p style="color:var(--muted);margin-top:8px">
            ${exam.topic || "Konu belirtilmemiş"}
          </p>

        </div>
      `
      : "";

  const motivation =
    MOTIVATIONS[
      new Date().getDate()
      % MOTIVATIONS.length
    ];

  document.getElementById(
    "homeContent"
  ).innerHTML = `

    <div class="home-hero">

      <h2>
        🎯 Bugünkü Hedefin
      </h2>

      <p>
        ${completed} / ${total}
        görev tamamlandı.
      </p>

      <div class="progress">
        <span
          style="width:${percentage}%">
        </span>
      </div>

      <div class="xp">
        ⭐ Seviye ${level.level}
        · ${xp} XP
        · Yeni seviyeye ${nextXP} XP
      </div>

    </div>

    <div class="coach-card">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>
            Ders Koçu
          </h2>

          <p style="color:var(--muted)">
            Bugünkü çalışma planın
          </p>
        </div>

      </div>

      <div class="coach-message">

        ${
          exam
            ? `Sınavına ${daysUntil(exam.exam_date)}
               gün kaldı.
               Bugün ${exam.subject_name || "bu derse"}
               odaklanman harika olur! 🎯`
            : `Bugün ${Math.max(
                25,
                total * 25
              )} dakika çalışman harika olur! 🚀`
        }

      </div>

      <div class="coach-grid">

        <div class="coach-stat">
          📚
          <strong>
            ${subjects.length}
          </strong>
          Ders
        </div>

        <div class="coach-stat">
          🎯
          <strong>
            ${total}
          </strong>
          Görev
        </div>

        <div class="coach-stat">
          🔥
          <strong>
            ${getStreak()}
          </strong>
          Seri
        </div>

        <div class="coach-stat">
          🪙
          <strong>
            ${getCoins()}
          </strong>
          Coin
        </div>

      </div>

    </div>

    ${examHTML}

    <div class="motivation-card">

      <h3>
        💬 Bugünün Mesajı
      </h3>

      <p style="
        margin-top:10px;
        line-height:1.6;
      ">
        ${motivation}
      </p>

    </div>

    <div class="cards-grid">

      <div class="card">

        <h2>
          🔥 Çalışma Serisi
        </h2>

        <div style="
          font-size:45px;
          font-weight:950;
          margin-top:10px;
        ">
          ${getStreak()} 🔥
        </div>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Gün üst üste
        </p>

      </div>

      <div class="card">

        <h2>
          🪙 Coin
        </h2>

        <div style="
          font-size:45px;
          font-weight:950;
          margin-top:10px;
        ">
          ${getCoins()}
        </div>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Ödüllerde kullanabilirsin.
        </p>

      </div>

      <div class="card">

        <h2>
          🐣 Evcil Hayvan
        </h2>

        <div style="
          font-size:45px;
          margin-top:10px;
        ">
          ${getPetIcon()}
        </div>

        <p style="
          color:var(--muted);
          margin-top:5px;
        ">
          Çalıştıkça gelişiyor!
        </p>

      </div>

    </div>
  `;
}

// ======================================================
// TASK PAGE
// ======================================================

function renderTasksPage() {

  const list =
    document.getElementById(
      "fullTaskList"
    );

  if (!list) return;

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  document.getElementById(
    "tasksPageCounter"
  ).textContent =
    `${completed} / ${tasks.length} tamamlandı`;

  if (!tasks.length) {

    list.innerHTML = `
      <div style="
        text-align:center;
        padding:40px;
        color:var(--muted);
      ">
        <div style="font-size:60px">
          🎯
        </div>

        <h3 style="
          margin:10px 0;
          color:var(--text);
        ">
          Henüz görev yok
        </h3>

        <p>
          İlk görevini ekleyerek başla!
        </p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    tasks.map(task => `
      <div class="task">

        <div
          class="checkbox"
          onclick="toggleTask(${task.id})">

          ${
            task.completed
              ? "✓"
              : ""
          }

        </div>

        <div class="task-content">

          <div
            class="task-name"
            style="
              ${
                task.completed
                  ? "text-decoration:line-through;color:#9aa1b2"
                  : ""
              }
            ">

            ${escapeHTML(task.title)}

          </div>

        </div>

        <div class="task-xp">
          +${task.xp || 50} XP
        </div>

        <button
          class="delete-task"
          onclick="deleteTask(${task.id})">

          🗑️

        </button>

      </div>
    `)
    .join("");
}

async function addTaskFromPage() {

  const input =
    document.getElementById(
      "newTaskPage"
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

  if (!result.response.ok) {

    toast(
      result.data.message ||
      "Görev eklenemedi."
    );

    return;
  }

  tasks.unshift(
    result.data.task
  );

  input.value = "";

  renderTasksPage();

  toast(
    "✅ Yeni görev eklendi!"
  );
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

  if (!result.response.ok) {

    toast(
      result.data.message ||
      "Görev değiştirilemedi."
    );

    return;
  }

  const task =
    tasks.find(
      t => Number(t.id) === Number(id)
    );

  if (task) {

    task.completed =
      result.data.completed;
  }

  if (result.data.completed) {

    currentUser.xp =
      Number(currentUser.xp || 0) +
      Number(task?.xp || 50);

    addCoins(10);

    increaseStreak();

    showCelebration(
      "🎉",
      "Görev Tamamlandı!",
      `⭐ +${task?.xp || 50} XP<br>
       🪙 +10 Coin<br>
       🔥 Seri devam ediyor!`
    );

    checkBadges();

  } else {

    currentUser.xp =
      Math.max(
        0,
        Number(currentUser.xp || 0) -
        Number(task?.xp || 50)
      );

    toast(
      "Görev tekrar açıldı."
    );
  }

  renderTasksPage();

  updateUserUI();
}

async function deleteTask(id) {

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

  if (!result.response.ok) {

    toast(
      result.data.message ||
      "Görev silinemedi."
    );

    return;
  }

  tasks =
    tasks.filter(
      t => Number(t.id) !== Number(id)
    );

  renderTasksPage();

  toast(
    "🗑️ Görev silindi."
  );
}

// ======================================================
// SUBJECTS
// ======================================================

function renderSubjectsPage() {

  const el =
    document.getElementById(
      "subjectsPageContent"
    );

  if (!el) return;

  if (!subjects.length) {

    el.innerHTML = `
      <div class="page-card">

        <div style="
          text-align:center;
          padding:35px;
        ">

          <div style="font-size:60px">
            📚
          </div>

          <h2 style="margin:10px">
            İlk dersini ekle
          </h2>

          <p style="color:var(--muted)">
            Matematik, Türkçe, Fen Bilimleri...
          </p>

        </div>

      </div>
    `;

    return;
  }

  el.innerHTML =
    subjects.map((subject,index) => {

      const relatedTasks =
        tasks.filter(
          t =>
            t.subject_id ===
            subject.id
        );

      const completed =
        relatedTasks.filter(
          t => t.completed
        ).length;

      const percentage =
        relatedTasks.length
          ? Math.round(
              completed /
              relatedTasks.length *
              100
            )
          : 0;

      return `

        <div class="subject-card">

          <div
            class="subject-color"
            style="
              background:
              ${subject.color || "#6658f5"};
            ">
          </div>

          <div class="subject-icon">
            ${
              [
                "📚",
                "🧮",
                "🔬",
                "🌍",
                "📝",
                "💻"
              ][index % 6]
            }
          </div>

          <h3>
            ${escapeHTML(subject.name)}
          </h3>

          <p>
            ${completed}
            görev tamamlandı
          </p>

          <div class="subject-progress">
            <span
              style="width:${percentage}%">
            </span>
          </div>

          <p style="margin-top:8px">
            %${percentage} ilerleme
          </p>

          <button
            class="secondary-button"
            style="
              margin-top:15px;
              width:100%;
            "
            onclick="deleteSubject(${subject.id})">

            Dersi Sil

          </button>

        </div>
      `;
    })
    .join("");
}

async function addSubjectPrompt() {

  const name =
    prompt(
      "Ders adı:"
    );

  if (!name?.trim()) return;

  const result =
    await api(
      "subjects",
      {
        method: "POST",

        body: JSON.stringify({
          name: name.trim(),
          color: "#6658f5"
        })
      }
    );

  if (!result.response.ok) {

    toast(
      result.data.message ||
      "Ders eklenemedi."
    );

    return;
  }

  subjects.unshift(
    result.data.subject
  );

  renderSubjectsPage();

  toast(
    "📚 Ders eklendi!"
  );

  checkBadges();
}

async function deleteSubject(id) {

  if (
    !confirm(
      "Bu dersi silmek istiyor musun?"
    )
  ) return;

  const result =
    await api(
      "subjects",
      {
        method: "DELETE",

        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) return;

  subjects =
    subjects.filter(
      s =>
        Number(s.id) !==
        Number(id)
    );

  renderSubjectsPage();

  toast(
    "🗑️ Ders silindi."
  );
}

// ======================================================
// EXAMS
// ======================================================

function getNextExam() {

  const now =
    new Date();

  return exams
    .filter(
      exam =>
        new Date(exam.exam_date) >= now
    )
    .sort(
      (a,b) =>
        new Date(a.exam_date) -
        new Date(b.exam_date)
    )[0];
}

function daysUntil(date) {

  const now =
    new Date();

  const target =
    new Date(date);

  const diff =
    target.getTime() -
    now.getTime();

  return Math.max(
    0,
    Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    )
  );
}

function renderExamsPage() {

  const el =
    document.getElementById(
      "examsPageContent"
    );

  if (!el) return;

  if (!exams.length) {

    el.innerHTML = `
      <div class="page-card">

        <div style="
          text-align:center;
          padding:35px;
        ">

          <div style="font-size:60px">
            📅
          </div>

          <h2>
            Henüz sınav yok
          </h2>

          <p style="
            color:var(--muted);
            margin-top:8px;
          ">
            Yaklaşan sınavını ekle.
          </p>

        </div>

      </div>
    `;

    return;
  }

  el.innerHTML =
    exams.map(exam => {

      const days =
        daysUntil(
          exam.exam_date
        );

      let cls = "";

      if (days <= 1) {
        cls = "danger";
      } else if (days <= 7) {
        cls = "warning";
      }

      return `

        <div class="exam-card ${cls}">

          <h2>
            📚 ${escapeHTML(exam.title)}
          </h2>

          <div class="exam-days">
            ${days}
            <span style="
              font-size:16px;
            ">
              gün kaldı
            </span>
          </div>

          <div class="exam-date">
            📅 ${
              formatDate(
                exam.exam_date
              )
            }
          </div>

          <p style="
            margin-top:10px;
            color:var(--muted);
          ">
            ${
              exam.topic ||
              "Konu belirtilmemiş"
            }
          </p>

          <button
            class="secondary-button"
            style="
              margin-top:15px;
              width:100%;
            "
            onclick="deleteExam(${exam.id})">

            Sınavı Sil

          </button>

        </div>
      `;
    })
    .join("");
}

async function addExamPrompt() {

  const title =
    prompt(
      "Sınav adı:"
    );

  if (!title?.trim()) return;

  const date =
    prompt(
      "Sınav tarihi (YYYY-MM-DD):"
    );

  if (!date) return;

  const topic =
    prompt(
      "Konu:"
    );

  const result =
    await api(
      "exams",
      {
        method: "POST",

        body: JSON.stringify({
          title: title.trim(),
          exam_date: date,
          topic:
            topic?.trim() || null,
          subject_id:
            subjects[0]?.id || null
        })
      }
    );

  if (!result.response.ok) {

    toast(
      result.data.message ||
      "Sınav eklenemedi."
    );

    return;
  }

  exams.push(
    result.data.exam
  );

  renderExamsPage();

  toast(
    "📅 Sınav eklendi!"
  );

  checkBadges();
}

async function deleteExam(id) {

  const result =
    await api(
      "exams",
      {
        method: "DELETE",

        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) return;

  exams =
    exams.filter(
      e =>
        Number(e.id) !==
        Number(id)
    );

  renderExamsPage();

  toast(
    "🗑️ Sınav silindi."
  );
}

// ======================================================
// FOCUS
// ======================================================

function renderFocusPage() {

  updateFocusDisplay();
}

function startFocus() {

  if (focusRunning) {

    clearInterval(
      focusTimer
    );

    focusRunning = false;

    document.querySelector(
      "#page-focus .primary-button"
    ).textContent =
      "▶ Devam Et";

    return;
  }

  focusRunning = true;

  document.querySelector(
    "#page-focus .primary-button"
  ).textContent =
    "⏸ Duraklat";

  focusTimer =
    setInterval(
      async () => {

        focusSeconds--;

        updateFocusDisplay();

        if (focusSeconds <= 0) {

          clearInterval(
            focusTimer
          );

          focusRunning = false;

          await completeFocus();

        }

      },
      1000
    );
}

function resetFocus() {

  clearInterval(
    focusTimer
  );

  focusRunning = false;

  focusSeconds =
    25 * 60;

  updateFocusDisplay();

  document.querySelector(
    "#page-focus .primary-button"
  ).textContent =
    "▶ Başlat";
}

function updateFocusDisplay() {

  const minutes =
    Math.floor(
      focusSeconds / 60
    )
    .toString()
    .padStart(2,"0");

  const seconds =
    (focusSeconds % 60)
    .toString()
    .padStart(2,"0");

  const timer =
    document.getElementById(
      "focusTimer"
    );

  if (timer) {

    timer.textContent =
      `${minutes}:${seconds}`;
  }
}

async function completeFocus() {

  const result =
    await api(
      "sessions",
      {
        method: "POST",

        body: JSON.stringify({
          duration_minutes: 25
        })
      }
    );

  if (result.response.ok) {

    const earned =
      Number(
        result.data.earned_xp || 25
      );

    currentUser.xp =
      Number(currentUser.xp || 0) +
      earned;

    addCoins(15);

    sessions.unshift(
      result.data.session
    );

    increaseStreak();

    showCelebration(
      "🎉",
      "Odaklanma Tamamlandı!",
      `⭐ +${earned} XP<br>
       🪙 +15 Coin<br>
       🔥 Seri devam ediyor!`
    );

    checkBadges();
  }

  focusSeconds =
    25 * 60;

  updateFocusDisplay();
}

// ======================================================
// STATS
// ======================================================

function renderStatsPage() {

  const el =
    document.getElementById(
      "statsPageContent"
    );

  if (!el) return;

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const minutes =
    sessions.reduce(
      (sum,s) =>
        sum +
        Number(
          s.duration_minutes || 0
        ),
      0
    );

  const hours =
    Math.floor(
      minutes / 60
    );

  const mins =
    minutes % 60;

  const xp =
    Number(currentUser?.xp || 0);

  el.innerHTML = `

    <div class="stat-grid">

      <div class="stat-box">
        ⭐
        <strong>
          ${xp}
        </strong>
        <small>
          Toplam XP
        </small>
      </div>

      <div class="stat-box">
        🔥
        <strong>
          ${getStreak()}
        </strong>
        <small>
          Günlük Seri
        </small>
      </div>

      <div class="stat-box">
        ✅
        <strong>
          ${completed}
        </strong>
        <small>
          Tamamlanan Görev
        </small>
      </div>

      <div class="stat-box">
        ⏱️
        <strong>
          ${hours}s ${mins}dk
        </strong>
        <small>
          Toplam Çalışma
        </small>
      </div>

    </div>

    <div class="page-card">

      <h2>
        📈 Çalışma Grafiği
      </h2>

      <p style="
        color:var(--muted);
        margin-top:6px;
      ">
        Son 7 günlük çalışma
      </p>

      <div class="chart">

        ${createChart()}

      </div>

    </div>

  `;
}

function createChart() {

  const today =
    new Date();

  const days = [];

  for (
    let i = 6;
    i >= 0;
    i--
  ) {

    const date =
      new Date(today);

    date.setDate(
      today.getDate() - i
    );

    const dayName =
      date.toLocaleDateString(
        "tr-TR",
        {
          weekday:"short"
        }
      );

    const dateKey =
      date.toISOString()
        .slice(0,10);

    const total =
      sessions
        .filter(
          s =>
            String(
              s.created_at
            ).slice(0,10)
            === dateKey
        )
        .reduce(
          (sum,s) =>
            sum +
            Number(
              s.duration_minutes || 0
            ),
          0
        );

    days.push({
      dayName,
      total
    });
  }

  const max =
    Math.max(
      ...days.map(
        d => d.total
      ),
      1
    );

  return days.map(
    d => `

      <div class="chart-day">

        <div
          class="chart-bar"
          style="
            height:
              ${Math.max(
                5,
                d.total / max * 180
              )}px;
          "
          title="${d.total} dakika">
        </div>

        <span>
          ${d.dayName}
        </span>

      </div>

    `
  ).join("");
}

// ======================================================
// PROFILE
// ======================================================

function renderProfilePage() {

  const el =
    document.getElementById(
      "profilePageContent"
    );

  if (!el) return;

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    getLevel(xp);

  el.innerHTML = `

    <div class="profile-card">

      <div class="profile-avatar">

        ${getPetIcon()}

      </div>

      <h2>
        ${escapeHTML(
          currentUser?.name ||
          "Öğrenci"
        )}
      </h2>

      <div class="profile-level">

        Seviye ${level.level}
        · ${level.title}

      </div>

      <div class="profile-stats">

        <div class="profile-stat">

          <strong>
            ${xp}
          </strong>

          XP

        </div>

        <div class="profile-stat">

          <strong>
            ${getStreak()}
          </strong>

          🔥 Seri

        </div>

        <div class="profile-stat">

          <strong>
            ${getCoins()}
          </strong>

          🪙 Coin

        </div>

      </div>

    </div>

    <div class="cards-grid">

      <div class="card">

        <h2>
          🎨 Tema
        </h2>

        <p style="
          color:var(--muted);
          margin:10px 0;
        ">
          DersTakip görünümünü seç.
        </p>

        <button
          class="primary-button"
          onclick="toggleTheme()">

          🌙 Tema Değiştir

        </button>

      </div>

      <div class="card">

        <h2>
          🐣 Evcil Hayvan
        </h2>

        <p style="
          font-size:45px;
          margin:15px 0;
        ">
          ${getPetIcon()}
        </p>

        <button
          class="primary-button"
          onclick="showPet()">

          Petimi Gör

        </button>

      </div>

    </div>

  `;
}

// ======================================================
// PET
// ======================================================

function getPetIcon() {

  const pet =
    PETS.find(
      p =>
        p.id === getPet()
    );

  return pet
    ? pet.icon
    : "🐰";
}

function renderPetPage() {

  const el =
    document.getElementById(
      "petPageContent"
    );

  if (!el) return;

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const petLevel =
    Math.max(
      1,
      Math.floor(
        completed / 10
      ) + 1
    );

  el.innerHTML = `

    <div class="pet-main">

      <div class="big-pet">
        ${getPetIcon()}
      </div>

      <h2>
        ${getPetName()}
      </h2>

      <div class="pet-level">
        Seviye ${petLevel}
      </div>

      <p style="
        color:var(--muted);
      ">
        ${completed}
        görev tamamladın.
      </p>

      <p style="
        margin-top:10px;
        color:var(--muted);
      ">
        Her 10 görevde petin gelişir!
      </p>

      <div class="pet-grid">

        ${
          PETS.map(
            pet => `

              <button
                class="pet-choice
                  ${
                    pet.id === getPet()
                      ? "selected"
                      : ""
                  }"
                onclick="
                  choosePet('${pet.id}')
                ">

                <div>
                  ${pet.icon}
                </div>

                ${pet.name}

              </button>

            `
          ).join("")
        }

      </div>

    </div>

  `;
}

function getPetName() {

  const pet =
    PETS.find(
      p =>
        p.id === getPet()
    );

  return pet
    ? pet.name
    : "Tavşan";
}

function choosePet(id) {

  setPet(id);

  renderPetPage();

  toast(
    `${getPetIcon()} Yeni arkadaşın seçildi!`
  );
}

// ======================================================
// BADGES
// ======================================================

function renderBadgesPage() {

  const el =
    document.getElementById(
      "badgesPageContent"
    );

  if (!el) return;

  const earned =
    getBadges();

  el.innerHTML =
    BADGES.map(
      badge => {

        const unlocked =
          earned.includes(
            badge.id
          );

        return `

          <div class="
            badge-card
            ${
              unlocked
                ? ""
                : "locked"
            }
          ">

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <h3>
              ${badge.name}
            </h3>

            <p style="
              color:var(--muted);
              margin-top:8px;
            ">
              ${badge.description}
            </p>

            <p style="
              margin-top:10px;
              font-size:12px;
            ">
              ${
                unlocked
                  ? "✅ Kazanıldı"
                  : "🔒 Kilitli"
              }
            </p>

          </div>

        `;
      }
    ).join("");
}

function checkBadges() {

  const earned =
    getBadges();

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const minutes =
    sessions.reduce(
      (sum,s) =>
        sum +
        Number(
          s.duration_minutes || 0
        ),
      0
    );

  const xp =
    Number(currentUser?.xp || 0);

  const checks = {

    first_task:
      completed >= 1,

    three_day:
      getStreak() >= 3,

    ten_tasks:
      completed >= 10,

    "100_minutes":
      minutes >= 100,

    first_exam:
      exams.length >= 1,

    "1000_xp":
      xp >= 1000,

    master:
      getLevel(xp).level >= 10

  };

  Object.keys(checks)
    .forEach(
      id => {

        if (
          checks[id] &&
          !earned.includes(id)
        ) {

          earned.push(id);

          const badge =
            BADGES.find(
              b =>
                b.id === id
            );

          if (badge) {

            showCelebration(
              badge.icon,
              "Yeni Rozet!",
              `${badge.name}<br>
               ${badge.description}`
            );

          }

        }

      }
    );

  setBadges(earned);
}

// ======================================================
// REWARDS
// ======================================================

function dailyLoginReward() {

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  const last =
    getLocal(
      "lastReward",
      null
    );

  if (last === today) return;

  setLocal(
    "lastReward",
    today
  );

  addCoins(25);

  toast(
    "🎁 Günlük ödül: +25 Coin!"
  );
}

function renderRewardsPage() {

  const el =
    document.getElementById(
      "rewardsPageContent"
    );

  if (!el) return;

  el.innerHTML = `

    <div class="reward-card">

      <div class="reward-icon">
        🎁
      </div>

      <h2>
        Günlük Ödül
      </h2>

      <p style="
        color:var(--muted);
        margin:10px 0 20px;
      ">
        Her gün giriş yaparak coin kazan.
      </p>

      <div style="
        font-size:40px;
        font-weight:950;
        color:#e8a500;
      ">
        🪙 ${getCoins()}
      </div>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        Mevcut Coin
      </p>

      <div style="
        margin-top:25px;
        padding:18px;
        border-radius:18px;
        background:var(--bg);
      ">

        🔥
        <strong>
          ${getStreak()} günlük seri
        </strong>

        <br>

        <small style="
          color:var(--muted);
        ">
          7 günlük seri = özel ödül
        </small>

      </div>

    </div>

  `;
}

// ======================================================
// DAILY STREAK
// ======================================================

function increaseStreak() {

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  const last =
    getLocal(
      "lastStudyDay",
      null
    );

  let streak =
    getStreak();

  if (last === today) {
    return;
  }

  if (last) {

    const previous =
      new Date(last);

    const current =
      new Date(today);

    const diff =
      Math.round(
        (
          current -
          previous
        ) /
        (1000 * 60 * 60 * 24)
      );

    if (diff === 1) {

      streak++;

    } else {

      streak = 1;
    }

  } else {

    streak = 1;
  }

  setStreak(streak);

  setLocal(
    "lastStudyDay",
    today
  );
}

// ======================================================
// COINS
// ======================================================

function addCoins(amount) {

  const coins =
    getCoins();

  setCoins(
    coins +
    Number(amount)
  );
}

// ======================================================
// THEME
// ======================================================

function toggleTheme() {

  document.body.classList.toggle(
    "dark"
  );

  setLocal(
    "darkMode",
    document.body.classList.contains(
      "dark"
    )
  );
}

function loadTheme() {

  if (
    getLocal(
      "darkMode",
      false
    )
  ) {

    document.body.classList.add(
      "dark"
    );
  }
}

// ======================================================
// TOAST
// ======================================================

function toast(message) {

  const container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) return;

  const el =
    document.createElement(
      "div"
    );

  el.className =
    "toast";

  el.innerHTML =
    message;

  container.appendChild(
    el
  );

  setTimeout(
    () => {

      el.remove();

    },
    3500
  );
}

// ======================================================
// CELEBRATION
// ======================================================

function showCelebration(
  emoji,
  title,
  text
) {

  const box =
    document.getElementById(
      "celebration"
    );

  document.getElementById(
    "celebrationEmoji"
  ).textContent =
    emoji;

  document.getElementById(
    "celebrationTitle"
  ).textContent =
    title;

  document.getElementById(
    "celebrationText"
  ).innerHTML =
    text;

  box.style.display =
    "flex";
}

function closeCelebration() {

  document.getElementById(
    "celebration"
  ).style.display =
    "none";
}

// ======================================================
// HELPERS
// ======================================================

function formatDate(date) {

  return new Date(
    date
  ).toLocaleDateString(
    "tr-TR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );
}

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// ======================================================
// START
// ======================================================

async function startApp() {

  loadTheme();

  const me =
    await api("me");

  if (
    me.response.ok &&
    me.data.user
  ) {

    currentUser =
      me.data.user;

    await enterApp();

  } else {

    document.getElementById(
      "authScreen"
    ).style.display =
      "flex";

    document.getElementById(
      "app"
    ).style.display =
      "none";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  startApp
);
