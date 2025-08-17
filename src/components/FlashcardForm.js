import React, { useState } from "react";

function FlashcardForm({ onSubmit, categories }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(categories.length ? categories[0] : "");
  const [newCategory, setNewCategory] = useState('');
  const [useNew, setUseNew] = useState(categories.length === 0); // If no categories yet, default to new

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || (!category && !newCategory.trim())) return;
    onSubmit({
      question: question.trim(),
      answer: answer.trim(),
      category: useNew ? null : category,
      newCategory: useNew ? newCategory.trim() : null,
    });
    setQuestion('');
    setAnswer('');
    setNewCategory('');
    setCategory(categories[0] || "");
    setUseNew(categories.length === 0);
  };

  return (
    <div className="mb-6 bg-white/100 shadow-lg rounded-2xl p-6 w-full max-w-lg mx-auto border border-slate-100">
      <h2 className="text-xl font-semibold text-indigo-700 text-center mb-2">Create New Flashcard</h2>
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
            placeholder="E.g. What is closure in JS?"
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
            placeholder="E.g. A closure is..."
            required
          />
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700 text-sm">
            Category
          </label>
          <select
            disabled={useNew}
            value={category}
            className="rounded p-2 border border-slate-300 bg-slate-50 focus:border-indigo-400"
            onChange={e => setCategory(e.target.value)}
            style={{ minWidth: 100 }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <span className="text-xs text-slate-500">or</span>
          <button
            type="button"
            className={`px-2 py-1 rounded font-medium text-xs ${
              useNew
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-indigo-800 border border-slate-200"
            }`}
            onClick={() => setUseNew(!useNew)}
          >
            {useNew ? "Use Dropdown" : "New Category"}
          </button>
        </div>
        {useNew && (
          <div>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="E.g. JavaScript"
              className="block w-full p-2 rounded border bg-slate-100 border-slate-300 focus:border-indigo-400 transition text-sm"
              required
              autoFocus
            />
          </div>
        )}

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
