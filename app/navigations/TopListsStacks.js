import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import TopRestaurantsScreen from "../screens/TopRestaurants";

const TopListScreenStack = createStackNavigator({
  TopRestaurant: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Top Restaurants",
    }),
  },
});

export default TopListScreenStack;
