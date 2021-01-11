import firebase from 'firebase';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyB-1LTstPBZpUEsNLPYpXTLHQTAQ9r1pl4', // FIXME Variableise me!
  authDomain: 'react-firebase-jameslnewell.firebaseapp.com',
  databaseURL: 'https://react-firebase-jameslnewell.firebaseio.com',
  projectId: 'react-firebase-jameslnewell',
  storageBucket: 'react-firebase-jameslnewell.appspot.com',
  messagingSenderId: '575536381680',
});
