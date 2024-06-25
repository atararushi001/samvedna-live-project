import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const Recruiters = ({ onEditRecruiter, setView }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  const handleEdit = (recruiter) => {
    onEditRecruiter(recruiter);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recruiter?")) {
      return;
    }

    const response = await fetch(`${API}/admin/delete-recruiter/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setView("dashboard");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      const response = await fetch(`${API}/admin/recruiters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setRecruiters(data);
      } else {
        console.error(data.message);
      }
    };

    fetchRecruiters();
  }, [userDetails.token]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.recruiters_id,
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
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.contact,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "City",
      selector: (row) => row.cityName,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.stateName,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.countryName,
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
            onClick={() => handleDelete(row.recruiters_id)}
          />
        </div>
      ),
    },
  ];

  const filteredRecruiters = recruiters.filter((recruiter) => {
    return (
      recruiter.name.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.email.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.designation.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.cityName.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.stateName.toLowerCase().includes(search.toLowerCase()) ||
      recruiter.countryName.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (!recruiters) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="view-recruiters">
      <h1>Recruiters</h1>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Filter Table Data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable columns={columns} data={filteredRecruiters} pagination />
    </div>
  );
};

Recruiters.propTypes = {
  onEditRecruiter: PropTypes.func,
  setView: PropTypes.func,
};

export default Recruiters;
