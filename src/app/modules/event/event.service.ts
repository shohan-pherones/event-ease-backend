import { startSession } from "mongoose";
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

export const EventServices = {
  createEvent,
};
