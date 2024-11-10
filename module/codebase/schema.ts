import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true 
    },
    roomName: {
      type: String,
      required: false 
    },
    code: {
      type: String,
      required: false 
    }
  },
  {
    timestamps: true 
  }
);

export default model("Room", roomSchema);
