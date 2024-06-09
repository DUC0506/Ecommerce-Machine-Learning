import React, { useEffect, useState } from "react";

import { addNews, getNewsByApartment } from "../../api/news";
import { useAuth, useNotification } from "../../hooks";
// import { GrLike } from "react-icons/gr";
// import ReactPlayer from "react-player";
// import {
//   addComment,
//   getCommentByNews,
//   removeComment,
// } from "../../api/comments";
// import { useNavigate } from "react-router-dom";
// import { FaRegComment } from "react-icons/fa";
// import { CiCircleRemove } from "react-icons/ci";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Post from "./Post";
import AddNewsModal from "../admin/shared/AddNewsModal";
import NoItem from "../admin/shared/NoItem";

const FeedSeller = () => {
  const [posts, setPosts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pagination, setPagination] = useState(1);
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const fetchNews = async () => {
    const { type, message, news } = await getNewsByApartment(
      authInfo.profile.apartment._id,
      authInfo.profile._id,
      pagination
    );

    if (type === "Error") {
      return updateNotification("error", message);
    }

    setPosts(news);
  };
  const onFetchNews = (result) => {
    if (result) {
      console.log(123);
      fetchNews();
    }
  };
  const handleAddPost = async (data) => {
    const { type, message } = await addNews(data);
    if (type === "Error") return message;
    updateNotification("Success", "News added successfully");
    fetchNews();
  };
  const handlePre = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  const handleNext = () => {
    setPagination(pagination + 1);
  };
  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  return (
    <div className="w-full h-screen ">
      <div className="w-full ">
        <AddNewsModal
          isOpen={showUpdateModal}
          handleAddPost={handleAddPost}
          avatar={authInfo.profile.profileImage}
          name={authInfo.profile.username}
          onRequestClose={() => setShowUpdateModal(false)}
        />
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer relative w-1/2 mx-auto ">
          <div className="flex items-center">
            <img
              src={authInfo.profile.profileImage}
              alt={authInfo.profile.username}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {authInfo.profile.username}
              </h2>
              <p className="text-gray-500 text-sm">slug</p>
            </div>
          </div>
          <textarea
            onClick={() => setShowUpdateModal(true)}
            placeholder="Post ...."
            className="mt-2 w-full cursor-pointer font-sans outline-none border-2 border-yellow-400 rounded "
            readOnly
          ></textarea>
        </div>

        {posts.length > 0 && posts ? (
          <div className="top-28 mt-10 max-w-xl mx-auto  ">
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
                onFetchNews={onFetchNews}
              />
            ))}
            <div className="text-xs px-4 py-2 bg-white rounded">
              Page <strong>{pagination}</strong>
              <div class="flex mt-2">
                <div
                  onClick={handlePre}
                  class="flex mr-2 cursor-pointer items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </div>

                <div
                  onClick={handleNext}
                  class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoItem
            title={
              "Welcome sellers to the article management page for residents"
            }
            body={
              "Make your first post so you can share about the product with apartment residents. If you have difficulty managing your articles, please contact us to have your questions resolved."
            }
          />
        )}
      </div>
    </div>
  );
};

export default FeedSeller;
