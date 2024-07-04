import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const GetCSVData = () => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    qualification: "",
    specialization: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [showResults, setShowResults] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { country, state, city, qualification, specialization } = formData;

    if (!country || !state || !city || !qualification || !specialization) {
      toast.error("Please select all fields");
      return;
    }

    setShowResults(true);
  };

  return (
    <div className="get-csv-data">
      <h1>Get CSV Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <select
            name="qualification"
            id="qualification"
            value={formData.qualification}
            onChange={(e) =>
              setFormData({ ...formData, qualification: e.target.value })
            }
          >
            <option value="">Select Qualification</option>
            {qualifications.map((qualification) => (
              <option
                key={qualification.qualification_id}
                value={qualification.qualification_id}
              >
                {qualification.qualification_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization</label>
          <select
            name="specialization"
            id="specialization"
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
          >
            <option value="">Select Specialization</option>
            {specializations.map((specialization) => (
              <option
                key={specialization.education_specialization_id}
                value={specialization.education_specialization_id}
              >
                {specialization.education_specialization_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-delete btn-full"
          onClick={() => {
            setFormData({
              country: "",
              state: "",
              city: "",
              qualification: "",
              specialization: "",
            });
            setShowResults(false);
          }}
        >
          Reset
        </button>
        <button className="btn btn-full" type="submit">
          Get Data
        </button>
      </form>

      {showResults && (
        <div className="show-results">
          <h1>Results</h1>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Qualification</th>
                <th>Education Specialization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.country}</td>
                <td>{formData.state}</td>
                <td>{formData.city}</td>
                <td>{formData.qualification}</td>
                <td>{formData.specialization}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetCSVData;
