import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./Loader";

const News = ({ newsData, isLoading, handleAddToFavorites }) => {
  return (
    <div className="news">
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
      <h1>Top News - India</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="news-container">
          {newsData?.map((news, index) => (
            <div key={index}>
              <button onClick={() => handleAddToFavorites(news)}>❤️</button>
              <Link to={`/news/${index}`} key={index}>
                <img
                  src={
                    news?.urlToImage
                      ? news.urlToImage
                      : "http://i.huffpost.com/gen/4707746/images/o-BREAKING-NEWS-facebook.jpg"
                  }
                  alt={news.title}
                />
                <h4>{news.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
