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
    `token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure"
  );
}

async function createToken(user) {
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

async function currentUser(req) {
  const auth = getUser(req);

  if (!auth) {
    return null;
  }

  const rows = await sql`
    SELECT
      id,
      name,
      email,
      xp,
      streak,
      created_at
    FROM users
    WHERE id = ${auth.id}
    LIMIT 1
  `;

  return rows[0] || null;
}

async function checkAuth(req, res) {
  const user = await currentUser(req);

  if (!user) {
    send(res, 401, {
      success: false,
      message: "Oturum açmanız gerekiyor."
    });

    return null;
  }

  return user;
}

function body(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
}

async function updateUserXP(userId) {
  const rows = await sql`
    SELECT COALESCE(SUM(xp), 0)::integer AS total_xp
    FROM study_sessions
    WHERE user_id = ${userId}
  `;

  const taskRows = await sql`
    SELECT COALESCE(SUM(xp), 0)::integer AS task_xp
    FROM tasks
    WHERE user_id = ${userId}
      AND completed = true
  `;

  const totalXP =
    Number(rows[0]?.total_xp || 0) +
    Number(taskRows[0]?.task_xp || 0);

  await sql`
    UPDATE users
    SET xp = ${totalXP}
    WHERE id = ${userId}
  `;

  return totalXP;
}

async function unlockAchievement(userId, key) {
  await sql`
    INSERT INTO achievements (
      user_id,
      achievement_key
    )
    VALUES (
      ${userId},
      ${key}
    )
    ON CONFLICT (
      user_id,
      achievement_key
    )
    DO NOTHING
  `;
}

async function checkAchievements(userId) {
  const userRows = await sql`
    SELECT xp, streak
    FROM users
    WHERE id = ${userId}
  `;

  if (!userRows.length) {
    return;
  }

  const user = userRows[0];

  const taskRows = await sql`
    SELECT
      COUNT(*) FILTER (
        WHERE completed = true
      )::integer AS completed
    FROM tasks
    WHERE user_id = ${userId}
  `;

  const subjectRows = await sql`
    SELECT COUNT(*)::integer AS count
    FROM subjects
    WHERE user_id = ${userId}
  `;

  const sessionRows = await sql`
    SELECT COUNT(*)::integer AS count
    FROM study_sessions
    WHERE user_id = ${userId}
  `;

  const completed =
    Number(taskRows[0]?.completed || 0);

  const subjects =
    Number(subjectRows[0]?.count || 0);

  const sessions =
    Number(sessionRows[0]?.count || 0);

  if (completed >= 1) {
    await unlockAchievement(
      userId,
      "first_task"
    );
  }

  if (completed >= 10) {
    await unlockAchievement(
      userId,
      "ten_tasks"
    );
  }

  if (subjects >= 3) {
    await unlockAchievement(
      userId,
      "three_subjects"
    );
  }

  if (sessions >= 1) {
    await unlockAchievement(
      userId,
      "first_session"
    );
  }

  if (Number(user.xp) >= 250) {
    await unlockAchievement(
      userId,
      "xp_250"
    );
  }

  if (Number(user.streak) >= 7) {
    await unlockAchievement(
      userId,
      "streak_7"
    );
  }
}

export default async function handler(req, res) {
  const action =
    req.query?.action || "health";

  try {
    // =====================================
    // HEALTH
    // =====================================

    if (
      action === "health"
    ) {
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

    // =====================================
    // REGISTER
    // =====================================

    if (
      action === "register" &&
      req.method === "POST"
    ) {
      const {
        name,
        email,
        password
      } = body(req);

      if (
        !name ||
        !email ||
        !password
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Ad, e-posta ve şifre zorunludur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          success: false,
          message:
            "Şifre en az 6 karakter olmalıdır."
        });
      }

      const existing = await sql`
        SELECT id
        FROM users
        WHERE LOWER(email) =
              LOWER(${email.trim()})
        LIMIT 1
      `;

      if (existing.length) {
        return send(res, 409, {
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

      const rows = await sql`
        INSERT INTO users (
          name,
          email,
          password
        )
        VALUES (
          ${name.trim()},
          ${email.trim().toLowerCase()},
          ${hashedPassword}
        )
        RETURNING
          id,
          name,
          email,
          xp,
          streak,
          created_at
      `;

      const user = rows[0];

      const token =
        await createToken(user);

      setCookie(res, token);

      return send(res, 201, {
        success: true,
        user
      });
    }

    // =====================================
    // LOGIN
    // =====================================

    if (
      action === "login" &&
      req.method === "POST"
    ) {
      const {
        email,
        password
      } = body(req);

      if (
        !email ||
        !password
      ) {
        return send(res, 400, {
          success: false,
          message:
            "E-posta ve şifre zorunludur."
        });
      }

      const rows = await sql`
        SELECT *
        FROM users
        WHERE LOWER(email) =
              LOWER(${email.trim()})
        LIMIT 1
      `;

      if (!rows.length) {
        return send(res, 401, {
          success: false,
          message:
            "E-posta veya şifre yanlış."
        });
      }

      const user = rows[0];

      const valid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!valid) {
        return send(res, 401, {
          success: false,
          message:
            "E-posta veya şifre yanlış."
        });
      }

      const token =
        await createToken(user);

      setCookie(res, token);

      delete user.password;

      return send(res, 200, {
        success: true,
        user
      });
    }

    // =====================================
    // LOGOUT
    // =====================================

    if (
      action === "logout" &&
      req.method === "POST"
    ) {
      clearCookie(res);

      return send(res, 200, {
        success: true
      });
    }

    // =====================================
    // ME
    // =====================================

    if (
      action === "me"
    ) {
      const user =
        await currentUser(req);

      if (!user) {
        return send(res, 401, {
          success: false,
          message:
            "Oturum bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user
      });
    }

    // =====================================
    // AUTH REQUIRED
    // =====================================

    const user =
      await checkAuth(req, res);

    if (!user) {
      return;
    }

    const userId = user.id;

    // =====================================
    // TASKS GET
    // =====================================

    if (
      action === "tasks" &&
      req.method === "GET"
    ) {
      const tasks = await sql`
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

    // =====================================
    // TASK CREATE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "POST"
    ) {
      const {
        title
      } = body(req);

      if (!title?.trim()) {
        return send(res, 400, {
          success: false,
          message:
            "Görev adı boş olamaz."
        });
      }

      const rows = await sql`
        INSERT INTO tasks (
          user_id,
          title
        )
        VALUES (
          ${userId},
          ${title.trim()}
        )
        RETURNING *
      `;

      return send(res, 201, {
        success: true,
        task: rows[0]
      });
    }

    // =====================================
    // TASK TOGGLE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "PATCH"
    ) {
      const {
        id
      } = body(req);

      const rows = await sql`
        UPDATE tasks
        SET completed = NOT completed
        WHERE id = ${id}
          AND user_id = ${userId}
        RETURNING *
      `;

      if (!rows.length) {
        return send(res, 404, {
          success: false,
          message:
            "Görev bulunamadı."
        });
      }

      const task = rows[0];

      await updateUserXP(userId);
      await checkAchievements(userId);

      return send(res, 200, {
        success: true,
        completed:
          task.completed,
        task
      });
    }

    // =====================================
    // TASK DELETE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const {
        id
      } = body(req);

      const rows = await sql`
        DELETE FROM tasks
        WHERE id = ${id}
          AND user_id = ${userId}
        RETURNING *
      `;

      if (!rows.length) {
        return send(res, 404, {
          success: false,
          message:
            "Görev bulunamadı."
        });
      }

      await updateUserXP(userId);

      return send(res, 200, {
        success: true
      });
    }

    // =====================================
    // SUBJECTS GET
    // =====================================

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

    // =====================================
    // SUBJECT CREATE
    // =====================================

    if (
      action === "subjects" &&
      req.method === "POST"
    ) {
      const {
        name,
        color
      } = body(req);

      if (!name?.trim()) {
        return send(res, 400, {
          success: false,
          message:
            "Ders adı zorunludur."
        });
      }

      const rows = await sql`
        INSERT INTO subjects (
          user_id,
          name,
          color
        )
        VALUES (
          ${userId},
          ${name.trim()},
          ${color || "#6c63ff"}
        )
        RETURNING *
      `;

      await checkAchievements(userId);

      return send(res, 201, {
        success: true,
        subject: rows[0]
      });
    }

    // =====================================
    // SUBJECT DELETE
    // =====================================

    if (
      action === "subjects" &&
      req.method === "DELETE"
    ) {
      const {
        id
      } = body(req);

      await sql`
        DELETE FROM subjects
        WHERE id = ${id}
          AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =====================================
    // EXAMS GET
    // =====================================

    if (
      action === "exams" &&
      req.method === "GET"
    ) {
      const exams = await sql`
        SELECT
          exams.*,
          subjects.name AS subject_name,
          subjects.color AS subject_color
        FROM exams
        LEFT JOIN subjects
          ON subjects.id =
             exams.subject_id
        WHERE exams.user_id =
              ${userId}
        ORDER BY
          exams.exam_date ASC
      `;

      return send(res, 200, {
        success: true,
        exams
      });
    }

    // =====================================
    // EXAM CREATE
    // =====================================

    if (
      action === "exams" &&
      req.method === "POST"
    ) {
      const {
        title,
        exam_date,
        subject_id,
        topic
      } = body(req);

      if (
        !title?.trim() ||
        !exam_date
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Sınav adı ve tarih zorunludur."
        });
      }

      let subjectId =
        subject_id || null;

      if (subjectId) {
        const subject =
          await sql`
            SELECT id
            FROM subjects
            WHERE id = ${subjectId}
              AND user_id = ${userId}
          `;

        if (!subject.length) {
          subjectId = null;
        }
      }

      const rows = await sql`
        INSERT INTO exams (
          user_id,
          subject_id,
          title,
          exam_date,
          topic
        )
        VALUES (
          ${userId},
          ${subjectId},
          ${title.trim()},
          ${exam_date},
          ${topic?.trim() || null}
        )
        RETURNING *
      `;

      return send(res, 201, {
        success: true,
        exam: rows[0]
      });
    }

    // =====================================
    // EXAM DELETE
    // =====================================

    if (
      action === "exams" &&
      req.method === "DELETE"
    ) {
      const {
        id
      } = body(req);

      await sql`
        DELETE FROM exams
        WHERE id = ${id}
          AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =====================================
    // STUDY SESSIONS GET
    // =====================================

    if (
      action === "sessions" &&
      req.method === "GET"
    ) {
      const sessions = await sql`
        SELECT *
        FROM study_sessions
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT 100
      `;

      return send(res, 200, {
        success: true,
        sessions
      });
    }

    // =====================================
    // STUDY SESSION CREATE
    // =====================================

    if (
      action === "sessions" &&
      req.method === "POST"
    ) {
      const {
        duration_minutes
      } = body(req);

      const duration =
        Math.max(
          1,
          Math.min(
            600,
            Number(
              duration_minutes || 25
            )
          )
        );

      const xp =
        Math.max(
          5,
          Math.round(
            duration
          )
        );

      const rows = await sql`
        INSERT INTO study_sessions (
          user_id,
          duration_minutes,
          xp
        )
        VALUES (
          ${userId},
          ${duration},
          ${xp}
        )
        RETURNING *
      `;

      await updateUserXP(userId);

      await checkAchievements(userId);

      return send(res, 201, {
        success: true,
        session: rows[0]
      });
    }

    // =====================================
    // ACHIEVEMENTS
    // =====================================

    if (
      action === "achievements" &&
      req.method === "GET"
    ) {
      await checkAchievements(userId);

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

    // =====================================
    // STATS
    // =====================================

    if (
      action === "stats" &&
      req.method === "GET"
    ) {
      const completedRows =
        await sql`
          SELECT
            COUNT(*)::integer AS count
          FROM tasks
          WHERE user_id = ${userId}
            AND completed = true
        `;

      const totalTasksRows =
        await sql`
          SELECT
            COUNT(*)::integer AS count
          FROM tasks
          WHERE user_id = ${userId}
        `;

      const subjectsRows =
        await sql`
          SELECT
            COUNT(*)::integer AS count
          FROM subjects
          WHERE user_id = ${userId}
        `;

      const examsRows =
        await sql`
          SELECT
            COUNT(*)::integer AS count
          FROM exams
          WHERE user_id = ${userId}
        `;

      const sessionsRows =
        await sql`
          SELECT
            COUNT(*)::integer AS count,
            COALESCE(
              SUM(duration_minutes),
              0
            )::integer AS minutes
          FROM study_sessions
          WHERE user_id = ${userId}
        `;

      return send(res, 200, {
        success: true,
        stats: {
          completedTasks:
            Number(
              completedRows[0].count
            ),
          totalTasks:
            Number(
              totalTasksRows[0].count
            ),
          subjects:
            Number(
              subjectsRows[0].count
            ),
          exams:
            Number(
              examsRows[0].count
            ),
          sessions:
            Number(
              sessionsRows[0].count
            ),
          studyMinutes:
            Number(
              sessionsRows[0].minutes
            ),
          xp:
            Number(user.xp),
          streak:
            Number(user.streak)
        }
      });
    }

    return send(res, 404, {
      success: false,
      message: "API işlemi bulunamadı."
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
