import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

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
    profilePicture: [],
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    designation: "",
    contactNumber: "",
    city: "",
    state: "",
    country: "",
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`${API}/utils/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`${API}/utils/states/${formData.country}`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetch(`${API}/utils/cities/${formData.state}`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.state]);

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

    const response = await fetch(`${API}/recruiter/register`, {
      method: "POST",
      body: data,
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success(responseData.message);
      navigate("/recruiter-login");
    } else {
      toast.error(responseData.message);
    }
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
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={`${country.name}-${index}`} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={`${state.name}-${index}`} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city, index) => (
                <option key={`${city.name}-${index}`} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <label htmlFor="profilePicture">Company Logo</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
            <p className="warning">
              jpg, png & gif file format only, max size &lt; 50 MB, 300x300
              pixel format
            </p>
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
