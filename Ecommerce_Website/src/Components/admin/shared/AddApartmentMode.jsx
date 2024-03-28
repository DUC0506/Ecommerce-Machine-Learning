/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

const AddApartmentModal = ({ isOpen, onRequestClose, onAddApartment }) => {
  
    const [newApartment, setNewApartment] = useState({
        name: '',
        address: '',
        numberOfCourt: 0,
        numberOfHouse: 0,
        condition: '',
        description: ''
    });

    const handleAdd = () => {
        const formData = new FormData();

            formData.append('name', newApartment.name);
            formData.append('address', newApartment.address);
            formData.append('numberOfCourt', newApartment.numberOfCourt);
            formData.append('numberOfHouse', newApartment.numberOfHouse);
            formData.append('condition', newApartment.condition);
            formData.append('description', newApartment.description);
       

        onAddApartment(formData);
        onRequestClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewApartment(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
            isOpen ? 'block' : 'hidden'
            }`}>
            <h2 className="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>
            <div className="mb-8 bg-white rounded p-4">
                <label htmlFor="name" className=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên Chung cư </label>
                <input type="text" id="name" placeholder='[Nội dung]+[Loại sản phẩm]' name="name" value={newApartment.name} onChange={handleChange} className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />

                <label htmlFor="address" className="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Địa chỉ:</label>
                <input type="text" id="address" name="address" className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={newApartment.address} onChange={handleChange} />

                <label htmlFor="numberOfCourt" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Số lượng tòa:</label>
                <input type="number" id="numberOfCourt" name="numberOfCourt" className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={newApartment.numberOfCourt} onChange={handleChange} />

                <label htmlFor="numberOfHouse" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Số lượng căn hộ</label>
                <input type="number" id="numberOfHouse" name="numberOfHouse" className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={newApartment.numberOfHouse} onChange={handleChange} />

                <label htmlFor="condition" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Tình trạng </label>
                <input type="text" id="condition" name="condition" className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={newApartment.condition} onChange={handleChange} />
            </div>

            <h2 className="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
            <div className=" bg-white rounded p-4 mb-4">
                <div className="mb-8">
                    <label htmlFor="description" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Description:</label>
                    <textarea id="description" name="description" className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" value={newApartment.description} onChange={handleChange}></textarea>
                </div>
            </div>
            <div className="flex justify-end">
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleAdd}>Thêm Chung cư</button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>Close</button>
            </div>
        </div>
    );
};

export default AddApartmentModal;
