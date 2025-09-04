import { getPool } from '../../lib/database';
import { createSchoolsTable } from '../../lib/utilities';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// Disable Next.js default body parser (since formidable handles multipart/form-data)
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await createSchoolsTable();

    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const name = fields.name?.[0];
    const address = fields.address?.[0];
    const city = fields.city?.[0];
    const state = fields.state?.[0];
    const contact = fields.contact?.[0];
    const email_id = fields.email_id?.[0];

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let imageUrl = null;
    const file = files.image?.[0];

    if (file) {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'school-images',
      });
      imageUrl = result.secure_url;
    }

    // ✅ Use getPool instead of direct db import
    const pool = getPool();
    const [dbResult] = await pool.execute(
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
