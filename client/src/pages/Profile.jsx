import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  return (
    <div className="container">
      <section className="profile">
        <div className="profile-image">
          <button className="btn btn-full">Send Request</button>
        </div>
        <div className="profile-details">
          <h2>First + Last Name</h2>

          <div className="cards-container">
            <div className="card">
              <FontAwesomeIcon className="icon" icon="house" />
              <p>City:</p>
              <h4>City Name</h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="person" />
              <p>Age:</p>
              <h4>Age</h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="ruler-vertical" />
              <p>Height:</p>
              <h4>Height</h4>
            </div>
            <div className="card">
              <FontAwesomeIcon className="icon" icon="briefcase" />
              <p>Occupation:</p>
              <h4>Job</h4>
            </div>
          </div>
          <div className="about-info">
            <h3>About</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              malesuada, nisl nec ultricies posuere, nunc purus fermentum mi,
              nec luctus sapien elit ut sapien. Nullam nec nunc nec nunc
              ultrices malesuada. Nulla facilisi. Nam at condimentum quam. Nulla
              facilisi. Nam at condimentum quam.
            </p>
          </div>

          <div className="contact-info">
            <h3>Contact Info</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="mobile-screen" />
                <h4>Phone: </h4>
                <p>+91 12345 67890</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="envelope" />
                <h4>Email: </h4>
                <p>something@example.com</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="location-dot" />
                <h4>Address: </h4>
                <p>Some Street, City, State, Country, Pincode.</p>
              </div>
            </ul>
          </div>

          <div className="personal-info">
            <h3>Personal Information</h3>
            <ul>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Name:</h4>
                <p>First + Last Name</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Age:</h4>
                <p>Age</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Date of Birth:</h4>
                <p>00/00/0000</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Height:</h4>
                <p>0&apos;00&rdquo;</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Weight:</h4>
                <p>00kg</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Degree:</h4>
                <p>Degree Name</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Profession:</h4>
                <p>Profession Name</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Annual Income:</h4>
                <p>₹100000 p.a</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Religion:</h4>
                <p>Religion Name</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Family Type:</h4>
                <p>Family Type</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Disability Type:</h4>
                <p>Disability</p>
              </div>
              <div className="info">
                <FontAwesomeIcon className="icon" icon="angle-right" />
                <h4>Disability Percentage:</h4>
                <p>40-50%</p>
              </div>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
