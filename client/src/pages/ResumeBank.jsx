import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

import Resume from "./components/Resume";

const API = import.meta.env.VITE_API_URL;

const ResumeBank = () => {
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

  const [search, setSearch] = useState("");
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);

  useEffect(() => {
    const getResumes = async () => {
      const response = await fetch(`${API}/recruiter/resumes`, {
        method: "GET",
        headers: {
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResumes(data);
        setFilteredResumes(data);
      } else {
        toast.error(data.message);
      }
    };

    getResumes();
  }, [navigate, loginState, userDetails]);

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
          resume.lastName.toLowerCase().includes(search.toLowerCase()) ||
          resume.email.toLowerCase().includes(search.toLowerCase()) ||
          resume.phone.toLowerCase().includes(search.toLowerCase()) ||
          resume.city.toLowerCase().includes(search.toLowerCase()) ||
          resume.state.toLowerCase().includes(search.toLowerCase()) ||
          resume.country.toLowerCase().includes(search.toLowerCase()) ||
          resume.desiredJobType.toLowerCase().includes(search.toLowerCase())
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
