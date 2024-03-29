import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Components/Navbar";
import { getProduct } from "../api/products";
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaFacebookMessenger,FaCheckCircle,FaHandsHelping, FaStore } from "react-icons/fa";
import { FaDongSign } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { LuPackageCheck } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { getUser } from "../api/user";
import { getReviews } from "../api/reviews";
import CommentForm from "./CommentForm";
import { addItemtoCart } from "../api/cart";

const DetailProduct = () => {
  const [mainImage, setMainImage] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const[user,setUser]=useState({
    name:'',
    profileImage:'',

  });
  const[reviews,setReviews]=useState([]);
  const [product, setProduct] = useState({
    name :'',
    mainImage :'',
    images:[],
    description :'',
    category :'',
    price :0,
    priceAfterDiscount:0 ,
    priceDiscount: 0,
    sold:0,
    ratingsAverage:0,
    ratingsQuantity:0,
    seller:'',
    size:[],
    colors:[],

  })



  const {id}= useParams();
  const fetchProduct=async()=>{
    const {type ,message,product} = await getProduct(id);
    if(type==='Error') return message;
   
    console.log(product.seller);
    setProduct(product)
    setMainImage(product.mainImage)
    if(product){
      console.log(product.seller);
      const {type ,message,user} = await getUser(product.seller);
      if(type==='Error') return message;
      console.log(user);
      setUser(user)
    }
    if(product){
      console.log(product.seller);
      const {type ,message,reviews} = await getReviews(product._id);
      if(type==='Error') return message;
   
      setReviews(reviews)
    }
  }

  // const getSeller = async()=>{
  //   if(product){
  //     console.log(product.seller);
  //     const {type ,message,user} = await getUser(product.seller);
  //     if(type==='Error') return message;
  //     console.log(user);
  //     setUser(user)
  //     }
  // }
    


  // Chuyển đánh giá từ số thành chuỗi sao
  const getStarRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Làm tròn số đến 0.5
    return Array.from({ length: 5 }, (_, index) => {
        if (index < roundedRating) {
            return <FaStar className="text-yellow-500" key={index} />;
        } else {
            return <FaStar className="text-yellow-500" key={index} style={{ opacity: 0.5 }} />;
        }
    });
};

  const changeMainImage = (image) => {
    setMainImage(image);
  };

  const handleReloadCmt=async(newReview)=>{
    if(newReview){
      if(product){
        console.log(product.seller);
        const {type ,message,reviews} = await getReviews(product._id);
        if(type==='Error') return message;
     
        setReviews(reviews)
      }
    }
  }
  const addItemCart =async(id)=>{
    const product1={
      productId: id,
      quantity:1,
      selectedColor: product.colors[0]._id,
      selectedSize: product.sizes[0]._id,
    }
    const {error ,cart}=await addItemtoCart(product1);
    if (error) return null;
    console.log(cart);
  }

  // const handleCommentSubmit = () => {
  //   // Xử lý khi người dùng gửi bình luận
  //   // Đoạn code này có thể gọi API hoặc cập nhật dữ liệu bình luận trong Redux store
  //   const newReview = {
  //     id: reviews.length + 1,
  //     name: 'User', // Có thể thay đổi tùy theo cách bạn xác định người dùng hiện tại
  //     rating: rating,
  //     comment: comment,
  //   };
  //   setReviews([...reviews, newReview]);
  //   // Reset form
  //   setComment('');
  //   setRating(0);
  // };
    useEffect(() =>{
      fetchProduct()
      // getSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto my-8 p-4 ">
        <div className="flex bg-slate-50 p-6">
          <div className="w-1/2">
            <img src={mainImage || product.images[0]} alt={product.name} className="w-full h-auto rounded-md shadow-md" />
            <div className="mt-4 flex ">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="w-1/4 h-auto rounded-md shadow-md cursor-pointer mr-2"
                  onClick={() => changeMainImage(image)}
                />
              ))}
               <img
                  src={product.mainImage }
                  alt={product.name}
                  className="w-1/4 h-auto rounded-md shadow-md cursor-pointer"
                  onClick={() => changeMainImage(product.mainImage)}
                />
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <h2 className="text-2xl font-medium font-sans mb-2 ">{product.name}</h2>
            <div className="flex text-sm font-medium mt-4 text-gray-800">
              <p className="   mb-2 mr-2">{product.sold} Đã bán</p>
              <p className=" mb-2 ml-2 underline underline-offset-8">{product.ratingsQuantity} Đánh giá</p>
            </div>
            <p className="text-2xl font-medium text-yellow-400 mb-2 p-4 flex bg-slate-200">{product.price} <FaDongSign /></p>
            <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
              <p className="mb-2 mr-2 flex items-center"> <LuPackageCheck className="text-yellow-500 text-xl mr-1" /> Đổi trả miễn phí </p>
              <p className="mb-2 mr-2 flex items-center">< FaCheckCircle className="text-yellow-500 text-xl mr-1" />Hàng có nguồn gốc xuất xứ 100%</p>
              
            </div>
            <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
              <p className="mb-2 mr-2 flex items-center"><GrDeliver  className="text-yellow-500 text-xl mr-1" /> Miễn phí vận chuyển</p>
              <p className="mb-2 mr-2 flex items-center"> <FaHandsHelping  className="text-yellow-500 text-xl mr-1" /> Hướng dẫn</p>
              
            </div>
            {/* <p className="text-gray-800 mb-2">Category: {product.category.name}</p> */}
            <p className="text-gray-800 mb-2 flex items-center mt-4">{product.ratingsAverage } {getStarRating(product.ratingsAverage)}</p>
            <div className="flex">
              <button onClick={()=>addItemCart(product._id)} className="bg-yellow-400 mr-2 flex items-center text-white px-2 py-3 rounded-md focus:outline-none">
              <CiShoppingCart className="text-2xl mr-1 "/> Thêm vào giỏ hàng
              </button>
              <button className="bg-yellow-400 text-white px-4 py-3 rounded-md focus:outline-none">
                Mua ngay
              </button>
            </div>
            
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="mt-8 bg-slate-50 p-4">
            <h3 className="text-xl font-medium font-sans mb-4">Thông tin người bán</h3>
            <div className="flex items-center mb-4">
              <img src={user.profileImage} alt={user.name} className="w-12 h-12 rounded-full mr-2" />
              <p className="text-gray-800 font-bold">{user.name}</p>
            </div>
            <div className="flex">
              <Link to={`/stores/`} className="bg-yellow-400 flex items-center font-medium font-sans text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none mr-2">
                <FaFacebookMessenger className="text-xl mr-1 text-white" />Chat ngay
              </Link>
              <Link to={`/stores/`} className="bg-orange-500 flex items-center font-medium font-sans text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none">
              <FaStore className="text-xl mr-1 text-white" />Xem  người bán
              </Link>
          </div>
        </div>

        {/* Thông tin sản phẩm liên quan */}
        {/* <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Related Products</h3>
          <div className="flex">
            {[].map((relatedProduct) => (
              <div key={relatedProduct.id} className="w-1/4 p-2">
                <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full h-auto rounded-md shadow-md" />
                <p className="text-gray-800 font-bold mt-2">{relatedProduct.name}</p>
                <p className="text-yellow-400">${relatedProduct.price}</p>
                <p className="text-gray-800 mb-2">Origin: {relatedProduct.origin}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Đánh giá */}
        <div className="mt-8 bg-slate-50   p-4">
          <h3 className="text-xl font-medium font-sans mb-4">Đánh giá sản phẩm</h3>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b-2 border-slate-300 border-solid ">
               
              <div className="flex items-center mb-4">
                  <img src={review.user.profileImage} alt={review.user.name} className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <p className="text-gray-800 font-bold">{review.user.name}</p>
                    <p className="text-gray-800 font-medium mb-2 flex items-center">{getStarRating(review.rating)}</p>
                  </div>
              </div>
              
           
              <p className="text-gray-600 mb-4">{review.review}</p>
            </div>
          ))}
          {/* Form bình luận */}
         
          <div className="mt-4">
            <CommentForm productId={product._id} reloadCmt={handleReloadCmt}/>
          </div>
        </div>
  
        <Footer />
      </div>
      </div>
    );
  };
  
  export default DetailProduct;
  