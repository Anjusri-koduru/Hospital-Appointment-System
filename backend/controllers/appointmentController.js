const Appointment = require("../models/Appointment");

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Appointments (Admin)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "fullName email",
        },
      })
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "fullName email",
        },
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Appointments of One Doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.params.doctorId,
    })
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "fullName email phone",
        },
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Appointments of One Patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "fullName email",
        },
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};