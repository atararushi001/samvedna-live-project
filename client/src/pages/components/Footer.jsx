import { Link } from "react-router-dom";

import Logo from "../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-header">
          <Link to="/">
            <img src={Logo} alt="MySamvedna Logo" className="logo" />
          </Link>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donate" className="nav-link">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="nav-link">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-body">
          <h2>Follow Us:</h2>
          <ul>
            <li>
              <Link to="https://www.facebook.com/mysamvedna" target="_blank">
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.facebook.com/samvednatrust2010"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/samvednatrust_2010"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/SAMVEDNA2010" target="_blank">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/samvedna-disabled-persons-social-welfare-trust-7301972b6"
                target="_blank"
              >
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/mayank-don" target="_blank">
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2010-{new Date().getFullYear()}
          &nbsp;<strong>MySamvedna.</strong> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
