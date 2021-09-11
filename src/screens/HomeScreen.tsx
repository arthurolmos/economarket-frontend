import React from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import { AuthContext } from "../contexts";

function HomeScreen({ navigation }: DefaultScreenProp) {
  const { user } = React.useContext(AuthContext);

  //Initialize the data for Lists and for Products
  // getShoppingListsByUser(user?.id);

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
      <Text>Blablabla</Text>
      {/* <Button
        onPress={() => {
          Linking.canOpenURL("exp://192.168.15.5:19000/Settings").then(
            (supported) => {
              console.log("im here");

              if (supported) {
                Linking.openURL("exp://192.168.15.5:19000/Settings");
              } else {
                console.log(
                  "Don't know how to open URI: " + "exp://192.168.15.5:19000/"
                );
              }
            }
          );
        }}
        title="Abrir"
      /> */}
      {/* <View>
        {data.shoppingLists.map((shoppingList) => {
          return (
            <ShoppingListItem
              key={shoppingList.id}
              shoppingList={shoppingList}
            />
          );
        })}
      </View> */}
    </View>
  );
}

export default HomeScreen;
