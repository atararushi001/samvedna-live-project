import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MatrimonyLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    console.log(formData);

    navigate("/matrimony-dashboard");
  };

  return (
    <div className="container">
      <section className="matrimony-login">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Login
        </h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email Address"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Your Password"
            required
          />
          <button className="btn btn-full" type="submit">
            Login
          </button>

          <Link to="/matrimony-register" className="forgot-password">
            Don&apos;t have an account? Register here
          </Link>
        </form>
      </section>
    </div>
  );
};

export default MatrimonyLogin;
