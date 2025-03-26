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
      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
        type,
      });

      setSuccess("Registration successful!");
      setErr("");
      setName("");
      setEmail("");
      setType("");
      setPassword("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setErr("Registration failed. Please try again.");
      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  const AxiosLogin = async (navigate) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      setSuccess("Login successful!");
      setErr("");
      setEmail("");
      setPassword("");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setErr("Failed to login");
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
        AxiosLogin,
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
