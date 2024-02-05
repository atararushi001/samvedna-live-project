const importAll = (importMeta) => Object.values(importMeta);
const bandhanImages = importAll(
  import.meta.glob("../assets/images/Bandhan/*.{jpg,jpeg,png,svg}")
);

const jobFairImages = importAll(
  import.meta.glob("../assets/images/JobFair/*.{jpg,jpeg,png,svg}")
);

const otherImages = importAll(
  import.meta.glob("../assets/images/OtherEvents/*.{jpg,jpeg,png,svg}")
);

import { useState, useEffect, useRef } from "react";

const Gallery = () => {
  const [bandhan, setBandhan] = useState([]);
  const [jobfair, setJobFair] = useState([]);
  const [other, setOther] = useState([]);

  const bandhanRefs = useRef([]);
  const jobfairRefs = useRef([]);
  const otherRefs = useRef([]);

  useEffect(() => {
    Promise.all(bandhanImages.map((imagePromise) => imagePromise()))
      .then((images) => setBandhan(images))
      .catch((error) => console.error(error));

    Promise.all(jobFairImages.map((imagePromise) => imagePromise()))
      .then((images) => setJobFair(images))
      .catch((error) => console.error(error));

    Promise.all(otherImages.map((imagePromise) => imagePromise()))
      .then((images) => setOther(images))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    });

    const currentBandhanRefs = bandhanRefs.current;
    const currentJobfairRefs = jobfairRefs.current;
    const currentOtherRefs = otherRefs.current;

    currentBandhanRefs.forEach((ref) => observer.observe(ref));
    currentJobfairRefs.forEach((ref) => observer.observe(ref));
    currentOtherRefs.forEach((ref) => observer.observe(ref));

    return () => {
      currentBandhanRefs.forEach((ref) => {
        if (ref instanceof Element) {
          observer.unobserve(ref);
        }
      });
      currentJobfairRefs.forEach((ref) => {
        if (ref instanceof Element) {
          observer.unobserve(ref);
        }
      });
      currentOtherRefs.forEach((ref) => {
        if (ref instanceof Element) {
          observer.unobserve(ref);
        }
      });
    };
  }, [bandhan, jobfair, other]);

  return (
    <div className="container">
      <section className="events bandhan">
        <h1>
          <span className="highlight-text">BANDHAN</span> - PARICHAY MELA
        </h1>
        <ul>
          {bandhan.map((image, index) => (
            <li key={index} ref={(el) => (bandhanRefs.current[index] = el)}>
              <a href="">
                <figure>
                  <img src={image.default} alt={`Bandhan - ${index + 1}`} />
                  <figcaption>Bandhan</figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="events jobfair">
        <h1>JOB FAIR</h1>
        <ul>
          {jobfair.map((image, index) => (
            <li key={index} ref={(el) => (jobfairRefs.current[index] = el)}>
              <a href="">
                <figure>
                  <img src={image.default} alt={`Jobfair - ${index + 1}`} />
                  <figcaption>JobFair</figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="events other-events">
        <h1>OTHER EVENTS</h1>
        <ul>
          {other.map((image, index) => (
            <li key={index} ref={(el) => (otherRefs.current[index] = el)}>
              <a href="">
                <figure>
                  <img
                    src={image.default}
                    alt={`Other Events - ${index + 1}`}
                  />
                  <figcaption>Other</figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Gallery;
