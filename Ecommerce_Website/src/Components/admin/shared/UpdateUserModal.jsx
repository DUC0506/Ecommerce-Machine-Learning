/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';

const UpdateUserModal = ({ isOpen, onRequestClose, user, onUpdateUser }) => {
  
    const [editedUser, setEditedUser] = useState({...user} );
    const [mainImageUrl, setMainImageUrl] = useState('');
    console.log(editedUser);
    const handleUpdate=() => {
        onUpdateUser(editedUser)
        onRequestClose()
    }

    const handleChange=(e) => {
        
        const {name,value}=e.target

        setEditedUser((prevUser)=>({...prevUser,[name]:value}))
    }
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        // Update main image in editedProduct state
        setEditedUser((prevProduct) => ({
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
    useEffect(() => {
        if (!isOpen) {
            setEditedUser({ ...user });
          
        }
        setEditedUser({ ...user });
        
      }, [isOpen, user]);
  return (
    <div class={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
      isOpen ? 'block' : 'hidden'
    }`}>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

    
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên người dùng </label>
        <input type="text" id="name" placeholder='[Nội dung]+[Loại sản phẩm]' name="name"  value={editedUser.name} onChange={handleChange}
        class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="address" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Tài khoản</label>
        <input type="text" id="address" name="address"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.username}  onChange={handleChange} />

        <label for="numberOfCourt" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Email</label>
        <input type="text" id="numberOfCourt" name="numberOfCourt"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.email}  onChange={handleChange} />

        <label for="numberOfHouse" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Password</label>
        <input type="text" id="numberOfHouse" name="numberOfHouse"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.password}  onChange={handleChange} />

        <label for="condition" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Role</label>
        <input type="text" id="condition" name="condition"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.role}  onChange={handleChange} />
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <div class=" bg-white rounded p-4">
      
      <div className="mb-8">
          <label htmlFor="mainImage" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>
          Main Image:</label>
          {/* <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
            className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500"
          /> */}
          {editedUser.profileImage && <img src={editedUser.profileImage} alt="Main Image" className="w-32 h-auto" />}
          {mainImageUrl && <img src={mainImageUrl} alt="Main Image" className="w-32 h-auto" />}
        </div>  
       
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Address:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.address}  onChange={handleChange}></textarea>
        </div>
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Company:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.companyName}  onChange={handleChange}></textarea>
        </div>
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Phone:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.phone}  onChange={handleChange}></textarea>
        </div>
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Apartment:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.apartment.name}  onChange={handleChange}></textarea>
        </div>
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Create At:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedUser.createAt}  onChange={handleChange}></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        {/* <button type="button" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate} >Update Product</button> */}
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose} >Close</button>
      </div>
    </div>
  );
};

export default UpdateUserModal;
