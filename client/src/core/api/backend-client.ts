import { IHttpClient, IBackendClient } from "./types";
import {
  LoginResult,
  UserLoginArgs,
  UserCreateArgs,
  UserPutArgs,
  ChangePasswordArgs,
  User,
} from "../../core/types";
import { deleteAccessToken } from "../auth";

export class BackendClient implements IBackendClient {
  private client: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.client = httpClient;
  }

  async login(args: UserLoginArgs): Promise<LoginResult> {
    return await this.client.post<UserLoginArgs, LoginResult>("/users/login", args);
  }

  async logout(): Promise<void> {
    deleteAccessToken();
    return;
  }

  async createUser(args: UserCreateArgs): Promise<User> {
    return await this.client.post<UserCreateArgs, User>("/users", args);
  }

  async updateUser(userId: string, args: UserPutArgs): Promise<User> {
    return await this.client.put<UserPutArgs, User>(`/users/${userId}`, args);
  }

  async changePassword(userId: string, args: ChangePasswordArgs): Promise<User> {
    return await this.client.put<ChangePasswordArgs, User>(`/users/password/change/${userId}`, args);
  }

  async resetUserPassword(userId: string): Promise<User> {
    return await this.client.put<null, User>(`/users/password/reset/${userId}`, null);
  }

  async getUsers(): Promise<User[]> {
    return await this.client.get<User[]>(`/users`);
  }

  async getCurrentUser(): Promise<User> {
    return await this.client.get<User>(`/users/me`);
  }

  async getUserById(userId: string): Promise<User> {
    return await this.client.get<User>(`/users/${userId}`);
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.client.delete<User>(`/users/${userId}`);
  }
}