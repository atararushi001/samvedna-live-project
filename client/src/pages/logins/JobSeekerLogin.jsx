import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const JobSeekerLogin = () => {
  const navigate = useNavigate();
  const { loginData, userDetails, loginState, setLoginState } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, loginState, userDetails]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/job-seeker/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const responseData = await response.json();

      if (response.status === 200) {
        toast.success(responseData.message);
        setLoginState(true);
        loginData(responseData.user);
        navigate("/job-seeker-dashboard");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <section className="job-seeker-login">
          <h1>Job Seeker&apos;s Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="btn btn-full" name="recruiterLoginButton">
              Login
            </button>
            <Link to="/job-seeker/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export default JobSeekerLogin;
