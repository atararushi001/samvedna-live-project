import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const { loginState, userDetails, loginData, setLoginState } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    }
  }, [navigate, loginState, userDetails]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API}/recruiter/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setLoginState(true);
      loginData(data.user);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="container">
        <section className="recruiters-login">
          <h1>Recruiter&apos;s Login</h1>
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
            <Link to="/recruiter/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export default RecruiterLogin;
