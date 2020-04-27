//  whit this component we add login with facebook

import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  /*  we create a login function that it does steps to log in with Facebook */
  const login = async () => {
    Facebook.initializeAsync(
      FacebookApi.application_id
    ); /*  is necessary initialized before log-in*/
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );
    /* console.log(type); //return if log-in was success or not
    console.log(token); */

    if (type === "success") {
      setIsLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          console.log("Login success");
          navigation.navigate("Accounts");
        })
        .catch(() => {
          //console.log("Error to login, try again later");
          toastRef.current.show("Error to login, try again later");
        });
    } else if (type === "cancel") {
      //console.log("login canceled");
      toastRef.current.show("login canceled");
    } else {
      //console.log("undefined Error");
      toastRef.current.show("undefined Error");
    }
    setIsLoading(false);
  };

  return (
    <>
      <SocialIcon
        title="Iniciar sesion con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando Sesion" />
    </>
  );
}
