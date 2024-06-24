import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_API_URL;

const AddSelfEmployee = ({ setView }) => {
  const [formData, setFormData] = useState({
    name: "",
    disabilityType: "",
    percentage: "",
    education: "",
    companyName: "",
    companyType: "",
    officeAddress: "",
    contactNumber: "",
    email: "",
    professionType: "",
    description: "",
    productDetails: [],
    experience: "",
    assistanceNedeed: "",
  });

  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    fetch(`${API}/utils/professions`)
      .then((response) => response.json())
      .then((data) => {
        setProfessions(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("product")) {
      const index = parseInt(name.replace("product", ""), 10);
      const updatedProductDetails = [...formData.productDetails];
      updatedProductDetails[index] = value;

      setFormData((prevData) => ({
        ...prevData,
        productDetails: updatedProductDetails,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const addProductDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: [...prevData.productDetails, ""],
    }));
  };

  const removeProductDetail = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: prevData.productDetails.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    const response = await fetch(`${API}/self-employed/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.dismiss();
      toast.success(data.message);
      setView("selfEmployees");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="add-self-employee">
      <h1>Add Self Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
          name="disabilityType"
          value={formData.disabilityType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Type of Disability
          </option>
          <option value="Blindness">Blindness</option>
          <option value="Low vision">Low vision</option>
          <option value="Leprosy cured">Leprosy cured</option>
          <option value="Hearing impairment">Hearing impairment</option>
          <option value="Locomotor disability">Locomotor disability</option>
          <option value="Mental Retardation">Mental Retardation</option>
          <option value="Mental illness">Mental illness</option>
        </select>
        <select
          name="percentage"
          value={formData.percentage}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Percentage of Disability
          </option>
          <option value="40-45">40-45</option>
          <option value="45-50">45-50</option>
          <option value="50-55">50-55</option>
          <option value="55-60">55-60</option>
          <option value="60-65">60-65</option>
          <option value="65-70">65-70</option>
          <option value="70-75">70-75</option>
          <option value="75-80">75-80</option>
          <option value="80-85">80-85</option>
          <option value="85-90">85-90</option>
          <option value="90-95">90-95</option>
          <option value="95-100">95-100</option>
        </select>
        <input
          type="text"
          name="education"
          placeholder="Educational Qualification"
          value={formData.education}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Name of your Firm/Shop/Company"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <select
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Type of your Company
          </option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Dealer">Dealer</option>
          <option value="Distributor">Distributor</option>
          <option value="Wholesaler">Wholesaler</option>
          <option value="Retailer">Retailer</option>
          <option value="Self-employed">Self-employed</option>
        </select>
        <input
          type="text"
          name="officeAddress"
          placeholder="Office Address"
          value={formData.officeAddress}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="professionType"
          id="professionType"
          required
          value={formData.professionType}
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" selected>
            Select Your Profession
          </option>
          {professions.map((profession, index) => (
            <option
              key={`${profession.profession_name}-${index}`}
              value={profession.id}
            >
              {profession.profession_name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Describe Your Profession (in one sentence)"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="productDetails" style={{ textAlign: "left" }}>
          Add Product Details (If Any)
        </label>
        {formData.productDetails.map((detail, index) => (
          <div
            name="productDetails"
            key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              name={`product${index}`}
              placeholder={`Product Detail ${index + 1}`}
              value={detail}
              required
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-delete"
              onClick={() => removeProductDetail(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline"
          onClick={addProductDetail}
        >
          Add Field
        </button>

        <input
          type="text"
          name="experience"
          id="experience"
          placeholder="Experience in Profession"
          required
          value={formData.experience}
          onChange={handleChange}
        />

        <input
          type="text"
          name="assistanceNedeed"
          id="assistanceNedeed"
          placeholder="Assistance nedeed for Self-Employment"
          required
          value={formData.assistanceNedeed}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-full">
          Submit
        </button>
      </form>
    </div>
  );
};

AddSelfEmployee.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AddSelfEmployee;
