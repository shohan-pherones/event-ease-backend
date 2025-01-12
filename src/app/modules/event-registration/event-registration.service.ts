import { StatusCodes } from "http-status-codes";
import mongoose, { ObjectId } from "mongoose";
import AppError from "../../errors/app.error";
import eventModel from "../event/event.model";
import userModel from "../user/user.model";
import { IEventRegistration } from "./event-registration.interface";
import eventRegistrationModel from "./event-registration.model";

const createRegistrationForEvent = async (
  eventId: string,
  userId: ObjectId
): Promise<IEventRegistration> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const event = await eventModel.findById(eventId).session(session);
    if (!event) {
      throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
    }

    // check if the event date has already passed
    if (new Date(event.date) < new Date()) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Event date has already passed"
      );
    }

    // check if the user is already registered
    if (event.registeredAttendees.includes(userId)) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "You are already registered for this event"
      );
    }

    // check if the maximum number of attendees is reached
    if (event.registeredAttendees.length >= event.maxAttendees) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Event is fully booked");
    }

    // add the user to the event's registeredAttendees
    event.registeredAttendees.push(userId);
    await event.save({ session });

    // update the user's registeredEvents
    const user = await userModel.findById(userId).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    user.registeredEvents.push(event._id);
    await user.save({ session });

    const registeredEvent = await eventRegistrationModel.create(
      [
        {
          event: event._id,
          attendee: userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return (
      await registeredEvent[0].populate(["event", "attendee"])
    ).toObject();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const EventRegistrationServices = {
  createRegistrationForEvent,
};
