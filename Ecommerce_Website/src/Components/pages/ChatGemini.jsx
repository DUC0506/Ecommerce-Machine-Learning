import React, { useEffect, useRef, useState } from "react";
import { createChatGemini, getMessages } from "../../api/message";
import { CiSquareChevDown } from "react-icons/ci";
import loadingChat from "../../assets/loading.gif";

export default function ChatGemini({ showGemini }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fetchMessages = async () => {
    const { type, projectedMessages } = await getMessages("model");
    if (type === "Success") {
      console.log(projectedMessages);
      setMessages(projectedMessages);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const addChatGemini = async () => {
    setLoading(true);
    setMessage("");
    const mess = {
      question: message,
    };
    const { type, newMessage } = await createChatGemini(mess);
    if (type === "Success") {
      console.log(newMessage);
      setLoading(false);
      fetchMessages();
    }
  };
  const handleChangeKey = (e) => {
    if (e.key === "Enter") {
      console.log(1);
      addChatGemini();
    }
  };

  useEffect(() => {
    fetchMessages();
    // getSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="z-50">
      <div class="fixed z-50 bottom-[calc(2rem+1.5rem)] right-0 mr-4 bg-white pt-2 px-2 pb-8 rounded-lg border border-gray-200 w-[440px] h-[634px] shadow-sm">
        <div class="flex flex-col space-y-1.5 pb-2 bg-yellow-400 rounded px-2 py-2">
          <div className="flex items-center justify-between ml-2">
            <h2 class="font-semibold text-lg tracking-tight text-white">
              Chatbot
            </h2>
            <CiSquareChevDown
              className="text-xl cursor-pointer text-white"
              onClick={() => showGemini(false)}
            />
          </div>
          <p class="text-sm text-white font-sans font-bold ml-2">
            Today what do eat ?
          </p>
        </div>

        <div
          class="pr-4 h-5/6 min-w-full  overflow-y-auto border-x border-gray-200"
          ref={scrollRef}
        >
          <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div class="rounded-full bg-gray-100 border p-1">
                <svg
                  stroke="none"
                  fill="black"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  ></path>
                </svg>
              </div>
            </span>
            <p class="leading-relaxed">
              <span class="block font-bold text-gray-700 font-sans">AI </span>
              Hi, how can I help you today? I can suggest recipes for the foods
              you have purchased 😍😍😍😍
            </p>
          </div>
          {messages.map((message) => (
            <>
              {message.fromSelf ? (
                <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1 justify-end ">
                  {/* <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div class="rounded-full bg-gray-100 border p-1">
                      <svg
                        stroke="none"
                        fill="black"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                      </svg>
                    </div>
                  </span> */}
                  <p class="leading-relaxed font-sans whitespace-pre-line  rounded-lg p-2 bg-slate-200">
                    {/* <span class="block font-bold text-gray-700 font-sans">
                      You{" "}
                    </span> */}
                    {message.message}
                  </p>
                </div>
              ) : (
                <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                  <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div class="rounded-full bg-gray-100 border p-1">
                      <svg
                        stroke="none"
                        fill="black"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        ></path>
                      </svg>
                    </div>
                  </span>
                  <p class="leading-relaxed font-sans whitespace-pre-line">
                    <span class="block font-bold text-gray-700">AI </span>
                    {message.message}
                  </p>
                </div>
              )}
            </>
          ))}
          {loading ? (
            <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div class="rounded-full bg-gray-100 border p-1">
                  <svg
                    stroke="none"
                    fill="black"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    ></path>
                  </svg>
                </div>
              </span>
              <p class="leading-relaxed font-sans whitespace-pre-line">
                <span class="block font-bold text-gray-700">AI </span>
                <img src={loadingChat} alt="" className="w-32 h-32 bg-white " />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div class="flex items-center pt-0 z-50 mt-2">
          <div class="flex items-center justify-center w-full space-x-2">
            <input
              class="flex h-10 w-full font-sans rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 text-black focus-visible:ring-offset-2"
              placeholder="What do you want to ask about food?"
              type="text"
              name="message"
              value={message}
              onChange={handleChange}
              onKeyPress={handleChangeKey}
            />
            <button
              class="inline-flex items-center justify-center rounded-md text-sm font-medium text-white disabled:pointer-events-none disabled:opacity-50 bg-yellow-400  hover:bg-yellow-500 h-10 px-4 py-2"
              onClick={() => addChatGemini()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
