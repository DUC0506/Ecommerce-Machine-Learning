import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import Email from "../../assets/mail.webp";
// import { FcHome } from "react-icons/fc";
import apartment from "../../assets/apartments.png";

export default function Contacts({ contacts, changeChat }) {
  // const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const { authInfo } = useAuth();
  useEffect(() => {
    // setCurrentUserName(authInfo.profile.username);
    setCurrentUserImage(authInfo.profile.profileImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    console.log(contact);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="flex flex-col  h-full bg-slate-100 w-1/4 ">
          <div className="flex items-center justify-center h-1/6">
            <div className="flex items-center gap-4 ">
              <img src={Email} alt="logo" className="h-16 rounded" />
            </div>
          </div>
          <div className="overflow-auto rounded mx-1 h-5/6 bg-white ">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`flex items-center border-b border-slate-400 py-4 cursor-pointer my-1 rounded hover:bg-gradient-to-tr from-[#facc15] to-[#5FC3E4] hover:within ${
                  index === currentSelected ? "bg-yellow-500" : "bg-white "
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex-shrink-0 w-12 h-12 ml-1">
                  <img
                    src={contact.profileImage}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div
                  className={`ml-4   ${
                    index === currentSelected ? " text-white" : " text-black "
                  }`}
                >
                  <h3>{contact.username}</h3>
                  {contact.role === "admin" ? (
                    ""
                  ) : (
                    <h3 className="font-sans font-semibold flex items-center">
                      {/* <FcHome className="text-xl mr-1" />{" "} */}
                      <img
                        src={apartment}
                        alt="apartment"
                        className="w-5 h-5 mr-1"
                      />
                      {authInfo.profile.role === "admin"
                        ? contact.apartment.name
                        : ""}
                    </h3>
                  )}
                  {contact.role === "admin" ? <h3>Admin</h3> : ""}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex  items-center justify-center py-4 rounded bg-yellow-400 mt-1 mr-1  h-1/6 ">
            <div className="flex items-center gap-4 ">
              <div className="w-12 h-12">
                <img
                  src={currentUserImage}
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="text-white">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
