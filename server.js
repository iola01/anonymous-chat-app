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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});