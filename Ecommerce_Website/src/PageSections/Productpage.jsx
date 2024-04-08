import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../Components/Navbar'
import Links from './Links'
import Footer from '../Components/Footer';

export default function Productpage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let queryParamValue = urlParams.get('category'); // Thay 'queryParamName' bằng tên của query parameter bạn muốn lấy

  console.log(queryParamValue);


  let idCategory
    if(queryParamValue==='Trai Cay'){
      idCategory="6613e85ddf25192bb94fc43d"
    }
    else if(queryParamValue==='Thit'){
      idCategory="65af1d4b4620fa8010cff722"
    }
    else if(queryParamValue==='Hai san'){
      idCategory="6613e8abdf25192bb94fc440"
    }
    else if(queryParamValue==='Do an nhanh'){
      idCategory="6613e877df25192bb94fc43e"
    }
    else if(queryParamValue==='Thuc pham nha lam'){
      idCategory="6613e8a0df25192bb94fc43f"
    }
    console.log(idCategory);
    useEffect(() => {
      // In ra giá trị của query parameter
    }, [])
  return (
    <div>
        <ToastContainer />
        <Navbar />
        <Links categorys={queryParamValue} idCategory={idCategory}/>
        <Footer />
    </div>
  )
}
