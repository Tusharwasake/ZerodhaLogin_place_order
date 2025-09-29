import Header from "./layout/Header";

function ErrorComponent({ error, onRetry, activeSection, onNavigation }) {
  return (
    <div>
      <Header activeSection={activeSection} onNavigation={onNavigation} />
      <div>
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    </div>
  );
}

export default ErrorComponent;
