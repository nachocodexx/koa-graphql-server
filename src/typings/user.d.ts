import { Document } from "mongoose";
import { InstanceType } from "typegoose";
import { User } from "../models/user.model";

export interface IUserModel {
  avatar?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  isActive?: boolean;
  isBlocked?: boolean;
  isLoggedIn?: boolean;
}

export type IUserDocument = InstanceType<User>;
