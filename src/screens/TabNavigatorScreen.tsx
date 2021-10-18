import React from "react";
import { FloatingButton } from "../components/buttons";
import DefaultScreenProp from "../interfaces/navigation/DefaultScreenProp";
import TabNavigator from "../navigators/TabNavigator";

function TabNavigatorScreen({ navigation }: DefaultScreenProp) {
  return (
    <>
      <TabNavigator />

      <FloatingButton
        action={() => navigation.navigate("CreateShoppingList")}
      />
    </>
  );
}

export default TabNavigatorScreen;
