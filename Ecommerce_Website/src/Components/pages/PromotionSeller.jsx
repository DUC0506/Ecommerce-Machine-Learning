import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

import { IoSearchOutline } from "react-icons/io5";
import { useNotification } from "../../hooks";
import {
  createPromotion,
  getPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
} from "../../api/promotion";
import UpdatePromotionModal from "../admin/shared/UpdatePromotionModal ";
import AddPromotionModal from "../admin/shared/AddPromotionModal";
import { MdLibraryAdd } from "react-icons/md";

const PromotionSeller = () => {
  const [promotions, setPromotions] = useState([]);
  const [promotion, setPromotion] = useState();
  const [isUpdateApartmentModalOpen, setUpdateApartmentModalOpen] =
    useState(false);
  const [isAddPromotionModalOpen, setAddPromotionModalOpen] = useState(false);

  const { updateNotification } = useNotification();
  useEffect(() => {
    // Gọi API để lấy danh sách apartment khi component được render
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const { type, message, promotions } = await getPromotions();
    console.log(promotions);
    if (type === "Error") return message;
    setPromotions(promotions);
  };
  const handleInfo = async (promotionId) => {
    const { type, message, promotion } = await getPromotion(promotionId);
    if (type === "Error") return message;
    setPromotion(promotion);
    setUpdateApartmentModalOpen(true);
  };
  const handleDeleteApartment = async (promotionId) => {
    const { type, message } = await removePromotion(promotionId);
    if (type === "Error") return message;
    updateNotification("success", message);
    fetchPromotions();
  };
  const handlePromotionApartment = async (promotion1) => {
    console.log(promotion1);
    const id = promotion1._id;
    const { type, message } = await updatePromotion(id, promotion1);
    if (type === "Error") return message;
    updateNotification("success", message);
    fetchPromotions();
  };
  const handleAddPromotion = async (newPromotion) => {
    console.log(newPromotion);
    const { type, message } = await createPromotion(newPromotion);
    if (type === "Error") return message;
    updateNotification("success", message);
    fetchPromotions();
  };

  return (
    <div className="bg-white rounded ">
      <div className=" mx-auto p-8 relative w-full h-full">
        <div className="flex justify-between mb-4 items-center">
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
          <button
            onClick={() => setAddPromotionModalOpen(true)}
            className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium flex items-center gap-1"
          >
            <MdLibraryAdd /> Add campaigns
          </button>
        </div>

        {promotions.map((promotion) => (
          <div
            key={promotion.id}
            className={
              isUpdateApartmentModalOpen || isAddPromotionModalOpen
                ? ` hidden `
                : `bg-white rounded-lg shadow-md p-6 mb-2 flex justify-between `
            }
          >
            <div>
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
            </div>

            <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
              <button
                className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                onClick={() => handleDeleteApartment(promotion._id)}
              >
                <MdDeleteForever />
              </button>
              <button
                className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded"
                onClick={() => handleInfo(promotion._id)}
              >
                <MdEdit />
              </button>
            </div>

            {/* Hiển thị các thông tin khác của apartment nếu cần */}
          </div>
        ))}
        <AddPromotionModal
          isOpen={isAddPromotionModalOpen}
          onRequestClose={() => setAddPromotionModalOpen(false)}
          onAddPromotion={handleAddPromotion}
        />
        {promotion && (
          <UpdatePromotionModal
            isOpen={isUpdateApartmentModalOpen}
            onRequestClose={() => setUpdateApartmentModalOpen(false)}
            promotion={{ ...promotion }}
            onUpdatePromotion={handlePromotionApartment}
          />
        )}
      </div>
    </div>
  );
};

export default PromotionSeller;
