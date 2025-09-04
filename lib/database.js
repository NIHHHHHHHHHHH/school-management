// lib/database.js
let pool;

export function getPool() {
  if (!pool) {
    const mysql = require("mysql2/promise"); // require only when called (server-side)

    pool = mysql.createPool({
      host: process.env.DB_HOST ,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
