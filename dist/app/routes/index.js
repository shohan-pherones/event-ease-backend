"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_registration_route_1 = __importDefault(require("../modules/event-registration/event-registration.route"));
const event_route_1 = __importDefault(require("../modules/event/event.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.default,
    },
    {
        path: "/events",
        route: event_route_1.default,
    },
    {
        path: "/event-registrations",
        route: event_registration_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
