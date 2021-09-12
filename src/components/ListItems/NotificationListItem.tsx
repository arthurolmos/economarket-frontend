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
import { AuthContext } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Notification } from "../../interfaces/notification";

interface Props {
  notification: Notification;
}

export function NotificationListItem(props: Props) {
  const { notification } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>{notification.body}</Text>
      {/* <TouchableOpacity>
        <Ionicons name="create" size={32} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="create" size={32} color="gray" />
      </TouchableOpacity> */}
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
});
