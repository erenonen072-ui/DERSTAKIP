/* =========================================================
   DERS TAKİP 2.0
   Tek parça app.js
   HTML + mevcut CSS ile uyumlu
========================================================= */

const API_BASE = "/api";

let currentUser = null;

let state = {
  tasks: [],
  subjects: [],
  exams: [],
  xp: 0,
  coins: 0,
  streak: 0,
  level: 1,
  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1
  },
  focusSeconds: 25 * 60,
  focusRunning: false,
  focusInterval: null,
  dailyRewardClaimed: false,
  darkMode: false
};

let currentPage = "home";

/* =========================================================
   YARDIMCI FONKSİYONLAR
========================================================= */

function $(id) {
  return document.getElementById(id);
}

function escapeHTML(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message, type = "normal") {
  const container = $("toastContainer");

  if (!container) return;

  const toast = document.createElement("div");

  toast.className = "toast";

  if (type === "success") {
    toast.style.background = "#20c997";
  }

  if (type === "error") {
    toast.style.background = "#ff5b6e";
  }

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showCelebration(message) {
  const celebration = $("celebration");
  const text = $("celebrationText");

  if (!celebration) return;

  if (text) {
    text.textContent = message;
  }

  celebration.style.display = "flex";

  setTimeout(() => {
    celebration.style.display = "none";
  }, 1800);
}

function openModal(title, content) {
  $("modalTitle").textContent = title;
  $("modalContent").innerHTML = content;
  $("modal").classList.add("show");
}

function closeModal() {
  $("modal").classList.remove("show");
}

window.closeModal = closeModal;

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

window.showLogin = showLogin;
window.showRegister = showRegister;
window.togglePassword = togglePassword;

async function login(event) {
  event.preventDefault();

  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;

  if (!email || !password) {
    showAuthMessage("Lütfen tüm alanları doldur.", true);
    return;
  }

  showAuthMessage("Giriş yapılıyor...");

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Giriş başarısız.");
    }

    currentUser = data.user || data;

    localStorage.setItem(
      "dersTakipUser",
      JSON.stringify(currentUser)
    );

    await initializeApp();

  } catch (error) {
    /*
      Eğer API henüz hazır değilse kullanıcıya
      anlaşılır hata gösteriyoruz.
    */
    showAuthMessage(
      error.message || "Giriş yapılamadı.",
      true
    );
  }
}

async function register(event) {
  event.preventDefault();

  const name = $("registerName").value.trim();
  const email = $("registerEmail").value.trim();
  const password = $("registerPassword").value;

  if (!name || !email || !password) {
    showAuthMessage("Lütfen tüm alanları doldur.", true);
    return;
  }

  showAuthMessage("Hesap oluşturuluyor...");

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Kayıt başarısız.");
    }

    showAuthMessage(
      "Hesabın oluşturuldu! Giriş yapabilirsin."
    );

    showLogin();

    $("loginEmail").value = email;

  } catch (error) {
    showAuthMessage(
      error.message || "Kayıt yapılamadı.",
      true
    );
  }
}

function showAuthMessage(message, error = false) {
  const el = $("authMessage");

  if (!el) return;

  el.textContent = message;

  el.style.color = error
    ? "#e53950"
    : "#20a87a";
}

async function logout() {
  currentUser = null;

  localStorage.removeItem("dersTakipUser");

  stopFocusTimer();

  $("app").style.display = "none";
  $("authScreen").style.display = "flex";

  showLogin();

  showToast("Çıkış yapıldı.");
}

window.login = login;
window.register = register;
window.logout = logout;

/* =========================================================
   UYGULAMA BAŞLAT
========================================================= */

async function initializeApp() {
  $("authScreen").style.display = "none";
  $("app").style.display = "block";

  loadLocalState();

  updateUserUI();

  await loadData();

  /*
    ÖNEMLİ:
    Uygulama açıldığında sadece ANA SAYFA gösteriliyor.
    Ana sayfada artık diğer bölümlerin kartları yok.
  */
  navigate("home");
}

async function loadData() {
  /*
    API endpoint'in farklıysa burada değiştirebilirsin.
    API başarısız olursa localStorage verileri kullanılmaya devam eder.
  */

  try {
    const response = await fetch(`${API_BASE}/dashboard`, {
      credentials: "include"
    });

    if (!response.ok) return;

    const data = await response.json();

    if (data.tasks) state.tasks = data.tasks;
    if (data.subjects) state.subjects = data.subjects;
    if (data.exams) state.exams = data.exams;

    if (typeof data.xp === "number") {
      state.xp = data.xp;
    }

    if (typeof data.coins === "number") {
      state.coins = data.coins;
    }

    if (typeof data.streak === "number") {
      state.streak = data.streak;
    }

    calculateLevel();

  } catch (error) {
    console.log("API verileri alınamadı, yerel veriler kullanılıyor.");
  }
}

function loadLocalState() {
  try {
    const saved = localStorage.getItem("dersTakipState");

    if (saved) {
      const parsed = JSON.parse(saved);

      state = {
        ...state,
        ...parsed
      };
    }
  } catch (error) {
    console.log("Yerel veri okunamadı.");
  }
}

function saveLocalState() {
  localStorage.setItem(
    "dersTakipState",
    JSON.stringify(state)
  );
}

/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {
  const name =
    currentUser?.name ||
    currentUser?.fullName ||
    currentUser?.username ||
    "Eren";

  const firstName = name.split(" ")[0];

  if ($("welcomeText")) {
    $("welcomeText").textContent =
      `Merhaba, ${firstName}! 👋`;
  }

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${state.level}`;
  }

  if ($("topAvatar")) {
    $("topAvatar").textContent =
      state.pet?.emoji || "🎓";
  }

  if ($("petDisplay")) {
    $("petDisplay").textContent =
      state.pet?.emoji || "🐼";
  }

  if ($("petName")) {
    $("petName").textContent =
      state.pet?.name || "Panda";
  }

  if ($("petLevel")) {
    $("petLevel").textContent =
      `Seviye ${state.pet?.level || 1}`;
  }
}

/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page, button = null) {
  currentPage = page;

  /*
    TÜM SAYFA İÇERİĞİNİ TEK BİR ALANDA DEĞİŞTİRİYORUZ.

    Böylece:
    Ana sayfada görev + koç + pet + market vb.
    otomatik olarak görünmeyecek.
  */

  const mainContent = $("mainContent");
  const dynamicSection = $("dynamicSection");

  if (!mainContent || !dynamicSection) return;

  /*
    Önce tüm eski içeriği temizle.
  */
  mainContent.innerHTML = "";

  dynamicSection.style.display = "none";
  dynamicSection.innerHTML = "";

  /*
    Menü aktifliği
  */
  document.querySelectorAll(".menu button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  } else {
    document.querySelectorAll(".menu button").forEach(btn => {
      if (
        btn.getAttribute("onclick")?.includes(`'${page}'`)
      ) {
        btn.classList.add("active");
      }
    });
  }

  /*
    Mobil menü
  */
  document.querySelectorAll(".mobile-menu-item").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".mobile-menu-item").forEach(btn => {
    if (
      btn.getAttribute("onclick")?.includes(`'${page}'`)
    ) {
      btn.classList.add("active");
    }
  });

  updatePageHeader(page);

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
}

function navigateMobile(page) {
  navigate(page);

  const drawer = $("mobileDrawer");

  if (drawer) {
    drawer.classList.remove("open");
  }
}

function updatePageHeader(page) {
  const titles = {
    home: [
      "Merhaba! 👋",
      "Bugün küçük bir adım, yarın büyük bir başarı."
    ],
    tasks: [
      "Görevlerin ✅",
      "Bugün tamamlaman gereken çalışmaları yönet."
    ],
    subjects: [
      "Dersler 📚",
      "Derslerini düzenle ve ilerlemeni takip et."
    ],
    exams: [
      "Sınavlar 📅",
      "Yaklaşan sınavlarını takip et."
    ],
    focus: [
      "Odaklan ⏱️",
      "Telefonu bırak, çalışmaya başla."
    ],
    coach: [
      "Ders Koçu 🤖",
      "Bugünkü çalışma önerilerini keşfet."
    ],
    pet: [
      "Evcil Hayvan 🐣",
      "Çalıştıkça evcil hayvanını geliştir."
    ],
    market: [
      "Ödül Marketi 🛒",
      "Coinlerini kullanarak ödüller satın al."
    ],
    achievements: [
      "Rozetler 🏆",
      "Kazandığın başarıları keşfet."
    ],
    stats: [
      "İstatistikler 📊",
      "Çalışma performansını incele."
    ],
    profile: [
      "Profil 👤",
      "Hesabını ve tercihlerini yönet."
    ]
  };

  const info = titles[page] || titles.home;

  if ($("welcomeText")) {
    $("welcomeText").textContent = info[0];
  }

  if ($("sectionSubtitle")) {
    $("sectionSubtitle").textContent = info[1];
  }

  /*
    Hero sadece ana sayfada görünür.
  */
  if ($("homeHero")) {
    $("homeHero").style.display =
      page === "home"
        ? "block"
        : "none";
  }
}

/* =========================================================
   ANA SAYFA
   ÇOK SADE
========================================================= */

function renderHome() {
  const mainContent = $("mainContent");

  /*
    SADE ANA SAYFA

    Sadece:
    - Hoş geldin
    - Bugünün küçük hedefi
    - Hızlı başla
    - Bugünkü görev sayısı
  */

  mainContent.innerHTML = `
    <div class="card" style="
      background:
        linear-gradient(135deg,#f8f7ff,#ffffff);
      margin-bottom:20px;
      padding:30px;
    ">
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:20px;
        flex-wrap:wrap;
      ">
        <div>
          <div style="
            font-size:13px;
            color:var(--primary);
            font-weight:900;
            margin-bottom:8px;
          ">
            BUGÜN
          </div>

          <h2 style="
            font-size:28px;
            margin-bottom:8px;
          ">
            Çalışmaya hazır mısın? 🚀
          </h2>

          <p style="
            color:var(--muted);
            line-height:1.6;
          ">
            Küçük bir görev tamamla ve güne iyi bir başlangıç yap.
          </p>
        </div>

        <div style="
          width:100px;
          height:100px;
          border-radius:28px;
          display:grid;
          place-items:center;
          background:#eeebff;
          font-size:50px;
        ">
          📚
        </div>
      </div>
    </div>

    <div style="
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:16px;
    ">

      <button
        class="card"
        onclick="navigate('tasks')"
        style="
          border:none;
          text-align:left;
          cursor:pointer;
          transition:.2s;
        "
        onmouseover="this.style.transform='translateY(-3px)'"
        onmouseout="this.style.transform='translateY(0)'"
      >
        <div style="font-size:30px;margin-bottom:10px;">
          ✅
        </div>

        <strong style="font-size:18px;">
          Görevlerime Git
        </strong>

        <p style="
          color:var(--muted);
          margin-top:6px;
        ">
          ${getIncompleteTasks().length} görev bekliyor
        </p>
      </button>

      <button
        class="card"
        onclick="navigate('focus')"
        style="
          border:none;
          text-align:left;
          cursor:pointer;
          transition:.2s;
        "
        onmouseover="this.style.transform='translateY(-3px)'"
        onmouseout="this.style.transform='translateY(0)'"
      >
        <div style="font-size:30px;margin-bottom:10px;">
          ⏱️
        </div>

        <strong style="font-size:18px;">
          Odaklanmaya Başla
        </strong>

        <p style="
          color:var(--muted);
          margin-top:6px;
        ">
          25 dakikalık çalışma başlat
        </p>
      </button>

    </div>

    <div style="
      margin-top:20px;
      padding:20px;
      border-radius:18px;
      background:var(--white);
      border:1px solid var(--border);
    ">
      <div style="
        display:flex;
        justify-content:space-between;
        gap:15px;
        flex-wrap:wrap;
      ">
        <div>
          <strong>Bugünkü ilerleme</strong>
          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            ${getCompletedTasks().length} görev tamamlandı
          </p>
        </div>

        <strong style="
          color:var(--primary);
          font-size:20px;
        ">
          ${calculateProgress()}%
        </strong>
      </div>

      <div class="progress" style="
        margin-top:15px;
        background:#ecebfa;
      ">
        <span
          style="
            width:${calculateProgress()}%;
            background:linear-gradient(
              90deg,
              var(--primary),
              var(--primary2)
            );
          "
        ></span>
      </div>
    </div>
  `;

  /*
    SAĞ KOLONDAKİ ESKİ PET/SERİ/ÖDÜL KARTLARINI
    GÖSTERME.

    Bunun için grid yapısını da tek kolon yapıyoruz.
  */
  const grid = document.querySelector(".grid");

  if (grid) {
    grid.style.gridTemplateColumns = "1fr";
  }

  /*
    Ana sayfada eski hero kartını da gizliyoruz.
  */
  if ($("homeHero")) {
    $("homeHero").style.display = "none";
  }
}

/* =========================================================
   GÖREVLER
========================================================= */

function renderTasksPage() {
  const mainContent = $("mainContent");

  const completed = getCompletedTasks().length;
  const total = state.tasks.length;

  mainContent.innerHTML = `
    <div class="card">
      <div class="card-title">
        <div>
          <h2>Bugünkü Görevler</h2>
          <p style="color:var(--muted);margin-top:5px;">
            ${completed} / ${total} görev tamamlandı
          </p>
        </div>

        <span style="
          background:#f0efff;
          color:#6257df;
          padding:8px 12px;
          border-radius:20px;
          font-weight:900;
        ">
          ${calculateProgress()}%
        </span>
      </div>

      <div id="taskPageList">
        ${renderTaskListHTML()}
      </div>

      <div class="add-task">
        <input
          id="pageNewTask"
          placeholder="Yeni görev ekle..."
          maxlength="150"
          onkeydown="if(event.key==='Enter') addTaskFromPage()"
        >

        <button onclick="addTaskFromPage()">
          + Ekle
        </button>
      </div>
    </div>
  `;
}

function renderTaskListHTML() {
  if (!state.tasks.length) {
    return `
      <div style="
        text-align:center;
        padding:40px 15px;
        color:var(--muted);
      ">
        <div style="font-size:50px;margin-bottom:10px;">
          📝
        </div>

        <strong>Henüz görev yok</strong>

        <p style="margin-top:6px;">
          İlk görevini aşağıdan ekleyebilirsin.
        </p>
      </div>
    `;
  }

  return state.tasks.map((task, index) => `
    <div class="task ${task.completed ? "completed" : ""}">

      <button
        class="checkbox"
        onclick="toggleTask(${index})"
        style="background:${
          task.completed ? "#20c997" : "transparent"
        };"
      >
        ${task.completed ? "✓" : ""}
      </button>

      <div class="task-content">
        <div class="task-name">
          ${escapeHTML(task.name)}
        </div>

        ${
          task.subject
            ? `<small style="color:var(--muted)">
                ${escapeHTML(task.subject)}
              </small>`
            : ""
        }
      </div>

      <span class="task-xp">
        +${task.xp || 25} XP
      </span>

      <button
        class="delete-task"
        onclick="deleteTask(${index})"
        title="Sil"
      >
        🗑️
      </button>
    </div>
  `).join("");
}

function addTaskFromPage() {
  const input = $("pageNewTask");

  if (!input) return;

  const name = input.value.trim();

  if (!name) {
    showToast("Bir görev yazmalısın.", "error");
    return;
  }

  state.tasks.push({
    id: Date.now(),
    name,
    completed: false,
    xp: 25,
    createdAt: new Date().toISOString()
  });

  saveLocalState();

  showToast("Görev eklendi! ✅", "success");

  renderTasksPage();
  updateGlobalStats();
}

function addTask() {
  const input = $("newTask");

  if (!input) {
    navigate("tasks");
    return;
  }

  const name = input.value.trim();

  if (!name) {
    showToast("Bir görev yazmalısın.", "error");
    return;
  }

  state.tasks.push({
    id: Date.now(),
    name,
    completed: false,
    xp: 25,
    createdAt: new Date().toISOString()
  });

  input.value = "";

  saveLocalState();

  showToast("Görev eklendi! ✅", "success");

  if (currentPage === "tasks") {
    renderTasksPage();
  }
}

function toggleTask(index) {
  const task = state.tasks[index];

  if (!task) return;

  const wasCompleted = task.completed;

  task.completed = !task.completed;

  if (!wasCompleted && task.completed) {
    const xp = task.xp || 25;

    state.xp += xp;
    state.coins += Math.ceil(xp / 5);

    calculateLevel();

    showCelebration(`⭐ +${xp} XP kazandın!`);

    updateStreak();

  } else if (wasCompleted && !task.completed) {
    const xp = task.xp || 25;

    state.xp = Math.max(0, state.xp - xp);
    state.coins = Math.max(
      0,
      state.coins - Math.ceil(xp / 5)
    );

    calculateLevel();
  }

  saveLocalState();

  if (currentPage === "tasks") {
    renderTasksPage();
  } else {
    renderHome();
  }

  updateGlobalStats();
}

function deleteTask(index) {
  if (!state.tasks[index]) return;

  const task = state.tasks[index];

  if (
    !confirm(
      `"${task.name}" görevini silmek istediğine emin misin?`
    )
  ) {
    return;
  }

  state.tasks.splice(index, 1);

  saveLocalState();

  showToast("Görev silindi.");

  renderTasksPage();
}

function getCompletedTasks() {
  return state.tasks.filter(t => t.completed);
}

function getIncompleteTasks() {
  return state.tasks.filter(t => !t.completed);
}

function calculateProgress() {
  if (!state.tasks.length) return 0;

  return Math.round(
    getCompletedTasks().length /
    state.tasks.length *
    100
  );
}

window.addTask = addTask;
window.addTaskFromPage = addTaskFromPage;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

/* =========================================================
   DERSLER
========================================================= */

function renderSubjectsPage() {
  const mainContent = $("mainContent");

  if (!state.subjects.length) {
    state.subjects = [
      {
        id: 1,
        name: "Matematik",
        icon: "📐",
        color: "#6857f5"
      },
      {
        id: 2,
        name: "Türkçe",
        icon: "📖",
        color: "#20c997"
      },
      {
        id: 3,
        name: "Fen Bilimleri",
        icon: "🔬",
        color: "#3b82f6"
      }
    ];

    saveLocalState();
  }

  mainContent.innerHTML = `
    <div class="card">
      <div class="card-title">
        <h2>Derslerim</h2>

        <button
          class="primary-btn"
          onclick="openAddSubjectModal()"
        >
          + Ders Ekle
        </button>
      </div>

      <div class="market-grid">
        ${state.subjects.map((subject, index) => `
          <div class="shop-item">

            <div class="shop-icon">
              ${subject.icon || "📚"}
            </div>

            <h3>
              ${escapeHTML(subject.name)}
            </h3>

            <p>
              Dersini takip et
            </p>

            <button
              class="secondary-btn"
              onclick="deleteSubject(${index})"
            >
              Sil
            </button>

          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function openAddSubjectModal() {
  openModal(
    "Yeni Ders Ekle",
    `
      <div class="form-group">
        <label>Ders adı</label>
        <input
          id="subjectNameInput"
          placeholder="Örn. Matematik"
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

function addSubject() {
  const input = $("subjectNameInput");

  if (!input) return;

  const name = input.value.trim();

  if (!name) {
    showToast("Ders adı yaz.", "error");
    return;
  }

  state.subjects.push({
    id: Date.now(),
    name,
    icon: "📚"
  });

  saveLocalState();

  closeModal();

  renderSubjectsPage();

  showToast("Ders eklendi! 📚", "success");
}

function deleteSubject(index) {
  if (!confirm("Bu dersi silmek istiyor musun?")) return;

  state.subjects.splice(index, 1);

  saveLocalState();

  renderSubjectsPage();

  showToast("Ders silindi.");
}

window.addSubject = addSubject;
window.deleteSubject = deleteSubject;
window.openAddSubjectModal = openAddSubjectModal;

/* =========================================================
   SINAVLAR
========================================================= */

function renderExamsPage() {
  const mainContent = $("mainContent");

  mainContent.innerHTML = `
    <div class="card">

      <div class="card-title">
        <div>
          <h2>Sınavlarım 📅</h2>
          <p style="color:var(--muted);margin-top:5px;">
            Yaklaşan sınavlarını burada takip et.
          </p>
        </div>

        <button
          class="primary-btn"
          onclick="openAddExamModal()"
        >
          + Sınav Ekle
        </button>
      </div>

      ${
        state.exams.length
          ? state.exams.map((exam, index) => `
              <div class="task">

                <div style="
                  width:45px;
                  height:45px;
                  border-radius:13px;
                  background:#eef0ff;
                  display:grid;
                  place-items:center;
                  font-size:22px;
                ">
                  📅
                </div>

                <div class="task-content">
                  <div class="task-name">
                    ${escapeHTML(exam.name)}
                  </div>

                  <small style="color:var(--muted)">
                    ${escapeHTML(exam.date)}
                  </small>
                </div>

                <button
                  class="delete-task"
                  onclick="deleteExam(${index})"
                >
                  🗑️
                </button>

              </div>
            `).join("")
          : `
            <div style="
              text-align:center;
              padding:45px;
              color:var(--muted);
            ">
              <div style="font-size:55px;">
                📅
              </div>

              <strong>
                Henüz sınav eklemedin.
              </strong>
            </div>
          `
      }

    </div>
  `;
}

function openAddExamModal() {
  openModal(
    "Yeni Sınav Ekle",
    `
      <div class="form-group">
        <label>Sınav adı</label>
        <input
          id="examName"
          placeholder="Örn. Matematik Yazılısı"
          style="
            width:100%;
            padding:13px;
            border:1px solid var(--border);
            border-radius:11px;
          "
        >
      </div>

      <div class="form-group">
        <label>Tarih</label>
        <input
          id="examDate"
          type="date"
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
        onclick="addExam()"
      >
        Sınavı Ekle
      </button>
    `
  );
}

function addExam() {
  const name = $("examName")?.value.trim();
  const date = $("examDate")?.value;

  if (!name || !date) {
    showToast("Sınav adı ve tarih gerekli.", "error");
    return;
  }

  state.exams.push({
    id: Date.now(),
    name,
    date
  });

  state.exams.sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  saveLocalState();

  closeModal();

  renderExamsPage();

  showToast("Sınav eklendi! 📅", "success");
}

function deleteExam(index) {
  if (!confirm("Bu sınavı silmek istiyor musun?")) return;

  state.exams.splice(index, 1);

  saveLocalState();

  renderExamsPage();

  showToast("Sınav silindi.");
}

window.openAddExamModal = openAddExamModal;
window.addExam = addExam;
window.deleteExam = deleteExam;

/* =========================================================
   ODAKLAN
========================================================= */

function renderFocusPage() {
  const mainContent = $("mainContent");

  mainContent.innerHTML = `
    <div class="card focus">

      <div style="
        max-width:600px;
        margin:auto;
      ">

        <div style="
          width:80px;
          height:80px;
          border-radius:25px;
          background:#eeebff;
          display:grid;
          place-items:center;
          margin:auto;
          font-size:40px;
        ">
          ⏱️
        </div>

        <h2 style="margin-top:20px;">
          Odaklanma Zamanı
        </h2>

        <p style="
          color:var(--muted);
          margin-top:7px;
        ">
          25 dakika boyunca sadece dersine odaklan.
        </p>

        <div
          class="timer"
          id="focusTimer"
        >
          ${formatTime(state.focusSeconds)}
        </div>

        <div class="focus-buttons">

          <button
            class="primary-btn"
            onclick="toggleFocusTimer()"
          >
            ▶ Başlat
          </button>

          <button
            class="secondary-btn"
            onclick="resetFocusTimer()"
          >
            ↻ Sıfırla
          </button>

        </div>

      </div>

    </div>
  `;

  updateFocusTimerDisplay();
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    String(min).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0")
  );
}

function toggleFocusTimer() {
  if (state.focusRunning) {
    stopFocusTimer();
    return;
  }

  state.focusRunning = true;

  state.focusInterval = setInterval(() => {

    if (state.focusSeconds <= 0) {

      stopFocusTimer();

      state.xp += 30;
      state.coins += 5;

      calculateLevel();

      saveLocalState();

      showCelebration("⏱️ Odaklanma tamamlandı! +30 XP");

      return;
    }

    state.focusSeconds--;

    updateFocusTimerDisplay();

  }, 1000);
}

function stopFocusTimer() {
  state.focusRunning = false;

  if (state.focusInterval) {
    clearInterval(state.focusInterval);
    state.focusInterval = null;
  }
}

function resetFocusTimer() {
  stopFocusTimer();

  state.focusSeconds = 25 * 60;

  updateFocusTimerDisplay();
}

function updateFocusTimerDisplay() {
  const timer = $("focusTimer");

  if (timer) {
    timer.textContent =
      formatTime(state.focusSeconds);
  }
}

window.toggleFocusTimer = toggleFocusTimer;
window.resetFocusTimer = resetFocusTimer;

/* =========================================================
   DERS KOÇU
========================================================= */

function renderCoachPage() {
  const mainContent = $("mainContent");

  const suggestions = [
    "Bugün önce en zor dersinden başlamayı dene. 🧠",
    "25 dakika çalış, ardından 5 dakika mola ver. ⏱️",
    "Telefonunu sessize al ve dikkat dağıtıcıları kapat. 📵",
    "Küçük hedefler belirlemek motivasyonunu artırabilir. 🎯",
    "Bugün en az bir görevi tamamen bitirmeye çalış. ⭐",
    "Çalışırken kısa notlar almak konuyu hatırlamana yardımcı olur. 📝"
  ];

  const suggestion =
    suggestions[
      new Date().getDate() %
      suggestions.length
    ];

  mainContent.innerHTML = `
    <div class="card coach">

      <div class="coach-head">
        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>Ders Koçu</h2>

          <small style="color:var(--muted)">
            Sana özel çalışma önerisi
          </small>
        </div>
      </div>

      <div style="
        background:var(--white);
        border:1px solid var(--border);
        border-radius:18px;
        padding:22px;
        line-height:1.7;
      ">
        ${suggestion}
      </div>

      <div style="
        display:grid;
        grid-template-columns:
        repeat(3,minmax(0,1fr));
        gap:12px;
        margin-top:15px;
      ">

        <div class="stat">
          <strong>${getIncompleteTasks().length}</strong>
          <small>Bekleyen görev</small>
        </div>

        <div class="stat">
          <strong>${state.streak}</strong>
          <small>Günlük seri</small>
        </div>

        <div class="stat">
          <strong>${state.level}</strong>
          <small>Seviye</small>
        </div>

      </div>

    </div>
  `;
}

/* =========================================================
   PET
========================================================= */

function renderPetPage() {
  const mainContent = $("mainContent");

  mainContent.innerHTML = `
    <div class="card pet-card">

      <h2>🐣 Evcil Hayvanım</h2>

      <div
        class="pet-display"
        style="
          max-width:500px;
          margin:25px auto;
          height:260px;
          font-size:130px;
        "
      >
        ${state.pet.emoji}
      </div>

      <div class="pet-name">
        ${escapeHTML(state.pet.name)}
      </div>

      <div class="pet-level">
        Seviye ${state.pet.level}
      </div>

      <p style="
        color:var(--muted);
        margin:15px auto;
        max-width:500px;
        line-height:1.6;
      ">
        Ders çalıştıkça XP kazanırsın.
        Seviyen yükseldikçe evcil hayvanın da gelişir.
      </p>

      <button
        class="primary-btn"
        onclick="renamePet()"
      >
        ✏️ İsmini Değiştir
      </button>

    </div>
  `;
}

function renamePet() {
  openModal(
    "Evcil Hayvanının İsmi",
    `
      <div class="form-group">
        <label>Yeni isim</label>

        <input
          id="newPetName"
          value="${escapeHTML(state.pet.name)}"
          maxlength="20"
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
        onclick="savePetName()"
      >
        Kaydet
      </button>
    `
  );
}

function savePetName() {
  const name = $("newPetName")?.value.trim();

  if (!name) {
    showToast("Bir isim yaz.", "error");
    return;
  }

  state.pet.name = name;

  saveLocalState();

  closeModal();

  renderPetPage();

  updateUserUI();

  showToast("Evcil hayvanının adı değiştirildi! 🐼");
}

window.renamePet = renamePet;
window.savePetName = savePetName;

/* =========================================================
   MARKET
========================================================= */

const marketItems = [
  {
    id: "food",
    icon: "🍎",
    name: "Elma",
    description: "Pandanı mutlu et.",
    price: 20
  },
  {
    id: "hat",
    icon: "🎩",
    name: "Şapka",
    description: "Şık bir aksesuar.",
    price: 50
  },
  {
    id: "star",
    icon: "⭐",
    name: "Yıldız",
    description: "Özel ödül.",
    price: 100
  },
  {
    id: "rocket",
    icon: "🚀",
    name: "Roket",
    description: "Hızlı seviye bonusu.",
    price: 150
  }
];

function renderMarketPage() {
  const mainContent = $("mainContent");

  mainContent.innerHTML = `
    <div class="card">

      <div class="card-title">
        <div>
          <h2>Ödül Marketi 🛒</h2>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            Bakiyen:
            <strong style="color:#d79a00;">
              🪙 ${state.coins}
            </strong>
          </p>
        </div>
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
              onclick="buyMarketItem('${item.id}')"
            >
              Satın Al
            </button>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

function buyMarketItem(id) {
  const item = marketItems.find(
    x => x.id === id
  );

  if (!item) return;

  if (state.coins < item.price) {
    showToast(
      "Bu ödülü almak için yeterli coin'in yok.",
      "error"
    );
    return;
  }

  state.coins -= item.price;

  saveLocalState();

  showToast(
    `${item.name} satın alındı! 🎁`,
    "success"
  );

  renderMarketPage();

  updateGlobalStats();
}

window.buyMarketItem = buyMarketItem;

/* =========================================================
   ROZETLER
========================================================= */

function renderAchievementsPage() {
  const mainContent = $("mainContent");

  const badges = [
    {
      icon: "🌱",
      name: "İlk Adım",
      description: "İlk görevini tamamla.",
      unlocked: getCompletedTasks().length >= 1
    },
    {
      icon: "🔥",
      name: "Ateş Başladı",
      description: "3 günlük seri yap.",
      unlocked: state.streak >= 3
    },
    {
      icon: "⭐",
      name: "XP Avcısı",
      description: "100 XP kazan.",
      unlocked: state.xp >= 100
    },
    {
      icon: "🏆",
      name: "Çalışkan",
      description: "10 görev tamamla.",
      unlocked: getCompletedTasks().length >= 10
    },
    {
      icon: "🚀",
      name: "Seviye Atladım",
      description: "Seviye 2'ye ulaş.",
      unlocked: state.level >= 2
    },
    {
      icon: "🧠",
      name: "Odak Ustası",
      description: "Odaklanma oturumunu tamamla.",
      unlocked: state.xp >= 30
    }
  ];

  mainContent.innerHTML = `
    <div class="card">

      <div class="card-title">
        <div>
          <h2>Başarı Rozetleri 🏆</h2>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            ${
              badges.filter(b => b.unlocked).length
            } / ${badges.length} rozet kazanıldı
          </p>
        </div>
      </div>

      <div class="badges">

        ${badges.map(badge => `
          <div class="badge ${
            badge.unlocked ? "" : "locked"
          }">

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <strong>
              ${badge.name}
            </strong>

            <small>
              ${badge.description}
            </small>

            <div style="
              margin-top:8px;
              font-size:11px;
              font-weight:900;
              color:${
                badge.unlocked
                  ? "#20c997"
                  : "var(--muted)"
              };
            ">
              ${
                badge.unlocked
                  ? "✓ KAZANILDI"
                  : "🔒 KİLİTLİ"
              }
            </div>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

/* =========================================================
   İSTATİSTİKLER
========================================================= */

function renderStatsPage() {
  const mainContent = $("mainContent");

  const totalTasks = state.tasks.length;
  const completedTasks =
    getCompletedTasks().length;

  const completion =
    totalTasks
      ? Math.round(
          completedTasks /
          totalTasks *
          100
        )
      : 0;

  mainContent.innerHTML = `
    <div class="card">

      <div class="card-title">
        <div>
          <h2>Çalışma İstatistiklerin 📊</h2>

          <p style="color:var(--muted);margin-top:5px;">
            Ders çalışma performansın
          </p>
        </div>
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
            Günlük seri
          </small>
        </div>

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
          <span>📈</span>

          <strong>
            ${completion}%
          </strong>

          <small>
            Görev başarısı
          </small>
        </div>

      </div>

      <div style="
        margin-top:25px;
        padding:20px;
        border-radius:18px;
        background:#f5f4ff;
      ">

        <strong>
          Görev Tamamlama
        </strong>

        <div class="progress" style="
          margin-top:12px;
          background:#dddaf8;
        ">
          <span
            style="
              width:${completion}%;
              background:var(--primary);
            "
          ></span>
        </div>

        <p style="
          color:var(--muted);
          margin-top:8px;
        ">
          ${completedTasks} / ${totalTasks}
          görev tamamlandı.
        </p>

      </div>

    </div>
  `;
}

/* =========================================================
   PROFİL
========================================================= */

function renderProfilePage() {
  const mainContent = $("mainContent");

  const name =
    currentUser?.name ||
    currentUser?.fullName ||
    "Eren";

  const email =
    currentUser?.email ||
    "E-posta bilgisi yok";

  mainContent.innerHTML = `
    <div class="card">

      <div style="
        text-align:center;
        max-width:600px;
        margin:auto;
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
          ${state.pet.emoji || "🎓"}
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

        <div class="stats">

          <div class="stat">
            <strong>
              ${state.level}
            </strong>
            <small>
              Seviye
            </small>
          </div>

          <div class="stat">
            <strong>
              ${state.xp}
            </strong>
            <small>
              XP
            </small>
          </div>

          <div class="stat">
            <strong>
              ${state.coins}
            </strong>
            <small>
              Coin
            </small>
          </div>

        </div>

        <div style="
          display:flex;
          gap:10px;
          justify-content:center;
          flex-wrap:wrap;
          margin-top:25px;
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
   GÜNLÜK ÖDÜL
========================================================= */

function claimDailyReward() {
  const today =
    new Date().toISOString().slice(0, 10);

  const lastClaim =
    localStorage.getItem(
      "dersTakipDailyReward"
    );

  if (lastClaim === today) {
    showToast(
      "Bugünkü ödülünü zaten aldın. 🎁"
    );
    return;
  }

  const rewardXP = 50;
  const rewardCoins = 20;

  state.xp += rewardXP;
  state.coins += rewardCoins;

  calculateLevel();

  localStorage.setItem(
    "dersTakipDailyReward",
    today
  );

  state.dailyRewardClaimed = true;

  saveLocalState();

  showCelebration(
    `🎁 +${rewardXP} XP   🪙 +${rewardCoins} Coin`
  );

  updateGlobalStats();
}

window.claimDailyReward = claimDailyReward;

/* =========================================================
   SERİ
========================================================= */

function updateStreak() {
  const today =
    new Date().toISOString().slice(0, 10);

  const lastStudy =
    localStorage.getItem(
      "dersTakipLastStudy"
    );

  if (lastStudy === today) {
    return;
  }

  if (lastStudy) {
    const previous =
      new Date(lastStudy);

    const current =
      new Date(today);

    const difference =
      Math.floor(
        (current - previous) /
        86400000
      );

    if (difference === 1) {
      state.streak++;
    } else if (difference > 1) {
      state.streak = 1;
    }
  } else {
    state.streak = 1;
  }

  localStorage.setItem(
    "dersTakipLastStudy",
    today
  );

  saveLocalState();
}

/* =========================================================
   LEVEL
========================================================= */

function calculateLevel() {
  state.level =
    Math.max(
      1,
      Math.floor(state.xp / 100) + 1
    );

  /*
    Evcil hayvan seviyesi de gelişsin.
  */
  state.pet.level =
    Math.max(
      1,
      Math.floor(state.xp / 200) + 1
    );
}

/* =========================================================
   GLOBAL STATS
========================================================= */

function updateGlobalStats() {
  if ($("statXP")) {
    $("statXP").textContent =
      state.xp;
  }

  if ($("statStreak")) {
    $("statStreak").textContent =
      state.streak;
  }

  if ($("statCoins")) {
    $("statCoins").textContent =
      state.coins;
  }

  if ($("streakNumber")) {
    $("streakNumber").textContent =
      state.streak;
  }

  if ($("levelText")) {
    $("levelText").textContent =
      `Seviye ${state.level}`;
  }

  if ($("xpText")) {
    $("xpText").textContent =
      `${state.xp} XP`;
  }

  if ($("progressBar")) {
    $("progressBar").style.width =
      calculateProgress() + "%";
  }

  if ($("taskSummary")) {
    const remaining =
      getIncompleteTasks().length;

    $("taskSummary").textContent =
      remaining
        ? `${remaining} görevin seni bekliyor.`
        : "Bugünkü tüm görevlerini tamamladın! 🎉";
  }
}

/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {
  state.darkMode =
    !state.darkMode;

  document.body.classList.toggle(
    "dark",
    state.darkMode
  );

  saveLocalState();

  showToast(
    state.darkMode
      ? "Karanlık tema açıldı 🌙"
      : "Aydınlık tema açıldı ☀️"
  );
}

window.toggleDarkMode = toggleDarkMode;

/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {
  const drawer =
    $("mobileDrawer");

  if (!drawer) return;

  drawer.classList.toggle("open");
}

window.toggleMobileMenu = toggleMobileMenu;

/* =========================================================
   BAŞLANGIÇ
========================================================= */

async function boot() {
  loadLocalState();

  /*
    Tema
  */
  document.body.classList.toggle(
    "dark",
    state.darkMode
  );

  /*
    Daha önce giriş yapan kullanıcı
  */
  try {
    const savedUser =
      localStorage.getItem(
        "dersTakipUser"
      );

    if (savedUser) {
      currentUser =
        JSON.parse(savedUser);

      await initializeApp();

      return;
    }
  } catch (error) {
    console.log("Kullanıcı verisi okunamadı.");
  }

  /*
    Giriş ekranı
  */
  $("authScreen").style.display = "flex";
  $("app").style.display = "none";
}

/* =========================================================
   ESC → MODAL KAPAT
========================================================= */

document.addEventListener(
  "keydown",
  event => {
    if (event.key === "Escape") {
      closeModal();
    }
  }
);

/* =========================================================
   SAYFA YÜKLENİNCE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    boot();
  }
);
