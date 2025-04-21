import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import DoctorList from "../components/DoctorList";
import Analytics from "../components/Analytics";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null; 

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <Row>
        <Col md={6}>
          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>Manage Doctors</Card.Title>
              <DoctorList isAdmin={true} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={styles.card}>
            <Card.Body>
              <Card.Title>Appointment Analytics</Card.Title>
              <Analytics />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: "50px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
  card: {
    marginBottom: "20px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
};

export default AdminDashboard;
