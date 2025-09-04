import db, { createSchoolsTable } from '../../lib/db';

/**
 * API Route Handler for Fetching Schools List
 * Retrieves all schools from the database with essential information
 * Returns schools ordered by creation date (newest first)
 * 
 * @param {Object} req - Next.js API request object
 * @param {Object} res - Next.js API response object
 * @returns {Promise<void>} - Returns JSON response with schools array or error status
 */
export default async function handler(req, res) {
  // Only allow GET requests for retrieving school data
  // Returns 405 Method Not Allowed for other HTTP methods
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ensure the schools table exists in the database before querying
    // This handles cases where the table might not be initialized yet
    await createSchoolsTable();

    // Fetch schools data from database
    // Only retrieves essential fields for listing purposes (excludes sensitive data like contact, email)
    // Orders results by created_at DESC to show newest schools first
    const [rows] = await db.execute(
      'SELECT id, name, address, city, image FROM schools ORDER BY created_at DESC'
    );

    // Return the schools array as JSON response
    // Status 200 indicates successful data retrieval
    res.status(200).json(rows);
  } catch (error) {
    // Log the complete error details for server-side debugging
    console.error('Error fetching schools:', error);
    
    // Return generic error message to client to prevent exposure of internal system details
    // Status 500 indicates internal server error
    res.status(500).json({ message: 'Internal server error' });
  }
}








// import db, { createSchoolsTable } from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Ensure table exists
//     await createSchoolsTable();

//     const [rows] = await db.execute(
//       'SELECT id, name, address, city, image FROM schools ORDER BY created_at DESC'
//     );

//     res.status(200).json(rows);
//   } catch (error) {
//     console.error('Error fetching schools:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }