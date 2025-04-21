import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavbarComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user); 

  useEffect(() => {
    setCurrentUser(user);
  }, [user]); 

  const handleLogout = () => {
    logout();
    setCurrentUser(null); 
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={styles.brand}>
          DocSlot
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" style={styles.toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <Nav.Link
                  as={Link}
                  to={currentUser?.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                  style={styles.link}
                >
                  Dashboard
                </Nav.Link>

                {currentUser?.role !== "admin" && (
                  <>
                    <Nav.Link as={Link} to="/appointments" style={styles.link}>
                      Book Appointment
                    </Nav.Link>
                    <Nav.Link as={Link} to="/calendar" style={styles.link}>
                      Calendar
                    </Nav.Link>
                  </>
                )}

                <Button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={styles.link}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={styles.link}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = {
  navbar: {
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    padding: "10px 20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
  },
  toggle: {
    border: "none",
    background: "#fff",
  },
  link: {
    color: "#fff",
    fontSize: "16px",
    margin: "0 10px",
    textDecoration: "none",
    transition: "0.3s",
  },
  logoutBtn: {
    background: "#fff",
    color: "#ff758c",
    border: "none",
    padding: "5px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default NavbarComponent;
