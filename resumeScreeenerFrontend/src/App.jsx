import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              role="admin"
             element={<AdminPage></AdminPage>}></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user" element={<UserPage></UserPage>}></ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
