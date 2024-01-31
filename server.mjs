import express from 'express';
import http from 'http';
import { Server as SocketIo } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('typing', () => {
    // Broadcast the "typing" event to all connected clients
    socket.broadcast.emit('typing');
  });
  // Handle incoming messages
  socket.on('message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
