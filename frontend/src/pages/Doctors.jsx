import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Doctors() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {

      const { data } = await axios.get(
        "https://hospital-backend-72gn.onrender.com/api/doctors"
      );

      setDoctors(data.doctors);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Our Doctors
      </h2>

      <div className="row">

        {doctors.map((doctor) => (

          <div className="col-md-4 mb-4" key={doctor._id}>

            <div className="card shadow">

              <div className="card-body">

                <h4>
                  {doctor.user?.fullName}
                </h4>

                <p>
                  <b>Specialization :</b>
                  {" "}
                  {doctor.specialization}
                </p>

                <p>
                  <b>Qualification :</b>
                  {" "}
                  {doctor.qualification}
                </p>

                <p>
                  <b>Experience :</b>
                  {" "}
                  {doctor.experience} Years
                </p>

                <p>
                  <b>Consultation Fee :</b>
                  ₹{doctor.consultationFee}
                </p>

                <Link
                  to="/appointment"
                  className="btn btn-primary"
                >
                  Book Appointment
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Doctors;