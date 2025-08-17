import React from "react";

function getColor(idx) {
  // Cycle through 3 pretty pastel colors
  const shades = [
    "from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-100",
    "from-purple-100 to-purple-200 text-purple-900 border-purple-100",
    "from-pink-100 to-pink-200 text-pink-900 border-pink-100",
    "from-blue-100 to-blue-200 text-blue-900 border-blue-100"
  ];
  return shades[idx % shades.length];
}

function CategoryGrid({ categories, onCategoryClick }) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center text-slate-500 py-10 text-lg">
        <div className="text-4xl mb-2">📂</div>
        <div>No categories yet.<br/>Create your first card to make a category!</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-center text-lg text-indigo-900 font-semibold mb-3">Your Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              className={`rounded-2xl p-6 border bg-gradient-to-br ${getColor(idx)} shadow hover:shadow-lg focus:outline-indigo-400 font-bold transition-all text-lg flex flex-col items-center gap-1`}
              onClick={() => onCategoryClick(cat.name)}
            >
              <span className="truncate max-w-xs">{cat.name}</span>
              <span className="text-xs font-normal text-slate-500">{cat.cards.length} {cat.cards.length > 1 ? "Cards" : "Card"}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryGrid;
