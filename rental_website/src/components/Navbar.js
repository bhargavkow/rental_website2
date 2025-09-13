// import React, { useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import { FavoritesContext } from "./FavoritesContext";

// const Navbar = () => {
//   const { favorites } = useContext(FavoritesContext);
//   const [query, setQuery] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${query}`);
//       setQuery("");
//     }
//   };

//   const handleProfileClick = () => {
//     if (isLoggedIn) {
//       navigate("/profile");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="logo">StyleHub</Link>
//       </div>

//       <div className="navbar-center">
//         <ul className="nav-links">
//           <li><Link to="/Men">Men</Link></li>
//           <li><Link to="/Women">Women</Link></li>
//           <li><Link to="/Children">Children</Link></li>
//           <li><Link to="/Tranding">Trending</Link></li>
//         </ul>
//       </div>

//       <div className="navbar-right">
//         <form onSubmit={handleSearch} className="search-container">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="search-box"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button type="submit" className="search-btn">
//             <i className="fas fa-search search-icon"></i>
//           </button>
//         </form>

//         <Link to="/favorite" className="fav-icon">
//           <i className="fa-regular fa-heart"></i>
//           {favorites.length > 0 && (
//             <span className="fav-count">{favorites.length}</span>
//           )}
//         </Link>

//         <Link to="/Bag" className="bag-icon">
//           <i className="fa-solid fa-cart-shopping"></i>
//         </Link>

//         {isLoggedIn ? (
//           <>
//             <button onClick={handleProfileClick} className="profile-icon">
//               <i className="fa-regular fa-user"></i>
//             </button>
//             <button onClick={handleLogout} className="logout-button">
//               Log Out
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="login-link">Login</Link>
//             <Link to="/signup" className="signup-link">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FavoritesContext } from "./FavoritesContext";

const Navbar = () => {
  const { favorites } = useContext(FavoritesContext);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
      setMobileOpen(false);
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/login");
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="logo" onClick={closeMobile}>StyleHub</Link>
      </div>

      <div className={`navbar-center ${mobileOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li className="dropdown">
            <Link to="/Men" className="nav-link" onClick={closeMobile}>Men</Link>
            <div className="dropdown-content">
              <Link to="/Men/Shirts" onClick={closeMobile}>Shirts</Link>
              <Link to="/Men/Pants" onClick={closeMobile}>Pants</Link>
              <Link to="/Men/Jackets" onClick={closeMobile}>Jackets</Link>
              <Link to="/Men/Shoes" onClick={closeMobile}>Shoes</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link to="/Women" className="nav-link" onClick={closeMobile}>Women</Link>
            <div className="dropdown-content">
              <Link to="/Women/Dresses" onClick={closeMobile}>Dresses</Link>
              <Link to="/Women/Tops" onClick={closeMobile}>Tops</Link>
              <Link to="/Women/Jeans" onClick={closeMobile}>Jeans</Link>
              <Link to="/Women/Shoes" onClick={closeMobile}>Shoes</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link to="/Children" className="nav-link" onClick={closeMobile}>Children</Link>
            <div className="dropdown-content">
              <Link to="/Children/Tops" onClick={closeMobile}>Tops</Link>
              <Link to="/Children/Bottoms" onClick={closeMobile}>Bottoms</Link>
              <Link to="/Children/Shoes" onClick={closeMobile}>Shoes</Link>
              <Link to="/Children/Accessories" onClick={closeMobile}>Accessories</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link to="/Tranding" className="nav-link" onClick={closeMobile}>Trending</Link>
            <div className="dropdown-content">
              <Link to="/Tranding/Latest" onClick={closeMobile}>Latest</Link>
              <Link to="/Tranding/Deals" onClick={closeMobile}>Deals</Link>
              <Link to="/Tranding/BestSellers" onClick={closeMobile}>Best Sellers</Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <i className="fas fa-search search-icon"></i>
          </button>
        </form>

        <Link to="/favorite" className="fav-icon" onClick={closeMobile}>
          <i className="fa-regular fa-heart"></i>
          {favorites.length > 0 && (
            <span className="fav-count">{favorites.length}</span>
          )}
        </Link>

        <Link to="/Bag" className="bag-icon" onClick={closeMobile}>
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>

        {isLoggedIn ? (
          <>
            <button onClick={handleProfileClick} className="profile-icon">
              <i className="fa-regular fa-user"></i>
            </button>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link" onClick={closeMobile}>Login</Link>
            <Link to="/signup" className="signup-link" onClick={closeMobile}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
