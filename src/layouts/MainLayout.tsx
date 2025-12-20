import { Outlet } from "react-router-dom";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <section className="min-h-[60vh]">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default MainLayout;
