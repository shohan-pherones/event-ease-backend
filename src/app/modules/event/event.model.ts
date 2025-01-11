import mongoose, { Schema } from "mongoose";
import { IEvent } from "./event.interface";

const EventSchema: Schema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>("Event", EventSchema);
