import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STATIC_API = import.meta.env.VITE_STATIC_FILES_URL;

const ViewJobSeeker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jobSeeker, setJobSeeker] = useState({});

  if (!location.state) {
    navigate("/recruiter-dashboard");
  }

  useEffect(() => {
    setJobSeeker(location.state.jobSeeker);
  }, [location.state]);

  return (
    <div className="container">
      <section className="view-job-seeker">
        <h1>
          Profile of{" "}
          <strong className="highlight-text">
            {jobSeeker.FirstName} {jobSeeker.Surname}
          </strong>
        </h1>
        <div className="job">
          {jobSeeker.photo && (
            <img
              src={`${STATIC_API}/uploads/job/profile/${jobSeeker.photo}`}
              alt="Profile"
            />
          )}
          <h2>{jobSeeker.email}</h2>

          <h2>Personal Information</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Full Name:</h3>
              <p>
                {jobSeeker.FirstName} {jobSeeker.FatherName} {jobSeeker.Surname}
              </p>
            </div>
            <div className="job-detail">
              <h3>Date of Birth:</h3>
              <p>{new Date(jobSeeker.dob).toLocaleDateString()}</p>
            </div>
            <div className="job-detail">
              <h3>Gender:</h3>
              <p>{jobSeeker.gender}</p>
            </div>
            <div className="job-detail">
              <h3>Contact Number:</h3>
              <p>{jobSeeker.contactNumber}</p>
            </div>
            <div className="job-detail">
              <h3>WhatsApp:</h3>
              <p>{jobSeeker.whatsappNumber}</p>
            </div>
            <div className="job-detail">
              <h3>Home Phone:</h3>
              <p>{jobSeeker.homePhone}</p>
            </div>
            <div className="job-detail">
              <h3>LinkedIn:</h3>
              <p>{jobSeeker.LinkedInID}</p>
            </div>
            <div className="job-detail">
              <h3>Aadhar Card:</h3>
              <p>{jobSeeker.AadharCardNumber}</p>
            </div>
          </div>

          <h2>Address Information</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Current Address:</h3>
              <p>{jobSeeker.currentAddress}</p>
            </div>
            <div className="job-detail">
              <h3>Permanent Address:</h3>
              <p>{jobSeeker.permanentAddress}</p>
            </div>
            <div className="job-detail">
              <h3>City:</h3>
              <p>{jobSeeker.city}</p>
            </div>
            <div className="job-detail">
              <h3>State:</h3>
              <p>{jobSeeker.state}</p>
            </div>
            <div className="job-detail">
              <h3>Country:</h3>
              <p>{jobSeeker.country}</p>
            </div>
            <div className="job-detail">
              <h3>Postal Code:</h3>
              <p>{jobSeeker.postalCode}</p>
            </div>
          </div>

          <h2>Educational Background</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Qualification:</h3>
              <p>{jobSeeker.qualification}</p>
            </div>
            <div className="job-detail">
              <h3>Specialization:</h3>
              <p>{jobSeeker.educationSpecialization}</p>
            </div>
            {jobSeeker.education?.map((edu, index) => (
              <div key={edu.id} className="job-detail">
                <h3>Institution {index + 1}:</h3>
                <p>{edu.institutionName}</p>
                {edu.degrees?.map((degree) => (
                  <div key={degree.id}>
                    <p>
                      <strong>Degree:</strong> {degree.degree}
                    </p>
                    <p>
                      <strong>Major:</strong> {degree.major}
                    </p>
                    <p>
                      <strong>Grade:</strong> {degree.grade}/{degree.out_of}
                    </p>
                    <p>
                      <strong>Graduation Date:</strong>{" "}
                      {new Date(degree.graduation_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h2>Professional Experience</h2>
          <div className="job-details">
            {jobSeeker.experience?.map((exp) => (
              <div key={exp.id} className="job-detail">
                <h3>{exp.companyName}</h3>
                <p>
                  <strong>Title:</strong> {exp.jobTitle}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {new Date(exp.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {exp.jobDescriptions}
                </p>
                <p>
                  <strong>Projects:</strong> {exp.projects}
                </p>
              </div>
            ))}
          </div>

          <h2>Professional References</h2>
          <div className="job-details">
            {jobSeeker.professionalReferences?.map((ref) => (
              <div key={ref.id} className="job-detail">
                <h3>{ref.name}</h3>
                <p>
                  <strong>Company:</strong> {ref.companyName}
                </p>
                <p>
                  <strong>Phone:</strong> {ref.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {ref.email}
                </p>
                <p>
                  <strong>Relationship:</strong> {ref.relationship}
                </p>
              </div>
            ))}
          </div>

          <h2>Disability Information</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Type of Disability:</h3>
              <p>{jobSeeker.typeOfDisability}</p>
            </div>
            <div className="job-detail">
              <h3>Specific Disability:</h3>
              <p>{jobSeeker.specificDisability}</p>
            </div>
            <div className="job-detail">
              <h3>Disability Percentage:</h3>
              <p>{jobSeeker.disabilityPercentage}</p>
            </div>
            <div className="job-detail">
              <h3>Level of Disability:</h3>
              <p>{jobSeeker.levelOfDisability}</p>
            </div>
            <div className="job-detail">
              <h3>Specialization in Disability:</h3>
              <p>{jobSeeker.specializationInDisability}</p>
            </div>
            <div className="job-detail">
              <h3>Assistive Technology:</h3>
              <p>{jobSeeker.assistiveTechnology}</p>
            </div>
          </div>

          <h2>Additional Information</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Career Objective:</h3>
              <p>{jobSeeker.careerObjective}</p>
            </div>
            <div className="job-detail">
              <h3>Art Skills:</h3>
              <p>{jobSeeker.artSkills}</p>
            </div>
            <div className="job-detail">
              <h3>Language Proficiency:</h3>
              <p>{jobSeeker.languageProficiency}</p>
            </div>
            <div className="job-detail">
              <h3>Hobbies & Interests:</h3>
              <p>{jobSeeker.hobbiesOrInterests}</p>
            </div>
            <div className="job-detail">
              <h3>Professional Memberships:</h3>
              <p>{jobSeeker.professionalMemberships}</p>
            </div>
            <div className="job-detail">
              <h3>Notable Achievements:</h3>
              <p>{jobSeeker.notableAchievements}</p>
            </div>
            <div className="job-detail">
              <h3>Employment Gap:</h3>
              <p>Duration: {jobSeeker.employmentGapDuration} months</p>
              <p>Reason: {jobSeeker.employmentGapReason}</p>
            </div>
          </div>

          <h2>Job Preferences</h2>
          <div className="job-details">
            <div className="job-detail">
              <h3>Job Categories:</h3>
              <p>{jobSeeker.jobCategories}</p>
            </div>
            <div className="job-detail">
              <h3>Preferred Location:</h3>
              <p>{jobSeeker.preferredLocation}</p>
            </div>
            <div className="job-detail">
              <h3>Job Type:</h3>
              <p>{jobSeeker.jobType}</p>
            </div>
          </div>

          <div className="job-footer">
            {jobSeeker.resume && (
              <a
                className="btn"
                href={`${STATIC_API}/uploads/job/profile/${jobSeeker.resume}`}
                target="_blank"
                rel="noreferrer">
                View Resume
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewJobSeeker;
