import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      
      const matchedUser = storedUsers.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (matchedUser) {
        login(matchedUser);

        if (matchedUser.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard"); 
        }
      } else {
        setError("Invalid email or password!");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to your account</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
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
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>

          <p style={styles.footerText}>
            Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link>
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
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "0.3s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "16px",
    color: "#777",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
  footerText: {
    marginTop: "10px",
    color: "#777",
  },
  link: {
    color: "#ff758c",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
