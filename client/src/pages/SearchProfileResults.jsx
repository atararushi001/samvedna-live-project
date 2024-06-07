import ProfileCard from "./components/ProfileCard";

const SearchProfileResults = () => {
  return (
    <div className="container">
      <section className="proposals-section">
        <h1>Search Results</h1>
        <div className="proposals">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </section>
    </div>
  );
};

export default SearchProfileResults;
