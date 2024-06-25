import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const AddBlog = ({ setView }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover: "",
    author: "",
  });

  const { userDetails } = UserStore();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.loading("Submitting Your Data, Please Wait...");

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const response = await fetch(`${API}/blogs`, {
      method: "POST",
      headers: {
        "x-auth-token": userDetails.token,
      },
      body: data,
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.dismiss();
      toast.success(responseData.message);
      setView("blogs");
    } else {
      toast.dismiss();
      toast.error(responseData.message);
    }
  };

  return (
    <div className="add-blog">
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Blog Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <div className="input-group col">
          <label htmlFor="cover">Blog Cover</label>
          <input
            type="file"
            name="cover"
            id="cover"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
        </div>
        <textarea
          name="content"
          id="content"
          placeholder="Enter Blog Content"
          value={formData.content}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="text"
          name="author"
          id="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Enter Author Name"
          required
        />
        <button type="submit" className="btn btn-full">
          Add Blog
        </button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default AddBlog;
