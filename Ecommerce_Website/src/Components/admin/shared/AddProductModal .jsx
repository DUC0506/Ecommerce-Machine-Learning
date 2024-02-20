// AddProductModal.js

import React, { useEffect, useState } from 'react';
import { getCategory } from '../../../api/category';

const AddProductModal = ({ isOpen, onRequestClose, onAddProduct }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    priceDiscount: '',
    colors: '',
    sizes: '',
    quantity: '',
    sold: '',
    isOutOfStock: false,
    mainImage: '',
    images: [],
  });

  const fetchCategory =async()=>{
    const{type, categories}= await getCategory()
    if(type==='error') return type;
    setCategories(categories);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleImagesChange = (e) => {
    const { name, files } = e.target;
  

    setFormData((prevData) => ({ ...prevData, [name]: [...prevData.images, ...files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data if needed
 
    const formData1 = new FormData();
    for (const key in formData) {
      // Nếu key là images thì thêm từng file vào FormData
      if (key === 'images') {
        formData1.append(key, formData[key][0]);
      } else {
        formData1.append(key, formData[key]);
      }
    }
    // Pass the form data to the parent component for handling
    onAddProduct(formData1);

    // Optionally, reset the form or perform other actions
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      priceDiscount: '',
      colors: '',
      sizes: '',
      quantity: '',
      sold: '',
      isOutOfStock: false,
      mainImage: '',
      images: [],
    });

    // Close the modal
    onRequestClose();

  };
  useEffect(() => {
		
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md overflow-y-auto max-h-full ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Row 1: Name & Category */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
          </div>
            <div colSpan="2">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border p-2 mb-4"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

          {/* Row 2: Description */}
          <div colSpan="2">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
          </div>

          {/* Row 3: Price & PriceDiscount */}
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
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
              value={formData.priceDiscount}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
          </div>

          {/* Row 4: Colors & Sizes */}
          <div>
            <label htmlFor="colors">Colors:</label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
          </div>
          <div>
            <label htmlFor="sizes">Sizes:</label>
            <input
              type="text"
              id="sizes"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              className="w-full border p-2 mb-4"
            />
          </div>

          {/* Row 5: Quantity, Sold, and IsOutOfStock */}
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
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
              value={formData.sold}
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
              checked={formData.isOutOfStock}
              onChange={() =>
                setFormData((prevData) => ({ ...prevData, isOutOfStock: !prevData.isOutOfStock }))
              }
              className="ml-2"
            />
          </div>

          {/* Row 6: MainImage & Images */}
          <div>
            <label htmlFor="mainImage">Main Image:</label>
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              onChange={handleFileChange}
              className="w-full border p-2 mb-4"
            />
          </div>
          <div>
            <label htmlFor="images">Images (multiple files):</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImagesChange}
              className="w-full border p-2 mb-4"
              multiple
            />
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Add Product
        </button>
        <button onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProductModal;
