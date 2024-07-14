import { useNavigate } from "react-router-dom";
import Product from "../Components/Product";
import NotFound from "../Components/admin/shared/NotFound";
import { getProductsByHome } from "../api/products";
import React, { useState } from "react";

export default function HomeProduct({ category }) {
  const [products, setProducts] = useState([]);
  console.log(category);
  const fetchProducts = async () => {
    const { type, products } = await getProductsByHome(category._id);
    if (type === "Success") {
      console.log(products);
      setProducts(products);
    }
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product-page?category=${category.name}`, {
      state: { categoryId: category._id },
    });
  };
  useState(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="border-t border-yellow-400 text-center ">
        <span
          className="bg-yellow-400 py-2 md:px-40 text-xl  rounded font-sans font-semibold text-white cursor-pointer"
          onClick={handleNavigate}
        >
          {category.name}
        </span>
        <div className="flex relative justify-center mb-2 flex-wrap w-full  p-4   ">
          {products.length > 0 ? (
            products &&
            products.map((item) => (
              <div key={item.id}>
                <Product
                  item={item}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  images={item.mainImage}
                  option={item.ratingsAverage}
                  discount={item.priceDiscount}
                  priceAfterDiscount={item.priceAfterDiscount}
                  sold={item.sold}
                />
              </div>
            ))
          ) : (
            <NotFound message="There are no sellers in your apartment complex listing the product for sale" />
          )}
        </div>
      </div>
    </div>
  );
}
