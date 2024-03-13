import { useState } from "react";
import { Link } from "react-router-dom";

import Resume from "./components/Resume";

const ManageResume = () => {
  const [publicResumes, setPublicResumes] = useState([
    {
      id: 1,
      name: "John Doe",
      published: "2021-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      published: "2021-01-01",
    },
  ]);
  const [privateResumes, setPrivateResumes] = useState([]);
  const [unsavedResumes, setUnsavedResumes] = useState([]);

  return (
    <div className="container">
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
          <Resume
            resumes={unsavedResumes}
            title="Unsaved Resumes"
            description="You have no unsaved resumes."
          />
        </div>
      </section>
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
    </div>
  );
};

export default ManageResume;
