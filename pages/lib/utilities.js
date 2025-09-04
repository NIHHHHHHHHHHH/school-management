'use server';



import pool from './database';

/**
 * Database Table Initialization Function
 * This file contains utility functions that interact with the database.
 * The connection pool is imported from the separate 'database.js' file.
 *
 * Creates the schools table if it doesn't already exist.
 * Ensures database schema is properly set up before operations.
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

 */
export async function createSchoolsTable() {
  try {
    const connection = await pool.getConnection();

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

    connection.release();

    console.log('Schools table created successfully');
  } catch (error) {
    console.error('Error creating schools table:', error);
  }
}
