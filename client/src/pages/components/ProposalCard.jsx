import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import PropTypes from "prop-types";

// import UserStore from "../../stores/UserStore";

const STATIC_URL_API = import.meta.env.VITE_STATIC_FILES_URL;
// const API = import.meta.env.VITE_API_URL;

const ProposalCard = ({ type, user, request }) => {
  // const { userDetails } = UserStore();
  // const navigate = useNavigate();

  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // const handleRequest = async (id, action) => {
  //   try {
  //     const response = await fetch(`${API}/request/${action}/${id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": userDetails.token,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }

  //     const data = await response.json();
  //     toast.success(data.message);
  //     navigate("/matrimony-dashboard/proposals");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Link
      to="/matrimony-dashboard/profile"
      state={{ user: user, request: request }}
    >
      <div className="proposal" key={user.id}>
        <h2>User Name</h2>
        <img
          src={`${STATIC_URL_API}/uploads/matrimonyPictures/${
            user && user.profilePictures && user.profilePictures[0]
          }`}
          alt="User Image"
        />

        <div className="user-details">
          <div className="detail">
            <p>Age:</p>
            <p>{calculateAge(user.dob)} Years</p>
          </div>
          <div className="detail">
            <p>Location:</p>
            <p>
              {user.cityName}, {user.countryName}
            </p>
          </div>
          <div className="detail">
            <p>Religion:</p>
            <p>{user.religion}</p>
          </div>
          <div className="detail">
            <p>Profession:</p>
            <p>{user.designation}</p>
          </div>
          <div className="detail">
            <p>Height:</p>
            <p>
              {Math.floor(user.height)}&apos;
              {Math.round((user.height - Math.floor(user.height)) * 12)}&rdquo;
            </p>
          </div>
          <div className="detail">
            <p>Education:</p>
            <p>{user.qualificationName}</p>
          </div>
          <div className="detail">
            <p>Disability:</p>
            <p>{user.disability}</p>
          </div>
          <div className="detail">
            <p>Disability Percentage:</p>
            <p>{user.disabilityPercentage}%</p>
          </div>
        </div>

        {/* {type === "Received" && (
          <div className="proposal-actions">
            <button
              className="btn"
              onClick={() => handleRequest(request.id, "accept-request")}
            >
              Accept
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleRequest(request.id, "reject-request")}
            >
              Reject
            </button>
          </div>
        )} */}

        {type === "Sent" && (
          <div className="proposal-actions">
            <h4 className="highlight-text">Request Status: </h4>
            <p>Pending</p>
          </div>
        )}
      </div>
    </Link>
  );
};

ProposalCard.propTypes = {
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
};

export default ProposalCard;
