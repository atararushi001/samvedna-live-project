import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const PostJob = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      }
    } else {
      navigate("/recruiter-login");
    }
  }, [navigate, loginState, userDetails]);

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    natureOfBusiness: "",
    country: "",
    state: "",
    city: "",
    fax: "",
    areaCode: "",
    landline: "",
    mobile: "",
    email: "",
    employerName: "",
    companyDescription: "",
    jobDesignation: "",
    industryCategory: "",
    jobTitle: "",
    jobType: "",
    dutyDescription: "",
    jobDuration: "",
    minimumEducation: "",
    minimumExperience: "",
    salary: {
      min: "",
      max: "",
    },
    workplaceType: "",
    placeOfWork: "",
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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  const handleSubmit = async (event) => {
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

    const response = await fetch(`${API}/recruiter/post-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
      body: JSON.stringify(flattenedData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      navigate("/recruiter-dashboard/view-jobs");
    } else {
      toast.error(data.message);
    }
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
                placeholder="Enter Position Title"
                value={formData.jobDesignation}
                onChange={handleInputChange}
                required
              />

              <select
                name="industryCategory"
                id="industryCategory"
                value={formData.industryCategory}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Industry Category
                </option>
                <option value="Advertising/Marketing">
                  Advertising/Marketing
                </option>
                <option value="Agricultural">Agricultural</option>
                <option value="Airline/Aerospace/Aviation">
                  Airline/Aerospace/Aviation
                </option>
                <option value="Apparel/Textiles">Apparel/Textiles</option>
                <option value="Architecture / Design">
                  Architecture / Design
                </option>
                <option value="Art/Photography">Art/Photography</option>
                <option value="Automotive-vehicles/parts/service">
                  Automotive-vehicles/parts/service
                </option>
                <option value="Banking / Accounting / Financial">
                  Banking / Accounting / Financial
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Broadcasting/Radio/TV">
                  Broadcasting/Radio/TV
                </option>
                <option value="Building Materials">Building Materials</option>
                <option value="Computer Hardware">Computer Hardware</option>
                <option value="Computer Software">Computer Software</option>
                <option value="Construction">Construction</option>
                <option value="Consulting">Consulting</option>
                <option value="Consumer Products">Consumer Products</option>
                <option value="Education / Teaching / Administration">
                  Education / Teaching / Administration
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Energy/Utilities/Gas/Oil/Electric">
                  Energy/Utilities/Gas/Oil/Electric
                </option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Environmental">Environmental</option>
                <option value="Food/Beverages">Food/Beverages</option>
                <option value="General">General</option>
                <option value="Government/Civil Service">
                  Government/Civil Service
                </option>
                <option value="Healthcare / Health Services">
                  Healthcare / Health Services
                </option>
                <option value="Hospitality / Tourism">
                  Hospitality / Tourism
                </option>
                <option value="Human Resources/Staffing">
                  Human Resources/Staffing
                </option>
                <option value="HVAC">HVAC</option>
                <option value="Industrial/Materials">
                  Industrial/Materials
                </option>
                <option value="Insurance">Insurance</option>
                <option value="Internet / E-Commerce">
                  Internet / E-Commerce
                </option>
                <option value="Law Enforcement / Security">
                  Law Enforcement / Security
                </option>
                <option value="Legal">Legal</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Merchandising">Merchandising</option>
                <option value="Military">Military</option>
                <option value="Non-Profit / Charity">
                  Non-Profit / Charity
                </option>
                <option value="Office Equipment">Office Equipment</option>
                <option value="Other">Other</option>
                <option value="Packaging">Packaging</option>
                <option value="Pharmaceutical">Pharmaceutical</option>
                <option value="Printing / Publishing">
                  Printing / Publishing
                </option>
                <option value="Public / Community Relations">
                  Public / Community Relations
                </option>
                <option value="Real Estate/Property Management">
                  Real Estate/Property Management
                </option>
                <option value="Recreation">Recreation</option>
                <option value="Restaurants / Food Service">
                  Restaurants / Food Service
                </option>
                <option value="Retail">Retail</option>
                <option value="Semiconductor">Semiconductor</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Training/Training Products">
                  Training/Training Products
                </option>
              </select>

              <select
                name="jobTitle"
                id="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Job Title
                </option>
                <option value="Accounting/Finance">Accounting/Finance</option>
                <option value="Administrative Support">
                  Administrative Support
                </option>
                <option value="Administrative Services">
                  Administrative Services
                </option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Business Analytics & Consulting">
                  Business Analytics & Consulting
                </option>
                <option value="Business Development & Strategy">
                  Business Development & Strategy
                </option>
                <option value="Clinical">Clinical</option>
                <option value="Compliance">Compliance</option>
                <option value="Consultant">Consultant</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Art & Design">Art & Design</option>
                <option value="Education/Training">Education/Training</option>
                <option value="Engineering">Engineering</option>
                <option value="Executive/Management">
                  Executive/Management
                </option>
                <option value="Facilities">Facilities</option>
                <option value="Finance">Finance</option>
                <option value="General Business">General Business</option>
                <option value="Global Comms & Corp Marketing">
                  Global Comms & Corp Marketing
                </option>
                <option value="Health Econ, Policy & Reimbursement">
                  Health Econ, Policy & Reimbursement
                </option>
                <option value="Healthcare">Healthcare</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Intern">Intern</option>
                <option value="Inventory">Inventory</option>
                <option value="Legal">Legal</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Marketing">Marketing</option>
                <option value="Medical">Medical</option>
                <option value="Office Support">Office Support</option>
                <option value="Studio Operations">Studio Operations</option>
                <option value="Professional Services">
                  Professional Services
                </option>
                <option value="Sourcing & Procurement">
                  Sourcing & Procurement
                </option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Regulatory Affairs">Regulatory Affairs</option>
                <option value="Research">Research</option>
                <option value="Safety">Safety</option>
                <option value="Sales">Sales</option>
                <option value="Science">Science</option>
                <option value="Shipping">Shipping</option>
                <option value="Skilled Labor">Skilled Labor</option>
                <option value="Strategy/Planning">Strategy/Planning</option>
                <option value="Supply Chain">Supply Chain</option>
                <option value="Technicians">Technicians</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Digital & Interactive Media">
                  Digital & Interactive Media
                </option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Security">Security</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Retail">Retail</option>
                <option value="Production (entertainment/media)">
                  Production (entertainment/media)
                </option>
                <option value="Culinary/Food Service">
                  Culinary/Food Service
                </option>
                <option value="Communications & Public Relations">
                  Communications & Public Relations
                </option>
                <option value="Writer">Writer</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Construction">Construction</option>
                <option value="Transportation">Transportation</option>
              </select>

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
                <option value="Temporary">Temporary</option>
                <option value="Temporary-to-Hire">Temporary-to-Hire</option>
                <option value="Internship">Internship</option>
                <option value="Volunteer">Volunteer</option>
              </select>

              <textarea
                name="dutyDescription"
                placeholder="Enter Job Description"
                value={formData.dutyDescription}
                onChange={handleInputChange}
                required
              />

              <select
                name="jobDuration"
                id="jobDuration"
                value={formData.jobDuration}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Job Duration
                </option>
                <option value="Indefinite">Indefinite</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="6-12 Months">6-12 Months</option>
                <option value="3-6 Months">3-6 Months</option>
                <option value="1-3 Months">1-3 Months</option>
                <option value="2-4 Weeks">2-4 Weeks</option>
              </select>

              <select
                name="minimumEducation"
                id="minimumEducation"
                value={formData.minimumEducation}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Minumum Education
                </option>
                <option value="None">None</option>
                <option value="H.S. Diploma/Equivalent">
                  H.S. Diploma/Equivalent
                </option>
                <option value="Associates Degree">Associates Degree</option>
                <option value="BA/BS/Undergraduate">BA/BS/Undergraduate</option>
                <option value="Master's Degree">Master&apos;s Degree</option>
                <option value="Ph.D">Ph.D</option>
              </select>

              <select
                name="minimumExperience"
                id="minumumExperience"
                value={formData.minimumExperience}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Minumum Experience
                </option>
                <option value="None">None</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="2-3 Years">2-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-7 Years">5-7 Years</option>
              </select>

              <label htmlFor="salary.min">Salary</label>
              <div className="input-group">
                <input
                  type="number"
                  name="salary.min"
                  placeholder="Min"
                  value={formData.salary.min}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="salary.max">to</label>
                <input
                  type="number"
                  name="salary.max"
                  placeholder="Max"
                  value={formData.salary.max}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <select
                name="workplaceType"
                id="workplaceType"
                value={formData.workplaceType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Workplace Type
                </option>
                <option value="On-Site">On-Site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>

              <input
                type="text"
                name="placeOfWork"
                placeholder="Place of work"
                value={formData.placeOfWork}
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

              {formData.resumesToBeSent === "Website" && (
                <input
                  type="text"
                  name="resumeWebsite"
                  placeholder="If Website, the website to which the resume be sent"
                  value={formData.resumeWebsite}
                  onChange={handleInputChange}
                />
              )}
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
