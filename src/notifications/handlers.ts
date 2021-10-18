import * as Notifications from "expo-notifications";
import * as RootNavigation from "../navigators/RootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const _handleNotification = (notification: any) => {
  // setNotification(notification);
  console.log({ notification });
};

const _handleNotificationResponse = (response: any) => {
  const { notification } = response;

  RootNavigation.navigate("TabNavigator", {
    screen: "Minhas Listas",
  });
};

export function addNotificationListeners() {
  Notifications.addNotificationReceivedListener(_handleNotification);

  Notifications.addNotificationResponseReceivedListener(
    _handleNotificationResponse
  );
}
