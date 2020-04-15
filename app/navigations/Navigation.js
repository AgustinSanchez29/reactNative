import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TopListsScreenStacks from "./TopListsStacks";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopListScreenStack from "./TopListsStacks";
import SearchScreenStack from "./SearchStacks";
import AccountScreenStack from "./AccountStacks";

//  NOTA: ESTE MODULO CREA LA BARRA DE NAVEGACION QUE SE ENCUENTRA EN EL FOOTER

const NavigationStacks = createBottomTabNavigator(
  {
    //ESTAS SERIAN LAS DISTINTAS OPCIONES QUE SE ENCONTRARAN DE LA BARRA DE MENU

    Restaurants: {
      screen: RestaurantsScreenStacks, //LA PANTALLA QUE MOSTRAREMOS (ESTA FUE LA QUE SE IMPORTO)
      navigationOptions: () => ({
        //LA ESTRUCTURA QUE TENDRA LA OPCION
        tabBarLabel: "Restaurants", //TITULO DE LA OPCION
        tabBarIcon: (
          { tintColor } // ICONO DE LA OPCION Y SUS PROPIEDADES
        ) => (
          <Icon
            type="material-community"
            name="compass-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    //Y ASI SE REPITE PARA CADA OPCION
    TopRestaurants: {
      screen: TopListScreenStack,
      navigationOptions: {
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="star-outline"
            size={22}
            color={tintColor}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreenStack,
      navigationOptions: {
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        ),
      },
    },
    Account: {
      screen: AccountScreenStack, //cuando este en la opcion de cuenta, esta sera la pantalla que mostrara
      navigationOptions: {
        tabBarLabel: "My Account",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={22}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Account", // INDICA CUAL SERA LA PANTALLA QUE SE MOSTRARA CUANDO SE INICIE LA APLICACION
    order: ["Restaurants", "TopRestaurants", "Search", "Account"], // EL ORDEN DE LAS OPCIONES
    tabBarOptions: {
      //COLOR DE LAS OPCIONES DEPENDIENDO SI ESTA EN LA PANTALLA ACTUAL O NO
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    },
  }
);

export default createAppContainer(NavigationStacks);
