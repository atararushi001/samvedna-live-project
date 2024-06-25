import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const JobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

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
      cell: () => (
        <div>
          <FontAwesomeIcon
            icon="pen"
            style={{
              marginRight: "1rem",
              cursor: "pointer",
              color: "green",
            }}
          />
          <FontAwesomeIcon
            icon="trash"
            style={{
              cursor: "pointer",
              color: "red",
            }}
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
      <DataTable columns={columns} data={filteredJobSeekers} pagination />
    </div>
  );
};

export default JobSeekers;
