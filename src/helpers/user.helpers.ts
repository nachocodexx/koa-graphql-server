import { UserModel } from "../models/user.model";
import { genSaltSync, hashSync } from "bcrypt";
import { SALT_FACTOR } from "../config";
import { IUserModel, IUserDocument } from "../typings/user";
import { ID, Credentials, AuthResponse } from "../typings/";
import { UserInputError, ForbiddenError, ApolloError } from "apollo-server-koa";
import { generateToken } from "../security";

export function hashPassword(password: string): string {
  const salt: string = genSaltSync(SALT_FACTOR);
  return hashSync(password, salt);
}

// Return an array with all the users
export function findAll(): Promise<IUserDocument[]> {
  return UserModel.find({})
    .lean()
    .exec();
}

// Return only one user
export function find(_id?: ID, email?: string): Promise<IUserDocument> {
  return UserModel.findById({ _id })
    .lean()
    .exec();
}

export async function authenticate({ email, password }: Credentials): Promise<AuthResponse> {
  try {
    let user = await UserModel.findOneAndUpdate({ email }, { $set: { isLoggedIn: true } }, { new: true }).exec();

    if (!user) throw new ForbiddenError(`${email} doesn't exist.`);
    else if (!user.comparePassword(password)) throw new UserInputError("Password is incorrect");
    else if (user.isBlocked) throw new ForbiddenError(`For some reasons your account is temporarily blocked`);
    else if (user.isActive) {
      //SET PASSWORD UNDEFINED
      user.set("password", undefined, { strict: false });
      return { user, token: generateToken(user._id) };
    } else throw new ForbiddenError(`For some reasons You deactived your account, Do you want to active again?`);
  } catch (error) {
    throw error;
  }
}
// Create a user.
export function create(data: IUserModel) {
  return new UserModel(data).save();
}
//Delete a specifics users by their _id field.
export async function remove(_id: ID) {
  try {
    const doc = await UserModel.findByIdAndRemove(_id);

    if (!doc) throw new ApolloError("User doesn't exist");
    return _id;
  } catch (error) {
    throw error;
  }
}

export async function update(_id: ID, data: Partial<IUserModel>) {
  try {
    const doc = await UserModel.findOneAndUpdate({ _id }, data, { new: true });
    if (!doc) throw new ApolloError("User doesn't exist");
    return doc;
  } catch (error) {
    throw error;
  }
}
