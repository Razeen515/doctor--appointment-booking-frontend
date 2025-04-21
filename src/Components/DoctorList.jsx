import React, { useState } from "react";
import { Container, Card, Row, Col, Button, Modal, Form } from "react-bootstrap";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Dermatologist",
    photo: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    name: "Dr. Robert Brown",
    specialty: "Orthopedic Surgeon",
    photo: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

const DoctorList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");

  // Open booking modal
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setAppointmentDate("");
  };

  // booking confirmation
  const handleConfirmBooking = () => {
    if (appointmentDate.trim() === "") {
      alert("Please select a date for your appointment.");
      return;
    }
    alert(`Appointment booked with ${selectedDoctor.name} on ${appointmentDate}`);
    handleClose();
  };

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>Meet Our Doctors</h2>
      <Row style={styles.row}>
        {doctors.map((doctor) => (
          <Col key={doctor.id} md={6} lg={4} style={styles.col}>
            <Card style={styles.card}>
              <Card.Img variant="top" src={doctor.photo} style={styles.image} />
              <Card.Body>
                <Card.Title style={styles.name}>{doctor.name}</Card.Title>
                <Card.Text style={styles.specialty}>{doctor.specialty}</Card.Text>
                <Button variant="primary" onClick={() => handleBookAppointment(doctor)}>
                  Book Appointment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <>
              <p>
                <strong>Doctor:</strong> {selectedDoctor.name}
              </p>
              <p>
                <strong>Specialty:</strong> {selectedDoctor.specialty}
              </p>
              <Form>
                <Form.Group>
                  <Form.Label>Select Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
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
  row: {
    justifyContent: "center",
  },
  col: {
    marginBottom: "20px",
  },
  card: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    paddingBottom: "10px",
  },
  image: {
    height: "250px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#222",
  },
  specialty: {
    fontSize: "16px",
    color: "#777",
  },
};

export default DoctorList;
