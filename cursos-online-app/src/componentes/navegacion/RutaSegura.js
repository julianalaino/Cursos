import React from "react";
import {  Navigate } from "react-router-dom";
import { useStateValue } from "../../contexto/store";

function RutaSegura({ children, redirectTo }) {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return  sesionUsuario ? (sesionUsuario.autenticado == true ? children : <Navigate to={redirectTo} />) : <Navigate to={redirectTo} />;
}

export default RutaSegura;
