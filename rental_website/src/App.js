// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Scrolltotop from './components/Scrolltotop';

// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import About_us from './components/About_us';
// import ContactUs from './components/ContactUs';
// import Policy from './components/Policy';

// import { Women } from './components/Women';


// import { Children } from './components/Children';
// import { Tranding } from './components/Tranding';
// import Help from './components/Help';
// import Product from './components/Product';
// import Favorite from './components/Favorite';
// import Bag from './components/Bag';
// import SearchResults from './components/SearchResults';
// import Profile from './components/Profile';
// import Buy from './components/Buy';
// import Stylehubvideo from './components/Stylehubvideo'
// import Confirmorder from './components/Confirmorder'
// import { Men } from './components/Men'


// import Adminform from './components/Adminform';
// import Admin from "./Admin";

// import { FavoritesProvider } from './components/FavoritesContext';
// import { CartProvider } from './components/CartContext';
// import { UserProvider } from './components/UserContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   const isAdminLoggedIn = !!localStorage.getItem("admin_token"); // Check token

//   return (
//     <Router>
//       <Scrolltotop />
//       <UserProvider>
//         <CartProvider>
//           <FavoritesProvider>
           
//             <Routes>

//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/About_us" element={<About_us />} />
//               <Route path="/ContactUs" element={<ContactUs />} />
//               <Route path="/Policy" element={<Policy />} />
//               <Route path="/Help" element={<Help />} />
//               <Route path="/Men" element={<Men />} />
//               <Route path="/Women" element={<Women />} />
//                <Route path="/RelatedItem" element={<RelatedItem />} />   
//               <Route path="/Women/:subcategory" element={<Women />} />
//               <Route path="/Children" element={<Children />} />
//               <Route path="/Tranding" element={<Tranding />} />
//               <Route path="/Product/:id" element={<Product />} />
//               <Route path="/Favorite" element={<Favorite />} />
//               <Route path="/Bag" element={<Bag />} />
//               <Route path="/search" element={<SearchResults />} />
//               <Route path="/Profile" element={<Profile />} />
//               <Route path="/buy" element={<Buy />} />
//               <Route path="/buy/:id" element={<Buy />} />
//               <Route path="/Stylehubvideo" element={<Stylehubvideo />} />
//               <Route path="/Confirmorder" element={<Confirmorder />} />
              
//               <Route
//                 path="/admin"
//                 element={
//                   isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <Adminform />
//                 }
//               />
//               <Route
//                 path="/admin/*"
//                 element={isAdminLoggedIn ? <Admin /> : <Navigate to="/admin" />}
//               />

//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
           
//           </FavoritesProvider>
//         </CartProvider>
//       </UserProvider>
//     </Router>
//   );
// }

// export default App;










import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Scrolltotop from './components/Scrolltotop';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About_us from './components/About_us';
import ContactUs from './components/ContactUs';
import Policy from './components/Policy';

import { Women } from './components/Women';
import { Children } from './components/Children'; // Make sure this is imported correctly
import { Tranding } from './components/Tranding';
import Help from './components/Help';
import Product from './components/Product';
import Favorite from './components/Favorite';
import Bag from './components/Bag';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import Buy from './components/Buy';
import Stylehubvideo from './components/Stylehubvideo';
import Confirmorder from './components/Confirmorder';
import { Men } from './components/Men';

import Adminform from './components/Adminform';
import Admin from "./Admin";

import { FavoritesProvider } from './components/FavoritesContext';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const isAdminLoggedIn = !!localStorage.getItem("admin_token"); // Check token

  return (
    <Router>
      <Scrolltotop />
      <UserProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/About_us" element={<About_us />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/Policy" element={<Policy />} />
              <Route path="/Help" element={<Help />} />
              <Route path="/Men" element={<Men />} />
              <Route path="/Women" element={<Women />} />
              <Route path="/Women/:subcategory" element={<Women />} />
              <Route path="/Children" element={<Children />} /> {/* Corrected this */}
              <Route path="/Tranding" element={<Tranding />} />
              <Route path="/Product/:id" element={<Product />} />
              <Route path="/Favorite" element={<Favorite />} />
              <Route path="/Bag" element={<Bag />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/buy/:id" element={<Buy />} />
              <Route path="/Stylehubvideo" element={<Stylehubvideo />} />
              <Route path="/Confirmorder" element={<Confirmorder />} />

              <Route
                path="/admin"
                element={
                  isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <Adminform />
                }
              />
              <Route
                path="/admin/*"
                element={isAdminLoggedIn ? <Admin /> : <Navigate to="/admin" />}
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
