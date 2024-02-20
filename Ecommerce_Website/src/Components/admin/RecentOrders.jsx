import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'
import { getTotalOrders, orderStatus } from '../../api/order'

// const recentOrderData = [
// 	{
// 		id: '1',
// 		product_id: '4324',
// 		customer_id: '23143',
// 		customer_name: 'Shirley A. Lape',
// 		order_date: '2022-05-17T03:24:00',
// 		order_total: '$435.50',
// 		current_order_status: 'PLACED',
// 		shipment_address: 'Cottage Grove, OR 97424'
// 	},
// 	{
// 		id: '7',
// 		product_id: '7453',
// 		customer_id: '96453',
// 		customer_name: 'Ryan Carroll',
// 		order_date: '2022-05-14T05:24:00',
// 		order_total: '$96.35',
// 		current_order_status: 'CONFIRMED',
// 		shipment_address: 'Los Angeles, CA 90017'
// 	},
// 	{
// 		id: '2',
// 		product_id: '5434',
// 		customer_id: '65345',
// 		customer_name: 'Mason Nash',
// 		order_date: '2022-05-17T07:14:00',
// 		order_total: '$836.44',
// 		current_order_status: 'SHIPPED',
// 		shipment_address: 'Westminster, CA 92683'
// 	},
// 	{
// 		id: '3',
// 		product_id: '9854',
// 		customer_id: '87832',
// 		customer_name: 'Luke Parkin',
// 		order_date: '2022-05-16T12:40:00',
// 		order_total: '$334.50',
// 		current_order_status: 'SHIPPED',
// 		shipment_address: 'San Mateo, CA 94403'
// 	},
// 	{
// 		id: '4',
// 		product_id: '8763',
// 		customer_id: '09832',
// 		customer_name: 'Anthony Fry',
// 		order_date: '2022-05-14T03:24:00',
// 		order_total: '$876.00',
// 		current_order_status: 'OUT_FOR_DELIVERY',
// 		shipment_address: 'San Mateo, CA 94403'
// 	},
// 	{
// 		id: '5',
// 		product_id: '5627',
// 		customer_id: '97632',
// 		customer_name: 'Ryan Carroll',
// 		order_date: '2022-05-14T05:24:00',
// 		order_total: '$96.35',
// 		current_order_status: 'DELIVERED',
// 		shipment_address: 'Los Angeles, CA 90017'
// 	}
// ]

export default function RecentOrders({number}) {
	const[recentOrders,setRecentOrders]=useState([{}])
	
	const fecthRecentOrders=async ()=>{
	
		const{type,totalOrder}=await getTotalOrders(number)
		if(type==='error') return type;
		setRecentOrders(totalOrder)
		console.log(totalOrder);
		
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
			<strong className="text-gray-700 font-medium">Recent Orders</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th>ID</th>
							<th>Product Total </th>
							<th>Customer Name</th>
							<th>Order Date</th>
							<th>Order Total</th>
							<th>Shipping Address</th>
							<th>Order Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders?.map((order,index) => (
							<tr key={index}>
								<td className="py-2 px-4">
									<Link to={`/order/${order.id}`}>#{index+1}</Link>
								</td>
								<td className="py-2 px-4">
									<Link to={`/product/${order.product_id}`}>{order.products?.length }</Link>
								</td>
								<td className="py-2 px-4">
									<Link to={`/customer/${order.customer_id}`}>{order.user?.name}</Link>
								</td >
								<td className="py-2 px-4">{format(new Date(2), 'dd MMM yyyy')}</td>
								<td className="py-2 px-4">{order.totalPrice}</td>
								<td className="py-2 px-4">{order.shippingAddress?.address},{order.shippingAddress?.city},{order.shippingAddress?.country}</td>
								<td className="py-2 px-4">   
								<select
               						 value={order.status}
										onChange={(e) => handleStatusChange(order._id, e.target.value)}
										>
									<option value="Not Processed">Not Processed</option>
									<option value="Processing">Processing</option>
									<option value="Shipped">Shipped</option>
									<option value="Delivered">Delivered</option>
									<option value="Cancelled">Cancelled</option>
								</select></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
