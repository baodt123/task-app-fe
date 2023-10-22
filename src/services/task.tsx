import axios from "axios";
import { getUsername } from "./user";

const BASE_URL = "http://192.168.1.227:8080/api/v1/task";

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  FAILED = "FAILED",
}

export interface TaskRequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
}

export interface Choice {
  status: Status
}

export const getTaskById = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${id}`),
  });
};

export const createNewTask = async (id: any, task: TaskRequest) => {
  const username = await getUsername();
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${id}/project/${username}/creator`),
    data: task,
  });
};

export const getBacklogTasksByProjectId = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/backlog/${id}/project`),
  });
};

export const getTodoTasksByProjectId = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/todo/${id}/project`),
  });
};

export const getInprogressTasksByProjectId = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/in-progress/${id}/project`),
  });
};

export const getDoneTasksByProjectId = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/done/${id}/project`),
  });
};

export const getFailedTasksByProjectId = async (id: any) => {
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/failed/${id}/project`),
  });
};

export const updateTaskById = async (task: TaskRequest, taskId: any) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${taskId}/update`),
    data: task,
  });
};

export const changeStatusTask = async (choice: Choice, taskId: any) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${taskId}/status`),
    data: choice,
  });
};

export const assigneeMemberToTask = async (taskId: any, username: string) => {
  return axios({
    method: "POST",
    url: BASE_URL.concat(`/${taskId}/assignee/${username}`),
  });
};

export const getTaskByAssigneeUser = async () => {
  const username = await getUsername();
  return axios({
    method: "GET",
    url: BASE_URL.concat(`/${username}/assignee`),
  });
};

export const deleteTask = async (id: any) => {
  return axios({
    method: "DELETE",
    url: BASE_URL.concat(`/${id}/delete`),
  });
};