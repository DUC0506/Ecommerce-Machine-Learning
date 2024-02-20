import { useDispatch } from 'react-redux'
import  {addToCart}  from '../features/addToCartSlice'
import { updateadded } from '../features/stateChangeSlice'
import { toast } from 'react-toastify';
import React from 'react'
import { addItemtoCart } from '../api/cart';
const Product = ({name, price, images, option, id,item}) => {
  const dispatch = useDispatch();
  // const updatestate = (id) => {
  //   dispatch(addToCart(id));
  //   dispatch(updateadded());
  //   toast.success('Added To Cart Successfully')
  // }

  const addItemCart =async(id)=>{
    const product={
      productId: id,
      quantity:1,
      selectedColor:item.colors[0]._id,
      selectedSize:item.sizes[0]._id,
    }
    const {error ,cart}=await addItemtoCart(product);
    if (error) return null;
    console.log(cart);
  }
  return (
    <div>
       <div className='inline-block items-center align-middle bg-gray-50 p-2 rounded-lg mb-2'>
                <div className='imagecont' style={{
                    backgroundImage:`${images}`
                }}>
                </div>
            <div className='flex justify-between items-center m-3'>
               <div className='mr-2'>
               <div className='font-bold text-sm'>{price}</div>
                <div className='header1 font-normal text-xs'>{name}</div>
               
                </div>
                <div><button onClick={() => addItemCart(id)} className='transition ease-out duration-200  border-gray-50 border-2 focus:ring-2 focus:ring-yellow-300  text-sm m-1 bg-yellow-500 mt-1 p-2 rounded-md text-slate-50'>Add to Cart</button></div>
        </div>
        <div className='text-xs p-1 px-2 m-2 bg-sky-100 rounded-sm text-sky-500 w-max'>{option}</div>
            </div>
    </div>
  )
}

export default Product
