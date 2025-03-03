# Challenges & Solutions

This document outlines the challenges faced during the development of the Crypto Price Tracker and the solutions implemented to address them.

## API Rate Limiting

### Challenge

The CoinGecko API has rate limits for free tier users, which can lead to API requests being rejected if too many requests are made in a short period.

### Solution

To address this challenge, we implemented several strategies:

1. **Caching**: We cache the API responses in the application state to minimize the number of API requests.

2. **Manual Refresh**: Instead of automatically refreshing the data at regular intervals, we provide a manual refresh button, giving users control over when to fetch new data.

3. **Error Handling**: We implemented robust error handling to display user-friendly error messages when rate limits are exceeded.

4. **Optimized API Requests**: We fetch only the necessary data in a single API request rather than making multiple requests.

## State Management

### Challenge

Managing application state, including cryptocurrency data, loading states, error handling, and search functionality, in a clean and efficient way.

### Solution

We chose to use React's Context API for state management because:

1. **Simplicity**: Context API is built into React and doesn't require additional libraries.

2. **Centralized State**: All state is managed in a single location, making it easier to reason about.

3. **Avoiding Prop Drilling**: Context API allows components to access state without passing props through multiple levels.

The `CryptoContext` provides a clean interface for components to access and update the application state.

## Search Functionality

### Challenge

Implementing a search feature that filters cryptocurrencies by name or symbol in real-time without making additional API requests.

### Solution

We implemented the search functionality using the Context API:

1. **Client-Side Filtering**: We filter the cached cryptocurrency data on the client side based on the search term.

2. **Real-Time Updates**: The filtered data is updated in real-time as the user types in the search bar.

3. **Case-Insensitive Search**: The search is case-insensitive to improve user experience.

```typescript
// Filter data when search term changes
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
```

## Responsive Design

### Challenge

Creating a user interface that works well on both desktop and mobile devices.

### Solution

We used Tailwind CSS to implement a responsive design:

1. **Mobile-First Approach**: We designed the UI with mobile devices in mind first, then enhanced it for larger screens.

2. **Responsive Grid**: We used a responsive grid layout that adjusts the number of columns based on the screen size.

```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredData.map((crypto) => (
    <CryptoCard key={crypto.id} crypto={crypto} />
  ))}
</div>
```

3. **Flexible Components**: All components are designed to adapt to different screen sizes.

## Error Handling

### Challenge

Handling various error scenarios, including network errors, API errors, and data validation errors, in a user-friendly way.

### Solution

We implemented a comprehensive error handling strategy:

1. **Centralized Error State**: Errors are stored in the context state and can be accessed by any component.

2. **Error Component**: We created a reusable `ErrorMessage` component to display error messages in a consistent way.

3. **Try-Catch Blocks**: All API requests are wrapped in try-catch blocks to catch and handle errors.

```typescript
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
```

4. **User-Friendly Messages**: Error messages are translated into user-friendly language.

## Loading States

### Challenge

Providing feedback to users when data is being fetched from the API.

### Solution

We implemented loading states using the Context API:

1. **Loading State**: A boolean flag in the context state indicates whether data is being fetched.

2. **Loading Indicator**: We created a `LoadingIndicator` component that displays a spinner when data is being fetched.

3. **Conditional Rendering**: Components conditionally render based on the loading state.

```typescript
{isLoading && <LoadingIndicator />}

{!isLoading && !error && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredData.map((crypto) => (
      <CryptoCard key={crypto.id} crypto={crypto} />
    ))}
  </div>
)}
```

## Type Safety

### Challenge

Ensuring type safety throughout the application to prevent runtime errors.

### Solution

We used TypeScript to add static type checking to the application:

1. **Interface Definitions**: We defined interfaces for all data structures, including API responses and component props.

2. **Type Checking**: TypeScript checks for type errors at compile time, preventing many common runtime errors.

3. **IDE Integration**: TypeScript provides better IDE support, including autocompletion and inline documentation.

```typescript
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CryptoContextType {
  cryptoData: CryptoData[];
  filteredData: CryptoData[];
  isLoading: boolean;
  error: Error | null;
  searchTerm: string;
  refreshData: () => Promise<void>;
  setSearchTerm: (term: string) => void;
}