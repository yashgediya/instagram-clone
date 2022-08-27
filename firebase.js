import {initializeApp} from 'firebase/app';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: 'AIzaSyCIo9gwlDzFXosJdw5oZ82v67-MBFEZsFU',
  authDomain: 'instagram-clone-b87a3.firebaseapp.com',
  projectId: 'instagram-clone-b87a3',
  storageBucket: 'instagram-clone-b87a3.appspot.com',
  messagingSenderId: '773828384628',
  appId: '1:773828384628:web:9f455bae106df2d8ce7e21',
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
