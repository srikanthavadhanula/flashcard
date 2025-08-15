import React, { useState } from 'react';

function Flashcard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <h3>Question</h3>
          <p>{flashcard.question}</p>
          <span className="click-hint">Click to reveal answer</span>
        </div>
        <div className="flashcard-back">
          <h3>Answer</h3>
          <p>{flashcard.answer}</p>
          <span className="click-hint">Click to see question</span>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
