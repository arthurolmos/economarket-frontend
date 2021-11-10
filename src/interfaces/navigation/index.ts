import { RouteProp } from "@react-navigation/core";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";

export type DefaulScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  EditListProduct: { id: string; shoppingListId: string };
  EditProduct: { id: string };
  Notifications: undefined;
  CreateShoppingList: undefined;
  ShoppingList: { id: string };
};

export type RootTabParamList = {
  Home: undefined;
  MyLists: undefined;
  Products: undefined;
  Settings: undefined;
};

export type DefaultStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type DefaultBottomTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
