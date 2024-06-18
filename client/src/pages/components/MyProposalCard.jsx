import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../stores/UserStore";

const STATIC_API = import.meta.env.VITE_STATIC_FILES_URL;
const API = import.meta.env.VITE_API_URL;

const MyProposalCard = ({ user, request }) => {
  const { userDetails } = UserStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const response = await fetch(`${API}/request/delete/${request.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      toast.success("Request Deleted Successfully");
      navigate("/matrimony-dashboard");
    }
  };

  return (
    <Link
      to="/matrimony-dashboard/profile"
      state={{
        user: user,
        request: request,
      }}
    >
      <div className="card">
        <div className="card-header">
          <img
            src={`${STATIC_API}/uploads/matrimonyPictures/${
              user && user.profilePictures && user.profilePictures[0]
            }`}
            alt="User Profile Picture"
          />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <div className="card-footer">
          <button className="btn btn-delete" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </div>
    </Link>
  );
};

MyProposalCard.propTypes = {
  user: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
};

export default MyProposalCard;
