import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/app.error";
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

  return user;
};

export const UserServices = {
  register,
};
