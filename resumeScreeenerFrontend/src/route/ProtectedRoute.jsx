import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({role,  element }) {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  console.log("got token")

  try {
    const decoded = jwtDecode(token);
    console.log(decoded)
    // Check if stored user ID matches token
    if (decoded.type !== role) {
      localStorage.clear();
      return <Navigate to="/" replace />;
    }

    return element;
  } catch (err) {
    console.error("JWT Decode failed", err);
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
