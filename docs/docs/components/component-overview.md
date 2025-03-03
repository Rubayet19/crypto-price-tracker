# Component Overview

This document provides an overview of the key components in the Crypto Price Tracker application.

## Component Structure

The application is organized into the following component structure:

```
src/
└── components/
    ├── Dashboard.tsx       # Main container component
    ├── CryptoCard.tsx      # Individual cryptocurrency card
    ├── SearchBar.tsx       # Search functionality
    ├── RefreshButton.tsx   # Manual refresh button
    ├── LoadingIndicator.tsx # Loading state indicator
    ├── ErrorMessage.tsx    # Error display component
    └── Layout/
        ├── Header.tsx      # Application header
        └── Footer.tsx      # Application footer
```

## Key Components

### Dashboard

The Dashboard is the main container component that houses all crypto-related UI elements.

```typescript
// Dashboard.tsx
import { useCrypto } from '@/context/CryptoContext';
import CryptoCard from './CryptoCard';
import SearchBar from './SearchBar';
import RefreshButton from './RefreshButton';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

const Dashboard = () => {
  const { filteredData, isLoading, error, refreshData } = useCrypto();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <SearchBar />
        <RefreshButton onClick={refreshData} />
      </div>
      
      {isLoading && <LoadingIndicator />}
      
      {error && <ErrorMessage message={error.message} />}
      
      {!isLoading && !error && (
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
```

### CryptoCard

The CryptoCard component displays information about an individual cryptocurrency.

```typescript
// CryptoCard.tsx
import { CryptoData } from '@/types/crypto';
import Image from 'next/image';

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard = ({ crypto }: CryptoCardProps) => {
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 
    ? 'text-green-500' 
    : 'text-red-500';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    }
    return formatCurrency(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Image 
          src={crypto.image} 
          alt={crypto.name} 
          width={40} 
          height={40} 
          className="mr-3"
        />
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
```

### SearchBar

The SearchBar component allows users to filter the displayed cryptocurrencies.

```typescript
// SearchBar.tsx
import { useCrypto } from '@/context/CryptoContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useCrypto();

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
```

### RefreshButton

The RefreshButton component allows users to manually refresh the cryptocurrency data.

```typescript
// RefreshButton.tsx
interface RefreshButtonProps {
  onClick: () => Promise<void>;
}

const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <svg
        className="inline-block w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Refresh
    </button>
  );
};

export default RefreshButton;
```

### LoadingIndicator

The LoadingIndicator component displays a loading spinner when data is being fetched.

```typescript
// LoadingIndicator.tsx
const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;
```

### ErrorMessage

The ErrorMessage component displays error messages to the user.

```typescript
// ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
```

## Layout Components

### Header

The Header component displays the application title and navigation.

```typescript
// Header.tsx
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
```

### Footer

The Footer component displays copyright information and links.

```typescript
// Footer.tsx
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