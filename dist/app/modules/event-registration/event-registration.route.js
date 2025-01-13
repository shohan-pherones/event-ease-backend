"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_constant_1 = require("../user/user.constant");
const event_registration_controller_1 = require("./event-registration.controller");
const router = express_1.default.Router();
router.post("/create/:eventId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), event_registration_controller_1.EventRegistrationControllers.createRegistrationForEvent);
router.put("/revoke/:eventId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), event_registration_controller_1.EventRegistrationControllers.revokeRegistrationForEvent);
exports.default = router;
