import React, { useState } from 'react';
import './App.css';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addFlashcard = (question, answer) => {
    const newFlashcard = {
      id: Date.now(), // Simple ID generation
      question,
      answer
    };
    setFlashcards([...flashcards, newFlashcard]);
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flashcard Application</h1>
        
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
