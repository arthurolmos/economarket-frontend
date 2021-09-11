import React, { LegacyRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export const DefaultInput = React.forwardRef(
  (props: Props, ref: LegacyRef<TextInput> | undefined) => {
    const { ...rest } = props;

    return <TextInput style={styles.input} {...rest} ref={ref} />;
  }
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    borderRadius: 5,
    position: "relative",
  },
});
