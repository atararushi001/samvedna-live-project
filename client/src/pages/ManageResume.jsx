import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Resume from "./components/Resume";

const API = import.meta.env.VITE_API_URL;

const ManageResume = () => {
  const navigate = useNavigate();
  const jobSeekerId = sessionStorage.getItem("job_seekers_id");

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

  const [publicResumes, setPublicResumes] = useState([]);
  const [privateResumes, setPrivateResumes] = useState([]);

  useEffect(() => {
    fetch(`${API}/controllers/getResumes.php?jobSeekerId=${jobSeekerId}`, {
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
          setPublicResumes(data.publicResumes);
          setPrivateResumes(data.privateResumes);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  }, [navigate, jobSeekerId]);

  return (
    <div className="container">
      <section className="create-resume-section">
        <h1>
          Create <span className="highlight-text">Resume</span>
        </h1>
        <p>
          Create your resume today! Once you have a resume created and saved in
          our system you can publish it to our Resume Bank so employers find
          you! Or keep it private and use it when applying online for jobs.
          Choose an option below to get started
        </p>
        <Link to="/job-seeker-dashboard/create-resume" className="btn">
          Create Resume
        </Link>
      </section>
      <section className="resume-section">
        <h1>
          Manage <span className="highlight-text">Resumes</span>
        </h1>
        <div className="resume-status">
          <Resume
            resumes={publicResumes}
            where="job-seeker-dashboard"
            title="Public Resumes"
            description={`You don't have a resume active on this site right now. Employers searching for resumes will not be able to find yours unless you have posted it. To post one of your resumes below, choose "Publish on this site" from the options menu.`}
          />
          <Resume
            resumes={privateResumes}
            where="job-seeker-dashboard"
            title="Private Resumes"
            description="You have no private resumes."
          />
        </div>
      </section>
    </div>
  );
};

export default ManageResume;
