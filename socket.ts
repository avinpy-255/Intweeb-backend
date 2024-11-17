import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import dotenv from 'dotenv';

dotenv.config();

// Initializing Socket.IO server with types
export const initSocket = (server: HttpServer): void => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRN_URL || process.env.FRN_LOCAL_URI,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Event listener for joining a room
    socket.on("join-room", (roomId: string) => {
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.join(roomId);
    });

    // Event listener for code changes
    socket.on("code-change", ({ roomId, content }: { roomId: string; content: string }) => {
      console.log(`Code updated in room ${roomId} by user ${socket.id}`);
      socket.to(roomId).emit("update-code", content);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
