"use strict";

/* =========================================================
   DERS TAKİP - APP.JS
   HTML ile birebir uyumlu
========================================================= */

const API_BASE = "/api";

let state = {
  user: null,
  tasks: [],
  subjects: [],
  exams: [],
  xp: 0,
  coins: 0,
  streak: 0,
  completedTasks: 0,
  focusMinutes: 0,
  pet: {
    name: "Panda",
    level: 1,
    icon: "🐼"
  },
  claimedReward: false,
  darkMode: false
};

let timerSeconds = 25 * 60;
let timerInterval = null;


/* =========================================================
   SAFE API
========================================================= */

async function apiRequest(url, options = {}) {

  try {

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const text = await response.text();

    let data;

    try {
      data = text ? JSON.parse(text) : {};
    } catch (error) {

      console.error("API JSON hatası:", text);

      throw new Error(
        "Sunucu JSON yerine farklı bir cevap gönderdi. API adresini kontrol et."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        "Sunucu hatası oluştu."
      );
    }

    return data;

  } catch (error) {

    console.error(error);

    throw error;
  }
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveState() {

  localStorage.setItem(
    "dersTakipState",
    JSON.stringify(state)
  );
}


function loadState() {

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
      }
    };

  } catch (error) {

    console.error(
      "LocalStorage okunamadı:",
      error
    );

  }

}


/* =========================================================
   AUTH
========================================================= */

function showLogin() {

  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";

  document
    .getElementById("loginTab")
    .classList.add("active");

  document
    .getElementById("registerTab")
    .classList.remove("active");

  setAuthMessage("");

}


function showRegister() {

  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";

  document
    .getElementById("loginTab")
    .classList.remove("active");

  document
    .getElementById("registerTab")
    .classList.add("active");

  setAuthMessage("");

}


function setAuthMessage(message, success = false) {

  const el =
    document.getElementById("authMessage");

  if (!el) return;

  el.textContent = message;

  el.style.color =
    success ? "#20a67a" : "#e05263";
}


function togglePassword(id, button) {

  const input =
    document.getElementById(id);

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

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  if (!email || !password) return;

  setAuthMessage("Giriş yapılıyor...", true);

  /*
   * API mevcutsa kullan.
   * API yoksa demo/local girişine devam eder.
   */

  try {

    const result = await apiRequest(
      `${API_BASE}/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    if (result.user) {

      state.user = result.user;

    } else {

      state.user = {
        name: result.name || email.split("@")[0],
        email
      };

    }

  } catch (error) {

    /*
     * Eğer API route bulunmuyorsa
     * uygulamanın tamamının çalışmasını engellemiyoruz.
     */

    state.user = {
      name:
        email.split("@")[0] || "Öğrenci",
      email
    };

  }

  saveState();

  openApp();

}


async function register(event) {

  event.preventDefault();

  const name =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;

  if (!name || !email || password.length < 6) {

    setAuthMessage(
      "Bilgileri doğru doldur."
    );

    return;
  }

  setAuthMessage(
    "Hesap oluşturuluyor...",
    true
  );

  try {

    const result = await apiRequest(
      `${API_BASE}/register`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    state.user =
      result.user || {
        name,
        email
      };

  } catch (error) {

    /*
     * Backend hazır değilse
     * local hesap oluştur.
     */

    state.user = {
      name,
      email
    };

  }

  saveState();

  openApp();

}


function logout() {

  state.user = null;

  localStorage.removeItem(
    "dersTakipLoggedIn"
  );

  document.getElementById("app").style.display = "none";
  document.getElementById("authScreen").style.display = "flex";

  showLogin();

}


function openApp() {

  localStorage.setItem(
    "dersTakipLoggedIn",
    "1"
  );

  document.getElementById("authScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  updateAll();

  navigate("home");

}


/* =========================================================
   NAVIGATION
========================================================= */

const pageNames = {

  home: {
    title: "Merhaba! 👋",
    subtitle: "Bugün küçük bir adım, yarın büyük bir başarı."
  },

  tasks: {
    title: "Görevler ✅",
    subtitle: "Bugünkü çalışmalarını yönet."
  },

  subjects: {
    title: "Dersler 📚",
    subtitle: "Derslerini düzenle ve takip et."
  },

  exams: {
    title: "Sınavlar 📅",
    subtitle: "Yaklaşan sınavlarını takip et."
  },

  focus: {
    title: "Odaklan ⏱️",
    subtitle: "Dikkatini topla ve çalışmaya başla."
  },

  coach: {
    title: "Ders Koçu 🤖",
    subtitle: "Bugünkü çalışma önerini al."
  },

  pet: {
    title: "Evcil Hayvan 🐣",
    subtitle: "Çalıştıkça Panda'nı geliştir."
  },

  market: {
    title: "Market 🛒",
    subtitle: "Coinlerini ödüller için kullan."
  },

  achievements: {
    title: "Rozetler 🏆",
    subtitle: "Başarılarını ve kilitlerini takip et."
  },

  stats: {
    title: "İstatistikler 📊",
    subtitle: "Çalışma performansını incele."
  },

  profile: {
    title: "Profil 👤",
    subtitle: "Hesabını ve ayarlarını yönet."
  }

};


function navigate(page, clickedButton = null) {

  document
    .querySelectorAll(".page")
    .forEach(el => {
      el.classList.remove("active");
    });

  const target =
    document.getElementById(
      `page-${page}`
    );

  if (target) {
    target.classList.add("active");
  }

  document
    .querySelectorAll(".menu button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  if (clickedButton) {

    clickedButton.classList.add("active");

  } else {

    const buttons =
      document.querySelectorAll(".menu button");

    buttons.forEach(btn => {

      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick").includes(
          `'${page}'`
        )
      ) {

        btn.classList.add("active");

      }

    });

  }

  const info =
    pageNames[page] ||
    pageNames.home;

  const welcome =
    document.getElementById("welcomeText");

  const subtitle =
    document.getElementById("sectionSubtitle");

  if (welcome) {
    welcome.textContent = info.title;
  }

  if (subtitle) {
    subtitle.textContent = info.subtitle;
  }

  renderPage(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function navigateMobile(page) {

  navigate(page);

  document
    .getElementById("mobileDrawer")
    .classList.remove("open");

  document
    .querySelectorAll(".mobile-menu-item")
    .forEach(btn => {

      btn.classList.remove("active");

      const onclick =
        btn.getAttribute("onclick") || "";

      if (onclick.includes(`'${page}'`)) {
        btn.classList.add("active");
      }

    });

}


function toggleMobileMenu() {

  document
    .getElementById("mobileDrawer")
    .classList.toggle("open");

}


function renderPage(page) {

  switch (page) {

    case "home":
      renderHome();
      break;

    case "tasks":
      renderTasks();
      break;

    case "subjects":
      renderSubjects();
      break;

    case "exams":
      renderExams();
      break;

    case "coach":
      newCoachAdvice(false);
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

  }

}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

  const total =
    state.tasks.length;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  const percent =
    total === 0
      ? 0
      : Math.round(
          completed / total * 100
        );

  const summary =
    document.getElementById("homeSummary");

  if (summary) {

    summary.textContent =
      total === 0
        ? "Bugün için henüz görev eklemedin. Görevler bölümünden başlayabilirsin."
        : `${completed} / ${total} görev tamamlandı.`;

  }

  const progress =
    document.getElementById(
      "homeProgress"
    );

  if (progress) {
    progress.style.width =
      `${percent}%`;
  }

  const info =
    document.getElementById(
      "homeTaskInfo"
    );

  if (info) {

    info.textContent =
      total === 0
        ? "Henüz görev yok."
        : `${completed} tamamlandı, ${total - completed} kaldı.`;

  }

}


/* =========================================================
   TASKS
========================================================= */

function renderTasks() {

  const list =
    document.getElementById(
      "taskList"
    );

  const counter =
    document.getElementById(
      "taskCounter"
    );

  if (!list) return;

  const completed =
    state.tasks.filter(
      task => task.completed
    ).length;

  if (counter) {

    counter.textContent =
      `${completed} / ${state.tasks.length}`;

  }

  if (!state.tasks.length) {

    list.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📝</div>
        <strong>Henüz görev yok</strong>
        <p>İlk görevini aşağıdan ekle.</p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    state.tasks
      .map((task,index) => `

        <div class="task ${task.completed ? "completed" : ""}">

          <button
            class="checkbox"
            onclick="toggleTask(${index})"
          >
            ${task.completed ? "✓" : ""}
          </button>

          <div class="task-content">

            <div class="task-name">
              ${escapeHTML(task.name)}
            </div>

          </div>

          <span class="task-xp">
            +${task.xp} XP
          </span>

          <button
            class="delete-task"
            onclick="deleteTask(${index})"
          >
            🗑️
          </button>

        </div>

      `)
      .join("");

}


function addTask() {

  const input =
    document.getElementById(
      "newTask"
    );

  if (!input) return;

  const name =
    input.value.trim();

  if (!name) {

    toast("Önce görev adını yaz.");

    return;
  }

  state.tasks.push({
    id: Date.now(),
    name,
    completed: false,
    xp: 50
  });

  input.value = "";

  saveState();

  renderTasks();
  renderHome();

  toast("Görev eklendi ✅");

}


function toggleTask(index) {

  const task =
    state.tasks[index];

  if (!task) return;

  task.completed =
    !task.completed;

  if (task.completed) {

    state.xp += task.xp;
    state.coins += 10;
    state.completedTasks++;

    showCelebration(
      `⭐ +${task.xp} XP<br>🪙 +10 Coin`
    );

  } else {

    state.xp =
      Math.max(
        0,
        state.xp - task.xp
      );

    state.coins =
      Math.max(
        0,
        state.coins - 10
      );

    state.completedTasks =
      Math.max(
        0,
        state.completedTasks - 1
      );

  }

  updateLevel();

  saveState();

  renderTasks();
  renderHome();
  renderStats();

}


function deleteTask(index) {

  if (!state.tasks[index]) return;

  state.tasks.splice(index,1);

  saveState();

  renderTasks();
  renderHome();

  toast("Görev silindi.");

}


/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjects() {

  const container =
    document.getElementById(
      "subjectList"
    );

  if (!container) return;

  if (!state.subjects.length) {

    container.innerHTML = `
      <div class="card empty">
        <div class="empty-icon">📚</div>
        <strong>Henüz ders eklenmedi.</strong>
        <p>Yukarıdan ilk dersini ekle.</p>
      </div>
    `;

    return;
  }

  container.innerHTML =
    state.subjects
      .map((subject,index) => `

        <div class="subject">

          <div class="subject-icon">
            ${subject.icon || "📚"}
          </div>

          <h3>
            ${escapeHTML(subject.name)}
          </h3>

          <p class="muted">
            Çalışmaya hazır.
          </p>

          <button
            class="danger-btn"
            style="margin-top:15px"
            onclick="deleteSubject(${index})"
          >
            Sil
          </button>

        </div>

      `)
      .join("");

}


function addSubject() {

  const input =
    document.getElementById(
      "subjectInput"
    );

  const name =
    input.value.trim();

  if (!name) {

    toast("Ders adı yaz.");

    return;
  }

  state.subjects.push({
    name,
    icon: getSubjectIcon(name)
  });

  input.value = "";

  saveState();

  renderSubjects();
  renderStats();

  toast("Ders eklendi 📚");

}


function deleteSubject(index) {

  state.subjects.splice(index,1);

  saveState();

  renderSubjects();
  renderStats();

}


/* =========================================================
   EXAMS
========================================================= */

function renderExams() {

  const container =
    document.getElementById(
      "examList"
    );

  if (!container) return;

  if (!state.exams.length) {

    container.innerHTML = `
      <div class="card empty">
        <div class="empty-icon">📅</div>
        <strong>Henüz sınav eklenmedi.</strong>
        <p>Yukarıdan sınav ekleyebilirsin.</p>
      </div>
    `;

    return;
  }

  const sorted =
    [...state.exams].sort(
      (a,b) =>
        new Date(a.date) -
        new Date(b.date)
    );

  container.innerHTML =
    sorted
      .map((exam) => {

        const date =
          new Date(exam.date);

        const diff =
          Math.ceil(
            (
              date -
              new Date()
            ) /
            86400000
          );

        let text =
          "Bugün";

        if (diff > 0) {
          text = `${diff} gün kaldı`;
        }

        if (diff < 0) {
          text = "Geçti";
        }

        return `

          <div class="exam">

            <div class="exam-icon">
              📅
            </div>

            <h3>
              ${escapeHTML(exam.name)}
            </h3>

            <p class="muted">
              ${formatDate(exam.date)}
            </p>

            <strong
              style="
                display:block;
                margin-top:12px;
                color:var(--primary)
              "
            >
              ${text}
            </strong>

            <button
              class="danger-btn"
              style="margin-top:15px"
              onclick="deleteExam('${exam.id}')"
            >
              Sil
            </button>

          </div>

        `;

      })
      .join("");

}


function addExam() {

  const name =
    document.getElementById(
      "examName"
    ).value.trim();

  const date =
    document.getElementById(
      "examDate"
    ).value;

  if (!name || !date) {

    toast("Sınav adı ve tarih gerekli.");

    return;
  }

  state.exams.push({
    id: String(Date.now()),
    name,
    date
  });

  document.getElementById(
    "examName"
  ).value = "";

  document.getElementById(
    "examDate"
  ).value = "";

  saveState();

  renderExams();

  toast("Sınav eklendi 📅");

}


function deleteExam(id) {

  state.exams =
    state.exams.filter(
      exam => String(exam.id) !== String(id)
    );

  saveState();

  renderExams();

}


/* =========================================================
   FOCUS TIMER
========================================================= */

function updateTimerDisplay() {

  const timer =
    document.getElementById(
      "timer"
    );

  if (!timer) return;

  const minutes =
    Math.floor(
      timerSeconds / 60
    );

  const seconds =
    timerSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


function startTimer() {

  if (timerInterval) return;

  timerInterval =
    setInterval(() => {

      if (timerSeconds <= 0) {

        clearInterval(timerInterval);
        timerInterval = null;

        state.focusMinutes += 25;

        state.xp += 25;
        state.coins += 5;

        saveState();

        updateAll();

        showCelebration(
          "⏱️ Odaklanma tamamlandı!<br>⭐ +25 XP<br>🪙 +5 Coin"
        );

        timerSeconds =
          25 * 60;

        updateTimerDisplay();

        return;
      }

      timerSeconds--;

      updateTimerDisplay();

    },1000);

}


function pauseTimer() {

  clearInterval(timerInterval);

  timerInterval = null;

}


function resetTimer() {

  pauseTimer();

  timerSeconds =
    25 * 60;

  updateTimerDisplay();

}


/* =========================================================
   COACH
========================================================= */

const coachAdvice = [

  "25 dakika boyunca sadece bir derse odaklan. Sonra 5 dakika mola ver.",

  "Bugün en zor dersinden başlamak motivasyonunu artırabilir.",

  "Telefonunu çalışma sırasında uzağa koy ve bildirimlerini kapat.",

  "Küçük hedefler belirle. Bir görevi tamamlamak bile ilerlemedir.",

  "Çalışırken anlamadığın konuları not al ve daha sonra tekrar et.",

  "Bugün 30 dakika bile çalışsan dünkü halinden daha ileridesin.",

  "Sınavın yaklaşıyorsa konuları küçük parçalara bölerek çalış."

];


function newCoachAdvice(showToast = true) {

  const el =
    document.getElementById(
      "coachMessage"
    );

  if (!el) return;

  const advice =
    coachAdvice[
      Math.floor(
        Math.random() *
        coachAdvice.length
      )
    ];

  el.textContent = advice;

  if (showToast) {
    toast("Yeni öneri geldi 🤖");
  }

}


/* =========================================================
   PET
========================================================= */

function renderPet() {

  const name =
    document.getElementById(
      "petName"
    );

  const level =
    document.getElementById(
      "petLevel"
    );

  if (name) {
    name.textContent =
      state.pet.name;
  }

  if (level) {
    level.textContent =
      `Seviye ${state.pet.level}`;
  }

}


function feedPet() {

  if (state.coins < 5) {

    toast(
      "Panda'yı beslemek için 5 coin gerekiyor."
    );

    return;
  }

  state.coins -= 5;

  if (
    Math.random() > .5
  ) {

    state.pet.level++;

    toast(
      "🐼 Panda seviye atladı!"
    );

  } else {

    toast(
      "🍎 Panda mutlu oldu!"
    );

  }

  saveState();

  renderPet();
  renderStats();
  updateLevel();

}


/* =========================================================
   MARKET
========================================================= */

const marketItems = [

  {
    icon:"🍕",
    name:"Pizza",
    description:"Panda için lezzetli ödül.",
    price:20
  },

  {
    icon:"🎮",
    name:"Oyun Saati",
    description:"Kendine küçük bir mola.",
    price:50
  },

  {
    icon:"⭐",
    name:"Yıldız Rozeti",
    description:"Profilini süsle.",
    price:75
  },

  {
    icon:"🎁",
    name:"Sürpriz Kutu",
    description:"İçinden ne çıkacak?",
    price:100
  },

  {
    icon:"👑",
    name:"Altın Taç",
    description:"Başarının sembolü.",
    price:150
  }

];


function renderMarket() {

  const container =
    document.getElementById(
      "marketList"
    );

  if (!container) return;

  container.innerHTML =
    marketItems
      .map(
        (item,index) => `

          <div class="shop-item">

            <div class="shop-icon">
              ${item.icon}
            </div>

            <h3>
              ${item.name}
            </h3>

            <p class="muted">
              ${item.description}
            </p>

            <div
              style="
                font-weight:900;
                color:#d79a00;
                margin:10px 0
              "
            >
              🪙 ${item.price}
            </div>

            <button
              class="primary-btn"
              onclick="buyItem(${index})"
            >
              Satın Al
            </button>

          </div>

        `
      )
      .join("");

}


function buyItem(index) {

  const item =
    marketItems[index];

  if (!item) return;

  if (state.coins < item.price) {

    toast("Yeterli coin yok 🪙");

    return;
  }

  state.coins -= item.price;

  saveState();

  renderMarket();
  renderStats();

  toast(
    `${item.name} satın alındı! 🎉`
  );

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function renderAchievements() {

  const container =
    document.getElementById(
      "badgeList"
    );

  if (!container) return;

  const badges = [

    {
      icon:"🌱",
      title:"İlk Adım",
      description:"İlk görevini tamamla.",
      unlocked:
        state.completedTasks >= 1
    },

    {
      icon:"🔥",
      title:"Ateş Başladı",
      description:"5 görev tamamla.",
      unlocked:
        state.completedTasks >= 5
    },

    {
      icon:"⭐",
      title:"Yıldız Öğrenci",
      description:"500 XP kazan.",
      unlocked:
        state.xp >= 500
    },

    {
      icon:"📚",
      title:"Kitap Kurdu",
      description:"3 ders ekle.",
      unlocked:
        state.subjects.length >= 3
    },

    {
      icon:"⏱️",
      title:"Odak Ustası",
      description:"60 dakika odaklan.",
      unlocked:
        state.focusMinutes >= 60
    },

    {
      icon:"👑",
      title:"Usta Öğrenci",
      description:"1000 XP kazan.",
      unlocked:
        state.xp >= 1000
    }

  ];

  container.innerHTML =
    badges
      .map(
        badge => `

          <div
            class="badge-item"
            style="
              opacity:${badge.unlocked ? 1 : .45};
              filter:${badge.unlocked ? "none" : "grayscale(1)"}
            "
          >

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <h3>
              ${badge.title}
            </h3>

            <p class="muted">
              ${badge.description}
            </p>

            <strong
              style="
                display:block;
                margin-top:10px
              "
            >
              ${
                badge.unlocked
                  ? "🔓 Açıldı"
                  : "🔒 Kilitli"
              }
            </strong>

          </div>

        `
      )
      .join("");

}


/* =========================================================
   STATS
========================================================= */

function renderStats() {

  const values = {

    statXP:
      state.xp,

    statStreak:
      state.streak,

    statCoins:
      state.coins,

    statCompleted:
      state.completedTasks,

    statSubjects:
      state.subjects.length,

    statFocus:
      state.focusMinutes

  };

  Object.entries(values)
    .forEach(([id,value]) => {

      const el =
        document.getElementById(id);

      if (el) {
        el.textContent = value;
      }

    });

}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

  const user =
    state.user || {};

  const name =
    document.getElementById(
      "profileName"
    );

  const email =
    document.getElementById(
      "profileEmail"
    );

  const level =
    document.getElementById(
      "profileLevel"
    );

  if (name) {
    name.textContent =
      user.name || "Öğrenci";
  }

  if (email) {
    email.textContent =
      user.email || "-";
  }

  if (level) {
    level.textContent =
      getLevel();
  }

}


/* =========================================================
   LEVEL
========================================================= */

function getLevel() {

  return Math.max(
    1,
    Math.floor(
      state.xp / 250
    ) + 1
  );

}


function updateLevel() {

  const level =
    getLevel();

  const levelText =
    document.getElementById(
      "levelText"
    );

  if (levelText) {

    levelText.textContent =
      `Seviye ${level}`;

  }

  renderProfile();

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

  saveState();

  toast(
    state.darkMode
      ? "Karanlık mod açıldı 🌙"
      : "Karanlık mod kapatıldı ☀️"
  );

}


/* =========================================================
   RESET
========================================================= */

function resetData() {

  const yes =
    confirm(
      "Tüm yerel DersTakip verilerini silmek istediğine emin misin?"
    );

  if (!yes) return;

  const currentUser =
    state.user;

  state = {

    user: currentUser,

    tasks: [],
    subjects: [],
    exams: [],

    xp: 0,
    coins: 0,
    streak: 0,
    completedTasks: 0,
    focusMinutes: 0,

    pet: {
      name:"Panda",
      level:1,
      icon:"🐼"
    },

    claimedReward:false,
    darkMode:false

  };

  saveState();

  updateAll();

  toast(
    "Veriler sıfırlandı."
  );

}


/* =========================================================
   HELPERS
========================================================= */

function updateAll() {

  loadState();

  document.body.classList.toggle(
    "dark",
    !!state.darkMode
  );

  const welcome =
    document.getElementById(
      "welcomeText"
    );

  if (welcome) {

    welcome.textContent =
      `Merhaba, ${
        state.user?.name ||
        "Öğrenci"
      }! 👋`;

  }

  updateLevel();

  renderHome();
  renderTasks();
  renderSubjects();
  renderExams();
  renderPet();
  renderMarket();
  renderAchievements();
  renderStats();
  renderProfile();

  updateTimerDisplay();

}


function formatDate(date) {

  if (!date) return "-";

  const d =
    new Date(date);

  return d.toLocaleDateString(
    "tr-TR",
    {
      day:"2-digit",
      month:"long",
      year:"numeric"
    }
  );

}


function getSubjectIcon(name) {

  const value =
    name.toLocaleLowerCase(
      "tr-TR"
    );

  if (value.includes("mat")) return "📐";
  if (value.includes("fen")) return "🔬";
  if (value.includes("fiz")) return "⚡";
  if (value.includes("kim")) return "🧪";
  if (value.includes("biy")) return "🧬";
  if (value.includes("türk")) return "📖";
  if (value.includes("ing")) return "🇬🇧";
  if (value.includes("tar")) return "🏛️";
  if (value.includes("coğ")) return "🌍";
  if (value.includes("din")) return "📚";

  return "📚";

}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


function toast(message) {

  const container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) return;

  const item =
    document.createElement("div");

  item.className = "toast";

  item.innerHTML =
    message;

  item.style.cssText = `
    position:fixed;
    right:20px;
    bottom:20px;
    z-index:20000;
    background:#15182b;
    color:white;
    padding:15px 18px;
    border-radius:15px;
    box-shadow:0 15px 35px #0003;
    max-width:350px;
  `;

  container.appendChild(item);

  setTimeout(() => {

    item.remove();

  },3000);

}


function showCelebration(message) {

  const box =
    document.createElement("div");

  box.style.cssText = `
    position:fixed;
    inset:0;
    z-index:30000;
    display:grid;
    place-items:center;
    pointer-events:none;
    background:rgba(0,0,0,.08);
  `;

  box.innerHTML = `

    <div
      style="
        background:white;
        color:#171a2b;
        padding:35px;
        border-radius:28px;
        text-align:center;
        box-shadow:0 30px 100px #0004;
        font-size:18px;
        font-weight:800
      "
    >

      <div
        style="
          font-size:32px;
          color:#6658f5;
          margin-bottom:12px
        "
      >
        ✨ Harika! ✨
      </div>

      ${message}

    </div>

  `;

  document.body.appendChild(box);

  setTimeout(() => {

    box.remove();

  },1800);

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadState();

    const loggedIn =
      localStorage.getItem(
        "dersTakipLoggedIn"
      );

    if (loggedIn && state.user) {

      document.getElementById(
        "authScreen"
      ).style.display = "none";

      document.getElementById(
        "app"
      ).style.display = "block";

      updateAll();

      navigate("home");

    } else {

      document.getElementById(
        "authScreen"
      ).style.display = "flex";

      document.getElementById(
        "app"
      ).style.display = "none";

    }

  }
);
