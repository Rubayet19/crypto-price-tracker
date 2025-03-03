# Architecture Overview

This document provides a high-level overview of the Crypto Price Tracker architecture.

## Project Structure

The Crypto Price Tracker project is organized into the following structure:

```
crypto-price-tracker/
├── web-app/               # Next.js application
│   ├── src/               # Source code
│   │   ├── app/           # App router structure
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Context API for state management
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API service layer
│   │   ├── styles/        # Global styles
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── next.config.js     # Next.js configuration
│   └── package.json       # Dependencies and scripts
│
├── docs/                  # Documentation
│   ├── docs/              # Documentation content
│   ├── src/               # Custom components
│   └── package.json       # Dependencies and scripts
│
└── README.md              # Project overview
```

## Architecture Diagram

The following diagram illustrates the high-level architecture of the Crypto Price Tracker:

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   Context   │     │  Components │     │    Hooks    │   │
│  │    API      │◄────┤             │◄────┤             │   │
│  └─────┬───────┘     └─────────────┘     └─────────────┘   │
│        │                                                    │
│  ┌─────▼───────┐                                            │
│  │   Service   │                                            │
│  │    Layer    │                                            │
│  └─────┬───────┘                                            │
└────────┼────────────────────────────────────────────────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────┐
│  CoinGecko API  │
└─────────────────┘
```

## Key Components

### 1. Next.js App Router

The application uses Next.js with the App Router for routing and server-side rendering capabilities.

### 2. Context API

The Context API is used for state management, providing a centralized store for:
- Cryptocurrency data
- Loading states
- Error handling
- Search functionality

### 3. Service Layer

The service layer handles communication with the CoinGecko API, including:
- Fetching cryptocurrency data
- Error handling
- Data transformation

### 4. UI Components

The UI components are built using React and styled with Tailwind CSS. Key components include:
- Dashboard
- CryptoCard
- SearchBar
- RefreshButton
- LoadingIndicator

### 5. Custom Hooks

Custom hooks are used to encapsulate and reuse logic across components.