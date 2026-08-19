/* =========================================================
   DERS TAKİP V3
   Tek dosyalık uygulama motoru
========================================================= */

"use strict";

/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "derstakip_v3";

const defaultState = {
  loggedIn: false,

  user: {
    name: "Eren Önen",
    email: "",
    avatar: "🎓"
  },

  xp: 0,
  coins: 0,
  streak: 0,
  minutes: 0,

  tasks: [
    {
      id: 1,
      name: "20 soru Matematik çöz",
      xp: 30,
      completed: false
    },
    {
      id: 2,
      name: "Türkçe tekrar yap",
      xp: 25,
      completed: false
    }
  ],

  subjects: [
    {
      id: 1,
      name: "Matematik",
      icon: "📐",
      progress: 65
    },
    {
      id: 2,
      name: "Türkçe",
      icon: "📖",
      progress: 50
    },
    {
      id: 3,
      name: "Fen Bilimleri",
      icon: "🔬",
      progress: 35
    },
    {
      id: 4,
      name: "İngilizce",
      icon: "🌎",
      progress: 40
    }
  ],

  exams: [
    {
      id: 1,
      name: "Matematik Sınavı",
      subject: "Matematik",
      date: "2026-09-10"
    },
    {
      id: 2,
      name: "Türkçe Sınavı",
      subject: "Türkçe",
      date: "2026-09-15"
    }
  ],

  activities: [],

  pet: {
    name: "Panda",
    icon: "🐼",
    xp: 0,
    level: 1
  },

  focusMinutes: 25,

  theme: "light",

  dailyRewardClaimed: false
};

let state = loadState();

let timerInterval = null;

let timerSeconds = 25 * 60;

let timerRunning = false;


/* =========================================================
   STORAGE
========================================================= */

function loadState(){

  try{

    const saved = localStorage.getItem(STORAGE_KEY);

    if(!saved){
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(saved);

    return mergeState(
      structuredClone(defaultState),
      parsed
    );

  }catch(error){

    console.error("State yüklenemedi:", error);

    return structuredClone(defaultState);
  }
}


function mergeState(base, saved){

  return {
    ...base,
    ...saved,

    user:{
      ...base.user,
      ...(saved.user || {})
    },

    pet:{
      ...base.pet,
      ...(saved.pet || {})
    },

    tasks:Array.isArray(saved.tasks)
      ? saved.tasks
      : base.tasks,

    subjects:Array.isArray(saved.subjects)
      ? saved.subjects
      : base.subjects,

    exams:Array.isArray(saved.exams)
      ? saved.exams
      : base.exams,

    activities:Array.isArray(saved.activities)
      ? saved.activities
      : base.activities
  };
}


function saveState(){

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", init);


function init(){

  applyTheme();

  if(state.loggedIn){

    showApp();

  }else{

    showAuth();

  }

  renderAll();
}


/* =========================================================
   AUTH
========================================================= */

function showAuth(){

  const auth = document.getElementById("authScreen");
  const app = document.getElementById("app");

  if(auth) auth.style.display = "flex";

  if(app) app.style.display = "none";
}


function showApp(){

  const auth = document.getElementById("authScreen");
  const app = document.getElementById("app");

  if(auth) auth.style.display = "none";

  if(app) app.style.display = "block";

  updateUserUI();
}


function showLogin(){

  document.getElementById("loginForm").style.display = "block";

  document.getElementById("registerForm").style.display = "none";

  document.getElementById("loginTab").classList.add("active");

  document.getElementById("registerTab").classList.remove("active");

  setAuthMessage("");
}


function showRegister(){

  document.getElementById("loginForm").style.display = "none";

  document.getElementById("registerForm").style.display = "block";

  document.getElementById("loginTab").classList.remove("active");

  document.getElementById("registerTab").classList.add("active");

  setAuthMessage("");
}


function setAuthMessage(message, error=false){

  const element = document.getElementById("authMessage");

  if(!element) return;

  element.textContent = message;

  element.style.color = error
    ? "#e5485d"
    : "#20a77a";
}


function register(event){

  event.preventDefault();

  const name =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;

  if(password.length < 6){

    setAuthMessage(
      "Şifre en az 6 karakter olmalı.",
      true
    );

    return;
  }

  state.user.name = name;

  state.user.email = email;

  state.loggedIn = true;

  state.xp = 0;

  state.coins = 0;

  saveState();

  showApp();

  renderAll();

  toast("Hesabın oluşturuldu 🎉");
}


function login(event){

  event.preventDefault();

  const email =
    document.getElementById("loginEmail").value.trim();

  if(!email){

    setAuthMessage(
      "E-posta adresini gir.",
      true
    );

    return;
  }

  state.user.email = email;

  state.loggedIn = true;

  saveState();

  showApp();

  renderAll();

  toast("Tekrar hoş geldin! 👋");
}


function logout(){

  state.loggedIn = false;

  saveState();

  showAuth();

  showLogin();
}


function togglePassword(id, button){

  const input = document.getElementById(id);

  if(!input) return;

  if(input.type === "password"){

    input.type = "text";

    button.textContent = "🙈";

  }else{

    input.type = "password";

    button.textContent = "👁️";

  }
}


/* =========================================================
   NAVIGATION
========================================================= */

const pageNames = {

  home:{
    title:"Merhaba! 👋",
    subtitle:"Bugün küçük bir adım, yarın büyük bir başarı."
  },

  tasks:{
    title:"Görevler ✅",
    subtitle:"Bugün yapman gerekenleri yönet."
  },

  subjects:{
    title:"Dersler 📚",
    subtitle:"Ders bazında ilerlemeni takip et."
  },

  exams:{
    title:"Sınavlar 📅",
    subtitle:"Yaklaşan sınavlarını takip et."
  },

  focus:{
    title:"Odaklan ⏱️",
    subtitle:"Dikkatini topla ve çalışmaya başla."
  },

  coach:{
    title:"Ders Koçu 🤖",
    subtitle:"Sana özel çalışma önerileri."
  },

  pet:{
    title:"Evcil Hayvanım 🐼",
    subtitle:"Çalıştıkça evcil hayvanın gelişir."
  },

  market:{
    title:"Ödül Marketi 🛒",
    subtitle:"Coinlerini ödüller için kullan."
  },

  achievements:{
    title:"Rozetler 🏆",
    subtitle:"Başarılarını ve koleksiyonunu gör."
  },

  stats:{
    title:"İstatistikler 📊",
    subtitle:"Çalışma performansını incele."
  },

  profile:{
    title:"Profil 👤",
    subtitle:"Hesabını ve ayarlarını yönet."
  }

};


function navigate(page, button){

  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  const target =
    document.getElementById(`page-${page}`);

  if(target){
    target.classList.add("active");
  }

  document.querySelectorAll(".menu button")
    .forEach(b => b.classList.remove("active"));

  if(button){
    button.classList.add("active");
  }else{

    const sidebarButton =
      [...document.querySelectorAll(".menu button")]
      .find(btn =>
        btn.getAttribute("onclick")?.includes(`'${page}'`)
      );

    if(sidebarButton){
      sidebarButton.classList.add("active");
    }
  }

  const info = pageNames[page];

  if(info){

    document.getElementById("welcomeText").textContent =
      info.title;

    document.getElementById("sectionSubtitle").textContent =
      info.subtitle;
  }

  renderPage(page);

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

  closeMobileMenu();
}


function navigateMobile(page){

  navigate(page);

  document.querySelectorAll(".mobile-menu-item")
    .forEach(item =>
      item.classList.remove("active")
    );

  const matching =
    [...document.querySelectorAll(".mobile-menu-item")]
      .find(item =>
        item.getAttribute("onclick")?.includes(`'${page}'`)
      );

  if(matching){
    matching.classList.add("active");
  }
}


/* =========================================================
   RENDER
========================================================= */

function renderAll(){

  updateUserUI();

  renderHome();

  renderTasks();

  renderSubjects();

  renderExams();

  renderPet();

  renderMarket();

  renderBadges();

  renderStats();

  renderProfile();

  renderCoach();
}


function renderPage(page){

  switch(page){

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

    case "focus":
      updateTimerDisplay();
      break;

    case "coach":
      renderCoach();
      break;

    case "pet":
      renderPet();
      break;

    case "market":
      renderMarket();
      break;

    case "achievements":
      renderBadges();
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
   USER
========================================================= */

function getLevel(){

  return Math.floor(state.xp / 100) + 1;
}


function updateUserUI(){

  const level = getLevel();

  const welcome =
    document.getElementById("welcomeText");

  if(
    welcome &&
    document.getElementById("page-home")?.classList.contains("active")
  ){

    welcome.textContent =
      `Merhaba, ${state.user.name}! 👋`;
  }

  const avatar =
    document.getElementById("topAvatar");

  if(avatar){
    avatar.textContent = state.user.avatar;
  }

  const levelText =
    document.getElementById("levelText");

  if(levelText){
    levelText.textContent = `Seviye ${level}`;
  }
}


/* =========================================================
   HOME
========================================================= */

function renderHome(){

  const total = state.tasks.length;

  const completed =
    state.tasks.filter(t => t.completed).length;

  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const progress =
    document.getElementById("progressBar");

  if(progress){
    progress.style.width = `${percent}%`;
  }

  const progressText =
    document.getElementById("progressText");

  if(progressText){
    progressText.textContent =
      `${completed} / ${total} görev`;
  }

  const xp =
    document.getElementById("xpText");

  if(xp){
    xp.textContent = `${state.xp} XP`;
  }

  const summary =
    document.getElementById("taskSummary");

  if(summary){

    if(total === 0){

      summary.textContent =
        "Bugün için henüz görev eklemedin.";

    }else if(completed === total){

      summary.textContent =
        "Harika! Bugünkü görevlerinin hepsini tamamladın 🎉";

    }else{

      summary.textContent =
        `${total - completed} görev seni bekliyor.`;
    }
  }

  const list =
    document.getElementById("homeTaskList");

  if(!list) return;

  if(total === 0){

    list.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📝</div>
        <p>Henüz görev yok.</p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    state.tasks
      .slice(0,5)
      .map(taskHTML)
      .join("");
}


/* =========================================================
   TASKS
========================================================= */

function renderTasks(){

  const list =
    document.getElementById("taskList");

  if(!list) return;

  const counter =
    document.getElementById("taskCounter");

  const completed =
    state.tasks.filter(t => t.completed).length;

  if(counter){

    counter.textContent =
      `${completed} / ${state.tasks.length}`;
  }

  if(state.tasks.length === 0){

    list.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🎯</div>
        <p>Henüz görev eklenmemiş.</p>
      </div>
    `;

    return;
  }

  list.innerHTML =
    state.tasks
      .map(taskHTML)
      .join("");
}


function taskHTML(task){

  return `
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
          ${escapeHTML(task.name)}
        </div>

      </div>

      <span class="task-xp">
        +${task.xp} XP
      </span>

      <button
        class="delete-task"
        onclick="deleteTask(${task.id})"
        title="Sil"
      >
        🗑️
      </button>

    </div>
  `;
}


function addTask(){

  const input =
    document.getElementById("newTask");

  if(!input) return;

  const name = input.value.trim();

  if(!name){

    toast("Önce görev adını yaz ✏️");

    return;
  }

  const task = {

    id:Date.now(),

    name,

    xp:25,

    completed:false
  };

  state.tasks.push(task);

  addActivity(
    `Yeni görev eklendi: ${name}`,
    "📝"
  );

  input.value = "";

  saveState();

  renderAll();

  toast("Görev eklendi 🎯");
}


function toggleTask(id){

  const task =
    state.tasks.find(t => t.id === id);

  if(!task) return;

  if(task.completed){

    task.completed = false;

    state.xp =
      Math.max(0,state.xp - task.xp);

    state.coins =
      Math.max(0,state.coins - 5);

    toast("Görev tekrar açıldı.");

  }else{

    task.completed = true;

    state.xp += task.xp;

    state.coins += 5;

    state.minutes += 5;

    state.streak = Math.max(1,state.streak);

    state.pet.xp += task.xp;

    levelUpPet();

    addActivity(
      `${task.name} tamamlandı`,
      "✅"
    );

    celebrate(
      `⭐ +${task.xp} XP<br>🪙 +5 Coin`
    );

  }

  saveState();

  renderAll();
}


function deleteTask(id){

  state.tasks =
    state.tasks.filter(t => t.id !== id);

  saveState();

  renderAll();

  toast("Görev silindi.");
}


/* =========================================================
   SUBJECTS
========================================================= */

function renderSubjects(){

  const grid =
    document.getElementById("subjectGrid");

  if(!grid) return;

  if(state.subjects.length === 0){

    grid.innerHTML = `
      <div class="empty">
        Henüz ders eklenmemiş.
      </div>
    `;

    return;
  }

  grid.innerHTML =
    state.subjects.map(subject => `

      <div class="subject-card">

        <div class="subject-icon">
          ${subject.icon}
        </div>

        <h3>
          ${escapeHTML(subject.name)}
        </h3>

        <p>
          Ders ilerlemesi
        </p>

        <div class="mini-progress">

          <span style="width:${subject.progress}%"></span>

        </div>

        <small
          style="
            display:block;
            margin-top:8px;
            color:var(--muted)
          "
        >
          ${subject.progress}%
        </small>

      </div>

    `).join("");
}


function addSubject(){

  const name =
    prompt("Ders adı:");

  if(!name?.trim()) return;

  const icons = [
    "📚",
    "📐",
    "🔬",
    "🌎",
    "📖",
    "💻",
    "🎨"
  ];

  state.subjects.push({

    id:Date.now(),

    name:name.trim(),

    icon:icons[
      Math.floor(Math.random()*icons.length)
    ],

    progress:0
  });

  saveState();

  renderSubjects();

  toast("Ders eklendi 📚");
}


/* =========================================================
   EXAMS
========================================================= */

function renderExams(){

  const grid =
    document.getElementById("examGrid");

  if(!grid) return;

  if(state.exams.length === 0){

    grid.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📅</div>
        <p>Henüz sınav eklenmemiş.</p>
      </div>
    `;

    return;
  }

  grid.innerHTML =
    state.exams
      .sort((a,b) =>
        new Date(a.date) - new Date(b.date)
      )
      .map(exam => {

        const days =
          daysUntil(exam.date);

        return `

          <div class="exam-card">

            <span class="exam-date">
              ${formatDate(exam.date)}
            </span>

            <h3>
              ${escapeHTML(exam.name)}
            </h3>

            <p>
              ${escapeHTML(exam.subject)}
            </p>

            <strong
              style="
                display:block;
                margin-top:15px;
                color:${days <= 3 ? "var(--red)" : "var(--primary)"}
              "
            >
              ${
                days < 0
                  ? "Sınav geçti"
                  : days === 0
                    ? "Bugün!"
                    : `${days} gün kaldı`
              }
            </strong>

          </div>

        `;

      })
      .join("");
}


function addExam(){

  const name =
    prompt("Sınav adı:");

  if(!name?.trim()) return;

  const subject =
    prompt("Ders:");

  if(!subject?.trim()) return;

  const date =
    prompt(
      "Tarih (YYYY-MM-DD):",
      "2026-09-20"
    );

  if(!date) return;

  state.exams.push({

    id:Date.now(),

    name:name.trim(),

    subject:subject.trim(),

    date
  });

  saveState();

  renderExams();

  toast("Sınav eklendi 📅");
}


/* =========================================================
   FOCUS
========================================================= */

function setFocusMode(minutes, button){

  state.focusMinutes = minutes;

  timerSeconds = minutes * 60;

  timerRunning = false;

  clearInterval(timerInterval);

  document
    .querySelectorAll(".focus-mode button")
    .forEach(b =>
      b.classList.remove("active")
    );

  button.classList.add("active");

  const timerButton =
    document.getElementById("timerButton");

  if(timerButton){
    timerButton.textContent = "▶ Başlat";
  }

  updateTimerDisplay();
}


function toggleTimer(){

  if(timerRunning){

    clearInterval(timerInterval);

    timerRunning = false;

    document.getElementById("timerButton")
      .textContent = "▶ Devam Et";

    return;
  }

  timerRunning = true;

  document.getElementById("timerButton")
    .textContent = "⏸ Duraklat";

  timerInterval =
    setInterval(() => {

      timerSeconds--;

      updateTimerDisplay();

      if(timerSeconds <= 0){

        clearInterval(timerInterval);

        timerRunning = false;

        state.minutes += state.focusMinutes;

        state.xp += state.focusMinutes;

        state.coins += 10;

        state.pet.xp += state.focusMinutes;

        levelUpPet();

        addActivity(
          `${state.focusMinutes} dakika odaklanma tamamlandı`,
          "⏱️"
        );

        saveState();

        renderAll();

        celebrate(
          `⏱️ ${state.focusMinutes} dakika tamamlandı!<br>
           ⭐ +${state.focusMinutes} XP<br>
           🪙 +10 Coin`
        );

        timerSeconds =
          state.focusMinutes * 60;

        updateTimerDisplay();

      }

    },1000);
}


function resetTimer(){

  clearInterval(timerInterval);

  timerRunning = false;

  timerSeconds =
    state.focusMinutes * 60;

  const button =
    document.getElementById("timerButton");

  if(button){
    button.textContent = "▶ Başlat";
  }

  updateTimerDisplay();
}


function updateTimerDisplay(){

  const timer =
    document.getElementById("timer");

  if(!timer) return;

  const minutes =
    Math.floor(timerSeconds / 60);

  const seconds =
    timerSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}


/* =========================================================
   COACH
========================================================= */

const coachAdvice = [

  "Önce en zor dersinden 25 dakika çalış. Sonra kısa bir mola ver.",

  "Bugün 20 soru çözmeyi hedefle. Bitirdiğinde kendine küçük bir ödül ver.",

  "Telefonunu sessize al ve sadece tek bir derse odaklan.",

  "Çalışmaya başlamak için mükemmel zamanı bekleme. Şimdi 10 dakika başla.",

  "Yanlış yaptığın soruları tekrar çözmek, yeni soru çözmek kadar değerlidir.",

  "Bugün küçük bir hedef seç ve mutlaka tamamla. Küçük adımlar büyük sonuçlar oluşturur.",

  "50 dakika çalışıp 10 dakika mola vermeyi deneyebilirsin."

];


function renderCoach(){

  const element =
    document.getElementById("coachMessage");

  if(!element) return;

  if(!element.textContent.trim()){

    newCoachAdvice();

  }
}


function newCoachAdvice(){

  const advice =
    coachAdvice[
      Math.floor(
        Math.random()*coachAdvice.length
      )
    ];

  const element =
    document.getElementById("coachMessage");

  if(element){

    element.textContent = advice;

  }

  toast("Yeni çalışma önerisi 🤖");
}


/* =========================================================
   PET
========================================================= */

function renderPet(){

  const level =
    state.pet.level;

  const petBig =
    document.getElementById("petBig");

  if(petBig){
    petBig.textContent = state.pet.icon;
  }

  const name =
    document.getElementById("petName");

  if(name){
    name.textContent = state.pet.name;
  }

  const levelElement =
    document.getElementById("petLevel");

  if(levelElement){
    levelElement.textContent =
      `Seviye ${level}`;
  }

  const current =
    state.pet.xp % 100;

  const bar =
    document.getElementById("petXPBar");

  if(bar){
    bar.style.width = `${current}%`;
  }

  const text =
    document.getElementById("petXPText");

  if(text){
    text.textContent =
      `${current} / 100 XP`;
  }
}


function levelUpPet(){

  const newLevel =
    Math.floor(state.pet.xp / 100) + 1;

  if(newLevel > state.pet.level){

    state.pet.level = newLevel;

    toast(
      `🐼 Panda Seviye ${newLevel} oldu! 🎉`
    );

  }
}


function feedPet(){

  if(state.coins < 10){

    toast("Panda'yı beslemek için 10 coin gerekiyor.");

    return;
  }

  state.coins -= 10;

  state.pet.xp += 15;

  levelUpPet();

  saveState();

  renderAll();

  toast("Panda çok mutlu oldu! 🐼❤️");
}


/* =========================================================
   MARKET
========================================================= */

const marketItems = [

  {
    id:"hat",
    icon:"🎩",
    name:"Şapka",
    description:"Panda için havalı bir şapka.",
    price:50
  },

  {
    id:"glasses",
    icon:"🕶️",
    name:"Gözlük",
    description:"Panda artık çok havalı.",
    price:80
  },

  {
    id:"star",
    icon:"⭐",
    name:"Yıldız",
    description:"Profiline özel yıldız.",
    price:100
  },

  {
    id:"crown",
    icon:"👑",
    name:"Taç",
    description:"Seviye atlayanların ödülü.",
    price:150
  }

];


function renderMarket(){

  const grid =
    document.getElementById("marketGrid");

  const coins =
    document.getElementById("marketCoins");

  if(coins){
    coins.textContent = state.coins;
  }

  if(!grid) return;

  grid.innerHTML =
    marketItems.map(item => `

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

    `).join("");
}


function buyItem(id){

  const item =
    marketItems.find(i => i.id === id);

  if(!item) return;

  if(state.coins < item.price){

    toast("Yeterli coin yok 🪙");

    return;
  }

  state.coins -= item.price;

  addActivity(
    `${item.name} satın alındı`,
    item.icon
  );

  saveState();

  renderAll();

  toast(
    `${item.icon} ${item.name} satın alındı!`
  );
}


/* =========================================================
   BADGES
========================================================= */

function renderBadges(){

  const container =
    document.getElementById("badges");

  if(!container) return;

  const completed =
    state.tasks.filter(t => t.completed).length;

  const badges = [

    {
      icon:"🌱",
      name:"İlk Adım",
      description:"İlk görevini tamamla.",
      unlocked:completed >= 1
    },

    {
      icon:"🔥",
      name:"Seri Başlangıcı",
      description:"1 günlük seri yap.",
      unlocked:state.streak >= 1
    },

    {
      icon:"⭐",
      name:"XP Avcısı",
      description:"100 XP kazan.",
      unlocked:state.xp >= 100
    },

    {
      icon:"🎯",
      name:"Görev Ustası",
      description:"5 görev tamamla.",
      unlocked:completed >= 5
    },

    {
      icon:"⏱️",
      name:"Odak Şampiyonu",
      description:"60 dakika çalış.",
      unlocked:state.minutes >= 60
    },

    {
      icon:"🪙",
      name:"Coin Toplayıcı",
      description:"100 coin kazan.",
      unlocked:state.coins >= 100
    },

    {
      icon:"🏆",
      name:"Seviye 5",
      description:"5. seviyeye ulaş.",
      unlocked:getLevel() >= 5
    },

    {
      icon:"🐼",
      name:"Panda Dostu",
      description:"Panda'yı seviye 3 yap.",
      unlocked:state.pet.level >= 3
    }

  ];

  container.innerHTML =
    badges.map(badge => `

      <div class="badge ${badge.unlocked ? "" : "locked"}">

        <div class="badge-icon">
          ${badge.icon}
        </div>

        <strong>
          ${badge.name}
        </strong>

        <br>

        <small>
          ${badge.unlocked ? "Açıldı ✓" : badge.description}
        </small>

      </div>

    `).join("");
}


/* =========================================================
   STATS
========================================================= */

function renderStats(){

  setText("statXP",state.xp);

  setText("statStreak",state.streak);

  setText("statCoins",state.coins);

  setText("statMinutes",state.minutes);

  const activity =
    document.getElementById("activityList");

  if(!activity) return;

  if(state.activities.length === 0){

    activity.innerHTML = `
      <div class="empty">
        <div class="empty-icon">📊</div>
        <p>Henüz aktivite bulunmuyor.</p>
      </div>
    `;

    return;
  }

  activity.innerHTML =
    state.activities
      .slice(0,10)
      .map(a => `

        <div
          style="
            display:flex;
            align-items:center;
            gap:12px;
            padding:13px 0;
            border-bottom:1px solid var(--border)
          "
        >

          <div style="font-size:22px">
            ${a.icon}
          </div>

          <div>

            <strong>
              ${escapeHTML(a.text)}
            </strong>

            <div
              style="
                color:var(--muted);
                font-size:12px;
                margin-top:3px
              "
            >
              ${a.time}
            </div>

          </div>

        </div>

      `)
      .join("");
}


function addActivity(text,icon){

  state.activities.unshift({

    text,

    icon,

    time:new Date().toLocaleString(
      "tr-TR",
      {
        day:"2-digit",
        month:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
      }
    )

  });

  state.activities =
    state.activities.slice(0,30);
}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(){

  setText(
    "profileName",
    state.user.name
  );

  setText(
    "profileEmail",
    state.user.email || "E-posta belirtilmedi."
  );

  setText(
    "profileAvatar",
    state.user.avatar
  );

  setText(
    "topAvatar",
    state.user.avatar
  );

  updateUserUI();
}


function changeAvatar(){

  const avatars = [
    "🎓",
    "🐼",
    "🐱",
    "🐶",
    "🦊",
    "🐸",
    "🦁",
    "🐯",
    "🐨",
    "🚀"
  ];

  const current =
    avatars.indexOf(state.user.avatar);

  const next =
    avatars[
      (current + 1) % avatars.length
    ];

  state.user.avatar = next;

  saveState();

  renderProfile();

  toast("Avatar değiştirildi ✨");
}


/* =========================================================
   THEME
========================================================= */

function applyTheme(){

  document.body.classList.toggle(
    "dark",
    state.theme === "dark"
  );
}


function toggleDarkMode(){

  state.theme =
    state.theme === "dark"
      ? "light"
      : "dark";

  applyTheme();

  saveState();

  toast(
    state.theme === "dark"
      ? "Karanlık mod açıldı 🌙"
      : "Aydınlık mod açıldı ☀️"
  );
}


/* =========================================================
   MOBILE
========================================================= */

function toggleMobileMenu(){

  const drawer =
    document.getElementById("mobileDrawer");

  if(drawer){
    drawer.classList.toggle("open");
  }
}


function closeMobileMenu(){

  const drawer =
    document.getElementById("mobileDrawer");

  if(drawer){
    drawer.classList.remove("open");
  }
}


/* =========================================================
   UTILITIES
========================================================= */

function setText(id,value){

  const element =
    document.getElementById(id);

  if(element){
    element.textContent = value;
  }
}


function escapeHTML(value){

  return String(value)

    .replaceAll("&","&amp;")

    .replaceAll("<","&lt;")

    .replaceAll(">","&gt;")

    .replaceAll('"',"&quot;")

    .replaceAll("'","&#039;");
}


function formatDate(date){

  try{

    return new Date(date)
      .toLocaleDateString(
        "tr-TR",
        {
          day:"2-digit",
          month:"long",
          year:"numeric"
        }
      );

  }catch{

    return date;
  }
}


function daysUntil(date){

  const today =
    new Date();

  today.setHours(0,0,0,0);

  const target =
    new Date(date);

  target.setHours(0,0,0,0);

  return Math.ceil(
    (target - today) /
    (1000 * 60 * 60 * 24)
  );
}


/* =========================================================
   TOAST
========================================================= */

function toast(message){

  const container =
    document.getElementById("toastContainer");

  if(!container) return;

  const element =
    document.createElement("div");

  element.className = "toast";

  element.textContent = message;

  container.appendChild(element);

  setTimeout(() => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(10px)";

    setTimeout(
      () => element.remove(),
      250
    );

  },3000);
}


/* =========================================================
   CELEBRATION
========================================================= */

function celebrate(message){

  const box =
    document.createElement("div");

  box.style.position = "fixed";

  box.style.left = "50%";

  box.style.top = "50%";

  box.style.transform =
    "translate(-50%,-50%) scale(.8)";

  box.style.zIndex = "30000";

  box.style.padding = "30px";

  box.style.borderRadius = "25px";

  box.style.background =
    "white";

  box.style.color =
    "#171a2b";

  box.style.textAlign =
    "center";

  box.style.boxShadow =
    "0 30px 100px #0005";

  box.style.fontWeight =
    "900";

  box.innerHTML = `
    <div style="font-size:40px;margin-bottom:10px">
      🎉
    </div>

    <div style="font-size:20px">
      ${message}
    </div>
  `;

  document.body.appendChild(box);

  requestAnimationFrame(() => {

    box.style.transition = ".3s";

    box.style.transform =
      "translate(-50%,-50%) scale(1)";

  });

  setTimeout(() => {

    box.style.opacity = "0";

    box.style.transform =
      "translate(-50%,-50%) scale(.8)";

    setTimeout(
      () => box.remove(),
      300
    );

  },2200);
}


/* =========================================================
   RESET
========================================================= */

function resetData(){

  const ok =
    confirm(
      "Tüm DersTakip verilerin silinecek. Emin misin?"
    );

  if(!ok) return;

  const loggedIn =
    state.loggedIn;

  const user =
    state.user;

  state =
    structuredClone(defaultState);

  state.loggedIn = loggedIn;

  state.user = user;

  saveState();

  renderAll();

  toast("Veriler sıfırlandı.");
}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){

      closeMobileMenu();

    }

  }
);


/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

window.addEventListener(
  "error",
  event => {

    console.error(
      "DersTakip hatası:",
      event.error || event.message
    );

  }
);
