import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const MyAccountScreenStack = createStackNavigator({
  Accounts: {
    screen: MyAccountScreen,
    NavigationOptions: () => ({
      title: "Mi cuenta",
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login",
    }),
  },
  Register: {
    screen: RegisterScreen,
    NavigationOptions: () => ({
      title: "Registro",
    }),
  },
});

export default MyAccountScreenStack;
