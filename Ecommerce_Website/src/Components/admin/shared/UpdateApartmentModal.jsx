/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';

const UpdateApartmentModal = ({ isOpen, onRequestClose, apartment, onUpdateApartment }) => {
  
    const [editedApartment, setEditedApartment] = useState({...apartment} );
    console.log(editedApartment);
    const handleUpdate=() => {
        onUpdateApartment(editedApartment)
        onRequestClose()
    }

    const handleChange=(e) => {
        
        const {name,value}=e.target

        setEditedApartment((prevApartment)=>({...prevApartment,[name]:value}))
    }
    useEffect(() => {
        if (!isOpen) {
        setEditedApartment({ ...apartment });
          
        }
        setEditedApartment({ ...apartment });
        
      }, [isOpen, apartment]);
  return (
    <div class={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
      isOpen ? 'block' : 'hidden'
    }`}>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

    
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên Chung cư </label>
        <input type="text" id="name" placeholder='[Nội dung]+[Loại sản phẩm]' name="name"  value={editedApartment.name} onChange={handleChange}
        class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

        <label for="address" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Địa chỉ:</label>
        <input type="text" id="address" name="address"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedApartment.address}  onChange={handleChange} />

        <label for="numberOfCourt" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Số lượng tòa:</label>
        <input type="number" id="numberOfCourt" name="numberOfCourt"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedApartment.numberOfCourt}  onChange={handleChange} />

        <label for="numberOfHouse" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Số lượng căn hộ</label>
        <input type="text" id="numberOfHouse" name="numberOfHouse"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedApartment.numberOfHouse}  onChange={handleChange} />

        <label for="condition" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Tình trạng </label>
        <input type="text" id="condition" name="condition"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedApartment.condition}  onChange={handleChange} />
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <div class=" bg-white rounded p-4">
      

       
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Description:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={editedApartment.description}  onChange={handleChange}></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="button" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate} >Update Product</button>
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose} >Close</button>
      </div>
    </div>
  );
};

export default UpdateApartmentModal;
