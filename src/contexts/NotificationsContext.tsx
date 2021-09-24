import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { AuthContext } from "./AuthContext";
import {
  CREATE_PUSH_NOTIFICATION_TOKEN,
  DELETE_PUSH_NOTIFICATION_TOKEN,
  GET_NOTIFICATIONS_BY_USER,
} from "../apollo/graphql";
import { Notification } from "../interfaces/notification";
import "../config/notifications/register";
import { addNotificationListeners } from "../config/notifications";
import { getToken } from "../lib/notifications/getToken";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

interface IContext {
  notifications: Notification[];
  loading: boolean;
  refetch: () => void;
}

export const NotificationsContext = React.createContext({} as IContext);

export function NotificationsProvider({ children }: Props) {
  const { user } = React.useContext(AuthContext);

  const { data, loading, refetch, startPolling, stopPolling } = useQuery(
    GET_NOTIFICATIONS_BY_USER,
    {
      variables: {
        userId: user?.id,
      },
    }
  );

  const notifications = data?.notificationsByUser
    ? data?.notificationsByUser
    : [];

  React.useEffect(() => {
    addNotificationListeners();
  }, []);

  React.useEffect(() => {
    startPolling(500);

    return () => stopPolling();
  }, []);

  const [createPushNotificationToken] = useMutation(
    CREATE_PUSH_NOTIFICATION_TOKEN
  );

  async function registerNotificationToken(userId: string) {
    try {
      const token = await getToken();

      const pushNotificationToken = await createPushNotificationToken({
        variables: {
          userId: userId,
          token,
        },
      });

      console.log("Token registered successfully", pushNotificationToken);
    } catch (err) {
      console.log("Error creating notification token", err);
    }
  }

  const [deletePushNotificationToken] = useMutation(
    DELETE_PUSH_NOTIFICATION_TOKEN
  );

  async function unregisterNotificationToken() {
    try {
      const token = await getToken();

      await deletePushNotificationToken({
        variables: {
          token,
        },
      });

      console.log("Token deleted successfully");
    } catch (err) {
      console.log("Error deleting notification token", err);
    }
  }

  React.useEffect(() => {
    if (user) {
      registerNotificationToken(user.id);
    } else {
      unregisterNotificationToken();
    }
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
