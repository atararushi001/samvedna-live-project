import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

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
    fetch(`${API}/controllers/getBlogs.php?popular=true`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
                      src={`${API}/uploads/covers/${blog.cover}`}
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
                      src={`${API}/uploads/covers/${blog.cover}`}
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
