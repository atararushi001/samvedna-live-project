import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserStore from "../../stores/UserStore";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      }
    } else {
      navigate("/recruiter-login");
    }
  }, [navigate, loginState, userDetails]);

  return (
    <>
      <div className="container">
        <section className="recruiter-dashboard">
          <h1>
            <strong className="highlight-text">Recruiter</strong> Dashboard
          </h1>
          <div className="recruiter-dashboard-container">
            <div className="recruiter-dashboard-card">
              <h2>Post a Job</h2>
              <p>
                Looking to hire? Post a job to reach out to our vast network of
                talented professionals. It&apos;s quick, easy, and effective.
                Start finding the right candidate for your job today.
              </p>
              <Link
                to="/recruiter-dashboard/post-job"
                className="btn btn-primary"
              >
                Post a Job
              </Link>
            </div>
            <div className="recruiter-dashboard-card">
              <h2>View Jobs</h2>
              <p>
                Keep track of all your job postings in one place. View
                applications, schedule interviews, and manage your hiring
                process efficiently. Start exploring your job postings now.
              </p>
              <Link
                to="/recruiter-dashboard/view-jobs"
                className="btn btn-primary"
              >
                View Jobs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RecruiterDashboard;
