// Next.js specific imports for enhanced functionality
import Head from 'next/head'; // Component for modifying the document head (title, meta tags, etc.)
import Link from 'next/link'; // Next.js optimized link component for client-side navigation

/**
 * Home Component - Landing Page for School Management System
 * 
 * This is the main landing page component that serves as the entry point
 * for the School Management System application. It provides navigation
 * to the core features: adding new schools and browsing existing schools.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - SEO optimized with proper meta tags
 * - Gradient background for modern visual appeal
 * - Clear call-to-action buttons for primary user flows
 * - Accessible navigation with proper semantic structure
 */
export default function Home() {
  return (
    <>
      {/* Document Head Section - SEO and Browser Tab Configuration */}
      <Head>
        {/* Page title that appears in browser tab and search results */}
        <title>School Management System</title>
        
        {/* Meta description for SEO - appears in search engine results */}
        <meta name="description" content="Manage schools database easily" />
        
        {/* Viewport meta tag for responsive design on mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Main Container - Full viewport height with centered content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
        
        {/* Content Wrapper - Centers all content both horizontally and vertically */}
        <div className="text-center">
          
          {/* Main Heading - Large, bold title with responsive font sizing */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            School Management
          </h1>
          
          {/* Subtitle/Description - Explains the purpose and functionality of the system */}
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Easily manage and browse schools in your database. Add new schools or explore existing ones.
          </p>
          
          {/* Navigation Buttons Container - Responsive flex layout for action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* Primary Action Button - Add New School */}
            {/* Uses white background to stand out as the primary call-to-action */}
            <Link
              href="/addSchool" // Navigate to the add school form page
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Add New School
            </Link>
            
            {/* Secondary Action Button - Browse Schools */}
            {/* Uses semi-transparent blue background as secondary action */}
            <Link
              href="/showSchools" // Navigate to the schools listing/browsing page
              className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg border border-blue-400"
            >
              Browse Schools
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
}





// import Head from 'next/head';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>School Management System</title>
//         <meta name="description" content="Manage schools database easily" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
//         <div className="text-center">
//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//             School Management
//           </h1>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Easily manage and browse schools in your database. Add new schools or explore existing ones.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/addSchool"
//               className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
//             >
//               Add New School
//             </Link>
//             <Link
//               href="/showSchools"
//               className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg border border-blue-400"
//             >
//               Browse Schools
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }