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
