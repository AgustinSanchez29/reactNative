/*NOTA: EN ESTE ARCHIVO MANEJAMOS LA AUTENTICACION DE LOS USUARIOS, SI EL USUARIO NO ESTA LOGEADO
TE MANDA COMO USUARIO GUEST SINO COMO USUARIO LOGEADO
 */

import React, { useState, useEffect } from "react"; //remember: useEffect y useState es par el manejo de estados
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function MyAccount() {
  const [login, setLogin] = useState(false); //creacion de las variables para el manejo de estados

  useEffect(() => {
    //con esta funcion validamos el usuario que esta autenticado
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    // la peticion se esta cargando
    return <Loading isVisible={true} text="Cargando..." />;
  }
  //si el usuario esta logeado carga la pantalla UserLogged sino UserGuest
  return login ? <UserLogged /> : <UserGuest />;
}
