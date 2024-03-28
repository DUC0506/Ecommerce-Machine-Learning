/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { getCategory } from '../../../api/category';
import { IoSearchOutline } from 'react-icons/io5';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getAllOrders } from '../../../api/order';

const HistoryTransaction = () => {
  const [orders,setOrders]=useState([]);
    let { id } = useParams();
    console.log(id);



  const fetchOrders = async () => {

     const {type,message,orders} = await getAllOrders(id)

        console.log(orders);
        setOrders(orders)

    }
  
  const handleInfo=async(userId)=>{
  
   
  }
  const handleDeleteUser =async (apartmentId) => { 
  
  }
  const handleUpdateUser= async(user1)=>{
   
  }
  const handleAddUser=async(newUser)=>{
    
  }
  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full '>
   
      <div className=' mx-auto p-8 relative w-full h-full'>
      <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-medium font-sans">Quản lý người dùng</h1>
                <button className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium">
                Thêm người dùng
                </button>
            </div>
			<div>
			<div className="flex items-center space-x-4  ">
                    <span className='font-sans  font-medium'>Tất cả</span>
                    <span className='font-sans  font-medium text-yellow-400 underline  underline-offset-8   '>Đang hoạt động</span>
                    <span className='font-sans  font-medium'>Bị hủy bỏ</span>
                    <span className='font-sans  font-medium'>Đang xét duyệt</span>
                    <span className='font-sans  font-medium'>Bị đình chỉ</span>
                    <span className='font-sans  font-medium'>Nháp</span>
                    <span className='font-sans  font-medium'>Đã xóa</span>
                </div>
			  </div>

            <div className="mb-4 mt-4 font-sans border rounded flex flex-col md:flex-row md:justify-between pt-8 pb-8 pl-4 pr-4 bg-gray-200">
				<div className="w-full  mb-4 md:mb-0 mr-2">
					<div className="relative">
						<input type="text" placeholder="Tìm kiếm..." className="w-full px-4 py-2 border rounded focus:outline-none hover:border-yellow-500" />
						<span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
						<IoSearchOutline />
						</span>
					</div>
				</div>
				<div className="w-full font-sans  md:w-auto flex space-x-4 ">
					<select className="w-full md:w-auto px-4 py-2 border rounded  cursor-pointer focus:outline-none hover:border-yellow-500 ">
						<option className='font-sans py-4  '>Số lượng tòa thấp đến cao</option>
						<option className='font-sans py-2 '>Số lượng tòa cao đến thấp</option>
					</select>
					<select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
						<option className='font-sans  ' >Địa chỉ</option>
                        
						{/* Thêm các lựa chọn loại sản phẩm vào đây */}
					</select>
                    <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
						<option className="font-sans p-4 hover:bg-yellow-500">Trạng thái</option>
                        <option className='font-sans py-2  ' >Cũ</option>
                        <option className='font-sans py-2 '>Mới</option>
						{/* Thêm các lựa chọn loại sản phẩm vào đây */}
					</select>
				</div>
			  </div>
              <div className="w-full">
				{/* Dòng tiêu đề */}
				<div className="flex bg-gray-200 mb-2 ">
					<div className="w-1/4 py-2 px-4 font-sans font-medium justify-center flex ">User</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">User name</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Email</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">role</div>
                    <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Chung cư</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div>
				</div>

				{/* Các dòng sản phẩm */}
				{orders.map((order, index) => (
					<div key={order._id} className={`flex rounded bg-white ${index !== 0 ? 'mt-2' : ''}`}>
						<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{order.status}</div>
						<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{order.totalPrice}</div>
						<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{order.paymentMethod}</div>
						<div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">{order.taxPrice} </div>
						<div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">{order?.phone} </div>
						<div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
							<button onClick={() => handleDeleteUser(order._id)} className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded">
                            <MdDeleteForever />
							</button>
                            <button  onClick={() => handleInfo(order._id)} className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded">
                            <MdEdit />
							</button>
						</div>
					</div>
				))}
               
			</div>
       
      </div>
      
    </div>
  );
};
export default HistoryTransaction;
