import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import {  DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS_ADMIN } from '../../lib/constants'
import { useAuth } from '../../../hooks'

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function SidebarAdmin() {
	const{handleLogout} = useAuth()
	const handleLogoutDB=() => {
		handleLogout();
	};

	return (
		<div className="bg-yellow-400 w-60 p-3 flex flex-col">
			<div className="flex items-center gap-2 px-1 py-3">
				<FcBullish fontSize={24} />
				<span className="text-white text-lg">OpenShop</span>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS_ADMIN.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				<div onClick={() => handleLogoutDB()} className={classNames(linkClass, 'cursor-pointer text-red-500') }>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Logout
				</div>
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-white', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}
