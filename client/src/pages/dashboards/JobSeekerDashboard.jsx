import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const JobSeekerDashboard = () => {
  const [jobSeeker, setJobSeeker] = useState({});

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        // navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        navigate("/recruiter-dashboard");
      }
    }
    else{
      navigate("/job-seeker-login");

    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${API}/controllers/renderJobSeekerData.php`, {
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
        if (data.success) {
          setJobSeeker(data.jobSeeker[0]);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API}/controllers/getCountry.php`)
      .then((response) => response.text())
      .then((data) => {
        const options = parseOptions(data);
        setCountries(options);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (jobSeeker && jobSeeker.country) {
      fetch(`${API}/controllers/getState.php?country_id=${jobSeeker.country}`)
        .then((response) => response.text())
        .then((data) => {
          const options = parseOptions(data);
          setStates(options);
        })
        .catch((error) => console.error(error));
    }
  }, [jobSeeker]);

  useEffect(() => {
    if (jobSeeker && jobSeeker.state) {
      fetch(`${API}/controllers/getCity.php?state_id=${jobSeeker.state}`)
        .then((response) => response.text())
        .then((data) => {
          const options = parseOptions(data);
          setCities(options);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(jobSeeker);

    const data = new FormData();
    for (const key in jobSeeker) {
      data.append(key, jobSeeker[key]);
    }

    fetch(`${API}/controllers/editJobSeekerData.php`, {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          navigate("/job-seeker-dashboard");
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const parseOptions = (htmlString) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, "text/html");
    return Array.from(htmlDoc.querySelectorAll("option")).map((opt) => ({
      value: opt.value,
      label: opt.textContent,
    }));
  };

  return (
    <>
      <div>
        <div className="container">
          <section className="job-seeker-register">
            <h1>
              <span className="highlight-text">Job Seeker</span> Registration
            </h1>
            <p>
              Submit your resume here... Please fill in the following form to
              get a free <strong>&ldquo;Samvedna Jobs&rdquo;</strong> account.
              Get Started <span className="highlight-text">NOW</span>
            </p>

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
                  value={jobSeeker && jobSeeker.dob}
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
                    <option
                      key={`${country.value}-${index}`}
                      value={country.value}
                    >
                      {country.label}
                    </option>
                  ))}
                </select>
                <select
                  name="state"
                  value={jobSeeker && jobSeeker.state}
                  onChange={handleInputChange}
                >
                  {states.map((state, index) => (
                    <option key={`${state.value}-${index}`} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <select
                  name="city"
                  value={jobSeeker && jobSeeker.city}
                  onChange={handleInputChange}
                >
                  {cities.map((city, index) => (
                    <option key={`${city.value}-${index}`} value={city.value}>
                      {city.label}
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
                  required
                >
                  <option value="" disabled>
                    Select Your Qualification
                  </option>
                  <option value="Below SSC">Below SSC</option>
                  <option value="SSLC X">SSLC / X</option>
                  <option value="HSC XII">HSC / XII</option>
                  <option value="Under Graduate">Under Graduate</option>
                  <option value="Company Secretary">
                    Company Secretary (ACS)
                  </option>
                  <option value="Aviation">Aviation</option>
                  <option value="BA">B.A</option>
                  <option value="B.Arch">B. Arch</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BE B.Tech">B.E/B.Tech</option>
                  <option value="B.Ed">B.Ed</option>
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
                >
                  <option value="" disabled>
                    Select Your Specialization
                  </option>
                  <optgroup label="Below X">
                    <option value="Below X">Below X</option>
                  </optgroup>
                  <optgroup label="SSLC / X">
                    <option value="SSLC X">SSLC / X</option>
                  </optgroup>
                  <optgroup label="HSC / XII">
                    <option value="HSC/XII">HSC / XII</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </optgroup>
                  <optgroup label="Under Graduate">
                    <option value="Under_Graduate">Under Graduate</option>
                    <option value="FY">F.Y</option>
                    <option value="SY">S.Y</option>
                    <option value="TY">T.Y</option>
                  </optgroup>
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
                    required
                  >
                    <option value="" disabled selected>
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
                <select name="percentage" onChange={handleInputChange} required>
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
