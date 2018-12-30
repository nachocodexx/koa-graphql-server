import { User } from "../interfaces/user.interface";
import { Inject, Container } from "typescript-ioc";
import { UserHelpers } from "../../helpers/user.helpers";
import autobind from 'autobind-decorator'

class UserResolvers {
    @Inject private _: UserHelpers

    private signup(obj: any, { user }: any, ctx: any) {
        return { firstName: 'Nacho', lastName: 'Castillo' }
    }

    get resolvers() {
        return {
            Mutation: {
                signup: this.signup
            }
        }
    }


}


export default new UserResolvers().resolvers