import { Outlet } from "react-router-dom";
import JobSeekerHeader from "../pages/components/headers/JobSeekerHeader";
import Footer from "../pages/components/Footer";

const Recruiter = () => {
  return (
    <main>
      <JobSeekerHeader />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Recruiter;
