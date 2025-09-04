import db, { createSchoolsTable } from '../../lib/db';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2 SDK
import formidable from 'formidable'; // Import formidable to parse form data

/**
 * Next.js API route configuration
 * Disables the default body parser to handle multipart/form-data manually
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * API Route Handler for School Registration
 * Handles POST requests to add new schools to the database.
 * Supports file upload for school images using Cloudinary.
 * * @param {Object} req - Next.js API request object
 * @param {Object} res - Next.js API response object
 * @returns {Promise<void>} - Returns JSON response with success/error status
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await createSchoolsTable();

    // Parse the multipart form data using formidable
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    // Extract fields and files from the incoming request
    const [fields, files] = await form.parse(req);

    // Extract school data from the parsed fields.
    // Use optional chaining (`?.[0]`) to safely access values from formidable's array structure.
    const name = fields.name?.[0];
    const address = fields.address?.[0];
    const city = fields.city?.[0];
    const state = fields.state?.[0];
    const contact = fields.contact?.[0];
    const email_id = fields.email_id?.[0];

    // Validate that all required fields are provided
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let imageUrl = null;
    const file = files.image?.[0];

    // If an image file was provided, upload it to Cloudinary
    if (file) {
      // The `filepath` property contains the temporary path of the uploaded file
      const result = await cloudinary.uploader.upload(file.filepath, { folder: 'school-images' });
      // The `secure_url` property is the public URL of the uploaded image
      imageUrl = result.secure_url;
    }

    // Insert the new school record into the database
    const [dbResult] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );

    res.status(201).json({
      message: 'School added successfully',
      schoolId: dbResult.insertId,
    });

  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}







// import db, { createSchoolsTable } from '../../lib/db';
// import { upload } from '../../lib/multerConfig';

// /**
//  * Next.js API route configuration
//  * Disables the default body parser to handle multipart/form-data uploads manually
//  * This is required for file upload functionality using multer
//  */
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// /**
//  * Utility function to promisify middleware execution
//  * Converts callback-based middleware to Promise-based for async/await usage
//  * 
//  * @param {Object} req - HTTP request object
//  * @param {Object} res - HTTP response object  
//  * @param {Function} fn - Middleware function to execute
//  * @returns {Promise} - Resolves when middleware completes successfully, rejects on error
//  */
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// /**
//  * API Route Handler for School Registration
//  * Handles POST requests to add new schools to the database
//  * Supports file upload for school images
//  * 
//  * @param {Object} req - Next.js API request object
//  * @param {Object} res - Next.js API response object
//  * @returns {Promise<void>} - Returns JSON response with success/error status
//  */
// export default async function handler(req, res) {
//   // Only allow POST requests for creating new school records
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Ensure the schools table exists in the database before proceeding
//     // This handles database initialization if table doesn't exist
//     await createSchoolsTable();

//     // Process the multipart form data using multer middleware
//     // 'image' field contains the uploaded school image file
//     await runMiddleware(req, res, upload.single('image'));

//     // Extract school data from the request body
//     // All fields are expected to be provided in the form data
//     const { name, address, city, state, contact, email_id } = req.body;
    
//     // Generate the image path for storage
//     // If no file uploaded, imagePath will be null
//     const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

//     // Validate that all required fields are provided
//     // Returns 400 Bad Request if any required field is missing
//     if (!name || !address || !city || !state || !contact || !email_id) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Insert the new school record into the database
//     // Uses parameterized query to prevent SQL injection attacks
//     const [result] = await db.execute(
//       'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, address, city, state, contact, imagePath, email_id]
//     );

//     // Return success response with the newly created school's ID
//     res.status(201).json({
//       message: 'School added successfully',
//       schoolId: result.insertId, // Auto-generated primary key from database
//     });
//   } catch (error) {
//     // Log the full error details for debugging purposes
//     console.error('Error adding school:', error);
    
//     // Return generic error message to client to avoid exposing internal details
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }







// import db, { createSchoolsTable } from '../../lib/db';
// import { upload } from '../../lib/multerConfig';

// // Disable body parser for file upload
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Ensure table exists
//     await createSchoolsTable();

//     // Run multer middleware
//     await runMiddleware(req, res, upload.single('image'));

//     const { name, address, city, state, contact, email_id } = req.body;
//     const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

//     // Validate required fields
//     if (!name || !address || !city || !state || !contact || !email_id) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Insert into database
//     const [result] = await db.execute(
//       'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, address, city, state, contact, imagePath, email_id]
//     );

//     res.status(201).json({
//       message: 'School added successfully',
//       schoolId: result.insertId,
//     });
//   } catch (error) {
//     console.error('Error adding school:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }