import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAV2CgHGL4mIqWTHYPuEm4z-jFDYTsHYa4",
    authDomain: "sabor-universitario.firebaseapp.com",
    projectId: "sabor-universitario",
    storageBucket: "sabor-universitario.appspot.com",
    messagingSenderId: "418863484962",
    appId: "1:418863484962:web:65583a0ac06bc09e87ba7b",
    measurementId: "G-254Z7G0QJ0"
  };
  

// Inicializar Firebase
  firebase.initializeApp(firebaseConfig);


// Opcional: Configurar los servicios específicos que desees utilizar
// Por ejemplo, puedes habilitar Firebase Authentication, Firebase Realtime Database, Firebase Cloud Firestore, etc.

// Ejemplo de uso de Firebase Authentication
const auth = firebase.auth();
// Ejemplo de uso de Firebase Realtime Database
const database = firebase.database();
// Ejemplo de uso de Firebase Cloud Firestore
const firestore = firebase.firestore();
// Ejemplo de uso de Firebase Storage
const storage = firebase.storage();

export { firebase, auth, database, firestore, storage };

