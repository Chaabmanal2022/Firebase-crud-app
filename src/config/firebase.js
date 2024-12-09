// Importe la fonction `initializeApp` de Firebase pour initialiser l'application Firebase avec une configuration spécifique.
import {initializeApp } from "firebase/app";
// Importe `getAuth` pour gérer l'authentification et `GoogleAuthProvider` pour utiliser l'authentification via Google.
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
// Importe `getFirestore` pour accéder à Firestore, la base de données NoSQL de Firebase.
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "react-contact-39e77.firebaseapp.com",
  projectId: "react-contact-39e77",
  storageBucket: "react-contact-39e77.firebasestorage.app",
  messagingSenderId: "437379795979",
  appId: "1:437379795979:web:caa24bb3914a22575dcb0e"
};


// Initialise l'application Firebase avec la configuration fournie, en établissant la connexion avec le backend Firebase.
const app = initializeApp(firebaseConfig);
// Crée une instance du service d'authentification Firebase basée sur l'application initialisée et l'exporte.
export const auth = getAuth(app);
// Crée une instance du fournisseur d'authentification Google et l'exporte pour être utilisée dans d'autres parties de l'application.
export const googleProvider = new GoogleAuthProvider();
// Crée une instance de Firestore pour accéder à la base de données et l'exporte.
export const db = getFirestore(app);
