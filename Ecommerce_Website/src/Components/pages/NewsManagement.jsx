import { addNews, getNews, updateNewsApproval } from "../../api/news";
import { useAuth, useNotification } from "../../hooks";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import AddNewsModal from "../admin/shared/AddNewsModal";
import { SiGooglenews } from "react-icons/si";
import { TbNewsOff } from "react-icons/tb";
export default function NewsManagement() {
  const [posts, setPosts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [select, setSelect] = useState(true);
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const fetchNews = async (all) => {
    const { type, message, news } = await getNews(all);
    console.log(news);
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
    const { type, message, news } = await addNews(data);
    console.log(news);
  };
  const handleSelectFilter = (selectBtn) => {
    setSelect(selectBtn);
  };
  const handleUpdateApproval = async (id, data) => {
    const { type, result } = await updateNewsApproval(id, data);
    if (type === "Success") {
      console.log(result);
      fetchNews(select);
    }
  };
  console.log(select);
  useEffect(() => {
    fetchNews(select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);
  return (
    <div className="w-full h-screen ">
      <div class="flex flex-col fixed z-20 items-center justify-center py-4 md:py-4 flex-wrap bg-slate-50 rounded ">
        {/* <button
          type="button"
          onClick={() => handleSelectFilter("a")}
          class="text-white hover:text-white border border-yellow-400 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          All
        </button> */}
        <button
          type="button"
          onClick={() => handleSelectFilter(true)}
          className={`${
            select ? "bg-yellow-400 " : ""
          }text-gray-900 border flex items-center border-white hover:border-yellow-300    focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 `}
        >
          <SiGooglenews className="mr-1 text-xl" /> Approved
        </button>
        <button
          type="button"
          onClick={() => handleSelectFilter(false)}
          className={`${
            select ? " " : "bg-yellow-400 "
          } text-gray-900 flex items-center border border-white hover:border-yellow-300    focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 `}
        >
          <TbNewsOff className="mr-1 text-xl" /> Not Approved
        </button>
      </div>
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
              isManagement={authInfo.profile.role === "admin" ? true : false}
              isApproved={post.isApproved}
              handleApproval={handleUpdateApproval}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
