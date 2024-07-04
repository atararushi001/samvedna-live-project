import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const EditBlog = ({ blog, setView }) => {
  const [formData, setFormData] = useState({
    title: blog.title,
    content: blog.content,
    cover: "",
    author: blog.author,
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

    const response = await fetch(`${API}/blogs/${blog.id}`, {
      method: "PUT",
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
    <div className="edit-blog">
      <h1>Edit Blog</h1>
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
          <label htmlFor="cover">
            Blog Cover (Only Upload if You Want to Update it)
          </label>
          <input
            type="file"
            name="cover"
            id="cover"
            accept="image/*"
            onChange={handleInputChange}
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
          Edit Blog
        </button>
      </form>
    </div>
  );
};

EditBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
};

export default EditBlog;
