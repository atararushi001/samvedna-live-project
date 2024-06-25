import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const SelfEmployees = ({ setView }) => {
  const [selfEmployees, setSelfEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  useEffect(() => {
    const fetchSelfEmployees = async () => {
      const response = await fetch(`${API}/admin/self-employees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSelfEmployees(data);
        console.log(data);
      } else {
        console.error(data.message);
      }
    };

    fetchSelfEmployees();
  }, [userDetails.token]);

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this Self Employee?")
    ) {
      return;
    }

    const response = await fetch(`${API}/admin/delete-self-employee/${id}`, {
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
      setSelfEmployees(
        selfEmployees.filter(
          (selfEmployee) => selfEmployee.self_employement_id !== id
        )
      );
    } else {
      toast.error(data.message);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.self_employement_id,
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
      name: "Contact",
      selector: (row) => row.contactNumber,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Company Type",
      selector: (row) => row.companyType,
      sortable: true,
    },
    {
      name: "Office Address",
      selector: (row) => row.officeAddress,
    },
    {
      name: "Profession Type",
      selector: (row) => row.professionTypeName,
      sortable: true,
    },
    {
      name: "Products",
      selector: (row) => row.products,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
      sortable: true,
    },
    {
      name: "Education",
      selector: (row) => row.education,
    },
    {
      name: "Disability",
      selector: (row) => row.disabilityType,
      sortable: true,
    },
    {
      name: "Disability Percentage",
      selector: (row) => row.percentage + " %",
      sortable: true,
    },
    {
      name: "Assistance Needed",
      selector: (row) => row.assistanceNedeed,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <FontAwesomeIcon
            icon="trash"
            style={{
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => handleDelete(row.self_employement_id)}
          />
        </div>
      ),
    },
  ];

  const filteredSelfEmployees = selfEmployees.filter((selfEmployee) => {
    return (
      selfEmployee.name.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.email.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.contactNumber.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.companyName.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.companyType.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.officeAddress.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.professionTypeName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      selfEmployee.description.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.experience.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.education.toLowerCase().includes(search.toLowerCase()) ||
      selfEmployee.disabilityType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      selfEmployee.percentage.toString().includes(search) ||
      selfEmployee.assistanceNedeed.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="view-self-employees">
      <h1>Self Employees</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Filter Table Data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable columns={columns} data={filteredSelfEmployees} pagination />
    </div>
  );
};

SelfEmployees.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default SelfEmployees;
