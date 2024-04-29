
import React, { useEffect, useRef, useState } from 'react';



import { GrLike } from "react-icons/gr";


import { useNavigate } from 'react-router-dom';

import { MdSaveAlt } from "react-icons/md";
import { useAuth } from '../../../hooks';
import { MdCancel } from "react-icons/md";
import ReactPlayer from 'react-player';
import { getSellerProducts } from '../../../api/products';


export default function AddNewsModal({ isOpen,onRequestClose ,handleAddPost , avatar, name}) {
    const videoRef = useRef(null);
    const [shouldPlay, setShouldPlay] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showOptions, setShowOptions] = useState(false)
    const [products,setProducts] = useState([])
    const [imagePreviews, setImagePreviews] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        apartment: '',
        images:[],
        mainVideo:'',
        products: [],
    
      });


    const{authInfo}=useAuth()
    const navigate =useNavigate()
    useEffect(() => {
        fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchProducts=async()=>{
        const {type,message, products} = await getSellerProducts(authInfo.profile._id)
        if(type==='Success'){
          setProducts(products)
        }
        
    }
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files) {
          const imageFiles = [...imagePreviews];
          let videoFile = null;
          for (const file of files) {
            if (file.type.startsWith('image')) {
            setFormData((prevData) => ({ ...prevData, images: [...prevData.images, ...files] }));
              const reader = new FileReader();
              reader.onload = (e) => {
                imageFiles.push(e.target.result);
                console.log([...imageFiles]);
                setImagePreviews([...imageFiles]);
              };
              reader.readAsDataURL(file);
            } else if (file.type.startsWith('video')) {
                setFormData((prevData) => ({ ...prevData, mainVideo: files[0] }));
              setVideoPreview(URL.createObjectURL(file));
            }
          }
        }
      };
 
  
    const handleSavePost=()=>{
    //   onSavePost(id,contentNews)
      onRequestClose()
    }
 
   
   
    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if(name==='products')
        {
          setFormData((prevData) => ({ ...prevData, products:[...prevData.products,value]   }));
        }
        else
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        
      };
    const handleRemoveImage = (indexToRemove) => {
        setImagePreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
        setFormData(prevData => {
          const updatedImages = prevData.images.filter((_, index) => index !== indexToRemove);
          return { ...prevData, images: updatedImages };
      });
      };
      const formData1= new FormData()
    const handleCreatePost=()=>{
         
    for (const key in formData) {
        if (key === 'images') {
          formData[key].forEach((image) => {
            formData1.append(key, image);
          });
        }else if (key === 'apartment'){
            formData1.append(key, authInfo.profile.apartment);
        }
        else {
          formData1.append(key, formData[key]);
        }
      }
        
        handleAddPost(formData1)
    }

    return (
    <div className={`absolute z-40 backdrop-blur-sm bg-white/30 w-screen h-screen top-0 bottom-0 right-0 left-0   items-center justify-center  ${   isOpen ? 'flex' : 'hidden'}  `}>
      <div className={`bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative w-1/2  `}
       >
        <div className="flex items-center">
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <textarea name='title' className="text-gray-500 text-sm outline-none border-2 border-yellow-400 rounded px-2 " value={formData.title} onChange={handleChange} placeholder='Tiêu đề'></textarea>
          </div>
        </div>  
        <textarea className="mt-2 w-full outline-none border-2 border-yellow-400 rounded  px-2" name='content' value={formData.content} placeholder='Nội dung' onChange={handleChange}></textarea>
        <div className='w-full '>
        <div className='mt-2'>
            <input type='file' id='fileInput' multiple onChange={handleFileChange} className='hidden' />
            <label htmlFor="fileInput" className='cursor-pointer text-white px-4 py-2 bg-yellow-400 rounded w-1/3'>Choose Files</label>
        </div>
            
        <div className='flex '>
            {imagePreviews.map((imagePreview, index) => (
                <div key={index} className="relative">
         <img src={imagePreview} alt={`Preview ${index}`} className="mt-2 w-full rounded ml-1" />
            <button 
            className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded-full text-xs cursor-pointer"
            onClick={() => handleRemoveImage(index)}
            >
            X
            </button>
        </div>            ))}
            {videoPreview && <ReactPlayer url={videoPreview} controls className="mt-2" />}
            </div>
        </div>
        <div className='mt-4'>
            <p className='font-sans text-yellow-400 text-sm'>Chọn sản phẩm đính kèm </p>
            <select name="products" id="product" className='p-2 mt-1'  
             onChange={handleChange} >
            {products.map(product =>(
                <option name="item" value={product._id} key={ product._id} className='py-2'>{product.name}</option>
            ))}
               
            </select>

        </div>
         
        <div className="flex justify-end py-2  border-b-2  border-b-inherit">
          <button onClick={()=>handleCreatePost()}  className="bg-yellow-500 font-sans font-medium text-white flex items-center  px-4 py-2 mr-1 rounded"><MdSaveAlt   className='text-white text-lg mr-2'/>Thêm </button>
          <button onClick={()=>onRequestClose()}  className="bg-red-500 font-sans font-medium text-white rounded flex items-center px-4 py-2"><MdCancel  className='text-white text-lg mr-2' />Thoát</button>
        </div>
        
        </div>
        
        
       
      </div>
     
    );
  };