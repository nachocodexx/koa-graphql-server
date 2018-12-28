import { Schema, model, SchemaOptions } from 'mongoose'
import { IUserDocument } from './user.interface'
// import { hashPassword } from '../../helpers/user.helpers';
import { compareSync } from 'bcrypt';
import { preSave } from './user.callbacks';
// const tooavatar = require('cartoon-avatar')

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
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], default: 'M' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLoggedIn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
}, options)


class User {
    firstname: string
    lastname: string
    password: string

    get fullname(): string {
        return `${this.firstname} ${this.lastname}`
    }
    comparePassword(password: string): boolean {
        return compareSync(password, this.password)
    }
}

UserSchema.loadClass(User)
UserSchema.pre('save', preSave)


export default model<IUserDocument>('User', UserSchema)