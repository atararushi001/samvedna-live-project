import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Resume = ({ resumes, title, description }) => {
  return (
    <div className="resumes">
      <div className="resumes-header">
        <h2>{title}</h2>
      </div>
      <div className="resumes-body">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div key={resume.id} className="resume">
              <h3>{resume.name}</h3>
              <p>
                Published on: {new Date(resume.published).toLocaleDateString()}
              </p>
              <div className="controls">
                <Link
                  className="link"
                  to={`/job-seeker-dashboard/edit-resume/${resume.id}`}
                >
                  <FontAwesomeIcon icon="pen" />
                </Link>
                <button
                  className="link"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                >
                  <FontAwesomeIcon icon="trash" />
                </button>
                <button
                  className="link"
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                >
                  <FontAwesomeIcon icon="file" />
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
