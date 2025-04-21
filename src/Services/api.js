import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const bookAppointment = (appointmentData) => axios.post(`${API_URL}/appointments`, appointmentData);
export const getAppointments = () => axios.get(`${API_URL}/appointments`);
export const cancelAppointment = (id) => axios.delete(`${API_URL}/appointments/${id}`);
