import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ALL_PRODUCTS } from "./Product";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase();

  const filteredProducts = ALL_PRODUCTS.filter((p) =>
    (p.name || "").toLowerCase().includes(query)
  );

  const getPrice = (product) => {
    return (
      product.price ||
      product.rental_price ||
      product.rentalPrice ||
      0
    );
  };

  const getImage = (product) => {
    return product.imageUrl || product.image_url || product.image || "";
  };

  return (
    <>
      <Navbar />
      <div className="search-results">
        <h2>Search Results for "{query}"</h2>
        {filteredProducts.length > 0 ? (
          <div className="results-grid">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="result-card"
              >
                <img src={getImage(product)} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{getPrice(product)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
