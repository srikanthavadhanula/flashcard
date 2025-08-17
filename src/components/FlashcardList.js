import React from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  if (flashcards.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10 text-lg">
        No flashcards yet. Click "New Flashcard" to create one!
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-center text-lg text-indigo-900 font-semibold mb-4">
        Your Flashcards {flashcards.length > 0 ? `(${flashcards.length})` : ""}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
}

export default FlashcardList;
