// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedRoute = ({ children }) => {
  // Vérifiez si un utilisateur est authentifié via Firebase
  const user = auth.currentUser;

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page d'authentification
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur est connecté, afficher la page protégée
  return children;
};

export default ProtectedRoute;
