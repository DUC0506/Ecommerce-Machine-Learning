import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export default function NavbarAdmin({option1 , option2, option3}) {
  return (
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
  )
}
