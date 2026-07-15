const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// Create Doctor
router.post("/", createDoctor);

// Get All Doctors
router.get("/", getDoctors);

// Get Single Doctor
router.get("/:id", getDoctorById);

// Update Doctor
router.put("/:id", updateDoctor);

// Delete Doctor
router.delete("/:id", deleteDoctor);

module.exports = router;