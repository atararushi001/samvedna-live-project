import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const JobSeekers = ({ onEditJobSeeker }) => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  const handleEdit = (jobSeeker) => {
    onEditJobSeeker(jobSeeker);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Job Seeker?")) {
      return;
    }

    const response = await fetch(`${API}/admin/delete-job-seeker/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setJobSeekers(
        jobSeekers.filter((jobSeeker) => jobSeeker.job_seeker_id !== id)
      );
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      const response = await fetch(`${API}/admin/job-seekers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched Data:", data); // Log fetched data
        setJobSeekers(data);
      } else {
        console.error(data.message);
      }
    };

    fetchRecruiters();
  }, [userDetails.token]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.job_seeker_id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
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
      name: "Home Contact",
      selector: (row) => row.addHomePhone,
    },
    {
      name: "WhatsApp",
      selector: (row) => row.whatsappNumber,
    },
    {
      name: "Permenant Address",
      selector: (row) => row.permanentAddress,
      sortable: true,
    },
    {
      name: "Current Address",
      selector: (row) => row.currentAddress,
      sortable: true,
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
      name: "Qualification",
      selector: (row) => row.qualificationName.split("-")[0],
      sortable: true,
    },
    {
      name: "Specialization",
      selector: (row) => row.educationName.split("-")[1],
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => new Date(row.dob).toLocaleDateString("en-IN"),
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.experienceAndAppliance,
      sortable: true,
    },
    {
      name: "Disability",
      selector: (row) => row.disabilityPercentage + " %",
      sortable: true,
    },
    {
      name: "Disability Specific",
      selector: (row) => row.specializationInDisability,
      sortable: true,
    },
    {
      name: "Driving License",
      selector: (row) => row.yesNoQuestion,
      sortable: true,
    },
    {
      name: "Two Wheeler",
      selector: (row) => (row.twoWheeler === 1 ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Three Wheeler",
      selector: (row) => (row.threeWheeler === 1 ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Four Wheeler",
      selector: (row) => (row.car === 1 ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Job Alerts",
      selector: (row) => (row.jobAlerts === 1 ? "Yes" : "No"),
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
            onClick={() => handleDelete(row.job_seeker_id)}
          />
        </div>
      ),
    },
  ];

  const filteredJobSeekers = jobSeekers.filter((jobSeeker) => {
    return (
      jobSeeker.name.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.email.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.cityName.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.stateName.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.countryName.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.qualificationName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      jobSeeker.educationName.toLowerCase().includes(search.toLowerCase()) ||
      jobSeeker.experienceAndAppliance
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      jobSeeker.disabilityPercentage.toString().includes(search) ||
      jobSeeker.specializationInDisability
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  console.log("Filtered Job Seekers:", filteredJobSeekers); // Log filtered job seekers

  const convertArrayOfObjectsToCSV = (array) => {
    if (array.length === 0) {
      return null;
    }

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    let result = keys.join(columnDelimiter) + lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        let value = item[key] ? item[key].toString().replace(/"/g, '""') : "";
        result += `"${value}"`;

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const downloadCSV = (array) => {
    const csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "job_seekers_export.csv";
    const link = document.createElement("a");

    link.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    link.setAttribute("download", filename);
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Export = ({ onExport }) => (
    <button onClick={(e) => onExport(e.target.value)}>Export</button>
  );
  Export.propTypes = {
    onExport: PropTypes.func.isRequired,
  };
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(filteredJobSeekers)} />,
    [filteredJobSeekers]
  );

  if (!jobSeekers) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="view-job-seekers">
      <h1>Job Seekers</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Filter Table Data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredJobSeekers}
        pagination
        actions={actionsMemo}
      />
    </div>
  );
};

JobSeekers.propTypes = {
  onEditJobSeeker: PropTypes.func.isRequired,
};

export default JobSeekers;