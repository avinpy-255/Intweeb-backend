import { Schema, model, Document } from "mongoose";


interface IRoom extends Document {
  roomId: string;
  roomName?: string;
  code?: string;
}


const roomSchema = new Schema<IRoom>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    roomName: {
      type: String,
      required: false,
      default: "Untitled Room",
    },
    code: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);


export default model<IRoom>("Room", roomSchema);
