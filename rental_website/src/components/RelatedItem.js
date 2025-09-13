import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./RelatedItem.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FavoritesContext } from "./FavoritesContext";

import relateditem from "../imges/relateditem.png";

// ---------------- PRODUCTS -----------------
const PRODUCTS = [
  { id: 77, name: "Casual Shirt", category: "Tops", size: "S", brand: "zara", color: "blue", price: 2500, imageUrl: relateditem },
 ];

// ---------------- PRICE RANGES -----------------
const PRICE_RANGES = [
  { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
  { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
  { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
];

export const Children = () => {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    category: [],
    size: [],
    color: [],
    price: [],
  });

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // show 6 products per page

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  // ---------------- FILTERS -----------------
  const getUniqueOptions = (key) => [...new Set(PRODUCTS.map((p) => p[key]))].sort();
  const allCategories = getUniqueOptions("category");
  const allbrand = getUniqueOptions("brand");
  const allSizes = getUniqueOptions("size");
  const allColors = getUniqueOptions("color");

  useEffect(() => {
    let newFilteredProducts = PRODUCTS;
    Object.keys(activeFilters).forEach((filterType) => {
      if (activeFilters[filterType].length > 0) {
        if (filterType === "price") {
          newFilteredProducts = newFilteredProducts.filter((p) =>
            activeFilters.price.some((priceKey) => {
              const range = PRICE_RANGES.find((r) => r.value === priceKey);
              return p.price >= range.min && p.price < range.max;
            })
          );
        } else {
          newFilteredProducts = newFilteredProducts.filter((p) =>
            activeFilters[filterType].includes(p[filterType])
          );
        }
      }
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // reset to first page when filters change
  }, [activeFilters]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const isSelected = prev[filterType].includes(value);
      if (isSelected) {
        return { ...prev, [filterType]: prev[filterType].filter((item) => item !== value) };
      } else {
        return { ...prev, [filterType]: [...prev[filterType], value] };
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({ category: [], brand: [], size: [], color: [], price: [] });
  };

  // ---------------- PAGINATION -----------------
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // ---------------- COMPONENTS -----------------
  const FilterSection = ({ title, options, filterType }) => (
    <div className="filter-section">
      <h3>{title}</h3>
      {options.map((option) => (
        <label key={option} className="filter-item">
          <input
            type="checkbox"
            checked={activeFilters[filterType].includes(option)}
            onChange={() => handleFilterChange(filterType, option)}
          />
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </label>
      ))}
    </div>
  );

  const PriceFilterSection = () => (
    <div className="filter-section">
      <h3>Price</h3>
      {PRICE_RANGES.map((range) => (
        <label key={range.value} className="filter-item">
          <input
            type="checkbox"
            checked={activeFilters.price.includes(range.value)}
            onChange={() => handleFilterChange("price", range.value)}
          />
          {range.label}
        </label>
      ))}
    </div>
  );

  const ProductCard = ({ product }) => {
    const liked = isFavorite(product.id);

    return (
      <Link to={`/Product/${product.id}`} className="product-card-link">
        <div className="product-card">
          <div
            className="like-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            style={{ cursor: "pointer" }}
          >
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill={liked ? "red" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke={liked ? "red" : "#000000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2 className="product-brand">{product.brand}</h2>
            <h3 className="product-name">{product.name}</h3>
            <h3 className="product-price">₹{product.price}</h3>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <div className="children-section">
        <header className="page-header">
          <h1>Children's Clothing</h1>
        </header>
        <div className="main-content">
          {/* ---------- FILTERS ---------- */}
          <aside className="filter-sidebar">
            <div className="filter-header">
              <h2>Filters</h2>
              <button onClick={handleClearFilters} className="clear-button">
                Clear All
              </button>
            </div>
            <FilterSection title="Category" options={allCategories} filterType="category" />
            <FilterSection title="Brand" options={allbrand} filterType="brand" />
            <FilterSection title="Size" options={allSizes} filterType="size" />
            <FilterSection title="Color" options={allColors} filterType="color" />
            <PriceFilterSection />
          </aside>

          {/* ---------- PRODUCTS ---------- */}
          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* ---------- PAGINATION ---------- */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">
            « Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages} className="page-btn">
            Next »
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

