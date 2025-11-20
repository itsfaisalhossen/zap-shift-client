import { Outlet } from "react-router";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default AppLayout;
