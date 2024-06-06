import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

const SearchProfiles = () => {
  const [formData, setFormData] = useState({
    search: "",
    country: "",
    state: "",
    city: "",
    religion: "",
    age: "",
    height: "",
    maritalStatus: "",
    education: "",
    occupation: "",
    income: "",
    familyStatus: "",
    familyType: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [advanceSearch, setAdvanceSearch] = useState(false);

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <div className="container">
      <section className="search">
        <h1>Search Profiles</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search for a Partner"
              value={formData.search}
              onChange={handleChange}
              required
            />
          </div>
          {advanceSearch ? (
            <>
              <button
                type="button"
                className="btn btn-delete"
                onClick={() => setAdvanceSearch(false)}
              >
                Hide Advance Search
              </button>
              <h3 style={{ textAlign: "left" }}>Advance Search:</h3>
              <div className="form-group">
                <select
                  className="form-control"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
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
                <select
                  className="form-control"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
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
                <select
                  className="form-control"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
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
                <select
                  className="form-control"
                  id="religion"
                  value={formData.religion}
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                >
                  <option value="">Select Age</option>
                  <option value="18-25">18-25</option>
                  <option value="26-30">26-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36-40">36-40</option>
                  <option value="41-45">41-45</option>
                  <option value="46-50">46-50</option>
                  <option value="51-55">51-55</option>
                  <option value="56-60">56-60</option>
                  <option value="61-65">61-65</option>
                  <option value="66-70">66-70</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                >
                  <option value="">Select Height</option>
                  <option value="4ft-5ft">4ft-5ft</option>
                  <option value="5ft-6ft">5ft-6ft</option>
                  <option value="6ft-7ft">6ft-7ft</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="education"
                  value={formData.education}
                  onChange={handleChange}
                >
                  <option value="">Select Education</option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="Employed">Employed</option>
                  <option value="Business">Business</option>
                  <option value="Self Employed">Self Employed</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="income"
                  value={formData.income}
                  onChange={handleChange}
                >
                  <option value="">Select Income</option>
                  <option value="0-5L">0-5L</option>
                  <option value="5-10L">5-10L</option>
                  <option value="10-15L">10-15L</option>
                  <option value="15-20L">15-20L</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="familyStatus"
                  value={formData.familyStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Family Status</option>
                  <option value="Middle Class">Middle Class</option>
                  <option value="Upper Middle Class">Upper Middle Class</option>
                  <option value="Rich">Rich</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="familyType"
                  value={formData.familyType}
                  onChange={handleChange}
                >
                  <option value="">Select Family Type</option>
                  <option value="Joint Family">Joint</option>
                  <option value="Nuclear Family">Nuclear</option>
                </select>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setAdvanceSearch(true)}
            >
              Show Advance Search
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </section>
    </div>
  );
};

export default SearchProfiles;
