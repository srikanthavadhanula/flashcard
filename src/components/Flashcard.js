import React, { useState } from "react";

function Flashcard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => setIsFlipped(!isFlipped);

  return (
    <div className="flashcard relative h-44 sm:h-52" onClick={handleClick} tabIndex={0}>
      <div className={`flashcard-inner w-full h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flashcard-front absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow hover:shadow-md flex flex-col items-center justify-center p-4 text-center cursor-pointer">
          <span className="block text-xs uppercase text-indigo-400 font-bold mb-1 tracking-wide">
            Question
          </span>
          <p className="text-gray-800 font-medium">{flashcard.question}</p>
          <span className="text-xs mt-3 text-slate-400 italic select-none">Click card to view answer</span>
        </div>
        {/* Back */}
        <div className="flashcard-back absolute inset-0 bg-indigo-50 border border-slate-200 rounded-2xl shadow hover:shadow-md flex flex-col items-center justify-center p-4 text-center cursor-pointer">
          <span className="block text-xs uppercase text-indigo-400 font-bold mb-1 tracking-wide">
            Answer
          </span>
          <p className="text-gray-700 font-medium">{flashcard.answer}</p>
          <span className="text-xs mt-3 text-slate-400 italic select-none">Click card to view question</span>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
