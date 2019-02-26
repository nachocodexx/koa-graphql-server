import { Typegoose, prop, instanceMethod, pre } from "typegoose";
import { compareSync } from "bcrypt";
import { hashPassword } from "../helpers/user.helpers";
const tooavatar = require("cartoon-avatar");

@pre<User>("save", function(next) {
  if (this.isNew)
    this.avatar = tooavatar.generate_avatar({
      gender: this.gender === "M" ? "male" : "female"
    });

  if (!this.isModified("password")) return next();
  else {
    this.password = hashPassword(this.password);
  }

  return next();
})
export class User extends Typegoose {
  @prop()
  avatar!: string;
  @prop({ required: true })
  firstName: string;
  @prop({ required: true })
  lastName: string;
  @prop({ required: true, unique: true })
  email: string;
  @prop({ required: true })
  password: string;
  @prop({ default: false })
  isLoggedIn!: boolean;

  @prop({ default: false })
  isBlocked!: boolean;

  @prop({ default: true })
  isActive!: boolean;

  @prop({ enum: ["M", "F"] })
  gender: string;

  @instanceMethod
  comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}

export const UserModel = new User().getModelForClass(User);

// import { Schema, model, SchemaOptions } from 'mongoose';
// import { IUserDocument } from '../typings/user';
// import { compareSync } from 'bcrypt';
// import { preSave } from '../helpers/user.helpers';

// const options: SchemaOptions = {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//     timestamps: true,
//     versionKey: false,
//     id: false,
//     discriminatorKey: "role"
// }

// const UserSchema: Schema = new Schema({
//     avatar: { type: String },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     gender: { type: String, enum: ['M', 'F'], default: 'M' },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isLoggedIn: { type: Boolean, default: false },
//     isActive: { type: Boolean, default: true },
//     isBlocked: { type: Boolean, default: false },
// }, options)

// class User {
//     firstName: string
//     lastName: string
//     password: string

//     get fullname(): string {
//         return `${this.firstName} ${this.lastName}`
//     }
//     comparePassword(password: string): boolean {

//         return compareSync(password, this.password)
//     }
// }

// UserSchema.loadClass(User)
// UserSchema.pre('save', preSave)

// export default model<IUserDocument>('User', UserSchema)
