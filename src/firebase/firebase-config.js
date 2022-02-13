/*Firebase configuration */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDPUwc4YNUAV6FLJxe6tkd7j8avS5EY2Vg",
    authDomain: "journalapp-react-2a49c.firebaseapp.com",
    projectId: "journalapp-react-2a49c",
    storageBucket: "journalapp-react-2a49c.appspot.com",
    messagingSenderId: "18584109474",
    appId: "1:18584109474:web:64640b8cb6b1432a4d32fb"
  };
  
firebase.initializeApp(firebaseConfig);

/**Se construyen y se exportan los objetos a utilizar por cada llamada a firebase */
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}