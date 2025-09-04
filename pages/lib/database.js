// lib/database.js
let pool;

export function getPool() {
  if (!pool) {
    const mysql = require("mysql2/promise"); // require only when called (server-side)

    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "school_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
