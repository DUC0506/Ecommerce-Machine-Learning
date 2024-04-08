import React from 'react'
import NavbarAdmin from '../admin/shared/NavbarAdmin'
import { IoSearchOutline } from 'react-icons/io5'

export default function Status() {
    const option1 =[{value :'Trạng thái kháng nghị'},{value :'Chưa kháng nghị'},{value :'Đang kháng nghị'},{value :' Kháng nghị thành công'},{value :'Kháng nghị không thành công'}]
    const option2 =[{value :'Loại vi phạm'},{value :'Vi phạm chính sách'},{value :'Vi phạm về hoàn thiện đơn hàng'},{value :'Vi phạm về chỉ số dịch vụ'},{value :'Các vi phạm khác '}]
    const option3=[{value :'Loại hình phạt'},{value :'Hình phạt đối với đơn hàng'},{value :'Hình phạt đối với người bán'}]
  return (
    <div>
        <h1 className='font-sans font-semibold text-2xl mt-4 mb-4'>Tình trạng cửa hàng</h1>
         <div>
         <div className="flex items-center space-x-4  ">
                      <span className='font-sans  font-medium'>Tất cả</span>
                      <span className='font-sans  font-medium text-yellow-400 underline  underline-offset-8   '>Hồ sơ vi phạm</span>
                      <span className='font-sans  font-medium'>Bị hủy bỏ</span>
                      <span className='font-sans  font-medium'>Đang xét duyệt</span>
                      <span className='font-sans  font-medium'>Bị đình chỉ</span>
                      <span className='font-sans  font-medium'>Nháp</span>
                      <span className='font-sans  font-medium'>Đã xóa</span>
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
            {option1.map((opt, index) => (
                    <option key={index} className='font-sans py-4  '>{opt.value}</option>
            ))}
    
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
            {option2.map((opt, index) => (
                    <option key={index} className='font-sans py-4  '>{opt.value}</option>
            ))}
                   
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
                    {option3.map((opt, index) => (
                            <option key={index} className='font-sans py-4  '>{opt.value}</option>
                    ))}
                  
            </select>
          </div>
        </div>
        </div>
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<div className="w-full">
				{/* Dòng tiêu đề */}
				<div className="flex bg-gray-200 mb-2 w-full ">
					<div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">ID</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Loại vi phạm</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Thời gian tạo</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Loại thực thi </div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex"> Lý do vi phạm</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Trạng thái kháng nghị</div>
					
					
				</div>
				{[].map((order, index) => (
					<div key={order._id} className={`flex rounded w-full bg-white ${index !== 0 ? 'mt-2' : ''}`}>
						<div className="w-1/6 font-sans font-medium flex p-4 items-center justify-center">{index+1}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">{order.products?.length}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">{order.user?.username}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{} </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.totalPrice} </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.shippingAddress?.address},{order.shippingAddress?.city},{order.shippingAddress?.country} </div>
						
					</div>
				))}
			</div>

		</div>
    </div>
  )
}
