import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { loginState, userDetails } = UserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, loginState, userDetails]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`${API}/recruiter/jobs`, {
        method: "GET",
        headers: {
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        console.error(data.message);
      }
    };

    fetchJobs();
  }, [userDetails]);

  const deleteJob = (e) => async (jobId) => {
    e.preventDefault();

    const response = await fetch(`${API}/recruiter/delete-job/${jobId}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      toast.success(data.message);
      setJobs(jobs.filter((job) => job.job_id !== jobId));
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="container">
        <section className="view-jobs">
          <h1>
            <strong className="highlight-text">View</strong> Jobs
          </h1>
          <div className="view-jobs-container">
            {jobs.length === 0 ? (
              <div className="alert alert-info" role="alert">
                No jobs found!
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr.</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Job Type</th>
                    <th scope="col">Location</th>
                    <th scope="col">Disability Percentage</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{job.jobDesignation}</td>
                        <td>{job.jobType}</td>
                        <td>{job.placeOfWork}</td>
                        <td>{job.disabilityInfoPercentage}</td>
                        <td>
                          {job.salaryMin} - {job.salaryMax}
                        </td>
                        <td>{job.dutyDescription}</td>
                        <td className="controls">
                          <Link
                            to={`/recruiter-dashboard/edit-job/${job.job_id}`}
                            className="link"
                          >
                            Edit
                          </Link>
                          <Link
                            className="link delete no-outline"
                            onClick={(e) => deleteJob(e)(job.job_id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewJobs;
