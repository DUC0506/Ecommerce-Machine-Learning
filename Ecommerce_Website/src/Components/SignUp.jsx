import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import { getAllApartments } from '../api/apartment';
import { useNavigate } from 'react-router-dom'
import { resisterUser } from '../api/auth';

const SignUp = () => {
    const[apartments, setApartments]=useState([])
    const [userInfo,setUserInfo]= useState({
        email:"",
        password:"",
        apartment:'',
        passwordConfirmation:'',
        role:'user',
        name:'',
        username:'',
        image:File,
    })
      
      const{handleLogin ,handleLogout}=useAuth()

    async function urlToObject  () {
      const response = await fetch('https://res.cloudinary.com/dvdjknpvp/image/upload/v1711597612/Users/Duc/f2cqjkvnzvuz4v9opheg.webp');
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', {type: blob.type});
      console.log(file);
      return file;
    }

    
    
  const navigate = useNavigate()

    const fetchApartments = async ()=>{
        const {type , apartments} =await getAllApartments()

        setApartments(apartments)
        
    }
    

   
    const handleChange=({target})=>{
        const{value,name}=target;
        
        setUserInfo({...userInfo,[name]:value})
        
      }
      console.log(userInfo);


  const handleSubmit = async() => {
    const file = await   urlToObject()
    const formData=new FormData()
    formData.append('name', userInfo.name);
    formData.append('username', userInfo.username);
    formData.append('email', userInfo.email);
    formData.append('password', userInfo.password);
    formData.append('passwordConfirmation', userInfo.passwordConfirmation);
    formData.append('role', userInfo.role);
    formData.append('image', file);
    formData.append('apartment', userInfo.apartment);

  
    

    const {type,user}=await resisterUser(formData)
    console.log(user);
    if(user){
      
        handleLogin(user.email, user.password)
        
    }

    
  };
  const handleNavigator=()=>{
    navigate(`/signIn`)
  }
  useEffect(()=>{
    fetchApartments()
    
  },[])

  return (
    <div className="min-h-screen w-full p-14  flex items-center  justify-center bg-green-500">
      <div className='flex'>
      <div class='rounded-l-lg h-full shadow-md bg-yellow-300 '>
        <img src="https://res.cloudinary.com/dvdjknpvp/image/upload/v1712047012/psd-healthy-menu-promotion-social-media-instagram-story-banner-template_541452-309_zzrsmy.jpg" alt="12" />
      </div>


      <div className=" p-8 rounded-r-lg shadow-md w-2/3  bg-white  '">
        <h2 className="text-2xl font-bold font-sans mt-8 ">Xin chào,</h2>
        <h2 className="text-2xl font-bold mb-10 font-sans">Hãy đăng kí !</h2>
        <form>
          <div className="mb-4 flex">
           
            <input
              type="email"
              name='email'
              id="email"
              className="w-1/2  rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 m-1 "
              placeholder="Email Address"
              value={userInfo.email}
              onChange={handleChange}
            />
             <div className='w-1/2'>
                <select name="apartment" id="apartment" value={userInfo.apartment} onChange={handleChange} className='w-full rounded-md px-2 py-4 hover:outline-yellow-400 active:outline-yellow-400 outline-none'>
                    {apartments.map((apartment, index) => (
                        <option key={index} value={apartment._id} className='text-base font-medium font-sans py-2'>{apartment.name}</option>
                    ))}
                </select>
            </div>
          </div>
          <div className="mb-4 flex">
           
            <input
              type="text"
              name='name'
              id="name"
              className="w-full  rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 mr-1 "
              placeholder="Tên"
              value={userInfo.name}
              onChange={handleChange}
            />
             <input
              type="text"
              name='username'
              id="username"
              className="w-full  rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 "
              placeholder="Tên người dùng"
              value={userInfo.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex">
        
            <input
              type="password"
              name='password'
              id="password"
              className="w-full rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 mr-1"
              placeholder=" Mật Khẩu"
              value={userInfo.password}
              onChange={handleChange}
            />
             <input
              type="password"
              name='passwordConfirmation'
              id="passwordConfirmation"
              className="w-full rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400"
              placeholder=" Xác nhận mật khẩu"
              value={userInfo.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
         
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-yellow-400 text-white text-xl font-sans font-medium  w-full py-3 mt-2 mb-4 rounded-md hover:bg-yellow-600 focus:outline-none"
          >
            Đăng Ký
          </button>
        </form>
          <div className='flex text-base '>
            <div className='font-sans font-medium text-current'>Đã có tài khoản?</div>
            <div className='font-sans font-medium ml-1 text-yellow-400 cursor-pointer' onClick={()=>handleNavigator()}>Đăng nhập</div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
