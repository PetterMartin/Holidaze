import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/nav/Navbar";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
