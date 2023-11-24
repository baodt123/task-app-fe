import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL =
  "https://task-app-magic-dcb626661833.herokuapp.com/api/v1/user";

interface UpdateData {
  fullName: string;
  email: string;
}

interface ChangeData {
  oldPassword: string;
  newPassword: string;
}

export const getUserInfo = async () => {
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${username}`),
  });
};



export const setUsername = async (username: string) => {
  if (!username) {
    return false;
  }
  try {
    await SecureStore.setItemAsync("username", username);
    return true;
  } catch (error) {
    console.log("error when save username", error);
  }
  return false;
};

export const getUsername = async () => {
  try {
    return await SecureStore.getItemAsync("username");
  } catch (error) {
    console.log("error when get username", error);
  }
  return false;
};

export const setExpoToken = async (token: string) => {
  if (!token) {
    return false;
  }
  try {
    await SecureStore.setItemAsync("expotoken", token);
    return true;
  } catch (error) {
    console.log("error when save expo token", error);
  }
  return false;
};

export const getExpoToken = async () => {
  try {
    return await SecureStore.getItemAsync("expotoken");
  } catch (error) {
    console.log("error when get expo token", error);
  }
  return false;
};

export const updateUserInfo = async ({ fullName, email }: UpdateData) => {
  const username = await getUsername();
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/update/${username}`),
    data: {
      fullName,
      email,
    },
  });
};

export const changePasswordUser = async ({
  oldPassword,
  newPassword,
}: ChangeData) => {
  const username = await getUsername();
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/change-password/${username}`),
    data: {
      oldPassword,
      newPassword,
    },
  });
};

export const getMessage = async () => {
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${username}/message`),
  });
};
