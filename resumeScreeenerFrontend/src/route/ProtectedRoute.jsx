import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({element}) {

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/"} replace />;

  try {
    const decode = jwtDecode(token);
    let storedUser = JSON.parse(localStorage.getItem("user"));


    console.log(decode)
    console.log(storedUser)
    if (storedUser === null) {
      console.log("null")
      if (storedUser.id !== decode.userId) {
        return <Navigate to={"/"} replace />;
      }
    }
    else if (decode.userId !== storedUser.id) {
      console.log("going indide else if")
      return <Navigate to={"/"} replace />;
    }
    console.log("ele")
    return element;
  } catch (err) {
    console.log(err)
    console.log("User catch in");
  }
}

export default ProtectedRoute