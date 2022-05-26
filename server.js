const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log("  - Connected: "+socket.id);

  socket.on("videochat",(arg) => {
    console.log("   - videochat new refresh ");
    socket.broadcast.emit("videochat-broadcast",arg);
  });

  socket.on("chat",(arg) => {
    console.log("   - chat new refresh ");
    socket.broadcast.emit("chat-broadcast",arg); 
  });
});

httpServer.listen(3002, () => {
  console.log(' - Server is running on port 3002.');
});