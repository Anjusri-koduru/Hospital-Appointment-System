const express = require("express");
const router = express.Router();

const {
  createPatient,
  getPatients,
} = require("../controllers/patientController");

// Create Patient
router.post("/", createPatient);

// Get All Patients
router.get("/", getPatients);

module.exports = router;