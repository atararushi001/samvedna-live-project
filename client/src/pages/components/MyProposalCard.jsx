import { Link } from "react-router-dom";

import User from "../../assets/images/Backgrounds/allef-vinicius-oe_03B2Q5A4-unsplash.jpg";

const MyProposalCard = () => {
  return (
    <Link>
      <div className="card">
        <div className="card-header">
          <img src={User} alt="User Profile Picture" />
          <h2>User Name</h2>
        </div>

        <div className="card-footer">
          <button className="btn btn-delete">Remove</button>
        </div>
      </div>
    </Link>
  );
};

export default MyProposalCard;
