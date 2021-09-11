import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsScreen from "../screens/ProductsScreen";
import MyListsScreen from "../screens/MyListsScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Meu Painel",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={28} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Minhas Listas"
        component={MyListsScreen}
        options={{
          tabBarLabel: "Minhas Listas",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="cart" size={28} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={ProductsScreen}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="cash" size={28} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracões"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="cog" size={28} color={focused ? "blue" : "gray"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
