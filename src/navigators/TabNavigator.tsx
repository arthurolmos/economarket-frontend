import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsScreen from "../screens/products/ProductsScreen";
import MyListsScreen from "../screens/my-lists-screen/MyListsScreen";
import HomeScreen from "../screens/home-screen/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { TabNavigatorIcon } from "../components/icons/TabNavigatorIcon";
import { RootTabParamList } from "../interfaces/navigation";

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "lightgray",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Meu Painel",
          tabBarIcon: ({ focused, color, size }) => (
            <TabNavigatorIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="MyLists"
        component={MyListsScreen}
        options={{
          tabBarLabel: "Minhas Listas",
          tabBarIcon: ({ focused, color, size }) => (
            <TabNavigatorIcon name="cart" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ focused, color, size }) => (
            <TabNavigatorIcon name="star" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ focused, color, size }) => (
            <TabNavigatorIcon name="cog" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
