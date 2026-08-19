import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);
const JWT_SECRET = process.env.JWT_SECRET;

function send(res, status, data) {
  return res.status(status).json(data);
}

function getToken(req) {
  const cookie = req.headers.cookie || "";

  const match = cookie.match(
    /(?:^|;\s*)ders_takip_token=([^;]+)/
  );

  return match
    ? decodeURIComponent(match[1])
    : null;
}

function getUser(req) {
  try {
    const token = getToken(req);

    if (!token) {
      return null;
    }

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
      coins,
      streak,
      avatar,
      created_at
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;

  return result[0] || null;
}

function calculateLevel(xp) {
  return Math.max(
    1,
    Math.floor(Number(xp || 0) / 500) + 1
  );
}

async function checkAchievements(userId) {
  try {
    const userResult = await sql`
      SELECT
        xp,
        coins,
        streak
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `;

    if (!userResult.length) {
      return;
    }

    const user = userResult[0];

    const taskResult = await sql`
      SELECT
        COUNT(*) FILTER (
          WHERE completed = true
        )::int AS completed
      FROM tasks
      WHERE user_id = ${userId}
    `;

    const sessionResult = await sql`
      SELECT
        COALESCE(
          SUM(duration_minutes),
          0
        )::int AS minutes
      FROM study_sessions
      WHERE user_id = ${userId}
    `;

    const completedTasks =
      Number(taskResult[0]?.completed || 0);

    const studyMinutes =
      Number(sessionResult[0]?.minutes || 0);

    const achievements = [];

    if (completedTasks >= 1) {
      achievements.push({
        key: "first_task",
        title: "İlk Görev",
        icon: "🎯"
      });
    }

    if (completedTasks >= 10) {
      achievements.push({
        key: "ten_tasks",
        title: "Görev Ustası",
        icon: "🏅"
      });
    }

    if (completedTasks >= 50) {
      achievements.push({
        key: "fifty_tasks",
        title: "Görev Canavarı",
        icon: "👑"
      });
    }

    if (studyMinutes >= 60) {
      achievements.push({
        key: "one_hour",
        title: "İlk Saat",
        icon: "⏱️"
      });
    }

    if (studyMinutes >= 300) {
      achievements.push({
        key: "five_hours",
        title: "Odak Ustası",
        icon: "🧠"
      });
    }

    if (Number(user.xp || 0) >= 500) {
      achievements.push({
        key: "xp_500",
        title: "500 XP",
        icon: "⭐"
      });
    }

    if (Number(user.xp || 0) >= 1000) {
      achievements.push({
        key: "xp_1000",
        title: "1000 XP",
        icon: "🌟"
      });
    }

    if (Number(user.streak || 0) >= 7) {
      achievements.push({
        key: "streak_7",
        title: "7 Günlük Seri",
        icon: "🔥"
      });
    }

    if (Number(user.streak || 0) >= 30) {
      achievements.push({
        key: "streak_30",
        title: "30 Günlük Seri",
        icon: "💎"
      });
    }

    for (const achievement of achievements) {
      await sql`
        INSERT INTO achievements
          (
            user_id,
            achievement_key,
            title,
            icon
          )
        VALUES
          (
            ${userId},
            ${achievement.key},
            ${achievement.title},
            ${achievement.icon}
          )
        ON CONFLICT
          (user_id, achievement_key)
        DO NOTHING
      `;
    }
  } catch (error) {
    console.error(
      "ACHIEVEMENT ERROR:",
      error
    );
  }
}

export default async function handler(req, res) {
  try {

    // ==========================================
    // ENV CONTROL
    // ==========================================

    if (!process.env.DATABASE_URL) {
      return send(res, 500, {
        success: false,
        message: "DATABASE_URL eksik."
      });
    }

    if (!JWT_SECRET) {
      return send(res, 500, {
        success: false,
        message: "JWT_SECRET eksik."
      });
    }

    const action =
      req.query.action || "";


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
          success: false,
          message: "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return send(res, 400, {
          success: false,
          message:
            "Şifre en az 6 karakter olmalı."
        });
      }

      const normalizedEmail =
        String(email)
          .trim()
          .toLowerCase();

      const existing = await sql`
        SELECT id
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return send(res, 409, {
          success: false,
          message:
            "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const result = await sql`
        INSERT INTO users
          (
            name,
            email,
            password,
            xp,
            coins,
            streak,
            avatar
          )
        VALUES
          (
            ${String(name).trim()},
            ${normalizedEmail},
            ${hashedPassword},
            0,
            100,
            0,
            '🎓'
          )
        RETURNING
          id,
          name,
          email,
          xp,
          coins,
          streak,
          avatar,
          created_at
      `;

      const user = result[0];

      await sql`
        INSERT INTO pets
          (
            user_id,
            name,
            type,
            level,
            happiness,
            energy
          )
        VALUES
          (
            ${user.id},
            'Panda',
            'panda',
            1,
            100,
            100
          )
        ON CONFLICT (user_id)
        DO NOTHING
      `;

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

      setAuthCookie(
        res,
        token
      );

      return send(res, 201, {
        success: true,
        user
      });
    }


    // ==========================================
    // LOGIN
    // ==========================================

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
          success: false,
          message:
            "E-posta ve şifre gerekli."
        });
      }

      const normalizedEmail =
        String(email)
          .trim()
          .toLowerCase();

      const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (result.length === 0) {
        return send(res, 401, {
          success: false,
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
          success: false,
          message:
            "E-posta veya şifre yanlış."
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

      setAuthCookie(
        res,
        token
      );

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
    // AUTH
    // ==========================================

    const authUser =
      getUser(req);

    if (!authUser) {
      return send(res, 401, {
        success: false,
        message: "Oturum gerekli."
      });
    }

    const userId =
      Number(authUser.id);


    // ==========================================
    // ME / PROFILE
    // ==========================================

    if (action === "me") {

      const user =
        await getFullUser(userId);

      if (!user) {
        return send(res, 404, {
          success: false,
          message:
            "Kullanıcı bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user,
        level:
          calculateLevel(user.xp)
      });
    }


    // ==========================================
    // PROFILE UPDATE
    // ==========================================

    if (
      action === "profile" &&
      req.method === "PATCH"
    ) {

      const {
        name,
        avatar
      } = req.body || {};

      const result = await sql`
        UPDATE users
        SET
          name = COALESCE(
            NULLIF(
              ${String(name || "").trim()},
              ''
            ),
            name
          ),
          avatar = COALESCE(
            NULLIF(
              ${String(avatar || "").trim()},
              ''
            ),
            avatar
          )
        WHERE id = ${userId}
        RETURNING
          id,
          name,
          email,
          xp,
          coins,
          streak,
          avatar,
          created_at
      `;

      return send(res, 200, {
        success: true,
        user: result[0]
      });
    }


    // ==========================================
    // TASKS GET
    // ==========================================

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


    // ==========================================
    // TASKS POST
    // ==========================================

    if (
      action === "tasks" &&
      req.method === "POST"
    ) {

      const {
        title
      } = req.body || {};

      if (
        !title ||
        !String(title).trim()
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Görev adı gerekli."
        });
      }

      const cleanTitle =
        String(title)
          .trim()
          .slice(0, 255);

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
    // TASKS PATCH
    // ==========================================

    if (
      action === "tasks" &&
      req.method === "PATCH"
    ) {

      const {
        id
      } = req.body || {};

      if (!id) {
        return send(res, 400, {
          success: false,
          message:
            "Görev ID gerekli."
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
          message:
            "Görev bulunamadı."
        });
      }

      const task = old[0];

      const completed =
        !task.completed;

      const taskXP =
        Number(task.xp) || 50;

      if (completed) {

        await sql`
          UPDATE tasks
          SET completed = true
          WHERE id = ${Number(id)}
          AND user_id = ${userId}
        `;

        await sql`
          UPDATE users
          SET
            xp = xp + ${taskXP},
            coins = coins + 25
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
          SET
            xp = GREATEST(
              0,
              xp - ${taskXP}
            ),
            coins = GREATEST(
              0,
              coins - 25
            )
          WHERE id = ${userId}
        `;
      }

      await checkAchievements(
        userId
      );

      const user =
        await getFullUser(userId);

      return send(res, 200, {
        success: true,
        completed,
        earned_xp:
          completed ? taskXP : -taskXP,
        earned_coins:
          completed ? 25 : -25,
        user
      });
    }


    // ==========================================
    // TASK DELETE
    // ==========================================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {

      const {
        id
      } = req.body || {};

      const existing =
        await sql`
          SELECT
            xp,
            completed
          FROM tasks
          WHERE id = ${Number(id)}
          AND user_id = ${userId}
          LIMIT 1
        `;

      if (existing.length === 0) {
        return send(res, 404, {
          success: false,
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        existing[0];

      await sql`
        DELETE FROM tasks
        WHERE id = ${Number(id)}
        AND user_id = ${userId}
      `;

      if (task.completed) {

        await sql`
          UPDATE users
          SET
            xp = GREATEST(
              0,
              xp - ${Number(task.xp) || 50}
            ),
            coins = GREATEST(
              0,
              coins - 25
            )
          WHERE id = ${userId}
        `;
      }

      return send(res, 200, {
        success: true
      });
    }


    // ==========================================
    // SUBJECTS GET
    // ==========================================

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


    // ==========================================
    // SUBJECTS POST
    // ==========================================

    if (
      action === "subjects" &&
      req.method === "POST"
    ) {

      const {
        name,
        color
      } = req.body || {};

      if (
        !name ||
        !String(name).trim()
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Ders adı gerekli."
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
            ${String(name)
              .trim()
              .slice(0, 100)},
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
    // SUBJECT DELETE
    // ==========================================

    if (
      action === "subjects" &&
      req.method === "DELETE"
    ) {

      await sql`
        DELETE FROM subjects
        WHERE id = ${Number(
          req.body?.id
        )}
        AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }


    // ==========================================
    // EXAMS GET
    // ==========================================

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


    // ==========================================
    // EXAMS POST
    // ==========================================

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

      if (
        !title ||
        !exam_date
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Sınav adı ve tarih gerekli."
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
            ${String(title)
              .trim()
              .slice(0, 255)},
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
    // EXAMS DELETE
    // ==========================================

    if (
      action === "exams" &&
      req.method === "DELETE"
    ) {

      await sql`
        DELETE FROM exams
        WHERE id = ${Number(
          req.body?.id
        )}
        AND user_id = ${userId}
      `;

      return send(res, 200, {
        success: true
      });
    }


    // ==========================================
    // STUDY SESSIONS GET
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
        LIMIT 100
      `;

      return send(res, 200, {
        success: true,
        sessions
      });
    }


    // ==========================================
    // STUDY SESSION POST
    // ==========================================

    if (
      action === "sessions" &&
      req.method === "POST"
    ) {

      const minutes =
        Math.max(
          1,
          Math.min(
            240,
            Number(
              req.body?.duration_minutes
            ) || 25
          )
        );

      const xp =
        Math.floor(minutes);

      const coins =
        Math.max(
          1,
          Math.floor(minutes / 5)
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
        SET
          xp = xp + ${xp},
          coins = coins + ${coins}
        WHERE id = ${userId}
      `;

      await checkAchievements(
        userId
      );

      return send(res, 201, {
        success: true,
        session: result[0],
        earned_xp: xp,
        earned_coins: coins
      });
    }


    // ==========================================
    // PET GET
    // ==========================================

    if (
      action === "pet" &&
      req.method === "GET"
    ) {

      let result = await sql`
        SELECT *
        FROM pets
        WHERE user_id = ${userId}
        LIMIT 1
      `;

      if (result.length === 0) {

        result = await sql`
          INSERT INTO pets
            (
              user_id,
              name,
              type,
              level,
              happiness,
              energy
            )
          VALUES
            (
              ${userId},
              'Panda',
              'panda',
              1,
              100,
              100
            )
          RETURNING *
        `;
      }

      return send(res, 200, {
        success: true,
        pet: result[0]
      });
    }


    // ==========================================
    // PET UPDATE
    // ==========================================

    if (
      action === "pet" &&
      req.method === "PATCH"
    ) {

      const {
        name,
        type
      } = req.body || {};

      const result = await sql`
        UPDATE pets
        SET
          name = COALESCE(
            NULLIF(
              ${String(
                name || ""
              ).trim()},
              ''
            ),
            name
          ),
          type = COALESCE(
            NULLIF(
              ${String(
                type || ""
              ).trim()},
              ''
            ),
            type
          )
        WHERE user_id = ${userId}
        RETURNING *
      `;

      return send(res, 200, {
        success: true,
        pet: result[0]
      });
    }


    // ==========================================
    // PET ACTION
    // ==========================================

    if (
      action === "pet-action" &&
      req.method === "POST"
    ) {

      const {
        type
      } = req.body || {};

      if (
        !["feed", "play"]
          .includes(type)
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Geçersiz işlem."
        });
      }

      let result = await sql`
        SELECT *
        FROM pets
        WHERE user_id = ${userId}
        LIMIT 1
      `;

      if (result.length === 0) {

        result = await sql`
          INSERT INTO pets
            (
              user_id,
              name,
              type,
              level,
              happiness,
              energy
            )
          VALUES
            (
              ${userId},
              'Panda',
              'panda',
              1,
              100,
              100
            )
          RETURNING *
        `;
      }

      const pet = result[0];

      let happiness =
        Number(
          pet.happiness
        ) || 0;

      let energy =
        Number(
          pet.energy
        ) || 0;

      if (type === "feed") {
        happiness =
          Math.min(
            100,
            happiness + 15
          );

        energy =
          Math.min(
            100,
            energy + 10
          );
      }

      if (type === "play") {
        happiness =
          Math.min(
            100,
            happiness + 20
          );

        energy =
          Math.max(
            0,
            energy - 10
          );
      }

      const updated = await sql`
        UPDATE pets
        SET
          happiness = ${happiness},
          energy = ${energy}
        WHERE user_id = ${userId}
        RETURNING *
      `;

      return send(res, 200, {
        success: true,
        pet: updated[0]
      });
    }


    // ==========================================
    // MARKET
    // ==========================================

    if (
      action === "market" &&
      req.method === "GET"
    ) {

      const items = [
        {
          key: "food",
          name: "🐟 Panda Yemeği",
          description:
            "Evcil hayvanını besle.",
          price: 50
        },
        {
          key: "toy",
          name: "🧸 Oyuncak",
          description:
            "Pandanla oyna.",
          price: 100
        },
        {
          key: "hat",
          name: "🎩 Şapka",
          description:
            "Özel görünüm.",
          price: 250
        },
        {
          key: "crown",
          name: "👑 Taç",
          description:
            "Kraliyet eşyası.",
          price: 500
        },
        {
          key: "rocket",
          name: "🚀 Süper Roket",
          description:
            "Efsanevi eşya.",
          price: 1000
        }
      ];

      const user =
        await getFullUser(
          userId
        );

      return send(res, 200, {
        success: true,
        coins:
          Number(
            user?.coins || 0
          ),
        items
      });
    }


    // ==========================================
    // MARKET BUY
    // ==========================================

    if (
      action === "market-buy" &&
      req.method === "POST"
    ) {

      const {
        item_key
      } = req.body || {};

      const items = {
        food: {
          name: "🐟 Panda Yemeği",
          price: 50
        },
        toy: {
          name: "🧸 Oyuncak",
          price: 100
        },
        hat: {
          name: "🎩 Şapka",
          price: 250
        },
        crown: {
          name: "👑 Taç",
          price: 500
        },
        rocket: {
          name: "🚀 Süper Roket",
          price: 1000
        }
      };

      const item =
        items[item_key];

      if (!item) {
        return send(res, 400, {
          success: false,
          message:
            "Ürün bulunamadı."
        });
      }

      const userResult =
        await sql`
          SELECT coins
          FROM users
          WHERE id = ${userId}
          LIMIT 1
        `;

      const coins =
        Number(
          userResult[0]?.coins || 0
        );

      if (
        coins < item.price
      ) {
        return send(res, 400, {
          success: false,
          message:
            "Yeterli coin yok."
        });
      }

      await sql`
        UPDATE users
        SET
          coins =
            coins - ${item.price}
        WHERE id = ${userId}
      `;

      await sql`
        INSERT INTO inventory
          (
            user_id,
            item_key,
            item_name,
            quantity
          )
        VALUES
          (
            ${userId},
            ${item_key},
            ${item.name},
            1
          )
        ON CONFLICT
          (user_id, item_key)
        DO UPDATE SET
          quantity =
            inventory.quantity + 1
      `;

      await sql`
        INSERT INTO purchases
          (
            user_id,
            item_key,
            price
          )
        VALUES
          (
            ${userId},
            ${item_key},
            ${item.price}
          )
      `;

      return send(res, 200, {
        success: true,
        message:
          `${item.name} satın alındı!`,
        remaining_coins:
          coins - item.price
      });
    }


    // ==========================================
    // INVENTORY
    // ==========================================

    if (
      action === "inventory" &&
      req.method === "GET"
    ) {

      const inventory =
        await sql`
          SELECT *
          FROM inventory
          WHERE user_id =
                ${userId}
          ORDER BY
            created_at DESC
        `;

      return send(res, 200, {
        success: true,
        inventory
      });
    }


    // ==========================================
    // DAILY REWARD
    // ==========================================

    if (
      action === "daily-reward" &&
      req.method === "POST"
    ) {

      const today =
        new Date()
          .toISOString()
          .slice(0, 10);

      const existing =
        await sql`
          SELECT *
          FROM daily_rewards
          WHERE user_id =
                ${userId}
          LIMIT 1
        `;

      if (
        existing.length &&
        existing[0].last_claimed
      ) {

        const last =
          new Date(
            existing[0].last_claimed
          )
            .toISOString()
            .slice(0, 10);

        if (last === today) {
          return send(res, 400, {
            success: false,
            message:
              "Bugünkü ödülünü zaten aldın."
          });
        }
      }

      const rewardCoins = 100;

      await sql`
        UPDATE users
        SET
          coins =
            coins + ${rewardCoins}
        WHERE id = ${userId}
      `;

      await sql`
        INSERT INTO daily_rewards
          (
            user_id,
            last_claimed,
            total_claimed
          )
        VALUES
          (
            ${userId},
            ${today},
            1
          )
        ON CONFLICT
          (user_id)
        DO UPDATE SET
          last_claimed =
            ${today},
          total_claimed =
            daily_rewards.total_claimed + 1
      `;

      return send(res, 200, {
        success: true,
        reward_coins:
          rewardCoins,
        message:
          "🎁 Günlük ödülünü aldın!"
      });
    }


    // ==========================================
    // ACHIEVEMENTS
    // ==========================================

    if (
      action === "achievements" &&
      req.method === "GET"
    ) {

      await checkAchievements(
        userId
      );

      const achievements =
        await sql`
          SELECT *
          FROM achievements
          WHERE user_id =
                ${userId}
          ORDER BY
            unlocked_at DESC
        `;

      return send(res, 200, {
        success: true,
        achievements
      });
    }


    // ==========================================
    // SETTINGS
    // ==========================================

    if (
      action === "settings" &&
      req.method === "GET"
    ) {

      let result =
        await sql`
          SELECT *
          FROM user_settings
          WHERE user_id =
                ${userId}
          LIMIT 1
        `;

      if (result.length === 0) {

        result =
          await sql`
            INSERT INTO user_settings
              (
                user_id,
                theme,
                avatar
              )
            VALUES
              (
                ${userId},
                'light',
                '🎓'
              )
            RETURNING *
          `;
      }

      return send(res, 200, {
        success: true,
        settings:
          result[0]
      });
    }


    // ==========================================
    // SETTINGS UPDATE
    // ==========================================

    if (
      action === "settings" &&
      req.method === "PATCH"
    ) {

      const {
        theme,
        avatar
      } = req.body || {};

      const safeTheme =
        ["light", "dark"]
          .includes(theme)
          ? theme
          : "light";

      const result =
        await sql`
          INSERT INTO user_settings
            (
              user_id,
              theme,
              avatar
            )
          VALUES
            (
              ${userId},
              ${safeTheme},
              ${avatar || "🎓"}
            )
          ON CONFLICT
            (user_id)
          DO UPDATE SET
            theme =
              ${safeTheme},
            avatar =
              ${avatar || "🎓"}
          RETURNING *
        `;

      return send(res, 200, {
        success: true,
        settings:
          result[0]
      });
    }


    // ==========================================
    // COACH 🤖
    // ==========================================

    if (
      action === "coach" &&
      req.method === "GET"
    ) {

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
            coins,
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
          WHERE user_id =
                ${userId}
          ORDER BY
            completed ASC,
            created_at DESC
          LIMIT 20
        `,

        sql`
          SELECT
            id,
            title,
            exam_date,
            topic,
            subjects.name
              AS subject_name
          FROM exams
          LEFT JOIN subjects
            ON subjects.id =
               exams.subject_id
          WHERE exams.user_id =
                ${userId}
          AND exams.exam_date >= NOW()
          ORDER BY
            exams.exam_date ASC
          LIMIT 5
        `,

        sql`
          SELECT
            id,
            name
          FROM subjects
          WHERE user_id =
                ${userId}
          ORDER BY
            created_at DESC
        `,

        sql`
          SELECT
            COALESCE(
              SUM(duration_minutes),
              0
            )::int AS minutes,
            COUNT(*)::int AS sessions
          FROM study_sessions
          WHERE user_id =
                ${userId}
        `
      ]);

      if (!userResult.length) {
        return send(res, 404, {
          success: false,
          message:
            "Kullanıcı bulunamadı."
        });
      }

      const user =
        userResult[0];

      const tasks =
        tasksResult;

      const exams =
        examsResult;

      const subjects =
        subjectsResult;

      const sessions =
        sessionsResult[0];

      const incompleteTasks =
        tasks.filter(
          task => !task.completed
        );

      const completedTasks =
        tasks.filter(
          task => task.completed
        );

      const advice = [];

      let priority =
        "normal";

      if (exams.length > 0) {

        const nextExam =
          exams[0];

        const examDate =
          new Date(
            nextExam.exam_date
          );

        const now =
          new Date();

        const daysLeft =
          Math.ceil(
            (
              examDate - now
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        if (daysLeft <= 1) {

          priority =
            "urgent";

          advice.push({
            type: "danger",
            icon: "🚨",
            title:
              "Sınav çok yakın!",
            text:
              `${nextExam.subject_name || ""} ${nextExam.title} için son tekrarlarını yap.`
          });

        } else if (
          daysLeft <= 3
        ) {

          priority =
            "high";

          advice.push({
            type: "warning",
            icon: "⚠️",
            title:
              "Sınav yaklaşıyor",
            text:
              `${nextExam.title} sınavına ${daysLeft} gün kaldı.`
          });

        } else {

          advice.push({
            type: "info",
            icon: "📅",
            title:
              "Yaklaşan sınav",
            text:
              `${nextExam.title} sınavına ${daysLeft} gün kaldı.`
          });
        }
      }

      if (
        incompleteTasks.length === 0
      ) {

        advice.push({
          type: "success",
          icon: "🎉",
          title:
            "Görevlerin tamam!",
          text:
            "Harika gidiyorsun. Yeni bir görev ekleyebilirsin."
        });

      } else {

        advice.push({
          type: "task",
          icon: "🎯",
          title:
            "Bugünkü görev",
          text:
            `"${incompleteTasks[0].title}" görevini tamamla.`
        });
      }

      if (
        sessions.minutes === 0
      ) {

        advice.push({
          type: "focus",
          icon: "⏱️",
          title:
            "Odaklanma zamanı",
          text:
            "İlk 25 dakikalık çalışma seansını başlat!"
        });

      } else if (
        sessions.minutes < 60
      ) {

        advice.push({
          type: "focus",
          icon: "⏱️",
          title:
            "Biraz daha odaklan",
          text:
            "Bugün 25 dakika daha çalışabilirsin."
        });

      } else {

        advice.push({
          type: "focus",
          icon: "🔥",
          title:
            "Harika odaklanma!",
          text:
            `Toplam ${sessions.minutes} dakika çalışmışsın.`
        });
      }

      if (
        Number(user.streak) >= 7
      ) {

        advice.push({
          type: "streak",
          icon: "🔥",
          title:
            "Muhteşem seri!",
          text:
            `${user.streak} günlük serin var.`
        });
      }

      const recommendedTasks =
        Math.min(
          3,
          Math.max(
            1,
            incompleteTasks.length
          )
        );

      const recommendedMinutes =
        exams.length > 0
          ? 50
          : 25;

      const recommendedXP =
        recommendedTasks * 50 +
        recommendedMinutes;

      return send(res, 200, {
        success: true,
        coach: {
          greeting:
            `Merhaba, ${user.name}! 👋`,

          priority,

          xp:
            Number(user.xp) || 0,

          coins:
            Number(user.coins) || 0,

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
            Number(
              sessions.minutes
            ) || 0,

          focus_sessions:
            Number(
              sessions.sessions
            ) || 0,

          recommended: {
            tasks:
              recommendedTasks,
            minutes:
              recommendedMinutes,
            xp:
              recommendedXP
          },

          advice
        }
      });
    }


    // ==========================================
    // STATS 📊
    // ==========================================

    if (action === "stats") {

      const [
        user,
        taskStats,
        subjectCount,
        examCount,
        sessionStats
      ] = await Promise.all([

        sql`
          SELECT
            xp,
            coins,
            streak
          FROM users
          WHERE id =
                ${userId}
          LIMIT 1
        `,

        sql`
          SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
              WHERE completed = true
            )::int AS completed
          FROM tasks
          WHERE user_id =
                ${userId}
        `,

        sql`
          SELECT
            COUNT(*)::int AS count
          FROM subjects
          WHERE user_id =
                ${userId}
        `,

        sql`
          SELECT
            COUNT(*)::int AS count
          FROM exams
          WHERE user_id =
                ${userId}
        `,

        sql`
          SELECT
            COALESCE(
              SUM(duration_minutes),
              0
            )::int AS minutes,
            COUNT(*)::int AS sessions
          FROM study_sessions
          WHERE user_id =
                ${userId}
        `
      ]);

      return send(res, 200, {
        success: true,

        stats: {

          xp:
            Number(
              user[0]?.xp || 0
            ),

          coins:
            Number(
              user[0]?.coins || 0
            ),

          streak:
            Number(
              user[0]?.streak || 0
            ),

          level:
            calculateLevel(
              user[0]?.xp
            ),

          tasks:
            taskStats[0],

          subjects:
            Number(
              subjectCount[0].count
            ),

          exams:
            Number(
              examCount[0].count
            ),

          sessions:
            sessionStats[0]
        }
      });
    }


    // ==========================================
    // UNKNOWN ACTION
    // ==========================================

    return send(res, 404, {
      success: false,
      message:
        "API işlemi bulunamadı."
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
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined
    });
  }
}
