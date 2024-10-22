import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;
const STATIC_API = import.meta.env.VITE_STATIC_FILES_URL;

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loginState, userDetails } = UserStore();
  const [jobSeeker, setJobSeeker] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    FirstName: "",
    FatherName: "",
    Surname: "",
    accommodationsNeeded: "",
    addHomePhone: "",
    artSkills: "",
    car: 0,
    careerObjective: "",
    city: "",
    contactNumber: "",
    country: "",
    currentAddress: "",
    disabilityPercentage: "",
    dob: "",
    education: [],
    educationSpecialization: "",
    employmentGapDuration: "",
    employmentGapReason: "",
    experience: [],
    experienceAndAppliance: "",
    gender: "",
    hobbiesOrInterests: "",
    homePhone: "",
    jobAlerts: false,
    jobCategories: "",
    jobType: "",
    job_seeker_id: null,
    job_seeker_status: 1,
    languageProficiency: "",
    lastName: "",
    name: "",
    notableAchievements: "",
    otherRelevantInfo: "",
    permanentAddress: "",
    photo: null,
    postalCode: "",
    preferredLocation: "",
    professionalMemberships: "",
    professionalReferences: [],
    qualification: "",
    resume: null,
    softwareRequirements: "",
    specializationInDisability: "",
    specificEquipment: "",
    specificNeed: "",
    state: "",
    threeWheeler: 0,
    transportationNeeded: "",
    twoWheeler: 0,
    whatsappNumber: "",
    yesNoQuestion: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const handleInputChange = (e, index, section, subIndex, subSection) => {
    const { name, type, value, checked } = e.target;
    const isChecked = type === "checkbox" ? checked : false;

    setFormData((prevState) => {
      if (section && subSection) {
        return {
          ...prevState,
          [section]: prevState[section].map((item, idx) =>
            idx === index
              ? {
                  ...item,
                  [subSection]: item[subSection].map((subItem, subIdx) =>
                    subIdx === subIndex
                      ? {
                          ...subItem,
                          [name]: type === "checkbox" ? isChecked : value,
                        }
                      : subItem
                  ),
                }
              : item
          ),
        };
      } else if (section) {
        return {
          ...prevState,
          [section]: prevState[section].map((item, idx) =>
            idx === index
              ? { ...item, [name]: type === "checkbox" ? isChecked : value }
              : item
          ),
        };
      } else {
        return {
          ...prevState,
          [name]: type === "checkbox" ? isChecked : value,
        };
      }
    });
  };

  const handleAddClick = (section, newItem) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: [...(prevState[section] || []), newItem],
    }));
  };

  const handleRemoveClick = (index, section) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: prevState[section].filter((_, idx) => idx !== index),
    }));
  };

  const handleSubAddClick = (index, section, subSection, newItem) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: prevState[section].map((item, idx) =>
        idx === index
          ? {
              ...item,
              [subSection]: [...item[subSection], newItem],
            }
          : item
      ),
    }));
  };

  const handleSubRemoveClick = (index, section, subIndex, subSection) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: prevState[section].map((item, idx) =>
        idx === index
          ? {
              ...item,
              [subSection]: item[subSection].filter(
                (_, subIdx) => subIdx !== subIndex
              ),
            }
          : item
      ),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    // Validate DOB
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

    // Validate vehicle selection
    if (
      formData.yesNoQuestion === "yes" &&
      !formData.twoWheeler &&
      !formData.threeWheeler &&
      !formData.car
    ) {
      toast.error("Please select at least one vehicle type");
      return;
    }

    const newFormData = new FormData();

    // Append form data fields
    for (const key in formData) {
      if (key === "photo" || key === "resume") {
        if (formData[key]) {
          newFormData.append(key, formData[key]); // append files
        }
      } else if (
        key === "education" ||
        key === "experience" ||
        key === "professionalReferences"
      ) {
        newFormData.append(key, JSON.stringify(formData[key])); // stringify complex objects
      } else {
        newFormData.append(key, formData[key]); // append normal fields
      }
    }

    try {
      const response = await fetch(
        `${API}/job-seeker/update/${userDetails.id}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": userDetails.token, // Include authentication token
          },
          body: newFormData, // Send the FormData directly
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      toast.dismiss();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating job seeker:", error);
      toast.dismiss();
      toast.error("Failed to update job seeker");
    }
  };

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    }
  }, [navigate, loginState, userDetails]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/job-seeker/by-id`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userDetails.token,
          },
        });

        const data = await response.json();
        console.log(data.jobSeeker);

        if (response.ok) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...data.jobSeeker,
            experience: data.jobSeeker.experience || [],
          }));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
        toast.error("Failed to fetch job seeker data");
      }
    };

    if (loginState) {
      fetchData();
    }
  }, [id, navigate, loginState, userDetails]);

  return (
    <div className="container">
      <section className="job-seeker-register">
        <h1>
          <span className="highlight-text">Job Seeker</span> Edit Resume
        </h1>
        <p>
          Edit your resume here... Please fill in the following form to update
          your <strong>&ldquo;Samvedna Jobs&rdquo;</strong> account. Get Started{" "}
          <span className="highlight-text">NOW</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Account Information */}
          <fieldset>
            <legend>Account Information *</legend>
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
              type="text"
              id="email"
              name="email"
              placeholder="Enter Desired email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Personal Data / Details */}
          <fieldset>
            <legend>Personal Data / Details *</legend>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="FatherName"
              name="FatherName"
              placeholder="Father Name"
              value={formData.FatherName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="Surname"
              name="Surname"
              placeholder="Surname"
              value={formData.Surname}
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
                checked={formData.gender === "male"}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleInputChange}
                checked={formData.gender === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>
            {formData.photo && (
              <div>
                <label>Uploaded Photo:</label>
                <img
                  src={`${STATIC_API}/uploads/job/profile/${formData.photo}`}
                  alt="Uploaded Photo"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            {formData.resume && (
              <div>
                <label>Uploaded Resume:</label>
                <a
                  href={`${STATIC_API}/uploads/job/resume/${formData.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </div>
            )}
            <label htmlFor="photo">
              Upload Your Photo (Passport Size Photo)
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="resume">Upload Your Resume in PDF/Word File</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </fieldset>

          {/* Address Information */}
          <fieldset>
            <legend>Address Information *</legend>
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
          </fieldset>

          {/* Identification */}
          <fieldset>
            <legend>Identification</legend>
            <input
              type="text"
              id="AadharCardNumber"
              name="AadharCardNumber"
              placeholder="Enter Aadhar Card Number"
              value={formData.AadharCardNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="LinkedInID"
              name="LinkedInID"
              placeholder="Enter LinkedIn ID"
              value={formData.LinkedInID}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Education Qualification */}
          <fieldset>
            <legend>Education Qualification *</legend>
            <label htmlFor="qualification">Qualification Level:</label>
            <select
              id="qualification"
              name="qualification"
              onChange={handleInputChange}
              required
              value={formData.qualification}
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

          {/* Disability Information */}
          <fieldset>
            <legend>Disability Information *</legend>
            <select
              id="typeOfDisability"
              name="typeOfDisability"
              required
              value={formData.typeOfDisability}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Type of Disability
              </option>
              <option value="Locomotor">Locomotor</option>
              <option value="Hearing">Hearing</option>
              <option value="Speech and Hearing">Speech and Hearing</option>
              <option value="Visual (Blind)">Visual (Blind)</option>
              <option value="Intellectual">Intellectual</option>
              <option value="Multiple">Multiple</option>
              <option value="Neurological">Neurological</option>
              <option value="Blood Disorder">Blood Disorder</option>
              <option value="Chronic Illness">Chronic Illness</option>
              <option value="War Veterans">War Veterans</option>
              <option value="Justice Involved">Justice Involved</option>
              <option value="Gender Inequality">Gender Inequality</option>
              <option value="Others">Others</option>
            </select>

            <label htmlFor="transportationMobility">
              Transportation Mobility
            </label>
            <select
              id="transportationMobility"
              name="transportationMobility"
              required
              value={formData.transportationMobility}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Transportation Mobility
              </option>
              <option value="Tricycle">Tricycle</option>
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Four Wheeler Scooter / Bike">
                Four Wheeler Scooter / Bike
              </option>
              <option value="Car">Car</option>
            </select>

            <label htmlFor="specificDisability">Specific Disability</label>
            <select
              id="specificDisability"
              name="specificDisability"
              required
              value={formData.specificDisability}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Specific Disability
              </option>
              <option value="Wheelchair User">Wheelchair User</option>
              <option value="Ground Crawl">Ground Crawl</option>
              <option value="Stick User">Stick User</option>
              <option value="Visually Impaired">Visually Impaired</option>
              <option value="Hearing Impaired">Hearing Impaired</option>
              <option value="Autism">Autism</option>
              <option value="Others">Others</option>
            </select>

            <label htmlFor="levelOfDisability">Level of Disability</label>
            <select
              id="levelOfDisability"
              name="levelOfDisability"
              required
              value={formData.levelOfDisability}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Level of Disability
              </option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
              <option value="Profound">Profound</option>
            </select>

            <label htmlFor="assistiveTechnology">
              Assistive Technology/Device Used for Walking Mobility
            </label>
            <select
              id="assistiveTechnology"
              name="assistiveTechnology"
              required
              value={formData.assistiveTechnology}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Assistive Technology/Device
              </option>
              <option value="Manual Wheelchair">Manual Wheelchair</option>
              <option value="Power Wheelchair">Power Wheelchair</option>
              <option value="Underarm Crutches">Underarm Crutches</option>
              <option value="Forearm Crutches">Forearm Crutches</option>
              <option value="Gutter Crutches">Gutter Crutches</option>
              <option value="Standard Walker">Standard Walker</option>
              <option value="Knee Walker">Knee Walker</option>
              <option value="Cane / Stick">Cane / Stick</option>
              <option value="Rollator">Rollator</option>
              <option value="Prosthetic">Prosthetic</option>
              <option value="Hearing Aid">Hearing Aid</option>
              <option value="Screen Reader">Screen Reader</option>
              <option value="Others">Others</option>
            </select>
          </fieldset>

          {/* Education Specialization */}
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
              value={formData.educationSpecialization}
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

          {/* Job Alerts */}
          <fieldset>
            <legend>Job Alerts</legend>
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
          </fieldset>

          {/* Additional Phone Numbers */}
          <fieldset>
            <legend>Additional Phone Numbers</legend>
            <input
              type="tel"
              id="homePhone"
              name="homePhone"
              placeholder="Home Phone"
              value={formData.homePhone}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              id="addHomePhone"
              name="addHomePhone"
              placeholder="Add another phone number"
              value={formData.addHomePhone}
              onChange={handleInputChange}
            />
          </fieldset>

          {/* Education */}
          <fieldset>
            <legend>Education</legend>
            {formData.education?.map((education, index) => (
              <div key={index} className="education">
                <input
                  type="text"
                  name="institutionName"
                  placeholder="Institution Name"
                  value={education.institutionName}
                  onChange={(e) => handleInputChange(e, index, "education")}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={education.country}
                  onChange={(e) => handleInputChange(e, index, "education")}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={education.state}
                  onChange={(e) => handleInputChange(e, index, "education")}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={education.city}
                  onChange={(e) => handleInputChange(e, index, "education")}
                  required
                />
                {education?.degrees?.map((degree, subIndex) => (
                  <div key={subIndex} className="degrees">
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={degree.degree}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      name="educationCompleted"
                      placeholder="Education Completed"
                      value={degree.educationCompleted}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      name="major"
                      placeholder="Major"
                      value={degree.major}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                      required
                    />
                    <input
                      type="date"
                      name="graduationDate"
                      placeholder="Graduation Date"
                      value={degree.graduationDate}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      name="additionalInfo"
                      placeholder="Additional Info"
                      value={degree.additionalInfo}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                    />
                    <input
                      type="text"
                      name="grade"
                      placeholder="Grade"
                      value={degree.grade}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                    />
                    <input
                      type="text"
                      name="outOf"
                      placeholder="Out Of"
                      value={degree.outOf}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() =>
                        handleSubRemoveClick(
                          index,
                          "education",
                          subIndex,
                          "degrees"
                        )
                      }
                    >
                      Remove Degree
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    handleSubAddClick(index, "education", "degrees", {
                      degree: "",
                      educationCompleted: "",
                      major: "",
                      graduationDate: "",
                      additionalInfo: "",
                      grade: "",
                      outOf: "",
                    })
                  }
                >
                  Add Degree
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => handleRemoveClick(index, "education")}
                >
                  Remove Institution
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("education", {
                  institutionName: "",
                  country: "",
                  state: "",
                  city: "",
                  degrees: [
                    {
                      degree: "",
                      educationCompleted: "",
                      major: "",
                      graduationDate: "",
                      additionalInfo: "",
                      grade: "",
                      outOf: "",
                    },
                  ],
                })
              }
            >
              Add Institution
            </button>
          </fieldset>

          {/* Experience */}
          <fieldset>
            <legend>Experience</legend>
            {formData.experience?.map((experience, index) => (
              <div key={index} className="experience">
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={experience.jobTitle}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={experience.companyName}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                  required
                />
                <input
                  type="text"
                  name="jobDescriptions"
                  placeholder="Job Descriptions"
                  value={experience.jobDescriptions}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                  required
                />
                <input
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  value={experience.startDate}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  placeholder="End Date"
                  value={experience.endDate}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                  required
                />
                <input
                  type="text"
                  name="projects"
                  placeholder="Projects or Portfolio"
                  value={experience.projects}
                  onChange={(e) => handleInputChange(e, index, "experience")}
                />
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => handleRemoveClick(index, "experience")}
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("experience", {
                  jobTitle: "",
                  companyName: "",
                  jobDescriptions: "",
                  startDate: "",
                  endDate: "",
                  projects: "",
                })
              }
            >
              Add Experience
            </button>
          </fieldset>

          {/* Employment Gap Information */}
          <fieldset>
            <legend>Employment Gap Information (if applicable)</legend>
            <label htmlFor="employmentGapReason">
              Reason for Employment Gap
            </label>
            <select
              id="employmentGapReason"
              name="employmentGapReason"
              value={formData.employmentGapReason}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Reason
              </option>
              <option value="Health Issues">Health Issues</option>
              <option value="Caregiving">Caregiving</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="employmentGapDuration">
              Duration of Employment Gap
            </label>
            <input
              type="text"
              id="employmentGapDuration"
              name="employmentGapDuration"
              value={formData.employmentGapDuration}
              onChange={handleInputChange}
              placeholder="Enter duration (e.g., 6 months, 1 year)"
            />
          </fieldset>

          {/* Other Relevant Information */}
          <fieldset>
            <legend>Other Relevant Information</legend>
            <label htmlFor="languageProficiency">Language Proficiency</label>
            <input
              type="text"
              id="languageProficiency"
              name="languageProficiency"
              value={formData.languageProficiency}
              onChange={handleInputChange}
              placeholder="Enter languages you are proficient in"
            />
            <label htmlFor="hobbiesOrInterests">
              Relevant Hobbies or Interests
            </label>
            <input
              type="text"
              id="hobbiesOrInterests"
              name="hobbiesOrInterests"
              value={formData.hobbiesOrInterests}
              onChange={handleInputChange}
              placeholder="Enter your hobbies or interests"
            />
            <label htmlFor="professionalMemberships">
              Professional Memberships or Associations
            </label>
            <input
              type="text"
              id="professionalMemberships"
              name="professionalMemberships"
              value={formData.professionalMemberships}
              onChange={handleInputChange}
              placeholder="Enter your professional memberships or associations"
            />
          </fieldset>

          {/* Additional Information */}
          <fieldset>
            <legend>Additional Information</legend>
            <label htmlFor="careerObjective">Summary or Career Objective</label>
            <textarea
              id="careerObjective"
              name="careerObjective"
              value={formData.careerObjective}
              onChange={handleInputChange}
              placeholder="Enter your summary or career objective"
            ></textarea>
            <label htmlFor="otherRelevantInfo">
              Other Relevant Information
            </label>
            <textarea
              id="otherRelevantInfo"
              name="otherRelevantInfo"
              value={formData.otherRelevantInfo}
              onChange={handleInputChange}
              placeholder="Enter any other relevant information"
            ></textarea>
            <label htmlFor="notableAchievements">
              Notable Awards, Recognition, or Achievements
            </label>
            <textarea
              id="notableAchievements"
              name="notableAchievements"
              value={formData.notableAchievements}
              onChange={handleInputChange}
              placeholder="Enter any notable awards, recognition, or achievements"
            ></textarea>
          </fieldset>

          {/* References */}
          <fieldset>
            <legend>References</legend>
            {formData.professionalReferences?.map((reference, index) => (
              <div key={index} className="reference">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={reference.name}
                  onChange={(e) =>
                    handleInputChange(e, index, "professionalReferences")
                  }
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={reference.email}
                  onChange={(e) =>
                    handleInputChange(e, index, "professionalReferences")
                  }
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={reference.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(e, index, "professionalReferences")
                  }
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={reference.companyName}
                  onChange={(e) =>
                    handleInputChange(e, index, "professionalReferences")
                  }
                  required
                />
                <input
                  type="text"
                  name="relationship"
                  placeholder="Relationship"
                  value={reference.relationship}
                  onChange={(e) =>
                    handleInputChange(e, index, "professionalReferences")
                  }
                />
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() =>
                    handleRemoveClick(index, "professionalReferences")
                  }
                >
                  Remove Reference
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("professionalReferences", {
                  name: "",
                  email: "",
                  phoneNumber: "",
                  companyName: "",
                  relationship: "",
                })
              }
            >
              Add Reference
            </button>
          </fieldset>

          {/* Job Preferences */}
          <fieldset>
            <legend>Job Preferences</legend>
            <label htmlFor="jobCategories">
              Job Categories and Industries of Interest
            </label>
            <input
              type="text"
              id="jobCategories"
              name="jobCategories"
              value={formData.jobCategories}
              onChange={handleInputChange}
              placeholder="Enter job categories and industries of interest"
            />
            <label htmlFor="preferredLocation">Job Preferred Location</label>
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              placeholder="Enter job preferred Location"
            />
            <label htmlFor="jobType">Job Type</label>
            <input
              type="text"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              placeholder="Enter job type"
            />
          </fieldset>

          {/* Accessibility Requirements */}
          <fieldset>
            <legend>Accessibility Requirements</legend>
            <label htmlFor="accommodationsNeeded">
              Accommodations Needed for the Job
            </label>
            <input
              type="text"
              id="accommodationsNeeded"
              name="accommodationsNeeded"
              value={formData.accommodationsNeeded}
              onChange={handleInputChange}
              placeholder="Enter accommodations needed for the job"
            />
            <label htmlFor="transportationNeeded">
              Transportation Needed for the Job
            </label>
            <input
              type="text"
              id="transportationNeeded"
              name="transportationNeeded"
              value={formData.transportationNeeded}
              onChange={handleInputChange}
              placeholder="Enter transportation needed for the job"
            />
            <label htmlFor="specificNeed">Specific Need</label>
            <input
              type="text"
              id="specificNeed"
              name="specificNeed"
              value={formData.specificNeed}
              onChange={handleInputChange}
              placeholder="Enter specific need (e.g., Wheelchair Accessibility, Sign Language Interpreter, Adaptive Software)"
            />
            <label htmlFor="softwareRequirements">Software Requirements</label>
            <input
              type="text"
              id="softwareRequirements"
              name="softwareRequirements"
              value={formData.softwareRequirements}
              onChange={handleInputChange}
              placeholder="Enter software requirements"
            />
            <label htmlFor="specificEquipment">Any Specific Equipment</label>
            <input
              type="text"
              id="specificEquipment"
              name="specificEquipment"
              value={formData.specificEquipment}
              onChange={handleInputChange}
              placeholder="Enter any specific equipment"
            />
          </fieldset>

          {/* Submit and Cancel buttons */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              name="job_seekerRegisterButton"
            >
              Update
            </button>
            <button type="button" className="btn btn-delete">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobSeekerDashboard;
