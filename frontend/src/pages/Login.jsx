import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {

      // Clear old login data
      localStorage.clear();

      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        user
      );

      alert(data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.patientId) {
        localStorage.setItem(
          "patientId",
          data.patientId
        );
      }

      if (data.doctorId) {
        localStorage.setItem(
          "doctorId",
          data.doctorId
        );
      }

      if (data.user.role === "Doctor") {
        navigate("/doctor-dashboard");
      }
      else if (data.user.role === "Patient") {
        navigate("/patient-dashboard");
      }
      else {
        navigate("/dashboard");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
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
                Login
              </h2>

              <form onSubmit={loginHandler}>

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter Email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter Password"
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;