import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import AppError from "../../errors/app.error";
import { IEvent } from "./event.interface";
import eventModel from "./event.model";
import userModel from "../user/user.model";
import app from "../../../app";

const createEvent = async (eventData: IEvent): Promise<IEvent> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const { name, date, location, maxAttendees, createdBy } = eventData;

    // check if the event date is in the past
    if (new Date(date) < new Date()) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Event date cannot be in the past"
      );
    }

    const event = await eventModel.create(
      [
        {
          name,
          date,
          location,
          maxAttendees,
          createdBy,
        },
      ],
      { session }
    );

    const userUpdate = await userModel.findByIdAndUpdate(
      createdBy,
      { $push: { events: event[0]._id } },
      { new: true, session }
    );

    if (!userUpdate) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to update user with event ID"
      );
    }

    await session.commitTransaction();
    return (await event[0].populate("createdBy")).toObject();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateEvent = async (
  eventId: string,
  updateData: Partial<IEvent>
): Promise<IEvent> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const io = app.get("io");

    const { name, date, location, maxAttendees } = updateData;

    // check if the event date is in the past
    if (new Date(date!) < new Date()) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Event date cannot be in the past"
      );
    }

    const updatedEvent = await eventModel
      .findByIdAndUpdate(
        eventId,
        {
          $set: { name, date, location, maxAttendees },
        },
        { new: true, session }
      )
      .populate("createdBy");

    if (!updatedEvent) {
      throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
    }

    await session.commitTransaction();

    // emit a notification for the event update
    io.emit("event:update", {
      eventId: updatedEvent._id,
      attendees: updatedEvent.registeredAttendees,
      message: `The event ${updatedEvent.name} has been updated.`,
    });

    return updatedEvent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteEvent = async (eventId: string): Promise<void> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const event = await eventModel.findByIdAndDelete(eventId, { session });

    if (!event) {
      throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
    }

    const userUpdate = await userModel.findByIdAndUpdate(
      event.createdBy,
      { $pull: { events: eventId } },
      { new: true, session }
    );

    if (!userUpdate) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to update user events"
      );
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getEventById = async (eventId: string): Promise<IEvent> => {
  const event = await eventModel
    .findById(eventId)
    .populate(["createdBy", "registeredAttendees"]);

  if (!event) {
    throw new AppError(StatusCodes.NOT_FOUND, "Event not found");
  }

  return event;
};

const getEventsByUserId = async (userId: string): Promise<IEvent[]> => {
  const events = await eventModel
    .find({ createdBy: userId })
    .populate("createdBy");
  return events;
};

const getEvents = async (): Promise<IEvent[]> => {
  const events = await eventModel.find().populate("createdBy");
  return events;
};

export const EventServices = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEventsByUserId,
  getEvents,
};
