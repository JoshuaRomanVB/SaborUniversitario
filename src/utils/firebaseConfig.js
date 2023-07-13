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
  

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export { firebase };

