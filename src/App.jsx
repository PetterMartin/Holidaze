import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/nav/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
