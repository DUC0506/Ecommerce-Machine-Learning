import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'
import { getTotalOrders, orderStatus } from '../../api/order'


export default function RecentOrders({number,sellerId}) {
	const[recentOrders,setRecentOrders]=useState([{}])
	
	const fecthRecentOrders=async ()=>{
	
		const{type,orders}=await getTotalOrders(number,sellerId,)
		if(type==='error') return type;
		setRecentOrders(orders)
		console.log(orders);
		
	}

	const handleStatusChange = async(id, newStatus) => {
		console.log(newStatus);
		const {type,message}=await orderStatus(id,newStatus);
		if(type === 'error') return message;
		console.log(message);
		fecthRecentOrders();
	  };
	useEffect(() => {
	
		fecthRecentOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	return (
		
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<div className="w-full">
				{/* Dòng tiêu đề */}
				<div className="flex bg-gray-200 mb-2 w-full ">
					<div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">ID</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Product Total</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Customer Name</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Order Date </div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex"> Order Total</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Shipping Address</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Order Status</div>
					{/* <div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div> */}
				</div>
				{recentOrders.map((order, index) => (
					<div key={order._id} className={`flex rounded w-full bg-white ${index !== 0 ? 'mt-2' : ''}`}>
						<div className="w-1/6 font-sans font-medium flex p-4 items-center justify-center">{index+1}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">{order.products?.length}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">{order.user?.username}</div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{format(new Date(2), 'dd MMM yyyy')} </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.totalPrice} </div>
						<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.shippingAddress?.address},{order.shippingAddress?.city},{order.shippingAddress?.country} </div>
						<div className="w-1/6 font-sans font-medium  justify-center flex items-center p-4">
							<select
								value={order.status}
								onChange={(e) => handleStatusChange(order._id, e.target.value)}
							>
								<option value="Not Processed">Not Processed</option>
								<option value="Processing">Processing</option>
								<option value="Shipped">Shipped</option>
								<option value="Delivered">Delivered</option>
								<option value="Cancelled">Cancelled</option>
							</select>
						</div>
					</div>
				))}
			</div>

		</div>
	)
}
