import React from 'react'


import RecentOrders from '../admin/RecentOrders'

import PopularProducts from '../admin/PopularProducts'
import { useAuth } from '../../hooks'
import TransactionChartSeller from '../admin/TransactionChartSeller'
import DashboardStatsGridSeller from '../admin/DashboardStatsGridSeller'

export default function DashboardSeller() {
	const{authInfo} = useAuth()
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGridSeller />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChartSeller />
				
			</div>
			<div className="flex flex-row gap-4 w-full">
			<RecentOrders sellerId={authInfo.profile._id} />
				<PopularProducts />
			</div>
		</div>
	)
}
