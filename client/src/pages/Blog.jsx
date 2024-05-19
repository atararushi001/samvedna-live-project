import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;
const STATIC_URL = import.meta.env.VITE_STATIC_FILES_URL;

const Blog = () => {
  const [blog, setBlog] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/");
  }

  const id = location.state.id;

  useEffect(() => {
    const getBlog = async () => {
      const response = await fetch(`${API}/blogs/${id}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setBlog(data);
      } else {
        toast.error(data.message);
      }
    };

    getBlog();
  }, [id]);

  return (
    <div className="container">
      <section className="blog-section">
        <h1>{blog.title}</h1>
        <div className="blog-content">
          <div className="blog-details">
            <p>Author: {blog.author}</p>
            <p>Published: {new Date(blog.published).toLocaleDateString()}</p>
          </div>
          <img
            src={`${STATIC_URL}/uploads/covers/${blog.cover}`}
            alt={blog.cover}
          />
          <p>{blog.content}</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
