import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Blog = () => {
  const [blog, setBlog] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    navigate("/");
  }

  const id = location.state.id;

  useEffect(() => {
    fetch(`${API}/controllers/getBlog.php?id=${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlog(data.blog);
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again later.");
        console.error(error);
      });
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
          <img src={`${API}/uploads/covers/${blog.cover}`} alt={blog.cover} />
          <p>{blog.content}</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
