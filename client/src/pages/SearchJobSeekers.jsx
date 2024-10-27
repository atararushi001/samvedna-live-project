import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;
const STATIC_API = import.meta.env.VITE_STATIC_FILES_URL;

const SearchJobSeekers = () => {
  const [search, setSearch] = useState("");
  const { userDetails } = UserStore();

  const [jobSeekers, setJobSeekers] = useState([]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/recruiter/get-jobseekers/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userDetails.token,
          },
        }
      );

      const data = await response.json();
      setJobSeekers(data);
      console.log(data);

      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <section className="search">
        <h1>Search Job Seekers</h1>

        <div className="input-group row">
          <input
            style={{ width: "90%" }}
            type="search"
            name="search"
            id="search"
            placeholder="Search Job Seekers"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            style={{ width: "10%" }}
            type="submit"
            className="btn btn-primary"
            onClick={handleSearchSubmit}>
            Search
          </button>
        </div>

        {jobSeekers.length !== 0 ? (
          <div className="search-results">
            {jobSeekers.map((jobSeeker) => (
              <div key={jobSeeker.job_seeker_id} className="search-result">
                <img
                  src={`${STATIC_API}/uploads/job/profile/${jobSeeker.photo}`}
                  alt={jobSeeker.FirstName}
                  className="search-result-image"
                />
                <div className="search-result-details">
                  <h2>{jobSeeker.FirstName + " " + jobSeeker.Surname}</h2>
                  <p>{jobSeeker.email}</p>
                  <p>{jobSeeker.phone}</p>
                  <p>{jobSeeker.address}</p>
                  <NavLink
                    to={`view`}
                    state={
                      jobSeeker && {
                        jobSeeker: jobSeeker,
                      }
                    }
                    className="btn btn-primary">
                    View Profile
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SearchJobSeekers;
