import { useLocation, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    navigate("/");
  }

  const results = location.state.results;

  return (
    <div className="container">
      <section className="results" id="results">
        <h1>Results</h1>
        <div className="persons" key={results.length}>
          {results.map((job) => (
            <div className="job" key={job.job_id}>
              <img
                src={`${API}/uploads/profilePictures/${job.profilePicture}`}
                alt={job.profilePicture}
              />
              <h2>{job.jobDesignation}</h2>
              <div className="job-info">
                <h4>Job Type</h4>
                <p>{job.jobType}</p>
                <h4>Location</h4>
                <p>{job.placeOfWork}</p>
                <h4>Disability Percentage</h4>
                <p>{job.disabilityInfoPercentage}</p>
              </div>
              <div className="job-description">
                <h4>Job Description</h4>
                <p>
                  {job.dutyDescription.length > 100
                    ? `${job.dutyDescription.substring(0, 100)}...`
                    : job.dutyDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
        {results.length === 0 && <p>No results found.</p>}
      </section>
    </div>
  );
};

export default SearchResults;
