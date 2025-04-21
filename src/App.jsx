import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import CalendarComponent from "./components/Calendar"; 
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";


const initializeAdmin = () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

 
  const adminExists = users.some((user) => user.email === "admin@example.com");

  if (!adminExists) {
    users.push({ email: "admin@example.com", password: "admin123", role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));
  }
};


initializeAdmin();

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/calendar" element={<CalendarComponent />} /> 
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;