import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const CompanyDirectory = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.role === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/job-seeker-login");
    }
  }, [navigate, loginState, userDetails]);

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [numberOfEntries, setNumberOfEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabetFilter, setAlphabetFilter] = useState("All");

  const totalPages = Math.ceil(companies.length / numberOfEntries);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearch(value);

    if (value === "") {
      const response = await fetch(`${API}/job-seeker/company-directory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCompanies(data);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filteredCompanies = companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
    setCompanies(filteredCompanies);
  };

  const handleNumberOfEntries = (event) => {
    setNumberOfEntries(event.target.value);
  };

  const handleAlphabetFilter = (alphabet) => {
    setAlphabetFilter(alphabet);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch(`${API}/job-seeker/company-directory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setCompanies(data);
      } else {
        toast.error(data.message);
      }
    };

    fetchCompanies();
  }, [userDetails]);

  return (
    <div className="container">
      <section className="company-directory">
        <h1>Company Directory</h1>
        <div className="filters">
          <div className="input-group row filter-dropdown">
            <label htmlFor="numberOfEntries">Entries:</label>
            <select
              name="numberOfEnteries"
              id="numberOfEnteries"
              value={numberOfEntries}
              onChange={handleNumberOfEntries}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <form className="input-group row" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search a Company"
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
        </div>
        <div className="alphabet-filter">
          <button
            className={`link no-outline ${
              alphabetFilter === "All" ? "active" : ""
            }`}
            onClick={() => handleAlphabetFilter("All")}
          >
            All
          </button>
          {Array.from({ length: 26 }, (_, index) => (
            <button
              key={index}
              className={`link no-outline ${
                alphabetFilter === String.fromCharCode(65 + index)
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleAlphabetFilter(String.fromCharCode(65 + index))
              }
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>
        {companies.length === 0 ? (
          <div className="default">
            <p>No companies found!</p>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {companies
                  .filter((company) =>
                    alphabetFilter === "All"
                      ? company
                      : company.company[0].toUpperCase() === alphabetFilter
                  )
                  .slice(
                    (currentPage - 1) * numberOfEntries,
                    currentPage * numberOfEntries
                  )
                  .map((company, index) => (
                    <tr key={index}>
                      <td>{company.company}</td>
                      <td>{company.cityname}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className={`btn ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="page-links">
                {Array.from({ length: totalPages }, (_, index) => (
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
                className={`btn ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default CompanyDirectory;
