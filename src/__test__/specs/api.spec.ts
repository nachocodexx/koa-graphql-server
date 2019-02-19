import { findAll } from '../../helpers/user.helpers';
import { IUserDocument } from '../../typings/user';
import { expect } from 'chai';
import { connect, disconnect } from '../../models'




describe("Helpers Testing", () => {

    before(async () => {
        try {

            return await connect()
        } catch (error) {
            console.log(error);
            console.log("Something went wrong :c");

        }
    })
    after(async () => await disconnect());


    it.skip("should get an array of users", async () => {
        const users: IUserDocument[] = await findAll()
        expect(users).to.be.an('array')
    });



});