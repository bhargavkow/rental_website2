// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import "./Men.css";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { FavoritesContext } from "./FavoritesContext";

// import Stylehubvideo from "./Stylehubvideo";
// import men_shirt1 from "../imges/men_shirt1.png";
// import men_shirt2 from "../imges/men_shirt2.png";
// import men_shirt3 from "../imges/men_shirt3.png";
// import men_shirt4 from "../imges/men_shirt4.png";
// import men_shirt5 from "../imges/men_shirt5.png";
// import men_shirt6 from "../imges/men_shirt6.png";

// const PRODUCTS = [
//   { id: 1, name: "Casual Shirt", category: "Tops", size: "S", brand: "Zara", color: "Blue", price: 2500, imageUrl: men_shirt1 },
//   { id: 2, name: "Slim Fit Shirt", category: "Slim", size: "L", brand: "H&M", color: "Black", price: 3000, imageUrl: men_shirt6 },
//   { id: 3, name: "Slim Fit Shirt", category: "Fit", size: "S", brand: "Zudio", color: "Black", price: 3000, imageUrl: men_shirt2 },
//   { id: 4, name: "Checked Shirt", category: "Tops", size: "M", brand: "US Polo", color: "Red", price: 3500, imageUrl: men_shirt3 },
//   { id: 5, name: "Denim Shirt", category: "Tops", size: "L", brand: "Allen Solly", color: "Blue", price: 4000, imageUrl: men_shirt4 },
//   { id: 6, name: "White Shirt", category: "Tops", size: "M", brand: "Red Tape", color: "White", price: 2008, imageUrl: men_shirt5 },
//   { id: 7, name: "Printed Shirt", category: "Tops", size: "XL", brand: "Arrow", color: "Black", price: 5005, imageUrl: men_shirt6 },
//   { id: 8, name: "Casual Shirt", category: "Tops", size: "S", brand: "Zara", color: "Blue", price: 2500, imageUrl: men_shirt1 },
//   { id: 9, name: "Slim Fit Shirt", category: "Slim", size: "L", brand: "H&M", color: "Black", price: 3000, imageUrl: men_shirt6 },
//   { id: 10, name: "Slim Fit Shirt", category: "Fit", size: "S", brand: "Zudio", color: "Black", price: 3000, imageUrl: men_shirt2 },
//   { id: 11, name: "Checked Shirt", category: "Tops", size: "M", brand: "US Polo", color: "Red", price: 3500, imageUrl: men_shirt3 },
//   { id: 12, name: "Denim Shirt", category: "Tops", size: "L", brand: "Allen Solly", color: "Blue", price: 4000, imageUrl: men_shirt4 },
//   { id: 13, name: "White Shirt", category: "Tops", size: "M", brand: "Red Tape", color: "White", price: 2008, imageUrl: men_shirt5 },
//   { id: 14, name: "Printed Shirt", category: "Tops", size: "XL", brand: "Arrow", color: "Black", price: 5005, imageUrl: men_shirt6 },
// ];

// const PRICE_RANGES = [
//   { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
//   { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
//   { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
// ];

// export const Men = () => {
//   const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
//   const [activeFilters, setActiveFilters] = useState({
//     brand: [],
//     category: [],
//     size: [],
//     color: [],
//     price: [],
//   });

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;

//   const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

//   const getUniqueOptions = (key) => [...new Set(PRODUCTS.map((p) => p[key]))].sort();
//   const allCategories = getUniqueOptions("category");
//   const allBrands = getUniqueOptions("brand");
//   const allSizes = getUniqueOptions("size");
//   const allColors = getUniqueOptions("color");

//   useEffect(() => {
//     let newFilteredProducts = PRODUCTS;
//     Object.keys(activeFilters).forEach((filterType) => {
//       if (activeFilters[filterType].length > 0) {
//         if (filterType === "price") {
//           newFilteredProducts = newFilteredProducts.filter((p) =>
//             activeFilters.price.some((priceKey) => {
//               const range = PRICE_RANGES.find((r) => r.value === priceKey);
//               return p.price >= range.min && p.price < range.max;
//             })
//           );
//         } else {
//           newFilteredProducts = newFilteredProducts.filter((p) =>
//             activeFilters[filterType].includes(p[filterType])
//           );
//         }
//       }
//     });
//     setFilteredProducts(newFilteredProducts);
//     setCurrentPage(1); // reset to page 1 after filters applied
//   }, [activeFilters]);

//   const handleFilterChange = (filterType, value) => {
//     setActiveFilters((prev) => {
//       const isSelected = prev[filterType].includes(value);
//       return isSelected
//         ? { ...prev, [filterType]: prev[filterType].filter((item) => item !== value) }
//         : { ...prev, [filterType]: [...prev[filterType], value] };
//     });
//   };

//   const handleClearFilters = () => {
//     setActiveFilters({ category: [], brand: [], size: [], color: [], price: [] });
//   };

//   const FilterSection = ({ title, options, filterType }) => (
//     <div className="filter-section">
//       <h3>{title}</h3>
//       {options.map((option) => (
//         <label key={option} className="filter-item">
//           <input
//             type="checkbox"
//             checked={activeFilters[filterType].includes(option)}
//             onChange={() => handleFilterChange(filterType, option)}
//           />
//           {option}
//         </label>
//       ))}
//     </div>
//   );

//   const PriceFilterSection = () => (
//     <div className="filter-section">
//       <h3>Price</h3>
//       {PRICE_RANGES.map((range) => (
//         <label key={range.value} className="filter-item">
//           <input
//             type="checkbox"
//             checked={activeFilters.price.includes(range.value)}
//             onChange={() => handleFilterChange("price", range.value)}
//           />
//           {range.label}
//         </label>
//       ))}
//     </div>
//   );

//   const ProductCard = ({ product }) => {
//     const liked = isFavorite(product.id);

//     return (
//       <Link to={`/product/${product.id}`} className="product-card-link">
//         <div className="product-card">
//           <div
//             className="like-button"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               toggleFavorite(product);
//             }}
//           >
//             <svg
//               width="25px"
//               height="25px"
//               viewBox="0 0 24 24"
//               fill={liked ? "red" : "none"}
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
//                 stroke={liked ? "red" : "#000000"}
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <img src={product.imageUrl} alt={product.name} className="product-image" />
//           <div className="product-details">
//             <h2 className="product-brand">{product.brand}</h2>
//             <h3 className="product-name">{product.name}</h3>
//             <h3 className="product-price">₹{product.price}</h3>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <>
//       <Navbar />
//       <div className="men-section">
//         <header className="page-header">
//           <h1>Men's Clothing</h1>
//         </header>
//         <div className="main-content">
//           <aside className="filter-sidebar">
//             <div className="filter-header">
//               <h2>Filters</h2>
//               <button onClick={handleClearFilters} className="clear-button">
//                 Clear All
//               </button>
//             </div>
//             <FilterSection title="Category" options={allCategories} filterType="category" />
//             <FilterSection title="Brand" options={allBrands} filterType="brand" />
//             <FilterSection title="Size" options={allSizes} filterType="size" />
//             <FilterSection title="Color" options={allColors} filterType="color" />
//             <PriceFilterSection />
//           </aside>
//           <div className="product-grid">
//             {currentProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//             {currentProducts.length === 0 && <p>No products found.</p>}
//           </div>
//         </div>

//         {/* Pagination controls */}
//         <div className="pagination">
//           <button
//             className="pagination-btn"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//            « Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             className="pagination-btn"
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next »
//           </button>
//         </div>
//       </div>
      
//       <Footer />
//     </>
//   );
// };








import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Men.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FavoritesContext } from "./FavoritesContext";

const PRICE_RANGES = [
  { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
  { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
  { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
];

export const Men = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    category: [],
    size: [],
    color: [],
    price: [],
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  // Fetch products from the API
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
    if (token) {
      axios
        .get("http://192.168.1.10:5000/cloths/category/men", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data); // Debugging log
          setFilteredProducts(response.data); // Set the fetched products to state
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      console.error("No token found, please log in.");
    }
  }, []);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const isSelected = prev[filterType].includes(value);
      return isSelected
        ? { ...prev, [filterType]: prev[filterType].filter((item) => item !== value) }
        : { ...prev, [filterType]: [...prev[filterType], value] };
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({ category: [], brand: [], size: [], color: [], price: [] });
  };

  // Apply filters to products
  useEffect(() => {
    let newFilteredProducts = filteredProducts;
    Object.keys(activeFilters).forEach((filterType) => {
      if (activeFilters[filterType].length > 0) {
        if (filterType === "price") {
          newFilteredProducts = newFilteredProducts.filter((p) =>
            activeFilters.price.some((priceKey) => {
              const range = PRICE_RANGES.find((r) => r.value === priceKey);
              return p.rental_price >= range.min && p.rental_price < range.max;
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
  }, [activeFilters]);

  // Pagination logic
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
          {option}
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
    const liked = isFavorite(product.cloth_id);

    return (
      <Link to={`/product/${product.cloth_id}`} className="product-card-link">
        <div className="product-card">
          <div
            className="like-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
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
          <img src={product.image_url} alt={product.cloth_name} className="product-image" />
          <div className="product-details">
            <h2 className="product-brand">{product.manufacturer.manufacturer_name}</h2>
            <h3 className="product-name">{product.cloth_name}</h3>
            <p className="product-description">{product.description}</p>
            
            <h3 className="product-price">₹{product.rental_price}</h3>
            {product.stock_quantity <= 0 ? (
              <span className="out-of-stock">Out of Stock</span>
            ) : (
              <span className="in-stock">In Stock: {product.stock_quantity}</span>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <div className="men-section">
        <header className="page-header">
          <h1>Men's Clothing</h1>
        </header>
        <div className="main-content">
          <aside className="filter-sidebar">
            <div className="filter-header">
              <h2>Filters</h2>
              <button onClick={handleClearFilters} className="clear-button">
                Clear All
              </button>
            </div>
            <FilterSection title="Category" options={["Tops", "Slim", "Fit"]} filterType="category" />
            <FilterSection title="Brand" options={["Zara", "H&M", "Zudio", "US Polo"]} filterType="brand" />
            <FilterSection title="Size" options={["S", "M", "L", "XL"]} filterType="size" />
            <FilterSection title="Color" options={["Black", "Blue", "Red", "White"]} filterType="color" />
            <PriceFilterSection />
          </aside>

          <div className="product-grid">
            {currentProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              currentProducts.map((product) => (
                <ProductCard key={product.cloth_id} product={product} />
              ))
            )}
          </div>
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
