import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NotificationsContext } from "../../contexts";

interface Props {
  action: () => void;
}

export function NotificationButton(props: Props) {
  const { action } = props;

  const { notifications } = React.useContext(NotificationsContext);

  const notificationsUnread = notifications
    ? notifications.filter((notification) => !!!notification.read)
    : [];

  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <Ionicons name="notifications" size={28} color="gray" />
      {notificationsUnread.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.text}>
            {notificationsUnread.length.toString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  badge: {
    borderRadius: 50,
    minWidth: 15,
    minHeight: 15,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "red",
    top: 12,
    right: 0,
  },

  text: { fontSize: 10, fontWeight: "bold" },
});
