// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "./CartContext";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import axios from "axios";
// import "./Buy.css";

// const Buy = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const cartCtx = useCart();
//   const addToCart = cartCtx?.addToCart ?? (() => { });

//   let initialProduct = null;
//   try {
//     initialProduct =
//       location.state?.product ??
//       JSON.parse(localStorage.getItem("buy_product") || "null");
//   } catch (e) {
//     initialProduct = location.state?.product ?? null;
//   }

//   const [product, setProduct] = useState(initialProduct);
//   const isMultiple = Array.isArray(product);
//   const products = isMultiple ? product : product ? [product] : [];

//   const [addresses, setAddresses] = useState([]);
//   const [addingNewAddress, setAddingNewAddress] = useState(false);

//   const [step, setStep] = useState(1);
//   const [address, setAddress] = useState({
//     id: null,
//     address_type: "shipping",
//     street_address: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//     phone_number: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     isDefault: false,
//   });

//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     if (product) {
//       try {
//         localStorage.setItem("buy_product", JSON.stringify(product));
//       } catch (e) { }
//     }
//   }, [product]);

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const res = await axios.get("http://192.168.1.10:5000/address/addresse", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
//           },
//         });
//         setAddresses(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch addresses", err);
//       }
//     };
//     fetchAddresses();
//   }, []);

//   const getName = (p) =>
//     p?.name || p?.cloth_name || p?.clothName || p?.title || "Product";

//   const parseNumber = (val) => {
//     if (val == null) return 0;
//     if (typeof val === "number") return val;
//     const n = parseFloat(String(val).replace(/[^0-9.]/g, ""));
//     return Number.isFinite(n) ? n : 0;
//   };

//   const totalPrice = products.reduce(
//     (sum, p) =>
//       sum +
//       (parseNumber(p?.rental_price ?? p?.rentalPrice ?? p?.price) +
//         parseNumber(
//           p?.security_deposit ?? p?.securityDeposit ?? p?.deposit
//         )),
//     0
//   );

//   if (!products.length) {
//     return (
//       <>
//         <Navbar />
//         <main className="buy__page not-found">
//           <div className="notfound-card">
//             <h2>Nothing to buy — product not found</h2>
//             <p>You tried to open the purchase page without selecting a product.</p>
//             <div className="nf-actions">
//               <button onClick={() => navigate(-1)} className="btn nf-btn">
//                 Back
//               </button>
//               <button onClick={() => navigate("/")} className="btn nf-btn">
//                 Home
//               </button>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   const validateAddress = () => {
//     if (!address.first_name.trim()) {
//       alert("Please enter first name.");
//       return false;
//     }
//     if (!address.last_name.trim()) {
//       alert("Please enter last name.");
//       return false;
//     }
//     if (!address.email.trim() || !/\S+@\S+\.\S+/.test(address.email)) {
//       alert("Please enter a valid email.");
//       return false;
//     }
//     if (!/^\d{10}$/.test(address.phone_number)) {
//       alert("Please enter a valid 10 digit phone number.");
//       return false;
//     }
//     if (!address.street_address.trim()) {
//       alert("Please enter street address.");
//       return false;
//     }
//     if (!address.city.trim()) {
//       alert("Please enter city.");
//       return false;
//     }
//     if (!address.state.trim()) {
//       alert("Please enter state.");
//       return false;
//     }
//     if (!/^[1-9][0-9]{5}$/.test(address.postal_code)) {
//       alert("Please enter a valid 6 digit postal code.");
//       return false;
//     }
//     if (!address.country.trim()) {
//       alert("Please enter country.");
//       return false;
//     }
//     return true;
//   };

//   const handleAddressNext = () => {
//     if (!validateAddress()) return;
//     setStep(2);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleConfirm = async () => {
//     setProcessing(true);

//     const orderPayload = {
//       products: products.map((p) => ({
//         id: p?.id ?? p?.cloth_id ?? p?.clothId,
//         name: getName(p),
//         rental_price: parseNumber(
//           p?.rental_price ?? p?.rentalPrice ?? p?.price
//         ),
//         security_deposit: parseNumber(
//           p?.security_deposit ?? p?.securityDeposit ?? p?.deposit
//         ),
//       })),
//       totalPrice,
//       address,
//     };

//     try {
//       products.forEach((p) => {
//         try {
//           addToCart({ ...p, orderMeta: orderPayload });
//         } catch (e) { }
//       });

//       await new Promise((res) => setTimeout(res, 900));
//       localStorage.removeItem("buy_product");

//       setProcessing(false);
//       alert("Order placed successfully!");
//       navigate("/Bag");
//     } catch (err) {
//       setProcessing(false);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="buy__page">
//         <div className="buy__container">
//           <div className="buy__left">
//             <div className="checkout-card">
//               <div className="checkout-header">
//                 <h2>Checkout</h2>
//                 <div className="step-indicator">
//                   <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
//                   <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
//                 </div>
//               </div>

//               {/* STEP 1: Address Selection / Add New */}
//               {step === 1 && (
//                 <div className="step-panel">
//                   <h3>1. Shipping Address</h3>

//                   {/* Existing Addresses */}
//                   <div className="address-list">
//                     {addresses.map((addr) => (
//                       <div
//                         key={addr.id}
//                         className={`address-box ${address.id === addr.id ? "selected" : ""}`}
//                         onClick={() => {
//                           setAddress({ ...addr });
//                           setAddingNewAddress(false);
//                         }}
//                       >
//                         <p><strong>{addr.first_name} {addr.last_name}</strong> ({addr.address_type})</p>
//                         <p>{addr.street_address}, {addr.city}, {addr.state}, {addr.postal_code}, {addr.country}</p>
//                         <p>Email: {addr.email}</p>
//                         <p>Phone: {addr.phone_number}</p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Add New Address Button */}
//                   <button
//                     className="add-new-address-btn"
//                     onClick={() => setAddingNewAddress(!addingNewAddress)}
//                   >
//                     {addingNewAddress ? "Cancel" : "Add New Address"}
//                   </button>

//                   {/* Add New Address Form */}
//                   {addingNewAddress && (
//                     <>
//                       <select
//                         value={address.address_type}
//                         onChange={(e) =>
//                           setAddress({ ...address, address_type: e.target.value })
//                         }
//                       >
//                         <option value="shipping">Shipping</option>
//                         <option value="billing">Billing</option>
//                         <option value="work">Work</option>
//                         <option value="home">Home</option>
//                         <option value="temporary">Temporary</option>
//                         <option value="other">Other</option>
//                       </select>

//                       <input
//                         placeholder="First Name"
//                         value={address.first_name}
//                         onChange={(e) =>
//                           setAddress({ ...address, first_name: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="Last Name"
//                         value={address.last_name}
//                         onChange={(e) =>
//                           setAddress({ ...address, last_name: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="Email"
//                         value={address.email}
//                         onChange={(e) =>
//                           setAddress({ ...address, email: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="Phone Number"
//                         value={address.phone_number}
//                         onChange={(e) =>
//                           setAddress({
//                             ...address,
//                             phone_number: e.target.value.replace(/\D/g, "").slice(0, 10),
//                           })
//                         }
//                       />
//                       <input
//                         placeholder="Street Address"
//                         value={address.street_address}
//                         onChange={(e) =>
//                           setAddress({ ...address, street_address: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="City"
//                         value={address.city}
//                         onChange={(e) =>
//                           setAddress({ ...address, city: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="State"
//                         value={address.state}
//                         onChange={(e) =>
//                           setAddress({ ...address, state: e.target.value })
//                         }
//                       />
//                       <input
//                         placeholder="Postal Code"
//                         value={address.postal_code}
//                         onChange={(e) =>
//                           setAddress({
//                             ...address,
//                             postal_code: e.target.value.replace(/\D/g, "").slice(0, 6),
//                           })
//                         }
//                       />
//                       <input
//                         placeholder="Country"
//                         value={address.country}
//                         onChange={(e) =>
//                           setAddress({ ...address, country: e.target.value })
//                         }
//                       />
//                       <div className="default-address">
//                         <input
//                           type="checkbox"
//                           checked={address.isDefault}
//                           onChange={(e) =>
//                             setAddress({ ...address, isDefault: e.target.checked })
//                           }
//                         />
//                         <label>Set as default address</label>
//                       </div>
//                     </>
//                   )}

//                   <button onClick={handleAddressNext}>Continue</button>
//                 </div>
//               )}

//               {/* STEP 2: Review & Confirm */}
//               {step === 2 && (
//                 <div className="step-panel">
//                   <h3>2. Review & Confirm</h3>
//                   <p>
//                     <strong>Address Type:</strong> {address.address_type}
//                   </p>
//                   <p>
//                     <strong>Ship to:</strong> {address.first_name} {address.last_name},{" "}
//                     {address.street_address}, {address.city}, {address.state},{" "}
//                     {address.postal_code}, {address.country}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {address.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {address.phone_number}
//                   </p>
//                   <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
//                   <button onClick={() => setStep(1)}>Back</button>
//                   <button onClick={handleConfirm} disabled={processing}>
//                     {processing ? "Processing..." : "Confirm Order"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <aside className="buy__right">
//             <div className="order-card">
//               <h3>Order Summary</h3>
//               {products.map((item, idx) => {
//                 const imageSrc =
//                   item.image ||
//                   item.image_url ||
//                   item.imageUrl ||
//                   (item.gallery?.[0] ?? "");
//                 const rentalPrice = parseNumber(
//                   item?.rental_price ?? item?.rentalPrice ?? item?.price
//                 );
//                 const securityDeposit = parseNumber(
//                   item?.security_deposit ??
//                   item?.securityDeposit ??
//                   item?.deposit
//                 );
//                 return (
//                   <div key={idx} className="product-preview">
//                     {imageSrc ? (
//                       <img src={imageSrc} alt={getName(item)} />
//                     ) : (
//                       <div>No image</div>
//                     )}
//                     <div>
//                       <h4>{getName(item)}</h4>
//                       <p>Rental: ₹{rentalPrice.toFixed(2)}</p>
//                       <p>Deposit: ₹{securityDeposit.toFixed(2)}</p>
//                       <p>
//                         Subtotal: ₹
//                         {(rentalPrice + securityDeposit).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//               <h2>Grand Total: ₹{totalPrice.toFixed(2)}</h2>
//             </div>
//           </aside>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Buy;






import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import "./Buy.css";

const API_BASE = "http://localhost:5000/address";

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCtx = useCart();
  const addToCart = cartCtx?.addToCart ?? (() => {});

  let initialProduct = null;
  try {
    initialProduct =
      location.state?.product ??
      JSON.parse(localStorage.getItem("buy_product") || "null");
  } catch (e) {
    initialProduct = location.state?.product ?? null;
  }

  const [product, setProduct] = useState(initialProduct);
  const isMultiple = Array.isArray(product);
  const products = isMultiple ? product : product ? [product] : [];
  const [addresses, setAddresses] = useState([]);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    id: null,
    address_type: "shipping",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    email: "",
    isDefault: false,
  });
  const [processing, setProcessing] = useState(false);

  // Save selected product in localStorage
  useEffect(() => {
    if (product) {
      try {
        localStorage.setItem("buy_product", JSON.stringify(product));
      } catch (e) {}
    }
  }, [product]);

  // Fetch addresses and auto-select default
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/addresse`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });
        const fetched = res.data || [];
        setAddresses(fetched);

        // check localStorage for default
        const storedDefault = localStorage.getItem("default_address");
        if (storedDefault) {
          const parsed = JSON.parse(storedDefault);
          const match = fetched.find((a) => a.id === parsed.id);
          if (match) {
            setAddress(match);
          }
        } else {
          const def = fetched.find((a) => a.isDefault);
          if (def) setAddress(def);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };
    fetchAddresses();
  }, []);

  const getName = (p) =>
    p?.name || p?.cloth_name || p?.clothName || p?.title || "Product";

  const parseNumber = (val) => {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    const n = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const totalPrice = products.reduce(
    (sum, p) =>
      sum +
      (parseNumber(p?.rental_price ?? p?.rentalPrice ?? p?.price) +
        parseNumber(
          p?.security_deposit ?? p?.securityDeposit ?? p?.deposit
        )),
    0
  );

  if (!products.length) {
    return (
      <>
        <Navbar />
        <main className="buy__page not-found">
          <div className="notfound-card">
            <h2>Nothing to buy — product not found</h2>
            <p>
              You tried to open the purchase page without selecting a product.
            </p>
            <div className="nf-actions">
              <button onClick={() => navigate(-1)} className="btn nf-btn">
                Back
              </button>
              <button onClick={() => navigate("/")} className="btn nf-btn">
                Home
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Save address as default
  const setDefaultAddress = (addr) => {
    setAddress(addr);
    localStorage.setItem("default_address", JSON.stringify(addr));
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === addr.id,
      }))
    );
  };

  const validateAddress = () => {
    if (!address.first_name.trim()) return alert("Enter first name.");
    if (!address.last_name.trim()) return alert("Enter last name.");
    if (!/\S+@\S+\.\S+/.test(address.email))
      return alert("Enter a valid email.");
    if (!/^\d{10}$/.test(address.phone_number))
      return alert("Enter a valid 10 digit phone number.");
    if (!address.street_address.trim()) return alert("Enter street address.");
    if (!address.city.trim()) return alert("Enter city.");
    if (!address.state.trim()) return alert("Enter state.");
    if (!/^[1-9][0-9]{5}$/.test(address.postal_code))
      return alert("Enter a valid 6 digit postal code.");
    if (!address.country.trim()) return alert("Enter country.");
    return true;
  };

  const handleAddressNext = () => {
    if (!validateAddress()) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = async () => {
    setProcessing(true);

    const orderPayload = {
      products: products.map((p) => ({
        id: p?.id ?? p?.cloth_id ?? p?.clothId,
        name: getName(p),
        rental_price: parseNumber(
          p?.rental_price ?? p?.rentalPrice ?? p?.price
        ),
        security_deposit: parseNumber(
          p?.security_deposit ?? p?.securityDeposit ?? p?.deposit
        ),
      })),
      totalPrice,
      address,
    };

    try {
      products.forEach((p) => {
        try {
          addToCart({ ...p, orderMeta: orderPayload });
        } catch (e) {}
      });

      await new Promise((res) => setTimeout(res, 900));
      localStorage.removeItem("buy_product");

      setProcessing(false);
      alert("Order placed successfully!");
      navigate("/Confirmorder", { state: { orderPayload } });
    } catch (err) {
      setProcessing(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="buy__page">
        <div className="buy__container">
          <div className="buy__left">
            <div className="checkout-card">
              <div className="checkout-header">
                <h2>Checkout</h2>
                <div className="step-indicator">
                  <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
                  <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
                </div>
              </div>

              {/* STEP 1: Address */}
              {step === 1 && (
                <div className="step-panel">
                  <h3>1. Shipping Address</h3>

                  <div className="address-list">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`address-box ${
                          address.id === addr.id ? "selected" : ""
                        }`}
                        onClick={() => {
                          setAddress({ ...addr });
                          setAddingNewAddress(false);
                        }}
                      >
                        <p>
                          <strong>
                            {addr.first_name} {addr.last_name}
                          </strong>{" "}
                          ({addr.address_type})
                        </p>
                        <p>
                          {addr.street_address}, {addr.city}, {addr.state},{" "}
                          {addr.postal_code}, {addr.country}
                        </p>
                        <p>Email: {addr.email}</p>
                        <p>Phone: {addr.phone_number}</p>
                        {addr.isDefault && (
                          <span className="default-badge">Default</span>
                        )}
                        {!addr.isDefault && (
                          <button
                            className="make-default-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDefaultAddress(addr);
                            }}
                          >
                            Make Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    className="add-new-address-btn"
                    onClick={() => setAddingNewAddress(!addingNewAddress)}
                  >
                    {addingNewAddress ? "Cancel" : "Add New Address"}
                  </button>

                  {addingNewAddress && (
                    <div className="address-form">
                      <input
                        placeholder="First Name"
                        value={address.first_name}
                        onChange={(e) =>
                          setAddress({ ...address, first_name: e.target.value })
                        }
                      />
                      <input
                        placeholder="Last Name"
                        value={address.last_name}
                        onChange={(e) =>
                          setAddress({ ...address, last_name: e.target.value })
                        }
                      />
                      <input
                        placeholder="Email"
                        value={address.email}
                        onChange={(e) =>
                          setAddress({ ...address, email: e.target.value })
                        }
                      />
                      <input
                        placeholder="Phone Number"
                        value={address.phone_number}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            phone_number: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          })
                        }
                      />
                      <input
                        placeholder="Street Address"
                        value={address.street_address}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            street_address: e.target.value,
                          })
                        }
                      />
                      <input
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                      <input
                        placeholder="State"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                      />
                      <input
                        placeholder="Postal Code"
                        value={address.postal_code}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            postal_code: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6),
                          })
                        }
                      />
                      <input
                        placeholder="Country"
                        value={address.country}
                        onChange={(e) =>
                          setAddress({ ...address, country: e.target.value })
                        }
                      />
                      <div className="default-address">
                        <input
                          type="checkbox"
                          checked={address.isDefault}
                          onChange={(e) =>
                            setAddress({ ...address, isDefault: e.target.checked })
                          }
                        />
                        <label>Set as default address</label>
                      </div>
                    </div>
                  )}

                  <button className="continue-btn" onClick={handleAddressNext}>
                    Continue
                  </button>
                </div>
              )}

              {/* STEP 2: Review */}
              {step === 2 && (
                <div className="step-panel">
                  <h3>2. Review & Confirm</h3>
                  <p>
                    <strong>Address Type:</strong> {address.address_type}
                  </p>
                  <p>
                    <strong>Ship to:</strong> {address.first_name}{" "}
                    {address.last_name}, {address.street_address},{" "}
                    {address.city}, {address.state}, {address.postal_code},{" "}
                    {address.country}
                  </p>
                  <p>
                    <strong>Email:</strong> {address.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {address.phone_number}
                  </p>
                  <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                  <div className="review-actions">
                    <button className="back-btn" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button
                      className="confirm-btn"
                      onClick={handleConfirm}
                      disabled={processing}
                    >
                      {processing ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="buy__right">
            <div className="order-card">
              <h3>Order Summary</h3>
              {products.map((item, idx) => {
                const imageSrc =
                  item.image ||
                  item.image_url ||
                  item.imageUrl ||
                  (item.gallery?.[0] ?? "");
                const rentalPrice = parseNumber(
                  item?.rental_price ?? item?.rentalPrice ?? item?.price
                );
                const securityDeposit = parseNumber(
                  item?.security_deposit ?? item?.securityDeposit ?? item?.deposit
                );
                return (
                  <div key={idx} className="product-preview">
                    {imageSrc ? (
                      <img src={imageSrc} alt={getName(item)} />
                    ) : (
                      <div className="no-img">No image</div>
                    )}
                    <div>
                      <h4>{getName(item)}</h4>
                      <p>Rental: ₹{rentalPrice.toFixed(2)}</p>
                      <p>Deposit: ₹{securityDeposit.toFixed(2)}</p>
                      <p>
                        Subtotal: ₹
                        {(rentalPrice + securityDeposit).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <h2>Grand Total: ₹{totalPrice.toFixed(2)}</h2>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Buy;




