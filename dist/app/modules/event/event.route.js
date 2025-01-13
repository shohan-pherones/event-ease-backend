"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_constant_1 = require("../user/user.constant");
const event_controller_1 = require("./event.controller");
const event_validation_1 = require("./event.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validation_middleware_1.validate)(event_validation_1.EventValidations.createEventSchema), event_controller_1.EventControllers.createEvent);
router.get("/", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), event_controller_1.EventControllers.getEventsByUserId);
router.get("/public", event_controller_1.EventControllers.getEvents);
router.get("/:eventId", event_controller_1.EventControllers.getEventById);
router.put("/:eventId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validation_middleware_1.validate)(event_validation_1.EventValidations.updateEventSchema), event_controller_1.EventControllers.updateEvent);
router.delete("/:eventId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), event_controller_1.EventControllers.deleteEvent);
exports.default = router;
