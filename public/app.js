/* =========================================================
   DERS TAKİP 2.0 - APP.JS
   ========================================================= */

const API = "/api";

let currentUser = null;
let currentPage = "home";

let tasks = [];
let subjects = [];
let exams = [];
let achievements = [];
let stats = null;
let coachData = null;

let timerInterval = null;
let timerSeconds = 25 * 60;
let timerRunning = false;

let darkMode = localStorage.getItem("ders_dark") === "1";

const $ = (id) => document.getElementById(id);

/* =========================================================
   API
   ========================================================= */

async function api(action, options = {}) {
  try {
    const config = {
      method: options.method || "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };

    if (options.body !== undefined) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(
      `${API}?action=${encodeURIComponent(action)}`,
      config
    );

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {
        success: false,
        message: "Sunucudan geçersiz cevap geldi."
      };
    }

    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error);

    throw error;
  }
}

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  applyDarkMode();

  await checkSession();

  setupKeyboardShortcuts();
});

/* =========================================================
   SESSION
   ========================================================= */

async function checkSession() {
  try {
    const data = await api("me");

    if (data.success && data.user) {
      currentUser = data.user;

      showApp();

      await loadAll();
    } else {
      showAuth();
    }
  } catch {
    showAuth();
  }
}

/* =========================================================
   AUTH SCREEN
   ========================================================= */

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

  updateUserUI();
}

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

function setAuthMessage(message, type = "error") {
  const el = $("authMessage");

  if (!el) return;

  el.textContent = message;

  if (type === "success") {
    el.style.color = "#20c997";
  } else {
    el.style.color = "#ff5b6e";
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
    setAuthMessage("E-posta ve şifre gerekli.");
    return;
  }

  const button = event.submitter;

  if (button) {
    button.disabled = true;
    button.textContent = "Giriş yapılıyor...";
  }

  try {
    const data = await api("login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    if (!data.success) {
      throw new Error(
        data.message || "Giriş başarısız."
      );
    }

    currentUser = data.user;

    setAuthMessage(
      "Giriş başarılı! 🚀",
      "success"
    );

    showApp();

    await loadAll();

    showToast("Hoş geldin! 👋");

  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Giriş Yap 🚀";
    }
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
    setAuthMessage("Tüm alanları doldur.");
    return;
  }

  if (password.length < 6) {
    setAuthMessage(
      "Şifre en az 6 karakter olmalı."
    );
    return;
  }

  const button = event.submitter;

  if (button) {
    button.disabled = true;
    button.textContent = "Hesap oluşturuluyor...";
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

    if (!data.success) {
      throw new Error(
        data.message || "Kayıt başarısız."
      );
    }

    currentUser = data.user;

    setAuthMessage(
      "Hesabın oluşturuldu! 🎉",
      "success"
    );

    showApp();

    await loadAll();

    showToast(
      "DersTakip'e hoş geldin! 🎓"
    );

  } catch (error) {
    setAuthMessage(error.message);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Hesap Oluştur ✨";
    }
  }
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
    // logout yine de devam eder
  }

  currentUser = null;

  tasks = [];
  subjects = [];
  exams = [];
  achievements = [];
  stats = null;
  coachData = null;

  showAuth();

  showLogin();

  showToast("Çıkış yapıldı.");
}

/* =========================================================
   LOAD ALL
   ========================================================= */

async function loadAll() {
  try {
    const results = await Promise.allSettled([
      loadMe(),
      loadTasks(),
      loadSubjects(),
      loadExams(),
      loadAchievements(),
      loadStats(),
      loadCoach()
    ]);

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.warn(
          "Veri yüklenemedi:",
          result.reason
        );
      }
    });

    renderEverything();

  } catch (error) {
    console.error(error);

    showToast(
      "Veriler yüklenirken hata oluştu."
    );
  }
}

/* =========================================================
   ME
   ========================================================= */

async function loadMe() {
  const data = await api("me");

  if (data.success) {
    currentUser = data.user;
  }

  updateUserUI();
}

/* =========================================================
   TASKS
   ========================================================= */

async function loadTasks() {
  const data = await api("tasks");

  if (data.success) {
    tasks = data.tasks || [];
  }

  renderTasks();
  updateHomeProgress();
}

function renderTasks() {
  const list = $("taskList");

  if (!list) return;

  if (!tasks.length) {
    list.innerHTML = `
      <div style="
        text-align:center;
        padding:35px 10px;
        color:var(--muted);
      ">
        <div style="font-size:45px;margin-bottom:10px;">
          📝
        </div>

        <strong>Henüz görev yok.</strong>

        <p style="margin-top:6px;">
          İlk görevini ekleyerek başla!
        </p>
      </div>
    `;

    updateTaskCounter();

    return;
  }

  list.innerHTML = tasks
    .map((task) => {
      const completed = task.completed;

      return `
        <div class="task ${
          completed ? "completed" : ""
        }">

          <button
            class="checkbox"
            onclick="toggleTask(${task.id})"
            aria-label="Görevi tamamla"
          >
            ${completed ? "✓" : ""}
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
      `;
    })
    .join("");

  updateTaskCounter();
}

function updateTaskCounter() {
  const counter = $("taskCounter");

  if (!counter) return;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  counter.textContent =
    `${completed} / ${tasks.length}`;
}

async function addTask() {
  const input = $("newTask");

  if (!input) return;

  const title = input.value.trim();

  if (!title) {
    showToast("Görev adını yaz.");
    input.focus();
    return;
  }

  try {
    const data = await api("tasks", {
      method: "POST",
      body: {
        title
      }
    });

    if (!data.success) {
      throw new Error(
        data.message || "Görev eklenemedi."
      );
    }

    input.value = "";

    tasks.unshift(data.task);

    renderTasks();

    updateHomeProgress();

    showToast("Görev eklendi! 🎯");

  } catch (error) {
    showToast(error.message);
  }
}

async function toggleTask(id) {
  try {
    const task = tasks.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!task) return;

    const wasCompleted = task.completed;

    const data = await api("tasks", {
      method: "PATCH",
      body: {
        id
      }
    });

    if (!data.success) {
      throw new Error(
        data.message || "Görev güncellenemedi."
      );
    }

    task.completed = data.completed;

    if (!wasCompleted && data.completed) {
      const xp = Number(task.xp) || 50;

      currentUser.xp =
        Number(currentUser.xp || 0) + xp;

      showCelebration(xp);

      showToast(
        `Görev tamamlandı! +${xp} XP ⭐`
      );
    } else {
      const xp = Number(task.xp) || 50;

      currentUser.xp = Math.max(
        0,
        Number(currentUser.xp || 0) - xp
      );
    }

    renderTasks();

    updateUserUI();

    updateHomeProgress();

    await loadStats();
    await loadCoach();

    renderCoach();

  } catch (error) {
    showToast(error.message);
  }
}

async function deleteTask(id) {
  if (!confirm("Bu görevi silmek istiyor musun?")) {
    return;
  }

  try {
    await api("tasks", {
      method: "DELETE",
      body: {
        id
      }
    });

    tasks = tasks.filter(
      (task) => Number(task.id) !== Number(id)
    );

    renderTasks();

    updateHomeProgress();

    await loadMe();

    showToast("Görev silindi.");
  } catch (error) {
    showToast(error.message);
  }
}

/* =========================================================
   SUBJECTS
   ========================================================= */

async function loadSubjects() {
  const data = await api("subjects");

  if (data.success) {
    subjects = data.subjects || [];
  }
}

function renderSubjects() {
  const container = $("dynamicSection");

  if (!container) return;

  container.innerHTML = `
    <div class="card-title">
      <h2>📚 Dersler</h2>

      <button
        class="primary-btn"
        onclick="openSubjectModal()"
      >
        + Ders Ekle
      </button>
    </div>

    ${
      subjects.length
        ? `
          <div class="market-grid">
            ${subjects
              .map(
                (subject) => `
                  <div class="shop-item">

                    <div
                      style="
                        width:55px;
                        height:55px;
                        border-radius:16px;
                        background:${
                          subject.color || "#6c63ff"
                        };
                        margin:0 auto 12px;
                      "
                    ></div>

                    <h3>
                      ${escapeHTML(subject.name)}
                    </h3>

                    <button
                      class="danger-btn"
                      style="margin-top:10px"
                      onclick="deleteSubject(${subject.id})"
                    >
                      Sil
                    </button>

                  </div>
                `
              )
              .join("")}
          </div>
        `
        : `
          <div style="
            text-align:center;
            padding:30px;
            color:var(--muted);
          ">
            📚 Henüz ders eklemedin.
          </div>
        `
    }
  `;

  container.style.display = "block";
}

function openSubjectModal() {
  openModal(
    "📚 Yeni Ders",
    `
      <div class="form-group">
        <label>Ders adı</label>

        <input
          id="subjectName"
          placeholder="Örn: Matematik"
          maxlength="100"
        >
      </div>

      <div class="form-group">
        <label>Renk</label>

        <input
          id="subjectColor"
          type="color"
          value="#6c63ff"
          style="
            width:100%;
            height:48px;
            border:1px solid var(--border);
            border-radius:10px;
          "
        >
      </div>

      <button
        class="primary-btn"
        style="width:100%"
        onclick="addSubject()"
      >
        Dersi Ekle 📚
      </button>
    `
  );
}

async function addSubject() {
  const name = $("subjectName")?.value.trim();
  const color = $("subjectColor")?.value;

  if (!name) {
    showToast("Ders adı gerekli.");
    return;
  }

  try {
    const data = await api("subjects", {
      method: "POST",
      body: {
        name,
        color
      }
    });

    if (!data.success) {
      throw new Error(
        data.message || "Ders eklenemedi."
      );
    }

    subjects.unshift(data.subject);

    closeModal();

    showToast("Ders eklendi! 📚");

    renderSubjects();

  } catch (error) {
    showToast(error.message);
  }
}

async function deleteSubject(id) {
  if (!confirm("Bu dersi silmek istiyor musun?")) {
    return;
  }

  try {
    await api("subjects", {
      method: "DELETE",
      body: {
        id
      }
    });

    subjects = subjects.filter(
      (subject) =>
        Number(subject.id) !== Number(id)
    );

    renderSubjects();

    showToast("Ders silindi.");
  } catch (error) {
    showToast(error.message);
  }
}

/* =========================================================
   EXAMS
   ========================================================= */

async function loadExams() {
  const data = await api("exams");

  if (data.success) {
    exams = data.exams || [];
  }
}

function renderExams() {
  const container = $("dynamicSection");

  if (!container) return;

  container.innerHTML = `
    <div class="card-title">
      <h2>📅 Sınavlar</h2>

      <button
        class="primary-btn"
        onclick="openExamModal()"
      >
        + Sınav Ekle
      </button>
    </div>

    ${
      exams.length
        ? `
          <div>
            ${exams
              .map((exam) => {
                const date =
                  formatDate(exam.exam_date);

                const days =
                  getDaysUntil(exam.exam_date);

                return `
                  <div
                    style="
                      padding:16px;
                      border:1px solid var(--border);
                      border-radius:15px;
                      margin-bottom:10px;
                    "
                  >

                    <div style="
                      display:flex;
                      justify-content:space-between;
                      gap:10px;
                    ">

                      <div>
                        <strong>
                          📅 ${escapeHTML(
                            exam.title
                          )}
                        </strong>

                        <div style="
                          color:var(--muted);
                          margin-top:5px;
                        ">
                          ${
                            escapeHTML(
                              exam.subject_name ||
                                "Genel"
                            )
                          }
                        </div>

                        ${
                          exam.topic
                            ? `
                              <div style="
                                color:var(--muted);
                                margin-top:4px;
                              ">
                                Konu: ${escapeHTML(
                                  exam.topic
                                )}
                              </div>
                            `
                            : ""
                        }
                      </div>

                      <div
                        style="
                          text-align:right;
                          min-width:90px;
                        "
                      >
                        <strong>
                          ${date}
                        </strong>

                        <div
                          style="
                            color:${
                              days <= 2
                                ? "var(--red)"
                                : "var(--primary)"
                            };
                            margin-top:5px;
                          "
                        >
                          ${
                            days < 0
                              ? "Geçti"
                              : days === 0
                              ? "Bugün!"
                              : `${days} gün`
                          }
                        </div>
                      </div>

                    </div>

                    <button
                      class="danger-btn"
                      style="margin-top:12px"
                      onclick="deleteExam(${exam.id})"
                    >
                      Sınavı Sil
                    </button>

                  </div>
                `;
              })
              .join("")}
          </div>
        `
        : `
          <div style="
            text-align:center;
            padding:30px;
            color:var(--muted);
          ">
            📅 Henüz sınav eklemedin.
          </div>
        `
    }
  `;

  container.style.display = "block";
}

function openExamModal() {
  openModal(
    "📅 Yeni Sınav",
    `
      <div class="form-group">
        <label>Sınav adı</label>

        <input
          id="examTitle"
          placeholder="Örn: Matematik Yazılısı"
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

          ${subjects
            .map(
              (subject) => `
                <option value="${subject.id}">
                  ${escapeHTML(subject.name)}
                </option>
              `
            )
            .join("")}
        </select>
      </div>

      <div class="form-group">
        <label>Konu</label>

        <input
          id="examTopic"
          placeholder="Örn: Kesirler"
        >
      </div>

      <button
        class="primary-btn"
        style="width:100%"
        onclick="addExam()"
      >
        Sınavı Ekle 📅
      </button>
    `
  );
}

async function addExam() {
  const title = $("examTitle")?.value.trim();
  const exam_date = $("examDate")?.value;
  const subject_id =
    $("examSubject")?.value || null;
  const topic =
    $("examTopic")?.value.trim() || null;

  if (!title || !exam_date) {
    showToast(
      "Sınav adı ve tarih gerekli."
    );
    return;
  }

  try {
    const data = await api("exams", {
      method: "POST",
      body: {
        title,
        exam_date,
        subject_id,
        topic
      }
    });

    if (!data.success) {
      throw new Error(
        data.message || "Sınav eklenemedi."
      );
    }

    exams.push(data.exam);

    exams.sort(
      (a, b) =>
        new Date(a.exam_date) -
        new Date(b.exam_date)
    );

    closeModal();

    renderExams();

    await loadCoach();

    showToast("Sınav eklendi! 📅");

  } catch (error) {
    showToast(error.message);
  }
}

async function deleteExam(id) {
  if (!confirm("Bu sınavı silmek istiyor musun?")) {
    return;
  }

  try {
    await api("exams", {
      method: "DELETE",
      body: {
        id
      }
    });

    exams = exams.filter(
      (exam) =>
        Number(exam.id) !== Number(id)
    );

    renderExams();

    await loadCoach();

    showToast("Sınav silindi.");
  } catch (error) {
    showToast(error.message);
  }
}

/* =========================================================
   FOCUS
   ========================================================= */

function renderFocus() {
  const container = $("dynamicSection");

  if (!container) return;

  container.innerHTML = `
    <div class="card-title">
      <h2>⏱️ Odaklan</h2>
    </div>

    <div class="focus">

      <p style="color:var(--muted)">
        Telefonunu bırak ve çalışmaya başla.
      </p>

      <div
        id="focusTimer"
        class="timer"
      >
        ${formatTimer(timerSeconds)}
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

      <div
        style="
          margin-top:25px;
          color:var(--muted);
        "
      >
        Tamamlanan odaklanma seansı
        <strong>
          ${stats?.sessions?.sessions || 0}
        </strong>
      </div>

    </div>
  `;

  container.style.display = "block";
}

function startFocus() {
  if (timerRunning) return;

  timerRunning = true;

  timerInterval = setInterval(() => {
    timerSeconds--;

    updateTimerDisplay();

    if (timerSeconds <= 0) {
      finishFocus();
    }
  }, 1000);

  showToast(
    "Odaklanma başladı! 🔥"
  );
}

function pauseFocus() {
  if (!timerRunning) return;

  clearInterval(timerInterval);

  timerInterval = null;
  timerRunning = false;

  showToast("Odaklanma duraklatıldı.");
}

function resetFocus() {
  clearInterval(timerInterval);

  timerInterval = null;
  timerRunning = false;

  timerSeconds = 25 * 60;

  updateTimerDisplay();
}

async function finishFocus() {
  clearInterval(timerInterval);

  timerInterval = null;
  timerRunning = false;

  const minutes = 25;

  try {
    const data = await api("sessions", {
      method: "POST",
      body: {
        duration_minutes: minutes
      }
    });

    if (!data.success) {
      throw new Error(
        data.message ||
          "Odaklanma kaydedilemedi."
      );
    }

    const earned =
      Number(data.earned_xp) || minutes;

    currentUser.xp =
      Number(currentUser.xp || 0) +
      earned;

    showCelebration(earned);

    showToast(
      `25 dakika tamamlandı! +${earned} XP ⭐`
    );

    timerSeconds = 25 * 60;

    await loadStats();
    await loadMe();
    await loadCoach();

    renderEverything();

  } catch (error) {
    showToast(error.message);

    timerSeconds = 25 * 60;
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  const timer = $("focusTimer");

  if (timer) {
    timer.textContent =
      formatTimer(timerSeconds);
  }
}

function formatTimer(seconds) {
  const min =
    Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

  const sec =
    Math.max(0, seconds % 60)
      .toString()
      .padStart(2, "0");

  return `${min}:${sec}`;
}

/* =========================================================
   COACH
   ========================================================= */

async function loadCoach() {
  const data = await api("coach");

  if (data.success) {
    coachData = data.coach;
  }

  renderCoach();
}

function renderCoach() {
  if (!coachData) return;

  const message = $("coachMessage");

  if (!message) return;

  if (
    coachData.advice &&
    coachData.advice.length
  ) {
    message.innerHTML =
      coachData.advice
        .slice(0, 3)
        .map(
          (item) => `
            <div style="
              margin-bottom:10px;
            ">
              ${item.icon || "💡"}
              <strong>
                ${escapeHTML(item.title)}
              </strong>

              <div style="
                margin-left:28px;
              ">
                ${escapeHTML(item.text)}
              </div>
            </div>
          `
        )
        .join("");
  }
}

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

async function loadAchievements() {
  const data = await api("achievements");

  if (data.success) {
    achievements =
      data.achievements || [];
  }
}

function renderAchievements() {
  const container = $("dynamicSection");

  if (!container) return;

  const availableBadges = [
    {
      icon: "🌱",
      title: "İlk Adım",
      text: "İlk görevini tamamla",
      unlocked:
        tasks.some((task) => task.completed)
    },
    {
      icon: "⭐",
      title: "XP Avcısı",
      text: "100 XP kazan",
      unlocked:
        Number(currentUser?.xp || 0) >= 100
    },
    {
      icon: "🔥",
      title: "Seri Başlangıcı",
      text: "1 günlük seri",
      unlocked:
        Number(currentUser?.streak || 0) >= 1
    },
    {
      icon: "🏆",
      title: "Çalışkan",
      text: "10 görev tamamla",
      unlocked:
        tasks.filter(
          (task) => task.completed
        ).length >= 10
    },
    {
      icon: "⏱️",
      title: "Odak Ustası",
      text: "60 dakika çalış",
      unlocked:
        Number(
          stats?.sessions?.minutes || 0
        ) >= 60
    },
    {
      icon: "📚",
      title: "Ders Kaşifi",
      text: "3 ders ekle",
      unlocked:
        subjects.length >= 3
    }
  ];

  container.innerHTML = `
    <div class="card-title">
      <h2>🏆 Rozetler</h2>
    </div>

    <div class="badges">
      ${availableBadges
        .map(
          (badge) => `
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

              <small>
                ${badge.text}
              </small>

              <div style="
                margin-top:7px;
                font-size:12px;
              ">
                ${
                  badge.unlocked
                    ? "✅ Açıldı"
                    : "🔒 Kilitli"
                }
              </div>

            </div>
          `
        )
        .join("")}
    </div>
  `;

  container.style.display = "block";
}

/* =========================================================
   STATS
   ========================================================= */

async function loadStats() {
  const data = await api("stats");

  if (data.success) {
    stats = data.stats;
  }

  renderStats();
}

function renderStats() {
  if (!stats) return;

  const totalTasks =
    Number(stats.tasks?.total) || 0;

  const completedTasks =
    Number(stats.tasks?.completed) || 0;

  const minutes =
    Number(stats.sessions?.minutes) || 0;

  const sessionCount =
    Number(stats.sessions?.sessions) || 0;

  if ($("statXP")) {
    $("statXP").textContent =
      Number(currentUser?.xp || 0);
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      Number(currentUser?.streak || 0);
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      getCoins();
  }

  const container = $("dynamicSection");

  if (
    currentPage !== "stats" ||
    !container
  ) {
    return;
  }

  container.innerHTML = `
    <div class="card-title">
      <h2>📊 İstatistikler</h2>
    </div>

    <div class="stats">

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
        <span>📚</span>
        <strong>
          ${subjects.length}
        </strong>
        <small>
          Ders
        </small>
      </div>

      <div class="stat">
        <span>📅</span>
        <strong>
          ${exams.length}
        </strong>
        <small>
          Sınav
        </small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${minutes}
        </strong>
        <small>
          Çalışma dakikası
        </small>
      </div>

      <div class="stat">
        <span>🎯</span>
        <strong>
          ${sessionCount}
        </strong>
        <small>
          Odak seansı
        </small>
      </div>

    </div>
  `;

  container.style.display = "block";
}

/* =========================================================
   PET
   ========================================================= */

function renderPet() {
  const container = $("dynamicSection");

  if (!container) return;

  const pet =
    JSON.parse(
      localStorage.getItem(
        "ders_pet"
      ) || "null"
    ) || {
      name: "Panda",
      emoji: "🐼",
      level: 1
    };

  container.innerHTML = `
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
        margin:7px 0 20px;
      ">
        Seviye ${pet.level}
      </p>

      <button
        class="primary-btn"
        onclick="feedPet()"
      >
        🍎 Besle
      </button>

      <button
        class="secondary-btn"
        onclick="renamePet()"
      >
        ✏️ İsim Değiştir
      </button>

      <div style="
        margin-top:20px;
        color:var(--muted);
      ">
        Görevlerini tamamladıkça
        evcil hayvanını geliştir!
      </div>

    </div>
  `;

  container.style.display = "block";

  updatePetCard();
}

function getPet() {
  return (
    JSON.parse(
      localStorage.getItem(
        "ders_pet"
      ) || "null"
    ) || {
      name: "Panda",
      emoji: "🐼",
      level: 1
    }
  );
}

function savePet(pet) {
  localStorage.setItem(
    "ders_pet",
    JSON.stringify(pet)
  );
}

function feedPet() {
  const pet = getPet();

  pet.level =
    Number(pet.level || 1) + 1;

  savePet(pet);

  updatePetCard();

  renderPet();

  showCelebration(10);

  showToast(
    `${pet.name} seviye atladı! 🐼`
  );
}

function renamePet() {
  const pet = getPet();

  const name = prompt(
    "Evcil hayvanının yeni adı:",
    pet.name
  );

  if (!name || !name.trim()) {
    return;
  }

  pet.name =
    name.trim().slice(0, 30);

  savePet(pet);

  updatePetCard();

  renderPet();

  showToast("İsim değiştirildi! 🐣");
}

function updatePetCard() {
  const pet = getPet();

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

/* =========================================================
   MARKET
   ========================================================= */

const SHOP_ITEMS = [
  {
    id: "food",
    icon: "🍎",
    name: "Elma",
    description: "Evcil hayvanını besle.",
    price: 20
  },
  {
    id: "toy",
    icon: "🎾",
    name: "Oyuncak",
    description: "Evcil hayvanınla oyna.",
    price: 50
  },
  {
    id: "hat",
    icon: "🎩",
    name: "Şapka",
    description: "Havalı görün!",
    price: 100
  },
  {
    id: "star",
    icon: "🌟",
    name: "Yıldız",
    description: "Özel ödül.",
    price: 200
  }
];

function getCoins() {
  return Number(
    localStorage.getItem(
      "ders_coins"
    ) || 0
  );
}

function setCoins(value) {
  localStorage.setItem(
    "ders_coins",
    String(Math.max(0, value))
  );

  if ($("statCoins")) {
    $("statCoins").textContent =
      Math.max(0, value);
  }
}

function addCoins(amount) {
  setCoins(
    getCoins() + Number(amount)
  );
}

function renderMarket() {
  const container = $("dynamicSection");

  if (!container) return;

  const coins = getCoins();

  container.innerHTML = `
    <div class="card-title">
      <h2>🛒 Market</h2>

      <strong>
        🪙 ${coins} Coin
      </strong>
    </div>

    <div class="market-grid">

      ${SHOP_ITEMS.map(
        (item) => `
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
  `;

  container.style.display = "block";
}

function buyItem(id) {
  const item =
    SHOP_ITEMS.find(
      (item) => item.id === id
    );

  if (!item) return;

  const coins = getCoins();

  if (coins < item.price) {
    showToast(
      `Yeterli Coin yok! 🪙`
    );
    return;
  }

  setCoins(
    coins - item.price
  );

  const inventory =
    JSON.parse(
      localStorage.getItem(
        "ders_inventory"
      ) || "[]"
    );

  inventory.push({
    ...item,
    boughtAt: Date.now()
  });

  localStorage.setItem(
    "ders_inventory",
    JSON.stringify(inventory)
  );

  renderMarket();

  showToast(
    `${item.name} satın alındı! 🛒`
  );
}

/* =========================================================
   DAILY REWARD
   ========================================================= */

function claimDailyReward() {
  const today =
    new Date().toISOString()
      .slice(0, 10);

  const last =
    localStorage.getItem(
      "ders_daily_reward"
    );

  if (last === today) {
    showToast(
      "Bugünkü ödülü zaten aldın. 🎁"
    );
    return;
  }

  const reward = 50;

  addCoins(reward);

  localStorage.setItem(
    "ders_daily_reward",
    today
  );

  if ($("dailyRewardText")) {
    $("dailyRewardText").textContent =
      "Bugünkü ödülünü aldın! 🎉";
  }

  if ($("dailyRewardButton")) {
    $("dailyRewardButton").disabled =
      true;

    $("dailyRewardButton").textContent =
      "Alındı ✅";
  }

  showCelebration(0);

  showToast(
    `Günlük ödül: +${reward} Coin 🪙`
  );
}

function updateDailyRewardUI() {
  const today =
    new Date().toISOString()
      .slice(0, 10);

  const last =
    localStorage.getItem(
      "ders_daily_reward"
    );

  if (last === today) {
    if ($("dailyRewardText")) {
      $("dailyRewardText").textContent =
        "Bugünkü ödülünü aldın! 🎉";
    }

    if ($("dailyRewardButton")) {
      $("dailyRewardButton").disabled =
        true;

      $("dailyRewardButton").textContent =
        "Alındı ✅";
    }
  }
}

/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {
  const container = $("dynamicSection");

  if (!container) return;

  const user = currentUser || {};

  container.innerHTML = `
    <div class="card-title">
      <h2>👤 Profil</h2>
    </div>

    <div style="
      text-align:center;
      padding:10px;
    ">

      <div
        style="
          width:90px;
          height:90px;
          border-radius:50%;
          background:#e7e4ff;
          display:grid;
          place-items:center;
          font-size:45px;
          margin:0 auto 15px;
        "
      >
        🎓
      </div>

      <h2>
        ${escapeHTML(user.name || "Öğrenci")}
      </h2>

      <p style="
        color:var(--muted);
        margin:5px 0 25px;
      ">
        ${escapeHTML(user.email || "")}
      </p>

      <div class="stats">

        <div class="stat">
          <span>⭐</span>
          <strong>
            ${Number(user.xp || 0)}
          </strong>
          <small>XP</small>
        </div>

        <div class="stat">
          <span>🔥</span>
          <strong>
            ${Number(user.streak || 0)}
          </strong>
          <small>Seri</small>
        </div>

        <div class="stat">
          <span>🪙</span>
          <strong>
            ${getCoins()}
          </strong>
          <small>Coin</small>
        </div>

      </div>

      <button
        class="secondary-btn"
        style="margin-top:20px"
        onclick="toggleDarkMode()"
      >
        🌙 Tema Değiştir
      </button>

      <button
        class="danger-btn"
        style="margin-top:10px"
        onclick="logout()"
      >
        🚪 Çıkış Yap
      </button>

    </div>
  `;

  container.style.display = "block";
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigate(page, button) {
  currentPage = page;

  document
    .querySelectorAll(".menu button")
    .forEach((item) => {
      item.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  } else {
    const buttons =
      document.querySelectorAll(
        ".menu button"
      );

    buttons.forEach((item) => {
      if (
        item.getAttribute("onclick")?.includes(
          `'${page}'`
        )
      ) {
        item.classList.add("active");
      }
    });
  }

  renderPage(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function navigateMobile(page) {
  currentPage = page;

  closeMobileMenu();

  document
    .querySelectorAll(
      ".mobile-menu-item"
    )
    .forEach((item) => {
      item.classList.remove("active");
    });

  const items =
    document.querySelectorAll(
      ".mobile-menu-item"
    );

  items.forEach((item) => {
    if (
      item.getAttribute("onclick")?.includes(
        `'${page}'`
      )
    ) {
      item.classList.add("active");
    }
  });

  renderPage(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderPage(page) {
  const hero = $("homeHero");
  const tasksSection =
    $("tasksSection");

  if (hero) {
    hero.style.display =
      page === "home"
        ? "block"
        : "none";
  }

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
      renderTasksPage();
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

    default:
      renderHome();
  }

  updateSectionText(page);
}

function clearDynamic() {
  const container =
    $("dynamicSection");

  if (!container) return;

  container.innerHTML = "";
  container.style.display = "none";
}

function renderHome() {
  clearDynamic();

  updateHomeProgress();
  renderTasks();
  renderCoach();
  updatePetCard();
  updateDailyRewardUI();
}

function renderTasksPage() {
  clearDynamic();

  renderTasks();

  const tasksSection =
    $("tasksSection");

  if (tasksSection) {
    tasksSection.style.display =
      "block";
  }
}

function renderCoachPage() {
  const container =
    $("dynamicSection");

  if (!container) return;

  container.innerHTML = `
    <div class="card-title">
      <h2>🤖 Ders Koçu</h2>
    </div>

    ${
      coachData
        ? `
          <div style="
            line-height:1.8;
          ">

            <h3>
              ${escapeHTML(
                coachData.greeting ||
                  "Merhaba!"
              )}
            </h3>

            <div style="
              margin-top:15px;
            ">
              ${
                (coachData.advice || [])
                  .map(
                    (item) => `
                      <div style="
                        padding:15px;
                        border:1px solid var(--border);
                        border-radius:15px;
                        margin-bottom:10px;
                      ">
                        <strong>
                          ${item.icon || "💡"}
                          ${escapeHTML(
                            item.title
                          )}
                        </strong>

                        <p style="
                          color:var(--muted);
                          margin-top:5px;
                        ">
                          ${escapeHTML(
                            item.text
                          )}
                        </p>
                      </div>
                    `
                  )
                  .join("")
              }
            </div>

            <div class="stats">

              <div class="stat">
                <strong>
                  ${coachData.incomplete_tasks}
                </strong>
                <small>
                  Bekleyen görev
                </small>
              </div>

              <div class="stat">
                <strong>
                  ${coachData.upcoming_exams}
                </strong>
                <small>
                  Yaklaşan sınav
                </small>
              </div>

              <div class="stat">
                <strong>
                  ${coachData.recommended.minutes}
                </strong>
                <small>
                  Önerilen dakika
                </small>
              </div>

            </div>

          </div>
        `
        : `
          <p style="color:var(--muted)">
            Ders Koçu verisi yükleniyor...
          </p>
        `
    }
  `;

  container.style.display = "block";
}

/* =========================================================
   HOME
   ========================================================= */

function renderEverything() {
  updateUserUI();

  updateHomeProgress();

  renderTasks();

  renderCoach();

  updatePetCard();

  updateDailyRewardUI();

  if (currentPage !== "home") {
    renderPage(currentPage);
  }
}

function updateHomeProgress() {
  const total = tasks.length;

  const completed =
    tasks.filter(
      (task) => task.completed
    ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  if ($("progressBar")) {
    $("progressBar").style.width =
      `${percentage}%`;
  }

  if ($("taskSummary")) {
    if (total === 0) {
      $("taskSummary").textContent =
        "Bugünün ilk görevini ekle.";
    } else if (completed === total) {
      $("taskSummary").textContent =
        "Harika! Bugünkü tüm görevlerin tamamlandı! 🎉";
    } else {
      $("taskSummary").textContent =
        `${completed}/${total} görev tamamlandı.`;
    }
  }

  if ($("xpText")) {
    $("xpText").textContent =
      `${Number(currentUser?.xp || 0)} XP`;
  }
}

/* =========================================================
   USER UI
   ========================================================= */

function updateUserUI() {
  if (!currentUser) return;

  const name =
    currentUser.name || "Öğrenci";

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
  }

  const xp =
    Number(currentUser.xp || 0);

  const level =
    Math.floor(xp / 100) + 1;

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
      Number(
        currentUser.streak || 0
      );
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      getCoins();
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent =
      Number(
        currentUser.streak || 0
      );
  }

  updatePetCard();
}

/* =========================================================
   SECTION TEXT
   ========================================================= */

function updateSectionText(page) {
  const titles = {
    home: [
      "Merhaba! 👋",
      "Bugün küçük bir adım, yarın büyük bir başarı."
    ],

    tasks: [
      "Görevlerin 🎯",
      "Bugün neleri tamamlayacaksın?"
    ],

    subjects: [
      "Derslerin 📚",
      "Derslerini düzenli takip et."
    ],

    exams: [
      "Sınavların 📅",
      "Sınavlarına zamanında hazırlan."
    ],

    focus: [
      "Odaklan ⏱️",
      "Şimdi çalışma zamanı."
    ],

    coach: [
      "Ders Koçu 🤖",
      "Bugün senin için önerilerim var."
    ],

    pet: [
      "Evcil Hayvan 🐣",
      "Evcil hayvanını geliştir."
    ],

    market: [
      "Market 🛒",
      "Coinlerini ödüller için kullan."
    ],

    achievements: [
      "Rozetler 🏆",
      "Başarılarını topla."
    ],

    stats: [
      "İstatistikler 📊",
      "Çalışma performansını takip et."
    ],

    profile: [
      "Profil 👤",
      "Hesabını ve ilerlemeni yönet."
    ]
  };

  const data =
    titles[page] || titles.home;

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      currentPage === "home"
        ? `Merhaba, ${
            currentUser?.name ||
            "Öğrenci"
          }! 👋`
        : data[0];
  }

  if ($("sectionSubtitle")) {
    $("sectionSubtitle").textContent =
      data[1];
  }
}

/* =========================================================
   DARK MODE
   ========================================================= */

function applyDarkMode() {
  document.body.classList.toggle(
    "dark",
    darkMode
  );
}

function toggleDarkMode() {
  darkMode = !darkMode;

  localStorage.setItem(
    "ders_dark",
    darkMode ? "1" : "0"
  );

  applyDarkMode();

  showToast(
    darkMode
      ? "Karanlık mod açıldı 🌙"
      : "Aydınlık mod açıldı ☀️"
  );

  if (currentPage === "profile") {
    renderProfile();
  }
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
   MODAL
   ========================================================= */

function openModal(title, content) {
  if (!$("modal")) return;

  $("modalTitle").textContent =
    title;

  $("modalContent").innerHTML =
    content;

  $("modal").classList.add("show");
}

function closeModal() {
  if (!$("modal")) return;

  $("modal").classList.remove("show");
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {
  const container =
    $("toastContainer");

  if (!container) return;

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateY(10px)";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}

/* =========================================================
   CELEBRATION
   ========================================================= */

function showCelebration(xp = 50) {
  const celebration =
    $("celebration");

  if (!celebration) return;

  const text =
    $("celebrationText");

  if (text) {
    text.textContent =
      xp > 0
        ? `⭐ +${xp} XP`
        : "🎁 Ödül kazandın!";
  }

  celebration.style.display =
    "flex";

  setTimeout(() => {
    celebration.style.display =
      "none";
  }, 1800);
}

/* =========================================================
   PASSWORD
   ========================================================= */

function togglePassword(
  inputId,
  button
) {
  const input = $(inputId);

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

/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!value) return "-";

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "tr-TR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  );
}

function getDaysUntil(value) {
  const target =
    new Date(value);

  const now =
    new Date();

  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target - now) /
      (1000 * 60 * 60 * 24)
  );
}

/* =========================================================
   KEYBOARD
   ========================================================= */

function setupKeyboardShortcuts() {
  document.addEventListener(
    "keydown",
    (event) => {
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
   GLOBAL EXPORTS
   HTML onclick="..." KULLANDIĞI İÇİN
   ========================================================= */

window.showLogin = showLogin;
window.showRegister = showRegister;

window.login = login;
window.register = register;
window.logout = logout;

window.togglePassword =
  togglePassword;

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

window.openSubjectModal =
  openSubjectModal;

window.openExamModal =
  openExamModal;

window.addExam =
  addExam;

window.deleteExam =
  deleteExam;

window.startFocus =
  startFocus;

window.pauseFocus =
  pauseFocus;

window.resetFocus =
  resetFocus;

window.claimDailyReward =
  claimDailyReward;

window.feedPet =
  feedPet;

window.renamePet =
  renamePet;

window.buyItem =
  buyItem;

window.toggleDarkMode =
  toggleDarkMode;

window.openModal =
  openModal;

window.closeModal =
  closeModal;
