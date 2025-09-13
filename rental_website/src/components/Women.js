// import React, { useState, useEffect, useContext } from "react";
// import { Link } from 'react-router-dom';
// import './Women.css';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import { FavoritesContext } from "./FavoritesContext";

// import women_cloth1 from "../imges/women_cloth1.png"
// import women_cloth2 from "../imges/women_cloth2.png"
// import women_cloth3 from "../imges/women_cloth3.png"
// import women_cloth4 from "../imges/women_cloth4.png"
// import women_cloth5 from "../imges/women_cloth5.png"
// import women_cloth6 from "../imges/women_cloth6.png"
// import women_cloth7 from "../imges/women_cloth7.png"
// import women_cloth8 from "../imges/women_cloth8.png"
// import women_cloth9 from "../imges/women_cloth9.png"
// import women_cloth10 from "../imges/women_cloth10.png"
// import women_cloth11 from "../imges/women_cloth11.png"

// const PRODUCTS = [
//     { id: 10, name: 'Checked Shirt', category: 'Tops', size: 'S', brand: 'zara', color: 'red', price: 3005, imageUrl: women_cloth9 },
//     { id: 9, name: 'Casual Shirt', category: 'Tops', size: 'M', brand: 'zara', color: 'blue', price: 3000, imageUrl: women_cloth7 },
//     { id: 11, name: 'Denim Shirt', category: 'Tops', size: 'L', brand: 'zara', color: 'blue', price: 3500, imageUrl: women_cloth10 },
//     { id: 19, name: 'Denim Shirt', category: 'Tops', size: 'L', brand: 'allen solley', color: 'blue', price: 2008, imageUrl: women_cloth4 },
//     { id: 12, name: 'White Shirt', category: 'Tops', size: 'M', brand: 'zara', color: 'white', price: 4000, imageUrl: women_cloth11 },
//     { id: 15, name: 'Casual Shirt', category: 'Tops', size: 'S', brand: 'zara', color: 'blue', price: 3000, imageUrl: women_cloth1 },
//     { id: 16, name: 'Slim Fit Shirt', category: 'slim', size: 'L', brand: 'h&m', color: 'black', price: 3000, imageUrl: women_cloth11 },
//     { id: 17, name: 'Slim Fit Shirt', category: 'fit', size: 'S', brand: 'Zudio', color: 'black', price: 3500, imageUrl: women_cloth2 },
//     { id: 18, name: 'Checked Shirt', category: 'Tops', size: 'M', brand: 'us polo', color: 'red', price: 4000, imageUrl: women_cloth3 },
//     { id: 20, name: 'White Shirt', category: 'Tops', size: 'M', brand: 'red tape', color: 'white', price: 5005, imageUrl: women_cloth5 },
//     { id: 8, name: 'Printed Shirt', category: 'Tops', size: 'XL', brand: 'arrow', color: 'black', price: 2500, imageUrl: women_cloth6 },
//     { id: 13, name: 'Printed Shirt', category: 'Tops', size: 'XL', brand: 'zara', color: 'black', price: 2008, imageUrl: women_cloth11 },
//     { id: 14, name: 'Printed Shirt', category: 'Tops', size: 'XL', brand: 'zara', color: 'black', price: 5005, imageUrl: women_cloth11 },
// ];

// const PRICE_RANGES = [
//     { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
//     { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
//     { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
// ];

// export const Women = () => {
//     const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
//     const [activeFilters, setActiveFilters] = useState({
//         brand: [],
//         category: [],
//         size: [],
//         color: [],
//         price: [],
//     });

//     const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

//     const getUniqueOptions = (key) => [...new Set(PRODUCTS.map(p => p[key]))].sort();
//     const allCategories = getUniqueOptions('category');
//     const allbrand = getUniqueOptions('brand');
//     const allSizes = getUniqueOptions('size');
//     const allColors = getUniqueOptions('color');

//     useEffect(() => {
//         let newFilteredProducts = PRODUCTS;

//         Object.keys(activeFilters).forEach(filterType => {
//             if (activeFilters[filterType].length > 0) {
//                 if (filterType === "price") {
//                     newFilteredProducts = newFilteredProducts.filter(p =>
//                         activeFilters.price.some(priceKey => {
//                             const range = PRICE_RANGES.find(r => r.value === priceKey);
//                             return p.price >= range.min && p.price < range.max;
//                         })
//                     );
//                 } else {
//                     newFilteredProducts = newFilteredProducts.filter(p =>
//                         activeFilters[filterType].includes(p[filterType])
//                     );
//                 }
//             }
//         });

//         setFilteredProducts(newFilteredProducts);
//     }, [activeFilters]);

//     const handleFilterChange = (filterType, value) => {
//         setActiveFilters(prev => {
//             const isSelected = prev[filterType].includes(value);
//             if (isSelected) {
//                 return { ...prev, [filterType]: prev[filterType].filter(item => item !== value) };
//             } else {
//                 return { ...prev, [filterType]: [...prev[filterType], value] };
//             }
//         });
//     };

//     const handleClearFilters = () => {
//         setActiveFilters({ category: [], brand: [], size: [], color: [], price: [] });
//     };

//     const FilterSection = ({ title, options, filterType }) => (
//         <div className="filter-section">
//             <h3>{title}</h3>
//             {options.map(option => (
//                 <label key={option} className="filter-item">
//                     <input
//                         type="checkbox"
//                         checked={activeFilters[filterType].includes(option)}
//                         onChange={() => handleFilterChange(filterType, option)}
//                     />
//                     {option.charAt(0).toUpperCase() + option.slice(1)}
//                 </label>
//             ))}
//         </div>
//     );

//     const PriceFilterSection = () => (
//         <div className="filter-section">
//             <h3>Price</h3>
//             {PRICE_RANGES.map(range => (
//                 <label key={range.value} className="filter-item">
//                     <input
//                         type="checkbox"
//                         checked={activeFilters.price.includes(range.value)}
//                         onChange={() => handleFilterChange("price", range.value)}
//                     />
//                     {range.label}
//                 </label>
//             ))}
//         </div>
//     );

//     const ProductCard = ({ product }) => {
//         const liked = isFavorite(product.id);

//         return (
//             <Link to={`/Product/${product.id}`} className="product-card-link">
//                 <div className="product-card">
//                     <div
//                         className="like-button"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             toggleFavorite(product);
//                         }}
//                         style={{ cursor: "pointer" }}
//                     >
//                         <svg
//                             width="25px"
//                             height="25px"
//                             viewBox="0 0 24 24"
//                             fill={liked ? "red" : "none"}
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
//                                 stroke={liked ? "red" : "#000000"}
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </div>
//                     <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         className="product-image"
//                     />
//                     <div className="product-details">
//                         <h2 className="product-brand">{product.brand}</h2>
//                         <h3 className="product-name">{product.name}</h3>
//                         <h3 className="product-price">₹{product.price}</h3>
//                     </div>
//                 </div>
//             </Link>
//         );
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="women-section">
//                 <header className="page-header">
//                     <h1>Women's Clothing</h1>
//                 </header>

//                 <div className="main-content">
//                     <aside className="filter-sidebar">
//                         <div className="filter-header">
//                             <h2>Filters</h2>
//                             <button onClick={handleClearFilters} className="clear-button">
//                                 Clear All
//                             </button>
//                         </div>
//                         <FilterSection title="Category" options={allCategories} filterType="category" />
//                         <FilterSection title="Brand" options={allbrand} filterType="brand" />
//                         <FilterSection title="Size" options={allSizes} filterType="size" />
//                         <FilterSection title="Color" options={allColors} filterType="color" />
//                         <PriceFilterSection />
//                     </aside>
//                     <div className="product-grid">
//                         {filteredProducts.map((product) => (
//                             <ProductCard key={product.id} product={product} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };























import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Women.css";
import Navbar from "./Navbar";
import RelatedItem from './RelatedItem';

import Footer from "./Footer";
import { FavoritesContext } from "./FavoritesContext";

import women_cloth1 from "../imges/women_cloth1.png";
import women_cloth2 from "../imges/women_cloth2.png";
import women_cloth3 from "../imges/women_cloth3.png";
import women_cloth4 from "../imges/women_cloth4.png";
import women_cloth5 from "../imges/women_cloth5.png";
import women_cloth6 from "../imges/women_cloth6.png";
import women_cloth7 from "../imges/women_cloth7.png";

import women_cloth9 from "../imges/women_cloth9.png";
import women_cloth10 from "../imges/women_cloth10.png";
import women_cloth11 from "../imges/women_cloth11.png";

const PRODUCTS = [
  { id: 10, name: "Checked Shirt", category: "jeans", size: "S", brand: "zara", color: "red", price: 3005, imageUrl: women_cloth9 },
  { id: 9, name: "Casual Shirt", category: "jeans", size: "M", brand: "zara", color: "blue", price: 3000, imageUrl: women_cloth7 },
  { id: 11, name: "Denim Shirt", category: "dresses", size: "L", brand: "zara", color: "blue", price: 3500, imageUrl: women_cloth10 },
  { id: 19, name: "Denim Shirt", category: "dresses", size: "L", brand: "allen solley", color: "blue", price: 2008, imageUrl: women_cloth4 },
  { id: 12, name: "White Shirt", category: "Tops", size: "M", brand: "zara", color: "white", price: 4000, imageUrl: women_cloth11 },
  { id: 15, name: "Casual Shirt", category: "Tops", size: "S", brand: "zara", color: "blue", price: 3000, imageUrl: women_cloth1 },
  { id: 16, name: "Slim Fit Shirt", category: "shoes", size: "L", brand: "h&m", color: "black", price: 3000, imageUrl: women_cloth11 },
  { id: 17, name: "Slim Fit Shirt", category: "shoes", size: "S", brand: "Zudio", color: "black", price: 3500, imageUrl: women_cloth2 },
  { id: 18, name: "Checked Shirt", category: "Tops", size: "M", brand: "us polo", color: "red", price: 4000, imageUrl: women_cloth3 },
  { id: 20, name: "White Shirt", category: "Tops", size: "M", brand: "red tape", color: "white", price: 5005, imageUrl: women_cloth5 },
  { id: 8, name: "Printed Shirt", category: "Tops", size: "XL", brand: "arrow", color: "black", price: 2500, imageUrl: women_cloth6 },
  { id: 13, name: "Printed Shirt", category: "Tops", size: "XL", brand: "zara", color: "black", price: 2008, imageUrl: women_cloth11 },
  { id: 14, name: "Printed Shirt", category: "Tops", size: "XL", brand: "zara", color: "black", price: 5005, imageUrl: women_cloth11 },
];

const PRICE_RANGES = [
  { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
  { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
  { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
];

export const Women = () => {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    category: [],
    size: [],
    color: [],
    price: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

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
          newFilteredProducts = newFilteredProducts.filter((p) => activeFilters[filterType].includes(p[filterType]));
        }
      }
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // reset to first page on filter change
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

  // ✅ Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
      <div className="women-section">
        <header className="page-header">
          <h1>Women's Clothing</h1>
        </header>

        <div className="main-content">
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

          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* ✅ Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
           « Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next »
          </button>
        </div>
      </div>
  
      <Footer />
    </>
  );
};
