import { ObjectId } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  events: ObjectId[];
  registeredEvents: ObjectId[];
}

export type TUserRole = keyof typeof USER_ROLE;
