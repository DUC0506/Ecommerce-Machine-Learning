import React from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { AiTwotoneShopping,AiTwotoneNotification } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";

export default function Promotions() {
  return (
    <div>
        <div className='h-full py-6 px-10 '>
            <div className='text-2xl font-sans font-semibold mb-4'>Chiến dịch quảng cáo</div>
            <div className='p-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer'>
                <div  className='text-xl font-medium font-sans mb-2'>Chiến dịch</div>
                <div className='flex w-full text-xs font-sans font-medium items-center  '>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'><FcSalesPerformance className=' w-20 h-auto text-yellow-400' />
                        <div className='font-semibold text-lg'>1</div>
                    </div>
                    {/* <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Tự động hủy trong vòng 24h
                        <div className='font-semibold mt-4 text-xl'>0</div>
                    </div>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Quá hạn vận chuyển
                        <div className='font-semibold mt-4 text-xl'>0</div>
                    </div>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200 '>Đã hủy yêu cầu
                        <div className='font-semibold mt-4 text-xl' >0</div>
                    </div>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Kiện hàng bất thường 
                        <div className='font-semibold mt-4 text-xl'>0</div>
                    </div>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Yêu cầu trả hàng/hoàn tiền 
                        <div className='font-semibold mt-4 text-xl'>0</div>
                    </div> */}
                </div>
            
            </div>
            <div className='px-4 pb-8 pt-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer'>
                <div className='text-xl font-sans font-medium mt-2 mb-2'>Danh sách chiến dịch</div>
                <div className='text-sm font-sans font-thin text-gray-600 mb-8'>Tìm hiểu về các loại chiến dịch và cách đăng ký tham gia chiến dịch</div>
                <div className='text-xl font-sans font-medium underline underline-offset-4 decoration-yellow-400 mb-4'>Tất cả</div>
                <div className='border-2 border-slate-200 rounded'>
                    <div className='flex justify-between p-6 bg-yellow-500 rounded-t  mb-4'>
                        <div>
                            <h2 className='text-2xl font-sans font-bold mt-2 mb-2'>4.4 SALE Hè Chính Hãng 【3-5/04】</h2>
                            <p>19/03/2024 00:00(GMT+7) - 07/04/2024 07:00(GMT+7)</p>
                        </div>
                        <div><img className='w-32 h-auto rounded-md' src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Anh-sale.jpg" alt="sale" /></div>
                    </div>
                    <div className='flex justify-between p-4'>
                        <div>
                            <h3 className='font-medium font-sans text-lg mb-4'>【ĐẤU TRƯỜNG DEAL SỐC - 4.4 Sale Hè Chính Hãng】 - 【3-5/04】</h3>
                            <p className='font-medium font-sans text-gray-5 00 mb-8 flex justify-center items-center'> <AiTwotoneShopping className='text-xl' /> Chiến dịch sản phẩm | 03/04/2024 00:00(GMT+7) - 06/04/2024 07:00(GMT+7)</p>
                        </div>
                        <div>
                            <button className='bg-yellow-400 font-sans font-medium rounded py-2 px-4'>Đăng kí</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
