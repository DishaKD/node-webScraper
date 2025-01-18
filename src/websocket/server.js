const WebSocket = require("ws");
const db = require("../config/database");

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Set();

    this.wss.on("connection", this.handleConnection.bind(this));
  }

  async handleConnection(ws) {
    this.clients.add(ws);

    // Send initial statistics
    const stats = await this.getRecentStoriesCount();
    ws.send(JSON.stringify({ type: "stats", data: stats }));

    ws.on("close", () => {
      this.clients.delete(ws);
    });
  }

  async getRecentStoriesCount() {
    const [rows] = await db.query(
      "SELECT COUNT(*) as count FROM stories WHERE created_at >= NOW() - INTERVAL 5 MINUTE"
    );
    return rows[0].count;
  }

  broadcast(data) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = WebSocketServer;
