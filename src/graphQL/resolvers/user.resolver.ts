import { IUserDocument } from "../../models/user/user.interface";
import { ID, AuthResponse } from "../../types";
import { Resolver, Mutation, Query } from "../decorators";
import { create, update, find, findAll, authenticate, remove } from "../../helpers/user.helpers";


@Resolver
class UserResolvers {

    // This method create a new user.
    @Mutation
    private async signup(obj: any, { user }: any, ctx: any): Promise<IUserDocument> {
        return create(user)
    }

    // This method update users by their _id field. 
    @Mutation
    private updateUser(obj: any, { _id, user }: any, ctx: any, info: any): Promise<IUserDocument> {
        return update(_id, user)
    }
    // This method delete users by their _id field.  
    @Mutation
    private removeUser(obj: any, { _id }: any, ctx: any, info: any): Promise<ID> {
        return remove(_id)
    }
    @Mutation
    private signin(obj: any, { email, password }: any, ctx: any, info: any): Promise<AuthResponse> {
        return authenticate({ email, password })
    }

    // This method return all users in the database 
    @Query
    private allUsers(obj: any, args: any, ctx: any): Promise<IUserDocument[]> {
        return findAll()
    }

    // this method return a user by his/her _id. 
    @Query
    private user(obj: any, { _id }: any, ctx: any) {
        console.log(ctx);
        return find(_id)
    }

}


export default (<any>new UserResolvers()).resolvers