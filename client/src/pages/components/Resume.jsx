import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_API_URL;

const Resume = ({ resumes, title, description }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const formData = new FormData();
    formData.append("resume_id", id);

    fetch(`${API}/controllers/deleteResume.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

  return (
    <div className="resumes">
      <div className="resumes-header">
        <h2>{title}</h2>
      </div>
      <div className="resumes-body">
        {resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div key={index} className="resume">
              <Link
                to={`/job-seeker-dashboard/view-resume/${resume.resume_id}`}
              >
                <h3>{resume.resumeName}</h3>
              </Link>
              {resume.published ? (
                <p>
                  Published on:{" "}
                  {new Date(resume.published_on).toLocaleDateString()}
                </p>
              ) : (
                <p>
                  Created on: {new Date(resume.created_on).toLocaleDateString()}
                </p>
              )}
              <div className="controls">
                <Link
                  className="link"
                  to={`/job-seeker-dashboard/edit-resume/${resume.resume_id}`}
                >
                  <FontAwesomeIcon icon="pen" />
                </Link>
                <button
                  className="link"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                  onClick={() => handleDelete(resume.resume_id)}
                >
                  <FontAwesomeIcon icon="trash" className="link delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  );
};

Resume.propTypes = {
  resumes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Resume;
