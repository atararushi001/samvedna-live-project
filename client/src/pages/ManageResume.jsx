import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Resume from "./components/Resume";

const API = import.meta.env.VITE_API_URL;

const ManageResume = () => {
  const navigate = useNavigate();

  const [publicResumes, setPublicResumes] = useState([]);
  const [privateResumes, setPrivateResumes] = useState([]);

  useEffect(() => {
    fetch(`${API}/controllers/getResume.php`, {
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
  }, [navigate]);

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
        <div className="controls">
          <Link to="/job-seeker-dashboard/create-resume" className="btn">
            Create Resume
          </Link>
          <Link
            to="/job-seeker-dashboard/upload-resume"
            className="btn btn-outline"
          >
            Upload Resume
          </Link>
        </div>
      </section>
      <section className="resume-section">
        <h1>
          Manage <span className="highlight-text">Resumes</span>
        </h1>
        <div className="resume-status">
          <Resume
            resumes={publicResumes}
            title="Public Resumes"
            description={`You don't have a resume active on this site right now. Employers searching for resumes will not be able to find yours unless you have posted it. To post one of your resumes below, choose "Publish on this site" from the options menu.`}
          />
          <Resume
            resumes={privateResumes}
            title="Private Resumes"
            description="You have no private resumes."
          />
        </div>
      </section>
    </div>
  );
};

export default ManageResume;
