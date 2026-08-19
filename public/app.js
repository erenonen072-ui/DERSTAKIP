/* =========================================================
   DERS TAKİP 2.0 - APP.JS
   ========================================================= */

const API = "/api";

let currentUser = null;
let currentSection = "home";

let tasks = [];
let subjects = [];
let exams = [];
let sessions = [];
let achievements = [];
let coachData = null;
let statsData = null;

/* =========================================================
   GENEL API
========================================================= */

async function api(action, options = {}) {
  const {
    method = "GET",
    body = null
  } = options;

  try {
    const config = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (body !== null) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${API}?action=${encodeURIComponent(action)}`,
      config
    );

    let data;

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
    console.error("API HATASI:", error);

    throw error;
  }
}

/* =========================================================
   DOM
========================================================= */

const $ = id => document.getElementById(id);

function showElement(id) {
  const el = $(id);
  if (el) el.style.display = "";
}

function hideElement(id) {
  const el = $(id);
  if (el) el.style.display = "none";
}

/* =========================================================
   TOAST
========================================================= */

function toast(message, type = "normal") {
  const container = $("toastContainer");

  if (!container) return;

  const item = document.createElement("div");

  item.className = "toast";

  if (type === "success") {
    item.style.background = "#20c997";
  }

  if (type === "error") {
    item.style.background = "#ff5b6e";
  }

  if (type === "warning") {
    item.style.background = "#d79a00";
  }

  item.textContent = message;

  container.appendChild(item);

  setTimeout(() => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {
      item.remove();
    }, 300);

  }, 3000);
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

  if (!email || !password) {
    $("authMessage").textContent =
      "E-posta ve şifre gerekli.";

    return;
  }

  $("authMessage").textContent = "Giriş yapılıyor...";

  try {

    const data = await api("login", {
      method: "POST",
      body: {
        email,
        password
      }
    });

    currentUser = data.user;

    $("authMessage").textContent = "";

    openApp();

    toast(
      `Hoş geldin ${currentUser.name}! 👋`,
      "success"
    );

  } catch (error) {

    $("authMessage").textContent =
      error.message || "Giriş başarısız.";

  }
}

async function register(event) {

  event.preventDefault();

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;

  if (!name || !email || !password) {

    $("authMessage").textContent =
      "Tüm alanları doldur.";

    return;
  }

  $("authMessage").textContent =
    "Hesap oluşturuluyor...";

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

    $("authMessage").textContent = "";

    openApp();

    toast(
      "Hesabın oluşturuldu! 🎉",
      "success"
    );

  } catch (error) {

    $("authMessage").textContent =
      error.message || "Kayıt başarısız.";

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
  sessions = [];

  $("app").style.display = "none";
  $("authScreen").style.display = "flex";

  showLogin();

  closeMobileMenu();

  toast("Çıkış yapıldı.");
}

/* =========================================================
   APP BAŞLAT
========================================================= */

async function checkAuth() {

  try {

    const data = await api("me");

    if (data.success && data.user) {

      currentUser = data.user;

      openApp();

    } else {

      showAuth();

    }

  } catch {

    showAuth();

  }
}

function showAuth() {

  $("authScreen").style.display = "flex";
  $("app").style.display = "none";
}

async function openApp() {

  $("authScreen").style.display = "none";
  $("app").style.display = "block";

  await loadAll();

  navigate("home");

}

/* =========================================================
   TÜM VERİLERİ YÜKLE
========================================================= */

async function loadAll() {

  try {

    const [
      userData,
      taskData,
      subjectData,
      examData,
      sessionData,
      achievementData,
      stats
    ] = await Promise.all([

      api("me"),

      api("tasks"),

      api("subjects"),

      api("exams"),

      api("sessions"),

      api("achievements"),

      api("stats")

    ]);

    if (userData.user) {
      currentUser = userData.user;
    }

    tasks = taskData.tasks || [];

    subjects = subjectData.subjects || [];

    exams = examData.exams || [];

    sessions = sessionData.sessions || [];

    achievements =
      achievementData.achievements || [];

    statsData = stats.stats || {};

    updateHeader();

    renderTasks();

    renderHome();

  } catch (error) {

    console.error(error);

    toast(
      error.message || "Veriler yüklenemedi.",
      "error"
    );

  }
}

/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

  if (!currentUser) return;

  const name =
    currentUser.name || "Öğrenci";

  const xp =
    Number(currentUser.xp) || 0;

  const level =
    getLevel(xp);

  const avatar =
    localStorage.getItem("ders_avatar") || "🎓";

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${name}! 👋`;
  }

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${level}`;
  }

  if ($("topAvatar")) {
    $("topAvatar").textContent =
      avatar;
  }

  if ($("statXP")) {
    $("statXP").textContent =
      xp;
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      Number(currentUser.streak) || 0;
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      getCoins();
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent =
      Number(currentUser.streak) || 0;
  }

  updateXPBar();
}

function getLevel(xp) {

  return Math.max(
    1,
    Math.floor(Number(xp) / 100) + 1
  );

}

function updateXPBar() {

  if (!currentUser) return;

  const xp =
    Number(currentUser.xp) || 0;

  const currentLevelXP =
    (getLevel(xp) - 1) * 100;

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        xp - currentLevelXP
      )
    );

  if ($("progressBar")) {

    $("progressBar").style.width =
      `${progress}%`;

  }

  if ($("xpText")) {

    $("xpText").textContent =
      `${xp} XP • Seviye ${getLevel(xp)}`;

  }

}

/* =========================================================
   NAVIGATION
========================================================= */

function navigate(section, button = null) {

  currentSection = section;

  document
    .querySelectorAll(".menu button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  } else {

    document
      .querySelectorAll(".menu button")
      .forEach(btn => {

        if (
          btn.getAttribute("onclick") &&
          btn.getAttribute("onclick")
            .includes(`'${section}'`)
        ) {
          btn.classList.add("active");
        }

      });

  }

  updateSectionTitle(section);

  const dynamic =
    $("dynamicSection");

  if (!dynamic) return;

  dynamic.style.display = "block";

  if (section === "home") {
    renderHome();
    dynamic.style.display = "none";
    return;
  }

  if (section === "tasks") {
    renderTasksPage();
    return;
  }

  if (section === "subjects") {
    renderSubjects();
    return;
  }

  if (section === "exams") {
    renderExams();
    return;
  }

  if (section === "focus") {
    renderFocus();
    return;
  }

  if (section === "coach") {
    renderCoach();
    return;
  }

  if (section === "pet") {
    renderPet();
    return;
  }

  if (section === "market") {
    renderMarket();
    return;
  }

  if (section === "achievements") {
    renderAchievements();
    return;
  }

  if (section === "stats") {
    renderStats();
    return;
  }

  if (section === "profile") {
    renderProfile();
    return;
  }

}

function updateSectionTitle(section) {

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
      "Telefonu bırak, dersine odaklan.",

    coach:
      "Ders Koçun sana bugün ne öneriyor?",

    pet:
      "Çalıştıkça evcil hayvanın gelişsin.",

    market:
      "Coinlerini ödüller için kullan.",

    achievements:
      "Başarılarını ve rozetlerini keşfet.",

    stats:
      "Çalışma performansını incele.",

    profile:
      "Hesabını ve tercihlerini yönet."

  };

  if ($("sectionSubtitle")) {
    $("sectionSubtitle").textContent =
      titles[section] || "";
  }

}

/* =========================================================
   HOME
========================================================= */

function renderHome() {

  renderTasks();

  const completed =
    tasks.filter(t => t.completed).length;

  const total =
    tasks.length;

  const percentage =
    total > 0
      ? Math.round(
          completed / total * 100
        )
      : 0;

  if ($("taskSummary")) {

    if (total === 0) {

      $("taskSummary").textContent =
        "Bugün için henüz görev eklemedin.";

    } else {

      $("taskSummary").textContent =
        `${completed}/${total} görev tamamlandı • %${percentage}`;

    }

  }

  if ($("progressBar")) {

    $("progressBar").style.width =
      `${percentage}%`;

  }

  renderCoachMini();

  updateHeader();

}

/* =========================================================
   TASKS
========================================================= */

function renderTasks() {

  const list = $("taskList");

  if (!list) return;

  list.innerHTML = "";

  if (tasks.length === 0) {

    list.innerHTML = `
      <div style="
        padding:25px;
        text-align:center;
        color:var(--muted)
      ">
        Henüz görev yok. 🎯
      </div>
    `;

    if ($("taskCounter")) {
      $("taskCounter").textContent =
        "0 / 0";
    }

    return;
  }

  tasks.forEach(task => {

    const row =
      document.createElement("div");

    row.className =
      `task ${task.completed ? "completed" : ""}`;

    row.innerHTML = `

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
        ⭐ ${Number(task.xp) || 50} XP
      </div>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
      >
        🗑️
      </button>

    `;

    list.appendChild(row);

  });

  const completed =
    tasks.filter(t => t.completed).length;

  if ($("taskCounter")) {

    $("taskCounter").textContent =
      `${completed} / ${tasks.length}`;

  }

}

async function addTask() {

  const input =
    $("newTask");

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {

    toast(
      "Önce görev adını yaz.",
      "warning"
    );

    return;
  }

  try {

    const data =
      await api("tasks", {
        method: "POST",
        body: { title }
      });

    tasks.unshift(data.task);

    input.value = "";

    renderTasks();

    updateHeader();

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

async function toggleTask(id) {

  try {

    const data =
      await api("tasks", {
        method: "PATCH",
        body: { id }
      });

    const task =
      tasks.find(t =>
        Number(t.id) === Number(id)
      );

    if (task) {
      task.completed =
        data.completed;
    }

    if (data.completed) {

      const xp =
        Number(task?.xp) || 50;

      addCoins(10);

      celebrate(
        `⭐ +${xp} XP<br>🪙 +10 Coin`
      );

      await refreshUser();

    } else {

      await refreshUser();

      toast(
        "Görev yeniden açıldı."
      );

    }

    renderTasks();

    renderHome();

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
      body: { id }
    });

    tasks =
      tasks.filter(
        t => Number(t.id) !== Number(id)
      );

    renderTasks();

    await refreshUser();

    toast(
      "Görev silindi."
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );

  }

}

function renderTasksPage() {

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card-title">
      <h2>✅ Tüm Görevler</h2>
      <button
        class="primary-btn"
        onclick="document.getElementById('newTask').focus()"
      >
        + Görev
      </button>
    </div>

    <div id="pageTaskList"></div>

  `;

  const list =
    $("pageTaskList");

  if (tasks.length === 0) {

    list.innerHTML =
      `<p style="color:var(--muted)">
        Henüz görev eklenmemiş.
      </p>`;

    return;
  }

  tasks.forEach(task => {

    list.innerHTML += `

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

        <span class="task-xp">
          ⭐ ${Number(task.xp) || 50} XP
        </span>

        <button
          class="delete-task"
          onclick="deleteTask(${task.id})"
        >
          🗑️
        </button>

      </div>

    `;

  });

}

/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjects() {

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card-title">
      <h2>📚 Dersler</h2>

      <button
        class="primary-btn"
        onclick="openSubjectModal()"
      >
        + Ders Ekle
      </button>
    </div>

    <div class="market-grid">

      ${
        subjects.length === 0
          ? `
            <p style="color:var(--muted)">
              Henüz ders eklemedin.
            </p>
          `
          : subjects.map(subject => `

            <div class="shop-item">

              <div
                class="shop-icon"
                style="
                  width:60px;
                  height:60px;
                  margin:auto auto 10px;
                  border-radius:18px;
                  background:${escapeAttribute(
                    subject.color || "#6c63ff"
                  )};
                  display:grid;
                  place-items:center;
                  font-size:30px;
                "
              >
                📚
              </div>

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

          `).join("")
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
        >
      </div>

      <div class="form-group">
        <label>Renk</label>
        <input
          id="subjectColor"
          type="color"
          value="#6c63ff"
          style="height:50px"
        >
      </div>

      <button
        class="primary-btn"
        onclick="addSubject()"
      >
        Dersi Kaydet
      </button>

    `
  );

}

async function addSubject() {

  const name =
    $("subjectName").value.trim();

  const color =
    $("subjectColor").value;

  if (!name) {

    toast(
      "Ders adı gerekli.",
      "warning"
    );

    return;
  }

  try {

    const data =
      await api("subjects", {
        method: "POST",
        body: {
          name,
          color
        }
      });

    subjects.unshift(
      data.subject
    );

    closeModal();

    renderSubjects();

    toast(
      "Ders eklendi! 📚",
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

  if (!confirm("Bu dersi silmek istiyor musun?")) {
    return;
  }

  try {

    await api("subjects", {
      method: "DELETE",
      body: { id }
    });

    subjects =
      subjects.filter(
        s => Number(s.id) !== Number(id)
      );

    renderSubjects();

    toast(
      "Ders silindi."
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

function renderExams() {

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card-title">

      <h2>📅 Sınavlar</h2>

      <button
        class="primary-btn"
        onclick="openExamModal()"
      >
        + Sınav Ekle
      </button>

    </div>

    <div id="examList"></div>

  `;

  const list =
    $("examList");

  if (exams.length === 0) {

    list.innerHTML = `
      <p style="color:var(--muted)">
        Yaklaşan sınav yok.
      </p>
    `;

    return;
  }

  exams.forEach(exam => {

    const date =
      formatDate(exam.exam_date);

    list.innerHTML += `

      <div
        class="task"
        style="align-items:flex-start"
      >

        <div style="font-size:32px">
          📅
        </div>

        <div class="task-content">

          <div class="task-name">
            ${escapeHTML(exam.title)}
          </div>

          <div
            style="
              color:var(--muted);
              margin-top:5px
            "
          >
            ${
              escapeHTML(
                exam.subject_name || "Ders yok"
              )
            }
          </div>

          <div
            style="
              color:var(--primary);
              font-weight:800;
              margin-top:5px
            "
          >
            ${date}
          </div>

          ${
            exam.topic
              ? `
                <div
                  style="
                    color:var(--muted);
                    margin-top:5px
                  "
                >
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

    `;

  });

}

function openExamModal() {

  const subjectOptions =
    subjects.map(
      subject =>
        `<option value="${subject.id}">
          ${escapeHTML(subject.name)}
        </option>`
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

        <label>Ders</label>

        <select
          id="examSubject"
          style="
            width:100%;
            padding:13px;
            border:1px solid var(--border);
            border-radius:11px;
            background:var(--white);
            color:var(--text)
          "
        >

          <option value="">
            Ders seç
          </option>

          ${subjectOptions}

        </select>

      </div>

      <div class="form-group">

        <label>Tarih</label>

        <input
          id="examDate"
          type="datetime-local"
        >

      </div>

      <div class="form-group">

        <label>Konu</label>

        <input
          id="examTopic"
          placeholder="Kesirler, problemler..."
        >

      </div>

      <button
        class="primary-btn"
        onclick="addExam()"
      >
        Sınavı Kaydet
      </button>

    `
  );

}

async function addExam() {

  const title =
    $("examTitle").value.trim();

  const subject_id =
    $("examSubject").value || null;

  const exam_date =
    $("examDate").value;

  const topic =
    $("examTopic").value.trim();

  if (!title || !exam_date) {

    toast(
      "Sınav adı ve tarih gerekli.",
      "warning"
    );

    return;
  }

  try {

    const data =
      await api("exams", {
        method: "POST",
        body: {
          title,
          exam_date,
          subject_id,
          topic
        }
      });

    exams.push(data.exam);

    exams.sort(
      (a,b) =>
        new Date(a.exam_date) -
        new Date(b.exam_date)
    );

    closeModal();

    renderExams();

    toast(
      "Sınav eklendi! 📅",
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

  if (!confirm("Bu sınavı silmek istiyor musun?")) {
    return;
  }

  try {

    await api("exams", {
      method: "DELETE",
      body: { id }
    });

    exams =
      exams.filter(
        e => Number(e.id) !== Number(id)
      );

    renderExams();

    toast(
      "Sınav silindi."
    );

  } catch (error) {

    toast(
      error.message,
      "error"
    );

  }

}

/* =========================================================
   FOCUS / POMODORO
========================================================= */

let focusSeconds = 25 * 60;
let focusRunning = false;
let focusInterval = null;

function renderFocus() {

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card focus">

      <h2>⏱️ Odaklan</h2>

      <p
        style="
          color:var(--muted);
          margin-top:7px
        "
      >
        25 dakika çalış, sonra mola ver.
      </p>

      <div
        class="timer"
        id="focusTimer"
      >
        25:00
      </div>

      <div class="focus-buttons">

        <button
          class="primary-btn"
          onclick="toggleFocus()"
          id="focusStartButton"
        >
          ▶ Başlat
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
          display:flex;
          justify-content:center;
          gap:10px;
          margin-top:20px;
          flex-wrap:wrap
        "
      >

        <button
          class="secondary-btn"
          onclick="setFocusMinutes(25)"
        >
          25 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusMinutes(45)"
        >
          45 dk
        </button>

        <button
          class="secondary-btn"
          onclick="setFocusMinutes(60)"
        >
          60 dk
        </button>

      </div>

      <div
        style="
          margin-top:25px;
          color:var(--muted)
        "
      >
        Çalışma tamamlandığında XP kazanırsın. ⭐
      </div>

    </div>

  `;

  updateFocusDisplay();

}

function setFocusMinutes(minutes) {

  if (focusRunning) {
    toast(
      "Önce zamanlayıcıyı durdur.",
      "warning"
    );
    return;
  }

  focusSeconds =
    minutes * 60;

  updateFocusDisplay();

}

function updateFocusDisplay() {

  const timer =
    $("focusTimer");

  if (!timer) return;

  const minutes =
    Math.floor(
      focusSeconds / 60
    );

  const seconds =
    focusSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

function toggleFocus() {

  if (focusRunning) {

    pauseFocus();

    return;

  }

  focusRunning = true;

  if ($("focusStartButton")) {

    $("focusStartButton").textContent =
      "⏸ Duraklat";

  }

  focusInterval =
    setInterval(() => {

      focusSeconds--;

      updateFocusDisplay();

      if (focusSeconds <= 0) {

        finishFocus();

      }

    }, 1000);

}

function pauseFocus() {

  focusRunning = false;

  clearInterval(
    focusInterval
  );

  if ($("focusStartButton")) {

    $("focusStartButton").textContent =
      "▶ Devam Et";

  }

}

function resetFocus() {

  clearInterval(
    focusInterval
  );

  focusRunning = false;

  focusSeconds =
    25 * 60;

  updateFocusDisplay();

  if ($("focusStartButton")) {

    $("focusStartButton").textContent =
      "▶ Başlat";

  }

}

async function finishFocus() {

  clearInterval(
    focusInterval
  );

  focusRunning = false;

  const minutes =
    Math.max(
      1,
      Math.round(
        focusSeconds === 0
          ? getSelectedFocusMinutes()
          : 25
      )
    );

  try {

    const data =
      await api("sessions", {
        method: "POST",
        body: {
          duration_minutes:
            getSelectedFocusMinutes()
        }
      });

    sessions.unshift(
      data.session
    );

    await refreshUser();

    addCoins(5);

    celebrate(
      `⏱️ Odaklanma tamamlandı!<br>⭐ +${data.earned_xp} XP<br>🪙 +5 Coin`
    );

    resetFocus();

  } catch (error) {

    toast(
      error.message,
      "error"
    );

    resetFocus();

  }

}

function getSelectedFocusMinutes() {

  const minutes =
    Math.round(
      focusSeconds / 60
    );

  return minutes > 0
    ? minutes
    : 25;

}

/* =========================================================
   COACH
========================================================= */

async function renderCoach() {

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card coach">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>Ders Koçu</h2>
          <small style="color:var(--muted)">
            Sana özel çalışma önerileri
          </small>
        </div>

      </div>

      <div id="fullCoachContent">
        Yükleniyor...
      </div>

    </div>

  `;

  try {

    const data =
      await api("coach");

    coachData =
      data.coach;

    const content =
      $("fullCoachContent");

    content.innerHTML = `

      <h3 style="margin-bottom:15px">
        ${escapeHTML(coachData.greeting)}
      </h3>

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(auto-fit,minmax(130px,1fr));
          gap:10px;
          margin-bottom:20px
        "
      >

        <div class="stat">
          ⭐
          <strong>
            ${coachData.xp}
          </strong>
          <small>XP</small>
        </div>

        <div class="stat">
          🔥
          <strong>
            ${coachData.streak}
          </strong>
          <small>Seri</small>
        </div>

        <div class="stat">
          🎯
          <strong>
            ${coachData.incomplete_tasks}
          </strong>
          <small>Bekleyen görev</small>
        </div>

        <div class="stat">
          ⏱️
          <strong>
            ${coachData.focus_minutes}
          </strong>
          <small>Odak dakikası</small>
        </div>

      </div>

      <h3 style="margin-bottom:12px">
        📋 Bugünün Önerileri
      </h3>

      ${
        coachData.advice.map(item => `

          <div
            style="
              padding:15px;
              border:1px solid var(--border);
              border-radius:15px;
              margin-bottom:10px
            "
          >

            <strong>
              ${item.icon}
              ${escapeHTML(item.title)}
            </strong>

            <p
              style="
                color:var(--muted);
                margin-top:5px;
                line-height:1.5
              "
            >
              ${escapeHTML(item.text)}
            </p>

          </div>

        `).join("")
      }

      <div
        style="
          padding:18px;
          border-radius:18px;
          background:#eef0ff;
          margin-top:15px
        "
      >

        <strong>
          🎯 Bugünkü hedef
        </strong>

        <p style="margin-top:8px">
          ${coachData.recommended.tasks}
          görev +
          ${coachData.recommended.minutes}
          dakika odaklanma
        </p>

        <p style="margin-top:5px">
          ⭐ Yaklaşık
          ${coachData.recommended.xp}
          XP
        </p>

      </div>

    `;

  } catch (error) {

    box.innerHTML = `
      <div class="card">
        <h2>🤖 Ders Koçu</h2>
        <p style="color:var(--muted)">
          ${escapeHTML(error.message)}
        </p>
      </div>
    `;

  }

}

async function renderCoachMini() {

  if (!$("coachMessage")) return;

  try {

    const data =
      await api("coach");

    coachData =
      data.coach;

    if (
      coachData &&
      coachData.advice &&
      coachData.advice.length
    ) {

      $("coachMessage").textContent =
        coachData.advice[0].text;

    }

  } catch {

    $("coachMessage").textContent =
      "Bugün güzel bir çalışma günü! 🚀";

  }

}

/* =========================================================
   PET
========================================================= */

const petDefault = {
  type: "🐼",
  name: "Panda",
  level: 1,
  happiness: 100,
  equipped: []
};

function getPet() {

  try {

    return {
      ...petDefault,
      ...JSON.parse(
        localStorage.getItem(
          "ders_pet"
        ) || "{}"
      )
    };

  } catch {

    return {
      ...petDefault
    };

  }

}

function savePet(pet) {

  localStorage.setItem(
    "ders_pet",
    JSON.stringify(pet)
  );

}

function getPetLevel() {

  const xp =
    Number(currentUser?.xp) || 0;

  return Math.max(
    1,
    Math.floor(xp / 250) + 1
  );

}

function renderPet() {

  const pet =
    getPet();

  pet.level =
    getPetLevel();

  savePet(pet);

  const box =
    $("dynamicSection");

  box.innerHTML = `

    <div class="card pet-card">

      <h2>🐣 Evcil Hayvanım</h2>

      <div class="pet-display">
        ${pet.type}
      </div>

      <div class="pet-name">
        ${escapeHTML(pet.name)}
      </div>

      <div class="pet-level">
        Seviye ${pet.level}
      </div>

      <div
        style="
          margin-top:20px;
          text-align:left
        "
      >

        <strong>❤️ Mutluluk</strong>

        <div
          class="progress"
          style="
            background:var(--border);
            margin-top:8px
          "
        >

          <span
            style="
              width:${pet.happiness}%;
              background:#ff5b6e
            "
          ></span>

        </div>

      </div>

      <div
        style="
          display:flex;
          gap:10px;
          justify-content:center;
          flex-wrap:wrap;
          margin-top:20px
        "
      >

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

      </div>

      <h3 style="margin-top:25px">
        🐾 Evcil Hayvan Seç
      </h3>

      <div
        style="
          display:flex;
          justify-content:center;
          gap:10px;
          margin-top:12px;
          flex-wrap:wrap
        "
      >

        <button
          class="secondary-btn"
          onclick="changePet('🐼')"
        >
          🐼 Panda
        </button>

        <button
          class="secondary-btn"
          onclick="changePet('🐱')"
        >
          🐱 Kedi
        </button>

        <button
          class="secondary-btn"
          onclick="changePet('🐶')"
        >
          🐶 Köpek
        </button>

        <button
          class="secondary-btn"
          onclick="changePet('🐰')"
        >
          🐰 Tavşan
        </button>

      </div>

    </div>

  `;

  updateHomePet();

}

function updateHomePet() {

  const pet =
    getPet();

  if ($("petDisplay")) {
    $("petDisplay").textContent =
      pet.type;
  }

  if ($("petName")) {
    $("petName").textContent =
      pet.name;
  }

  if ($("petLevel")) {
    $("petLevel").textContent =
      `Seviye ${getPetLevel()}`;
  }

}

function changePet(type) {

  const pet =
    getPet();

  pet.type =
    type;

  savePet(pet);

  renderPet();

  toast(
    "Evcil hayvanın değiştirildi! 🐾",
    "success"
  );

}

function renamePet() {

  const pet =
    getPet();

  const name =
    prompt(
      "Evcil hayvanının yeni adı:",
      pet.name
    );

  if (!name || !name.trim()) {
    return;
  }

  pet.name =
    name.trim().slice(0,30);

  savePet(pet);

  renderPet();

  updateHomePet();

}

function feedPet() {

  const cost = 5;

  const coins =
    getCoins();

  if (coins < cost) {

    toast(
      "Beslemek için 5 coin gerekiyor. 🪙",
      "warning"
    );

    return;
  }

  addCoins(-cost);

  const pet =
    getPet();

  pet.happiness =
    Math.min(
      100,
      Number(pet.happiness) + 20
    );

  savePet(pet);

  renderPet();

  updateHeader();

  toast(
    "Panda mutlu oldu! 🐼❤️",
    "success"
  );

}

/* =========================================================
   MARKET
========================================================= */

const marketItems = [

  {
    id: "food",
    icon: "🍎",
    name: "Elma",
    description: "Evcil hayvanını besle.",
    price: 5
  },

  {
    id: "ball",
    icon: "⚽",
    name: "Oyun Topu",
    description: "Evcil hayvanınla oyna.",
    price: 25
  },

  {
    id: "hat",
    icon: "🎩",
    name: "Şapka",
    description: "Havalı görün!",
    price: 50
  },

  {
    id: "crown",
    icon: "👑",
    name: "Kraliyet Tacı",
    description: "Sadece gerçek şampiyonlara.",
    price: 100
  },

  {
    id: "rocket",
    icon: "🚀",
    name: "Roket",
    description: "Enerjini yükselt.",
    price: 150
  },

  {
    id: "diamond",
    icon: "💎",
    name: "Elmas",
    description: "Özel koleksiyon.",
    price: 250
  }

];

function getInventory() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "ders_inventory"
      ) || "[]"
    );

  } catch {

    return [];

  }

}

function saveInventory(items) {

  localStorage.setItem(
    "ders_inventory",
    JSON.stringify(items)
  );

}

function renderMarket() {

  const box =
    $("dynamicSection");

  const coins =
    getCoins();

  const inventory =
    getInventory();

  box.innerHTML = `

    <div class="card-title">

      <h2>🛒 Market</h2>

      <div
        style="
          font-weight:900;
          color:#d79a00
        "
      >
        🪙 ${coins}
      </div>

    </div>

    <div class="market-grid">

      ${marketItems.map(item => {

        const owned =
          inventory.includes(item.id);

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
              onclick="buyItem('${item.id}')"
              ${owned ? "disabled" : ""}
            >
              ${
                owned
                  ? "✓ Sahipsin"
                  : "Satın Al"
              }
            </button>

          </div>

        `;

      }).join("")}

    </div>

  `;

}

function buyItem(id) {

  const item =
    marketItems.find(
      x => x.id === id
    );

  if (!item) return;

  const inventory =
    getInventory();

  if (inventory.includes(id)) {

    toast(
      "Bu ürüne zaten sahipsin."
    );

    return;
  }

  const coins =
    getCoins();

  if (coins < item.price) {

    toast(
      `Yeterli coin yok. ${item.price} coin gerekiyor.`,
      "warning"
    );

    return;
  }

  addCoins(
    -item.price
  );

  inventory.push(id);

  saveInventory(
    inventory
  );

  renderMarket();

  updateHeader();

  toast(
    `${item.name} satın alındı! 🎉`,
    "success"
  );

}

/* =========================================================
   COIN
========================================================= */

function getCoins() {

  return Number(
    localStorage.getItem(
      "ders_coins"
    ) || 0
  );

}

function setCoins(value) {

  const coins =
    Math.max(
      0,
      Number(value) || 0
    );

  localStorage.setItem(
    "ders_coins",
    String(coins)
  );

  if ($("statCoins")) {
    $("statCoins").textContent =
      coins;
  }

}

function addCoins(amount) {

  setCoins(
    getCoins() + Number(amount)
  );

}

/* =========================================================
   DAILY REWARD
========================================================= */

function claimDailyReward() {

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  const last =
    localStorage.getItem(
      "ders_daily_reward"
    );

  if (last === today) {

    toast(
      "Bugünkü ödülü zaten aldın. 🎁",
      "warning"
    );

    updateDailyRewardButton();

    return;
  }

  const reward =
    25;

  addCoins(
    reward
  );

  localStorage.setItem(
    "ders_daily_reward",
    today
  );

  updateDailyRewardButton();

  updateHeader();

  celebrate(
    `🎁 Günlük ödül!<br>🪙 +${reward} Coin`
  );

}

function updateDailyRewardButton() {

  const today =
    new Date()
      .toISOString()
      .slice(0,10);

  const last =
    localStorage.getItem(
      "ders_daily_reward"
    );

  const button =
    $("dailyRewardButton");

  const text =
    $("dailyRewardText");

  if (!button) return;

  if (last === today) {

    button.disabled =
      true;

    button.textContent =
      "✓ Bugün Alındı";

    if (text) {
      text.textContent =
        "Yarın tekrar gel! 🎁";
    }

  } else {

    button.disabled =
      false;

    button.textContent =
      "Ödülü Al 🎁";

    if (text) {
      text.textContent =
        "Bugünkü 25 coin ödülünü al.";
    }

  }

}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const badgeDefinitions = [

  {
    id: "first_task",
    icon: "🎯",
    title: "İlk Görev",
    description: "İlk görevini tamamla."
  },

  {
    id: "five_tasks",
    icon: "⭐",
    title: "Görev Avcısı",
    description: "5 görev tamamla."
  },

  {
    id: "ten_tasks",
    icon: "🏹",
    title: "Görev Ustası",
    description: "10 görev tamamla."
  },

  {
    id: "first_focus",
    icon: "⏱️",
    title: "İlk Odak",
    description: "İlk çalışma seansını tamamla."
  },

  {
    id: "one_hour",
    icon: "🔥",
    title: "Odak Canavarı",
    description: "60 dakika çalış."
  },

  {
    id: "streak7",
    icon: "🔥",
    title: "7 Gün",
    description: "7 günlük seri yap."
  },

  {
    id: "xp500",
    icon: "💎",
    title: "500 XP",
    description: "500 XP kazan."
  },

  {
    id: "xp1000",
    icon: "👑",
    title: "1000 XP",
    description: "1000 XP kazan."
  }

];

function calculateLocalBadges() {

  const completed =
    tasks.filter(
      t => t.completed
    ).length;

  const totalMinutes =
    sessions.reduce(
      (sum, s) =>
        sum +
        Number(
          s.duration_minutes
        ),
      0
    );

  const xp =
    Number(
      currentUser?.xp
    ) || 0;

  const streak =
    Number(
      currentUser?.streak
    ) || 0;

  return {

    first_task:
      completed >= 1,

    five_tasks:
      completed >= 5,

    ten_tasks:
      completed >= 10,

    first_focus:
      sessions.length >= 1,

    one_hour:
      totalMinutes >= 60,

    streak7:
      streak >= 7,

    xp500:
      xp >= 500,

    xp1000:
      xp >= 1000

  };

}

function renderAchievements() {

  const box =
    $("dynamicSection");

  const unlocked =
    calculateLocalBadges();

  box.innerHTML = `

    <div class="card-title">

      <h2>🏆 Rozetler</h2>

      <span>
        ${
          Object.values(unlocked)
            .filter(Boolean)
            .length
        } / ${badgeDefinitions.length}
      </span>

    </div>

    <div class="badges">

      ${badgeDefinitions.map(
        badge => `

          <div
            class="
              badge
              ${
                unlocked[badge.id]
                  ? ""
                  : "locked"
              }
            "
          >

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <strong>
              ${badge.title}
            </strong>

            <small>
              ${badge.description}
            </small>

            <div
              style="
                margin-top:8px;
                font-size:11px;
                font-weight:800
              "
            >
              ${
                unlocked[badge.id]
                  ? "✓ Açıldı"
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

async function renderStats() {

  const box =
    $("dynamicSection");

  box.innerHTML = `
    <div class="card">
      <h2>📊 İstatistikler</h2>
      <p style="color:var(--muted);margin-top:10px">
        Veriler hesaplanıyor...
      </p>
    </div>
  `;

  try {

    const data =
      await api("stats");

    statsData =
      data.stats;

    const taskTotal =
      Number(
        statsData.tasks?.total
      ) || 0;

    const taskCompleted =
      Number(
        statsData.tasks?.completed
      ) || 0;

    const minutes =
      Number(
        statsData.sessions?.minutes
      ) || 0;

    const sessionCount =
      Number(
        statsData.sessions?.sessions
      ) || 0;

    const percentage =
      taskTotal > 0
        ? Math.round(
            taskCompleted /
            taskTotal *
            100
          )
        : 0;

    box.innerHTML = `

      <div class="card-title">
        <h2>📊 İstatistikler</h2>
      </div>

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(auto-fit,minmax(170px,1fr));
          gap:15px
        "
      >

        <div class="stat">
          🎯
          <strong>
            ${taskCompleted}/${taskTotal}
          </strong>
          <small>
            Tamamlanan görev
          </small>
        </div>

        <div class="stat">
          📈
          <strong>
            %${percentage}
          </strong>
          <small>
            Görev başarı oranı
          </small>
        </div>

        <div class="stat">
          ⏱️
          <strong>
            ${minutes}
          </strong>
          <small>
            Toplam dakika
          </small>
        </div>

        <div class="stat">
          🔥
          <strong>
            ${currentUser?.streak || 0}
          </strong>
          <small>
            Günlük seri
          </small>
        </div>

        <div class="stat">
          ⭐
          <strong>
            ${currentUser?.xp || 0}
          </strong>
          <small>
            Toplam XP
          </small>
        </div>

        <div class="stat">
          🪙
          <strong>
            ${getCoins()}
          </strong>
          <small>
            Coin
          </small>
        </div>

      </div>

      <div
        style="
          margin-top:20px;
          padding:20px;
          border-radius:18px;
          background:var(--bg)
        "
      >

        <h3>📚 Genel Durum</h3>

        <p style="
          color:var(--muted);
          margin-top:10px;
          line-height:1.7
        ">
          ${statsData.subjects || 0}
          ders •
          ${statsData.exams || 0}
          sınav •
          ${sessionCount}
          çalışma seansı
        </p>

      </div>

    `;

  } catch (error) {

    toast(
      error.message,
      "error"
    );

  }

}

/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

  const box =
    $("dynamicSection");

  const name =
    currentUser?.name || "";

  const email =
    currentUser?.email || "";

  const xp =
    Number(
      currentUser?.xp
    ) || 0;

  const level =
    getLevel(xp);

  const avatar =
    localStorage.getItem(
      "ders_avatar"
    ) || "🎓";

  box.innerHTML = `

    <div class="card">

      <div class="card-title">
        <h2>👤 Profil</h2>

        <button
          class="secondary-btn"
          onclick="toggleDarkMode()"
        >
          🌙 Tema
        </button>

      </div>

      <div
        style="
          display:flex;
          align-items:center;
          gap:15px;
          margin-bottom:25px
        "
      >

        <div
          style="
            width:75px;
            height:75px;
            border-radius:50%;
            background:#e7e4ff;
            display:grid;
            place-items:center;
            font-size:38px
          "
        >
          ${avatar}
        </div>

        <div>

          <h2>
            ${escapeHTML(name)}
          </h2>

          <p style="color:var(--muted)">
            Seviye ${level}
          </p>

        </div>

      </div>

      <div class="form-group">

        <label>Ad Soyad</label>

        <input
          id="profileName"
          value="${escapeAttribute(name)}"
        >

      </div>

      <div class="form-group">

        <label>E-posta</label>

        <input
          value="${escapeAttribute(email)}"
          disabled
        >

      </div>

      <div class="form-group">

        <label>Avatar</label>

        <div
          style="
            display:flex;
            gap:8px;
            flex-wrap:wrap
          "
        >

          ${[
            "🎓",
            "😎",
            "🧑‍🎓",
            "👨‍💻",
            "🦊",
            "🐼",
            "🐱",
            "🐰",
            "🚀"
          ].map(
            icon => `

              <button
                class="secondary-btn"
                onclick="changeAvatar('${icon}')"
                style="font-size:22px"
              >
                ${icon}
              </button>

            `
          ).join("")}

        </div>

      </div>

      <button
        class="primary-btn"
        onclick="saveProfile()"
      >
        💾 Profili Kaydet
      </button>

      <div
        style="
          margin-top:25px;
          padding:18px;
          background:var(--bg);
          border-radius:18px
        "
      >

        <strong>📌 Hesap Bilgileri</strong>

        <p
          style="
            color:var(--muted);
            margin-top:8px;
            line-height:1.7
          "
        >
          ⭐ ${xp} XP<br>
          🔥 ${currentUser?.streak || 0} günlük seri<br>
          🪙 ${getCoins()} Coin<br>
          📚 ${subjects.length} ders
        </p>

      </div>

    </div>

  `;

}

function changeAvatar(icon) {

  localStorage.setItem(
    "ders_avatar",
    icon
  );

  updateHeader();

  renderProfile();

}

async function saveProfile() {

  const name =
    $("profileName")?.value.trim();

  if (!name) {

    toast(
      "İsim boş bırakılamaz.",
      "warning"
    );

    return;
  }

  /*
   * Mevcut backend'de kullanıcı güncelleme
   * endpoint'i olmadığı için isim local olarak
   * saklanıyor.
   *
   * Daha sonra API'ye profile PATCH ekleyebiliriz.
   */

  localStorage.setItem(
    "ders_profile_name",
    name
  );

  currentUser.name =
    name;

  updateHeader();

  toast(
    "Profil güncellendi! 👤",
    "success"
  );

}

/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  localStorage.setItem(
    "ders_dark_mode",
    document.body.classList.contains("dark")
      ? "1"
      : "0"
  );

}

function loadTheme() {

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

function navigateMobile(section) {

  closeMobileMenu();

  navigate(section);

  document
    .querySelectorAll(
      ".mobile-menu-item"
    )
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick")
          .includes(`'${section}'`)
      ) {

        btn.classList.add(
          "active"
        );

      }

    });

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

function celebrate(message) {

  const box =
    $("celebration");

  if (!box) return;

  $("celebrationText").innerHTML =
    message;

  box.style.display =
    "flex";

  setTimeout(() => {

    box.style.display =
      "none";

  }, 2200);

}

/* =========================================================
   USER REFRESH
========================================================= */

async function refreshUser() {

  try {

    const data =
      await api("me");

    if (data.user) {

      currentUser =
        data.user;

      updateHeader();

    }

  } catch (error) {

    console.error(
      "Kullanıcı yenileme:",
      error
    );

  }

}

/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

  return String(
    value ?? ""
  )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function escapeAttribute(value) {

  return escapeHTML(
    value
  );

}

function formatDate(date) {

  if (!date) return "-";

  const d =
    new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleString(
    "tr-TR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadTheme();

    updateDailyRewardButton();

    checkAuth();

    /*
     * Her dakika günlük ödül durumunu kontrol et.
     */
    setInterval(
      updateDailyRewardButton,
      60000
    );

  }
);

/* =========================================================
   GLOBAL EXPORT
========================================================= */

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

window.navigate =
  navigate;

window.navigateMobile =
  navigateMobile;

window.toggleMobileMenu =
  toggleMobileMenu;

window.addTask =
  addTask;

window.toggleTask =
  toggleTask;

window.deleteTask =
  deleteTask;

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

window.toggleFocus =
  toggleFocus;

window.pauseFocus =
  pauseFocus;

window.resetFocus =
  resetFocus;

window.setFocusMinutes =
  setFocusMinutes;

window.renderCoach =
  renderCoach;

window.feedPet =
  feedPet;

window.renamePet =
  renamePet;

window.changePet =
  changePet;

window.buyItem =
  buyItem;

window.claimDailyReward =
  claimDailyReward;

window.renderAchievements =
  renderAchievements;

window.renderStats =
  renderStats;

window.renderProfile =
  renderProfile;

window.changeAvatar =
  changeAvatar;

window.saveProfile =
  saveProfile;

window.toggleDarkMode =
  toggleDarkMode;

window.openModal =
  openModal;

window.closeModal =
  closeModal;
