import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page-404">
      <div className="container">
        <h2>404 - Page not Found!</h2>
        <p>
          Sorry, we couldn&apos;t find this page. But don&apos;t worry, you can
          find plenty of other things on our homepage.
        </p>
        <Link to="/" className="btn">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
