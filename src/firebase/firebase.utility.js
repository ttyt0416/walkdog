import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAOQ0W4TTUbonYpxQv5BezMDnE5xcjnDl8",
    authDomain: "walkdog-9fe89.firebaseapp.com",
    projectId: "walkdog-9fe89",
    storageBucket: "walkdog-9fe89.appspot.com",
    messagingSenderId: "522711773481",
    appId: "1:522711773481:web:e45ea309dec0233c47c738"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();