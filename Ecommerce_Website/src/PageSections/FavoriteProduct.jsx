import { ToastContainer } from "react-toastify";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";
import { getFavoriteProducts, removeFavorite } from "../api/favorite";
import { FaDongSign } from "react-icons/fa6";
import { useNotification } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function FavoriteProduct() {
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const fetchFavoriteProduct = async () => {
    const { type, favorite } = await getFavoriteProducts();
    if (type === "Success") {
      console.log(favorite);
      setFavoriteProducts(favorite.products);
    }
  };

  const handleRemoveFavorite = async (id) => {
    const { type, message } = await removeFavorite(id);
    if (type === "Success") {
      updateNotification("success", message);
      fetchFavoriteProduct();
    }
  };
  const handleNavigateProductDetail = (id) => () => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    fetchFavoriteProduct();
  }, []);
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="   h-screen mt-8 flex  flex-wrap">
        {favoriteProducts.length > 0
          ? favoriteProducts.map((product) => (
              <div className="max-w-md mx-auto cursor-pointer bg-white h-fit rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      onClick={handleNavigateProductDetail(product._id)}
                      className="h-48 w-full object-cover md:w-48"
                      src={product.mainImage}
                      alt={product.name}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-lg font-sans text-yellow-500 font-semibold">
                      {product.name}
                    </div>

                    <p className="mt-2 text-gray-500 font-sans flex items-center">
                      {product.priceAfterDiscount}{" "}
                      <FaDongSign className="text-yellow-500 text-xl" />
                    </p>
                    <button
                      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 rounded"
                      onClick={() => handleRemoveFavorite(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          : ""}
        {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={favoriteProduct.image}
                alt={favoriteProduct.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {favoriteProduct.name}
              </div>
              <p className="mt-2 text-gray-500">
                {favoriteProduct.description}
              </p>
              <p className="mt-2 text-gray-500">{favoriteProduct.price}</p>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleRemoveFavorite}
              >
                Remove Favorite
              </button>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
