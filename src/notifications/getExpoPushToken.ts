import * as Notifications from "expo-notifications";

export const getExpoPushToken = async () => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
};
