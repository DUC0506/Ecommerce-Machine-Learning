import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData, event) => {
    console.log(emojiData);
    let message = msg;
    message += emojiData.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid grid-cols-chatinput bg-yellow-400 p-4 rounded-xl h-full mr-2">
      <div className="flex items-center justify-center  w-full h-full">
        <div className="relative w-full h-full">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-white cursor-pointer text-lg"
          />
          {showEmojiPicker && (
            <div className="absolute left-0 bottom-10">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="flex items-center flex-grow ml-4" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Nhập tin nhắn"
          className="bg-white text-current rounded-full py-2 px-4 focus:outline-none w-full font-sans"
          onChange={(e) => setMsg(e.target.value)}
          onClick={()=>setShowEmojiPicker(false)}
          value={msg}
        />
        <button type="submit" className="ml-4">
          <IoMdSend className="text-white text-3xl" />
        </button>
      </form>
    </div>
  );
}
