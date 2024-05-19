import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

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

  const { loginState, userDetails } = UserStore();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, loginState, userDetails]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    fetch(`${API}/utils/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`${API}/utils/states/${formData.country}`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.country]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API}/job-seeker/searcj-jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/search-results", { state: { results: data.results } });
    } else {
      toast.error(data.message);
    }
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
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select country
              </option>
              {countries.map((country, index) => (
                <option key={`${country.name}-${index}`} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={`${state.name}-${index}`} value={state.id}>
                  {state.name}
                </option>
              ))}
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
