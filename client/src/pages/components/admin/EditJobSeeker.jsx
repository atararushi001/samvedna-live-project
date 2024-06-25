import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const EditJobSeeker = ({ jobSeeker, setView }) => {
  const [formData, setFormData] = useState({
    email: jobSeeker.email,
    username: jobSeeker.username,
    password: "",
    name: jobSeeker.name,
    lastName: jobSeeker.lastName,
    dob: jobSeeker.dob,
    gender: jobSeeker.gender,
    permanentAddress: jobSeeker.permanentAddress,
    currentAddress: jobSeeker.currentAddress,
    city: jobSeeker.city,
    state: jobSeeker.state,
    postalCode: jobSeeker.postalCode,
    country: jobSeeker.country,
    contactNumber: jobSeeker.contactNumber,
    whatsappNumber: jobSeeker.whatsappNumber,
    jobAlerts: jobSeeker.jobAlerts,
    homePhone: jobSeeker.homePhone,
    addHomePhone: jobSeeker.addHomePhone,
    qualification: jobSeeker.qualification,
    educationSpecialization: jobSeeker.educationSpecialization,
    experienceAndAppliance: jobSeeker.experienceAndAppliance,
    yesNoQuestion: jobSeeker.yesNoQuestion,
    twoWheeler: jobSeeker.twoWheeler,
    threeWheeler: jobSeeker.threeWheeler,
    car: jobSeeker.car,
    disabilityPercentage: jobSeeker.disabilityPercentage,
    specializationInDisability: jobSeeker.specializationInDisability,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const { userDetails } = UserStore();

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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.loading("Updating Your Data, Please Wait...");

    if (formData.password && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const response = await fetch(
      `${API}/admin/update-job-seeker/${jobSeeker.job_seeker_id}`,
      {
        method: "PUT",
        headers: {
          "x-auth-token": userDetails.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      toast.dismiss();
      toast.success(responseData.message);
      setView("jobSeekers");
    } else {
      toast.dismiss();
      toast.error(responseData.message);
    }
  };

  return (
    <div className="edit-job-seeker">
      <h1>Edit Job Seeker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Desired Username/ID"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter New Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Date of birth"
          value={
            formData && formData.dob && !isNaN(new Date(formData.dob))
              ? new Date(formData.dob).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          required
        />
        <div className="input-group">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData && formData.gender === "male"}
            onChange={handleInputChange}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData && formData.gender === "female"}
            onChange={handleInputChange}
          />
          <label htmlFor="female">Female</label>
        </div>
        <textarea
          id="permanentAddress"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={formData.permanentAddress}
          onChange={handleInputChange}
          required
        ></textarea>
        <textarea
          id="currentAddress"
          name="currentAddress"
          placeholder="Current Address"
          value={formData.currentAddress}
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
        <select name="city" value={formData.city} onChange={handleInputChange}>
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
            checked={formData.jobAlerts}
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
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          required
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
        <select
          name="educationSpecialization"
          value={formData.educationSpecialization}
          onChange={handleInputChange}
          required
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
        <textarea
          id="experienceAndAppliance"
          name="experienceAndAppliance"
          placeholder="Enter Experience and Appliance"
          value={formData.experienceAndAppliance}
          onChange={handleInputChange}
          required
        ></textarea>
        <div className="input-group">
          <label htmlFor="yesNoQuestion" style={{ marginBottom: "5px" }}>
            Do you have Driving License?
          </label>
          <select
            id="yesNoQuestion"
            name="yesNoQuestion"
            value={formData.yesNoQuestion}
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
          value={formData.disabilityPercentage}
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
        <button
          type="submit"
          value="Update"
          className="btn btn-full"
          name="job_seekerUpdateButton"
        >
          Update
        </button>
      </form>
    </div>
  );
};

EditJobSeeker.propTypes = {
  jobSeeker: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
};

export default EditJobSeeker;
