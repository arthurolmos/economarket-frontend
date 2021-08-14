import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";

interface Props {}

function DetailsScreen({ navigation }: DefaultScreenProp) {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>sp</Text>
      <Button title="Set User" onPress={() => signIn("user")} />
    </View>
  );
}

export default DetailsScreen;
