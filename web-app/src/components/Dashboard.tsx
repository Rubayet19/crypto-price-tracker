"use client";

import { useCrypto } from '@/context/CryptoContext';
import CryptoCard from './CryptoCard';
import SearchBar from './SearchBar';
import RefreshButton from './RefreshButton';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

/**
 * Dashboard component to display cryptocurrency data
 */
const Dashboard = () => {
  const { filteredData, isLoading, error, refreshData } = useCrypto();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <SearchBar />
        <RefreshButton onClick={refreshData} />
      </div>
      
      {isLoading && <LoadingIndicator />}
      
      {error && <ErrorMessage message={error.message} />}
      
      {!isLoading && !error && filteredData.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative my-4" role="alert">
          <p>No cryptocurrencies found matching your search criteria.</p>
        </div>
      )}
      
      {!isLoading && !error && filteredData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;