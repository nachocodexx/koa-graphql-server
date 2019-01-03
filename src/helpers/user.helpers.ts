import User from '../models/user/user.model'
import { genSaltSync, hashSync } from 'bcrypt';
import { SALT_FACTOR } from '../config';
import { IUserModel, IUserDocument } from '../models/user/user.interface';
import { ID, Credentials, AuthResponse } from '../types';
import { Inject } from 'typescript-ioc';
import { SecurityService } from '../security';
import { UserInputError, ForbiddenError, ApolloError } from 'apollo-server-koa'

export function hashPassword(password: string): string {
    const salt: string = genSaltSync(SALT_FACTOR)
    return hashSync(password, salt)
}


export class UserHelpers {

    @Inject private securityService: SecurityService

    // Return an array with all the users
    findAll(): Promise<IUserDocument[]> {
        return User.find({}).lean().exec()
    }

    // Return only one user 
    find(_id?: ID, email?: string): Promise<IUserDocument> {
        return User.findById({ _id }).lean().exec()
    }



    async authenticate({ email, password }: Credentials): Promise<AuthResponse | ApolloError> {
        try {
            let user: IUserDocument = await User.findOneAndUpdate({ email }, { $set: { isLoggedIn: true } }, { new: true }).then((res: IUserDocument) => res);

            if (!user) return new ForbiddenError(`${email} doesn't exist.`)
            else if (!user.comparePassword(password)) return new UserInputError("Password is incorrect")
            else if (user.isBlocked) return new ForbiddenError(`For some reasons your account is temporarily blocked`)
            else if (user.isActive) {
                //SET PASSWORD UNDEFINED
                user.set('password', undefined, { strict: false });
                return { user, token: this.securityService.generateToken(user._id, user.role) };
            }
            else return new ForbiddenError(`For some reasons You deactived your account, Do you want to active again?`)

        } catch (error) {
            throw error
        }



    }
    // Create a user. 
    create(data: IUserModel): Promise<IUserDocument> {
        return new User(data).save()
    }
    //Delete a specifics users by their _id field. 
    async delete(_id: ID): Promise<ID> {
        try {
            const doc = await User.findByIdAndRemove(_id)
            if (!doc) throw ({ status: 404, message: `User doesn't exist` })
            return _id
        } catch (error) {
            throw { message: 'Server error :(', status: 500 }
        }
    }

    async update(_id: ID, data: Partial<IUserModel>) {
        try {
            const doc = await User.findOneAndUpdate({ _id }, data, { new: true })
            if (!doc) throw ({ status: 404, message: `User doesn't exist` })
            return doc
        } catch (error) {
            throw { message: 'Something went wrong :(', status: 401 }

        }
    }
}


