import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResumeBank = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        navigate("/job-seeker-dashboard");
      }
    } else {
      navigate("/recruiter-login");
    }
  }, [navigate]);

  const [search, setSearch] = useState("");
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState(resumes);

  const numberOfResumes = resumes.length;
  const numberOfPages = Math.ceil(numberOfResumes / 10);

  const [currentPage, setCurrentPage] = useState(numberOfPages === 0 ? 0 : 1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container">
      <section className="resume-bank">
        <h1>Resume Bank</h1>
        <div className="filters">
          <form className="input-group row" onSubmit={handleSearch}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Enter a Keyword"
              value={search}
              onChange={handleSearchChange}
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
        </div>
        <div className="pagination">
          <button
            className={"btn" + (currentPage <= 1 ? " disabled" : "")}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="page-links">
            {Array.from({ length: numberOfPages }, (_, index) => (
              <button
                key={index}
                className={`link no-outline ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className={
              "btn" + (currentPage === numberOfPages ? " disabled" : "")
            }
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === numberOfPages}
          >
            Next
          </button>
        </div>
        {numberOfResumes === 0 ? (
          <div className="default">
            <p>No resumes found</p>
          </div>
        ) : (
          <div className="resume-list">
            {filteredResumes.map((resume, index) => (
              <Link
                key={index}
                to={`/recruiter-dashboard/view-resume/${resume.id}`}
              >
                <div className="resume">
                  <h2>{resume.name}</h2>
                  <p>{resume.email}</p>
                  <p>{resume.phone}</p>
                  <p>{resume.skills}</p>
                  <p>{resume.experience}</p>
                  <p>{resume.education}</p>
                  <p>{resume.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="pagination">
          <button
            className={"btn" + (currentPage <= 1 ? " disabled" : "")}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="page-links">
            {Array.from({ length: numberOfPages }, (_, index) => (
              <button
                key={index}
                className={`link no-outline ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className={
              "btn" + (currentPage === numberOfPages ? " disabled" : "")
            }
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === numberOfPages}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default ResumeBank;
