import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function LandingPage() {
  const { setUser } = useContext(AuthContext);

  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", color: "#3f51b5", marginBottom: "1rem" }}>
        Welcome to Flashcards!
      </h1>
      <p style={{
        maxWidth: 440,
        textAlign: "center",
        color: "#444",
        marginBottom: 24
      }}>
        The minimalist, user-friendly way to test your knowledge or learn new things.
        <br />
        Create, flip, and manage your flashcards with ease—your learning companion awaits.
      </p>
      <GoogleLogin
        onSuccess={credentialResponse => {
          setUser({ credential: credentialResponse.credential });
        }}
        onError={() => alert('Login Failed')}
      />
      <div style={{ marginTop: 18, color: "#888", fontSize: 13 }}>
        Login required to get started.
      </div>
    </div>
  );
}
export default LandingPage;
