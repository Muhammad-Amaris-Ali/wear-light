import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDEFk4ie6rhl8IigNawcN_YlEuHldyCtIs",
  authDomain: "air-wear.firebaseapp.com",
  projectId: "air-wear",
  storageBucket: "air-wear.appspot.com",
  messagingSenderId: "597518549338",
  appId: "1:597518549338:web:339bc7fc7d8f348ba5b363",
  measurementId: "G-18178WRVS0"
});

export default app;