import React, { useState, useEffect } from 'react';
import { MdDeleteForever ,MdEdit} from "react-icons/md";

import { IoSearchOutline } from 'react-icons/io5';
import {  useNotification } from '../../hooks';
import { createPromotion, getPromotion, getPromotions, removePromotion, updatePromotion } from '../../api/promotion';
import UpdatePromotionModal from '../admin/shared/UpdatePromotionModal ';
import AddPromotionModal from '../admin/shared/AddPromotionModal';
// Import hàm để lấy danh sách apartment từ API

const PromotionSeller = () => {
    const[promotions, setPromotions] =useState([])
  const [promotion, setPromotion] = useState();
  const [isUpdateApartmentModalOpen, setUpdateApartmentModalOpen] = useState(false);
  const [isAddPromotionModalOpen, setAddPromotionModalOpen] = useState(false);

  const {updateNotification}= useNotification();
  useEffect(() => {
    // Gọi API để lấy danh sách apartment khi component được render
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const{type, message, promotions}= await getPromotions()
    console.log(promotions);
    if(type ==='Error') return message
    setPromotions(promotions)
}
  const handleInfo=async(promotionId)=>{
   const {type,message,promotion}=await getPromotion(promotionId)
   console.log(promotion);
   setPromotion(promotion)
   setUpdateApartmentModalOpen(true);
   
  }
  const handleDeleteApartment =async (promotionId) => { 
    const {type,message }= await removePromotion(promotionId);
    if (type==='Error') return message;
    updateNotification('success',message)
    fetchPromotions();
  }
  const handlePromotionApartment= async(promotion1)=>{
    console.log(promotion1);
    const id=promotion1._id;
    const {type,message,promotion}=await updatePromotion(id,promotion1)
    if (type === 'Error') return message;
    updateNotification('success',message)
    fetchPromotions()
  }
  const handleAddPromotion=async(newPromotion)=>{
    console.log(newPromotion);
    const {type,message,promotion}=await createPromotion(newPromotion)
    if (type === 'Error') return message;
    updateNotification('success',message)
    fetchPromotions()
  }
  

  return (
    <div className='h-full '>
   
      <div className=' mx-auto p-8 relative w-full h-full'>
      <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-medium font-sans">Quản lý chiến dịch quảng cáo</h1>
                <button onClick={() => setAddPromotionModalOpen(true)} className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium">
                Thêm khuyến mại
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
        {promotions.map(promotion => (
         <div key={promotion.id} className={ isUpdateApartmentModalOpen || isAddPromotionModalOpen 
         ? ` hidden ` :`bg-white rounded-lg shadow-md p-6 mb-2 flex justify-between `}>
          <div>
          <div className='flex justify-between p-6 bg-yellow-500 rounded-t mb-4'>
                            <div>
                                <h2 className='text-2xl font-sans font-bold mt-2 mb-2'>{`${promotion.name} 【${new Date(promotion.startDate).toDateString()} - ${new Date(promotion.endDate).toDateString()}】`}</h2>
                                <p>{`${new Date(promotion.startDate).toDateString()} (GMT+7) - ${new Date(promotion.endDate).toDateString()} (GMT+7)`}</p>
                            </div>
                            <div><img className='w-32 h-auto rounded-md' src={promotion.mainImage} alt="sale" /></div>
                        </div>
                      
          </div>
       
         <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
							<button  className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
              onClick={()=>handleDeleteApartment(promotion._id)}>
                        <MdDeleteForever />
							</button>
              <button  className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded" 
              onClick={()=>handleInfo(promotion._id)}>
                            <MdEdit />
							</button>
						</div>
            
         {/* Hiển thị các thông tin khác của apartment nếu cần */}
       </div>
        ))}
        <AddPromotionModal isOpen={isAddPromotionModalOpen} 
        onRequestClose={() => setAddPromotionModalOpen(false)}
        onAddPromotion={handleAddPromotion}/>
          {
            promotion &&
        <UpdatePromotionModal
        isOpen={isUpdateApartmentModalOpen}
        onRequestClose={() => setUpdateApartmentModalOpen(false)}
        promotion={{ ...promotion }}
        onUpdatePromotion={handlePromotionApartment}/>
          }
      </div>
      
    </div>
  );
};

export default PromotionSeller;
