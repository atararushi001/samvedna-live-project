import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({
    latest: true,
    popular: false,
    search: false,
  });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFilterChange = (e) => {
    setFilters({
      latest: false,
      popular: false,
      search: false,
      [e.target.name]: true,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({
      latest: false,
      popular: false,
      search: true,
    });

    fetch(`${API}/controllers/searchBlogs.php?search=${search}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSearchResults(data.blogs);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (filters.latest) {
      fetch(`${API}/controllers/getBlogs.php?latest=true`, {
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
    } else if (filters.popular) {
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
    }
  }, [filters.latest, filters.popular]);

  return (
    <div className="container">
      <div className="blogs">
        <h1>Blogs</h1>
        <div className="filters">
          <select name="filters" id="filters" className="filter-dropdown">
            <option value="latest" onClick={handleFilterChange}>
              Latest
            </option>
            <option value="popular" onClick={handleFilterChange}>
              Popular
            </option>
          </select>
          <form onSubmit={handleSearch}>
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
        </div>

        <div className="blog-list">
          {filters.search
            ? searchResults.map((blog) => (
                <div className="blog" key={blog.blogId}>
                  <img
                    src={`${API}/uploads/blogImages/${blog.blogImage}`}
                    alt={blog.blogImage}
                  />
                  <h2>{blog.blogTitle}</h2>
                  <p>{blog.blogContent}</p>
                </div>
              ))
            : blogs.map((blog) => (
                <div className="blog" key={blog.blogId}>
                  <img
                    src={`${API}/uploads/blogImages/${blog.blogImage}`}
                    alt={blog.blogImage}
                  />
                  <h2>{blog.blogTitle}</h2>
                  <p>{blog.blogContent}</p>
                </div>
              ))}

          <div className="blog">
            <img src="https://via.placeholder.com/150" alt="Blog" />
            <h2>Blog Title</h2>
            <p>Blog Content</p>

            <div className="blog-footer">
              <p>Author: Author Name</p>
              <p>Published On: Date</p>
            </div>
          </div>
          <div className="blog">
            <img src="https://via.placeholder.com/150" alt="Blog" />
            <h2>Blog Title</h2>
            <p>Blog Content</p>

            <div className="blog-footer">
              <p>Author: Author Name</p>
              <p>Published On: Date</p>
            </div>
          </div>
          <div className="blog">
            <img src="https://via.placeholder.com/150" alt="Blog" />
            <h2>Blog Title</h2>
            <p>Blog Content</p>

            <div className="blog-footer">
              <p>Author: Author Name</p>
              <p>Published On: Date</p>
            </div>
          </div>
          <div className="blog">
            <img src="https://via.placeholder.com/150" alt="Blog" />
            <h2>Blog Title</h2>
            <p>Blog Content</p>

            <div className="blog-footer">
              <p>Author: Author Name</p>
              <p>Published On: Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
