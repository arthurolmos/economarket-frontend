import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  action: () => void;
}

export function FloatingButton(props: Props) {
  const { action } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Ionicons name="add-circle-outline" size={44} color="pink" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "violet",
    elevation: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
