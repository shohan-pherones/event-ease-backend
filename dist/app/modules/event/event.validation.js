"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidations = void 0;
const zod_1 = require("zod");
const createEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Event name is required." }),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid date string.",
    })
        .transform((val) => new Date(val)),
    location: zod_1.z.string().min(1, { message: "Location is required." }),
    maxAttendees: zod_1.z
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
});
const updateEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Event name is required." }),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Date must be a valid date string.",
    })
        .transform((val) => new Date(val)),
    location: zod_1.z.string().min(1, { message: "Location is required." }),
    maxAttendees: zod_1.z
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
});
exports.EventValidations = {
    createEventSchema,
    updateEventSchema,
};
