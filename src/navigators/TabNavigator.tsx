import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsScreen from "../screens/ProductsScreen";
import MyListsScreen from "../screens/MyListsScreen";
import PanelScreen from "../screens/PanelScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{ safeAreaInsets: { bottom: 10 } }}>
      <Tab.Screen
        name="Minhas Listas"
        component={MyListsScreen}
        options={{ tabBarLabel: "Minhas Listas" }}
      />
      <Tab.Screen
        name="Meu Painel"
        component={PanelScreen}
        options={{ tabBarLabel: "Meu Painel" }}
      />
      <Tab.Screen
        name="Produtos"
        component={ProductsScreen}
        options={{ tabBarLabel: "Produtos" }}
      />
      <Tab.Screen
        name="Configuracões"
        component={SettingsScreen}
        options={{ tabBarLabel: "Configurações" }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
