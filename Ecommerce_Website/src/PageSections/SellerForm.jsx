/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import { getUser, updateUserToSeller } from '../api/user';
import { useNavigate } from 'react-router-dom';

const SellerForm = () => {
  const navigate=useNavigate()
  const {authInfo,handleLogout}=useAuth()
  const [step, setStep] = useState(1);
  const [sellerInfo, setSellerInfo] = useState({
    name: '',
    email: ''
    
  });

  const [taxInfo, setTaxInfo] = useState({
    taxAddress: '',
    taxEmail: '',
    taxId:''
  });

  
  const [identityInfo, setIdentityInfo] = useState({
    idCard: '',
    nameCard: ''
  });
   const fetchUser=async() =>{
      const {type,message,user} = await getUser(authInfo.profile._id)
      setTaxInfo({...taxInfo , taxAddress :user.address ,taxEmail :user.email})
      setSellerInfo(user)
      
   }
 

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  useEffect(()=>{
    fetchUser()
  },[])
  console.log(taxInfo);
  console.log(identityInfo);
  
  const handleSaveSeller=async()=>{
    const taxAndCard={
      taxAddress: taxInfo.taxAddress,
      taxEmail: taxInfo.taxEmail,
      taxId: taxInfo.taxId,
      cardId: identityInfo.idCard,
      cardName: identityInfo.nameCard
    }
    const {type, message,user} = await updateUserToSeller(taxAndCard)
    console.log(user);
    navigate(`/signIn`)
    handleLogout()
  }

  const handleChange = (e, infoType) => {
    const { name, value } = e.target;
    
    switch (infoType) {
      case 'sellerInfo':
        setSellerInfo({ ...sellerInfo, [name]: value });
        break;
      case 'taxInfo':
        setTaxInfo({ ...taxInfo, [name]: value });
        break;
      case 'identityInfo':
        setIdentityInfo({ ...identityInfo, [name]: value });
        break;
      default:
        break;
    }
  };
 

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className='w-full'>
            <h2 className='font-sans text-xl font-semibold'>Thông tin nhà bán hàng</h2>
            <div className='font-sans mt-2'>Tên nhà bán hàng</div>
            <input
              type="text"
              name="name"
              value={sellerInfo.name}
              onChange={(e) => handleChange(e, 'sellerInfo')}
              placeholder="Tên nhà bán hàng"
              className='w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
            />
            <div className='font-sans mt-2'>Email</div>
            <input
              type="email"
              name="email"
              value={sellerInfo.email}
              onChange={(e) => handleChange(e, 'sellerInfo')}
              placeholder="Email"
              className='w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'

            />
            <div className='flex w-full'>
              <div className='w-1/2 mr-2'>
                <div className='font-sans mt-2'>Địa chỉ </div>
                <input
                  type="text"
                  name="address"
                  value={sellerInfo.address}
                  onChange={(e) => handleChange(e, 'sellerInfo')}
                  placeholder="Địa chỉ nhà bán hàng"
                  className='w-full mt-4 mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'

                />
              </div>
              
              <div className='w-1/2 '>
                <div className='font-sans mt-2'>Tên khu chung cư </div>
                <input
                type="text"
                name="apartment"
                value={sellerInfo.apartment?.name}
                onChange={(e) => handleChange(e, 'sellerInfo')}
                placeholder="Tên khu chung cư"
                className='w-full my-4  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'

              />
              </div>
             
            </div>
              <div className='font-sans mt-2'>Số điện thoại</div>
              <input
              type="phone "
              name="sdt"
              value={sellerInfo.phone}
              onChange={(e) => handleChange(e, 'sellerInfo')}
              placeholder="Số điện thoại"
              className='w-full  mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'

            />
            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className='font-sans font-semibold'>Thông tin thuế</h2>
            <div className='mt-4 font-sans'>Loại hình kinh doanh</div>
            <input
              type="text"
              name="taxId"
              value='Cá nhân'
              onChange={(e) => handleChange(e, 'taxInfo')}
              className='w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
             
            />
            <div className='font-sans mt-4'>Địa chỉ đăng kí kinh doanh</div>
            <input
              type="text"
              name="taxAddress"
              value={taxInfo.taxAddress}
              onChange={(e) => handleChange(e, 'taxInfo')}
              placeholder="Mã số thuế"
              className='w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
            />
            <div className='mt-4 font-sans'>Email nhận thông báo</div>
             <input
              type="text"
              name="taxEmail"
              value={taxInfo.taxEmail}
              onChange={(e) => handleChange(e, 'taxInfo')}
              placeholder="Mã số thuế"
              className='w-full   px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
            />
             <div className='mt-4 font-sans'>Mã số thuế</div>
             <input
              type="text"
              name="taxId"
              value={taxInfo.taxId}
              onChange={(e) => handleChange(e, 'taxInfo')}
              placeholder="Mã số thuế"
              className='w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
            />
            
            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className='font-sans font-semibold'>Thông tin định danh</h2>
            <div className='mt-4 font-sans'>Số căn cước công dân</div>
            <input
              type="text"
              name="idCard"
              value={identityInfo.idCard}
              onChange={(e) => handleChange(e, 'identityInfo')}
              placeholder="Số CMND/CCCD"
              className='w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'

            />
            <div className='mt-4 font-sans'>Họ và tên</div>
             <input
              type="text"
              name="nameCard"
              value={identityInfo.nameCard}
              onChange={(e) => handleChange(e, 'identityInfo')}
              placeholder="Nguyen Van A"
              className='w-full  px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans'
            />
            {/* Thêm các trường thông tin khác ở đây */}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg h-3/4 my-4 ">
      <form className=''>
        {renderForm()}
        <div className="flex justify-between mt-4">
          {step !== 1 && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 font-sans text-gray-800 font-bold py-2 px-4 rounded"
              onClick={prevStep}
            >
              Quay lại
            </button>
          )}
          {step !== 3 ? (
            <button
              type="button"
              className="bg-yellow-400 hover:bg-yellow-500  ml-auto text-white font-bold py-2 px-4 rounded font-sans"
              onClick={nextStep}
            >
              Tiếp theo
            </button>
          ) : (
            <button
             type="button"
             onClick={()=>handleSaveSeller()}
              className="bg-yellow-500 hover:bg-yellow-500 font-sans text-white font-bold py-2 px-4 rounded"
            >
              Lưu
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
