import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

function LandingPage() {
  const { setUser } = useContext(AuthContext);
  // For interactive sample card flip!
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-white px-4">
      {/* Header section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-3 drop-shadow-lg tracking-tight">
          Flashcards
        </h1>
        <p className="text-lg sm:text-xl text-indigo-900 mb-4">
          Power up your learning with interactive, memory-boosting AI flashcards.
        </p>
        <p className="text-base text-slate-600 max-w-xl mx-auto">
          Instantly create, organize, and master anything—new words, coding concepts, medical facts, or anything you need to remember. Just login and get started, for free!
        </p>
      </header>
      
      {/* Product highlights */}
      <div className="flex flex-col sm:flex-row items-center gap-8 my-8 w-full max-w-4xl">
        {/* Interactive flashcard demo */}
        <div className="w-full max-w-xs flex flex-col items-center">
          <div
            className="flashcard relative h-44 w-full cursor-pointer mb-2"
            title="Try me!"
            onClick={() => setFlipped(f => !f)}
            tabIndex={0}
          >
            <div className={`flashcard-inner w-full h-full ${flipped ? "flipped" : ""}`}>
              {/* Front */}
              <div className="flashcard-front absolute inset-0 bg-white border border-indigo-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 text-center select-none">
                <span className="block text-xs uppercase text-indigo-400 font-bold mb-1 tracking-wide">
                  Question
                </span>
                <p className="text-indigo-900 font-semibold text-lg">What is a flashcard?</p>
                <span className="text-xs mt-3 text-slate-400 italic">Click card!</span>
              </div>
              {/* Back */}
              <div className="flashcard-back absolute inset-0 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 text-center select-none">
                <span className="block text-xs uppercase text-indigo-400 font-bold mb-1 tracking-wide">
                  Answer
                </span>
                <p className="text-indigo-800 font-medium text-base">A quick question-and-answer tool<br />to help you study, revise, and remember facts!</p>
                <span className="text-xs mt-3 text-slate-400 italic">Click to flip back</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-500">Try flipping this card &rarr;</span>
        </div>

        {/* Highlights */}
        <ul className="flex-1 grid gap-5 w-full max-w-lg">
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center text-xl">💡</span>
            <div>
              <span className="font-bold text-slate-800">Fast, Simple & Free.</span>
              <span className="block text-sm text-slate-500">No clutter, just pure focus on learning.</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center text-xl">🔒</span>
            <div>
              <span className="font-bold text-slate-800">Secure Google Login.</span>
              <span className="block text-sm text-slate-500">Your cards are safe, private, and only you can access them.</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-indigo-500 bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center text-xl">🤸‍♂️</span>
            <div>
              <span className="font-bold text-slate-800">Responsive & Accessible.</span>
              <span className="block text-sm text-slate-500">Works great on any device, any time.</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Google Login */}
      <div className="my-8">
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const { name, email } = jwtDecode(credentialResponse.credential);

            // insert user if new
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const existing = await getDocs(q);

            if (existing.empty) {
              await addDoc(usersRef, { name, email });
            }
            setUser({ credential: credentialResponse.credential });
          }}
          onError={() => alert('Login Failed')}
        />
        <div className="mt-3 text-xs text-slate-400 text-center">Sign in with Google to start creating your own flashcards.</div>
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center mt-8 mb-2 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Flashcards. Study, remember, succeed!
      </footer>
    </div>
  );
}

export default LandingPage;
