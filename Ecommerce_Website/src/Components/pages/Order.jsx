import React from 'react'
import RecentOrders from '../admin/RecentOrders'
import { IoSearchOutline } from 'react-icons/io5'
import NavbarAdmin from '../admin/shared/NavbarAdmin'

export default function Order() {
    
    const option1 =[{value :'Số lượng thấp đến cao'},{value :'Số lượng  cao đến thấp'}]
    const option2 =[{value :'Danh mục'},{value :'Thịt'},{value :'Cá'}]
    const option3=[{value :'Số lượng bán'},{value :'Từ thấp đến cao'},{value :'Từ cao đến thấp'}]
	return (
  
        <div className='h-full'>
            <NavbarAdmin option1={option1} option2={option2} option3={option3}/>
            <RecentOrders />
        </div>
    )
    
}
