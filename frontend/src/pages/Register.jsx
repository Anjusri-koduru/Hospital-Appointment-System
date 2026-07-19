import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    role: "Patient",
  });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post(
        "https://hospital-backend-72gn.onrender.com/api/auth/register",
        user
      );

      alert(data.message || "Registration Successful");

      setUser({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: "Patient",
      });

      // Registration success → Login Page
      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration Failed"
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
                Register
              </h2>

              <form onSubmit={registerHandler}>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Full Name"
                  name="fullName"
                  value={user.fullName}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  name="phone"
                  value={user.phone}
                  onChange={changeHandler}
                  required
                />

                <select
                  className="form-control mb-3"
                  name="gender"
                  value={user.gender}
                  onChange={changeHandler}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  className="form-control mb-3"
                  name="role"
                  value={user.role}
                  onChange={changeHandler}
                  required
                >
                  <option value="Patient">
                    Patient
                  </option>

                  <option value="Doctor">
                    Doctor
                  </option>

                </select>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;