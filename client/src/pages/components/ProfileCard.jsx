import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_STATIC_FILES_URL;

const ProfileCard = ({ user }) => {
  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <Link to="/matrimony-dashboard/profile" state={{ id: user.id }}>
      <div className="proposal">
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <img
          src={`${API}/uploads/matrimonyPictures/${user.profilePictures[0]}`}
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

        <div className="proposal-actions">
          <button className="btn btn-full">Send Request</button>
        </div>
      </div>
    </Link>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileCard;
