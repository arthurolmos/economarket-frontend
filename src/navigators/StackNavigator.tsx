import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext";
import RootStackParamList from "../interfaces/navigation/RootStackParamList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import EditListProductScreen from "../screens/EditListProdutScreen";
import { NotificationButton } from "../components/Buttons";
import NotificationsScreen from "../screens/NotificationsScreen";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import * as Constants from "expo-constants";
import { navigationRef } from "./RootNavigation";
import EditProductScreen from "../screens/EditProductScreen";

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  const { user } = React.useContext(AuthContext);

  // const linking = {
  //   prefixes: ["exp://192.168.15.5:19000/"],
  // };

  // console.log(linking);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <NotificationButton
              action={() => navigation.navigate("Notifications")}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 20,
          },
        })}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ title: "economarket" }}
            />
            <Stack.Screen
              name="CreateShoppingList"
              component={CreateShoppingListScreen}
              options={{ title: "Create Shopping List" }}
            />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingListScreen}
              options={{ title: "Shopping List" }}
            />
            <Stack.Screen
              name="EditListProduct"
              component={EditListProductScreen}
              options={{ title: "Edit List Product" }}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProductScreen}
              options={{ title: "Edit Product" }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: "Notifications" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
