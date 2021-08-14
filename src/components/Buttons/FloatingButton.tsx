import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  action: () => void;
}

export function FloatingButton(props: Props) {
  const { action } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Text>Add</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 5,
    bottom: 20,
    right: 20,
    backgroundColor: "red",
    elevation: 3,
  },
});
