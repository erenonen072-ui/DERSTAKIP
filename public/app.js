let currentUser = null;


// ======================================
// SAYFA BAŞLANGICI
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadApp();

    }
);


// ======================================
// UYGULAMAYI YÜKLE
// ======================================

async function loadApp() {

    try {

        const response =
            await fetch("/api/me");

        if (!response.ok) {

            showAuth();

            return;

        }

        const data =
            await response.json();

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


// ======================================
// GİRİŞ
// ======================================

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

        const response =
            await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

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


// ======================================
// KAYIT
// ======================================

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

        const response =
            await fetch(
                "/api/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

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


// ======================================
// GÖREVLERİ GETİR
// ======================================

async function loadTasks() {

    const response =
        await fetch(
            "/api/tasks"
        );

    if (!response.ok) {

        return;

    }

    const data =
        await response.json();

    renderTasks(
        data.tasks
    );

}


// ======================================
// GÖREVLERİ EKRANA BAS
// ======================================

function renderTasks(tasks) {

    const list =
        document.getElementById(
            "taskList"
        );

    if (!list) {

        return;

    }

    list.innerHTML = "";

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

        list.appendChild(
            item
        );

    });


    updateTaskStats(
        tasks
    );

}


// ======================================
// GÖREV EKLE
// ======================================

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

    try {

        const response =
            await fetch(
                "/api/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title
                    })
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

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

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Sunucu hatası."
        );

    }

}


// ======================================
// GÖREV TAMAMLA
// ======================================

async function toggleTask(id) {

    try {

        const response =
            await fetch(
                `/api/tasks/${id}`,
                {
                    method: "PATCH"
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            showToast(
                "❌ " +
                data.message
            );

            return;

        }

        await refreshUser();

        await loadTasks();

        if (
            data.task.completed
        ) {

            showToast(
                "🎉 Görev tamamlandı! +"
                + data.task.xp
                + " XP"
            );

        } else {

            showToast(
                "Görev yeniden açıldı."
            );

        }

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Sunucu hatası."
        );

    }

}


// ======================================
// GÖREV SİL
// ======================================

async function deleteTask(id) {

    const confirmed =
        confirm(
            "Bu görevi silmek istediğine emin misin?"
        );

    if (!confirmed) {

        return;

    }

    try {

        const response =
            await fetch(
                `/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

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

    } catch (error) {

        console.error(error);

        showToast(
            "❌ Sunucu hatası."
        );

    }

}


// ======================================
// KULLANICIYI YENİLE
// ======================================

async function refreshUser() {

    const response =
        await fetch(
            "/api/me"
        );

    if (!response.ok) {

        return;

    }

    const data =
        await response.json();

    currentUser =
        data.user;

    updateUser();

}


// ======================================
// KULLANICI BİLGİLERİ
// ======================================

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
                (levelXP / 250) * 100
            )
        );


    const levelText =
        document.getElementById(
            "levelText"
        );

    if (levelText) {

        levelText.textContent =
            "Seviye " +
            level;

    }


    const xpText =
        document.getElementById(
            "xpText"
        );

    if (xpText) {

        xpText.textContent =
            levelXP +
            " / 250 XP";

    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {

        progressBar.style.width =
            progress + "%";

    }


    const statXP =
        document.getElementById(
            "statXP"
        );

    if (statXP) {

        statXP.textContent =
            xp;

    }


    const statStreak =
        document.getElementById(
            "statStreak"
        );

    if (statStreak) {

        statStreak.textContent =
            streak;

    }


    const streakNumber =
        document.getElementById(
            "streakNumber"
        );

    if (streakNumber) {

        streakNumber.textContent =
            streak;

    }

}


// ======================================
// GÖREV İSTATİSTİKLERİ
// ======================================

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


    const counter =
        document.getElementById(
            "taskCounter"
        );

    if (counter) {

        counter.textContent =
            completed +
            " / " +
            total;

    }


    const statTasks =
        document.getElementById(
            "statTasks"
        );

    if (statTasks) {

        statTasks.textContent =
            completed;

    }


    const summary =
        document.getElementById(
            "taskSummary"
        );

    if (summary) {

        summary.textContent =
            completed +
            " / " +
            total +
            " görev tamamlandı.";

    }

}


// ======================================
// GİRİŞ EKRANI
// ======================================

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


// ======================================
// UYGULAMA EKRANI
// ======================================

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


// ======================================
// SEKME
// ======================================

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


// ======================================
// AUTH MESAJ
// ======================================

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


// ======================================
// ÇIKIŞ
// ======================================

async function logout() {

    await fetch(
        "/api/logout",
        {
            method: "POST"
        }
    );

    currentUser =
        null;

    location.reload();

}


// ======================================
// BİLDİRİM
// ======================================

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


    toast.style.position =
        "fixed";

    toast.style.right =
        "20px";

    toast.style.bottom =
        "20px";

    toast.style.background =
        "#15182b";

    toast.style.color =
        "white";

    toast.style.padding =
        "14px 18px";

    toast.style.borderRadius =
        "12px";

    toast.style.zIndex =
        "99999";

    toast.style.boxShadow =
        "0 10px 30px #0004";


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        2500
    );

}


// ======================================
// GÜVENLİ HTML
// ======================================

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
