import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Favorite.css";

const Favorite = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <>
            <Navbar />
            <div className="favorites-page">
                <h1>My Favorites ❤️</h1>
                {favorites.length === 0 ? (
                    <p>No favorite items yet.</p>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((product) => (
                            <div key={product.id} className="favorite-card">
                                <img src={product.imageUrl} alt={product.name} />
                                <h2>{product.brand}</h2>
                                <p>{product.name}</p>
                                <p>₹{product.price}</p>
                                <Link to={`/product/${product.id}`}>View</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Favorite;
