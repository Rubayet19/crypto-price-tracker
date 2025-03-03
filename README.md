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

This project uses the CoinGecko API. The API key is included in the repository for demonstration purposes.