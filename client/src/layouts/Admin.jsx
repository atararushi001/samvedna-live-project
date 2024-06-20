import { Outlet } from "react-router-dom";

// import UserStore from "../stores/UserStore";

// import AdminHeader from "../pages/components/headers/AdminHeader";

const Admin = () => {
  //   const { loginState, userDetails } = UserStore();
  return (
    <div>
      {/* {loginState && userDetails.type === "Admin" ? <AdminHeader /> : ""} */}
      <Outlet />
    </div>
  );
};

export default Admin;
