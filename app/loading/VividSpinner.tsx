export function VividSpinner() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#313134",
      }}
    >
      <section
        style={{
          margin: "auto",
        }}
        className="wrapper"
      >
        <div className="spinner">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </section>
    </div>
  );
}
