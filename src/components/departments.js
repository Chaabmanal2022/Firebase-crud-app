// Importation des hooks `useEffect` et `useState` de React pour gérer l'état et les effets de bord
import { useEffect, useState } from "react";
// Importation de React pour permettre l'utilisation des composants React
import React from "react";
// Importation de la configuration de Firebase, ici l'instance `db` pour interagir avec Firestore
import { db } from "../config/firebase";
// Importation des fonctions nécessaires de Firebase pour interagir avec Firestore
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
// Importation du hook `useNavigate` de `react-router-dom` pour gérer la navigation vers d'autres pages de l'application
import { useNavigate } from "react-router-dom";
// Importation du fichier CSS pour le style spécifique de la page des départements
import "../styles/departments.css";
// Importation de la fonction `deleteDepartment` depuis le service `departmentService` pour gérer la suppression d'un département
import { deleteDepartment } from "../services/departmentService";
import { logout } from "../services/departmentService";


function Departments() {
    // Déclare l'état pour la liste des départements
    const [departmentList, setDepartmentList] = useState([]);
    // État pour stocker le terme de recherche de l'utilisateur
    const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
    // État pour gérer le code sélectionné dans le filtre
    const [selectedCode, setSelectedCode] = useState(""); // État pour la sélection du code
    // État pour afficher ou non la confirmation de suppression
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);
    // Référence à la collection "departments" dans Firestore
    const departmentsCollectionRef = collection(db, "departments");
    // État pour afficher ou non le popup de détails d'un département
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    // État pour stocker les informations du département sélectionné
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartmentList = async () => {
            try {
                const data = await getDocs(departmentsCollectionRef);
                const filteredData = data.docs.map((doc) => {
                    const department = doc.data();
                    return {
                        id: doc.id,
                        nom: department["nom"],
                        code: department["code"],
                        nombre_employes: department["nombre_employes"],
                        emplacement: department["emplacement"],
                        chef_departement: department["chef_departement"],
                    };
                });
                setDepartmentList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getDepartmentList();
    }, []);

    // Filtrer les départements en fonction du nom et du code
    const filteredDepartments = departmentList.filter((department) => {
        return (
            department.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCode === "" || department.code === selectedCode)
        );
    });

    const openConfirmationPopup = (id) => {
        setDepartmentToDelete(id);
        setShowConfirmation(true);
    };

    const closeConfirmationPopup = () => {
        setShowConfirmation(false);
        setDepartmentToDelete(null);
    };

    // Fonction asynchrone qui confirm la suppression d'un département,
    // effectue la suppression dans la base de données et met à jour la liste des départements affichée
    const confirmDeleteDepartment = async () => {
        try {
            if (departmentToDelete) {
                await deleteDepartment(departmentToDelete);
                setDepartmentList((prevList) =>
                    prevList.filter((department) => department.id !== departmentToDelete)
                );
                closeConfirmationPopup();
            }
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    // Fonction asynchrone pour afficher les détails d'un département
    const showDepartment = async (id) => {
        try {
            const docRef = doc(db, "departments", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSelectedDepartment(docSnap.data());
                setShowDetailsPopup(true);
            } else {
                console.log("Aucun document trouvé pour cet ID :", id);
            }
        } catch (err) {
            console.error("Erreur lors de la récupération du département :", err);
        }
    };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Rediriger vers la page de connexion
    } catch (error) {
      alert(error.message);
    }
  };

    // Extraire tous les codes uniques pour les options de filtre
    const uniqueCodes = [...new Set(departmentList.map(department => department.code))];

    return (
        <div>
            <h2>Vue d'ensemble des Départements</h2>
            <input
                type="search"
                placeholder="Rechercher un département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="code-select">
                <option value="">Sélectionnez un code</option>
                {uniqueCodes.map((code, index) => (
                    <option key={index} value={code}>
                        {code}
                    </option>
                ))}
            </select>

            <button className="add-button" onClick={() => navigate("/add-department")}>
                Ajouter un département
            </button>

            <table border="1">
                <thead>
                    <tr>
                        <th className="centered">Département</th>
                        <th className="centered">Code</th>
                        <th className="centered">Chef</th>
                        <th className="centered">Nombre d'Employés</th>
                        <th className="centered">Emplacement</th>
                        <th colSpan="3" className="centered">Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDepartments.map((department) => (
                        <tr key={department.id}>
                            <td className="centered">{department.nom}</td>
                            <td className="centered">{department.code}</td>
                            <td className="centered">{department.chef_departement}</td>
                            <td className="centered">{department.nombre_employes}</td>
                            <td className="centered">{department.emplacement}</td>
                            <td>
                                <button
                                    onClick={() => openConfirmationPopup(department.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                            <td>
                                <button
                                    className="edit"
                                    onClick={() => navigate(`/edit-department/${department.id}`)}
                                >
                                    Modifier
                                </button>
                            </td>
                            <td>
                                <button
                                    className="show"
                                    onClick={() => showDepartment(department.id)}
                                >
                                    Show
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

   {/* Bouton Logout */}
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>

            {showDetailsPopup && selectedDepartment && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Détails du département</h3>
                        <p><strong>Nom :</strong> {selectedDepartment.nom}</p>
                        <p><strong>Code :</strong> {selectedDepartment.code}</p>
                        <p><strong>Chef de département :</strong> {selectedDepartment.chef_departement}</p>
                        <p><strong>Nombre d'employés :</strong> {selectedDepartment.nombre_employes}</p>
                        <p><strong>Emplacement :</strong> {selectedDepartment.emplacement}</p>
                        <div className="popup-actions">
                            <button onClick={() => setShowDetailsPopup(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Confirmation</h3>
                        <p>Êtes-vous sûr de vouloir supprimer ce département ?</p>
                        <div className="popup-actions">
                            <button onClick={confirmDeleteDepartment}>Oui</button>
                            <button onClick={closeConfirmationPopup}>Non</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Departments;
