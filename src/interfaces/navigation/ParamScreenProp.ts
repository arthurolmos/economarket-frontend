import RootStackParamList from "./RootStackParamList";
import ScreenNavigationProp from "./ScreenNavigationProp";
import ScreenRouteProp from "./ScreenRouteProp";

type ParamScreenProp<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp<T>;
};

export default ParamScreenProp;
