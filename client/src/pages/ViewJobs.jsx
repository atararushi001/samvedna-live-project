import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { SessionState } from "../context/SessionProvider";

const API = import.meta.env.VITE_API_URL;

const ViewJobs = () => {
  // const { setIsLoggedIn, setRecruiterId } =  SessionState();
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        // navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate]);
  // useEffect(() => {
  //   fetch(`${API}/utils/checkLogin.php`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.is_logged_in) {
  //         setIsLoggedIn(true);
  //         setRecruiterId(data.recruiters_id);
  //       } else {
  //         setIsLoggedIn(false);
  //         setRecruiterId(null);
  //         navigate("/recruiter-login");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [setIsLoggedIn, setRecruiterId, navigate]);

  useEffect(() => {
    fetch(`${API}/controllers/renderJobs.php`, {
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
          setJobs(data.jobs);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteJob = (e) => (jobId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job_id", jobId);

    fetch(`${API}/controllers/deleteJob.php`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setJobs((prevJobs) => {
            return prevJobs.filter((job) => job.job_id !== jobId);
          });
          navigate("/recruiter-dashboard/view-jobs");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
                        <td>{job.payAndAllowances}</td>
                        <td>{job.dutyDescription}</td>
                        <td className="controls">
                          <Link
                            to={`/recruiter-dashboard/edit-job/${job.job_id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-delete"
                            onClick={(e) => deleteJob(e)(job.job_id)}
                          >
                            Delete
                          </button>
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
