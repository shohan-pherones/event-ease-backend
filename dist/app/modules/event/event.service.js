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
exports.EventServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const app_error_1 = __importDefault(require("../../errors/app.error"));
const event_model_1 = __importDefault(require("./event.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const app_1 = __importDefault(require("../../../app"));
const createEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const { name, date, location, maxAttendees, createdBy } = eventData;
        // check if the event date is in the past
        if (new Date(date) < new Date()) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Event date cannot be in the past");
        }
        const event = yield event_model_1.default.create([
            {
                name,
                date,
                location,
                maxAttendees,
                createdBy,
            },
        ], { session });
        const userUpdate = yield user_model_1.default.findByIdAndUpdate(createdBy, { $push: { events: event[0]._id } }, { new: true, session });
        if (!userUpdate) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update user with event ID");
        }
        yield session.commitTransaction();
        return (yield event[0].populate("createdBy")).toObject();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const updateEvent = (eventId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const io = app_1.default.get("io");
        const { name, date, location, maxAttendees } = updateData;
        // check if the event date is in the past
        if (new Date(date) < new Date()) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Event date cannot be in the past");
        }
        const updatedEvent = yield event_model_1.default
            .findByIdAndUpdate(eventId, {
            $set: { name, date, location, maxAttendees },
        }, { new: true, session })
            .populate("createdBy");
        if (!updatedEvent) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Event not found");
        }
        yield session.commitTransaction();
        // emit a notification for the event update
        io.emit("event:update", {
            eventId: updatedEvent._id,
            attendees: updatedEvent.registeredAttendees,
            message: `The event ${updatedEvent.name} has been updated.`,
        });
        return updatedEvent;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const deleteEvent = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const event = yield event_model_1.default.findByIdAndDelete(eventId, { session });
        if (!event) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Event not found");
        }
        const userUpdate = yield user_model_1.default.findByIdAndUpdate(event.createdBy, { $pull: { events: eventId } }, { new: true, session });
        if (!userUpdate) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update user events");
        }
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
const getEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.default
        .findById(eventId)
        .populate(["createdBy", "registeredAttendees"]);
    if (!event) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Event not found");
    }
    return event;
});
const getEventsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default
        .find({ createdBy: userId })
        .populate("createdBy");
    return events;
});
const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.default.find().populate("createdBy");
    return events;
});
exports.EventServices = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByUserId,
    getEvents,
};
