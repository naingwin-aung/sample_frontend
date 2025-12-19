import Image from "../../global/Image";
import SocialSignIn from "./SocialSignIn";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithProvider } from "../../../api/auth";

const AuthenticationModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      await loginWithProvider("google", tokenResponse.access_token);
      setIsModalOpen(false);
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-5">
              <Image
                src="https://i.pinimg.com/736x/1b/aa/51/1baa516470fc278145718dd2048bdf6d.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-2xl font-medium">Welcome back!</div>
            </div>
            <p className="text-gray-500 mb-4">
              Login or sign up
            </p>
            <SocialSignIn
              signInWithGoogle={signInWithGoogle}
              text="Sign In with Google"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationModal;
