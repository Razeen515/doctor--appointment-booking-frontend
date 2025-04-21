import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DoctorList from "../components/DoctorList";
import AppointmentList from "../components/AppointmentList";
import CalendarComponent from "../components/Calendar"; 

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Your Dashboard</h2>

    
      <div style={styles.section}>
        <h3 style={styles.subheading}>Available Doctors</h3>
        <DoctorList />
      </div>

      
      <div style={styles.section}>
        <h3 style={styles.subheading}>Book Appointments</h3>
        <CalendarComponent /> 
      </div>



    
      <div style={styles.section}>
        <h3 style={styles.subheading}>Your Appointments</h3>
        <AppointmentList isAdmin={false} />
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  subheading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",                                                    
    color: "#555",
  },
};

export default Dashboard;


