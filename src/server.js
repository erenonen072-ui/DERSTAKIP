const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "DEVELOPMENT_SECRET_CHANGE_THIS";


// ======================================
// MIDDLEWARE
// ======================================

app.use(express.json());

app.use(cookieParser());

app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);


// ======================================
// TOKEN
// ======================================

function createToken(user) {

    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

}


// ======================================
// GİRİŞ KONTROLÜ
// ======================================

function requireLogin(req, res, next) {

    const token =
        req.cookies.ders_takip_token;

    if (!token) {

        return res.status(401).json({
            success: false,
            message: "Giriş yapmalısın."
        });

    }

    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Oturum geçersiz."
        });

    }

}


// ======================================
// ANA SAYFA
// ======================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../public/index.html"
        )
    );

});


// ======================================
// KAYIT
// ======================================

app.post(
    "/api/register",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;

            if (
                !name ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Tüm alanları doldur."
                });

            }

            if (password.length < 6) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Şifre en az 6 karakter olmalı."
                });

            }

            const normalizedEmail =
                email
                    .trim()
                    .toLowerCase();

            const existing =
                db.prepare(`
                    SELECT id
                    FROM users
                    WHERE email = ?
                `).get(
                    normalizedEmail
                );

            if (existing) {

                return res.status(409).json({
                    success: false,
                    message:
                        "Bu e-posta zaten kayıtlı."
                });

            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    12
                );

            const result =
                db.prepare(`
                    INSERT INTO users
                    (
                        name,
                        email,
                        password
                    )
                    VALUES (?, ?, ?)
                `).run(
                    name.trim(),
                    normalizedEmail,
                    hashedPassword
                );

            const user =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        xp,
                        streak
                    FROM users
                    WHERE id = ?
                `).get(
                    result.lastInsertRowid
                );

            const token =
                createToken(user);

            res.cookie(
                "ders_takip_token",
                token,
                {
                    httpOnly: true,
                    sameSite: "lax",
                    secure:
                        process.env.NODE_ENV === "production",
                    maxAge:
                        7 * 24 * 60 * 60 * 1000
                }
            );

            res.status(201).json({
                success: true,
                message:
                    "Hesap oluşturuldu.",
                user
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Kayıt sırasında hata oluştu."
            });

        }

    }
);


// ======================================
// GİRİŞ
// ======================================

app.post(
    "/api/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const normalizedEmail =
                (email || "")
                    .trim()
                    .toLowerCase();

            const user =
                db.prepare(`
                    SELECT *
                    FROM users
                    WHERE email = ?
                `).get(
                    normalizedEmail
                );

            if (!user) {

                return res.status(401).json({
                    success: false,
                    message:
                        "E-posta veya şifre hatalı."
                });

            }

            const correct =
                await bcrypt.compare(
                    password || "",
                    user.password
                );

            if (!correct) {

                return res.status(401).json({
                    success: false,
                    message:
                        "E-posta veya şifre hatalı."
                });

            }

            const token =
                createToken(user);

            res.cookie(
                "ders_takip_token",
                token,
                {
                    httpOnly: true,
                    sameSite: "lax",
                    secure:
                        process.env.NODE_ENV === "production",
                    maxAge:
                        7 * 24 * 60 * 60 * 1000
                }
            );

            res.json({
                success: true,
                message:
                    "Giriş başarılı.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    xp: user.xp,
                    streak: user.streak
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Giriş sırasında hata oluştu."
            });

        }

    }
);


// ======================================
// ÇIKIŞ
// ======================================

app.post(
    "/api/logout",
    (req, res) => {

        res.clearCookie(
            "ders_takip_token"
        );

        res.json({
            success: true
        });

    }
);


// ======================================
// BEN KİMİM?
// ======================================

app.get(
    "/api/me",
    requireLogin,
    (req, res) => {

        const user =
            db.prepare(`
                SELECT
                    id,
                    name,
                    email,
                    xp,
                    streak,
                    created_at
                FROM users
                WHERE id = ?
            `).get(
                req.user.id
            );

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "Kullanıcı bulunamadı."
            });

        }

        res.json({
            success: true,
            user
        });

    }
);


// ======================================
// GÖREVLERİ GETİR
// ======================================

app.get(
    "/api/tasks",
    requireLogin,
    (req, res) => {

        const tasks =
            db.prepare(`
                SELECT
                    id,
                    title,
                    completed,
                    xp,
                    created_at
                FROM tasks
                WHERE user_id = ?
                ORDER BY id DESC
            `).all(
                req.user.id
            );

        res.json({
            success: true,
            tasks
        });

    }
);


// ======================================
// GÖREV EKLE
// ======================================

app.post(
    "/api/tasks",
    requireLogin,
    (req, res) => {

        try {

            const {
                title
            } = req.body;

            if (
                !title ||
                !title.trim()
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Görev adı boş olamaz."
                });

            }

            const result =
                db.prepare(`
                    INSERT INTO tasks
                    (
                        user_id,
                        title,
                        completed,
                        xp
                    )
                    VALUES (?, ?, 0, 50)
                `).run(
                    req.user.id,
                    title.trim()
                );

            const task =
                db.prepare(`
                    SELECT
                        id,
                        title,
                        completed,
                        xp,
                        created_at
                    FROM tasks
                    WHERE id = ?
                `).get(
                    result.lastInsertRowid
                );

            res.status(201).json({
                success: true,
                task
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Görev eklenemedi."
            });

        }

    }
);


// ======================================
// GÖREV TAMAMLA / GERİ AL
// ======================================

app.patch(
    "/api/tasks/:id",
    requireLogin,
    (req, res) => {

        try {

            const taskId =
                Number(req.params.id);

            const task =
                db.prepare(`
                    SELECT *
                    FROM tasks
                    WHERE id = ?
                    AND user_id = ?
                `).get(
                    taskId,
                    req.user.id
                );

            if (!task) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Görev bulunamadı."
                });

            }

            const newCompleted =
                task.completed ? 0 : 1;

            db.transaction(() => {

                db.prepare(`
                    UPDATE tasks
                    SET completed = ?
                    WHERE id = ?
                    AND user_id = ?
                `).run(
                    newCompleted,
                    taskId,
                    req.user.id
                );

                if (newCompleted === 1) {

                    db.prepare(`
                        UPDATE users
                        SET xp = xp + ?
                        WHERE id = ?
                    `).run(
                        task.xp,
                        req.user.id
                    );

                } else {

                    db.prepare(`
                        UPDATE users
                        SET xp =
                            MAX(0, xp - ?)
                        WHERE id = ?
                    `).run(
                        task.xp,
                        req.user.id
                    );

                }

            })();

            const updated =
                db.prepare(`
                    SELECT
                        id,
                        title,
                        completed,
                        xp,
                        created_at
                    FROM tasks
                    WHERE id = ?
                `).get(
                    taskId
                );

            res.json({
                success: true,
                task: updated
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Görev güncellenemedi."
            });

        }

    }
);


// ======================================
// GÖREV SİL
// ======================================

app.delete(
    "/api/tasks/:id",
    requireLogin,
    (req, res) => {

        try {

            const taskId =
                Number(req.params.id);

            const task =
                db.prepare(`
                    SELECT *
                    FROM tasks
                    WHERE id = ?
                    AND user_id = ?
                `).get(
                    taskId,
                    req.user.id
                );

            if (!task) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Görev bulunamadı."
                });

            }

            db.transaction(() => {

                if (task.completed) {

                    db.prepare(`
                        UPDATE users
                        SET xp =
                            MAX(0, xp - ?)
                        WHERE id = ?
                    `).run(
                        task.xp,
                        req.user.id
                    );

                }

                db.prepare(`
                    DELETE FROM tasks
                    WHERE id = ?
                    AND user_id = ?
                `).run(
                    taskId,
                    req.user.id
                );

            })();

            res.json({
                success: true
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message:
                    "Görev silinemedi."
            });

        }

    }
);


// ======================================
// TEST
// ======================================

app.get(
    "/api/test",
    (req, res) => {

        res.json({
            success: true,
            message:
                "DersTakip backend çalışıyor 🚀"
        });

    }
);


// ======================================
// 404
// ======================================

app.use(
    (req, res) => {

        if (
            req.path.startsWith("/api/")
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "API bulunamadı."
            });

        }

        res.sendFile(
            path.join(
                __dirname,
                "../public/index.html"
            )
        );

    }
);


// ======================================
// SUNUCU
// ======================================

app.listen(
    PORT,
    () => {

        console.log(
            `🚀 DersTakip ${PORT} portunda çalışıyor.`
        );

    }
);
