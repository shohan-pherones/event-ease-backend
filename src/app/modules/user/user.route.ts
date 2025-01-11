import express, { Router } from "express";
import { validate } from "../../middlewares/validation.middleware";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router: Router = express.Router();

router.post(
  "/auth/register",
  validate(UserValidations.registerSchema),
  UserControllers.register
);

router.post(
  "/auth/login",
  validate(UserValidations.loginSchema),
  UserControllers.login
);

router.get(
  "/auth/token/refresh",
  validate(UserValidations.refreshTokenSchema),
  UserControllers.refreshToken
);

export default router;
