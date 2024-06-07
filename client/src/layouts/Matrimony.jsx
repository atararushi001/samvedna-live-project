import { Outlet } from "react-router-dom";
import MatrimonyHeader from "../pages/components/headers/MatrimonyHeader";
import Footer from "../pages/components/Footer";

const Recruiter = () => {
  return (
    <main>
      <MatrimonyHeader />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Recruiter;
