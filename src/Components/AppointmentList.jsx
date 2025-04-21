import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const AppointmentList = ({ isAdmin }) => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = () => {
      const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

      
      if (isAdmin) {
        setAppointments(storedAppointments); 
      } else {
        const userAppointments = storedAppointments.filter(appt => appt.userEmail === user?.email);
        setAppointments(userAppointments); 
      }
    };

    fetchAppointments();
  }, [user, isAdmin]);

  const handleCancel = (id) => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
  
    const updatedAppointments = storedAppointments.filter(appt => appt.id !== id);
    
    
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    
    setAppointments(updatedAppointments);
  };

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>{isAdmin ? "All Appointments" : "My Appointments"}</h2>
      {appointments.length === 0 ? (
        <p style={styles.noAppointments}>No appointments found.</p>
      ) : (
        <Row>
          {appointments.map((appointment) => (
            <Col key={appointment.id} md={6} lg={4}>
              <Card style={styles.card}>
                <Card.Body>
                  <Card.Title>Dr. {appointment.doctorName}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {appointment.date} <br />
                    <strong>Time:</strong> {appointment.time} <br />
                    {isAdmin && (
                      <>
                        <strong>Patient:</strong> {appointment.userEmail}
                      </>
                    )}
                  </Card.Text>
                  {!isAdmin && (
                    <Button variant="danger" onClick={() => handleCancel(appointment.id)} style={styles.cancelBtn}>
                      Cancel
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  noAppointments: {
    fontSize: "18px",
    color: "#888",
  },
  card: {
    marginBottom: "20px",
    padding: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "left",
    transition: "transform 0.2s ease-in-out",
  },
  cancelBtn: {
    background: "#ff4d4d",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default AppointmentList;
