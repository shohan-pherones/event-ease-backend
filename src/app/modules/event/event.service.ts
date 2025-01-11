import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import AppError from "../../errors/app.error";
import { IEvent } from "./event.interface";
import eventModel from "./event.model";

const createEvent = async (eventData: IEvent): Promise<IEvent> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const { name, date, location, maxAttendees, createdBy } = eventData;

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

    const { name, date, location, maxAttendees } = updateData;

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
    return updatedEvent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const EventServices = {
  createEvent,
  updateEvent,
};
