import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import Navbar from "../Navbar";
import { getNewsByApartment } from "../../api/news";
import { useAuth, useNotification } from "../../hooks";
import { GrLike } from "react-icons/gr";
import ReactPlayer from "react-player";
import {
  addComment,
  getCommentByNews,
  removeComment,
} from "../../api/comments";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

import { getApartment } from "../../api/apartment";
// import { MdApartment } from "react-icons/md";
// import { FaEarthAfrica } from "react-icons/fa6";
// import { MdOutlineDisabledVisible } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
import CardProduct from "../admin/shared/CardProduct";

const Post = ({
  name,
  avatar,
  content,
  images,
  timestamp,
  video,
  id,
  product,
}) => {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [likes, setLikes] = useState(0);
  // const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentsPost, setCommentsPost] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

    window.addEventListener("scroll", handleScroll);

    // Xóa sự kiện lắng nghe cuộn khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCommentByNews = async () => {
    const { type, message, comments } = await getCommentByNews(id);
    if (type === "Error") return message;
    setCommentsPost(comments);
  };

  const handleLike = () => {
    setLikes(likes + 1);
    // Gửi request lên server để cập nhật số lượng like trong cơ sở dữ liệu
  };

  const handleComment = async (comment) => {
    const formData = new FormData();
    formData.append("comments", comment);
    const { type, message } = await addComment(id, formData);
    if (type === "Error") return message;
    fetchCommentByNews();
  };
  const toggleCommentForm = () => {
    fetchCommentByNews();
    setShowCommentForm(!showCommentForm);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value.trim();

    if (commentText !== "") {
      handleComment(commentText);
      e.target.elements.comment.value = "";
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitComment(e);
    }
  };
  const handleNavigateProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const handleRemoveComment = async (idComment) => {
    const { type, message } = await removeComment(id, idComment);
    if (type === "Error") return message;
    fetchCommentByNews();
  };
  return (
    <div
      className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-lg font-semibold font-sans">{name}</h2>
          <p className="text-gray-500 text-sm font-sans">{timestamp}</p>
        </div>
      </div>
      <p className="mt-2 font-sans text-normal">{content}</p>

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
            } gap-2`}
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
                  alt={`PostImage${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
        {product?.mainImage && showDropdown ? (
          //  <div className='top-2/3 -right-20 absolute  z-100 border-2 border-yellow-400 rounded '>
          //       <img src={product?.mainImage} alt={product?.name}  className=' w-16 h-24 rounded'
          //         onClick={()=>handleNavigateProduct(product?._id)} />
          //   </div>
          <CardProduct product={product} handleClick={handleNavigateProduct} />
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between  py-2  border-b-2  border-b-inherit">
        <button
          onClick={handleLike}
          className="text-yellow-500 flex items-center"
        >
          <GrLike className="text-yellow-400 text-lg mr-2" />
          Like ({likes})
        </button>
        <button
          onClick={toggleCommentForm}
          className="text-yellow-500 flex items-center"
        >
          <FaRegComment className="text-yellow-400 text-lg mr-2" />
          Comment ({commentsPost?.length})
        </button>
      </div>
      {showCommentForm && (
        <>
          {commentsPost?.length > 0 && (
            <div className="mt-4">
              <ul>
                {commentsPost?.map((comment, index) => (
                  <li key={index} className="mt-2">
                    <div>
                      <div className="flex items-center">
                        <img
                          src={comment.user.profileImage}
                          alt={comment.user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="p-2 bg-slate-100 rounded w-full">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold font-sans">
                                {comment.user.username}
                              </p>
                              <p className="font-sans">{comment.comments}</p>
                            </div>
                            {authInfo.profile._id.toString() ===
                            comment.user._id.toString() ? (
                              <div
                                onClick={() => handleRemoveComment(comment._id)}
                              >
                                <CiCircleRemove className="text-yellow-400 text-lg" />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmitComment} className="mt-4 w-full">
            <textarea
              name="comment"
              placeholder="Write your comment..."
              className="w-full h-10 border-yellow-300 border rounded-lg font-sans  px-2 focus:outline-none hover:outline-yellow-400"
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="mt-2 bg-yellow-500 text-white px-2 py-1 flex justify-end rounded-lg"
            >
              Post{" "}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [apartment, setApartment] = useState({});
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const fetchNews = async () => {
    const { type, message, news } = await getNewsByApartment(
      authInfo.profile.apartment._id
    );
    if (type === "Error") {
      return updateNotification("error", message);
    }

    setPosts(news);
  };

  const fetchApartment = async () => {
    const { type, message, apartment } = await getApartment(
      authInfo.profile.apartment._id
    );
    if (type === "Error") return message;
    setApartment(apartment);
  };
  useEffect(() => {
    fetchNews();
    fetchApartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="fixed w-full z-50 top-0 ">
        <ToastContainer />
        <Navbar />
        <div className="md:p-2 hidden md:block  text-center w-full font-sans font-bold  bg-gradient-to-tr from-[#facc15] to-[#72c635]">
          Be a part of a better apartment community. Receive 20% discount during
          promotion period.
        </div>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-3 w-full top-28 md:mt-16 relative">
        {/* <div className="w-1/4 font-sans font-bold text-xl p-4 rounded  shadow-md bg-white ">
          <div className=" font-sans font-semibold text-xl flex items-center justify-center flex-wrap">
            <MdApartment className="mr-1 text-yellow-400" />
            Chợ {apartment.name}
          </div>
          <div className=" font-sans mt-4    ">
            <div className="flex items-center ont-sans font-medium text-base  border-b-2 border-zinc-300">
              <FaEarthAfrica className="mr-1 text-yellow-400 " />
              Public
            </div>
            <p className="flex-wrap flex font-sans font-normal text-base">
              Anyone can see who's in the group and what they post.
            </p>
          </div>
          <div className=" font-sans mt-4    ">
            <div className="flex items-center ont-sans font-medium text-base border-b-2 border-zinc-300">
              <MdOutlineDisabledVisible className="mr-1 text-yellow-400 " />
              Visible
            </div>
            <p className="flex-wrap flex font-sans font-normal text-base">
              Only residents of this apartment can find this group.
            </p>
          </div>
          <div className=" font-sans mt-4   ">
            <div className="flex items-center ont-sans font-medium text-base border-b-2 border-zinc-300 ">
              <IoLocationSharp className="mr-1 text-yellow-400 " />
              Location
            </div>
            <p className="flex-wrap flex font-sans font-normal text-base">
              {apartment.address}
            </p>
          </div>
        </div> */}
        {/* top-28 mt-10 */}

        <div className=" w-full col-span-1 md:col-span-2 md:px-20 mt-8  ">
          {posts.map((post) => (
            <Post
              id={post._id}
              key={post._id}
              name={post.author.username}
              avatar={post.author.profileImage}
              content={post.content}
              video={post?.video}
              images={post.images}
              timestamp={post.slug}
              product={post?.products[0]}
            />
          ))}
        </div>
        <div className=" col-span-1 hidden md:block  h-fit rounded py-4  px-3 shadow-md bg-white  mr-2 sticky  whitespace-pre-line">
          <div className="font-bold text-lg p-4 font-sans flex justify-center b-yellow-400 border-b-2 border-zinc-300 ">
            Apartment community information
          </div>
          <div className="font-sans px-4">{apartment.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
