import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        navigate("/recruiter-dashboard");
      }
    }
  }, [navigate]);
  
  return (
    <>
      <section className="register-type-container">
        <div className="register-type">
          <h1>Are you Recruiter?</h1>
          <Link to="/recruiter-register">
            <button className="btn">Recruiter Register</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="register-type">
          <h1>Are you a Job Seeker?</h1>
          <Link to="/job-seeker-register">
            <button className="btn btn-outline">Job Seeker Register</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
