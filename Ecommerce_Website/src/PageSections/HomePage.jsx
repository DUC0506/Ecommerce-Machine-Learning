import React, { useEffect, useState } from "react";
import Landing from './Landing'
import Links from './Links'
import '../Styles/PageStyles/Homepage.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer'
import { BiMessageRoundedDots } from "react-icons/bi";
import { CiSquareChevDown } from "react-icons/ci";
import Chat from "../Components/pages/Chat";
import { useAuth } from "../hooks";

const HomePage = () => {
  const [showChat , setShowChat]=useState(false);
  const {authInfo}=useAuth()
  console.log(authInfo);
  const handleShowChat=(bool)=>{

    setShowChat(bool);
  }
  return (
    <div className='relative'>
      {console.log('Ahome page')}
       <ToastContainer/>
        <Landing/>
        <Links categorys={'Trending products'}/>
      
        <div className={`w-1/2   bottom-1 z-50 right-0 h-2/3  overflow-auto ${showChat ? 'fixed' : 'hidden'}`}>
          <div className="flex justify-end text-lg w-full cursor-pointer" 
            onClick={()=>handleShowChat(false)}><CiSquareChevDown /></div>

            <Chat role="seller" apartment={authInfo.profile.apartment}/>

            
        </div>
        <div className={ `${showChat ? 'hidden' : 'fixed'}  items-center justify-center mr-2  flex z-50 bg-yellow-400 right-0 bottom-0 py-2 px-6 rounded cursor-pointer`}
          onClick={()=>handleShowChat(true)}>
          <BiMessageRoundedDots className='text-2xl text-white ' />
          <div className='text-xl text-white font-sans'>Chat</div>
        </div>
        
        <Footer/>
        {console.log('foot page')}
    </div>
  )
}

export default HomePage