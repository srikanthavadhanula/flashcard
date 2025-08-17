import React, { useState } from "react";

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
    <div className="mb-6 bg-white rounded-2xl shadow p-6 w-full max-w-lg mx-auto border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="question" className="block font-semibold text-gray-700 mb-1 text-sm">
            Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="block w-full p-2 rounded border bg-slate-100 border-slate-300 resize-none focus:border-indigo-400 transition"
            rows={2}
            placeholder="E.g. What is React?"
            required
          />
        </div>
        <div>
          <label htmlFor="answer" className="block font-semibold text-gray-700 mb-1 text-sm">
            Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="block w-full p-2 rounded border bg-slate-100 border-slate-300 resize-none focus:border-indigo-400 transition"
            rows={2}
            placeholder="E.g. A JavaScript library for UIs"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-500 rounded-full text-white font-semibold hover:bg-indigo-600 transition"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
}

export default FlashcardForm;
