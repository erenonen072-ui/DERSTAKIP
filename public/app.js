// ========================================
// DERS TAKİP - UYGULAMA MOTORU
// ========================================

let tasks = [
    {
        id: 1,
        title: "Matematikten 20 soru çöz",
        subject: "Matematik",
        completed: true,
        xp: 50
    },
    {
        id: 2,
        title: "İngilizce 15 kelime tekrar et",
        subject: "İngilizce",
        completed: true,
        xp: 50
    },
    {
        id: 3,
        title: "Fen konusunu tekrar et",
        subject: "Fen Bilimleri",
        completed: false,
        xp: 50
    }
];

let user = {
    name: "Öğrenci",
    xp: 670,
    streak: 7,
    level: 4
};


// ========================================
// SAYFA YÜKLENDİĞİNDE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    loadTasks();

    updateUser();

    setupMenu();

});


// ========================================
// GÖREVLERİ YÜKLE
// ========================================

function loadTasks() {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const taskElement =
            document.createElement("div");

        taskElement.className =
            "task" +
            (task.completed ? " completed" : "");

        taskElement.innerHTML = `

            <div
                class="checkbox"
                onclick="toggleTask(${task.id})"
            >
                ${task.completed ? "✓" : "☐"}
            </div>

            <div>

                <div class="task-name">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-subject">
                    ${escapeHTML(task.subject)}
                </div>

            </div>

            <div class="task-xp">
                +${task.xp} XP
            </div>

        `;

        taskList.appendChild(taskElement);

    });

    updateTaskCounter();

}


// ========================================
// GÖREVİ TAMAMLA / GERİ AL
// ========================================

function toggleTask(id) {

    const task =
        tasks.find(item => item.id === id);

    if (!task) return;


    if (!task.completed) {

        task.completed = true;

        user.xp += task.xp;

        showNotification(
            "🎉 Görev tamamlandı! +" +
            task.xp +
            " XP"
        );

    } else {

        task.completed = false;

        user.xp -= task.xp;

        if (user.xp < 0) {
            user.xp = 0;
        }

        showNotification(
            "Görev tekrar açıldı."
        );

    }


    checkLevel();

    loadTasks();

    updateUser();

}


// ========================================
// YENİ GÖREV EKLE
// ========================================

function addTask() {

    const input =
        document.getElementById("newTask");

    if (!input) return;


    const title =
        input.value.trim();


    if (title === "") {

        showNotification(
            "⚠️ Önce görev yaz!"
        );

        return;

    }


    const newTask = {

        id: Date.now(),

        title: title,

        subject: "Kişisel görev",

        completed: false,

        xp: 50

    };


    tasks.push(newTask);


    input.value = "";


    loadTasks();


    showNotification(
        "✅ Yeni görev eklendi!"
    );

}


// ========================================
// GÖREV SAYACI
// ========================================

function updateTaskCounter() {

    const counter =
        document.querySelector(
            ".card-title span"
        );

    if (!counter) return;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    counter.textContent =
        completed +
        " / " +
        tasks.length +
        " tamamlandı";

}


// ========================================
// KULLANICI BİLGİLERİNİ GÜNCELLE
// ========================================

function updateUser() {

    const profile =
        document.querySelector(".profile strong");

    if (profile) {

        profile.textContent =
            "Seviye " +
            user.level;

    }


    const welcome =
        document.querySelector(".welcome h1");

    if (welcome) {

        welcome.textContent =
            "Merhaba, " +
            user.name +
            "! 👋";

    }


    const xpElement =
        document.querySelector(".xp");

    if (xpElement) {

        const nextLevel =
            user.level * 250;

        xpElement.textContent =
            user.xp +
            " / " +
            nextLevel +
            " XP";

    }


    const streakElement =
        document.querySelector(
            ".streak-box h3"
        );

    if (streakElement) {

        streakElement.textContent =
            "🔥 " +
            user.streak +
            " Günlük Seri";

    }

}


// ========================================
// SEVİYE KONTROLÜ
// ========================================

function checkLevel() {

    const newLevel =
        Math.floor(user.xp / 250) + 1;


    if (newLevel > user.level) {

        user.level =
            newLevel;

        showNotification(
            "🏆 Seviye atladın! Seviye " +
            user.level
        );

    }

}


// ========================================
// MENÜ
// ========================================

function setupMenu() {

    const buttons =
        document.querySelectorAll(
            ".menu button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );

            }
        );

    });

}


// ========================================
// BİLDİRİM
// ========================================

function showNotification(message) {

    let notification =
        document.getElementById(
            "notification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "notification";


        notification.style.position =
            "fixed";

        notification.style.right =
            "25px";

        notification.style.bottom =
            "25px";

        notification.style.background =
            "#15182b";

        notification.style.color =
            "white";

        notification.style.padding =
            "15px 20px";

        notification.style.borderRadius =
            "14px";

        notification.style.zIndex =
            "9999";

        notification.style.boxShadow =
            "0 10px 30px #0003";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.style.display =
        "block";


    setTimeout(() => {

        notification.style.display =
            "none";

    }, 2500);

}


// ========================================
// GÜVENLİ HTML
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ========================================
// KLAVYE KISAYOLU
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            document.activeElement.id ===
            "newTask"
        ) {

            addTask();

        }

    }
);
