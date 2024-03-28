/* eslint-disable jsx-a11y/img-redundant-alt */
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
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({}); // State để lưu trữ các lỗi

  const fetchCategory = async () => {
    const { type, categories } = await getCategory();
    if (type === 'error') return type;
    setCategories(categories);
  };
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '' && key !== 'isOutOfStock') { // Kiểm tra nếu trường rỗng và không phải là trường isOutOfStock (checkbox)
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    const reader = new FileReader();
    reader.onload = () => {
      setMainImageUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleImagesChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: [...prevData.images, ...files] }));
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrls((prevImageUrls) => [...prevImageUrls, reader.result]);
    };
    Array.from(files).forEach((file) => reader.readAsDataURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData1 = new FormData();
    
    for (const key in formData) {
      if (key === 'images') {
        formData[key].forEach((image) => {
          formData1.append(key, image);
        });
      } else {
        formData1.append(key, formData[key]);
      }
    }
    console.log(formData1);
  
    onAddProduct(formData1);
  
    // setFormData({
    //   name: '',
    //   category: '',
    //   description: '',
    //   price: '',
    //   priceDiscount: '',
    //   colors: '',
    //   sizes: '',
    //   quantity: '',
    //   sold: '',
    //   isOutOfStock: false,
    //   mainImage: '',
    //   images: [],
    // });
    // setMainImageUrl('');
    // setImageUrls([]);
    // onRequestClose();
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div class={`absolute w-full top-1/3 left-1/2 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
      isOpen ? 'block' : 'hidden'
    }`}>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

    
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên sản phẩm </label>
        <input type="text" id="name" placeholder='[Nội dung]+[Loại sản phẩm]' name="name" value={formData.name} onChange={handleChange} 
        class="w-full border p-2 mb-2 focus:outline-none  focus:border-yellow-500" />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <label for="category" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Mặt hàng</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} class="w-full border p-2 mb-4 font-sans font-normal focus:outline-none  focus:border-yellow-500">
          <option value="" disabled >Vui lòng chọn mặt hàng</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500">{errors.category}</p>}
        <label for="price" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Price:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} class="w-full border p-2 mb-2 focus:outline-none  focus:border-yellow-500" />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
        
        <label for="priceDiscount" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Price Discount:</label>
        <input type="number" id="priceDiscount" name="priceDiscount" value={formData.priceDiscount} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
        {errors.priceDiscount && <p className="text-red-500">{errors.priceDiscount}</p>}    

        <label for="colors" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Colors:</label>
        <input type="text" id="colors" name="colors" value={formData.colors} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
        {errors.colors && <p className="text-red-500">{errors.colors}</p>}    

        <label for="sizes" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Sizes:</label>
        <input type="text" id="sizes" name="sizes" value={formData.sizes} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
      {errors.sizes && <p className="text-red-500">{errors.sizes}</p>}   

        <label for="quantity" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Quantity:</label>
        <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}    

         <div className="flex">
          <div className='w-full'>
            <label for="sold" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Sold:</label>
            <input type="number" id="sold" name="sold" value={formData.sold} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
          </div>
          

          <div className='w-full'>
            <label for="isOutOfStock" class="block mb-2 font-sans font-medium">Out of Stock:</label>
            <input type="checkbox" id="isOutOfStock" name="isOutOfStock" checked={formData.isOutOfStock} onChange={() => setFormData((prevData) => ({ ...prevData, isOutOfStock: !prevData.isOutOfStock }))} class="ml-2" />
          </div>   
        </div>
        {errors.sold && <p className="text-red-500">{errors.sold}</p>}    
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <div class=" bg-white rounded p-4">
      <div className="mb-8">
          <label htmlFor="mainImage" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Main Image:</label>
          <label htmlFor="mainImage" className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer">
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              onChange={handleFileChange}
              className="hidden"
            />
            <span>Choose Main Image</span>
          </label>

          {mainImageUrl && <img src={mainImageUrl} alt="Main Image" className="w-32 h-32 mt-2" />}
        </div>
        {errors.mainImage && <p className="text-red-500">{errors.mainImage}</p>}    

        <div className="mb-8">
          <label htmlFor="images" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Images (multiple files):</label>
          <label htmlFor="images" className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer">
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImagesChange}
              multiple
              className="hidden"
            />
            <span>Choose Images</span>
          </label>
          <div className="flex">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-32 h-32 mt-2" />
          ))}
          </div>
          {errors.images && <p className="text-red-500">{errors.images}</p>}
        </div>
            

      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"></textarea>
        </div>
        {errors.description && <p className="text-red-500">{errors.description}</p>} 
      </div>
   
      <div class="flex justify-end">
        <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleSubmit}>Add Product</button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>Cancel</button>
      </div>
</div>

  );
};

export default AddProductModal;
