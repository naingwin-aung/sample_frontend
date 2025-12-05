import Image from "../../global/Image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import SocialSignIn from "../Auth/SocialSignIn";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithProvider, logout } from "../../../api/auth";
import useAuthStore from "../../../stores/useAuthStore";
import { useState } from "react";

const NavbarUser = ({loginSuccess}: {loginSuccess: () => void}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      await loginWithProvider("google", tokenResponse.access_token);
      setIsDialogOpen(false);
      loginSuccess();
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
    <>
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
          <DialogContent
            className="sm:max-w-md rounded-2xl"
            showCloseButton={false}
          >
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
                <span className="text-lg font-medium">Login or sign up</span>
              </DialogDescription>
            </DialogHeader>
            <SocialSignIn
              signInWithGoogle={signInWithGoogle}
              text="Sign In with Google"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NavbarUser;
