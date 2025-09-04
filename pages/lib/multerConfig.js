// Import required modules for file upload functionality
import multer from 'multer'; // Middleware for handling multipart/form-data (file uploads)
import path from 'path';   // Node.js utility for working with file and directory paths
import fs from 'fs';       // Node.js file system module for file operations

/**
 * File Upload Configuration for School Images
 * This module configures multer middleware for handling school image uploads
 * with proper validation, storage management, and security measures
 */

// Define the directory path where uploaded school images will be stored
const uploadDir = './public/schoolImages';

// Ensure the upload directory exists before attempting to store files
// If directory doesn't exist, create it recursively (creates parent directories if needed)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Configure multer disk storage settings
 * This defines where and how uploaded files should be stored on the server
 */
const storage = multer.diskStorage({
  /**
   * Destination function - determines where uploaded files will be stored
   * @param {Object} req - Express request object
   * @param {Object} file - File object containing upload information
   * @param {Function} cb - Callback function to return the destination path
   */
  destination: function (req, file, cb) {
    // Store all uploaded files in the predefined upload directory
    cb(null, uploadDir);
  },
  
  /**
   * Filename function - generates unique filenames for uploaded files
   * @param {Object} req - Express request object
   * @param {Object} file - File object containing original filename and metadata
   * @param {Function} cb - Callback function to return the generated filename
   */
  filename: function (req, file, cb) {
    // Generate a unique suffix using current timestamp and random number
    // This prevents filename conflicts and ensures uniqueness
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // Create filename with format: school-[timestamp]-[random].extension
    // path.extname() extracts the file extension from original filename
    cb(null, 'school-' + uniqueSuffix + path.extname(file.originalname));
  }
});

/**
 * File filter function to validate uploaded files
 * Only allows image files to be uploaded for security and functionality purposes
 * @param {Object} req - Express request object
 * @param {Object} file - File object containing mimetype and other metadata
 * @param {Function} cb - Callback function to accept/reject the file
 */
const fileFilter = (req, file, cb) => {
  // Check if the uploaded file is an image by examining its MIME type
  if (file.mimetype.startsWith('image/')) {
    // Accept the file (first parameter: error = null, second parameter: accept = true)
    cb(null, true);
  } else {
    // Reject the file with an error message
    cb(new Error('Only image files are allowed!'), false);
  }
};

/**
 * Export configured multer instance for use in routes
 * This middleware handles file uploads with the following specifications:
 * - Storage: Local disk storage in ./public/schoolImages directory
 * - File naming: Unique names with 'school-' prefix
 * - File types: Images only (validated by MIME type)
 * - File size: Maximum 5MB per file
 */
export const upload = multer({
  storage: storage,        // Use the configured disk storage settings
  fileFilter: fileFilter, // Apply file type validation
  limits: {
    fileSize: 5 * 1024 * 1024, // Set maximum file size to 5MB (5 * 1024 * 1024 bytes)
  }
});








// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure upload directory exists
// const uploadDir = './public/schoolImages';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'school-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   }
// });