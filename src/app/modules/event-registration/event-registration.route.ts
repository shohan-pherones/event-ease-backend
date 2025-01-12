import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { USER_ROLE } from "../user/user.constant";
import { EventRegistrationControllers } from "./event-registration.controller";

const router: Router = express.Router();

router.post(
  "/create/:eventId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  EventRegistrationControllers.createRegistrationForEvent
);

router.put(
  "/revoke/:eventId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  EventRegistrationControllers.revokeRegistrationForEvent
);

export default router;
