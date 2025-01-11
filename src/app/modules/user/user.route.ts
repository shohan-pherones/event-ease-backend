import express, { Router } from "express";
import { UserControllers } from "./user.controller";
import { validate } from "../../middlewares/validation.middleware";
import { UserValidations } from "./user.validation";

const router: Router = express.Router();

router.post(
  "/auth/register",
  validate(UserValidations.registerSchema),
  UserControllers.register
);

export default router;
