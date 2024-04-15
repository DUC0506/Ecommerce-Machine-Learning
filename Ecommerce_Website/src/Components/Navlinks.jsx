import React from 'react'


const Navlinks = ({msg, svg }) => {
 
 
  return (
    <div className='md:flex items-center transition ease-in duration-200 ml-3 sm:hidden hover:bg-gray-200 px-2 rounded-full cursor-pointer'>
   {svg}
        <div>{msg}</div>
    </div>
  )
}

export default Navlinks