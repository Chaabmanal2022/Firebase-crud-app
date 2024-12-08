import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous que c'est bien importé
import { handleAddDepartment } from "../services/departmentService";

// Composant pour ajouter un département
function AddDepartment() {
    // État local pour stocker les informations du nouveau département
    const [newDepartment, setNewDepartment] = useState({
        nom: "",
        code: "",
        nombre_employes: "",
        emplacement: "",
        chef_departement: "",
    });

    // Hook pour naviguer entre les routes.
    const navigate = useNavigate();

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = async () => {
        // Appelle le service pour ajouter un département
        const result = await handleAddDepartment(newDepartment);
        if (result.success) {
            // Redirige vers la liste des départements si le succès est confirmé
            navigate("/departments");
        } else {
            // Affiche une erreur dans la console si l'ajout échoue
            console.error("Une erreur est survenue :", result.error);
        }
    };

    return (
        <div>
            <h1>Ajouter un département</h1>
            <form>
                <input
                    type="text"
                    placeholder="Nom"
                    value={newDepartment.nom}
                    onChange={(e) =>
                        setNewDepartment({ ...newDepartment, nom: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Code"
                    value={newDepartment.code}
                    onChange={(e) =>
                        setNewDepartment({ ...newDepartment, code: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Nombre d'employés"
                    value={newDepartment.nombre_employes}
                    onChange={(e) =>
                        setNewDepartment({
                            ...newDepartment,
                            nombre_employes: parseInt(e.target.value),
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Emplacement"
                    value={newDepartment.emplacement}
                    onChange={(e) =>
                        setNewDepartment({
                            ...newDepartment,
                            emplacement: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Chef de département"
                    value={newDepartment.chef_departement}
                    onChange={(e) =>
                        setNewDepartment({
                            ...newDepartment,
                            chef_departement: e.target.value,
                        })
                    }
                />
                <button type="button" onClick={onSubmit}>
                    Ajouter
                </button>
                <button type="button" onClick={() => navigate("/departments")}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default AddDepartment;
