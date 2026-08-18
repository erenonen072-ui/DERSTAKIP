const API = "/api";

let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];

let coins = Number(localStorage.getItem("dt_coins") || 0);
let pet = localStorage.getItem("dt_pet") || "🐣";
let purchased = JSON.parse(
  localStorage.getItem("dt_purchased") || "[]"
);

let timerSeconds = 1500;
let timerInterval = null;

const pageInfo = {
  home: ["Ana Sayfa 🏠","Bugünkü hedeflerini burada takip et."],
  tasks: ["Görevler ✅","Görevlerini tamamla ve XP kazan."],
  subjects: ["Dersler 📚","Derslerini düzenle ve takip et."],
  exams: ["Sınavlar 📅","Sınavlarına kalan zamanı takip et."],
  focus: ["Odaklanma ⏱️","Çalışma süreni başlat ve odaklan."],
  stats: ["İstatistikler 📊","Çalışma performansını incele."],
  coach: ["Ders Koçu 🤖","Bugün ne çalışacağını birlikte belirleyelim."],
  pet: ["Evcil Hayvan 🐣","Çalıştıkça dostunu geliştir."],
  shop: ["Coin Mağazası 🛍️","Coinlerini kullanarak ödüller aç."],
  badges: ["Başarılar 🏆","Kazandığın başarıları gör."],
  profile: ["Profil 👤","Profilini ve görünümünü düzenle."]
};

const menuItems = [
 ["home","🏠","Ana Sayfa"],
 ["tasks","✅","Görevler"],
 ["subjects","📚","Dersler"],
 ["exams","📅","Sınavlar"],
 ["focus","⏱️","Odaklan"],
 ["stats","📊","İstatistikler"],
 ["coach","🤖","Ders Koçu"],
 ["pet","🐣","Evcil Hayvan"],
 ["shop","🛍️","Mağaza"],
 ["badges","🏆","Rozetler"],
 ["profile","👤","Profil"]
];

async function api(action, options = {}) {
 try {
  const response = await fetch(
   `${API}?action=${encodeURIComponent(action)}`,
   {
    credentials:"include",
    headers:{
     "Content-Type":"application/json",
     ...(options.headers || {})
    },
    ...options
   }
  );

  const data = await response.json().catch(()=>({}));

  return {response,data};

 } catch(error) {
  console.error(error);

  return {
   response:{ok:false,status:0},
   data:{message:"Sunucuya bağlanılamadı."}
  };
 }
}

function showLogin(){
 document.getElementById("loginForm").style.display="block";
 document.getElementById("registerForm").style.display="none";

 document.getElementById("loginTab").classList.add("active");
 document.getElementById("registerTab").classList.remove("active");

 document.getElementById("authMessage").textContent="";
}

function showRegister(){
 document.getElementById("loginForm").style.display="none";
 document.getElementById("registerForm").style.display="block";

 document.getElementById("loginTab").classList.remove("active");
 document.getElementById("registerTab").classList.add("active");

 document.getElementById("authMessage").textContent="";
}

async function login(event){
 event.preventDefault();

 const email =
  document.getElementById("loginEmail").value;

 const password =
  document.getElementById("loginPassword").value;

 const result = await api("login",{
  method:"POST",
  body:JSON.stringify({email,password})
 });

 if(!result.data.success){
  document.getElementById("authMessage").textContent =
   result.data.message || "Giriş başarısız.";
  return;
 }

 currentUser=result.data.user;

 await startApp();
}

async function register(event){
 event.preventDefault();

 const name =
  document.getElementById("registerName").value;

 const email =
  document.getElementById("registerEmail").value;

 const password =
  document.getElementById("registerPassword").value;

 const result = await api("register",{
  method:"POST",
  body:JSON.stringify({
   name,
   email,
   password
  })
 });

 if(!result.data.success){
  document.getElementById("authMessage").textContent =
   result.data.message || "Kayıt başarısız.";
  return;
 }

 currentUser=result.data.user;

 await startApp();
}

async function startApp(){

 document.getElementById("authScreen").style.display="none";
 document.getElementById("app").style.display="block";

 createMenus();

 updateUserUI();

 await Promise.all([
  loadTasks(),
  loadSubjects(),
  loadExams()
 ]);

 updateAll();
}

function createMenus(){

 const desktop=document.getElementById("desktopMenu");
 const mobile=document.getElementById("mobileMenuButtons");

 desktop.innerHTML="";
 mobile.innerHTML="";

 menuItems.forEach(item=>{

  const [id,icon,label]=item;

  const d=document.createElement("button");

  d.innerHTML=`${icon} ${label}`;
  d.onclick=()=>showPage(id,d);

  desktop.appendChild(d);

  const m=document.createElement("button");

  m.innerHTML=`${icon} ${label}`;
  m.onclick=()=>{
   showPage(id,m);
   closeMobileMenu();
  };

  mobile.appendChild(m);
 });
}

function showPage(id,button){

 document.querySelectorAll(".page")
  .forEach(p=>p.classList.remove("active"));

 const page=document.getElementById(`page-${id}`);

 if(page) page.classList.add("active");

 document.querySelectorAll(".menu button,.mobile-panel button")
  .forEach(b=>b.classList.remove("active"));

 if(button) button.classList.add("active");

 document.getElementById("pageTitle").textContent =
  pageInfo[id][0];

 document.getElementById("pageSubtitle").textContent =
  pageInfo[id][1];

 if(id==="stats") updateStats();
 if(id==="coach") coachAdvice();
 if(id==="profile") updateProfile();

 window.scrollTo({top:0,behavior:"smooth"});
}

function goHome(){
 showPage("home");
}

function showTasks(){
 showPage("tasks");
}

function showSubjects(){
 showPage("subjects");
}

function showExams(){
 showPage("exams");
}

function showFocus(){
 showPage("focus");
}

function showStats(){
 showPage("stats");
}

function showProfile(){
 showPage("profile");
}

function toggleMobileMenu(){
 document.getElementById("mobilePanel")
  .classList.toggle("open");

 document.getElementById("menuOverlay")
  .classList.toggle("show");
}

function closeMobileMenu(){
 document.getElementById("mobilePanel")
  .classList.remove("open");

 document.getElementById("menuOverlay")
  .classList.remove("show");
}

async function logout(){

 await api("logout",{
  method:"POST"
 });

 location.reload();
}

function updateUserUI(){

 if(!currentUser) return;

 const name=currentUser.name || "Öğrenci";

 document.getElementById("profileName").textContent=name;

 document.getElementById("welcomeText").textContent=
  `Hoş geldin, ${name}! 👋`;

 updateLevel();
}

function updateLevel(){

 const xp=Number(currentUser?.xp || 0);

 const level=Math.max(
  1,
  Math.floor(xp/250)+1
 );

 document.getElementById("levelText").textContent=
  `Seviye ${level}`;

 document.getElementById("profileLevel").textContent=
  level;

 document.getElementById("statXP").textContent=xp;
 document.getElementById("profileXP").textContent=xp;

 const levelXP=(level-1)*250;

 const progress=
  Math.min(100,
   ((xp-levelXP)/250)*100
  );

 document.getElementById("progressBar").style.width=
  `${progress}%`;

 document.getElementById("xpText").textContent=
  `${xp} XP • Sonraki seviyeye ${Math.max(0,level*250-xp)} XP`;

 document.getElementById("bigXP").textContent=xp;
}

async function loadTasks(){

 const result=await api("tasks");

 if(result.data.success){
  tasks=result.data.tasks || [];
  renderTasks();
 }
}

function renderTasks(){

 const containers=[
  document.getElementById("taskList"),
  document.getElementById("taskList2")
 ];

 containers.forEach(container=>{
  if(!container)return;

  container.innerHTML="";

  tasks.forEach(task=>{

   const div=document.createElement("div");

   div.className=
    `task ${task.completed ? "completed":""}`;

   div.innerHTML=`
    <div class="checkbox"
      onclick="toggleTask(${task.id})">
      ${task.completed ? "✓":""}
    </div>

    <div class="task-content">
      <div class="task-name">
       ${escapeHtml(task.title)}
      </div>

      <div class="task-subject">
       Görev • +${task.xp || 50} XP
      </div>
    </div>

    <div class="task-xp">
     +${task.xp || 50} XP
    </div>

    <button class="delete-task"
      onclick="deleteTask(${task.id})">
      🗑️
    </button>
   `;

   container.appendChild(div);
  });
 });

 const completed=tasks.filter(t=>t.completed).length;

 document.getElementById("taskCounter").textContent=
  `${completed} / ${tasks.length}`;

 document.getElementById("taskSummary").textContent=
  tasks.length
   ? `${completed}/${tasks.length} görev tamamlandı. Devam et! 🚀`
   : "Bugün için bir görev ekle.";
}

async function addTask(inputId="newTask"){

 const input=document.getElementById(inputId);

 const title=input.value.trim();

 if(!title)return;

 const result=await api("tasks",{
  method:"POST",
  body:JSON.stringify({title})
 });

 if(result.data.success){

  input.value="";

  tasks.push(result.data.task);

  renderTasks();

  toast("🎯 Yeni görev eklendi!");
 }
}

async function toggleTask(id){

 const result=await api("tasks",{
  method:"PATCH",
  body:JSON.stringify({id})
 });

 if(result.data.success){

  const task=tasks.find(t=>Number(t.id)===Number(id));

  if(task){
   task.completed=result.data.completed;
  }

  if(result.data.completed){
   addCoins(10);
   toast("🎉 GÖREV TAMAMLANDI! +50 XP • +10 🪙");
  }else{
   toast("Görev tekrar açıldı.");
  }

  await refreshUser();
  renderTasks();
  updateAll();
 }
}

async function deleteTask(id){

 const result=await api("tasks",{
  method:"DELETE",
  body:JSON.stringify({id})
 });

 if(result.data.success){

  tasks=tasks.filter(t=>Number(t.id)!==Number(id));

  renderTasks();

  await refreshUser();

  updateAll();

  toast("🗑️ Görev silindi.");
 }
}

async function loadSubjects(){

 const result=await api("subjects");

 if(result.data.success){
  subjects=result.data.subjects || [];
  renderSubjects();
 }
}

function renderSubjects(){

 const list=document.getElementById("subjectList");

 list.innerHTML="";

 subjects.forEach(subject=>{

  const div=document.createElement("div");

  div.className="subject";

  div.innerHTML=`
   <div style="font-size:40px">📚</div>
   <h3>${escapeHtml(subject.name)}</h3>
   <p style="color:var(--muted);margin:8px">
    Dersin hazır! 🎯
   </p>
   <button class="outline-btn"
    onclick="deleteSubject(${subject.id})">
    Sil
   </button>
  `;

  list.appendChild(div);
 });
}

async function addSubject(){

 const input=document.getElementById("newSubject");

 const name=input.value.trim();

 if(!name)return;

 const result=await api("subjects",{
  method:"POST",
  body:JSON.stringify({
   name,
   color:"#6658f5"
  })
 });

 if(result.data.success){

  input.value="";

  subjects.push(result.data.subject);

  renderSubjects();

  toast("📚 Ders eklendi!");
 }
}

async function deleteSubject(id){

 const result=await api("subjects",{
  method:"DELETE",
  body:JSON.stringify({id})
 });

 if(result.data.success){

  subjects=subjects.filter(
   s=>Number(s.id)!==Number(id)
  );

  renderSubjects();

  toast("Ders silindi.");
 }
}

async function loadExams(){

 const result=await api("exams");

 if(result.data.success){
  exams=result.data.exams || [];
  renderExams();
 }
}

function renderExams(){

 const list=document.getElementById("examList");

 list.innerHTML="";

 exams.forEach(exam=>{

  const days=getDaysLeft(exam.exam_date);

  let cls="green";

  if(days<=1)cls="red";
  else if(days<=3)cls="orange";
  else if(days<=7)cls="yellow";

  const div=document.createElement("div");

  div.className=`exam ${cls}`;

  div.innerHTML=`
   <div>
    <h3>${escapeHtml(exam.title)}</h3>
    <p style="color:var(--muted);margin-top:5px">
     ${exam.topic || "Konu belirtilmedi"}
    </p>
   </div>

   <div>
    <div class="exam-days">
     ${days < 0 ? "Geçti":days+" gün"}
    </div>

    <button class="outline-btn"
     onclick="deleteExam(${exam.id})">
     🗑️
    </button>
   </div>
  `;

  list.appendChild(div);
 });
}

async function addExam(){

 const title=document.getElementById("examTitle").value.trim();

 const date=document.getElementById("examDate").value;

 const topic=document.getElementById("examTopic").value.trim();

 if(!title || !date){
  toast("Sınav adı ve tarih gerekli.");
  return;
 }

 const result=await api("exams",{
  method:"POST",
  body:JSON.stringify({
   title,
   exam_date:date,
   topic
  })
 });

 if(result.data.success){

  document.getElementById("examTitle").value="";
  document.getElementById("examDate").value="";
  document.getElementById("examTopic").value="";

  exams.push(result.data.exam);

  renderExams();

  toast("📅 Sınav eklendi!");
 }
}

async function deleteExam(id){

 const result=await api("exams",{
  method:"DELETE",
  body:JSON.stringify({id})
 });

 if(result.data.success){

  exams=exams.filter(
   e=>Number(e.id)!==Number(id)
  );

  renderExams();

  toast("Sınav silindi.");
 }
}

function getDaysLeft(date){

 const today=new Date();

 today.setHours(0,0,0,0);

 const target=new Date(date);

 target.setHours(0,0,0,0);

 return Math.ceil(
  (target-today)/(1000*60*60*24)
 );
}

function startTimer(){

 if(timerInterval)return;

 document.getElementById("focusStatus").textContent=
  "Odaklanıyorsun... Telefonunu bırak! 🚀";

 timerInterval=setInterval(async()=>{

  timerSeconds--;

  updateTimer();

  if(timerSeconds<=0){

   clearInterval(timerInterval);

   timerInterval=null;

   timerSeconds=1500;

   await finishFocus();
  }

 },1000);
}

function pauseTimer(){

 clearInterval(timerInterval);

 timerInterval=null;

 document.getElementById("focusStatus").textContent=
  "Duraklatıldı. Hazır olduğunda devam et.";
}

function resetTimer(){

 clearInterval(timerInterval);

 timerInterval=null;

 timerSeconds=1500;

 updateTimer();

 document.getElementById("focusStatus").textContent=
  "25 dakika çalış, +25 XP kazan!";
}

function updateTimer(){

 const min=Math.floor(timerSeconds/60);
 const sec=timerSeconds%60;

 document.getElementById("timer").textContent=
  `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

async function finishFocus(){

 const result=await api("sessions",{
  method:"POST",
  body:JSON.stringify({
   duration_minutes:25
  })
 });

 if(result.data.success){

  await refreshUser();

  addCoins(15);

  updateAll();

  toast("🎉 ODAKLANMA TAMAMLANDI! +25 XP • +15 🪙");

  document.getElementById("focusStatus").textContent=
   "Harika! Bir odaklanma daha tamamlandı. 🔥";
 }
}

function addCoins(amount){

 coins+=Number(amount);

 localStorage.setItem(
  "dt_coins",
  String(coins)
 );

 updateCoins();
}

function updateCoins(){

 document.getElementById("statCoins").textContent=coins;
 document.getElementById("shopCoins").textContent=coins;
 document.getElementById("profileCoins").textContent=coins;
}

function buyItem(item,cost){

 if(purchased.includes(item)){
  toast("Bu eşyaya zaten sahipsin. ✨");
  return;
 }

 if(coins<cost){
  toast(`❌ Yeterli coin yok. ${cost} 🪙 gerekiyor.`);
  return;
 }

 coins-=cost;

 purchased.push(item);

 localStorage.setItem("dt_coins",coins);
 localStorage.setItem(
  "dt_purchased",
  JSON.stringify(purchased)
 );

 updateCoins();

 toast("🎉 Eşya satın alındı!");

 applyPurchasedItem(item);
}

function applyPurchasedItem(item){

 if(item==="space"){
  document.body.style.background=
   "radial-gradient(circle at top,#302b63,#0f1020)";
 }

 if(item==="rainbow"){
  document.documentElement.style.setProperty(
   "--primary","#ff4f81"
  );
 }

 if(item==="purple"){
  document.documentElement.style.setProperty(
   "--primary","#9b59ff"
  );
 }

 if(item==="sparkle"){
  document.documentElement.style.setProperty(
   "--primary","#ff9f43"
  );
 }

 if(item==="crown"){
  document.getElementById("topAvatar").textContent="👑";
  document.getElementById("profileAvatar").textContent="👑";
 }

 if(item==="legend"){
  document.getElementById("topAvatar").textContent="👑";
  document.getElementById("profileAvatar").textContent="👑";
 }
}

function choosePet(newPet){

 pet=newPet;

 localStorage.setItem("dt_pet",pet);

 document.getElementById("homePet").textContent=pet;
 document.getElementById("bigPet").textContent=pet;
 document.getElementById("profileAvatar").textContent=pet;

 toast(`${pet} artık senin evcil hayvanın! 🐣`);
}

function updatePet(){

 document.getElementById("homePet").textContent=pet;
 document.getElementById("bigPet").textContent=pet;
}

function dailyReward(){

 const key=
  "dt_reward_"+new Date().toISOString().slice(0,10);

 if(localStorage.getItem(key)){
  toast("🎁 Bugünkü ödülünü zaten aldın.");
  return;
 }

 localStorage.setItem(key,"1");

 addCoins(25);

 toast("🎁 GÜNLÜK ÖDÜL! +25 🪙");
}

function coachAdvice(){

 const messages=[
  "Bugün Matematikten 25 dakika çalışman harika olur! 🎯",
  "Bugün en zor dersinden başlamayı dene. 💪",
  "25 dakika odaklan, sonra kısa bir mola ver. ☕",
  "Bugün bir sınav konusunu tekrar etmen çok faydalı olabilir. 📚",
  "3 küçük görev tamamla ve XP kazan! 🚀",
  "Bugün dünkü senden biraz daha iyi olmaya çalış. 🔥"
 ];

 const message=
  messages[Math.floor(Math.random()*messages.length)];

 document.getElementById("coachMessage").textContent=message;
 document.getElementById("coachPageMessage").textContent=message;
}

async function updateStats(){

 const result=await api("stats");

 if(!result.data.success)return;

 const stats=result.data.stats;

 document.getElementById("bigMinutes").textContent=
  stats.sessions?.minutes || 0;
}

async function refreshUser(){

 const result=await api("me");

 if(result.data.success){

  currentUser=result.data.user;

  updateUserUI();
 }
}

function updateProfile(){

 document.getElementById("profileName").textContent=
  currentUser?.name || "Öğrenci";

 document.getElementById("profileXP").textContent=
  currentUser?.xp || 0;

 document.getElementById("profileCoins").textContent=
  coins;

 document.getElementById("profileAvatar").textContent=
  pet;
}

function updateAll(){

 updateLevel();
 updateCoins();
 updatePet();

 const streak=Number(currentUser?.streak || 0);

 document.getElementById("statStreak").textContent=streak;
 document.getElementById("streakNumber").textContent=streak;
 document.getElementById("bigStreak").textContent=streak;

 renderTasks();
 renderSubjects();
 renderExams();

 updateProfile();
 updateStats();

 coachAdvice();

 purchased.forEach(applyPurchasedItem);
}

function setTheme(theme){

 if(theme==="dark"){
  document.body.classList.add("dark");
  localStorage.setItem("dt_theme","dark");
 }else{
  document.body.classList.remove("dark");
  localStorage.setItem("dt_theme","light");
 }
}

function loadTheme(){

 const theme=
  localStorage.getItem("dt_theme");

 if(theme==="dark"){
  document.body.classList.add("dark");
 }
}

function toast(message){

 const el=document.getElementById("toast");

 el.textContent=message;

 el.classList.add("show");

 setTimeout(()=>{
  el.classList.remove("show");
 },2800);
}

function escapeHtml(text){

 return String(text)
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;")
  .replaceAll("'","&#039;");
}

loadTheme();

(async function(){

 const result=await api("me");

 if(result.data.success){

  currentUser=result.data.user;

  await startApp();

 }else{

  document.getElementById("authScreen").style.display="flex";
  document.getElementById("app").style.display="none";
 }

})();
