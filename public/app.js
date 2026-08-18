// ==========================================
// DERS TAKİP API
// ==========================================

const API = "/api/index";

// ==========================================
// API İSTEĞİ
// ==========================================

async function api(action, options = {}) {
  try {
    const config = {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };

    // Body obje ise JSON'a çevir
    if (
      config.body &&
      typeof config.body !== "string"
    ) {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(
      `${API}?action=${encodeURIComponent(action)}`,
      config
    );

    const data = await response
      .json()
      .catch(() => ({}));

    return {
      response,
      data
    };

  } catch (error) {
    console.error("API HATASI:", error);

    return {
      response: {
        ok: false,
        status: 0
      },
      data: {
        success: false,
        message: "Sunucuya bağlanılamadı."
      }
    };
  }
}
let currentUser = null;

const API = "/api";

document.addEventListener(
  "DOMContentLoaded",
  loadApp
);

// ==========================================
// API
// ==========================================

async function api(
  action,
  options = {}
) {
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

    const data =
      await response.json()
        .catch(() => ({}));

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
        message:
          "Sunucuya bağlanılamadı."
      }
    };
  }
}

// ==========================================
// LOAD APP
// ==========================================

async function loadApp() {

  const result =
    await api("me");

  if (!result.response.ok) {
    showAuth();
    return;
  }

  currentUser =
    result.data.user;

  showApp();

  updateUser();

  await loadTasks();
}

// ==========================================
// LOGIN
// ==========================================

async function login(event) {

  event.preventDefault();

  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "loginPassword"
    ).value;

  setAuthMessage(
    "Giriş yapılıyor..."
  );

  const result =
    await api(
      "login",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      }
    );

  if (!result.response.ok) {

    setAuthMessage(
      "❌ " +
      (
        result.data.message ||
        "Giriş başarısız."
      )
    );

    return;
  }

  currentUser =
    result.data.user;

  showApp();

  updateUser();

  await loadTasks();

  showToast(
    "🎉 Hoş geldin!"
  );
}

// ==========================================
// REGISTER
// ==========================================

async function register(event) {

  event.preventDefault();

  const name =
    document.getElementById(
      "registerName"
    ).value.trim();

  const email =
    document.getElementById(
      "registerEmail"
    ).value.trim();

  const password =
    document.getElementById(
      "registerPassword"
    ).value;

  setAuthMessage(
    "Hesap oluşturuluyor..."
  );

  const result =
    await api(
      "register",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

  if (!result.response.ok) {

    setAuthMessage(
      "❌ " +
      (
        result.data.message ||
        "Kayıt başarısız."
      )
    );

    return;
  }

  currentUser =
    result.data.user;

  showApp();

  updateUser();

  await loadTasks();

  showToast(
    "🎉 Hesabın oluşturuldu!"
  );
}

// ==========================================
// TASKS
// ==========================================

async function loadTasks() {

  const result =
    await api("tasks");

  if (!result.response.ok) {
    return;
  }

  renderTasks(
    result.data.tasks || []
  );
}

function renderTasks(tasks) {

  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = "";

  if (tasks.length === 0) {

    list.innerHTML = `
      <div
        style="
          padding:30px 0;
          text-align:center;
          color:#8991a5;
        "
      >
        Henüz görev yok. 🎯
      </div>
    `;

  }

  tasks.forEach(task => {

    const item =
      document.createElement("div");

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
          ${escapeHTML(task.title)}
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
        aria-label="Görevi sil"
      >
        🗑️
      </button>

    `;

    list.appendChild(item);
  });

  updateTaskStats(tasks);
}

// ==========================================
// ADD TASK
// ==========================================

async function addTask() {

  const input =
    document.getElementById(
      "newTask"
    );

  if (!input) return;

  const title =
    input.value.trim();

  if (!title) {

    showToast(
      "⚠️ Görev adı yaz!"
    );

    input.focus();

    return;
  }

  const result =
    await api(
      "tasks",
      {
        method: "POST",
        body: JSON.stringify({
          title
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ " +
      (
        result.data.message ||
        "Görev eklenemedi."
      )
    );

    return;
  }

  input.value = "";

  await loadTasks();

  showToast(
    "✅ Görev eklendi!"
  );
}

// ==========================================
// TOGGLE TASK
// ==========================================

async function toggleTask(id) {

  const result =
    await api(
      "tasks",
      {
        method: "PATCH",
        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ " +
      (
        result.data.message ||
        "İşlem başarısız."
      )
    );

    return;
  }

  await refreshUser();

  await loadTasks();

  if (result.data.completed) {

    showToast(
      "🎉 Görev tamamlandı! +50 XP"
    );

  } else {

    showToast(
      "↩️ Görev yeniden açıldı."
    );
  }
}

// ==========================================
// DELETE TASK
// ==========================================

async function deleteTask(id) {

  if (
    !confirm(
      "Bu görevi silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  const result =
    await api(
      "tasks",
      {
        method: "DELETE",
        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ " +
      (
        result.data.message ||
        "Görev silinemedi."
      )
    );

    return;
  }

  await refreshUser();

  await loadTasks();

  showToast(
    "🗑️ Görev silindi."
  );
}

// ==========================================
// USER
// ==========================================

async function refreshUser() {

  const result =
    await api("me");

  if (result.response.ok) {

    currentUser =
      result.data.user;

    updateUser();
  }
}

function updateUser() {

  if (!currentUser) return;

  setText(
    "welcomeText",
    "Merhaba, " +
    currentUser.name +
    "! 👋"
  );

  const xp =
    Number(currentUser.xp) || 0;

  const streak =
    Number(currentUser.streak) || 0;

  const level =
    Math.floor(xp / 250) + 1;

  const levelXP =
    xp % 250;

  const progress =
    Math.min(
      100,
      Math.round(
        (levelXP / 250) * 100
      )
    );

  setText(
    "levelText",
    "Seviye " + level
  );

  setText(
    "xpText",
    `${levelXP} / 250 XP`
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

// ==========================================
// TASK STATS
// ==========================================

function updateTaskStats(tasks) {

  const completed =
    tasks.filter(
      task => task.completed
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

// ==========================================
// SCREEN
// ==========================================

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
    auth.style.display = "flex";
  }

  if (app) {
    app.style.display = "none";
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
    auth.style.display = "none";
  }

  if (app) {
    app.style.display = "block";
  }
}

// ==========================================
// AUTH TABS
// ==========================================

function showLogin() {

  document.getElementById(
    "loginForm"
  ).style.display = "block";

  document.getElementById(
    "registerForm"
  ).style.display = "none";

  document.getElementById(
    "loginTab"
  ).classList.add("active");

  document.getElementById(
    "registerTab"
  ).classList.remove("active");
}

function showRegister() {

  document.getElementById(
    "loginForm"
  ).style.display = "none";

  document.getElementById(
    "registerForm"
  ).style.display = "block";

  document.getElementById(
    "loginTab"
  ).classList.remove("active");

  document.getElementById(
    "registerTab"
  ).classList.add("active");
}

// ==========================================
// NAVIGATION
// ==========================================

function clearActiveButtons() {

  document
    .querySelectorAll(
      ".menu button, .mobile-nav button"
    )
    .forEach(button => {
      button.classList.remove(
        "active"
      );
    });
}

function activateButton(button) {

  clearActiveButtons();

  if (button) {
    button.classList.add(
      "active"
    );
  }
}

function goHome(button) {

  activateButton(button);

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  if (dynamic) {
    dynamic.style.display =
      "none";
  }

  const tasks =
    document.getElementById(
      "tasksSection"
    );

  if (tasks) {
    tasks.style.display =
      "block";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ==========================================
// GÖREVLER
// ==========================================

function showTasks(button) {

  activateButton(button);

  const tasks =
    document.getElementById(
      "tasksSection"
    );

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  if (tasks) {
    tasks.style.display =
      "block";
  }

  if (dynamic) {
    dynamic.style.display =
      "none";
  }

  document
    .getElementById("newTask")
    ?.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ==========================================
// DERSLER
// ==========================================

async function showSubjects(button) {

  activateButton(button);

  const tasks =
    document.getElementById(
      "tasksSection"
    );

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  tasks.style.display =
    "none";

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `
    <div class="card-title">
      <h2>📚 Derslerim</h2>
    </div>

    <div
      id="subjectsList"
      style="
        color:#7d8498;
        margin-bottom:20px;
      "
    >
      Dersler yükleniyor...
    </div>

    <div
      style="
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      "
    >

      <input
        id="subjectName"
        placeholder="Yeni ders adı..."
        style="
          flex:1;
          min-width:180px;
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
          outline:none;
        "
      >

      <button
        onclick="addSubject()"
        style="
          border:none;
          background:#6658f5;
          color:white;
          padding:12px 18px;
          border-radius:11px;
          font-weight:800;
        "
      >
        + Ders Ekle
      </button>

    </div>
  `;

  await loadSubjects();
}

// ==========================================
// SUBJECTS
// ==========================================

async function loadSubjects() {

  const result =
    await api("subjects");

  const list =
    document.getElementById(
      "subjectsList"
    );

  if (!list) return;

  if (!result.response.ok) {

    list.textContent =
      "Dersler yüklenemedi.";

    return;
  }

  const subjects =
    result.data.subjects || [];

  if (subjects.length === 0) {

    list.innerHTML = `
      <div
        style="
          text-align:center;
          padding:25px;
        "
      >
        Henüz ders eklemedin. 📚
      </div>
    `;

    return;
  }

  list.innerHTML =
    subjects.map(subject => `

      <div
        style="
          display:flex;
          align-items:center;
          gap:12px;
          padding:15px 0;
          border-bottom:1px solid #edf0f5;
        "
      >

        <div
          style="
            width:12px;
            height:12px;
            border-radius:50%;
            background:${escapeAttribute(
              subject.color
            )};
          "
        ></div>

        <strong>
          ${escapeHTML(subject.name)}
        </strong>

        <button
          onclick="deleteSubject(${subject.id})"
          style="
            margin-left:auto;
            border:none;
            background:transparent;
          "
        >
          🗑️
        </button>

      </div>

    `).join("");
}

async function addSubject() {

  const input =
    document.getElementById(
      "subjectName"
    );

  const name =
    input.value.trim();

  if (!name) {

    showToast(
      "⚠️ Ders adı yaz!"
    );

    return;
  }

  const result =
    await api(
      "subjects",
      {
        method: "POST",
        body: JSON.stringify({
          name
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ " +
      (
        result.data.message ||
        "Ders eklenemedi."
      )
    );

    return;
  }

  input.value = "";

  await loadSubjects();

  showToast(
    "📚 Ders eklendi!"
  );
}

async function deleteSubject(id) {

  if (
    !confirm(
      "Bu dersi silmek istiyor musun?"
    )
  ) {
    return;
  }

  const result =
    await api(
      "subjects",
      {
        method: "DELETE",
        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ Ders silinemedi."
    );

    return;
  }

  await loadSubjects();

  showToast(
    "🗑️ Ders silindi."
  );
}

// ==========================================
// SINAVLAR
// ==========================================

async function showExams(button) {

  activateButton(button);

  const tasks =
    document.getElementById(
      "tasksSection"
    );

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  tasks.style.display =
    "none";

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div class="card-title">
      <h2>📅 Sınavlarım</h2>
    </div>

    <div id="examsList">
      Sınavlar yükleniyor...
    </div>

    <div
      style="
        margin-top:20px;
        display:grid;
        gap:10px;
      "
    >

      <input
        id="examTitle"
        placeholder="Sınav adı"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <input
        id="examDate"
        type="datetime-local"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <input
        id="examTopic"
        placeholder="Konu (isteğe bağlı)"
        style="
          padding:12px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <button
        onclick="addExam()"
        style="
          border:none;
          background:#6658f5;
          color:white;
          padding:13px;
          border-radius:11px;
          font-weight:800;
        "
      >
        + Sınav Ekle
      </button>

    </div>
  `;

  await loadExams();
}

async function loadExams() {

  const result =
    await api("exams");

  const list =
    document.getElementById(
      "examsList"
    );

  if (!list) return;

  if (!result.response.ok) {

    list.textContent =
      "Sınavlar yüklenemedi.";

    return;
  }

  const exams =
    result.data.exams || [];

  if (exams.length === 0) {

    list.innerHTML = `
      <div
        style="
          text-align:center;
          padding:25px;
          color:#7d8498;
        "
      >
        Henüz sınav eklemedin. 📅
      </div>
    `;

    return;
  }

  list.innerHTML =
    exams.map(exam => {

      const date =
        new Date(exam.exam_date);

      return `

        <div
          style="
            padding:15px 0;
            border-bottom:1px solid #edf0f5;
            display:flex;
            align-items:center;
            gap:12px;
          "
        >

          <div style="font-size:25px">
            📅
          </div>

          <div>

            <strong>
              ${escapeHTML(exam.title)}
            </strong>

            <div
              style="
                color:#8991a5;
                font-size:12px;
                margin-top:4px;
              "
            >
              ${date.toLocaleString("tr-TR")}
            </div>

            ${
              exam.topic
                ? `
                  <div
                    style="
                      color:#8991a5;
                      font-size:12px;
                    "
                  >
                    ${escapeHTML(exam.topic)}
                  </div>
                `
                : ""
            }

          </div>

          <button
            onclick="deleteExam(${exam.id})"
            style="
              margin-left:auto;
              border:none;
              background:transparent;
            "
          >
            🗑️
          </button>

        </div>

      `;
    }).join("");
}

async function addExam() {

  const title =
    document.getElementById(
      "examTitle"
    ).value.trim();

  const exam_date =
    document.getElementById(
      "examDate"
    ).value;

  const topic =
    document.getElementById(
      "examTopic"
    ).value.trim();

  if (!title || !exam_date) {

    showToast(
      "⚠️ Sınav adı ve tarih gerekli."
    );

    return;
  }

  const result =
    await api(
      "exams",
      {
        method: "POST",
        body: JSON.stringify({
          title,
          exam_date,
          topic
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ Sınav eklenemedi."
    );

    return;
  }

  await loadExams();

  showToast(
    "📅 Sınav eklendi!"
  );
}

async function deleteExam(id) {

  if (
    !confirm(
      "Bu sınavı silmek istiyor musun?"
    )
  ) {
    return;
  }

  const result =
    await api(
      "exams",
      {
        method: "DELETE",
        body: JSON.stringify({
          id
        })
      }
    );

  if (!result.response.ok) {

    showToast(
      "❌ Sınav silinemedi."
    );

    return;
  }

  await loadExams();

  showToast(
    "🗑️ Sınav silindi."
  );
}

// ==========================================
// ODAKLAN
// ==========================================

let focusSeconds = 25 * 60;
let focusTimer = null;

function showFocus(button) {

  activateButton(button);

  document.getElementById(
    "tasksSection"
  ).style.display = "none";

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `

    <div
      style="
        text-align:center;
        padding:15px 0 5px;
      "
    >

      <div
        style="
          font-size:14px;
          color:#7d8498;
          margin-bottom:8px;
        "
      >
        ⏱️ Odaklanma Modu
      </div>

      <div
        id="focusTimer"
        style="
          font-size:clamp(55px,10vw,90px);
          font-weight:950;
          letter-spacing:2px;
          margin:10px 0 20px;
        "
      >
        25:00
      </div>

      <div
        style="
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
        "
      >

        <button
          onclick="startFocus()"
          style="
            border:none;
            background:#6658f5;
            color:white;
            padding:13px 20px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ▶ Başlat
        </button>

        <button
          onclick="pauseFocus()"
          style="
            border:none;
            background:#eef0f7;
            color:#333;
            padding:13px 20px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ⏸ Duraklat
        </button>

        <button
          onclick="resetFocus()"
          style="
            border:none;
            background:#fff0f2;
            color:#ff5367;
            padding:13px 20px;
            border-radius:12px;
            font-weight:900;
          "
        >
          ↻ Sıfırla
        </button>

      </div>

      <p
        style="
          color:#7d8498;
          margin-top:20px;
        "
      >
        25 dakika odaklan ve XP kazan! 🚀
      </p>

    </div>

  `;

  resetFocus();
}

function updateFocusDisplay() {

  const element =
    document.getElementById(
      "focusTimer"
    );

  if (!element) return;

  const minutes =
    Math.floor(
      focusSeconds / 60
    );

  const seconds =
    focusSeconds % 60;

  element.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

function startFocus() {

  if (focusTimer) return;

  focusTimer =
    setInterval(
      async () => {

        focusSeconds--;

        updateFocusDisplay();

        if (focusSeconds <= 0) {

          pauseFocus();

          await finishFocus();

          showToast(
            "🎉 Odaklanma tamamlandı! XP kazandın."
          );

          resetFocus();
        }

      },
      1000
    );
}

function pauseFocus() {

  if (focusTimer) {

    clearInterval(
      focusTimer
    );

    focusTimer = null;
  }
}

function resetFocus() {

  pauseFocus();

  focusSeconds =
    25 * 60;

  updateFocusDisplay();
}

async function finishFocus() {

  const result =
    await api(
      "sessions",
      {
        method: "POST",
        body: JSON.stringify({
          duration_minutes: 25
        })
      }
    );

  if (result.response.ok) {

    await refreshUser();
  }
}

// ==========================================
// STATS
// ==========================================

async function showStats(button) {

  activateButton(button);

  document.getElementById(
    "tasksSection"
  ).style.display = "none";

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  dynamic.style.display =
    "block";

  dynamic.innerHTML = `
    <h2>📊 İstatistikler</h2>

    <div
      id="statsContent"
      style="
        margin-top:20px;
        color:#7d8498;
      "
    >
      İstatistikler yükleniyor...
    </div>
  `;

  const result =
    await api("stats");

  const content =
    document.getElementById(
      "statsContent"
    );

  if (!result.response.ok) {

    content.textContent =
      "İstatistikler yüklenemedi.";

    return;
  }

  const stats =
    result.data.stats;

  content.innerHTML = `

    <div
      style="
        display:grid;
        grid-template-columns:
          repeat(auto-fit,minmax(150px,1fr));
        gap:12px;
      "
    >

      <div
        style="
          padding:20px;
          background:#f7f7ff;
          border-radius:16px;
        "
      >
        <strong style="font-size:28px">
          ${stats.tasks.total}
        </strong>
        <div>Toplam görev</div>
      </div>

      <div
        style="
          padding:20px;
          background:#f0fff9;
          border-radius:16px;
        "
      >
        <strong style="font-size:28px">
          ${stats.tasks.completed}
        </strong>
        <div>Tamamlanan görev</div>
      </div>

      <div
        style="
          padding:20px;
          background:#fff9ed;
          border-radius:16px;
        "
      >
        <strong style="font-size:28px">
          ${stats.subjects}
        </strong>
        <div>Ders</div>
      </div>

      <div
        style="
          padding:20px;
          background:#fff1f4;
          border-radius:16px;
        "
      >
        <strong style="font-size:28px">
          ${stats.exams}
        </strong>
        <div>Sınav</div>
      </div>

      <div
        style="
          padding:20px;
          background:#f2f7ff;
          border-radius:16px;
        "
      >
        <strong style="font-size:28px">
          ${stats.sessions.minutes}
        </strong>
        <div>Odaklanma dakikası</div>
      </div>

    </div>

  `;
}

// ==========================================
// PROFILE
// ==========================================

function showProfile(button) {

  activateButton(button);

  document.getElementById(
    "tasksSection"
  ).style.display = "none";

  const dynamic =
    document.getElementById(
      "dynamicSection"
    );

  dynamic.style.display =
    "block";

  const xp =
    Number(currentUser?.xp) || 0;

  const level =
    Math.floor(xp / 250) + 1;

  dynamic.innerHTML = `

    <div
      style="
        text-align:center;
        padding:10px 0;
      "
    >

      <div
        style="
          width:80px;
          height:80px;
          margin:0 auto 15px;
          border-radius:50%;
          background:#e7e4ff;
          display:grid;
          place-items:center;
          font-size:38px;
        "
      >
        🎓
      </div>

      <h2>
        ${escapeHTML(currentUser.name)}
      </h2>

      <p
        style="
          color:#7d8498;
          margin-top:5px;
        "
      >
        ${escapeHTML(currentUser.email)}
      </p>

      <div
        style="
          margin-top:25px;
          display:grid;
          grid-template-columns:
            repeat(auto-fit,minmax(130px,1fr));
          gap:12px;
        "
      >

        <div
          style="
            background:#f7f7ff;
            padding:18px;
            border-radius:15px;
          "
        >
          ⭐
          <strong
            style="
              display:block;
              font-size:25px;
              margin-top:5px;
            "
          >
            ${xp}
          </strong>
          XP
        </div>

        <div
          style="
            background:#fff8ed;
            padding:18px;
            border-radius:15px;
          "
        >
          🏆
          <strong
            style="
              display:block;
              font-size:25px;
              margin-top:5px;
            "
          >
            ${level}
          </strong>
          Seviye
        </div>

        <div
          style="
            background:#effff9;
            padding:18px;
            border-radius:15px;
          "
        >
          🔥
          <strong
            style="
              display:block;
              font-size:25px;
              margin-top:5px;
            "
          >
            ${currentUser.streak || 0}
          </strong>
          Seri
        </div>

      </div>

      <button
        onclick="logout()"
        style="
          margin-top:25px;
          width:100%;
          border:none;
          background:#fff0f2;
          color:#e7475d;
          padding:13px;
          border-radius:12px;
          font-weight:900;
        "
      >
        🚪 Çıkış Yap
      </button>

    </div>

  `;
}

// ==========================================
// AUTH MESSAGE
// ==========================================

function setAuthMessage(text) {

  const element =
    document.getElementById(
      "authMessage"
    );

  if (element) {
    element.textContent =
      text;
  }
}

// ==========================================
// LOGOUT
// ==========================================

async function logout() {

  await api(
    "logout",
    {
      method: "POST"
    }
  );

  currentUser = null;

  location.reload();
}

// ==========================================
// TOAST
// ==========================================

function showToast(text) {

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
    max-width:calc(100vw - 40px);
    font-weight:700;
  `;

  document.body.appendChild(
    toast
  );

  setTimeout(
    () => {
      if (toast.parentNode) {
        toast.remove();
      }
    },
    2500
  );
}

// ==========================================
// HELPERS
// ==========================================

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

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text ?? "";

  return div.innerHTML;
}

function escapeAttribute(text) {

  return String(
    text || "#6c63ff"
  )
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
// ==========================================
// DersTakip 2.0 - APP.JS
// ==========================================

let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];
let stats = null;

// ==========================================
// API
// ==========================================

async function api(action, options = {}) {
  const response = await fetch(`/api?action=${action}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }

  return data;
}

// ==========================================
// AUTH TABS
// ==========================================

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");

  document.getElementById("authMessage").textContent = "";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";

  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");

  document.getElementById("authMessage").textContent = "";
}

// ==========================================
// LOGIN
// ==========================================

async function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const message = document.getElementById("authMessage");

  try {
    message.textContent = "Giriş yapılıyor...";

    const data = await api("login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    });

    currentUser = data.user;

    await startApp();

  } catch (error) {
    message.textContent = "❌ " + error.message;
  }
}

// ==========================================
// REGISTER
// ==========================================

async function register(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const message = document.getElementById("authMessage");

  try {
    message.textContent = "Hesap oluşturuluyor...";

    const data = await api("register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    currentUser = data.user;

    await startApp();

  } catch (error) {
    message.textContent = "❌ " + error.message;
  }
}

// ==========================================
// LOGOUT
// ==========================================

async function logout() {
  try {
    await api("logout");

    currentUser = null;

    document.getElementById("app").style.display = "none";
    document.getElementById("authScreen").style.display = "flex";

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// APP START
// ==========================================

async function startApp() {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  await loadAll();

  goHome();
}

// ==========================================
// LOAD ALL
// ==========================================

async function loadAll() {
  try {
    const [
      userData,
      taskData,
      subjectData,
      examData,
      statsData
    ] = await Promise.all([
      api("me"),
      api("tasks"),
      api("subjects"),
      api("exams"),
      api("stats")
    ]);

    currentUser = userData.user;
    tasks = taskData.tasks || [];
    subjects = subjectData.subjects || [];
    exams = examData.exams || [];
    stats = statsData.stats;

    renderUser();
    renderTasks();
    renderStats();

  } catch (error) {

    if (error.message === "Oturum gerekli.") {
      document.getElementById("app").style.display = "none";
      document.getElementById("authScreen").style.display = "flex";
      return;
    }

    console.error(error);
  }
}

// ==========================================
// USER
// ==========================================

function renderUser() {

  if (!currentUser) return;

  const name =
    currentUser.name ||
    "Öğrenci";

  document.getElementById("welcomeText").textContent =
    `Merhaba ${name}! 👋`;

  const xp =
    Number(currentUser.xp) || 0;

  const level =
    Math.floor(xp / 250) + 1;

  document.getElementById("levelText").textContent =
    `Seviye ${level}`;

  document.getElementById("statXP").textContent =
    xp;

  document.getElementById("statStreak").textContent =
    currentUser.streak || 0;

  document.getElementById("streakNumber").textContent =
    currentUser.streak || 0;

  const levelXP = xp % 250;

  const percent =
    Math.min(
      100,
      Math.round((levelXP / 250) * 100)
    );

  document.getElementById("progressBar").style.width =
    percent + "%";

  document.getElementById("xpText").textContent =
    `${levelXP} / 250 XP`;
}

// ==========================================
// TASKS
// ==========================================

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
        📚 Henüz görev yok.<br>
        <strong>İlk görevini ekle!</strong>
      </div>
    `;

    updateTaskCounter();
    return;
  }

  list.innerHTML = tasks.map(task => {

    const completed =
      task.completed;

    return `
      <div
        class="task ${completed ? "completed" : ""}"
        data-id="${task.id}"
      >

        <div
          class="checkbox"
          onclick="toggleTask(${task.id})"
        >
          ${completed ? "✓" : ""}
        </div>

        <div class="task-content">

          <div class="task-name">
            ${escapeHTML(task.title)}
          </div>

          <div class="task-subject">
            📖 Ders görevi
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
    `;

  }).join("");

  updateTaskCounter();
}

// ==========================================
// TASK COUNTER
// ==========================================

function updateTaskCounter() {

  const total = tasks.length;

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  document.getElementById("taskCounter").textContent =
    `${completed} / ${total}`;

  document.getElementById("statTasks").textContent =
    completed;

  const summary =
    document.getElementById("taskSummary");

  if (total === 0) {
    summary.textContent =
      "Bugün için henüz görev eklemedin.";
  } else if (completed === total) {
    summary.textContent =
      "🎉 Harika! Bugünkü tüm görevlerini tamamladın.";
  } else {
    summary.textContent =
      `${total - completed} görev kaldı. Devam et! 🚀`;
  }
}

// ==========================================
// ADD TASK
// ==========================================

async function addTask() {

  const input =
    document.getElementById("newTask");

  const title =
    input.value.trim();

  if (!title) return;

  try {

    const data = await api("tasks", {
      method: "POST",
      body: JSON.stringify({
        title
      })
    });

    tasks.unshift(data.task);

    input.value = "";

    renderTasks();

    await refreshUser();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// TOGGLE TASK
// ==========================================

async function toggleTask(id) {

  try {

    await api("tasks", {
      method: "PATCH",
      body: JSON.stringify({
        id
      })
    });

    const task =
      tasks.find(
        task => Number(task.id) === Number(id)
      );

    if (task) {
      task.completed = !task.completed;
    }

    renderTasks();

    await refreshUser();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// DELETE TASK
// ==========================================

async function deleteTask(id) {

  if (!confirm("Bu görevi silmek istiyor musun?")) {
    return;
  }

  try {

    await api("tasks", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });

    tasks =
      tasks.filter(
        task => Number(task.id) !== Number(id)
      );

    renderTasks();

    await refreshUser();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// REFRESH USER
// ==========================================

async function refreshUser() {

  const data =
    await api("me");

  currentUser =
    data.user;

  renderUser();
}

// ==========================================
// STATS
// ==========================================

function renderStats() {

  if (!stats) return;

  document.getElementById("statTasks").textContent =
    stats.tasks?.completed || 0;

  document.getElementById("statXP").textContent =
    currentUser?.xp || 0;

  document.getElementById("statStreak").textContent =
    currentUser?.streak || 0;

  document.getElementById("streakNumber").textContent =
    currentUser?.streak || 0;
}

// ==========================================
// NAVIGATION
// ==========================================

function clearDynamic() {

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "none";
  section.innerHTML = "";
}

function setActive(button) {

  document
    .querySelectorAll(".menu button, .mobile-nav button")
    .forEach(btn =>
      btn.classList.remove("active")
    );

  if (button) {
    button.classList.add("active");
  }
}

function goHome(button) {

  setActive(button);

  clearDynamic();

  document.getElementById("tasksSection").style.display =
    "block";
}

function showTasks(button) {

  setActive(button);

  clearDynamic();

  document.getElementById("tasksSection").style.display =
    "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ==========================================
// SUBJECTS
// ==========================================

function showSubjects(button) {

  setActive(button);

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  document.getElementById("tasksSection").style.display =
    "none";

  section.innerHTML = `

    <div class="card-title">
      <h2>📚 Derslerim</h2>
    </div>

    <div id="subjectList">

      ${
        subjects.length
        ?
        subjects.map(subject => `
          <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:14px;
            margin-bottom:10px;
            background:#f7f7fb;
            border-radius:14px;
          ">

            <strong>
              ${escapeHTML(subject.name)}
            </strong>

            <button
              onclick="deleteSubject(${subject.id})"
              style="
                border:none;
                background:none;
              "
            >
              🗑️
            </button>

          </div>
        `).join("")
        :
        `
        <p style="color:#8991a5">
          Henüz ders eklemedin.
        </p>
        `
      }

    </div>

    <div style="
      display:flex;
      gap:8px;
      margin-top:15px;
    ">

      <input
        id="newSubject"
        placeholder="Örn. Matematik"
        style="
          flex:1;
          padding:13px;
          border:1px solid #e0e4ed;
          border-radius:11px;
        "
      >

      <button
        onclick="addSubject()"
        style="
          border:none;
          background:var(--primary);
          color:white;
          padding:12px 18px;
          border-radius:11px;
          font-weight:900;
        "
      >
        + Ekle
      </button>

    </div>
  `;
}

// ==========================================
// ADD SUBJECT
// ==========================================

async function addSubject() {

  const input =
    document.getElementById("newSubject");

  const name =
    input.value.trim();

  if (!name) return;

  try {

    const data =
      await api("subjects", {
        method: "POST",
        body: JSON.stringify({
          name
        })
      });

    subjects.unshift(data.subject);

    showSubjects();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// DELETE SUBJECT
// ==========================================

async function deleteSubject(id) {

  try {

    await api("subjects", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });

    subjects =
      subjects.filter(
        subject =>
          Number(subject.id) !== Number(id)
      );

    showSubjects();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// EXAMS
// ==========================================

function showExams(button) {

  setActive(button);

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  document.getElementById("tasksSection").style.display =
    "none";

  const today =
    new Date();

  section.innerHTML = `

    <div class="card-title">
      <h2>📅 Sınavlarım</h2>
    </div>

    ${
      exams.length
      ?
      exams.map(exam => {

        const examDate =
          new Date(exam.exam_date);

        const diff =
          Math.ceil(
            (examDate - today) /
            (1000 * 60 * 60 * 24)
          );

        let badge;

        if (diff < 0) {
          badge = "Geçmiş";
        } else if (diff === 0) {
          badge = "🔥 BUGÜN";
        } else if (diff <= 3) {
          badge = `⚠️ ${diff} gün`;
        } else {
          badge = `📅 ${diff} gün`;
        }

        return `

          <div style="
            padding:16px;
            margin-bottom:10px;
            background:#f7f7fb;
            border-radius:15px;
          ">

            <strong>
              ${escapeHTML(exam.title)}
            </strong>

            <div style="
              margin-top:7px;
              color:#7d8498;
            ">
              ${exam.subject_name || "Genel"}
            </div>

            <div style="
              margin-top:8px;
              font-weight:800;
            ">
              ${badge}
            </div>

            <button
              onclick="deleteExam(${exam.id})"
              style="
                border:none;
                background:none;
                margin-top:8px;
              "
            >
              🗑️ Sil
            </button>

          </div>

        `;

      }).join("")
      :
      `
      <p style="color:#8991a5">
        Yaklaşan sınav bulunmuyor.
      </p>
      `
    }

  `;
}

// ==========================================
// DELETE EXAM
// ==========================================

async function deleteExam(id) {

  try {

    await api("exams", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });

    exams =
      exams.filter(
        exam =>
          Number(exam.id) !== Number(id)
      );

    showExams();

  } catch (error) {
    alert(error.message);
  }
}

// ==========================================
// FOCUS
// ==========================================

function showFocus(button) {

  setActive(button);

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  document.getElementById("tasksSection").style.display =
    "none";

  section.innerHTML = `

    <div class="card-title">
      <h2>⏱️ Odaklanma Modu</h2>
    </div>

    <div style="
      text-align:center;
      padding:25px;
    ">

      <div
        id="timer"
        style="
          font-size:60px;
          font-weight:950;
          margin-bottom:20px;
        "
      >
        25:00
      </div>

      <button
        onclick="startFocus()"
        style="
          border:none;
          background:var(--primary);
          color:white;
          padding:14px 25px;
          border-radius:12px;
          font-weight:900;
        "
      >
        ▶️ Başlat
      </button>

    </div>
  `;
}

let focusTimer = null;
let focusSeconds = 25 * 60;

function startFocus() {

  if (focusTimer) return;

  focusTimer =
    setInterval(() => {

      focusSeconds--;

      updateTimer();

      if (focusSeconds <= 0) {

        clearInterval(focusTimer);

        focusTimer = null;

        finishFocus();
      }

    }, 1000);
}

function updateTimer() {

  const timer =
    document.getElementById("timer");

  if (!timer) return;

  const minutes =
    Math.floor(focusSeconds / 60);

  const seconds =
    focusSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function finishFocus() {

  alert("🎉 Odaklanma tamamlandı!");

  try {

    await api("sessions", {
      method: "POST",
      body: JSON.stringify({
        duration_minutes: 25
      })
    });

    focusSeconds = 25 * 60;

    await loadAll();

  } catch (error) {
    console.error(error);
  }
}

// ==========================================
// 🤖 DERS KOÇU
// ==========================================

function showCoach(button) {

  setActive(button);

  document.getElementById("tasksSection").style.display =
    "none";

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  const advice =
    generateCoachAdvice();

  section.innerHTML = `

    <div class="card-title">
      <h2>🤖 Ders Koçu</h2>
      <span>✨ Akıllı Öneri</span>
    </div>

    <div style="
      background:
        linear-gradient(
          135deg,
          #6658f5,
          #9275ff
        );
      color:white;
      padding:22px;
      border-radius:18px;
      margin-bottom:15px;
    ">

      <div style="
        font-size:35px;
        margin-bottom:10px;
      ">
        🤖
      </div>

      <h2 style="
        margin-bottom:8px;
      ">
        ${advice.title}
      </h2>

      <p style="
        line-height:1.6;
        opacity:.95;
      ">
        ${advice.message}
      </p>

    </div>

    <div style="
      display:grid;
      gap:10px;
    ">

      ${advice.items.map(item => `
        <div style="
          padding:15px;
          background:#f7f7fb;
          border-radius:14px;
          font-weight:700;
        ">
          ${item}
        </div>
      `).join("")}

    </div>

    <div style="
      margin-top:15px;
      padding:15px;
      background:#fff8df;
      border-radius:14px;
    ">
      🎯 <strong>Koçun görevi:</strong>
      Bugün en az bir görevini tamamla ve
      ${advice.xp} XP kazan!
    </div>

  `;
}

// ==========================================
// COACH ENGINE
// ==========================================

function generateCoachAdvice() {

  const incomplete =
    tasks.filter(
      task => !task.completed
    );

  const completed =
    tasks.filter(
      task => task.completed
    );

  const upcomingExams =
    exams
      .map(exam => {

        const days =
          Math.ceil(
            (
              new Date(exam.exam_date) -
              new Date()
            ) /
            (1000 * 60 * 60 * 24)
          );

        return {
          ...exam,
          days
        };

      })
      .filter(
        exam =>
          exam.days >= 0
      )
      .sort(
        (a, b) =>
          a.days - b.days
      );

  // SINAV YAKINSA
  if (
    upcomingExams.length > 0 &&
    upcomingExams[0].days <= 3
  ) {

    const exam =
      upcomingExams[0];

    return {

      title:
        "Sınavın çok yaklaştı! 📚🔥",

      message:
        `${exam.title} için ${exam.days === 0 ? "bugün" : exam.days + " gün"} kaldı. Bugün kısa ama odaklı bir çalışma yapmanı öneriyorum.`,

      items: [

        `📅 Öncelik: ${exam.title}`,

        `📖 Konu: ${exam.topic || "Konuları tekrar et"}`,

        "⏱️ 25 dakika odaklan",

        "📝 Ardından 5 soru çöz"

      ],

      xp: 75
    };
  }

  // GÖREVLER VARSA
  if (incomplete.length > 0) {

    const task =
      incomplete[0];

    return {

      title:
        "Önce şu görevi bitirelim! 🎯",

      message:
        `"${task.title}" görevini tamamlamak bugün için iyi bir başlangıç olur.`,

      items: [

        `🎯 İlk hedef: ${task.title}`,

        "⏱️ 25 dakika çalış",

        "📵 Telefonunu dikkat dağıtmayacak yere koy",

        "⭐ Görevi tamamlayınca XP kazan"

      ],

      xp: task.xp || 50
    };
  }

  // HİÇ GÖREV YOKSA
  if (tasks.length === 0) {

    return {

      title:
        "Bugünün planını oluşturalım! 🚀",

      message:
        "Henüz görev eklemedin. Küçük bir hedef belirleyerek başlayabilirsin.",

      items: [

        "📝 Bugün yapacağın bir görev ekle",

        "⏱️ 25 dakikalık çalışma başlat",

        "🎯 Tek bir konuya odaklan",

        "🔥 Serini koru"

      ],

      xp: 50
    };
  }

  // HER ŞEY TAMAM
  return {

    title:
      "Muhteşem gidiyorsun! 🏆",

    message:
      "Bugünkü görevlerini tamamladın. İstersen biraz daha çalışarak kendini geliştirebilirsin.",

    items: [

      "🎉 Tüm görevler tamamlandı",

      "📚 Zorlandığın bir konuyu tekrar et",

      "⏱️ 25 dakika ekstra çalışma yap",

      "🔥 Yarın için yeni hedef belirle"

    ],

    xp: 50
  };
}

// ==========================================
// STATS PAGE
// ==========================================

function showStats(button) {

  setActive(button);

  document.getElementById("tasksSection").style.display =
    "none";

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  section.innerHTML = `

    <div class="card-title">
      <h2>📊 İstatistikler</h2>
    </div>

    <div style="
      display:grid;
      grid-template-columns:
      repeat(auto-fit,minmax(150px,1fr));
      gap:12px;
    ">

      <div style="
        padding:18px;
        background:#f7f7fb;
        border-radius:15px;
      ">
        ⭐
        <strong style="
          display:block;
          font-size:28px;
          margin-top:8px;
        ">
          ${currentUser?.xp || 0}
        </strong>
        XP
      </div>

      <div style="
        padding:18px;
        background:#f7f7fb;
        border-radius:15px;
      ">
        🔥
        <strong style="
          display:block;
          font-size:28px;
          margin-top:8px;
        ">
          ${currentUser?.streak || 0}
        </strong>
        Gün seri
      </div>

      <div style="
        padding:18px;
        background:#f7f7fb;
        border-radius:15px;
      ">
        📚
        <strong style="
          display:block;
          font-size:28px;
          margin-top:8px;
        ">
          ${subjects.length}
        </strong>
        Ders
      </div>

      <div style="
        padding:18px;
        background:#f7f7fb;
        border-radius:15px;
      ">
        📅
        <strong style="
          display:block;
          font-size:28px;
          margin-top:8px;
        ">
          ${exams.length}
        </strong>
        Sınav
      </div>

    </div>

  `;
}

// ==========================================
// PROFILE
// ==========================================

function showProfile(button) {

  setActive(button);

  document.getElementById("tasksSection").style.display =
    "none";

  const section =
    document.getElementById("dynamicSection");

  section.style.display = "block";

  section.innerHTML = `

    <div class="card-title">
      <h2>👤 Profilim</h2>
    </div>

    <div style="
      text-align:center;
      padding:20px;
    ">

      <div style="
        width:80px;
        height:80px;
        margin:auto;
        border-radius:50%;
        background:#e7e4ff;
        display:grid;
        place-items:center;
        font-size:40px;
      ">
        🎓
      </div>

      <h2 style="
        margin-top:15px;
      ">
        ${escapeHTML(currentUser?.name || "")}
      </h2>

      <p style="
        color:#7d8498;
        margin-top:5px;
      ">
        ${escapeHTML(currentUser?.email || "")}
      </p>

      <div style="
        margin-top:20px;
        padding:15px;
        background:#f7f7fb;
        border-radius:14px;
      ">
        ⭐ ${currentUser?.xp || 0} XP
        ·
        🔥 ${currentUser?.streak || 0} gün seri
      </div>

    </div>

  `;
}

// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      const data =
        await api("me");

      currentUser =
        data.user;

      await startApp();

    } catch {

      document.getElementById("authScreen").style.display =
        "flex";

      document.getElementById("app").style.display =
        "none";
    }

  }
);
