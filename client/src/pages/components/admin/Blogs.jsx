import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const Blogs = ({ onEditBlog }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  const handleEdit = (blog) => {
    onEditBlog(blog);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Blog?")) {
      return;
    }

    const response = await fetch(`${API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${API}/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBlogs(data);
      } else {
        console.error(data.message);
      }
    };

    fetchBlogs();
  }, [userDetails.token]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <FontAwesomeIcon
            icon="pen"
            style={{
              marginRight: "1rem",
              cursor: "pointer",
              color: "green",
            }}
            onClick={() => handleEdit(row)}
          />
          <FontAwesomeIcon
            icon="trash"
            style={{
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="view-blogs">
      <h1>Blogs</h1>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Filter Table Data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable columns={columns} data={filteredBlogs} pagination />
    </div>
  );
};

Blogs.propTypes = {
  onEditBlog: PropTypes.func.isRequired,
};

export default Blogs;
