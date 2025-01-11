import express, { Router } from "express";
import EventRegistrationRoutes from "../modules/event-registration/event-registration.route";
import EventRoutes from "../modules/event/event.route";
import UserRoutes from "../modules/user/user.route";

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/event-registrations",
    route: EventRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
