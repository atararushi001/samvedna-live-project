import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const MatrimonyRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    maritalStatus: "",
    height: "",
    weight: "",
    complexion: "",
    bodyType: "",
    qualification: "",
    educationSpecialization: "",
    occupation: "",
    occupationDetails: "",
    annualIncome: "",
    familyStatus: "",
    familyType: "",
    disability: "",
    disabilityPercentage: "",
    about: "",
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetch(`${API}/utils/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.results);
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

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
      return;
    }

    if (formData.dob > new Date().toISOString().split("T")[0]) {
      toast.error("Date of Birth cannot be in the future");
      return;
    }

    console.log(formData);

    navigate("/matrimony-login");
  };

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
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleInputChange}
              accept="image/*"
              required
            />

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
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
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
            <input
              type="date"
              name="dob"
              id="dob"
              placeholder="Enter Your Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="religion"
              id="religion"
              placeholder="Enter Your Religion"
              value={formData.religion}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="caste"
              id="caste"
              placeholder="Enter Your Caste"
              value={formData.caste}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="subCaste"
              id="subCaste"
              placeholder="Enter Your Sub Caste"
              value={formData.subCaste}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="motherTongue"
              id="motherTongue"
              placeholder="Enter Your Mother Tongue"
              value={formData.motherTongue}
              onChange={handleInputChange}
              required
            />
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
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
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
          </fieldset>
          <fieldset>
            <legend>Education Details*</legend>
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
          </fieldset>
          <fieldset>
            <legend>Occupation Details*</legend>
            <input
              type="text"
              name="occupation"
              id="occupation"
              placeholder="Enter Your Occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="occupationDetails"
              id="occupationDetails"
              placeholder="Enter Your Occupation Details"
              value={formData.occupationDetails}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="annualIncome"
              id="annualIncome"
              placeholder="Enter Your Annual Income"
              value={formData.annualIncome}
              onChange={handleInputChange}
              required
            />
          </fieldset>
          <fieldset>
            <legend>Family Details*</legend>
            <select
              name="familyStatus"
              id="familyStatus"
              value={formData.familyStatus}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Family Status
              </option>
              <option value="Joint">Joint</option>
              <option value="Nuclear">Nuclear</option>
            </select>
            <select
              name="familyType"
              id="familyType"
              value={formData.familyType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Family Type
              </option>
              <option value="Middle Class">Middle Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Rich">Rich</option>
            </select>
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
            <textarea
              name="about"
              id="about"
              value={formData.about}
              placeholder="Tell us few things about yourself"
              onChange={handleInputChange}
              required
            ></textarea>
          </fieldset>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default MatrimonyRegister;
