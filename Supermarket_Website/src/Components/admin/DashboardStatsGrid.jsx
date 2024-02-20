import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { getTotalOrders, getTotalSales } from '../../api/order'
import { getUsers } from '../../api/user'

export default function DashboardStatsGrid() {
	const[totalSales,setTotalSales] = useState(0)
	const[totalUsers,setTotalUsers] = useState([{}])
	const[totalOrders,setTotalOrders] = useState([])
	const fetchTotalSales =async()=>{
		const{type,totalRevenue}=await getTotalSales();
		if(type==='error') return type;
		setTotalSales(totalRevenue)
	}
	const fetchTotalUsers =async()=>{
		const{type,users}=await getUsers();
		if(type==='error') return type;
		setTotalUsers(users)
	}
	const fetchTotalOrders =async()=>{
		const{type,totalOrder}=await getTotalOrders();
		if(type==='error') return type;
		setTotalOrders(totalOrder)
	}
	useEffect(() => {
	
		fetchTotalSales()
		fetchTotalUsers()
		fetchTotalOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Sales</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">${totalSales}</strong>
						<span className="text-sm text-green-500 pl-2">+343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Expenses</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">$3423</strong>
						<span className="text-sm text-green-500 pl-2">-343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalUsers?.length}</strong>
						<span className="text-sm text-red-500 pl-2">-30</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalOrders?.length}</strong>
						<span className="text-sm text-red-500 pl-2">-43</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
