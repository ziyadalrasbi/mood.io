// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase-admin/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2bHyYmGh6PtM76lj-4FZu-EwWNRHtUTI",
  authDomain: "mood-io-be1cc.firebaseapp.com",
  projectId: "mood-io-be1cc",
  storageBucket: "mood-io-be1cc.appspot.com",
  messagingSenderId: "159561548589",
  appId: "1:159561548589:web:9148d9531100bcc6d609a4",
  measurementId: "G-R0QQ53XLDE"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };