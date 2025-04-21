import React from "react";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Analytics = () => {
  const data = {
    labels: ["Cardiologist", "Dermatologist", "Pediatrician", "Orthopedic"],
    datasets: [
      {
        label: "Appointments",
        data: [5, 10, 3, 7], 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <Container style={styles.container}>
      <h3 style={styles.heading}>Booking Analytics</h3>
      <Bar data={data} />
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: "20px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
};

export default Analytics;
