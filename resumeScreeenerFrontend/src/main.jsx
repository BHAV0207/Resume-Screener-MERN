import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import { JobProvider } from "./store/JobContext.jsx";
import { NotificationProvider } from "./store/NotificationContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <JobProvider>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Toaster position="top-right" />
          <App />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </JobProvider>
);
