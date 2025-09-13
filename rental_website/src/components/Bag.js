import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Bag.css";

const Bag = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = (cart || []).reduce(
    (total, item) => total + (item.rental_price || 0) * (item.quantity || 1),
    0
  );


  const handleBuyNow = (item) => {
    navigate(`/buy/${item.id}`, { state: { product: item } });
  };

  return (
    <>
      <Navbar />
      <div className="bag__container">
        <h1>Your Shopping Bag 👜</h1>
        {cart && cart.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <div className="bag__list">
            {cart.map((item) => (
              <div key={item.id} className="bag__item">
                <img
                  src={item.imageUrl || item.image_url || item.image || ""}
                  alt={item.name}
                  className="bag__img"
                />
                <div className="details">
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.rental_price}</p>
                  <p>Quantity: {item.quantity}</p>

                  <button
                    className="bag-remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                  <button
                    className="buynow-button-from-bag"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
            <div className="bag__total">
              <h2>Total: ₹{totalPrice}</h2>
              <button
                className="buyall-button"
                onClick={() => navigate("/Buy", { state: { product: cart } })
                }
              >
                Buy All
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bag;


