import Tarulata from "../assets/images/Team/Core/Tarulata Patel.jpg";
import Mayank from "../assets/images/Team/Core/Mayank Patel.jpg";
import Racess from "../assets/images/Team/Core/Racess Shastri.jpg";
import Kalpana from "../assets/images/Team/Core/Kalpana Patel.jpg";

const About = () => {
  return (
    <div className="container">
      <section className="about core-team">
        <h1>Core Team</h1>
        <div className="persons">
          <div className="person">
            <img src={Tarulata} alt="Tarulata Patel" />
            <h3>
              SMT. TARULATTA PATEL
              <span className="person-title">
                (Founder | Trustee | President)
              </span>
            </h3>
          </div>
          <div className="person">
            <img src={Mayank} alt="Mayank Patel" />
            <h3>
              Mr. MAYANK PATEL
              <span className="person-title">(Trustee & Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Racess} alt="Sagar Patel" />
            <h3>
              Mr. Racess Sashtri
              <span className="person-title">(Trustee & Jt. Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Kalpana} alt="Kalpana Patel" />
            <h3>
              Mrs. Kalpana Patel
              <span className="person-title">(Trustee & Treasure)</span>
            </h3>
          </div>
        </div>
      </section>

      <section className="about management-team">
        <h1>Management Team</h1>
        <div className="persons">
          <div className="person">
            <img src={Tarulata} alt="Tarulata Patel" />
            <h3>
              SMT. TARULATTA PATEL
              <span className="person-title">
                (Founder | Trustee | President)
              </span>
            </h3>
          </div>
          <div className="person">
            <img src={Mayank} alt="Mayank Patel" />
            <h3>
              Mr. MAYANK PATEL
              <span className="person-title">(Trustee & Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Racess} alt="Sagar Patel" />
            <h3>
              Mr. Racess Sashtri
              <span className="person-title">(Trustee & Jt. Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Kalpana} alt="Kalpana Patel" />
            <h3>
              Mrs. Kalpana Patel
              <span className="person-title">(Trustee & Treasure)</span>
            </h3>
          </div>
        </div>
      </section>

      <section className="about volunteers">
        <h1>Volunteers</h1>
        <div className="persons">
          <div className="person">
            <img src={Tarulata} alt="Tarulata Patel" />
            <h3>
              SMT. TARULATTA PATEL
              <span className="person-title">
                (Founder | Trustee | President)
              </span>
            </h3>
          </div>
          <div className="person">
            <img src={Mayank} alt="Mayank Patel" />
            <h3>
              Mr. MAYANK PATEL
              <span className="person-title">(Trustee & Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Racess} alt="Sagar Patel" />
            <h3>
              Mr. Racess Sashtri
              <span className="person-title">(Trustee & Jt. Secretary)</span>
            </h3>
          </div>
          <div className="person">
            <img src={Kalpana} alt="Kalpana Patel" />
            <h3>
              Mrs. Kalpana Patel
              <span className="person-title">(Trustee & Treasure)</span>
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
