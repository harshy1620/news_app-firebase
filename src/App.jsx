import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./firebase.js";
import { getDoc, collection, doc, setDoc } from "firebase/firestore";
import Login from "./components/Login";
import HomePage from "./Pages/HomePage";
import Register from "./components/Register";
import NewsDetailPage from "./Pages/NewsDetailPage";
import FavouritesPage from "./Pages/FavouritesPage";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const [category,setCategory] = useState("general")
  const [user, setUser] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = `${baseUrl}${category}&apiKey=${apiKey}`
  
  // handling favourite buton using firebase db
   const addToFavorites= async(newsItem) =>{
    const user = auth.currentUser;
    if (user) {
      try {
        const favoritesCollection = collection(
          db,
          "users",
          user.uid,
          "favorites"
        );
        const existingDocRef = doc(favoritesCollection, newsItem.title);
        const existingDocSnapshot = await getDoc(existingDocRef);
        if (!existingDocSnapshot.exists()) {
          await setDoc(existingDocRef, newsItem);
          toast.success("Added to favorites, visit favourites page");
        } else {
          toast.error("Already in favorites!");
        }
      } catch (error) {
        toast.error("Error in adding");
        console.error("Error adding to favorites:", error);
      }
    } else {
      toast.error("Please log in to add to favorites!");
    }
  }

  //this is to know the user is logged in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  //fetching news data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setNewsData(data.articles);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <Routes>
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          user ? (
            <HomePage
              setCategory={setCategory}
              newsData={newsData}
              handleAddToFavorites={addToFavorites}
              isLoading={isLoading}
            />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/news/:newsIndex"
        element={
          user ? (
            <NewsDetailPage
              newsData={newsData}
              handleAddToFavorites={addToFavorites}
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/favorites"
        element={user ? <FavouritesPage /> : <Login />}
      />
    </Routes>
  );
};

export default App;
