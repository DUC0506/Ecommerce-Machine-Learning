import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsBySeller } from "../../api/products";
import { useAuth, useNotification } from "../../hooks";
import { getPromotion } from "../../api/promotion";

import { addCampaign } from "../../api/campaign";

export default function Campaign() {
  const { idPromotion } = useParams();
  // Lấy ID chiến dịch từ URL
  const [promotion, setPromotion] = useState({}); //
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discountRate, setDiscountRate] = useState();

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch promotion details based on promotionId
    // Ví dụ: Đây là nơi bạn sẽ gửi yêu cầu API để lấy thông tin chiến dịch từ ID

    fetchProductBySeller();
    fetchPromotionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchProductBySeller = async () => {
    const { type, products } = await getProductsBySeller(authInfo.profile._id);

    if (type === "Success") {
      setProducts(products);
    }
  };
  const fetchPromotionById = async () => {
    const { type, promotion } = await getPromotion(idPromotion);
    if (type === "Success") {
      setPromotion(promotion);
    }
  };
  console.log("Selected products:", selectedProducts);
  const handleProductSelect = (productId) => {
    const index = selectedProducts.indexOf(productId);
    console.log(index);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };
  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit selectedProducts and discountRate
    console.log("Selected products:", selectedProducts);
    console.log("Discount rate:", discountRate);
    formData.append("promotion", idPromotion);
    formData.append("discountRate", discountRate);
    formData.append("products", selectedProducts);
    // Reset form
    const { type, message } = await addCampaign(formData);
    if (type === "Error") {
      return updateNotification("error", message);
    }

    updateNotification("success", "Sign up campaign successfully");
    setSelectedProducts([]);
    setDiscountRate(0);
    navigate(`/dashboard/promotions`);
  };

  // if (!promotion) {
  //     return <div>Loading...</div>;
  // }

  return (
    <div className="p-4 bg-white relative">
      <div
        className="border-2 border-slate-200 rounded mt-4"
        key={promotion.id}
      >
        <div className="flex justify-between p-6 bg-yellow-500 rounded-t mb-4">
          <div>
            <h2 className="text-2xl font-sans font-bold mt-2 mb-2">{`${
              promotion.name
            } 【${new Date(promotion.startDate).toDateString()} - ${new Date(
              promotion.endDate
            ).toDateString()}】`}</h2>
            <p>{`${new Date(
              promotion.startDate
            ).toDateString()} (GMT+7) - ${new Date(
              promotion.endDate
            ).toDateString()} (GMT+7)`}</p>
          </div>
          <div>
            <img
              className="w-32 h-auto rounded-md"
              src={promotion.mainImage}
              alt="sale"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 class="mb-4 text-3xl font-extrabold font-sans leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Boost Your Sales with Our{" "}
          <span class="text-yellow-400 dark:text-blue-500">
            Special Discount #1
          </span>{" "}
          Campaign!
        </h1>
        <p class="text-base font-normal font-sans text-gray-500 lg:text-lg dark:text-gray-400">
          Sign up your products now on our e-commerce platform and enjoy
          exclusive discounts designed just for sellers. Don’t miss this
          opportunity to grow your business and reach more customers!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 bg-white p-4 mt-8 rounded">
          {products.map((product) => (
            <div
              key={product._id}
              class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
            >
              {/* <label className="flex items-center font-sans text-medium">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product._id)}
                                    onChange={() => handleProductSelect(product._id)}
                                    className="mr-2"
                                />
                                {product.name}
                            </label> */}
              <input
                id="bordered-checkbox-1"
                checked={selectedProducts.includes(product._id)}
                onChange={() => handleProductSelect(product._id)}
                type="checkbox"
                value=""
                name="bordered-checkbox"
                class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-checkbox-1"
                class="w-full py-4 ml-2 text-sm font-sans font-medium text-gray-900 dark:text-gray-300"
              >
                {" "}
                {product.name}
              </label>
            </div>
          ))}
        </div>
        <div class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            {/* <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div> */}
            <input
              id="discountRate"
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount Rate (%)"
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              SignUp Product
            </button>
          </div>
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="discountRate"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Rate (%)
          </label>
          <input
            id="discountRate"
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-white font-medium py-2 px-4 rounded hover:bg-yellow-500 mt-4"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
}
