import db from '../../lib/database'; 
import { createSchoolsTable } from '../../lib/utilities'; 
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




