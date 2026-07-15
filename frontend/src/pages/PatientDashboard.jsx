import { useEffect, useState } from "react";
import axios from "axios";

function PatientDashboard() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {

    try {

      const patientId = localStorage.getItem("patientId");

      const { data } = await axios.get(
        `http://localhost:4000/api/appointments/patient/${patientId}`
      );

      setAppointments(data.appointments);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        🧑 Patient Dashboard
      </h2>

      <div className="card shadow">

        <div className="card-body">

          <h4 className="mb-3">
            My Appointments
          </h4>

          <table className="table table-bordered table-hover">

            <thead className="table-success">

              <tr>

                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>

              </tr>

            </thead>

            <tbody>

              {appointments.length === 0 ? (

                <tr>

                  <td colSpan="4" className="text-center">
                    No Appointments
                  </td>

                </tr>

              ) : (

                appointments.map((item) => (

                  <tr key={item._id}>

                    <td>{item.doctor?.user?.fullName}</td>

                    <td>{item.appointmentDate}</td>

                    <td>{item.appointmentTime}</td>

                    <td>{item.reason}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default PatientDashboard;