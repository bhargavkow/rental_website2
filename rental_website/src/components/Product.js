import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";


import Navbar from "./Navbar";
import Footer from "./Footer";

import "./Product.css";

import men_shirt1 from "../imges/men_shirt1.png";
import men_shirt2 from "../imges/men_shirt2.png";
import men_shirt3 from "../imges/men_shirt3.png";
import men_shirt4 from "../imges/men_shirt4.png";
import men_shirt5 from "../imges/men_shirt5.png";
import men_shirt6 from "../imges/men_shirt6.png";

import women_cloth1 from "../imges/women_cloth1.png";
import women_cloth2 from "../imges/women_cloth2.png";
import women_cloth3 from "../imges/women_cloth3.png";
import women_cloth4 from "../imges/women_cloth4.png";
import women_cloth5 from "../imges/women_cloth5.png";
import women_cloth6 from "../imges/women_cloth6.png";
import women_cloth7 from "../imges/women_cloth7.png";
import women_cloth8 from "../imges/women_cloth8.png";
import women_cloth9 from "../imges/women_cloth9.png";
import women_cloth10 from "../imges/women_cloth10.png";
import women_cloth11 from "../imges/women_cloth11.png";

import children_cloth1 from "../imges/children_cloth1.png";
import children_cloth2 from "../imges/children_cloth2.png";
import children_cloth3 from "../imges/children_cloth3.png";
import children_cloth4 from "../imges/children_cloth4.png";
import children_cloth5 from "../imges/children_cloth5.png";
import children_cloth6 from "../imges/children_cloth6.png";
import children_cloth7 from "../imges/children_cloth7.png";
import children_cloth9 from "../imges/children_cloth9.png";
import children_cloth10 from "../imges/children_cloth10.png";
import children_cloth11 from "../imges/children_cloth11.png";

const ALL_PRODUCTS = [
  { id: 1, name: "Casual Shirt", description: "Comfortable casual shirt for daily wear", fabric_type: "Cotton", manufacturer_name: "H&M", rental_days: 7, stock_quantity: 5, security_deposit: 1000, color: "blue", size: ["S","M","L"], rental_price: 499, imageUrl: men_shirt1, gallery: [men_shirt1, men_shirt2, men_shirt3] },
  { id: 2, name: "Slim Fit Shirt", description: "Elegant slim fit shirt perfect for office", fabric_type: "Rayon", manufacturer_name: "H&M", rental_days: 5, stock_quantity: 10, security_deposit: 1200, color: "black", size: ["L"], rental_price: 300, imageUrl: men_shirt6, gallery: [men_shirt6, men_shirt5, men_shirt4] },
  { id: 3, name: "Slim Fit Shirt", description: "Lightweight slim fit shirt for casual events", fabric_type: "Satin", manufacturer_name: "Zudio", rental_days: 6, stock_quantity: 8, security_deposit: 1100, color: "black", size: ["S"], rental_price: 350, imageUrl: men_shirt2, gallery: [men_shirt2, men_shirt3, men_shirt1] },
  { id: 4, name: "Checked Shirt", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "US Polo", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "red", size: ["M"], rental_price: 400, imageUrl: men_shirt3, gallery: [men_shirt3, men_shirt4, men_shirt5] },
  { id: 5, name: "Denim Shirt", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Allen Solley", rental_days: 7, stock_quantity: 12, security_deposit: 1300, color: "blue", size: ["L"], rental_price: 500, imageUrl: men_shirt4, gallery: [men_shirt4, men_shirt5, men_shirt6] },
  { id: 6, name: "White Shirt", description: "Classic white shirt for formal occasions", fabric_type: "Linen", manufacturer_name: "Red Tape", rental_days: 5, stock_quantity: 7, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: men_shirt5, gallery: [men_shirt5, men_shirt6, men_shirt1] },
  { id: 7, name: "Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: men_shirt6, gallery: [men_shirt6, men_shirt1, men_shirt2] },
  { id: 8, name: "Women's Casual Top", description: "Comfortable casual top for daily wear", fabric_type: "Cotton", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 10, security_deposit: 800, color: "blue", size: ["S"], rental_price: 300, imageUrl: women_cloth1, gallery: [women_cloth1, women_cloth2, women_cloth3] },
  { id: 9, name: "Women's Slim Fit Top", description: "Elegant slim fit top perfect for office", fabric_type: "Rayon", manufacturer_name: "H&M", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: women_cloth11, gallery: [women_cloth7, women_cloth5, women_cloth4] },
  { id: 10, name: "Women's Slim Fit Shirt", description: "Lightweight slim fit shirt for casual events", fabric_type: "Satin", manufacturer_name: "Zudio", rental_days: 7, stock_quantity: 6, security_deposit: 1000, color: "black", size: ["S","M","L"], rental_price: 400, imageUrl: women_cloth2, gallery: [women_cloth9, women_cloth3, women_cloth1] },
  { id: 11, name: "Women's Checked Shirt", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "US Polo", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["M"], rental_price: 450, imageUrl: women_cloth3, gallery: [women_cloth10, women_cloth4, women_cloth5] },
  { id: 12, name: "Women's Denim Shirt", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Allen Solley", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: women_cloth4, gallery: [women_cloth11, women_cloth5, women_cloth6] },
  { id: 13, name: "Women's White Top", description: "Classic white top for formal occasions", fabric_type: "Linen", manufacturer_name: "Red Tape", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: women_cloth5, gallery: [women_cloth11, women_cloth6, women_cloth1] },
  { id: 14, name: "Women's Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: women_cloth6, gallery: [women_cloth11, women_cloth1, women_cloth2] },
  { id: 15, name: "Women's Slim Fit Top", description: "Elegant slim fit top for office", fabric_type: "Rayon", manufacturer_name: "H&M", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: women_cloth11, gallery: [women_cloth1, women_cloth5, women_cloth4] },
  { id: 16, name: "Women's Slim Fit Shirt", description: "Lightweight slim fit shirt for casual events", fabric_type: "Satin", manufacturer_name: "Zudio", rental_days: 7, stock_quantity: 6, security_deposit: 1000, color: "black", size: ["S"], rental_price: 400, imageUrl: women_cloth2, gallery: [women_cloth11, women_cloth3, women_cloth1] },
  { id: 17, name: "Women's Checked Shirt", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "US Polo", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["M"], rental_price: 450, imageUrl: women_cloth3, gallery: [women_cloth2, women_cloth4, women_cloth5] },
  { id: 18, name: "Women's Denim Shirt", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Allen Solley", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: women_cloth4, gallery: [women_cloth3, women_cloth5, women_cloth6] },
  { id: 19, name: "Women's White Top", description: "Classic white top for formal occasions", fabric_type: "Linen", manufacturer_name: "Red Tape", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: women_cloth5, gallery: [women_cloth4, women_cloth6, women_cloth1] },
  { id: 20, name: "Women's Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: women_cloth6, gallery: [women_cloth5, women_cloth1, women_cloth2] },
  { id: 77, name: "Women's Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: women_cloth6, gallery: [women_cloth5, women_cloth1, women_cloth2] },

  { id: 21, name: "Casual Shirt (Men)", description: "Comfortable casual shirt for daily wear", fabric_type: "Cotton", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 10, security_deposit: 800, color: "blue", size: ["S"], rental_price: 300, imageUrl: children_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 22, name: "Slim Fit Shirt (Men)", description: "Elegant slim fit shirt perfect for office", fabric_type: "Rayon", manufacturer_name: "H&M", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: children_cloth2, gallery: [children_cloth2, women_cloth1, women_cloth2] },
  { id: 23, name: "Slim Fit Shirt (Men)", description: "Lightweight slim fit shirt for casual events", fabric_type: "Satin", manufacturer_name: "Zudio", rental_days: 7, stock_quantity: 6, security_deposit: 1000, color: "black", size: ["S"], rental_price: 400, imageUrl: children_cloth3, gallery: [children_cloth3, women_cloth1, women_cloth2] },
  { id: 24, name: "Checked Shirt (Men)", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "US Polo", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["M"], rental_price: 450, imageUrl: children_cloth4, gallery: [children_cloth4, women_cloth1, women_cloth2] },
  { id: 25, name: "Denim Shirt (Men)", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Allen Solley", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: children_cloth5, gallery: [children_cloth5, women_cloth1, women_cloth2] },
  { id: 26, name: "White Shirt (Men)", description: "Classic white shirt for formal occasions", fabric_type: "Linen", manufacturer_name: "Red Tape", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: children_cloth6, gallery: [children_cloth6, women_cloth1, women_cloth2] },
  { id: 27, name: "Printed Shirt (Men)", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: children_cloth7, gallery: [children_cloth7, women_cloth1, women_cloth2] },
  { id: 28, name: "Casual Shirt (Men)", description: "Comfortable casual shirt for daily wear", fabric_type: "Cotton", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 10, security_deposit: 800, color: "blue", size: ["M"], rental_price: 300, imageUrl: children_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 29, name: "Slim Fit Shirt (Men)", description: "Elegant slim fit shirt perfect for office", fabric_type: "Rayon", manufacturer_name: "Zara", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: children_cloth9, gallery: [children_cloth9, women_cloth1, women_cloth2] },
  { id: 30, name: "Checked Shirt (Men)", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["S"], rental_price: 450, imageUrl: children_cloth10, gallery: [children_cloth10, women_cloth1, women_cloth2] },
  { id: 31, name: "Denim Shirt (Men)", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Zara", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: children_cloth11, gallery: [children_cloth11, women_cloth1, women_cloth2] },
  { id: 32, name: "White Shirt (Men)", description: "Classic white shirt for formal occasions", fabric_type: "Linen", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: children_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 33, name: "Printed Shirt (Men)", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Zara", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: children_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },

  { id: 34, name: "Women's Top", description: "Comfortable casual top for daily wear", fabric_type: "Cotton", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 10, security_deposit: 800, color: "blue", size: ["S"], rental_price: 300, imageUrl: women_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 35, name: "Men's Slim Fit Shirt", description: "Elegant slim fit shirt perfect for office", fabric_type: "Rayon", manufacturer_name: "H&M", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: men_shirt3, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 36, name: "Children's Slim Fit Shirt", description: "Lightweight slim fit shirt for casual events", fabric_type: "Satin", manufacturer_name: "Zudio", rental_days: 7, stock_quantity: 6, security_deposit: 1000, color: "black", size: ["S"], rental_price: 400, imageUrl: children_cloth1, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 37, name: "Children's Checked Shirt", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "US Polo", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["M"], rental_price: 450, imageUrl: children_cloth2, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 38, name: "Men's Denim Shirt", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Allen Solley", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: men_shirt3, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 39, name: "Men's White Shirt", description: "Classic white shirt for formal occasions", fabric_type: "Linen", manufacturer_name: "Red Tape", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: men_shirt4, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 40, name: "Women's Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Arrow", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: women_cloth10, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 41, name: "Women's Casual Top", description: "Comfortable casual top for daily wear", fabric_type: "Cotton", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 10, security_deposit: 800, color: "blue", size: ["M"], rental_price: 300, imageUrl: women_cloth7, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 42, name: "Women's Slim Fit Shirt", description: "Elegant slim fit shirt perfect for office", fabric_type: "Rayon", manufacturer_name: "Zara", rental_days: 6, stock_quantity: 8, security_deposit: 900, color: "black", size: ["L"], rental_price: 350, imageUrl: women_cloth8, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 43, name: "Women's Checked Shirt", description: "Classic checked shirt for formal occasions", fabric_type: "Flannel", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 5, security_deposit: 800, color: "red", size: ["S"], rental_price: 450, imageUrl: women_cloth9, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 44, name: "Women's Denim Shirt", description: "Stylish denim shirt with modern fit", fabric_type: "Denim", manufacturer_name: "Zara", rental_days: 7, stock_quantity: 7, security_deposit: 1100, color: "blue", size: ["L"], rental_price: 500, imageUrl: women_cloth10, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 45, name: "Women's White Shirt", description: "Classic white shirt for formal occasions", fabric_type: "Linen", manufacturer_name: "Zara", rental_days: 5, stock_quantity: 6, security_deposit: 900, color: "white", size: ["M"], rental_price: 350, imageUrl: women_cloth11, gallery: [children_cloth1, women_cloth1, women_cloth2] },
  { id: 46, name: "Women's Printed Shirt", description: "Casual printed shirt for outings", fabric_type: "Viscose", manufacturer_name: "Zara", rental_days: 6, stock_quantity: 9, security_deposit: 1000, color: "black", size: ["XL"], rental_price: 450, imageUrl: women_cloth11, gallery: [children_cloth1, women_cloth1, women_cloth2] }
];

// Product Component
const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [rentalStartDate, setRentalStartDate] = useState("");

  const { addToCart } = useCart();


  useEffect(() => {
    const foundProduct = ALL_PRODUCTS.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    setActiveIndex(0);

    if (foundProduct) {
      if (foundProduct.size && foundProduct.size.length > 0) {
        setSelectedSize(foundProduct.size[0]);
      } else {
        setSelectedSize("Free Size");
      }
    }
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product__page not-found">
          <p>Product not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    if (!rentalStartDate) {
      alert("Please select rental start date!");
      return;
    }

    const productWithDetails = {
      ...product,
      selectedSize,
      rentalStartDate,
    };

    addToCart(productWithDetails);
    alert("Product added to bag!");
  };

  return (
    <>
      <Navbar />
      <main className="product__page">
        <section className="product__gallery">
          <div className="product__thumbs">
            {product.gallery.filter(Boolean).map((src, i) => (
              <button
                key={i}
                className={`thumb ${i === activeIndex ? "is-active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <img src={src} alt={`${product.name} - view ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className="product__mainimg">
            <img src={product.gallery[activeIndex]} alt={product.name} />
          </div>
        </section>

        <section className="product__details">
          <h1 className="title"><strong>{product.manufacturer_name}</strong></h1>
          <h2 className="title">{product.name}</h2>
          

          <div className="offers">
            <h3>Product Details</h3>
            <ul>
              <li>{product.description}</li>
              <li>Fabric: {product.fabric_type}</li>
              <li>Color: {product.color}</li>
              <li>Stock: {product.stock_quantity}</li>
              <li>Rental Price: ₹{product.rental_price}</li>
              <li>Security Deposit: ₹{product.security_deposit}</li>
              <li>Rental Days: {product.rental_days}</li>
            </ul>
          </div>

          <div className="product__size">
            <label>Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.size && product.size.length > 0 ? (
                product.size.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))
              ) : (
                <option value="Free Size">Free Size</option>
              )}
            </select>
          </div>

          
          <div className="product__dates">
            <label>Rental Start Date:</label>
            <input
              type="date"
              value={rentalStartDate}
              onChange={(e) => setRentalStartDate(e.target.value)}
            />
          </div>

         
          <div className="cta">
            <button className="btn btn-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="btn btn-buy"
              onClick={() => navigate("/buy", { state: { product } })}
            >
              Buy Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};


export { ALL_PRODUCTS };
export default Product;