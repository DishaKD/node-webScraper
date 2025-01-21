# Frontpage: Real-time Hacker News Scraper with WebSocket Updates

This project is a real-time scraper for Hacker News that uses WebSockets to push updates to clients. The server is built with Node.js and features web scraping, database storage, and periodic updates.

## Features

- Scrapes real-time data from Hacker News.
- Updates clients via WebSocket.
- Uses a MySQL database for persistent storage.
- Periodic scraping with `node-cron`.
- Environment variable support with `dotenv`.

## Requirements

To run this project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MySQL](https://www.mysql.com/) (v8.0 or higher recommended)

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd frontpage
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=hacker_news
     PORT=3000
     ```

4. Initialize the database:

   ```bash
   npm run init-db
   ```

   Ensure MySQL is running and accessible with the credentials provided in the `.env` file.

## Usage

- Start the server:

  ```bash
  npm start
  ```

  The server will be running on the port specified in your `.env` file (default: 3000).

- Development mode with hot-reloading:
  ```bash
  npm run dev
  ```

## Available Scripts

- `start`: Starts the server.
- `dev`: Runs the server in development mode with hot-reloading using `nodemon`.
- `init-db`: Initializes the database using the SQL file in `src/database/initial.sql`.
- `lint`: Runs ESLint to check for coding style issues.
- `lint:fix`: Automatically fixes coding style issues with ESLint.
- `test`: Placeholder script for running tests (no tests defined yet).

## Dependencies

### Production

- `axios`: HTTP client for making requests to Hacker News.
- `cheerio`: Used for web scraping and parsing HTML.
- `dotenv`: Loads environment variables from `.env` files.
- `express`: Web framework for Node.js.
- `mysql2`: MySQL database driver for Node.js.
- `node-cron`: Schedules periodic scraping tasks.
- `ws`: WebSocket server for real-time communication.

### Development

- `eslint`: Linter for maintaining coding standards.
- `jest`: Testing framework.
- `nodemon`: Automatically restarts the server on file changes.

## Folder Structure

```
frontpage/
├── src/
│   ├── server.js          # Main server file.
│   ├── scraper.js         # Web scraping logic.
│   ├── database/
│   │   ├── initial.sql    # SQL file to initialize the database.
│   │   └── db.js          # Database connection logic.
│   └── utils/             # Utility functions.
├── .env                   # Environment variables (not included in repo).
├── .eslintrc.js           # ESLint configuration.
├── package.json           # Project configuration and scripts.
└── README.md              # Project documentation.
```
