import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export function DefaultInput(props: Props) {
  const { ...rest } = props;

  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    borderRadius: 5,
  },
});
