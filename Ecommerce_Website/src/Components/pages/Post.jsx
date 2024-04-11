import React, { useEffect, useRef, useState } from 'react';


import {  removeNews, updateNewsDetails } from '../../api/news';
import { useAuth, useNotification } from '../../hooks';
import { GrLike } from "react-icons/gr";
import ReactPlayer from 'react-player'
import { addComment, getCommentByNews, removeComment } from '../../api/comments';
import { useNavigate } from 'react-router-dom';
import { FaRegComment } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UpdateNewsModal from '../admin/shared/UpdateNewsModal';

const Post = ({ name, avatar, content, images, timestamp, video, id ,product,onFetchNews }) => {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentsPost, setCommentsPost] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const {updateNotification} = useNotification()
  const{authInfo}=useAuth()
  const navigate =useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
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
   

    window.addEventListener('scroll', handleScroll);
    
    // Xóa sự kiện lắng nghe cuộn khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCommentByNews=(async() => {
    const{type,message,comments}= await getCommentByNews(id)
    console.log(comments);
    setCommentsPost(comments)
  })
  
  const handleLike = () => {
    setLikes(likes + 1);
    // Gửi request lên server để cập nhật số lượng like trong cơ sở dữ liệu
  };


  const handleComment = async(comment) => {
     const formData = new FormData()
     formData.append('comments', comment)
    const{type,message}= await addComment(id,formData);
    console.log(message);
    fetchCommentByNews()
    // Gửi request lên server để lưu trữ bình luận vào cơ sở dữ liệu
  };
  const toggleCommentForm = () => {
    fetchCommentByNews()
    setShowCommentForm(!showCommentForm);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value.trim();
   
    if (commentText !== '') {
      handleComment(commentText);
      e.target.elements.comment.value = '';
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitComment(e);
    }
  };
  const handleNavigateProduct=(id)=>{
    navigate(`/product/${id}`);
  }
  const handleRemoveComment=async(idComment)=>{
    const {type,message} = await removeComment(id,idComment)
    fetchCommentByNews()
  }
  const formData= new FormData()
  const onSavePost=async(id, contentNews)=>{
    formData.append('content',contentNews)
    const {type,message, result} = await updateNewsDetails(id,formData)
    if(type === 'Success') updateNotification('success',message)
    onFetchNews(result)
  }
  const handleRemovePost=async(id)=>{
    const {type,message} = await removeNews(id)
    if(type === 'Success') updateNotification('success',message)
    onFetchNews(1)
  }
  return (
    <div div className="w-full ">
          <UpdateNewsModal isOpen={showUpdateModal} name={name} avatar={avatar} content={content} images={images} onSavePost={onSavePost}
          timestamp={timestamp} video={video} id={id} product={product} onRequestClose={()=>setShowUpdateModal(false)}/>
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative"
      onMouseEnter={()=>setShowDropdown(true)}
      onMouseLeave={()=>setShowDropdown(false)}>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500 text-sm">{timestamp}</p>
        </div>
      </div>  
      <p className="mt-2 w-full font-sans " readOnly>{content}</p>

      <div className="absolute top-2 right-2 m-2 cursor-pointer " onClick={()=>setShowOptions(!showOptions)}>
      <HiOutlineDotsHorizontal className='text-xl' />
        {/* Các tùy chọn */}
        {showOptions && (
          <div className="absolute z-40  top-0 right-0 mt-8 mr-2 bg-white rounded-md shadow-md">
            <button onClick={() =>setShowUpdateModal(true)} className="block px-4 py-2 text-gray-700 hover:text-gray-900">Edit</button>
            <button onClick={() => handleRemovePost(id)} className="block px-4 py-2 text-red-700 hover:text-red-900">Delete</button>
          </div>
        )}
      </div>
       
      <div className='flex items-center justify-center mt-4 mb-4 relative ' ref={videoRef}>
        
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
        <div className={`grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
          {images.map((image, index) => (
            <div key={index} className={`aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden ${images.length === 1 ? 'col-span-full' : ''}`}>
              <img src={image} alt={`Post Image ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}
       {product?.mainImage && showDropdown ? <div className='top-2/3 -right-20 absolute  z-100 border-2 border-yellow-400 rounded '>
            <img src={product?.mainImage} alt={product?.name}  className=' w-16 h-24 rounded'
              onClick={()=>handleNavigateProduct(product?._id)} />
        </div> :""}
      </div>
      <div className="flex justify-between  py-2  border-b-2  border-b-inherit">
        <button onClick={handleLike} className="text-yellow-500 flex items-center"><GrLike  className='text-yellow-400 text-lg mr-2'/>Like ({likes})</button>
        <button onClick={toggleCommentForm} className="text-yellow-500 flex items-center"><FaRegComment className='text-yellow-400 text-lg mr-2' />Comment ({commentsPost?.length})</button>
      </div>
      {showCommentForm && (
        <>
         {commentsPost?.length > 0 && (
        <div className="mt-4">
          
          <ul>
            {commentsPost?.map((comment, index) => (
             <li key={index} className="mt-2">
              <div >
             <div className="flex items-center">
               <img src={comment.user.profileImage} alt={comment.user.name} className="w-8 h-8 rounded-full mr-2" />
               <div className='p-2 bg-slate-100 rounded w-full'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className="font-semibold font-sans">{comment.user.username}</p>
                    <p className='font-sans'>{comment.comments}</p>
                 </div>
                 {authInfo.profile._id.toString()===comment.user._id.toString() ?<div onClick={()=>handleRemoveComment(comment._id)}><CiCircleRemove className='text-yellow-400 text-lg' /></div>:""}
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
          <button type="submit" className="mt-2 bg-yellow-500 text-white px-2 py-1 flex justify-end rounded-lg">Post </button>
        </form>
        </>
      )}
     
    </div>
  
    </div>
  );
};
export default Post