// Permet de naviguer entre les pages.
import { useNavigate } from "react-router-dom";
// Importe les configurations Firebase et Google Auth.
import { auth, googleProvider } from '../config/firebase';
// Méthodes d'authentification Firebase.
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
// Gestion de l'état local dans le composant.
import { useState } from "react";
// Affichage de notifications utilisateur.
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer le style de React Toastify
// Styles CSS personnalisés pour le formulaire d'authentification.
import '../styles/auth.css';

// Déclaration du composant Auth
export const Auth = () => {
  // Hook pour rediriger les utilisateurs vers d'autres pages.
  const navigate = useNavigate();
  // État pour stocker l'email de l'utilisateur.
  const [email, setEmail] = useState("");
  // État pour stocker le mot de passe de l'utilisateur.
  const [password, setPassword] = useState("");

  // Debug : Affiche l'email de l'utilisateur connecté si disponible.
  console.log(auth?.currentUser?.email);


  // Fonction pour inscrire un utilisateur
  const signIn = async () => {
    try {
      // Crée un nouvel utilisateur avec Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Notification de succès
      toast.success("✅ Account successfully created!", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/departments"); // Rediriger après l'inscription
    } catch (err) {
      // Notification d'erreur avec la raison
      toast.error(`❌ Error: ${err.message}`, {
        className: "custom-toast-error",
        bodyClassName: "custom-toast-body",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Fonction pour se connecter avec Google
  const signInWithGoogle = async () => {
    try {
       await signInWithPopup(auth, googleProvider);
       // Redirigez l'utilisateur vers /departments après la connexion
       navigate("/departments");
    }catch(err ){
       console.log(err);
    }
  };

    // Fonction pour déconnecter l'utilisateur
    const logout = async () => {
    try {
       await signOut(auth);
    }catch(err ){
       console.log(err);
    }
  };


  return (
    <>
      {/* Conteneur Toastify */}
      <ToastContainer />
      <form>
        <h2 className="auth-title">Sign Up</h2>
        <input
          type="text"
          placeholder="Email ..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password ..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={signIn}>
          Sign In
        </button>
        {/* Bouton pour l'inscription avec Google */}
<div className="google-signin">
  <button type="button" onClick={signInWithGoogle}>
    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
         alt="Google Logo" />
    Sign Up with Google
  </button>
</div>

      </form>
    </>
  );
};
