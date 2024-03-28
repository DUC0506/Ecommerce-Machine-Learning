/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';

const UpdateProductModal = ({ isOpen, onRequestClose, product, onUpdateProduct }) => {
  console.log(product);
  const [editedProduct, setEditedProduct] = useState({...product} );
  const [categories, setCategories] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
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
  // Function to handle file change for main image
// Function to handle file change for main image
const handleFileChange = (e) => {
  const { name, files } = e.target;
  // Update main image in editedProduct state
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    [name]: files[0],
  }));

  // Display main image preview
  const reader = new FileReader();
  reader.onload = () => {
    setMainImageUrl(reader.result);
  };
  reader.readAsDataURL(files[0]);
};

// Function to handle file change for additional images
const handleImagesChange = (e) => {
  const { name, files } = e.target;
  // Update images array in editedProduct state
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    [name]: [...prevProduct[name], ...files],
  }));

  // Display additional images preview
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrls((prevImageUrls) => [...prevImageUrls, reader.result]);
    };
    reader.readAsDataURL(file);
  });
};


  useEffect(() => {
    if (!isOpen) {
      setEditedProduct({ ...product });
      
    }
     setEditedProduct({ ...product });
    fetchCategory();
  }, [isOpen, product]);

  return (
    <div class={`absolute w-full top-1/3 left-1/2 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
      isOpen ? 'block' : 'hidden'
    }`}>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

    
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên sản phẩm </label>
        <input type="text" id="name" placeholder='[Nội dung]+[Loại sản phẩm]' name="name" value={editedProduct.name} onChange={handleChange} 
        class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="category" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Mặt hàng</label>
        <select id="category" name="category" value={editedProduct.category} onChange={handleChange} class="w-full border p-2 mb-4 font-sans font-normal focus:outline-none  focus:border-yellow-500">
          <option value="" disabled >Vui lòng chọn mặt hàng</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>

        <label for="price" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Price:</label>
        <input type="number" id="price" name="price" value={editedProduct.price} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="priceDiscount" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Price Discount:</label>
        <input type="number" id="priceDiscount" name="priceDiscount" value={editedProduct.priceDiscount} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="colors" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Colors:</label>
        <input type="text" id="colors" name="colors" value={editedProduct.colors[0].color} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="sizes" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Sizes:</label>
        <input type="text" id="sizes" name="sizes" value={editedProduct.sizes[0].size} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="quantity" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Quantity:</label>
        <input type="number" id="quantity" name="quantity" value={editedProduct.quantity} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
         <div className="flex">
          <div className='w-full'>
            <label for="sold" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Sold:</label>
            <input type="number" id="sold" name="sold" value={editedProduct.sold} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
          </div>
          <div className='w-full'>
            <label for="isOutOfStock" class="block mb-2 font-sans font-medium">Out of Stock:</label>
            <input type="checkbox" id="isOutOfStock" name="isOutOfStock" checked={editedProduct.isOutOfStock} onChange={handleChange} class="ml-2" />
          </div>   
        </div>
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <div class=" bg-white rounded p-4">
        <div className="mb-8">
          <label htmlFor="mainImage" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>
          Main Image:</label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            onChange={handleFileChange}
            className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500"
          />
          {editedProduct.mainImage && <img src={editedProduct.mainImage} alt="Main Image" className="w-32 h-auto" />}
          {mainImageUrl && <img src={mainImageUrl} alt="Main Image" className="w-32 h-auto" />}
        </div>

        <div className="mb-8">
          <label htmlFor="images" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Images (multiple files):</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImagesChange}
            className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500"
            multiple
          />
          <div className="flex">
          {editedProduct.images && editedProduct.images.map((imageUrl, index) => (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-32 h-auto" />
          ))}
            <div className="flex">
            {imageUrls.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-32 h-auto" />
            ))}
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Description:</label>
          <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="button" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update Product</button>
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default UpdateProductModal;
