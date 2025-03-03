"use client";

/**
 * Header component for the application
 */
const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto Price Tracker</h1>
      </div>
    </header>
  );
};

export default Header;