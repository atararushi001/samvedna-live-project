import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  MenuItem,
  SubMenu,
  Menu,
  sidebarClasses,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserStore from "../../stores/UserStore";

import MainView from "../components/admin/MainView";
import Recruiters from "../components/admin/Recruiters";
import AddRecruiter from "../components/admin/AddRecruiter";

import Logo from "../../assets/images/logo.png";

const AdminDashboard = () => {
  const { loginState } = UserStore();
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    if (!loginState) {
      navigate("/");
    }
  }, [loginState, navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#f0f4ef",
            borderRight: "1px solid #d0d7cc",
          },
        }}
      >
        <div className="sidebar-header">
          <img
            src={Logo}
            alt="MySamvedna Logo"
            style={{ width: "100%", padding: "1rem", marginBlock: "1rem" }}
          />
        </div>

        <Menu>
          <MenuItem
            icon={<FontAwesomeIcon icon="home" />}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </MenuItem>
          <SubMenu
            label="Recruiters"
            icon={<FontAwesomeIcon icon="user-tie" />}
          >
            <MenuItem onClick={() => setView("viewRecruiters")}>
              View Recruiters
            </MenuItem>
            <MenuItem onClick={() => setView("addRecruiter")}>
              Add Recruiter
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Job Seekers"
            icon={<FontAwesomeIcon icon="clipboard-user" />}
          >
            <MenuItem>View Job Seekers</MenuItem>
            <MenuItem>Add Job Seekers</MenuItem>
          </SubMenu>
          <SubMenu
            label="Self Employees"
            icon={<FontAwesomeIcon icon="user-plus" />}
          >
            <MenuItem>View Self Employees</MenuItem>
            <MenuItem>Add Self Employees</MenuItem>
          </SubMenu>
          <SubMenu
            label="Matrimony Users"
            icon={<FontAwesomeIcon icon="user-group" />}
          >
            <MenuItem>View Matrimony Users</MenuItem>
            <MenuItem>Add Matrimony Users</MenuItem>
          </SubMenu>
          <SubMenu label="Blogs" icon={<FontAwesomeIcon icon="newspaper" />}>
            <MenuItem>View Blogs</MenuItem>
            <MenuItem>Add Blogs</MenuItem>
          </SubMenu>
          <MenuItem
            label="Contact Queries"
            icon={<FontAwesomeIcon icon="file-contract" />}
          >
            Contact Queries
          </MenuItem>
        </Menu>
      </Sidebar>
      <main>
        {view === "dashboard" && <MainView />}
        {view === "viewRecruiters" && <Recruiters />}
        {view === "addRecruiter" && <AddRecruiter setView={setView} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
