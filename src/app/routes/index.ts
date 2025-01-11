import express, { Router } from "express";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
