import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const MatrimonyRegister = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

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
    profilePicture: [],
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, [e.target.name]: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
      return;
    }

    if (formData.dob > new Date().toISOString().split("T")[0]) {
      toast.error("Date of Birth cannot be in the future");
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(formData.dob).getFullYear();

    if (currentYear - birthYear < 18) {
      toast.error("You must be at least 18 years old to register");
      return;
    }

    const newFormData = new FormData();

    for (const key in formData) {
      if (key === "profilePicture") {
        for (let i = 0; i < formData.profilePicture.length; i++) {
          newFormData.append("profilePicture", formData.profilePicture[i]);
        }
      } else {
        newFormData.append(key, formData[key]);
      }
    }

    const response = await fetch(`${API}/matrimony/register`, {
      method: "POST",
      body: newFormData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.dismiss();
      toast.success(data.message);
      navigate("/matrimony-login");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="container">
      <section className="matrimony-register">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Registration
        </h1>

        <Link to="/matrimony-login" className="forgot-password">
          Already have an account? Login here
        </Link>
        <form onSubmit={handleSubmit}>
          <p>
            <strong>Note:</strong> First Photo will be your display picture,
            upload upto 3 photos
          </p>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            multiple={3}
            onChange={handleInputChange}
            accept="image/*"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Your Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <div className="input-group col">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default MatrimonyRegister;
