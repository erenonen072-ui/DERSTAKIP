let currentUser = null;

const API = "/api";

/* =========================
   BAŞLANGIÇ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    loadApp
);


/* =========================
   API
========================= */

async function api(action, options = {}) {

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
            await response
                .json()
                .catch(() => ({}));

        return {
            response,
            data
        };

    } catch (error) {

        console.error("API ERROR:", error);

        throw error;
    }
}


/* =========================
   APP BAŞLAT
========================= */

async function loadApp() {

    try {

        const {
            response,
            data
        } = await api("me");

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


/* =========================
   LOGIN
========================= */

async function login(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;

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
                (data.message ||
                    "Giriş başarısız.")
            );

            return;
        }

        currentUser = data.user;

        showApp();

        updateUser();

        await loadTasks();

        showToast(
            "👋 Hoş geldin!"
        );

    } catch (error) {

        console.error(error);

        setAuthMessage(
            "❌ Sunucuya bağlanılamadı."
        );
    }
}


/* =========================
   REGISTER
========================= */

async function register(event) {

    event.preventDefault();

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();

    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("registerPassword")
            .value;

    if (password.length < 6) {

        setAuthMessage(
            "❌ Şifre en az 6 karakter olmalı."
        );

        return;
    }

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
                (data.message ||
                    "Kayıt başarısız.")
            );

            return;
        }

        currentUser = data.user;

        showApp();

        updateUser();

        await loadTasks();

        showToast(
            "🎉 Hesabın oluşturuldu!"
        );

    } catch (error) {

        console.error(error);

        setAuthMessage(
            "❌ Sunucuya bağlanılamadı."
        );
    }
}


/* =========================
   TASKS
========================= */

async function loadTasks() {

    try {

        const {
            response,
            data
        } = await api("tasks");

        if (!response.ok) {

            return;
        }

        renderTasks(
            data.tasks || []
        );

    } catch (error) {

        console.error(error);
    }
}


/* =========================
   TASK RENDER
========================= */

function renderTasks(tasks) {

    const list =
        document.getElementById(
            "taskList"
        );

    if (!list) {

        return;
    }

    list.innerHTML = "";

    if (tasks.length === 0) {

        list.innerHTML = `
            <div
                style="
                    padding:30px 10px;
                    text-align:center;
                    color:#8991a5;
                "
            >
                <div style="font-size:38px;margin-bottom:8px;">
                    🎯
                </div>

                Henüz görev yok.
                <br>

                <small>
                    İlk görevini ekle!
                </small>
            </div>
        `;

        updateTaskStats(tasks);

        return;
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
                aria-label="Görevi tamamla"
            >
                ${
                    task.completed
                        ? "✓"
                        : ""
                }
            </div>

            <div class="task-content">

                <div class="task-name">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-subject">
                    🎓 Öğrenci görevi
                </div>

            </div>

            <div class="task-xp">
                +${Number(task.xp) || 50} XP
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


/* =========================
   TASK EKLE
========================= */

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

        input.focus();

        return;
    }

    try {

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
                (data.message ||
                    "Görev eklenemedi.")
            );

            return;
        }

        input.value = "";

        await loadTasks();

        showToast(
            "✅ Görev eklendi!"
        );

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Bir hata oluştu."
        );
    }
}


/* =========================
   ENTER İLE GÖREV EKLE
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.id === "newTask"
        ) {

            event.preventDefault();

            addTask();
        }
    }
);


/* =========================
   TASK TAMAMLA
========================= */

async function toggleTask(id) {

    try {

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
                (data.message ||
                    "İşlem başarısız.")
            );

            return;
        }

        await refreshUser();

        await loadTasks();

        if (data.completed) {

            showToast(
                "🎉 Görev tamamlandı! +50 XP"
            );

        } else {

            showToast(
                "↩️ Görev yeniden açıldı."
            );
        }

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Bir hata oluştu."
        );
    }
}


/* =========================
   TASK SİL
========================= */

async function deleteTask(id) {

    if (
        !confirm(
            "Bu görevi silmek istediğine emin misin?"
        )
    ) {

        return;
    }

    try {

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
                (data.message ||
                    "Görev silinemedi.")
            );

            return;
        }

        await refreshUser();

        await loadTasks();

        showToast(
            "🗑️ Görev silindi."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Bir hata oluştu."
        );
    }
}


/* =========================
   USER YENİLE
========================= */

async function refreshUser() {

    try {

        const {
            response,
            data
        } = await api("me");

        if (response.ok) {

            currentUser = data.user;

            updateUser();
        }

    } catch (error) {

        console.error(error);
    }
}


/* =========================
   USER UI
========================= */

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
        levelXP + " / 250 XP"
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


/* =========================
   TASK STATS
========================= */

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


/* =========================
   AUTH UI
========================= */

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


/* =========================
   LOGIN TAB
========================= */

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

    setAuthMessage("");
}


/* =========================
   REGISTER TAB
========================= */

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

    setAuthMessage("");
}


/* =========================
   MESSAGE
========================= */

function setAuthMessage(text) {

    const element =
        document.getElementById(
            "authMessage"
        );

    if (element) {

        element.textContent = text;
    }
}


/* =========================
   LOGOUT
========================= */

async function logout() {

    try {

        await api(
            "logout",
            {
                method: "POST"
            }
        );

    } catch (error) {

        console.error(error);
    }

    currentUser = null;

    location.reload();
}


/* =========================
   MOBILE NAV
========================= */

function mobileNav(button) {

    document
        .querySelectorAll(
            ".mobile-nav button"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );

    button.classList.add("active");

    const text =
        button.innerText.trim();

    if (text.includes("Görevler")) {

        document
            .getElementById("taskList")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        showToast(
            "✅ Görevlerin burada!"
        );

        return;
    }

    if (text.includes("Dersler")) {

        showToast(
            "📚 Dersler bölümü yakında!"
        );

        return;
    }

    if (text.includes("Odaklan")) {

        showToast(
            "⏱️ Odaklan modu yakında!"
        );

        return;
    }

    if (text.includes("Profil")) {

        showToast(
            "👤 Profil bölümü yakında!"
        );

        return;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   TOAST
========================= */

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

    toast.textContent = text;

    toast.style.cssText = `
        position:fixed;
        left:50%;
        transform:translateX(-50%);
        bottom:92px;
        background:#15182b;
        color:white;
        padding:13px 18px;
        border-radius:14px;
        z-index:99999;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
        font-size:13px;
        font-weight:700;
        max-width:90%;
        text-align:center;
        animation:toastIn .25s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(
        () => {

            if (toast) {

                toast.remove();
            }

        },
        2500
    );
}


/* =========================
   HELPERS
========================= */

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


/* =========================
   TOAST ANIMATION
========================= */

const toastStyle =
    document.createElement("style");

toastStyle.textContent = `
    @keyframes toastIn {
        from {
            opacity:0;
            transform:
                translate(-50%,20px);
        }

        to {
            opacity:1;
            transform:
                translate(-50%,0);
        }
    }
`;

document.head.appendChild(
    toastStyle
);
