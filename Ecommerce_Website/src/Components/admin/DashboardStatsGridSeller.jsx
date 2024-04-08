import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { getTotalOrders, getTotalSales, getTotalSalesBySeller } from '../../api/order'
import { getSellers } from '../../api/user'
import { TbCurrencyDong } from "react-icons/tb";
import { useAuth } from '../../hooks';

export default function DashboardStatsGridSeller() {
	const[recentOrders,setRecentOrders]=useState([{}])
	const[totalUsers,setTotalUsers] = useState([{}])
	const[totalOrders,setTotalOrders] = useState([])
	const{authInfo} = useAuth()
	const fetchRecentOrders=async ()=>{
	
		const{type,deliveredOrders}=await getTotalSalesBySeller(authInfo.profile._id)
		if(type==='error') return type;
		setRecentOrders(deliveredOrders)
		console.log(deliveredOrders);
		
	}
	const totalOrderPriceAll = recentOrders.reduce((total, order) => total + order.totalPrice, 0);
	const fetchTotalUsers =async()=>{
		const{type,users}=await getSellers();
		if(type==='error') return type;
		setTotalUsers(users)
	}
	const fetchTotalOrders =async()=>{
		const{type,orders}=await getTotalOrders(null,authInfo.profile._id);
		if(type==='error') return type;
		setTotalOrders(orders)
	}
	useEffect(() => {
	
		fetchRecentOrders()
		fetchTotalUsers()
		fetchTotalOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	
	return (
		<div className="flex gap-4">
			<BoxWrapper >
				<div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4 cursor-pointer">
					<span className="text-sm text-gray-500 font-sans font-normal">Total Sales</span>
					<div className="flex items-center cursor-pointer">
						<strong className="text-xl text-gray-700 font-semibold font-sans">{totalOrderPriceAll}</strong>
						<span className="text-xl text-yellow-500 pl-2"><TbCurrencyDong /></span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4 cursor-pointer">
					<span className="text-sm text-gray-500  font-sans font-normal">Total Expenses</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold font-sans">3423</strong>
						<span className="text-xl text-yellow-500 pl-2"><TbCurrencyDong /></span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4 cursor-pointer">
					<span className="text-sm text-gray-500 font-normal font-sans">Total Customer</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold font-sans">{totalUsers?.length}</strong>
						
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper className="rounded">
				<div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4 cursor-pointer">
					<span className="text-sm text-gray-500 font-normal font-sans">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold font-sans">{totalOrders?.length}</strong>
				
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
