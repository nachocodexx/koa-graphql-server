import User from '../models/user/user.model'
import { genSaltSync, hashSync } from 'bcrypt';
import { SALT_FACTOR } from '../config';
import { IUserModel, IUserDocument } from '../models/user/user.interface';
import { ID, Credentials, AuthResponse } from '../types';
import { Inject } from 'typescript-ioc';
import { SecurityService } from '../security';

export function hashPassword(password: string): string {
    const salt: string = genSaltSync(SALT_FACTOR)
    return hashSync(password, salt)
}


export class UserHelpers {

    @Inject() private securityService: SecurityService

    constructor() { }

    async authenticate({ email, password }: Credentials): Promise<AuthResponse> {
        try {
            let user: IUserDocument = await User.findOneAndUpdate({ email }, { $set: { isLoggedIn: true } }, { new: true }).then((res: IUserDocument) => res);

            if (!user) throw { message: `${email} doesn't exist.`, status: 401 };
            else if (!user.comparePassword(password)) throw { message: `The password is incorrect.`, status: 401 };
            else if (user.isBlocked) throw { message: 'For some reasons your account is temporarily blocked', status: 401 }
            else if (user.isActive) {
                //SET PASSWORD UNDEFINED
                user.set('password', undefined, { strict: false });
                return { user, token: this.securityService.generateToken(user._id, user.role) };
            }
            else {
                throw { message: 'For some reasons You deactived your account, Do you want to active again?', status: 441801 }
            }

        } catch (error) {
            throw error
        }



    }
    // Create a user. 
    create(data: IUserModel): Promise<IUserDocument> {
        const user: IUserDocument = new User(data)
        return user.save()
    }
    //Delete a specific user by their id. 
    async delete(_id: ID) {
        try {
            const doc = await User.findByIdAndRemove(_id)
            if (!doc) throw ({ status: 401, message: `User doesn't exist` })

        } catch (error) {
            throw { message: 'Server error :(', status: 500 }
        }
    }
}


