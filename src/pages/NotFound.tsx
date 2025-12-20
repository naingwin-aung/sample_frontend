import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/pages/Navbar";

// error page
const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(() => {
    const saved = sessionStorage.getItem("errorPageCountdown");
    return saved ? parseInt(saved, 10) : 5;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        sessionStorage.setItem("errorPageCountdown", newValue.toString());

        if (newValue === 0) {
          sessionStorage.removeItem("errorPageCountdown");
          navigate("/");
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-xl font-medium mb-4 text-gray-600">
          Where did that page go?
        </h1>
        <div className="text-gray-500 text-sm">
          Sorry! Looks like this page has gotten lost.
        </div>
        <Link
          to="/"
          className="mt-4 px-4 py-1.5 border border-gray-500 rounded-lg text-sm"
        >
          Back home in {countdown}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
