import React from "react";
import { FloatingButton } from "../components/buttons";
import { DefaultStackScreenProps } from "../interfaces/navigation";
import TabNavigator from "../navigators/TabNavigator";

function MainScreen({ navigation }: DefaultStackScreenProps<"Main">) {
  return (
    <>
      <TabNavigator />

      <FloatingButton
        action={() => navigation.navigate("CreateShoppingList")}
      />
    </>
  );
}

export default MainScreen;
