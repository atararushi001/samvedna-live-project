import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const JobSeekerDashboard = () => {
  const { loginState, userDetails } = UserStore();
  const [jobSeeker, setJobSeeker] = useState({});

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [educationSpecialization, setEducationSpecialization] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, userDetails, loginState]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/job-seeker/by-id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (response.status === 200) {
        setJobSeeker(responseData.jobSeeker);
      } else {
        toast.error(responseData.message);
      }
    };

    fetchData();
  }, [userDetails]);

  useEffect(() => {
    fetch(`${API}/utils/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (jobSeeker && jobSeeker.country) {
      fetch(`${API}/utils/states/${jobSeeker.country}`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [jobSeeker]);

  useEffect(() => {
    if (jobSeeker && jobSeeker.state) {
      fetch(`${API}/utils/cities/${jobSeeker.state}`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [jobSeeker]);

  useEffect(() => {
    fetch(`${API}/utils/qualifications`)
      .then((response) => response.json())
      .then((data) => {
        setQualification(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (jobSeeker && jobSeeker.qualification) {
      fetch(`${API}/utils/education-specialization/${jobSeeker.qualification}`)
        .then((response) => response.json())
        .then((data) => {
          setEducationSpecialization(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [jobSeeker]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setJobSeeker((prevJobSeeker) => {
      return {
        ...prevJobSeeker,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(jobSeeker);

    const response = await fetch(`${API}/job-seeker/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
      body: JSON.stringify(jobSeeker),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (response.status === 200) {
      toast.success(responseData.message);
      navigate("/job-seeker-dashboard");
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <section className="job-seeker-register">
            <h1>
              <span className="highlight-text">Job Seeker</span> Registration
            </h1>
            <p>Update your details to get the best job opportunities.</p>

            <form method="post" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Account Information *</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={jobSeeker && jobSeeker.email}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Desired Username/ID"
                  value={jobSeeker && jobSeeker.username}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={jobSeeker && jobSeeker.password}
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
                  value={jobSeeker && jobSeeker.name}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={jobSeeker && jobSeeker.lastName}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="Date of birth"
                  value={
                    jobSeeker &&
                    jobSeeker.dob &&
                    !isNaN(new Date(jobSeeker.dob))
                      ? new Date(jobSeeker.dob).toISOString().split("T")[0]
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
                    checked={jobSeeker && jobSeeker.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={jobSeeker && jobSeeker.gender === "female"}
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
                  value={jobSeeker && jobSeeker.permanentAddress}
                  required
                >
                  {jobSeeker && jobSeeker.permanentAddress}
                </textarea>

                <textarea
                  id="currentAddress"
                  name="currentAddress"
                  placeholder="Current Address"
                  value={jobSeeker && jobSeeker.currentAddress}
                  onChange={handleInputChange}
                  required
                ></textarea>

                <select
                  name="country"
                  value={jobSeeker && jobSeeker.country}
                  onChange={handleInputChange}
                >
                  {countries.map((country, index) => (
                    <option key={`${country.name}-${index}`} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select
                  name="state"
                  value={jobSeeker && jobSeeker.state}
                  onChange={handleInputChange}
                >
                  {states.map((state, index) => (
                    <option key={`${state.name}-${index}`} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <select
                  name="city"
                  value={jobSeeker && jobSeeker.city}
                  onChange={handleInputChange}
                >
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
                  value={jobSeeker && jobSeeker.postalCode}
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
                  value={jobSeeker && jobSeeker.contactNumber}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  placeholder="Enter WhatsApp Number"
                  value={jobSeeker && jobSeeker.whatsappNumber}
                  onChange={handleInputChange}
                  required
                />

                <div className="input-group">
                  <input
                    type="checkbox"
                    id="jobAlerts"
                    name="jobAlerts"
                    checked={jobSeeker && jobSeeker.jobAlerts}
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
                  value={jobSeeker && jobSeeker.homePhone}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="tel"
                  id="addHomePhone"
                  name="addHomePhone"
                  placeholder="Add another phone number"
                  value={jobSeeker && jobSeeker.addHomePhone}
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
                  value={jobSeeker && jobSeeker.qualification}
                  required
                >
                  <option value="" disabled>
                    Select Your Qualification
                  </option>
                  {qualification.map((qual, index) => (
                    <option
                      key={`${qual.qualification_name}-${index}`}
                      value={qual.qualification_id}
                    >
                      {qual.qualification_name}
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
                  value={jobSeeker && jobSeeker.educationSpecialization}
                  required
                >
                  <option value="" disabled>
                    Select Your Specialization
                  </option>
                  {educationSpecialization.map((eduSpec, index) => (
                    <option
                      key={`${eduSpec.education_specialization_name}-${index}`}
                      value={eduSpec.education_specialization_id}
                    >
                      {eduSpec.education_specialization_name}
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
                  value={jobSeeker && jobSeeker.experienceAndAppliance}
                  onChange={handleInputChange}
                  required
                ></textarea>

                <div className="input-group col">
                  <label
                    htmlFor="yesNoQuestion"
                    style={{ marginBottom: "5px" }}
                  >
                    Do you have Driving License?
                  </label>
                  <select
                    id="yesNoQuestion"
                    name="yesNoQuestion"
                    onChange={handleInputChange}
                    value={jobSeeker && jobSeeker.yesNoQuestion}
                    required
                  >
                    <option value="" disabled>
                      Select Your Answer
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {jobSeeker && jobSeeker.yesNoQuestion === "yes" && (
                  <div className="input-group">
                    <input
                      type="checkbox"
                      id="twoWheeler"
                      name="twoWheeler"
                      checked={jobSeeker && jobSeeker.twoWheeler}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="twoWheeler">Two-Wheeler</label>

                    <input
                      type="checkbox"
                      id="threeWheeler"
                      name="threeWheeler"
                      checked={jobSeeker && jobSeeker.threeWheeler}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="threeWheeler">Three-Wheeler</label>

                    <input
                      type="checkbox"
                      id="car"
                      name="car"
                      checked={jobSeeker && jobSeeker.car}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="car">Car</label>
                  </div>
                )}
                <select
                  name="disabilityPercentage"
                  id="disabilityPercentage"
                  onChange={handleInputChange}
                  value={jobSeeker && jobSeeker.disabilityPercentage}
                  required
                >
                  <option value="" disabled>
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
                  value={jobSeeker && jobSeeker.specializationInDisability}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>

              <div className="btn-container">
                <button type="submit" value="Register" className="btn">
                  Update
                </button>
                <button type="button" className="btn btn-delete">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default JobSeekerDashboard;
