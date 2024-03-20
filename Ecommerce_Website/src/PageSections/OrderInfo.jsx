import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer';
import { getCart } from '../api/cart';
import { createOrder } from '../api/order';
import { FaCreditCard } from 'react-icons/fa';


const AddressSection = ({ onAddressChange }) => {
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    // Gọi hàm onAddressChange để truyền dữ liệu về phía cha (OrderInfoPage)
    onAddressChange({ city, phoneNumber, country, deliveryAddress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, phoneNumber, country, deliveryAddress]);
  return (


    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deliveryArea" className="block text-sm font-medium text-gray-700">
           Country
          </label>
          <input
            type="text"
            id="deliveryArea"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="deliveryAddress"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const TimePaymentNoteSection = ({ onTimePaymentNoteChange }) => {
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [showCreditCardFields, setShowCreditCardFields] = useState(false);
  const [showPayPalFields, setShowPayPalFields] = useState(false);

  useEffect(() => {
    // Gọi hàm onTimePaymentNoteChange để truyền dữ liệu về phía cha (OrderInfoPage)
    onTimePaymentNoteChange({ postalCode, paymentMethod, note,cardNumber,expiry,cvc });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode, paymentMethod, note,cardNumber,expiry,cvc]);

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
    setShowCreditCardFields(selectedPaymentMethod === 'creditCard');
    setShowPayPalFields(selectedPaymentMethod === 'paypal');
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Payment Method, and Notes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        {showCreditCardFields && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <label htmlFor="cardNumber" className="absolute top-0 left-0 pl-4 pt-3">
                  <FaCreditCard className="h-6 w-6 text-gray-400" />
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  className="mt-1 p-2 pl-12 border border-gray-300 rounded-md w-full"
                  placeholder="Card Number"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            <div>
              <input
                type="text"
                id="expiry"
                value={expiry}
                placeholder="MM/YY"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="cvc"
                value={cvc}
                placeholder="CVC"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
        )}
        {showPayPalFields && (
          <div>
            <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
              PayPal Email
            </label>
            <input
              type="email"
              id="paypalEmail"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {/* Add more fields for PayPal details */}
          </div>
        )}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="note"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};


const OrderInfoPage = () => {
 
    const [cart,setCart]=useState({})
    const [addressInfo, setAddressInfo] = useState({});
    const [timePaymentNoteInfo, setTimePaymentNoteInfo] = useState({})

  const handlePurchase = async() => {
    const part =timePaymentNoteInfo.expiry.split("/");
    const orderInfo = {
      paymentMethod:timePaymentNoteInfo.paymentMethod,
      phone:addressInfo.phoneNumber,
      shippingAddress:{
        address: addressInfo.deliveryAddress,
        city: addressInfo.city,
        country: addressInfo.country,
        postalCode: timePaymentNoteInfo.postalCode
      },
      cardNumber: parseInt(timePaymentNoteInfo.cardNumber), // Chuyển cardNumber thành số
      cvc: parseInt(timePaymentNoteInfo.cvc), // Chuyển cvc thành số
      expMonth: parseInt(part[0]), // Chuyển expMonth thành số
      expYear: parseInt(part[1]) // Chu
    }
   
    const{error,order} = await createOrder(orderInfo)
    console.log(orderInfo);
    if (error) return error.message;
    console.log(order);
    alert('Order placed successfully!');
  };
  const fetchCart = async() => {
    const{error,cart}=await getCart();
    if(error) return error.message;
    setCart(cart);
    console.log(cart);

  }
  
  const handleAddressChange = (addressData) => {
    setAddressInfo(addressData);
  };

  const handleTimePaymentNoteChange = (timePaymentNoteData) => {
    setTimePaymentNoteInfo(timePaymentNoteData);
  };
  useEffect(() => {
    fetchCart();
  },[])

  return (
    <div>
    <ToastContainer/>
    <Navbar/>
    <div className="container mx-auto  p-4">
      <h2 className="text-2xl font-bold  ">Order Information</h2>
      <div >
      {/* Phần địa chỉ nhận hàng */}
      <AddressSection onAddressChange={handleAddressChange}/>

      {/* Phần thời gian nhận hàng, phương thức thanh toán, và ghi chú */}
      <TimePaymentNoteSection onTimePaymentNoteChange={handleTimePaymentNoteChange} />

      {/* Phần thông tin hóa đơn và nút Đặt hàng */}
      {/* (Thêm các trạng thái và logic xử lý thông tin hóa đơn tại đây) */}

      </div>
      <div className="mb-2">
        <h3 className="text-xl font-semibold mb-2">Order Information </h3>
        <div>
          <p className='pt-4'>
            <strong>Total Amount:</strong> ${cart.totalQuantity}
          </p>
          <p className='pt-4'>
            <strong>Shipping Fee:</strong> Free
          </p>
          {/* <p>
            <strong>Discount Amount:</strong> ${discountAmount}
          </p> */}
          <p className='pt-4'>
            <strong>Total Payment:</strong> ${cart.totalPrice}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handlePurchase}
          className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 focus:outline-none"
        >
          Purchase
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default OrderInfoPage;

