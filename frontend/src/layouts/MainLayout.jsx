import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0b1020",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          minHeight: "100vh",
          padding: "30px",
          background: "#0b1020",
          color: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;