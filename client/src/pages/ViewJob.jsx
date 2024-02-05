import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import { SessionState } from "../context/SessionProvider";

const API = import.meta.env.VITE_API_URL;

const ViewJob = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    navigate("/");
  }

  const jobId = location.state.jobId;

  const [job, setJob] = useState({});

  // const { setIsLoggedIn, setRecruiterId } = SessionState();  

  useEffect(() => {
    fetch(`${API}/controllers/getJob.php?job_id=${jobId}`, {
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
          console.log(data.job[0]);
          setJob(data.job[0]);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jobId]);

  // useEffect(() => {
  //   fetch(`${API}/utils/checkLogin.php`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.isLoggedIn) {
  //         setIsLoggedIn(true);
  //         if (data.recruiters_id) {
  //           setRecruiterId(data.recruiters_id);
  //         }
  //       } else {
  //         setIsLoggedIn(false);
  //         setRecruiterId(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [setIsLoggedIn, setRecruiterId, navigate]);

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
      navigate("/job-seeker-login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <section className="view-job">
        <h1>
          Job at <strong className="highlight-text">{job.companyName}</strong>
        </h1>
        <div className="job">
          <img
            src={`${API}/uploads/profilePictures/${job.profilePicture}`}
            alt={job.profilePicture}
          />
          <h2>{job.jobDesignation}</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Email Address:</h3>
              <p>{job.email}</p>
            </div>
            <div className="job-detail">
              <h3>Job Type:</h3>
              <p>{job.jobDesignation}</p>
            </div>
            <div className="job-detail">
              <h3>Location:</h3>
              <p>{job.placeOfWork}</p>
            </div>
            <div className="job-detail">
              <h3>Salary:</h3>
              <p>{job.payAndAllowances}</p>
            </div>
            <div className="job-detail">
              <h3>Nature of Business:</h3>
              <p>{job.natureOfBusiness}</p>
            </div>
            <div className="job-detail">
              <h3>Address:</h3>
              <p>{job.address}</p>
            </div>
            <div className="job-detail">
              <h3>Job Description:</h3>
              <p>{job.dutyDescription}</p>
            </div>
            <div className="job-detail">
              <h3>Company Description:</h3>
              <p>{job.companyDescription}</p>
            </div>
            <div className="job-detail">
              <h3>Essential Qualification:</h3>
              <p>{job.essentialQualificationEssential}</p>
            </div>
            <div className="job-detail">
              <h3>Desirable Qualification:</h3>
              <p>{job.essentialQualificationDesirable}</p>
            </div>
            <div className="job-detail">
              <h3>Age Limit:</h3>
              <p>{job.ageLimit}</p>
            </div>
            <div className="job-detail">
              <h3>Women Eligible:</h3>
              <p>{job.womenEligible ? "Yes" : "No"}</p>
            </div>
            <div className="job-detail">
              <h3>Working Hours:</h3>
              <p>
                {job.workingHoursFrom} to {job.workingHoursTo}
              </p>
            </div>
            <div className="job-detail">
              <h3>Resumes to be Sent:</h3>
              <p>
                {job.resumesToBeSend === "email" ? job.resumeEmail : "Hardcopy"}
              </p>
            </div>
            <div className="job-detail">
              <h3>Regular Vacancies:</h3>
              <p>{job.vacanciesRegular}</p>
            </div>
            <div className="job-detail">
              <h3>Temporary Vacancies:</h3>
              <p>{job.vacanciesTemporary}</p>
            </div>
            <div className="job-detail">
              <h3>Disability Info:</h3>
              <p>{job.disabilityInfoType}</p>
            </div>
            <div className="job-detail">
              <h3>Disability Percentage:</h3>
              <p>{job.disabilityInfoPercentage}</p>
            </div>
            <div className="job-detail">
              <h3>Disability Aid or Appliances:</h3>
              <p>{job.disabilityInfoAidOrAppliance}</p>
            </div>
            {job.ownVehiclePreferred ? (
              <div className="job-detail">
                <h3>Own Vehicle Preferred:</h3>
                <p>Yes</p>
              </div>
            ) : null}
            {job.conveyanceProvided ? (
              <>
                <div className="job-detail">
                  <h3>Conveyance Provided:</h3>
                  <p>Yes</p>
                </div>
                <div className="job-detail">
                  <h3>Vehicle Type:</h3>
                  <p>{job.conveyanceType}</p>
                </div>
              </>
            ) : null}
          </div>
          <h2>Interview Details</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Interview Date:</h3>
              <p>{job.interviewDetailsDate}</p>
            </div>
            <div className="job-detail">
              <h3>Interview Time:</h3>
              <p>{job.interviewDetailsTime}</p>
            </div>
            <div className="job-detail">
              <h3>Interview Contact Person:</h3>
              <p>{job.interviewDetailsContactPerson}</p>
            </div>
            <div className="job-detail">
              <h3>Interview Contact Number:</h3>
              <p>{job.mobile}</p>
            </div>
            <div className="job-detail">
              <h3>Apptitude Test:</h3>
              <p>{job.interviewDetailsAptitudeTest ? "Yes" : "No"}</p>
            </div>
            <div className="job-detail">
              <h3>Group Discussion:</h3>
              <p>{job.interviewDetailsGroupDiscussion ? "Yes" : "No"}</p>
            </div>
            <div className="job-detail">
              <h3>Personal Interview:</h3>
              <p>{job.interviewDetailsPersonalInterview ? "Yes" : "No"}</p>
            </div>
            <div className="job-detail">
              <h3>Technical Interview:</h3>
              <p>{job.interviewDetailsTechnicalInterview ? "Yes" : "No"}</p>
            </div>
            {job.interviewDetailsTechnicalInterview && (
              <div className="job-detail">
                <h3>Technical Interview Details:</h3>
                <p>{job.interviewTopics}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewJob;
