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
exports.EventRegistrationControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const event_registration_service_1 = require("./event-registration.service");
const createRegistrationForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { eventId } = req.params;
        const registeredEvent = yield event_registration_service_1.EventRegistrationServices.createRegistrationForEvent(eventId, userId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Event registration successfull",
            registeredEvent,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
});
const revokeRegistrationForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { eventId } = req.params;
        yield event_registration_service_1.EventRegistrationServices.revokeRegistrationForEvent(eventId, userId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Event registration revoked successfully",
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
});
exports.EventRegistrationControllers = {
    createRegistrationForEvent,
    revokeRegistrationForEvent,
};
