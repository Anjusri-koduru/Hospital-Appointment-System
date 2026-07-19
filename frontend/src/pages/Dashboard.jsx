import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const doctorRes = await axios.get("https://hospital-backend-72gn.onrender.com/api/doctors");
      const patientRes = await axios.get("https://hospital-backend-72gn.onrender.com/api/patients");
      const appointmentRes = await axios.get("https://hospital-backend-72gn.onrender.com/api/appointments");

      setDoctors(doctorRes.data.doctors);
      setPatients(patientRes.data.patients);
      setAppointments(appointmentRes.data.appointments);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-5">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{doctors.length}</h3>
              <h5>Total Doctors</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{patients.length}</h3>
              <h5>Total Patients</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{appointments.length}</h3>
              <h5>Total Appointments</h5>
            </div>
          </div>
        </div>

      </div>

      <br />

      <h3 className="mb-3">
        Recent Appointments
      </h3>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {appointments.map((item) => (

            <tr key={item._id}>

              <td>
                {item.doctor?.user?.fullName}
              </td>

              <td>
                {item.patient?.user?.fullName}
              </td>

              <td>
                {new Date(item.appointmentDate).toLocaleDateString()}
              </td>

              <td>
                {item.appointmentTime}
              </td>

              <td>
                {item.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Dashboard;