import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native"; //elementos que se van a estar utilizando
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
function UserGuest(props) {
  const { navigation } = props; //uso de destructuring {importamos la funcion}
  console.log(props);

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/original.jpg")}
        style={styles.image}
        resizeMode="contain" //este es para que la imagen ocupe el tamaño requerido
      ></Image>
      <Text style={styles.title}>Consulta bla bla bla ...</Text>
      <Text style={styles.description}>
        ¿Como describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest); // se exporta de esta manera con el withNavigation para
//obtener un objeto con sus funcionalidades

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    padding: 15,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
});
