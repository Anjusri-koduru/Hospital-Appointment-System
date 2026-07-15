const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    medicalHistory: [
      {
        disease: String,
        treatment: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);