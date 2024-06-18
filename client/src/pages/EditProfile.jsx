import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Job Seeker") {
        navigate("/job-seeker-dashboard");
      } else if (userDetails.type === "Recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/login");
    }

    const fetchData = async () => {
      const response = await fetch(`${API}/matrimony/user`, {
        headers: {
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFormData(data);
      } else {
        toast.error(data.message);
      }
    };

    fetchData();

    console.log(formData);
  }, [navigate, loginState, userDetails]);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentLocations, setCurrentLocations] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetch(`${API}/utils/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.results);
        setCurrentLocations(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`${API}/utils/states/${formData.country}`)
        .then((response) => response.json())
        .then((data) => {
          setStates(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetch(`${API}/utils/cities/${formData.state}`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.state]);

  useEffect(() => {
    fetch(`${API}/utils/qualifications`)
      .then((response) => response.json())
      .then((data) => {
        setQualifications(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (formData.qualification) {
      fetch(`${API}/utils/education-specialization/${formData.qualification}`)
        .then((response) => response.json())
        .then((data) => {
          setSpecializations(data.results);
        })
        .catch((error) => console.error(error));
    }
  }, [formData.qualification]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (files.length + formData.profilePicture.length > 3) {
        toast.error("Maximum 3 profile pictures are allowed");
        setFormData({
          ...formData,
          profilePicture: [], // Clear the array when error occurs
        });
        e.target.value = ""; // Clear the input field
        return;
      }
      setFormData({
        ...formData,
        [name]: [...formData[name], ...files],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.dob > new Date().toISOString().split("T")[0]) {
      toast.error("Date of Birth cannot be in the future");
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(formData.dob).getFullYear();

    if (currentYear - birthYear < 18) {
      toast.error("You must be at least 18 years old to register");
      return;
    }

    const newFormData = new FormData();

    for (const key in formData) {
      newFormData.append(key, formData[key]);
    }

    console.log(formData);

    const response = await fetch(`${API}/matrimony/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
      body: newFormData,
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      navigate("/matrimony-dashboard/edit-profile");
    } else {
      toast.error(data.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )}`;
  };

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="container">
      <section className="matrimony-register">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Registration
        </h1>

        <Link to="/matrimony-login" className="forgot-password">
          Already have an account? Login here
        </Link>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Personal Details*</legend>
            {/* <label htmlFor="profilePicture">Profile Picture (Maximum 3)</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              multiple={3}
              onChange={handleInputChange}
              accept="image/*"
              required
            /> */}
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {/* <div className="input-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div> */}
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="input-group">
              <div className="input-group col">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formatDate(formData.dob)}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group col">
                <label htmlFor="timeOfBirth">Time of Birth</label>
                <input
                  type="time"
                  name="timeOfBirth"
                  id="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group col">
                <label htmlFor="placeOfBirth">Place of Birth</label>
                <input
                  type="text"
                  name="placeOfBirth"
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  placeholder="Enter Place of Birth"
                  required
                />
              </div>
            </div>
            <input
              type="text"
              name="motherTongue"
              id="motherTongue"
              placeholder="Enter Your Mother Tongue"
              value={formData.motherTongue}
              onChange={handleInputChange}
              required
            />
            <div className="input-group">
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country, index) => (
                  <option key={`${country.name}-${index}`} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {states.map((state, index) => (
                  <option key={`${state.name}-${index}`} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city, index) => (
                  <option key={`${city.name}-${index}`} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="pincode"
              id="pincode"
              placeholder="Enter Your Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />

            <div className="input-group">
              <select
                name="community"
                id="community"
                value={formData.community}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Community
                </option>
                <option value="Assamese">Assamese</option>
                <option value="Bengali">Bengali</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Kashmiri">Kashmiri</option>
                <option value="Konkani">Konkani</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Marathi">Marathi</option>
                <option value="Marvadi">Marvadi</option>
                <option value="Oriya">Oriya</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Others">Others</option>
              </select>
              <select
                name="religion"
                id="religion"
                value={formData.religion}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Religion
                </option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Parsi">Parsi</option>
                <option value="Jewish">Jewish</option>
                <option value="Bahai">Bahai</option>
                <option value="Others">Others</option>
              </select>

              <select
                name="caste"
                id="caste"
                value={formData.caste}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Caste
                </option>
                <option value="Patel">Patel</option>
                <option value="Brahmin">Brahmin</option>
                <option value="Vaishnav">Vaishnav</option>
                <option value="Vanik">Vanik</option>
                <option value="Jain">Jain</option>
                <option value="Lohana">Lohana</option>
                <option value="Rajput">Rajput</option>
                <option value="Vishwakarma">Vishwakarma</option>
                <option value="Vankar">Vankar</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Marwari">Marwari</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Shia">Shia</option>
                <option value="Sunni">Sunni</option>
                <option value="Khoja">Khoja</option>
                <option value="Chhipa">Chhipa</option>
                <option value="Ghanchi">Ghanchi</option>
                <option value="Methodist">Methodist</option>
                <option value="Protagonist">Protagonist</option>
                <option value="Catholic">Catholic</option>
                <option value="Protestant">Protestant</option>
                <option value="Chaudhari">Chaudhari</option>
                <option value="Thakur">Thakur</option>
                <option value="Dhobi">Dhobi</option>
                <option value="Kshatriya">Kshatriya</option>
                <option value="Kumhar">Kumhar</option>
                <option value="Yadav">Yadav</option>
                <option value="Moni">Moni</option>
                <option value="Gursikh">Gursikh</option>
                <option value="Jat">Jat</option>
                <option value="Kamboj">Kamboj</option>
                <option value="Kesadhari">Kesadhari</option>
                <option value="Saini">Saini</option>
                <option value="Rami">Rami</option>
                <option value="Gajjar">Gajjar</option>
                <option value="Mistry">Mistry</option>
                <option value="Bhojak">Bhojak</option>
                <option value="Modi">Modi</option>
                <option value="Rohit">Rohit</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Soni">Soni</option>
                <option value="Darji">Darji</option>
                <option value="Khatri">Khatri</option>
                <option value="Mochi">Mochi</option>
                <option value="Luhar">Luhar</option>
                <option value="Prajapati">Prajapati</option>
                <option value="Suthar">Suthar</option>
                <option value="Kharava">Kharava</option>
                <option value="Kayastha">Kayastha</option>
                <option value="Rami">Rami</option>
                <option value="Koli">Koli</option>
                <option value="Modh">Modh</option>
                <option value="Champaneri">Champaneri</option>
                <option value="Rabari">Rabari</option>
                <option value="Brahmkshatriya">Brahmkshatriya</option>
                <option value="Brahmbhatt">Brahmbhatt</option>
                <option value="Valand">Valand</option>
                <option value="Panchal">Panchal</option>
                <option value="Punde">Punde</option>
                <option value="Parmar">Parmar</option>
                <option value="Tank">Tank</option>
                <option value="Suhagiya">Suhagiya</option>
                <option value="Makwana">Makwana</option>
                <option value="Das">Das</option>
                <option value="Limbachiya">Limbachiya</option>
                <option value="Desai">Desai</option>
                <option value="Ramanandi">Ramanandi</option>
                <option value="Sadhu">Sadhu</option>
                <option value="Madrasi">Madrasi</option>
                <option value="Mali">Mali</option>
                <option value="Golarana">Golarana</option>
                <option value="Zoroastrian">Zoroastrian</option>
                <option value="Scheduled Caste">Scheduled Caste</option>
                <option value="Aahir">Aahir</option>
                <option value="Khalas">Khalas</option>
                <option value="Gadhavi">Gadhavi</option>
                <option value="Kansara">Kansara</option>
                <option value="Scheduled Tribe">Scheduled Tribe</option>
                <option value="Sathvara">Sathvara</option>
                <option value="Goswami">Goswami</option>
                <option value="Marathi">Marathi</option>
                <option value="Bhavsar">Bhavsar</option>
                <option value="Rana">Rana</option>
                <option value="Thakkar">Thakkar</option>
                <option value="Kadiya">Kadiya</option>
                <option value="Padmshali">Padmshali</option>
                <option value="Arora">Arora</option>
                <option value="Hyderbadi Sindhi">Hyderbadi Sindhi</option>
                <option value="Goyla">Goyla</option>
                <option value="Thakor">Thakor</option>
                <option value="Solanki">Solanki</option>
                <option value="Kadia">Kadia</option>
                <option value="Barot">Barot</option>
                <option value="Kachiya">Kachiya</option>
                <option value="Bhanusari">Bhanusari</option>
                <option value="Gupta">Gupta</option>
                <option value="Chamar">Chamar</option>
                <option value="Jatav">Jatav</option>
                <option value="Rajasthani">Rajasthani</option>
                <option value="Christian">Christian</option>
                <option value="Dungari">Dungari</option>
                <option value="Garasiya">Garasiya</option>
                <option value="OBC">OBC</option>
                <option value="Parsi">Parsi</option>
                <option value="Koshti">Koshti</option>
                <option value="Jeasir">Jeasir</option>
                <option value="Agarwal">Agarwal</option>
                <option value="Mayavanshi">Mayavanshi</option>
                <option value="Raval">Raval</option>
                <option value="Oad">Oad</option>
                <option value="Bhatia">Bhatia</option>
                <option value="Bengali">Bengali</option>
                <option value="Gurjar">Gurjar</option>
                <option value="Kshatriya">Kshatriya</option>
                <option value="Kadia">Kadia</option>
                <option value="Jaiswal">Jaiswal</option>
                <option value="Machi">Machi</option>
                <option value="Nayak">Nayak</option>
                <option value="Maheshvari">Maheshvari</option>
                <option value="Bhil">Bhil</option>
                <option value="Ajalpuria">Ajalpuria</option>
                <option value="Bhandari">Bhandari</option>
              </select>
            </div>
            <input
              type="text"
              name="subCaste"
              id="subCaste"
              placeholder="Enter Your Sub Caste"
              value={formData.subCaste}
              onChange={handleInputChange}
              required
            />

            <select
              name="maritalStatus"
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Your Marital Status
              </option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow/Widower">Widow/Widower</option>
              <option value="Engagement Broken">Engagement Broken</option>
            </select>

            <div className="input-group">
              {(formData.maritalStatus &&
                formData.maritalStatus === "Divorced") ||
              formData.maritalStatus === "Widow/Widower" ? (
                <div className="input-group col">
                  <label htmlFor="haveChildren">Do you have Children?</label>
                  <select
                    name="haveChildren"
                    id="haveChildren"
                    value={formData.haveChildren}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select One Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ) : null}

              {formData.haveChildren && formData.haveChildren === "Yes" ? (
                <div className="input-group col">
                  <label htmlFor="noOfChildren">Number of Children</label>
                  <input
                    type="number"
                    name="noOfChildren"
                    id="noOfChildren"
                    value={formData.noOfChildren}
                    onChange={handleInputChange}
                    placeholder="Enter Number of Children"
                    required
                  />
                </div>
              ) : null}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="height"
                id="height"
                placeholder="Enter Your Height (in inches)"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="weight"
                id="weight"
                placeholder="Enter Your Weight (in kgs)"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <select
                name="complexion"
                id="complexion"
                value={formData.complexion}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Complexion
                </option>
                <option value="Fair">Fair</option>
                <option value="Wheatish">Wheatish</option>
                <option value="Dark">Dark</option>
              </select>
              <select
                name="bodyType"
                id="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Body Type
                </option>
                <option value="Slim">Slim</option>
                <option value="Average">Average</option>
                <option value="Athletic">Athletic</option>
                <option value="Heavy">Heavy</option>
              </select>
            </div>

            <div className="input-group">
              <select
                name="bloodGroup"
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                name="donateBlood"
                id="donateBlood"
                value={formData.donateBlood}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Are you willing to donate blood?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <legend>Career Details*</legend>
            <div className="input-group">
              <select
                name="qualification"
                id="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Qualification Level
                </option>
                {qualifications.map((qualification, index) => (
                  <option
                    key={`${qualification.qualification_name}-${index}`}
                    value={qualification.qualification_id}
                  >
                    {qualification.qualification_name}
                  </option>
                ))}
              </select>
              <select
                name="educationSpecialization"
                id="educationSpecialization"
                value={formData.educationSpecialization}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Education Specialization
                </option>
                {specializations.map((specialization, index) => (
                  <option
                    key={`${specialization.education_specialization_name}-${index}`}
                    value={specialization.education_specialization_id}
                  >
                    {specialization.education_specialization_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <select
                name="currentLocation"
                id="currentLocation"
                value={formData.currentLocation}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Current Location
                </option>
                {currentLocations.map((currentLocation, index) => (
                  <option
                    key={`${currentLocation.name}-${index}`}
                    value={currentLocation.id}
                  >
                    {currentLocation.name}
                  </option>
                ))}
              </select>

              <select
                name="immigrationStatus"
                id="immigrationStatus"
                value={formData.immigrationStatus}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Your Immigration Status
                </option>
                <option value="Citizen">Citizen</option>
                <option value="Permanent Resident">Permanent Resident</option>
                <option value="Temporary Residency">Temporary Residency</option>
                <option value="Business Visa">Business Visa</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Non Citizen">Non Citizen</option>
              </select>
            </div>

            <input
              type="text"
              name="designation"
              id="designation"
              value={formData.designation}
              placeholder="Enter Your Designation"
              onChange={handleInputChange}
              required
            />

            <textarea
              name="designationDetails"
              id="designationDetails"
              placeholder="Enter Designation Details"
              value={formData.designationDetails}
              onChange={handleInputChange}
              required
            ></textarea>

            <select
              name="annualIncome"
              id="annualIncome"
              value={formData.annualIncome}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Annual Income
              </option>
              <option value="Upto 1 Lakh">Upto 1 Lakh</option>
              <option value="1-2 Lakhs">1-2 Lakhs</option>
              <option value="2-3 Lakhs">2-3 Lakhs</option>
              <option value="3-4 Lakhs">3-4 Lakhs</option>
              <option value="4-5 Lakhs">4-5 Lakhs</option>
              <option value="5-6 Lakhs">5-6 Lakhs</option>
              <option value="6-7 Lakhs">6-7 Lakhs</option>
              <option value="7-8 Lakhs">7-8 Lakhs</option>
              <option value="8-9 Lakhs">8-9 Lakhs</option>
              <option value="9-10 Lakhs">9-10 Lakhs</option>
              <option value="10-15 Lakhs">10-15 Lakhs</option>
              <option value="15-20 Lakhs">15-20 Lakhs</option>
              <option value="20-25 Lakhs">20-25 Lakhs</option>
              <option value="25-30 Lakhs">25-30 Lakhs</option>
              <option value="30-35 Lakhs">30-35 Lakhs</option>
              <option value="35-40 Lakhs">35-40 Lakhs</option>
              <option value="40-45 Lakhs">40-45 Lakhs</option>
              <option value="45-50 Lakhs">45-50 Lakhs</option>
              <option value="50-60 Lakhs">50-60 Lakhs</option>
              <option value="60-70 Lakhs">60-70 Lakhs</option>
              <option value="70-80 Lakhs">70-80 Lakhs</option>
              <option value="80-90 Lakhs">80-90 Lakhs</option>
              <option value="90-100 Lakhs">90-100 Lakhs</option>
              <option value="Above 1 Crore">Above 1 Crore</option>
              <option value="Don't Want to Specify">
                Don&apos;t Want to Specify
              </option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Family Details*</legend>
            <div className="input-group">
              <input
                type="text"
                name="fatherName"
                id="fatherName"
                placeholder="Enter Your Father's Name"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="fatherMobile"
                id="fatherMobile"
                placeholder="Enter Your Father's Mobile Number"
                value={formData.fatherMobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <select
              name="fatherOccupation"
              id="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Your Father&apos;s Occupation
              </option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Government Job">Government Job</option>
              <option value="Private Job">Private Job</option>
              <option value="Retired">Retired</option>
              <option value="Not Employed">Not Employed</option>
              <option value="Tuition Class">Tuition Class</option>
              <option value="Doctor">Doctor</option>
              <option value="Engineer">Engineer</option>
              <option value="Farmer">Farmer</option>
              <option value="Home Maker">Home Maker</option>
              <option value="Judge">Judge</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Politician">Politician</option>
              <option value="Professor">Professor</option>
              <option value="Others">Others</option>
            </select>
            <div className="input-group">
              <input
                type="text"
                name="motherName"
                id="motherName"
                placeholder="Enter Your Mother's Name"
                value={formData.motherName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="motherMobile"
                id="motherMobile"
                placeholder="Enter Your Mother's Mobile Number"
                value={formData.motherMobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <select
              name="motherOccupation"
              id="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Your Mother&apos;s Occupation
              </option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Government Job">Government Job</option>
              <option value="Private Job">Private Job</option>
              <option value="Retired">Retired</option>
              <option value="Not Employed">Not Employed</option>
              <option value="Tuition Class">Tuition Class</option>
              <option value="Doctor">Doctor</option>
              <option value="Engineer">Engineer</option>
              <option value="Farmer">Farmer</option>
              <option value="Home Maker">Home Maker</option>
              <option value="Judge">Judge</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Politician">Politician</option>
              <option value="Professor">Professor</option>
              <option value="Others">Others</option>
            </select>
            <div className="input-group">
              <input
                type="text"
                name="grandfatherName"
                id="grandfatherName"
                placeholder="Enter Your Grandfather's Name"
                value={formData.grandfatherName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="grandmotherName"
                id="grandmotherName"
                placeholder="Enter Your Grandmother's Name"
                value={formData.grandmotherName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="nanaName"
                id="nanaName"
                placeholder="Enter Your Nana's Name"
                value={formData.nanaName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="naniName"
                id="naniName"
                placeholder="Enter Your Nani's Name"
                value={formData.naniName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <select
                name="noOfBrothers"
                id="noOfBrothers"
                value={formData.noOfBrothers}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Number of Brothers
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5/5+</option>
              </select>
              <select
                name="noOfSisters"
                id="noOfSisters"
                value={formData.noOfSisters}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Number of Sisters
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5/5+</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <legend>Horoscope Details*</legend>
            <select
              name="believeInHoroscope"
              id="believeInHoroscope"
              value={formData.believeInHoroscope}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Do you believe in Horoscope?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {formData.believeInHoroscope &&
            formData.believeInHoroscope === "Yes" ? (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    name="rashi"
                    id="rashi"
                    placeholder="Enter Your Rashi"
                    value={formData.rashi}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="gotra"
                    id="gotra"
                    placeholder="Enter Your Gotra"
                    value={formData.gotra}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="varna"
                    id="varna"
                    placeholder="Enter Your Varna"
                    value={formData.varna}
                    onChange={handleInputChange}
                  />
                </div>
                <select
                  name="mangalShani"
                  id="mangalShani"
                  value={formData.mangalShani}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Is There Mangal/Shani in your Horoscope?
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </>
            ) : null}
          </fieldset>

          <fieldset>
            <legend>Disability Details*</legend>
            <select
              name="disability"
              id="disability"
              value={formData.disability}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Type of disability
              </option>
              <option value="Locomotor">Orthopedic</option>
              <option value="Visual">Visual</option>
              <option value="Hearing">Hearing</option>
            </select>
            <select
              name="disabilityPercentage"
              id="disabilityPercentage"
              value={formData.disabilityPercentage}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Percentage of disability
              </option>
              <option value="40-50">40-50</option>
              <option value="50-60">50-60</option>
              <option value="60-70">60-70</option>
              <option value="70-80">70-80</option>
              <option value="80-90">80-90</option>
              <option value="90-100">90-100</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>About Yourself*</legend>
            <select
              name="diet"
              id="diet"
              value={formData.diet}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Your Diet
              </option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non Vegetarian">Non Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
              <option value="Jain">Jain</option>
              <option value="Vegan">Vegan</option>
            </select>

            <div className="input-group">
              <select
                name="smoke"
                id="smoke"
                value={formData.smoke}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Do you smoke?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="drink"
                id="drink"
                value={formData.drink}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Do you drink?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <textarea
              name="hobbies"
              id="hobbies"
              value={formData.hobbies}
              onChange={handleInputChange}
              placeholder="Enter Your Hobbies"
              required
            ></textarea>
            <textarea
              name="about"
              id="about"
              value={formData.about}
              placeholder="Tell us few things about yourself"
              onChange={handleInputChange}
              required
            ></textarea>
          </fieldset>
          <fieldset>
            <legend>Partner Preferences*</legend>
            <select
              name="ageGap"
              id="ageGap"
              value={formData.ageGap}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Age Gap
              </option>
              <option value="1-2">1-2</option>
              <option value="2-3">2-3</option>
              <option value="3-4">3-4</option>
              <option value="4-5">4-5</option>
              <option value="5-6">5-6</option>
              <option value="6-7">6-7</option>
              <option value="7-8">7-8</option>
              <option value="8-9">8-9</option>
              <option value="9-10">9-10</option>
              <option value="10+">10+</option>
            </select>

            <div className="input-group">
              <select
                name="partnerReligion"
                id="partnerReligion"
                value={formData.partnerReligion}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Partner&apos;s Religion
                </option>
                <option value="Any">Any</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Parsi">Parsi</option>
                <option value="Jewish">Jewish</option>
                <option value="Bahai">Bahai</option>
                <option value="Others">Others</option>
              </select>

              <select
                name="partnerCaste"
                id="partnerCaste"
                value={formData.partnerCaste}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Partner&apos;s Caste
                </option>
                <option value="Any">Any</option>
                <option value="Patel">Patel</option>
                <option value="Brahmin">Brahmin</option>
                <option value="Vaishnav">Vaishnav</option>
                <option value="Vanik">Vanik</option>
                <option value="Jain">Jain</option>
                <option value="Lohana">Lohana</option>
                <option value="Rajput">Rajput</option>
                <option value="Vishwakarma">Vishwakarma</option>
                <option value="Vankar">Vankar</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Marwari">Marwari</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Shia">Shia</option>
                <option value="Sunni">Sunni</option>
                <option value="Khoja">Khoja</option>
                <option value="Chhipa">Chhipa</option>
                <option value="Ghanchi">Ghanchi</option>
                <option value="Methodist">Methodist</option>
                <option value="Protagonist">Protagonist</option>
                <option value="Catholic">Catholic</option>
                <option value="Protestant">Protestant</option>
                <option value="Chaudhari">Chaudhari</option>
                <option value="Thakur">Thakur</option>
                <option value="Dhobi">Dhobi</option>
                <option value="Kshatriya">Kshatriya</option>
                <option value="Kumhar">Kumhar</option>
                <option value="Yadav">Yadav</option>
                <option value="Moni">Moni</option>
                <option value="Gursikh">Gursikh</option>
                <option value="Jat">Jat</option>
                <option value="Kamboj">Kamboj</option>
                <option value="Kesadhari">Kesadhari</option>
                <option value="Saini">Saini</option>
                <option value="Rami">Rami</option>
                <option value="Gajjar">Gajjar</option>
                <option value="Mistry">Mistry</option>
                <option value="Bhojak">Bhojak</option>
                <option value="Modi">Modi</option>
                <option value="Rohit">Rohit</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Soni">Soni</option>
                <option value="Darji">Darji</option>
                <option value="Khatri">Khatri</option>
                <option value="Mochi">Mochi</option>
                <option value="Luhar">Luhar</option>
                <option value="Prajapati">Prajapati</option>
                <option value="Suthar">Suthar</option>
                <option value="Kharava">Kharava</option>
                <option value="Kayastha">Kayastha</option>
                <option value="Rami">Rami</option>
                <option value="Koli">Koli</option>
                <option value="Modh">Modh</option>
                <option value="Champaneri">Champaneri</option>
                <option value="Rabari">Rabari</option>
                <option value="Brahmkshatriya">Brahmkshatriya</option>
                <option value="Brahmbhatt">Brahmbhatt</option>
                <option value="Valand">Valand</option>
                <option value="Panchal">Panchal</option>
                <option value="Punde">Punde</option>
                <option value="Parmar">Parmar</option>
                <option value="Tank">Tank</option>
                <option value="Suhagiya">Suhagiya</option>
                <option value="Makwana">Makwana</option>
                <option value="Das">Das</option>
                <option value="Limbachiya">Limbachiya</option>
                <option value="Desai">Desai</option>
                <option value="Ramanandi">Ramanandi</option>
                <option value="Sadhu">Sadhu</option>
                <option value="Madrasi">Madrasi</option>
                <option value="Mali">Mali</option>
                <option value="Golarana">Golarana</option>
                <option value="Zoroastrian">Zoroastrian</option>
                <option value="Scheduled Caste">Scheduled Caste</option>
                <option value="Aahir">Aahir</option>
                <option value="Khalas">Khalas</option>
                <option value="Gadhavi">Gadhavi</option>
                <option value="Kansara">Kansara</option>
                <option value="Scheduled Tribe">Scheduled Tribe</option>
                <option value="Sathvara">Sathvara</option>
                <option value="Goswami">Goswami</option>
                <option value="Marathi">Marathi</option>
                <option value="Bhavsar">Bhavsar</option>
                <option value="Rana">Rana</option>
                <option value="Thakkar">Thakkar</option>
                <option value="Kadiya">Kadiya</option>
                <option value="Padmshali">Padmshali</option>
                <option value="Arora">Arora</option>
                <option value="Hyderbadi Sindhi">Hyderbadi Sindhi</option>
                <option value="Goyla">Goyla</option>
                <option value="Thakor">Thakor</option>
                <option value="Solanki">Solanki</option>
                <option value="Kadia">Kadia</option>
                <option value="Barot">Barot</option>
                <option value="Kachiya">Kachiya</option>
                <option value="Bhanusari">Bhanusari</option>
                <option value="Gupta">Gupta</option>
                <option value="Chamar">Chamar</option>
                <option value="Jatav">Jatav</option>
                <option value="Rajasthani">Rajasthani</option>
                <option value="Christian">Christian</option>
                <option value="Dungari">Dungari</option>
                <option value="Garasiya">Garasiya</option>
                <option value="OBC">OBC</option>
                <option value="Parsi">Parsi</option>
                <option value="Koshti">Koshti</option>
                <option value="Jeasir">Jeasir</option>
                <option value="Agarwal">Agarwal</option>
                <option value="Mayavanshi">Mayavanshi</option>
                <option value="Raval">Raval</option>
                <option value="Oad">Oad</option>
                <option value="Bhatia">Bhatia</option>
                <option value="Bengali">Bengali</option>
                <option value="Gurjar">Gurjar</option>
                <option value="Kshatriya">Kshatriya</option>
                <option value="Kadia">Kadia</option>
                <option value="Jaiswal">Jaiswal</option>
                <option value="Machi">Machi</option>
                <option value="Nayak">Nayak</option>
                <option value="Maheshvari">Maheshvari</option>
                <option value="Bhil">Bhil</option>
                <option value="Ajalpuria">Ajalpuria</option>
                <option value="Bhandari">Bhandari</option>
              </select>
            </div>

            <input
              type="text"
              name="partnerSubCaste"
              id="partnerSubCaste"
              value={formData.partnerSubCaste}
              placeholder="Enter Partner's Sub Caste"
              onChange={handleInputChange}
              required
            />

            <select
              name="partnerQualification"
              id="partnerQualification"
              value={formData.partnerQualification}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Partner&apos;s Qualification
              </option>
              {qualifications.map((qualification, index) => (
                <option
                  key={`${qualification.qualification_name}-${index}`}
                  value={qualification.qualification_id}
                >
                  {qualification.qualification_name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="partnerOccupation"
              id="partnerOccupation"
              value={formData.partnerOccupation}
              placeholder="Enter Partner's Occupation"
              onChange={handleInputChange}
              required
            />

            <select
              name="partnerAnnualIncome"
              id="partnerAnnualIncome"
              value={formData.partnerAnnualIncome}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Partner&apos;s Annual Income
              </option>
              <option value="Upto 1 Lakh">Upto 1 Lakh</option>
              <option value="1-2 Lakhs">1-2 Lakhs</option>
              <option value="2-3 Lakhs">2-3 Lakhs</option>
              <option value="3-4 Lakhs">3-4 Lakhs</option>
              <option value="4-5 Lakhs">4-5 Lakhs</option>
              <option value="5-6 Lakhs">5-6 Lakhs</option>
              <option value="6-7 Lakhs">6-7 Lakhs</option>
              <option value="7-8 Lakhs">7-8 Lakhs</option>
              <option value="8-9 Lakhs">8-9 Lakhs</option>
              <option value="9-10 Lakhs">9-10 Lakhs</option>
              <option value="10-15 Lakhs">10-15 Lakhs</option>
              <option value="15-20 Lakhs">15-20 Lakhs</option>
              <option value="20-25 Lakhs">20-25 Lakhs</option>
              <option value="25-30 Lakhs">25-30 Lakhs</option>
              <option value="30-35 Lakhs">30-35 Lakhs</option>
              <option value="35-40 Lakhs">35-40 Lakhs</option>
              <option value="40-45 Lakhs">40-45 Lakhs</option>
              <option value="45-50 Lakhs">45-50 Lakhs</option>
              <option value="50-60 Lakhs">50-60 Lakhs</option>
              <option value="60-70 Lakhs">60-70 Lakhs</option>
              <option value="70-80 Lakhs">70-80 Lakhs</option>
              <option value="80-90 Lakhs">80-90 Lakhs</option>
              <option value="90-100 Lakhs">90-100 Lakhs</option>
              <option value="Above 1 Crore">Above 1 Crore</option>
              <option value="Don't Want to Specify">
                Don&apos;t Want to Specify
              </option>
            </select>

            <select
              name="mangalik"
              id="mangalik"
              value={formData.mangalik}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Can Partner be Mangalik?
              </option>
              <option value="Doesn't Matter">Doesn&apos;t Matter</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select
              name="partnerMaritalStatus"
              id="partnerMaritalStatus"
              value={formData.partnerMaritalStatus}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Partner&apos;s Marital Status
              </option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow/Widower">Widow/Widower</option>
              <option value="Engagement Broken">Engagement Broken</option>
            </select>

            <select
              name="goAbroad"
              id="goAbroad"
              value={formData.goAbroad}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Partner is willing to go abroad?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </fieldset>
          <button type="submit" className="btn">
            Update Details
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
