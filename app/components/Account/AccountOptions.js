import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements"; //to create a list of items, provided by react-native-elements
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  /* Se necesita una variable que aloje el componente (un formulario) que se va a mostrar en la Overlay Screen 
  para esto creamos una constante de estado para manipular esto*/
  const [renderComponent, setRenderComponent] = useState(null);

  /* we create an array that it have a three items, it have the properties of each element */
  const menuOptions = [
    {
      title: "Change your name and your lastname",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"), //we send the key to use in the function
    },
    {
      title: "change your email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "change your password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(<ChangeDisplayNameForm />);
        setIsVisibleModal(true);
        break;
      case "email":
        //setRenderComponent(<ChangeEmailForm />);
        <ChangeEmailForm />;
        setIsVisibleModal(true);
        break;
      case "password":
        //setRenderComponent(<ChangePasswordForm />);
        <ChangePasswordForm />;
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      {/* we manage the array one by one, the function map receive "menu" (this manage an array item) 
      and index (this manage the position of the array item)*/}
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index} //id
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
