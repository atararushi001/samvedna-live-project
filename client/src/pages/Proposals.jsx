import ProposalCard from "./components/ProposalCard";

const Proposals = () => {
  return (
    <div className="container">
      <section className="proposals-section">
        <h1>Proposals</h1>
        <div className="proposals">
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
        </div>
      </section>
    </div>
  );
};

export default Proposals;
