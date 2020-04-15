import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Buscar",
    }),
  },
});

export default SearchScreenStack;
