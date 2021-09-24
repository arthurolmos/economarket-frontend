import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Notification } from "../../interfaces/notification";
import { useMutation } from "@apollo/client";
import {
  DELETE_NOTIFICATION,
  READ_NOTIFICATION,
  SHARE_SHOPPING_LIST,
} from "../../apollo/graphql";
import { showToast } from "../toast";

interface Props {
  notification: Notification;
}

interface NotificationActionButtonProps {
  action: () => void;
  title: string;
  color?: string;
  bgColor?: string;
}

const NotificationActionButton = (props: NotificationActionButtonProps) => {
  const { action, title, color = "black", bgColor = "blue" } = props;

  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
    >
      <Text style={{ color: color }}>{title}</Text>
    </TouchableOpacity>
  );
};

export function NotificationListItem(props: Props) {
  const { notification } = props;

  const navigation = useNavigation();

  const [shareShoppingList] = useMutation(SHARE_SHOPPING_LIST);
  const [readNotification] = useMutation(READ_NOTIFICATION);
  async function confirm() {
    try {
      await shareShoppingList({
        variables: {
          sharedUserId: notification.user.id,
          id: notification.shoppingListId,
        },
      });

      await readNotification({
        variables: {
          id: notification.id,
        },
      });

      showToast("Sucesso!");
    } catch (err) {
      console.log("Error sharing Shopping List", err);
    }
  }

  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
  async function removeNotification() {
    try {
      await deleteNotification({
        variables: {
          id: notification.id,
        },
      });

      showToast("Sucesso!");
    } catch (err) {
      console.log("Error sharing Shopping List", err);
    }
  }

  return (
    <View style={[styles.container, { opacity: notification.read ? 0.4 : 1 }]}>
      <Text>{notification.body}</Text>

      {!notification.read && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <NotificationActionButton
              action={confirm}
              title="Confirmar"
              color="green"
              bgColor="lightgreen"
            />
          </View>
          <View style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <NotificationActionButton
              action={removeNotification}
              title="Cancelar"
              color="red"
              bgColor="pink"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  left: {
    display: "flex",
    flex: 2,
    justifyContent: "flex-start",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "red",
    textTransform: "uppercase",
    flexWrap: "nowrap",
  },

  buttonContainer: {
    borderRadius: 15,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
});
