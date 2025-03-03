"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CryptoData } from '@/types/crypto';
import { fetchCryptoData } from '@/services/api';

/**
 * Interface for the CryptoContext
 */
interface CryptoContextType {
  cryptoData: CryptoData[];
  filteredData: CryptoData[];
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  refreshData: () => Promise<void>;
  setSearchTerm: (term: string) => void;
}

/**
 * Create the CryptoContext with default values
 */
const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

/**
 * CryptoProvider component to wrap the application with the CryptoContext
 */
export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Fetch cryptocurrency data from the API
   */
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoData();
      setCryptoData(data);
      setFilteredData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch initial data when the component mounts
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Filter data when search term changes
   */
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(cryptoData);
    } else {
      const filtered = cryptoData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, cryptoData]);

  /**
   * Refresh data manually
   */
  const refreshData = async () => {
    await fetchData();
  };

  const value = {
    cryptoData,
    filteredData,
    isLoading,
    error,
    searchTerm,
    refreshData,
    setSearchTerm,
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

/**
 * Custom hook to use the CryptoContext
 */
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};