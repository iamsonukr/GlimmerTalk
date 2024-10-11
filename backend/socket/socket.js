import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3003"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // { userId: socketId }

// Function to get receiver's socket ID
export const getReceiverSocketId = (receiverID) => {
  return userSocketMap[receiverID];
};

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Get userId from the query
  const userId = socket.handshake.query.userId;

  // Ensure userId is valid before adding to the socket map
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected, socket ID: ${socket.id}`);
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];  // Remove the user from the map
      io.emit("getOnlineUsers", Object.keys(userSocketMap));  // Update the online users list
    }
  });
});

export { app, server, io };
