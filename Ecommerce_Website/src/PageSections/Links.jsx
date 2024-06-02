import React, { useEffect, useState } from 'react'
import '../Styles/PageStyles/Links.css'
import {  useDispatch } from 'react-redux'
// import  svgimg  from '../assets/svgs/svg-001.svg'
import Product from '../Components/Product'
import svgimg2 from '../assets/svgs/svg-3.svg'
import svgimg3 from '../assets/svgs/sbg-003-b.svg'
import svgimg5 from '../assets/svgs/svg-002-f.svg'
// import svgimg6 from '../assets/svgs/svg-6.svg'
// import svgimg1 from '../assets/svgs/svg-1.svg'
import svgcos from '../assets/svgs/svg-cos.svg'
import svgimg10 from '../assets/svgs/svg-006-d.svg'
import svgimg9 from '../assets/svgs/svg-004-g.svg'
// import svgimg8 from '../assets/svgs/svg-005-t.svg'
import { comingsoon } from '../features/stateChangeSlice'
import {  getProductsByApartment, getProductsSearchByApartment } from '../api/products'
import NotFound from '../Components/admin/shared/NotFound'
import { useNavigate } from 'react-router-dom'
import { FaRegCaretSquareLeft } from "react-icons/fa";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { useNotification } from '../hooks'
// import lens from '../assets/images/img-5.png'
const Links = ({categorys , idCategory,searchText}) => {
        const dispatch = useDispatch();
        const {updateNotification}= useNotification()
        // const { items } = useSelector((state) => state.add);
        const navigate= useNavigate()
               
        const [items,setItems]=useState([])
        const [numberPage,setNumberPage]=useState(1)
        const [numbers,setNumbers]=useState(3)
        const [limit,setLimit]=useState(3) 
        
        const fetchItems=async()=>{
                const{error,message,products}=await getProductsByApartment(idCategory,numberPage)
                if(error) return message;
                console.log(products);
                if(products){
                setItems([...products]);
                }
        }
        const fetchSearchItems=async()=>{
                const{type,message,products}=await getProductsSearchByApartment(searchText,numberPage)
                if(type==="Error") {
                        console.log(message);
                        updateNotification('error',message)
                };
               
                if(products){
                setItems([...products]);
                }
        }
        const handleNavigate=(name)=>{
                navigate(`/product-page?category=${name}`)
        }
        const handleNumberPage=(num)=>{
                if(num===limit+2)
                {       
                        setLimit(limit+2)
                        
                }
                else if(num===2){
                        setLimit(3)
                }
                setNumberPage(num)
        }
        console.log(numberPage)
        console.log(limit)
        const handleLeftNum=()=>{
                console.log(numberPage, limit)
                if(numberPage===1) 
                {
                        setNumberPage(1)
                }
                else if(limit >3 && numberPage===limit){
                        setLimit(limit-2)
                        setNumberPage(numberPage-1)
                }
                
                else  setNumberPage(numberPage-1)
               
        }
        const handleRightNum=()=>{
                console.log(numberPage, limit)
                if(numberPage===limit+2) 
                {
                        setLimit(limit+3)
                }
                 setNumberPage(numberPage+1)
               
        }
        useEffect(() => {
                if(searchText!==''){
                        console.log(1123);
                        fetchSearchItems()
                }
                else {
                        fetchItems();
                }
               
                // fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[idCategory,numberPage,searchText])
  return (
    <div className='m-auto max-w-6xl mt-16'>
        <div className='flex sitems-center'>
            <div className='flex items-center '>
        <div className='font-semibold text-xl text-gray-800 font-sans'>Tất cả danh mục</div>
        {/* <div className=' text-gray-500 text-center text-xs ml-4 font-sans'>Tất cả danh mục</div> */}
        </div>
        </div>
        <div className='flex m-auto max-w-4xl mt-4 flex-wrap align-middle items-center justify-center w-full'>
            <div onClick={() => handleNavigate('Trai Cay')} className='mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-pink-500 hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out  text-center align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg5} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Trái cây </div>
            </div>

            <div onClick={() => handleNavigate('Thit')} className=' mx-2 my-2 md:inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-gray-500 hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out text-center align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg2} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Thịt</div>
            </div>

            <div onClick={() => handleNavigate('Hai san')} className='mx-2 my-2 md:inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-red-400 text-center hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg10} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Hải sản</div>
            </div>

            <div onClick={() =>  handleNavigate('Do an nhanh')} className='mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center text-center hover:shadow-yellow-500  hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgcos} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Đồ ăn nhanh</div>
            </div>

            <div onClick={() => handleNavigate('Thuc pham nha lam')} className=' mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-violet-500 text-center hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg3} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Thực phẩm nhà làm</div>
            </div>

            <div onClick={() => dispatch(comingsoon())} className='mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-violet-500 text-center hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg9} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center font-sans'>Second hand</div>
            </div>
{/* 
            <div onClick={() => dispatch(comingsoon())} className='mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-blue-500 text-center hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center'>Fashion</div>
            </div>

            <div onClick={() => dispatch(comingsoon())} className='mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center text-center hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out align-middle bg-gray-400 bg-opacity-20'>
                    <div className='items-center m-auto w-10 h-14 mb-1'><img src={svgimg8} alt='svg' className=""/></div>
                    <div className='text-gray-700 text-xs text-center'>Appliances</div>
            </div> */}
        </div>
        <div className='flex align-bottom items-center mb-4'>
            <div className='font-semibold text-xl text-gray-800 mr-4 font-sans'>{categorys}</div>
            {/* <div className='text-xs text-gray-500 font-sans'>All product </div> */}
        </div>


        {/* product section */}
        <div className=''>
        <div className='flex justify-around mb-5 flex-wrap w-full'>
                {items.length> 0 ?(items && items.map((item) => (
                        <div key={item.id}>
                                <Product item={item} id={item.id} name={item.name} price={item.price} images={`url('${item.mainImage}')`}/>
                        </div>
                ))) : <NotFound message='There are no sellers in your apartment complex listing the product for sale' />}
        </div>
                <div className='flex w-full items-center justify-center my-4'>
                        <TiChevronLeftOutline onClick={()=>{handleLeftNum()}} className=' text-3xl font-medium text-yellow-400 cursor-pointer mr-4' />
                        <div onClick={() => handleNumberPage(1)} className={`text-lg px-4 py-1 rounded mr-1 font-sans cursor-pointer font-semibold ${numberPage === 1 ? 'bg-yellow-400' : ''}`}>1</div>
                        <div onClick={() => handleNumberPage(2)} className={`text-lg px-4 py-1 rounded mr-1 font-sans cursor-pointer font-semibold ${numberPage === 2 ? 'bg-yellow-400' : ''}`}>2</div>
                        {Array.from({length: numbers}, (_, index) => (
                                <div onClick={() => handleNumberPage(index+limit)} className={`text-lg px-4 py-1 rounded mr-1 font-sans cursor-pointer font-semibold ${numberPage === index+limit ? 'bg-yellow-400' : ''}`}>{index +limit}</div>
                        ))}
                        <TiChevronRightOutline onClick={()=>{handleRightNum()}} className=' text-3xl text-yellow-400 cursor-pointer ml-4' />
                </div>
        </div>

    </div>
  )
}

export default Links