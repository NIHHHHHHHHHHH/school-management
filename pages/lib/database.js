import mysql from 'mysql2/promise';



// MySQL Connection Pool Configuration
// Uses connection pooling for better performance and resource management
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the connection pool as the default export for use in API routes
export default pool;
