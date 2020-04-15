import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation"; // esta libreria es para navegar entre paginas
// {osea te permite redireccionarte hacia otra pagina}

export default function Login(props) {
  //recibimos las propiedades que forman una funcion y utilizaremos
  //navigation para poder redireccionarnos hacia otra pagina
  const { navigation } = props;
  //console.log(navigation);
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.view}>
        <Text>Form Login...</Text>

        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.view}>
        <Text>Login with facebook</Text>
      </View>
    </ScrollView>
  );
}

//funcion para registro
const CreateAccount = (props) => {
  const { navigation } = props; //obtenemos solo "NAVIGATION" de las props
  return (
    <Text style={StyleSheet.textRegister}>
      ¡Aun no tienes una cuenta?{""}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")} //con el objeto navigation utilizamos el metodo "NAVIGATE"
        //para redireccionarnos hacia la pagina Register
      >
        Resgistrate
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  view: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
