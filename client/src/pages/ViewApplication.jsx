import { useState } from "react";

const ViewApplication = () => {
  const [formData, setFormData] = useState({
    email: "John@doe.com",
    username: "JohnDoe",
    password: "12345678",
    confirm_password: "12345678",
    name: "John",
    lastName: "Doe",
    dob: "11/11/1111",
    gender: "Male",
    permanentAddress: "Rajkot",
    currentAddress: "Rajkot",
    city: "Rajkot",
    state: "Gujarat",
    postalCode: "360005",
    country: "India",
    contactNumber: "1234567890",
    whatsappNumber: "1234567890",
    jobAlerts: false,
    homePhone: "1234567890",
    addHomePhone: "132456789.",
    qualification: "Below SSC",
    educationSpecialization: "Degree",
    experienceAndAppliance: "10",
    yesNoQuestion: "yes",
    twoWheeler: false,
    threeWheeler: false,
    car: false,
    specializationInDisability: "Deafness",
  });

  return (
    <div className="container">
      <div className="view-application">
        <h1>Application</h1>
        <div className="application-container">
          <h2>
            {formData.name} {formData.lastName}
          </h2>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Username:</strong> {formData.username}
          </p>
          <p>
            <strong>Date of Birth:</strong> {formData.dob}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender}
          </p>
          <p>
            <strong>Permanent Address:</strong> {formData.permanentAddress}
          </p>
          <p>
            <strong>Current Address:</strong> {formData.currentAddress}
          </p>
          <p>
            <strong>City:</strong> {formData.city}
          </p>
          <p>
            <strong>State:</strong> {formData.state}
          </p>
          <p>
            <strong>Postal Code:</strong> {formData.postalCode}
          </p>
          <p>
            <strong>Country:</strong> {formData.country}
          </p>
          <p>
            <strong>Contact Number:</strong> {formData.contactNumber}
          </p>
          <p>
            <strong>WhatsApp Number:</strong> {formData.whatsappNumber}
          </p>
          <p>
            <strong>Job Alerts:</strong> {formData.jobAlerts ? "Yes" : "No"}
          </p>
          <p>
            <strong>Home Phone:</strong> {formData.homePhone}
          </p>
          <p>
            <strong>Additional Home Phone:</strong> {formData.addHomePhone}
          </p>
          <p>
            <strong>Qualification:</strong> {formData.qualification}
          </p>
          <p>
            <strong>Education Specialization:</strong>{" "}
            {formData.educationSpecialization}
          </p>
          <p>
            <strong>Experience and Appliance:</strong>{" "}
            {formData.experienceAndAppliance}
          </p>
          <p>
            <strong>Yes/No Question:</strong> {formData.yesNoQuestion}
          </p>
          <p>
            <strong>Two Wheeler:</strong> {formData.twoWheeler ? "Yes" : "No"}
          </p>
          <p>
            <strong>Three Wheeler:</strong>{" "}
            {formData.threeWheeler ? "Yes" : "No"}
          </p>
          <p>
            <strong>Car:</strong> {formData.car ? "Yes" : "No"}
          </p>
          <p>
            <strong>Specialization in Disability:</strong>{" "}
            {formData.specializationInDisability}
          </p>

          <div className="controls">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-delete">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;
