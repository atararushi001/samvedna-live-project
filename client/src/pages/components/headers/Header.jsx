import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SessionState } from "../../../context/SessionProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../../assets/images/Logo.png";

// const API = import.meta.env.VITE_API_URL;

const Header = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState("bars");
  const {
    isLoggedIn,
    setIsLoggedIn,
    recruiterId,
    setRecruiterId,
    jobSeekerId,
    setJobSeekerId,
    selfEmployedId

  } = SessionState();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const jobSeekerId = sessionStorage.getItem("job_seekers_id");
    const recruiterId = sessionStorage.getItem("recruiters_id");

    if (isLoggedIn) {
      if (jobSeekerId) {
        setJobSeekerId(jobSeekerId);
      } else if (recruiterId) {
        setRecruiterId(recruiterId);

      }
    }
   
  }, [setIsLoggedIn, setRecruiterId, setJobSeekerId, navigate]);
  // useEffect(() => {
  //   fetch(`${API}/utils/checkLogin.php`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.is_logged_in) {
  //         setIsLoggedIn(true);
  //         if (data.recruiters_id) {
  //           setRecruiterId(data.recruiters_id);
  //         } else if (data.job_seekers_id) {
  //           setJobSeekerId(data.job_seekers_id);
  //         } else if (data.self_employed_id) {
  //           setSelfEmployedId(data.self_employed_id);
  //         }
  //       } else {
  //         setIsLoggedIn(false);
  //         setRecruiterId(null);
  //         setJobSeekerId(null);
  //         setSelfEmployedId(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [setIsLoggedIn, setRecruiterId, setJobSeekerId, setSelfEmployedId]);

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
                {selfEmployedId ? (
                  <Link
                    className="nav-link"
                    to="/self-employed-dashboard"
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
