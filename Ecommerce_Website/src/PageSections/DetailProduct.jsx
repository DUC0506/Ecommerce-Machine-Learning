import React from "react";
import Footer from "../Components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Components/Navbar";

const DetailProduct = ()=>{
    // const { productId } = useParams();

    // Giả sử có dữ liệu sản phẩm từ API hoặc Redux store
    const product = {
      id: 1,
      name: 'Product Name',
      description: 'Product description goes here.',
      price: 29.99,
      imageUrl: 'https://cdn.tgdd.vn/Products/Images/8139/304178/bhx/bap-bo-fohla-250g-202303220901544636.jpg',
    };
    // Giả sử có dữ liệu sản phẩm liên quan từ API hoặc Redux store
  const relatedProducts = [
    { id: 1, name: 'Related Product 1', price: 19.99, imageUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/8139/306153/bhx/bap-hoa-bo-my-fohla-dong-lanh-250g-202401061647133161.jpg' },
    { id: 2, name: 'Related Product 2', price: 24.99, imageUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/8139/306148/bhx/gu-bo-uc-fohla-dong-lanh-250g-202401062019133509.jpg' },
    { id: 1, name: 'Related Product 1', price: 19.99, imageUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/8139/306153/bhx/bap-hoa-bo-my-fohla-dong-lanh-250g-202401061647133161.jpg' },
    { id: 1, name: 'Related Product 1', price: 19.99, imageUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/8139/306153/bhx/bap-hoa-bo-my-fohla-dong-lanh-250g-202401061647133161.jpg' },
    { id: 1, name: 'Related Product 1', price: 19.99, imageUrl: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_85,s_346x346/https://cdn.tgdd.vn/Products/Images/8139/306153/bhx/bap-hoa-bo-my-fohla-dong-lanh-250g-202401061647133161.jpg' },
    // Thêm sản phẩm liên quan khác nếu cần
  ];

  // Giả sử có dữ liệu đánh giá từ API hoặc Redux store
  const reviews = [
    { id: 1, name: 'John Doe', rating: 5, comment: 'Great product!' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Good quality.' },
    // Thêm đánh giá khác nếu cần
  ];

  // Chuyển đánh giá từ số thành chuỗi sao
  const getStarRating = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2; // Làm tròn số đến 0.5
    return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
  };
    return (
        <div>
          <ToastContainer/>
            <Navbar/>
            <div className="container mx-auto my-8 p-4">
      <div className="flex">
        <div className="w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-md shadow-md" />
        </div>
        <div className="w-1/2 ml-4">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-yellow-400 mb-2">${product.price}</p>
          <p className="text-gray-800 mb-2">Origin: {product.origin}</p>
          <p className="text-gray-800 mb-2">Rating: {getStarRating(product.rating)}</p>
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Product Information</h3>
        <p className="text-gray-800 mb-2">Origin: {product.origin}</p>
        <p className="text-gray-800 mb-2">Rating: {getStarRating(product.rating)}</p>
        {/* Thêm thông tin chi tiết sản phẩm nếu có */}
      </div>

      {/* Thông tin sản phẩm liên quan */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Related Products</h3>
        <div className="flex">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="w-1/4 p-2">
              <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full h-auto rounded-md shadow-md" />
              <p className="text-gray-800 font-bold mt-2">{relatedProduct.name}</p>
              <p className="text-yellow-400">${relatedProduct.price}</p>
              <p className="text-gray-800 mb-2">Origin: {relatedProduct.origin}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Đánh giá */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4">
            <p className="text-gray-800 font-bold mb-2">Rating: {getStarRating(review.rating)}</p>
            <p className="text-gray-800 mb-2">Reviewer: {review.name}</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  
            <Footer/>
        </div>
    )
}


export default DetailProduct