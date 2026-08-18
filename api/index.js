import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "CHANGE_THIS_SECRET";


// =====================================
// YARDIMCI
// =====================================

function send(res, status, data) {
  return res.status(status).json(data);
}


// =====================================
// TOKEN
// =====================================

function createToken(user) {
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


// =====================================
// COOKIE'DEN KULLANICI
// =====================================

function getUser(req) {

  const cookies = req.headers.cookie || "";

  const match = cookies.match(
    /ders_token=([^;]+)/
  );

  if (!match) {
    return null;
  }

  try {

    return jwt.verify(
      match[1],
      JWT_SECRET
    );

  } catch {

    return null;

  }
}


// =====================================
// COOKIE OLUŞTUR
// =====================================

function setCookie(res, token) {

  res.setHeader(
    "Set-Cookie",
    `ders_token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
  );

}


// =====================================
// VERİTABANI TABLOLARI
// =====================================

async function createTables() {

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      xp INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      xp INTEGER DEFAULT 50,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

}


// =====================================
// ROUTER
// =====================================

export default async function handler(req, res) {

  try {

    await createTables();

    const action =
      req.query.action || "test";


    // =================================
    // TEST
    // =================================

    if (
      req.method === "GET" &&
      action === "test"
    ) {

      return send(res, 200, {
        success: true,
        message:
          "DersTakip backend + PostgreSQL çalışıyor 🚀"
      });

    }


    // =================================
    // REGISTER
    // =================================

    if (
      req.method === "POST" &&
      action === "register"
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
          message:
            "Tüm alanları doldur."
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
        email.trim().toLowerCase();


      const existing =
        await sql`
          SELECT id
          FROM users
          WHERE email =
            ${normalizedEmail}
        `;


      if (existing.rows.length > 0) {

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


      const result =
        await sql`
          INSERT INTO users
          (
            name,
            email,
            password
          )
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
            streak
        `;


      const user =
        result.rows[0];


      const token =
        createToken(user);

      setCookie(
        res,
        token
      );


      return send(res, 201, {
        success: true,
        message:
          "Hesap oluşturuldu.",
        user
      });

    }


    // =================================
    // LOGIN
    // =================================

    if (
      req.method === "POST" &&
      action === "login"
    ) {

      const {
        email,
        password
      } = req.body || {};


      const normalizedEmail =
        (email || "")
          .trim()
          .toLowerCase();


      const result =
        await sql`
          SELECT *
          FROM users
          WHERE email =
            ${normalizedEmail}
        `;


      if (
        result.rows.length === 0
      ) {

        return send(res, 401, {
          success: false,
          message:
            "E-posta veya şifre hatalı."
        });

      }


      const user =
        result.rows[0];


      const valid =
        await bcrypt.compare(
          password || "",
          user.password
        );


      if (!valid) {

        return send(res, 401, {
          success: false,
          message:
            "E-posta veya şifre hatalı."
        });

      }


      const token =
        createToken(user);

      setCookie(
        res,
        token
      );


      return send(res, 200, {
        success: true,
        message:
          "Giriş başarılı.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          xp: user.xp,
          streak: user.streak
        }
      });

    }


    // =================================
    // ME
    // =================================

    if (
      req.method === "GET" &&
      action === "me"
    ) {

      const user =
        getUser(req);


      if (!user) {

        return send(res, 401, {
          success: false,
          message:
            "Giriş yapmalısın."
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
          WHERE id =
            ${user.id}
        `;


      if (
        result.rows.length === 0
      ) {

        return send(res, 404, {
          success: false,
          message:
            "Kullanıcı bulunamadı."
        });

      }


      return send(res, 200, {
        success: true,
        user:
          result.rows[0]
      });

    }


    // =================================
    // TASKS GET
    // =================================

    if (
      req.method === "GET" &&
      action === "tasks"
    ) {

      const user =
        getUser(req);


      if (!user) {

        return send(res, 401, {
          success: false,
          message:
            "Giriş yapmalısın."
        });

      }


      const result =
        await sql`
          SELECT
            id,
            title,
            completed,
            xp,
            created_at
          FROM tasks
          WHERE user_id =
            ${user.id}
          ORDER BY id DESC
        `;


      return send(res, 200, {
        success: true,
        tasks:
          result.rows
      });

    }


    // =================================
    // TASK CREATE
    // =================================

    if (
      req.method === "POST" &&
      action === "tasks"
    ) {

      const user =
        getUser(req);


      if (!user) {

        return send(res, 401, {
          success: false,
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

        return send(res, 400, {
          success: false,
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
            xp
          )
          VALUES
          (
            ${user.id},
            ${title.trim()},
            50
          )
          RETURNING
            id,
            title,
            completed,
            xp,
            created_at
        `;


      return send(res, 201, {
        success: true,
        task:
          result.rows[0]
      });

    }


    // =================================
    // TASK UPDATE
    // =================================

    if (
      req.method === "PATCH" &&
      action === "tasks"
    ) {

      const user =
        getUser(req);


      if (!user) {

        return send(res, 401, {
          success: false,
          message:
            "Giriş yapmalısın."
        });

      }


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


      const taskResult =
        await sql`
          SELECT *
          FROM tasks
          WHERE id =
            ${id}
          AND user_id =
            ${user.id}
        `;


      if (
        taskResult.rows.length === 0
      ) {

        return send(res, 404, {
          success: false,
          message:
            "Görev bulunamadı."
        });

      }


      const task =
        taskResult.rows[0];


      const completed =
        !task.completed;


      await sql`
        UPDATE tasks
        SET completed =
          ${completed}
        WHERE id =
          ${id}
        AND user_id =
          ${user.id}
      `;


      if (completed) {

        await sql`
          UPDATE users
          SET xp =
            xp + ${task.xp}
          WHERE id =
            ${user.id}
        `;

      } else {

        await sql`
          UPDATE users
          SET xp =
            GREATEST(
              0,
              xp - ${task.xp}
            )
          WHERE id =
            ${user.id}
        `;

      }


      return send(res, 200, {
        success: true,
        completed
      });

    }


    // =================================
    // TASK DELETE
    // =================================

    if (
      req.method === "DELETE" &&
      action === "tasks"
    ) {

      const user =
        getUser(req);


      if (!user) {

        return send(res, 401, {
          success: false,
          message:
            "Giriş yapmalısın."
        });

      }


      const {
        id
      } = req.body || {};


      const taskResult =
        await sql`
          SELECT *
          FROM tasks
          WHERE id =
            ${id}
          AND user_id =
            ${user.id}
        `;


      if (
        taskResult.rows.length === 0
      ) {

        return send(res, 404, {
          success: false,
          message:
            "Görev bulunamadı."
        });

      }


      const task =
        taskResult.rows[0];


      if (task.completed) {

        await sql`
          UPDATE users
          SET xp =
            GREATEST(
              0,
              xp - ${task.xp}
            )
          WHERE id =
            ${user.id}
        `;

      }


      await sql`
        DELETE FROM tasks
        WHERE id =
          ${id}
        AND user_id =
          ${user.id}
      `;


      return send(res, 200, {
        success: true
      });

    }


    // =================================
    // LOGOUT
    // =================================

    if (
      req.method === "POST" &&
      action === "logout"
    ) {

      res.setHeader(
        "Set-Cookie",
        "ders_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
      );


      return send(res, 200, {
        success: true
      });

    }


    return send(res, 404, {
      success: false,
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
        "Sunucu hatası.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined
    });

  }

}
