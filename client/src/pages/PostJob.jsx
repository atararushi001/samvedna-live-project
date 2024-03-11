import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const PostJob = () => {
  const recruiterId = sessionStorage.getItem("recruiters_id");
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        // navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/recruiter-login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    natureOfBusiness: "",
    address: "",
    fax: "",
    areaCode: "",
    landline: "",
    mobile: "",
    email: "",
    employerName: "",
    companyDescription: "",
    jobDesignation: "",
    jobType: "",
    dutyDescription: "",
    essentialQualification: {
      essential: "",
      desirable: "",
    },
    ageLimit: "",
    womenEligible: false,
    workingHours: {
      from: "",
      to: "",
    },
    vacancies: {
      regular: "",
      temporary: "",
    },
    payAndAllowances: "",
    placeOfWork: "",
    resumesToBeSent: "",
    resumeEmail: "",
    resumeWebsite: "",
    interviewDetails: {
      date: "",
      time: "",
      aptitudeTest: false,
      technicalTest: false,
      groupDiscussion: false,
      personalInterview: false,
      topics: "",
      contactPerson: "",
    },
    disabilityInfo: {
      type: "",
      percentage: "",
      aidOrAppliance: "",
    },
    ownVehiclePreferred: false,
    conveyanceProvided: false,
    conveyanceType: "",
    otherInformation: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      if (name === "vehiclePreference") {
        return {
          ...prevFormData,
          ownVehiclePreferred: value === "ownVehiclePreferred",
          conveyanceProvided: value === "conveyanceProvided",
        };
      } else if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prevFormData,
          [parent]: {
            ...prevFormData[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value,
        };
      }
    });
  };

  function flattenData(data) {
    const result = {};

    for (const key in data) {
      if (typeof data[key] === "object" && data[key] !== null) {
        const temp = flattenData(data[key]);
        for (const k in temp) {
          result[`${key}${k.charAt(0).toUpperCase() + k.slice(1)}`] = temp[k];
        }
      } else {
        result[key] = data[key];
      }
    }

    return result;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.workingHours.from > formData.workingHours.to) {
      toast.error("Working hours from should be less than working hours to");
      return;
    }

    if (
      formData.interviewDetails.date < new Date().toISOString().slice(0, 10)
    ) {
      toast.error("Interview date should be greater than today's date");
      return;
    }

    if (
      formData.interviewDetails.technicalTest &&
      formData.interviewDetails.topics === ""
    ) {
      toast.error("Technical test details should be filled");
      return;
    }

    if (formData.resumesToBeSent === "Online" && formData.resumeEmail === "") {
      toast.error("Resume email should be filled");
      return;
    }

    if (
      formData.disabilityInfo.type === "" &&
      formData.disabilityInfo.percentage === "" &&
      formData.disabilityInfo.aidOrAppliance === ""
    ) {
      toast.error("Disability information should be filled");
      return;
    }

    if (formData.vehiclePreference === "" && formData.conveyanceType === "") {
      toast.error("Vehicle preference should be filled");
      return;
    }

    if (
      formData.vehiclePreference === "conveyanceProvided" &&
      formData.conveyanceType === ""
    ) {
      toast.error("Conveyance type should be filled");
      return;
    }

    const flattenedData = flattenData(formData);

    const data = new FormData();
    data.append("recruiter_id", recruiterId);

    for (const key in flattenedData) {
      data.append(key, flattenedData[key]);
    }

    fetch(`${API}/controllers/postJob.php`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          navigate("/recruiter-dashboard/view-jobs");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <div className="container">
        <section className="post-jobs">
          <h1>
            <strong className="highlight-text">Post</strong> a Job
          </h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Company Information</legend>
              <input
                type="text"
                name="companyName"
                placeholder="Name of the Company"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="natureOfBusiness"
                placeholder="Nature of Business"
                value={formData.natureOfBusiness}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address in full"
                autoComplete="on"
                value={formData.address}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="fax"
                placeholder="Fax"
                value={formData.fax}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="areaCode"
                placeholder="Area Code"
                value={formData.areaCode}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="landline"
                placeholder="Land Line no."
                value={formData.landline}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mob no."
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="email"
                placeholder="E-Mail Address"
                autoComplete="on"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Employer Information</legend>
              <input
                type="text"
                name="employerName"
                placeholder="Name of Employer"
                value={formData.employerName}
                onChange={handleInputChange}
                required
              />

              <textarea
                name="companyDescription"
                placeholder="Company Description"
                value={formData.companyDescription}
                onChange={handleInputChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Job Information</legend>
              <input
                type="text"
                name="jobDesignation"
                placeholder="Job designation offered"
                value={formData.jobDesignation}
                onChange={handleInputChange}
                required
              />

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Job Type
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Work From Home">Work From Home</option>
              </select>

              <textarea
                name="dutyDescription"
                placeholder="Description of duty"
                value={formData.dutyDescription}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="essentialQualification.essential"
                placeholder="Required Essential qualification (Essential)"
                value={formData.essentialQualification?.essential || ""}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="essentialQualification.desirable"
                placeholder="Required Desirable qualification (Desirable)"
                value={formData.essentialQualification?.desirable || ""}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="ageLimit"
                placeholder="Age limit"
                value={formData.ageLimit}
                onChange={handleInputChange}
                required
              />

              <div className="input-group">
                <input
                  type="checkbox"
                  name="womenEligible"
                  id="womenEligible"
                  checked={formData.womenEligible}
                  onChange={handleInputChange}
                />
                <label htmlFor="womenEligible">
                  Whether Women Are Eligible?
                </label>
              </div>

              <div className="input-group col">
                <label htmlFor="workingHoursFrom">Working Hours - From</label>
                <input
                  type="time"
                  name="workingHours.from"
                  id="workingHoursFrom"
                  placeholder="Working Hours From"
                  value={formData.workingHours.from}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group col">
                <label htmlFor="workingHours.to">Working Hours - To</label>
                <input
                  type="time"
                  name="workingHours.to"
                  placeholder="To"
                  value={formData.workingHours.to}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <input
                type="text"
                name="vacancies.regular"
                placeholder="Number of Vacancies (Regular)"
                value={formData.vacancies.regular}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="vacancies.temporary"
                placeholder="Number of Vacancies (Temporary)"
                value={formData.vacancies?.temporary || ""}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="payAndAllowances"
                placeholder="Pay and Allowances"
                value={formData.payAndAllowances}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="placeOfWork"
                placeholder="Place of work"
                value={formData.placeOfWork}
                onChange={handleInputChange}
                required
              />

              <select
                name="resumesToBeSent"
                value={formData.resumesToBeSent}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Resumes to be sent
                </option>
                <option value="Online">Online</option>
                <option value="Website">Website</option>
              </select>

              {formData.resumesToBeSent === "Online" && (
                <input
                  type="text"
                  name="resumeEmail"
                  placeholder="If online, the email id to which the resume be sent"
                  value={formData.resumeEmail}
                  onChange={handleInputChange}
                />
              )}

              {
                formData.resumesToBeSent === "Website" && (
                  <input
                    type="text"
                    name="resumeWebsite"
                    placeholder="If Website, the website to which the resume be sent"
                    value={formData.resumeWebsite}
                    onChange={handleInputChange}
                  />
                )
              }

            </fieldset>

            <fieldset>
              <legend>Interview Details</legend>
              <input
                type="date"
                name="interviewDetails.date"
                placeholder="Date of Interview/Test of Applicant/s"
                value={formData.interviewDetails.date}
                onChange={handleInputChange}
                required
              />

              <div className="input-group col">
                <label htmlFor="interviewDetails.time">
                  Time of Interview/Test of Applicant/s
                </label>
                <input
                  type="time"
                  format=""
                  name="interviewDetails.time"
                  placeholder="Time"
                  value={formData.interviewDetails.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="interviewDetails.aptitudeTest"
                  id="interviewDetails.aptitudeTest"
                  checked={formData.interviewDetails.aptitudeTest}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetails.aptitudeTest">
                  Aptitude Test
                </label>

                <input
                  type="checkbox"
                  name="interviewDetails.technicalTest"
                  id="interviewDetails.technicalTest"
                  checked={formData.interviewDetails.technicalTest}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetails.technicalTest">
                  Technical Test
                </label>

                <input
                  type="checkbox"
                  name="interviewDetails.groupDiscussion"
                  id="interviewDetails.groupDiscussion"
                  checked={formData.interviewDetails.groupDiscussion}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetails.groupDiscussion">
                  Group Discussion
                </label>

                <input
                  type="checkbox"
                  name="interviewDetails.personalInterview"
                  id="interviewDetails.personalInterview"
                  checked={formData.interviewDetails.personalInterview}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetails.personalInterview">
                  Personal Interview
                </label>
              </div>

              {formData.interviewDetails.technicalTest && (
                <input
                  type="text"
                  name="interviewDetails.topics"
                  placeholder="If yes, please specify likely topics/skill sets"
                  value={formData.interviewDetails.topics}
                  onChange={handleInputChange}
                />
              )}

              <input
                type="text"
                name="interviewDetails.contactPerson"
                placeholder="Contact person to whom to report"
                value={formData.interviewDetails.contactPerson}
                onChange={handleInputChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Disability Information</legend>
              <select
                name="disabilityInfo.type"
                value={formData.disabilityInfo.type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Type of disability
                </option>
                <option value="Locomotor">Orthopedic</option>
                <option value="Visual">Visual</option>
                <option value="Hearing">Hearing</option>
              </select>

              <select
                name="disabilityInfo.percentage"
                value={formData.disabilityInfo.percentage}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Percentage of disability
                </option>
                <option value="40-50">40-50</option>
                <option value="50-60">50-60</option>
                <option value="60-70">60-70</option>
                <option value="70-80">70-80</option>
                <option value="80-90">80-90</option>
                <option value="90-100">90-100</option>
              </select>

              <input
                type="text"
                name="disabilityInfo.aidOrAppliance"
                placeholder="As per nature of Job, aid or appliance using applicant will serve the need"
                value={formData.disabilityInfo.aidOrAppliance}
                onChange={handleInputChange}
                required
              />

              <div className="input-group">
                <input
                  type="radio"
                  name="vehiclePreference"
                  id="ownVehiclePreferred"
                  value="ownVehiclePreferred"
                  checked={formData.ownVehiclePreferred}
                  onChange={handleInputChange}
                />
                <label htmlFor="ownVehiclePreferred">
                  Whether own vehicle preferred
                </label>

                <input
                  type="radio"
                  name="vehiclePreference"
                  id="conveyanceProvided"
                  value="conveyanceProvided"
                  checked={formData.conveyanceProvided}
                  onChange={handleInputChange}
                />
                <label htmlFor="conveyanceProvided">
                  Whether conveyance provided
                </label>
              </div>

              {formData.conveyanceProvided && (
                <input
                  type="text"
                  name="conveyanceType"
                  placeholder="What Type of conveyance?"
                  value={formData.conveyanceType}
                  onChange={handleInputChange}
                />
              )}

              <textarea
                name="otherInformation"
                placeholder="Any other information"
                value={formData.otherInformation}
                onChange={handleInputChange}
              />
            </fieldset>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default PostJob;
