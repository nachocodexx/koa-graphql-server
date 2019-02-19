import { IError } from "../types";
import User from '../models/user.model'

export async function checkEmailExists(email: string) {
    const count: number = await User.count({ email }).then((res: number) => res)

    return count >= 1 ? true : false
}


export function handleError(error: any): IError {
    const status = error.status || 500
    if (status === 500) return { status, message: 'Server error :(' }
    return { status, message: error.message }
}