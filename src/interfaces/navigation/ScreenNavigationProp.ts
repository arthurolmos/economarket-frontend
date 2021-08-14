import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "./RootStackParamList";

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export default ScreenNavigationProp;
