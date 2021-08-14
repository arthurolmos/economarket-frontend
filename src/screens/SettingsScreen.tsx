import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";

interface Props {}

function SettingsScreen({ navigation }: DefaultScreenProp) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="SignOut" onPress={() => signOut()} />
    </View>
  );
}

export default SettingsScreen;
