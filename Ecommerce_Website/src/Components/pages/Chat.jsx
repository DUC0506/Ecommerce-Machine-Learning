/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

import { io } from "socket.io-client";

// import Welcome from "../components/Welcome";
import Contacts from "./Contacts";
import ChatContainer from "./ChatContainer";
import { useAuth } from "../../hooks";
import { getUsers } from "../../api/user";
import Welcome from "./Welcome";
import ContactsUser from "./ContactsUser";

export default function Chat({ role, apartment }) {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  console.log(apartment);
  const { authInfo } = useAuth();
  const host = "http://localhost:3000";

  const fetchUsers = async () => {
    // const data = await axios.get(`${process.env.REACT_APP_ALL_USERS_ROUTE}/${currentUser._id}`);
    let { type, users } = await getUsers(role, apartment._id);
    if (type === "Error") {
      users = [];
    }
    const data = await getUsers("admin");

    let mergedContacts = [...users, ...data.users];
    setContacts(mergedContacts);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    socket.current = io(host);
    socket.current.emit("add-user", authInfo.profile._id);
    fetchUsers();
  }, [authInfo.profile]);

  const handleChatChange = (chat) => {
    console.log(chat);
    setCurrentChat(chat);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-gray-900">
      <div className="container h-full w-full  bg-opacity-80 flex overflow-auto">
        {role === "seller" && apartment ? (
          <ContactsUser contacts={contacts} changeChat={handleChatChange} />
        ) : (
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        )}
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
