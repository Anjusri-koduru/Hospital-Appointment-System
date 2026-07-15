const Doctor = require("../models/Doctor");

// Create Doctor Profile
exports.createDoctor = async (req, res) => {
  try {
    const {
      user,
      specialization,
      qualification,
      experience,
      consultationFee,
      availableDays,
      availableTime,
      about,
    } = req.body;

    // Check if doctor profile already exists
    const existingDoctor = await Doctor.findOne({ user });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile already exists",
      });
    }

    const doctor = await Doctor.create({
      user,
      specialization,
      qualification,
      experience,
      consultationFee,
      availableDays,
      availableTime,
      about,
    });

    res.status(201).json({
      success: true,
      message: "Doctor Profile Created Successfully",
      doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Doctors
exports.getDoctors = async (req, res) => {
  try {

    const doctors = await Doctor.find().populate(
      "user",
      "fullName email phone gender"
    );

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Doctor
exports.getDoctorById = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id)
      .populate("user");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};