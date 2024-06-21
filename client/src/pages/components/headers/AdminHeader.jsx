import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = UserStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="container">
      <header>
        <Link to="/admin/dashboard" className="nav-link">
          <h2>Admin Panel</h2>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <div className="btn-container">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </ul>
      </header>
    </div>
  );
};

export default AdminHeader;
