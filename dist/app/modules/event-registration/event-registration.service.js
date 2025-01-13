"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistrationServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("../../errors/app.error"));
const event_model_1 = __importDefault(require("../event/event.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const event_registration_model_1 = __importDefault(require("./event-registration.model"));
const createRegistrationForEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const event = yield event_model_1.default.findById(eventId).session(session);
        if (!event) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Event not found");
        }
        // check if the event date has already passed
        if (new Date(event.date) < new Date()) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Event date has already passed");
        }
        // check if the user is already registered
        if (event.registeredAttendees.includes(userId)) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "You are already registered for this event");
        }
        // check if the maximum number of attendees is reached
        if (event.registeredAttendees.length >= event.maxAttendees) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Event is fully booked");
        }
        // add the user to the event's registeredAttendees
        event.registeredAttendees.push(userId);
        yield event.save({ session });
        // update the user's registeredEvents
        const user = yield user_model_1.default.findById(userId).session(session);
        if (!user) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        user.registeredEvents.push(event._id);
        yield user.save({ session });
        const registeredEvent = yield event_registration_model_1.default.create([
            {
                event: event._id,
                attendee: userId,
            },
        ], { session });
        yield session.commitTransaction();
        return (yield registeredEvent[0].populate(["event", "attendee"])).toObject();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const revokeRegistrationForEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const event = yield event_model_1.default.findById(eventId).session(session);
        if (!event) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Event not found");
        }
        // check if the event date has already passed
        if (new Date(event.date) < new Date()) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Event date has already passed");
        }
        // check if the user is registered
        if (!event.registeredAttendees.includes(userId)) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "You are not registered for this event");
        }
        // remove the user from the event's registeredAttendees
        event.registeredAttendees = event.registeredAttendees.filter((attendee) => attendee.toString() !== userId.toString());
        yield event.save({ session });
        // update the user's registeredEvents
        const user = yield user_model_1.default.findById(userId).session(session);
        if (!user) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        user.registeredEvents = user.registeredEvents.filter((ev) => ev.toString() !== event._id.toString());
        yield user.save({ session });
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.EventRegistrationServices = {
    createRegistrationForEvent,
    revokeRegistrationForEvent,
};
