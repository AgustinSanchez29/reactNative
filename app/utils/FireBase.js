//ARCHIVO DE CONFIGURACION PARA LA INICIALIZACION DE FIREBASE

import firebase from "firebase/app"; //hacemos la importacion de firebase

const firebaseConfig = {
  apiKey: "AIzaSyD1Av51imjDVXyV8Un4mSno5eHEkTNOAe4",
  authDomain: "tenedores-4de09.firebaseapp.com",
  databaseURL: "https://tenedores-4de09.firebaseio.com",
  projectId: "tenedores-4de09",
  storageBucket: "tenedores-4de09.appspot.com",
  messagingSenderId: "565221002435",
  appId: "1:565221002435:web:6249856728541a370fe676",
  measurementId: "G-MWN0DNRJGC",
};

export const firebaseapp = firebase.initializeApp(firebaseConfig); // con esta linea inicializamos la app con firebase
