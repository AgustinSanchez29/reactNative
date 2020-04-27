import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { ValidateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import * as firebase from "firebase";

function LoginForm(props) {
  const { toastRef, navigation } = props;
  console.log("DESDE LOGIN FORM");
  console.log(props);
  const [hideState, setHideState] = useState(true);
  const [email, setEmailState] = useState("");
  const [passState, setPassState] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !passState) {
      toastRef.current.show("All inputs are required");
    } else {
      if (!ValidateEmail(email)) {
        toastRef.current.show("wrong Email");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, passState)
          .then(() => {
            console.log("OK");
            navigation.navigate("Accounts");
          })
          .catch(() => {
            toastRef.current.show("Email o contraseña incorrecta");
          });
      }
    }
    setIsVisibleLoading(false);
    //when all validations are excecuted, the login screen are closed
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmailState(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hideState}
        onChange={(e) => setPassState(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideState ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideState(!hideState)}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={login}
      />
      <Loading isVisible={isVisibleLoading} text="Iniciando sesion" />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    marginBottom: 15,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
});
