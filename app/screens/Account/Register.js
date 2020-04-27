/* THIS FILE CONTAINS A LAYOUT WITH A REGISTER FORMULARY */

import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/*este componente es usado para que cuando aparezca el teclado, no tape los elementos sobrepuestos*/
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";
/* Toast shows a pop-up message, we will import */

export default function Register() {
  const toastRef = useRef();
  /* we create a constant that it receive a useRef function */
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="top" opacity={1} />
      {/*we define the attributes of "Toast" component and added a ref attribute
      that it obtains "toastRef" constant, whit this we will send a object that it get functions
      for example: "show" function*/}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
