import { Schema } from 'mongoose'
import { IUserDocument } from '../models/user/user.interface';

export interface TokenDecodedPayload {
    sub: string,
    role?: string
}
export interface TokenPayload {
    iat: number,
    exp: number,
    sub: ID,
    role: string
}

export interface IError {
    status: number,
    message: string
}

export type ID = Schema.Types.ObjectId | string

export interface Payload {
    sub: ID,
    role: string,
    iat: number,
    exp: number
}


export type AuthResponse = {
    user: IUserDocument,
    token: string
}

export type Credentials = {
    email: string,
    password: string
}


