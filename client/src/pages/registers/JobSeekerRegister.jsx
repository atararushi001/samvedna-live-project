import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const JobSeekerRegister = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    }
  }, [navigate, loginState, userDetails]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    const response = await fetch(`${API}/job-seeker/register`, {
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
      navigate("/job-seeker-login");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="container">
      <section className="job-seeker-register">
        <form method="post" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Account Information *</legend>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div className="btn-container">
              <button
                type="submit"
                value="Register"
                className="btn"
                name="job_seekerRegisterButton">
                Register
              </button>
              <button type="button" className="btn btn-delete">
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default JobSeekerRegister;
