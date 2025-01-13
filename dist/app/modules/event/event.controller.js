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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const event_service_1 = require("./event.service");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: createdBy } = req.user;
        const event = yield event_service_1.EventServices.createEvent(Object.assign(Object.assign({}, req.body), { createdBy }));
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Event created successfully",
            event,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
});
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const event = yield event_service_1.EventServices.updateEvent(eventId, req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Event updated successfully",
            event,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
    }
});
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        yield event_service_1.EventServices.deleteEvent(eventId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Event deleted successfully",
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
    }
});
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const event = yield event_service_1.EventServices.getEventById(eventId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Event retrieved successfully",
            event,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
    }
});
const getEventsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const events = yield event_service_1.EventServices.getEventsByUserId(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Events retrieved successfully",
            events,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
    }
});
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_service_1.EventServices.getEvents();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Events retrieved successfully",
            events,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
    }
});
exports.EventControllers = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByUserId,
    getEvents,
};
