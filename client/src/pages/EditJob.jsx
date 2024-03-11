import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const EditJob = () => {
  const [job, setJob] = useState({});
  const { id } = useParams();

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

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(
          `${API}/controllers/getJob.php?job_id=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setJob(data.job[0]);
          console.log(job);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getJob();
  }, [id, job]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const [first, second] = name.split(".");
    const updatedJob = { ...job };

    if (type === "checkbox") {
      updatedJob[first][second] = checked;
    } else {
      updatedJob[first] = value;
    }

    setJob(updatedJob);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const key in job) {
      formData.append(key, job[key]);
    }

    try {
      const response = await fetch(`${API}/controllers/editJob.php`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log(data);
        toast.success("Job updated successfully!");
        navigate("/recruiter-dashboard");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
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
                value={job.companyName}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="website"
                placeholder="Website"
                value={job.website}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="natureOfBusiness"
                placeholder="Nature of Business"
                value={job.natureOfBusiness}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address in full"
                autoComplete="on"
                value={job.address}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="fax"
                placeholder="Fax"
                value={job.fax}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="areaCode"
                placeholder="Area Code"
                value={job.areaCode}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="landline"
                placeholder="Land Line no."
                value={job.landline}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mob no."
                value={job.mobile}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="email"
                placeholder="E-Mail Address"
                autoComplete="on"
                value={job.email}
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
                value={job.employerName}
                onChange={handleInputChange}
                required
              />

              <textarea
                name="companyDescription"
                placeholder="Company Description"
                value={job.companyDescription}
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
                value={job.jobDesignation}
                onChange={handleInputChange}
                required
              />

              <select
                name="jobType"
                value={job.jobType}
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
                value={job.dutyDescription}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="essentialQualificationEssential"
                placeholder="Required Essential qualification (Essential)"
                value={job.essentialQualificationEssential}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="essentialQualificationDesirable"
                placeholder="Required Desirable qualification (Desirable)"
                value={job.essentialQualificationDesirable}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="ageLimit"
                placeholder="Age limit"
                value={job.ageLimit}
                onChange={handleInputChange}
                required
              />

              <div className="input-group">
                <input
                  type="checkbox"
                  name="womenEligible"
                  id="womenEligible"
                  checked={job.womenEligible}
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
                  name="workingHoursFrom"
                  id="workingHoursFrom"
                  placeholder="Working Hours From"
                  value={job.workingHoursFrom}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group col">
                <label htmlFor="workingHoursTo">Working Hours - To</label>
                <input
                  type="time"
                  name="workingHoursTo"
                  placeholder="To"
                  value={job.workingHoursTo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <input
                type="text"
                name="vacanciesRegular"
                placeholder="Number of Vacancies (Regular)"
                value={job.vacanciesRegular}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="vacanciesTemporary"
                placeholder="Number of Vacancies (Temporary)"
                value={job.vacanciesTemporary}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="payAndAllowances"
                placeholder="Pay and Allowances"
                value={job.payAndAllowances}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="placeOfWork"
                placeholder="Place of work"
                value={job.placeOfWork}
                onChange={handleInputChange}
                required
              />

              <select
                name="resumesToBeSent"
                value={job.resumesToBeSent}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Resumes to be sent
                </option>
                <option value="Online">Online</option>
                <option value="Hardcopy">Hardcopy</option>
              </select>

              {job.resumesToBeSent === "Online" && (
                <input
                  type="text"
                  name="resumeEmail"
                  placeholder="If online, the email id to which the resume be sent"
                  value={job.resumeEmail}
                  onChange={handleInputChange}
                />
              )}
            </fieldset>

            <fieldset>
              <legend>Interview Details</legend>
              <input
                type="date"
                name="interviewDetailsDate"
                placeholder="Date of Interview/Test of Applicant/s"
                value={job.interviewDetailsDate}
                onChange={handleInputChange}
                required
              />

              <div className="input-group col">
                <label htmlFor="interviewDetailsTime">
                  Time of Interview/Test of Applicant/s
                </label>
                <input
                  type="time"
                  format=""
                  name="interviewDetailsTime"
                  placeholder="Time"
                  value={job.interviewDetailsTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="interviewDetailsAptitudeTest"
                  id="interviewDetailsAptitudeTest"
                  checked={job.interviewDetailsAptitudeTest}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetailsAptitudeTest">
                  Aptitude Test
                </label>

                <input
                  type="checkbox"
                  name="interviewDetailsTechnicalTest"
                  id="interviewDetailsTechnicalTest"
                  checked={job.interviewDetailsTechnicalTest}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetailsTechnicalTest">
                  Technical Test
                </label>

                <input
                  type="checkbox"
                  name="interviewDetailsGroupDiscussion"
                  id="interviewDetailsGroupDiscussion"
                  checked={job.interviewDetailGroupDiscussion}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetailGroupDiscussion">
                  Group Discussion
                </label>

                <input
                  type="checkbox"
                  name="interviewDetailsPersonalInterview"
                  id="interviewDetails.personalInterview"
                  checked={job.interviewDetailsPersonalInterview}
                  onChange={handleInputChange}
                />
                <label htmlFor="interviewDetailsPersonalInterview">
                  Personal Interview
                </label>
              </div>

              {job.interviewDetailsTechnicalTest && (
                <input
                  type="text"
                  name="interviewDetailsTopics"
                  placeholder="If yes, please specify likely topics/skill sets"
                  value={job.interviewDetailsTopics}
                  onChange={handleInputChange}
                />
              )}

              <input
                type="text"
                name="interviewDetailsContactPerson"
                placeholder="Contact person to whom to report"
                value={job.interviewDetailsContactPerson}
                onChange={handleInputChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Disability Information</legend>
              <select
                name="disabilityInfoType"
                value={job.disabilityInfoType}
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
                name="disabilityInfoPercentage"
                value={job.disabilityInfoPercentage}
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
                name="disabilityInfoAidOrAppliance"
                placeholder="As per nature of Job, aid or appliance using applicant will serve the need"
                value={job.disabilityInfoAidOrAppliance}
                onChange={handleInputChange}
                required
              />

              <div className="input-group">
                <input
                  type="radio"
                  name="vehiclePreference"
                  id="ownVehiclePreferred"
                  value="ownVehiclePreferred"
                  checked={job.ownVehiclePreferred}
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
                  checked={job.conveyanceProvided}
                  onChange={handleInputChange}
                />
                <label htmlFor="conveyanceProvided">
                  Whether conveyance provided
                </label>
              </div>

              {job.conveyanceProvided && (
                <input
                  type="text"
                  name="conveyanceType"
                  placeholder="What Type of conveyance?"
                  value={job.conveyanceType}
                  onChange={handleInputChange}
                />
              )}

              <textarea
                name="otherInformation"
                placeholder="Any other information"
                value={job.otherInformation}
                onChange={handleInputChange}
              />
            </fieldset>

            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditJob;
