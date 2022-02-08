import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuka6-PgrFWlU7oS5rcrUQxewCfOC8zL8",
  authDomain: "moviesroom-1e942.firebaseapp.com",
  projectId: "moviesroom-1e942",
  storageBucket: "moviesroom-1e942.appspot.com",
  messagingSenderId: "59904922539",
  appId: "1:59904922539:web:3481d8c14bae316e6f78ee",
  measurementId: "G-MZFJH6HZKC",
  databaseURL: "https://moviesroom-1e942-default-rtdb.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const firedb = firebaseApp.database().ref("/movies-list");
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, firedb };
export default db;
