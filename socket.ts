import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

// Initializing socket.io server with types
export const initSocket = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handling user joining a room
    socket.on("join-room", (roomId: string) => {
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.join(roomId);
    });

    // Handling code changes in a specific room
    socket.on("code-change", ({ roomId, content }: { roomId: string; content: string }) => {
      socket.to(roomId).emit("update-code", content);
    });

    // Handling user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
