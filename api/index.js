import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

function getCookie(req, name) {
  const cookies = req.headers.cookie || "";

  const parts = cookies.split(";");

  for (const part of parts) {
    const [key, ...value] = part.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

function getUserId(req) {
  const token = getCookie(req, "token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded.userId;
  } catch {
    return null;
  }
}

function sendCookie(res, token) {
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

export default async function handler(req, res) {
  try {
    const action = req.query.action;

    // =====================================
    // TEST
    // =====================================

    if (!action) {
      const result = await sql`
        SELECT NOW() AS time
      `;

      return res.status(200).json({
        success: true,
        message: "DersTakip API + Neon PostgreSQL çalışıyor 🚀",
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
      } = req.body || {};

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Tüm alanları doldur."
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
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
        return res.status(400).json({
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
            (name, email, password)
          VALUES
            (
              ${name.trim()},
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
          userId: user.id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

      sendCookie(res, token);

      return res.status(201).json({
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
      } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({
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
        return res.status(401).json({
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
        return res.status(401).json({
          message:
            "E-posta veya şifre hatalı."
        });
      }

      const token = jwt.sign(
        {
          userId: user.id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

      sendCookie(res, token);

      return res.status(200).json({
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

    // =====================================
    // ME
    // =====================================

    if (
      action === "me" &&
      req.method === "GET"
    ) {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          message: "Giriş yapılmamış."
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
          WHERE id = ${userId}
          LIMIT 1
        `;

      if (result.length === 0) {
        return res.status(401).json({
          message:
            "Kullanıcı bulunamadı."
        });
      }

      return res.status(200).json({
        success: true,
        user: result[0]
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

      return res.status(200).json({
        success: true,
        message: "Çıkış yapıldı."
      });
    }

    // =====================================
    // TASKS - GET
    // =====================================

    if (
      action === "tasks" &&
      req.method === "GET"
    ) {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          message: "Giriş yapmalısın."
        });
      }

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

      return res.status(200).json({
        success: true,
        tasks
      });
    }

    // =====================================
    // TASKS - POST
    // =====================================

    if (
      action === "tasks" &&
      req.method === "POST"
    ) {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          message: "Giriş yapmalısın."
        });
      }

      const { title } =
        req.body || {};

      if (!title || !title.trim()) {
        return res.status(400).json({
          message:
            "Görev adı boş olamaz."
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
              false,
              50
            )
          RETURNING
            id,
            title,
            completed,
            xp,
            created_at
        `;

      return res.status(201).json({
        success: true,
        task: result[0]
      });
    }

    // =====================================
    // TASKS - PATCH
    // =====================================

    if (
      action === "tasks" &&
      req.method === "PATCH"
    ) {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          message: "Giriş yapmalısın."
        });
      }

      const { id } =
        req.body || {};

      if (!id) {
        return res.status(400).json({
          message:
            "Görev ID gerekli."
        });
      }

      const current =
        await sql`
          SELECT
            id,
            completed,
            xp
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${userId}
          LIMIT 1
        `;

      if (current.length === 0) {
        return res.status(404).json({
          message:
            "Görev bulunamadı."
        });
      }

      const oldCompleted =
        current[0].completed;

      const newCompleted =
        !oldCompleted;

      const xp =
        Number(current[0].xp) || 50;

      await sql`
        UPDATE tasks
        SET completed =
          ${newCompleted}
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      // Görev tamamlandıysa XP ekle
      if (
        !oldCompleted &&
        newCompleted
      ) {
        await sql`
          UPDATE users
          SET xp = xp + ${xp}
          WHERE id = ${userId}
        `;
      }

      // Görev geri açıldıysa XP çıkar
      if (
        oldCompleted &&
        !newCompleted
      ) {
        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${xp}
          )
          WHERE id = ${userId}
        `;
      }

      return res.status(200).json({
        success: true,
        completed: newCompleted
      });
    }

    // =====================================
    // TASKS - DELETE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          message: "Giriş yapmalısın."
        });
      }

      const { id } =
        req.body || {};

      const task =
        await sql`
          SELECT
            completed,
            xp
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${userId}
          LIMIT 1
        `;

      if (task.length === 0) {
        return res.status(404).json({
          message:
            "Görev bulunamadı."
        });
      }

      // Tamamlanmış görev siliniyorsa XP geri alınır
      if (task[0].completed) {
        const xp =
          Number(task[0].xp) || 50;

        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${xp}
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

      return res.status(200).json({
        success: true,
        message: "Görev silindi."
      });
    }

    // =====================================
    // BULUNAMADI
    // =====================================

    return res.status(404).json({
      message:
        "API işlemi bulunamadı."
    });

  } catch (error) {
    console.error(
      "API ERROR:",
      error
    );

    return res.status(500).json({
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
