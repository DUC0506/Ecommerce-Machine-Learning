import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import { getProduct } from "../api/products";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaFacebookMessenger,
  FaStore,
  FaCheckCircle,
  FaHandsHelping,
} from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { FaDongSign } from "react-icons/fa6";
import { getUser } from "../api/user";
import { getReviews } from "../api/reviews";
import CommentForm from "./CommentForm";
import { addItemtoCart } from "../api/cart";
import Chat from "../Components/pages/Chat";
import { CiSquareChevDown } from "react-icons/ci";
import { useNotification } from "../hooks";
// import ProductOverview from "./ProductOverview";
// import { useAuth } from "../hooks";
import { BiSolidCategory } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";

const DetailProduct = () => {
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  // const [comment, setComment] = useState("");
  // const [rating, setRating] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  // const {authInfo}=useAuth()
  const [user, setUser] = useState({
    name: "",
    profileImage: "",
    apartment: {},
  });
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    mainImage: "",
    images: [],
    description: "",
    category: "",
    price: 0,
    priceAfterDiscount: 0,
    priceDiscount: 0,
    sold: 0,
    ratingsAverage: 0,
    ratingsQuantity: 0,
    seller: "",
    sizes: [],
    colors: [],
  });

  const { id } = useParams();
  const fetchProduct = async () => {
    const { type, message, product } = await getProduct(id);
    if (type === "Error") return message;

    console.log(product);
    setProduct(product);
    setMainImage(product.mainImage);
    if (product) {
      console.log(product.seller);
      const { type, message, user } = await getUser(product.seller);
      if (type === "Error") return message;
      console.log(user);
      setUser(user);
    }
    if (product) {
      console.log(product.seller);
      const { type, message, reviews } = await getReviews(product._id);
      if (type === "Error") return message;

      setReviews(reviews);
    }
  };

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
        return <FaStar className="text-yellow-500 ml-1" key={index} />;
      } else {
        return (
          <FaStar
            className="text-yellow-500"
            key={index}
            style={{ opacity: 0.5 }}
          />
        );
      }
    });
  };

  const changeMainImage = (image) => {
    setMainImage(image);
  };

  const handleReloadCmt = async (newReview) => {
    if (newReview) {
      if (product) {
        console.log(product.seller);
        const { type, message, reviews } = await getReviews(product._id);
        if (type === "Error") return message;

        setReviews(reviews);
      }
    }
  };
  const addItemCart = async (id) => {
    if (!selectedSize._id) {
      return updateNotification("error", "Bạn chưa nhập size");
    }
    if (quantityProduct <= 0) {
      return updateNotification("error", "Nhập số lượng");
    }
    const product1 = {
      productId: id,
      quantity: quantityProduct,
      selectedColor: product.colors[0]._id,
      selectedSize: selectedSize._id ? selectedSize._id : product.sizes[0]._id,
    };
    const { error, cart } = await addItemtoCart(product1);
    if (error) return null;
    updateNotification("success", "Item successfully added");
  };
  const handleBuyNow = async (id) => {
    await addItemCart(id);

    navigate(`/cart`);
  };
  console.log(showChat);
  const handleShowChat = (bool) => {
    setShowChat(bool);
  };
  console.log(selectedSize);
  const handleSizeClick = (s) => {
    console.log(s);
    setSelectedSize(s);
  };
  const handleIncreaseQuantity = () => {
    setQuantityProduct(quantityProduct + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  };

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
  useEffect(() => {
    fetchProduct();
    // getSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto my-8 p-4 ">
        {/* <div className="flex bg-slate-50 p-6">
          <div className="w-1/2 relative bg-yellow-300 z-20 rounded-lg">
            <img
              src={mainImage || product.images[0]}
              alt={product.name}
              className=" w-full h-80  mb-2 z-20 object-contain rounded-md shadow-md"
            />

            <div className="mt-4 flex ">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="w-1/4  rounded-md shadow-md cursor-pointer mr-2 h-20 bg-yellow-200  object-contain"
                  onClick={() => changeMainImage(image)}
                />
              ))}
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-1/4 rounded-md shadow-md cursor-pointer h-20 bg-yellow-200  object-contain"
                onClick={() => changeMainImage(product.mainImage)}
              />
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <h2 className="text-2xl font-medium font-sans mb-2 ">
              {product.name}
            </h2>
            <p className="text-gray-800 mb-2 flex items-center mt-4">
              {product.ratingsAverage} {getStarRating(product.ratingsAverage)}
            </p>
            <div className="flex text-sm font-medium mt-4 text-gray-800">
              <p className="   mb-2 mr-2">{product.sold} Đã bán</p>
              <p className=" mb-2 ml-2 underline underline-offset-8">
                {product.ratingsQuantity} Đánh giá
              </p>
            </div>
            <p className="text-2xl font-medium text-yellow-400 mb-2 p-4 flex bg-slate-200">
              {selectedSize.ratioPrice
                ? product.price * selectedSize.ratioPrice
                : product.price}{" "}
              <FaDongSign />
            </p>
            <div className="flex items-center mt-4">
              {product.sizes.length > 0 &&
                product.sizes.map((s, index) => (
                  <div
                    key={index}
                    className={`mr-2  ${
                      selectedSize.size === s.size
                        ? "bg-yellow-500 text-white"
                        : ""
                    } px-2 py-1 font-semibold rounded cursor-pointer border-2 border-yellow-400 font-sans`}
                    onClick={() => handleSizeClick(s)}
                  >
                    {s.size}
                  </div>
                ))}
            </div>
            <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
              <p className="mb-2 mr-2 flex items-center font-sans">
                {" "}
                <LuPackageCheck className="text-yellow-500 text-xl mr-1" /> Đổi
                trả miễn phí{" "}
              </p>
              <p className="mb-2 mr-2 flex items-center font-sans">
                <FaCheckCircle className="text-yellow-500 text-xl mr-1" />
                Hàng có nguồn gốc xuất xứ 100%
              </p>
            </div>
            <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
              <p className="mb-2 mr-2 flex items-center font-sans">
                <GrDeliver className="text-yellow-500 text-xl mr-1" /> Miễn phí
                vận chuyển
              </p>
              <p className="mb-2 mr-2 flex items-center font-sans">
                {" "}
                <FaHandsHelping className="text-yellow-500 text-xl mr-1" />{" "}
                Hướng dẫn
              </p>
            </div>
       

            <div className="flex">
              <button
                onClick={() => addItemCart(product._id)}
                className="bg-yellow-400  hover:bg-yellow-500 mr-2 flex items-center text-white px-2 py-3 rounded-md focus:outline-none font-sans"
              >
                <CiShoppingCart className="text-2xl mr-1 " /> Thêm vào giỏ hàng
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-3 rounded-md focus:outline-none font-sans">
                Mua ngay
              </button>
            </div>
          </div>
        </div> */}
        <div>
          <section class="py-4">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="slider-box w-full h-full max-lg:mx-auto mx-0">
                  <div class="swiper main-slide-carousel swiper-container relative mb-6">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="block bg-yellow-200 rounded">
                          <img
                            src={mainImage || product.images[0]}
                            alt="SummerTravelBagimage"
                            class="lg:mx-auto rounded z-0  h-[350px] object-fill "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nav-for-slider ">
                    <div class="swiper-wrapper flex ">
                      {product.images.map((image, index) => (
                        <div class="swiper-slide thumbs-slide mr-2" key={index}>
                          <img
                            src={image}
                            alt={product.name}
                            onClick={() => changeMainImage(image)}
                            class="cursor-pointer w-20 h-20 rounded-xl transition-all duration-500 border-2 hover:border-yellow-500"
                          />
                        </div>
                      ))}
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        class="cursor-pointer w-20 h-20 rounded-xl transition-all duration-500 border-2 hover:border-yellow-500"
                        onClick={() => changeMainImage(product.mainImage)}
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-center items-center">
                  <div class="pro-detail w-full lg:max-w-[608px] lg:pl-8 xl:pl-16 lg:mx-auto lg:mt-4">
                    <div class="flex items-center justify-between gap-6 mb-2">
                      <div class="text">
                        <h2 class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2  font-sans">
                          {product.name}
                        </h2>
                        <p class="font-semibold w-fit px-2 py-1 flex items-center text-base text-white font-sans bg-yellow-500 rounded">
                          <BiSolidCategory className="mr-2" />
                          {product.category.name}
                        </p>
                      </div>
                      <button class="group transition-all duration-500 p-0.5">
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            class="fill-indigo-50 transition-all duration-500 group-hover:fill-indigo-100"
                            cx="30"
                            cy="30"
                            r="30"
                            fill=""
                          />
                          <path
                            class="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-700"
                            d="M21.4709 31.3196L30.0282 39.7501L38.96 30.9506M30.0035 22.0789C32.4787 19.6404 36.5008 19.6404 38.976 22.0789C41.4512 24.5254 41.4512 28.4799 38.9842 30.9265M29.9956 22.0789C27.5205 19.6404 23.4983 19.6404 21.0231 22.0789C18.548 24.5174 18.548 28.4799 21.0231 30.9184M21.0231 30.9184L21.0441 30.939M21.0231 30.9184L21.4628 31.3115"
                            stroke=""
                            stroke-width="1.6"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div class="flex  min-[400px]:flex-row min-[400px]:items-center mb-2 gap-y-3">
                      <div class="flex items-center">
                        <h5 class=" flex items-center font-manrope font-semibold text-2xl leading-9 text-gray-900 ">
                          {product.priceAfterDiscount}{" "}
                          <FaDongSign className="text-yellow-400" />
                        </h5>
                        <span class="ml-3 font-semibold text-lg text-yellow-400">
                          30% off
                        </span>
                      </div>
                      <svg
                        class="mx-5 max-[400px]:hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2"
                        height="36"
                        viewBox="0 0 2 36"
                        fill="none"
                      >
                        <path d="M1 0V36" stroke="#E5E7EB" />
                      </svg>
                      <button class="flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12657_16865)">
                            <path
                              d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                              fill="white"
                            />
                            <g clip-path="url(#clip1_12657_16865)">
                              <path
                                d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                                fill="white"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_12657_16865">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                            <clipPath id="clip1_12657_16865">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span class="text-base font-medium text-white">
                          {product.ratingsAverage}
                        </span>
                      </button>
                    </div>

                    <p class="font-medium text-lg text-gray-900 mb-2">Size</p>

                    <div class="grid grid-cols-2 min-[400px]:grid-cols-4 gap-3 mb-3 min-[400px]:mb-8">
                      {product.sizes.length > 0 &&
                        product.sizes.map((s, index) => (
                          <button
                            key={index}
                            onClick={() => handleSizeClick(s)}
                            class={`border ${
                              selectedSize.size === s.size
                                ? "bg-yellow-500 text-white"
                                : ""
                            }  border-gray-200 whitespace-nowrap text-gray-900 text-sm leading-6 py-2.5 rounded-full px-5 text-center w-full font-semibold shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300`}
                          >
                            {s.size}
                          </button>
                        ))}
                    </div>
                    <div class="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                      <div class=" flex items-center justify-center border border-gray-400 rounded-full">
                        <button
                          onClick={handleDecreaseQuantity}
                          class="group py-[14px] px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                        >
                          <svg
                            class="stroke-black group-hover:stroke-black"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 11H5.5"
                              stroke=""
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                            <path
                              d="M16.5 11H5.5"
                              stroke=""
                              stroke-opacity="0.2"
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                            <path
                              d="M16.5 11H5.5"
                              stroke=""
                              stroke-opacity="0.2"
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={quantityProduct}
                          class="font-semibold no-spinner text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-indigo-600 outline-0 hover:placeholder:text-indigo-600"
                          placeholder="1"
                        />
                        <button
                          onClick={handleIncreaseQuantity}
                          class="group py-[14px] px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                        >
                          <svg
                            class="stroke-black group-hover:stroke-black"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 5.5V16.5M16.5 11H5.5"
                              stroke="#9CA3AF"
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                            <path
                              d="M11 5.5V16.5M16.5 11H5.5"
                              stroke="black"
                              stroke-opacity="0.2"
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                            <path
                              d="M11 5.5V16.5M16.5 11H5.5"
                              stroke="black"
                              stroke-opacity="0.2"
                              stroke-width="1.6"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => addItemCart(product._id)}
                        class="group py-3 px-5 rounded-full bg-indigo-50 text-yellow-400 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-100"
                      >
                        <svg
                          class="stroke-yellow-400 transition-all duration-500 group-hover:stroke-yellow-400 "
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                        Add to cart
                      </button>
                    </div>
                    <button
                      onClick={() => handleBuyNow(product._id)}
                      class="text-center w-full px-5 py-4 rounded-[100px] bg-yellow-500 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-yellow-600 hover:shadow-yellow-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="mt-8 bg-slate-50 p-4">
          {/* <h3 className="text-xl font-medium font-sans mb-4">
            Seller information
          </h3> */}
          <div className="flex items-center mb-4">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-12 h-12 rounded-full mr-2"
            />
            <p className="text-gray-800 font-bold">{user.name}</p>
          </div>
          <div className="flex">
            <div
              onClick={() => handleShowChat(true)}
              className="bg-yellow-400 flex items-center font-medium font-sans text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-600 focus:outline-none mr-2"
            >
              <FaFacebookMessenger className="text-xl mr-1 text-white" />
              Chat now
            </div>
            <Link
              to={`/stores/`}
              className="bg-orange-500 flex items-center font-medium font-sans text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
            >
              <FaStore className="text-xl mr-1 text-white" />
              View seller
            </Link>
          </div>
        </div>

        {/* Thông tin sản phẩm liên quan */}
        <div className="mt-8 w-full p-4 bg-slate-50">
          <h3 className="text-xl font-medium  font-sans mb-4">
            Product information{" "}
          </h3>
          <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
            <p className="mb-2 mr-2 flex items-center font-sans">
              {" "}
              <LuPackageCheck className="text-yellow-500 text-xl mr-1" /> Đổi
              trả miễn phí{" "}
            </p>
            <p className="mb-2 mr-2 flex items-center font-sans">
              <FaCheckCircle className="text-yellow-500 text-xl mr-1" />
              Hàng có nguồn gốc xuất xứ 100%
            </p>
          </div>
          <div className="flex text-sm font-medium font-sans mt-4 text-gray-800 p-4">
            <p className="mb-2 mr-2 flex items-center font-sans">
              <GrDeliver className="text-yellow-500 text-xl mr-1" /> Miễn phí
              vận chuyển
            </p>
            <p className="mb-2 mr-2 flex items-center font-sans">
              {" "}
              <FaHandsHelping className="text-yellow-500 text-xl mr-1" /> Hướng
              dẫn
            </p>
          </div>
          <div className="flex w-full whitespace-pre-line">
            <p className="font-sans px-2 py-2">{product.description}</p>
          </div>
        </div>

        {/* Đánh giá */}
        <div className="mt-8 bg-slate-50   p-4">
          <h3 className="text-xl font-medium font-sans mb-4">Reviews</h3>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 border-b-2 border-slate-300 border-solid "
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.user.profileImage}
                  alt={review.user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-gray-800 font-bold">{review.user.name}</p>
                  <p className="text-gray-800 font-medium mb-2 flex items-center">
                    {getStarRating(review.rating)}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{review.review}</p>
            </div>
          ))}
          {/* Form bình luận */}

          <div className="mt-4">
            <CommentForm productId={product._id} reloadCmt={handleReloadCmt} />
          </div>
        </div>
        <div
          className={`w-1/2 bottom-2 z-50 right-0 h-2/3  overflow-auto ${
            showChat ? "fixed" : "hidden"
          }`}
        >
          <div
            className="flex justify-end text-lg w-full cursor-pointer"
            onClick={() => handleShowChat(false)}
          >
            <CiSquareChevDown />
          </div>

          {product.apartment ? (
            <Chat role="seller" apartment={product.apartment} />
          ) : (
            ""
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DetailProduct;
