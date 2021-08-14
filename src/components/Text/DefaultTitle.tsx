import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  children: string;
}

export function DefaultTitle(props: Props) {
  const { children } = props;

  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
