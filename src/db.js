const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

// data klasörünü oluştur
const dataFolder = path.join(__dirname, "../data");

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// Veritabanı
const db = new Database(
    path.join(dataFolder, "ders-takip.db")
);


// Tabloları oluştur
db.exec(`

CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    password TEXT NOT NULL,

    xp INTEGER DEFAULT 0,

    streak INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE IF NOT EXISTS subjects (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    name TEXT NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


CREATE TABLE IF NOT EXISTS tasks (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    subject_id INTEGER,

    title TEXT NOT NULL,

    completed INTEGER DEFAULT 0,

    xp INTEGER DEFAULT 50,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


CREATE TABLE IF NOT EXISTS exams (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    subject_id INTEGER,

    title TEXT NOT NULL,

    exam_date TEXT NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);


CREATE TABLE IF NOT EXISTS study_sessions (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    minutes INTEGER NOT NULL,

    created_at DATETIME
        DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);

`);

console.log("🗄️ Veritabanı hazır!");

module.exports = db;
