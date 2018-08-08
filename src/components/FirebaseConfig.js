//import firebase from 'firebase';
import * as firebase from 'firebase'; // Version can be specified in package.json

var config = {
    apiKey: "AIzaSyDMLn0-8fUYTumzqcENJVTcMIC3nldAJjM",
    authDomain: "simplechattingapp-2ae48.firebaseapp.com",
    databaseURL: "https://simplechattingapp-2ae48.firebaseio.com",
    projectId: "simplechattingapp-2ae48",
    storageBucket: "simplechattingapp-2ae48.appspot.com",
    messagingSenderId: "1009071190263"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}