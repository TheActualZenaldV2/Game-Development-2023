// index.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from the client
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', { text: msg.text, ping: Date.now() - msg.timestamp });
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

setInterval(() => {
  // Send ping request to all connected clients
  io.emit('ping');

}, 1000);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
