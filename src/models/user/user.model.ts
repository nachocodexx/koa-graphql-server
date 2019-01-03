import { Schema, model, SchemaOptions } from 'mongoose'
import { IUserDocument } from './user.interface'
import { compareSync } from 'bcrypt';
import { preSave } from './user.callbacks';

const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
    id: false,
    discriminatorKey: "role"
}

const UserSchema: Schema = new Schema({
    avatar: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLoggedIn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
}, options)


class User {
    firstName: string
    lastName: string
    password: string

    get fullname(): string {
        return `${this.firstName} ${this.lastName}`
    }
    comparePassword(password: string): boolean {

        return compareSync(password, this.password)
    }
}

UserSchema.loadClass(User)
UserSchema.pre('save', preSave)


export default model<IUserDocument>('User', UserSchema)