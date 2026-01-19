import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import AdminLayout from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import PostJobs from "./components/PostJobs";
import PostedJobs from "./components/PostedJobs";
import AllResumes from "./components/AllResumes";
import UserLayout from "./pages/UserPage";
import ActiveJobs from "./components/ActiveJobs";
import JobCandidates from "./components/JobCandidates";
import Profile from "./components/Profile";
import UserDashboard from "./UserComponents/UserDashboard";
import BrowseJobs from "./UserComponents/BrowseJobs";
import Applications from "./UserComponents/Applications";
import NotificationsPage from "./pages/NotificationsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin" element={<AdminLayout />} />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="post-jobs" element={<PostJobs />} />
          <Route path="posted-jobs" element={<PostedJobs />} />
          <Route path="all-resumes" element={<AllResumes />} />
          <Route path="active-jobs" element={<ActiveJobs />} />
          <Route path="posted-jobs/:id" element={<JobCandidates />} />
          <Route path="active-jobs/:id" element={<JobCandidates />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<Profile />} />

        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user" element={<UserLayout />} />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="browse-jobs" element={<BrowseJobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<Profile />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
