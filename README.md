# 🏫 School Management System

A modern, responsive web application built with **Next.js** and **MySQL** for managing school data. This system allows users to add new schools to a database and browse existing schools in an intuitive, e-commerce-style interface.

## 🌟 Features

### ✨ Core Functionality
- **Add Schools**: Comprehensive form with validation for adding new schools
- **Browse Schools**: E-commerce style grid display of all schools
- **Image Upload**: Store and display school images using Cloudinary
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Form Validation**: Client-side validation with error handling using Yup schema

### 🛠 Technical Features
- **Next.js Framework**: Server-side rendering and API routes
- **MySQL Database**: Reliable data storage with connection pooling
- **React Hook Form**: Efficient form state management
- **Cloudinary Integration**: Cloud-based image storage and optimization
- **Tailwind CSS**: Modern, responsive styling
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Live Demo

- **🌐 Live Website**: https://school-management-production-74a5.up.railway.app


## 📋 Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠 Tech Stack

## | Technology | Purpose |
|------------|---------|
| **Next.js 13+** | React framework with API routes |
| **MySQL** | Database management |
| **React Hook Form** | Form state management |
| **Yup** | Schema validation |
| **Tailwind CSS** | Styling and responsive design |
| **Cloudinary** | Image upload and storage |
| **Lucide React** | Modern icon library |
| **Formidable** | File upload handling |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MySQL database server
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone [your-repo-url]
cd school-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Database Setup
The application will automatically create the `schools` table on first run.

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Pages Overview

### 🏠 Home Page (`/`)
- Landing page with navigation to main features
- Clean, gradient design with call-to-action buttons
- Responsive layout for all screen sizes

### ➕ Add School (`/addSchool`)
**Features:**
- Complete form validation using Yup schema
- File upload for school images
- Responsive grid layout for form fields
- Real-time validation feedback
- Loading states during form submission

**Validation Rules:**
- Name: Required, minimum 2 characters
- Address: Required, minimum 5 characters  
- City: Required, minimum 2 characters
- State: Required, minimum 2 characters
- Contact: Required, 10-digit number format
- Email: Required, valid email format
- Image: Required file upload

### 👀 Browse Schools (`/showSchools`)
**Features:**
- E-commerce style grid layout
- Responsive design (1-4 columns based on screen size)
- Optimized images with Next.js Image component
- Loading and error states
- Empty state with call-to-action

**Display Information:**
- School name
- Complete address
- City location
- School image (with fallback icon)

## 🗂 Project Structure

```
school-management-system/
├── lib/
│   ├── database.js          # MySQL connection pool
│   └── utilities.js         # Database utilities
├── pages/
│   ├── api/schools/
│   │   ├── add.js          # Add school API endpoint
│   │   └── list.js         # List schools API endpoint
│   ├── addSchool.jsx       # Add school form page
│   ├── showSchools.jsx     # Browse schools page
│   └── index.js            # Home landing page
├── public/                 # Static assets
├── styles/                 # Global styles
└── README.md
```

## 🔌 API Endpoints

### POST `/api/schools/add`
Add a new school to the database
- **Body**: FormData with school information and image file
- **Response**: Success message with school ID

### GET `/api/schools/list`
Retrieve all schools from database
- **Response**: Array of school objects with id, name, address, city, and image

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: 1024px - 1280px (3 column grid)
- **Large Desktop**: > 1280px (4 column grid)

## 🔒 Form Validation

Comprehensive client-side validation includes:
- Required field validation
- Email format validation
- Phone number format (10 digits)
- Minimum length requirements
- File type validation for images
- Real-time error display

## 🎨 UI/UX Features

- **Loading States**: Spinners during data fetching
- **Error Handling**: Graceful error messages with retry options
- **Empty States**: Helpful messages when no data is available
- **Hover Effects**: Interactive button and card animations
- **Focus States**: Accessible form navigation
- **Modern Icons**: Lucide React icon library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub:https://github.com/NIHHHHHHHHHHH

⭐ **Star this repository if you found it helpful!**
