import React, { useEffect, useState } from 'react'

import { AiTwotoneShopping } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { getPromotions } from '../../api/promotion';
import { useNavigate } from 'react-router-dom';

export default function Promotions() {
    const navigate=useNavigate()
    const[promotions, setPromotions] =useState([])
    const fetchPromotions = async () => {
        const{type, message, promotions}= await getPromotions()
        console.log(promotions);
        if(type ==='Error') return message
        setPromotions(promotions)
    }
    const handleNavigateCampaign = (id)=>{
        navigate(`/dashboard/campaign/${id}`)
    }
    useEffect(()=>{
        fetchPromotions()
    },[])
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
    
                </div>
            
            </div>
            <div className='px-4 pb-8 pt-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer'>
                <div className='text-xl font-sans font-medium mt-2 mb-2'>Danh sách chiến dịch</div>
                <div className='text-sm font-sans font-thin text-gray-600 mb-8'>Tìm hiểu về các loại chiến dịch và cách đăng ký tham gia chiến dịch</div>
                <div className='text-xl font-sans font-medium underline underline-offset-4 decoration-yellow-400 mb-4'>Tất cả</div>
                {promotions.length > 0 && promotions.map(promotion => (
                    <div className='border-2 border-slate-200 rounded mt-4' key={promotion.id}>
                        <div className='flex justify-between p-6 bg-yellow-500 rounded-t mb-4'>
                            <div>
                                <h2 className='text-2xl font-sans font-bold mt-2 mb-2'>{`${promotion.name} 【${new Date(promotion.startDate).toDateString()} - ${new Date(promotion.endDate).toDateString()}】`}</h2>
                                <p>{`${new Date(promotion.startDate).toDateString()} (GMT+7) - ${new Date(promotion.endDate).toDateString()} (GMT+7)`}</p>
                            </div>
                            <div><img className='w-32 h-auto rounded-md' src={promotion.mainImage} alt="sale" /></div>
                        </div>
                        <div className='flex justify-between p-4'>
                            <div>
                                <h3 className='font-medium font-sans text-lg mb-4'>【ĐẤU TRƯỜNG DEAL SỐC - ${promotion.name}】 - {`${new Date(promotion.startDate).toDateString()} - ${new Date(promotion.endDate).toDateString()}`}</h3>
                                <p className='font-medium font-sans text-gray-500 mb-8 flex justify-center items-center'> <AiTwotoneShopping className='text-xl' /> Chiến dịch sản phẩm | {`${new Date(promotion.startDate).toDateString()} (GMT+7) - ${new Date(promotion.endDate).toDateString()} (GMT+7)`}</p>
                            </div>
                            <div>
                                <button className='bg-yellow-400 font-sans font-medium rounded py-2 px-4' onClick={()=>handleNavigateCampaign(promotion.id)}>Đăng kí</button>
                            </div>
                        </div>
                    </div>
                ))}

                
            </div>
            
        </div>
    </div>
  )
}
