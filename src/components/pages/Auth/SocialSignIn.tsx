const SocialSignIn = ({ signInWithGoogle, text } : { signInWithGoogle: () => void; text?: string }) => {
  return (
    <button
      onClick={signInWithGoogle}
      className="w-full flex items-center justify-center p-3 mb-6 border border-gray-300 bg-gray-50 rounded-md text-gray-700 font-medium mt-4 cursor-pointer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.9945 11.8847C22.991 11.1724 22.9271 10.4615 22.8034 9.75885H12.2163V13.8405H18.2741C18.0136 15.148 17.2022 16.2991 16.0263 17.0294V19.6761H19.6453C21.8759 17.6434 23.0926 14.8128 22.9945 11.8847Z"
          fill="#4285F4"
        ></path>{" "}
        <path
          d="M12.2163 22.259C14.9511 22.3342 17.6128 21.4177 19.6565 19.6973L16.0375 17.0506C14.8997 17.742 13.5683 18.0938 12.2163 18.0604C9.3467 18.016 6.82125 16.2588 5.92238 13.6811H2.20226V16.4129C4.10855 19.9907 7.98004 22.2509 12.2163 22.259Z"
          fill="#34A853"
        ></path>{" "}
        <path
          d="M5.92238 13.6705C5.45465 12.3531 5.45465 10.9274 5.92238 9.61004V6.87829H2.20226C0.599247 9.88691 0.599247 13.4361 2.20226 16.4447L5.92238 13.6705Z"
          fill="#FBBC04"
        ></path>{" "}
        <path
          d="M12.2163 5.25199C13.8164 5.23018 15.3619 5.80261 16.5208 6.8464L19.7239 3.81702C17.7027 1.9923 15.0105 0.98223 12.2163 1.00024C7.98004 1.00837 4.10855 3.26855 2.20226 6.8464L5.92238 9.61004C6.82897 7.04074 9.35264 5.29328 12.2163 5.25199Z"
          fill="#EA4335"
        ></path>
      </svg>
      <span className="ms-3 font-medium">
        {text ? text : "Google"}
      </span>
    </button>
  );
};

export default SocialSignIn;
