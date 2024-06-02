import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import { GrLike } from "react-icons/gr";

import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { useAuth } from "../../../hooks";
import { MdCancel } from "react-icons/md";
import ReactPlayer from "react-player";
import { updateNewsDetails } from "../../../api/news";

export default function UpdateNewsModal({
  name,
  avatar,
  content,
  images,
  timestamp,
  video,
  id,
  product,
  isOpen,
  onRequestClose,
  onSavePost,
}) {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [contentNews, setContentNews] = useState();

  const { authInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Kiểm tra xem video có trong tầm nhìn của người dùng không
      const isVisible = rect.top >= 0 && rect.bottom <= windowHeight;

      // Nếu video nằm trong tầm nhìn của người dùng, bật phát video
      if (isVisible) {
        setShouldPlay(true);
      } else {
        // Ngược lại, tắt phát video
        setShouldPlay(false);
      }
    };

    setContentNews(content);
    window.addEventListener("scroll", handleScroll);

    // Xóa sự kiện lắng nghe cuộn khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSavePost = () => {
    onSavePost(id, contentNews);
    onRequestClose();
  };

  const handleNavigateProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleChange = (event) => {
    setContentNews(event.target.value);
  };

  return (
    <div
      className={`absolute z-40 backdrop-blur-sm bg-white/30 w-screen h-screen top-0 bottom-0 right-0 left-0   items-center justify-center  ${
        isOpen ? "flex" : "hidden"
      }  `}
    >
      <div
        className={`bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative w-1/2  `}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="flex items-center">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold font-sans">{name}</h2>
            <p className="text-gray-500 text-sm font-sans">{timestamp}</p>
          </div>
        </div>
        <textarea
          className="mt-4 p-2 outline-none  focus:outline-yellow-500 rounded w-full font-sans border border-slate-200"
          value={contentNews}
          onChange={handleChange}
        ></textarea>

        <div
          className="flex items-center justify-center mt-4 mb-4 relative "
          ref={videoRef}
        >
          {video && (
            <ReactPlayer
              fallback
              url={video}
              playing={shouldPlay}
              loop={true}
              controls={true}
              light={false}
            />
          )}
          {!video && images && images.length <= 4 && (
            <div
              className={`grid ${
                images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              } gap-2 `}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden ${
                    images.length === 1 ? "col-span-full" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Post Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
          {product?.mainImage && showDropdown ? (
            <div className="top-2/3 -right-20 absolute  z-100 border-2 border-yellow-400 rounded ">
              <img
                src={product?.mainImage}
                alt={product?.name}
                className=" w-16 h-24 rounded"
                onClick={() => handleNavigateProduct(product?._id)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-end py-2  border-b-2  border-b-inherit">
          <button
            onClick={() => handleSavePost()}
            className="bg-yellow-500 font-sans font-medium text-white flex items-center  px-4 py-2 mr-1 rounded"
          >
            <MdOutlinePostAdd className="text-white text-lg mr-2" />
            Save{" "}
          </button>
          <button
            onClick={() => onRequestClose()}
            className="bg-red-500 font-sans font-medium text-white rounded flex items-center px-4 py-2"
          >
            <MdCancel className="text-white text-lg mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
