// import React, { useState } from "react";
// import "./Addproduct.css";

// const Addproduct = () => {
//   const [categories, setCategories] = useState([
//     { name: "Electronics", description: "Devices and gadgets" },
//     { name: "Books", description: "Fiction and non-fiction" },
//   ]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortAsc, setSortAsc] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState({ name: "", description: "" });
//   const [editIndex, setEditIndex] = useState(null);

//   const handleSort = () => {
//     const sorted = [...categories].sort((a, b) =>
//       sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     );
//     setCategories(sorted);
//     setSortAsc(!sortAsc);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAddCategoryClick = () => {
//     setCurrentCategory({ name: "", description: "" });
//     setIsEditing(false);
//     setShowModal(true);
//   };

//   const handleEditClick = (index) => {
//     setCurrentCategory(categories[index]);
//     setEditIndex(index);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       const updated = categories.filter((_, i) => i !== index);
//       setCategories(updated);
//     }
//   };

//   const handleModalChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentCategory({ ...currentCategory, [name]: value });
//   };

//   const handleModalSubmit = (e) => {
//     e.preventDefault();
//     if (!currentCategory.name.trim() || !currentCategory.description.trim()) return;

//     if (isEditing) {
//       const updated = [...categories];
//       updated[editIndex] = currentCategory;
//       setCategories(updated);
//     } else {
//       setCategories([...categories, currentCategory]);
//     }

//     setShowModal(false);
//     setCurrentCategory({ name: "", description: "" });
//   };

//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="addproduct-container">
//       <h1>Add Product</h1>

//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search categories..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <button onClick={handleAddCategoryClick}>Add Category</button>
//       </div>

//       <table className="addcategories-table">
//         <thead>
//           <tr>
//             <th onClick={handleSort} style={{ cursor: "pointer" }}>
//               Name {sortAsc ? "▲" : "▼"}
//             </th>
//             <th>Description</th>
//             <th>Edit</th>
//             <th>Remove</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCategories.map((category, index) => (
//             <tr key={index}>
//               <td>{category.name}</td>
//               <td>{category.description}</td>
//               <td>
//                 <button onClick={() => handleEditClick(index)}>Edit</button>
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(index)}>Remove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="modal">
//             <h2>{isEditing ? "Edit Category" : "Add Category"}</h2>
//             <form onSubmit={handleModalSubmit}>
//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   name="name"
//                   value={currentCategory.name}
//                   onChange={handleModalChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Description:
//                 <input
//                   type="text"
//                   name="description"
//                   value={currentCategory.description}
//                   onChange={handleModalChange}
//                   required
//                 />
//               </label>
//               <div className="modal-actions">
//                 <button type="submit">{isEditing ? "Update" : "Add"}</button>
//                 <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Addproduct;











import React, { useState, useEffect } from "react";
import "./Addproduct.css";
import axios from "axios";
import Admin from "../Admin";

const Addproduct = () => {
  const [categories, setCategories] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ category_name: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://192.168.1.10:5000/categories/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSort = () => {
    const sorted = [...categories].sort((a, b) =>
      sortAsc 
        ? (a.category_name || "").localeCompare(b.category_name || "") 
        : (b.category_name || "").localeCompare(a.category_name || "")
    );
    setCategories(sorted);
    setSortAsc(!sortAsc);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCategoryClick = () => {
    setCurrentCategory({ category_name: "", description: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (categoryId) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    if (category) {
      setCurrentCategory({ category_id:category.category_id ,category_name: category.category_name, description: category.description });
      setEditIndex(categoryId);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://192.168.1.10:5000/categories/${categoryId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });
        const updated = categories.filter((category) => category.category_id !== categoryId);
        setCategories(updated);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    // Don't submit if either field is empty
    if (!currentCategory.category_name.trim() || !currentCategory.description.trim()) return;

if (isEditing) {
  try {
    // Make the API call to update the category
    const response = await axios.put(
      `http://192.168.1.10:5000/categories/${editIndex}`, 
      currentCategory, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );

    // Check if the response contains the updated category data
    if (response.status === 200 || response.status === 204) {
      categories.map((category) =>
        category.category_id === currentCategory.categoryId ? currentCategory : category
      );
    } else {
      console.error("Failed to update category, status:", response.status);
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
}
else {
      try {
        const response = await axios.post("http://192.168.1.10:5000/categories/", currentCategory, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("admin_token")}`,
          },
        });

        // Immediately update categories state with the new category
        setCategories(prevCategories => [
          ...prevCategories,
          {
            
            category_name: currentCategory.category_name,
            description: currentCategory.     description
          }
        ]);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }

    // Close the modal after submission
    setShowModal(false);
    setCurrentCategory({ category_name: "", description: "" });
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) =>
        (category.category_name).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="addproduct-container">
      <h1>Add Product</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleAddCategoryClick}>Add Category</button>
      </div>

      <table className="addcategories-table">
        <thead>
          <tr>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Name {sortAsc ? "▲" : "▼"}
            </th>
            <th>Description</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.category_id}>
              <td>{category.category_name || "No Name"}</td>
              <td>{category.description || "No Description"}</td>
              <td>
                <button onClick={() => handleEditClick(category.category_id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(category.category_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{isEditing ? "Edit Category" : "Add Category"}</h2>
            <form onSubmit={handleModalSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="category_name"
                  value={currentCategory.category_name}
                  onChange={handleModalChange}
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={currentCategory.description}
                  onChange={handleModalChange}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="submit">{isEditing ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addproduct;
