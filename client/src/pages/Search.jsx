import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Search = () => {
  const [formData, setFormData] = useState({
    search: "",
    postedBetweenStart: "",
    postedBetweenEnd: "",
    status: "",
    country: "",
    state: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
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
          <h3 style={{ textAlign: "left" }}>Advance Search:</h3>
          <div
            className="form-group"
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            <label htmlFor="postedBetweenStart">Posted Between</label>
            <input
              type="date"
              className="form-control"
              id="postedBetweenStart"
              placeholder="Posted Between"
              value={formData.postedBetweenStart}
              onChange={handleChange}
            />
            <label htmlFor="postedBetweenEnd">And</label>
            <input
              type="date"
              className="form-control"
              id="postedBetweenEnd"
              placeholder="Posted Between"
              value={formData.postedBetweenEnd}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Enter Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleChange}
            />
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
