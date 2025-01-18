const express = require("express");
const http = require("http");
const cron = require("node-cron");
const { scrapeHackerNews, saveStories } = require("./scraper");
const WebSocketServer = require("./websocket/server");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer(server);

// Schedule scraping
cron.schedule("*/5 * * * *", async () => {
  const stories = await scrapeHackerNews();
  await saveStories(stories);
  wss.broadcast({ type: "update", data: stories });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
