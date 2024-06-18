import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserStore from "../../stores/UserStore";

import MyProposalCard from "../components/MyProposalCard";

const API = import.meta.env.VITE_API_URL;

const MatrimonyDashboard = () => {
  const navigate = useNavigate();
  const { loginState, userDetails } = UserStore();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (loginState) {
      if (userDetails.type === "Matrimony") {
        navigate("/matrimony-dashboard");
      }
    } else {
      navigate("/matrimony-login");
    }

    const getAllMatches = async () => {
      const response = await fetch(`${API}/request`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setMatches(data);
    };

    getAllMatches();
  }, [navigate, loginState, userDetails]);

  return (
    <div className="container">
      <div className="matrimony-dashboard">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Dashboard
        </h1>
        <div className="matrimony-dashboard-container">
          {matches && matches.length > 0 ? (
            matches.map((match) => (
              <MyProposalCard
                key={match.id}
                user={match.receiver}
                request={match}
              />
            ))
          ) : (
            <h2>No Matches Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrimonyDashboard;
