import { useState } from "react";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    availability: "",
    interests: "",
    experience: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <section className="volunteer">
        <h1>
          <span className="highlight-text">Become a Hero:</span> Volunteer for a
          Cause That Matters!
        </h1>
        <p>
          Join us in making a difference in the lives of Persons with
          Disabilities (PWDs) by becoming a volunteer at Samvedna Trust. As a
          volunteer, you&apos;ll have the opportunity to contribute your time,
          skills, and passion to support our various programs and initiatives
          aimed at empowering the disabled community. Whether you&apos;re
          interested in event coordination, advocacy, community outreach, or
          administrative tasks, there&apos;s a place for you in our team.
        </p>
      </section>
      <section className="why-volunteer">
        <h1>Why Volunteer with us?</h1>
        <ol>
          <li className="donate-now-list-item">
            <span>
              <strong>Make an Impact:</strong> Your efforts will directly
              contribute to improving the lives of PWDs and promoting
              inclusivity.
            </span>
          </li>
          <li className="donate-now-list-item">
            <span>
              <strong>Gain Experience:</strong> Develop new skills, expand your
              network, and gain valuable experience in the social sector.
            </span>
          </li>
          <li className="donate-now-list-item">
            <span>
              <strong>Join a Community:</strong> Become part of a supportive and
              dedicated community of volunteers who share your passion for
              making a difference.
            </span>
          </li>
          <li className="donate-now-list-item">
            <span>
              <strong>Flexible Opportunities:</strong> Choose from a variety of
              volunteer roles and projects that align with your interests and
              availability.
            </span>
          </li>
        </ol>
      </section>
      <section className="volunteer-opportunities">
        <h1>
          Volunteer <span className="highlight-text">Opportunities</span>
        </h1>
        <ol>
          <li className="donate-now-list-item">Event Coordination</li>
          <li className="donate-now-list-item">Fundraising</li>
          <li className="donate-now-list-item">Community Outreach</li>
          <li className="donate-now-list-item">Administrative Support</li>
          <li className="donate-now-list-item">
            Advocacy and Awareness Campaigns
          </li>
        </ol>
      </section>
      <section className="volunteer-form">
        <h1>How to Apply?</h1>
        <p>To join us as a volunteer, please fill out the form below</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Enter Your Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter Your Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="availability"
            id="availability"
            placeholder="Enter Your Availability"
            value={formData.availability}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="interests"
            id="interests"
            placeholder="Enter Your Interests"
            value={formData.interests}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="experience"
            id="experience"
            placeholder="Enter Your Experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
          <textarea
            name="reason"
            id="reason"
            placeholder="Enter Your Reason for Volunteering"
            value={formData.reason}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-full">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Volunteer;
