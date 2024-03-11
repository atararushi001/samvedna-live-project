import { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API = import.meta.env.VITE_API_URL;

const JobCarousel = ({ jobData }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Carousel
      slidesToShow={slidesToShow}
      withoutControls={true}
      slidesToScroll={1}
      autoplay={true}
      wrapAround={true}
      autoplayInterval={2000}
      renderArrows={false}
      className="job-slider"
    >
      {jobData &&
        jobData.map((job) => (
          <div className="jobs-container" key={job.job_id}>
            <Link to="/view-job" state={{ jobId: job.job_id }}>
              <div className="job">
                <img
                  src={`${API}/uploads/profilePictures/${job.profilePicture}`}
                  alt={job.profilePicture}
                />
                <div className="job-header">
                  <h2>{job.jobDesignation}</h2>
                  <h3>{job.jobType}</h3>
                  <h3><FontAwesomeIcon className="icon" icon='location-dot' />&nbsp;{job.placeOfWork}</h3>
                </div>
                <div className="job-body">
                  <p className="job-description">
                    {
                      job.dutyDescription
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")
                        .concat("...")
                    }
                  </p>
                  <div className="job-details">
                    <p><FontAwesomeIcon className="icon" icon="wheelchair"/>&nbsp;{job.disabilityInfoType}</p>
                    <p>{job.disabilityInfoPercentage}&nbsp;<FontAwesomeIcon className="icon" icon="percent"/></p>
                  </div>
                </div>
                <div className="job-footer">
                  <p><strong>Job Posted By:</strong></p>
                  <p>{job.companyName}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </Carousel>
  );
};

JobCarousel.propTypes = {
  jobData: PropTypes.arrayOf(
    PropTypes.shape({
      job_id: PropTypes.number.isRequired,
      jobDesignation: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
      placeOfWork: PropTypes.string.isRequired,
      disabilityInfoPercentage: PropTypes.string.isRequired,
      dutyDescription: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobCarousel;
