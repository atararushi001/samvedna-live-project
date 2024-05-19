import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;
const STATIC_URL = import.meta.env.VITE_STATIC_FILES_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value.trim() === "") {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(results);
  };

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(`${API}/blogs`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setBlogs(data);
      } else {
        toast.error(data.message);
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="container">
      <div className="blogs">
        <h1>Blogs</h1>
        <form className="filters" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        <div className="blog-list">
          {searchResults.length > 0
            ? searchResults.map((blog) => (
                <Link key={blog.id} to="/blog" state={{ id: blog.id }}>
                  <div className="blog">
                    <img
                      src={`${STATIC_URL}/uploads/covers/${blog.cover}`}
                      alt={blog.cover}
                    />
                    <h2>{blog.title}</h2>
                    <p>
                      {blog.content.length > 100
                        ? blog.content.substring(0, 100) + "..."
                        : blog.content}
                    </p>

                    <div className="blog-footer">
                      <p>Author: {blog.author}</p>
                      <p>
                        Published On:{" "}
                        {new Date(blog.published).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : blogs.map((blog) => (
                <Link key={blog.id} to="/blog" state={{ id: blog.id }}>
                  <div className="blog">
                    <img
                      src={`${STATIC_URL}/uploads/covers/${blog.cover}`}
                      alt={blog.cover}
                    />
                    <h2>{blog.title}</h2>
                    <p>
                      {blog.content.length > 100
                        ? blog.content.substring(0, 100) + "..."
                        : blog.content}
                    </p>

                    <div className="blog-footer">
                      <p>
                        <strong>Author:</strong> {blog.author}
                      </p>
                      <p>
                        <strong>Published On: </strong>
                        {new Date(blog.published).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
