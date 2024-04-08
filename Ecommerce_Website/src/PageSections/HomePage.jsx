import React from 'react'
import Landing from './Landing'
import Links from './Links'
import '../Styles/PageStyles/Homepage.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div>
      {console.log('Ahome page')}
       <ToastContainer/>
        <Landing/>
        <Links categorys={'Trending products'}/>
        <Footer/>
        {console.log('foot page')}
    </div>
  )
}

export default HomePage