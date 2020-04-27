import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";
import { withNavigation } from "react-navigation"; // esta libreria es para navegar entre paginas
// {osea te permite redireccionarte hacia otra pagina}

function Login(props) {
  //recibimos las propiedades que forman una funcion y utilizaremos
  //navigation para poder redireccionarnos hacia otra pagina
  const { navigation } = props;
  const toastRef = useRef();
  console.log("desde LOGIN");
  console.log(props);
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.view}>
        <LoginForm toastRef={toastRef} />
        {/* LLAMAMOS A LA FUNCION PARA CREAR UNA CUENTA Y COMO PROPS LE PASAMOS EL OBJETO "NAVIGATION" PARA MOVERNOS A OTRA PAGINA*/}
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.view}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast ref={toastRef} position="center" opacity={1} />
    </ScrollView>
  );
}

export default withNavigation(Login);

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
        Registrate
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
