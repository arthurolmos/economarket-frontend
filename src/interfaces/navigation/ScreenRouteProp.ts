import { RouteProp } from "@react-navigation/native";
import RootStackParamList from "./RootStackParamList";

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export default ScreenRouteProp;
