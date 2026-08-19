/* =========================================================
   DERS TAKİP 2.0 - APP.JS
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
  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    xp: 0
  },
  coins: 0,
  dailyRewardClaimed: false
};

/* =========================================================
   GENEL API
   ========================================================= */

async function api(action, options = {}) {
  const url = `${API}?action=${encodeURIComponent(action)}`;

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
      data.message || `API hatası: ${response.status}`
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
    item.style.borderLeft = "5px solid #20c997";
  }

  if (type === "error") {
    item.style.borderLeft = "5px solid #ff5b6e";
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
  $("loginForm").style.display = "block";
  $("registerForm").style.display = "none";

  $("loginTab").classList.add("active");
  $("registerTab").classList.remove("active");

  $("authMessage").textContent = "";
}

function showRegister() {
  $("loginForm").style.display = "none";
  $("registerForm").style.display = "block";

  $("loginTab").classList.remove("active");
  $("registerTab").classList.add("active");

  $("authMessage").textContent = "";
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

async function login(event) {
  event.preventDefault();

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  const message = $("authMessage");

  message.style.color = "#6857f5";
  message.textContent = "Giriş yapılıyor...";

  try {
    const data = await api("login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    currentUser = data.user;

    message.style.color = "#20a878";
    message.textContent = "Giriş başarılı! 🚀";

    await startApp();
  } catch (error) {
    message.style.color = "#ff5b6e";
    message.textContent = error.message;
  }
}

async function register(event) {
  event.preventDefault();

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;

  const message = $("authMessage");

  message.style.color = "#6857f5";
  message.textContent = "Hesap oluşturuluyor...";

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

    message.style.color = "#20a878";
    message.textContent = "Hesabın oluşturuldu! 🎉";

    await startApp();
  } catch (error) {
    message.style.color = "#ff5b6e";
    message.textContent = error.message;
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

  $("app").style.display = "none";
  $("authScreen").style.display = "flex";

  showLogin();

  toast("Çıkış yapıldı 👋");
}

/* =========================================================
   APP BAŞLAT
   ========================================================= */

async function startApp() {
  $("authScreen").style.display = "none";
  $("app").style.display = "block";

  await loadAllData();

  navigate("home");

  updateUserUI();
}

/* =========================================================
   VERİLERİ YÜKLE
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

    currentUser = meData.user;

    tasks = tasksData.tasks || [];
    subjects = subjectsData.subjects || [];
    exams = examsData.exams || [];
    achievements = achievementsData.achievements || [];
    coachData = coachResult.coach || null;

    state.coins =
      Number(currentUser.coins) ||
      Number(currentUser.paralar) ||
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

    toast(error.message, "error");
  }
}

/* =========================================================
   KULLANICI UI
   ========================================================= */

function updateUserUI() {
  if (!currentUser) return;

  const name = currentUser.name || "Öğrenci";
  const xp = Number(currentUser.xp) || 0;
  const streak = Number(currentUser.streak) || 0;

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
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

  const level = calculateLevel(xp);

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${level}`;
  }

  updateXPBar(xp);
}

/* =========================================================
   LEVEL / XP
   ========================================================= */

function calculateLevel(xp) {
  return Math.floor(xp / 500) + 1;
}

function updateXPBar(xp) {
  const level = calculateLevel(xp);
  const levelStart = (level - 1) * 500;
  const progress =
    ((xp - levelStart) / 500) * 100;

  if ($("progressBar")) {
    $("progressBar").style.width =
      `${Math.min(100, Math.max(0, progress))}%`;
  }

  if ($("xpText")) {
    $("xpText").textContent =
      `${xp} XP • Seviye ${level}`;
  }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigate(page, button = null) {
  state.currentPage = page;

  closeMobileMenu();

  document
    .querySelectorAll(".menu button")
    .forEach((item) => {
      item.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  } else {
    document
      .querySelectorAll(".menu button")
      .forEach((item) => {
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
}

function navigateMobile(page) {
  navigate(page);

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach((item) => {
      item.classList.remove("active");
    });

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach((item) => {
      if (
        item.getAttribute("onclick")?.includes(
          `'${page}'`
        )
      ) {
        item.classList.add("active");
      }
    });

  closeMobileMenu();
}

function renderPage(page) {
  const dynamic = $("dynamicSection");

  if (!dynamic) return;

  dynamic.style.display = "block";

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

  updateSectionTitle(page);
}

/* =========================================================
   SECTION TITLES
   ========================================================= */

function updateSectionTitle(page) {
  const titles = {
    home: "Bugün küçük bir adım, yarın büyük bir başarı.",
    tasks: "Görevlerini tamamla ve XP kazan.",
    subjects: "Derslerini düzenli şekilde takip et.",
    exams: "Sınavlarını önceden planla.",
    focus: "Telefonu bırak, derse odaklan. ⏱️",
    coach: "Ders Koçun sana bugün yol göstersin.",
    pet: "Çalıştıkça evcil hayvanın gelişsin. 🐣",
    market: "Coinlerini ödüllere dönüştür.",
    achievements: "Başarılarını ve rozetlerini gör.",
    stats: "Çalışma performansını incele.",
    profile: "Hesabını ve profilini yönet."
  };

  if ($("sectionSubtitle")) {
    $("sectionSubtitle").textContent =
      titles[page] || titles.home;
  }
}

/* =========================================================
   HOME
   ========================================================= */

function renderHome() {
  $("homeHero").style.display = "block";

  $("tasksSection").style.display = "block";

  $("dynamicSection").style.display = "none";

  const total = tasks.length;

  const completed =
    tasks.filter((task) => task.completed).length;

  if ($("taskSummary")) {
    $("taskSummary").textContent =
      total === 0
        ? "Bugün için henüz görev eklemedin."
        : `${completed}/${total} görevi tamamladın.`;
  }

  renderTasks();
  renderCoachMini();
  updateUserUI();
}

function renderCoachMini() {
  if (!coachData || !coachData.advice) return;

  const first =
    coachData.advice[0];

  if ($("coachMessage") && first) {
    $("coachMessage").textContent =
      `${first.icon || "🤖"} ${first.title}: ${first.text}`;
  }
}

/* =========================================================
   TASKS
   ========================================================= */

async function loadTasks() {
  const data = await api("tasks");
  tasks = data.tasks || [];
  renderTasks();
}

function renderTasks() {
  const list = $("taskList");

  if (!list) return;

  if (tasks.length === 0) {
    list.innerHTML = `
      <div style="
        padding:30px;
        text-align:center;
        color:var(--muted);
      ">
        Henüz görev yok. İlk görevini ekle! 🎯
      </div>
    `;

    if ($("taskCounter")) {
      $("taskCounter").textContent = "0 / 0";
    }

    return;
  }

  const completed =
    tasks.filter((task) => task.completed).length;

  if ($("taskCounter")) {
    $("taskCounter").textContent =
      `${completed} / ${tasks.length}`;
  }

  list.innerHTML = tasks.map((task) => `
    <div class="task ${task.completed ? "completed" : ""}">
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

async function addTask() {
  const input = $("newTask");

  if (!input) return;

  const title = input.value.trim();

  if (!title) {
    toast("Görev adı yazmalısın.", "error");
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

    toast("Görev eklendi! 🎯", "success");

    if (state.currentPage === "home") {
      renderHome();
    }
  } catch (error) {
    toast(error.message, "error");
  }
}

async function toggleTask(id) {
  try {
    const oldTask =
      tasks.find((task) => Number(task.id) === Number(id));

    const data = await api("tasks", {
      method: "PATCH",
      body: {
        id
      }
    });

    await loadTasks();
    await refreshUser();

    if (data.completed) {
      showCelebration(50);
      await refreshCoach();
    } else {
      toast("Görev tekrar açıldı.");
    }

    renderHome();
  } catch (error) {
    toast(error.message, "error");
  }
}

async function deleteTask(id) {
  if (!confirm("Bu görevi silmek istediğine emin misin?")) {
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

    toast("Görev silindi 🗑️", "success");
  } catch (error) {
    toast(error.message, "error");
  }
}

function renderTasksPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>✅ Görevlerim</h2>
      <span>${tasks.length} görev</span>
    </div>

    <div id="allTasksList"></div>

    <div class="add-task">
      <input
        id="pageNewTask"
        placeholder="Yeni görev ekle..."
        maxlength="150"
      >
      <button class="primary-btn" onclick="addTaskFromPage()">
        + Görev Ekle
      </button>
    </div>
  `;

  const list = $("allTasksList");

  if (tasks.length === 0) {
    list.innerHTML = `
      <p style="color:var(--muted);padding:20px 0">
        Henüz görev eklenmemiş.
      </p>
    `;
  } else {
    list.innerHTML = tasks.map((task) => `
      <div class="task ${task.completed ? "completed" : ""}">
        <button
          class="checkbox"
          onclick="toggleTask(${task.id})"
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
        >
          🗑️
        </button>
      </div>
    `).join("");
  }
}

async function addTaskFromPage() {
  const input = $("pageNewTask");

  if (!input || !input.value.trim()) return;

  const title = input.value.trim();

  try {
    await api("tasks", {
      method: "POST",
      body: {
        title
      }
    });

    input.value = "";

    await loadTasks();

    renderTasksPage();

    toast("Görev eklendi! 🎯", "success");
  } catch (error) {
    toast(error.message, "error");
  }
}

/* =========================================================
   SUBJECTS
   ========================================================= */

async function loadSubjects() {
  const data = await api("subjects");
  subjects = data.subjects || [];
}

function renderSubjectsPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>📚 Derslerim</h2>
      <button class="primary-btn" onclick="openSubjectModal()">
        + Ders Ekle
      </button>
    </div>

    <div class="market-grid">
      ${
        subjects.length
          ? subjects.map(subject => `
            <div class="shop-item">
              <div class="shop-icon">📚</div>

              <h3>
                ${escapeHTML(subject.name)}
              </h3>

              <p>
                Ders
              </p>

              <button
                class="danger-btn"
                onclick="deleteSubject(${subject.id})"
              >
                Sil
              </button>
            </div>
          `).join("")
          : `
            <p style="color:var(--muted)">
              Henüz ders eklemedin.
            </p>
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
  const input = $("subjectName");

  if (!input || !input.value.trim()) {
    toast("Ders adı gerekli.", "error");
    return;
  }

  try {
    await api("subjects", {
      method: "POST",
      body: {
        name: input.value.trim(),
        color: "#6c63ff"
      }
    });

    closeModal();

    await loadSubjects();

    renderSubjectsPage();

    toast("Ders eklendi 📚", "success");
  } catch (error) {
    toast(error.message, "error");
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

    await loadSubjects();

    renderSubjectsPage();

    toast("Ders silindi.", "success");
  } catch (error) {
    toast(error.message, "error");
  }
}

/* =========================================================
   EXAMS
   ========================================================= */

async function loadExams() {
  const data = await api("exams");
  exams = data.exams || [];
}

function renderExamsPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>📅 Sınavlarım</h2>

      <button
        class="primary-btn"
        onclick="openExamModal()"
      >
        + Sınav Ekle
      </button>
    </div>

    ${
      exams.length
        ? exams.map(exam => `
          <div class="task">
            <div style="font-size:30px">
              📅
            </div>

            <div class="task-content">
              <div class="task-name">
                ${escapeHTML(exam.title)}
              </div>

              <small style="color:var(--muted)">
                ${escapeHTML(exam.subject_name || "Ders yok")}
                •
                ${formatDate(exam.exam_date)}
              </small>

              ${
                exam.topic
                  ? `
                    <div style="
                      color:var(--muted);
                      margin-top:5px;
                    ">
                      Konu: ${escapeHTML(exam.topic)}
                    </div>
                  `
                  : ""
              }
            </div>

            <button
              class="danger-btn"
              onclick="deleteExam(${exam.id})"
            >
              Sil
            </button>
          </div>
        `).join("")
        : `
          <div style="
            text-align:center;
            padding:30px;
            color:var(--muted);
          ">
            Henüz sınav eklemedin. 📅
          </div>
        `
    }
  `;
}

function openExamModal() {
  const subjectOptions = subjects
    .map(
      subject => `
        <option value="${subject.id}">
          ${escapeHTML(subject.name)}
        </option>
      `
    )
    .join("");

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
  const title = $("examTitle").value.trim();
  const exam_date = $("examDate").value;
  const subject_id = $("examSubject").value;
  const topic = $("examTopic").value.trim();

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
        subject_id: subject_id
          ? Number(subject_id)
          : null,
        topic: topic || null
      }
    });

    closeModal();

    await loadExams();

    renderExamsPage();

    toast("Sınav eklendi 📅", "success");
  } catch (error) {
    toast(error.message, "error");
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

    await loadExams();

    renderExamsPage();

    toast("Sınav silindi.", "success");
  } catch (error) {
    toast(error.message, "error");
  }
}

/* =========================================================
   FOCUS
   ========================================================= */

function renderFocusPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div class="focus">
      <h2>⏱️ Odaklanma</h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        25 dakika çalış, XP kazan.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        ${formatTimer(timerSeconds)}
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
    </div>
  `;
}

function formatTimer(seconds) {
  const min =
    String(Math.floor(seconds / 60)).padStart(2, "0");

  const sec =
    String(seconds % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

function updateTimerUI() {
  const timer = $("focusTimer");

  if (timer) {
    timer.textContent =
      formatTimer(timerSeconds);
  }
}

function startTimer() {
  if (timerRunning) return;

  timerRunning = true;

  timerInterval = setInterval(() => {
    timerSeconds--;

    updateTimerUI();

    if (timerSeconds <= 0) {
      finishFocus();
    }
  }, 1000);

  toast("Odaklanma başladı! 🔥", "success");
}

function pauseTimer() {
  timerRunning = false;

  clearInterval(timerInterval);

  toast("Odaklanma duraklatıldı.");
}

function resetTimer() {
  timerRunning = false;

  clearInterval(timerInterval);

  timerSeconds = 25 * 60;

  updateTimerUI();

  toast("Sayaç sıfırlandı.");
}

async function finishFocus() {
  clearInterval(timerInterval);

  timerRunning = false;
  timerSeconds = 25 * 60;

  updateTimerUI();

  try {
    const data = await api("sessions", {
      method: "POST",
      body: {
        duration_minutes: 25
      }
    });

    await refreshUser();

    showCelebration(data.earned_xp || 25);

    await refreshCoach();
  } catch (error) {
    toast(error.message, "error");
  }
}

/* =========================================================
   COACH
   ========================================================= */

async function refreshCoach() {
  try {
    const data = await api("coach");

    coachData = data.coach;

    renderCoachMini();

    if (state.currentPage === "coach") {
      renderCoachPage();
    }
  } catch (error) {
    console.error(error);
  }
}

function renderCoachPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  if (!coachData) {
    dynamic.innerHTML = `
      <div style="text-align:center;padding:30px">
        Ders Koçu yükleniyor... 🤖
      </div>
    `;
    return;
  }

  const c = coachData;

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>🤖 ${escapeHTML(c.greeting || "Ders Koçu")}</h2>
      <span>
        ${c.priority === "urgent"
          ? "🚨 Acil"
          : c.priority === "high"
          ? "⚠️ Öncelikli"
          : "✅ Normal"}
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

    <h3 style="margin:25px 0 12px">
      🎯 Bugünkü öneriler
    </h3>

    ${
      (c.advice || []).map(item => `
        <div class="task">
          <div style="font-size:28px">
            ${item.icon || "🤖"}
          </div>

          <div class="task-content">
            <strong>
              ${escapeHTML(item.title)}
            </strong>

            <div style="
              color:var(--muted);
              margin-top:5px;
              line-height:1.5;
            ">
              ${escapeHTML(item.text)}
            </div>
          </div>
        </div>
      `).join("")
    }

    <div class="card" style="
      margin-top:20px;
      background:#f0efff;
    ">
      <h3>🎯 Günlük hedef</h3>

      <p style="
        margin-top:8px;
        color:var(--muted);
      ">
        ${c.recommended.tasks} görev
        +
        ${c.recommended.minutes} dakika
        odaklanma
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
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const level =
    Math.max(1, Math.floor(xp / 500) + 1);

  state.pet.level = level;

  dynamic.innerHTML = `
    <div class="pet-card">
      <h2>🐣 Evcil Hayvanım</h2>

      <div class="pet-display"
        style="height:250px;font-size:130px"
      >
        ${state.pet.emoji}
      </div>

      <div class="pet-name">
        ${escapeHTML(state.pet.name)}
      </div>

      <div class="pet-level">
        Seviye ${level}
      </div>

      <div class="progress"
        style="
          background:#eee;
          margin-top:20px;
        "
      >
        <span
          style="
            width:${(xp % 500) / 5}%;
            background:var(--primary);
          "
        ></span>
      </div>

      <p style="
        color:var(--muted);
        margin-top:10px;
      ">
        Ders çalıştıkça evcil hayvanın gelişir! 🐼
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
    "🐣 Evcil Hayvan",
    `
      <div class="form-group">
        <label>Yeni isim</label>

        <input
          id="newPetName"
          value="${escapeHTML(state.pet.name)}"
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
  const input = $("newPetName");

  if (!input || !input.value.trim()) return;

  state.pet.name =
    input.value.trim().slice(0, 30);

  localStorage.setItem(
    "ders_takip_pet_name",
    state.pet.name
  );

  closeModal();

  renderPetPage();

  updatePetHome();

  toast("Evcil hayvanının adı değişti 🐣", "success");
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
        Number(currentUser?.xp) || 0
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
    description: "Profiline özel görünüm.",
    price: 100
  },
  {
    id: "hat",
    icon: "🎩",
    name: "Şık Şapka",
    description: "Evcil hayvanına tak.",
    price: 150
  },
  {
    id: "crown",
    icon: "👑",
    name: "Kraliyet Tacı",
    description: "Seviyeni göster.",
    price: 300
  },
  {
    id: "rocket",
    icon: "🚀",
    name: "Hızlı Başlangıç",
    description: "Motivasyon ödülü.",
    price: 500
  }
];

function renderMarketPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>🛒 Ödül Marketi</h2>

      <strong>
        🪙 ${state.coins} Coin
      </strong>
    </div>

    <div class="market-grid">
      ${marketItems.map(item => `
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
      `).join("")}
    </div>

    <div style="
      margin-top:20px;
      padding:15px;
      border-radius:15px;
      background:#fff8dc;
    ">
      💡 Coin sistemi şu anda bu sürümde
      tarayıcı üzerinde çalışıyor.
    </div>
  `;
}

function buyItem(id) {
  const item =
    marketItems.find(
      x => x.id === id
    );

  if (!item) return;

  if (state.coins < item.price) {
    toast(
      `Yeterli coin yok. ${item.price} Coin gerekiyor.`,
      "error"
    );
    return;
  }

  state.coins -= item.price;

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
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const completed =
    tasks.filter(t => t.completed).length;

  const definitions = [
    {
      icon: "🌱",
      title: "İlk Adım",
      text: "İlk görevini tamamla.",
      unlocked: completed >= 1
    },
    {
      icon: "🔥",
      title: "Çalışkan",
      text: "5 görev tamamla.",
      unlocked: completed >= 5
    },
    {
      icon: "⭐",
      title: "XP Avcısı",
      text: "500 XP kazan.",
      unlocked: xp >= 500
    },
    {
      icon: "🏆",
      title: "Usta Öğrenci",
      text: "1000 XP kazan.",
      unlocked: xp >= 1000
    },
    {
      icon: "📚",
      title: "Ders Sever",
      text: "3 ders ekle.",
      unlocked: subjects.length >= 3
    },
    {
      icon: "📅",
      title: "Planlı Öğrenci",
      text: "3 sınav ekle.",
      unlocked: exams.length >= 3
    }
  ];

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>🏆 Rozetler</h2>
    </div>

    <div class="badges">
      ${definitions.map(badge => `
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
      `).join("")}
    </div>
  `;
}

/* =========================================================
   STATS
   ========================================================= */

async function renderStatsPage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  dynamic.innerHTML = `
    <div style="
      text-align:center;
      padding:30px;
    ">
      📊 İstatistikler yükleniyor...
    </div>
  `;

  try {
    const data = await api("stats");

    const s = data.stats;

    const totalTasks =
      Number(s.tasks?.total) || 0;

    const completedTasks =
      Number(s.tasks?.completed) || 0;

    const taskPercent =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100
          )
        : 0;

    dynamic.innerHTML = `
      <div class="card-title">
        <h2>📊 İstatistikler</h2>
      </div>

      <div class="stats">

        <div class="stat">
          <span>🎯</span>
          <strong>${totalTasks}</strong>
          <small>Toplam görev</small>
        </div>

        <div class="stat">
          <span>✅</span>
          <strong>${completedTasks}</strong>
          <small>Tamamlanan görev</small>
        </div>

        <div class="stat">
          <span>📈</span>
          <strong>${taskPercent}%</strong>
          <small>Görev başarı oranı</small>
        </div>

        <div class="stat">
          <span>📚</span>
          <strong>${s.subjects}</strong>
          <small>Ders</small>
        </div>

        <div class="stat">
          <span>📅</span>
          <strong>${s.exams}</strong>
          <small>Sınav</small>
        </div>

        <div class="stat">
          <span>⏱️</span>
          <strong>${s.sessions.minutes}</strong>
          <small>Odak dakikası</small>
        </div>

      </div>

      <div class="card" style="
        margin-top:20px;
        background:#f0efff;
      ">
        <h3>🔥 Genel durum</h3>

        <p style="
          margin-top:8px;
          color:var(--muted);
        ">
          ${
            taskPercent >= 80
              ? "Muhteşem gidiyorsun! 🚀"
              : taskPercent >= 50
              ? "Gayet iyi! Biraz daha devam. 💪"
              : "Bugün birkaç görev tamamlayarak başlayabilirsin. 🎯"
          }
        </p>
      </div>
    `;
  } catch (error) {
    dynamic.innerHTML = `
      <p style="color:#ff5b6e">
        ${escapeHTML(error.message)}
      </p>
    `;
  }
}

/* =========================================================
   PROFILE
   ========================================================= */

function renderProfilePage() {
  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");

  dynamic.style.display = "block";

  const name =
    currentUser?.name || "Öğrenci";

  const email =
    currentUser?.email || "";

  const xp =
    Number(currentUser?.xp) || 0;

  const streak =
    Number(currentUser?.streak) || 0;

  const level =
    calculateLevel(xp);

  dynamic.innerHTML = `
    <div style="
      text-align:center;
      padding:15px 0 30px;
    ">

      <div style="
        width:90px;
        height:90px;
        border-radius:50%;
        background:#e7e4ff;
        display:grid;
        place-items:center;
        font-size:45px;
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

    </div>

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
  `;
}

/* =========================================================
   DAILY REWARD
   ========================================================= */

function loadDailyReward() {
  const today =
    new Date().toISOString().slice(0, 10);

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

  if (!button || !text) return;

  if (state.dailyRewardClaimed) {
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
  if (state.dailyRewardClaimed) {
    toast("Bugünkü ödülü zaten aldın.");
    return;
  }

  const today =
    new Date().toISOString().slice(0, 10);

  const reward = 25;

  state.coins += reward;

  state.dailyRewardClaimed = true;

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
    const data = await api("me");

    currentUser = data.user;

    updateUserUI();
    updatePetHome();

    const coins =
      localStorage.getItem(
        "ders_takip_coins"
      );

    if (coins !== null) {
      state.coins = Number(coins) || 0;
    }
  } catch (error) {
    console.error(error);
  }
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(title, content) {
  $("modalTitle").textContent = title;
  $("modalContent").innerHTML = content;

  $("modal").classList.add("show");
}

function closeModal() {
  $("modal").classList.remove("show");
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
      `⭐ +${xp} XP`;
  }

  celebration.style.display = "flex";

  setTimeout(() => {
    celebration.style.display = "none";
  }, 1800);
}

/* =========================================================
   DARK MODE
   ========================================================= */

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  state.darkMode =
    document.body.classList.contains("dark");

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
    document.body.classList.add("dark");
    state.darkMode = true;
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
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   DATE
   ========================================================= */

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
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
   INIT
   ========================================================= */

async function init() {
  loadDarkMode();
  loadPet();
  loadDailyReward();

  try {
    const data = await api("me");

    currentUser = data.user;

    await startApp();
  } catch {
    $("app").style.display = "none";
    $("authScreen").style.display = "flex";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
/* =========================================================
   DERS TAKİP 2.0 - YENİ MENÜ TASARIM SİSTEMİ
   Mevcut API ve veriler korunur.
   Her menü kendine özel görünüme sahip olur.
   ========================================================= */

(function injectNewMenuDesign() {

  if (document.getElementById("dersTakipNewDesign")) return;

  const style = document.createElement("style");
  style.id = "dersTakipNewDesign";

  style.textContent = `
    /* ================================
       GENEL
    ================================= */

    .dt-page {
      animation: dtPageIn .35s ease;
    }

    @keyframes dtPageIn {
      from {
        opacity:0;
        transform:translateY(12px);
      }
      to {
        opacity:1;
        transform:translateY(0);
      }
    }

    .dt-header {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:20px;
      margin-bottom:25px;
      flex-wrap:wrap;
    }

    .dt-title {
      font-size:28px;
      font-weight:800;
      margin:0;
    }

    .dt-subtitle {
      margin-top:6px;
      color:var(--muted);
    }

    .dt-card {
      background:var(--white);
      border:1px solid var(--border);
      border-radius:22px;
      padding:22px;
      box-shadow:0 8px 30px rgba(40,40,80,.06);
    }

    .dt-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:18px;
    }

    .dt-big-number {
      font-size:34px;
      font-weight:900;
      margin-top:8px;
    }

    .dt-label {
      color:var(--muted);
      font-size:14px;
    }

    .dt-icon {
      width:52px;
      height:52px;
      border-radius:16px;
      display:grid;
      place-items:center;
      font-size:26px;
      background:#f1efff;
    }

    .dt-empty {
      text-align:center;
      padding:45px 20px;
      color:var(--muted);
    }

    /* ================================
       HOME
    ================================= */

    .dt-home {
      display:grid;
      grid-template-columns:1.5fr 1fr;
      gap:20px;
    }

    .dt-welcome {
      min-height:230px;
      border-radius:28px;
      padding:30px;
      color:white;
      background:
        linear-gradient(
          135deg,
          #6c63ff,
          #8c7cff,
          #54b7ff
        );
      box-shadow:0 15px 40px rgba(108,99,255,.25);
      position:relative;
      overflow:hidden;
    }

    .dt-welcome h1 {
      font-size:34px;
      margin:0;
    }

    .dt-welcome p {
      opacity:.9;
      margin-top:12px;
      line-height:1.6;
    }

    .dt-welcome .emoji {
      position:absolute;
      right:25px;
      bottom:15px;
      font-size:100px;
      opacity:.9;
    }

    .dt-stat-grid {
      display:grid;
      grid-template-columns:repeat(2,1fr);
      gap:14px;
    }

    .dt-stat-card {
      background:var(--white);
      border:1px solid var(--border);
      border-radius:20px;
      padding:20px;
    }

    /* ================================
       TASKS
    ================================= */

    .dt-task-page {
      background:linear-gradient(180deg,#f8f7ff,transparent);
      border-radius:28px;
      padding:25px;
    }

    .dt-task-item {
      display:flex;
      align-items:center;
      gap:15px;
      padding:17px;
      border-radius:18px;
      margin-bottom:10px;
      background:var(--white);
      border:1px solid var(--border);
      transition:.2s;
    }

    .dt-task-item:hover {
      transform:translateX(4px);
      box-shadow:0 8px 20px rgba(0,0,0,.06);
    }

    .dt-task-check {
      width:38px;
      height:38px;
      border-radius:12px;
      border:2px solid #6c63ff;
      background:white;
      cursor:pointer;
      font-size:18px;
    }

    .dt-task-item.completed {
      opacity:.6;
    }

    .dt-task-item.completed .task-title {
      text-decoration:line-through;
    }

    .dt-task-title {
      font-weight:700;
    }

    .dt-task-xp {
      margin-left:auto;
      color:#f4a000;
      font-weight:800;
    }

    /* ================================
       SUBJECTS
    ================================= */

    .dt-subject-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:18px;
    }

    .dt-subject {
      border-radius:24px;
      padding:24px;
      min-height:180px;
      background:linear-gradient(
        145deg,
        #ffffff,
        #f2f0ff
      );
      border:1px solid var(--border);
      position:relative;
      overflow:hidden;
    }

    .dt-subject:nth-child(2n) {
      background:linear-gradient(
        145deg,
        #ffffff,
        #eaf8ff
      );
    }

    .dt-subject:nth-child(3n) {
      background:linear-gradient(
        145deg,
        #ffffff,
        #fff4e8
      );
    }

    .dt-subject-icon {
      font-size:45px;
      margin-bottom:15px;
    }

    .dt-subject h3 {
      margin:0;
      font-size:20px;
    }

    /* ================================
       EXAMS
    ================================= */

    .dt-exam-timeline {
      position:relative;
      padding-left:30px;
    }

    .dt-exam-timeline:before {
      content:"";
      position:absolute;
      left:8px;
      top:0;
      bottom:0;
      width:3px;
      background:#6c63ff;
      border-radius:5px;
    }

    .dt-exam {
      position:relative;
      background:var(--white);
      border:1px solid var(--border);
      border-radius:20px;
      padding:20px;
      margin-bottom:18px;
    }

    .dt-exam:before {
      content:"";
      position:absolute;
      left:-28px;
      top:25px;
      width:13px;
      height:13px;
      background:#6c63ff;
      border:4px solid var(--white);
      border-radius:50%;
      box-shadow:0 0 0 2px #6c63ff;
    }

    .dt-exam-date {
      color:#6c63ff;
      font-weight:800;
      margin-bottom:8px;
    }

    /* ================================
       FOCUS
    ================================= */

    .dt-focus {
      min-height:500px;
      border-radius:32px;
      padding:40px 25px;
      text-align:center;
      background:
        radial-gradient(
          circle at top,
          #e9e7ff,
          #f8f9ff 45%,
          #ffffff
        );
    }

    .dt-focus h2 {
      font-size:30px;
    }

    .dt-focus-timer {
      width:280px;
      height:280px;
      border-radius:50%;
      margin:35px auto;
      display:grid;
      place-items:center;
      font-size:55px;
      font-weight:900;
      color:#6257df;
      background:white;
      border:15px solid #e8e5ff;
      box-shadow:
        0 20px 50px rgba(108,99,255,.18),
        inset 0 0 30px rgba(108,99,255,.05);
    }

    .dt-focus-mode {
      display:inline-block;
      padding:8px 18px;
      border-radius:50px;
      background:#e9e7ff;
      color:#6257df;
      font-weight:700;
    }

    /* ================================
       COACH
    ================================= */

    .dt-coach {
      background:
        linear-gradient(
          135deg,
          #17162b,
          #2b2760
        );
      color:white;
      border-radius:28px;
      padding:30px;
    }

    .dt-coach-header {
      display:flex;
      align-items:center;
      gap:18px;
      margin-bottom:25px;
    }

    .dt-robot {
      width:75px;
      height:75px;
      border-radius:22px;
      display:grid;
      place-items:center;
      font-size:42px;
      background:rgba(255,255,255,.12);
    }

    .dt-advice {
      background:rgba(255,255,255,.09);
      border:1px solid rgba(255,255,255,.12);
      padding:18px;
      border-radius:18px;
      margin-top:12px;
    }

    /* ================================
       PET
    ================================= */

    .dt-pet {
      text-align:center;
      padding:30px;
      border-radius:30px;
      background:
        linear-gradient(
          180deg,
          #fff7e8,
          #fff
        );
    }

    .dt-pet-avatar {
      width:230px;
      height:230px;
      border-radius:50%;
      margin:25px auto;
      display:grid;
      place-items:center;
      font-size:125px;
      background:
        radial-gradient(
          circle,
          #fff 35%,
          #ffe4a8
        );
      box-shadow:
        0 20px 50px rgba(255,184,77,.25);
      animation:petFloat 3s ease-in-out infinite;
    }

    @keyframes petFloat {
      0%,100% {
        transform:translateY(0);
      }
      50% {
        transform:translateY(-10px);
      }
    }

    /* ================================
       MARKET
    ================================= */

    .dt-market {
      background:
        linear-gradient(
          135deg,
          #fff8df,
          #fff
        );
      padding:25px;
      border-radius:28px;
    }

    .dt-market-grid {
      display:grid;
      grid-template-columns:
        repeat(auto-fit,minmax(190px,1fr));
      gap:18px;
      margin-top:20px;
    }

    .dt-product {
      text-align:center;
      background:white;
      border-radius:24px;
      padding:24px;
      border:1px solid #eee;
      transition:.2s;
    }

    .dt-product:hover {
      transform:translateY(-6px);
      box-shadow:0 15px 35px rgba(0,0,0,.08);
    }

    .dt-product-icon {
      font-size:55px;
    }

    .dt-price {
      font-size:20px;
      font-weight:900;
      color:#f39c12;
      margin:12px;
    }

    /* ================================
       ACHIEVEMENTS
    ================================= */

    .dt-achievements {
      background:
        linear-gradient(
          135deg,
          #fffbea,
          #fff
        );
      border-radius:28px;
      padding:25px;
    }

    .dt-badge-grid {
      display:grid;
      grid-template-columns:
        repeat(auto-fit,minmax(180px,1fr));
      gap:18px;
      margin-top:20px;
    }

    .dt-badge {
      text-align:center;
      padding:25px 15px;
      border-radius:24px;
      background:white;
      border:1px solid #eee;
    }

    .dt-badge-icon {
      font-size:55px;
      margin-bottom:12px;
    }

    .dt-badge.locked {
      filter:grayscale(1);
      opacity:.45;
    }

    /* ================================
       STATS
    ================================= */

    .dt-stats {
      background:
        linear-gradient(
          135deg,
          #eef8ff,
          #fff
        );
      padding:25px;
      border-radius:28px;
    }

    .dt-progress-box {
      margin-top:20px;
      background:white;
      padding:20px;
      border-radius:20px;
      border:1px solid var(--border);
    }

    .dt-progress {
      height:14px;
      background:#ececf5;
      border-radius:20px;
      overflow:hidden;
      margin-top:12px;
    }

    .dt-progress span {
      display:block;
      height:100%;
      border-radius:20px;
      background:linear-gradient(
        90deg,
        #6c63ff,
        #4dd4ac
      );
    }

    /* ================================
       PROFILE
    ================================= */

    .dt-profile {
      max-width:850px;
      margin:auto;
    }

    .dt-profile-head {
      text-align:center;
      padding:35px;
      border-radius:30px;
      background:
        linear-gradient(
          135deg,
          #6c63ff,
          #a18cff
        );
      color:white;
    }

    .dt-avatar {
      width:100px;
      height:100px;
      border-radius:50%;
      margin:auto;
      display:grid;
      place-items:center;
      font-size:50px;
      background:white;
    }

    .dt-profile-info {
      margin-top:20px;
      display:grid;
      grid-template-columns:
        repeat(auto-fit,minmax(180px,1fr));
      gap:15px;
    }

    .dt-profile-stat {
      background:var(--white);
      border:1px solid var(--border);
      border-radius:20px;
      padding:20px;
      text-align:center;
    }

    /* ================================
       MOBİL
    ================================= */

    @media(max-width:800px) {

      .dt-home {
        grid-template-columns:1fr;
      }

      .dt-welcome h1 {
        font-size:27px;
      }

      .dt-focus-timer {
        width:220px;
        height:220px;
        font-size:42px;
      }

      .dt-pet-avatar {
        width:190px;
        height:190px;
        font-size:100px;
      }

    }
  `;

  document.head.appendChild(style);

})();


/* =========================================================
   YENİ HOME
   ========================================================= */

function renderHome() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const total = tasks.length;
  const completed =
    tasks.filter(t => t.completed).length;

  const xp = Number(currentUser?.xp) || 0;
  const streak = Number(currentUser?.streak) || 0;
  const level = calculateLevel(xp);

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-home">

        <div class="dt-welcome">

          <h1>
            Hoş geldin,
            ${escapeHTML(currentUser?.name || "Öğrenci")}! 👋
          </h1>

          <p>
            Bugün de hedeflerine biraz daha yaklaş.
            DersTakip senin için burada. 🚀
          </p>

          <div style="margin-top:25px">

            <strong>
              ${completed}/${total}
            </strong>

            görev tamamlandı

          </div>

          <div class="emoji">
            📚
          </div>

        </div>


        <div class="dt-stat-grid">

          <div class="dt-stat-card">
            <div class="dt-icon">⭐</div>
            <div class="dt-big-number">${xp}</div>
            <div class="dt-label">Toplam XP</div>
          </div>

          <div class="dt-stat-card">
            <div class="dt-icon">🔥</div>
            <div class="dt-big-number">${streak}</div>
            <div class="dt-label">Günlük Seri</div>
          </div>

          <div class="dt-stat-card">
            <div class="dt-icon">🏆</div>
            <div class="dt-big-number">${level}</div>
            <div class="dt-label">Seviye</div>
          </div>

          <div class="dt-stat-card">
            <div class="dt-icon">🪙</div>
            <div class="dt-big-number">${state.coins}</div>
            <div class="dt-label">Coin</div>
          </div>

        </div>

      </div>


      <div style="
        margin-top:22px;
        display:grid;
        grid-template-columns:1.2fr .8fr;
        gap:20px;
      ">

        <div class="dt-card">

          <div class="dt-header">

            <div>
              <h2 class="dt-title">
                🎯 Bugünkü Görevler
              </h2>

              <div class="dt-subtitle">
                ${completed}/${total} tamamlandı
              </div>
            </div>

            <button
              class="primary-btn"
              onclick="navigate('tasks')"
            >
              Tüm Görevler →
            </button>

          </div>

          ${
            tasks.length
              ? tasks.slice(0,5).map(task => `

                <div class="dt-task-item ${
                  task.completed ? "completed" : ""
                }">

                  <button
                    class="dt-task-check"
                    onclick="toggleTask(${task.id})"
                  >
                    ${task.completed ? "✓" : ""}
                  </button>

                  <div>
                    <div class="dt-task-title">
                      ${escapeHTML(task.title)}
                    </div>

                    <small style="color:var(--muted)">
                      ⭐ +${Number(task.xp) || 50} XP
                    </small>
                  </div>

                </div>

              `).join("")
              :
              `
                <div class="dt-empty">
                  <div style="font-size:50px">🎯</div>
                  <h3>Henüz görev yok</h3>
                  <p>İlk görevini ekleyerek başla!</p>

                  <button
                    class="primary-btn"
                    onclick="navigate('tasks')"
                  >
                    + Görev Ekle
                  </button>
                </div>
              `
          }

        </div>


        <div class="dt-card">

          <div class="dt-header">

            <div>
              <h2 class="dt-title">
                🤖 Ders Koçu
              </h2>

              <div class="dt-subtitle">
                Bugünkü önerin
              </div>
            </div>

          </div>

          <div style="
            font-size:45px;
            margin:10px 0;
          ">
            🤖
          </div>

          <p style="
            line-height:1.7;
            color:var(--muted);
          ">

            ${
              coachData?.advice?.[0]
                ? escapeHTML(
                    coachData.advice[0].text
                  )
                : "Bugün küçük bir hedef belirle ve hemen başla! 💪"
            }

          </p>

          <button
            class="secondary-btn"
            style="margin-top:15px"
            onclick="navigate('coach')"
          >
            Koçu Aç →
          </button>

        </div>

      </div>

    </div>

  `;

  updateSectionTitle("home");
  updateUserUI();
}


/* =========================================================
   YENİ TASKS
   ========================================================= */

function renderTasksPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const completed =
    tasks.filter(t => t.completed).length;

  dynamic.innerHTML = `

    <div class="dt-page dt-task-page">

      <div class="dt-header">

        <div>

          <h2 class="dt-title">
            ✅ Görev Merkezi
          </h2>

          <div class="dt-subtitle">
            ${completed}/${tasks.length}
            görev tamamlandı
          </div>

        </div>

        <div style="
          font-size:20px;
          font-weight:800;
        ">
          ⭐ ${Number(currentUser?.xp) || 0} XP
        </div>

      </div>


      <div class="dt-card">

        ${
          tasks.length
            ? tasks.map(task => `

              <div class="dt-task-item ${
                task.completed ? "completed" : ""
              }">

                <button
                  class="dt-task-check"
                  onclick="toggleTask(${task.id})"
                >
                  ${task.completed ? "✓" : ""}
                </button>

                <div style="flex:1">

                  <div class="dt-task-title">
                    ${escapeHTML(task.title)}
                  </div>

                  <small style="color:var(--muted)">
                    Görev ödülü:
                    ⭐ +${Number(task.xp) || 50} XP
                  </small>

                </div>

                <button
                  class="delete-task"
                  onclick="deleteTask(${task.id})"
                >
                  🗑️
                </button>

              </div>

            `).join("")
            :
            `
              <div class="dt-empty">
                <div style="font-size:55px">
                  📝
                </div>

                <h3>Görev listen boş</h3>

                <p>
                  Bugün yapacağın ilk görevi ekle.
                </p>
              </div>
            `
        }

      </div>


      <div class="dt-card" style="margin-top:20px">

        <h3>➕ Yeni Görev</h3>

        <div style="
          display:flex;
          gap:10px;
          margin-top:15px;
        ">

          <input
            id="pageNewTask"
            placeholder="Örneğin: 20 soru matematik çöz"
            maxlength="150"
            style="
              flex:1;
              padding:14px;
              border-radius:14px;
              border:1px solid var(--border);
              background:var(--white);
              color:var(--text);
            "
          >

          <button
            class="primary-btn"
            onclick="addTaskFromPage()"
          >
            + Ekle
          </button>

        </div>

      </div>

    </div>
  `;
}


/* =========================================================
   YENİ SUBJECTS
   ========================================================= */

function renderSubjectsPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-header">

        <div>
          <h2 class="dt-title">
            📚 Derslerim
          </h2>

          <div class="dt-subtitle">
            ${subjects.length} ders kayıtlı
          </div>
        </div>

        <button
          class="primary-btn"
          onclick="openSubjectModal()"
        >
          + Ders Ekle
        </button>

      </div>


      ${
        subjects.length
          ?
          `
          <div class="dt-subject-grid">

            ${subjects.map((subject,index) => `

              <div class="dt-subject">

                <div class="dt-subject-icon">

                  ${
                    ["📐","🧪","📖","🌍","💻","🎨"][index % 6]
                  }

                </div>

                <h3>
                  ${escapeHTML(subject.name)}
                </h3>

                <p style="
                  color:var(--muted);
                  margin-top:7px;
                ">
                  Ders Takibi
                </p>

                <button
                  class="danger-btn"
                  style="margin-top:20px"
                  onclick="deleteSubject(${subject.id})"
                >
                  Sil
                </button>

              </div>

            `).join("")}

          </div>
          `
          :
          `
          <div class="dt-card dt-empty">

            <div style="font-size:65px">
              📚
            </div>

            <h3>Henüz ders yok</h3>

            <p>
              Derslerini ekleyerek çalışma planını oluştur.
            </p>

            <button
              class="primary-btn"
              onclick="openSubjectModal()"
            >
              + İlk Dersi Ekle
            </button>

          </div>
          `
      }

    </div>

  `;
}


/* =========================================================
   YENİ EXAMS
   ========================================================= */

function renderExamsPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const sorted = [...exams].sort(
    (a,b) =>
      new Date(a.exam_date) -
      new Date(b.exam_date)
  );

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-header">

        <div>
          <h2 class="dt-title">
            📅 Sınav Takvimi
          </h2>

          <div class="dt-subtitle">
            Sınavlarını önceden planla.
          </div>
        </div>

        <button
          class="primary-btn"
          onclick="openExamModal()"
        >
          + Sınav Ekle
        </button>

      </div>


      ${
        sorted.length
          ?
          `
          <div class="dt-exam-timeline">

            ${sorted.map(exam => `

              <div class="dt-exam">

                <div class="dt-exam-date">
                  📅 ${formatDate(exam.exam_date)}
                </div>

                <h3>
                  ${escapeHTML(exam.title)}
                </h3>

                <p style="
                  color:var(--muted);
                  margin-top:7px;
                ">
                  📚
                  ${escapeHTML(
                    exam.subject_name ||
                    "Ders belirtilmedi"
                  )}
                </p>

                ${
                  exam.topic
                    ?
                    `
                    <div style="
                      margin-top:12px;
                      padding:10px;
                      border-radius:12px;
                      background:#f5f3ff;
                    ">
                      🎯 Konu:
                      ${escapeHTML(exam.topic)}
                    </div>
                    `
                    : ""
                }

                <button
                  class="danger-btn"
                  style="margin-top:15px"
                  onclick="deleteExam(${exam.id})"
                >
                  Sınavı Sil
                </button>

              </div>

            `).join("")}

          </div>
          `
          :
          `
          <div class="dt-card dt-empty">

            <div style="font-size:65px">
              📅
            </div>

            <h3>Takvim boş</h3>

            <p>
              Yaklaşan sınavlarını buraya ekle.
            </p>

            <button
              class="primary-btn"
              onclick="openExamModal()"
            >
              + Sınav Ekle
            </button>

          </div>
          `
      }

    </div>

  `;
}


/* =========================================================
   YENİ FOCUS
   ========================================================= */

function renderFocusPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-focus">

        <div class="dt-focus-mode">
          ${timerMode}
        </div>

        <h2>
          ⏱️ Odaklanma Modu
        </h2>

        <p style="
          color:var(--muted);
        ">
          25 dakika boyunca sadece dersine odaklan.
        </p>

        <div
          class="dt-focus-timer"
          id="focusTimer"
        >
          ${formatTimer(timerSeconds)}
        </div>

        <div style="
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
        ">

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
          margin-top:25px;
          color:var(--muted);
        ">
          Tamamlanan her odak seansı XP kazandırır. ⭐
        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   YENİ COACH
   ========================================================= */

function renderCoachPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  if (!coachData) {

    dynamic.innerHTML = `
      <div class="dt-card dt-empty">
        🤖 Ders Koçu hazırlanıyor...
      </div>
    `;

    return;
  }

  const c = coachData;

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-coach">

        <div class="dt-coach-header">

          <div class="dt-robot">
            🤖
          </div>

          <div>

            <h2>
              ${escapeHTML(
                c.greeting || "Ders Koçun"
              )}
            </h2>

            <div style="opacity:.7">
              Sana özel çalışma planı
            </div>

          </div>

        </div>


        <div class="dt-grid">

          <div class="dt-advice">

            ⭐

            <div class="dt-big-number">
              ${c.xp}
            </div>

            XP

          </div>

          <div class="dt-advice">

            🔥

            <div class="dt-big-number">
              ${c.streak}
            </div>

            Günlük Seri

          </div>

          <div class="dt-advice">

            ⏱️

            <div class="dt-big-number">
              ${c.focus_minutes}
            </div>

            Dakika

          </div>

        </div>


        <h3 style="margin-top:30px">
          🎯 Bugünkü Öneriler
        </h3>


        ${
          (c.advice || []).map(item => `

            <div class="dt-advice">

              <div style="
                font-size:28px;
                margin-bottom:8px;
              ">
                ${item.icon || "💡"}
              </div>

              <strong>
                ${escapeHTML(item.title)}
              </strong>

              <p style="
                opacity:.75;
                line-height:1.6;
                margin-top:6px;
              ">
                ${escapeHTML(item.text)}
              </p>

            </div>

          `).join("")
        }


        <div class="dt-advice"
          style="margin-top:25px">

          🎯

          <strong>
            Günlük Hedef
          </strong>

          <p style="opacity:.75">
            ${c.recommended.tasks}
            görev +
            ${c.recommended.minutes}
            dakika odaklanma
          </p>

          <strong>
            ⭐ +${c.recommended.xp} XP
          </strong>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   YENİ PET
   ========================================================= */

function renderPetPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const level =
    calculateLevel(xp);

  state.pet.level = level;

  const progress =
    ((xp % 500) / 500) * 100;

  dynamic.innerHTML = `

    <div class="dt-page">

      <div class="dt-pet">

        <div style="
          color:var(--muted);
        ">
          🐾 EVLİ HAYVANIN
        </div>

        <div class="dt-pet-avatar">

          ${state.pet.emoji}

        </div>

        <h2>
          ${escapeHTML(state.pet.name)}
        </h2>

        <p style="
          color:var(--muted);
        ">
          Seviye ${level}
        </p>

        <div class="dt-progress"
          style="
            max-width:400px;
            margin:20px auto;
          "
        >
          <span
            style="width:${progress}%"
          ></span>
        </div>

        <p style="
          color:var(--muted);
        ">
          ${xp % 500}/500 XP
        </p>

        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="changePetName()"
        >
          ✏️ İsmini Değiştir
        </button>

      </div>

    </div>

  `;
}


/* =========================================================
   YENİ MARKET
   ========================================================= */

function renderMarketPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  dynamic.innerHTML = `

    <div class="dt-page dt-market">

      <div class="dt-header">

        <div>

          <h2 class="dt-title">
            🛒 Ödül Marketi
          </h2>

          <div class="dt-subtitle">
            XP kazan, coin biriktir, ödüllerini al.
          </div>

        </div>

        <div style="
          font-size:24px;
          font-weight:900;
          color:#f39c12;
        ">
          🪙 ${state.coins}
        </div>

      </div>


      <div class="dt-market-grid">

        ${marketItems.map(item => `

          <div class="dt-product">

            <div class="dt-product-icon">
              ${item.icon}
            </div>

            <h3>
              ${escapeHTML(item.name)}
            </h3>

            <p style="
              color:var(--muted);
              min-height:40px;
            ">
              ${escapeHTML(item.description)}
            </p>

            <div class="dt-price">
              🪙 ${item.price}
            </div>

            <button
              class="primary-btn"
              onclick="buyItem('${item.id}')"
            >
              Satın Al
            </button>

          </div>

        `).join("")}

      </div>

    </div>

  `;
}


/* =========================================================
   YENİ ACHIEVEMENTS
   ========================================================= */

function renderAchievementsPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const completed =
    tasks.filter(t => t.completed).length;

  const definitions = [
    {
      icon:"🌱",
      title:"İlk Adım",
      text:"İlk görevini tamamla.",
      unlocked:completed >= 1
    },
    {
      icon:"🔥",
      title:"Çalışkan",
      text:"5 görev tamamla.",
      unlocked:completed >= 5
    },
    {
      icon:"⭐",
      title:"XP Avcısı",
      text:"500 XP kazan.",
      unlocked:xp >= 500
    },
    {
      icon:"🏆",
      title:"Usta Öğrenci",
      text:"1000 XP kazan.",
      unlocked:xp >= 1000
    },
    {
      icon:"📚",
      title:"Ders Sever",
      text:"3 ders ekle.",
      unlocked:subjects.length >= 3
    },
    {
      icon:"📅",
      title:"Planlı Öğrenci",
      text:"3 sınav ekle.",
      unlocked:exams.length >= 3
    }
  ];

  dynamic.innerHTML = `

    <div class="dt-page dt-achievements">

      <div class="dt-header">

        <div>

          <h2 class="dt-title">
            🏆 Başarı Koleksiyonum
          </h2>

          <div class="dt-subtitle">
            Kazandığın rozetleri burada görebilirsin.
          </div>

        </div>

      </div>


      <div class="dt-badge-grid">

        ${definitions.map(badge => `

          <div class="dt-badge ${
            badge.unlocked ? "" : "locked"
          }">

            <div class="dt-badge-icon">
              ${badge.icon}
            </div>

            <h3>
              ${badge.title}
            </h3>

            <p style="
              color:var(--muted);
              margin-top:8px;
            ">
              ${badge.text}
            </p>

            <strong style="
              display:block;
              margin-top:12px;
            ">
              ${
                badge.unlocked
                  ? "✅ KAZANILDI"
                  : "🔒 KİLİTLİ"
              }
            </strong>

          </div>

        `).join("")}

      </div>

    </div>

  `;
}


/* =========================================================
   YENİ STATS
   ========================================================= */

async function renderStatsPage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  dynamic.innerHTML = `

    <div class="dt-card dt-empty">
      📊 İstatistikler hazırlanıyor...
    </div>

  `;

  try {

    const data = await api("stats");
    const s = data.stats;

    const total =
      Number(s.tasks?.total) || 0;

    const completed =
      Number(s.tasks?.completed) || 0;

    const percent =
      total
        ? Math.round((completed / total) * 100)
        : 0;

    dynamic.innerHTML = `

      <div class="dt-page dt-stats">

        <div class="dt-header">

          <div>

            <h2 class="dt-title">
              📊 Performansım
            </h2>

            <div class="dt-subtitle">
              Çalışma alışkanlıklarını analiz et.
            </div>

          </div>

        </div>


        <div class="dt-grid">

          <div class="dt-card">
            <div class="dt-icon">🎯</div>
            <div class="dt-big-number">${total}</div>
            <div class="dt-label">
              Toplam Görev
            </div>
          </div>

          <div class="dt-card">
            <div class="dt-icon">✅</div>
            <div class="dt-big-number">${completed}</div>
            <div class="dt-label">
              Tamamlanan
            </div>
          </div>

          <div class="dt-card">
            <div class="dt-icon">📚</div>
            <div class="dt-big-number">
              ${s.subjects}
            </div>
            <div class="dt-label">
              Ders
            </div>
          </div>

          <div class="dt-card">
            <div class="dt-icon">📅</div>
            <div class="dt-big-number">
              ${s.exams}
            </div>
            <div class="dt-label">
              Sınav
            </div>
          </div>

          <div class="dt-card">
            <div class="dt-icon">⏱️</div>
            <div class="dt-big-number">
              ${s.sessions.minutes}
            </div>
            <div class="dt-label">
              Odak Dakikası
            </div>
          </div>

        </div>


        <div class="dt-progress-box">

          <h3>
            🎯 Görev Başarı Oranı
          </h3>

          <div class="dt-progress">

            <span
              style="width:${percent}%"
            ></span>

          </div>

          <strong style="
            display:block;
            margin-top:10px;
            font-size:22px;
          ">
            ${percent}%
          </strong>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            ${
              percent >= 80
                ? "Harika! Çok iyi gidiyorsun! 🚀"
                : percent >= 50
                ? "Gayet iyi! Biraz daha devam et. 💪"
                : "Bugün birkaç görev tamamlamaya ne dersin? 🎯"
            }
          </p>

        </div>

      </div>

    `;

  } catch(error) {

    dynamic.innerHTML = `

      <div class="dt-card">
        ❌ ${escapeHTML(error.message)}
      </div>

    `;

  }

}


/* =========================================================
   YENİ PROFILE
   ========================================================= */

function renderProfilePage() {

  $("homeHero").style.display = "none";
  $("tasksSection").style.display = "none";

  const dynamic = $("dynamicSection");
  dynamic.style.display = "block";

  const name =
    currentUser?.name || "Öğrenci";

  const email =
    currentUser?.email || "";

  const xp =
    Number(currentUser?.xp) || 0;

  const streak =
    Number(currentUser?.streak) || 0;

  const level =
    calculateLevel(xp);

  dynamic.innerHTML = `

    <div class="dt-page dt-profile">

      <div class="dt-profile-head">

        <div class="dt-avatar">
          🎓
        </div>

        <h2 style="margin-top:15px">
          ${escapeHTML(name)}
        </h2>

        <p style="opacity:.8;margin-top:5px">
          ${escapeHTML(email)}
        </p>

      </div>


      <div class="dt-profile-info">

        <div class="dt-profile-stat">

          <div style="font-size:30px">
            ⭐
          </div>

          <div class="dt-big-number">
            ${xp}
          </div>

          <div class="dt-label">
            XP
          </div>

        </div>


        <div class="dt-profile-stat">

          <div style="font-size:30px">
            🏆
          </div>

          <div class="dt-big-number">
            ${level}
          </div>

          <div class="dt-label">
            Seviye
          </div>

        </div>


        <div class="dt-profile-stat">

          <div style="font-size:30px">
            🔥
          </div>

          <div class="dt-big-number">
            ${streak}
          </div>

          <div class="dt-label">
            Seri
          </div>

        </div>

      </div>


      <div class="dt-card" style="margin-top:20px">

        <h3>
          ⚙️ Hesap Ayarları
        </h3>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:18px;
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

    </div>

  `;

}


/* =========================================================
   GÜNCEL SECTION TITLE
   ========================================================= */

const oldUpdateSectionTitle = updateSectionTitle;

updateSectionTitle = function(page) {

  const titles = {

    home:
      "📊 Genel bakış ve bugünkü çalışma planın",

    tasks:
      "🎯 Görevlerini yönet, tamamla ve XP kazan",

    subjects:
      "📚 Derslerini kendi çalışma sistemine göre düzenle",

    exams:
      "📅 Sınavlarını takvim şeklinde planla",

    focus:
      "⏱️ Pomodoro ile dikkatini tek noktaya topla",

    coach:
      "🤖 Yapay zekâ destekli çalışma koçun",

    pet:
      "🐼 Çalıştıkça gelişen evcil hayvanın",

    market:
      "🛒 Kazandığın coinleri ödüllere harca",

    achievements:
      "🏆 Çalışma başarılarını ve rozetlerini topla",

    stats:
      "📊 Çalışma performansını detaylı incele",

    profile:
      "👤 Profilin, seviyen ve hesap ayarların"

  };

  if ($("sectionSubtitle")) {
    $("sectionSubtitle").textContent =
      titles[page] || "";
  }

};


/* =========================================================
   BAŞLANGIÇ
   ========================================================= */

console.log(
  "DersTakip 2.0 yeni menü tasarımı aktif 🚀"
);
