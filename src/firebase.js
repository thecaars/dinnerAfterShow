import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvCHi6dGHEBYlxENNHNUVrBNAfxrD2OdU",
    authDomain: "dinneraftershow.firebaseapp.com",
    databaseURL: "https://dinneraftershow.firebaseio.com",
    projectId: "dinneraftershow",
    storageBucket: "",
    messagingSenderId: "641119653852",
    appId: "1:641119653852:web:db89e0e85fd3dd34"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;