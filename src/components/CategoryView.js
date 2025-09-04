import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Flashcard from "./Flashcard";

function CategoryView({ categoryName, userEmail, onBack }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryName || !userEmail) return;

    setLoading(true);
    async function fetchCards() {
      // Query flashcards for this user and category, newest first (if you used a 'created' field)
      const q = query(
        collection(db, "flashcards"),
        where("email", "==", userEmail),
        where("categoryName", "==", categoryName),
        // orderBy("created", "desc")        // Uncomment if you want to order by created date and have it in your documents
      );
      const qsnap = await getDocs(q);
      setCards(qsnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }

    fetchCards();
  }, [categoryName, userEmail]);

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
          {cards.map((card) => (
            <Flashcard key={card.id} flashcard={card} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryView;
