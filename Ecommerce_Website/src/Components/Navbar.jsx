import React, { useState } from 'react'
import '../Styles/ComponentStyles/Navbar.css'
import Logo from '../assets/Logo.png'

import {  useSelector } from 'react-redux'
import Search from './Search'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { FaUser } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  
  const { item } = useSelector((state) => state.add)
  const [showCategories, setShowCategories] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate=useNavigate()
  const{handleLogout,authInfo} = useAuth()
console.log(authInfo)
  const handleCategoryHover = () => {
    setShowCategories(true);
  };

  const handleCategoryLeave = () => {
    setShowCategories(false);
  }
  // const loginUser=() => {

  //   navigate('/signIn',{replace:true})
  // };
  const handleCart=() => {

    navigate('/cart')
  };
  const navigateHome=() => {
    navigate('/')
  }
  const navigateUserInfo=() => {
    navigate('/user-info')
  }
  const navigateMyOrder=() => {
    navigate('/user-order')
  }

	const handleLogoutDB=() => {
		handleLogout();
    navigate('/signIn')
	};
  const handleNews=()=>{
    navigate('/feed-page')
  }
  const handleNavigate=(name)=>{
    navigate(`/product-page?category=${name}`)
}
  return (
    <div className='nav-cover'>
        <div className='divide-y divide-gray-200  items-center'>
            <div className='main-nav'>
            <div className='w-14 h-14 py-1' onClick={()=>navigateHome()}>
                <img src={Logo} alt='logo'/>
            </div>
                <Search/>
                <div className='hidden md:inline-block text-right '>
                    <div className='font-bold text-gray-800'>090-995-973-33</div>
                    <small className=''>Call Us on</small>
                </div>
                <div className='flex w-32 justify-between'>
           <div className="relative inline-block "
           onMouseEnter={() => setShowDropdown(true)}
           onMouseLeave={() => setShowDropdown(false)}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg> */}
            <img src={authInfo.profile.profileImage} alt="avt" className='rounded-full w-8' />
            <div className='absolute py-4 bg-amber-300 left-0 mt--4 w-24 opacity-0 '></div>
            {showDropdown && (
              <div   className="absolute left-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div onClick={()=>navigateUserInfo()} className="flex px-4 py-2 font-sans text-sm font-medium hover:bg-yellow-400 rounded-md cursor-pointer items-center"> <FaUser className='text-yellow-400 mr-1 text-xl' />Tài khoản của tôi</div>
                <div onClick={()=>navigateMyOrder()} className=" px-4 py-2 font-sans text-sm font-medium hover:bg-yellow-400 rounded-md cursor-pointer flex"><FiPackage className='text-yellow-400 mr-1 text-xl' />Đơn hàng của tôi</div>
                <div onClick={()=>handleLogoutDB()}  className=" px-4 py-2 font-sans text-sm font-medium hover:bg-yellow-400 hover:text-white rounded-md cursor-pointer flex">
                <IoIosLogOut className='text-yellow-400 mr-1 text-xl hover:text-white ' /> Đăng xuất
                </div>
              </div>
            )}
          </div>
<div class="inline-flex relative items-center cursor-pointer ">
<svg xmlns="http://www.w3.org/2000/svg" onClick={() =>handleCart()} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
  {item && <div class="inline-flex absolute -top-1 -right-4 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{item}</div>}
</div>
<svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

    </div>
            </div>
            <div className='w-full'>
                <div className='m-auto flex justify-between items-center max-w-7xl text-xs p-3'>
                    <div className='flex'>
                    <div className='pr-2 relative text-gray-800 font-semibold flex items-center bg-yellow-400 p-1 rounded-sm cursor-pointer'
                    onMouseEnter={handleCategoryHover}
                    onMouseLeave={handleCategoryLeave}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
<div className='pl-2'>SHOP BY CATEGORY</div>  
              {showCategories && (
              <div className='absolute top-full left-0  bg-white w-full rounded-md shadow-md'>
             
                {/* Add your category links here */}
                <div  className='block py-2 mt-1 pl-2 category-link hover:bg-yellow-400 font-sans' onClick={() => handleNavigate('Trai Cay')}>Trái cây</div>
                <div className='block py-2 pl-2 category-link hover:bg-yellow-400 font-sans' onClick={() => handleNavigate('Thit')}>Thịt</div>
                <div  className='block py-2 pl-2 hover:bg-yellow-400 font-sans' onClick={() => handleNavigate('Hai san')}>Hải sản</div>
                <div  className='block py-2 pl-2 hover:bg-yellow-400 font-sans' onClick={() =>  handleNavigate('Do an nhanh')}>Đồ ăn nhanh</div>
                <div className='block py-2 pl-2 hover:bg-yellow-400 font-sans' onClick={() => handleNavigate('Thuc pham nha lam')}>Thực phẩm nhà làm</div>
                <div className='block py-2 pl-2 hover:bg-yellow-400 font-sans'>Second hand</div>
                {/* <a href='/' className='block py-2 pl-2 hover:bg-yellow-400 font-sans'>Category 7</a>
                <a href='/' className='block py-2 pl-2 hover:bg-yellow-400 font-sans'>Category 8</a>
                <a href='/' className='block py-2 pl-2 hover:bg-yellow-400 font-sans'>Category 9</a> */}
                {/* <div  className='block py-2 pl-2 hover:bg-yellow-400 font-sans'>Category 10</div> */}
                {/* Add more categories as needed */}
              </div>
              )}
     
                    </div>
                    <div className='md:ml-5 md:flex hidden'>
                   {/* <Navlinks msg={'News Today'} svg={ <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 mr-1">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
</svg>}/> */}
        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer' onClick={()=>handleNews()}>
          <FaRegNewspaper className=' mr-1 text-yellow-400 text-lg' />
                  <div className='text-yellow-400'>News Today</div>
        </div>
  
        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
        <IoPricetagsOutline className='mr-1' />
                  <div>Special Prices</div>
        </div>
        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1' />
                    <div>Coupons</div>
        </div>
 
        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1' />
                    <div>Cheap Offers</div>
        </div>
  
        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1'/>
                    <div>Gift Cards</div>
        </div>

        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1' />
                    <div>Hot Deals</div>
        </div>

        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1' />
                    <div>Imported</div>
        </div>

        <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
          <FaAngleDown className='mr-1' />
                    <div>Deals Today</div>
        </div>
                   </div>
                   </div>
                    <div></div>
                    <div className="flex items-center  transition ease-in duration-200 ml-3  hover:bg-gray-200 px-2 py-2 rounded-full cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="mr-2 w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3" />
</svg>
Recently Viewed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar