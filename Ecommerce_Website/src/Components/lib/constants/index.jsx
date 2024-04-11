import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { AiOutlineNotification } from "react-icons/ai";
import { MdPolicy } from "react-icons/md";
import { SiInstatus } from "react-icons/si";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/dashboard/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/dashboard/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'promotions',
		label: 'Promotions',
		path: '/dashboard/promotions',
		icon: <AiOutlineNotification />
	},
	{
		key: 'finance',
		label: 'Finance',
		path: '/dashboard/finance',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'feed',
		label: 'Feed',
		path: '/dashboard/feed-seller',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'status',
		label: 'Status',
		path: '/dashboard/status',
		icon: <SiInstatus />
	},
	{
		key: 'policy',
		label: 'Policy',
		path: '/dashboard/policy',
		icon: <MdPolicy />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/dashboard/messages',
		icon: <HiOutlineAnnotation />
	}
	
]
export const DASHBOARD_SIDEBAR_LINKS_ADMIN = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'apartment',
		label: 'Apartment',
		path: '/dashboard/apartments',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/dashboard/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/dashboard/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'sellers',
		label: 'Sellers',
		path: '/dashboard/sellers',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/dashboard/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]

