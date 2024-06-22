import { useState } from "react";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const AddFromCSV = () => {
  const [formData, setFormData] = useState({
    csv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
  };

  return (
    <div className="add-from-csv">
      <h1>Add Using CSV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="csv"
          id="csv"
          accept=".csv"
          value={formData.csv}
          onChange={handleInputChange}
          required
        />
        <button className="btn btn-full" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFromCSV;
