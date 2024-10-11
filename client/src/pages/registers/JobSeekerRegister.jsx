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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const handleInputChange = (e, index, section, subIndex, subSection) => {
    const { name, type, value } = e.target;
    const isChecked = type === "checkbox" ? e.target.checked : false;

    const handleCheckboxChange = (prevState, name, value) => {
      if (name === "desiredJobType") {
        return {
          ...prevState,
          [name]: prevState[name].includes(value)
            ? prevState[name].filter((item) => item !== value)
            : [...prevState[name], value],
        };
      } else if (Array.isArray(prevState[name])) {
        return {
          ...prevState,
          [name]: prevState[name].includes(value)
            ? prevState[name].filter((item) => item !== value)
            : [...prevState[name], value],
        };
      } else {
        return {
          ...prevState,
          [name]: isChecked,
        };
      }
    };

    const handleFieldChange = (prevState, name, value) => {
      return {
        ...prevState,
        [name]: value,
      };
    };

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
                          [name]:
                            type === "checkbox"
                              ? handleCheckboxChange(subItem, name, value)[name]
                              : handleFieldChange(subItem, name, value)[name],
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
              ? {
                  ...item,
                  [name]:
                    type === "checkbox"
                      ? handleCheckboxChange(item, name, value)[name]
                      : handleFieldChange(item, name, value)[name],
                }
              : item
          ),
        };
      } else {
        return {
          ...prevState,
          [name]:
            type === "checkbox"
              ? handleCheckboxChange(prevState, name, value)[name]
              : handleFieldChange(prevState, name, value)[name],
        };
      }
    });
  };
  const handleAddClick = (section, newItem) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [section]: [...prevState[section], newItem],
      };
    });
  };
  const handleRemoveClick = (index, section) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [section]: prevState[section].filter((item, idx) => idx !== index),
      };
    });
  };
  const handleSubAddClick = (index, section, subSection, newItem) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [section]: prevState[section].map((item, idx) =>
          idx === index
            ? {
                ...item,
                [subSection]: [...item[subSection], newItem],
              }
            : item
        ),
      };
    });
  };

  const handleSubRemoveClick = (index, section, subIndex, subSection) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [section]: prevState[section].map((item, idx) =>
          idx === index
            ? {
                ...item,
                [subSection]: item[subSection].filter(
                  (subItem, subIdx) => subIdx !== subIndex
                ),
              }
            : item
        ),
      };
    });
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
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   toast.loading("Submitting Your Data, Please Wait...");

  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }

  //   if (formData.password.length < 8) {
  //     toast.error("Password should be at least 8 characters long");
  //     return;
  //   }

  //   if (formData.dob > new Date().toISOString().split("T")[0]) {
  //     toast.error("Date of Birth cannot be in the future");
  //     return;
  //   }

  //   const currentYear = new Date().getFullYear();
  //   const birthYear = new Date(formData.dob).getFullYear();

  //   if (currentYear - birthYear < 18) {
  //     toast.error("You must be at least 18 years old to register");
  //     return;
  //   }

  //   if (
  //     formData.yesNoQuestion === "yes" &&
  //     !formData.twoWheeler &&
  //     !formData.threeWheeler &&
  //     !formData.car
  //   ) {
  //     toast.error("Please select at least one vehicle type");
  //     return;
  //   }

  //   const newFormData = new FormData();

  //   for (const key in formData) {
  //     if (key === "photo" || key === "resume") {
  //       if (formData[key]) {
  //         newFormData.append(key, formData[key]);
  //       }
  //     } else {
  //       newFormData.append(key, formData[key]);
  //     }
  //   }
  //   // console.log(newFormData);
  //   const response = await fetch(`${API}/job-seeker/register`, {
  //     method: "POST",
  //     body: newFormData,
  //   });

  //   const data = await response.json();
  //   console.log(data);

  //   if (response.ok) {
  //     toast.dismiss();
  //     toast.success(data.message);
  //     // navigate("/job-seeker-login");
  //   } else {
  //     toast.dismiss();
  //     toast.error(data.message);
  //   }
  // };

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

    // if (formData.dob > new Date().toISOString().split("T")[0]) {
    //   toast.error("Date of Birth cannot be in the future");
    //   return;
    // }

    // const currentYear = new Date().getFullYear();
    // const birthYear = new Date(formData.dob).getFullYear();

    // if (currentYear - birthYear < 18) {
    //   toast.error("You must be at least 18 years old to register");
    //   return;
    // }

    // if (
    //   formData.yesNoQuestion === "yes" &&
    //   !formData.twoWheeler &&
    //   !formData.threeWheeler &&
    //   !formData.car
    // ) {
    //   toast.error("Please select at least one vehicle type");
    //   return;
    // }

    const newFormData = new FormData();

    for (const key in formData) {
   
        newFormData.append(key, formData[key]);
   
    }

    const response = await fetch(`${API}/job-seeker/register`, {
      method: "POST",
      body: newFormData,
    });

    const data = await response.json();
    console.log(data);

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
      {/* <section className="job-seeker-register">
        <h1>
          <span className="highlight-text">Job Seeker</span> Registration
        </h1>
        <p>
          Submit your resume here... Please fill in the following form to get a
          free <strong>&ldquo;Samvedna Jobs&rdquo;</strong> account. Get Started{" "}
          <span className="highlight-text">NOW</span>
        </p>

        <form method="post" onSubmit={handleSubmit}>
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
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
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
            <legend>Disability Information *</legend>
            <select id="typeOfDisability" name="typeOfDisability" required>
              <option value="" selected disabled>
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
            >
              <option value="" selected disabled>
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
            <select id="specificDisability" name="specificDisability" required>
              <option value="" selected disabled>
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
            <select id="levelOfDisability" name="levelOfDisability" required>
              <option value="" disabled selected>
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
            >
              <option value="" selected disabled>
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
          <fieldset>
            <legend>Education</legend>

            {formData.education.map((institution, index) => (
              <div key={index} className="education">
                <div className="input-group row">
                  <input
                    type="text"
                    name="institutionName"
                    id="institutionName"
                    placeholder="Institution Name"
                    value={institution.institutionName}
                    onChange={(e) => handleInputChange(e, index, "education")}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleRemoveClick(index, "education")}
                  >
                    Remove
                  </button>
                </div>
                {institution.degrees.map((degree, subIndex) => (
                  <div className="degrees" key={subIndex}>
                    <div className="input-group row">
                      <input
                        type="text"
                        name="degree"
                        id="degree"
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
                        Remove
                      </button>
                    </div>
                    <div className="input-group row">
                      <input
                        type="text"
                        name="educationCompleted"
                        id="educationCompleted"
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
                        id="major"
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
                    </div>
                    <div className="input-group row">
                      <input
                        type="date"
                        name="graduationDate"
                        id="graduationDate"
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
                        id="additionalInfo"
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
                    </div>
                    <div className="input-group row">
                      <input
                        type="text"
                        name="grade"
                        id="grade"
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
                        id="outOf"
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
                    </div>
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
                <hr
                  style={{
                    width: "100%",
                    marginInline: "auto",
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("education", {
                  institutionName: "",
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
            <br />
            <br />
            <select
              id="artSkills"
              name="artSkills"
              value={formData.artSkills}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Art Skills
              </option>
              <option value="Animation">Animation</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Painting">Painting</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Dance">Dance</option>
              <option value="Theater">Theater</option>
              <option value="Craft">Craft</option>
              <option value="Pottery">Pottery</option>
              <option value="Textile Design">Textile Design</option>
              <option value="Fashion Design">Fashion Design</option>
              <option value="Jewelry Making">Jewelry Making</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Visual Arts">Visual Arts</option>
              <option value="Creative Writing">Creative Writing</option>
              <option value="Poetry">Poetry</option>
              <option value="Storytelling">Storytelling</option>
              <option value="Film Making">Film Making</option>
              <option value="Game Design">Game Design</option>
              <option value="Architectural Design">Architectural Design</option>
              <option value="Product Design">Product Design</option>
              <option value="Fine Arts">Fine Arts</option>
              <option value="Applied Arts">Applied Arts</option>
              <option value="Decorative Arts">Decorative Arts</option>
              <option value="Design Thinking">Design Thinking</option>
              <option value="Art Therapy">Art Therapy</option>
              <option value="Music Therapy">Music Therapy</option>
              <option value="Drama Therapy">Drama Therapy</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Work Experience</legend>
            <div className="input-group row"></div>
            {formData.Experience.map((Experience, index) => (
              <div key={index} className="branches">
                <div className="input-group row">
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    placeholder="jobTitle"
                    value={Experience.jobTitle}
                    onChange={(e) => handleInputChange(e, index, "Experience")}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleRemoveClick(index, "Experience")}
                  >
                    Remove
                  </button>
                </div>
                <div className="input-group row">
                  <input
                    type="text"
                    name="companyname"
                    id="companyname"
                    placeholder="company name"
                    value={Experience.companyname}
                    onChange={(e) => handleInputChange(e, index, "Experience")}
                    required
                  />
                  <input
                    type="text"
                    name="JobDescriptions"
                    id="beginningRank"
                    placeholder="Job Descriptions"
                    value={Experience.JobDescriptions}
                    onChange={(e) => handleInputChange(e, index, "Experience")}
                    required
                  />
                  <input
                    type="text"
                    name="endingRank"
                    id="endingRank"
                    placeholder="Ending Rank"
                    value={Experience.endingRank}
                    onChange={(e) => handleInputChange(e, index, "Experience")}
                    required
                  />
                </div>
                <div className="input-group row">
                  <div className="input-group col">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      placeholder="Start Date"
                      value={Experience.startDate}
                      onChange={(e) =>
                        handleInputChange(e, index, "Experience")
                      }
                      required
                    />
                  </div>
                  <div className="input-group col">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      placeholder="End Date"
                      value={Experience.endDate}
                      onChange={(e) =>
                        handleInputChange(e, index, "Experience")
                      }
                      required
                    />
                  </div>
                </div>
                <div className="input-group col">
                  <label htmlFor="Projects">Projects or Portfolio</label>

                  <input
                    type="text"
                    name="Projects"
                    id="Projects"
                    placeholder="Projects or Portfolio"
                    value={Experience.Projects}
                    onChange={(e) => handleInputChange(e, index, "Experience")}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("Experience", {
                  Jobtitle: "",
                  companyname: "",
                  JobDescriptions: "",
                  startDate: "",
                  endDate: "",
                  Projects: "",
                })
              }
            >
              Add Experience
            </button>
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
          <fieldset>
            <legend>References</legend>
            <div className="input-group row"></div>
            {formData.professionalReferences.map(
              (professionalReference, index) => (
                <div key={index} className="branches">
                  <div className="input-group row">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                      value={professionalReference.name}
                      onChange={(e) =>
                        handleInputChange(e, index, "professionalReferences")
                      }
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() =>
                        handleRemoveClick(index, "professionalReferences")
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <div className="input-group row">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      value={professionalReference.email}
                      onChange={(e) =>
                        handleInputChange(e, index, "professionalReferences")
                      }
                      required
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="phone Number"
                      value={professionalReference.phoneNumber}
                      onChange={(e) =>
                        handleInputChange(e, index, "professionalReferences")
                      }
                      required
                    />
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      placeholder="Company Name"
                      value={professionalReference.companyName}
                      onChange={(e) =>
                        handleInputChange(e, index, "professionalReferences")
                      }
                      required
                    />
                  </div>

                  <div className="input-group col">
                    <label htmlFor="relationship">relationship</label>

                    <input
                      type="text"
                      name="relationship"
                      id="relationship"
                      placeholder="relationship"
                      value={professionalReference.relationship}
                      onChange={(e) =>
                        handleInputChange(e, index, "professionalReferences")
                      }
                    />
                  </div>
                </div>
              )
            )}
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
              Add References
            </button>
          </fieldset>
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
            <label htmlFor="jobCategories">Job preferred Locatio</label>

            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              placeholder="Enter job preferred Location"
            />
            <label htmlFor="jobCategories">Job Type</label>

            <input
              type="text"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              placeholder="Enter job type"
            />
          </fieldset>

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
          <div className="btn-container">
            <button
              type="submit"
              value="Register"
              className="btn"
              name="job_seekerRegisterButton"
            >
              Register
            </button>
            <button type="button" className="btn btn-delete">
              Cancel
            </button>
          </div>
        </form>
      </section> */}
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
              name="job_seekerRegisterButton"
            >
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
