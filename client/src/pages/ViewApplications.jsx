import Application from "./components/Application";

const ViewApplications = () => {
  return (
    <div className="container">
      <section className="view-applications">
        <h1>
          <strong className="highlight-text">View</strong> Applications
        </h1>
        <Application />
        <Application />
        <Application />
        <Application />
        <Application />
      </section>
    </div>
  );
};

export default ViewApplications;
