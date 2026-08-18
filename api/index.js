import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

const COOKIE_NAME = "ders_takip_token";

function send(res, status, data) {
  return res.status(status).json(data);
}

function getToken(req) {
  const cookies = req.headers.cookie || "";

  const match = cookies.match(
    new RegExp(`${COOKIE_NAME}=([^;]+)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function getUser(req) {
  try {
    const token = getToken(req);

    if (!token) return null;

    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch {
    return null;
  }
}

function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(
      token
    )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );
}

export default async function handler(req, res) {
  try {
    const action = req.query.action;

    // =========================
    // TEST
    // =========================

    if (action === "test") {
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

      if (!name || !email || !password) {
        return send(res, 400, {
          message: "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          message:
            "Şifre en az 6 karakter olmalı."
        });
      }

      const existing = await sql`
        SELECT id
        FROM users
        WHERE email = ${email.toLowerCase()}
        LIMIT 1
      `;

      if (existing.length) {
        return send(res, 409, {
          message:
            "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const result = await sql`
        INSERT INTO users
          (name, email, password)
        VALUES
          (
            ${name},
            ${email.toLowerCase()},
            ${hashedPassword}
          )
        RETURNING
          id,
          name,
          email,
          xp,
          streak
      `;

      const user = result[0];

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
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

      if (!email || !password) {
        return send(res, 400, {
          message:
            "E-posta ve şifre gerekli."
        });
      }

      const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${email.toLowerCase()}
        LIMIT 1
      `;

      if (!result.length) {
        return send(res, 401, {
          message:
            "E-posta veya şifre yanlış."
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
            "E-posta veya şifre yanlış."
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
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
        success: true
      });
    }

    // =========================
    // CURRENT USER
    // =========================

    if (action === "me") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Oturum bulunamadı."
        });
      }

      const result = await sql`
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

      if (!result.length) {
        return send(res, 401, {
          message: "Kullanıcı bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user: result[0]
      });
    }

    // =========================
    // AUTH REQUIRED
    // =========================

    const authUser = getUser(req);

    if (!authUser) {
      return send(res, 401, {
        message: "Giriş yapmalısın."
      });
    }

    const userId = authUser.id;

    // =========================
    // TASKS
    // =========================

    if (
      action === "tasks" &&
      req.method === "GET"
    ) {
      const tasks = await sql`
        SELECT *
        FROM tasks
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;

      return send(res, 200, {
        success: true,
        tasks
      });
    }

    if (
      action === "tasks" &&
      req.method === "POST"
    ) {
      const { title } = req.body || {};

      if (!title?.trim()) {
        return send(res, 400, {
          message: "Görev adı gerekli."
        });
      }

      const result = await sql`
        INSERT INTO tasks
          (user_id, title)
        VALUES
          (${userId}, ${title.trim()})
        RETURNING *
      `;

      return send(res, 201, {
        success: true,
        task: result[0]
      });
    }

    if (
      action === "tasks" &&
      req.method === "PATCH"
    ) {
      const { id } = req.body || {};

      const result = await sql`
        UPDATE tasks
        SET completed = NOT completed
        WHERE
          id = ${id}
          AND user_id = ${userId}
        RETURNING *
      `;

      if (!result.length) {
        return send(res, 404, {
          message: "Görev bulunamadı."
        });
      }

      const task = result[0];

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp = xp + ${task.xp}
          WHERE id = ${userId}
        `;
      } else {
        await sql`
          UPDATE users
          SET xp = GREATEST(0, xp - ${task.xp})
          WHERE id = ${userId}
        `;
      }

      return send(res, 200, {
        success: true,
        completed: task.completed
      });
    }

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const { id } = req.body || {};

      const result = await sql`
        DELETE FROM tasks
        WHERE
          id = ${id}
          AND user_id = ${userId}
        RETURNING *
      `;

      if (!result.length) {
        return send(res, 404, {
          message: "Görev bulunamadı."
        });
      }

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
      const subjects = await sql`
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

      if (!name?.trim()) {
        return send(res, 400, {
          message: "Ders adı gerekli."
        });
      }

      const result = await sql`
        INSERT INTO subjects
          (user_id, name, color)
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

    if (
      action === "subjects" &&
      req.method === "DELETE"
    ) {
      const { id } = req.body || {};

      await sql`
        DELETE FROM subjects
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =========================
    // EXAMS
    // =========================

    if (
      action === "exams" &&
      req.method === "GET"
    ) {
      const exams = await sql`
        SELECT
          exams.*,
          subjects.name AS subject_name
        FROM exams
        LEFT JOIN subjects
          ON subjects.id = exams.subject_id
        WHERE exams.user_id = ${userId}
        ORDER BY exam_date ASC
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
        exam_date,
        subject_id,
        topic
      } = req.body || {};

      if (!title || !exam_date) {
        return send(res, 400, {
          message:
            "Sınav adı ve tarihi gerekli."
        });
      }

      const result = await sql`
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
            ${title},
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

    if (
      action === "exams" &&
      req.method === "DELETE"
    ) {
      const { id } = req.body || {};

      await sql`
        DELETE FROM exams
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =========================
    // STUDY SESSIONS
    // =========================

    if (
      action === "study" &&
      req.method === "GET"
    ) {
      const sessions = await sql`
        SELECT *
        FROM study_sessions
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT 20
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
      const duration =
        Number(
          req.body?.duration_minutes
        ) || 25;

      const xp =
        Math.max(
          10,
          Math.floor(duration)
        );

      const result = await sql`
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
            ${xp}
          )
        RETURNING *
      `;

      await sql`
        UPDATE users
        SET xp = xp + ${xp}
        WHERE id = ${userId}
      `;

      return send(res, 201, {
        success: true,
        session: result[0],
        xp
      });
    }

    // =========================
    // ACHIEVEMENTS
    // =========================

    if (
      action === "achievements" &&
      req.method === "GET"
    ) {
      const achievements = await sql`
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

    if (
      action === "stats" &&
      req.method === "GET"
    ) {
      const tasks = await sql`
        SELECT
          COUNT(*)::INTEGER AS total,
          COUNT(*) FILTER (
            WHERE completed = TRUE
          )::INTEGER AS completed
        FROM tasks
        WHERE user_id = ${userId}
      `;

      const subjects = await sql`
        SELECT COUNT(*)::INTEGER AS count
        FROM subjects
        WHERE user_id = ${userId}
      `;

      const exams = await sql`
        SELECT COUNT(*)::INTEGER AS count
        FROM exams
        WHERE user_id = ${userId}
      `;

      const study = await sql`
        SELECT
          COALESCE(
            SUM(duration_minutes),
            0
          )::INTEGER AS minutes
        FROM study_sessions
        WHERE user_id = ${userId}
      `;

      return send(res, 200, {
        success: true,
        stats: {
          tasks: tasks[0],
          subjects: subjects[0].count,
          exams: exams[0].count,
          studyMinutes:
            study[0].minutes
        }
      });
    }

    return send(res, 404, {
      message: "API işlemi bulunamadı."
    });

  } catch (error) {
    console.error("API ERROR:", error);

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
