import axios from "axios";
import { getUsername } from "./user";

const BASE_URL = "http://192.168.1.227:8080/api/v1/project";

interface ProjectData {
  name: string;
  description: string;
  username: any;
}

export const createProjectApi = async ({ name, description }: ProjectData) => {
  const username = await getUsername();
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${username}`),
    data: {
      name,
      description,
    },
  });
};

export const getProjectsApi = async () => {
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/get-all/${username}`),
  });
};

export const getProjectById = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}`),
  });
};

export const updateProjectApi = async (id: any, data: ProjectData) => {
  return axios({
    method: "PUT",
    url: BASE_URL.concat(`/update/${id}`),
    data: data,
  });
};

export const deleteProjectApi = async (id: any) => {
  const username = await getUsername();
  return axios({
    method: "DELETE",
    url: BASE_URL.concat(`/delete/${id}/${username}`),
  });
};

export const getMembersInProject = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}/members`),
  });
};

export const getManagersInProject = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}/managers`),
  });
};

export const findUsersNotInProject = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}/users`),
  });
};

export const addMemberToProject = async (id: any, username: string) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${id}/add/${username}`),
  });
};


export const findAllMembersProject =async (id:any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}/all`),
  });
}

export const findProjectUserNotIn = async () => {
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/all/${username}`),
  });
};

export const outProject = async (id: any) => {
  const username = await getUsername();
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${id}/out/${username}`),
  });
};
