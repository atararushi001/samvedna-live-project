import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const MatrimonyLogin = () => {
  const navigate = useNavigate();
  const { loginState, userDetails, loginData, setLoginState } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      } else if (userDetails.type === "Matrimony") {
        navigate("/matrimony-dashboard");
      }
    }
  }, [navigate, loginState, userDetails]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    const response = await fetch(`${API}/matrimony/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.dismiss();
      toast.success(data.message);
      setLoginState(true);
      loginData(data.user);
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="container">
      <section className="matrimony-login">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Login
        </h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email Address"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Your Password"
            required
          />
          <button className="btn btn-full" type="submit">
            Login
          </button>

          <Link to="/matrimony-register" className="forgot-password">
            Don&apos;t have an account? Register here
          </Link>
        </form>
      </section>
    </div>
  );
};

export default MatrimonyLogin;
