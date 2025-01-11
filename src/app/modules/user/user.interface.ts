import { IEvent } from "../event/event.interface";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  events: IEvent[];
}

export type TUserRole = keyof typeof USER_ROLE;
