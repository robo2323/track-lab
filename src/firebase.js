// Initialize Firebase
import firebase from 'firebase/app';
import '@firebase/firestore';
const config = {
  apiKey: 'AIzaSyAInFdm3hEpZyLDAXhpZisLoD9PJg7Ql_U',
  authDomain: 'track-lab.firebaseapp.com',
  databaseURL: 'https://track-lab.firebaseio.com',
  projectId: 'track-lab',
  storageBucket: 'track-lab.appspot.com',
  messagingSenderId: '670445857191',
  timestampsInSnapshots: true
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export default db;
