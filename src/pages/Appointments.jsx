import React, { useState, useEffect } from "react";
import { Container, Table, Alert } from "react-bootstrap";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
   
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>My Appointments</h2>
      {appointments.length === 0 ? (
        <Alert variant="info">No appointments booked yet.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.specialty}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: "50px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
};

export default Appointments;
