import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const MatrimonyUsers = ({ onEditMatrimonyUser }) => {
  const [matrimonyUsers, setMatrimonyUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { userDetails } = UserStore();

  const handleEdit = (matrimonyUser) => {
    onEditMatrimonyUser(matrimonyUser);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this User?")) {
      return;
    }

    const response = await fetch(`${API}/admin/delete-matrimony-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userDetails.token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setMatrimonyUsers(
        matrimonyUsers.filter((matrimonyUser) => matrimonyUser.id !== id)
      );
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      const response = await fetch(`${API}/admin/matrimony-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMatrimonyUsers(data);
        console.log(data);
      } else {
        console.error(data.message);
      }
    };

    fetchRecruiters();
  }, [userDetails.token]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
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
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => new Date(row.dob).toLocaleDateString("en-IN"),
      sortable: true,
    },
    {
      name: "Time of Birth",
      selector: (row) => row.timeOfBirth,
    },
    {
      name: "Place of Birth",
      selector: (row) => row.placeOfBirth,
    },
    {
      name: "Community",
      selector: (row) => row.community,
      sortable: true,
    },
    {
      name: "Religion",
      selector: (row) => row.religion,
      sortable: true,
    },
    {
      name: "Caste",
      selector: (row) => row.caste,
      sortable: true,
    },
    {
      name: "Sub Caste",
      selector: (row) => row.subCaste,
      sortable: true,
    },
    {
      name: "Mother Tongue",
      selector: (row) => row.motherTongue,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.countryName,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.stateName,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.cityName,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
    },
    {
      name: "Marital Status",
      selector: (row) => row.maritalStatus,
      sortable: true,
    },
    {
      name: "Have Children",
      selector: (row) => row.haveChildren,
    },
    {
      name: "No. of Children",
      selector: (row) => row.noOfChildren,
      sortable: true,
    },
    {
      name: "Height",
      selector: (row) => row.height,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      name: "Complexion",
      selector: (row) => row.complexion,
    },
    {
      name: "Body Type",
      selector: (row) => row.bodyType,
    },
    {
      name: "Blood Group",
      selector: (row) => row.bloodGroup,
    },
    {
      name: "Donate Blood",
      selector: (row) => row.donateBlood,
    },
    {
      name: "Qualification",
      selector: (row) => row.qualificationName,
      sortable: true,
    },
    {
      name: "Education Specialization",
      selector: (row) => row.educationSpecializationName,
      sortable: true,
    },
    {
      name: "Current Location",
      selector: (row) => row.currentLocationName,
      sortable: true,
    },
    {
      name: "Immigration Status",
      selector: (row) => row.immigrationStatus,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Designation Details",
      selector: (row) => row.designationDetails,
    },
    {
      name: "Annual Income",
      selector: (row) => row.annualIncome,
    },
    {
      name: "Father's Name",
      selector: (row) => row.fatherName,
    },
    {
      name: "Father's Occupation",
      selector: (row) => row.fatherOccupation,
    },
    {
      name: "Father's Mobile",
      selector: (row) => row.fatherMobile,
    },
    {
      name: "Mother's Name",
      selector: (row) => row.motherName,
    },
    {
      name: "Mother's Occupation",
      selector: (row) => row.motherOccupation,
    },
    {
      name: "Mother's Mobile",
      selector: (row) => row.motherMobile,
    },
    {
      name: "Grandfather's Name",
      selector: (row) => row.grandfatherName,
    },
    {
      name: "Grandmother's Name",
      selector: (row) => row.grandmotherName,
    },
    {
      name: "Nana's Name",
      selector: (row) => row.nanaName,
    },
    {
      name: "Nani's Name",
      selector: (row) => row.naniName,
    },
    {
      name: "No. of Brothers",
      selector: (row) => row.noOfBrothers,
    },
    {
      name: "No. of Sisters",
      selector: (row) => row.noOfSisters,
    },
    {
      name: "Believe in Horoscope",
      selector: (row) => row.believeInHoroscope,
    },
    {
      name: "Rashi",
      selector: (row) => row.rashi,
    },
    {
      name: "Gotra",
      selector: (row) => row.gotra,
    },
    {
      name: "Varna",
      selector: (row) => row.varna,
    },
    {
      name: "Mangal Shani",
      selector: (row) => row.mangalShani,
    },
    {
      name: "Diet",
      selector: (row) => row.diet,
    },
    {
      name: "Smoke",
      selector: (row) => row.smoke,
    },
    {
      name: "Drink",
      selector: (row) => row.drink,
    },
    {
      name: "Hobbies",
      selector: (row) => row.hobbies,
    },
    {
      name: "Age Gap",
      selector: (row) => row.ageGap,
    },
    {
      name: "Partner Religion",
      selector: (row) => row.partnerReligion,
    },
    {
      name: "Partner Caste",
      selector: (row) => row.partnerCaste,
    },
    {
      name: "Partner Sub Caste",
      selector: (row) => row.partnerSubCaste,
    },
    {
      name: "Partner Qualification",
      selector: (row) => row.partnerQualificationName,
    },
    {
      name: "Partner Occupation",
      selector: (row) => row.partnerOccupation,
    },
    {
      name: "Partner Annual Income",
      selector: (row) => row.partnerAnnualIncome,
    },
    {
      name: "Mangalik",
      selector: (row) => row.mangalik,
    },
    {
      name: "Partner Marital Status",
      selector: (row) => row.partnerMaritalStatus,
    },
    {
      name: "Go Abroad",
      selector: (row) => row.goAbroad,
    },
    {
      name: "Disability",
      selector: (row) => row.disability,
    },
    {
      name: "Disability Percentage",
      selector: (row) => row.disabilityPercentage,
    },
    {
      name: "About",
      selector: (row) => row.about,
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

  const filteredMatrimonyUsers = matrimonyUsers.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toString().includes(search) ||
      user.cityName.toLowerCase().includes(search.toLowerCase()) ||
      user.stateName.toLowerCase().includes(search.toLowerCase()) ||
      user.countryName.toLowerCase().includes(search.toLowerCase()) ||
      user.qualificationName.toLowerCase().includes(search.toLowerCase()) ||
      user.educationSpecializationName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.about.toLowerCase().includes(search.toLowerCase()) ||
      user.gender.toLowerCase().includes(search.toLowerCase()) ||
      user.dob.toString().includes(search) ||
      user.timeOfBirth.toLowerCase().includes(search.toLowerCase()) ||
      user.placeOfBirth.toLowerCase().includes(search.toLowerCase()) ||
      user.community.toLowerCase().includes(search.toLowerCase()) ||
      user.religion.toLowerCase().includes(search.toLowerCase()) ||
      user.caste.toLowerCase().includes(search.toLowerCase()) ||
      user.subCaste.toLowerCase().includes(search.toLowerCase()) ||
      user.motherTongue.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase()) ||
      user.pincode.toString().includes(search) ||
      user.maritalStatus.toLowerCase().includes(search.toLowerCase()) ||
      user.height.toString().includes(search) ||
      user.weight.toString().includes(search) ||
      user.complexion.toLowerCase().includes(search.toLowerCase()) ||
      user.bodyType.toLowerCase().includes(search.toLowerCase()) ||
      user.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
      user.donateBlood.toLowerCase().includes(search.toLowerCase()) ||
      user.designation.toLowerCase().includes(search.toLowerCase()) ||
      user.designationDetails.toLowerCase().includes(search.toLowerCase()) ||
      user.annualIncome.toLowerCase().includes(search.toLowerCase()) ||
      user.fatherName.toLowerCase().includes(search.toLowerCase()) ||
      user.fatherOccupation.toLowerCase().includes(search.toLowerCase()) ||
      user.fatherMobile.toString().includes(search) ||
      user.motherName.toLowerCase().includes(search.toLowerCase()) ||
      user.motherOccupation.toLowerCase().includes(search.toLowerCase()) ||
      user.motherMobile.toString().includes(search) ||
      user.grandfatherName.toLowerCase().includes(search.toLowerCase()) ||
      user.grandmotherName.toLowerCase().includes(search.toLowerCase()) ||
      user.nanaName.toLowerCase().includes(search.toLowerCase()) ||
      user.naniName.toLowerCase().includes(search.toLowerCase()) ||
      user.noOfBrothers.toString().includes(search) ||
      user.noOfSisters.toString().includes(search) ||
      user.believeInHoroscope.toLowerCase().includes(search.toLowerCase()) ||
      user.rashi.toLowerCase().includes(search.toLowerCase()) ||
      user.gotra.toLowerCase().includes(search.toLowerCase()) ||
      user.varna.toLowerCase().includes(search.toLowerCase()) ||
      user.mangalShani.toLowerCase().includes(search.toLowerCase()) ||
      user.diet.toLowerCase().includes(search.toLowerCase()) ||
      user.smoke.toLowerCase().includes(search.toLowerCase()) ||
      user.drink.toLowerCase().includes(search.toLowerCase()) ||
      user.hobbies.toLowerCase().includes(search.toLowerCase()) ||
      user.ageGap.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerReligion.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerCaste.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerSubCaste.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerQualificationName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.partnerOccupation.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerAnnualIncome.toLowerCase().includes(search.toLowerCase()) ||
      user.mangalik.toLowerCase().includes(search.toLowerCase()) ||
      user.partnerMaritalStatus.toLowerCase().includes(search.toLowerCase()) ||
      user.goAbroad.toLowerCase().includes(search.toLowerCase()) ||
      user.disability.toLowerCase().includes(search.toLowerCase()) ||
      user.disabilityPercentage.toString().includes(search)
    );
  });

  return (
    <div className="view-matrimony-users">
      <h1>Matrimony Users</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Filter Table Data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable columns={columns} data={filteredMatrimonyUsers} pagination />
    </div>
  );
};

MatrimonyUsers.propTypes = {
  onEditMatrimonyUser: PropTypes.func.isRequired,
};

export default MatrimonyUsers;
