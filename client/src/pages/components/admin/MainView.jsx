import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const MainView = () => {
  const [usersCount, setUsersCount] = useState({});
  const [contactQueries, setContactQueries] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API}/admin/users-count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsersCount(data);
      } else {
        console.error("An error occurred while fetching users count");
      }
    };

    const fetchContactQueries = async () => {
      const response = await fetch(`${API}/admin/contact-queries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContactQueries(data);
      } else {
        console.error("An error occurred while fetching users count");
      }
    };

    fetchUsers();
    fetchContactQueries();
  }, [userDetails]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Actions",
      cell: () => (
        <FontAwesomeIcon
          icon="trash"
          style={{
            cursor: "pointer",
            color: "red",
          }}
        />
      ),
    },
  ];

  const filteredContactQueries = contactQueries.filter((contactQuery) => {
    return (
      contactQuery.name.toLowerCase().includes(search.toLowerCase()) ||
      contactQuery.email.toLowerCase().includes(search.toLowerCase()) ||
      contactQuery.contact.toLowerCase().includes(search.toLowerCase()) ||
      contactQuery.address.toLowerCase().includes(search.toLowerCase()) ||
      contactQuery.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="main-view-container">
      <h1>Users</h1>
      <div className="cards">
        <div className="card">
          <h2>Recruiters</h2>
          <p>{usersCount.recruiters}</p>
        </div>
        <div className="card">
          <h2>Job Seekers</h2>
          <p>{usersCount.jobSeekers}</p>
        </div>
        <div className="card">
          <h2>Self Employed</h2>
          <p>{usersCount.selfEmployed}</p>
        </div>
        <div className="card">
          <h2>Matrimony Users</h2>
          <p>{usersCount.matrimonyUsers}</p>
        </div>
      </div>
      <h1>Contact Queries</h1>
      <div className="queries">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Filter Table Data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataTable columns={columns} data={filteredContactQueries} pagination />
      </div>
    </div>
  );
};

export default MainView;
