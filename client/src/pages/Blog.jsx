import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Blog = () => {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();

  useEffect(() => {
    fetch(`${API}/controllers/getBlog.php?blog_id=${blogId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlog(data.blog[0]);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [blogId]);

  return (
    <div className="container">
      <section className="blog-section">
        <h1>Blog Title</h1>
        <div className="blog-content">
          <div className="blog-details">
            <p>Author: </p>
            <p>Published: </p>
          </div>
          <img src="https://via.placeholder.com/150" alt="" />
          <p>Blog Content</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
