import React, { useState } from 'react';

function FlashcardForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSubmit(question.trim(), answer.trim());
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <div className="form-group">
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer here..."
          required
        />
      </div>
      
      <button type="submit" className="submit-btn">
        Add Flashcard
      </button>
    </form>
  );
}

export default FlashcardForm;
