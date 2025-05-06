const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

let waitingUsers = {}; // key = language, value = array of sockets

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("findPartner", ({ language, topic, feeling }) => {
    socket.language = language;

    if (!waitingUsers[language]) {
      waitingUsers[language] = [];
    }

    const partner = waitingUsers[language].find(s => s !== socket && !s.partner);
    
    if (partner) {
      // Pair them
      socket.partner = partner;
      partner.partner = socket;

      socket.emit("partnerFound");
      partner.emit("partnerFound");
    } else {
      waitingUsers[language].push(socket);
    }
  });

  socket.on("sendMessage", (msg) => {
    if (socket.partner) {
      socket.partner.emit("receiveMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    if (socket.partner) {
      socket.partner.emit("partnerDisconnected");
      socket.partner.partner = null;
    }
    if (waitingUsers[socket.language]) {
      waitingUsers[socket.language] = waitingUsers[socket.language].filter(s => s !== socket);
    }
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});