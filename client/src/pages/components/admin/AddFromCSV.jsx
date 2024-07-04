import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const AddFromCSV = ({ setView }) => {
  const [file, setFile] = useState(null);
  const { userDetails } = UserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const response = await fetch(`${API}/admin/add-csv`, {
        method: "POST",
        headers: {
          "x-auth-token": userDetails.token,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.status === 201) {
        if (Array.isArray(data.messages)) {
          toast.success(data.messages.join(", "));
          setFile(null);
          setView("jobSeekers");
        } else {
          toast.success(data.message);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-from-csv">
      <h1>Add Using CSV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button className="btn btn-full" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

AddFromCSV.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AddFromCSV;
