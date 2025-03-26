import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const AxiosRegister = async () => {
    try {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

      if (!passwordRegex.test(password)) {
        setErr(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }

      console.log(name);
      console.log(email);
      console.log(password);
      console.log(type);

      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
        type,
      });

      setSuccess("Registration successful!");
      setErr("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setName("");
      setEmail("");
      setType("");
      setPassword("");
    } catch (err) {
      setErr("Registration failed. Please try again.");
      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  

  return (
    <AuthContext.Provider
      value={{
        AxiosRegister,
        success,
        err,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        type,
        setType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

