import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SessionState } from "../../context/SessionProvider";

const API = import.meta.env.VITE_API_URL;

const RecruiterRegister = () => {
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
    setRecruiterId,
    setJobSeekerId,
    setSelfEmployedId,
    navigate,
  ]);

  const [formData, setFormData] = useState({
    profilePicture: [],
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    designation: "",
    contactNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch(`${API}/controllers/recruiterRegister.php`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          navigate("/recruiter-login");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  };

  return (
    <>
      <div className="container">
        <section className="recruiters-register">
          <h1>
            <strong className="highlight-text">Recruiter</strong> Register
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleInputChange}
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
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Enter Your Company Name"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter Your Designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Your Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="profilePicture">Company Logo</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="btn"
              name="recruiterRegisterButton"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default RecruiterRegister;
