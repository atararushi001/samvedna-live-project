import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "nuka-carousel";
import { toast } from "react-toastify";

const CustomCarousel = () => {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [disabilityPercentage, setDisabilityPercentage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("search", search);
    data.append("jobType", jobType);
    data.append("location", location);
    data.append("disabilityPercentage", disabilityPercentage);
    
    fetch("http://localhost/MySamvedna/api/controllers/searchJobs.php", {
      method: "POST",
      body: data,
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
          navigate("/search-results", { state: { results: data.jobs } })
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  };
  return (
    <Carousel
      autoplay={true}
      wrapAround={true}
      dragging={true}
      adaptiveHeight={true}
      withoutControls={true}
      pauseOnHover={true}
      className="custom-carousel"
    >
      <section className="register-type-container slider-1">
        <div className="register-type">
          <h1>Are you Recruiter?</h1>
          <Link to="/recruiter-register">
            <button className="btn">Recruiter Register</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="register-type">
          <h1>Are you a Job Seeker?</h1>
          <Link to="/job-seeker-register">
            <button className="btn btn-outline">Job Seeker Register</button>
          </Link>
        </div>
      </section>

      <section className="register-type-container self-employed slider-2">
        <div className="register-type">
          <h1>Are you Self-Employed?</h1>
          <Link to="/self-employment-register">
            <button className="btn">Self Employed Register</button>
          </Link>
        </div>
      </section>

      <section className="search slider-3">
        <h1>Search Jobs</h1>
        <form className="slider-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a job"
              required
            />
          </div>
          <div className="input-group">
            <select
              className="form-control"
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Job Type</option>
            </select>
            <select
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Location</option>
            </select>
            <select
              className="form-control"
              id="disabilityPercentage"
              value={disabilityPercentage}
              onChange={(e) => setDisabilityPercentage(e.target.value)}
            >
              <option value="">Disability Percentage</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </section>
    </Carousel>
  );
};

export default CustomCarousel;
