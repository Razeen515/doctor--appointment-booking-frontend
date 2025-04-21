import React, { useState, useEffect } from "react";
import { Container, ListGroup, Alert } from "react-bootstrap";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  return (
    <Container style={styles.container}>
      <h2 style={styles.heading}>Notifications</h2>
      {notifications.length === 0 ? (
        <Alert variant="info">No notifications available.</Alert>
      ) : (
        <ListGroup>
          {notifications.map((notification, index) => (
            <ListGroup.Item key={index} variant={notification.type === "cancel" ? "danger" : "success"}>
              {notification.message}
            </ListGroup.Item>
          ))}
        </ListGroup>
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

export default Notifications;
