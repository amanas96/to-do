// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Protects dashboard from unauthenticated users
const RequireAuth = ({ user, children }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

// Login Wrapper to handle login and redirection
function LoginWrapper({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    if (username.trim() === "") return;
    localStorage.setItem("task_tracker_username", username);
    setCurrentUser(username);
    toast.success("Login successful");
    navigate("/dashboard");
  };

  useEffect(() => {
    // If already logged in and visiting /login manually, redirect
    if (currentUser && window.location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return <Login onLogin={handleLogin} />;
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Delay routing until user is loaded

  useEffect(() => {
    const stored = localStorage.getItem("task_tracker_username");
    if (stored && stored.trim() !== "") {
      setCurrentUser(stored);
    }
    setLoading(false); // Now routing can happen
  }, []);

  if (loading) return <div>Loading...</div>; // Optional: Add a spinner here

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={1500} />

      <Routes>
        {/* Home route redirects based on auth */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <LoginWrapper
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth user={currentUser}>
              <Dashboard
                username={currentUser}
                onLogout={() => {
                  localStorage.removeItem("task_tracker_username");
                  setCurrentUser(null);
                  toast.success("Logged out successfully");
                }}
              />
            </RequireAuth>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
