import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { ValidateEmail } from "../../utils/Validation"; //in here we import a function that validate email
import * as firebase from "firebase";

//IN THIS FILE WE CREATE A COMPONENT THAT IT IS A REGISTER FORMULARY

export default function RegisterForm() {
  const [hidePassword, setHidePassword] = useState(true); //state variables that will be used to change value of password input
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true); //does the same

  //these state variables will be used to manipulate the value of itself
  /*the structure of these "const" has a variable and a function that it update the value of them */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  //this function will be used for register a user, it validates if variables are null or false,
  //in that case, we cant deliver the values
  const register = async () => {
    if (!email || !password || !repeatPassword) {
      console.log("All inputs are required");
    } else {
      if (!ValidateEmail(email)) {
        /* we validate with function imported */
        console.log("wrong email");
      } else {
        if (password !== repeatPassword) {
          /* we validate if passwords are equals */
          console.log("passwords must be equals");
        } else {
          /* with this function we create a user and save in firebase, it has a "then" and "catch" function
          for error manage*/
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log("user created");
            })
            .catch(() => {
              console.log("Error to create user, try again later");
            });
        }
      }
    }
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
    </View>
  );
}

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
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
});
