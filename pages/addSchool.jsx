// React hooks and form handling imports
import { useState } from 'react'; // React hook for managing component state
import { useForm } from 'react-hook-form'; // Form library for handling form state and validation
import { yupResolver } from '@hookform/resolvers/yup'; // Yup schema resolver for react-hook-form
import * as yup from 'yup'; // Schema validation library

// Next.js specific imports
import Head from 'next/head'; // Component for modifying the document head
import Link from 'next/link'; // Next.js optimized link component for client-side navigation

// Lucide React icons for UI elements
import { Home, Eye, Plus, Upload } from 'lucide-react';

/**
 * Yup validation schema for the school form
 * Defines validation rules and error messages for each form field
 * This ensures data integrity and provides user feedback
 */
const schema = yup.object({
  // School name validation - required field with minimum length
  name: yup.string().required('School name is required').min(2, 'Name must be at least 2 characters'),
  
  // Address validation - required field with minimum length for complete address
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  
  // City validation - required field with minimum length
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  
  // State validation - required field with minimum length
  state: yup.string().required('State is required').min(2, 'State must be at least 2 characters'),
  
  // Contact number validation - required field with regex pattern for 10-digit numbers
  contact: yup.string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact must be a valid 10-digit number'),
  
  // Email validation - required field with email format validation
  email_id: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  // Image file validation - required field for school image upload
  image: yup.mixed().required('School image is required')
});

/**
 * AddSchool Component
 * A comprehensive form component for adding new schools to the database
 * Features: Form validation, file upload, loading states, error handling
 */
export default function AddSchool() {
  // State for tracking form submission status to show loading indicator
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for storing and displaying success/error messages to user
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * React Hook Form configuration
   * Handles form state, validation, and submission logic
   */
  const {
    register,        // Function to register form inputs with validation
    handleSubmit,    // Function to handle form submission with validation
    formState: { errors }, // Object containing validation errors for each field
    reset           // Function to reset form to initial state after successful submission
  } = useForm({
    resolver: yupResolver(schema) // Connect Yup schema for validation
  });

  /**
   * Form submission handler
   * Processes form data, creates FormData object for file upload, and sends to API
   * @param {Object} data - Form data object containing all field values
   */
  const onSubmit = async (data) => {
    // Set loading state to show submission in progress
    setIsSubmitting(true);
    setSubmitMessage(''); // Clear any previous messages

    try {
      // Create FormData object to handle multipart form data (required for file uploads)
      const formData = new FormData();
      
      // Iterate through form data and append to FormData object
      Object.keys(data).forEach(key => {
        if (key === 'image') {
          // For image field, append the actual file (first element of FileList)
          formData.append(key, data[key][0]);
        } else {
          // For other fields, append the string values directly
          formData.append(key, data[key]);
        }
      });

      // Send POST request to API endpoint with form data
      const response = await fetch('/api/schools/add', {
        method: 'POST',
        body: formData, // Send FormData object (don't set Content-Type header, browser will set it)
      });

      // Parse JSON response from server
      const result = await response.json();

      if (response.ok) {
        // Success case - show success message and reset form
        setSubmitMessage('School added successfully!');
        reset(); // Clear all form fields
      } else {
        // Error case - show server error message
        setSubmitMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      // Network or other error - show generic error message
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      // Always reset loading state regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Document Head - SEO and meta information */}
      <Head>
        <title>Add School - School Management</title>
        <meta name="description" content="Add a new school to the database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Main container with gradient background and responsive padding */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header Section - Title, description, and navigation buttons */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New School</h1>
            <p className="text-gray-600 mb-6">Fill in the details to add a school to our database</p>
            
            {/* Navigation Buttons - Home and View Schools links */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Home navigation button */}
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
              
              {/* View all schools navigation button */}
              <Link 
                href="/showSchools" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <Eye className="h-4 w-4" />
                View All Schools
              </Link>
            </div>
          </div>

          {/* Form Card Container - White card with shadow containing the form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Main Form - Handles school data collection and submission */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* School Name Input Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')} // Register field with react-hook-form for validation
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300' // Conditional styling for validation errors
                  }`}
                  placeholder="Enter school name"
                />
                {/* Display validation error message if name field has errors */}
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Address Textarea Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  id="address"
                  {...register('address')} // Register field for validation
                  rows="3" // Multiple rows for complete address input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter complete address"
                />
                {/* Display validation error message if address field has errors */}
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              {/* City and State Fields - Responsive grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City Input Field */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register('city')} // Register field for validation
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter city"
                  />
                  {/* Display validation error message if city field has errors */}
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* State Input Field */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    {...register('state')} // Register field for validation
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter state"
                  />
                  {/* Display validation error message if state field has errors */}
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Contact and Email Fields - Responsive grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Number Input Field */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel" // Use tel input type for better mobile keyboard support
                    id="contact"
                    {...register('contact')} // Register field with 10-digit validation
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.contact ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit contact number"
                  />
                  {/* Display validation error message if contact field has errors */}
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                  )}
                </div>

                {/* Email Input Field */}
                <div>
                  <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email" // Use email input type for validation and better UX
                    id="email_id"
                    {...register('email_id')} // Register field with email validation
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {/* Display validation error message if email field has errors */}
                  {errors.email_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
                  )}
                </div>
              </div>

              {/* Image Upload Field - File input with custom styling */}
             <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  School Image *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    {...register('image')} // Register file input for validation
                    accept="image/*" // Restrict file picker to image types only
                    className={`w-full px-4 py-3 pr-14 sm:pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-2 sm:file:mr-4 file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                      errors.image ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {/* Upload icon positioned absolutely within the input */}
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
                </div>
                {/* Display validation error message if image field has errors */}
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
                {/* Helper text for file upload requirements */}
                <p className="mt-1 text-sm text-gray-500">Upload an image of the school (Max: 5MB)</p>
              </div>
              
              {/* Submit Button - Handles form submission with loading state */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting} // Disable button during submission to prevent double-submit
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed' // Gray styling when disabled
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' // Blue styling when active
                  }`}
                >
                  <Plus className="h-5 w-5" />
                  {/* Dynamic button text based on submission state */}
                  {isSubmitting ? 'Adding School...' : 'Add School'}
                </button>
              </div>

              {/* Success/Error Message Display - Conditional rendering based on submission result */}
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-medium ${
                  submitMessage.includes('successfully') 
                    ? 'bg-green-100 text-green-700 border border-green-200'  // Green styling for success
                    : 'bg-red-100 text-red-700 border border-red-200'        // Red styling for errors
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}









