import { registerIndieID, unregisterIndieDevice } from "native-notify";
import axios from "axios";
import { getUsername } from "./user";

export const subIndie = async () => {
  const username = await getUsername();
  registerIndieID(`${username}`, 14450, "bQ8g7WgDaaYTzGRhM2I0ID");
};

export const unsubIndie = async () => {
  const username = await getUsername();
  unregisterIndieDevice(`${username}`, 14450, "bQ8g7WgDaaYTzGRhM2I0ID");
};

export const sendNotify = async (message: string) => {
  const username = await getUsername();
  const parts = message.split("\n");
  return axios.post(`https://app.nativenotify.com/api/indie/notification`, {
    subID: `${username}`,
    appId: 14450,
    appToken: "bQ8g7WgDaaYTzGRhM2I0ID",
    title: `${parts[0]}`,
    message: `${parts[1]}`,
  });
};
