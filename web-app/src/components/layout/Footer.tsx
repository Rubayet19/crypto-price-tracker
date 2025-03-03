"use client";

/**
 * Footer component for the application
 */
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Crypto Price Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;