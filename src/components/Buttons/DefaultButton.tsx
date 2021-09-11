import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  action: () => void;
  title: string;
  color?: string;
  bgColor?: string;
}

function DefaultButton(props: Props) {
  const { action, title, color = "black", bgColor = "blue" } = props;

  return (
    <TouchableOpacity
      onPress={action}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={{ color: color }}>{title}</Text>
    </TouchableOpacity>
  );
}

export default DefaultButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
