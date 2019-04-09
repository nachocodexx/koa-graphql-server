import { decode, encode } from "jwt-simple";
import * as moment from "moment";
import { ID, TokenDecodedPayload, TokenPayload, Payload } from "../typings";
import { SECRET_TOKEN } from "../config";
import { ApolloError } from "apollo-server-koa";
import { ForbiddenError } from "apollo-server-koa";

export function decodeToken(
  token: string
): Promise<TokenDecodedPayload | ApolloError> {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    try {
      if (!token)
        reject(
          new ForbiddenError(
            "Unauthorized: Access is denied due to invalid token."
          )
        );
      const { exp, sub, role }: TokenPayload = decode(token, SECRET_TOKEN);

      if (exp <= moment().unix())
        return reject(new ForbiddenError("Token has expired"));
      resolve({ sub, role });
    } catch (error) {
      reject(
        new ForbiddenError(
          `Unauthorized: Access is denied due to invalid token.`
        )
      );
    }
  });

  return promise;
}

export function generateToken(sub: ID): string {
  const payload: Payload = {
    sub,
    iat: moment().unix(),
    exp: moment()
      .add(1, "days")
      .unix()
  };

  return encode(payload, SECRET_TOKEN);
}

export function isAuth(token: string): boolean {
  try {
    const payload: any = decode(token, SECRET_TOKEN);
    if (payload.exp <= moment().unix()) return false;
    return true;
  } catch (error) {
    return false;
  }
}
