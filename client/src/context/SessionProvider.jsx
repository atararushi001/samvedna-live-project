import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recruiterId, setRecruiterId] = useState(null);
  const [jobSeekerId, setJobSeekerId] = useState(null);
  const [selfEmployedId, setSelfEmployedId] = useState(null);

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        recruiterId,
        setRecruiterId,
        jobSeekerId,
        setJobSeekerId,
        selfEmployedId,
        setSelfEmployedId
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SessionState = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
