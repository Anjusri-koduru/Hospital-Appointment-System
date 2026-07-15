const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Register User
exports.registerUser = async (req, res) => {
  try {

    console.log("Register Request:", req.body);

    const { fullName, email, password, phone, gender, role } = req.body;

    // Check Email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create User
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      gender,
      role,
    });

    console.log("User Created:", user._id);

    // Create Patient Profile
    if (role === "Patient") {

      await Patient.create({
        user: user._id,
        age: 18,
        bloodGroup: "",
        address: "",
        emergencyContact: "",
      });

      console.log("Patient Profile Created");

    }

    // Create Doctor Profile
    if (role === "Doctor") {

      await Doctor.create({
        user: user._id,
        specialization: "General Physician",
        qualification: "MBBS",
        experience: 0,
        consultationFee: 0,
        availableDays: ["Monday"],
        availableTime: {
          start: "09:00",
          end: "17:00",
        },
        about: "",
      });

      console.log("Doctor Profile Created");

    }

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    let patientId = null;
    let doctorId = null;

    if (user.role === "Patient") {

      const patient = await Patient.findOne({ user: user._id });

      if (patient) {
        patientId = patient._id;
      }

    }

    if (user.role === "Doctor") {

      const doctor = await Doctor.findOne({ user: user._id });

      if (doctor) {
        doctorId = doctor._id;
      }

    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
      patientId,
      doctorId,
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};