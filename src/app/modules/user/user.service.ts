import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import config from "../../config/env";
import AppError from "../../errors/app.error";
import { createToken } from "../../utils/jwt.util";
import { IUser } from "./user.interface";
import userModel from "./user.model";

const register = async (userData: IUser) => {
  const existingUser = await userModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "User with this email already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = new userModel({
    ...userData,
    password: hashedPassword,
  });

  await user.save();

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken, user };
};

export const UserServices = {
  register,
};
