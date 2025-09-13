import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Confirmorder.css";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderPayload = location.state?.orderPayload || JSON.parse(localStorage.getItem('orderPayload')) || {};

  // This is used to save the order data in LocalStorage
  React.useEffect(() => {
    if (orderPayload && Object.keys(orderPayload).length > 0) {
      localStorage.setItem('orderPayload', JSON.stringify(orderPayload));
    }
  }, [orderPayload]);

  const { address, products, totalPrice } = orderPayload;

  const getName = (p) => p?.name || p?.cloth_name || p?.clothName || p?.title || "Product";

  const formatPrice = (price) => {
    return price && !isNaN(price) ? price.toFixed(2) : "0.00";
  };

  return (
    <>
      <Navbar />
      <main className="confirm-order__page">
        <div className="confirm-order__container">
          <h2 className="confirm-order__container-heading">Order Confirmation</h2>
          <div className="confirm-order__details">
            <div className="address-details">
              <h3>Shipping Address</h3>
              <p><strong>Address Type:</strong> {address?.address_type}</p>
              <p><strong>Name:</strong> {address?.first_name} {address?.last_name}</p>
              <p><strong>Street Address:</strong> {address?.street_address}</p>
              <p><strong>City:</strong> {address?.city} {address?.state} {address?.postal_code}</p>
              <p><strong>Country:</strong> {address?.country}</p>
              <p><strong>Email:</strong> {address?.email}</p>
              <p><strong>Phone:</strong> {address?.phone_number}</p>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              {products?.map((item, idx) => {
                const imageSrc = item.image || item.image_url || item.imageUrl || (item.gallery?.[0] ?? "");
                const rentalPrice = item?.rental_price ?? item?.rentalPrice ?? item?.price;
                const securityDeposit = item?.security_deposit ?? item?.securityDeposit ?? item?.deposit;

                return (
                  <div key={idx} className="product-summary">
                    {imageSrc ? (
                      <img src={imageSrc} alt={getName(item)} className="product-image" />
                    ) : (
                      <div className="no-image">No image</div>
                    )}
                    <div className="product-details">
                      <h4>{getName(item)}</h4>
                      <p>Rental: ₹{formatPrice(rentalPrice)}</p>
                      <p>Deposit: ₹{formatPrice(securityDeposit)}</p>
                      <p>Subtotal: ₹{formatPrice(rentalPrice + securityDeposit)}</p>
                    </div>
                  </div>
                );
              })}
              <h2>Total Price: ₹{formatPrice(totalPrice)}</h2>
            </div>
          </div>

          <div className="order-actions">
            <button onClick={() => navigate("/Bag")} className="btn go-to-bag">
              Go to Bag
            </button>
            <button onClick={() => navigate("/")} className="btn go-to-home">
              Go to Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConfirmOrder;