const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  getDoctorAppointments,
  getPatientAppointments,
} = require("../controllers/appointmentController");

// Book Appointment
router.post("/", bookAppointment);

// Admin - All Appointments
router.get("/", getAppointments);

// Doctor Appointments
router.get("/doctor/:doctorId", getDoctorAppointments);

// Patient Appointments
router.get("/patient/:patientId", getPatientAppointments);

module.exports = router;