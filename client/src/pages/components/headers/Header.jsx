import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../../assets/images/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState("bars");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobSeekerId, setJobSeekerId] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      setIsLoggedIn(true);
      if (jobSeekerId) {
        setJobSeekerId(jobSeekerId);
        navigate("/job-seeker-dashboard");
      } else if (recruiterId) {
        setRecruiterId(recruiterId);
        // navigate("/recruiter-dashboard");
      }
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) {
        document.querySelector(".nav-links").classList.remove("active");
        setIcon("bars");
      }
    });

    window.addEventListener("change", () => {
      if (window.innerWidth > 920) {
        document.querySelector(".nav-links").classList.remove("active");
        setIcon("bars");
      }
    });

    window.addEventListener("scroll", () => {
      document.querySelector(".nav-links").classList.remove("active");
      setIcon("bars");
    });

    const handleLinkClick = () => {
      setIcon("bars");
      document.querySelector(".nav-links").classList.remove("active");
    };

    const links = document.querySelectorAll(".nav-link");
    const btns = document.querySelectorAll(".btn");
    links.forEach((link) => link.addEventListener("click", handleLinkClick));
    btns.forEach((btn) => btn.addEventListener("click", handleLinkClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
      window.removeEventListener("resize", () => {});
      window.removeEventListener("change", () => {});
    };
  }, []);

  const handleLinkNavigation = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    navigate(link.getAttribute("href"));
  };

  return (
    <div className="container">
      <header>
        <Link to="/" className="logo-link">
          <img src={Logo} alt="MySamvedna Logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link" onClick={handleLinkNavigation}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/donate"
              onClick={handleLinkNavigation}
            >
              Donate
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/blogs"
              onClick={handleLinkNavigation}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/gallery"
              onClick={handleLinkNavigation}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/about"
              onClick={handleLinkNavigation}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/contact"
              onClick={handleLinkNavigation}
            >
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                {recruiterId ? (
                  <Link
                    className="nav-link"
                    to="/recruiter-dashboard"
                    onClick={handleLinkNavigation}
                  >
                    Dashboard
                  </Link>
                ) : null}
                {jobSeekerId ? (
                  <Link
                    className="nav-link"
                    to="/job-seeker-dashboard"
                    onClick={handleLinkNavigation}
                  >
                    Dashboard
                  </Link>
                ) : null}
              </li>
              <li>
                <Link
                  className="nav-link"
                  to="/search"
                  onClick={handleLinkNavigation}
                >
                  <FontAwesomeIcon icon="search" className="fa-search" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="nav-link"
                  to="/search"
                  onClick={handleLinkNavigation}
                >
                  <FontAwesomeIcon icon="search" className="fa-search" />
                </Link>
              </li>
              <div className="btn-container">
                <Link
                  className="btn btn-outline"
                  to="/register"
                  onClick={handleLinkNavigation}
                >
                  Register
                </Link>
                <Link
                  className="btn"
                  to="/login"
                  onClick={handleLinkNavigation}
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </ul>
        <FontAwesomeIcon
          icon={icon}
          className="fa-bars menu-toggle-btn"
          onClick={() => {
            icon === "bars" ? setIcon("xmark") : setIcon("bars");
            document.querySelector(".nav-links").classList.toggle("active");
          }}
        />
      </header>
    </div>
  );
};

export default Header;
