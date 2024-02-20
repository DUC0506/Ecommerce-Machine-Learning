import React, { useEffect, useState } from 'react';
import { getCart, increaseOneProduct, reduceOneProduct } from '../api/cart';
import { useNavigate } from 'react-router-dom'
const CartItem = ({ id, name, price, quantity, discount, image, onIncrease, onDecrease,color,size }) => {
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-12 h-12 object-cover rounded" />
        <div className="ml-4">
          <p className="font-bold">{name}</p>
          <p className="text-gray-600">${discountedPrice.toFixed(2)}</p>
          {discount > 0 && <p className="text-red-500">Discount: {discount}% off</p>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => onDecrease(id,color,size)} className="text-gray-500">
          -
        </button>
        <p className="font-bold">{quantity}</p>
        <button onClick={() => onIncrease(id,color,size)} className="text-gray-500">
          +
        </button>
        <p className="font-bold">${(discountedPrice * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart,setCart]=useState({})
  console.log(1);
  const fetchCart= async ()=>{
      const {error, cart}= await getCart();
      if (error) return error;
      setCart(cart)
      setCartItems(cart.items)
      console.log(cart);
  }
  const navigate =useNavigate()

  const discountCode = 'DISCOUNT123';
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const handleApplyDiscount = (code) => {
    if (code === discountCode) {
      setAppliedDiscount(discountCode);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleIncreaseQuantity = async(itemId,color,size) => {
    const dataProduct={
      productId: itemId,
      selectedColor: color,
      selectedSize: size,
    }
    const {error,cart}=await increaseOneProduct(dataProduct)
    console.log(cart);
   if (error)  return error.message;
   fetchCart()
  };

  const handleDecreaseQuantity = async(itemId,color,size) => {
    const dataProduct={
      productId: itemId,
      selectedColor: color,
      selectedSize: size,
    }
    const {error,cart}=await reduceOneProduct(dataProduct)
   if (error)  return error.message;
    fetchCart()
  };

 

  const handlePlaceOrder = () => {
    navigate(`/checkout?cartId=${cart._id}`)
  };

  useEffect(() => {
    fetchCart();
  },[])

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item,index) => (
        <CartItem
          key={index}
          id={item.product.id} 
          name={item.product.name}
          price={item.product.priceAfterDiscount}
          quantity={item.totalProductQuantity}
          discount={item.product.priceDiscount}
          color={item.selectedColor._id}
          size={item.selectedSize._id}
           image={item.product.mainImage}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
        />
      ))}
      <div className="flex justify-end mt-4">
        <p className="font-bold text-xl">Total: ${cart.totalPrice}</p>
      </div>
      <div className="flex justify-center mt-8">
        <input type="text" placeholder="Enter discount code" className="border p-2 mr-2" />
        <button
          onClick={() => handleApplyDiscount(discountCode)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Apply Discount
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePlaceOrder}
          className="bg-yellow-400 text-white px-8 py-3 rounded-md hover:bg-yellow-500 focus:outline-none"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
