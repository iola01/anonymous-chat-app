const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public folder
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("findPartner", (prefs) => {
    console.log("Preferences:", prefs);
    socket.emit("partnerFound");
  });

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("partnerDisconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
