import "../config/env.js";

import { Server } from "socket.io";

const userSocketMap = {};
let io;

const getSocketOrigins = () => {
  const configuredOrigins = process.env.CLIENT_SOCKET_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins && configuredOrigins.length > 0
    ? configuredOrigins
    : ["http://localhost:5173"];
};

export const initSocket = (httpServer) => {
  if (io) {
    return io;
  }

  io = new Server(httpServer, {
    cors: {
      origin: getSocketOrigins(),
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getReceiverSocketId = (userId) => userSocketMap[userId];

export const getIO = () => {
  if (!io) {
    throw new Error("Socket server not initialized");
  }

  return io;
};
