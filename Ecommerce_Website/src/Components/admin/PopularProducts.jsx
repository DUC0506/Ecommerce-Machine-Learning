import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTop5Cheap } from "../../api/products";
import { TbCurrencyDong } from "react-icons/tb";
import { formatCurrency } from "../../utils/hepler";

function PopularProducts() {
  const [products, setProducts] = useState([
    {
      name: "",
      sold: 0,
      quantity: 0,
      mainImage: "",
      price: 0,
    },
  ]);

  const fetchPopularProducts = async () => {
    const { type, message, products } = await getTop5Cheap();
    if (type === "Error") return message;
    setProducts(products);
  };
  useEffect(() => {
    fetchPopularProducts();
  }, []);
  return (
    <div className="w-full bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium font-sans">
        Popular Products
      </strong>
      <div className="mt-4 flex flex-col gap-3">
        {products.slice(0, 6).map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.mainImage}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 font-sans">{product.name}</p>
              <span
                className={classNames(
                  product.quantity - product.sold === 0
                    ? "text-red-500"
                    : product.quantity - product.sold > 50
                    ? "text-green-500"
                    : "text-orange-500",
                  "text-xs font-medium"
                )}
              >
                {product.quantity - product.sold === 0
                  ? "Out of Stock"
                  : product.quantity - product.sold + " in Stock"}
              </span>
            </div>
            <div className="text-xs text-gray-400 pl-1.5 flex items-center">
              {formatCurrency(product.price)}
              <TbCurrencyDong className="text-yellow-400 text-xl" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
