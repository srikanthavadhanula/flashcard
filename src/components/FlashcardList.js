import React from 'react';
import Flashcard from './Flashcard';

function FlashcardList({ flashcards }) {
  if (flashcards.length === 0) {
    return (
      <div className="no-flashcards">
        <p>No flashcards yet. Create your first flashcard!</p>
      </div>
    );
  }

  return (
    <div className="flashcard-list">
      <h2>Your Flashcards ({flashcards.length})</h2>
      <div className="flashcards-grid">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
}

export default FlashcardList;
