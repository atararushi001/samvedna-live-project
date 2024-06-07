import { Link } from "react-router-dom";

import User from "../../assets/images/Backgrounds/allef-vinicius-oe_03B2Q5A4-unsplash.jpg";

const ProposalCard = () => {
  return (
    <Link to="/matrimony-dashboard/profile">
      <div className="proposal">
        <h2>User Name</h2>
        <img src={User} alt="User Image" />

        <div className="user-details">
          <div className="detail">
            <p>Age:</p>
            <p>25</p>
          </div>
          <div className="detail">
            <p>Location:</p>
            <p>City, Country</p>
          </div>
          <div className="detail">
            <p>Religion:</p>
            <p>Religion</p>
          </div>
          <div className="detail">
            <p>Profession:</p>
            <p>Profession</p>
          </div>
          <div className="detail">
            <p>Height:</p>
            <p>5&apos;5&rdquo;</p>
          </div>
          <div className="detail">
            <p>Education:</p>
            <p>Education</p>
          </div>
          <div className="detail">
            <p>Disability:</p>
            <p>Disability Type</p>
          </div>
          <div className="detail">
            <p>Disability Percentage:</p>
            <p>50%</p>
          </div>
        </div>

        <div className="proposal-actions">
          <button className="btn">Accept</button>
          <button className="btn btn-delete">Reject</button>
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;
