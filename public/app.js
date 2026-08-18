let currentUser = null;

const API = "/api";

document.addEventListener(
  "DOMContentLoaded",
  loadApp
);

async function api(action, options = {}) {
  const response = await fetch(
    `${API}?action=${action}`,
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
    await response.json().catch(() => ({}));

  return {
    response,
    data
  };
}

// =========================
// APP
// =========================

async function loadApp() {
  try {
    const { response, data } =
      await api("me");

    if (!response.ok) {
      showAuth();
      return;
    }

    currentUser = data.user;

    showApp();
    updateUser();

    await loadTasks();
  } catch (error) {
    console.error(error);
    showAuth();
  }
}

// =========================
// LOGIN
// =========================

async function login(event) {
  event.preventDefault();

  const email =
    document.getElementById(
      "loginEmail"
    ).value;

  const password =
    document.getElementById(
      "loginPassword"
    ).value;

  setAuthMessage(
    "Giriş yapılıyor..."
  );

  try {
    const { response, data } =
      await api("login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });

    if (!response.ok) {
      setAuthMessage(
        "❌ " +
        (data.message || "Giriş başarısız.")
      );
      return;
    }

    currentUser = data.user;

    showApp();
    updateUser();

    await loadTasks();

    setAuthMessage("");
  } catch (error) {
    console.error(error);

    setAuthMessage(
      "❌ Sunucuya bağlanılamadı."
    );
  }
}

// =========================
// REGISTER
// =========================

async function register(event) {
  event.preventDefault();

  const name =
    document.getElementById(
      "registerName"
    ).value;

  const email =
    document.getElementById(
      "registerEmail"
    ).value;

  const password =
    document.getElementById(
      "registerPassword"
    ).value;

  setAuthMessage(
    "Hesap oluşturuluyor..."
  );

  try {
    const { response, data } =
      await api("register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

    if (!response.ok) {
      setAuthMessage(
        "❌ " +
        (data.message ||
          "Kayıt başarısız.")
      );
      return;
    }

    currentUser = data.user;

    showApp();
    updateUser();

    await loadTasks();

    setAuthMessage("");
  } catch (error) {
    console.error(error);

    setAuthMessage(
      "❌ Sunucuya bağlanılamadı."
    );
  }
}

// =========================
// TASKS
// =========================

async function loadTasks() {
  const { response, data } =
    await api("tasks");

  if (!response.ok) return;

  renderTasks(
    data.tasks || []
  );
}

function renderTasks(tasks) {
  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = "";

  if (!tasks.length) {
    list.innerHTML = `
      <div style="
        padding:25px;
        text-align:center;
        color:#8991a5;
      ">
        Henüz görev yok. 🎯
      </div>
    `;
  }

  tasks.forEach(task => {
    const item =
      document.createElement(
        "div"
      );

    item.className =
      "task" +
      (task.completed
        ? " completed"
        : "");

    item.innerHTML = `
      <div
        class="checkbox"
        onclick="toggleTask(${task.id})"
      >
        ${task.completed ? "✓" : "☐"}
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

    list.appendChild(item);
  });

  updateTaskStats(tasks);
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

  const { response, data } =
    await api("tasks", {
      method: "POST",
      body: JSON.stringify({
        title
      })
    });

  if (!response.ok) {
    showToast(
      "❌ " +
      (data.message || "Hata")
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
  const { response, data } =
    await api("tasks", {
      method: "PATCH",
      body: JSON.stringify({
        id
      })
    });

  if (!response.ok) {
    showToast(
      "❌ " +
      (data.message || "Hata")
    );
    return;
  }

  await refreshUser();
  await loadTasks();

  showToast(
    data.completed
      ? "🎉 Görev tamamlandı! XP kazandın!"
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

  const { response, data } =
    await api("tasks", {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });

  if (!response.ok) {
    showToast(
      "❌ " +
      (data.message || "Hata")
    );
    return;
  }

  await loadTasks();

  showToast(
    "🗑️ Görev silindi."
  );
}

// =========================
// SUBJECTS
// =========================

async function loadSubjects() {
  const { response, data } =
    await api("subjects");

  if (!response.ok) return [];

  return data.subjects || [];
}

async function addSubject() {
  const name =
    prompt("Ders adı:");

  if (!name?.trim()) return;

  const { response, data } =
    await api("subjects", {
      method: "POST",
      body: JSON.stringify({
        name
      })
    });

  if (!response.ok) {
    showToast(
      "❌ " +
      (data.message || "Hata")
    );
    return;
  }

  showToast(
    "📚 Ders eklendi!"
  );

  showSubjects();
}

async function deleteSubject(id) {
  if (
    !confirm(
      "Bu dersi silmek istiyor musun?"
    )
  ) {
    return;
  }

  await api("subjects", {
    method: "DELETE",
    body: JSON.stringify({
      id
    })
  });

  showSubjects();
}

async function showSubjects() {
  const subjects =
    await loadSubjects();

  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = `
    <div style="padding:10px">
      <button
        class="add-task button"
        onclick="addSubject()"
      >
        ➕ Ders Ekle
      </button>

      ${subjects.map(subject => `
        <div class="task">
          <div
            style="
              width:18px;
              height:18px;
              border-radius:50%;
              background:${subject.color};
            "
          ></div>

          <div class="task-content">
            <div class="task-name">
              ${escapeHTML(subject.name)}
            </div>

            <div class="task-subject">
              Ders
            </div>
          </div>

          <button
            class="delete-task"
            onclick="deleteSubject(${subject.id})"
          >
            🗑️
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

// =========================
// EXAMS
// =========================

async function loadExams() {
  const { response, data } =
    await api("exams");

  if (!response.ok) return [];

  return data.exams || [];
}

async function addExam() {
  const title =
    prompt("Sınav adı:");

  if (!title?.trim()) return;

  const date =
    prompt(
      "Sınav tarihi (YYYY-MM-DD):"
    );

  if (!date) return;

  const { response, data } =
    await api("exams", {
      method: "POST",
      body: JSON.stringify({
        title,
        exam_date: date
      })
    });

  if (!response.ok) {
    showToast(
      "❌ " +
      (data.message || "Hata")
    );
    return;
  }

  showToast(
    "📅 Sınav eklendi!"
  );

  showExams();
}

async function deleteExam(id) {
  if (
    !confirm(
      "Bu sınavı silmek istiyor musun?"
    )
  ) {
    return;
  }

  await api("exams", {
    method: "DELETE",
    body: JSON.stringify({
      id
    })
  });

  showExams();
}

async function showExams() {
  const exams =
    await loadExams();

  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = `
    <div style="padding:10px">

      <button
        class="add-task button"
        onclick="addExam()"
      >
        ➕ Sınav Ekle
      </button>

      ${
        exams.length
          ? exams.map(exam => `
            <div class="task">
              <div class="checkbox">
                📅
              </div>

              <div class="task-content">
                <div class="task-name">
                  ${escapeHTML(exam.title)}
                </div>

                <div class="task-subject">
                  ${new Date(
                    exam.exam_date
                  ).toLocaleDateString(
                    "tr-TR"
                  )}
                </div>
              </div>

              <button
                class="delete-task"
                onclick="deleteExam(${exam.id})"
              >
                🗑️
              </button>
            </div>
          `).join("")
          : `
            <div style="
              padding:25px;
              text-align:center;
              color:#8991a5;
            ">
              Henüz sınav yok. 📚
            </div>
          `
      }

    </div>
  `;
}

// =========================
// STUDY
// =========================

async function startStudy() {
  let seconds = 25 * 60;

  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = `
    <div style="
      text-align:center;
      padding:30px;
    ">
      <div
        id="timer"
        style="
          font-size:60px;
          font-weight:900;
          margin-bottom:20px;
        "
      >
        25:00
      </div>

      <button
        class="add-task"
        onclick="finishStudy()"
      >
        🎉 Çalışmayı Bitir
      </button>
    </div>
  `;

  window.studyTimer =
    setInterval(() => {
      seconds--;

      const min =
        Math.floor(seconds / 60);

      const sec =
        seconds % 60;

      const timer =
        document.getElementById(
          "timer"
        );

      if (timer) {
        timer.textContent =
          `${String(min).padStart(
            2,
            "0"
          )}:${String(sec).padStart(
            2,
            "0"
          )}`;
      }

      if (seconds <= 0) {
        finishStudy();
      }
    }, 1000);
}

async function finishStudy() {
  clearInterval(
    window.studyTimer
  );

  const { response, data } =
    await api("study", {
      method: "POST",
      body: JSON.stringify({
        duration_minutes: 25
      })
    });

  if (!response.ok) {
    showToast(
      "❌ Çalışma kaydedilemedi."
    );
    return;
  }

  await refreshUser();

  showToast(
    `🎉 Harika! +${data.xp} XP kazandın!`
  );

  showHome();
}

// =========================
// STATS
// =========================

async function showStats() {
  const { response, data } =
    await api("stats");

  if (!response.ok) return;

  const stats = data.stats;

  const list =
    document.getElementById(
      "taskList"
    );

  if (!list) return;

  list.innerHTML = `
    <div class="stats">

      <div class="stat">
        <span>📝</span>
        <strong>
          ${stats.tasks.completed}
        </strong>
        <small>
          Tamamlanan görev
        </small>
      </div>

      <div class="stat">
        <span>📚</span>
        <strong>
          ${stats.subjects}
        </strong>
        <small>
          Ders
        </small>
      </div>

      <div class="stat">
        <span>📅</span>
        <strong>
          ${stats.exams}
        </strong>
        <small>
          Sınav
        </small>
      </div>

      <div class="stat">
        <span>⏱️</span>
        <strong>
          ${stats.studyMinutes}
        </strong>
        <small>
          Çalışma dakikası
        </small>
      </div>

    </div>
  `;
}

// =========================
// HOME
// =========================

function showHome() {
  loadTasks();
}

// =========================
// MENU
// =========================

function setupMenu() {
  const buttons =
    document.querySelectorAll(
      ".menu button"
    );

  buttons.forEach(
    (button, index) => {
      button.onclick = () => {

        buttons.forEach(
          b =>
            b.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        if (index === 0) {
          showHome();
        }

        if (index === 1) {
          loadTasks();
        }

        if (index === 2) {
          showSubjects();
        }

        if (index === 3) {
          showExams();
        }

        if (index === 4) {
          startStudy();
        }

        if (index === 5) {
          showStats();
        }
      };
    }
  );
}

document.addEventListener(
  "DOMContentLoaded",
  setupMenu
);

// =========================
// USER
// =========================

async function refreshUser() {
  const { response, data } =
    await api("me");

  if (response.ok) {
    currentUser =
      data.user;

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
        levelXP / 250 * 100
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

// =========================
// AUTH UI
// =========================

function showAuth() {
  document.getElementById(
    "authScreen"
  ).style.display = "flex";

  document.getElementById(
    "app"
  ).style.display = "none";
}

function showApp() {
  document.getElementById(
    "authScreen"
  ).style.display = "none";

  document.getElementById(
    "app"
  ).style.display = "block";
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
    element.textContent = text;
  }
}

// =========================
// LOGOUT
// =========================

async function logout() {
  await api("logout", {
    method: "POST"
  });

  currentUser = null;

  location.reload();
}

// =========================
// TOAST
// =========================

function showToast(text) {
  const old =
    document.getElementById(
      "toast"
    );

  if (old) old.remove();

  const toast =
    document.createElement(
      "div"
    );

  toast.id = "toast";

  toast.textContent = text;

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

// =========================
// HELPERS
// =========================

function setText(id, value) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function escapeHTML(text) {
  const div =
    document.createElement(
      "div"
    );

  div.textContent = text;

  return div.innerHTML;
}
