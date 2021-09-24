import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  action: () => void;
  name: any;
  backgroundColor?: string;
  textColor?: string;
}

export function RoundButton(props: Props) {
  const {
    action,
    name,
    backgroundColor = "white",
    textColor = "black",
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={action}
    >
      <Ionicons name={name} size={24} color={textColor} />
      <Text style={{ color: textColor }}>Salvar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
});
