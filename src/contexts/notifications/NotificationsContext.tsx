import React from "react";
import { Notification } from "../../interfaces/notification";
import "../../notifications/register";

interface IContext {
  notifications: Notification[];
  loading: boolean;
  refetch: () => void;
}

export const NotificationsContext = React.createContext({} as IContext);

export const useNotificationsContext = () =>
  React.useContext(NotificationsContext);
