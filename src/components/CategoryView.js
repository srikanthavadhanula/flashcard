import React from "react";
import Flashcard from "./Flashcard";

function CategoryView({ category, onBack }) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          className="mr-3 px-3 py-1 text-xs bg-slate-100 text-indigo-700 rounded border border-indigo-100 font-semibold hover:bg-slate-200"
          onClick={onBack}
        >
          &larr; Categories
        </button>
        <h2 className="text-xl font-bold text-indigo-800">{category.name}</h2>
      </div>
      {category.cards.length === 0 ? (
        <div className="text-center text-slate-400 py-8">No cards in this category yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {category.cards.map((card) => (
            <Flashcard key={card.id} flashcard={card} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryView;
