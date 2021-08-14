import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  children: string;
}

export function DefaultText(props: Props) {
  const { children } = props;

  return <Text>{children}</Text>;
}

const styles = StyleSheet.create({});
