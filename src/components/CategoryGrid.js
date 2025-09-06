import React, { useState } from "react";
import { db } from "../firebase";
import {
  query, collection, where, getDocs, doc,
  updateDoc, deleteDoc, writeBatch
} from "firebase/firestore";

function getColor(idx) {
  const shades = [
    "from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-100",
    "from-purple-100 to-purple-200 text-purple-900 border-purple-100",
    "from-pink-100 to-pink-200 text-pink-900 border-pink-100",
    "from-blue-100 to-blue-200 text-blue-900 border-blue-100"
  ];
  return shades[idx % shades.length];
}

const CategoryGrid = ({ categories, onCategoryClick, userEmail, refreshCategories }) => {
  // 'categories' is an array: [{ id, categoryName }]
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCatValue, setNewCatValue] = useState("");
  const [updating, setUpdating] = useState(false);

  // Start category edit
  const startEdit = (cat) => {
    setEditCategoryId(cat.id);
    setNewCatValue(cat.categoryName);
  };

  // Confirm update category name:
  async function handleCategoryUpdate(cat) {
    const oldCategory = cat.categoryName;
    const newCategory = newCatValue.trim();
    if (!newCategory || newCategory === oldCategory) {
      setEditCategoryId(null);
      return;
    }
    setUpdating(true);

    // 1. Update category document
    const catRef = doc(db, "categories", cat.id);
    await updateDoc(catRef, { categoryName: newCategory });

    // 2. Update all flashcards for this user + old category
    const flashcardsQ = query(
      collection(db, "flashcards"),
      where("email", "==", userEmail),
      where("categoryName", "==", oldCategory)
    );
    const flashSnap = await getDocs(flashcardsQ);
    const batch = writeBatch(db);

    flashSnap.forEach(docRef => {
      batch.update(doc(db, "flashcards", docRef.id), {
        categoryName: newCategory
      });
    });
    await batch.commit();

    setEditCategoryId(null);
    setUpdating(false);

    // Reload categories if provided
    refreshCategories && refreshCategories();
  }

  // Delete category (and all its flashcards!)
  async function handleCategoryDelete(cat) {
    if (!window.confirm(
      `Delete category "${cat.categoryName}" and all its flashcards?`
    )) return;

    // 1. Delete category doc
    await deleteDoc(doc(db, "categories", cat.id));
    // 2. Delete all flashcards in this category
    const flashcardsQ = query(
      collection(db, "flashcards"),
      where("email", "==", userEmail),
      where("categoryName", "==", cat.categoryName)
    );
    const flashSnap = await getDocs(flashcardsQ);
    const batch = writeBatch(db);
    flashSnap.forEach(docRef => {
      batch.delete(doc(db, "flashcards", docRef.id));
    });
    await batch.commit();

    refreshCategories && refreshCategories();
  }

  if (!categories || categories.length === 0) {
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
            <div
              key={cat.id}
              className={`relative rounded-2xl p-6 border bg-gradient-to-br ${getColor(idx)} shadow hover:shadow-lg font-bold transition-all text-lg flex flex-col items-center gap-1 group`}
            >
              {editCategoryId === cat.id ? (
                <form
                  className="flex flex-col w-full items-center gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    handleCategoryUpdate(cat);
                  }}
                >
                  <input
                    className="py-1 px-3 rounded border border-indigo-200 text-base font-normal w-full"
                    value={newCatValue}
                    onChange={e => setNewCatValue(e.target.value)}
                    disabled={updating}
                    required
                  />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600" disabled={updating}>
                      Update
                    </button>
                    <button type="button" className="px-3 py-1 rounded bg-slate-200 text-slate-800" onClick={() => setEditCategoryId(null)} disabled={updating}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    className="w-full truncate max-w-xs text-center focus:underline"
                    onClick={() => onCategoryClick(cat.categoryName)}
                  >
                    {cat.categoryName}
                  </button>
                  <span className="text-xs font-normal text-slate-500">{cat.count || ""} Cards</span>
                  {/* Edit/Delete icons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
                    <button
                      className="p-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      title="Edit"
                      onClick={() => startEdit(cat)}
                    >
                      ✏️
                    </button>
                    <button
                      className="p-1 rounded bg-rose-100 text-rose-600 hover:bg-rose-200"
                      title="Delete"
                      onClick={() => handleCategoryDelete(cat)}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryGrid;
