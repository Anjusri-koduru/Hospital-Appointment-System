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

        <a href="/register" className="btn btn-primary me-3">
          Register
        </a>

        <a href="/login" className="btn btn-success">
          Login
        </a>

      </div>

    </div>
  );
}

export default Home;