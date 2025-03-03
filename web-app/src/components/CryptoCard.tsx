"use client";

import { CryptoData } from '@/types/crypto';
import Image from 'next/image';

/**
 * CryptoCard component to display information about a cryptocurrency
 */
interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard = ({ crypto }: CryptoCardProps) => {
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 
    ? 'text-green-500' 
    : 'text-red-500';

  /**
   * Format currency value to USD
   */
  const formatCurrency = (value: number) => {
    // Use a more consistent formatting approach to avoid hydration errors
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  /**
   * Format market cap value with appropriate suffix (T, B, M)
   */
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 mr-3">
          <Image 
            src={crypto.image} 
            alt={`${crypto.name} logo`}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{crypto.name}</h2>
          <p className="text-gray-500 uppercase">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</p>
        <p className={`${priceChangeColor} font-medium`}>
          {crypto.price_change_percentage_24h > 0 ? '+' : ''}
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Market Cap: <span className="font-medium">{formatMarketCap(crypto.market_cap)}</span>
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;