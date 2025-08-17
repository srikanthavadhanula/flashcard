import React, { useContext, useState } from "react";
import "./App.css";
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
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Flashcard Application</h1>
          <button
            onClick={() => setUser(null)}
            style={{
              padding: "6px 16px", background: "#ffeaea", color: "#c00",
              border: "1px solid #fecdd3", borderRadius: 6, fontWeight: 600, cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
        <button
          className="create-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Flashcard'}
        </button>
        {showForm && (
          <FlashcardForm onSubmit={addFlashcard} />
        )}
        <FlashcardList flashcards={flashcards} />
      </header>
    </div>
  );
}
export default App;
