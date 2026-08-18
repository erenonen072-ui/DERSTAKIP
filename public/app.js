// ==========================================
// DERS TAKİP 2.0 - APP.JS
// ==========================================

// ==========================================
// API
// ==========================================

const API = "/api/index";

let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];
let sessions = [];
let stats = null;


// ==========================================
// API İSTEĞİ
// ==========================================

async function api(action, options = {}) {
  try {
    const config = {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };

    if (
      config.body &&
      typeof config.body !== "string"
    ) {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(
      `${API}?action=${encodeURIComponent(action)}`,
      config
    );

    const data = await response
      .json()
      .catch(() => ({}));

    return {
      response,
      data
    };

  } catch (error) {
    console.error("API ERROR:", error);

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
// DOM
// ==========================================

function $(id) {
  return document.getElementById(id);
}


// ==========================================
// SAYFA BAŞLANGICI
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { response, data } = await api("me");

    if (response.ok && data.success && data.user) {
      currentUser = data.user;

      showApp();

      await loadApp();
    } else {
      showAuth();
    }

  } catch (error) {
    console.error(error);
    showAuth();
  }
});


// ==========================================
// AUTH GÖRÜNÜMÜ
// ==========================================

function showAuth() {
  if ($("authScreen")) {
    $("authScreen").style.display = "flex";
  }

  if ($("app")) {
    $("app").style.display = "none";
  }
}


function showApp() {
  if ($("authScreen")) {
    $("authScreen").style.display = "none";
  }

  if ($("app")) {
    $("app").style.display = "block";
  }
}


// ==========================================
// LOGIN / REGISTER TAB
// ==========================================

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


// ==========================================
// LOGIN
// ==========================================

async function login(event) {
  event.preventDefault();

  const email =
    $("loginEmail")?.value.trim();

  const password =
    $("loginPassword")?.value;

  const message = $("authMessage");

  if (!email || !password) {
    if (message) {
      message.textContent =
        "E-posta ve şifre gerekli.";
      message.style.color = "#ff5b6e";
    }
    return;
  }

  if (message) {
    message.textContent = "Giriş yapılıyor...";
    message.style.color = "#6658f5";
  }

  const { response, data } = await api("login", {
    method: "POST",
    body: {
      email,
      password
    }
  });

  if (!response.ok || !data.success) {
    if (message) {
      message.textContent =
        data.message || "Giriş başarısız.";
      message.style.color = "#ff5b6e";
    }

    return;
  }

  currentUser = data.user;

  if (message) {
    message.textContent =
      "Giriş başarılı! 🚀";
    message.style.color = "#20c997";
  }

  showApp();

  await loadApp();
}


// ==========================================
// REGISTER
// ==========================================

async function register(event) {
  event.preventDefault();

  const name =
    $("registerName")?.value.trim();

  const email =
    $("registerEmail")?.value.trim();

  const password =
    $("registerPassword")?.value;

  const message = $("authMessage");

  if (!name || !email || !password) {
    if (message) {
      message.textContent =
        "Tüm alanları doldur.";
      message.style.color = "#ff5b6e";
    }

    return;
  }

  if (password.length < 6) {
    if (message) {
      message.textContent =
        "Şifre en az 6 karakter olmalı.";
      message.style.color = "#ff5b6e";
    }

    return;
  }

  if (message) {
    message.textContent =
      "Hesap oluşturuluyor...";
    message.style.color = "#6658f5";
  }

  const { response, data } = await api("register", {
    method: "POST",
    body: {
      name,
      email,
      password
    }
  });

  if (!response.ok || !data.success) {
    if (message) {
      message.textContent =
        data.message || "Kayıt başarısız.";
      message.style.color = "#ff5b6e";
    }

    return;
  }

  currentUser = data.user;

  if (message) {
    message.textContent =
      "Hesabın oluşturuldu! 🎉";
    message.style.color = "#20c997";
  }

  showApp();

  await loadApp();
}


// ==========================================
// LOGOUT
// ==========================================

async function logout() {
  await api("logout", {
    method: "POST"
  });

  currentUser = null;

  tasks = [];
  subjects = [];
  exams = [];
  sessions = [];

  showAuth();

  showLogin();

  if ($("loginEmail")) {
    $("loginEmail").value = "";
  }

  if ($("loginPassword")) {
    $("loginPassword").value = "";
  }
}


// ==========================================
// UYGULAMAYI YÜKLE
// ==========================================

async function loadApp() {
  try {
    await Promise.all([
      loadUser(),
      loadTasks(),
      loadSubjects(),
      loadExams(),
      loadSessions(),
      loadStats()
    ]);

    updateDashboard();

  } catch (error) {
    console.error(
      "Uygulama yükleme hatası:",
      error
    );
  }
}


// ==========================================
// USER
// ==========================================

async function loadUser() {
  const { response, data } =
    await api("me");

  if (!response.ok || !data.success) {
    return;
  }

  currentUser = data.user;

  updateUserUI();
}


function updateUserUI() {
  if (!currentUser) return;

  const name =
    currentUser.name || "Öğrenci";

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
  }

  const xp =
    Number(currentUser.xp) || 0;

  const level =
    Math.floor(xp / 250) + 1;

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${level}`;
  }

  if ($("statXP")) {
    $("statXP").textContent =
      xp;
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      currentUser.streak || 0;
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent =
      currentUser.streak || 0;
  }
}


// ==========================================
// TASKS
// ==========================================

async function loadTasks() {
  const { response, data } =
    await api("tasks");

  if (!response.ok || !data.success) {
    console.error(
      data.message || "Görevler alınamadı."
    );

    return;
  }

  tasks = data.tasks || [];

  renderTasks();
}


function renderTasks() {
  const list = $("taskList");

  if (!list) return;

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `
      <div style="
        padding:25px 10px;
        text-align:center;
        color:#8991a5;
      ">
        Henüz görev yok.<br>
        İlk görevini ekle! 🚀
      </div>
    `;

    updateTaskStats();
    return;
  }

  tasks.forEach(task => {
    const item =
      document.createElement("div");

    item.className =
      `task ${task.completed ? "completed" : ""}`;

    item.innerHTML = `
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

        <div class="task-subject">
          ${task.completed
            ? "Tamamlandı 🎉"
            : "Henüz tamamlanmadı"}
        </div>
      </div>

      <div class="task-xp">
        +${Number(task.xp) || 50} XP
      </div>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
        title="Sil"
      >
        🗑️
      </button>
    `;

    list.appendChild(item);
  });

  updateTaskStats();
}


// ==========================================
// TASK EKLE
// ==========================================

async function addTask() {
  const input = $("newTask");

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {
    alert("Önce bir görev yaz.");
    input.focus();
    return;
  }

  const { response, data } =
    await api("tasks", {
      method: "POST",
      body: {
        title
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Görev eklenemedi."
    );

    return;
  }

  input.value = "";

  await loadTasks();
  await loadUser();

  updateDashboard();
}


// ==========================================
// TASK TAMAMLA
// ==========================================

async function toggleTask(id) {
  const { response, data } =
    await api("tasks", {
      method: "PATCH",
      body: {
        id
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Görev güncellenemedi."
    );

    return;
  }

  await loadTasks();
  await loadUser();
  await loadStats();

  updateDashboard();

  if (data.completed) {
    showXPAnimation();
  }
}


// ==========================================
// TASK SİL
// ==========================================

async function deleteTask(id) {
  if (!confirm("Bu görevi silmek istiyor musun?")) {
    return;
  }

  const { response, data } =
    await api("tasks", {
      method: "DELETE",
      body: {
        id
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Görev silinemedi."
    );

    return;
  }

  await loadTasks();
  await loadUser();
  await loadStats();

  updateDashboard();
}


// ==========================================
// TASK İSTATİSTİKLERİ
// ==========================================

function updateTaskStats() {
  const total =
    tasks.length;

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  if ($("taskCounter")) {
    $("taskCounter").textContent =
      `${completed} / ${total}`;
  }

  if ($("statTasks")) {
    $("statTasks").textContent =
      completed;
  }

  if ($("taskSummary")) {
    if (total === 0) {
      $("taskSummary").textContent =
        "Bugün için görev eklemeye başla. 🎯";
    } else if (completed === total) {
      $("taskSummary").textContent =
        "Harika! Bugünkü tüm görevlerini tamamladın! 🏆";
    } else {
      $("taskSummary").textContent =
        `${completed}/${total} görev tamamlandı. Devam et! 💪`;
    }
  }

  if ($("progressBar")) {
    const percent =
      total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
          );

    $("progressBar").style.width =
      `${percent}%`;
  }
}


// ==========================================
// SUBJECTS
// ==========================================

async function loadSubjects() {
  const { response, data } =
    await api("subjects");

  if (!response.ok || !data.success) {
    return;
  }

  subjects = data.subjects || [];
}


async function addSubject() {
  const input =
    document.getElementById("subjectName");

  const color =
    document.getElementById("subjectColor");

  if (!input) return;

  const name =
    input.value.trim();

  if (!name) {
    alert("Ders adı yaz.");
    return;
  }

  const { response, data } =
    await api("subjects", {
      method: "POST",
      body: {
        name,
        color: color
          ? color.value
          : "#6c63ff"
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Ders eklenemedi."
    );

    return;
  }

  await loadSubjects();

  showSubjects();
}


async function deleteSubject(id) {
  if (!confirm("Bu dersi silmek istiyor musun?")) {
    return;
  }

  const { response, data } =
    await api("subjects", {
      method: "DELETE",
      body: {
        id
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Ders silinemedi."
    );

    return;
  }

  await loadSubjects();

  showSubjects();
}


// ==========================================
// EXAMS
// ==========================================

async function loadExams() {
  const { response, data } =
    await api("exams");

  if (!response.ok || !data.success) {
    return;
  }

  exams = data.exams || [];
}


async function addExam() {
  const title =
    document.getElementById("examTitle")?.value.trim();

  const date =
    document.getElementById("examDate")?.value;

  const subjectId =
    document.getElementById("examSubject")?.value;

  const topic =
    document.getElementById("examTopic")?.value.trim();

  if (!title || !date) {
    alert("Sınav adı ve tarih gerekli.");
    return;
  }

  const { response, data } =
    await api("exams", {
      method: "POST",
      body: {
        title,
        exam_date: date,
        subject_id:
          subjectId
            ? Number(subjectId)
            : null,
        topic:
          topic || null
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Sınav eklenemedi."
    );

    return;
  }

  await loadExams();

  showExams();
}


async function deleteExam(id) {
  if (!confirm("Bu sınavı silmek istiyor musun?")) {
    return;
  }

  const { response, data } =
    await api("exams", {
      method: "DELETE",
      body: {
        id
      }
    });

  if (!response.ok || !data.success) {
    alert(
      data.message ||
      "Sınav silinemedi."
    );

    return;
  }

  await loadExams();

  showExams();
}


// ==========================================
// STUDY SESSIONS
// ==========================================

async function loadSessions() {
  const { response, data } =
    await api("sessions");

  if (!response.ok || !data.success) {
    return;
  }

  sessions = data.sessions || [];
}


// ==========================================
// ODAKLANMA
// ==========================================

let focusTimer = null;
let focusSeconds = 25 * 60;
let focusRunning = false;


function showFocus(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  section.innerHTML = `
    <div class="card-title">
      <h2>⏱️ Odaklanma Modu</h2>
    </div>

    <div style="
      text-align:center;
      padding:15px 5px;
    ">

      <div id="focusTimer"
        style="
          font-size:64px;
          font-weight:950;
          margin:20px 0;
        ">
        25:00
      </div>

      <p style="
        color:#7d8498;
        margin-bottom:20px;
      ">
        Telefonunu bırak ve dersine odaklan. 🔥
      </p>

      <div style="
        display:flex;
        justify-content:center;
        gap:10px;
        flex-wrap:wrap;
      ">

        <button
          onclick="startFocus()"
          style="
            border:none;
            background:#6658f5;
            color:white;
            padding:13px 22px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ▶ Başlat
        </button>

        <button
          onclick="pauseFocus()"
          style="
            border:none;
            background:#edf0f7;
            padding:13px 22px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ⏸ Duraklat
        </button>

        <button
          onclick="resetFocus()"
          style="
            border:none;
            background:#ffecef;
            color:#ff5b6e;
            padding:13px 22px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ↻ Sıfırla
        </button>

      </div>

    </div>
  `;
}


function updateFocusTimer() {
  const timer =
    $("focusTimer");

  if (!timer) return;

  const minutes =
    Math.floor(focusSeconds / 60);

  const seconds =
    focusSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function startFocus() {
  if (focusRunning) return;

  focusRunning = true;

  focusTimer = setInterval(async () => {
    focusSeconds--;

    updateFocusTimer();

    if (focusSeconds <= 0) {
      clearInterval(focusTimer);

      focusRunning = false;

      await finishFocus();

      alert(
        "🎉 Harika! 25 dakikalık odaklanmayı tamamladın!"
      );

      resetFocus();
    }
  }, 1000);
}


function pauseFocus() {
  if (focusTimer) {
    clearInterval(focusTimer);
  }

  focusRunning = false;
}


function resetFocus() {
  if (focusTimer) {
    clearInterval(focusTimer);
  }

  focusRunning = false;
  focusSeconds = 25 * 60;

  updateFocusTimer();
}


async function finishFocus() {
  const { response, data } =
    await api("sessions", {
      method: "POST",
      body: {
        duration_minutes: 25
      }
    });

  if (response.ok && data.success) {
    await loadUser();
    await loadSessions();
    await loadStats();

    updateDashboard();

    showXPAnimation();
  }
}


// ==========================================
// STATS
// ==========================================

async function loadStats() {
  const { response, data } =
    await api("stats");

  if (!response.ok || !data.success) {
    return;
  }

  stats = data.stats;
}


function showStats(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const taskTotal =
    stats?.tasks?.total || 0;

  const taskCompleted =
    stats?.tasks?.completed || 0;

  const minutes =
    stats?.sessions?.minutes || 0;

  const sessionCount =
    stats?.sessions?.sessions || 0;

  section.innerHTML = `
    <div class="card-title">
      <h2>📊 İstatistikler</h2>
    </div>

    <div style="
      display:grid;
      grid-template-columns:
      repeat(auto-fit,minmax(150px,1fr));
      gap:12px;
    ">

      ${statBox(
        "⭐",
        currentUser?.xp || 0,
        "Toplam XP"
      )}

      ${statBox(
        "📝",
        taskCompleted,
        "Tamamlanan görev"
      )}

      ${statBox(
        "📚",
        stats?.subjects || 0,
        "Ders"
      )}

      ${statBox(
        "📅",
        stats?.exams || 0,
        "Sınav"
      )}

      ${statBox(
        "⏱️",
        minutes,
        "Çalışma dakikası"
      )}

      ${statBox(
        "🎯",
        sessionCount,
        "Odaklanma"
      )}

    </div>

    <div style="
      margin-top:20px;
      padding:18px;
      background:#f6f5ff;
      border-radius:16px;
    ">
      <strong>📈 Görev başarı oranı</strong>

      <div style="
        margin-top:12px;
        height:10px;
        background:#e4e2f7;
        border-radius:20px;
        overflow:hidden;
      ">
        <div style="
          width:${
            taskTotal
              ? Math.round(
                  taskCompleted /
                  taskTotal *
                  100
                )
              : 0
          }%;
          height:100%;
          background:#6658f5;
        "></div>
      </div>

      <small style="
        display:block;
        margin-top:8px;
        color:#7d8498;
      ">
        ${
          taskTotal
            ? Math.round(
                taskCompleted /
                taskTotal *
                100
              )
            : 0
        }% tamamlandı
      </small>
    </div>
  `;
}


function statBox(icon, value, label) {
  return `
    <div style="
      background:#f8f9fc;
      border:1px solid #e8ebf3;
      border-radius:16px;
      padding:18px;
    ">
      <div style="font-size:24px">
        ${icon}
      </div>

      <strong style="
        display:block;
        font-size:26px;
        margin-top:8px;
      ">
        ${value}
      </strong>

      <small style="
        color:#7d8498;
      ">
        ${label}
      </small>
    </div>
  `;
}


// ==========================================
// DERSLER SAYFASI
// ==========================================

function showSubjects(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  let list = "";

  if (subjects.length === 0) {
    list = `
      <div style="
        text-align:center;
        padding:20px;
        color:#8991a5;
      ">
        Henüz ders eklenmemiş. 📚
      </div>
    `;
  } else {
    list = subjects.map(subject => `
      <div style="
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px 0;
        border-bottom:1px solid #edf0f5;
      ">

        <div style="
          width:40px;
          height:40px;
          border-radius:12px;
          background:${escapeAttribute(
            subject.color || "#6658f5"
          )};
          display:grid;
          place-items:center;
          color:white;
          font-weight:900;
        ">
          📚
        </div>

        <strong>
          ${escapeHTML(subject.name)}
        </strong>

        <button
          onclick="deleteSubject(${subject.id})"
          style="
            margin-left:auto;
            border:none;
            background:#fff0f2;
            color:#ff5b6e;
            padding:8px 11px;
            border-radius:9px;
          "
        >
          🗑️
        </button>

      </div>
    `).join("");
  }

  section.innerHTML = `
    <div class="card-title">
      <h2>📚 Derslerim</h2>
    </div>

    <div style="
      display:flex;
      gap:8px;
      margin-bottom:15px;
    ">
      <input
        id="subjectName"
        placeholder="Örn. Matematik"
        maxlength="100"
        style="
          flex:1;
          min-width:0;
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <input
        id="subjectColor"
        type="color"
        value="#6658f5"
        style="
          width:48px;
          border:none;
          background:transparent;
        "
      >

      <button
        onclick="addSubject()"
        style="
          border:none;
          background:#6658f5;
          color:white;
          padding:12px 16px;
          border-radius:11px;
          font-weight:900;
        "
      >
        + Ekle
      </button>
    </div>

    ${list}
  `;
}


// ==========================================
// SINAVLAR
// ==========================================

function showExams(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  let list = "";

  if (exams.length === 0) {
    list = `
      <div style="
        text-align:center;
        padding:20px;
        color:#8991a5;
      ">
        Henüz sınav eklenmemiş. 📅
      </div>
    `;
  } else {
    list = exams.map(exam => {
      const days =
        daysUntil(exam.exam_date);

      let color = "#6658f5";

      if (days <= 3) {
        color = "#ff5b6e";
      } else if (days <= 7) {
        color = "#f59f00";
      }

      return `
        <div style="
          padding:16px 0;
          border-bottom:1px solid #edf0f5;
        ">

          <div style="
            display:flex;
            align-items:center;
            gap:10px;
          ">

            <strong>
              ${escapeHTML(exam.title)}
            </strong>

            <span style="
              margin-left:auto;
              background:${color}15;
              color:${color};
              padding:6px 10px;
              border-radius:20px;
              font-size:12px;
              font-weight:800;
            ">
              ${
                days < 0
                  ? "Geçti"
                  : days === 0
                  ? "Bugün!"
                  : `${days} gün kaldı`
              }
            </span>

          </div>

          <div style="
            margin-top:6px;
            color:#7d8498;
            font-size:13px;
          ">
            📅 ${formatDate(exam.exam_date)}
            ${
              exam.topic
                ? ` · 📖 ${escapeHTML(exam.topic)}`
                : ""
            }
          </div>

          <button
            onclick="deleteExam(${exam.id})"
            style="
              margin-top:10px;
              border:none;
              background:#fff0f2;
              color:#ff5b6e;
              padding:7px 10px;
              border-radius:8px;
            "
          >
            🗑️ Sil
          </button>

        </div>
      `;
    }).join("");
  }

  const subjectOptions =
    subjects.map(subject => `
      <option value="${subject.id}">
        ${escapeHTML(subject.name)}
      </option>
    `).join("");

  section.innerHTML = `
    <div class="card-title">
      <h2>📅 Sınavlar</h2>
    </div>

    <div style="
      display:grid;
      gap:9px;
      margin-bottom:20px;
    ">

      <input
        id="examTitle"
        placeholder="Sınav adı"
        maxlength="255"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <input
        id="examDate"
        type="date"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <select
        id="examSubject"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
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
        maxlength="255"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <button
        onclick="addExam()"
        style="
          border:none;
          background:#6658f5;
          color:white;
          padding:13px;
          border-radius:11px;
          font-weight:900;
        "
      >
        + Sınav Ekle
      </button>

    </div>

    ${list}
  `;
}


// ==========================================
// 🤖 DERS KOÇU
// ==========================================

function showCoach(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  section.innerHTML = `
    <div class="card-title">
      <h2>🤖 Ders Koçu</h2>
      <span>AI Koç</span>
    </div>

    <div style="
      background:
        linear-gradient(
          135deg,
          #6658f5,
          #9275ff
        );
      color:white;
      padding:20px;
      border-radius:18px;
      margin-bottom:15px;
    ">
      <div style="
        font-size:34px;
        margin-bottom:8px;
      ">
        🤖
      </div>

      <h3>
        Merhaba ${escapeHTML(
          currentUser?.name || "öğrenci"
        )}!
      </h3>

      <p style="
        opacity:.9;
        margin-top:7px;
        line-height:1.5;
      ">
        Ders durumunu analiz edip sana
        çalışma önerileri hazırlayabilirim.
      </p>
    </div>

    <div style="
      display:grid;
      gap:10px;
    ">

      <button
        onclick="coachAnalyze()"
        style="
          border:none;
          background:#f0efff;
          color:#6257df;
          padding:15px;
          border-radius:13px;
          text-align:left;
          font-weight:800;
        "
      >
        📊 Ders durumumu analiz et
      </button>

      <button
        onclick="coachExamPlan()"
        style="
          border:none;
          background:#fff4df;
          color:#c47b00;
          padding:15px;
          border-radius:13px;
          text-align:left;
          font-weight:800;
        "
      >
        📅 Sınavlarıma göre plan yap
      </button>

      <button
        onclick="coachToday()"
        style="
          border:none;
          background:#e9fbf5;
          color:#14956e;
          padding:15px;
          border-radius:13px;
          text-align:left;
          font-weight:800;
        "
      >
        🎯 Bugün ne çalışmalıyım?
      </button>

      <button
        onclick="coachMotivation()"
        style="
          border:none;
          background:#fff0f2;
          color:#e44d61;
          padding:15px;
          border-radius:13px;
          text-align:left;
          font-weight:800;
        "
      >
        🔥 Bana motivasyon ver
      </button>

    </div>

    <div
      id="coachResult"
      style="margin-top:15px;"
    ></div>
  `;
}


function coachAnalyze() {
  const result =
    $("coachResult");

  if (!result) return;

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const examCount =
    exams.length;

  const xp =
    Number(currentUser?.xp) || 0;

  let message = "";

  if (total === 0) {
    message =
      "Henüz görev eklememişsin. İlk olarak 3 küçük görev oluşturmanı öneriyorum. 🎯";
  } else if (completed === total) {
    message =
      "Mükemmel gidiyorsun! Bugünkü görevlerinin tamamını bitirmişsin. Şimdi 25 dakikalık odaklanma yapabilirsin. 🏆";
  } else {
    const remaining =
      total - completed;

    message =
      `${remaining} görevin kaldı. Önce en kolay görevi tamamla, sonra zor olana geç. Böylece başlaman daha kolay olur. 💪`;
  }

  result.innerHTML = coachBox(`
    <strong>🤖 Koç Analizi</strong>

    <p style="
      margin-top:8px;
      line-height:1.6;
    ">
      ${message}
    </p>

    <p style="
      margin-top:10px;
      color:#7d8498;
      font-size:13px;
    ">
      XP: ${xp} · Ders: ${subjects.length} · Sınav: ${examCount}
    </p>
  `);
}


function coachToday() {
  const result =
    $("coachResult");

  if (!result) return;

  const incomplete =
    tasks.filter(
      t => !t.completed
    );

  if (incomplete.length === 0) {
    result.innerHTML = coachBox(`
      <strong>🎉 Bugünkü görevlerin bitti!</strong>
      <p style="
        margin-top:8px;
        line-height:1.6;
      ">
        Şimdi 25 dakika tekrar yap veya
        biraz dinlen. Bugünü başarıyla tamamladın!
      </p>
    `);

    return;
  }

  const task =
    incomplete[0];

  result.innerHTML = coachBox(`
    <strong>🎯 Bugün bununla başla:</strong>

    <p style="
      font-size:18px;
      font-weight:900;
      margin-top:10px;
    ">
      ${escapeHTML(task.title)}
    </p>

    <p style="
      margin-top:8px;
      color:#7d8498;
      line-height:1.5;
    ">
      Bu görevi tamamla, ardından
      bir sonraki göreve geç.
    </p>
  `);
}


function coachExamPlan() {
  const result =
    $("coachResult");

  if (!result) return;

  if (exams.length === 0) {
    result.innerHTML = coachBox(`
      <strong>📅 Henüz sınav yok.</strong>

      <p style="
        margin-top:8px;
        line-height:1.6;
      ">
        Önce Sınavlar bölümünden yaklaşan
        sınavlarını ekle. Sonra sana
        çalışma planı çıkarabilirim.
      </p>
    `);

    return;
  }

  const upcoming =
    exams
      .filter(
        exam =>
          daysUntil(exam.exam_date) >= 0
      )
      .sort(
        (a, b) =>
          new Date(a.exam_date) -
          new Date(b.exam_date)
      );

  if (upcoming.length === 0) {
    result.innerHTML = coachBox(`
      <strong>🎉 Yaklaşan sınav görünmüyor.</strong>
    `);

    return;
  }

  const exam =
    upcoming[0];

  const days =
    daysUntil(exam.exam_date);

  result.innerHTML = coachBox(`
    <strong>📚 Öncelikli sınavın:</strong>

    <p style="
      font-size:18px;
      font-weight:900;
      margin-top:10px;
    ">
      ${escapeHTML(exam.title)}
    </p>

    <p style="
      margin-top:8px;
      line-height:1.6;
    ">
      Sınava ${
        days === 0
          ? "bugün"
          : `${days} gün`
      } kaldı.

      Bugün en az 25 dakika
      bu sınava çalışmanı öneriyorum.
    </p>
  `);
}


function coachMotivation() {
  const result =
    $("coachResult");

  if (!result) return;

  const messages = [
    "Bugün mükemmel olmak zorunda değilsin. Sadece başlaman yeterli. 🚀",
    "10 dakika çalışmak, hiç çalışmamaktan daha iyidir. Hadi başlayalım! 💪",
    "Her tamamladığın görev seni hedeflerine biraz daha yaklaştırıyor. 🎯",
    "Telefonu bırak, 25 dakika odaklan ve kendine bir şans ver. 🔥",
    "Bugünkü küçük başarın yarının büyük başarısına dönüşebilir. ⭐"
  ];

  const random =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  result.innerHTML = coachBox(`
    <strong>🔥 Ders Koçundan:</strong>

    <p style="
      font-size:18px;
      font-weight:800;
      line-height:1.6;
      margin-top:10px;
    ">
      ${random}
    </p>
  `);
}


function coachBox(content) {
  return `
    <div style="
      background:#f8f9fc;
      border:1px solid #e8ebf3;
      padding:18px;
      border-radius:16px;
    ">
      ${content}
    </div>
  `;
}


// ==========================================
// PROFİL
// ==========================================

function showProfile(button) {
  activateMenu(button);

  hideMainSections();

  const section =
    $("dynamicSection");

  if (!section) return;

  section.style.display = "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const level =
    Math.floor(xp / 250) + 1;

  const nextXP =
    level * 250;

  const progress =
    Math.min(
      100,
      Math.round(
        (xp % 250) / 250 * 100
      )
    );

  section.innerHTML = `
    <div class="card-title">
      <h2>👤 Profilim</h2>
    </div>

    <div style="
      text-align:center;
      padding:15px;
    ">

      <div style="
        width:80px;
        height:80px;
        border-radius:50%;
        background:#e7e4ff;
        display:grid;
        place-items:center;
        margin:auto;
        font-size:38px;
      ">
        🎓
      </div>

      <h2 style="margin-top:12px;">
        ${escapeHTML(
          currentUser?.name || "Öğrenci"
        )}
      </h2>

      <p style="
        color:#7d8498;
        margin-top:5px;
      ">
        ${escapeHTML(
          currentUser?.email || ""
        )}
      </p>

      <div style="
        margin-top:20px;
        padding:18px;
        background:#f7f6ff;
        border-radius:16px;
      ">

        <strong>
          Seviye ${level}
        </strong>

        <div style="
          height:10px;
          background:#dedbff;
          border-radius:20px;
          overflow:hidden;
          margin-top:12px;
        ">
          <div style="
            width:${progress}%;
            height:100%;
            background:#6658f5;
          "></div>
        </div>

        <small style="
          display:block;
          margin-top:8px;
          color:#7d8498;
        ">
          ${xp} XP / ${nextXP} XP
        </small>

      </div>

    </div>
  `;
}


// ==========================================
// ANA SAYFA
// ==========================================

function goHome(button) {
  activateMenu(button);

  if ($("tasksSection")) {
    $("tasksSection").style.display =
      "block";
  }

  if ($("dynamicSection")) {
    $("dynamicSection").style.display =
      "none";
  }

  updateDashboard();
}


// ==========================================
// GÖREVLER SAYFASI
// ==========================================

function showTasks(button) {
  activateMenu(button);

  if ($("tasksSection")) {
    $("tasksSection").style.display =
      "block";
  }

  if ($("dynamicSection")) {
    $("dynamicSection").style.display =
      "none";
  }

  renderTasks();
}


// ==========================================
// MENÜ
// ==========================================

function activateMenu(button) {
  document
    .querySelectorAll(".menu button, .mobile-nav button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  }
}


function hideMainSections() {
  if ($("tasksSection")) {
    $("tasksSection").style.display =
      "none";
  }

  if ($("dynamicSection")) {
    $("dynamicSection").style.display =
      "none";
  }
}


// ==========================================
// MOBİL / DİNAMİK MENÜ İÇİN EKLEME
// ==========================================

function addCoachMenuButton() {
  const menus =
    document.querySelectorAll(".menu");

  menus.forEach(menu => {
    if (
      menu.querySelector(
        '[data-coach-button]'
      )
    ) {
      return;
    }

    const button =
      document.createElement("button");

    button.setAttribute(
      "data-coach-button",
      "true"
    );

    button.innerHTML =
      "🤖 Ders Koçu";

    button.onclick =
      () => showCoach(button);

    menu.appendChild(button);
  });
}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {
  updateUserUI();
  updateTaskStats();
}


// ==========================================
// XP ANİMASYONU
// ==========================================

function showXPAnimation() {
  const popup =
    document.createElement("div");

  popup.textContent =
    "+ XP 🎉";

  popup.style.position =
    "fixed";

  popup.style.right =
    "25px";

  popup.style.top =
    "90px";

  popup.style.zIndex =
    "99999";

  popup.style.background =
    "#20c997";

  popup.style.color =
    "white";

  popup.style.padding =
    "12px 18px";

  popup.style.borderRadius =
    "14px";

  popup.style.fontWeight =
    "900";

  popup.style.boxShadow =
    "0 12px 30px #0002";

  popup.style.animation =
    "xpPop 1.5s ease forwards";

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 1600);
}


// ==========================================
// TARİH
// ==========================================

function daysUntil(date) {
  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const target =
    new Date(date);

  target.setHours(
    0,
    0,
    0,
    0
  );

  const diff =
    target.getTime() -
    today.getTime();

  return Math.ceil(
    diff / 86400000
  );
}


function formatDate(date) {
  if (!date) return "-";

  const d =
    new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString(
    "tr-TR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  );
}


// ==========================================
// GÜVENLİ HTML
// ==========================================

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {
  return escapeHTML(value);
}


// ==========================================
// CSS ANİMASYONU
// ==========================================

(function addExtraStyles() {
  const style =
    document.createElement("style");

  style.textContent = `
    @keyframes xpPop {
      0% {
        opacity:0;
        transform:translateY(20px) scale(.8);
      }

      20% {
        opacity:1;
        transform:translateY(0) scale(1);
      }

      80% {
        opacity:1;
        transform:translateY(-15px) scale(1);
      }

      100% {
        opacity:0;
        transform:translateY(-35px) scale(.9);
      }
    }

    button {
      transition:
        transform .15s ease,
        opacity .15s ease;
    }

    button:active {
      transform:scale(.97);
    }
  `;

  document.head.appendChild(style);
})();


// ==========================================
// DERS KOÇU MENÜSÜNÜ EKLE
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setTimeout(() => {
      addCoachMenuButton();
    }, 300);
  }
);
