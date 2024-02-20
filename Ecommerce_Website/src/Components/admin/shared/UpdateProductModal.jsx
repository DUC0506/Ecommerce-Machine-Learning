// ProductDetailModal.js
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';

const UpdateProductModal = ({ isOpen, onRequestClose, product, onUpdateProduct }) => {
  console.log(product);
  const [editedProduct, setEditedProduct] = useState({...product} );
  const [categories, setCategories] = useState([]);
  console.log(editedProduct);
  const handleChange = (e) => {
    const { name, value ,type, checked,} = e.target;


    const updatedValue = type === 'checkbox' ? checked : name === 'priceDiscount' ? parseFloat(value) : value;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: updatedValue }));
  };

  const handleUpdate = () => {
    onUpdateProduct(editedProduct);
    onRequestClose();
  };
  
  const fetchCategory =async()=>{
    const{type, categories}= await getCategory()
    if(type==='error') return type;
    setCategories(categories);
  }

  useEffect(() => {
    if (!isOpen) {
      setEditedProduct({ ...product });
      
    }
     setEditedProduct({ ...product });
    fetchCategory();
  }, [isOpen, product]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md overflow-y-auto max-h-full ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <form>
        <div className="grid grid-cols-2 gap-4">
          {/* Render product details for viewing */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
         
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={editedProduct.category._id}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
          
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div colSpan="2">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
         
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
           
            />
          </div>

          <div>
            <label htmlFor="priceDiscount">Price Discount:</label>
            <input
              type="number"
              id="priceDiscount"
              name="priceDiscount"
              value={editedProduct.priceDiscount}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
        
            />
          </div>

          <div>
            <label htmlFor="colors">Colors:</label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={editedProduct.colors[0].color}
              // onChange={handleChange}
              className="w-full border p-2 mb-4"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="sizes">Sizes:</label>
            <input
              type="text"
              id="sizes"
              name="sizes"
              value={editedProduct.sizes[0].size}
              // onChange={handleChange}
              className="w-full border p-2 mb-4"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            
            />
          </div>

          <div>
            <label htmlFor="sold">Sold:</label>
            <input
              type="number"
              id="sold"
              name="sold"
              value={editedProduct.sold}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
             
            />
          </div>

          <div>
            <label htmlFor="isOutOfStock">Out of Stock:</label>
            <input
              type="checkbox"
              id="isOutOfStock"
              name="isOutOfStock"
              checked={editedProduct.isOutOfStock}
              onChange={handleChange}
              className="ml-2"
              
            />
          </div>

          <div>
            <label htmlFor="mainImage">Main Image:</label>
            {editedProduct.mainImage && (
              <img
                src={editedProduct.mainImage}
                alt="Main Product"
                className="w-full border p-2 mb-4"
              />
            )}
          </div>

          <div>
            <label htmlFor="images">Images:</label>
            {editedProduct.images && (
              <div>
                {editedProduct.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index}`} className="w-full border p-2 mb-4" />
                ))}
              </div>
            )}
          </div>
        </div>

        <button type="button" onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Update Product
        </button>
        <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </form>
    </div>
  );
};

export default UpdateProductModal;
