import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

  const signout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="navbar">
      <Link to="/" style={{color:"red",  display:"flex",alignItems:"center",fontWeight:"800",fontSize:"23px"}}>
        <img
          src="https://freepngdesign.com/content/uploads/images/world-globe-1881681472.png"
          alt="logo"
        />
       <p>Bharat Bites</p>
      </Link>
      <ul
        style={{
          color: "white",
          display: "flex",
          gap: "20px",
          listStyle: "none"
          ,cursor:"pointer"
        }}
      >
        <li onClick={() => setCategory("sports")}>Sports</li>
        <li onClick={() => setCategory("gaming")}>Gaming</li>
        <li onClick={() => setCategory("technology")}>Technology</li>
        <li></li>
      </ul>
      <div>
        <button className="fav-button" onClick={() => navigate("/favorites")}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/210/210545.png"
            alt="favorites"
          />
        </button>
        <button onClick={(e) => signout(e)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png"
            className="logout-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
