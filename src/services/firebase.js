import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import config from "config";

const firebaseConfig = {
  apiKey: "AIzaSyBYuIQXWyQgkbSbvgFdM6o3p5fP4j_YkqQ",
  authDomain: "react-assignment-172c8.firebaseapp.com",
  databaseURL: "https://react-assignment-172c8.firebaseio.com",
  projectId: "react-assignment-172c8",
  storageBucket: "react-assignment-172c8.appspot.com",
  messagingSenderId: "288206359024",
  appId: "1:288206359024:web:d5b38f67ddcc9b7a2ff535",
  measurementId: "G-J6Y8NDQ98X",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
