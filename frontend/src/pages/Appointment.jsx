import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Appointment() {

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [appointment, setAppointment] = useState({
    doctor: "",
    patient: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {

    const patientId = localStorage.getItem("patientId");

    if (!patientId) {
      alert("Please Login as Patient First");
      navigate("/login");
      return;
    }

    setAppointment((prev) => ({
      ...prev,
      patient: patientId,
    }));

    getDoctors();

  }, []);

  const getDoctors = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:4000/api/doctors"
      );

      setDoctors(data.doctors);

    } catch (error) {

      console.log(error);

    }

  };

  const changeHandler = (e) => {

    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        "http://localhost:4000/api/appointments",
        appointment
      );

      if (data.success) {

        alert("Appointment Booked Successfully");

        navigate("/patient-dashboard");

      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Appointment Booking Failed"
      );

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Book Appointment
              </h2>

              <form onSubmit={submitHandler}>

                <select
                  className="form-control mb-3"
                  name="doctor"
                  value={appointment.doctor}
                  onChange={changeHandler}
                  required
                >

                  <option value="">
                    Select Doctor
                  </option>

                  {doctors.map((doctor) => (

                    <option
                      key={doctor._id}
                      value={doctor._id}
                    >
                      Dr. {doctor.user?.fullName} - {doctor.specialization}
                    </option>

                  ))}

                </select>

                <input
                  type="date"
                  className="form-control mb-3"
                  name="appointmentDate"
                  value={appointment.appointmentDate}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="time"
                  className="form-control mb-3"
                  name="appointmentTime"
                  value={appointment.appointmentTime}
                  onChange={changeHandler}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Reason"
                  name="reason"
                  value={appointment.reason}
                  onChange={changeHandler}
                  required
                />

                <button
                  className="btn btn-primary w-100"
                >
                  Book Appointment
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Appointment;