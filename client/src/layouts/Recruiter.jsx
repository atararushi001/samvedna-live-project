import { Outlet } from "react-router-dom";
import RecruiterHeader from "../pages/components/headers/RecruiterHeader";
import Footer from "../pages/components/Footer";

const Recruiter = () => {
  return (
    <main>
      <RecruiterHeader />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Recruiter;
