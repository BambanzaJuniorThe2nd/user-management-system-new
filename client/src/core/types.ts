export interface User {
    _id: string;
    name: string;
    email: string;
    title: string;
    birthdate: Date;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AppMessage {
    type: string;
    message: string;
}

export interface GetUserResult {
    user: User;
}

export interface CreateUserResult extends GetUserResult {}

export interface GetCurrentUserResult extends GetUserResult {}

export interface UpdateUserResult extends GetUserResult {}

export interface LoginResult {
    user: User;
    token: string;
}

export interface UserCreateArgs {
    name: string;
    email: string;
    title: string;
    birthdate: string;
    isAdmin: boolean;
}

export interface UserLoginArgs {
    email: string;
    password: string;
}

export interface ChangePasswordArgs {
    old: string;
    new: string;
}

export type UserPutArgs = UserCreateArgs;