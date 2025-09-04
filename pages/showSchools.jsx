// React hooks for component state and lifecycle management
import { useState, useEffect } from 'react';

// Next.js specific imports for enhanced functionality
import Head from 'next/head'; // Component for modifying document head (SEO, meta tags)
import Link from 'next/link'; // Next.js optimized link component for client-side navigation
import Image from 'next/image'; // Next.js optimized image component with automatic optimization

// Lucide React icons for UI elements and visual indicators
import { Loader2, MapPin, Building, Plus, Home } from 'lucide-react';

/**
 * ShowSchools Component - Schools Directory Display Page
 * 
 * This component fetches and displays a list of all schools from the database
 * in a responsive grid layout. It handles loading states, error states, and
 * empty states gracefully while providing navigation to add new schools.
 * 
 * Features:
 * - Fetches schools data from API on component mount
 * - Loading spinner during data fetch
 * - Error handling with retry functionality
 * - Empty state with call-to-action
 * - Responsive grid layout for school cards
 * - Optimized images with Next.js Image component
 * - Navigation to home and add school pages
 */
export default function ShowSchools() {
  // State for storing the list of schools fetched from the API
  const [schools, setSchools] = useState([]);
  
  // State for tracking loading status during API calls
  const [loading, setLoading] = useState(true);
  
  // State for storing error messages if API calls fail
  const [error, setError] = useState('');

  /**
   * useEffect hook to fetch schools data when component mounts
   * Empty dependency array ensures this runs only once on initial render
   */
  useEffect(() => {
    fetchSchools();
  }, []);

  /**
   * Fetches schools data from the API endpoint
   * Handles success, error, and loading states appropriately
   * Updates component state based on API response
   */
  const fetchSchools = async () => {
    try {
      // Make API call to fetch schools list
      const response = await fetch('/api/schools/list');
      const data = await response.json();

      if (response.ok) {
        // Success case - update schools state with fetched data
        setSchools(data);
      } else {
        // API returned an error status - set error message
        setError('Failed to fetch schools');
      }
    } catch (error) {
      // Network or other error occurred - set generic error message
      setError('Error fetching schools');
    } finally {
      // Always set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  /**
   * Loading State Component
   * Displays a centered spinner with loading message while data is being fetched
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animated loading spinner */}
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  /**
   * Error State Component
   * Displays error message with retry button when API call fails
   */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Display error message */}
          <p className="text-red-600 mb-4">{error}</p>
          {/* Retry button to attempt fetching data again */}
          <button
            onClick={fetchSchools} // Call fetchSchools function again on click
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /**
   * Main Component Render
   * Displays the schools directory with header, navigation, and school cards
   */
  return (
    <>
      {/* Document Head - SEO and Browser Tab Configuration */}
      <Head>
        <title>All Schools - School Management</title>
        <meta name="description" content="Browse all schools in our database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Header Section - Page title and navigation buttons */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              
              {/* Page Title and Description */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Schools Directory</h1>
                <p className="text-gray-600 mt-1">Discover schools in your area</p>
              </div>
              
              {/* Navigation Buttons Container */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                {/* Home navigation button */}
                <Link
                  href="/"
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-center flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                
                {/* Add new school button */}
                <Link
                  href="/addSchool"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New School
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Schools Content Section - Grid display or empty state */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* Conditional Rendering - Empty State vs Schools Grid */}
          {schools.length === 0 ? (
            /**
             * Empty State Component
             * Displayed when no schools are found in the database
             * Provides clear messaging and call-to-action to add first school
             */
            <div className="text-center py-12">
              {/* Building icon as visual indicator */}
              <div className="text-gray-400 mb-4">
                <Building className="mx-auto h-12 w-12" />
              </div>
              
              {/* Empty state messaging */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
              <p className="text-gray-500 mb-6">Be the first to add a school to our directory!</p>
              
              {/* Call-to-action button to add first school */}
              <Link
                href="/addSchool"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add First School
              </Link>
            </div>
          ) : (
            /**
             * Schools Grid Display
             * Shows all schools in a responsive card layout when data is available
             */
            <>
              {/* Schools Count Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {schools.length} {schools.length === 1 ? 'School' : 'Schools'} Found
                </h2>
              </div>

              {/* Responsive Grid Container for School Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* Map through schools array to render individual school cards */}
                {schools.map((school) => (
                  /**
                   * Individual School Card Component
                   * Displays school information in a card format with image and details
                   */
                  <div
                    key={school.id} // Unique key for React list rendering
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    
                    {/* School Image Section */}
                    <div className="relative h-48 bg-gray-200">
                      {school.image ? (
                        /**
                         * Optimized Image Display
                         * Uses Next.js Image component for automatic optimization
                         * Includes responsive sizing and proper alt text for accessibility
                         */
                        <Image
                          src={school.image} // Image source URL from school data
                          alt={school.name}  // Alt text for accessibility and SEO
                          fill // Fill the container while maintaining aspect ratio
                          className="object-cover" // Crop image to cover container
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Responsive image sizes
                        />
                      ) : (
                        /**
                         * Placeholder for Missing Images
                         * Shows building icon when school image is not available
                         */
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <Building className="h-16 w-16" />
                        </div>
                      )}
                    </div>

                    {/* School Details Section */}
                    <div className="p-6">
                      
                      {/* School Name - Primary heading with text truncation */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {school.name}
                      </h3>
                      
                      {/* School Information Container */}
                      <div className="space-y-2 text-sm text-gray-600">
                        
                        {/* School Address with Map Pin Icon */}
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="line-clamp-2">{school.address}</span>
                        </div>
                        
                        {/* School City with Building Icon */}
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{school.city}</span>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}











// import { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Loader2, MapPin, Building, Plus, Home } from 'lucide-react';

// export default function ShowSchools() {
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       const response = await fetch('/api/schools/list');
//       const data = await response.json();

//       if (response.ok) {
//         setSchools(data);
//       } else {
//         setError('Failed to fetch schools');
//       }
//     } catch (error) {
//       setError('Error fetching schools');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading schools...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchSchools}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>All Schools - School Management</title>
//         <meta name="description" content="Browse all schools in our database" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-4 py-6">
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Schools Directory</h1>
//                 <p className="text-gray-600 mt-1">Discover schools in your area</p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
//                 <Link
//                   href="/"
//                   className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-center flex items-center gap-2"
//                 >
//                   <Home className="h-4 w-4" />
//                   Home
//                 </Link>
//                 <Link
//                   href="/addSchool"
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center flex items-center gap-2"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add New School
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Schools Grid */}
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           {schools.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <Building className="mx-auto h-12 w-12" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
//               <p className="text-gray-500 mb-6">Be the first to add a school to our directory!</p>
//               <Link
//                 href="/addSchool"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Plus className="h-4 w-4" />
//                 Add First School
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {schools.length} {schools.length === 1 ? 'School' : 'Schools'} Found
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {schools.map((school) => (
//                   <div
//                     key={school.id}
//                     className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//                   >
//                     {/* School Image */}
//                     <div className="relative h-48 bg-gray-200">
//                       {school.image ? (
//                         <Image
//                           src={school.image}
//                           alt={school.name}
//                           fill
//                           className="object-cover"
//                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-gray-400">
//                           <Building className="h-16 w-16" />
//                         </div>
//                       )}
//                     </div>

//                     {/* School Details */}
//                     <div className="p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//                         {school.name}
//                       </h3>
                      
//                       <div className="space-y-2 text-sm text-gray-600">
//                         <div className="flex items-start">
//                           <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
//                           <span className="line-clamp-2">{school.address}</span>
//                         </div>
                        
//                         <div className="flex items-center">
//                           <Building className="h-4 w-4 mr-2 flex-shrink-0" />
//                           <span>{school.city}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }