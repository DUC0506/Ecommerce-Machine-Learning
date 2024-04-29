import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks'
import { getOrder, getTotalOrders, getTotalSalesBySeller, orderStatus } from '../../api/order'
import NavbarAdmin from '../admin/shared/NavbarAdmin'
import { TbCurrencyDong } from "react-icons/tb";
import { IoCard } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";

export default function Finance() {
	const[recentOrders,setRecentOrders]=useState([{}])
    const[hideModal, setHideModal]=useState(false)
    const[order,setOrder]=useState({})
	const{authInfo} = useAuth()
    const sellerId=authInfo.profile._id

    const option1 =[{value :'Doanh thu thấp đến cao'},{value :'Doanh thu  cao đến thấp'}]
    const option2 =[{value :'Khoảng thời gian'},{value :'1 tuần '},{value :'1 tháng'}]
    const option3=[{value :'Ngày đặt hàng'},{value :'Từ thấp đến cao'},{value :'Từ cao đến thấp'}]
	const fetchRecentOrders=async ()=>{
	
		const{type,deliveredOrders}=await getTotalSalesBySeller(sellerId)
		if(type==='Success') 
        {
            setRecentOrders(deliveredOrders)
		    console.log(deliveredOrders);
        }
		
		
	}
    const handleInfo=async (id)=>{
        const {type,order}=await getOrder(id)
        console.log(order);
        setOrder(order)
        setHideModal(true)
    }

	const handleStatusChange = async(id, newStatus) => {
		console.log(newStatus);
		const {type,message}=await orderStatus(id,newStatus);
		if(type === 'error') return message;
		console.log(message);
		fetchRecentOrders();
	  };

     let time = new Date()
     // Tính tổng totalPrice của tất cả các đơn hàng
     console.log(recentOrders);
     let totalOrderPriceAll
     if(recentOrders.length > 0) {
     totalOrderPriceAll = recentOrders.reduce((total, order) => total + order.totalPrice, 0);
     }
     else{
        totalOrderPriceAll=0
     }

	useEffect(() => {
	
		fetchRecentOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	return (
		
		<div className=''>

			<div className="w-full ">
              <h2 className='font-sans text-2xl font-semibold'>Số tiền rút</h2>  
              <div className='flex w-full justify-between '>
                    <div className=' rounded bg-white w-1/2 p-8 m-2'>
                        <p className='font-sans font-medium text-sm'>Cập nhật dữ liệu vào ngày {time.toLocaleString()}</p>
                        <div className='font-sans font-medium text-xl'>Số tiền rút khả dụng</div>
                        <div className='font-sans font-medium text-xl flex items-center justify-between mt-2'>
                            <div className='flex items-center'>{totalOrderPriceAll} <TbCurrencyDong /> </div>
                            <div className='font-sans font-medium text-xl bg-yellow-400  py-2 px-6 rounded justify-center items-center cursor-pointer'>Rút</div>
                        </div>
                        
                    </div>
                    <div className='rounded bg-white w-1/2 p-8 m-2'>
                        <div className='font-sans font-medium text-xl mb-2 '>Tài khoản ngân hàng</div>
                        <div className='font-sans font-medium text-xl flex items-center mt-2'> <IoCard className='mr-1' /> Số tài khoản</div>
                    </div>
              </div>
                <div className='p-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer'>
                    <div  className='text-xl font-medium font-sans mb-2'>Quyết toán</div>
                    <div className='flex w-full text-xs font-sans font-medium'>
                        <div className='w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200'>Tổng tiền quyết toán
                            <div className='font-normal font-sans mt-4 text-sm'>Tuần trước/Tháng trước</div>
                        </div>
                        <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded text-2xl flex items-center justify-center  hover:bg-yellow-200'>=
                            
                        </div>
                        <div className='w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200'>Tổng doanh thu
                            <div className='font-normal font-sans mt-4 text-sm '>Tuần trước/Tháng trước</div>
                        </div>
                        <div className='w-1/6 font-sans font-medium p-2 mr-2 rounded text-2xl flex items-center justify-center  hover:bg-yellow-200 '>+
                            
                        </div>
                        <div className='w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200'>Tổng phí
                            <div className='font-normal font-sans text-sm mt-4 '>Tuần trước/Tháng trước</div>
                        </div>
                       
                    </div>
                
                </div>
                <NavbarAdmin option1={option1} option2={option2} option3={option3}/>
                <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
				
				<div className="flex bg-gray-200 mb-2 w-full">
					<div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">ID</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Ngày đặt hàng</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Ngày quyết toán</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Số tiền thanh toán </div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex"> Doanh thu</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Hành động</div>
					
					{/* <div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div> */}
				</div>
				{recentOrders.map((order, index) => (
					<div key={order._id} className={`flex rounded w-full bg-white  ${index !== 0 ? 'mt-2' : ''}`}>
						<div className="w-1/6 font-sans font-medium flex p-4 items-center justify-center">{order._id}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">12/4/2024</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">13/4/2024</div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{(order.totalPrice)*0.98}<TbCurrencyDong /> </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.totalPrice}<TbCurrencyDong />  </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4 cursor-pointer" onClick={()=>handleInfo(order._id)}>Xem chi tiết </div>
						
					</div>
				))}

               
			</div>
                <div className= {hideModal ? 'absolute bg-white w-1/2 h-auto top-1/3 right-10 p-6 cursor-pointer z-10 border-2 border-yellow-400 ' : 'hidden' }>
                    <div className='flex justify-between'>
                        <h1 className='font-sans font-semibold text-2xl'>Chi tiết quyết toán</h1>
                        <ImCancelCircle className='text-yellow-400 text-xl ' onClick={()=>setHideModal(false)} />
                    </div>
                    <div className='flex w-full justify-between mt-4 border-t-2 border-yellow-400 pt-8 '>
                        <div className='font-sans font-medium text-sm'>
                            <div className='font-sans'>Ngày đặt hàng</div>
                            <div className='mt-2 font-sans'>9/20/2024</div>
                        </div>
                        <div className='font-sans font-medium text-sm'>
                            <div className=' font-sans'>Ngày quyết toán</div>
                            <div className='mt-2 font-sans'>9/20/2024</div>
                        </div>
                        <div className='font-sans font-medium text-sm '>
                            <div className='font-sans flex justify-center'>ID</div>
                            <div className='mt-2 font-sans'>{order._id}</div>
                        </div>
                    </div>
                    <div className='flex justify-between  w-full border-b-2 border-yellow-400 pb-8'>
                        <div className='font-sans font-medium text-sm'>
                            <div className='mt-2 font-sans'>Doanh thu</div>
                            <div className='mt-2 font-sans flex items-center'>{(order.totalPrice)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                        <div className='font-sans font-medium text-sm'>
                            <div className='mt-2 font-sans'>Phí</div>
                            <div className='mt-2 font-sans flex items-center'>{((order.totalPrice) *0.02)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div  >
                        <div className='font-sans font-medium text-sm'>
                            <div className='mt-2 font-sans flex justify-center'>Quyết toán</div>
                            <div className='mt-2 font-sans flex items-center'>{((order.totalPrice)*0.98)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                    </div>
                    <div className='flex  w-full'>
                        <div className='flex justify-between  w-full font-sans font-medium text-sm border-b-2 border-yellow-400 pb-6 pt-2 '>
                            <div className='mt-2 font-sans'>Tổng Doanh thu</div>
                            <div className='mt-2 font-sans flex items-center'>{(order.totalPrice)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                        
                    </div>
                    <div className='  w-full border-b-2 border-yellow-400 pb-8'>
                        <div className='font-sans font-medium text-sm flex justify-between'>
                            <div className='mt-2 font-sans'>Phí</div>
                            <div className='mt-2 font-sans flex items-center'>{((order.totalPrice) *0.02)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                        <div className='flex justify-between  w-full font-sans font-medium text-sm'>
                            <div className=' ml-2 mt-2 font-sans'>Phí hoa hồng cho nền tảng</div>
                            <div className=' ml-2 mt-2 font-sans flex items-center'>{((order.totalPrice) *0.012)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                        <div className='flex justify-between font-sans font-medium text-sm'>
                            <div className=' ml-2 mt-2 font-sans'>Phí hoa giao dịch</div>
                            <div className=' ml-2 mt-2 font-sans flex items-center'>{((order.totalPrice) *0.008)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                        
                    </div>
                    <div className='flex  w-full'>
                        <div className='flex justify-between  w-full font-sans font-semibold text-xl border-b-2 border-yellow-400 pb-4'>
                            <div className='mt-2 font-sans'>Tổng tiền quyết toán</div>
                            <div className='mt-2 font-sans flex items-center'>{((order.totalPrice)*0.98)?.toFixed(3)}<TbCurrencyDong /> </div>
                        </div>
                    </div>
                    
                </div>
      </div>
    </div>           
	)
}

