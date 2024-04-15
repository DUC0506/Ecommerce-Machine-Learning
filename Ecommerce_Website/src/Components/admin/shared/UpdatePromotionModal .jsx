/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';

const UpdatePromotionModal = ({ isOpen, onRequestClose, promotion, onUpdatePromotion }) => {
  
    const [editedPromotion, setEditedPromotion] = useState({...promotion} );
    console.log(editedPromotion);
    const handleUpdate=() => {
       onUpdatePromotion(editedPromotion)
        onRequestClose()
    }

    const handleChange=(e) => {
        
        const {name,value}=e.target

        setEditedPromotion((prevApartment)=>({...prevApartment,[name]:value}))
    }
    useEffect(() => {
        if (!isOpen) {
          setEditedPromotion({ ...promotion });
          
        }
        setEditedPromotion({ ...promotion });
        
      }, [isOpen, promotion]);
  return (
    <div class={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
      isOpen ? 'block' : 'hidden'
    }`}>
      <h2 class="text-2xl  mb-4 font-sans font-medium font-sans">Thông tin cơ bản</h2>

    
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên chiến dịch quảng cáo </label>
        <input type="text" id="name" placeholder='Tên chiến dịch quảng cáo' name="name"  value={editedPromotion.name} onChange={handleChange}
        class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500 font-sans" />

        <label for="startDate" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Ngày bắt đầu</label>
        <input type="date" id="startDate" name="startDate"  class="w-full border p-2 mb-4 focus:outline-none font-sans  focus:border-yellow-500" value={new Date(editedPromotion.startDate).toISOString().split('T')[0]}  onChange={handleChange} />

        <label for="endDate" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Ngày kết thúc</label>
        <input type="date" id="endDate" name="endDate"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500 font-sans" value={new Date(editedPromotion.endDate).toISOString().split('T')[0]}  onChange={handleChange} />

        
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <img src={editedPromotion.mainImage} alt="promotion-img" className='w-32' />
      <div class=" bg-white rounded p-4">
      

       
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="description" class="flex mb-2 font-sans font-medium "><p className='text-red-500'>*</p>Description:</label>
          <textarea id="description" name="description"  class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500 font-sans" value={editedPromotion.description}  onChange={handleChange}></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="button" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2 font-sans" onClick={handleUpdate} >Update Promotion</button>
        <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded font-sans" onClick={onRequestClose} >Close</button>
      </div>
    </div>
  );
};

export default UpdatePromotionModal;
