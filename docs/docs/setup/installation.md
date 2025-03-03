# Installation

This guide will walk you through the process of installing and running the Crypto Price Tracker project.

## Cloning the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
```

## Setting Up the Web App

Navigate to the web app directory and install the dependencies:

```bash
cd web-app
npm install
```

## Running the Web App

After installing the dependencies, you can start the development server:

```bash
npm run dev
```

This will start the Next.js development server, and the web app will be available at [http://localhost:3000](http://localhost:3000).

## Setting Up the Documentation

Navigate to the docs directory and install the dependencies:

```bash
cd ../docs
npm install
```

## Running the Documentation

After installing the dependencies, you can start the documentation server:

```bash
npm run start
```

This will start the documentation server, and the documentation will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

### Web App

To build the web app for production, run:

```bash
cd web-app
npm run build
```

This will create an optimized production build in the `web-app/.next` directory.

To start the production server, run:

```bash
npm run start
```

### Documentation

To build the documentation for production, run:

```bash
cd docs
npm run build
```

This will create a static build of the documentation in the `docs/build` directory.