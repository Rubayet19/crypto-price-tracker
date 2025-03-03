# Configuration

This guide explains the configuration options for the Crypto Price Tracker project.

## Environment Variables

The Crypto Price Tracker uses environment variables for configuration. These can be set in a `.env.local` file in the root of the web app directory.

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_KEY` | CoinGecko API key | `CG-vdUFSAZyCF9R8r6qUwFLH1nP` |
| `NEXT_PUBLIC_API_URL` | CoinGecko API URL | `https://api.coingecko.com/api/v3` |
| `NEXT_PUBLIC_DEFAULT_CRYPTOS` | Default cryptocurrencies to display | `bitcoin,ethereum,ripple,cardano,solana` |

## Example .env.local File

```
NEXT_PUBLIC_API_KEY=CG-vdUFSAZyCF9R8r6qUwFLH1nP
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_DEFAULT_CRYPTOS=bitcoin,ethereum,ripple,cardano,solana
```

## Customizing Default Cryptocurrencies

You can customize the default cryptocurrencies displayed in the tracker by modifying the `NEXT_PUBLIC_DEFAULT_CRYPTOS` environment variable. The value should be a comma-separated list of cryptocurrency IDs as used by the CoinGecko API.

For example, to display Bitcoin, Ethereum, and Dogecoin:

```
NEXT_PUBLIC_DEFAULT_CRYPTOS=bitcoin,ethereum,dogecoin
```

## API Rate Limiting

The CoinGecko API has rate limits. The free tier allows for a limited number of requests per minute. If you exceed this limit, the API will return an error. The application includes error handling to display a user-friendly message when this happens.