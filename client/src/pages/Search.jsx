import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Search = () => {
  const [formData, setFormData] = useState({
    search: "",
    jobType: "",
    location: "",
    disabilityPercentage: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch(`${API}/controllers/searchJobs.php`, {
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
          toast.success(data.message);
          navigate("/search-results", { state: { results: data.jobs } });
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
    <div className="container">
      <section className="search">
        <h1>Search Jobs</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search for a job"
              value={formData.search}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Job Type
              </option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              id="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Location
              </option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              id="disabilityPercentage"
              value={formData.disabilityPercentage}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Disability Percentage
              </option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </section>
    </div>
  );
};

export default Search;
