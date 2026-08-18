// ======================================================
// DERS TAKİP 2.0 - APP.JS
// ======================================================

const API = "/api";

let currentUser = null;
let currentPage = "home";

let tasks = [];
let subjects = [];
let exams = [];
let sessions = [];

let focusTimer = null;
let focusSeconds = 25 * 60;
let focusRunning = false;

let shopCategory = "pet";


// ======================================================
// LOCAL DATA
// ======================================================

function getStorageKey(name) {
  if (!currentUser) return `ders_takip_guest_${name}`;

  return `ders_takip_${currentUser.id}_${name}`;
}

function getLocal(name, fallback) {
  try {
    const value = localStorage.getItem(getStorageKey(name));

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);

  } catch {
    return fallback;
  }
}

function setLocal(name, value) {
  localStorage.setItem(
    getStorageKey(name),
    JSON.stringify(value)
  );
}


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
      await response
        .json()
        .catch(() => ({}));

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
// AUTH
// ======================================================

function showLogin() {

  document
    .getElementById("loginForm")
    .style.display = "block";

  document
    .getElementById("registerForm")
    .style.display = "none";

  document
    .getElementById("loginTab")
    .classList.add("active");

  document
    .getElementById("registerTab")
    .classList.remove("active");

  document
    .getElementById("authMessage")
    .textContent = "";
}


function showRegister() {

  document
    .getElementById("loginForm")
    .style.display = "none";

  document
    .getElementById("registerForm")
    .style.display = "block";

  document
    .getElementById("registerTab")
    .classList.add("active");

  document
    .getElementById("loginTab")
    .classList.remove("active");

  document
    .getElementById("authMessage")
    .textContent = "";
}


function togglePassword(id, button) {

  const input =
    document.getElementById(id);

  if (input.type === "password") {

    input.type = "text";
    button.textContent = "🙈";

  } else {

    input.type = "password";
    button.textContent = "👁️";

  }
}


async function login(event) {

  event.preventDefault();

  const email =
    document
      .getElementById("loginEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("loginPassword")
      .value;

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

  if (!result.response.ok) {

    setAuthMessage(
      result.data.message ||
      "Giriş başarısız."
    );

    return;
  }

  currentUser =
    result.data.user;

  await startApp();
}


async function register(event) {

  event.preventDefault();

  const name =
    document
      .getElementById("registerName")
      .value
      .trim();

  const email =
    document
      .getElementById("registerEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("registerPassword")
      .value;

  setAuthMessage("Hesap oluşturuluyor...");

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
      "Kayıt başarısız."
    );

    return;
  }

  currentUser =
    result.data.user;

  await startApp();
}


function setAuthMessage(message) {

  const element =
    document.getElementById("authMessage");

  element.textContent = message;
}


// ======================================================
// START APP
// ======================================================

async function startApp() {

  document
    .getElementById("authScreen")
    .style.display = "none";

  document
    .getElementById("app")
    .style.display = "block";

  initializeLocalData();

  await loadAllData();

  navigate("home");
}


async function loadAllData() {

  try {

    const [
      taskResult,
      subjectResult,
      examResult,
      sessionResult
    ] = await Promise.all([
      api("tasks"),
      api("subjects"),
      api("exams"),
      api("sessions")
    ]);

    tasks =
      taskResult.data.tasks ||
      [];

    subjects =
      subjectResult.data.subjects ||
      [];

    exams =
      examResult.data.exams ||
      [];

    sessions =
      sessionResult.data.sessions ||
      [];

  } catch (error) {

    console.error(error);

  }
}


// ======================================================
// LOCAL INITIALIZATION
// ======================================================

function initializeLocalData() {

  if (getLocal("coins", null) === null) {
    setLocal("coins", 100);
  }

  if (getLocal("streak", null) === null) {
    setLocal("streak", 0);
  }

  if (getLocal("lastLogin", null) === null) {
    setLocal("lastLogin", "");
  }

  if (getLocal("ownedItems", null) === null) {
    setLocal("ownedItems", []);
  }

  if (getLocal("equippedItems", null) === null) {
    setLocal("equippedItems", []);
  }

  if (getLocal("pet", null) === null) {

    setLocal("pet", {
      type: "🐰",
      name: "Pofi",
      level: 1
    });

  }

  checkDailyLogin();
}


// ======================================================
// DAILY LOGIN
// ======================================================

function checkDailyLogin() {

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const last =
    getLocal("lastLogin", "");

  if (last !== today) {

    let streak =
      Number(getLocal("streak", 0));

    const yesterday =
      new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayText =
      yesterday
        .toISOString()
        .slice(0, 10);

    if (last === yesterdayText) {

      streak++;

    } else {

      streak = 1;

    }

    setLocal("streak", streak);
    setLocal("lastLogin", today);

    let coins =
      Number(getLocal("coins", 0));

    coins += 25;

    setLocal("coins", coins);

    setTimeout(() => {

      showToast(
        "🎁 Günlük ödül! +25 Coin"
      );

    }, 800);
  }
}


// ======================================================
// NAVIGATION
// ======================================================

function navigate(page) {

  currentPage = page;

  document
    .querySelectorAll(".menu button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.page === page
      );

    });

  closeMobileMenu();

  renderPage();
}


function renderPage() {

  const content =
    document.getElementById(
      "pageContent"
    );

  switch (currentPage) {

    case "home":
      content.innerHTML =
        renderHome();
      break;

    case "tasks":
      content.innerHTML =
        renderTasksPage();
      break;

    case "subjects":
      content.innerHTML =
        renderSubjectsPage();
      break;

    case "exams":
      content.innerHTML =
        renderExamsPage();
      break;

    case "focus":
      content.innerHTML =
        renderFocusPage();
      break;

    case "pet":
      content.innerHTML =
        renderPetPage();
      break;

    case "shop":
      content.innerHTML =
        renderShopPage();
      break;

    case "badges":
      content.innerHTML =
        renderBadgesPage();
      break;

    case "stats":
      content.innerHTML =
        renderStatsPage();
      break;

    case "profile":
      content.innerHTML =
        renderProfilePage();
      break;

    default:
      content.innerHTML =
        renderHome();
  }

  updateCoinDisplay();
}


// ======================================================
// HOME
// ======================================================

function renderHome() {

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    getLevel(xp);

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const progress =
    tasks.length
      ? Math.round(
          completed /
          tasks.length *
          100
        )
      : 0;

  const nextExam =
    getNextExam();

  const coach =
    getCoachMessage(nextExam);

  return `

    <div class="page-header">

      <h1>Bugünkü Plan 🎯</h1>

      <p>
        Bugün hangi hedefe ulaşacağını birlikte planlayalım.
      </p>

    </div>

    <div class="hero">

      <h2>
        🎯 Günlük hedefin
      </h2>

      <p>
        ${completed} / ${tasks.length}
        görev tamamlandı.
      </p>

      <div class="progress">
        <span
          style="width:${progress}%"
        ></span>
      </div>

      <div class="xp">
        ⭐ ${xp} XP ·
        Seviye ${level.number} ·
        🔥 ${getStreak()} gün seri
      </div>

    </div>


    <div class="card">

      <div class="card-title">

        <h2>
          🤖 Ders Koçu
        </h2>

        <span>
          🧠
        </span>

      </div>

      <div class="coach">

        <div class="coach-icon">
          🤖
        </div>

        <div class="coach-text">

          <strong>
            Ders Koçu diyor ki:
          </strong>

          <p>
            ${coach}
          </p>

          <div class="coach-buttons">

            <button onclick="coachPriority()">
              🎯 Önceliğim ne?
            </button>

            <button onclick="coachStudy()">
              📚 Ne çalışmalıyım?
            </button>

            <button onclick="coachExam()">
              📅 Sınavım ne zaman?
            </button>

          </div>

        </div>

      </div>

    </div>


    <div class="grid">

      <div>

        <div class="card">

          <div class="card-title">

            <h2>
              ⚡ Bugünkü Görevler
            </h2>

            <button
              class="btn btn-soft"
              onclick="navigate('tasks')"
            >
              Tümünü Gör
            </button>

          </div>

          ${renderTaskList(5)}

          <div class="add-task">

            <input
              id="newTaskHome"
              placeholder="Yeni görev ekle..."
              maxlength="150"
              onkeydown="
                if(event.key==='Enter')
                addTaskFrom('newTaskHome')
              "
            >

            <button
              onclick="
                addTaskFrom('newTaskHome')
              "
            >
              + Ekle
            </button>

          </div>

        </div>


        <div class="stats">

          <div class="stat">
            <span>⭐</span>
            <strong>${xp}</strong>
            <small>Toplam XP</small>
          </div>

          <div class="stat">
            <span>🔥</span>
            <strong>${getStreak()}</strong>
            <small>Günlük seri</small>
          </div>

          <div class="stat">
            <span>🪙</span>
            <strong>${getCoins()}</strong>
            <small>Coin</small>
          </div>

        </div>

      </div>


      <div>

        <div class="card">

          <div class="card-title">
            <h2>📅 Yaklaşan Sınav</h2>
          </div>

          ${
            nextExam
              ? renderExamMini(nextExam)
              : `
                <div class="empty">
                  Henüz yaklaşan sınav yok.
                  <br><br>
                  <button
                    class="btn btn-primary"
                    onclick="navigate('exams')"
                  >
                    + Sınav Ekle
                  </button>
                </div>
              `
          }

        </div>


        <div class="card">

          <div class="card-title">
            <h2>🐾 Evcil Hayvanın</h2>
          </div>

          ${renderPetMini()}

        </div>


        <div class="card">

          <div class="card-title">
            <h2>🎁 Günlük Ödül</h2>
          </div>

          <p style="color:var(--muted);line-height:1.6">
            Her gün giriş yaparak
            <strong>+25 Coin</strong>
            kazanabilirsin.
          </p>

          <br>

          <button
            class="btn btn-primary"
            onclick="navigate('shop')"
          >
            🛍️ Marketi Aç
          </button>

        </div>

      </div>

    </div>
  `;
}


// ======================================================
// TASKS
// ======================================================

function renderTasksPage() {

  return `

    <div class="page-header">

      <h1>Görev Merkezi ✅</h1>

      <p>
        Yapman gerekenleri tamamla ve XP kazan.
      </p>

    </div>

    <div class="card">

      <div class="card-title">

        <h2>
          Tüm Görevlerin
        </h2>

        <span>
          ${tasks.filter(t => t.completed).length}
          /
          ${tasks.length}
        </span>

      </div>

      ${renderTaskList()}

      <div class="add-task">

        <input
          id="newTaskPage"
          placeholder="Yeni görev ekle..."
          maxlength="150"
          onkeydown="
            if(event.key==='Enter')
            addTaskFrom('newTaskPage')
          "
        >

        <button
          onclick="
            addTaskFrom('newTaskPage')
          "
        >
          + Ekle
        </button>

      </div>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>🎯 Günlük Bonus Görevleri</h2>
      </div>

      ${renderDailyChallenges()}

    </div>
  `;
}


function renderTaskList(limit = null) {

  let list =
    limit
      ? tasks.slice(0, limit)
      : tasks;

  if (!list.length) {

    return `
      <div class="empty">
        Henüz görev yok.
        <br><br>
        İlk görevini ekle! 🚀
      </div>
    `;
  }

  return list.map(task => `

    <div class="task ${task.completed ? "completed" : ""}">

      <div
        class="checkbox"
        onclick="toggleTask(${task.id})"
      >
        ${task.completed ? "✓" : ""}
      </div>

      <div class="task-content">

        <div class="task-name">
          ${escapeHtml(task.title)}
        </div>

      </div>

      <span class="task-xp">
        +${task.xp || 50} XP
      </span>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
      >
        🗑️
      </button>

    </div>

  `).join("");
}


async function addTaskFrom(inputId) {

  const input =
    document.getElementById(inputId);

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {

    showToast(
      "Bir görev yazmalısın."
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

  if (!result.response.ok) {

    showToast(
      result.data.message ||
      "Görev eklenemedi."
    );

    return;
  }

  tasks.unshift(
    result.data.task
  );

  input.value = "";

  showToast(
    "✅ Görev eklendi!"
  );

  renderPage();
}


async function toggleTask(id) {

  const task =
    tasks.find(
      t => Number(t.id) === Number(id)
    );

  if (!task) return;

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

    showToast(
      result.data.message ||
      "Görev güncellenemedi."
    );

    return;
  }

  task.completed =
    result.data.completed;

  if (task.completed) {

    let coins =
      getCoins();

    coins += 10;

    setLocal(
      "coins",
      coins
    );

    showToast(
      "🎉 Görev tamamlandı! +50 XP +10 Coin"
    );

  } else {

    showToast(
      "Görev geri alındı."
    );

  }

  renderPage();
}


async function deleteTask(id) {

  if (!confirm("Bu görevi silmek istiyor musun?")) {
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

  if (!result.response.ok) {

    showToast(
      result.data.message ||
      "Görev silinemedi."
    );

    return;
  }

  tasks =
    tasks.filter(
      task =>
        Number(task.id) !== Number(id)
    );

  showToast(
    "🗑️ Görev silindi."
  );

  renderPage();
}


// ======================================================
// DAILY CHALLENGES
// ======================================================

function renderDailyChallenges() {

  const completed =
    tasks.filter(t => t.completed).length;

  const challenges = [

    {
      icon: "⏱️",
      title: "25 dakika ders çalış",
      reward: "+25 XP",
      done: sessions.some(
        s => Number(s.duration_minutes) >= 25
      )
    },

    {
      icon: "✅",
      title: "3 görev tamamla",
      reward: "+30 XP",
      done: completed >= 3
    },

    {
      icon: "📚",
      title: "Bir ders planı oluştur",
      reward: "+20 XP",
      done: subjects.length > 0
    }

  ];

  return challenges.map(c => `

    <div
      style="
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px 0;
        border-bottom:1px solid var(--border);
      "
    >

      <span style="font-size:25px">
        ${c.icon}
      </span>

      <div style="flex:1">

        <strong>
          ${c.title}
        </strong>

        <div
          style="
            color:var(--muted);
            font-size:12px;
            margin-top:4px;
          "
        >
          ${c.reward}
        </div>

      </div>

      <span>
        ${c.done ? "✅" : "🔒"}
      </span>

    </div>

  `).join("");
}


// ======================================================
// SUBJECTS
// ======================================================

function renderSubjectsPage() {

  return `

    <div class="page-header">

      <h1>Derslerim 📚</h1>

      <p>
        Derslerini düzenle ve hangi konulara
        çalışacağını planla.
      </p>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>Ders Ekle</h2>
      </div>

      <div class="add-task">

        <input
          id="subjectName"
          placeholder="Örn. Matematik"
          maxlength="100"
        >

        <input
          id="subjectColor"
          type="color"
          value="#6658f5"
          style="max-width:60px;padding:5px"
        >

        <button
          onclick="addSubject()"
        >
          + Ders Ekle
        </button>

      </div>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>📚 Ders Listem</h2>
      </div>

      ${
        subjects.length
          ? subjects.map(subject => `

              <div
                style="
                  display:flex;
                  align-items:center;
                  gap:12px;
                  padding:15px;
                  border:1px solid var(--border);
                  border-radius:14px;
                  margin-bottom:10px;
                "
              >

                <span
                  style="
                    width:13px;
                    height:13px;
                    border-radius:50%;
                    background:${subject.color || "#6658f5"};
                  "
                ></span>

                <strong style="flex:1">
                  ${escapeHtml(subject.name)}
                </strong>

                <button
                  class="btn btn-danger"
                  onclick="deleteSubject(${subject.id})"
                >
                  Sil
                </button>

              </div>

            `).join("")
          : `
            <div class="empty">
              Henüz ders eklemedin. 📚
            </div>
          `
      }

    </div>
  `;
}


async function addSubject() {

  const name =
    document
      .getElementById("subjectName")
      .value
      .trim();

  const color =
    document
      .getElementById("subjectColor")
      .value;

  if (!name) {

    showToast(
      "Ders adı gerekli."
    );

    return;
  }

  const result =
    await api(
      "subjects",
      {
        method: "POST",

        body: JSON.stringify({
          name,
          color
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      result.data.message ||
      "Ders eklenemedi."
    );

    return;
  }

  subjects.unshift(
    result.data.subject
  );

  showToast(
    "📚 Ders eklendi!"
  );

  renderPage();
}


async function deleteSubject(id) {

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

  if (!result.response.ok) {

    showToast(
      "Ders silinemedi."
    );

    return;
  }

  subjects =
    subjects.filter(
      s => Number(s.id) !== Number(id)
    );

  showToast(
    "🗑️ Ders silindi."
  );

  renderPage();
}


// ======================================================
// EXAMS
// ======================================================

function renderExamsPage() {

  return `

    <div class="page-header">

      <h1>Sınav Takvimi 📅</h1>

      <p>
        Sınavlarını takip et ve yaklaşan sınavlarına hazırlan.
      </p>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>Yeni Sınav</h2>
      </div>

      <div
        style="
          display:grid;
          grid-template-columns:
            1fr 1fr 1fr;
          gap:10px;
        "
      >

        <input
          id="examTitle"
          placeholder="Sınav adı"
          style="padding:12px;border:1px solid var(--border);border-radius:10px"
        >

        <input
          id="examDate"
          type="date"
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
              ${escapeHtml(s.name)}
            </option>
          `).join("")}

        </select>

      </div>

      <br>

      <input
        id="examTopic"
        placeholder="Konu (örn. Kesirler)"
        style="
          width:100%;
          padding:12px;
          border:1px solid var(--border);
          border-radius:10px;
        "
      >

      <br><br>

      <button
        class="btn btn-primary"
        onclick="addExam()"
      >
        + Sınav Ekle
      </button>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>⏳ Yaklaşan Sınavlar</h2>
      </div>

      ${
        exams.length
          ? exams.map(renderExamItem).join("")
          : `
            <div class="empty">
              Henüz sınav eklemedin.
            </div>
          `
      }

    </div>
  `;
}


function renderExamItem(exam) {

  const days =
    daysUntil(exam.exam_date);

  let color =
    "#20c997";

  if (days <= 7) {
    color = "#ffae42";
  }

  if (days <= 3) {
    color = "#ff5b6e";
  }

  return `

    <div class="exam-card">

      <div>

        <strong>
          ${escapeHtml(exam.title)}
        </strong>

        <div
          style="
            color:var(--muted);
            margin-top:6px;
            font-size:13px;
          "
        >
          ${
            exam.subject_name ||
            "Ders belirtilmedi"
          }

          ${
            exam.topic
              ? " · " +
                escapeHtml(exam.topic)
              : ""
          }
        </div>

        <div
          style="
            color:var(--muted);
            font-size:12px;
            margin-top:4px;
          "
        >
          ${formatDate(exam.exam_date)}
        </div>

      </div>

      <div
        style="
          text-align:right;
          color:${color};
        "
      >

        <div class="days">
          ${
            days < 0
              ? "Geçti"
              : days === 0
                ? "BUGÜN"
                : days
          }
        </div>

        ${
          days >= 0
            ? "<small>gün kaldı</small>"
            : ""
        }

        <br>

        <button
          class="btn btn-danger"
          onclick="deleteExam(${exam.id})"
        >
          Sil
        </button>

      </div>

    </div>
  `;
}


async function addExam() {

  const title =
    document
      .getElementById("examTitle")
      .value
      .trim();

  const exam_date =
    document
      .getElementById("examDate")
      .value;

  const subject_id =
    document
      .getElementById("examSubject")
      .value;

  const topic =
    document
      .getElementById("examTopic")
      .value
      .trim();

  if (!title || !exam_date) {

    showToast(
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
          exam_date,
          subject_id:
            subject_id
              ? Number(subject_id)
              : null,
          topic
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      result.data.message ||
      "Sınav eklenemedi."
    );

    return;
  }

  exams.push(
    result.data.exam
  );

  exams.sort(
    (a,b) =>
      new Date(a.exam_date) -
      new Date(b.exam_date)
  );

  showToast(
    "📅 Sınav eklendi!"
  );

  renderPage();
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

  if (!result.response.ok) {

    showToast(
      "Sınav silinemedi."
    );

    return;
  }

  exams =
    exams.filter(
      e =>
        Number(e.id) !== Number(id)
    );

  showToast(
    "🗑️ Sınav silindi."
  );

  renderPage();
}


// ======================================================
// FOCUS
// ======================================================

function renderFocusPage() {

  return `

    <div class="page-header">

      <h1>Odaklanma Modu ⏱️</h1>

      <p>
        Telefonunu bırak. Görevine odaklan.
      </p>

    </div>

    <div class="card">

      <div class="pet-area">

        <div style="font-size:35px">
          🎯
        </div>

        <h2>
          25 Dakika Odaklan
        </h2>

        <p
          style="
            color:var(--muted);
            margin-top:8px;
          "
        >
          Çalışma bitince XP kazanırsın.
        </p>

        <div
          class="timer"
          id="focusTimer"
        >
          ${formatTimer(focusSeconds)}
        </div>

        <div class="timer-buttons">

          <button
            class="btn btn-primary"
            onclick="startFocus()"
          >
            ${focusRunning ? "⏸️ Devam ediyor" : "▶️ Başlat"}
          </button>

          <button
            class="btn btn-soft"
            onclick="resetFocus()"
          >
            🔄 Sıfırla
          </button>

        </div>

      </div>

    </div>

    <div class="card">

      <h2>
        🚀 Odaklanma Kuralları
      </h2>

      <br>

      <p style="line-height:1.8;color:var(--muted)">
        📱 Telefonunu uzağa koy.<br>
        🎧 İstersen sakin bir müzik aç.<br>
        📚 Sadece bir konuya odaklan.<br>
        🥤 Yanına su al.<br>
        🎉 Süre bitince ödülünü al!
      </p>

    </div>
  `;
}


function startFocus() {

  if (focusRunning) return;

  focusRunning = true;

  focusTimer =
    setInterval(() => {

      focusSeconds--;

      const timer =
        document.getElementById(
          "focusTimer"
        );

      if (timer) {

        timer.textContent =
          formatTimer(
            focusSeconds
          );

      }

      if (focusSeconds <= 0) {

        finishFocus();

      }

    }, 1000);

  renderPage();
}


function resetFocus() {

  clearInterval(
    focusTimer
  );

  focusRunning = false;
  focusSeconds = 25 * 60;

  renderPage();
}


async function finishFocus() {

  clearInterval(
    focusTimer
  );

  focusRunning = false;

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

    sessions.unshift(
      result.data.session
    );

    let coins =
      getCoins();

    coins += 15;

    setLocal(
      "coins",
      coins
    );

    if (currentUser) {

      currentUser.xp =
        Number(currentUser.xp || 0) +
        Number(result.data.earned_xp || 25);

    }

    showToast(
      "🎉 Odaklanma tamamlandı! +25 XP +15 Coin"
    );

  }

  focusSeconds =
    25 * 60;

  renderPage();
}


// ======================================================
// PET
// ======================================================

function getPet() {

  return getLocal(
    "pet",
    {
      type: "🐰",
      name: "Pofi",
      level: 1
    }
  );
}


function renderPetPage() {

  const pet =
    getPet();

  const equipped =
    getLocal(
      "equippedItems",
      []
    );

  return `

    <div class="page-header">

      <h1>Evcil Hayvanım 🐾</h1>

      <p>
        Çalıştıkça evcil hayvanını geliştir!
      </p>

    </div>

    <div class="card">

      <div class="pet-area">

        <div class="pet">
          ${pet.type}
        </div>

        <div class="pet-name">
          ${escapeHtml(pet.name)}
        </div>

        <div class="pet-items">
          Seviye ${pet.level}
          ·
          ${equipped.length} aksesuar
        </div>

        <div class="pet-select">

          ${["🐰","🐱","🐶","🐼","🦊","🐨"].map(
            emoji => `
              <button
                onclick="changePet('${emoji}')"
              >
                ${emoji}
              </button>
            `
          ).join("")}

        </div>

        <br>

        <button
          class="btn btn-primary"
          onclick="renamePet()"
        >
          ✏️ Adını Değiştir
        </button>

      </div>

    </div>

    <div class="card">

      <div class="card-title">
        <h2>🎒 Takılı Aksesuarlar</h2>
      </div>

      ${
        equipped.length
          ? equipped.map(
              id => {

                const item =
                  SHOP_ITEMS.find(
                    x => x.id === id
                  );

                return item
                  ? `
                    <span
                      style="
                        display:inline-block;
                        padding:10px;
                        margin:4px;
                        background:#f0efff;
                        border-radius:10px;
                      "
                    >
                      ${item.icon}
                      ${item.name}
                    </span>
                  `
                  : "";

              }
            ).join("")
          : `
            <div class="empty">
              Henüz aksesuar takmadın.
              <br>
              Marketten bir tane al! 🛍️
            </div>
          `
      }

      <br>

      <button
        class="btn btn-primary"
        onclick="navigate('shop')"
      >
        🛍️ Aksesuar Mağazasına Git
      </button>

    </div>
  `;
}


function changePet(emoji) {

  const pet =
    getPet();

  pet.type =
    emoji;

  setLocal(
    "pet",
    pet
  );

  showToast(
    `${emoji} Evcil hayvanın değişti!`
  );

  renderPage();
}


function renamePet() {

  const pet =
    getPet();

  const name =
    prompt(
      "Evcil hayvanının adı:",
      pet.name
    );

  if (!name || !name.trim()) {
    return;
  }

  pet.name =
    name.trim().slice(0,20);

  setLocal(
    "pet",
    pet
  );

  showToast(
    "🐾 İsim değiştirildi!"
  );

  renderPage();
}


// ======================================================
// SHOP
// ======================================================

const SHOP_ITEMS = [

  {
    id:"pet_hat",
    category:"pet",
    icon:"🎩",
    name:"Şık Şapka",
    description:"Evcil hayvanına havalı bir şapka.",
    price:100
  },

  {
    id:"pet_crown",
    category:"pet",
    icon:"👑",
    name:"Kraliyet Tacı",
    description:"Evcil hayvanını kral yap.",
    price:300
  },

  {
    id:"pet_glasses",
    category:"pet",
    icon:"😎",
    name:"Havalı Gözlük",
    description:"Tam bir çalışma yıldızı.",
    price:150
  },

  {
    id:"pet_bow",
    category:"pet",
    icon:"🎀",
    name:"Renkli Fiyonk",
    description:"Sevimlilik seviyesi maksimum.",
    price:80
  },

  {
    id:"pet_wings",
    category:"pet",
    icon:"🪽",
    name:"Melek Kanatları",
    description:"Uçuyormuş gibi görün!",
    price:400
  },

  {
    id:"pet_backpack",
    category:"pet",
    icon:"🎒",
    name:"Mini Çanta",
    description:"Ders kitaplarını taşısın.",
    price:200
  },

  {
    id:"pet_ball",
    category:"pet",
    icon:"⚽",
    name:"Oyun Topu",
    description:"Ders arasında oyun zamanı.",
    price:120
  },

  {
    id:"pet_cape",
    category:"pet",
    icon:"🦸",
    name:"Süper Kahraman Pelerini",
    description:"Çalışmanın kahramanı!",
    price:500
  },

  {
    id:"frame_gold",
    category:"profile",
    icon:"🟡",
    name:"Altın Çerçeve",
    description:"Profiline özel altın görünüm.",
    price:350
  },

  {
    id:"frame_rainbow",
    category:"profile",
    icon:"🌈",
    name:"Gökkuşağı Çerçeve",
    description:"Rengarenk profil.",
    price:450
  },

  {
    id:"theme_ocean",
    category:"theme",
    icon:"🌊",
    name:"Okyanus Teması",
    description:"Mavi ve sakin görünüm.",
    price:250
  },

  {
    id:"theme_space",
    category:"theme",
    icon:"🌌",
    name:"Uzay Teması",
    description:"Derslerini uzayda takip et.",
    price:500
  },

  {
    id:"badge_star",
    category:"badge",
    icon:"🌟",
    name:"Yıldız Rozeti",
    description:"Profilinde parlayan rozet.",
    price:250
  },

  {
    id:"badge_fire",
    category:"badge",
    icon:"🔥",
    name:"Ateş Rozeti",
    description:"Seri ustalarına özel.",
    price:300
  }

];


function renderShopPage() {

  const coins =
    getCoins();

  const owned =
    getLocal(
      "ownedItems",
      []
    );

  const items =
    SHOP_ITEMS.filter(
      item =>
        item.category ===
        shopCategory
    );

  return `

    <div class="page-header">

      <h1>Ödül Marketi 🛍️</h1>

      <p>
        Çalışarak kazandığın coinleri
        eğlenceli ödüllerde kullan.
      </p>

      <br>

      <div class="coin-box">
        🪙 ${coins} Coin
      </div>

    </div>


    <div class="card">

      <div class="shop-tabs">

        <button
          class="${shopCategory === "pet" ? "active" : ""}"
          onclick="setShopCategory('pet')"
        >
          🐾 Hayvan
        </button>

        <button
          class="${shopCategory === "profile" ? "active" : ""}"
          onclick="setShopCategory('profile')"
        >
          👤 Profil
        </button>

        <button
          class="${shopCategory === "theme" ? "active" : ""}"
          onclick="setShopCategory('theme')"
        >
          🎨 Temalar
        </button>

        <button
          class="${shopCategory === "badge" ? "active" : ""}"
          onclick="setShopCategory('badge')"
        >
          🏆 Rozet
        </button>

      </div>

      <div class="shop-grid">

        ${items.map(
          item => {

            const isOwned =
              owned.includes(item.id);

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

                ${
                  isOwned
                    ? `
                      <button
                        class="btn btn-soft"
                        onclick="equipItem('${item.id}')"
                      >
                        ✓ Sahipsin
                      </button>
                    `
                    : `
                      <button
                        class="btn btn-primary"
                        onclick="buyItem('${item.id}')"
                      >
                        Satın Al
                      </button>
                    `
                }

              </div>

            `;

          }
        ).join("")}

      </div>

    </div>

    <div class="card">

      <h2>💡 Coin Nasıl Kazanılır?</h2>

      <br>

      <p
        style="
          line-height:1.9;
          color:var(--muted);
        "
      >
        ✅ Görev tamamla → <strong>+10 Coin</strong><br>
        ⏱️ 25 dakika odaklan → <strong>+15 Coin</strong><br>
        🎁 Günlük giriş → <strong>+25 Coin</strong><br>
        🔥 Serini devam ettir → Daha fazla ödül!
      </p>

    </div>
  `;
}


function setShopCategory(category) {

  shopCategory =
    category;

  renderPage();
}


function buyItem(id) {

  const item =
    SHOP_ITEMS.find(
      x => x.id === id
    );

  if (!item) return;

  const owned =
    getLocal(
      "ownedItems",
      []
    );

  if (owned.includes(id)) {

    showToast(
      "Bu eşya zaten sende."
    );

    return;
  }

  const coins =
    getCoins();

  if (coins < item.price) {

    showToast(
      `🪙 ${item.price - coins} Coin daha gerekli.`
    );

    return;
  }

  setLocal(
    "coins",
    coins - item.price
  );

  owned.push(id);

  setLocal(
    "ownedItems",
    owned
  );

  showToast(
    `🎉 ${item.name} satın alındı!`
  );

  renderPage();
}


function equipItem(id) {

  const item =
    SHOP_ITEMS.find(
      x => x.id === id
    );

  if (!item) return;

  if (
    item.category !== "pet"
  ) {

    showToast(
      "Bu eşya satın alınmış olarak hazır."
    );

    return;
  }

  let equipped =
    getLocal(
      "equippedItems",
      []
    );

  if (equipped.includes(id)) {

    equipped =
      equipped.filter(
        x => x !== id
      );

    showToast(
      `${item.name} çıkarıldı.`
    );

  } else {

    equipped.push(id);

    showToast(
      `${item.icon} ${item.name} takıldı!`
    );

  }

  setLocal(
    "equippedItems",
    equipped
  );

  renderPage();
}


// ======================================================
// BADGES
// ======================================================

function renderBadgesPage() {

  const xp =
    Number(currentUser?.xp || 0);

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

  const streak =
    getStreak();

  const badges = [

    {
      icon:"🥇",
      name:"İlk Görev",
      description:"İlk görevini tamamla.",
      unlocked:
        completed >= 1
    },

    {
      icon:"🔥",
      name:"3 Günlük Seri",
      description:"3 gün üst üste çalış.",
      unlocked:
        streak >= 3
    },

    {
      icon:"📚",
      name:"10 Görev",
      description:"10 görev tamamla.",
      unlocked:
        completed >= 10
    },

    {
      icon:"⏱️",
      name:"100 Dakika",
      description:"100 dakika çalış.",
      unlocked:
        minutes >= 100
    },

    {
      icon:"🎯",
      name:"İlk Sınav",
      description:"İlk sınavını ekle.",
      unlocked:
        exams.length >= 1
    },

    {
      icon:"💯",
      name:"1000 XP",
      description:"1000 XP kazan.",
      unlocked:
        xp >= 1000
    },

    {
      icon:"👑",
      name:"Çalışma Ustası",
      description:"Seviye 10'a ulaş.",
      unlocked:
        getLevel(xp).number >= 10
    },

    {
      icon:"🏆",
      name:"Efsane Öğrenci",
      description:"Seviye 50'ye ulaş.",
      unlocked:
        getLevel(xp).number >= 50
    }

  ];

  return `

    <div class="page-header">

      <h1>Başarı Rozetleri 🏆</h1>

      <p>
        Başardıkça rozet koleksiyonunu büyüt.
      </p>

    </div>

    <div class="card">

      <div class="badge-grid">

        ${badges.map(
          badge => `

            <div
              class="
                badge
                ${badge.unlocked ? "" : "locked"}
              "
            >

              <div class="badge-icon">
                ${badge.icon}
              </div>

              <strong>
                ${badge.name}
              </strong>

              <small>
                ${badge.description}
              </small>

              <br>

              ${
                badge.unlocked
                  ? "✅ Açıldı"
                  : "🔒 Kilitli"
              }

            </div>

          `
        ).join("")}

      </div>

    </div>
  `;
}


// ======================================================
// STATS
// ======================================================

function renderStatsPage() {

  const totalMinutes =
    sessions.reduce(
      (sum,s) =>
        sum +
        Number(
          s.duration_minutes || 0
        ),
      0
    );

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const weekly =
    getWeeklyStudy();

  return `

    <div class="page-header">

      <h1>İstatistikler 📊</h1>

      <p>
        Çalışma performansını keşfet.
      </p>

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
          ${totalMinutes}
        </strong>
        <small>Çalışma dakikası</small>
      </div>

      <div class="stat">
        <span>✅</span>
        <strong>
          ${completed}
        </strong>
        <small>Tamamlanan görev</small>
      </div>

    </div>

    <br>

    <div class="card">

      <div class="card-title">
        <h2>📈 Bu Haftaki Çalışma</h2>
      </div>

      <div class="bar-chart">

        ${weekly.map(
          day => `

            <div class="bar-wrap">

              <div
                class="bar"
                style="
                  height:${Math.max(
                    5,
                    Math.min(
                      100,
                      day.minutes * 2
                    )
                  )}%;
                "
                title="${day.minutes} dakika"
              ></div>

              <span>
                ${day.label}
              </span>

            </div>

          `
        ).join("")}

      </div>

    </div>

    <div class="card">

      <h2>
        🔥 Çalışma Serin
      </h2>

      <div
        style="
          font-size:50px;
          font-weight:950;
          margin-top:15px;
        "
      >
        ${getStreak()} 🔥
      </div>

      <p
        style="
          color:var(--muted);
          margin-top:5px;
        "
      >
        gün üst üste devam ediyorsun.
      </p>

    </div>
  `;
}


// ======================================================
// PROFILE
// ======================================================

function renderProfilePage() {

  const xp =
    Number(currentUser?.xp || 0);

  const level =
    getLevel(xp);

  const pet =
    getPet();

  return `

    <div class="page-header">

      <h1>Profilim 👤</h1>

      <p>
        Profilini ve başarılarını özelleştir.
      </p>

    </div>

    <div class="card">

      <div class="profile-big">

        <div class="avatar-big">
          ${pet.type}
        </div>

        <h2>
          ${escapeHtml(
            currentUser?.name ||
            "Öğrenci"
          )}
        </h2>

        <p
          style="
            color:var(--muted);
          "
        >
          ${currentUser?.email || ""}
        </p>

        <br>

        <div
          style="
            display:flex;
            justify-content:center;
            gap:10px;
            flex-wrap:wrap;
          "
        >

          <span class="coin-box">
            🪙 ${getCoins()}
          </span>

          <span
            style="
              padding:10px 15px;
              background:#f0efff;
              color:var(--primary);
              border-radius:14px;
              font-weight:900;
            "
          >
            ⭐ ${xp} XP
          </span>

          <span
            style="
              padding:10px 15px;
              background:#fff0e0;
              color:#d17b00;
              border-radius:14px;
              font-weight:900;
            "
          >
            🔥 ${getStreak()} Seri
          </span>

        </div>

      </div>

    </div>

    <div class="card">

      <h2>
        🎨 Görünüm
      </h2>

      <br>

      <button
        class="btn btn-soft"
        onclick="toggleDarkMode()"
      >
        🌙 Açık / Karanlık Tema
      </button>

      <button
        class="btn btn-primary"
        onclick="navigate('shop')"
        style="margin-left:5px"
      >
        🛍️ Market
      </button>

    </div>

    <div class="card">

      <h2>
        🎮 Seviyen
      </h2>

      <br>

      <p>
        <strong>
          Seviye ${level.number}
        </strong>
        · ${level.name}
      </p>

      <br>

      <div class="progress">
        <span
          style="
            width:${level.progress}%;
            background:var(--primary);
          "
        ></span>
      </div>

      <p
        style="
          color:var(--muted);
          margin-top:8px;
        "
      >
        Bir sonraki seviyeye
        ${level.remaining} XP kaldı.
      </p>

    </div>
  `;
}


// ======================================================
// MINI PET
// ======================================================

function renderPetMini() {

  const pet =
    getPet();

  return `

    <div
      style="
        text-align:center;
        padding:10px;
      "
    >

      <div
        style="
          font-size:70px;
        "
      >
        ${pet.type}
      </div>

      <strong>
        ${escapeHtml(pet.name)}
      </strong>

      <p
        style="
          color:var(--muted);
          margin:5px;
        "
      >
        Seviye ${pet.level}
      </p>

      <button
        class="btn btn-soft"
        onclick="navigate('pet')"
      >
        🐾 Evcil Hayvanı Aç
      </button>

    </div>

  `;
}


// ======================================================
// COACH
// ======================================================

function getCoachMessage(nextExam) {

  if (!tasks.length) {

    return `
      Bugün için henüz görev eklememişsin.
      Küçük bir görev ekleyerek başlayalım! 🚀
    `;

  }

  const incomplete =
    tasks.find(
      t => !t.completed
    );

  if (nextExam) {

    const days =
      daysUntil(
        nextExam.exam_date
      );

    return `
      ${
        days <= 7
          ? "Sınavın yaklaşıyor! "
          : ""
      }

      <strong>
        ${escapeHtml(nextExam.title)}
      </strong>
      için biraz çalışman harika olur.

      ${
        days >= 0
          ? `Sınava ${days} gün kaldı. 🎯`
          : ""
      }
    `;

  }

  return `
    Bugün
    <strong>
      ${escapeHtml(
        incomplete?.title ||
        "bir görev"
      )}
    </strong>
    üzerinde çalışman harika olur! 💪
  `;
}


function coachPriority() {

  const incomplete =
    tasks.find(
      t => !t.completed
    );

  if (!incomplete) {

    showToast(
      "🎉 Bütün görevlerin tamam!"
    );

    return;
  }

  showToast(
    `🎯 Önceliğin: ${incomplete.title}`
  );
}


function coachStudy() {

  if (!subjects.length) {

    showToast(
      "📚 Önce bir ders ekle!"
    );

    navigate("subjects");

    return;
  }

  const random =
    subjects[
      Math.floor(
        Math.random() *
        subjects.length
      )
    ];

  showToast(
    `📚 Bugün ${random.name} çalışabilirsin!`
  );
}


function coachExam() {

  const exam =
    getNextExam();

  if (!exam) {

    showToast(
      "📅 Yaklaşan sınavın yok."
    );

    return;
  }

  showToast(
    `📅 ${exam.title}: ${daysUntil(exam.exam_date)} gün kaldı.`
  );
}


// ======================================================
// LEVEL
// ======================================================

function getLevel(xp) {

  const level =
    Math.max(
      1,
      Math.floor(
        xp / 250
      ) + 1
    );

  const currentBase =
    (level - 1) * 250;

  const nextBase =
    level * 250;

  const progress =
    Math.round(
      (
        xp -
        currentBase
      ) /
      250 *
      100
    );

  const names = {

    1: "Başlangıç",
    5: "Çalışkan",
    10: "Ders Ustası",
    20: "Başarı Avcısı",
    50: "Efsane Öğrenci 👑"

  };

  let name =
    "Başlangıç";

  Object.keys(names)
    .map(Number)
    .sort((a,b) => a-b)
    .forEach(n => {

      if (level >= n) {
        name = names[n];
      }

    });

  return {

    number: level,

    name,

    progress:
      Math.max(
        0,
        Math.min(
          100,
          progress
        )
      ),

    remaining:
      Math.max(
        0,
        nextBase - xp
      )

  };
}


// ======================================================
// STREAK
// ======================================================

function getStreak() {

  return Number(
    getLocal(
      "streak",
      0
    )
  );
}


// ======================================================
// COINS
// ======================================================

function getCoins() {

  return Number(
    getLocal(
      "coins",
      0
    )
  );
}


function updateCoinDisplay() {

  const mobile =
    document.getElementById(
      "mobileCoins"
    );

  if (mobile) {

    mobile.textContent =
      `🪙 ${getCoins()}`;

  }
}


// ======================================================
// EXAM HELPERS
// ======================================================

function getNextExam() {

  const future =
    exams
      .filter(
        exam =>
          daysUntil(
            exam.exam_date
          ) >= 0
      )
      .sort(
        (a,b) =>
          new Date(a.exam_date) -
          new Date(b.exam_date)
      );

  return future[0] || null;
}


function renderExamMini(exam) {

  const days =
    daysUntil(
      exam.exam_date
    );

  return `

    <div
      style="
        padding:15px;
        border-radius:15px;
        background:#f4f2ff;
      "
    >

      <strong>
        ${escapeHtml(exam.title)}
      </strong>

      <p
        style="
          color:var(--muted);
          margin:7px 0;
        "
      >
        ${exam.subject_name || ""}
      </p>

      <div
        style="
          color:var(--primary);
          font-size:30px;
          font-weight:950;
        "
      >
        ${days === 0 ? "BUGÜN" : days + " GÜN"}
      </div>

      <button
        class="btn btn-soft"
        onclick="navigate('exams')"
      >
        Sınavı Gör
      </button>

    </div>
  `;
}


function daysUntil(date) {

  const today =
    new Date();

  today.setHours(
    0,0,0,0
  );

  const target =
    new Date(date);

  target.setHours(
    0,0,0,0
  );

  return Math.ceil(
    (
      target - today
    ) /
    (1000 * 60 * 60 * 24)
  );
}


function formatDate(date) {

  try {

    return new Date(date)
      .toLocaleDateString(
        "tr-TR",
        {
          day:"numeric",
          month:"long",
          year:"numeric"
        }
      );

  } catch {

    return date;
  }
}


// ======================================================
// WEEKLY STUDY
// ======================================================

function getWeeklyStudy() {

  const days = [
    "Pzt",
    "Sal",
    "Çar",
    "Per",
    "Cum",
    "Cmt",
    "Paz"
  ];

  const result =
    days.map(
      label => ({
        label,
        minutes: 0
      })
    );

  sessions.forEach(
    session => {

      const date =
        new Date(
          session.created_at
        );

      const day =
        date.getDay();

      const index =
        day === 0
          ? 6
          : day - 1;

      if (
        index >= 0 &&
        index < 7
      ) {

        result[index].minutes +=
          Number(
            session.duration_minutes ||
            0
          );

      }

    }
  );

  return result;
}


// ======================================================
// FOCUS HELPERS
// ======================================================

function formatTimer(seconds) {

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return (
    String(mins).padStart(2,"0") +
    ":" +
    String(secs).padStart(2,"0")
  );
}


// ======================================================
// MOBILE MENU
// ======================================================

function toggleMobileMenu() {

  document
    .getElementById("sidebar")
    .classList.toggle("open");

  document
    .getElementById("mobileOverlay")
    .classList.toggle("open");
}


function closeMobileMenu() {

  document
    .getElementById("sidebar")
    .classList.remove("open");

  document
    .getElementById("mobileOverlay")
    .classList.remove("open");
}


// ======================================================
// DARK MODE
// ======================================================

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  localStorage.setItem(
    "ders_dark_mode",
    document.body.classList.contains(
      "dark"
    )
      ? "1"
      : "0"
  );

  showToast(
    document.body.classList.contains("dark")
      ? "🌙 Karanlık tema açıldı."
      : "☀️ Açık tema açıldı."
  );
}


function loadDarkMode() {

  if (
    localStorage.getItem(
      "ders_dark_mode"
    ) === "1"
  ) {

    document.body.classList.add(
      "dark"
    );

  }
}


// ======================================================
// TOAST
// ======================================================

let toastTimer = null;

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );
}


// ======================================================
// LOGOUT
// ======================================================

async function logout() {

  await api(
    "logout",
    {
      method:"POST"
    }
  );

  location.reload();
}


// ======================================================
// HTML SECURITY
// ======================================================

function escapeHtml(value) {

  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


// ======================================================
// INITIAL
// ======================================================

loadDarkMode();


// ======================================================
// CHECK SESSION
// ======================================================

(async function checkSession() {

  const result =
    await api("me");

  if (
    result.response.ok &&
    result.data.user
  ) {

    currentUser =
      result.data.user;

    await startApp();

  }

})();
