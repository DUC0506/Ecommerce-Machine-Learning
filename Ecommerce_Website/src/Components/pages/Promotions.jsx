import React, { useEffect, useState } from "react";

import { AiTwotoneShopping } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { getPromotions } from "../../api/promotion";
import { useNavigate } from "react-router-dom";

export default function Promotions() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const fetchPromotions = async () => {
    const { type, message, promotions } = await getPromotions();
    console.log(promotions);
    if (type === "Error") return message;
    setPromotions(promotions);
  };
  const handleNavigateCampaign = (id) => {
    navigate(`/dashboard/campaign/${id}`);
  };
  useEffect(() => {
    fetchPromotions();
  }, []);
  return (
    <div>
      <div className="h-full py-6 px-10 ">
        <div className="text-2xl font-sans font-semibold mb-4">
          Marketing campaign
        </div>
        <div className="p-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer">
          <div className="text-xl font-medium font-sans mb-2">Campaign</div>
          <div className="flex w-full text-xs font-sans font-medium items-center  ">
            <div className="w-1/6 font-sans font-medium p-2 mr-2 rounded bg-yellow-200 hover:bg-yellow-300">
              <FcSalesPerformance className=" w-20 h-auto text-yellow-400" />
              <div className="font-semibold text-lg">
                {promotions.length ? promotions.length : 0}
              </div>
            </div>
            <div className="ml-2">
              <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                List of
                <span class=" ml-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  promotional campaigns.
                </span>{" "}
              </h1>
              <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                <mark class="px-2 text-white bg-yellow-400 rounded ">Help</mark>{" "}
                sellers in business strategy.
              </h1>
            </div>
          </div>
        </div>
        <div className="px-4 pb-8 pt-4 bg-slate-50 rounded mb-4 mt-2 cursor-pointer">
          <div className="text-xl font-sans font-medium mt-2 mb-2">
            Campaign list
          </div>
          <div className="text-medium font-sans font-thin text-gray-600 mb-8">
            Learn about campaign types and how to sign up for a campaign
          </div>
          <div className="text-xl font-sans font-medium underline underline-offset-4 decoration-yellow-400 mb-4">
            All
          </div>
          {promotions.length > 0 &&
            promotions.map((promotion) => (
              <div
                className="border-2 border-slate-200 rounded mt-4 hover:bg-gray-200"
                key={promotion.id}
              >
                <div className="flex justify-between p-6 bg-yellow-500 rounded-t mb-4">
                  <div>
                    <h2 className="text-2xl font-sans font-bold mt-2 mb-2">{`${
                      promotion.name
                    } 【${new Date(
                      promotion.startDate
                    ).toDateString()} - ${new Date(
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
                <div className="flex justify-between p-4">
                  <div>
                    <h3 className="font-medium font-sans text-lg mb-4">
                      【ĐẤU TRƯỜNG DEAL SỐC - ${promotion.name}】 -{" "}
                      {`${new Date(
                        promotion.startDate
                      ).toDateString()} - ${new Date(
                        promotion.endDate
                      ).toDateString()}`}
                    </h3>
                    <p className="font-medium font-sans text-gray-500 mb-8 flex justify-center items-center">
                      {" "}
                      <AiTwotoneShopping className="text-xl" /> Chiến dịch sản
                      phẩm |{" "}
                      {`${new Date(
                        promotion.startDate
                      ).toDateString()} (GMT+7) - ${new Date(
                        promotion.endDate
                      ).toDateString()} (GMT+7)`}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-400 font-sans font-medium rounded py-2 px-4"
                      onClick={() => handleNavigateCampaign(promotion.id)}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
