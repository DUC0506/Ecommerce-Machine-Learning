/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

const AddPromotionModal = ({ isOpen, onRequestClose, onAddPromotion }) => {
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    startDate: "",
    endDate: "",
    mainImage: "",
    description: "",
  });
  const [mainImageUrl, setMainImageUrl] = useState("");
  // const [errors, setErrors] = useState({});

  const handleAdd = () => {
    const formData = new FormData();

    formData.append("name", newPromotion.name);
    formData.append("startDate", newPromotion.startDate);
    formData.append("endDate", newPromotion.endDate);
    formData.append("mainImage", newPromotion.mainImage);
    formData.append("description", newPromotion.description);

    onAddPromotion(formData);
    setNewPromotion({
      name: "",
      startDate: "",
      endDate: "",
      mainImage: "",
      description: "",
    });
    setMainImageUrl("");
    onRequestClose();
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewPromotion((prevData) => ({ ...prevData, [name]: files[0] }));
    const reader = new FileReader();
    reader.onload = () => {
      setMainImageUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <h2 className="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>
      <div className="mb-8 bg-white rounded p-4">
        <label htmlFor="name" className=" mb-2 flex font-sans font-medium">
          <p className="text-red-500">*</p>Tên Chung cư{" "}
        </label>
        <input
          type="text"
          id="name"
          placeholder="Tên chiến dịch"
          name="name"
          value={newPromotion.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500 font-sans"
        />

        <label htmlFor="startDate" className="flex mb-2 font-sans font-medium">
          <p className="text-red-500 ">*</p>Địa chỉ:
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="w-full border font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newPromotion.startDate}
          onChange={handleChange}
        />

        <label htmlFor="endDate" className="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Số lượng tòa:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="w-full border p-2 mb-4 focus:outline-none font-sans  focus:border-yellow-500"
          value={newPromotion.endDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="mainImage"
          className="flex mb-2 font-sans font-medium font-sans"
        >
          <p className="text-red-500">*</p>Main Image:
        </label>
        <label
          htmlFor="mainImage"
          className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer font-sans"
        >
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            onChange={handleFileChange}
            className="hidden"
          />
          <span>Choose Main Image</span>
        </label>

        {mainImageUrl && (
          <img src={mainImageUrl} alt="Main Image" className="w-32 h-32 mt-2" />
        )}
      </div>

      <h2 className="text-2xl  mb-4 font-sans font-medium ">
        Thông tin chi tiết
      </h2>
      <div className=" bg-white rounded p-4 mb-4 font-sans">
        <div className="mb-8">
          <label
            htmlFor="description"
            className="flex mb-2 font-sans font-medium "
          >
            <p className="text-red-500">*</p>Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500 font-sans"
            value={newPromotion.description}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 font-sans"
          onClick={handleAdd}
        >
          Thêm chiến dịch
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded font-sans"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPromotionModal;
