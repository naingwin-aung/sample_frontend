import { Link, useNavigate } from "react-router-dom";
import Image from "../global/Image";
import Container from "../global/Container";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import { logout } from "../../api/auth";
import AuthenticationModal from "./Auth/AuthenticationModal";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Disable background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  const singOut = async () => {
    await logout();
    navigate("/");
  }

  return (
    <>
      {isModalOpen && (
        <AuthenticationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <header className="glass sticky top-0 z-10 rounded-none">
        <nav id="nav-bar-id" className="w-full h-14 md:h-18">
          <Container className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="">
              <Image
                src="https://i.pinimg.com/1200x/39/86/91/398691f123726a5763e9c47980964fff.jpg"
                alt="logo"
                className="w-11 h-11 rounded-full"
              />
            </Link>

            {/* Mobile menu */}
            <div className="md:hidden z-50">
              <div
                className={`cursor-pointer transition duration-300 ease-in-out ${
                  open ? "rotate-90" : "rotate-0"
                }`}
                onClick={() => setOpen((prev) => !prev)}
              >
                {open ? <X /> : <Menu />}
              </div>

              {/* Mobile link list */}
              <div
                className={`w-full h-screen flex flex-col gap-10 items-center pt-25 fixed top-14 right-0 bg-white/90 backdrop-filter backdrop-blur-3xl transition-all ease-in-out duration-200 select-none font-medium
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
              >
                <Link to="/" className="text-gray-600">
                  Help
                </Link>
                <Link to="/" className="text-gray-600">
                  Recently Viewed
                </Link>

                {isAuthenticated ? (
                  <button
                    onClick={() => singOut()}
                    className="px-4 py-2 rounded-4xl bg-linear-to-r from-red-400 to-red-600 text-white cursor-pointer text-sm hover:from-red-500 hover:to-red-700 transition"
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-4xl bg-linear-to-r from-orange-400 to-orange-600 text-white cursor-pointer text-sm hover:from-orange-500 hover:to-orange-700 transition"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 font-medium text-xs">
              <Link to="/" className="text-gray-600">
                Help
              </Link>
              <Link to="/" className="text-gray-600">
                Recently Viewed
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => singOut()}
                  className="px-4 py-2 rounded-4xl bg-linear-to-r from-red-400 to-red-600 text-white cursor-pointer text-sm hover:from-red-500 hover:to-red-700 transition"
                >
                  Log out
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-4xl bg-linear-to-r from-orange-400 to-orange-600 text-white cursor-pointer text-sm hover:from-orange-500 hover:to-orange-700 transition"
                >
                  Log in
                </button>
              )}
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
