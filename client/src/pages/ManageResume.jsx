import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

import Resume from "./components/Resume";

const API = import.meta.env.VITE_API_URL;

const ManageResume = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.userType === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, loginState, userDetails]);

  const [publicResumes, setPublicResumes] = useState([]);
  const [privateResumes, setPrivateResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const response = await fetch(`${API}/job-seeker/get-resumes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPublicResumes(data.publicResumes);
        setPrivateResumes(data.privateResumes);
      } else {
        toast.error(data.message);
      }
    };

    fetchResumes();
  }, [navigate, userDetails]);

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
