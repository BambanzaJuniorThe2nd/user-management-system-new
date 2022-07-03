import {
    UserLoginArgs,
    LoginResult,
    UserCreateArgs,
    UserPutArgs,
    ChangePasswordArgs,
    User,
} from "../types";

export interface IHttpClient {
    baseUrl: string;

    get<T>(path: string, headers?: any): Promise<T>;

    post<TBody, TResult>(
        path: string,
        body: TBody,
        headers?: any
    ): Promise<TResult>;

    put<TBody, TResult>(
        path: string,
        body: TBody,
        headers?: any
    ): Promise<TResult>;

    patch<TBody, TResult>(
        path: string,
        body: TBody,
        headers?: any
    ): Promise<TResult>;

    delete<T>(path: string, headers?: any): Promise<T>;

    request<T>(
        path: string,
        method?: string,
        body?: any,
        headers?: any
    ): Promise<T>;
}

export interface IClient {
    login(args: UserLoginArgs): Promise<LoginResult>;
    logout(): Promise<void>;
    createUser(args: UserCreateArgs): Promise<User>;
    getUsers(): Promise<User[]>;
    updateUser(
        userId: string,
        args: UserPutArgs
    ): Promise<User>;
    changePassword(userId: string, args: ChangePasswordArgs): Promise<User>;
    resetUserPassword(userId: string): Promise<User>;
    deleteUser(userId: string): Promise<User>;
}
  