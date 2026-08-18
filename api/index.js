const { neon } = require("@neondatabase/serverless");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET =
  process.env.JWT_SECRET || "change-this-secret";

function send(res, status, data) {
  return res.status(status).json(data);
}

function getToken(req) {
  const cookie = req.headers.cookie || "";

  const match = cookie.match(
    /ders_token=([^;]+)/
  );

  return match ? match[1] : null;
}

function getUser(req) {
  try {
    const token = getToken(req);

    if (!token) {
      return null;
    }

    return jwt.verify(
      token,
      JWT_SECRET
    );
  } catch {
    return null;
  }
}

function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `ders_token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
  );
}

function clearCookie(res) {
  res.setHeader(
    "Set-Cookie",
    "ders_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  );
}

async function readBody(req) {
  if (req.body) {
    return typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;
  }

  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(
          body
            ? JSON.parse(body)
            : {}
        );
      } catch {
        resolve({});
      }
    });
  });
}

async function getFullUser(id) {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      xp,
      streak,
      created_at
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows[0] || null;
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

module.exports = async function handler(req, res) {
  try {
    const action =
      req.query.action || "health";

    // =====================================
    // HEALTH
    // =====================================

    if (action === "health") {
      const result = await sql`
        SELECT NOW() AS time
      `;

      return send(res, 200, {
        success: true,
        message:
          "DersTakip 2.0 🚀",
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
      const body =
        await readBody(req);

      const name =
        String(body.name || "").trim();

      const email =
        String(body.email || "")
          .trim()
          .toLowerCase();

      const password =
        String(body.password || "");

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

      const existing =
        await sql`
          SELECT id
          FROM users
          WHERE email = ${email}
          LIMIT 1
        `;

      if (existing.length) {
        return send(res, 409, {
          message:
            "Bu e-posta zaten kayıtlı."
        });
      }

      const hashed =
        await bcrypt.hash(
          password,
          10
        );

      const rows =
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
            ${name},
            ${email},
            ${hashed},
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

      const user = rows[0];

      const token =
        createToken(user);

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
      const body =
        await readBody(req);

      const email =
        String(body.email || "")
          .trim()
          .toLowerCase();

      const password =
        String(body.password || "");

      const rows =
        await sql`
          SELECT *
          FROM users
          WHERE email = ${email}
          LIMIT 1
        `;

      if (!rows.length) {
        return send(res, 401, {
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
          message:
            "E-posta veya şifre yanlış."
        });
      }

      const token =
        createToken(user);

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

    if (action === "me") {
      const authUser =
        getUser(req);

      if (!authUser) {
        return send(res, 401, {
          message:
            "Oturum bulunamadı."
        });
      }

      const user =
        await getFullUser(
          authUser.id
        );

      if (!user) {
        return send(res, 401, {
          message:
            "Kullanıcı bulunamadı."
        });
      }

      return send(res, 200, {
        success: true,
        user
      });
    }

    // =====================================
    // AUTH KONTROL
    // =====================================

    const authUser =
      getUser(req);

    if (!authUser) {
      return send(res, 401, {
        message:
          "Giriş yapmalısın."
      });
    }

    // =====================================
    // TASKS GET
    // =====================================

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
          WHERE user_id = ${authUser.id}
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
      const body =
        await readBody(req);

      const title =
        String(body.title || "")
          .trim();

      if (!title) {
        return send(res, 400, {
          message:
            "Görev adı boş olamaz."
        });
      }

      const rows =
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
            ${authUser.id},
            ${title},
            FALSE,
            50
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
      const body =
        await readBody(req);

      const id =
        Number(body.id);

      if (!id) {
        return send(res, 400, {
          message:
            "Geçersiz görev."
        });
      }

      const current =
        await sql`
          SELECT *
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${authUser.id}
          LIMIT 1
        `;

      if (!current.length) {
        return send(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        current[0];

      const completed =
        !task.completed;

      await sql`
        UPDATE tasks
        SET completed = ${completed}
        WHERE
          id = ${id}
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
          SET xp = GREATEST(
            0,
            xp - ${task.xp}
          )
          WHERE id = ${authUser.id}
        `;
      }

      const updated =
        await getFullUser(
          authUser.id
        );

      return send(res, 200, {
        success: true,
        completed,
        user: updated
      });
    }

    // =====================================
    // TASK DELETE
    // =====================================

    if (
      action === "tasks" &&
      req.method === "DELETE"
    ) {
      const body =
        await readBody(req);

      const id =
        Number(body.id);

      const rows =
        await sql`
          SELECT *
          FROM tasks
          WHERE
            id = ${id}
            AND user_id = ${authUser.id}
          LIMIT 1
        `;

      if (!rows.length) {
        return send(res, 404, {
          message:
            "Görev bulunamadı."
        });
      }

      const task =
        rows[0];

      await sql`
        DELETE FROM tasks
        WHERE
          id = ${id}
          AND user_id = ${authUser.id}
      `;

      if (task.completed) {
        await sql`
          UPDATE users
          SET xp = GREATEST(
            0,
            xp - ${task.xp}
          )
          WHERE id = ${authUser.id}
        `;
      }

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
      const subjects =
        await sql`
          SELECT
            id,
            name,
            color,
            created_at
          FROM subjects
          WHERE user_id = ${authUser.id}
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
      const body =
        await readBody(req);

      const name =
        String(body.name || "")
          .trim();

      if (!name) {
        return send(res, 400, {
          message:
            "Ders adı yazmalısın."
        });
      }

      const existing =
        await sql`
          SELECT id
          FROM subjects
          WHERE
            user_id = ${authUser.id}
            AND LOWER(name) =
                LOWER(${name})
          LIMIT 1
        `;

      if (existing.length) {
        return send(res, 409, {
          message:
            "Bu ders zaten var."
        });
      }

      const rows =
        await sql`
          INSERT INTO subjects
          (
            user_id,
            name
          )
          VALUES
          (
            ${authUser.id},
            ${name}
          )
          RETURNING *
        `;

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
      const body =
        await readBody(req);

      const id =
        Number(body.id);

      await sql`
        DELETE FROM subjects
        WHERE
          id = ${id}
          AND user_id = ${authUser.id}
      `;

      return send(res, 200, {
        success: true
      });
    }

    // =====================================
    // FOCUS SESSION
    // =====================================

    if (
      action === "focus" &&
      req.method === "POST"
    ) {
      const body =
        await readBody(req);

      const duration =
        Number(
          body.duration || 25
        );

      const xp =
        duration >= 25
          ? 25
          : 0;

      await sql`
        INSERT INTO study_sessions
        (
          user_id,
          duration_minutes,
          xp
        )
        VALUES
        (
          ${authUser.id},
          ${duration},
          ${xp}
        )
      `;

      if (xp > 0) {
        await sql`
          UPDATE users
          SET xp = xp + ${xp}
          WHERE id = ${authUser.id}
        `;
      }

      const user =
        await getFullUser(
          authUser.id
        );

      return send(res, 200, {
        success: true,
        xp,
        user
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
        "Sunucu hatası oluştu."
    });
  }
};
