/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

import { IoSearchOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";

import { getUser } from "../../../api/user";
import { deleteProduct, getSellerProducts } from "../../../api/products";
import { MdDeleteForever } from "react-icons/md";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  let { id } = useParams();

  const fetchOrders = async () => {
    const { type, message, products } = await getSellerProducts(id);
    if (type === "Error") return message;

    setProducts(products);
  };
  const handleDeleteProduct = async (id) => {
    const { type } = await deleteProduct(id);
    if (type === "Success") {
      fetchOrders();
    }
  };
  const fetchUser = async () => {
    const { type, message, user } = await getUser(id);

    if (type === "Error") return message;
    setUser(user);
  };

  useEffect(() => {
    fetchOrders();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" bg-white rounded">
      <div className=" mx-auto p-8 relative w-full h-full">
        <div className="flex justify-between mb-4 bg-white w-fit p-4 rounded">
          <div>
            <h1 class="mb-4 text-xl font-bold leading-none tracking-tight  text-gray-900 md:text-2xl lg:text-3xl ">
              Product catalog of{" "}
              <span class="text-yellow-500 dark:text-blue-500">
                {user.username}
              </span>{" "}
            </h1>
          </div>
        </div>

        <div className="w-full  bg-white">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product's name
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price{" "}
                </th>
                <th scope="col" class="px-6 py-3">
                  Promotional price{" "}
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                  Sold
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {products.length > 0 ? (
              <tbody>
                {products.map((product, index) => (
                  // <div
                  //   key={product._id}
                  //   className={`flex rounded cursor-pointer bg-white hover:bg-slate-50 ${
                  //     index !== 0 ? "mt-2" : ""
                  //   }`}
                  // >
                  //   <div className="w-1/4  p-4 flex items-center space-x-4 cursor-pointer">
                  //     <img
                  //       src={product.mainImage}
                  //       alt={product.name}
                  //       className="w-10 h-10 object-cover  font-sans "
                  //     />
                  //     <span className=" font-sans font-medium ">{product.name}</span>
                  //   </div>
                  //   <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                  //     {product?.category?.name}{" "}
                  //   </div>
                  //   <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                  //     {product.price}
                  //   </div>
                  //   <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                  //     {product.priceAfterDiscount}
                  //   </div>
                  //   <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                  //     {product.quantity}
                  //   </div>
                  //   <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                  //     {product.sold}{" "}
                  //   </div>

                  //   {/*
                  // <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
                  // 	<button onClick={() => handleDeleteUser(user._id)} className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded">
                  //                 <MdDeleteForever />
                  // 	</button>
                  //                 <button  onClick={() => handleInfo(user._id)} className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded">
                  //                 <MdEdit />
                  // 	</button>
                  // </div> */}
                  // </div>
                  <tr
                    key={product._id}
                    class="bg-white border-b cursor-pointer  hover:bg-gray-50 "
                    // onClick={() => handleSellerProduct(user._id, user.role)}
                  >
                    <th
                      scope="row"
                      class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div class="ps-3">
                        <div class="text-base font-semibold flex  justify-center items-center gap-1">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-10 h-10 object-cover  font-sans rounded-md "
                          />
                          <span className=" font-sans font-medium ">
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4 font-sans font-medium  ">
                      {" "}
                      {product?.category?.name}{" "}
                    </td>
                    <td class="px-6 py-4 font-sans font-medium">
                      {" "}
                      {product.price}
                    </td>
                    <td class="px-6 py-4 font-sans font-medium">
                      {" "}
                      {product.priceAfterDiscount}
                    </td>
                    <td class="px-6 py-4 font-sans font-medium">
                      <div class="flex items-center"> {product.quantity}</div>
                    </td>
                    <td class="px-6 py-4 font-sans font-medium">
                      <div class="flex items-center"> {product.sold}</div>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    class="px-6 py-4 font-sans font-medium text-center"
                  >
                    No products found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
export default SellerProducts;
