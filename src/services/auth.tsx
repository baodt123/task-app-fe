import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://task-app-magic-dcb626661833.herokuapp.com/api/v1/auth";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

interface LoginData {
  username: string;
  password: string;
}

export const registerApi = (register: RegisterData) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat("/register"),
    data: register,
  });
};

export const loginApi = ({ username, password }: LoginData) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat("/login"),
    data: {
      username,
      password,
    },
  });
};

export const setAccessToken = async (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    addTokenToAxios(accessToken);
    return true;
  } catch (error) {
    console.log("error when save token", error);
  }
  return false;
};

export const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync("accessToken");
  } catch (error) {
    console.log("error when save token", error);
  }
  return false;
};

export const addTokenToAxios = (accessToken: string) => {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
