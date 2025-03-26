# Internationalization Demo Project

A Node.js application demonstrating internationalization (i18n) with multiple language support for a user management system.

## Features

- Multi-language support (English, French, Spanish, German, Italian)
- RESTful API endpoints
- Static file serving

## Project Structure

## How to Run

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sarthikalathiya/12_internationalisation
cd 12_internationalisation
```

2. Install dependencies:
```bash
npm init -y
npm install i18n
```

### Running the Application

1. Start the server:
```bash
node index.js
```

2. Access the application:
- Open your browser and navigate to `http://localhost:3000`
- The application will start in English by default

### Testing Different Languages

Add the `lang` parameter to the URL to test different languages:
- English: `http://localhost:3000/?lang=en`
- French: `http://localhost:3000/?lang=fr`
- Spanish: `http://localhost:3000/?lang=es`
- German: `http://localhost:3000/?lang=de`
- Italian: `http://localhost:3000/?lang=it`

### Development

To make changes:
1. Edit language files in the `locales` directory
2. Refresh the browser to see changes

