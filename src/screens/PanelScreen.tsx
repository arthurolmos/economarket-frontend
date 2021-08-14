import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import ShoppingList from "../components/ShoppingListItem";
import * as data from "../data/data";

function PanelScreen({ navigation }: DefaultScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 15 }}>
      <View>
        {data.shoppingLists.map((shoppingList) => {
          return (
            <ShoppingList key={shoppingList.id} shoppingList={shoppingList} />
          );
        })}
      </View>
    </View>
  );
}

export default PanelScreen;
