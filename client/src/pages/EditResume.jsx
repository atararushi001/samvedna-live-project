import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const EditResume = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (recruiterId) {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    resumeName: "",
    firstName: "",
    lastName: "",
    suffix: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    summary: "",
    objective: "",
    employers: [
      {
        employerName: "",
        positions: [
          {
            positionTitle: "",
            startDate: "",
            endDate: "",
            isCurrentPosition: false,
            jobDescription: "",
          },
        ],
      },
    ],
    education: [
      {
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
      },
    ],
    militaryStatus: "",
    militaryAdditionalInfo: "",
    branches: [
      {
        branch: "",
        unit: "",
        beginningRank: "",
        endingRank: "",
        startDate: "",
        endDate: "",
        areaOfExpertise: "",
        recognition: "",
      },
    ],
    desiredJobType: [],
    desiredPay: "",
    desiredCurrency: "",
    desiredPaytime: "",
    additionalPreferences: "",
    published: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        if (key === "desiredJobType") {
          formData[key].forEach((item, index) => {
            data.append(`${key}[${index}]`, item);
          });
        } else {
          formData[key].forEach((item, index) => {
            for (const subKey in item) {
              if (Array.isArray(item[subKey])) {
                item[subKey].forEach((subItem, subIndex) => {
                  for (const subSubKey in subItem) {
                    data.append(
                      `${key}[${index}][${subKey}][${subIndex}][${subSubKey}]`,
                      subItem[subSubKey]
                    );
                  }
                });
              } else {
                data.append(`${key}[${index}][${subKey}]`, item[subKey]);
              }
            }
          });
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    fetch(`${API}/controllers/updateResume.php?id=${id}`, {
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
          navigate("/job-seeker-dashboard/manage-resumes");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  };

  useEffect(() => {
    fetch(`${API}/controllers/getResume.php?id=${id}`, {
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
          setFormData(data.resume);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  }, [id, navigate]);

  return (
    <div className="container">
      <section className="build-resume">
        <h1>
          Update Your <span className="highlight-text">Resume</span>
        </h1>
        <p className="sub-text">
          Complete your resume by filling in each section. Employers will find
          your resume using the information you enter below. The more
          information you fill in, the more searchable your resume becomes.
        </p>
        <form className="build-resume-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Resume Setting</legend>
            <p>
              This is for your own reference. It will not be visible to anyone.
            </p>
            <input
              type="text"
              name="resumeName"
              id="resumeName"
              placeholder="Resume Name"
              value={formData.resumeName}
              onChange={handleInputChange}
              required
            />
          </fieldset>
          <fieldset>
            <legend>Contact Information</legend>
            <p>
              This contact information will only be shown when you release it to
              an employer.
            </p>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="suffix"
                id="suffix"
                placeholder="Suffix"
                value={formData.suffix}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="website"
                id="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleInputChange}
              />
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                placeholder="LinkedIn"
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Current Location</legend>
            <div className="input-group">
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>
              Summary <span className="highlight-text">(Optional)</span>
            </legend>
            <input
              type="text"
              name="summary"
              id="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleInputChange}
            />
            <textarea
              name="objective"
              id="objective"
              placeholder="Enter your objective here..."
              value={formData.objective}
              onChange={handleInputChange}
            ></textarea>
          </fieldset>
          <fieldset>
            <legend>Work History</legend>
            {formData.employers.map((employer, index) => (
              <div key={index} className="work-history">
                <div className="input-group row">
                  <input
                    type="text"
                    name="employerName"
                    id="employerName"
                    placeholder="Employer Name"
                    value={employer.employerName}
                    onChange={(e) => handleInputChange(e, index, "employers")}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleRemoveClick(index, "employers")}
                  >
                    Remove
                  </button>
                </div>
                {employer.positions.map((position, subIndex) => (
                  <div className="positions" key={subIndex}>
                    <div className="input-group row">
                      <input
                        type="text"
                        name="positionTitle"
                        id="positionTitle"
                        placeholder="Position Title"
                        value={position.positionTitle}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "employers",
                            subIndex,
                            "positions"
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
                            "employers",
                            subIndex,
                            "positions"
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                    <div className="input-group row">
                      <input
                        type="checkbox"
                        name="isCurrentPosition"
                        id="isCurrentPosition"
                        checked={position.isCurrentPosition}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "employers",
                            subIndex,
                            "positions"
                          )
                        }
                      />
                      <label htmlFor="isCurrentPosition">
                        This is my Current Position
                      </label>
                    </div>
                    <div className="input-group col">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        placeholder="Start Date"
                        value={position.startDate}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "employers",
                            subIndex,
                            "positions"
                          )
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
                        value={position.endDate}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "employers",
                            subIndex,
                            "positions"
                          )
                        }
                        required
                      />
                    </div>
                    <textarea
                      name="jobDescription"
                      id="jobDescription"
                      placeholder="Job Description"
                      value={position.jobDescription}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "employers",
                          subIndex,
                          "positions"
                        )
                      }
                    ></textarea>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    handleSubAddClick(index, "employers", "positions", {
                      positionTitle: "",
                      startDate: "",
                      endDate: "",
                      isCurrentPosition: false,
                      jobDescription: "",
                    })
                  }
                >
                  Add Position
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
                handleAddClick("employers", {
                  employerName: "",
                  positions: [
                    {
                      positionTitle: "",
                      startDate: "",
                      endDate: "",
                      isCurrentPosition: false,
                      jobDescription: "",
                    },
                  ],
                })
              }
            >
              Add Employer
            </button>
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
          </fieldset>
          <fieldset>
            <legend>Military Experience</legend>
            <div className="input-group row">
              <input
                type="text"
                name="militaryStatus"
                id="militaryStatus"
                placeholder="Military Status"
                value={formData.militaryStatus}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="militaryAdditionalInfo"
                id="militaryAdditionalInfo"
                placeholder="Additional Info"
                value={formData.militaryAdditionalInfo}
                onChange={handleInputChange}
              />
            </div>
            {formData.branches.map((branch, index) => (
              <div key={index} className="branches">
                <div className="input-group row">
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    placeholder="Branch"
                    value={branch.branch}
                    onChange={(e) => handleInputChange(e, index, "branches")}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleRemoveClick(index, "branches")}
                  >
                    Remove
                  </button>
                </div>
                <div className="input-group row">
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    placeholder="Unit"
                    value={branch.unit}
                    onChange={(e) => handleInputChange(e, index, "branches")}
                    required
                  />
                  <input
                    type="text"
                    name="beginningRank"
                    id="beginningRank"
                    placeholder="Beginning Rank"
                    value={branch.beginningRank}
                    onChange={(e) => handleInputChange(e, index, "branches")}
                    required
                  />
                  <input
                    type="text"
                    name="endingRank"
                    id="endingRank"
                    placeholder="Ending Rank"
                    value={branch.endingRank}
                    onChange={(e) => handleInputChange(e, index, "branches")}
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
                      value={branch.startDate}
                      onChange={(e) => handleInputChange(e, index, "branches")}
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
                      value={branch.endDate}
                      onChange={(e) => handleInputChange(e, index, "branches")}
                      required
                    />
                  </div>
                </div>
                <div className="input-group row">
                  <input
                    type="text"
                    name="areaOfExpertise"
                    id="areaOfExpertise"
                    placeholder="Area of Expertise"
                    value={branch.areaOfExpertise}
                    onChange={(e) => handleInputChange(e, index, "branches")}
                    required
                  />
                  <input
                    type="text"
                    name="recognition"
                    id="recognition"
                    placeholder="Recognition"
                    value={branch.recognition}
                    onChange={(e) => handleInputChange(e, index, "branches")}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                handleAddClick("branches", {
                  branch: "",
                  unit: "",
                  beginningRank: "",
                  endingRank: "",
                  startDate: "",
                  endDate: "",
                  areaOfExpertise: "",
                  recognition: "",
                })
              }
            >
              Add Branch
            </button>
          </fieldset>
          <fieldset>
            <legend>
              Desired Job Type{" "}
              <span className="highlight-text">(Optional)</span>
            </legend>
            <div className="input-group">
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType1"
                  value="Full-Time"
                  checked={formData.desiredJobType.includes("Full-Time")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType1">Full-Time</label>
              </div>
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType2"
                  value="Part-Time"
                  checked={formData.desiredJobType.includes("Part-Time")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType2">Part-Time</label>
              </div>
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType3"
                  value="Contract"
                  checked={formData.desiredJobType.includes("Contract")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType3">Contract</label>
              </div>
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType4"
                  value="Temporary"
                  checked={formData.desiredJobType.includes("Temporary")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType4">Temporary</label>
              </div>
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType5"
                  value="Internship"
                  checked={formData.desiredJobType.includes("Internship")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType5">Internship</label>
              </div>
              <div className="input-group row">
                <input
                  type="checkbox"
                  name="desiredJobType"
                  id="desiredJobType6"
                  value="Volunteer"
                  checked={formData.desiredJobType.includes("Volunteer")}
                  onChange={handleInputChange}
                />
                <label htmlFor="desiredJobType6">Volunteer</label>
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="desiredPay"
                id="desiredPay"
                placeholder="Desired Pay"
                value={formData.desiredPay}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="desiredCurrency"
                id="desiredCurrency"
                placeholder="Desired Currency"
                value={formData.desiredCurrency}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="desiredPaytime"
                id="desiredPaytime"
                placeholder="Desired Paytime"
                value={formData.desiredPaytime}
                onChange={handleInputChange}
              />
            </div>

            <textarea
              name="additionalPreferences"
              id="additionalPreferences"
              placeholder="Additional Preferences"
              value={formData.additionalPreferences}
              onChange={handleInputChange}
            ></textarea>
          </fieldset>
          <p className="left">
            By checking the box below, you agree to make your resume visible to
            employers.
          </p>
          <div className="input-group row">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleInputChange}
            />
            <label htmlFor="published">Publish Resume</label>
          </div>
          <button type="submit" className="btn">
            Save Your Resume
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditResume;
