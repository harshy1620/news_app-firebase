import React from "react";
import Navbar from "../components/Navbar";
import NewsDetail from "../components/NewsDetail";
import Footer from "../components/Footer";

const NewsDetailPage = ({ newsData,  handleAddToFavorites }) => {
  return (
    <>
      <Navbar />
      <NewsDetail newsData={newsData} handleAddToFavorites={handleAddToFavorites}/>
      <Footer />
    </>
  );
};

export default NewsDetailPage;
