import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
}

export function DefaultSafeAreaContainer(props: Props) {
  const { children, loading = false } = props;

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="lightgreen" />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  separator: {
    height: 10,
  },
  loading: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
