import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favourites = () => {
  const user = auth.currentUser;
  const [favorites, setFavorites] = useState(null);

  // fetching favourites from firebase  db
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favoritesCollection = collection(
            db,
            "users",
            user.uid,
            "favorites"
          );
          const favoritesSnapshot = await getDocs(favoritesCollection);

          // Map through each document snapshot to extract data and ID
          const favoritesData = favoritesSnapshot.docs.map((doc) => ({
            id: doc.id, 
            data: doc.data(), 
          }));

          setFavorites(favoritesData);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  // handle delete to deleting particular favourite news
  const handleDeleteFavourite = async (favoriteId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const favoriteRef = doc(db, "users", user.uid, "favorites", favoriteId);
        await deleteDoc(favoriteRef);
        toast.success("Favorite news deleted successfully");
        // Update the favorites state after deletion
        const updatedFavorites = favorites.filter(
          (fav) => fav.id !== favoriteId
        );
        setFavorites(updatedFavorites);
      } catch (error) {
        toast.error("Error in deleting favorites");
        console.error("Error in deleting favorites", error);
      }
    } else {
      toast.error("Please log in first");
    }
  };

  return (
    <div className="favourites">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Favorites</h1>
      <Link className="link" to="/">
        Back to Homepage
      </Link>
      {favorites ? (
        favorites?.map((favorite, index) => (
          <div key={index} className="fav-wrapper">
            <button
              className="del-button"
              onClick={() => handleDeleteFavourite(favorite.id)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                alt="delete"
              />
            </button>

            <a href={favorite?.data?.url} target="_blank">
              <p>{favorite?.data?.title}</p>
              <img
                src={
                  favorite?.data?.urlToImage ||
                  "http://i.huffpost.com/gen/4707746/images/o-BREAKING-NEWS-facebook.jpg"
                }
                alt={favorite?.data?.title}
              />
            </a>
          </div>
        ))
      ) : (
        <div
          style={{
            margin: "50px 0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>No favorite news yet.</h1>
          <p> Please select a favorite news</p>
          <Link
            to="/"
            style={{
              marginTop: "20px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
            }}
          >
            See All News
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
