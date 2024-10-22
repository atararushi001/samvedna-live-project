import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserStore from "../../../stores/UserStore";

import Logo from "../../../assets/images/Logo.png";

const RecruiterHeader = () => {
  const navigate = useNavigate();
  const { logout } = UserStore();

  const [icon, setIcon] = useState("bars");

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

  const handleLinkNavigation = async (event) => {
    event.preventDefault();
    const link = event.currentTarget;

    navigate(link.getAttribute("href"));
  };

  const handleLogout = () => {
    logout();
    navigate("/recruiter-login");
    toast.success("Logged out successfully");
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
              to="/recruiter-dashboard"
              className="nav-link"
              onClick={handleLinkNavigation}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/recruiter-dashboard/post-job"
              onClick={handleLinkNavigation}
            >
              Post a Job
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/recruiter-dashboard/view-jobs"
              onClick={handleLinkNavigation}
            >
              View Jobs
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/recruiter-dashboard/job-seekers"
              onClick={handleLinkNavigation}
            >
              Search Job Seekers
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/recruiter-dashboard/resume-bank"
              onClick={handleLinkNavigation}
            >
              Resume Bank
            </Link>
          </li>
          <div className="btn-container">
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
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

export default RecruiterHeader;
