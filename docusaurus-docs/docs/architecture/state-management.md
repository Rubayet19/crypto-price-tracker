# State Management

This document explains the state management approach used in the Crypto Price Tracker application.

## Context API

The Crypto Price Tracker uses React's Context API for state management. This approach was chosen for several reasons:

1. **Simplicity**: Context API is built into React and doesn't require additional libraries.
2. **Sufficient for the application's needs**: The application has a relatively simple state that doesn't require more complex state management solutions.
3. **Avoids prop drilling**: Context API allows components to access state without passing props through multiple levels.
4. **Centralized state**: All state is managed in a single location, making it easier to reason about.

## CryptoContext

The main context for the application is `CryptoContext`, which is implemented in `src/context/CryptoContext.tsx`.

### Context Structure

The context provides the following state and functions:

```typescript
interface CryptoContextType {
  cryptoData: CryptoData[];        // Raw data from the API
  filteredData: CryptoData[];      // Data filtered by search term
  isLoading: boolean;              // Loading state
  error: Error | null;             // Error state
  searchTerm: string;              // Current search term
  refreshData: () => Promise<void>; // Function to refresh data
  setSearchTerm: (term: string) => void; // Function to update search term
}
```

### Context Provider

The context provider is responsible for:

1. Fetching initial data when the application loads
2. Providing a way to refresh the data
3. Filtering the data based on the search term
4. Managing loading and error states

Here's a simplified version of the context provider:

```typescript
export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

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
```

## Using the Context

Components can access the context using the `useCrypto` hook:

```typescript
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
```

Example usage in a component:

```typescript
const Dashboard = () => {
  const { filteredData, isLoading, error, refreshData } = useCrypto();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <RefreshButton onClick={refreshData} />
      <CryptoList cryptos={filteredData} />
    </div>
  );
};
```

## Why Context API Over Other Solutions

### Context API vs. Redux

Redux is a popular state management library, but it introduces more complexity than needed for this application. Redux is more suitable for applications with:

- Complex state logic
- Multiple related state slices
- Need for middleware (e.g., for async operations)
- Time-travel debugging requirements

### Context API vs. React Query

React Query is an excellent library for managing server state, but it adds an additional dependency. For this simple application, the built-in Context API with custom fetch logic is sufficient.

If the application were to grow in complexity, React Query would be a good choice for:

- Automatic refetching
- Caching
- Background updates
- Pagination
- Optimistic updates

### Context API vs. Zustand

Zustand is a lightweight state management library that could be a good alternative to Context API. It provides a simpler API than Redux while still offering powerful features.

For this application, Context API was chosen because it's built into React and doesn't require additional dependencies.