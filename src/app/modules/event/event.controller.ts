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

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;
    await EventServices.deleteEvent(eventId);

    res.status(StatusCodes.OK).json({
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId } = req.params;
    const event = await EventServices.getEventById(eventId);

    res.status(StatusCodes.OK).json({
      message: "Event retrieved successfully",
      event,
    });
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const getEventsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user;
    const events = await EventServices.getEventsByUserId(userId);

    res.status(StatusCodes.OK).json({
      message: "Events retrieved successfully",
      events,
    });
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await EventServices.getEvents();

    res.status(StatusCodes.OK).json({
      message: "Events retrieved successfully",
      events,
    });
  } catch (error: any) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const EventControllers = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEventsByUserId,
  getEvents,
};
