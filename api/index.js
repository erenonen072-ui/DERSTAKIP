import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);
const JWT_SECRET = process.env.JWT_SECRET;

function send(res, status, data) {
  res.status(status).json(data);
}

function getToken(req) {
  const cookie = req.headers.cookie || "";

  const match = cookie.match(
    /(?:^|;\s*)ders_takip_token=([^;]+)/
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function getUser(req) {
  try {
    const token = getToken(req);

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function setAuthCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `ders_takip_token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
  );
}

function clearAuthCookie(res) {
  res.setHeader(
    "Set-Cookie",
    "ders_takip_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );
}

async function getFullUser(userId) {
  const result = await sql`
    SELECT
      id,
      name,
      email,
      xp,
      streak,
      created_at
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;

  return result[0] || null;
}

export default async function handler(req, res) {
  try {
    if (!JWT_SECRET) {
      return send(res, 500, {
        success: false,
        message: "JWT_SECRET eksik."
      });
    }

    const action = req.query.action || "";

    // ==========================================
    // HEALTH
    // ==========================================

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

    // ==========================================
    // REGISTER
    // ==========================================

    if (action === "register" && req.method === "POST") {
      const {
        name,
        email,
        password
      } = req.body || {};

      if (!name || !email || !password) {
        return send(res, 400, {
          success: false,
          message: "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          success: false,
          message: "Şifre en az 6 karakter olmalı."
        });
      }

      const normalizedEmail =
        String(email).trim().toLowerCase();

      const existing = await sql`
        SELECT id
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return send(res, 409, {
          success: false,
          message: "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const result = await sql`
        INSERT INTO users
          (name, email, password)
        VALUES
          (
            ${String(name).trim()},
            ${normalizedEmail},
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

      setAuthCookie(res, token);

      return send(res, 201, {
        success: true,
        user
      });
    }

    // ==========================================
    // LOGIN
    // ==========================================

    if (action === "login" && req.method === "POST") {
      const {
        email,
        password
      } = req.body || {};

      if (!email || !password) {
        return send(res, 400, {
          success: false,
          message: "E-posta ve şifre gerekli."
        });
      }

      const normalizedEmail =
        String(email).trim().toLowerCase();

      const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (result.length === 0) {
        return send(res, 401, {
          success: false,
          message: "E-posta veya şifre yanlış."
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
          success: false,
          message: "E-posta veya şifre yanlış."
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

      setAuthCookie(res, token);

      delete user.password;

      return send(res, 200, {
        success: true,
        user
      });
    }

    // ==========================================
    // LOGOUT
    // ==========================================

    if (action === "logout") {
      clearAuthCookie(res);

      return send(res, 200, {
        success: true
      });
    }

    // ==========================================
    // AUTH GEREKTİREN İŞLEMLER
    // ==========================================

    const authUser = getUser(req);

    if (!authUser) {
      return send(res, 401, {
        success: false,
        message: "Oturum gerekli."
      });
    }

    const userId = Number(authUser.id);

    // ==========================================
    // ME
    // ==========================================

    if (action === "me") {
      const user = await getFullUser(userId);

      if (!user) {
        return send(res, 404, {
          success: false,
          message: "Kullanıcı bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user
      });
    }

    // ==========================================
    // TASKS - GET
    // ==========================================

    if (action === "tasks" && req.method === "GET") {
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

    // ==========================================
    // TASKS - POST
    // ==========================================

    if (action === "tasks" && req.method === "POST") {
      const {
        title
      } = req.body || {};

      if (!title || !String(title).trim()) {
        return send(res, 400, {
          success: false,
          message: "Görev adı gerekli."
        });
      }

      const cleanTitle =
        String(title).trim().slice(0, 255);

      const result = await sql`
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
            ${cleanTitle},
            false,
            50
          )
        RETURNING *
      `;

      return send(res, 201, {
        success: true,
        task: result[0]
      });
    }

    // ==========================================
    // TASKS - PATCH
    // ==========================================

    if (action === "tasks" && req.method === "PATCH") {
      const {
        id
      } = req.body || {};

      if (!id) {
        return send(res, 400, {
          success: false,
          message: "Görev ID gerekli."
        });
      }

      const old = await sql`
        SELECT *
        FROM tasks
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
        LIMIT 1
      `;

      if (old.length === 0) {
        return send(res, 404, {
          success: false,
          message: "Görev bulunamadı."
        });
      }

      const task = old[0];

      const completed =
        !task.completed;

      if (completed) {
        await sql`
          UPDATE tasks
          SET completed = true
          WHERE id = ${Number(id)}
          AND user_id = ${userId}
        `;

        await sql`
          UPDATE users
          SET xp = xp + ${Number(task.xp) || 50}
          WHERE id = ${userId}
        `;
      } else {
        await sql`
          UPDATE tasks
          SET completed = false
          WHERE id = ${Number(id)}
          AND user_id = ${userId}
        `;

        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${Number(task.xp) || 50}
          )
          WHERE id = ${userId}
        `;
      }

      return send(res, 200, {
        success: true,
        completed
      });
    }

    // ==========================================
    // TASKS - DELETE
    // ==========================================

    if (action === "tasks" && req.method === "DELETE") {
      const {
        id
      } = req.body || {};

      const existing = await sql`
        SELECT xp, completed
        FROM tasks
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
        LIMIT 1
      `;

      if (existing.length === 0) {
        return send(res, 404, {
          success: false,
          message: "Görev bulunamadı."
        });
      }

      const task = existing[0];

      await sql`
        DELETE FROM tasks
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
      `;

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${Number(task.xp) || 50}
          )
          WHERE id = ${userId}
        `;
      }

      return send(res, 200, {
        success: true
      });
    }

    // ==========================================
    // SUBJECTS - GET
    // ==========================================

    if (action === "subjects" && req.method === "GET") {
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

    // ==========================================
    // SUBJECTS - POST
    // ==========================================

    if (action === "subjects" && req.method === "POST") {
      const {
        name,
        color
      } = req.body || {};

      if (!name || !String(name).trim()) {
        return send(res, 400, {
          success: false,
          message: "Ders adı gerekli."
        });
      }

      const result = await sql`
        INSERT INTO subjects
          (
            user_id,
            name,
            color
          )
        VALUES
          (
            ${userId},
            ${String(name).trim().slice(0, 100)},
            ${color || "#6c63ff"}
          )
        RETURNING *
      `;

      return send(res, 201, {
        success: true,
        subject: result[0]
      });
    }

    // ==========================================
    // SUBJECTS - DELETE
    // ==========================================

    if (action === "subjects" && req.method === "DELETE") {
      const {
        id
      } = req.body || {};

      await sql`
        DELETE FROM subjects
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // ==========================================
    // EXAMS - GET
    // ==========================================

    if (action === "exams" && req.method === "GET") {
      const exams = await sql`
        SELECT
          exams.*,
          subjects.name AS subject_name,
          subjects.color AS subject_color
        FROM exams
        LEFT JOIN subjects
          ON subjects.id = exams.subject_id
        WHERE exams.user_id = ${userId}
        ORDER BY exams.exam_date ASC
      `;

      return send(res, 200, {
        success: true,
        exams
      });
    }

    // ==========================================
    // EXAMS - POST
    // ==========================================

    if (action === "exams" && req.method === "POST") {
      const {
        title,
        exam_date,
        subject_id,
        topic
      } = req.body || {};

      if (!title || !exam_date) {
        return send(res, 400, {
          success: false,
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
            ${userId},
            ${subject_id || null},
            ${String(title).trim().slice(0, 255)},
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

    // ==========================================
    // EXAMS - DELETE
    // ==========================================

    if (action === "exams" && req.method === "DELETE") {
      const {
        id
      } = req.body || {};

      await sql`
        DELETE FROM exams
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // ==========================================
    // STUDY SESSIONS - GET
    // ==========================================

    if (
      action === "sessions" &&
      req.method === "GET"
    ) {
      const sessions = await sql`
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

    // ==========================================
    // STUDY SESSION - POST
    // ==========================================

    if (
      action === "sessions" &&
      req.method === "POST"
    ) {
      const {
        duration_minutes
      } = req.body || {};

      const minutes =
        Math.max(
          1,
          Math.min(
            240,
            Number(duration_minutes) || 25
          )
        );

      const xp =
        Math.max(
          5,
          Math.floor(minutes)
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
            ${minutes},
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
        earned_xp: xp
      });
    }

    // ==========================================
    // ACHIEVEMENTS
    // ==========================================

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
// ==========================================
// DERS KOÇU 🤖
// ==========================================
if (action === "coach" && req.method === "GET") {
  const [
    userResult,
    tasksResult,
    examsResult,
    subjectsResult,
    sessionsResult
  ] = await Promise.all([
    sql`
      SELECT
        name,
        xp,
        streak
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `,

    sql`
      SELECT
        id,
        title,
        completed,
        xp
      FROM tasks
      WHERE user_id = ${userId}
      ORDER BY completed ASC, created_at DESC
      LIMIT 20
    `,

    sql`
      SELECT
        id,
        title,
        exam_date,
        topic,
        subjects.name AS subject_name
      FROM exams
      LEFT JOIN subjects
        ON subjects.id = exams.subject_id
      WHERE exams.user_id = ${userId}
      AND exams.exam_date >= NOW()
      ORDER BY exams.exam_date ASC
      LIMIT 5
    `,

    sql`
      SELECT
        id,
        name
      FROM subjects
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `,

    sql`
      SELECT
        COALESCE(SUM(duration_minutes), 0)::int AS minutes,
        COUNT(*)::int AS sessions
      FROM study_sessions
      WHERE user_id = ${userId}
    `
  ]);

  if (userResult.length === 0) {
    return send(res, 404, {
      success: false,
      message: "Kullanıcı bulunamadı."
    });
  }

  const user = userResult[0];
  const tasks = tasksResult;
  const exams = examsResult;
  const subjects = subjectsResult;
  const sessions = sessionsResult[0];

  const incompleteTasks =
    tasks.filter(task => !task.completed);

  const completedTasks =
    tasks.filter(task => task.completed);

  let advice = [];
  let priority = "normal";

  // ------------------------------------------
  // SINAV ANALİZİ
  // ------------------------------------------

  if (exams.length > 0) {
    const nextExam = exams[0];

    const examDate =
      new Date(nextExam.exam_date);

    const now = new Date();

    const daysLeft = Math.ceil(
      (examDate - now) /
      (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 1) {
      priority = "urgent";

      advice.push({
        type: "danger",
        icon: "🚨",
        title: "Sınav çok yakın!",
        text:
          `${nextExam.subject_name || ""} ${nextExam.title} için son tekrarlarını yap.`
      });
    } else if (daysLeft <= 3) {
      priority = "high";

      advice.push({
        type: "warning",
        icon: "⚠️",
        title: "Sınav yaklaşıyor",
        text:
          `${nextExam.title} sınavına ${daysLeft} gün kaldı. Bugün bu derse öncelik ver.`
      });
    } else {
      advice.push({
        type: "info",
        icon: "📅",
        title: "Yaklaşan sınav",
        text:
          `${nextExam.title} sınavına ${daysLeft} gün kaldı. Düzenli tekrar yapabilirsin.`
      });
    }
  }

  // ------------------------------------------
  // GÖREV ANALİZİ
  // ------------------------------------------

  if (incompleteTasks.length === 0) {
    advice.push({
      type: "success",
      icon: "🎉",
      title: "Görevlerin tamam!",
      text:
        "Harika gidiyorsun. Yeni bir çalışma görevi ekleyebilirsin."
    });
  } else {
    advice.push({
      type: "task",
      icon: "🎯",
      title: "Bugünkü görev",
      text:
        `"${incompleteTasks[0].title}" görevini tamamlayarak başlayabilirsin.`
    });
  }

  // ------------------------------------------
  // ODAKLANMA ANALİZİ
  // ------------------------------------------

  if (sessions.minutes === 0) {
    advice.push({
      type: "focus",
      icon: "⏱️",
      title: "Odaklanma zamanı",
      text:
        "İlk 25 dakikalık odaklanma seansını başlat!"
    });
  } else if (sessions.minutes < 60) {
    advice.push({
      type: "focus",
      icon: "⏱️",
      title: "Biraz daha odaklan",
      text:
        "Toplam odaklanma süren 1 saatin altında. Bugün bir 25 dakika daha deneyebilirsin."
    });
  } else {
    advice.push({
      type: "focus",
      icon: "🔥",
      title: "Harika odaklanma!",
      text:
        `Toplam ${sessions.minutes} dakika çalışmışsın. Böyle devam et!`
    });
  }

  // ------------------------------------------
  // SERİ
  // ------------------------------------------

  if (Number(user.streak) >= 7) {
    advice.push({
      type: "streak",
      icon: "🔥",
      title: "Muhteşem seri!",
      text:
        `${user.streak} günlük serin var. Sakın bozma!`
    });
  } else if (Number(user.streak) > 0) {
    advice.push({
      type: "streak",
      icon: "🔥",
      title: "Serini koru",
      text:
        `${user.streak} günlük serin var. Bugün de çalışarak devam ettir.`
    });
  }

  // ------------------------------------------
  // GÜNLÜK HEDEF
  // ------------------------------------------

  const recommendedTasks =
    Math.min(
      3,
      Math.max(
        1,
        incompleteTasks.length
      )
    );

  const recommendedMinutes =
    exams.length > 0 ? 50 : 25;

  const recommendedXP =
    recommendedTasks * 50 +
    recommendedMinutes;

  return send(res, 200, {
    success: true,

    coach: {
      greeting:
        `Merhaba, ${user.name}! 👋`,

      priority,

      xp: Number(user.xp) || 0,

      streak:
        Number(user.streak) || 0,

      subjects:
        subjects.length,

      incomplete_tasks:
        incompleteTasks.length,

      completed_tasks:
        completedTasks.length,

      upcoming_exams:
        exams.length,

      focus_minutes:
        Number(sessions.minutes) || 0,

      focus_sessions:
        Number(sessions.sessions) || 0,

      recommended: {
        tasks: recommendedTasks,
        minutes: recommendedMinutes,
        xp: recommendedXP
      },

      advice
    }
  });
}
    // ==========================================
    // STATS
    // ==========================================

    if (action === "stats") {
      const [
        taskStats,
        subjectCount,
        examCount,
        sessionStats
      ] = await Promise.all([
        sql`
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
              WHERE completed = true
            )::int AS completed
          FROM tasks
          WHERE user_id = ${userId}
        `,
        sql`
          SELECT COUNT(*)::int AS count
          FROM subjects
          WHERE user_id = ${userId}
        `,
        sql`
          SELECT COUNT(*)::int AS count
          FROM exams
          WHERE user_id = ${userId}
        `,
        sql`
          SELECT
            COALESCE(
              SUM(duration_minutes),
              0
            )::int AS minutes,
            COUNT(*)::int AS sessions
          FROM study_sessions
          WHERE user_id = ${userId}
        `
      ]);

      return send(res, 200, {
        success: true,
        stats: {
          tasks: taskStats[0],
          subjects: subjectCount[0].count,
          exams: examCount[0].count,
          sessions: sessionStats[0]
        }
      });
    }

    return send(res, 404, {
      success: false,
      message: "API işlemi bulunamadı."
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return send(res, 500, {
      success: false,
      message: "Sunucu hatası oluştu."
    });
  }
}
