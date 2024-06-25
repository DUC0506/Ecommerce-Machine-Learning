import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../../../hooks";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { getTotalOrdersNotification } from "../../../api/order";
// import { Button } from "../../ui/button";
// import { Badge } from "../../ui/badge";

export default function Header() {
  const navigate = useNavigate();
  const [notifications, setNotification] = useState();
  const { authInfo, handleLogout } = useAuth();

  const fetchOrderNotifications = async () => {
    const { type, orders } = await getTotalOrdersNotification(
      null,
      authInfo.profile._id
    );
    console.log(orders);
    if (type === "Success") {
      setNotification(orders);
    }
  };
  const handleLogoutDB = () => {
    handleLogout();
    navigate(`/signIn`);
  };
  const handleNotification = () => {
    navigate(`dashboard/orders`);
  };
  useEffect(() => {
    fetchOrderNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
      <div className="relative">
        <form class="flex items-center max-w-sm mx-auto">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 px-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-yellow-400 focus:border-blue-500 block w-full pl-10 p-2.5  "
              placeholder="Search ..."
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-yellow-500 rounded-lg border border-yellow-500  hover:bg-yellow-400  focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <div
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <span className="relative">
                  <HiOutlineBell
                    fontSize={24}
                    className="text-yellow-400 relative cursor-pointer  "
                    onClick={handleNotification}
                  ></HiOutlineBell>
                  {notifications > 0 ? (
                    <span className="rounded-full px-1 absolute bottom-2 left-4 bg-yellow-500 text-white">
                      {notifications}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                {/* <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-60  ">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700  font-medium">
                      Notifications
                    </strong>
                    {notifications.map((notification, index) => (
                      <div
                        onClick={handleNotification}
                        className="mt-2 py-2 rounded text-sm cursor-pointer hover:bg-yellow-400"
                      >
                        Order #{notification._id.slice(-3)} (not processed)
                      </div>
                    ))}
                  </div>
                </Popover.Panel> */}
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${authInfo.profile.profileImage})`,
                }}
              >
                <span className="sr-only">Marc Backes</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/dashboard/user-info")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 flex hover:bg-yellow-300 items-center rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    <FaUser className="text-xl mr-1" /> Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 flex hover:bg-yellow-300 items-center rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    <IoMdSettings className="text-xl mr-1" /> Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 hover:bg-yellow-300  flex items-centerrounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                    onClick={handleLogoutDB}
                  >
                    <FaSignOutAlt className="text-xl mr-1" /> Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
