let currentUser = null;


// =====================================
// API
// =====================================

const API = "/api";


// =====================================
// BAŞLANGIÇ
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  loadApp
);


// =====================================
// API İSTEĞİ
// =====================================

async function api(
  action,
  options = {}
) {

  const response =
    await fetch(
      `${API}?action=${action}`,
      {
        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          ...(options.headers || {})
        },

        ...options
      }
    );


  const data =
    await response.json()
      .catch(() => ({}));


  return {
    response,
    data
  };

}


// =====================================
// UYGULAMAYI YÜKLE
// =====================================

async function loadApp() {

  try {

    const {
      response,
      data
    } =
      await api("me");


    if (
      !response.ok
    ) {

      showAuth();

      return;

    }


    currentUser =
      data.user;


    showApp();

    updateUser();

    await loadTasks();


  } catch (error) {

    console.error(error);

    showAuth();

  }

}


// =====================================
// LOGIN
// =====================================

async function login(event) {

  event.preventDefault();


  const email =
    document
      .getElementById(
        "loginEmail"
      )
      .value;


  const password =
    document
      .getElementById(
        "loginPassword"
      )
      .value;


  setAuthMessage(
    "Giriş yapılıyor..."
  );


  try {

    const {
      response,
      data
    } =
      await api(
        "login",
        {
          method: "POST",

          body:
            JSON.stringify({
              email,
              password
            })
        }
      );


    if (
      !response.ok
    ) {

      setAuthMessage(
        "❌ " +
        data.message
      );

      return;

    }


    currentUser =
      data.user;


    showApp();

    updateUser();

    await loadTasks();


  } catch (error) {

    console.error(error);

    setAuthMessage(
      "❌ Sunucuya bağlanılamadı."
    );

  }

}


// =====================================
// REGISTER
// =====================================

async function register(event) {

  event.preventDefault();


  const name =
    document
      .getElementById(
        "registerName"
      )
      .value;


  const email =
    document
      .getElementById(
        "registerEmail"
      )
      .value;


  const password =
    document
      .getElementById(
        "registerPassword"
      )
      .value;


  setAuthMessage(
    "Hesap oluşturuluyor..."
  );


  try {

    const {
      response,
      data
    } =
      await api(
        "register",
        {
          method: "POST",

          body:
            JSON.stringify({
              name,
              email,
              password
            })
        }
      );


    if (
      !response.ok
    ) {

      setAuthMessage(
        "❌ " +
        data.message
      );

      return;

    }


    currentUser =
      data.user;


    showApp();

    updateUser();

    await loadTasks();


  } catch (error) {

    console.error(error);

    setAuthMessage(
      "❌ Sunucuya bağlanılamadı."
    );

  }

}


// =====================================
// TASKS
// =====================================

async function loadTasks() {

  try {

    const {
      response,
      data
    } =
      await api(
        "tasks"
      );


    if (
      !response.ok
    ) {

      return;

    }


    renderTasks(
      data.tasks || []
    );


  } catch (error) {

    console.error(error);

  }

}


// =====================================
// TASK RENDER
// =====================================

function renderTasks(
  tasks
) {

  const list =
    document.getElementById(
      "taskList"
    );


  if (!list) {

    return;

  }


  list.innerHTML = "";


  if (
    tasks.length === 0
  ) {

    list.innerHTML = `
      <div
        style="
          padding:25px 0;
          text-align:center;
          color:#8991a5;
        "
      >
        Henüz görev yok. 🎯
      </div>
    `;

  }


  tasks.forEach(
    task => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "task" +
        (
          task.completed
            ? " completed"
            : ""
        );


      item.innerHTML = `

        <div
          class="checkbox"
          onclick="toggleTask(${task.id})"
        >
          ${
            task.completed
              ? "✓"
              : "☐"
          }
        </div>

        <div class="task-content">

          <div class="task-name">
            ${escapeHTML(
              task.title
            )}
          </div>

          <div class="task-subject">
            Öğrenci görevi
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

      `;


      list.appendChild(
        item
      );

    }
  );


  updateTaskStats(
    tasks
  );

}


// =====================================
// TASK EKLE
// =====================================

async function addTask() {

  const input =
    document.getElementById(
      "newTask"
    );


  const title =
    input.value.trim();


  if (!title) {

    showToast(
      "⚠️ Görev adı yaz!"
    );

    return;

  }


  const {
    response,
    data
  } =
    await api(
      "tasks",
      {
        method: "POST",

        body:
          JSON.stringify({
            title
          })
      }
    );


  if (
    !response.ok
  ) {

    showToast(
      "❌ " +
      data.message
    );

    return;

  }


  input.value = "";


  await loadTasks();


  showToast(
    "✅ Görev eklendi!"
  );

}


// =====================================
// TASK TAMAMLA
// =====================================

async function toggleTask(
  id
) {

  const {
    response,
    data
  } =
    await api(
      "tasks",
      {
        method: "PATCH",

        body:
          JSON.stringify({
            id
          })
      }
    );


  if (
    !response.ok
  ) {

    showToast(
      "❌ " +
      data.message
    );

    return;

  }


  await refreshUser();

  await loadTasks();


  showToast(
    data.completed
      ? "🎉 Görev tamamlandı! +50 XP"
      : "Görev yeniden açıldı."
  );

}


// =====================================
// TASK SİL
// =====================================

async function deleteTask(
  id
) {

  if (
    !confirm(
      "Bu görevi silmek istediğine emin misin?"
    )
  ) {

    return;

  }


  const {
    response,
    data
  } =
    await api(
      "tasks",
      {
        method: "DELETE",

        body:
          JSON.stringify({
            id
          })
      }
    );


  if (
    !response.ok
  ) {

    showToast(
      "❌ " +
      data.message
    );

    return;

  }


  await refreshUser();

  await loadTasks();


  showToast(
    "🗑️ Görev silindi."
  );

}


// =====================================
// USER
// =====================================

async function refreshUser() {

  const {
    response,
    data
  } =
    await api(
      "me"
    );


  if (
    response.ok
  ) {

    currentUser =
      data.user;

    updateUser();

  }

}


// =====================================
// USER UI
// =====================================

function updateUser() {

  if (!currentUser) {

    return;

  }


  const welcome =
    document.getElementById(
      "welcomeText"
    );


  if (welcome) {

    welcome.textContent =
      "Merhaba, " +
      currentUser.name +
      "! 👋";

  }


  const xp =
    Number(
      currentUser.xp
    ) || 0;


  const streak =
    Number(
      currentUser.streak
    ) || 0;


  const level =
    Math.floor(
      xp / 250
    ) + 1;


  const levelXP =
    xp % 250;


  const progress =
    Math.min(
      100,
      Math.round(
        levelXP / 250 * 100
      )
    );


  setText(
    "levelText",
    "Seviye " + level
  );


  setText(
    "xpText",
    levelXP +
    " / 250 XP"
  );


  const bar =
    document.getElementById(
      "progressBar"
    );


  if (bar) {

    bar.style.width =
      progress + "%";

  }


  setText(
    "statXP",
    xp
  );


  setText(
    "statStreak",
    streak
  );


  setText(
    "streakNumber",
    streak
  );

}


// =====================================
// TASK STATS
// =====================================

function updateTaskStats(
  tasks
) {

  const completed =
    tasks.filter(
      task =>
        task.completed
    ).length;


  const total =
    tasks.length;


  setText(
    "taskCounter",
    `${completed} / ${total}`
  );


  setText(
    "statTasks",
    completed
  );


  setText(
    "taskSummary",
    `${completed} / ${total} görev tamamlandı.`
  );

}


// =====================================
// AUTH UI
// =====================================

function showAuth() {

  const auth =
    document.getElementById(
      "authScreen"
    );


  const app =
    document.getElementById(
      "app"
    );


  if (auth) {

    auth.style.display =
      "flex";

  }


  if (app) {

    app.style.display =
      "none";

  }

}


function showApp() {

  const auth =
    document.getElementById(
      "authScreen"
    );


  const app =
    document.getElementById(
      "app"
    );


  if (auth) {

    auth.style.display =
      "none";

  }


  if (app) {

    app.style.display =
      "block";

  }

}


// =====================================
// LOGIN / REGISTER TABS
// =====================================

function showLogin() {

  document.getElementById(
    "loginForm"
  ).style.display =
    "block";


  document.getElementById(
    "registerForm"
  ).style.display =
    "none";


  document.getElementById(
    "loginTab"
  ).classList.add(
    "active"
  );


  document.getElementById(
    "registerTab"
  ).classList.remove(
    "active"
  );

}


function showRegister() {

  document.getElementById(
    "loginForm"
  ).style.display =
    "none";


  document.getElementById(
    "registerForm"
  ).style.display =
    "block";


  document.getElementById(
    "loginTab"
  ).classList.remove(
    "active"
  );


  document.getElementById(
    "registerTab"
  ).classList.add(
    "active"
  );

}


// =====================================
// MESSAGE
// =====================================

function setAuthMessage(
  text
) {

  const element =
    document.getElementById(
      "authMessage"
    );


  if (element) {

    element.textContent =
      text;

  }

}


// =====================================
// LOGOUT
// =====================================

async function logout() {

  await api(
    "logout",
    {
      method: "POST"
    }
  );


  currentUser =
    null;


  location.reload();

}


// =====================================
// TOAST
// =====================================

function showToast(
  text
) {

  const old =
    document.getElementById(
      "toast"
    );


  if (old) {

    old.remove();

  }


  const toast =
    document.createElement(
      "div"
    );


  toast.id =
    "toast";


  toast.textContent =
    text;


  toast.style.cssText = `
    position:fixed;
    right:20px;
    bottom:20px;
    background:#15182b;
    color:white;
    padding:14px 18px;
    border-radius:12px;
    z-index:99999;
    box-shadow:0 10px 30px #0004;
  `;


  document.body.appendChild(
    toast
  );


  setTimeout(
    () => toast.remove(),
    2500
  );

}


// =====================================
// HELPERS
// =====================================

function setText(
  id,
  value
) {

  const element =
    document.getElementById(id);


  if (element) {

    element.textContent =
      value;

  }

}


function escapeHTML(
  text
) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}
