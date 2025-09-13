// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import './Tranding.css';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import { FavoritesContext } from "./FavoritesContext";

// // Import all images
// import women_cloth1 from "../imges/women_cloth1.png";
// import women_cloth2 from "../imges/women_cloth2.png";
// import children_cloth1 from "../imges/children_cloth1.png";
// import children_cloth2 from "../imges/children_cloth2.png";
// import men_shirt3 from "../imges/men_shirt3.png";
// import men_shirt4 from "../imges/men_shirt4.png";
// import women_cloth7 from "../imges/women_cloth7.png";
// import women_cloth8 from "../imges/women_cloth8.png";
// import women_cloth9 from "../imges/women_cloth9.png";
// import women_cloth10 from "../imges/women_cloth10.png";
// import women_cloth11 from "../imges/women_cloth11.png";

// const PRODUCTS = [
//     { id: 34, name: 'Women\'s Top', category: 'Tops', size: 'S', brand: 'zara', color: 'blue', price: 2500, imageUrl: women_cloth1 },
//     { id: 35, name: 'Men\'s Slim Fit Shirt', category: 'slim', size: 'L', brand: 'h&m', color: 'black', price: 3000, imageUrl: men_shirt3 },
//     { id: 36, name: 'Children\'s Slim Fit Shirt', category: 'fit', size: 'S', brand: 'Zudio', color: 'black', price: 3000, imageUrl: children_cloth1 },
//     { id: 37, name: 'Children\'s Checked Shirt', category: 'Tops', size: 'M', brand: 'us polo', color: 'red', price: 3500, imageUrl: children_cloth2 },
//     { id: 38, name: 'Men\'s Denim Shirt', category: 'Tops', size: 'L', brand: 'allen solley', color: 'blue', price: 4000, imageUrl: men_shirt3 },
//     { id: 39, name: 'Men\'s White Shirt', category: 'Tops', size: 'M', brand: 'red tape', color: 'white', price: 2008, imageUrl: men_shirt4 },
//     { id: 40, name: 'Women\'s Printed Shirt', category: 'Tops', size: 'XL', brand: 'arrow', color: 'black', price: 5005, imageUrl: women_cloth10 },
//     { id: 41, name: 'Women\'s Casual Top', category: 'Tops', size: 'M', brand: 'zara', color: 'blue', price: 2500, imageUrl: women_cloth7 },
//     { id: 42, name: 'Women\'s Slim Fit Shirt', category: 'Tops', size: 'L', brand: 'zara', color: 'black', price: 3000, imageUrl: women_cloth8 },
//     { id: 43, name: 'Women\'s Checked Shirt', category: 'Tops', size: 'S', brand: 'zara', color: 'red', price: 3005, imageUrl: women_cloth9 },
//     { id: 44, name: 'Women\'s Denim Shirt', category: 'Tops', size: 'L', brand: 'zara', color: 'blue', price: 4000, imageUrl: women_cloth10 },
//     { id: 45, name: 'Women\'s White Shirt', category: 'Tops', size: 'M', brand: 'zara', color: 'white', price: 2800, imageUrl: women_cloth11 },
//     { id: 46, name: 'Women\'s Printed Shirt', category: 'Tops', size: 'XL', brand: 'zara', color: 'black', price: 5500, imageUrl: women_cloth11 },
// ];

// const PRICE_RANGES = [
//     { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
//     { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
//     { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
// ];

// export const Tranding = () => {
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
//             return isSelected
//                 ? { ...prev, [filterType]: prev[filterType].filter(item => item !== value) }
//                 : { ...prev, [filterType]: [...prev[filterType], value] };
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
//             <div className="tranding-section">
//                 <header className="page-header">
//                     <h1>Trending Clothing</h1>
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
import Navbar from './Navbar';
import './Tranding.css';
import Footer from './Footer';
import { FavoritesContext } from "./FavoritesContext";

// Import all images
import women_cloth1 from "../imges/women_cloth1.png";
import women_cloth2 from "../imges/women_cloth2.png";
import children_cloth1 from "../imges/children_cloth1.png";
import children_cloth2 from "../imges/children_cloth2.png";
import men_shirt3 from "../imges/men_shirt3.png";
import men_shirt4 from "../imges/men_shirt4.png";
import women_cloth7 from "../imges/women_cloth7.png";
import women_cloth8 from "../imges/women_cloth8.png";
import women_cloth9 from "../imges/women_cloth9.png";
import women_cloth10 from "../imges/women_cloth10.png";
import women_cloth11 from "../imges/women_cloth11.png";

const PRODUCTS = [
    { id: 34, name: 'Women\'s Top', category: 'Tops', size: 'S', brand: 'zara', color: 'blue', price: 2500, imageUrl: women_cloth1 },
    { id: 35, name: 'Men\'s Slim Fit Shirt', category: 'slim', size: 'L', brand: 'h&m', color: 'black', price: 3000, imageUrl: men_shirt3 },
    { id: 36, name: 'Children\'s Slim Fit Shirt', category: 'fit', size: 'S', brand: 'Zudio', color: 'black', price: 3000, imageUrl: children_cloth1 },
    { id: 37, name: 'Children\'s Checked Shirt', category: 'Tops', size: 'M', brand: 'us polo', color: 'red', price: 3500, imageUrl: children_cloth2 },
    { id: 38, name: 'Men\'s Denim Shirt', category: 'Tops', size: 'L', brand: 'allen solley', color: 'blue', price: 4000, imageUrl: men_shirt3 },
    { id: 39, name: 'Men\'s White Shirt', category: 'Tops', size: 'M', brand: 'red tape', color: 'white', price: 2008, imageUrl: men_shirt4 },
    { id: 40, name: 'Women\'s Printed Shirt', category: 'Tops', size: 'XL', brand: 'arrow', color: 'black', price: 5005, imageUrl: women_cloth10 },
    { id: 41, name: 'Women\'s Casual Top', category: 'Tops', size: 'M', brand: 'zara', color: 'blue', price: 2500, imageUrl: women_cloth7 },
    { id: 42, name: 'Women\'s Slim Fit Shirt', category: 'Tops', size: 'L', brand: 'zara', color: 'black', price: 3000, imageUrl: women_cloth8 },
    { id: 43, name: 'Women\'s Checked Shirt', category: 'Tops', size: 'S', brand: 'zara', color: 'red', price: 3005, imageUrl: women_cloth9 },
    { id: 44, name: 'Women\'s Denim Shirt', category: 'Tops', size: 'L', brand: 'zara', color: 'blue', price: 4000, imageUrl: women_cloth10 },
    { id: 45, name: 'Women\'s White Shirt', category: 'Tops', size: 'M', brand: 'zara', color: 'white', price: 2800, imageUrl: women_cloth11 },
    { id: 46, name: 'Women\'s Printed Shirt', category: 'Tops', size: 'XL', brand: 'zara', color: 'black', price: 5500, imageUrl: women_cloth11 },
];

const PRICE_RANGES = [
    { label: "Under 3000", value: "under3000", min: 0, max: 3000 },
    { label: "3000 - 5000", value: "3000to5000", min: 3000, max: 5000 },
    { label: "Above 5000", value: "above5000", min: 5000, max: Infinity },
];

export const Tranding = () => {
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
    const [activeFilters, setActiveFilters] = useState({
        brand: [],
        category: [],
        size: [],
        color: [],
        price: [],
    });

    const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

    // ✅ Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const getUniqueOptions = (key) => [...new Set(PRODUCTS.map(p => p[key]))].sort();
    const allCategories = getUniqueOptions('category');
    const allbrand = getUniqueOptions('brand');
    const allSizes = getUniqueOptions('size');
    const allColors = getUniqueOptions('color');

    useEffect(() => {
        let newFilteredProducts = PRODUCTS;

        Object.keys(activeFilters).forEach(filterType => {
            if (activeFilters[filterType].length > 0) {
                if (filterType === "price") {
                    newFilteredProducts = newFilteredProducts.filter(p =>
                        activeFilters.price.some(priceKey => {
                            const range = PRICE_RANGES.find(r => r.value === priceKey);
                            return p.price >= range.min && p.price < range.max;
                        })
                    );
                } else {
                    newFilteredProducts = newFilteredProducts.filter(p =>
                        activeFilters[filterType].includes(p[filterType])
                    );
                }
            }
        });
        setFilteredProducts(newFilteredProducts);
        setCurrentPage(1); // reset to page 1 after filter change
    }, [activeFilters]);

    const handleFilterChange = (filterType, value) => {
        setActiveFilters(prev => {
            const isSelected = prev[filterType].includes(value);
            return isSelected
                ? { ...prev, [filterType]: prev[filterType].filter(item => item !== value) }
                : { ...prev, [filterType]: [...prev[filterType], value] };
        });
    };

    const handleClearFilters = () => {
        setActiveFilters({ category: [], brand: [], size: [], color: [], price: [] });
    };

    const FilterSection = ({ title, options, filterType }) => (
        <div className="filter-section">
            <h3>{title}</h3>
            {options.map(option => (
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
            {PRICE_RANGES.map(range => (
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
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="product-details">
                        <h2 className="product-brand">{product.brand}</h2>
                        <h3 className="product-name">{product.name}</h3>
                        <h3 className="product-price">₹{product.price}</h3>
                    </div>
                </div>
            </Link>
        );
    };

    // ✅ Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <>
        <Navbar/>
            <div className="tranding-section">
                <header className="page-header">
                    <h1>Trending Clothing</h1>
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
                        {currentItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* ✅ Pagination UI */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                       « Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next »
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

