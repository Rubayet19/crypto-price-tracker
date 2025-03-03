# API Integration

This document explains how the Crypto Price Tracker integrates with the CoinGecko API to fetch cryptocurrency data.

## CoinGecko API

The [CoinGecko API](https://www.coingecko.com/en/api/documentation) is a comprehensive cryptocurrency API that provides data on thousands of cryptocurrencies, including prices, market caps, volume, and more.

### API Key

The project uses the following CoinGecko API key:

```
CG-vdUFSAZyCF9R8r6qUwFLH1nP
```

This key is included in the repository for demonstration purposes. In a production environment, you would typically store this key in an environment variable or a secure configuration file.

## API Service Layer

The API service layer is responsible for communicating with the CoinGecko API. It is implemented in the `src/services/api.ts` file.

### Fetching Cryptocurrency Data

The main function for fetching cryptocurrency data is `fetchCryptoData`:

```typescript
// API Service Structure
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

// Default cryptos to display
const DEFAULT_CRYPTOS = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana'];

// Fetch cryptocurrency data
const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/coins/markets?vs_currency=usd&ids=${DEFAULT_CRYPTOS.join(",")}&order=market_cap_desc`,
      {
        headers: {
          'X-CoinGecko-API-Key': process.env.NEXT_PUBLIC_API_KEY || 'CG-vdUFSAZyCF9R8r6qUwFLH1nP'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};
```

## Error Handling

The API service layer includes error handling to handle various error scenarios:

1. **Network Errors**: If the API is unreachable due to network issues, the service will throw an error that is caught by the context provider.

2. **API Errors**: If the API returns an error response (e.g., rate limiting, invalid parameters), the service will throw an error with the appropriate message.

3. **Data Validation**: The service validates the response data to ensure it matches the expected format.

## Caching

The application implements a simple caching mechanism using the Context API. When data is fetched from the API, it is stored in the context state. Subsequent requests for the same data will use the cached version unless a refresh is explicitly requested.

## Rate Limiting

The CoinGecko API has rate limits for free tier users. To handle rate limiting, the application:

1. Minimizes the number of API requests by caching data
2. Provides clear error messages when rate limits are exceeded
3. Implements a manual refresh button to give users control over when to fetch new data

## Data Transformation

The API service layer transforms the raw API response into a format that is easier to work with in the application. This includes:

1. Extracting only the necessary fields from the API response
2. Formatting currency values for display
3. Calculating additional derived values if needed