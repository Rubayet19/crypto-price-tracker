# Crypto Price Tracker

A simple cryptocurrency price tracker application that displays live prices of cryptocurrencies.

## Project Structure

- `/web-app` - Next.js application for the crypto price tracker dashboard
- `/docs` - Docusaurus documentation explaining the approach and implementation

## Quick Start

### Web App

```bash
# Navigate to the web app directory
cd web-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000)

### Documentation

```bash
# Navigate to the docs directory
cd docs

# Install dependencies
npm install

# Run the development server
npm run start
```

The documentation will be available at [http://localhost:3000](http://localhost:3000)

## API Configuration

### Obtaining a CoinGecko API Key

1. Go to [CoinGecko API](https://www.coingecko.com/en/api)
2. Sign up for a free account
3. Navigate to the API section in your account
4. Generate a new API key

### Environment Variables

Create a `.env.local` file in the `web-app` directory with the following variables:

```env
# CoinGecko API Key
NEXT_PUBLIC_API_KEY=your_api_key_here

# CoinGecko API URL (optional)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

# Default cryptocurrencies (optional, comma-separated)
NEXT_PUBLIC_DEFAULT_CRYPTOS=bitcoin,ethereum,ripple,cardano,solana
```

## Features

- Display live prices of 5 cryptocurrencies (Bitcoin, Ethereum, etc.)
- Search functionality to filter displayed cryptocurrencies
- Manual refresh button to fetch updated prices
- Responsive design for both desktop and mobile

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **API**: CoinGecko API
- **Documentation**: Docusaurus

## API Key

This project uses the CoinGecko API. For production use, please obtain your own API key and configure it using environment variables as described above.