import React, { useContext, useState } from "react";
import "./App.css"; // Only for custom flip CSS!
import FlashcardForm from "./components/FlashcardForm";
import FlashcardList from "./components/FlashcardList";
import LandingPage from "./LandingPage";
import { AuthContext } from "./AuthContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addFlashcard = (question, answer) => {
    const newFlashcard = {
      id: Date.now(),
      question,
      answer,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setShowForm(false);
  };

  if (!user) return <LandingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center px-2">
      <main className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl px-6 py-8 sm:py-10 backdrop-blur-md">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 select-none">
            Flashcards
          </h1>
          <button
            onClick={() => setUser(null)}
            className="px-4 py-2 text-xs rounded bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 border border-indigo-200"
          >
            Logout
          </button>
        </div>
        <button
          className="block mx-auto px-6 py-3 mb-6 
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600
            text-white rounded-full font-medium shadow 
            transition-all transform hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-indigo-300"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "New Flashcard"}
        </button>
        {showForm && (
          <FlashcardForm onSubmit={addFlashcard} />
        )}
        <FlashcardList flashcards={flashcards} />
      </main>
    </div>
  );
}

export default App;
