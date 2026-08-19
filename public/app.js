/* =========================================================
   DERS TAKİP — APP.JS
   Evcil Hayvan + Market + Envanter sistemi
   ========================================================= */

const API_BASE = "/api";

let currentUser = null;
let appData = {
  tasks: [],
  xp: 0,
  coins: 500,
  streak: 0,

  pet: {
    name: "Panda",
    emoji: "🐼",
    level: 1,
    xp: 0,
    happiness: 80,
    energy: 80,
    accessories: {
      hat: "",
      glasses: "",
      bag: "",
      scarf: "",
      crown: ""
    },
    room: []
  },

  inventory: {
    hats: [],
    glasses: [],
    bags: [],
    scarves: [],
    crowns: [],
    food: [],
    room: []
  },

  owned: [],
  equipped: {},

  dailyRewardClaimed: false,
  lastRewardDate: ""
};

let focusInterval = null;
let focusSeconds = 25 * 60;
let currentPage = "home";

/* =========================================================
   MARKET ÜRÜNLERİ
   ========================================================= */

const MARKET_ITEMS = [
  {
    id: "hat_basic",
    name: "Klasik Şapka",
    icon: "🎩",
    price: 100,
    category: "hat",
    description: "Panda için şık bir şapka."
  },
  {
    id: "hat_crown",
    name: "Kraliyet Tacı",
    icon: "👑",
    price: 500,
    category: "crown",
    description: "Panda artık kraliyet üyesi."
  },
  {
    id: "glasses",
    name: "Havalı Gözlük",
    icon: "🕶️",
    price: 150,
    category: "glasses",
    description: "Panda'nın tarzını değiştir."
  },
  {
    id: "bag",
    name: "Mini Çanta",
    icon: "🎒",
    price: 200,
    category: "bag",
    description: "Panda'nın yeni çantası."
  },
  {
    id: "scarf",
    name: "Renkli Atkı",
    icon: "🧣",
    price: 175,
    category: "scarf",
    description: "Soğuk günler için sıcak bir aksesuar."
  },
  {
    id: "apple",
    name: "Elma",
    icon: "🍎",
    price: 30,
    category: "food",
    description: "Panda'nın enerjisini artırır."
  },
  {
    id: "cookie",
    name: "Kurabiye",
    icon: "🍪",
    price: 50,
    category: "food",
    description: "Panda'nın mutluluğunu artırır."
  },
  {
    id: "cake",
    name: "Pasta",
    icon: "🍰",
    price: 100,
    category: "food",
    description: "Panda için özel bir ödül."
  },
  {
    id: "bed",
    name: "Panda Yatağı",
    icon: "🛏️",
    price: 350,
    category: "room",
    description: "Panda'nın odasına yeni eşya."
  },
  {
    id: "plant",
    name: "Oda Bitkisi",
    icon: "🪴",
    price: 250,
    category: "room",
    description: "Panda'nın odasını güzelleştirir."
  }
];

/* =========================================================
   BAŞLANGIÇ
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadLocalData();
  updateUI();
  setupEscapeKey();
});

function setupEscapeKey() {
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function saveLocalData() {
  try {
    localStorage.setItem(
      "dersTakipData",
      JSON.stringify(appData)
    );
  } catch (error) {
    console.error("Kayıt hatası:", error);
  }
}

function loadLocalData() {
  try {
    const saved = localStorage.getItem("dersTakipData");

    if (saved) {
      const parsed = JSON.parse(saved);

      appData = {
        ...appData,
        ...parsed,
        pet: {
          ...appData.pet,
          ...(parsed.pet || {}),
          accessories: {
            ...appData.pet.accessories,
            ...(parsed.pet?.accessories || {})
          }
        },
        inventory: {
          ...appData.inventory,
          ...(parsed.inventory || {})
        }
      };
    }

    const savedUser = localStorage.getItem("dersTakipUser");

    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }

    updateAuthVisibility();

  } catch (error) {
    console.error("Veri okunamadı:", error);
  }
}

/* =========================================================
   AUTH
   ========================================================= */

function updateAuthVisibility() {
  const auth = document.getElementById("authScreen");
  const app = document.getElementById("app");

  if (!auth || !app) return;

  if (currentUser) {
    auth.style.display = "none";
    app.style.display = "block";
  } else {
    auth.style.display = "flex";
    app.style.display = "none";
  }
}

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

function setAuthMessage(message, success = false) {
  const el = document.getElementById("authMessage");
  if (!el) return;

  el.textContent = message;
  el.style.color = success ? "#20c997" : "#ff5b6e";
}

function register(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) return;

  const users = JSON.parse(
    localStorage.getItem("dersTakipUsers") || "[]"
  );

  if (users.some(u => u.email === email)) {
    setAuthMessage("Bu e-posta zaten kayıtlı.");
    return;
  }

  users.push({
    name,
    email,
    password
  });

  localStorage.setItem(
    "dersTakipUsers",
    JSON.stringify(users)
  );

  setAuthMessage(
    "Hesabın oluşturuldu. Şimdi giriş yapabilirsin.",
    true
  );

  showLogin();

  document.getElementById("loginEmail").value = email;
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(
    localStorage.getItem("dersTakipUsers") || "[]"
  );

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    setAuthMessage("E-posta veya şifre yanlış.");
    return;
  }

  currentUser = user;

  localStorage.setItem(
    "dersTakipUser",
    JSON.stringify(user)
  );

  updateAuthVisibility();
  updateUI();

  showToast(`Hoş geldin ${user.name}! 👋`);
}

function logout() {
  currentUser = null;

  localStorage.removeItem("dersTakipUser");

  updateAuthVisibility();

  showLogin();
}

/* =========================================================
   ŞİFRE
   ========================================================= */

function togglePassword(id, button) {
  const input = document.getElementById(id);

  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁️";
  }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigate(page, button) {
  currentPage = page;

  document.querySelectorAll(".menu button").forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  document.querySelectorAll(".mobile-menu-item").forEach(btn => {
    btn.classList.remove("active");
  });

  const mobileButtons = document.querySelectorAll(
    ".mobile-menu-item"
  );

  mobileButtons.forEach(btn => {
    if (btn.getAttribute("onclick")?.includes(`'${page}'`)) {
      btn.classList.add("active");
    }
  });

  renderPage(page);
}

function navigateMobile(page) {
  currentPage = page;

  renderPage(page);

  const drawer = document.getElementById("mobileDrawer");

  if (drawer) {
    drawer.classList.remove("open");
  }
}

function renderPage(page) {
  const dynamic = document.getElementById("dynamicSection");
  const tasks = document.getElementById("tasksSection");
  const coach = document.querySelector(".coach");
  const stats = document.querySelector(".stats");
  const hero = document.getElementById("homeHero");

  if (!dynamic) return;

  dynamic.style.display = "none";
  dynamic.innerHTML = "";

  if (tasks) tasks.style.display = "none";
  if (coach) coach.style.display = "none";
  if (stats) stats.style.display = "none";
  if (hero) hero.style.display = "none";

  setSectionText(page);

  switch (page) {

    case "home":
      if (tasks) tasks.style.display = "block";
      if (coach) coach.style.display = "block";
      if (stats) stats.style.display = "grid";
      if (hero) hero.style.display = "block";
      break;

    case "tasks":
      if (tasks) tasks.style.display = "block";
      break;

    case "pet":
      renderPetPage(dynamic);
      break;

    case "market":
      renderMarketPage(dynamic);
      break;

    case "achievements":
      renderAchievements(dynamic);
      break;

    case "stats":
      renderStats(dynamic);
      break;

    case "focus":
      renderFocus(dynamic);
      break;

    case "coach":
      renderCoachPage(dynamic);
      break;

    case "subjects":
      renderSubjects(dynamic);
      break;

    case "exams":
      renderExams(dynamic);
      break;

    case "profile":
      renderProfile(dynamic);
      break;

    default:
      if (tasks) tasks.style.display = "block";
  }
}

/* =========================================================
   SAYFA BAŞLIKLARI
   ========================================================= */

function setSectionText(page) {
  const subtitle = document.getElementById("sectionSubtitle");

  if (!subtitle) return;

  const texts = {
    home: "Bugün küçük bir adım, yarın büyük bir başarı.",
    tasks: "Bugünkü çalışmalarını düzenle.",
    subjects: "Derslerini ve çalışma planını yönet.",
    exams: "Sınavlarını takip et.",
    focus: "Dikkatini topla ve çalışmaya başla.",
    coach: "Ders çalışma yolculuğunda yanında.",
    pet: "Evcil hayvanını geliştir ve mutlu et.",
    market: "Kazandığın coinleri harca.",
    achievements: "Başarılarını ve rozetlerini keşfet.",
    stats: "Çalışma performansını incele.",
    profile: "Hesabını ve tercihlerini yönet."
  };

  subtitle.textContent =
    texts[page] || texts.home;
}

/* =========================================================
   GENEL UI
   ========================================================= */

function updateUI() {
  updateAuthVisibility();

  if (!currentUser) return;

  const welcome = document.getElementById("welcomeText");

  if (welcome) {
    welcome.textContent =
      `Merhaba, ${currentUser.name || "Öğrenci"}! 👋`;
  }

  updateStats();
  updatePetDisplay();
  updateTaskUI();

  if (currentPage !== "home") {
    renderPage(currentPage);
  }
}

function updateStats() {
  const statXP = document.getElementById("statXP");
  const statCoins = document.getElementById("statCoins");
  const statStreak = document.getElementById("statStreak");

  if (statXP) statXP.textContent = appData.xp;
  if (statCoins) statCoins.textContent = appData.coins;
  if (statStreak) statStreak.textContent = appData.streak;

  const level =
    Math.floor(appData.xp / 500) + 1;

  const levelText =
    document.getElementById("levelText");

  if (levelText) {
    levelText.textContent =
      `Seviye ${level}`;
  }

  const xpText =
    document.getElementById("xpText");

  if (xpText) {
    xpText.textContent =
      `${appData.xp} XP`;
  }

  const streak =
    document.getElementById("streakNumber");

  if (streak) {
    streak.textContent = appData.streak;
  }
}

/* =========================================================
   GÖREVLER
   ========================================================= */

function addTask() {
  const input = document.getElementById("newTask");

  if (!input) return;

  const name = input.value.trim();

  if (!name) return;

  appData.tasks.push({
    id: Date.now(),
    name,
    completed: false,
    xp: 50
  });

  input.value = "";

  saveLocalData();
  updateTaskUI();
  updateStats();

  showToast("Yeni görev eklendi! ✅");
}

function toggleTask(id) {
  const task = appData.tasks.find(
    t => t.id === id
  );

  if (!task) return;

  task.completed = !task.completed;

  if (task.completed) {
    appData.xp += task.xp;
    appData.coins += 25;

    appData.pet.xp += 20;
    appData.pet.happiness =
      Math.min(100, appData.pet.happiness + 5);

    checkPetLevel();

    celebrate(`⭐ +${task.xp} XP • 🪙 +25 Coin`);
  } else {
    appData.xp =
      Math.max(0, appData.xp - task.xp);

    appData.coins =
      Math.max(0, appData.coins - 25);
  }

  saveLocalData();
  updateTaskUI();
  updateStats();
  updatePetDisplay();
}

function deleteTask(id) {
  appData.tasks =
    appData.tasks.filter(t => t.id !== id);

  saveLocalData();
  updateTaskUI();
}

function updateTaskUI() {
  const list =
    document.getElementById("taskList");

  const counter =
    document.getElementById("taskCounter");

  const summary =
    document.getElementById("taskSummary");

  const progress =
    document.getElementById("progressBar");

  if (!list) return;

  const total = appData.tasks.length;

  const completed =
    appData.tasks.filter(t => t.completed).length;

  if (counter) {
    counter.textContent =
      `${completed} / ${total}`;
  }

  if (summary) {
    summary.textContent =
      total === 0
        ? "Bugün için henüz görev eklemedin."
        : `${completed}/${total} görev tamamlandı.`;
  }

  if (progress) {
    progress.style.width =
      total === 0
        ? "0%"
        : `${(completed / total) * 100}%`;
  }

  if (total === 0) {
    list.innerHTML = `
      <div style="
        padding:30px 10px;
        text-align:center;
        color:var(--muted);
      ">
        Henüz görev yok. İlk görevini ekle! 🚀
      </div>
    `;

    return;
  }

  list.innerHTML =
    appData.tasks.map(task => `
      <div class="task ${task.completed ? "completed" : ""}">
        <button
          class="checkbox"
          onclick="toggleTask(${task.id})"
        >
          ${task.completed ? "✓" : ""}
        </button>

        <div class="task-content">
          <div class="task-name">
            ${escapeHTML(task.name)}
          </div>
        </div>

        <div class="task-xp">
          +${task.xp} XP
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

/* =========================================================
   PET SAYFASI
   ========================================================= */

function renderPetPage(container) {
  container.style.display = "block";

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <div>
          <h2>🐣 Evcil Hayvanım</h2>
          <small style="color:var(--muted)">
            Panda'nınla ilgilen
          </small>
        </div>

        <strong>
          Seviye ${appData.pet.level}
        </strong>
      </div>

      <div style="
        display:grid;
        grid-template-columns:minmax(250px,1fr) minmax(250px,1fr);
        gap:25px;
      ">

        <div style="text-align:center">

          <div
            id="bigPetDisplay"
            style="
              min-height:300px;
              border-radius:25px;
              background:
                radial-gradient(circle at 50% 20%,#ffffff80,transparent 30%),
                linear-gradient(135deg,#fff0b8,#ffd7e9);
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:130px;
              position:relative;
              overflow:hidden;
              box-shadow:inset 0 0 40px #ffffff70;
            "
          >
            ${getPetVisual()}
          </div>

          <h2 style="margin-top:15px">
            ${escapeHTML(appData.pet.name)}
          </h2>

          <p style="
            color:var(--muted);
            margin-top:5px;
          ">
            Seviye ${appData.pet.level}
          </p>

          <div style="
            margin-top:15px;
            height:10px;
            background:var(--border);
            border-radius:20px;
            overflow:hidden;
          ">
            <div style="
              height:100%;
              width:${getPetXPPercent()}%;
              background:var(--primary);
            "></div>
          </div>

          <small style="
            display:block;
            margin-top:7px;
            color:var(--muted);
          ">
            ${appData.pet.xp} / 100 Pet XP
          </small>

        </div>

        <div>

          ${petStatHTML(
            "❤️",
            "Mutluluk",
            appData.pet.happiness
          )}

          ${petStatHTML(
            "⚡",
            "Enerji",
            appData.pet.energy
          )}

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:15px;
          ">

            <button
              class="primary-btn"
              onclick="petAction('feed')"
            >
              🍎 Besle
            </button>

            <button
              class="secondary-btn"
              onclick="petAction('play')"
            >
              🎮 Oynat
            </button>

            <button
              class="secondary-btn"
              onclick="petAction('clean')"
            >
              🧼 Temizle
            </button>

            <button
              class="secondary-btn"
              onclick="petAction('sleep')"
            >
              💤 Uyut
            </button>

          </div>

          <div style="
            margin-top:25px;
            padding-top:20px;
            border-top:1px solid var(--border);
          ">

            <h3>🎒 Envanterim</h3>

            <div
              id="petInventory"
              style="margin-top:12px"
            >
              ${renderInventoryHTML()}
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}

function petStatHTML(icon, title, value) {
  return `
    <div style="margin-bottom:15px">

      <div style="
        display:flex;
        justify-content:space-between;
        margin-bottom:7px;
        font-weight:800;
      ">
        <span>${icon} ${title}</span>
        <span>${value}%</span>
      </div>

      <div style="
        height:10px;
        background:var(--border);
        border-radius:20px;
        overflow:hidden;
      ">
        <div style="
          height:100%;
          width:${value}%;
          background:var(--primary);
          transition:width .3s;
        "></div>
      </div>

    </div>
  `;
}

function getPetXPPercent() {
  return Math.min(
    100,
    appData.pet.xp
  );
}

function checkPetLevel() {
  while (appData.pet.xp >= 100) {

    appData.pet.xp -= 100;
    appData.pet.level++;

    appData.pet.happiness = 100;
    appData.pet.energy = 100;

    showToast(
      `🎉 Panda Seviye ${appData.pet.level} oldu!`
    );
  }
}

/* =========================================================
   PET GÖRÜNÜMÜ
   ========================================================= */

function getPetVisual() {
  const p = appData.pet;

  return `
    <div style="
      position:relative;
      width:180px;
      height:210px;
      display:flex;
      align-items:center;
      justify-content:center;
    ">

      <div style="
        font-size:125px;
        position:absolute;
        z-index:1;
      ">
        ${p.emoji}
      </div>

      ${
        p.accessories.hat
          ? `<div style="
              position:absolute;
              top:-5px;
              z-index:3;
              font-size:65px;
            ">${p.accessories.hat}</div>`
          : ""
      }

      ${
        p.accessories.glasses
          ? `<div style="
              position:absolute;
              top:72px;
              z-index:4;
              font-size:40px;
            ">${p.accessories.glasses}</div>`
          : ""
      }

      ${
        p.accessories.bag
          ? `<div style="
              position:absolute;
              right:-12px;
              bottom:42px;
              z-index:3;
              font-size:45px;
            ">${p.accessories.bag}</div>`
          : ""
      }

      ${
        p.accessories.scarf
          ? `<div style="
              position:absolute;
              bottom:55px;
              z-index:4;
              font-size:45px;
            ">${p.accessories.scarf}</div>`
          : ""
      }

      ${
        p.accessories.crown
          ? `<div style="
              position:absolute;
              top:-10px;
              z-index:5;
              font-size:60px;
            ">${p.accessories.crown}</div>`
          : ""
      }

    </div>
  `;
}

function updatePetDisplay() {
  const display =
    document.getElementById("petDisplay");

  const name =
    document.getElementById("petName");

  const level =
    document.getElementById("petLevel");

  if (display) {
    display.innerHTML = getPetVisual();
  }

  if (name) {
    name.textContent =
      appData.pet.name;
  }

  if (level) {
    level.textContent =
      `Seviye ${appData.pet.level}`;
  }

  const big =
    document.getElementById("bigPetDisplay");

  if (big) {
    big.innerHTML = getPetVisual();
  }
}

/* =========================================================
   PET AKSİYONLARI
   ========================================================= */

function petAction(action) {

  if (action === "feed") {

    const food =
      appData.inventory.food || [];

    if (food.length === 0) {
      showToast(
        "🍎 Envanterinde yiyecek yok. Marketten alabilirsin."
      );
      return;
    }

    const itemId = food[0];

    useItem(itemId);

    return;
  }

  if (action === "play") {

    if (appData.pet.energy < 15) {
      showToast("😴 Panda'nın enerjisi çok düşük.");
      return;
    }

    appData.pet.energy =
      Math.max(0, appData.pet.energy - 15);

    appData.pet.happiness =
      Math.min(100, appData.pet.happiness + 15);

    appData.pet.xp += 10;

    checkPetLevel();

    showToast("🎮 Panda seninle oynadı!");

  }

  if (action === "clean") {

    appData.pet.happiness =
      Math.min(100, appData.pet.happiness + 10);

    appData.pet.xp += 5;

    checkPetLevel();

    showToast("🧼 Panda tertemiz oldu!");

  }

  if (action === "sleep") {

    appData.pet.energy = 100;

    appData.pet.happiness =
      Math.min(100, appData.pet.happiness + 5);

    showToast("💤 Panda güzelce dinlendi.");

  }

  saveLocalData();
  updatePetDisplay();

  if (currentPage === "pet") {
    const dynamic =
      document.getElementById("dynamicSection");

    if (dynamic) {
      renderPetPage(dynamic);
    }
  }
}

/* =========================================================
   MARKET
   ========================================================= */

function renderMarketPage(container) {

  container.style.display = "block";

  container.innerHTML = `
    <div class="card">

      <div class="card-title">

        <div>
          <h2>🛒 Market</h2>
          <small style="color:var(--muted)">
            Panda'n için yeni şeyler keşfet.
          </small>
        </div>

        <div style="
          background:#fff6d8;
          color:#b27b00;
          padding:10px 15px;
          border-radius:12px;
          font-weight:900;
        ">
          🪙 ${appData.coins}
        </div>

      </div>

      <div class="market-grid">

        ${MARKET_ITEMS.map(item => {

          const owned =
            isItemOwned(item.id);

          return `
            <div class="shop-item">

              <div class="shop-icon">
                ${item.icon}
              </div>

              <h3>
                ${escapeHTML(item.name)}
              </h3>

              <p>
                ${escapeHTML(item.description)}
              </p>

              <div class="price">
                🪙 ${item.price}
              </div>

              ${
                owned
                  ? `
                    <button
                      class="secondary-btn"
                      style="width:100%"
                      onclick="handleOwnedItem('${item.id}')"
                    >
                      ${
                        item.category === "food" ||
                        item.category === "room"
                          ? "Kullan"
                          : "Uygula"
                      }
                    </button>
                  `
                  : `
                    <button
                      class="primary-btn"
                      style="width:100%"
                      onclick="buyItem('${item.id}')"
                    >
                      Satın Al
                    </button>
                  `
              }

            </div>
          `;

        }).join("")}

      </div>

    </div>
  `;
}

function isItemOwned(id) {
  return appData.owned.includes(id);
}

function buyItem(id) {

  const item =
    MARKET_ITEMS.find(i => i.id === id);

  if (!item) return;

  if (isItemOwned(id)) {
    showToast("Bu ürün zaten sende.");
    return;
  }

  if (appData.coins < item.price) {
    showToast("🪙 Yeterli coin'in yok.");
    return;
  }

  appData.coins -= item.price;

  appData.owned.push(item.id);

  if (!appData.inventory[item.category]) {
    appData.inventory[item.category] = [];
  }

  appData.inventory[item.category].push(item.id);

  saveLocalData();

  showToast(
    `${item.icon} ${item.name} satın alındı!`
  );

  updateStats();

  renderMarketPage(
    document.getElementById("dynamicSection")
  );
}

function handleOwnedItem(id) {

  const item =
    MARKET_ITEMS.find(i => i.id === id);

  if (!item) return;

  if (
    item.category === "food" ||
    item.category === "room"
  ) {
    useItem(id);
    return;
  }

  equipItem(id);
}

/* =========================================================
   ENVANTER
   ========================================================= */

function renderInventoryHTML() {

  const owned =
    appData.owned
      .map(id =>
        MARKET_ITEMS.find(item => item.id === id)
      )
      .filter(Boolean);

  if (owned.length === 0) {
    return `
      <div style="
        padding:20px;
        border:1px dashed var(--border);
        border-radius:15px;
        text-align:center;
        color:var(--muted);
      ">
        Envanterin henüz boş.
      </div>
    `;
  }

  return `
    <div style="
      display:grid;
      grid-template-columns:
        repeat(auto-fill,minmax(120px,1fr));
      gap:10px;
    ">

      ${owned.map(item => {

        const equipped =
          Object.values(
            appData.pet.accessories
          ).includes(item.icon);

        return `
          <div style="
            border:1px solid var(--border);
            border-radius:15px;
            padding:12px;
            text-align:center;
          ">

            <div style="
              font-size:35px;
              margin-bottom:7px;
            ">
              ${item.icon}
            </div>

            <strong style="
              display:block;
              font-size:12px;
            ">
              ${escapeHTML(item.name)}
            </strong>

            ${
              item.category === "food"
                ? `
                  <button
                    class="primary-btn"
                    style="
                      margin-top:8px;
                      padding:7px 10px;
                      font-size:11px;
                    "
                    onclick="useItem('${item.id}')"
                  >
                    Kullan
                  </button>
                `
                : item.category === "room"
                  ? `
                    <button
                      class="primary-btn"
                      style="
                        margin-top:8px;
                        padding:7px 10px;
                        font-size:11px;
                      "
                      onclick="useItem('${item.id}')"
                    >
                      Yerleştir
                    </button>
                  `
                  : `
                    <button
                      class="${
                        equipped
                          ? "secondary-btn"
                          : "primary-btn"
                      }"
                      style="
                        margin-top:8px;
                        padding:7px 10px;
                        font-size:11px;
                      "
                      onclick="equipItem('${item.id}')"
                    >
                      ${
                        equipped
                          ? "Takılı ✓"
                          : "Uygula"
                      }
                    </button>
                  `
            }

          </div>
        `;

      }).join("")}

    </div>
  `;
}

/* =========================================================
   EŞYA UYGULAMA
   ========================================================= */

function equipItem(id) {

  const item =
    MARKET_ITEMS.find(i => i.id === id);

  if (!item) return;

  if (!isItemOwned(id)) {
    showToast("Önce bu ürünü satın almalısın.");
    return;
  }

  if (
    ![
      "hat",
      "glasses",
      "bag",
      "scarf",
      "crown"
    ].includes(item.category)
  ) {
    return;
  }

  appData.pet.accessories[item.category] =
    item.icon;

  saveLocalData();

  updatePetDisplay();

  showToast(
    `${item.icon} ${item.name} Panda'ya uygulandı!`
  );

  if (currentPage === "pet") {

    const dynamic =
      document.getElementById("dynamicSection");

    if (dynamic) {
      renderPetPage(dynamic);
    }
  }
}

/* =========================================================
   YİYECEK / ODA
   ========================================================= */

function useItem(id) {

  const item =
    MARKET_ITEMS.find(i => i.id === id);

  if (!item) return;

  if (!isItemOwned(id)) {
    showToast("Bu ürün sende yok.");
    return;
  }

  if (item.category === "food") {

    const index =
      appData.inventory.food.indexOf(id);

    if (index !== -1) {
      appData.inventory.food.splice(index, 1);
    }

    appData.pet.energy =
      Math.min(
        100,
        appData.pet.energy + 20
      );

    appData.pet.happiness =
      Math.min(
        100,
        appData.pet.happiness + 15
      );

    appData.pet.xp += 10;

    showToast(
      `${item.icon} Panda ${item.name.toLowerCase()} yedi!`
    );

  } else if (item.category === "room") {

    if (!appData.pet.room.includes(id)) {
      appData.pet.room.push(id);
    }

    showToast(
      `${item.icon} ${item.name} Panda'nın odasına yerleştirildi!`
    );
  }

  checkPetLevel();

  saveLocalData();
  updatePetDisplay();
  updateStats();

  if (currentPage === "pet") {

    const dynamic =
      document.getElementById("dynamicSection");

    if (dynamic) {
      renderPetPage(dynamic);
    }
  }
}

/* =========================================================
   ROZETLER
   ========================================================= */

function renderAchievements(container) {

  container.style.display = "block";

  const badges = [
    {
      icon: "🌱",
      name: "İlk Adım",
      desc: "İlk görevini tamamla.",
      unlocked: appData.tasks.some(t => t.completed)
    },
    {
      icon: "⭐",
      name: "XP Avcısı",
      desc: "500 XP kazan.",
      unlocked: appData.xp >= 500
    },
    {
      icon: "🪙",
      name: "Coin Toplayıcı",
      desc: "500 coin biriktir.",
      unlocked: appData.coins >= 500
    },
    {
      icon: "🐼",
      name: "Panda Dostu",
      desc: "Panda ile ilgilen.",
      unlocked: appData.pet.xp > 0
    },
    {
      icon: "🛒",
      name: "İlk Alışveriş",
      desc: "Marketten bir ürün al.",
      unlocked: appData.owned.length > 0
    },
    {
      icon: "👑",
      name: "Kraliyet",
      desc: "Panda'ya taç tak.",
      unlocked:
        appData.pet.accessories.crown !== ""
    }
  ];

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>🏆 Rozetler</h2>
      </div>

      <div class="badges">

        ${badges.map(badge => `
          <div class="
            badge
            ${badge.unlocked ? "" : "locked"}
          ">

            <div class="badge-icon">
              ${badge.icon}
            </div>

            <strong>
              ${badge.name}
            </strong>

            <small>
              ${badge.desc}
            </small>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

/* =========================================================
   İSTATİSTİK
   ========================================================= */

function renderStats(container) {

  container.style.display = "block";

  const completed =
    appData.tasks.filter(
      t => t.completed
    ).length;

  const total =
    appData.tasks.length;

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>📊 İstatistikler</h2>
      </div>

      <div class="stats">

        <div class="stat">
          <span>⭐</span>
          <strong>${appData.xp}</strong>
          <small>Toplam XP</small>
        </div>

        <div class="stat">
          <span>🪙</span>
          <strong>${appData.coins}</strong>
          <small>Coin</small>
        </div>

        <div class="stat">
          <span>✅</span>
          <strong>${completed}</strong>
          <small>Tamamlanan görev</small>
        </div>

        <div class="stat">
          <span>📝</span>
          <strong>${total}</strong>
          <small>Toplam görev</small>
        </div>

        <div class="stat">
          <span>🐼</span>
          <strong>${appData.pet.level}</strong>
          <small>Panda seviyesi</small>
        </div>

        <div class="stat">
          <span>🛒</span>
          <strong>${appData.owned.length}</strong>
          <small>Alınan ürün</small>
        </div>

      </div>

    </div>
  `;
}

/* =========================================================
   ODAK
   ========================================================= */

function renderFocus(container) {

  container.style.display = "block";

  container.innerHTML = `
    <div class="card focus">

      <h2>⏱️ Odaklan</h2>

      <p style="
        color:var(--muted);
        margin-top:8px;
      ">
        Telefonunu bırak, dersine odaklan.
      </p>

      <div
        id="focusTimer"
        class="timer"
      >
        25:00
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
          onclick="resetFocus()"
        >
          ↻ Sıfırla
        </button>

      </div>

    </div>
  `;
}

function startFocus() {

  if (focusInterval) return;

  focusInterval =
    setInterval(() => {

      if (focusSeconds <= 0) {

        clearInterval(focusInterval);
        focusInterval = null;

        appData.xp += 100;
        appData.coins += 50;

        saveLocalData();
        updateStats();

        celebrate(
          "🎯 Odaklanma tamamlandı! ⭐ +100 XP 🪙 +50 Coin"
        );

        resetFocus();
        return;
      }

      focusSeconds--;

      updateFocusTimer();

    }, 1000);
}

function resetFocus() {

  clearInterval(focusInterval);
  focusInterval = null;

  focusSeconds = 25 * 60;

  updateFocusTimer();
}

function updateFocusTimer() {

  const el =
    document.getElementById("focusTimer");

  if (!el) return;

  const minutes =
    Math.floor(focusSeconds / 60);

  const seconds =
    focusSeconds % 60;

  el.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* =========================================================
   KOÇ
   ========================================================= */

function renderCoachPage(container) {

  container.style.display = "block";

  const messages = [
    "Bugün 20 dakikalık küçük bir çalışma bile büyük fark yaratabilir. 💪",
    "Zorlandığın dersten kaçma. Küçük parçalara böl ve başla. 🧠",
    "Önce en kolay görevini tamamla, sonra zor olana geç. 🚀",
    "Telefonunu biraz uzağa koy ve 25 dakika sadece dersine odaklan. 🎯",
    "Bugünkü hedefin mükemmel olmak değil, dünden biraz daha iyi olmak. ⭐"
  ];

  const message =
    messages[
      Math.floor(Math.random() * messages.length)
    ];

  container.innerHTML = `
    <div class="card coach">

      <div class="coach-head">

        <div class="coach-icon">
          🤖
        </div>

        <div>
          <h2>Ders Koçu</h2>
          <small style="color:var(--muted)">
            Sana özel öneri
          </small>
        </div>

      </div>

      <p class="coach-message">
        ${message}
      </p>

      <button
        class="primary-btn"
        style="margin-top:15px"
        onclick="renderCoachPage(document.getElementById('dynamicSection'))"
      >
        🔄 Yeni Öneri
      </button>

    </div>
  `;
}

/* =========================================================
   DERSLER
   ========================================================= */

function renderSubjects(container) {

  container.style.display = "block";

  const subjects = [
    ["📐", "Matematik"],
    ["📖", "Türkçe"],
    ["🔬", "Fen Bilimleri"],
    ["🌍", "Sosyal Bilgiler"],
    ["🇬🇧", "İngilizce"],
    ["💻", "Bilişim"]
  ];

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>📚 Dersler</h2>
      </div>

      <div class="market-grid">

        ${subjects.map(s => `
          <div class="shop-item">

            <div class="shop-icon">
              ${s[0]}
            </div>

            <h3>
              ${s[1]}
            </h3>

            <p>
              Ders çalışmalarını takip et.
            </p>

            <button
              class="secondary-btn"
              onclick="showToast('📚 ${s[1]} seçildi')"
            >
              Aç
            </button>

          </div>
        `).join("")}

      </div>

    </div>
  `;
}

/* =========================================================
   SINAVLAR
   ========================================================= */

function renderExams(container) {

  container.style.display = "block";

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>📅 Sınavlar</h2>

        <button
          class="primary-btn"
          onclick="addExam()"
        >
          + Sınav Ekle
        </button>
      </div>

      <div id="examList">
        Henüz sınav eklenmedi.
      </div>

    </div>
  `;
}

function addExam() {

  const name =
    prompt("Sınav adı:");

  if (!name) return;

  const date =
    prompt("Sınav tarihi:");

  if (!date) return;

  const exams =
    JSON.parse(
      localStorage.getItem("dersTakipExams") || "[]"
    );

  exams.push({
    name,
    date
  });

  localStorage.setItem(
    "dersTakipExams",
    JSON.stringify(exams)
  );

  showToast("📅 Sınav eklendi!");

  renderExams(
    document.getElementById("dynamicSection")
  );
}

/* =========================================================
   PROFİL
   ========================================================= */

function renderProfile(container) {

  container.style.display = "block";

  container.innerHTML = `
    <div class="card">

      <div class="card-title">
        <h2>👤 Profil</h2>
      </div>

      <div style="
        display:flex;
        align-items:center;
        gap:15px;
        margin-bottom:20px;
      ">

        <div style="
          width:70px;
          height:70px;
          border-radius:50%;
          background:#e7e4ff;
          display:grid;
          place-items:center;
          font-size:35px;
        ">
          🎓
        </div>

        <div>
          <h2>
            ${escapeHTML(currentUser?.name || "Öğrenci")}
          </h2>

          <p style="color:var(--muted)">
            ${escapeHTML(currentUser?.email || "")}
          </p>
        </div>

      </div>

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
   GÜNLÜK ÖDÜL
   ========================================================= */

function claimDailyReward() {

  const today =
    new Date().toISOString().slice(0, 10);

  if (appData.lastRewardDate === today) {

    showToast(
      "🎁 Bugünkü ödülü zaten aldın."
    );

    updateDailyRewardUI();

    return;
  }

  const reward =
    Math.floor(Math.random() * 51) + 50;

  appData.coins += reward;

  appData.lastRewardDate = today;
  appData.dailyRewardClaimed = true;

  saveLocalData();

  updateStats();
  updateDailyRewardUI();

  celebrate(
    `🎁 Günlük ödül! 🪙 +${reward} Coin`
  );
}

function updateDailyRewardUI() {

  const button =
    document.getElementById(
      "dailyRewardButton"
    );

  const text =
    document.getElementById(
      "dailyRewardText"
    );

  if (!button || !text) return;

  const today =
    new Date().toISOString().slice(0, 10);

  if (appData.lastRewardDate === today) {

    button.textContent =
      "Bugünkü Ödül Alındı ✓";

    button.disabled = true;

    button.style.opacity = ".6";

    text.textContent =
      "Bugünkü ödülünü zaten aldın.";

  } else {

    button.textContent =
      "Ödülü Al 🎁";

    button.disabled = false;

    button.style.opacity = "1";

    text.textContent =
      "Bugünün sürpriz ödülünü al!";
  }
}

/* =========================================================
   MOBİL MENÜ
   ========================================================= */

function toggleMobileMenu() {

  const drawer =
    document.getElementById("mobileDrawer");

  if (!drawer) return;

  drawer.classList.toggle("open");
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(title, content) {

  const modal =
    document.getElementById("modal");

  const titleEl =
    document.getElementById("modalTitle");

  const contentEl =
    document.getElementById("modalContent");

  if (!modal || !titleEl || !contentEl) return;

  titleEl.textContent = title;
  contentEl.innerHTML = content;

  modal.classList.add("show");
}

function closeModal() {

  const modal =
    document.getElementById("modal");

  if (modal) {
    modal.classList.remove("show");
  }
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const container =
    document.getElementById(
      "toastContainer"
    );

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
    }, 250);

  }, 2800);
}

/* =========================================================
   CELEBRATION
   ========================================================= */

function celebrate(message) {

  const celebration =
    document.getElementById(
      "celebration"
    );

  const text =
    document.getElementById(
      "celebrationText"
    );

  if (!celebration) return;

  if (text) {
    text.textContent = message;
  }

  celebration.style.display = "flex";

  setTimeout(() => {
    celebration.style.display = "none";
  }, 2200);
}

/* =========================================================
   HTML GÜVENLİĞİ
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   BAŞLANGIÇ VERİLERİ
   ========================================================= */

function ensureDataIntegrity() {

  if (!Array.isArray(appData.tasks)) {
    appData.tasks = [];
  }

  if (!Array.isArray(appData.owned)) {
    appData.owned = [];
  }

  if (!appData.inventory) {
    appData.inventory = {};
  }

  [
    "hat",
    "glasses",
    "bag",
    "scarf",
    "crown",
    "food",
    "room"
  ].forEach(category => {

    if (!Array.isArray(
      appData.inventory[category]
    )) {
      appData.inventory[category] = [];
    }

  });

  if (!appData.pet) {
    appData.pet = {};
  }

  if (!appData.pet.accessories) {
    appData.pet.accessories = {};
  }

  [
    "hat",
    "glasses",
    "bag",
    "scarf",
    "crown"
  ].forEach(key => {

    if (
      typeof appData.pet.accessories[key] !==
      "string"
    ) {
      appData.pet.accessories[key] = "";
    }

  });
}

ensureDataIntegrity();
saveLocalData();
updateUI();
updateDailyRewardUI();
