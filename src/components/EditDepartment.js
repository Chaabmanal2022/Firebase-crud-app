import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditDepartment() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        nom: "",
        code: "",
        nombre_employes: "",
        emplacement: "",
        chef_departement: "",
    });

    // Récupérer les données du département
    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const docRef = doc(db, "departments", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDepartment(docSnap.data());
                } else {
                    console.error("Aucun département trouvé");
                }
            } catch (err) {
                console.error("Erreur lors de la récupération :", err);
            }
        };
        fetchDepartment();
    }, [id]);

    // Mettre à jour les données du département
    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "departments", id);
            await updateDoc(docRef, department);
            navigate("/departments"); // Redirige vers la liste après modification
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
        }
    };

    return (
        <div>
            <h1>Modifier un département</h1>
            <form>
                <input
                    type="text"
                    placeholder="Nom"
                    value={department.nom}
                    onChange={(e) => setDepartment({ ...department, nom: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Code"
                    value={department.code}
                    onChange={(e) => setDepartment({ ...department, code: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Nombre d'employés"
                    value={department.nombre_employes}
                    onChange={(e) =>
                        setDepartment({ ...department, nombre_employes: parseInt(e.target.value) })
                    }
                />
                <input
                    type="text"
                    placeholder="Emplacement"
                    value={department.emplacement}
                    onChange={(e) =>
                        setDepartment({ ...department, emplacement: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Chef de département"
                    value={department.chef_departement}
                    onChange={(e) =>
                        setDepartment({ ...department, chef_departement: e.target.value })
                    }
                />
                <button type="button" onClick={handleUpdate}>
                    Enregistrer
                </button>
                <button type="button" onClick={() => navigate("/departments")}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default EditDepartment;
