import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  useEffect(() => {
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = `
      @keyframes colorChange {
        0% { color: white; }
        50% { color: #ffcc00; }
        100% { color: #ff6600; }
      }
      .color-transition {
        animation: colorChange 3s infinite alternate;
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={styles.homeContainer}>
      {/* Website Title */}
      <h1 style={styles.siteTitle}>DocSlot</h1>

      {/* Header Section */}
      <header style={styles.header}>
        <img
          src="https://images-platform.99static.com/eL72RY0hvt8-ZURXy0xAzDYsrkA=/500x500/top/smart/99designs-contests-attachments/59/59815/attachment_59815896"
          alt="Logo"
          style={styles.logo}
        />
      </header>

     
      <Container style={styles.content}>
        <h1 style={styles.blackText}>Welcome to DocSlot</h1>
        <p className="color-transition">
          Book your appointment with the best doctors in just a few clicks.
        </p>

       
        <div style={styles.authBox}>
          <h2 style={styles.authHeading}>Get Started</h2>
          <p style={styles.authText}>Join us and book your appointments hassle-free.</p>
          <div style={styles.btnGroup}>
            <Button variant="primary" href="/login" style={styles.button}>
              Login
            </Button>
            <Button variant="success" href="/register" style={styles.button}>
              Register
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  homeContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundImage:
      "url('https://t4.ftcdn.net/jpg/08/15/58/65/360_F_815586595_PJGF1V6kQBaUcNHgsx1dbnG7dAwIE2xY.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  siteTitle: {
    position: "absolute",
    top: "10px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "black", 
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    position: "absolute",
    top: "10px",
    left: "20px",
  },
  logo: {
    width: "70px", // Smaller logo size
  },
  content: {
    background: "rgba(0, 0, 0, 0.6)",
    padding: "40px",
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  blackText: {
    color: "black", 
  },
  authBox: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    display: "inline-block",
  },
  authHeading: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
  },
  authText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "transform 0.3s ease-in-out",
    borderRadius: "8px",
  },
};

export default Home;
