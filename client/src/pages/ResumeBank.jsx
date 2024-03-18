import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Resume from "./components/Resume";

const API = import.meta.env.VITE_API_URL;

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
  const [filteredResumes, setFilteredResumes] = useState([]);

  useEffect(() => {
    fetch(`${API}/controllers/getAllResumes.php`, {
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
          setResumes(data.resumes);
          setFilteredResumes(data.resumes);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred: " + error.message);
      });
  }, [navigate]);

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setFilteredResumes(resumes);
    }
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search === "") {
      setFilteredResumes(resumes);
    } else {
      const filtered = resumes.filter((resume) => {
        return (
          resume.resumeName.toLowerCase().includes(search.toLowerCase()) ||
          resume.firstName.toLowerCase().includes(search.toLowerCase()) ||
          resume.lastName.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredResumes(filtered);
    }
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
        <Resume
          resumes={filteredResumes}
          where="recruiter-dashboard"
          title="Resumes"
          description="No resumes found!"
        />
      </section>
    </div>
  );
};

export default ResumeBank;
