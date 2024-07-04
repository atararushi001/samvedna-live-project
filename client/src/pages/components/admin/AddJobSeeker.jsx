import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_API_URL;

const AddJobSeeker = ({ setView }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    dob: "",
    gender: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    contactNumber: "",
    whatsappNumber: "",
    jobAlerts: false,
    homePhone: "",
    addHomePhone: "",
    qualification: "",
    educationSpecialization: "",
    experienceAndAppliance: "",
    yesNoQuestion: "",
    twoWheeler: false,
    threeWheeler: false,
    car: false,
    disabilityPercentage: "",
    specializationInDisability: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  useEffect(() => {
    fetch(`${API}/utils/qualifications`)
      .then((response) => response.json())
      .then((data) => {
        setQualifications(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (formData.qualification) {
      fetch(`${API}/utils/education-specialization/${formData.qualification}`)
        .then((response) => response.json())
        .then((data) => {
          setSpecializations(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.qualification]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (
      formData.yesNoQuestion === "yes" &&
      !formData.twoWheeler &&
      !formData.threeWheeler &&
      !formData.car
    ) {
      toast.error("Please select at least one vehicle type");
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
      setView("jobSeekers");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };
  return (
    <div className="add-job-seeker">
      <h1>Add Job Seeker</h1>
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
            type="text"
            id="username"
            name="username"
            placeholder="Enter Desired Username/ID"
            value={formData.username}
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
        </fieldset>

        <fieldset>
          <legend>Personal Data / Details *</legend>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />

          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Date of birth"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />

          <div className="input-group">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleInputChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleInputChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Address Information *</legend>

          <textarea
            id="permanentAddress"
            name="permanentAddress"
            placeholder="Permanent Address"
            onChange={handleInputChange}
            required
          ></textarea>

          <textarea
            id="currentAddress"
            name="currentAddress"
            placeholder="Current Address"
            onChange={handleInputChange}
            required
          ></textarea>

          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
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
            value={formData.state}
            onChange={handleInputChange}
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
            value={formData.city}
            onChange={handleInputChange}
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

          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal code"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <fieldset>
          <legend>Contact Information *</legend>

          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            placeholder="Enter WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            required
          />

          <div className="input-group">
            <input
              type="checkbox"
              id="jobAlerts"
              name="jobAlerts"
              onChange={handleInputChange}
            />
            <label htmlFor="jobAlerts">
              Do you want to receive SMS of Job Alerts?
            </label>
          </div>

          <input
            type="tel"
            id="homePhone"
            name="homePhone"
            placeholder="Home Phone"
            value={formData.homePhone}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            id="addHomePhone"
            name="addHomePhone"
            placeholder="Add another phone number"
            value={formData.addHomePhone}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <fieldset>
          <legend>Education Qualification *</legend>
          <label htmlFor="qualification">Qualification Level:</label>
          <select
            id="qualification"
            name="qualification"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select Qualification Level
            </option>
            {qualifications.map((qualification, index) => (
              <option
                key={`${qualification.qualification_name}-${index}`}
                value={qualification.qualification_id}
              >
                {qualification.qualification_name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Education Specialization</legend>
          <label htmlFor="educationSpecialization">
            Education Specialization:
          </label>
          <select
            id="educationSpecialization"
            name="educationSpecialization"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select Education Specialization
            </option>
            {specializations.map((specialization, index) => (
              <option
                key={`${specialization.education_specialization_name}-${index}`}
                value={specialization.education_specialization_id}
              >
                {specialization.education_specialization_name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend>Job Details *</legend>
          <textarea
            id="experienceAndAppliance"
            name="experienceAndAppliance"
            placeholder="Enter Experience and Appliance"
            value={formData.experienceAndAppliance}
            onChange={handleInputChange}
            required
          ></textarea>

          <div className="input-group col">
            <label htmlFor="yesNoQuestion" style={{ marginBottom: "5px" }}>
              Do you have Driving License?
            </label>
            <select
              id="yesNoQuestion"
              name="yesNoQuestion"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected>
                Select Your Answer
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {formData.yesNoQuestion === "yes" && (
            <div className="input-group">
              <input
                type="checkbox"
                id="twoWheeler"
                name="twoWheeler"
                checked={formData.twoWheeler}
                onChange={handleInputChange}
              />
              <label htmlFor="twoWheeler">Two-Wheeler</label>

              <input
                type="checkbox"
                id="threeWheeler"
                name="threeWheeler"
                checked={formData.threeWheeler}
                onChange={handleInputChange}
              />
              <label htmlFor="threeWheeler">Three-Wheeler</label>

              <input
                type="checkbox"
                id="car"
                name="car"
                checked={formData.car}
                onChange={handleInputChange}
              />
              <label htmlFor="car">Car</label>
            </div>
          )}
          <select
            name="disabilityPercentage"
            onChange={handleInputChange}
            required
          >
            <option value="" disabled selected>
              Select Percentage of Disability
            </option>
            <option value="40-45">40-45</option>
            <option value="45-50">45-50</option>
            <option value="50-55">50-55</option>
            <option value="55-60">55-60</option>
            <option value="60-65">60-65</option>
            <option value="65-70">65-70</option>
            <option value="70-75">70-75</option>
            <option value="75-80">75-80</option>
            <option value="80-85">80-85</option>
            <option value="85-90">85-90</option>
            <option value="90-95">90-95</option>
            <option value="95-100">95-100</option>
          </select>
          <input
            type="text"
            id="specializationInDisability"
            name="specializationInDisability"
            placeholder="Enter Specialization in Disability Area"
            value={formData.specializationInDisability}
            onChange={handleInputChange}
            required
          />
        </fieldset>

        <button
          type="submit"
          value="Register"
          className="btn btn-full"
          name="job_seekerRegisterButton"
        >
          Add
        </button>
      </form>
    </div>
  );
};

AddJobSeeker.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AddJobSeeker;
