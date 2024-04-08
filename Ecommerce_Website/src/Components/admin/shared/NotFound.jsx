import React from 'react'

export default function NotFound({ message}) {
  return (
    <div className='h-80'>
        <div className='flex justify-center rounded-sm'>
            <img src="https://res.cloudinary.com/dvdjknpvp/image/upload/v1712197109/images-cart-empty_os6qdh.jpg" alt="empty-cart" />
        </div>
        <div className='font-sans font-medium text-yellow-400 mt-8 flex justify-center'>{message}</div>
    </div>
  )
}
