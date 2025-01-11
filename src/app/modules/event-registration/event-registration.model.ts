import mongoose, { Schema } from "mongoose";
import { IEventRegistration } from "./event-registration.interface";

const EventRegistrationSchema: Schema = new Schema<IEventRegistration>(
  {
    event: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    attendee: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEventRegistration>(
  "EventRegistration",
  EventRegistrationSchema
);
