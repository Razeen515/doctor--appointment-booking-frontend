import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

     
      const userExists = existingUsers.some(user => user.email === formData.email);

      if (userExists) {
        setError("User already exists with this email!");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters!");
        setLoading(false);
        return;
      }

    
      const newUser = { ...formData, role: "patient" };
      const updatedUsers = [...existingUsers, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      setLoading(false);
    }, 1500);
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <h2 style={styles.title}>Create an Account</h2>
          <p style={styles.subtitle}>Sign up to get started</p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label style={styles.label}>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label style={styles.label}>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label style={styles.label}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </Form.Group>

            <Button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>

          <p style={styles.footerText}>
            Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "30px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "6px",
    background: "#667eea",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  footerText: {
    marginTop: "15px",
    color: "#777",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
