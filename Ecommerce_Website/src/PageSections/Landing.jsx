import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import { CiDiscount1 } from "react-icons/ci";
import "../Styles/PageStyles/Landing.css";
import vegetable from "../assets/vegetable1.png";
import vegetable1 from "../assets/vegetable.png";
import vegetable2 from "../assets/lading_fruit1.png";
import vegetable3 from "../assets/lading_fruit2.png";
import vegetable4 from "../assets/lading_fruit3.png";
import landing1 from "../assets/landing1.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getTop5ProductsByApartment } from "../api/products";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Product from "../Components/Product";

const Landing = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { type, products } = await getTop5ProductsByApartment();
    console.log(products);
    if (type === "Success") {
      setProducts(products);
    }
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product-page`);
  };
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="landing bg-slate-400 w-full">
        <div className=" gap-x-11  m-auto max-w-7xl md:flex p-3 pt-4 inline-block w-full">
          <div className="inline-block background sm:flex rounded-md w-full md:w-8/12 h-96 bg-slate-200 p-0 overflow-hidden">
            <div className="md:w-80 text-2xl text-gray-600 sm:ml-14 mt-10 text-center md:text-left sm:px-0 sm:py-0 w-full px-10 py-5">
              <div className="p-1 bg-gray-400 text-xs rounded-xl w-32 text-center mb-1 sm:ml-0">
                Fresh Arrivals
              </div>
              <div className="font-semibold mb-8">
                Local Delights Just for Your Community{" "}
                <span className="text-yellow-500">Condo Market</span>
              </div>
              <div className="text-sm mb-6 hidden lg:block leading-7 font-sans">
                Discover and enjoy specialty foods from your neighbors. Buy,
                sell, and savor local flavors right within your apartment
                community.
              </div>
              <button
                onClick={handleNavigate}
                className="text-sm p-2 bg-white rounded-sm border-transparent border-2 text-semibold w-32 focus:ring-2 focus:sring-sky-400"
              >
                Explore Now
              </button>
            </div>
            <div className=" w-6/12  bg-center bottom-0 hidden sm:flex justify-center items-center">
              {/* <img src={vegetable} alt="" className="bg-transparent" />
              <img src={vegetable1} alt="" className="bg-transparent" /> */}
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={2000}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={vegetable} alt="" className="bg-transparent" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={vegetable1} alt="" className="bg-transparent" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={vegetable2} alt="" className="bg-transparent" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={vegetable3} alt="" className="bg-transparent" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={vegetable4} alt="" className="bg-transparent" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="relative w-full mt-10 md:mt-0 rounded-md md:w-1/3 h-96 bg-yellow-300 p-1 overflow-hidden ">
            <div className="absolute top-4 rotate-180 right-10">
              <lord-icon
                src="https://cdn.lordicon.com/xxdqfhbi.json"
                trigger="loop"
                delay="500"
                colors="primary:#4bb3fd,secondary:#ffc738,tertiary:#f28ba8,quaternary:#f24c00,quinary:#121331"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
            </div>
            <div className="font-semibold text-2xl text-gray-800 mt-10 ml-10 tracking-wide inline-block">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              20% OFF for Local Flavors!
            </div>
            <p className="text-sm mt-2 font-sans w-72 ml-10 text-gray-600 leading-2">
              Join our online community to discover, buy, and enjoy the best
              local foods from your neighbors !.{" "}
            </p>
            <div className=" grid  grid-cols-2">
              <div className=" grid-cols-1 ">
                <img src={landing1} alt="" className=" w-full mt-20" />
              </div>

              <div className="mt-2">
                <p className="font-sans text-white font-semibold p-1 text-center rounded bg-yellow-500">
                  Top 5 discount
                </p>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  onAutoplayTimeLeft={2000}
                  className="mySwiper  flex items-center justify-center h-full"
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => handleProduct(product._id)}
                        className=" h-full flex flex-col items-center justify-center  cursor-pointer  "
                      >
                        <div className="px-1 text-sm bg-yellow-400 rounded flex items-center">
                          <CiDiscount1 /> {product.priceDiscount}%
                        </div>
                        <div
                          title={product.name}
                          className="bg-yellow-50 p-1 rounded"
                        >
                          <img
                            src={product.mainImage}
                            alt=""
                            className="bg-transparent w-28 h-28  rounded"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* <SwiperSlide>
                    <img src={vegetable} alt="" className="bg-transparent" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={vegetable1} alt="" className="bg-transparent" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={vegetable2} alt="" className="bg-transparent" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={vegetable3} alt="" className="bg-transparent" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={vegetable4} alt="" className="bg-transparent" />
                  </SwiperSlide> */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
