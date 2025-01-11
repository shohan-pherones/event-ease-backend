import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EventServices } from "./event.service";

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await EventServices.createEvent(req.body);

    res.status(StatusCodes.CREATED).json({
      message: "Event created successfully",
      event,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const EventControllers = {
  createEvent,
};
