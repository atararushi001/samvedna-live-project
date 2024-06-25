import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_API_URL;

const AddAdmin = ({ setView }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.username === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    const response = await fetch(`${API}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    const data = await response.json();

    toast.success(data.message);
    setView("dashboard");
  };
  return (
    <div className="add-admin">
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          placeholder="Enter Admin Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Admin Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Admin Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-full">
          Add Admin
        </button>
      </form>
    </div>
  );
};

AddAdmin.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AddAdmin;
