import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from '../Navbar';
import { addNews, getNewsByApartment } from '../../api/news';
import { useAuth, useNotification } from '../../hooks';
import { GrLike } from "react-icons/gr";
import ReactPlayer from 'react-player'
import { addComment, getCommentByNews, removeComment } from '../../api/comments';
import { useNavigate } from 'react-router-dom';
import { FaRegComment } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Post from './Post';
import AddNewsModal from '../admin/shared/AddNewsModal';



const FeedSeller = () => {
  const [posts,setPosts]=useState([])
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const{authInfo} = useAuth()
  const {updateNotification}=useNotification()
  const fetchNews=async()=>{
    const {type ,  message, news}=await getNewsByApartment(authInfo.profile.apartment._id,authInfo.profile._id)
    console.log(news);
    if(type ==='Error'){
      return updateNotification('error',message)

    }

    setPosts(news)

  }
  const onFetchNews=(result)=>{
    if(result){
      console.log(123);
      fetchNews()
    }
  }
  const handleAddPost=async(data)=>{
    const {type, message, news} =await addNews(data);
    console.log(news);
  }
  useEffect(()=>{
    fetchNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="w-full h-screen ">
        <div className='w-full '>
        <AddNewsModal isOpen={showUpdateModal}  handleAddPost={handleAddPost} avatar={authInfo.profile.profileImage} 
          name={authInfo.profile.username}
           onRequestClose={()=>setShowUpdateModal(false)}/>
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative w-1/2 mx-auto ">
          <div className="flex items-center">
            <img src={authInfo.profile.profileImage} alt={authInfo.profile.username} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{authInfo.profile.username}</h2>
              <p className="text-gray-500 text-sm">slug</p>
            </div>
            </div>  
          <textarea onClick={()=>setShowUpdateModal(true)} className="mt-2 w-full cursor-pointer font-sans outline-none border-2 border-yellow-400 rounded " readOnly></textarea>
        </div>
      <div className="top-28 mt-10 max-w-xl mx-auto  ">
        {posts.map(post => (
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
            onFetchNews={onFetchNews}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default FeedSeller;
