import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://192.168.1.227:8080/api/v1/user";

interface UpdateData {
  fullName: string;
  email: string;
}

interface InfoData {
  username: string;
  fullName: string;
  email: string;
}

interface ChangeData {
  oldPassword: string;
  newPassword: string;
}

export const getUserInfo = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${username}`),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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

export const updateUserInfo = async ({ fullName, email }: UpdateData) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/update/${username}`),
    data: {
      fullName,
      email,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const changePasswordUser = async ({oldPassword, newPassword}: ChangeData) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/change-password/${username}`),
    data: {
      oldPassword,
      newPassword,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
