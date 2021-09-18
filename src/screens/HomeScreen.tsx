import React from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { AuthContext } from "../contexts";

function HomeScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
      <Text>Blablabla</Text>
    </View>
  );
}

export default HomeScreen;
