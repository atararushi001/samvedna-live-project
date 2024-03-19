import { Link } from "react-router-dom";
import Carousel from "nuka-carousel";

const CustomCarousel = () => {
  return (
    <Carousel
      autoplay={true}
      wrapAround={true}
      dragging={true}
      adaptiveHeight={true}
      withoutControls={true}
      pauseOnHover={true}
      className="custom-carousel"
    >
      <section className="register-type-container slider-1">
        <div className="register-type">
          <h1>Are you Recruiter?</h1>
          <Link to="/recruiter-register">
            <button className="btn">Recruiter Register</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="register-type">
          <h1>Are you a Job Seeker?</h1>
          <Link to="/job-seeker-register">
            <button className="btn btn-outline">Job Seeker Register</button>
          </Link>
        </div>
      </section>

      <section className="register-type-container slider-2">
        <div className="register-type">
          <h1>Are you Self-Employed?</h1>
          <Link to="/self-employment-register">
            <button className="btn">Self Employed Register</button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="register-type">
          <h1>Become a Volunteer</h1>
          <Link to="/volunteer-register">
            <button className="btn btn-outline">Apply Here</button>
          </Link>
        </div>
      </section>
    </Carousel>
  );
};

export default CustomCarousel;
