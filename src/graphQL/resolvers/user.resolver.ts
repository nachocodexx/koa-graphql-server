import { Inject } from "typescript-ioc";
import { UserHelpers } from "../../helpers/user.helpers";
import autobind from 'autobind-decorator'
import { IUserDocument } from "../../models/user/user.interface";


@autobind
class UserResolvers {
    @Inject private _: UserHelpers

    private async signup(obj: any, { user }: any, ctx: any) {
        const data: IUserDocument = await this._.create(user)
        return data
    }

    get resolvers() {
        return {
            Mutation: {
                signup: this.signup
            },
            Query: {
                allUsers: this.allUsers
            }
        }
    }
    private async allUsers(obj: any, args: any, ctx: any): Promise<IUserDocument[]> {
        return await this._.findAll()
    }


}


export default new UserResolvers().resolvers