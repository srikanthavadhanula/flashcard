import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Flashcard from "./Flashcard";

function CategoryView({ categoryName, userEmail, onBack }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // flashcard ID in edit mode
  const [editValues, setEditValues] = useState({ question: "", answer: "" });

  // Fetch cards for user+category
  useEffect(() => {
    if (!categoryName || !userEmail) return;
    setLoading(true);

    async function fetchCards() {
      const q = query(
        collection(db, "flashcards"),
        where("email", "==", userEmail),
        where("categoryName", "==", categoryName),
        // orderBy("created", "desc")
      );
      const qsnap = await getDocs(q);
      setCards(qsnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchCards();
  }, [categoryName, userEmail]);

  // Delete flashcard
  async function handleDelete(cardId) {
    if (!window.confirm("Delete this flashcard?")) return;
    await deleteDoc(doc(db, "flashcards", cardId));
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  // Edit
  function startEdit(card) {
    setEditingId(card.id);
    setEditValues({ question: card.question, answer: card.answer });
  }

  function stopEdit() {
    setEditingId(null);
    setEditValues({ question: "", answer: "" });
  }

  async function handleEditSubmit(e, card) {
    e.preventDefault();
    const { question, answer } = editValues;
    await updateDoc(doc(db, "flashcards", card.id), { question, answer });
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, question, answer } : c))
    );
    stopEdit();
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          className="mr-3 px-3 py-1 text-xs bg-slate-100 text-indigo-700 rounded border border-indigo-100 font-semibold hover:bg-slate-200"
          onClick={onBack}
        >
          &larr; Categories
        </button>
        <h2 className="text-xl font-bold text-indigo-800">{categoryName}</h2>
      </div>
      {loading ? (
        <div className="text-center text-indigo-600 font-semibold animate-pulse py-10">
          Loading cards...
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center text-slate-400 py-8">
          No cards in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card) =>
            editingId === card.id ? (
              // Edit mode for this card
              <form
                key={card.id}
                className="bg-white rounded-2xl shadow p-4 border flex flex-col gap-2"
                onSubmit={e => handleEditSubmit(e, card)}
              >
                <label className="font-semibold text-gray-700 text-sm">
                  Question
                  <textarea
                    value={editValues.question}
                    onChange={e => setEditValues(v => ({ ...v, question: e.target.value }))}
                    className="mt-1 w-full p-2 rounded border bg-slate-100 border-slate-300 resize-none focus:border-indigo-400 transition"
                    required
                    rows={2}
                  />
                </label>
                <label className="font-semibold text-gray-700 text-sm">
                  Answer
                  <textarea
                    value={editValues.answer}
                    onChange={e => setEditValues(v => ({ ...v, answer: e.target.value }))}
                    className="mt-1 w-full p-2 rounded border bg-slate-100 border-slate-300 resize-none focus:border-indigo-400 transition"
                    required
                    rows={2}
                  />
                </label>
                <div className="flex gap-3 mt-3">
                  <button
                    type="submit"
                    className="flex-1 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-3 py-1 bg-slate-200 text-slate-800 rounded"
                    onClick={stopEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="relative group" key={card.id}>
                <Flashcard flashcard={card} />
                {/* Edit & Delete Buttons */}
                <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="p-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    title="Edit"
                    onClick={() => startEdit(card)}
                  >
                    ✏️
                  </button>
                  <button
                    className="p-1 rounded bg-rose-100 text-rose-600 hover:bg-rose-200"
                    title="Delete"
                    onClick={() => handleDelete(card.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryView;
