import { getPool } from '../../../lib/database';
import { createSchoolsTable } from '../../../lib/utilities';

/**
 * API Route Handler for Fetching Schools List
 * Retrieves all schools from the database with essential information
 * Returns schools ordered by creation date (newest first)
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await createSchoolsTable();

    const pool = getPool(); // ✅ use lazy pool initialization
    const [rows] = await pool.execute(
      'SELECT id, name, address, city, image FROM schools ORDER BY created_at DESC'
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}






