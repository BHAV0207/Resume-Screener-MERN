// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthCOntext.jsx";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import { JobProvider } from "./store/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <JobProvider>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </JobProvider>
);
