import React, { useContext, useState } from "react";
import "./App.css";
import FlashcardForm from "./components/FlashcardForm";
import CategoryGrid from "./components/CategoryGrid";
import CategoryView from "./components/CategoryView";
import LandingPage from "./LandingPage";
import { AuthContext } from "./AuthContext";

// Store everything in one state for demo (can refactor with useReducer or context for persistence)
function App() {
  const { user, setUser } = useContext(AuthContext);

  // categories: array of { name: string, cards: [] }
  // e.g. [{name: "JS", cards: [{id, question, answer}], ...}]
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add card with category logic
  const addFlashcard = ({ question, answer, category, newCategory }) => {
    // If they provided a new category, use it
    const targetCategory = newCategory ? newCategory.trim() : category;

    // Check if category exists
    let nextCategories = [...categories];
    let catIdx = nextCategories.findIndex((cat) => cat.name === targetCategory);

    const newCard = {
      id: Date.now(),
      question,
      answer,
    };
    if (catIdx === -1) {
      // New category: add
      nextCategories.unshift({
        name: targetCategory,
        cards: [newCard],
      });
    } else {
      // Add to existing category at the top
      nextCategories = nextCategories.map((cat, idx) =>
        idx === catIdx
          ? { ...cat, cards: [newCard, ...cat.cards] }
          : cat
      );
    }
    setCategories(nextCategories);
    setShowForm(false);
    // After creation, stay on all categories page
  };

  // Click to view a category
  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
  };

  // Back to categories view
  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (!user) return <LandingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center px-2">
      <main className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl px-6 py-8 sm:py-10 backdrop-blur-md">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 select-none mb-0">Flashcards</h1>
            <span className="text-sm text-indigo-500">Organize your knowledge by category!</span>
          </div>
          <button
            onClick={() => setUser(null)}
            className="px-4 py-2 text-xs rounded bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 border border-indigo-200"
          >
            Logout
          </button>
        </div>

        {/* If category is selected, show that category's flashcards */}
        {selectedCategory ? (
          <CategoryView
            category={categories.find(cat => cat.name === selectedCategory)}
            onBack={handleBack}
          />
        ) : (
          <>
            <button
              className="block mx-auto px-6 py-3 mb-6
                bg-gradient-to-r from-indigo-500 to-purple-500
                hover:from-indigo-600 hover:to-purple-600
                text-white rounded-full font-medium shadow
                transition-all transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "New Flashcard"}
            </button>
            {showForm && (
              <FlashcardForm
                onSubmit={addFlashcard}
                categories={categories.map(cat => cat.name)}
              />
            )}
            <CategoryGrid
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
