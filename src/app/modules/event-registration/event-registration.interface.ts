import { ObjectId } from "mongoose";

export interface IEventRegistration {
  event: ObjectId;
  attendee: ObjectId;
}
