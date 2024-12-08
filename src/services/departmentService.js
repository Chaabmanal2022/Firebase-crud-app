import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth, signOut } from "firebase/auth";

// Fonction pour supprimer un département
export const deleteDepartment = async (id) => {
    try {
        const departmentDoc = doc(db, "departments", id);
        await deleteDoc(departmentDoc);
        console.log(`Département avec l'ID ${id} supprimé avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        throw err; // Propager l'erreur pour une meilleure gestion
    }
};


/**
 * Ajoute un nouveau département à la collection "departments".
 * @param {Object} newDepartment - Les données du département à ajouter.
 */
export const handleAddDepartment = async (newDepartment) => {
    try {
        const departmentsCollectionRef = collection(db, "departments");
        await addDoc(departmentsCollectionRef, newDepartment);
        return { success: true };
    } catch (err) {
        console.error("Erreur lors de l'ajout du département :", err);
        return { success: false, error: err };
    }
};

/**
 * Fonction pour déconnecter l'utilisateur.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté avec succès");
  } catch (error) {
    console.error("Erreur lors de la déconnexion : ", error.message);
    throw new Error("Une erreur s'est produite lors de la déconnexion.");
  }
};
