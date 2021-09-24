import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  action: () => void;
  name: any;
  style: StyleProp<ViewStyle>;
}

export function RoundButton(props: Props) {
  const { action, name, style } = props;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={action}>
      <Ionicons name={name} size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
