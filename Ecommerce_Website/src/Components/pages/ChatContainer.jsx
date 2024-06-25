import React, { useState, useEffect, useRef } from "react";
// import Logout from "./Logout";

// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import { useAuth } from "../../hooks";
import { createMessage, getMessages } from "../../api/message";
import { IoCall, IoVideocam, IoSettings } from "react-icons/io5";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { authInfo } = useAuth();
  const fetchMessages = async () => {
    const { projectedMessages, type } = await getMessages(currentChat._id);
    if (type === "Error") {
      setMessages([]);
    } else {
      console.log(projectedMessages);
      setMessages(projectedMessages);
    }
  };
  useEffect(() => {
    fetchMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  // useEffect(() => {
  //   const getCurrentChat = async () => {
  //     if (currentChat) {
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )._id;
  //     }
  //   };
  //   getCurrentChat();
  // }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: authInfo.profile._id,
      msg,
    });

    await createMessage({ to: currentChat._id, message: msg });
    // await axios.post(sendMessageRoute, {
    //   from: authInfo.profile._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-3/4  bg-gradient-to-tr from-[#facc15] to-[#5FC3E4]">
      <div className="flex w-full items-center justify-between p-4 h-1/6 rounded border-b border-slate-200  bg-gradient-to-tr from-[#facc15] to-[#5FC3E4] ">
        <div className="flex w-full items-center gap-4 ">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <img
                src={currentChat.profileImage}
                alt=""
                className="w-12 h-12 rounded-full"
              />

              <h3 className="text-white font-sans font-bold text-lg">
                {currentChat.username}
              </h3>
            </div>

            <div className="flex items-center mr-2">
              <span>
                <IoCall className="text-white text-xl mr-2 cursor-pointer" />{" "}
              </span>
              <span>
                <IoVideocam className="text-white text-xl mr-2 cursor-pointer" />
              </span>
              <span>
                <IoSettings className="text-white text-xl mr-2 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="overflow-auto p-4 h-5/6">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`flex ${
                message.fromSelf ? "justify-end" : "justify-start"
              }`}
            >
              <div className="bg-yellow-500  px-4 py-2 rounded-lg mt-1">
                <p className="text-white font-sans ">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-1/6">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}
