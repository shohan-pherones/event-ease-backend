import express, { Router } from "express";
import { UserControllers } from "./user.controller";

const router: Router = express.Router();

router.post("/auth/register", UserControllers.register);

export default router;
