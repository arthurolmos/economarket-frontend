import { useMutation } from "@apollo/client";
import React from "react";
import { AuthContext } from "./AuthContext";
import {
  NOTIFICATIONS_SUBSCRIPTION,
  SEND_NOTIFICATION,
} from "../apollo/graphql";
import { getNotificationsByUser } from "../apollo/queries";
import { getExpoPushToken } from "../notifications";
import { Notification } from "../interfaces/notification";
import * as Notifications from "expo-notifications";
import "../notifications/register";
import * as RootNavigation from "../navigators/RootNavigation";

interface Props {
  children: React.ReactElement;
}

interface IContext {
  notifications: Notification[];
  loading: boolean;
  refetch: () => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NotificationsContext = React.createContext({} as IContext);

export function NotificationsProvider({ children }: Props) {
  const { user } = React.useContext(AuthContext);

  const { subscribeToMore, data, loading, refetch } = getNotificationsByUser(
    user?.id
  );
  const notifications = data?.notificationsByUser
    ? data?.notificationsByUser
    : [];

  function subscribeToNewNotifications() {
    subscribeToMore({
      document: NOTIFICATIONS_SUBSCRIPTION,
      variables: { userId: user?.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newNotificationItem = subscriptionData.data.notificationCreated;

        sendNotification(newNotificationItem);

        return Object.assign({}, prev, {
          notificationsByUser: [
            newNotificationItem,
            ...prev.notificationsByUser,
          ],
        });
      },
    });
  }

  const [doSendNotification] = useMutation(SEND_NOTIFICATION, {});
  async function sendNotification(notification: Notification) {
    try {
      const token = await getExpoPushToken();

      doSendNotification({
        variables: {
          to: [token],
          title: notification.title,
          body: notification.body,
          data: "test",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    Notifications.addNotificationReceivedListener(_handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  }, []);

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

  React.useEffect(() => {
    if (user) subscribeToNewNotifications();
  }, [user]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        refetch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
