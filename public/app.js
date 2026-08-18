// ======================================================
// DERS TAKİP 2.0 - APP.JS
// Mini Quiz YOK
// ======================================================

const API = "/api";

// ======================================================
// GLOBAL
// ======================================================

let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];
let sessions = [];
let stats = null;

let timerInterval = null;
let timerSeconds = 25 * 60;
let timerRunning = false;

const motivationalMessages = [
  "Bugün küçük bir adım, yarın büyük bir başarı! 🚀",
  "Başlamak, başarmanın yarısıdır. 💪",
  "Bugünkü çalışman gelecekteki seni güçlendiriyor. 🌟",
  "Bir görev daha tamamla ve seviyeni yükselt! ⭐",
  "Pes etme. Her dakika seni hedeflerine yaklaştırıyor. 🎯",
  "Düzenli çalışmak, uzun çalışmaktan daha güçlüdür. 🧠",
  "Bugün dünden daha iyi ol! 🔥"
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

    const data = await response.json().catch(() => ({}));

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
        message: "Sunucuya bağlanılamadı."
      }
    };
  }
}

// ======================================================
// AUTH
// ======================================================

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");

  setAuthMessage("");
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";

  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");

  setAuthMessage("");
}

function setAuthMessage(message, type = "") {
  const box = document.getElementById("authMessage");

  if (!box) return;

  box.textContent = message;

  if (type === "error") {
    box.style.color = "#ff5b6e";
  } else if (type === "success") {
    box.style.color = "#20c997";
  } else {
    box.style.color = "#7d8498";
  }
}

async function login(event) {
  event.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  setAuthMessage("Giriş yapılıyor...");

  const { response, data } = await api("login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    setAuthMessage(
      data.message || "Giriş yapılamadı.",
      "error"
    );
    return;
  }

  currentUser = data.user;

  setAuthMessage(
    "Giriş başarılı! 🎉",
    "success"
  );

  await startApp();
}

async function register(event) {
  event.preventDefault();

  const name =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;

  setAuthMessage("Hesap oluşturuluyor...");

  const { response, data } = await api("register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  if (!response.ok) {
    setAuthMessage(
      data.message || "Kayıt olunamadı.",
      "error"
    );
    return;
  }

  currentUser = data.user;

  setAuthMessage(
    "Hesabın hazır! 🚀",
    "success"
  );

  await startApp();
}

async function logout() {
  await api("logout");

  currentUser = null;

  document.getElementById("app").style.display = "none";
  document.getElementById("authScreen").style.display = "flex";

  showLogin();
}

// ======================================================
// APP START
// ======================================================

async function startApp() {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  await loadAll();

  updateUserUI();

  goHome();

  createExtraFeatures();
}

async function checkSession() {
  const { response, data } = await api("me");

  if (response.ok && data.user) {
    currentUser = data.user;

    await startApp();
  }
}

async function loadAll() {
  await Promise.all([
    loadTasks(),
    loadSubjects(),
    loadExams(),
    loadSessions(),
    loadStats(),
    loadUser()
  ]);
}

// ======================================================
// USER
// ======================================================

async function loadUser() {
  const { response, data } = await api("me");

  if (response.ok) {
    currentUser = data.user;
  }
}

function updateUserUI() {
  if (!currentUser) return;

  const name =
    currentUser.name ||
    "Öğrenci";

  const welcome =
    document.getElementById("welcomeText");

  if (welcome) {
    welcome.textContent =
      `Merhaba ${name}! 👋`;
  }

  updateXP();
}

// ======================================================
// TASKS
// ======================================================

async function loadTasks() {
  const { response, data } =
    await api("tasks");

  if (!response.ok) return;

  tasks = data.tasks || [];

  renderTasks();
  updateDashboard();
}

function renderTasks() {
  const list =
    document.getElementById("taskList");

  if (!list) return;

  if (tasks.length === 0) {
    list.innerHTML = `
      <div style="
        padding:25px 10px;
        text-align:center;
        color:#8991a5;
      ">
        <div style="font-size:35px">🎯</div>
        <strong>Henüz görev yok</strong>
        <p style="margin-top:5px">
          İlk görevini ekle!
        </p>
      </div>
    `;

    updateTaskCounter();
    return;
  }

  list.innerHTML = tasks.map(task => `
    <div class="task ${task.completed ? "completed" : ""}">
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
          📚 Ders görevi
        </div>
      </div>

      <div class="task-xp">
        +${task.xp || 50} XP
      </div>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
      >
        🗑️
      </button>
    </div>
  `).join("");

  updateTaskCounter();
}

async function addTask() {
  const input =
    document.getElementById("newTask");

  if (!input) return;

  const title = input.value.trim();

  if (!title) return;

  const { response, data } =
    await api("tasks", {
      method: "POST",
      body: JSON.stringify({
        title
      })
    });

  if (!response.ok) {
    alert(data.message || "Görev eklenemedi.");
    return;
  }

  input.value = "";

  await loadTasks();
  await loadUser();

  updateDashboard();
}

async function toggleTask(id) {
  const { response } =
    await api("tasks", {
      method: "PATCH",
      body: JSON.stringify({
        id
      })
    });

  if (!response.ok) return;

  await loadTasks();
  await loadUser();
  await loadStats();

  updateXP();
  updateDashboard();
}

async function deleteTask(id) {
  if (!confirm("Bu görevi silmek istediğine emin misin?")) {
    return;
  }

  const { response } =
    await api("tasks", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });

  if (!response.ok) return;

  await loadTasks();
  await loadUser();
  await loadStats();

  updateXP();
}

function updateTaskCounter() {
  const counter =
    document.getElementById("taskCounter");

  if (!counter) return;

  const completed =
    tasks.filter(t => t.completed).length;

  counter.textContent =
    `${completed} / ${tasks.length}`;
}

// ======================================================
// SUBJECTS
// ======================================================

async function loadSubjects() {
  const { response, data } =
    await api("subjects");

  if (!response.ok) return;

  subjects = data.subjects || [];
}

async function addSubject() {
  const name = prompt("Ders adı:");

  if (!name || !name.trim()) return;

  const { response } =
    await api("subjects", {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        color: "#6658f5"
      })
    });

  if (!response.ok) {
    alert("Ders eklenemedi.");
    return;
  }

  await loadSubjects();

  showSubjects();
}

async function deleteSubject(id) {
  if (!confirm("Ders silinsin mi?")) return;

  await api("subjects", {
    method: "DELETE",
    body: JSON.stringify({
      id
    })
  });

  await loadSubjects();

  showSubjects();
}

// ======================================================
// EXAMS
// ======================================================

async function loadExams() {
  const { response, data } =
    await api("exams");

  if (!response.ok) return;

  exams = data.exams || [];
}

function examCountdown(date) {
  const target =
    new Date(date).getTime();

  const now =
    Date.now();

  const difference =
    target - now;

  if (difference <= 0) {
    return "Sınav zamanı geldi! 🔥";
  }

  const days =
    Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );

  return `${days} gün kaldı`;
}

async function addExam() {
  const title =
    prompt("Sınav adı:");

  if (!title) return;

  const date =
    prompt(
      "Sınav tarihi (YYYY-MM-DD):"
    );

  if (!date) return;

  const { response } =
    await api("exams", {
      method: "POST",
      body: JSON.stringify({
        title,
        exam_date: date,
        topic: ""
      })
    });

  if (!response.ok) {
    alert("Sınav eklenemedi.");
    return;
  }

  await loadExams();

  showExams();
}

async function deleteExam(id) {
  if (!confirm("Sınav silinsin mi?")) return;

  await api("exams", {
    method: "DELETE",
    body: JSON.stringify({
      id
    })
  });

  await loadExams();

  showExams();
}

// ======================================================
// SESSIONS
// ======================================================

async function loadSessions() {
  const { response, data } =
    await api("sessions");

  if (!response.ok) return;

  sessions = data.sessions || [];
}

// ======================================================
// STATS
// ======================================================

async function loadStats() {
  const { response, data } =
    await api("stats");

  if (!response.ok) return;

  stats = data.stats;

  updateStatsUI();
}

function updateStatsUI() {
  if (!stats) return;

  const xp =
    document.getElementById("statXP");

  const streak =
    document.getElementById("statStreak");

  const taskCount =
    document.getElementById("statTasks");

  if (xp) {
    xp.textContent =
      currentUser?.xp || 0;
  }

  if (streak) {
    streak.textContent =
      currentUser?.streak || 0;
  }

  if (taskCount) {
    taskCount.textContent =
      stats.tasks?.completed || 0;
  }

  const streakNumber =
    document.getElementById("streakNumber");

  if (streakNumber) {
    streakNumber.textContent =
      currentUser?.streak || 0;
  }
}

// ======================================================
// XP / LEVEL
// ======================================================

function getLevel(xp) {
  return Math.floor(
    (Number(xp) || 0) / 250
  ) + 1;
}

function updateXP() {
  if (!currentUser) return;

  const xp =
    Number(currentUser.xp) || 0;

  const level =
    getLevel(xp);

  const levelStart =
    (level - 1) * 250;

  const current =
    xp - levelStart;

  const percent =
    Math.min(
      100,
      Math.round(
        (current / 250) * 100
      )
    );

  const levelText =
    document.getElementById("levelText");

  const xpText =
    document.getElementById("xpText");

  const progress =
    document.getElementById("progressBar");

  if (levelText) {
    levelText.textContent =
      `Seviye ${level}`;
  }

  if (xpText) {
    xpText.textContent =
      `${current} / 250 XP`;
  }

  if (progress) {
    progress.style.width =
      `${percent}%`;
  }
}

// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard() {
  const total =
    tasks.length;

  const completed =
    tasks.filter(t => t.completed).length;

  const summary =
    document.getElementById("taskSummary");

  if (!summary) return;

  if (total === 0) {
    summary.textContent =
      "Bugün için bir hedef belirle! 🎯";
    return;
  }

  if (completed === total) {
    summary.textContent =
      "Muhteşem! Bugünkü görevlerinin hepsi tamamlandı! 🏆";
    return;
  }

  summary.textContent =
    `${completed}/${total} görev tamamlandı. Devam et! 💪`;
}

// ======================================================
// NAVIGATION
// ======================================================

function clearActiveButtons() {
  document
    .querySelectorAll(".menu button, .mobile-nav button")
    .forEach(button => {
      button.classList.remove("active");
    });
}

function activateButton(button) {
  if (button) {
    button.classList.add("active");
  }
}

function hideDynamic() {
  const dynamic =
    document.getElementById("dynamicSection");

  if (dynamic) {
    dynamic.style.display = "none";
    dynamic.innerHTML = "";
  }
}

function goHome(button) {
  clearActiveButtons();
  activateButton(button);

  hideDynamic();

  const tasksSection =
    document.getElementById("tasksSection");

  if (tasksSection) {
    tasksSection.style.display = "block";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showTasks(button) {
  clearActiveButtons();
  activateButton(button);

  hideDynamic();

  const tasksSection =
    document.getElementById("tasksSection");

  if (tasksSection) {
    tasksSection.style.display = "block";
  }
}

function showSubjects(button) {
  clearActiveButtons();
  activateButton(button);

  renderDynamic(`
    <div class="card-title">
      <h2>📚 Derslerim</h2>
      <button class="add-small" onclick="addSubject()">
        + Ders
      </button>
    </div>

    ${
      subjects.length
      ? subjects.map(subject => `
        <div class="feature-row">
          <div>
            <strong>
              📘 ${escapeHTML(subject.name)}
            </strong>
          </div>

          <button
            onclick="deleteSubject(${subject.id})"
            class="danger-button"
          >
            🗑️
          </button>
        </div>
      `).join("")
      : `
        <div class="empty-box">
          📚 Henüz ders eklemedin.
        </div>
      `
    }
  `);
}

function showExams(button) {
  clearActiveButtons();
  activateButton(button);

  renderDynamic(`
    <div class="card-title">
      <h2>📅 Sınavlar</h2>
      <button class="add-small" onclick="addExam()">
        + Sınav
      </button>
    </div>

    ${
      exams.length
      ? exams.map(exam => `
        <div class="exam-card">
          <div>
            <strong>
              📖 ${escapeHTML(exam.title)}
            </strong>

            <div class="exam-date">
              ${escapeHTML(
                String(exam.exam_date).slice(0, 10)
              )}
            </div>

            <div class="countdown">
              ${examCountdown(exam.exam_date)}
            </div>
          </div>

          <button
            onclick="deleteExam(${exam.id})"
            class="danger-button"
          >
            🗑️
          </button>
        </div>
      `).join("")
      : `
        <div class="empty-box">
          📅 Yaklaşan sınav yok.
        </div>
      `
    }
  `);
}

// ======================================================
// DERS KOÇU
// ======================================================

function getCoachAdvice() {
  const completed =
    stats?.tasks?.completed || 0;

  const total =
    stats?.tasks?.total || 0;

  const minutes =
    stats?.sessions?.minutes || 0;

  const upcoming =
    exams
      .filter(e => {
        return new Date(e.exam_date).getTime() >= Date.now();
      })
      .sort(
        (a, b) =>
          new Date(a.exam_date) -
          new Date(b.exam_date)
      );

  if (upcoming.length) {
    const exam = upcoming[0];

    const days =
      Math.max(
        0,
        Math.ceil(
          (
            new Date(exam.exam_date) -
            Date.now()
          ) /
          (1000 * 60 * 60 * 24)
        )
      );

    return `
      <strong>🎯 Önceliğin:</strong>
      <p style="margin-top:7px">
        <b>${escapeHTML(exam.title)}</b>
        sınavına ${days} gün kaldı.
        Bugün en az 25 dakika çalışmanı öneriyorum.
      </p>
    `;
  }

  if (total > completed) {
    return `
      <strong>🤖 Ders Koçu:</strong>
      <p style="margin-top:7px">
        ${total - completed} görevin kaldı.
        Önce en kolay görevi tamamla ve
        çalışma ritmini başlat. 💪
      </p>
    `;
  }

  if (minutes < 25) {
    return `
      <strong>🧠 Ders Koçu:</strong>
      <p style="margin-top:7px">
        Bugün henüz yeterince çalışmadın.
        25 dakikalık bir odaklanma seansı başlat!
      </p>
    `;
  }

  return `
    <strong>🌟 Harika gidiyorsun!</strong>
    <p style="margin-top:7px">
      Bugünkü çalışmalarını sürdür.
      Biraz daha çalışırsan yeni bir seviyeye
      ulaşabilirsin! 🚀
    </p>
  `;
}

function showFocus(button) {
  clearActiveButtons();
  activateButton(button);

  renderDynamic(`
    <div class="card-title">
      <h2>⏱️ Odaklan</h2>
    </div>

    <div class="focus-box">
      <div id="timerDisplay">
        25:00
      </div>

      <p>
        Telefonunu bırak,
        25 dakika sadece dersine odaklan. 🧠
      </p>

      <div class="timer-buttons">
        <button onclick="startTimer()">
          ▶ Başlat
        </button>

        <button onclick="pauseTimer()">
          ⏸ Duraklat
        </button>

        <button onclick="resetTimer()">
          🔄 Sıfırla
        </button>
      </div>
    </div>
  `);
}

function showStats(button) {
  clearActiveButtons();
  activateButton(button);

  renderDynamic(`
    <div class="card-title">
      <h2>📊 İstatistikler</h2>
    </div>

    <div class="stats-big">
      <div>
        <span>⭐</span>
        <strong>${currentUser?.xp || 0}</strong>
        XP
      </div>

      <div>
        <span>📝</span>
        <strong>${stats?.tasks?.completed || 0}</strong>
        görev
      </div>

      <div>
        <span>⏱️</span>
        <strong>${stats?.sessions?.minutes || 0}</strong>
        dakika
      </div>

      <div>
        <span>🔥</span>
        <strong>${currentUser?.streak || 0}</strong>
        gün seri
      </div>
    </div>

    <div class="coach-card">
      ${getCoachAdvice()}
    </div>
  `);
}

function showProfile(button) {
  clearActiveButtons();
  activateButton(button);

  const level =
    getLevel(currentUser?.xp || 0);

  renderDynamic(`
    <div class="card-title">
      <h2>👤 Profilim</h2>
    </div>

    <div class="profile-big">
      <div class="profile-avatar">
        🎓
      </div>

      <h2>
        ${escapeHTML(currentUser?.name || "Öğrenci")}
      </h2>

      <p>
        ${escapeHTML(currentUser?.email || "")}
      </p>

      <div class="profile-level">
        ⭐ Seviye ${level}
      </div>

      <div class="profile-xp">
        ${currentUser?.xp || 0} XP
      </div>
    </div>

    <div class="achievement-list">
      <div>🏆 Ders Takipçisi</div>
      <div>🔥 Çalışma Savaşçısı</div>
      <div>⭐ XP Avcısı</div>
    </div>
  `);
}

// ======================================================
// TIMER
// ======================================================

function startTimer() {
  if (timerRunning) return;

  timerRunning = true;

  timerInterval =
    setInterval(async () => {
      timerSeconds--;

      updateTimer();

      if (timerSeconds <= 0) {
        clearInterval(timerInterval);

        timerRunning = false;

        await completeStudySession();

        alert(
          "🎉 Harika! 25 dakikalık çalışma tamamlandı. XP kazandın!"
        );

        timerSeconds = 25 * 60;

        updateTimer();
      }
    }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);

  timerRunning = false;

  timerSeconds = 25 * 60;

  updateTimer();
}

function updateTimer() {
  const display =
    document.getElementById("timerDisplay");

  if (!display) return;

  const minutes =
    Math.floor(timerSeconds / 60);

  const seconds =
    timerSeconds % 60;

  display.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function completeStudySession() {
  await api("sessions", {
    method: "POST",
    body: JSON.stringify({
      duration_minutes: 25
    })
  });

  await loadUser();
  await loadStats();

  updateXP();
  updateStatsUI();
}

// ======================================================
// DYNAMIC UI
// ======================================================

function renderDynamic(html) {
  const section =
    document.getElementById("dynamicSection");

  if (!section) return;

  const tasksSection =
    document.getElementById("tasksSection");

  if (tasksSection) {
    tasksSection.style.display = "none";
  }

  section.style.display = "block";

  section.innerHTML = html;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ======================================================
// EXTRA FEATURES
// ======================================================

function createExtraFeatures() {
  if (
    document.getElementById("extraFeatures")
  ) {
    return;
  }

  const main =
    document.querySelector(".main");

  if (!main) return;

  const box =
    document.createElement("div");

  box.id = "extraFeatures";

  box.innerHTML = `
    <div class="extra-grid">

      <div class="extra-card coach-extra">
        <div class="extra-icon">🤖</div>

        <div>
          <strong>Ders Koçu</strong>
          <p id="coachMessage">
            Sana özel çalışma önerileri hazırlanıyor...
          </p>
        </div>
      </div>

      <div class="extra-card">
        <div class="extra-icon">💡</div>

        <div>
          <strong>Günün Sözü</strong>
          <p>
            ${
              motivationalMessages[
                Math.floor(
                  Math.random() *
                  motivationalMessages.length
                )
              ]
            }
          </p>
        </div>
      </div>

      <div class="extra-card">
        <div class="extra-icon">🎯</div>

        <div>
          <strong>Hızlı Başla</strong>
          <p>
            25 dakikalık çalışma başlat.
          </p>

          <button
            onclick="showFocus()"
            class="quick-button"
          >
            🚀 Başla
          </button>
        </div>
      </div>

    </div>
  `;

  main.insertBefore(
    box,
    main.children[2]
  );

  updateCoachCard();
}

function updateCoachCard() {
  const message =
    document.getElementById("coachMessage");

  if (!message) return;

  const completed =
    stats?.tasks?.completed || 0;

  const total =
    stats?.tasks?.total || 0;

  if (total === 0) {
    message.textContent =
      "Önce bugün için bir görev oluştur.";
  } else if (completed < total) {
    message.textContent =
      `${total - completed} görevin kaldı. Hadi bir tanesini bitirelim! 💪`;
  } else {
    message.textContent =
      "Bugünkü görevlerin tamamlandı! Muhteşemsin! 🏆";
  }
}

// ======================================================
// HELPERS
// ======================================================

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ======================================================
// EXTRA CSS
// ======================================================

function addExtraCSS() {
  if (document.getElementById("extraCSS")) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = "extraCSS";

  style.textContent = `
    .extra-grid {
      display:grid;
      grid-template-columns:
        repeat(3, minmax(0,1fr));
      gap:20px;
      margin-top:20px;
      margin-bottom:20px;
    }

    .extra-card {
      background:white;
      border:1px solid #e8ebf3;
      border-radius:22px;
      padding:20px;
      box-shadow:0 12px 35px rgba(25,30,60,.08);
      display:flex;
      gap:15px;
      align-items:flex-start;
    }

    .extra-icon {
      font-size:32px;
      width:52px;
      height:52px;
      border-radius:16px;
      background:#f0efff;
      display:grid;
      place-items:center;
      flex-shrink:0;
    }

    .extra-card strong {
      font-size:17px;
    }

    .extra-card p {
      color:#7d8498;
      margin-top:6px;
      line-height:1.5;
      font-size:13px;
    }

    .quick-button,
    .add-small {
      margin-top:10px;
      border:none;
      background:#6658f5;
      color:white;
      border-radius:10px;
      padding:9px 13px;
      font-weight:800;
    }

    .feature-row,
    .exam-card {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      padding:15px;
      border:1px solid #edf0f5;
      border-radius:15px;
      margin-bottom:10px;
    }

    .danger-button {
      border:none;
      background:#fff0f2;
      color:#ff5b6e;
      border-radius:9px;
      padding:8px;
    }

    .exam-date {
      color:#8991a5;
      font-size:12px;
      margin-top:5px;
    }

    .countdown {
      color:#6658f5;
      font-weight:900;
      margin-top:7px;
    }

    .empty-box {
      padding:30px;
      text-align:center;
      color:#8991a5;
    }

    .focus-box {
      text-align:center;
      padding:25px 10px;
    }

    #timerDisplay {
      font-size:65px;
      font-weight:950;
      color:#6658f5;
      letter-spacing:2px;
    }

    .focus-box p {
      color:#7d8498;
      margin:10px 0 20px;
    }

    .timer-buttons {
      display:flex;
      justify-content:center;
      gap:8px;
      flex-wrap:wrap;
    }

    .timer-buttons button {
      border:none;
      background:#6658f5;
      color:white;
      padding:11px 15px;
      border-radius:10px;
      font-weight:800;
    }

    .stats-big {
      display:grid;
      grid-template-columns:
        repeat(4,1fr);
      gap:12px;
      margin-bottom:20px;
    }

    .stats-big > div {
      background:#f7f8fc;
      border-radius:15px;
      padding:18px;
      text-align:center;
      color:#7d8498;
    }

    .stats-big span {
      display:block;
      font-size:25px;
    }

    .stats-big strong {
      display:block;
      font-size:25px;
      color:#171a2b;
      margin:5px 0;
    }

    .coach-card {
      background:#f0efff;
      border-radius:18px;
      padding:18px;
      color:#5147c8;
      line-height:1.5;
    }

    .profile-big {
      text-align:center;
      padding:15px;
    }

    .profile-avatar {
      width:85px;
      height:85px;
      margin:auto;
      border-radius:50%;
      display:grid;
      place-items:center;
      background:#e7e4ff;
      font-size:40px;
    }

    .profile-big h2 {
      margin-top:12px;
    }

    .profile-big p {
      color:#8991a5;
      margin-top:5px;
    }

    .profile-level,
    .profile-xp {
      display:inline-block;
      margin-top:15px;
      padding:8px 12px;
      border-radius:20px;
      background:#f0efff;
      color:#6257df;
      font-weight:800;
      margin-right:5px;
    }

    .achievement-list {
      display:grid;
      grid-template-columns:
        repeat(3,1fr);
      gap:10px;
      margin-top:15px;
    }

    .achievement-list div {
      background:#f7f8fc;
      padding:15px;
      text-align:center;
      border-radius:14px;
      font-size:13px;
      font-weight:800;
    }

    @media(max-width:900px) {
      .extra-grid {
        grid-template-columns:1fr;
      }

      .stats-big {
        grid-template-columns:
          repeat(2,1fr);
      }
    }

    @media(max-width:600px) {
      .extra-card {
        border-radius:18px;
      }

      #timerDisplay {
        font-size:48px;
      }

      .stats-big {
        grid-template-columns:1fr 1fr;
      }

      .achievement-list {
        grid-template-columns:1fr;
      }
    }
  `;

  document.head.appendChild(style);
}

// ======================================================
// INIT
// ======================================================

addExtraCSS();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    checkSession();
  }
);
