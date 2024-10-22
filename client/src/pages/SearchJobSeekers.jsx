import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const SearchJobSeekers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const { userDetails } = UserStore();

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
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchJobSeekers;
