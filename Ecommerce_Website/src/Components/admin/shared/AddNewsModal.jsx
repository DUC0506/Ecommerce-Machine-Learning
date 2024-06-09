import React, { useEffect, useState } from "react";

import { MdOutlinePostAdd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks";
import { MdCancel } from "react-icons/md";
import ReactPlayer from "react-player";
import { getSellerProducts } from "../../../api/products";
import useValidation from "../../../utils/validator";

export default function AddNewsModal({
  isOpen,
  onRequestClose,
  handleAddPost,
  avatar,
  name,
}) {
  // const videoRef = useRef(null);
  // const [shouldPlay, setShouldPlay] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const [showOptions, setShowOptions] = useState(false);
  const { validateNews } = useValidation();
  const [products, setProducts] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    apartment: "",
    images: [],
    mainVideo: "",
    products: [],
  });

  const { authInfo } = useAuth();
  // const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchProducts = async () => {
    const { type, products } = await getSellerProducts(authInfo.profile._id);
    if (type === "Success") {
      setProducts(products);
    }
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = [...imagePreviews];
      // let videoFile = null;
      for (const file of files) {
        if (file.type.startsWith("image")) {
          setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files],
          }));
          const reader = new FileReader();
          reader.onload = (e) => {
            imageFiles.push(e.target.result);
            console.log([...imageFiles]);
            setImagePreviews([...imageFiles]);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video")) {
          setFormData((prevData) => ({ ...prevData, mainVideo: files[0] }));
          setVideoPreview(URL.createObjectURL(file));
        }
      }
    }
  };

  // const handleSavePost = () => {
  //   //   onSavePost(id,contentNews)
  //   onRequestClose();
  // };

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "products") {
      setFormData((prevData) => ({
        ...prevData,
        products: [...prevData.products, value],
      }));
    } else setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRemoveImage = (indexToRemove) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
    setFormData((prevData) => {
      const updatedImages = prevData.images.filter(
        (_, index) => index !== indexToRemove
      );
      return { ...prevData, images: updatedImages };
    });
  };
  const formData1 = new FormData();
  const handleCreatePost = () => {
    const bool = validateNews(formData);
    if (!bool) {
      return;
    }
    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((image) => {
          formData1.append(key, image);
        });
      } else if (key === "apartment") {
        formData1.append(key, authInfo.profile.apartment);
      } else {
        formData1.append(key, formData[key]);
      }
    }

    handleAddPost(formData1);
  };

  return (
    <div
      className={`absolute z-40 backdrop-blur-sm bg-white/30 w-screen h-screen top-0 bottom-0 right-0 left-0   items-center justify-center  ${
        isOpen ? "flex" : "hidden"
      }  `}
    >
      <div
        className={`bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative w-1/2  `}
      >
        <div className="flex items-center w-full">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="w-full">
            <h2 className="text-lg font-semibold font-sans">{name}</h2>
            <textarea
              name="title"
              className="text-gray-500 w-full text-sm mt-1 focus:outline-yellow-400 border py-1 border-gray-300 rounded px-2 "
              value={formData.title}
              onChange={handleChange}
              placeholder="Title ...."
            ></textarea>
          </div>
        </div>
        <textarea
          className="mt-2 w-full focus:outline-yellow-400 border py-1 border-gray-300  rounded font-sans  px-2"
          name="content"
          value={formData.content}
          placeholder="Content ...."
          onChange={handleChange}
        ></textarea>
        <div className="w-full ">
          <div className="my-4">
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-white px-4 py-2 bg-yellow-400 rounded w-1/3"
            >
              Choose Files
            </label>
          </div>

          <div className="flex ">
            {imagePreviews.map((imagePreview, index) => (
              <div key={index} className="relative">
                <img
                  src={imagePreview}
                  alt={`Preview ${index}`}
                  className="mt-2 w-full rounded ml-1"
                />
                <button
                  className="absolute top-0 right-0 mt-1 mr-1 p-1 bg-red-500 text-white rounded-full text-xs cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
            {videoPreview && (
              <ReactPlayer url={videoPreview} controls className="mt-2" />
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-sans text-yellow-400 text-sm ">
            Select attached product{" "}
          </p>
          {/* <select
            name="products"
            id="product"
            className="p-2 mt-1 font-sans"
            onChange={handleChange}
          > */}
          <select
            id="products"
            name="products"
            onChange={handleChange}
            class="bg-gray-50 font-sans my-4 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-500 block w-full p-2.5 "
          >
            <option name="item" value="" className="py-2 font-sans">
              Choose product
            </option>
            {products.map((product) => (
              <option
                name="item"
                value={product._id}
                key={product._id}
                className="py-2 font-sans"
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end py-2  border-b-2  border-b-inherit">
          <button
            onClick={() => handleCreatePost()}
            className="bg-yellow-500 font-sans font-medium text-white flex items-center  px-4 py-2 mr-1 rounded"
          >
            <MdOutlinePostAdd className="text-white text-xl mr-2" />
            Post{" "}
          </button>
          <button
            onClick={() => onRequestClose()}
            className="bg-red-500 font-sans font-medium text-white rounded flex items-center px-4 py-2"
          >
            <MdCancel className="text-white text-xl mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
