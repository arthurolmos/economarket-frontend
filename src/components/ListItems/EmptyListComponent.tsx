import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  loading: boolean;
}

export function EmptyListComponent(props: Props) {
  const { loading } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {loading ? "Carregando" : "Lista vazia! Adicione produtos!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "gray" },
});
