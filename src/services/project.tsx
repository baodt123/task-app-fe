import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getUsername } from "./user";

const BASE_URL = "http://192.168.1.227:8080/api/v1/project";

interface ProjectData {
  name: string;
  description: string;
}

export const createProjectApi = async ({ name, description }: ProjectData) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${username}`),
    data: {
      name,
      description,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getProjectsApi = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/get-all/${username}`),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getProjectById = async (id: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}`),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateProjectApi = async (
  id: any,
  { name, description }: ProjectData
) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/update/${id}`),
    data: {
      name,
      description,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteProjectApi = async (id: any) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const username = await getUsername();
  return axios({
    method: "DELETE",
    url: BASE_URL.concat(`/delete/${id}`),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
