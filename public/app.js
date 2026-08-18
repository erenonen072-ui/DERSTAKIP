let currentUser = null;

const API = "/api";

let focusSeconds = 25 * 60;
let focusInterval = null;
let focusRunning = false;


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

    try {

        const {
            response,
            data
        } =
            await api("me");

        if (!response.ok) {

            showAuth();

            return;
        }

        currentUser =
            data.user;

        showApp();

        updateUser();

        updateProfileScreen();

        await loadTasks();

        await loadSubjects();

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
            .value
            .trim();

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

        currentUser =
            data.user;

        showApp();

        updateUser();

        updateProfileScreen();

        await loadTasks();

        await loadSubjects();

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
            .value
            .trim();

    const email =
        document
            .getElementById(
                "registerEmail"
            )
            .value
            .trim();

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

        currentUser =
            data.user;

        showApp();

        updateUser();

        updateProfileScreen();

        await loadTasks();

        await loadSubjects();

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
            await api("tasks");

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
            <div style="
                padding:25px 0;
                text-align:center;
                color:#8991a5;
            ">
                Henüz görev yok. 🎯
            </div>
        `;

    } else {

        tasks.forEach(task => {

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

            list.appendChild(item);
        });
    }

    updateTaskStats(tasks);
}


// =====================================
// ADD TASK
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


// =====================================
// TOGGLE TASK
// =====================================

async function toggleTask(id) {

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

    await refreshUser();

    await loadTasks();

    showToast(
        data.completed
            ? "🎉 Görev tamamlandı! +50 XP"
            : "Görev yeniden açıldı."
    );
}


// =====================================
// DELETE TASK
// =====================================

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

    if (!response.ok) {

        showToast(
            "❌ " +
            (
                data.message ||
                "Silinemedi."
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


// =====================================
// USER
// =====================================

async function refreshUser() {

    const {
        response,
        data
    } =
        await api("me");

    if (response.ok) {

        currentUser =
            data.user;

        updateUser();

        updateProfileScreen();
    }
}


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

function updateTaskStats(tasks) {

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
// SUBJECTS
// =====================================

async function loadSubjects() {

    try {

        const {
            response,
            data
        } =
            await api("subjects");

        if (!response.ok) {
            return;
        }

        renderSubjects(
            data.subjects || []
        );

    } catch (error) {

        console.error(error);
    }
}


function renderSubjects(subjects) {

    const list =
        document.getElementById(
            "subjectList"
        );

    const counter =
        document.getElementById(
            "subjectCount"
        );

    if (!list) {
        return;
    }

    counter.textContent =
        subjects.length;

    list.innerHTML = "";

    if (subjects.length === 0) {

        list.innerHTML = `
            <div style="
                text-align:center;
                padding:25px;
                color:#8991a5;
            ">
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

            <div class="subject-icon">
                📚
            </div>

            <div class="subject-name">
                ${escapeHTML(
                    subject.name
                )}
            </div>

            <button
                class="subject-delete"
                onclick="deleteSubject(${subject.id})"
            >
                🗑️
            </button>
        `;

        list.appendChild(item);
    });
}


async function addSubject() {

    const input =
        document.getElementById(
            "subjectInput"
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
    } =
        await api(
            "subjects",
            {
                method: "POST",

                body:
                    JSON.stringify({
                        name
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

    const {
        response
    } =
        await api(
            "subjects",
            {
                method: "DELETE",

                body:
                    JSON.stringify({
                        id
                    })
            }
        );

    if (!response.ok) {

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


// =====================================
// FOCUS
// =====================================

function updateFocusTimer() {

    const timer =
        document.getElementById(
            "focusTimer"
        );

    if (!timer) {
        return;
    }

    const minutes =
        Math.floor(
            focusSeconds / 60
        );

    const seconds =
        focusSeconds % 60;

    timer.textContent =
        String(minutes)
            .padStart(2, "0") +
        ":" +
        String(seconds)
            .padStart(2, "0");
}


function startFocus() {

    if (focusRunning) {
        return;
    }

    focusRunning = true;

    setText(
        "focusStatus",
        "🔥 Odaklanıyorsun..."
    );

    focusInterval =
        setInterval(() => {

            if (focusSeconds <= 0) {

                clearInterval(
                    focusInterval
                );

                focusRunning = false;

                completeFocus();

                return;
            }

            focusSeconds--;

            updateFocusTimer();

        }, 1000);
}


function pauseFocus() {

    if (!focusRunning) {
        return;
    }

    clearInterval(
        focusInterval
    );

    focusRunning = false;

    setText(
        "focusStatus",
        "⏸ Duraklatıldı"
    );
}


function resetFocus() {

    clearInterval(
        focusInterval
    );

    focusRunning = false;

    focusSeconds =
        25 * 60;

    updateFocusTimer();

    setText(
        "focusStatus",
        "Hazır mısın?"
    );
}


async function completeFocus() {

    setText(
        "focusStatus",
        "🎉 25 dakika tamamlandı!"
    );

    try {

        const {
            response,
            data
        } =
            await api(
                "focus",
                {
                    method: "POST",

                    body:
                        JSON.stringify({
                            duration: 25
                        })
                }
            );

        if (response.ok) {

            currentUser =
                data.user;

            updateUser();

            updateProfileScreen();

            showToast(
                "🎉 Odaklanma tamamlandı! +25 XP"
            );

        } else {

            showToast(
                "⚠️ Oturum kaydedilemedi."
            );
        }

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Sunucu hatası."
        );
    }

    focusSeconds =
        25 * 60;

    updateFocusTimer();
}


// =====================================
// SCREENS
// =====================================

function hideExtraScreens() {

    document
        .querySelectorAll(
            ".extra-screen"
        )
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );
        });

    const main =
        document.querySelector(
            ".main"
        );

    if (main) {
        main.style.display =
            "block";
    }
}


function showExtraScreen(id) {

    const main =
        document.querySelector(
            ".main"
        );

    if (main) {

        main.style.display =
            "none";
    }

    document
        .querySelectorAll(
            ".extra-screen"
        )
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );
        });

    const screen =
        document.getElementById(id);

    if (screen) {

        screen.classList.add(
            "active"
        );
    }
}


function mobileHome() {

    hideExtraScreens();

    setMobileNavActive(0);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function mobileSubjects() {

    showExtraScreen(
        "subjectsScreen"
    );

    setMobileNavActive(1);

    loadSubjects();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function mobileFocus() {

    showExtraScreen(
        "focusScreen"
    );

    setMobileNavActive(2);

    updateFocusTimer();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function mobileProfile() {

    showExtraScreen(
        "profileScreen"
    );

    setMobileNavActive(3);

    updateProfileScreen();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function setMobileNavActive(index) {

    document
        .querySelectorAll(
            ".mobile-nav-item"
        )
        .forEach(
            (button, i) => {

                button.classList.toggle(
                    "active",
                    i === index
                );
            }
        );
}


// =====================================
// PROFILE
// =====================================

function updateProfileScreen() {

    if (!currentUser) {
        return;
    }

    const name =
        currentUser.name ||
        "Öğrenci";

    const email =
        currentUser.email ||
        "-";

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

    setText(
        "profileName",
        name
    );

    setText(
        "profileEmail",
        email
    );

    setText(
        "profileName2",
        name
    );

    setText(
        "profileEmail2",
        email
    );

    setText(
        "profileXP",
        xp
    );

    setText(
        "profileStreak",
        streak
    );

    setText(
        "profileLevel",
        level
    );

    setText(
        "profileLevel2",
        level
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

    mobileHome();
}


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


// =====================================
// TOAST
// =====================================

function showToast(text) {

    showMobileToast(text);
}


function showMobileToast(message) {

    const toast =
        document.getElementById(
            "mobileToast"
        );

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
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
        text;

    return div.innerHTML;
}


// =====================================
// ENTER = GÖREV EKLE
// =====================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.id ===
                "newTask"
        ) {

            addTask();
        }

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.id ===
                "subjectInput"
        ) {

            addSubject();
        }
    }
);


// =====================================
// TIMER BAŞLANGIÇ
// =====================================

updateFocusTimer();
