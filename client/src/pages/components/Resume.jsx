import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const Resume = ({ resumes, title, description, where }) => {
  const navigate = useNavigate();
  const { userDetails } = UserStore();

  const handleDelete = async (id) => {
    const response = await fetch(`${API}/job-seeker/delete-resume/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      navigate("/job-seeker-dashboard");
    } else {
      toast.error("Error deleting resume");
    }
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
              <Link to={`/${where}/view-resume/${resume.resume_id}`}>
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
              {where === "job-seeker-dashboard" ? (
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
              ) : null}
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
  where: PropTypes.string.isRequired,
};

export default Resume;
