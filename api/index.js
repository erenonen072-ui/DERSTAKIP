import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  try {
    // TEST
    if (req.method === "GET") {
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

    // JSON kontrolü
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "İstek verisi bulunamadı."
      });
    }

    const { action } = req.body;

    // =========================
    // KAYIT
    // =========================
    if (action === "register") {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Ad, e-posta ve şifre zorunludur."
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Şifre en az 6 karakter olmalıdır."
        });
      }

      const existingUser = await sql`
        SELECT id FROM users
        WHERE email = ${email}
      `;

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Bu e-posta zaten kayıtlı."
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        RETURNING id, name, email, xp, streak
      `;

      const user = result[0];

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        success: true,
        message: "Kayıt başarılı 🎉",
        user,
        token
      });
    }

    // =========================
    // GİRİŞ
    // =========================
    if (action === "login") {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "E-posta ve şifre zorunludur."
        });
      }

      const result = await sql`
        SELECT id, name, email, password, xp, streak
        FROM users
        WHERE email = ${email}
      `;

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "E-posta veya şifre yanlış."
        });
      }

      const user = result[0];

      const passwordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordCorrect) {
        return res.status(401).json({
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
        { expiresIn: "7d" }
      );

      delete user.password;

      return res.status(200).json({
        success: true,
        message: "Giriş başarılı 🚀",
        user,
        token
      });
    }

    // =========================
    // GÖREVLERİ GETİR
    // =========================
    if (action === "tasks") {
      const user = getUserFromToken(req);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Giriş yapmanız gerekiyor."
        });
      }

      const tasks = await sql`
        SELECT id, title, completed, xp, created_at
        FROM tasks
        WHERE user_id = ${user.id}
        ORDER BY created_at DESC
      `;

      return res.status(200).json({
        success: true,
        tasks
      });
    }

    // =========================
    // GÖREV EKLE
    // =========================
    if (action === "addTask") {
      const user = getUserFromToken(req);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Giriş yapmanız gerekiyor."
        });
      }

      const { title, xp = 50 } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Görev başlığı zorunludur."
        });
      }

      const result = await sql`
        INSERT INTO tasks (user_id, title, xp)
        VALUES (${user.id}, ${title}, ${xp})
        RETURNING id, title, completed, xp, created_at
      `;

      return res.status(201).json({
        success: true,
        message: "Görev eklendi 📚",
        task: result[0]
      });
    }

    // =========================
    // GÖREV TAMAMLA + XP
    // =========================
    if (action === "completeTask") {
      const user = getUserFromToken(req);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Giriş yapmanız gerekiyor."
        });
      }

      const { taskId } = req.body;

      if (!taskId) {
        return res.status(400).json({
          success: false,
          message: "Görev ID gerekli."
        });
      }

      const taskResult = await sql`
        SELECT id, xp, completed
        FROM tasks
        WHERE id = ${taskId}
        AND user_id = ${user.id}
      `;

      if (taskResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Görev bulunamadı."
        });
      }

      const task = taskResult[0];

      if (task.completed) {
        return res.status(400).json({
          success: false,
          message: "Bu görev zaten tamamlandı."
        });
      }

      await sql`
        UPDATE tasks
        SET completed = TRUE
        WHERE id = ${taskId}
        AND user_id = ${user.id}
      `;

      const userResult = await sql`
        UPDATE users
        SET xp = xp + ${task.xp}
        WHERE id = ${user.id}
        RETURNING id, name, email, xp, streak
      `;

      return res.status(200).json({
        success: true,
        message: `Görev tamamlandı! +${task.xp} XP ⭐`,
        user: userResult[0]
      });
    }

    return res.status(400).json({
      success: false,
      message: "Geçersiz action."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Sunucu hatası.",
      error: error.message
    });
  }
}


// =========================
// TOKEN KONTROLÜ
// =========================

function getUserFromToken(req) {
  try {
    if (!JWT_SECRET) {
      return null;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    return jwt.verify(token, JWT_SECRET);

  } catch (error) {
    return null;
  }
}
