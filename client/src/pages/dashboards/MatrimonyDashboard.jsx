import { Link } from "react-router-dom";

const MatrimonyDashboard = () => {
  return (
    <div className="container">
      <div className="matrimony-dashboard">
        <h1>
          <strong className="highlight-text">Matrimony</strong> Dashboard
        </h1>
        <div className="matrimony-dashboard-container">
          <div className="matrimony-dashboard-card">
            <h2>View Proposals</h2>
            <p>
              View all the proposals you have received from other users. Accept
              or reject proposals based on your preferences. Start finding your
              life partner today.
            </p>
            <Link
              to="/matrimony-dashboard/proposals"
              className="btn btn-primary"
            >
              View Proposals
            </Link>
          </div>

          <div className="matrimony-dashboard-card">
            <h2>Search Profiles</h2>
            <p>
              Search for profiles of other users based on your preferences. Find
              your life partner by searching for profiles that match your
              preferences.
            </p>
            <Link
              to="/matrimony-dashboard/search-profiles"
              className="btn btn-primary"
            >
              Search Profiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyDashboard;
