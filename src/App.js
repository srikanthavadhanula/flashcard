import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import FlashcardForm from "./components/FlashcardForm";
import CategoryGrid from "./components/CategoryGrid";
import CategoryView from "./components/CategoryView";
import LandingPage from "./LandingPage";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const { user, setUser } = useContext(AuthContext);

  // Decode JWT to get email
  let userInfo = {};
  if (user && user.credential) {
    try {
      userInfo = jwtDecode(user.credential);
    } catch (e) {
      userInfo = {};
    }
  }

  // Categories and load state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const fetchCategories = async (email) => {
    setCategoriesLoading(true);
    const q = query(collection(db, "categories"), where("email", "==", email));
    const qsnap = await getDocs(q);
    const cats = qsnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setCategories(cats);
    setCategoriesLoading(false);
  };

  // Fetch categories after login
  useEffect(() => {
    if (userInfo.email) {
      fetchCategories(userInfo.email);
    } else {
      setCategories([]);
    }
  }, [userInfo.email]);

  // Handler from FlashcardForm for when a new flashcard/category is added
  const handleFlashcardAdded = (newCategory = null) => {
    setShowForm(false); // close the form
    // If a new category was added, append it to state
    if (newCategory && !categories.some(cat => cat.id === newCategory.id)) {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const handleCategoryClick = (catName) => setSelectedCategory(catName);
  const handleBack = () => setSelectedCategory(null);

  if (!user) return <LandingPage />;

  // Wait for categories before rendering main page
  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
        <div className="text-lg text-indigo-600 font-semibold animate-pulse">Loading your categories...</div>
      </div>
    );
  }

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

        {selectedCategory ? (
          <CategoryView
            categoryName={selectedCategory}
            userEmail={userInfo.email}
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
                onSubmit={handleFlashcardAdded}
                user={{ email: userInfo.email }}
                categories={categories}
              />
            )}
            <CategoryGrid
              categories={categories}
              onCategoryClick={handleCategoryClick}
              userEmail={userInfo.email}
              refreshCategories={() => fetchCategories(userInfo.email)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
