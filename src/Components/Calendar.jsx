import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const availableSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

const CalendarComponent = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [bookedAppointments, setBookedAppointments] = useState([]);

  
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setBookedAppointments(storedAppointments);
  }, []);

  
  const getBookedSlots = () => {
    return bookedAppointments
      .filter((appt) => appt.date === date.toDateString())
      .map((appt) => appt.time);
  };

  const handleBooking = (timeSlot) => {
    if (!user) {
      alert("Please log in to book an appointment.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      userEmail: user.email,
      doctorName: "Dr. John Doe", 
      date: date.toDateString(),
      time: timeSlot,
    };

    const updatedAppointments = [...bookedAppointments, newAppointment];
    setBookedAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert(`Appointment booked for ${date.toDateString()} at ${timeSlot}`);
  };

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>Book an Appointment</h2>

      {/* Calendar for date selection */}
      <div style={styles.calendarContainer}>
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Display available slots */}
      <h3 style={styles.subHeading}>Available Slots for {date.toDateString()}</h3>
      <div style={styles.slotsContainer}>
        {availableSlots.map((timeSlot) => (
          <Button
            key={timeSlot}
            style={{
              ...styles.slotButton,
              backgroundColor: getBookedSlots().includes(timeSlot) ? "#ff4d4d" : "#28a745",
              cursor: getBookedSlots().includes(timeSlot) ? "not-allowed" : "pointer",
            }}
            disabled={getBookedSlots().includes(timeSlot)}
            onClick={() => handleBooking(timeSlot)}
          >
            {timeSlot}
          </Button>
        ))}
      </div>
    </Container>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  heading: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#333" },
  subHeading: { fontSize: "20px", fontWeight: "bold", marginTop: "20px", color: "#555" },
  calendarContainer: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  slotsContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" },
  slotButton: {
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    transition: "0.3s",
  },
};

export default CalendarComponent;
