import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserStore from "../../stores/UserStore";

import MyProposalCard from "../components/MyProposalCard";

const MatrimonyDashboard = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Matrimony") {
        navigate("/matrimony-dashboard");
      }
    } else {
      navigate("/matrimony-login");
    }
  }, [navigate, loginState, userDetails]);

  return (
    <div className="container">
      <div className="matrimony-dashboard">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Dashboard
        </h1>
        <div className="matrimony-dashboard-container">
          <MyProposalCard />
          <MyProposalCard />
          <MyProposalCard />
          <MyProposalCard />
          <MyProposalCard />
          <MyProposalCard />
          <MyProposalCard />
        </div>
      </div>
    </div>
  );
};

export default MatrimonyDashboard;
