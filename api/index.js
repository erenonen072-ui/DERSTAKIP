import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = process.env.JWT_SECRET;

function send(res, status, data) {
  return res.status(status).json(data);
}

function getToken(req) {
  const cookies = req.headers.cookie || "";

  const match = cookies.match(
    /(?:^|;\s*)token=([^;]+)/
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function getUser(req) {
  try {
    const token = getToken(req);

    if (!token || !JWT_SECRET) {
      return null;
    }

    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `token=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    "token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"
  );
}

export default async function handler(req, res) {
  try {
    const action =
      req.query.action || "health";

    // =========================
    // HEALTH
    // =========================

    if (action === "health") {
      const result = await sql`
        SELECT NOW() AS time
      `;

      return send(res, 200, {
        success: true,
        message: "DersTakip 2.0 🚀",
        database: "connected",
        time: result[0].time
      });
    }

    // =========================
    // REGISTER
    // =========================

    if (
      action === "register" &&
      req.method === "POST"
    ) {
      const {
        name,
        email,
        password
      } = req.body || {};

      if (
        !name ||
        !email ||
        !password
      ) {
        return send(res, 400, {
          message:
            "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          message:
            "Şifre en az 6 karakter olmalı."
        });
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const existing =
        await sql`
          SELECT id
          FROM users
          WHERE email = ${normalizedEmail}
          LIMIT 1
        `;

      if (existing.length > 0) {
        return send(res, 409, {
          message:
            "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const result =
        await sql`
          INSERT INTO users
          (
            name,
            email,
            password,
            xp,
            streak
          )
          VALUES
          (
            ${name.trim()},
            ${normalizedEmail},
            ${hashedPassword},
            0,
            0
          )
          RETURNING
            id,
            name,
            email,
            xp,
            streak
        `;

      const user = result[0];

      const token =
        jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

      setCookie(res, token);

      return send(res, 201, {
        success: true,
        user
      });
    }

    // =========================
    // LOGIN
    // =========================

    if (
      action === "login" &&
      req.method === "POST"
    ) {
      const {
        email,
        password
      } = req.body || {};

      if (
        !email ||
        !password
      ) {
        return send(res, 400, {
          message:
            "E-posta ve şifre gerekli."
        });
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const result =
        await sql`
          SELECT *
          FROM users
          WHERE email = ${normalizedEmail}
          LIMIT 1
        `;

      if (result.length === 0) {
        return send(res, 401, {
          message:
            "E-posta veya şifre hatalı."
        });
      }

      const user = result[0];

      const valid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!valid) {
        return send(res, 401, {
          message:
            "E-posta veya şifre hatalı."
        });
      }

      const token =
        jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

      setCookie(res, token);

      delete user.password;

      return send(res, 200, {
        success: true,
        user
      });
    }

    // =========================
    // LOGOUT
    // =========================

    if (
      action === "logout" &&
      req.method === "POST"
    ) {
      clearCookie(res);

      return send(res, 200, {
        success: true,
        message: "Çıkış yapıldı."
      });
    }

    // =========================
    // CURRENT USER
    // =========================

    if (action === "me") {
      const authUser =
        getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message:
            "Oturum bulunamadı."
        });
      }

      const result =
        await sql`
          SELECT
            id,
            name,
            email,
            xp,
            streak,
            created_at
          FROM users
          WHERE id = ${authUser.id}
          LIMIT 1
        `;

      if (result.length === 0) {
        clearCookie(res);

        return send(res, 401, {
          message:
            "Kullanıcı bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user: result[0]
      });
    }

    // =========================
    // AUTH KONTROLÜ
    // =========================

    const authUser =
      getUser(req);

    if (!authUser) {
      return send(res, 401, {
        message:
          "Giriş yapmalısın."
      });
    }

    const userId =
      authUser.id;

    // =========================
    // TASKS GET
    // =========================

    if (
      action === "tasks" &&
      req.method === "GET"
    ) {
      const tasks =
        await sql`
          SELECT
            id,
            title,
            completed,
            xp,
            created_at
          FROM tasks
          WHERE user_id = ${userId}
          ORDER BY
            completed ASC,
            created_at DESC
        `;

      return send(res, 200, {
        success: true,
        tasks
      });
    }

    // =========================
    // TASK ADD
    // =========================

    if (
      action === "tasks" &&
      req.method === "POST"
    ) {
      const {
        title
      } = req.body || {};

      if (!title || !title.trim()) {
        return send(res, 400, {
          message:
            "Görev adı gerekli."
        });
      }

      const result =
        await sql`
          INSERT INTO tasks
          (
            user_id,
            title,
            completed,
            xp
          )
          VALUES
          (
            ${userId},
            ${title.trim()},
            FALSE,
            50
          )
          RETURNING *
        `;

      return send(res, 201, {
        success: true,
        task: result[0]
      });
    }

    // =========================
    // TASK TOGGLE
    // =========================

    if (
      action === "tasks" &&
      req.method === "PATCH"
    ) {
      const {
        id
      } = req.body || {};

      const result =
        await sql`
          SELECT *
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${userId}
          LIMIT 1
        `;

      if (result.length === 0) {
        return send(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        result[0];

      const newCompleted =
        !task.completed;

      await sql`
        UPDATE tasks
        SET completed =
          ${newCompleted}
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      if (newCompleted) {
        await sql`
          UPDATE users
          SET xp = xp + ${task.xp}
          WHERE id = ${userId}
        `;
      } else {
        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${task.xp}
          )
          WHERE id = ${userId}
        `;
      }

      return send(res, 200, {
        success: true,
        completed:
          newCompleted
      });
    }

    // =========================
    // TASK DELETE
    // =========================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const {
        id
      } = req.body || {};

      const result =
        await sql`
          SELECT *
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${userId}
          LIMIT 1
        `;

      if (result.length === 0) {
        return send(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        result[0];

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${task.xp}
          )
          WHERE id = ${userId}
        `;
      }

      await sql`
        DELETE FROM tasks
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =========================
    // SUBJECTS
    // =========================

    if (
      action === "subjects" &&
      req.method === "GET"
    ) {
      const subjects =
        await sql`
          SELECT *
          FROM subjects
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
        `;

      return send(res, 200, {
        success: true,
        subjects
      });
    }

    if (
      action === "subjects" &&
      req.method === "POST"
    ) {
      const {
        name,
        color
      } = req.body || {};

      if (!name || !name.trim()) {
        return send(res, 400, {
          message:
            "Ders adı gerekli."
        });
      }

      const result =
        await sql`
          INSERT INTO subjects
          (
            user_id,
            name,
            color
          )
          VALUES
          (
            ${userId},
            ${name.trim()},
            ${color || "#6c63ff"}
          )
          RETURNING *
        `;

      return send(res, 201, {
        success: true,
        subject: result[0]
      });
    }

    // =========================
    // EXAMS
    // =========================

    if (
      action === "exams" &&
      req.method === "GET"
    ) {
      const exams =
        await sql`
          SELECT
            exams.*,
            subjects.name AS subject_name,
            subjects.color AS subject_color
          FROM exams
          LEFT JOIN subjects
            ON subjects.id =
              exams.subject_id
          WHERE
            exams.user_id =
              ${userId}
          ORDER BY
            exam_date ASC
        `;

      return send(res, 200, {
        success: true,
        exams
      });
    }

    if (
      action === "exams" &&
      req.method === "POST"
    ) {
      const {
        title,
        subject_id,
        exam_date,
        topic
      } = req.body || {};

      if (
        !title ||
        !exam_date
      ) {
        return send(res, 400, {
          message:
            "Sınav adı ve tarih gerekli."
        });
      }

      const result =
        await sql`
          INSERT INTO exams
          (
            user_id,
            subject_id,
            title,
            exam_date,
            topic
          )
          VALUES
          (
            ${userId},
            ${subject_id || null},
            ${title.trim()},
            ${exam_date},
            ${topic || null}
          )
          RETURNING *
        `;

      return send(res, 201, {
        success: true,
        exam: result[0]
      });
    }

    // =========================
    // STUDY SESSIONS
    // =========================

    if (
      action === "study" &&
      req.method === "GET"
    ) {
      const sessions =
        await sql`
          SELECT *
          FROM study_sessions
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
          LIMIT 50
        `;

      return send(res, 200, {
        success: true,
        sessions
      });
    }

    if (
      action === "study" &&
      req.method === "POST"
    ) {
      const {
        duration_minutes
      } = req.body || {};

      const duration =
        Math.max(
          1,
          Number(
            duration_minutes || 25
          )
        );

      const earnedXP =
        Math.max(
          5,
          Math.round(
            duration
          )
        );

      const result =
        await sql`
          INSERT INTO study_sessions
          (
            user_id,
            duration_minutes,
            xp
          )
          VALUES
          (
            ${userId},
            ${duration},
            ${earnedXP}
          )
          RETURNING *
        `;

      await sql`
        UPDATE users
        SET xp = xp + ${earnedXP}
        WHERE id = ${userId}
      `;

      return send(res, 201, {
        success: true,
        session: result[0],
        earnedXP
      });
    }

    // =========================
    // ACHIEVEMENTS
    // =========================

    if (
      action === "achievements" &&
      req.method === "GET"
    ) {
      const achievements =
        await sql`
          SELECT *
          FROM achievements
          WHERE user_id = ${userId}
          ORDER BY unlocked_at DESC
        `;

      return send(res, 200, {
        success: true,
        achievements
      });
    }

    // =========================
    // STATS
    // =========================

    if (action === "stats") {
      const tasks =
        await sql`
          SELECT
            COUNT(*)::INTEGER AS total,
            COUNT(*) FILTER (
              WHERE completed = TRUE
            )::INTEGER AS completed
          FROM tasks
          WHERE user_id = ${userId}
        `;

      const study =
        await sql`
          SELECT
            COALESCE(
              SUM(duration_minutes),
              0
            )::INTEGER AS minutes,
            COALESCE(
              SUM(xp),
              0
            )::INTEGER AS xp
          FROM study_sessions
          WHERE user_id = ${userId}
        `;

      const user =
        await sql`
          SELECT
            xp,
            streak
          FROM users
          WHERE id = ${userId}
        `;

      return send(res, 200, {
        success: true,
        stats: {
          tasks:
            tasks[0],
          study:
            study[0],
          user:
            user[0]
        }
      });
    }

    return send(res, 404, {
      message:
        "API endpoint bulunamadı."
    });

  } catch (error) {
    console.error(
      "API ERROR:",
      error
    );

    return send(res, 500, {
      success: false,
      message:
        "Sunucu hatası oluştu.",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined
    });
  }
}
