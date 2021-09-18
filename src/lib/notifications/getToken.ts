import * as Notifications from "expo-notifications";

export const getToken = async () => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
};
