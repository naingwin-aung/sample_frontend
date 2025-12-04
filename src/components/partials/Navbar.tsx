import { Link } from "react-router-dom";
import Image from "../global/Image";
import Container from "../global/Container";
import { loginWithProvider, logout } from "../../api/auth";
import useAuthStore from "../../stores/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SocialSignIn from "./Auth/SocialSignIn";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleGoogleSuccess = async (tokenResponse : any) => {
    try {
      await loginWithProvider("google", tokenResponse.access_token);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Sign-In failed. Please try again.");
  };

  const signInWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  return (
    <header className="glass sticky top-0 z-50 rounded-none">
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

          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 font-medium text-xs">
            <Link to="/" className="text-gray-600">
              Help
            </Link>
            <Link to="/" className="text-gray-600">
              Recently Viewed
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-4xl bg-linear-to-r from-red-400 to-red-600 text-white cursor-pointer text-sm hover:from-red-500 hover:to-red-700 transition"
              >
                Log out
              </button>
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="px-4 py-2 rounded-4xl bg-linear-to-r from-orange-400 to-orange-600 text-white cursor-pointer text-sm hover:from-orange-500 hover:to-orange-700 transition">
                    Log in
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex items-center gap-4 mb-5">
                        <Image
                          src="https://i.pinimg.com/736x/1b/aa/51/1baa516470fc278145718dd2048bdf6d.jpg"
                          alt="Logo"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-2xl font-medium">Welcome back!</div>
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      <span className="text-lg font-medium">
                        Login or sign up
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <SocialSignIn
                    signInWithGoogle={signInWithGoogle}
                    text="Sign In with Google"
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
