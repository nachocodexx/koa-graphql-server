import { IUserDocument } from "./user.interface";
import { hashPassword } from "../../helpers/user.helpers";
const tooavatar = require('cartoon-avatar')

export function preSave(next: Function) {
    const user = this as IUserDocument
    if (user.isNew) {
        user.avatar = tooavatar.generate_avatar({ gender: user.gender === 'M' ? 'male' : 'female' })
        user.password = hashPassword(user.password)
        next()
    }

    if (!user.isModified('password')) return next()
    else if (user.isModified('password')) {
        user.password = hashPassword(user.password)
        next()
    }

}