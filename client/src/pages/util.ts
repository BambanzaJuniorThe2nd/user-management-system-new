import { getAccessToken, User } from '../core';
import store from "../store";
import { backendClient } from "../api";
import moment from "moment";

export const refreshData = async () => {
    if (!store.admin.value) {
      const user = await backendClient().getCurrentUser();
      store.setAdmin(user);
    }

    const users = await backendClient().getUsers();
    store.setUsers(users);
}

export const getSelectedUser = (id: string) => {
    store.setCurrentlySelectedUser(id);
    return store.currentlySelectedUser;
}

export const userDataFormatted = (user: User) => {
  if (user) {
    return formatDateFieldsInUserObject(user);
  }
}

export const usersDataFormatted = (users: User[]) => {
  return users.map((user) => formatDateFieldsInUserObject(user));
}

export const formatDateFieldsInUserObject = (user: User) => {
  return {
    ...user,
    role: user.isAdmin ? "Admin" : "Regular",
    birthdate: moment(user.birthdate).format("YYYY-MM-DD"),
    createdAt: moment(user.createdAt).format("YYYY-MM-DD HH:mm A"),
    updatedAt: moment(user.updatedAt).format("YYYY-MM-DD HH:mm A"),
  };
};