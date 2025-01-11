import { ObjectId } from "mongoose";

export interface IEvent {
  _id: ObjectId;
  name: string;
  date: Date;
  location: string;
  maxAttendees: number;
  registeredAttendees: ObjectId[];
  createdBy: ObjectId;
}
