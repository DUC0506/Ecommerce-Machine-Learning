import React from 'react'
import RecentOrders from '../admin/RecentOrders'
import { IoSearchOutline } from 'react-icons/io5'
import NavbarAdmin from '../admin/shared/NavbarAdmin'
import { useAuth } from '../../hooks'

export default function OrderSeller() {
    const{authInfo} = useAuth()
    console.log(authInfo.profile);
    const option1 =[{value :'Số lượng thấp đến cao'},{value :'Số lượng  cao đến thấp'}]
    const option2 =[{value :'Danh mục'},{value :'Thịt'},{value :'Cá'}]
    const option3=[{value :'Số lượng bán'},{value :'Từ thấp đến cao'},{value :'Từ cao đến thấp'}]
	return (
  
        <div className='h-full'>
            <div className='p-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer'>
                <div  className='text-xl font-medium font-sans mb-2'>Cần hành động</div>
                <div className='flex w-full text-xs font-sans font-medium'>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Vận chuyển trong 24 giờ trở xuống
                        <div className='font-semibold text-xl'>0</div>
                    </div>
                    <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded  hover:bg-yellow-200'>Tự động hủy trong vòng 24h
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
                    </div>
                </div>
            
            </div>
            <NavbarAdmin option1={option1} option2={option2} option3={option3}/>
            <RecentOrders sellerId={authInfo.profile._id} />
        </div>
    )
    
}
