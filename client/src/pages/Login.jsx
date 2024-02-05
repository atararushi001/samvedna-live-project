import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SessionState } from "../context/SessionProvider";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const { setIsLoggedIn, setRecruiterId, setJobSeekerId, setSelfEmployedId } =
    SessionState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/utils/checkLogin.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (data.is_logged_in) {
          setIsLoggedIn(true);
          if (data.recruiters_id) {
            setRecruiterId(data.recruiters_id);
            navigate("/recruiter-dashboard");
          } else if (data.job_seekers_id) {
            setJobSeekerId(data.job_seekers_id);
            navigate("/job-seeker-dashboard");
          } else if (data.self_employed_id) {
            setSelfEmployedId(data.self_employed_id);
            navigate("/self-employed-dashboard");
          }
        } else {
          setIsLoggedIn(false);
          setJobSeekerId(null);
          setRecruiterId(null);
          setSelfEmployedId(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    setIsLoggedIn,
    setJobSeekerId,
    setRecruiterId,
    setSelfEmployedId,
    navigate,
  ]);

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
