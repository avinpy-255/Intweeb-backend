import * as crypto from "crypto";
import type {  Request, Response, RequestHandler } from "express";
import Room from "./schema";

// Creating a room
export const createRoom: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomName = req.body.name;
    if (!roomName) {
      res.status(400).json({ error: "Room name is required" });
      return;
    }

    const roomId = crypto.randomBytes(3).toString("hex");
    const newRoom = new Room({ roomId, roomName });

    await newRoom.save();
    res.status(201).json({ message: "Room Created", roomId, roomName });
  } catch (error) {
    console.error("Error creating room:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Getting all rooms
export const getRoomList: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find().lean().exec();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error retrieving room list:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Getting a room by ID
export const getRoomById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).lean().exec();
    if (!room) {
      res.status(404).json({ error: "Room not found" });
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error retrieving room by ID:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Internal server error" });
  }
};
