# 🧠 Flashcards App

A minimalist, modern, and fully functional Flashcard application built with React, Firebase, and Google OAuth2 login.  
Organize, create, and review flashcards by categories—perfect for study, revision, and memorization!

## ✨ Features

- **Google Login:** Secure, instant sign-in with your Google account
- **Per-user flashcards:** Each user's categories and cards are private
- **Organized by Category:** Cards are grouped, browsable, and filterable
- **Create Cards with Custom Categories:** Instantly add new topics as you learn
- **Responsive & Beautiful UI:** Optimized for desktop and mobile
- **Powered by Firebase Firestore:** Real-time, scalable data backend

---

## 📸 Screenshots

<!--
Add screenshots/gifs here, e.g.:
![Login page](screenshots/login.png)
![Category view](screenshots/categories.png)
-->

---

## 🚀 Getting Started

### 1. **Clone the Repository**

git clone https://github.com/yourusername/flashcards-app.git
cd flashcards-app


### 2. **Install Dependencies**

npm install


### 3. **Create and Configure Firebase**

- Go to [Firebase Console](https://console.firebase.google.com/), create a project and a web app.
- Enable **Cloud Firestore** (**Start in test mode** is fine for development).
- Under project settings, copy your **Firebase config** (API key, etc).

### 4. **Set up Google OAuth2**

- In [Google Cloud Console](https://console.cloud.google.com/), create a project and set up an OAuth 2.0 Client for Web:
  - Add `http://localhost:3000` as an authorized origin.
  - Copy your client ID.
- (Only login with Google is required; users will not authenticate with Firebase Auth directly.)

### 5. **Configure Local Environment**

Create a file in your project root named `.env.local` with:

Google Login
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id

Firebase config
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

If using analytics:
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

_(Never commit `.env.local`!)_

### 6. **Run the Application**

npm start


Visit `http://localhost:3000`. You should see the landing page.

---

## 🏗️ Project Structure

src/
components/
FlashcardForm.js
CategoryGrid.js
CategoryView.js
Flashcard.js
AuthContext.js
LandingPage.js
App.js
firebase.js
index.js
...


- **App.js**: Main app logic & routing
- **FlashcardForm.js**: Add cards & categories (writes to Firestore)
- **CategoryGrid.js**: Browse user’s categories
- **CategoryView.js**: View cards in a category (reads from Firestore)
- **firebase.js**: Firebase config & init
- **AuthContext.js**: Google login user context

---

## ⚡️ Customizing

- Update styles in `tailwind.config.js` or CSS as you like.
- Extend Firestore structure to add more user fields, hints, etc.

---

## 🛡️ Security & Deployment

- Lock your Firestore rules before production, e.g. only allow access to own cards/categories.
- Deploy with [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## 📄 License

MIT (unless specified otherwise).

---

## 🙏 Contributing

Feel free to fork or PR improvements!

---

## 💡 Credits

Built with ❤️ using [React](https://react.dev/) and [Firebase](https://firebase.google.com/).