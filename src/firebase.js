// Initialize Firebase
import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/database';
const config = {
  apiKey: 'AIzaSyCl1o8FdxceRaU1NQ7-7yOVUOtfAMWFu18',
  authDomain: 'tracklab-295e6.firebaseapp.com',
  databaseURL: 'https://tracklab-295e6.firebaseio.com',
  projectId: 'tracklab-295e6',
  storageBucket: '',
  messagingSenderId: '659365138225'
};
firebase.initializeApp(config);
const db = firebase.firestore();
// const db = firebase.database();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;
