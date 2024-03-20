import React from "react";
import News from "../components/News";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = ({ newsData, isLoading, handleAddToFavorites,setCategory }) => {
  return (
    <>
      <Navbar setCategory={setCategory}/>
      <News newsData={newsData} isLoading={isLoading} handleAddToFavorites={handleAddToFavorites}/>
      <Footer />
    </>
  );
};

export default HomePage;
