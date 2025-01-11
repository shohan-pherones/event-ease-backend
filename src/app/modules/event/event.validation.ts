import { z } from "zod";
import mongoose from "mongoose";

export const createEventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required." }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid date string.",
    })
    .transform((val) => new Date(val)),
  location: z.string().min(1, { message: "Location is required." }),
  maxAttendees: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: "Max attendees must be a valid number.",
    })
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val), {
      message: "Max attendees must be an integer.",
    })
    .refine((val) => val > 0, {
      message: "Max attendees must be a positive number.",
    }),
  createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Created by must be a valid user ID.",
  }),
});

export const EventValidations = {
  createEventSchema,
};
