import React from "react";
// import { FaHeadphonesAlt } from "react-icons/fa";
// import { AiOutlineMessage } from "react-icons/ai";
import support from "../../assets/support.jpg";
import { useNavigate } from "react-router-dom";
export default function SellerPolicy() {
  const navigate = useNavigate();
  const handleSupport = () => {
    navigate(`/dashboard/messages`);
  };
  return (
    <div className="container mx-auto p-4  w-full  ">
      <div className="ml-2">
        <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          List of
          <span class=" ml-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            policies for sellers.
          </span>{" "}
        </h1>
        <h1 class="mb-4 mt-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-400 rounded ">Protect</mark>{" "}
          the rights of both sellers and customers.
        </h1>
      </div>
      <div className="mx-auto w-full ">
        <div
          onClick={handleSupport}
          className="mb-8 fixed bottom-4   right-2 bg-yellow-300 hover:bg-yellow-200 cursor-pointer px-2  rounded"
        >
          <div className="flex justify-between w-full py-2 px-4 mr-2">
            {/* <div className="py-2 px-4 bg-white rounded flex items-center font-sans mr-2   ">
              <FaHeadphonesAlt className="text-xl text-yellow-400 mr-1" />{" "}
              Online support ?
            </div>
            <div className="flex items-center">
              <AiOutlineMessage className="text-yellow-400 text-3xl bg-yellow-200 rounded-2xl" />
            </div> */}
            <img src={support} alt="support" className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-semibold mb-2 font-sans text-white">
            Support ?
          </h2>
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold mb-6 font-sans ">
        Chính sách của nhà bán hàng
      </h1> */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <div className="mb-8">
          <span class="text-yellow-600 font-semibold font-sans">
            {" "}
            #1. Product policy
          </span>

          <p class="text-lg font-semibold text-gray-900 font-sans">
            The seller is committed to providing quality and reliable products
            to customers. Product descriptions must be truthful and transparent.
            Any product information, including price, size, color and material,
            must be provided accurately and in detail.
          </p>
        </div>
        <div className="mb-8">
          <span class="text-yellow-600 font-semibold font-sans">
            #2. Delivery policy
          </span>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            We are committed to delivering on time and ensuring that the
            products are well protected during transportation. Delivery time may
            vary depending on the customer's delivery address, but we will try
            to deliver as quickly and conveniently as possible.
          </p>
        </div>
        <div className="mb-8 font-sans">
          <span class="text-yellow-600 font-semibold font-sans">
            #3. Return and refund policy
          </span>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            The seller accepts returns and refunds within 30 days of purchase,
            providing that the product is undamaged and in its original
            condition. Customers can request a return or refund if they are not
            satisfied with the product they purchased, provided the product is
            unused and in its original packaging.
          </p>
        </div>
        <div className="mb-8 font-sans">
          <span class="text-yellow-600 font-semibold font-sans">
            #4. Payment policy
          </span>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            We accept payment by various methods, including cash, credit/debit
            cards and bank transfers. Online payments are also supported through
            secure and reliable payment gateways.
          </p>
        </div>
        <div>
          <span class="text-yellow-600 font-semibold font-sans">
            #5. Information security policy
          </span>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            The Seller undertakes to protect the personal information of the
            customer and not to share this information with any third party
            without the customer's consent. All personal information collected
            will be kept confidential and used only for the purpose of providing
            services to the customer.
          </p>
        </div>
      </div>
    </div>
  );
}
