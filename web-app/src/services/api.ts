import { CryptoData } from '@/types/crypto';

export const DEFAULT_CRYPTOS = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana'];


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_API_KEY environment variable is required');
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
}

/**
 * Fetches cryptocurrency data from the CoinGecko API
 * @returns Promise<CryptoData[]> Array of cryptocurrency data
 */
export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const cryptoIds = process.env.NEXT_PUBLIC_DEFAULT_CRYPTOS?.split(',') || DEFAULT_CRYPTOS;
    
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      {
        headers: {
          'X-CoinGecko-API-Key': API_KEY
        }
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch crypto data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate the response data
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format: expected an array');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error instanceof Error 
      ? error 
      : new Error('An unknown error occurred while fetching crypto data');
  }
};