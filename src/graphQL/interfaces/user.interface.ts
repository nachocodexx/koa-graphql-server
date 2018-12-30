export interface User {
    _id: string,
    avatar: string
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    password: string,
    isLoggedIn?: boolean,
    isActive?: boolean,
    isBlocked?: boolean
    fullname?: string
}