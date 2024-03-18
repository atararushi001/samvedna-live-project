import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";

import "../assets/styles/style.css";

const API = import.meta.env.VITE_API_URL;

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState({});
  const componentRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/controllers/getResume.php?id=${id}`, {
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
          setResume(data.resume);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  }, [id]);

  return (
    <div className="container">
      <section className="view-resume">
        <div
          className="resume"
          id={`resume-${resume.resume_id}`}
          ref={componentRef}
        >
          <div className="left-side">
            <div className="profile-text">
              <h2>
                {resume.firstName} {resume.lastName}
              </h2>
            </div>
            <div className="contact-info">
              <h3 className="title">Contact Info</h3>
              <ul>
                <li>
                  <FontAwesomeIcon className="icon" icon="envelope" />
                  {resume.email}
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon="phone" />
                  {resume.phone}
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon="globe" />
                  {resume.website}
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon={faLinkedin} />
                  {resume.linkedin}
                </li>
                <li>
                  <FontAwesomeIcon className="icon" icon="location-dot" />
                  {resume.city}, {resume.state}, {resume.postalCode},{" "}
                  {resume.country}
                </li>
              </ul>
            </div>
            <div className="education">
              <h3 className="title">Education</h3>
              {resume.education && (
                <ul>
                  {resume.education.map((item, index) => (
                    <li key={index}>
                      {item.degrees.map((degree, index) => (
                        <div key={index} className="degree-info">
                          <h5>{degree.graduationDate}</h5>
                          <h4>
                            {degree.degree} in {degree.educationCompleted}
                          </h4>
                          <h4>{item.institutionName}</h4>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="military-experience">
              <h3 className="title">Military Experience</h3>
              {resume.branches && (
                <ul>
                  {resume.branches.map((item, index) => (
                    <li key={index}>
                      <h4>{item.branch}</h4>
                      <h4>
                        {item.beginningRank} - {item.endingRank}
                      </h4>
                      <h5>
                        {new Date(item.startDate).getFullYear()} -{" "}
                        {new Date(item.endDate).getFullYear()}
                      </h5>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="right-side">
            <div className="objective">
              <h3 className="title highlight-text">Objective</h3>
              <p>{resume.objective}</p>
            </div>
            <div className="experience">
              <h3 className="title highlight-text">Experience</h3>
              {resume.employers &&
                resume.employers.map((employer) =>
                  employer.positions.map((position, index) => (
                    <div key={index} className="box">
                      <div className="company-year">
                        <h5>
                          {new Date(position.startDate).getFullYear()} -
                          {(position.endDate &&
                            new Date(position.endDate).getFullYear()) ||
                            "Present"}
                        </h5>
                        <h5>{employer.employerName}</h5>
                      </div>
                      <div className="position-details">
                        <h4>{position.positionTitle}</h4>
                        <p>{position.jobDescription}</p>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary">
              Print Resume <FontAwesomeIcon icon="print" />
            </button>
          )}
          content={() => componentRef.current}
        />
      </section>
    </div>
  );
};

export default ViewResume;
