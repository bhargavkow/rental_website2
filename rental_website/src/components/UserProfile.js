// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "./CartContext";
// import { useFavorites } from "./FavoritesContext";

// function UserProfile() {
//   const { user, logout } = useAuth();
//   const { addToCart } = useCart();
//   const { addFavorite } = useFavorites();

//   const handleAddToCart = () => {
//     addToCart({ id: 1, name: "Sample Product" }); // example
//   };

//   const handleFavorite = () => {
//     addFavorite({ id: 1, name: "Sample Product" }); // example
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       <h2>Welcome, {user?.name}</h2>
//       <p>Email: {user?.email}</p>

//       <button onClick={handleAddToCart} className="button">
//         Add to Bag
//       </button>
//       <button onClick={handleFavorite} className="button" style={{ marginLeft: "10px" }}>
//         Add to Favorite
//       </button>

//       <div style={{ marginTop: "20px" }}>
//         <button onClick={logout} className="button">Logout</button>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
