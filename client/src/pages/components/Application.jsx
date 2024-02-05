import { Link } from "react-router-dom";

const Application = () => {
  return (
    <Link to="/recruiter-dashboard/view-application" style={{ width: "100%" }}>
      <div className="applications-container">
        <div className="application">
          <div className="application-header">
            <h3>Application 1</h3>
            <div className="application-controls">
              <Link to="" className="btn">
                Accept
              </Link>
              <Link to="" className="btn btn-delete">
                Reject
              </Link>
            </div>
          </div>
          <div className="application-body">
            <p>
              <strong>Applicant Name:</strong> <br />
              John Doe
            </p>
            <p>
              <strong>Applicant Email:</strong> <br />
              <a
                href="mailto:
                "
              >
                john@doe.com
              </a>
            </p>
            <p>
              <strong>Applicant Phone:</strong> <br />
              <a
                href="tel:
                "
              >
                1234567890
              </a>
            </p>
            <p>
              <strong>Applicant Address:</strong> <br />
              <a
                href="https://www.google.com/maps/place/
              "
                target="_blank"
                rel="noreferrer"
              >
                1234 Main Street, City, State, Zip
              </a>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Application;
