import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext";
import RootStackParamList from "../interfaces/navigation/RootStackParamList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";
import { Button, Text, View, TouchableOpacity } from "react-native";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import EditListProductScreen from "../screens/EditListProdutScreen";

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  const { user } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 25 }}
              onPress={() => console.log("NOTIFY")}
            >
              <Text>Notify</Text>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            marginRight: 15,
          },
        }}
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
            />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
            <Stack.Screen
              name="EditListProduct"
              component={EditListProductScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
