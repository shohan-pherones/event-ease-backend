import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EventServices } from "./event.service";

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId: createdBy } = req.user;
    const event = await EventServices.createEvent({ ...req.body, createdBy });

    res.status(StatusCodes.CREATED).json({
      message: "Event created successfully",
      event,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;

    const event = await EventServices.updateEvent(eventId, req.body);

    res.status(StatusCodes.OK).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const EventControllers = {
  createEvent,
  updateEvent,
};
