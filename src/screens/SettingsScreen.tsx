import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthContext } from "../contexts";
import { DefaultBottomTabScreenProps } from "../interfaces/navigation";

interface Props {}

function SettingsScreen({
  navigation,
}: DefaultBottomTabScreenProps<"Settings">) {
  const { signOut } = useAuthContext();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="SignOut" onPress={() => signOut()} />
    </View>
  );
}

export default SettingsScreen;
