import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { USER_ROLE } from "../user/user.constant";
import { EventControllers } from "./event.controller";
import { EventValidations } from "./event.validation";

const router: Router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validate(EventValidations.createEventSchema),
  EventControllers.createEvent
);

router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.getEventsByUserId
);

router.get("/:eventId", EventControllers.getEventById);

router.put(
  "/:eventId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validate(EventValidations.updateEventSchema),
  EventControllers.updateEvent
);

router.delete(
  "/:eventId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  EventControllers.deleteEvent
);

export default router;
