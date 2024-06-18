import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;
const STATIC_API = import.meta.env.VITE_STATIC_FILES_URL;

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  if (!location.state) {
    navigate("/");
  }

  const user = location.state.user;
  const request = location.state.request;

  useEffect(() => {
    if (!loginState) {
      navigate("/matrimony-login");
      return;
    }
  }, [navigate, loginState, userDetails]);

  const sendRequest = async () => {
    try {
      const response = await fetch(`${API}/request/send-request/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request");
    }
  };

  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleRequest = async (id, action) => {
    console.log(`${API}/request/${action}/${id}`);
    try {
      const response = await fetch(`${API}/request/${action}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      toast.success(data.message);
      navigate("/matrimony-dashboard/proposals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <section className="profile">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(${STATIC_API}/uploads/matrimonyPictures/${
              user && user.profilePictures && user.profilePictures[0]
            })`,
          }}
        >
          <div className="profile-actions">
            {request && user && request.sender_id === userDetails.id ? (
              <>
                {request.status === "Rejected" ? (
                  <button className="btn btn-full btn-delete" disabled>
                    Request Rejected
                  </button>
                ) : null}
                {request.status === "Accepted" ? (
                  <button className="btn btn-full" disabled>
                    Request Accepted
                  </button>
                ) : null}
                {request.status === "Pending" ? (
                  <button className="btn btn-full btn-secondary" disabled>
                    Request Pending
                  </button>
                ) : null}
              </>
            ) : null}
            {request && user && request.receiver_id === userDetails.id ? (
              <>
                {request.status === "Rejected" ? (
                  <button className="btn btn-full btn-delete" disabled>
                    Request Rejected
                  </button>
                ) : null}
                {request.status === "Accepted" ? (
                  <button className="btn btn-full" disabled>
                    Request Accepted
                  </button>
                ) : null}
                {request.status === "Pending" ? (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        handleRequest(request.id, "accept-request")
                      }
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() =>
                        handleRequest(request.id, "reject-request")
                      }
                    >
                      Reject
                    </button>
                  </>
                ) : null}
              </>
            ) : null}
            {request === null && user && user.id !== userDetails.id ? (
              <button className="btn" onClick={sendRequest}>
                Send Request
              </button>
            ) : null}
          </div>
        </div>
        <div className="profile-details">
          <h2>
            {user.firstName} {user.lastName}
          </h2>

          <div className="cards-container">
            <div className="card">
              <FontAwesomeIcon className="icon" icon="house" />
              {/* <p>City:</p> */}
              <h4>{user.cityName}</h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="person" />
              {/* <p>Age:</p> */}
              <h4>{calculateAge(user.dob)}</h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="ruler-vertical" />
              {/* <p>Height:</p> */}
              <h4>
                {Math.floor(user.height) +
                  "'" +
                  Math.round((user.height - Math.floor(user.height)) * 12) +
                  '"'}
              </h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="briefcase" />
              {/* <p>Occupation:</p> */}
              <h4>{user.designation}</h4>
            </div>
          </div>
          <div className="about-info">
            <h3>About</h3>
            <div className="about-images">
              <img
                src={`${STATIC_API}/uploads/matrimonyPictures/${
                  user && user.profilePictures && user.profilePictures[1]
                }`}
                alt=""
              />
              <img
                src={`${STATIC_API}/uploads/matrimonyPictures/${
                  user && user.profilePictures && user.profilePictures[2]
                }`}
                alt=""
              />
            </div>
            <p>{user.about}</p>
          </div>

          <div className="contact-info">
            <h3>Contact Info</h3>
            {request.status === "Accepted" ? (
              <ul>
                <div className="info">
                  <FontAwesomeIcon className="icon" icon="mobile-screen" />
                  <h4>Phone: </h4>
                  <p>{user.phone}</p>
                </div>
                <div className="info">
                  <FontAwesomeIcon className="icon" icon="envelope" />
                  <h4>Email: </h4>
                  <p>{user.email}</p>
                </div>
                <div className="info">
                  <FontAwesomeIcon className="icon" icon="location-dot" />
                  <h4>Address: </h4>
                  <p>
                    {user.address}, {user.cityName}, {user.stateName},{" "}
                    {user.countryName}, {user.pincode}.
                  </p>
                </div>
              </ul>
            ) : (
              <h3 className="delete-text">
                Cannot View Contact Details without User Accepting your Request!
              </h3>
            )}
          </div>

          <div className="personal-info">
            <h3>Personal Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Name:</h4>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Age:</h4>
                <p>
                  {new Date().getFullYear() - new Date(user.dob).getFullYear()}{" "}
                  Years
                </p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Date of Birth:</h4>
                <p>
                  {new Date(user.dob).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Height:</h4>
                <p>
                  {Math.floor(user.height) +
                    "'" +
                    Math.round((user.height - Math.floor(user.height)) * 12) +
                    '"'}
                </p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Weight:</h4>
                <p>{user.weight} kg</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Degree:</h4>
                <p>
                  {user.qualificationName} in{" "}
                  {user &&
                    user.educationSpecializationName &&
                    user.educationSpecializationName.split("-")[1]}
                </p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Current Location:</h4>
                <p>{user.currentLocationName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Immigration:</h4>
                <p>{user.immigrationStatus}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Profession:</h4>
                <p>{user.designation}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Annual Income:</h4>
                <p>₹{user.annualIncome}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Religion:</h4>
                <p>{user.religion}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Caste:</h4>
                <p>{user.caste}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Sub Caste:</h4>
                <p>{user.subCaste}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Community:</h4>
                <p>{user.community}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Mother Tongue:</h4>
                <p>{user.motherTongue}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Marital Status:</h4>
                <p>{user.maritalStatus}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Have Children:</h4>
                <p>{user.haveChildren}</p>
              </div>
              {user.haveChildren === "Yes" && (
                <div className="info">
                  <FontAwesomeIcon className="icon" icon="angle-right" />
                  <h4>No of Children:</h4>
                  <p>{user.noOfChildren}</p>
                </div>
              )}
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Complexion:</h4>
                <p>{user.complexion}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Body Type:</h4>
                <p>{user.bodyType}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Blood Group:</h4>
                <p>{user.bloodGroup}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Donate Blood:</h4>
                <p>{user.donateBlood}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Hobbies:</h4>
                <p>{user.hobbies}</p>
              </div>
            </ul>
          </div>
          <div className="personal-info">
            <h3>Family Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Father&apos;s Name:</h4>
                <p>{user.fatherName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Father&apos;s Occupation:</h4>
                <p>{user.fatherOccupation}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                {request.status === "Accepted" ? (
                  <>
                    <h4>Father&apos;s Mobile:</h4>
                    <p>{user.fatherMobile}</p>
                  </>
                ) : (
                  <p className="delete-text">
                    Cannot View Contact Details without User Accepting your
                    Request!
                  </p>
                )}
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Mother&apos;s Name:</h4>
                <p>{user.motherName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Mother&apos;s Occupation:</h4>
                <p>{user.motherOccupation}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                {request.status === "Accepted" ? (
                  <>
                    <h4>Mother&apos;s Mobile:</h4>
                    <p>{user.motherMobile}</p>
                  </>
                ) : (
                  <p className="delete-text">
                    Cannot View Contact Details without User Accepting your
                    Request!
                  </p>
                )}
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Grandfather&apos;s Name:</h4>
                <p>{user.grandfatherName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Grandmother&apos;s Name:</h4>
                <p>{user.grandmotherName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Nana&apos;s Name:</h4>
                <p>{user.nanaName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Nani&apos;s Name:</h4>
                <p>{user.naniName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>No of Brothers:</h4>
                <p>{user.noOfBrothers}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>No of Sisters:</h4>
                <p>{user.noOfSisters}</p>
              </div>
            </ul>
          </div>
          <div className="personal-info">
            <h3>Horoscope Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Believe&apos;s in Horoscope:</h4>
                <p>{user.believeInHoroscope}</p>
              </div>
              {user.believeInHoroscope === "Yes" && (
                <>
                  <div className="info">
                    <FontAwesomeIcon className="icon" icon="angle-right" />
                    <h4>Rashi:</h4>
                    <p>{user.rashi}</p>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon className="icon" icon="angle-right" />
                    <h4>Gotra:</h4>
                    <p>{user.gotra}</p>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon className="icon" icon="angle-right" />
                    <h4>Varna:</h4>
                    <p>{user.varna}</p>
                  </div>
                  <div className="info">
                    <FontAwesomeIcon className="icon" icon="angle-right" />
                    <h4>Mangal/Shani:</h4>
                    <p>{user.mangalShani}</p>
                  </div>
                </>
              )}
            </ul>
          </div>
          <div className="personal-info">
            <h3>Disability Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Disability:</h4>
                <p>{user.disability}</p>
              </div>
              {user.disability && (
                <div className="info">
                  <FontAwesomeIcon className="icon" icon="angle-right" />
                  <h4>Disability Percentage:</h4>
                  <p>{user.disabilityPercentage}%</p>
                </div>
              )}
            </ul>
          </div>
          <div className="personal-info">
            <h3>Dietery Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Diet:</h4>
                <p>{user.diet}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Smoke:</h4>
                <p>{user.smoke}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Drink:</h4>
                <p>{user.drink}</p>
              </div>
            </ul>
          </div>
          <div className="personal-info">
            <h3>Partner Preferences</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Age Gap:</h4>
                <p>{user.ageGap} Years</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Religion:</h4>
                <p>{user.partnerReligion}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Caste:</h4>
                <p>{user.partnerCaste}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Sub Caste:</h4>
                <p>{user.partnerSubCaste}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Qualification:</h4>
                <p>{user.partnerQualificationName}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Occupation:</h4>
                <p>{user.partnerOccupation}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Annual Income:</h4>
                <p>{user.partnerAnnualIncome}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Mangalik:</h4>
                <p>{user.mangalik}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Partner Marital Status:</h4>
                <p>{user.partnerMaritalStatus}</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Willing to Go Abroad:</h4>
                <p>{user.goAbroad}</p>
              </div>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
