import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { loginState, userDetails, loginData, setLoginState } = UserStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loginState, userDetails);
    if (loginState) {
      if (userDetails.type === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/404");
      }
    }
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

    const response = await fetch(`${API}/admin/login`, {
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

    setLoginState(true);
    loginData(data.user);
    toast.success(data.message);
    navigate("/admin/dashboard");
  };

  return (
    <div className="container">
      <section className="admin-login">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-full">
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminLogin;
