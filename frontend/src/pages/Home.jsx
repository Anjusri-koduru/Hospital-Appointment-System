import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5 pt-5">
      <h1 className="display-4 fw-bold text-primary">
        Hospital Appointment System
      </h1>

      <p className="lead mt-3">
        Book appointments with doctors quickly and easily.
      </p>

      <div className="mt-4">
        <Link to="/register" className="btn btn-primary me-3">
          Register
        </Link>

        <Link to="/login" className="btn btn-success">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;