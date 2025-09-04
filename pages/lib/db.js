import mysql from 'mysql2/promise';

/**
 * Database Configuration and Connection Module
 * Manages MySQL database connections using connection pooling
 * Provides utilities for database initialization and table creation
 */

// Debug log to check environment variables during development
// Helps verify that database configuration is loaded correctly
// WARNING: Remove or secure in production to avoid exposing credentials
console.log("Connecting with:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * MySQL Connection Pool Configuration
 * Uses connection pooling for better performance and resource management
 * Falls back to default values if environment variables are not set
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',        // Database server hostname
  user: process.env.DB_USER || 'root',             // Database username
  password: process.env.DB_PASSWORD || '',         // Database password
  database: process.env.DB_NAME || 'school_db',    // Target database name
  waitForConnections: true,                        // Queue requests when no connections available
  connectionLimit: 10,                             // Maximum number of concurrent connections
  queueLimit: 0,                                   // No limit on queued connection requests
});

// Export the connection pool as the default export for use in API routes
export default pool;

/**
 * Database Table Initialization Function
 * Creates the schools table if it doesn't already exist
 * Ensures database schema is properly set up before operations
 * 
 * Table Schema:
 * - id: Auto-incrementing primary key
 * - name: School name (TEXT, required)
 * - address: School address (TEXT, required)
 * - city: School city (TEXT, required)
 * - state: School state (TEXT, required)
 * - contact: Contact number (BIGINT, required for large phone numbers)
 * - image: Image file path (TEXT, optional)
 * - email_id: School email (VARCHAR(255), required)
 * - created_at: Record creation timestamp (auto-generated)
 * 
 * @returns {Promise<void>} - Resolves when table creation is complete
 */
export async function createSchoolsTable() {
  try {
    // Get a connection from the pool for table creation
    const connection = await pool.getConnection();
    
    // Execute CREATE TABLE IF NOT EXISTS query
    // Uses IF NOT EXISTS to prevent errors if table already exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact BIGINT NOT NULL,
        image TEXT,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Release the connection back to the pool for reuse
    connection.release();
    
    // Log success message for debugging and monitoring
    console.log('Schools table created successfully');
  } catch (error) {
    // Log any errors that occur during table creation
    // This helps with debugging database connectivity or permission issues
    console.error('Error creating schools table:', error);
  }
}












// import mysql from 'mysql2/promise';


// // Debug log to check env variables
// console.log("Connecting with:", {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });


// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'school_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default pool;

// // Create the database table
// export async function createSchoolsTable() {
//   try {
//     const connection = await pool.getConnection();
//     await connection.execute(`
//       CREATE TABLE IF NOT EXISTS schools (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name TEXT NOT NULL,
//         address TEXT NOT NULL,
//         city TEXT NOT NULL,
//         state TEXT NOT NULL,
//         contact BIGINT NOT NULL,
//         image TEXT,
//         email_id VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     connection.release();
//     console.log('Schools table created successfully');
//   } catch (error) {
//     console.error('Error creating schools table:', error);
//   }
// }