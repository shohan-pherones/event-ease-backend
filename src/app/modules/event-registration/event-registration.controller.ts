import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { EventRegistrationServices } from "./event-registration.service";

const createRegistrationForEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user;
    const { eventId } = req.params;
    const registeredEvent =
      await EventRegistrationServices.createRegistrationForEvent(
        eventId,
        userId
      );

    res.status(StatusCodes.CREATED).json({
      message: "Event registration successfull",
      registeredEvent,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const revokeRegistrationForEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user;
    const { eventId } = req.params;

    await EventRegistrationServices.revokeRegistrationForEvent(eventId, userId);

    res.status(StatusCodes.CREATED).json({
      message: "Event registration revoked successfully",
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const EventRegistrationControllers = {
  createRegistrationForEvent,
  revokeRegistrationForEvent,
};
