import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
      <section className="login-type-container">
        <div className="login-type">
          <h1>Are you Recruiter?</h1>
          <Link to="/recruiter-login">
            <button className="btn">Recruiter Login</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="login-type">
          <h1>Are you a Job Seeker?</h1>
          <Link to="/job-seeker-login">
            <button className="btn btn-outline">Job Seeker Login</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
