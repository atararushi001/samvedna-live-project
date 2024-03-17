import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const ViewResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState({});

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
        <h1>Resume</h1>

        <div className="resume">
          <div className="resume-header">
            <h2>{resume.resumeName}</h2>
            <p>{resume.objective}</p>
          </div>

          <div className="resume-body">
            <div className="resume-section">
              <h3>Education</h3>
              <ul>
                {resume.education &&
                  resume.education.map((item, index) => (
                    <li key={index}>
                      <h4>{item.institutionName}</h4>
                      {item.degrees &&
                        item.degrees.map((degree, index) => (
                          <p key={index}>
                            {degree.educationCompleted} in {degree.degree}
                          </p>
                        ))}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="resume-section">
              <h3>Experience</h3>
              <ul>
                {resume.employers &&
                  resume.employers.map((item, index) => (
                    <li key={index}>
                      <h4>{item.employerName}</h4>
                      {item.positions &&
                        item.positions.map((position, index) => (
                          <div key={index}>
                            <p>{position.positionTitle}</p>
                            <p>
                              {position.startDate} <strong>to</strong>{" "}
                              {position.endDate}
                            </p>
                          </div>
                        ))}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewResume;
