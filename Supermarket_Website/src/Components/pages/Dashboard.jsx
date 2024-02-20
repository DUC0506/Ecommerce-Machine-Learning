import React from 'react'
import DashboardStatsGrid from '../admin/DashboardStatsGrid'
import TransactionChart from '../admin/TransactionChart'
import RecentOrders from '../admin/RecentOrders'
import BuyerProfilePieChart from '../admin/BuyerProfilePieChart'
import PopularProducts from '../admin/PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders number={5} />
				<PopularProducts />
			</div>
		</div>
	)
}
