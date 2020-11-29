import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFYfiKeovqEJLVXlHzRhrK8ckzdbgZZyA",
  authDomain: "project-tracker-chat.firebaseapp.com",
  databaseURL: "https://project-tracker-chat.firebaseio.com",
  projectId: "project-tracker-chat",
  storageBucket: "project-tracker-chat.appspot.com",
  messagingSenderId: "87339064926",
  appId: "1:87339064926:web:d3b45612f7405732749ecf",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
