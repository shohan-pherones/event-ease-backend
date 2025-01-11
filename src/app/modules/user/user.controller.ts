import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accessToken, refreshToken, user } = await UserServices.register(
      req.body
    );

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const UserControllers = {
  register,
};
