import { IUser } from "../user/user.interface";

export interface IEvent {
  name: string;
  date: Date;
  location: string;
  maxAttendees: number;
  createdBy: IUser;
}
