import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function LandingPage() {
  const { setUser } = useContext(AuthContext);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-3 text-center">
        Welcome to Flashcards!
      </h1>
      <p className="text-gray-600 max-w-xl text-center mb-8">
        The minimalist, user-friendly way to test your knowledge or learn new things.<br />
        <span className="hidden sm:inline">Create, flip, and manage your flashcards with ease.</span>
      </p>
      <GoogleLogin
        onSuccess={credentialResponse => {
          setUser({ credential: credentialResponse.credential });
        }}
        onError={() => alert('Login Failed')}
      />
      <div className="mt-4 text-xs text-gray-400 text-center">
        Secure Google sign-in required to start.
      </div>
    </div>
  );
}

export default LandingPage;
