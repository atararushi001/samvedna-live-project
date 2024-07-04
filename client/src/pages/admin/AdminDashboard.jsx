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
import EditRecruiter from "../components/admin/EditRecruiter";
import JobSeekers from "../components/admin/JobSeekers";
import AddJobSeeker from "../components/admin/AddJobSeeker";
import EditJobSeeker from "../components/admin/EditJobSeeker";
import AddFromCSV from "../components/admin/AddFromCSV";
import GetCSVData from "../components/admin/GetCSVData";
import SelfEmployees from "../components/admin/SelfEmployees";
import AddSelfEmployee from "../components/admin/AddSelfEmployee";
import MatrimonyUsers from "../components/admin/MatrimonyUsers";
import AddMatrimonyUser from "../components/admin/AddMatrimonyUser";
import EditMatrimonyUser from "../components/admin/EditMatrimonyUser";
import Blogs from "../components/admin/Blogs";
import AddBlog from "../components/admin/AddBlog";
import EditBlog from "../components/admin/EditBlog";
import AddAdmin from "../components/admin/AddAdmin";

import Logo from "../../assets/images/Logo.png";

const AdminDashboard = () => {
  const { loginState, logout } = UserStore();
  const navigate = useNavigate();

  const [view, setView] = useState("dashboard");
  const [toggle, setToggle] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [selectedMatrimonyUser, setSelectedMatrimonyUser] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEditRecruiter = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setView("editRecruiter");
  };

  const handleEditJobSeeker = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setView("editJobSeeker");
  };

  const handleEditMatrimonyUser = (matrimonyUser) => {
    setSelectedMatrimonyUser(matrimonyUser);
    setView("editMatrimonyUser");
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setView("editBlogs");
  };

  useEffect(() => {
    if (!loginState) {
      navigate("/");
    }
  }, [loginState, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };
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
        onBackdropClick={() => setToggle(false)}
        toggled={toggle}
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
            <MenuItem
              onClick={() => {
                setView("jobSeekers");
              }}
            >
              View Job Seekers
            </MenuItem>
            <MenuItem
              onClick={() => {
                setView("addJobSeekers");
              }}
            >
              Add Job Seekers
            </MenuItem>
            <MenuItem
              onClick={() => {
                setView("addFromCSV");
              }}
            >
              Add From CSV
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Self Employees"
            icon={<FontAwesomeIcon icon="user-plus" />}
          >
            <MenuItem onClick={() => setView("selfEmployees")}>
              View Self Employees
            </MenuItem>
            <MenuItem onClick={() => setView("addSelfEmployee")}>
              Add Self Employees
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Matrimony Users"
            icon={<FontAwesomeIcon icon="user-group" />}
          >
            <MenuItem onClick={() => setView("matrimonyUsers")}>
              View Matrimony Users
            </MenuItem>
            <MenuItem
              onClick={() => {
                setView("addMatrimonyUser");
              }}
            >
              Add Matrimony Users
            </MenuItem>
          </SubMenu>
          <SubMenu label="Blogs" icon={<FontAwesomeIcon icon="newspaper" />}>
            <MenuItem onClick={() => setView("blogs")}>View Blogs</MenuItem>
            <MenuItem onClick={() => setView("addBlogs")}>Add Blogs</MenuItem>
          </SubMenu>
          <MenuItem
            label="Get CSV Data"
            icon={<FontAwesomeIcon icon="file-csv" />}
            onClick={() => setView("getCSVData")}
          >
            Get CSV Data
          </MenuItem>
          <MenuItem
            label="Add Admin User"
            icon={<FontAwesomeIcon icon="plus" />}
            onClick={() => setView("addAdmin")}
          >
            Add Admin User
          </MenuItem>
          <MenuItem
            style={{
              marginTop: "10px",
            }}
          >
            <button className="btn btn-full" onClick={handleLogout}>
              Logout
            </button>
          </MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <FontAwesomeIcon
          icon="bars"
          className="icon"
          onClick={() => setToggle(!toggle)}
        />
        {view === "dashboard" && <MainView />}
        {view === "viewRecruiters" && (
          <Recruiters onEditRecruiter={handleEditRecruiter} />
        )}
        {view === "addRecruiter" && <AddRecruiter setView={setView} />}
        {view === "editRecruiter" && (
          <EditRecruiter recruiter={selectedRecruiter} setView={setView} />
        )}
        {view === "jobSeekers" && (
          <JobSeekers onEditJobSeeker={handleEditJobSeeker} />
        )}
        {view === "addJobSeekers" && <AddJobSeeker setView={setView} />}
        {view === "editJobSeeker" && (
          <EditJobSeeker setView={setView} jobSeeker={selectedJobSeeker} />
        )}
        {view === "addFromCSV" && <AddFromCSV setView={setView} />}
        {view === "getCSVData" && <GetCSVData setView={setView} />}
        {view === "selfEmployees" && <SelfEmployees />}
        {view === "addSelfEmployee" && <AddSelfEmployee setView={setView} />}
        {view === "matrimonyUsers" && (
          <MatrimonyUsers onEditMatrimonyUser={handleEditMatrimonyUser} />
        )}
        {view === "addMatrimonyUser" && <AddMatrimonyUser setView={setView} />}
        {view === "editMatrimonyUser" && (
          <EditMatrimonyUser
            setView={setView}
            matrimonyUser={selectedMatrimonyUser}
          />
        )}
        {view === "blogs" && <Blogs onEditBlog={handleEditBlog} />}
        {view === "addBlogs" && <AddBlog setView={setView} />}
        {view === "editBlogs" && (
          <EditBlog setView={setView} blog={selectedBlog} />
        )}
        {view === "addAdmin" && <AddAdmin setView={setView} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
