import { Outlet } from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <section className="min-h-[60vh] mb-12">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default MainLayout;
