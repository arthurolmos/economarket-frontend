import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  children: string;
}

export function DefaultSubtitle(props: Props) {
  const { children } = props;

  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
