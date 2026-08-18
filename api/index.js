import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

const COOKIE_NAME = "ders_takip_token";

function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
}

function getToken(req) {
  const cookie = req.headers.cookie || "";

  const match = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) =>
      item.startsWith(`${COOKIE_NAME}=`)
    );

  if (!match) {
    return null;
  }

  return match.substring(
    COOKIE_NAME.length + 1
  );
}

function getUserId(req) {
  const token = getToken(req);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

async function getUser(req) {
  const userId = getUserId(req);

  if (!userId) {
    return null;
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
    WHERE id = ${userId}
    LIMIT 1
  `;

  return result[0] || null;
}

function json(res, status, data) {
  res.status(status).json(data);
}

export default async function handler(req, res) {
  try {
    const action = req.query.action || "";

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

      if (
        !name ||
        !email ||
        !password
      ) {
        return json(res, 400, {
          message:
            "Ad, e-posta ve şifre zorunludur."
        });
      }

      if (password.length < 6) {
        return json(res, 400, {
          message:
            "Şifre en az 6 karakter olmalıdır."
        });
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const existing = await sql`
        SELECT id
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (existing.length > 0) {
        return json(res, 409, {
          message:
            "Bu e-posta adresi zaten kayıtlı."
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const result = await sql`
        INSERT INTO users (
          name,
          email,
          password,
          xp,
          streak
        )
        VALUES (
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

      setCookie(res, token);

      return json(res, 201, {
        success: true,
        message:
          "Hesap başarıyla oluşturuldu.",
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

      if (
        !email ||
        !password
      ) {
        return json(res, 400, {
          message:
            "E-posta ve şifre zorunludur."
        });
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${normalizedEmail}
        LIMIT 1
      `;

      if (result.length === 0) {
        return json(res, 401, {
          message:
            "E-posta veya şifre hatalı."
        });
      }

      const user = result[0];

      const passwordCorrect =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordCorrect) {
        return json(res, 401, {
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

      setCookie(res, token);

      delete user.password;

      return json(res, 200, {
        success: true,
        message:
          "Giriş başarılı.",
        user
      });
    }

    // =====================================
    // ME
    // =====================================

    if (
      action === "me" &&
      req.method === "GET"
    ) {
      const user =
        await getUser(req);

      if (!user) {
        return json(res, 401, {
          message:
            "Oturum bulunamadı."
        });
      }

      return json(res, 200, {
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

      return json(res, 200, {
        success: true,
        message:
          "Çıkış yapıldı."
      });
    }

    // =====================================
    // TASKS - GET
    // =====================================

    if (
      action === "tasks" &&
      req.method === "GET"
    ) {
      const userId =
        getUserId(req);

      if (!userId) {
        return json(res, 401, {
          message:
            "Giriş yapmalısın."
        });
      }

      const tasks = await sql`
        SELECT
          id,
          user_id,
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

      return json(res, 200, {
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
      const userId =
        getUserId(req);

      if (!userId) {
        return json(res, 401, {
          message:
            "Giriş yapmalısın."
        });
      }

      const {
        title
      } = req.body || {};

      if (
        !title ||
        !title.trim()
      ) {
        return json(res, 400, {
          message:
            "Görev adı boş olamaz."
        });
      }

      const cleanTitle =
        title.trim();

      if (cleanTitle.length > 150) {
        return json(res, 400, {
          message:
            "Görev adı çok uzun."
        });
      }

      const result = await sql`
        INSERT INTO tasks (
          user_id,
          title,
          completed,
          xp
        )
        VALUES (
          ${userId},
          ${cleanTitle},
          FALSE,
          50
        )
        RETURNING
          id,
          user_id,
          title,
          completed,
          xp,
          created_at
      `;

      return json(res, 201, {
        success: true,
        message:
          "Görev eklendi.",
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
      const userId =
        getUserId(req);

      if (!userId) {
        return json(res, 401, {
          message:
            "Giriş yapmalısın."
        });
      }

      const {
        id
      } = req.body || {};

      if (!id) {
        return json(res, 400, {
          message:
            "Görev ID gerekli."
        });
      }

      const existing =
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

      if (existing.length === 0) {
        return json(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        existing[0];

      const newCompleted =
        !task.completed;

      const xpChange =
        newCompleted
          ? Number(task.xp)
          : -Number(task.xp);

      await sql`
        UPDATE tasks
        SET completed =
          ${newCompleted}
        WHERE
          id = ${id}
          AND user_id = ${userId}
      `;

      await sql`
        UPDATE users
        SET xp =
          GREATEST(
            0,
            xp + ${xpChange}
          )
        WHERE id = ${userId}
      `;

      return json(res, 200, {
        success: true,
        completed:
          newCompleted,
        xpChange
      });
    }

    // =====================================
    // TASKS - DELETE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const userId =
        getUserId(req);

      if (!userId) {
        return json(res, 401, {
          message:
            "Giriş yapmalısın."
        });
      }

      const {
        id
      } = req.body || {};

      if (!id) {
        return json(res, 400, {
          message:
            "Görev ID gerekli."
        });
      }

      const existing =
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

      if (existing.length === 0) {
        return json(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        existing[0];

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp =
            GREATEST(
              0,
              xp - ${Number(task.xp)}
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

      return json(res, 200, {
        success: true,
        message:
          "Görev silindi."
      });
    }

    // =====================================
    // API TEST
    // =====================================

    if (
      action === "test" ||
      action === ""
    ) {
      const result = await sql`
        SELECT NOW() AS time
      `;

      return json(res, 200, {
        success: true,
        message:
          "DersTakip API + Neon PostgreSQL çalışıyor 🚀",
        database:
          "connected",
        time:
          result[0].time
      });
    }

    // =====================================
    // BULUNAMADI
    // =====================================

    return json(res, 404, {
      success: false,
      message:
        "API işlemi bulunamadı."
    });

  } catch (error) {
    console.error(
      "API ERROR:",
      error
    );

    return json(res, 500, {
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
