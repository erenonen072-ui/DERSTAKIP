let currentUser = null;
let tasks = [];
let subjects = [];
let exams = [];
let timer = null;
let timerSeconds = 25 * 60;
let timerRunning = false;

const API = "/api";

// =====================================
// BAŞLANGIÇ
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  loadApp
);

// =====================================
// API
// =====================================

async function api(
  action,
  options = {}
) {
  const response = await fetch(
    `${API}?action=${encodeURIComponent(action)}`,
    {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type":
          "application/json",
        ...(options.headers || {})
      }
    }
  );

  const data =
    await response
      .json()
      .catch(() => ({}));

  return {
    response,
    data
  };
}

// =====================================
// APP LOAD
// =====================================

async function loadApp() {
  showAuth();

  try {
    const {
      response,
      data
    } = await api("me");

    if (!response.ok) {
      return;
    }

    currentUser = data.user;

    showApp();

    await refreshAll();
  } catch (error) {
    console.error(error);
    showAuth();
  }
}

async function refreshAll() {
  await Promise.all([
    refreshUser(),
    loadTasks(),
    loadSubjects(),
    loadExams(),
    loadStats(),
    loadAchievements()
  ]);

  updateUser();
}

// =====================================
// LOGIN
// =====================================

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

  try {
    const {
      response,
      data
    } = await api(
      "login",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    if (!response.ok) {
      setAuthMessage(
        "❌ " +
        (
          data.message ||
          "Giriş başarısız."
        )
      );
      return;
    }

    currentUser = data.user;

    showApp();

    await refreshAll();

    setAuthMessage("");
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

  try {
    const {
      response,
      data
    } = await api(
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

    if (!response.ok) {
      setAuthMessage(
        "❌ " +
        (
          data.message ||
          "Kayıt başarısız."
        )
      );
      return;
    }

    currentUser = data.user;

    showApp();

    await refreshAll();

    setAuthMessage("");
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
  const {
    response,
    data
  } = await api("tasks");

  if (!response.ok) {
    return;
  }

  tasks = data.tasks || [];

  renderTasks(tasks);
}

function renderTasks(list) {
  const element =
    document.getElementById(
      "taskList"
    );

  if (!element) {
    return;
  }

  element.innerHTML = "";

  if (!list.length) {
    element.innerHTML = `
      <div class="empty">
        Henüz görev yok. 🎯
      </div>
    `;
  }

  list.forEach(task => {
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
        ${task.completed ? "✓" : ""}
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
      >
        🗑️
      </button>
    `;

    element.appendChild(item);
  });

  updateTaskStats(list);
}

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
  } = await api(
    "tasks",
    {
      method: "POST",
      body: JSON.stringify({
        title
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ " +
      (
        data.message ||
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

async function toggleTask(id) {
  const {
    response,
    data
  } = await api(
    "tasks",
    {
      method: "PATCH",
      body: JSON.stringify({
        id
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ " +
      (
        data.message ||
        "İşlem başarısız."
      )
    );
    return;
  }

  await refreshAll();

  showToast(
    data.completed
      ? "🎉 Görev tamamlandı! XP kazandın."
      : "Görev yeniden açıldı."
  );
}

async function deleteTask(id) {
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
  } = await api(
    "tasks",
    {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ " +
      (
        data.message ||
        "Görev silinemedi."
      )
    );
    return;
  }

  await refreshAll();

  showToast(
    "🗑️ Görev silindi."
  );
}

// =====================================
// SUBJECTS
// =====================================

async function loadSubjects() {
  const {
    response,
    data
  } = await api("subjects");

  if (!response.ok) {
    return;
  }

  subjects =
    data.subjects || [];

  renderSubjects();
  fillSubjectSelect();
}

function renderSubjects() {
  const list =
    document.getElementById(
      "subjectList"
    );

  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (!subjects.length) {
    list.innerHTML = `
      <div class="empty">
        Henüz ders eklemedin. 📚
      </div>
    `;

    return;
  }

  subjects.forEach(subject => {
    const item =
      document.createElement(
        "div"
      );

    item.className =
      "subject-item";

    item.innerHTML = `
      <div
        class="subject-color"
        style="background:${escapeHTML(subject.color)}"
      ></div>

      <strong>
        ${escapeHTML(subject.name)}
      </strong>

      <button
        onclick="deleteSubject(${subject.id})"
      >
        🗑️
      </button>
    `;

    list.appendChild(item);
  });
}

function fillSubjectSelect() {
  const select =
    document.getElementById(
      "examSubject"
    );

  if (!select) {
    return;
  }

  select.innerHTML =
    `<option value="">Ders seç</option>`;

  subjects.forEach(subject => {
    select.innerHTML += `
      <option value="${subject.id}">
        ${escapeHTML(subject.name)}
      </option>
    `;
  });
}

async function addSubject() {
  const input =
    document.getElementById(
      "newSubject"
    );

  const color =
    document.getElementById(
      "subjectColor"
    );

  const name =
    input.value.trim();

  if (!name) {
    showToast(
      "⚠️ Ders adı yaz!"
    );
    return;
  }

  const {
    response,
    data
  } = await api(
    "subjects",
    {
      method: "POST",
      body: JSON.stringify({
        name,
        color:
          color?.value ||
          "#6c63ff"
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ " +
      (
        data.message ||
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
      "Bu dersi silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  await api(
    "subjects",
    {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }
  );

  await loadSubjects();
  await loadExams();

  showToast(
    "🗑️ Ders silindi."
  );
}

// =====================================
// EXAMS
// =====================================

async function loadExams() {
  const {
    response,
    data
  } = await api("exams");

  if (!response.ok) {
    return;
  }

  exams =
    data.exams || [];

  renderExams();
}

function renderExams() {
  const list =
    document.getElementById(
      "examList"
    );

  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (!exams.length) {
    list.innerHTML = `
      <div class="empty">
        Yaklaşan sınav yok. 📅
      </div>
    `;

    return;
  }

  exams.forEach(exam => {
    const date =
      new Date(exam.exam_date);

    const item =
      document.createElement(
        "div"
      );

    item.className =
      "exam-item";

    item.innerHTML = `
      <div>
        <strong>
          ${escapeHTML(exam.title)}
        </strong>

        <small>
          ${
            exam.subject_name
              ? escapeHTML(
                  exam.subject_name
                )
              : "Ders belirtilmedi"
          }
        </small>

        ${
          exam.topic
            ? `
              <small>
                Konu: ${escapeHTML(exam.topic)}
              </small>
            `
            : ""
        }
      </div>

      <div class="exam-date">
        ${date.toLocaleDateString("tr-TR")}
      </div>

      <button
        onclick="deleteExam(${exam.id})"
      >
        🗑️
      </button>
    `;

    list.appendChild(item);
  });
}

async function addExam() {
  const title =
    document.getElementById(
      "examTitle"
    ).value.trim();

  const date =
    document.getElementById(
      "examDate"
    ).value;

  const topic =
    document.getElementById(
      "examTopic"
    ).value.trim();

  const subject =
    document.getElementById(
      "examSubject"
    ).value;

  if (!title || !date) {
    showToast(
      "⚠️ Sınav adı ve tarih gerekli."
    );
    return;
  }

  const {
    response,
    data
  } = await api(
    "exams",
    {
      method: "POST",
      body: JSON.stringify({
        title,
        exam_date: date,
        topic,
        subject_id:
          subject || null
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ " +
      (
        data.message ||
        "Sınav eklenemedi."
      )
    );
    return;
  }

  document.getElementById(
    "examTitle"
  ).value = "";

  document.getElementById(
    "examDate"
  ).value = "";

  document.getElementById(
    "examTopic"
  ).value = "";

  await loadExams();

  showToast(
    "📅 Sınav eklendi!"
  );
}

async function deleteExam(id) {
  if (
    !confirm(
      "Bu sınavı silmek istediğine emin misin?"
    )
  ) {
    return;
  }

  await api(
    "exams",
    {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }
  );

  await loadExams();

  showToast(
    "🗑️ Sınav silindi."
  );
}

// =====================================
// STUDY TIMER
// =====================================

function setTimer(minutes) {
  if (timerRunning) {
    return;
  }

  timerSeconds =
    minutes * 60;

  updateTimerDisplay();
}

function startTimer() {
  if (timerRunning) {
    return;
  }

  timerRunning = true;

  timer =
    setInterval(
      async () => {
        timerSeconds--;

        updateTimerDisplay();

        if (timerSeconds <= 0) {
          stopTimer();

          await finishStudySession();

          showToast(
            "🎉 Çalışma tamamlandı! XP kazandın."
          );
        }
      },
      1000
    );
}

function stopTimer() {
  timerRunning = false;

  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function resetTimer() {
  stopTimer();

  timerSeconds =
    25 * 60;

  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes =
    Math.floor(
      timerSeconds / 60
    );

  const seconds =
    timerSeconds % 60;

  setText(
    "timerDisplay",
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  );
}

async function finishStudySession() {
  const {
    response,
    data
  } = await api(
    "sessions",
    {
      method: "POST",
      body: JSON.stringify({
        duration_minutes: 25
      })
    }
  );

  if (!response.ok) {
    showToast(
      "❌ Çalışma kaydedilemedi."
    );
    return;
  }

  await refreshAll();
}

// =====================================
// STATS
// =====================================

async function loadStats() {
  const {
    response,
    data
  } = await api("stats");

  if (!response.ok) {
    return;
  }

  const stats =
    data.stats || {};

  setText(
    "bigStudyMinutes",
    stats.studyMinutes || 0
  );

  setText(
    "bigCompletedTasks",
    stats.completedTasks || 0
  );

  setText(
    "bigSubjects",
    stats.subjects || 0
  );

  setText(
    "bigExams",
    stats.exams || 0
  );
}

// =====================================
// ACHIEVEMENTS
// =====================================

async function loadAchievements() {
  const {
    response,
    data
  } = await api(
    "achievements"
  );

  if (!response.ok) {
    return;
  }

  renderAchievements(
    data.achievements || []
  );
}

function renderAchievements(list) {
  const element =
    document.getElementById(
      "achievementList"
    );

  if (!element) {
    return;
  }

  const names = {
    first_task:
      ["🎯", "İlk Görev", "İlk görevini tamamladın."],

    ten_tasks:
      ["🏆", "10 Görev", "10 görev tamamladın."],

    three_subjects:
      ["📚", "Ders Kurdu", "3 ders ekledin."],

    first_session:
      ["⏱️", "İlk Çalışma", "İlk çalışma oturumunu tamamladın."],

    xp_250:
      ["⭐", "250 XP", "250 XP kazandın."],

    streak_7:
      ["🔥", "7 Gün Seri", "7 günlük seri yaptın."]
  };

  element.innerHTML = "";

  if (!list.length) {
    element.innerHTML = `
      <div class="empty">
        Henüz başarım kazanmadın.
      </div>
    `;

    return;
  }

  list.forEach(item => {
    const info =
      names[item.achievement_key] ||
      ["🏅", "Başarım", item.achievement_key];

    const div =
      document.createElement(
        "div"
      );

    div.className =
      "achievement";

    div.innerHTML = `
      <div class="achievement-icon">
        ${info[0]}
      </div>

      <div>
        <strong>
          ${escapeHTML(info[1])}
        </strong>

        <small>
          ${escapeHTML(info[2])}
        </small>
      </div>
    `;

    element.appendChild(div);
  });
}

// =====================================
// USER
// =====================================

async function refreshUser() {
  const {
    response,
    data
  } = await api("me");

  if (!response.ok) {
    currentUser = null;
    showAuth();
    return;
  }

  currentUser = data.user;

  updateUser();
}

function updateUser() {
  if (!currentUser) {
    return;
  }

  setText(
    "welcomeText",
    `Merhaba, ${currentUser.name}! 👋`
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
    `Seviye ${level}`
  );

  setText(
    "xpText",
    `${levelXP} / 250 XP`
  );

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

  const bar =
    document.getElementById(
      "progressBar"
    );

  if (bar) {
    bar.style.width =
      progress + "%";
  }
}

// =====================================
// TASK STATS
// =====================================

function updateTaskStats(list) {
  const completed =
    list.filter(
      task => task.completed
    ).length;

  const total =
    list.length;

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

  currentUser = null;

  location.reload();
}

// =====================================
// TOAST
// =====================================

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

  toast.id = "toast";

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

function setText(id, value) {
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
    String(text ?? "");

  return div.innerHTML;
}

// ENTER = ADD TASK

document.addEventListener(
  "keydown",
  event => {
    if (
      event.key === "Enter" &&
      document.activeElement?.id ===
        "newTask"
    ) {
      addTask();
    }
  }
);

// TIMER

updateTimerDisplay();
