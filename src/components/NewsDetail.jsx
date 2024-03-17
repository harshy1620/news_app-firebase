import React from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NewsDetail = ({ newsData, handleAddToFavorites }) => {
  // using useParams hook to know the id from url
  const { newsIndex } = useParams();
  let news = newsData[newsIndex];

  return (
    <div className="news-detail">
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
      <Link className="link" to="/">
        Back to Homepage
      </Link>
      <h1>{news?.title}</h1>
      <span onClick={() => handleAddToFavorites(news)}>
        <img
          className="icon-fav"
          src="https://cdn-icons-png.flaticon.com/128/210/210545.png"
          alt="favorites"
        />
      </span>
      <img
        src={
          news?.urlToImage
            ? news?.urlToImage
            : "http://i.huffpost.com/gen/4707746/images/o-BREAKING-NEWS-facebook.jpg"
        }
        alt={news?.title}
      />
      <p>
        {news?.description}
        <a target="_blank" href={news?.url}>
          {" "}
          ... Click here to know more.
        </a>
      </p>
    </div>
  );
};

export default NewsDetail;
