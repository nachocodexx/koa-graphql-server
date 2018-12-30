import { decode, encode } from 'jwt-simple'
import * as moment from 'moment'
import { ID, TokenDecodedPayload, TokenPayload, Payload } from '../types/'
import { SECRET_TOKEN } from '../config';


export class SecurityService {
    constructor() { }



    public decodeToken(token: string): Promise<TokenDecodedPayload> {

        const promise: Promise<any> = new Promise((resolve) => {
            try {
                const { exp, sub, role }: TokenPayload = decode(token, SECRET_TOKEN)

                if (exp <= moment().unix())
                    throw { status: 500, message: 'Token has expired' }
                resolve({ sub, role })

            } catch (error) {
                throw { status: 500, message: 'Server error', error }
            }
        })

        return promise

    }


    public generateToken(sub: ID, role: string): string {
        const payload: Payload = {
            sub,
            role,
            iat: moment().unix(),
            exp: moment().add(1, 'days').unix()
        }

        return encode(payload, SECRET_TOKEN)
    }


    public isAuth(token: string): boolean {
        try {
            const payload: any = decode(token, SECRET_TOKEN)
            if (payload.exp <= moment().unix())
                return false
            return true
        } catch (error) {
            return false
        }
    }

}
