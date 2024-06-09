import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case "warning":
        setClasses("bg-yellow-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "error":
        setClasses("bg-red-500");
        break;
      default:
        setClasses("bg-red-500");
        break;
    }

    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        // <div className="fixed right-0  top-24 rounded  ">
        //   <div className="bounce-custom shadow-md shadow-gray-400  rounded">
        //     <p className={classes + "text-white px-6 py-2 font-semibold "}>
        //       {notification}
        //     </p>
        //   </div>
        // </div>
        <div
          id="toast-success"
          class="fixed  flex right-1 z-50  top-24 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "
          role="alert"
        >
          {classes === "bg-green-500" ? (
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="sr-only">Check icon</span>
            </div>
          ) : (
            ""
          )}
          {classes === "bg-red-500" ? (
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span class="sr-only">Error icon</span>
            </div>
          ) : (
            ""
          )}
          {classes === "bg-yellow-500" ? (
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span class="sr-only">Warning icon</span>
            </div>
          ) : (
            ""
          )}

          <div class="ml-3 text-sm font-normal">{notification}</div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
