import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/FireBase"; //llamamos al archivo de configuarion y con esto inicializamos firebase

export default function App() {
  console.log("Hola");
  return <Navigation />;
}
