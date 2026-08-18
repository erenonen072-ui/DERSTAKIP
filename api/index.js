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
  const match = cookies.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getUser(req) {
  const token = getToken(req);

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `token=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  );
}

export default async function handler(req, res) {
  try {
    const action = req.query.action;

    // =========================
    // TEST
    // =========================

    if (!action || action === "test") {
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

    if (action === "register" && req.method === "POST") {
      const { name, email, password } = req.body || {};

      if (!name || !email || !password) {
        return send(res, 400, {
          message: "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          message: "Şifre en az 6 karakter olmalı."
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const existing = await sql`
        SELECT id
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (existing.length) {
        return send(res, 409, {
          message: "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await sql`
        INSERT INTO users
        (name, email, password)
        VALUES
        (${name.trim()}, ${normalizedEmail}, ${hashedPassword})
        RETURNING id, name, email, xp, streak
      `;

      const user = result[0];

      const token = jwt.sign(
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

    if (action === "login" && req.method === "POST") {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return send(res, 400, {
          message: "E-posta ve şifre gerekli."
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (!result.length) {
        return send(res, 401, {
          message: "E-posta veya şifre hatalı."
        });
      }

      const user = result[0];

      const valid = await bcrypt.compare(
        password,
        user.password
      );

      if (!valid) {
        return send(res, 401, {
          message: "E-posta veya şifre hatalı."
        });
      }

      const token = jwt.sign(
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

      return send(res, 200, {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          xp: user.xp,
          streak: user.streak
        }
      });
    }

    // =========================
    // ME
    // =========================

    if (action === "me") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapılmamış."
        });
      }

      const result = await sql`
        SELECT
          id,
          name,
          email,
          xp,
          streak
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
    // LOGOUT
    // =========================

    if (action === "logout" && req.method === "POST") {
      clearCookie(res);

      return send(res, 200, {
        success: true
      });
    }

    // =========================
    // TASKS GET
    // =========================

    if (action === "tasks" && req.method === "GET") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const tasks = await sql`
        SELECT
          id,
          title,
          completed,
          xp,
          created_at
        FROM tasks
        WHERE user_id = ${authUser.id}
        ORDER BY created_at DESC
      `;

      return send(res, 200, {
        success: true,
        tasks
      });
    }

    // =========================
    // TASK ADD
    // =========================

    if (action === "tasks" && req.method === "POST") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const { title } = req.body || {};

      if (!title || !title.trim()) {
        return send(res, 400, {
          message: "Görev adı gerekli."
        });
      }

      const result = await sql`
        INSERT INTO tasks
        (user_id, title, xp)
        VALUES
        (${authUser.id}, ${title.trim()}, 50)
        RETURNING
          id,
          title,
          completed,
          xp,
          created_at
      `;

      return send(res, 201, {
        success: true,
        task: result[0]
      });
    }

    // =========================
    // TASK TOGGLE
    // =========================

    if (action === "tasks" && req.method === "PATCH") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const { id } = req.body || {};

      const result = await sql`
        SELECT id, completed, xp
        FROM tasks
        WHERE id = ${id}
        AND user_id = ${authUser.id}
        LIMIT 1
      `;

      if (!result.length) {
        return send(res, 404, {
          message: "Görev bulunamadı."
        });
      }

      const task = result[0];
      const completed = !task.completed;

      await sql`
        UPDATE tasks
        SET completed = ${completed}
        WHERE id = ${id}
        AND user_id = ${authUser.id}
      `;

      if (completed) {
        await sql`
          UPDATE users
          SET xp = xp + ${task.xp}
          WHERE id = ${authUser.id}
        `;
      } else {
        await sql`
          UPDATE users
          SET xp = GREATEST(0, xp - ${task.xp})
          WHERE id = ${authUser.id}
        `;
      }

      return send(res, 200, {
        success: true,
        completed
      });
    }

    // =========================
    // TASK DELETE
    // =========================

    if (action === "tasks" && req.method === "DELETE") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const { id } = req.body || {};

      const result = await sql`
        SELECT completed, xp
        FROM tasks
        WHERE id = ${id}
        AND user_id = ${authUser.id}
        LIMIT 1
      `;

      if (!result.length) {
        return send(res, 404, {
          message: "Görev bulunamadı."
        });
      }

      const task = result[0];

      await sql`
        DELETE FROM tasks
        WHERE id = ${id}
        AND user_id = ${authUser.id}
      `;

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp = GREATEST(0, xp - ${task.xp})
          WHERE id = ${authUser.id}
        `;
      }

      return send(res, 200, {
        success: true
      });
    }

    // =====================================================
    // SUBJECTS
    // =====================================================

    if (action === "subjects") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      if (req.method === "GET") {
        const subjects = await sql`
          SELECT *
          FROM subjects
          WHERE user_id = ${authUser.id}
          ORDER BY name ASC
        `;

        return send(res, 200, {
          success: true,
          subjects
        });
      }

      if (req.method === "POST") {
        const { name, color } = req.body || {};

        if (!name || !name.trim()) {
          return send(res, 400, {
            message: "Ders adı gerekli."
          });
        }

        const result = await sql`
          INSERT INTO subjects
          (user_id, name, color)
          VALUES
          (
            ${authUser.id},
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

      if (req.method === "DELETE") {
        const { id } = req.body || {};

        await sql`
          DELETE FROM subjects
          WHERE id = ${id}
          AND user_id = ${authUser.id}
        `;

        return send(res, 200, {
          success: true
        });
      }
    }

    // =====================================================
    // EXAMS
    // =====================================================

    if (action === "exams") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      if (req.method === "GET") {
        const exams = await sql`
          SELECT
            exams.*,
            subjects.name AS subject_name,
            subjects.color AS subject_color
          FROM exams
          LEFT JOIN subjects
            ON subjects.id = exams.subject_id
          WHERE exams.user_id = ${authUser.id}
          ORDER BY exams.exam_date ASC
        `;

        return send(res, 200, {
          success: true,
          exams
        });
      }

      if (req.method === "POST") {
        const {
          title,
          exam_date,
          topic,
          subject_id
        } = req.body || {};

        if (!title || !exam_date) {
          return send(res, 400, {
            message: "Sınav adı ve tarih gerekli."
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
            ${authUser.id},
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

      if (req.method === "DELETE") {
        const { id } = req.body || {};

        await sql`
          DELETE FROM exams
          WHERE id = ${id}
          AND user_id = ${authUser.id}
        `;

        return send(res, 200, {
          success: true
        });
      }
    }

    // =====================================================
    // STUDY SESSIONS
    // =====================================================

    if (
      action === "study" &&
      req.method === "POST"
    ) {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const minutes = Math.max(
        1,
        Number(req.body?.duration_minutes) || 25
      );

      const xp = Math.max(
        1,
        Math.round(minutes)
      );

      const session = await sql`
        INSERT INTO study_sessions
        (
          user_id,
          duration_minutes,
          xp
        )
        VALUES
        (
          ${authUser.id},
          ${minutes},
          ${xp}
        )
        RETURNING *
      `;

      await sql`
        UPDATE users
        SET xp = xp + ${xp}
        WHERE id = ${authUser.id}
      `;

      return send(res, 201, {
        success: true,
        session: session[0],
        earnedXP: xp
      });
    }

    // =====================================================
    // STUDY STATS
    // =====================================================

    if (
      action === "study" &&
      req.method === "GET"
    ) {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const result = await sql`
        SELECT
          COALESCE(
            SUM(duration_minutes),
            0
          ) AS total_minutes,
          COUNT(*) AS total_sessions
        FROM study_sessions
        WHERE user_id = ${authUser.id}
      `;

      return send(res, 200, {
        success: true,
        stats: result[0]
      });
    }

    // =====================================================
    // ACHIEVEMENTS
    // =====================================================

    if (action === "achievements") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      if (req.method === "GET") {
        const achievements = await sql`
          SELECT *
          FROM achievements
          WHERE user_id = ${authUser.id}
          ORDER BY unlocked_at DESC
        `;

        return send(res, 200, {
          success: true,
          achievements
        });
      }

      if (req.method === "POST") {
        const { key } = req.body || {};

        if (!key) {
          return send(res, 400, {
            message: "Başarı anahtarı gerekli."
          });
        }

        const result = await sql`
          INSERT INTO achievements
          (
            user_id,
            achievement_key
          )
          VALUES
          (
            ${authUser.id},
            ${key}
          )
          ON CONFLICT
          (user_id, achievement_key)
          DO NOTHING
          RETURNING *
        `;

        return send(res, 201, {
          success: true,
          achievement: result[0] || null
        });
      }
    }

    // =====================================================
    // DASHBOARD
    // =====================================================

    if (action === "dashboard") {
      const authUser = getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message: "Giriş yapmalısın."
        });
      }

      const userResult = await sql`
        SELECT
          id,
          name,
          email,
          xp,
          streak
        FROM users
        WHERE id = ${authUser.id}
      `;

      const taskStats = await sql`
        SELECT
          COUNT(*)::INTEGER AS total,
          COUNT(*) FILTER (
            WHERE completed = true
          )::INTEGER AS completed
        FROM tasks
        WHERE user_id = ${authUser.id}
      `;

      const studyStats = await sql`
        SELECT
          COALESCE(
            SUM(duration_minutes),
            0
          )::INTEGER AS minutes,
          COUNT(*)::INTEGER AS sessions
        FROM study_sessions
        WHERE user_id = ${authUser.id}
      `;

      const examStats = await sql`
        SELECT COUNT(*)::INTEGER AS count
        FROM exams
        WHERE user_id = ${authUser.id}
        AND exam_date >= NOW()
      `;

      return send(res, 200, {
        success: true,
        user: userResult[0],
        tasks: taskStats[0],
        study: studyStats[0],
        upcomingExams: examStats[0].count
      });
    }

    return send(res, 404, {
      message: "API endpoint bulunamadı."
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return send(res, 500, {
      success: false,
      message: "Sunucu hatası oluştu."
    });
  }
}
