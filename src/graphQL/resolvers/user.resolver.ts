import { Inject } from "typescript-ioc";
import { UserHelpers } from "../../helpers/user.helpers";
import autobind from 'autobind-decorator'
import { IUserDocument } from "../../models/user/user.interface";


@autobind
class UserResolvers {
    @Inject private _: UserHelpers


    // This method create a new user.
    private async signup(obj: any, { user }: any, ctx: any) {
        const data: IUserDocument = await this._.create(user)
        return data
    }

    // This method update users by their _id field. 
    private updateUser(obj: any, { _id, user }: any, ctx: any, info: any) {
        return this._.update(_id, user)
    }
    // This method delete users by their _id field.  
    private deleteUser(obj: any, { _id }: any, ctx: any, info: any) {
        return this._.delete(_id)
    }

    // 
    get resolvers() {
        return {
            Mutation: {
                signup: this.signup,
                updateUser: this.updateUser,
                deleteUser: this.deleteUser
            },
            Query: {
                allUsers: this.allUsers,
                user: this.user
            }
        }
    }

    // This method return all users in the database 
    private allUsers(obj: any, args: any, ctx: any): Promise<IUserDocument[]> {
        return this._.findAll()
    }

    // this method return a user by his/her _id. 
    private user(obj: any, { _id }: any, ctx: any) {
        console.log(ctx);

        return this._.find(_id)
    }

}

// export only the resolvers 
export default new UserResolvers().resolvers