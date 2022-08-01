import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../interfaces/navigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import ShoppingListScreen from "../screens/shopping-list-screen/ShoppingListScreen";
import EditListProductScreen from "../screens/EditListProductScreen";
import { NotificationButton } from "../components/buttons";
import NotificationsScreen from "../screens/notifications-screen/NotificationsScreen";
import { navigationRef } from "./RootNavigation";
import EditProductScreen from "../screens/EditProductScreen";
import MainScreen from "../screens/MainScreen";
import { useAuthContext } from "../contexts";

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={({ navigation }: any) => ({
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
              name="Main"
              component={MainScreen}
              options={{ title: "iMarket" }}
            />
            <Stack.Screen
              name="CreateShoppingList"
              component={CreateShoppingListScreen}
              options={{ title: "Criar Lista de Compras" }}
            />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingListScreen}
              options={{ title: "Lista de Compras" }}
            />
            <Stack.Screen
              name="EditListProduct"
              component={EditListProductScreen}
              options={{ title: "Editar Produto da Lista" }}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProductScreen}
              options={{ title: "Editar Produto" }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: "Notificações" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
