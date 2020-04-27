import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { ValidateEmail } from "../../utils/Validation"; //in here we import a function that validate email
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";

//IN THIS FILE WE CREATE A COMPONENT THAT IT IS A REGISTER FORMULARY

function RegisterForm(props) {
  console.log("REGISTER FORM");
  console.log(props);
  /* we receives "props" sended from "Register file" and then we obtains a object with properties of "toast" component*/
  /* and it obtain "Navigation" propertie for move to another page */
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true); //state variables that will be used to change value of password input
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true); //does the same
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  /* this constant is for send state of loading */

  //these state variables will be used to manipulate the value of itself
  /*the structure of these "const" has a variable and a function that it update the value of them */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  //this function will be used for register a user, it validates if variables are null or false,
  //in that case, we cant deliver the values
  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("All inputs are required");
    } else {
      if (!ValidateEmail(email)) {
        /* we validate with function imported */
        toastRef.current.show("wrong email");
      } else {
        if (password !== repeatPassword) {
          /* we validate if passwords are equals */
          toastRef.current.show("passwords must be equals");
          /* we access to "current" method and inside it access to "show" method  */
        } else {
          /* with this function we create a user and save in firebase, it has a "then" and "catch" function
          for error manage, we use "await" for not execute the next steps before ends its steps*/
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              toastRef.current.show("User created");
              navigation.navigate("Accounts");
              /* we use this line to move "MyAccount" page then does create a user*/
            })
            .catch(() => {
              toastRef.current.show("Error to create user, try again later");
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };
  /* we call "ValidateEmail" function and we receive the result in a variable */

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        /*whit this line we obtain a variable called "e", it manipulates functions 
        that obtain the current text value written in the text input
        we use "setEmail" function for update email value

         */

        rightIcon={
          <Icon
            type="material-community"
            /*ver en react-native-elements */
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        /*this attribute identifies to the input text that will be a password input*/
        secureTextEntry={hidePassword}
        /*hide  your password */
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            //it check the value of hidePassword and assign a value
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
            //set the opposite value of hidePassword variable when interacting with the icon
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register} //it call register function
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);
/* we use "withNavigation" to send navigation properties of "RegisterForm" component*/

//STYLES OF EACH FORMULARY ELEMENTS

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    marginLeft: 10,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
});
